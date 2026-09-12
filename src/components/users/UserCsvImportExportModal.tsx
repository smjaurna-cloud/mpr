"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileText, 
  HelpCircle, 
  RefreshCw, 
  Table, 
  Filter, 
  Check, 
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import { SystemUser, SystemRole, MonasticStatus, AccountStatus } from "@/data/mockData";

interface UserCsvImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: SystemUser[];
  filteredUsers: SystemUser[];
  onImportUsers: (newUsers: SystemUser[]) => void;
  defaultMode?: "import" | "export";
}

interface ParsedRow {
  index: number;
  data: Partial<SystemUser>;
  isValid: boolean;
  errors: string[];
  isDuplicate: boolean;
}

export default function UserCsvImportExportModal({
  isOpen,
  onClose,
  users,
  filteredUsers,
  onImportUsers,
  defaultMode = "import"
}: UserCsvImportExportModalProps) {
  const [activeTab, setActiveTab] = useState<"import" | "export">(defaultMode);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultMode);
    }
  }, [isOpen, defaultMode]);
  
  // Export State
  const [exportScope, setExportScope] = useState<"all" | "filtered" | "monks" | "novices" | "laypersons">("all");
  const [includePasswords, setIncludePasswords] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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

  // -------------------------------------------------------------
  // Map Role String to SystemRole
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Map Monastic Status
  // -------------------------------------------------------------
  const mapMonasticStatus = (title: string, statusStr: string): MonasticStatus => {
    const s = (statusStr || "").toUpperCase();
    if (s.includes("DISROBE") || s.includes("ลาสิกขา")) return "DISROBED";
    if (s.includes("SAMANERA") || title.includes("สามเณร")) return "ACTIVE_SAMANERA";
    if (s.includes("MONK") || title.includes("พระ")) return "ACTIVE_MONK";
    if (s.includes("LAY") || s.includes("คฤหัสถ์") || title.includes("นาย") || title.includes("นาง")) return "LAYPERSON";
    return "LAYPERSON";
  };

  // -------------------------------------------------------------
  // File Upload & Parser
  // -------------------------------------------------------------
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
        // Strip BOM if present
        if (content.charCodeAt(0) === 0xFEFF) {
          content = content.slice(1);
        }

        const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          setParseError("ไฟล์ CSV ต้องมีหัวตาราง (Header) และข้อมูลอย่างน้อย ๑ แถว");
          setIsParsing(false);
          return;
        }

        const headers = parseCsvLine(lines[0]).map(h => h.replace(/^["']|["']$/g, "").trim().toLowerCase());
        
        // Find Column Indexes
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

          // Determine title and full name
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
        setParseError(`เกิดข้อผิดพลาดในการอ่านไฟล์ CSV: ${err?.message || "รูปแบบข้อมูลไม่ถูกต้อง"}`);
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      setParseError("ไม่สามารถเปิดอ่านไฟล์ที่เลือกได้ กรุณาลองใหม่อีกครั้ง");
      setIsParsing(false);
    };

    reader.readAsText(file, "UTF-8");
  };

  // -------------------------------------------------------------
  // Confirm Import
  // -------------------------------------------------------------
  const handleConfirmImport = () => {
    const validUsers = parsedRows.filter(r => r.isValid).map(r => r.data as SystemUser);
    if (validUsers.length === 0) return;

    onImportUsers(validUsers);
    setImportSuccessMessage(`นำเข้าผู้ใช้งานใหม่สำเร็จจำนวน ${validUsers.length} บัญชีเรียบร้อยแล้ว!`);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // -------------------------------------------------------------
  // Download Template
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Export Handler
  // -------------------------------------------------------------
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

    setExportSuccessMessage(`ส่งออกไฟล์ CSV สำเร็จจำนวน ${dataset.length} รายการ (เปิดด้วย Excel ได้ทันที ภาษาไทยสมบูรณ์)`);
    setTimeout(() => setExportSuccessMessage(null), 4000);
  };

  const validCount = parsedRows.filter(r => r.isValid).length;
  const duplicateCount = parsedRows.filter(r => r.isDuplicate).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-amber-200/80 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/30 border border-amber-400/40 flex items-center justify-center text-amber-200">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>ศูนย์นำเข้า & ส่งออกข้อมูลผู้ใช้งาน (CSV Manager)</span>
              </h2>
              <p className="text-[11px] text-amber-200/80">
                รองรับมาตรฐาน UTF-8 BOM สำหรับ Microsoft Excel และ Google Sheets
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("import")}
            className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "import"
                ? "border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-amber-600" />
            <span>๑. นำเข้าข้อมูลผู้ใช้ (Import CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("export")}
            className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "export"
                ? "border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>๒. ส่งออกข้อมูลผู้ใช้ (Export CSV)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">

          {/* ========================================================= */}
          {/* TAB 1: IMPORT CSV */}
          {/* ========================================================= */}
          {activeTab === "import" && (
            <div className="space-y-4">
              
              {/* Template Download & Instruction Banner */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950 block">คำแนะนำในการเตรียมไฟล์นำเข้า:</span>
                    <p className="text-[11px] text-amber-900/80 leading-relaxed">
                      โปรดใช้ไฟล์นามสกุล <code>.csv</code> บันทึกด้วยรหัสภาษา UTF-8 โดยสามารถดาวน์โหลดแบบฟอร์มตัวอย่างที่มีคอลัมน์มาตรฐานครบถ้วนไปใช้งานได้ทันที
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadSampleTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-100/60 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold shadow-2xs transition-colors shrink-0 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                  <span>ดาวน์โหลดแม่แบบ CSV</span>
                </button>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl bg-amber-50/20 hover:bg-amber-50/40 text-center cursor-pointer transition-all space-y-2 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-sm">
                    {selectedFile ? selectedFile.name : "คลิกเพื่อเลือกไฟล์ CSV หรือลากไฟล์มาวางที่นี่"}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {selectedFile 
                      ? `ขนาดไฟล์: ${(selectedFile.size / 1024).toFixed(1)} KB • คลิกเพื่อเปลี่ยนไฟล์`
                      : "รองรับไฟล์ .csv (สูงสุด ๑๐ MB) รองรับชื่อภาษาไทยและฉายาบาลี"}
                  </p>
                </div>
              </div>

              {parseError && (
                <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-rose-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}

              {/* Parsing Progress / Result Preview */}
              {parsedRows.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-slate-900 text-xs">
                        ตรวจสอบตัวอย่างข้อมูล ({parsedRows.length} รายการที่พบ)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                        ✓ ถูกต้อง {validCount} รายการ
                      </span>
                      {duplicateCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                          ⚠ ซ้ำเดิม {duplicateCount} รายการ
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-56">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                        <tr>
                          <th className="p-2 border-b border-slate-200 w-12">แถว</th>
                          <th className="p-2 border-b border-slate-200">ชื่อ-นามสกุล</th>
                          <th className="p-2 border-b border-slate-200">ฉายา/คำนำหน้า</th>
                          <th className="p-2 border-b border-slate-200">บทบาท</th>
                          <th className="p-2 border-b border-slate-200">สังกัด</th>
                          <th className="p-2 border-b border-slate-200">อีเมล</th>
                          <th className="p-2 border-b border-slate-200 text-center">สถานะ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {parsedRows.slice(0, 15).map((row) => (
                          <tr key={row.index} className={row.isValid ? "hover:bg-slate-50" : "bg-rose-50/50"}>
                            <td className="p-2 text-slate-400 font-mono">{row.index}</td>
                            <td className="p-2 font-medium text-slate-900">{row.data.fullName || "-"}</td>
                            <td className="p-2 text-slate-600">{row.data.paliName || row.data.title || "-"}</td>
                            <td className="p-2">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                                {row.data.role}
                              </span>
                            </td>
                            <td className="p-2 text-slate-600">{row.data.department}</td>
                            <td className="p-2 text-slate-600 font-mono text-[10px]">{row.data.email}</td>
                            <td className="p-2 text-center">
                              {row.isValid ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                                  <Check className="w-3 h-3" />
                                  <span>พร้อม</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-[10px]" title={row.errors.join(", ")}>
                                  <AlertCircle className="w-3 h-3" />
                                  <span>ข้อมูลไม่ครบ</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {parsedRows.length > 15 && (
                    <p className="text-[10px] text-slate-400 text-center italic">
                      แสดงตัวอย่าง ๑๕ แถวแรกจากทั้งหมด {parsedRows.length} รายการ
                    </p>
                  )}
                </div>
              )}

              {importSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{importSuccessMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: EXPORT CSV */}
          {/* ========================================================= */}
          {activeTab === "export" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs">เลือกขอบเขตข้อมูลที่ต้องการส่งออก (Export Scope):</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    exportScope === "all" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="exportScope" 
                        checked={exportScope === "all"} 
                        onChange={() => setExportScope("all")}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>ผู้ใช้งานทั้งหมดในระบบ</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {users.length} รายการ
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    exportScope === "filtered" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="exportScope" 
                        checked={exportScope === "filtered"} 
                        onChange={() => setExportScope("filtered")}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>ผลการค้นหา/ตัวกรองปัจจุบัน</span>
                    </div>
                    <span className="font-mono text-[11px] text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                      {filteredUsers.length} รายการ
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    exportScope === "monks" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="exportScope" 
                        checked={exportScope === "monks"} 
                        onChange={() => setExportScope("monks")}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>เฉพาะพระภิกษุ (อาจารย์/ผู้บริหาร)</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {users.filter(u => u.monasticStatus === "ACTIVE_MONK").length} รูป
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    exportScope === "novices" ? "border-amber-600 bg-amber-50/50 font-bold text-amber-950" : "border-slate-200 bg-white"
                  }`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="exportScope" 
                        checked={exportScope === "novices"} 
                        onChange={() => setExportScope("novices")}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>เฉพาะศากยบุตรสามเณร</span>
                    </div>
                    <span className="font-mono text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {users.filter(u => u.monasticStatus === "ACTIVE_SAMANERA").length} รูป
                    </span>
                  </label>
                </div>
              </div>

              {/* Encoding & Compatibility Box */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-[11px] text-emerald-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ระบบมาตรฐานภาษาไทย (UTF-8 with BOM):</span>
                </div>
                <p className="leading-relaxed">
                  ไฟล์ที่ส่งออกจะใส่รหัสพิเศษ UTF-8 BOM ที่หัวไฟล์โดยอัตโนมัติ ทำให้เมื่อเปิดด้วย <strong>Microsoft Excel</strong> ในระบบปฏิบัติการ Windows หรือ macOS ข้อความภาษาไทยและฉายาบาลีจะไม่เป็นภาษาต่างดาวหรือตัวอักษรเพี้ยน 100%
                </p>
              </div>

              {exportSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{exportSuccessMessage}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            ปิดหน้าต่าง
          </button>

          {activeTab === "import" ? (
            <button
              type="button"
              disabled={validCount === 0}
              onClick={handleConfirmImport}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>ยืนยันนำเข้าผู้ใช้ ({validCount} รายการ)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExecuteExport}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl text-xs font-bold shadow-md shadow-slate-900/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์ CSV ทันที</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
