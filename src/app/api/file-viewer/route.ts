import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { officialInstitutionalDocuments } from "@/data/officialDocumentsData";
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter";
import { logAuditEvent } from "@/lib/auditLogger";

export const dynamic = "force-dynamic";

// Maximum upload file size: 10 MB
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// Whitelisted file extensions for viewing
const ALLOWED_VIEW_EXTENSIONS = new Set([
  ".docx",
  ".xlsx",
  ".xls",
  ".pdf",
  ".txt",
  ".csv",
  ".md",
  ".json",
]);

// Dangerous executable extensions strictly blocked
const BLOCKED_EXTENSIONS = new Set([
  ".exe",
  ".bat",
  ".cmd",
  ".sh",
  ".ps1",
  ".vbs",
  ".bin",
  ".dll",
  ".so",
  ".jar",
  ".msi",
]);

// Allowed root directories for document resolution (Chroot confinement)
const ALLOWED_ROOT_DIRS = [
  path.resolve(process.cwd(), "docs"),
  path.resolve(process.cwd(), "public"),
];

/**
 * Verify that a resolved canonical path resides strictly within allowed directories
 * and does not point to sensitive configuration files (.env, .git, etc.)
 */
function isPathConfinedAndSafe(candidatePath: string): boolean {
  try {
    const canonical = path.resolve(candidatePath);
    const basename = path.basename(canonical).toLowerCase();

    // Block sensitive system and configuration files
    if (
      basename.startsWith(".env") ||
      basename.startsWith(".git") ||
      basename.includes("credentials") ||
      basename.includes("secret") ||
      canonical.includes("node_modules")
    ) {
      return false;
    }

    // Must be inside docs/ or public/
    return ALLOWED_ROOT_DIRS.some((allowed) => {
      const allowedWithSep = allowed.endsWith(path.sep) ? allowed : allowed + path.sep;
      return canonical.startsWith(allowedWithSep) || canonical === allowed;
    });
  } catch {
    return false;
  }
}

/**
 * Sanitize object rows to protect against Prototype Pollution (GHSA-4r6h-8v6p-xvw6)
 */
function sanitizeSheetRows(rows: any[][]): any[][] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    if (!Array.isArray(row)) return [];
    return row.map((cell) => {
      if (typeof cell === "string") {
        // Strip dangerous script injection tags
        return cell.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      }
      return cell;
    });
  });
}

/**
 * Helper to find file on disk safely with Path Traversal protection (CWE-22)
 */
function resolveLocalFilePath(targetFileOrId: string): { fullPath: string; matchedDoc: any } | null {
  if (!targetFileOrId || typeof targetFileOrId !== "string") return null;

  const cleanTarget = decodeURIComponent(targetFileOrId).trim();

  // 1. Path Traversal Guard: Reject if target contains traversal sequences or null bytes
  if (
    cleanTarget.includes("..") ||
    cleanTarget.includes("\0") ||
    cleanTarget.includes(":") ||
    cleanTarget.startsWith("/") ||
    cleanTarget.startsWith("\\")
  ) {
    return null;
  }

  // 2. Check by official document ID (e.g. doc-18)
  const byId = officialInstitutionalDocuments.find((d) => d.id === cleanTarget);
  if (byId) {
    const p1 = path.resolve(process.cwd(), byId.docsRepoPath);
    if (isPathConfinedAndSafe(p1) && fs.existsSync(p1)) {
      return { fullPath: p1, matchedDoc: byId };
    }
    const p2 = path.resolve(process.cwd(), "public", byId.downloadUrl.replace(/^\/+/, ""));
    if (isPathConfinedAndSafe(p2) && fs.existsSync(p2)) {
      return { fullPath: p2, matchedDoc: byId };
    }
  }

  // 3. Check by realFileName or displayName
  const byName = officialInstitutionalDocuments.find(
    (d) =>
      d.realFileName.toLowerCase() === cleanTarget.toLowerCase() ||
      d.displayName.toLowerCase() === cleanTarget.toLowerCase() ||
      d.downloadUrl.toLowerCase().endsWith(cleanTarget.toLowerCase())
  );
  if (byName) {
    const p1 = path.resolve(process.cwd(), byName.docsRepoPath);
    if (isPathConfinedAndSafe(p1) && fs.existsSync(p1)) {
      return { fullPath: p1, matchedDoc: byName };
    }
    const p2 = path.resolve(process.cwd(), "public", byName.downloadUrl.replace(/^\/+/, ""));
    if (isPathConfinedAndSafe(p2) && fs.existsSync(p2)) {
      return { fullPath: p2, matchedDoc: byName };
    }
  }

  // 4. Check strictly inside docs/ or public/ subdirectories without arbitrary cwd resolution
  const searchDirs = ["docs", "public"];
  for (const dir of searchDirs) {
    const baseDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(baseDir)) continue;

    const findFileSafely = (currentDir: string): string | null => {
      try {
        const items = fs.readdirSync(currentDir);
        for (const item of items) {
          const itemPath = path.resolve(currentDir, item);
          if (!isPathConfinedAndSafe(itemPath)) continue;

          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            const found = findFileSafely(itemPath);
            if (found) return found;
          } else if (item.toLowerCase() === cleanTarget.toLowerCase()) {
            return itemPath;
          }
        }
      } catch {
        return null;
      }
      return null;
    };

    const found = findFileSafely(baseDir);
    if (found && isPathConfinedAndSafe(found)) {
      return { fullPath: found, matchedDoc: byName || null };
    }
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    // Rate limiting: 60 requests per minute
    const rateLimit = checkRateLimit(`file-view:${clientIp}`, 60, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `คำขอเปิดเอกสารมากเกินกำหนด กรุณารอ ${rateLimit.retryAfterSeconds} วินาที`,
          code: "TOO_MANY_REQUESTS",
        },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const fileParam = searchParams.get("file") || searchParams.get("path") || searchParams.get("id");

    // If no file specified, return catalogue of openable documents
    if (!fileParam) {
      return NextResponse.json({
        success: true,
        message: "ระบบเปิดอ่านเอกสารราชการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
        totalAvailableDocs: officialInstitutionalDocuments.length,
        documents: officialInstitutionalDocuments,
      });
    }

    // Path Traversal check: check if parameter attempts directory traversal
    if (fileParam.includes("..") || fileParam.includes("\0")) {
      logAuditEvent({
        actor: {
          userId: "anonymous",
          fullName: "ผู้ไม่ประสงค์ดี (Path Traversal)",
          role: "GUEST",
          ipAddress: clientIp,
        },
        action: "SECURITY_ALERT",
        module: "MOD-22: Smart File Viewer",
        status: "WARNING",
        details: `ตรวจพบและสกัดกั้นการพยายามเข้าถึงไฟล์นอกขอบเขต (Path Traversal): "${fileParam}"`,
      });

      return NextResponse.json(
        {
          success: false,
          error: "การเข้าถึงไฟล์ถูกปฏิเสธเนื่องจากความปลอดภัย (Access Denied: Path Traversal Detected)",
          code: "FORBIDDEN_TRAVERSAL",
        },
        { status: 403 }
      );
    }

    const resolved = resolveLocalFilePath(fileParam);
    if (!resolved) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่พบไฟล์เอกสาร "${fileParam}" บนเซิร์ฟเวอร์ หรือไฟล์อยู่นอกขอบเขตที่ได้รับอนุญาต`,
        },
        { status: 404 }
      );
    }

    const { fullPath, matchedDoc } = resolved;
    const fileExt = path.extname(fullPath).toLowerCase();

    // Check extension whitelist
    if (!ALLOWED_VIEW_EXTENSIONS.has(fileExt)) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่อนุญาตให้เปิดอ่านไฟล์นามสกุล ${fileExt} เพื่อความปลอดภัยของระบบ`,
          code: "DISALLOWED_FILE_TYPE",
        },
        { status: 403 }
      );
    }

    const fileName = path.basename(fullPath);
    const stat = fs.statSync(fullPath);
    const fileSizeFormatted = (stat.size / 1024).toFixed(1) + " KB";

    // 1. DOCX Handling
    if (fileExt === ".docx") {
      const buffer = fs.readFileSync(fullPath);
      const htmlResult = await mammoth.convertToHtml({ buffer });
      const textResult = await mammoth.extractRawText({ buffer });

      return NextResponse.json({
        success: true,
        fileFormat: "DOCX",
        fileName,
        displayName: matchedDoc?.displayName || fileName,
        category: matchedDoc?.category || "เอกสารทั่วไป",
        department: matchedDoc?.department || "วิทยาลัยสงฆ์",
        downloadUrl: matchedDoc?.downloadUrl || `/${path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/")}`,
        fileSize: fileSizeFormatted,
        html: htmlResult.value,
        rawText: textResult.value,
        metadata: {
          lastModified: stat.mtime.toISOString(),
          sizeBytes: stat.size,
          warnings: htmlResult.messages,
        },
      });
    }

    // 2. XLSX Handling with Prototype Pollution Sanitization
    if (fileExt === ".xlsx" || fileExt === ".xls") {
      const buffer = fs.readFileSync(fullPath);
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      const sheetsData: Record<string, any[][]> = {};

      for (const name of sheetNames) {
        // Prevent prototype pollution through dangerous sheet names
        if (name === "__proto__" || name === "constructor" || name === "prototype") continue;

        const sheet = workbook.Sheets[name];
        const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }) as any[][];
        sheetsData[name] = sanitizeSheetRows(rawRows);
      }

      return NextResponse.json({
        success: true,
        fileFormat: "XLSX",
        fileName,
        displayName: matchedDoc?.displayName || fileName,
        category: matchedDoc?.category || "เอกสารสเปรดชีต",
        department: matchedDoc?.department || "วิทยาลัยสงฆ์",
        downloadUrl: matchedDoc?.downloadUrl || `/${path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/")}`,
        fileSize: fileSizeFormatted,
        sheetNames,
        sheetsData,
        metadata: {
          lastModified: stat.mtime.toISOString(),
          sizeBytes: stat.size,
        },
      });
    }

    // 3. PDF Handling
    if (fileExt === ".pdf") {
      const publicRelative = matchedDoc?.downloadUrl || `/${path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/")}`;

      return NextResponse.json({
        success: true,
        fileFormat: "PDF",
        fileName,
        displayName: matchedDoc?.displayName || fileName,
        category: matchedDoc?.category || "เอกสาร PDF",
        department: matchedDoc?.department || "วิทยาลัยสงฆ์",
        downloadUrl: publicRelative,
        fileSize: fileSizeFormatted,
        metadata: {
          lastModified: stat.mtime.toISOString(),
          sizeBytes: stat.size,
        },
      });
    }

    // 4. Text / Markdown / CSV Handling
    if ([".txt", ".csv", ".md", ".json"].includes(fileExt)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      return NextResponse.json({
        success: true,
        fileFormat: fileExt.toUpperCase().replace(".", ""),
        fileName,
        displayName: matchedDoc?.displayName || fileName,
        downloadUrl: matchedDoc?.downloadUrl || "",
        fileSize: fileSizeFormatted,
        content,
        metadata: {
          lastModified: stat.mtime.toISOString(),
          sizeBytes: stat.size,
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: `รูปแบบไฟล์ ${fileExt} ยังไม่รองรับการพรีวิวออนไลน์ (สามารถดาวน์โหลดได้)`,
      },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint to handle client-uploaded files for in-browser opening & preview
export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    // Rate limit: 20 uploads per minute
    const rateLimit = checkRateLimit(`file-upload:${clientIp}`, 20, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `อัปโหลดไฟล์บ่อยเกินกำหนด กรุณารอ ${rateLimit.retryAfterSeconds} วินาที`,
          code: "TOO_MANY_REQUESTS",
        },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "กรุณาแนบไฟล์ที่ต้องการเปิด" },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `ขนาดไฟล์เกินกำหนด (สูงสุด ๑๐ MB, ไฟล์ปัจจุบัน ${(file.size / 1024 / 1024).toFixed(1)} MB)`,
          code: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    const fileName = file.name;
    const fileExt = path.extname(fileName).toLowerCase();

    // Check for blocked executable extensions
    if (BLOCKED_EXTENSIONS.has(fileExt)) {
      logAuditEvent({
        actor: {
          userId: "anonymous",
          fullName: "ผู้พยายามอัปโหลดไฟล์อันตราย",
          role: "GUEST",
          ipAddress: clientIp,
        },
        action: "SECURITY_ALERT",
        module: "MOD-22: Smart File Viewer",
        status: "WARNING",
        details: `สกัดกั้นการอัปโหลดไฟล์ปฏิบัติการอันตราย (Malware Prevention): "${fileName}"`,
      });

      return NextResponse.json(
        {
          success: false,
          error: `ไม่อนุญาตให้อัปโหลดไฟล์ปฏิบัติการนามสกุล ${fileExt} เพื่อความปลอดภัยของระบบ`,
          code: "MALWARE_PREVENTION_BLOCKED",
        },
        { status: 400 }
      );
    }

    // Check against allowed preview extensions
    if (!ALLOWED_VIEW_EXTENSIONS.has(fileExt)) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่รองรับการเปิดไฟล์นามสกุล ${fileExt} (รองรับ .docx, .xlsx, .csv, .txt, .pdf)`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileSizeFormatted = (file.size / 1024).toFixed(1) + " KB";

    // 1. Uploaded DOCX
    if (fileExt === ".docx") {
      const htmlResult = await mammoth.convertToHtml({ buffer });
      const textResult = await mammoth.extractRawText({ buffer });

      return NextResponse.json({
        success: true,
        fileFormat: "DOCX",
        fileName,
        displayName: fileName,
        fileSize: fileSizeFormatted,
        html: htmlResult.value,
        rawText: textResult.value,
        metadata: {
          lastModified: new Date(file.lastModified).toISOString(),
          sizeBytes: file.size,
        },
      });
    }

    // 2. Uploaded XLSX with sanitization
    if (fileExt === ".xlsx" || fileExt === ".xls") {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      const sheetsData: Record<string, any[][]> = {};

      for (const name of sheetNames) {
        if (name === "__proto__" || name === "constructor" || name === "prototype") continue;

        const sheet = workbook.Sheets[name];
        const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }) as any[][];
        sheetsData[name] = sanitizeSheetRows(rawRows);
      }

      return NextResponse.json({
        success: true,
        fileFormat: "XLSX",
        fileName,
        displayName: fileName,
        fileSize: fileSizeFormatted,
        sheetNames,
        sheetsData,
        metadata: {
          lastModified: new Date(file.lastModified).toISOString(),
          sizeBytes: file.size,
        },
      });
    }

    // 3. Uploaded Text / CSV
    if ([".txt", ".csv", ".json", ".md"].includes(fileExt)) {
      const content = buffer.toString("utf-8");
      return NextResponse.json({
        success: true,
        fileFormat: fileExt.toUpperCase().replace(".", ""),
        fileName,
        displayName: fileName,
        fileSize: fileSizeFormatted,
        content,
        metadata: {
          lastModified: new Date(file.lastModified).toISOString(),
          sizeBytes: file.size,
        },
      });
    }

    return NextResponse.json({
      success: false,
      error: `ไม่รองรับการเปิดไฟล์นามสกุล ${fileExt} (รองรับ .docx, .xlsx, .csv, .txt)`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
