import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { officialInstitutionalDocuments } from "@/data/officialDocumentsData";

// Helper to find file on disk
function resolveLocalFilePath(targetFileOrId: string): { fullPath: string; matchedDoc: any } | null {
  const cleanTarget = decodeURIComponent(targetFileOrId).trim();

  // 1. Check by doc id (e.g. doc-18)
  const byId = officialInstitutionalDocuments.find((d) => d.id === cleanTarget);
  if (byId) {
    const p1 = path.join(process.cwd(), byId.docsRepoPath);
    if (fs.existsSync(p1)) return { fullPath: p1, matchedDoc: byId };
    const p2 = path.join(process.cwd(), "public", byId.downloadUrl.replace(/^\//, ""));
    if (fs.existsSync(p2)) return { fullPath: p2, matchedDoc: byId };
  }

  // 2. Check by realFileName or displayName
  const byName = officialInstitutionalDocuments.find(
    (d) =>
      d.realFileName.toLowerCase() === cleanTarget.toLowerCase() ||
      d.displayName.toLowerCase() === cleanTarget.toLowerCase() ||
      d.downloadUrl.toLowerCase().endsWith(cleanTarget.toLowerCase())
  );
  if (byName) {
    const p1 = path.join(process.cwd(), byName.docsRepoPath);
    if (fs.existsSync(p1)) return { fullPath: p1, matchedDoc: byName };
    const p2 = path.join(process.cwd(), "public", byName.downloadUrl.replace(/^\//, ""));
    if (fs.existsSync(p2)) return { fullPath: p2, matchedDoc: byName };
  }

  // 3. Direct check relative to cwd
  const directPath = path.join(process.cwd(), cleanTarget.replace(/^\/+/, ""));
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return { fullPath: directPath, matchedDoc: null };
  }

  // 4. Check in docs/ or public/ subdirectories
  const searchDirs = ["docs", "public"];
  for (const dir of searchDirs) {
    const baseDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(baseDir)) continue;

    const findFile = (currentDir: string): string | null => {
      const items = fs.readdirSync(currentDir);
      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          const found = findFile(itemPath);
          if (found) return found;
        } else if (item.toLowerCase() === cleanTarget.toLowerCase()) {
          return itemPath;
        }
      }
      return null;
    };

    const found = findFile(baseDir);
    if (found) {
      return { fullPath: found, matchedDoc: byName || null };
    }
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
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

    const resolved = resolveLocalFilePath(fileParam);
    if (!resolved) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่พบไฟล์เอกสาร "${fileParam}" บนเซิร์ฟเวอร์`,
        },
        { status: 404 }
      );
    }

    const { fullPath, matchedDoc } = resolved;
    const fileExt = path.extname(fullPath).toLowerCase();
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

    // 2. XLSX Handling
    if (fileExt === ".xlsx" || fileExt === ".xls") {
      const buffer = fs.readFileSync(fullPath);
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      const sheetsData: Record<string, any[][]> = {};

      for (const name of sheetNames) {
        const sheet = workbook.Sheets[name];
        sheetsData[name] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
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
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "กรุณาแนบไฟล์ที่ต้องการเปิด" },
        { status: 400 }
      );
    }

    const fileName = file.name;
    const fileExt = path.extname(fileName).toLowerCase();
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

    // 2. Uploaded XLSX
    if (fileExt === ".xlsx" || fileExt === ".xls") {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      const sheetsData: Record<string, any[][]> = {};

      for (const name of sheetNames) {
        const sheet = workbook.Sheets[name];
        sheetsData[name] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
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
