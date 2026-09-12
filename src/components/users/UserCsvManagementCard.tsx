"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  FileText, 
  Table, 
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Database,
  HelpCircle,
  FileCheck
} from "lucide-react";
import { SystemUser, SystemRole, MonasticStatus, AccountStatus } from "@/data/mockData";

interface UserCsvManagementCardProps {
  users: SystemUser[];
  filteredUsers: SystemUser[];
  onImportUsers: (newUsers: SystemUser[]) => void;
  onNotify: (message: string) => void;
}

interface ParsedRow {
  index: number;
  data: Partial<SystemUser>;
  isValid: boolean;
  errors: string[];
  isDuplicate: boolean;
}

export default function UserCsvManagementCard({
  users,
  filteredUsers,
  onImportUsers,
  onNotify
}: UserCsvManagementCardProps) {
  // Mode selection
  const [subTab, setSubTab] = useState<"import" | "export">("import");

  // Export State
  const [exportScope, setExportScope] = useState<"all" | "filtered" | "monks" | "novices" | "laypersons">("all");
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // -------------------------------------------------------------
  // CSV Helper: Robust Split supporting quotes and escaped quotes
  // -------------------------------------------------------------
  const parseCsvLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const mapRole = (roleStr: string): SystemRole => {
    const r = (roleStr || "").toUpperCase();
    if (r.includes("ADMIN") || r.includes("ผู้บริหารระบบ") || r.includes("แอดมิน")) return "SUPER_ADMIN";
    if (r.includes("EXECUTIVE") || r.includes("เจ้าคณะ") || r.includes("ผู้อำนวยการ") || r.includes("กรรมการ")) return "EXECUTIVE_BOARD";
    if (r.includes("TEACHER") || r.includes("อาจารย์") || r.includes("สอน")) return "PALI_TEACHER";
    if (r.includes("PROCTOR") || r.includes("พระพี่เลี้ยง") || r.includes("ปกครอง") || r.includes("DISCIPLINE")) return "DISCIPLINE_MONK";
    if (r.includes("REGISTRAR") || r.includes("ทะเบียน") || r.includes("เจ้าหน้าที่")) return "REGISTRAR_STAFF";
    if (r.includes("SAMANERA") || r.includes("สามเณร") || r.includes("STUDENT")) return "SAMANERA";
    if (r.includes("PATRON") || r.includes("โยมอุปถัมภ์") || r.includes("สาธุชน")) return "PATRON_USER";
    return "PALI_TEACHER";
  };

  const mapMonasticStatus = (title: string, statusStr: string): MonasticStatus => {
    const s = (statusStr || "").toUpperCase();
    if (s.includes("DISROBE") || s.includes("ลาสิกขา")) return "DISROBED";
    if (s.includes("SAMANERA") || title.includes("สามเณร")) return "ACTIVE_SAMANERA";
    if (s.includes("MONK") || title.includes("พระ")) return "ACTIVE_MONK";
    if (s.includes("LAY") || s.includes("คฤหัสถ์") || title.includes("นาย") || title.includes("นาง")) return "LAYPERSON";
    return "LAYPERSON";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processCsvFile(file);
  };

  const processCsvFile = (file: File) => {
    setSelectedFile(file);
    setIsParsing(true);
    setParseError(null);
    setParsedRows([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        let content = event.target?.result as string;
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.slice(1);
        }

        const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          setParseError("ไฟล์ CSV ต้องมีแถวหัวตาราง (Header) และข้อมูลอย่างน้อย ๑ แถว");
          setIsParsing(false);
          return;
        }

        const headers = parseCsvLine(lines[0]).map(h => h.replace(/^["']|["']$/g, "").trim().toLowerCase());

        const idxFullName = headers.findIndex(h => h.includes("ชื่อ") || h.includes("fullname") || h.includes("name"));
        const idxTitle = headers.findIndex(h => h.includes("คำนำหน้า") || h.includes("title"));
        const idxPali = headers.findIndex(h => h.includes("ฉายา") || h.includes("pali"));
        const idxRank = headers.findIndex(h => h.includes("สมณศักดิ์") || h.includes("rank"));
        const idxVassa = headers.findIndex(h => h.includes("พรรษา") || h.includes("vassa"));
        const idxDept = headers.findIndex(h => h.includes("สังกัด") || h.includes("ฝ่าย") || h.includes("department"));
        const idxTemple = headers.findIndex(h => h.includes("วัด") || h.includes("temple"));
        const idxRole = headers.findIndex(h => h.includes("บทบาท") || h.includes("role") || h.includes("ตำแหน่ง"));
        const idxMonastic = headers.findIndex(h => h.includes("สถานภาพ") || h.includes("monastic"));
        const idxStatus = headers.findIndex(h => h.includes("สถานะบัญชี") || h.includes("accountstatus"));
        const idxEmail = headers.findIndex(h => h.includes("อีเมล") || h.includes("email") || h.includes("mail"));
        const idxPhone = headers.findIndex(h => h.includes("เบอร์") || h.includes("โทร") || h.includes("phone"));

        if (idxFullName === -1) {
          setParseError("ไม่พบคอลัมน์ 'ชื่อ-นามสกุล' ในหัวตาราง กรุณาตรวจสอบแม่แบบ CSV");
          setIsParsing(false);
          return;
        }

        const existingEmails = new Set(users.map(u => u.email.toLowerCase()));
        const existingNames = new Set(users.map(u => u.fullName.toLowerCase()));

        const rows: ParsedRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i]);
          if (cols.length === 0 || cols.every(c => c === "")) continue;

          const rawFullName = cols[idxFullName] || "";
          const rawTitle = idxTitle !== -1 ? cols[idxTitle] : "";
          const rawPali = idxPali !== -1 ? cols[idxPali] : "";
          const rawRank = idxRank !== -1 ? cols[idxRank] : "";
          const rawVassa = idxVassa !== -1 && cols[idxVassa] ? parseInt(cols[idxVassa]) : undefined;
          const rawDept = idxDept !== -1 ? cols[idxDept] : "สำนักวิชาการ";
          const rawTemple = idxTemple !== -1 ? cols[idxTemple] : "วัดบาลีเถรวาทสังฆาราม";
          const rawRoleStr = idxRole !== -1 ? cols[idxRole] : "PALI_TEACHER";
          const rawMonasticStr = idxMonastic !== -1 ? cols[idxMonastic] : "";
          const rawStatusStr = idxStatus !== -1 ? cols[idxStatus] : "ACTIVE";
          const rawEmail = idxEmail !== -1 ? cols[idxEmail] : `user.${Date.now()}.${i}@palitheravada.mcu.ac.th`;
          const rawPhone = idxPhone !== -1 ? cols[idxPhone] : "081-xxx-xxxx";

          const errors: string[] = [];
          if (!rawFullName) errors.push("ไม่ระบุชื่อ-นามสกุล");

          let title = rawTitle;
          let fullName = rawFullName;
          if (!title) {
            if (fullName.startsWith("พระธรรม")) title = "พระธรรม";
            else if (fullName.startsWith("พระเทพ")) title = "พระเทพ";
            else if (fullName.startsWith("พระมหา")) title = "พระมหา";
            else if (fullName.startsWith("พระครู")) title = "พระครู";
            else if (fullName.startsWith("พระ")) title = "พระ";
            else if (fullName.startsWith("สามเณร")) title = "สามเณร";
            else if (fullName.startsWith("ดร.")) title = "ดร.";
            else if (fullName.startsWith("อาจารย์")) title = "อาจารย์";
            else if (fullName.startsWith("นาย")) title = "นาย";
            else if (fullName.startsWith("นางสาว")) title = "นางสาว";
            else if (fullName.startsWith("นาง")) title = "นาง";
            else title = "นาย";
          }

          if (title && !fullName.startsWith(title)) {
            fullName = `${title} ${fullName}`;
          }

          const role = mapRole(rawRoleStr);
          const monasticStatus = mapMonasticStatus(title, rawMonasticStr);
          const accountStatus: AccountStatus = rawStatusStr.includes("SUSPEND") || rawStatusStr.includes("ระงับ") ? "SUSPENDED" : "ACTIVE";

          const isDuplicate = existingEmails.has(rawEmail.toLowerCase()) || existingNames.has(fullName.toLowerCase());

          const systemUser: Partial<SystemUser> = {
            id: `usr-imp-${Date.now()}-${i}`,
            username: rawEmail.split("@")[0] || `user.${Date.now()}`,
            fullName,
            title,
            paliName: rawPali || undefined,
            sanghaRank: rawRank || undefined,
            vassa: rawVassa,
            originTemple: rawTemple,
            department: rawDept,
            role,
            monasticStatus,
            accountStatus,
            email: rawEmail,
            phone: rawPhone,
            lineConnected: false,
            lastLogin: "นำเข้าจากไฟล์ CSV",
            permissions: {
              monasticLife: role === "SUPER_ADMIN" ? "FULL" : "READ",
              almsPatron: role === "SUPER_ADMIN" ? "FULL" : "READ",
              mukhopatha: role === "SUPER_ADMIN" || role === "PALI_TEACHER" ? "FULL" : "READ",
              eApproval: role === "SUPER_ADMIN" ? "FULL" : "NONE",
              mcuBridge: role === "SUPER_ADMIN" ? "FULL" : "READ",
              userManagement: role === "SUPER_ADMIN" ? "FULL" : "NONE",
            }
          };

          rows.push({
            index: i,
            data: systemUser,
            isValid: errors.length === 0,
            errors,
            isDuplicate
          });
        }

        setParsedRows(rows);
        setIsParsing(false);
      } catch (err: any) {
        setParseError(`เกิดข้อผิดพลาดในการประมวลผลไฟล์ CSV: ${err?.message || "รูปแบบไม่ถูกต้อง"}`);
        setIsParsing(false);
      }
    };

    reader.readAsText(file, "UTF-8");
  };

  const handleConfirmImport = () => {
    const validUsers = parsedRows.filter(r => r.isValid).map(r => r.data as SystemUser);
    if (validUsers.length === 0) return;

    onImportUsers(validUsers);
    onNotify(`นำเข้าผู้ใช้งานใหม่สำเร็จจำนวน ${validUsers.length} บัญชีเรียบร้อยแล้ว!`);
    setSelectedFile(null);
    setParsedRows([]);
  };

  const handleDownloadSampleTemplate = () => {
    const headers = "คำนำหน้า,ชื่อ-นามสกุล,ฉายาบาลี,สมณศักดิ์,พรรษา,สังกัด/ฝ่ายงาน,วัดต้นสังกัด,บทบาท,สถานภาพสงฆ์,สถานะบัญชี,อีเมล,เบอร์โทรศัพท์\n";
    const sampleRows = [
      `"พระมหา","ทองดี ปัญญาวชิโร","ปญฺญาวชิโร","เปรียญธรรม ๙ ประโยค","12","สำนักวิชาการ","วัดสระเกศ ราชวรมหาวิหาร","PALI_TEACHER","ACTIVE_MONK","ACTIVE","thongdee@palitheravada.mcu.ac.th","089-111-2233"`,
      `"สามเณร","วัชรพงศ์ รัตนปาล","รตนปาโล","","","โครงการศากยบุตรสามเณรสีหะ","วัดบาลีเถรวาทสังฆาราม","SAMANERA","ACTIVE_SAMANERA","ACTIVE","samanera.watchara@palitheravada.mcu.ac.th","081-222-3344"`,
      `"ดร.","ปิยะพงษ์ สันติสุข","","","","ศูนย์เทคโนโลยีสารสนเทศ","","SUPER_ADMIN","LAYPERSON","ACTIVE","piyapong@palitheravada.mcu.ac.th","099-333-4455"`,
      `"นางสาว","ศรัทธา อุปถัมภ์","","","","กองทุนภัตตาหารเพลและโยมอุปถัมภ์","","PATRON_USER","LAYPERSON","ACTIVE","sattha.patron@gmail.com","086-444-5566"`
    ].join("\n");

    const blob = new Blob(["\uFEFF" + headers + sampleRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `แม่แบบ_นำเข้าผู้ใช้งาน_วส_มจร.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteExport = () => {
    let dataset: SystemUser[] = [];
    let filenameSuffix = "ทั้งหมด";

    if (exportScope === "all") {
      dataset = users;
      filenameSuffix = "ทั้งหมด";
    } else if (exportScope === "filtered") {
      dataset = filteredUsers;
      filenameSuffix = "ตามตัวกรอง";
    } else if (exportScope === "monks") {
      dataset = users.filter(u => u.monasticStatus === "ACTIVE_MONK");
      filenameSuffix = "พระภิกษุ";
    } else if (exportScope === "novices") {
      dataset = users.filter(u => u.monasticStatus === "ACTIVE_SAMANERA");
      filenameSuffix = "สามเณร";
    } else if (exportScope === "laypersons") {
      dataset = users.filter(u => u.monasticStatus === "LAYPERSON" || u.monasticStatus === "DISROBED");
      filenameSuffix = "คฤหัสถ์_โยมอุปถัมภ์";
    }

    const headers = "รหัสผู้ใช้,ชื่อผู้ใช้,ชื่อ-นามสกุล,คำนำหน้า,ฉายาบาลี,สมณศักดิ์,พรรษา,บทบาท,สถานภาพสงฆ์,สถานะบัญชี,สังกัด/ฝ่ายงาน,วัดต้นสังกัด,อีเมล,เบอร์โทรศัพท์,เข้าสู่ระบบล่าสุด\n";
    
    const rows = dataset.map(u => 
      `"${u.id}","${u.username}","${u.fullName}","${u.title || '-'}","${u.paliName || '-'}","${u.sanghaRank || '-'}","${u.vassa ?? '-'}","${u.role}","${u.monasticStatus}","${u.accountStatus}","${u.department}","${u.originTemple || '-'}","${u.email}","${u.phone || '-'}","${u.lastLogin || '-'}"`
    ).join("\n");

    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    link.download = `ทำเนียบผู้ใช้งาน_${filenameSuffix}_วส_มจร_${dateStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setExportSuccessMessage(`ส่งออกไฟล์ CSV สำเร็จจำนวน ${dataset.length} รายการ (UTF-8 BOM สำหรับ Excel)`);
    setTimeout(() => setExportSuccessMessage(null), 4000);
  };

  const validCount = parsedRows.filter(r => r.isValid).length;
  const duplicateCount = parsedRows.filter(r => r.isDuplicate).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white rounded-2xl shadow-sm border border-amber-600/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>ศูนย์กลางการจัดการไฟล์สเปรดชีต (CSV Hub)</span>
          </div>
          <h2 className="text-xl font-bold">
            ระบบนำเข้า (Import) และส่งออก (Export) ข้อมูลผู้ใช้งานระบบ ERP
          </h2>
          <p className="text-xs text-amber-100/80 max-w-2xl">
            รองรับการนำเข้าชุดข้อมูลผู้ใช้งานใหม่แบบกลุ่ม (Batch Import) พร้อมการตรวจสอบความถูกต้องของข้อมูลสงฆ์ และส่งออกทำเนียบผู้ใช้พร้อมรหัสภาษา UTF-8 BOM สำหรับเปิดใน Microsoft Excel และ Google Sheets ได้อย่างสมบูรณ์แบบ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadSampleTemplate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลดแม่แบบ CSV</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Import vs Export */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-6 pt-3 shadow-xs">
        <button
          type="button"
          onClick={() => setSubTab("import")}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            subTab === "import"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Upload className="w-4 h-4 text-amber-600" />
          <span>๑. นำเข้าข้อมูลจากไฟล์ CSV (Import Users)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("export")}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            subTab === "export"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Download className="w-4 h-4 text-amber-600" />
          <span>๒. ส่งออกข้อมูลเป็นไฟล์ CSV (Export Users)</span>
        </button>
      </div>

      {/* SUB-TAB 1: IMPORT */}
      {subTab === "import" && (
        <div className="p-6 bg-white rounded-b-2xl border border-slate-200 shadow-xs space-y-6 text-xs">
          
          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
              <span className="font-bold text-amber-950 block">ขั้นตอนที่ ๑: โหลดแม่แบบ</span>
              <p className="text-[11px] text-slate-600">
                ดาวน์โหลดไฟล์แม่แบบ CSV เพื่อดูชื่อคอลัมน์มาตรฐาน และกรอกข้อมูลพระภิกษุ สามเณร หรือเจ้าหน้าที่
              </p>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
              <span className="font-bold text-amber-950 block">ขั้นตอนที่ ๒: เลือกไฟล์ & ตรวจสอบ</span>
              <p className="text-[11px] text-slate-600">
                ลากไฟล์มาวาง ระบบจะทำการตรวจสอบความสมบูรณ์ ตรวจจับการซ้ำซ้อน และแสดงตัวอย่างให้ตรวจสอบ
              </p>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
              <span className="font-bold text-amber-950 block">ขั้นตอนที่ ๓: ยืนยันบันทึก</span>
              <p className="text-[11px] text-slate-600">
                กดปุ่มยืนยัน ข้อมูลจะถูกบรรจุเข้าสู่ระบบพร้อมกำหนดสิทธิ์เริ่มต้นตามบทบาทของแต่ละรูป/ท่าน
              </p>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="p-8 border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl bg-amber-50/20 hover:bg-amber-50/40 text-center cursor-pointer transition-all space-y-3 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <span className="font-bold text-slate-800 block text-sm">
                {selectedFile ? selectedFile.name : "คลิกเพื่อเลือกไฟล์ CSV หรือลากไฟล์มาวางที่นี่"}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                {selectedFile 
                  ? `ขนาดไฟล์: ${(selectedFile.size / 1024).toFixed(1)} KB • คลิกอีกครั้งเพื่อเปลี่ยนไฟล์`
                  : "รองรับไฟล์ .csv สูงสุด ๑๐ MB (รองรับภาษาไทย และฉายาบาลี)"}
              </p>
            </div>
          </div>

          {parseError && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-slate-900 text-sm">
                    ตัวอย่างข้อมูลที่ตรวจพบ ({parsedRows.length} รายการ)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                    ✓ ข้อมูลสมบูรณ์: {validCount} รายการ
                  </span>
                  {duplicateCount > 0 && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold">
                      ⚠ ตรวจพบชื่อ/อีเมลซ้ำ: {duplicateCount} รายการ
                    </span>
                  )}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-72">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200 w-12">แถว</th>
                      <th className="p-2.5 border-b border-slate-200">ชื่อ-นามสกุล</th>
                      <th className="p-2.5 border-b border-slate-200">ฉายาบาลี/คำนำหน้า</th>
                      <th className="p-2.5 border-b border-slate-200">บทบาท</th>
                      <th className="p-2.5 border-b border-slate-200">สังกัด</th>
                      <th className="p-2.5 border-b border-slate-200">อีเมล</th>
                      <th className="p-2.5 border-b border-slate-200">เบอร์โทรศัพท์</th>
                      <th className="p-2.5 border-b border-slate-200 text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {parsedRows.map((row) => (
                      <tr key={row.index} className={row.isValid ? "hover:bg-slate-50" : "bg-rose-50/50"}>
                        <td className="p-2.5 text-slate-400 font-mono">{row.index}</td>
                        <td className="p-2.5 font-medium text-slate-900">{row.data.fullName || "-"}</td>
                        <td className="p-2.5 text-slate-600">{row.data.paliName || row.data.title || "-"}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                            {row.data.role}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600">{row.data.department}</td>
                        <td className="p-2.5 text-slate-600 font-mono text-[10px]">{row.data.email}</td>
                        <td className="p-2.5 text-slate-600">{row.data.phone || "-"}</td>
                        <td className="p-2.5 text-center">
                          {row.isValid ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <Check className="w-3.5 h-3.5" />
                              <span>พร้อมนำเข้า</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold" title={row.errors.join(", ")}>
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>ข้อมูลไม่ครบ</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  disabled={validCount === 0}
                  onClick={handleConfirmImport}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>ยืนยันการนำเข้าข้อมูล ({validCount} บัญชี)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: EXPORT */}
      {subTab === "export" && (
        <div className="p-6 bg-white rounded-b-2xl border border-slate-200 shadow-xs space-y-6 text-xs">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              กำหนดขอบเขตข้อมูลที่ต้องการส่งออก (Export Scope Selection)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                exportScope === "all" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="exportScopeCard" 
                    checked={exportScope === "all"} 
                    onChange={() => setExportScope("all")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>ผู้ใช้งานทั้งหมดในระบบ</span>
                </div>
                <span className="font-mono text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
                  {users.length} บัญชี
                </span>
              </label>

              <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                exportScope === "filtered" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="exportScopeCard" 
                    checked={exportScope === "filtered"} 
                    onChange={() => setExportScope("filtered")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>ตามผลการค้นหา/ตัวกรองปัจจุบัน</span>
                </div>
                <span className="font-mono text-xs text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full font-bold">
                  {filteredUsers.length} บัญชี
                </span>
              </label>

              <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                exportScope === "monks" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="exportScopeCard" 
                    checked={exportScope === "monks"} 
                    onChange={() => setExportScope("monks")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>เฉพาะพระภิกษุ (อาจารย์/ผู้บริหาร)</span>
                </div>
                <span className="font-mono text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
                  {users.filter(u => u.monasticStatus === "ACTIVE_MONK").length} รูป
                </span>
              </label>

              <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                exportScope === "novices" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
              }`}>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="radio" 
                    name="exportScopeCard" 
                    checked={exportScope === "novices"} 
                    onChange={() => setExportScope("novices")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>เฉพาะศากยบุตรสามเณร</span>
                </div>
                <span className="font-mono text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
                  {users.filter(u => u.monasticStatus === "ACTIVE_SAMANERA").length} รูป
                </span>
              </label>
            </div>
          </div>

          {/* Thai Character Compatibility Guarantee */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs text-emerald-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>การรับประกันความเข้ากันได้ ๑๐๐% กับ Microsoft Excel:</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              ไฟล์ CSV ที่ส่งออกจากระบบนี้ ถูกฝังค่า <strong>UTF-8 Byte Order Mark (BOM)</strong> ที่จุดเริ่มต้นของไฟล์ ทำให้โปรแกรม Microsoft Excel, Google Sheets, LibreOffice และ Numbers บนทุกระบบปฏิบัติการ สามารถเปิดอ่านชื่อภาษาไทยและฉายาบาลีได้อย่างถูกต้องทันทีโดยไม่ต้องตั้งค่า Encoding เพิ่มเติม
            </p>
          </div>

          {exportSuccessMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{exportSuccessMessage}</span>
            </div>
          )}

          {/* Export CTA Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleExecuteExport}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl text-xs font-bold shadow-md shadow-slate-900/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์ CSV ทันที</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
