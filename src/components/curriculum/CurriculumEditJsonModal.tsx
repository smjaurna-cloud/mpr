"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  X,
  Download,
  Upload,
  FileJson,
  Check,
  CheckCircle2,
  AlertCircle,
  Copy,
  BookOpen,
  Edit3,
  Layers
} from "lucide-react";
import { GraduateCurriculum } from "@/data/graduateCurriculumData";

interface CurriculumEditJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: GraduateCurriculum;
  allPrograms?: GraduateCurriculum[];
  onSaveProgram: (updatedProgram: GraduateCurriculum) => void;
  onImportPrograms?: (importedPrograms: GraduateCurriculum[]) => void;
  defaultTab?: "edit" | "export" | "import";
}

interface ValidationResult {
  isValid: boolean;
  isMultiple: boolean;
  parsedData: GraduateCurriculum | GraduateCurriculum[] | null;
  summary?: {
    nameTh: string;
    degreeLevel: string;
    totalCourses: number;
    totalCredits: string;
    lecturersCount: number;
  };
  errors: string[];
}

export default function CurriculumEditJsonModal({
  isOpen,
  onClose,
  program,
  allPrograms = [],
  onSaveProgram,
  onImportPrograms,
  defaultTab = "edit"
}: CurriculumEditJsonModalProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "export" | "import">(defaultTab);

  // Form Edit State
  const [formData, setFormData] = useState<GraduateCurriculum>(program);
  const [objectivesText, setObjectivesText] = useState(program.objectives.join("\n"));
  const [careersText, setCareersText] = useState(program.careers.join("\n"));
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Export State
  const [exportScope, setExportScope] = useState<"single" | "all">("single");
  const [hasCopied, setHasCopied] = useState(false);

  // Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importJsonText, setImportJsonText] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  // Sync when modal opens or program changes
  useEffect(() => {
    if (isOpen) {
      setFormData(program);
      setObjectivesText(program.objectives.join("\n"));
      setCareersText(program.careers.join("\n"));
      setActiveTab(defaultTab);
      setValidationResult(null);
      setImportJsonText("");
      setSaveSuccessMsg(null);
      setImportNotice(null);
    }
  }, [isOpen, program, defaultTab]);

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // Form Edit Handlers
  // -------------------------------------------------------------
  const handleFieldChange = (field: keyof GraduateCurriculum, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GraduateCurriculum = {
      ...formData,
      objectives: objectivesText.split("\n").map((s) => s.trim()).filter(Boolean),
      careers: careersText.split("\n").map((s) => s.trim()).filter(Boolean)
    };
    onSaveProgram(updated);
    setSaveSuccessMsg("บันทึกการแก้ไขหลักสูตรเรียบร้อยแล้ว!");
    setTimeout(() => {
      setSaveSuccessMsg(null);
      onClose();
    }, 1200);
  };

  // -------------------------------------------------------------
  // JSON Export Handlers
  // -------------------------------------------------------------
  const getExportData = () => {
    if (exportScope === "all" && allPrograms.length > 0) {
      return allPrograms;
    }
    return formData;
  };

  const formattedExportJson = JSON.stringify(getExportData(), null, 2);

  const handleDownloadJson = () => {
    const dataStr = formattedExportJson;
    const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const filename =
      exportScope === "all"
        ? `หลักสูตรบัณฑิตศึกษา_ทั้งหมด_${new Date().toISOString().split("T")[0]}.json`
        : `หลักสูตร_${formData.id}_${new Date().toISOString().split("T")[0]}.json`;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(formattedExportJson);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // -------------------------------------------------------------
  // JSON Import & Validation Engine
  // -------------------------------------------------------------
  const validateJsonPayload = (rawText: string): ValidationResult => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      return {
        isValid: false,
        isMultiple: false,
        parsedData: null,
        errors: ["กรุณาระบุข้อมูล JSON หรือเลือกไฟล์เพื่อนำเข้า"]
      };
    }

    try {
      const parsed = JSON.parse(trimmed);
      const errors: string[] = [];

      if (Array.isArray(parsed)) {
        // Multiple curricula
        if (parsed.length === 0) {
          errors.push("อาร์เรย์ JSON ว่างเปล่า ไม่มีข้อมูลหลักสูตร");
        } else {
          parsed.forEach((item, idx) => {
            if (!item.nameTh) errors.push(`รายการที่ ${idx + 1}: ขาดฟิลด์ชื่อหลักสูตร (nameTh)`);
            if (!item.degreeLevel) errors.push(`รายการที่ ${idx + 1}: ขาดฟิลด์ระดับการศึกษา (degreeLevel)`);
            if (!item.courses || !Array.isArray(item.courses)) {
              errors.push(`รายการที่ ${idx + 1}: ขาดรายการรายวิชา (courses)`);
            }
          });
        }

        const first = parsed[0] as GraduateCurriculum;
        return {
          isValid: errors.length === 0,
          isMultiple: true,
          parsedData: parsed as GraduateCurriculum[],
          summary: first
            ? {
                nameTh: `${first.nameTh} และอื่นๆ รวม ${parsed.length} หลักสูตร`,
                degreeLevel: first.degreeLevel || "หลากหลาย",
                totalCourses: parsed.reduce((sum: number, p: GraduateCurriculum) => sum + (p.courses?.length || 0), 0),
                totalCredits: "หลายหลักสูตร",
                lecturersCount: parsed.reduce((sum: number, p: GraduateCurriculum) => sum + (p.responsibleLecturers?.length || 0), 0)
              }
            : undefined,
          errors
        };
      } else {
        // Single curriculum
        const item = parsed as Partial<GraduateCurriculum>;
        if (!item.nameTh) errors.push("ไม่พบฟิลด์ชื่อภาษาไทย (nameTh)");
        if (!item.degreeLevel) errors.push("ไม่พบฟิลด์ระดับการศึกษา (degreeLevel)");
        if (!item.philosophy) errors.push("คำเตือน: ไม่พบปรัชญาของหลักสูตร (philosophy)");
        if (!item.courses || !Array.isArray(item.courses)) {
          errors.push("ไม่พบฟิลด์รายการรายวิชา (courses)");
        }

        return {
          isValid: errors.filter((e) => !e.startsWith("คำเตือน")).length === 0,
          isMultiple: false,
          parsedData: item as GraduateCurriculum,
          summary: {
            nameTh: item.nameTh || "ไม่ระบุชื่อ",
            degreeLevel: item.degreeLevel || "ปริญญาเอก",
            totalCourses: Array.isArray(item.courses) ? item.courses.length : 0,
            totalCredits: item.totalCreditsDesc || "ตามโครงสร้าง",
            lecturersCount: Array.isArray(item.responsibleLecturers) ? item.responsibleLecturers.length : 0
          },
          errors
        };
      }
    } catch (err) {
      return {
        isValid: false,
        isMultiple: false,
        parsedData: null,
        errors: [`รูปแบบ JSON ไม่ถูกต้อง (Syntax Error): ${err instanceof Error ? err.message : String(err)}`]
      };
    }
  };

  const handleJsonTextChange = (text: string) => {
    setImportJsonText(text);
    if (text.trim()) {
      const res = validateJsonPayload(text);
      setValidationResult(res);
    } else {
      setValidationResult(null);
    }
  };

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setImportJsonText(content);
      const res = validateJsonPayload(content);
      setValidationResult(res);
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleApplyImport = () => {
    if (!validationResult || !validationResult.isValid || !validationResult.parsedData) return;

    if (validationResult.isMultiple) {
      const programsList = validationResult.parsedData as GraduateCurriculum[];
      if (onImportPrograms) {
        onImportPrograms(programsList);
      }
      const matched = programsList.find((p) => p.id === formData.id) || programsList[0];
      if (matched) {
        setFormData(matched);
        setObjectivesText((matched.objectives || []).join("\n"));
        setCareersText((matched.careers || []).join("\n"));
        onSaveProgram(matched);
      }
      setImportNotice(`นำเข้าข้อมูลสำเร็จแล้ว ${programsList.length} หลักสูตร!`);
    } else {
      const single = validationResult.parsedData as GraduateCurriculum;
      const completeProg: GraduateCurriculum = {
        ...formData,
        ...single,
        id: single.id || formData.id,
        objectives: single.objectives || formData.objectives,
        careers: single.careers || formData.careers,
        courses: single.courses || formData.courses,
        responsibleLecturers: single.responsibleLecturers || formData.responsibleLecturers
      };
      setFormData(completeProg);
      setObjectivesText((completeProg.objectives || []).join("\n"));
      setCareersText((completeProg.careers || []).join("\n"));
      onSaveProgram(completeProg);
      setImportNotice(`นำเข้าข้อมูลหลักสูตร "${completeProg.nameTh}" สำเร็จเรียบร้อยแล้ว!`);
    }

    setTimeout(() => {
      setImportNotice(null);
      setActiveTab("edit");
    }, 1500);
  };

  const handleDownloadSampleTemplate = () => {
    const sampleTemplate: GraduateCurriculum = {
      id: "phd-sample",
      degreeLevel: "ปริญญาเอก",
      programCode: "พธ.ด. ตัวอย่าง",
      nameTh: "หลักสูตรพุทธศาสตรดุษฎีบัณฑิต สาขาวิชาพระไตรปิฎกศึกษา (ตัวอย่าง)",
      nameEn: "Doctor of Buddhism Program in Tipitaka Studies (Sample)",
      degreeNameTh: "พุทธศาสตรดุษฎีบัณฑิต (พระไตรปิฎกศึกษา)",
      degreeNameEn: "Doctor of Buddhism (Tipitaka Studies)",
      degreeAbbrTh: "พธ.ด. (พระไตรปิฎกศึกษา)",
      degreeAbbrEn: "D.B. (Tipitaka Studies)",
      effectiveYear: "หลักสูตรใหม่ พ.ศ. ๒๕๖๙",
      approvalDate: "๑ กันยายน พ.ศ. ๒๕๖๙",
      councilApprovalSession: "สภามหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ครั้งที่ ๑/๒๕๖๙",
      totalCreditsDesc: "๔๘ หน่วยกิต (ตลอดหลักสูตร)",
      philosophy: "เชี่ยวชาญพระไตรปิฎก สืบทอดพระพุทธศาสนา ประยุกต์ใช้เพื่อการศึกษาและพัฒนาสังคม",
      objectives: [
        "เพื่อผลิตดุษฎีบัณฑิตที่มีความรู้ความเชี่ยวชาญแตกฉานในพระไตรปิฎก",
        "เพื่อผลิตงานวิจัยและองค์ความรู้ใหม่ทางพุทธศาสตร์สู่สากล"
      ],
      plos: [
        {
          code: "PLO ๑",
          description: "รอบรู้พระไตรปิฎกและคัมภีร์ทางพระพุทธศาสนาอย่างแตกฉาน"
        }
      ],
      careers: [
        "อาจารย์ประจำสาขาวิชาพระพุทธศาสนาในระดับอุดมศึกษา",
        "นักวิจัยและผู้เชี่ยวชาญพระไตรปิฎก"
      ],
      plans: [
        {
          planCode: "แผน ๑.๑",
          planName: "แบบทำเฉพาะวิทยานิพนธ์",
          totalCredits: 48,
          courseworkCredits: 0,
          thesisCredits: 48,
          description: "สำหรับผู้สำเร็จการศึกษาระดับปริญญาโทสาขาตรง"
        }
      ],
      responsibleLecturers: [
        {
          name: "พระธรรมวชิราจารย์, รศ.ดร.",
          academicTitle: "รองศาสตราจารย์ ดร.",
          degrees: ["ป.ธ.๙", "พธ.ด. (พระพุทธศาสนา)"],
          position: "ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย"
        }
      ],
      courses: [
        {
          code: "TIP-601",
          nameTh: "ระเบียบวิธีวิจัยขั้นสูงทางพระพุทธศาสนา",
          nameEn: "Advanced Research Methodology in Buddhism",
          credits: 3,
          creditDesc: "๓ (๓-๐-๖)",
          category: "วิชาบังคับ"
        },
        {
          code: "TIP-699",
          nameTh: "ดุษฎีนิพนธ์",
          nameEn: "Doctoral Dissertation",
          credits: 36,
          creditDesc: "๓๖ หน่วยกิต",
          category: "วิทยานิพนธ์"
        }
      ],
      pdfDownloadUrl: "/curriculum/sample.pdf",
      pdfFileName: "sample_curriculum.pdf",
      totalPages: 120
    };

    const blob = new Blob([JSON.stringify(sampleTemplate, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "แม่แบบ_หลักสูตร_มคอ2_วส_มจร.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-amber-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <GraduationCap className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white">แก้ไขหลักสูตร (Edit Academic Program)</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/40 text-amber-100 border border-amber-400/30">
                  {formData.programCode || formData.id}
                </span>
              </div>
              <p className="text-xs text-amber-200/90 font-light">
                ปรับปรุงข้อมูลรายละเอียด มคอ.๒ พร้อมระบบส่งออกและนำเข้าไฟล์โครงสร้าง JSON
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Tabs Bar */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-200 bg-gray-50/70 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-1.5 pb-3 px-3 transition-all border-b-2 ${
              activeTab === "edit"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-600" />
            <span>แก้ไขฟอร์มหลักสูตร</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("export")}
            className={`inline-flex items-center gap-1.5 pb-3 px-3 transition-all border-b-2 ${
              activeTab === "export"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>ส่งออก JSON (Export)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("import")}
            className={`inline-flex items-center gap-1.5 pb-3 px-3 transition-all border-b-2 ${
              activeTab === "import"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Upload className="w-4 h-4 text-amber-600" />
            <span>นำเข้า JSON (Import)</span>
          </button>
        </div>

        {/* Global Notifications inside modal */}
        {saveSuccessMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {importNotice && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{importNotice}</span>
          </div>
        )}

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* ============================================================== */}
          {/* TAB 1: FORM EDIT */}
          {/* ============================================================== */}
          {activeTab === "edit" && (
            <form onSubmit={handleSaveForm} className="space-y-5">
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>ข้อมูลทั่วไปของหลักสูตร</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">
                      ชื่อหลักสูตร (ภาษาไทย) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameTh}
                      onChange={(e) => handleFieldChange("nameTh", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ระดับการศึกษา *
                    </label>
                    <select
                      value={formData.degreeLevel}
                      onChange={(e) =>
                        handleFieldChange("degreeLevel", e.target.value as "ปริญญาเอก" | "ปริญญาโท")
                      }
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                    >
                      <option value="ปริญญาเอก">ปริญญาเอก (Ph.D.)</option>
                      <option value="ปริญญาโท">ปริญญาโท (M.A.)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ชื่อหลักสูตร (ภาษาอังกฤษ) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameEn}
                      onChange={(e) => handleFieldChange("nameEn", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      รหัสหลักสูตร / คำย่อ
                    </label>
                    <input
                      type="text"
                      value={formData.programCode}
                      onChange={(e) => handleFieldChange("programCode", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ชื่อปริญญาเต็ม (ไทย)
                    </label>
                    <input
                      type="text"
                      value={formData.degreeNameTh}
                      onChange={(e) => handleFieldChange("degreeNameTh", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      ชื่อปริญญาเต็ม (อังกฤษ)
                    </label>
                    <input
                      type="text"
                      value={formData.degreeNameEn}
                      onChange={(e) => handleFieldChange("degreeNameEn", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      อักษรย่อปริญญา (ไทย)
                    </label>
                    <input
                      type="text"
                      value={formData.degreeAbbrTh}
                      onChange={(e) => handleFieldChange("degreeAbbrTh", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      อักษรย่อปริญญา (อังกฤษ)
                    </label>
                    <input
                      type="text"
                      value={formData.degreeAbbrEn}
                      onChange={(e) => handleFieldChange("degreeAbbrEn", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      จำนวนหน่วยกิตรวม
                    </label>
                    <input
                      type="text"
                      value={formData.totalCreditsDesc}
                      onChange={(e) => handleFieldChange("totalCreditsDesc", e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Council Approval and Effective Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    การอนุมัติสภา มจร (สภาวิทยาลัย)
                  </label>
                  <input
                    type="text"
                    value={formData.councilApprovalSession}
                    onChange={(e) => handleFieldChange("councilApprovalSession", e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    สถานะปีที่เริ่มใช้ (Effective Year)
                  </label>
                  <input
                    type="text"
                    value={formData.effectiveYear}
                    onChange={(e) => handleFieldChange("effectiveYear", e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Philosophy & Objectives */}
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    ปรัชญาของหลักสูตร (Philosophy)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.philosophy}
                    onChange={(e) => handleFieldChange("philosophy", e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    วัตถุประสงค์ของหลักสูตร (๑ บรรทัดต่อ ๑ ข้อ)
                  </label>
                  <textarea
                    rows={3}
                    value={objectivesText}
                    onChange={(e) => setObjectivesText(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา (๑ บรรทัดต่อ ๑ ข้อ)
                  </label>
                  <textarea
                    rows={3}
                    value={careersText}
                    onChange={(e) => setCareersText(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs leading-relaxed font-sans"
                  />
                </div>
              </div>

              {/* Course Catalog Summary */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      รายวิชาในหลักสูตร: {formData.courses?.length || 0} รายวิชา
                    </div>
                    <div className="text-[11px] text-slate-500">
                      คณาจารย์ผู้รับผิดชอบ {formData.responsibleLecturers?.length || 0} ท่าน | โครงสร้างแผนการศึกษา {formData.plans?.length || 0} แผน
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("export")}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <FileJson className="w-3.5 h-3.5 text-amber-600" />
                  <span>ดูโครงสร้าง JSON รายวิชา</span>
                </button>
              </div>

              {/* Form Bottom Actions */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl shadow-sm"
                >
                  บันทึกการแก้ไขหลักสูตร
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 2: EXPORT JSON */}
          {/* ============================================================== */}
          {activeTab === "export" && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-amber-700" />
                    <span>ส่งออกโครงสร้างหลักสูตรเป็นไฟล์ JSON (Export Curriculum JSON)</span>
                  </h3>
                  <p className="text-gray-600 text-xs mt-1">
                    รองรับการสำรองข้อมูล การแลกเปลี่ยนข้อมูลระหว่างระบบ และการนำไปประมวลผลต่อ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-gray-600">ขอบเขต:</label>
                  <select
                    value={exportScope}
                    onChange={(e) => setExportScope(e.target.value as "single" | "all")}
                    className="p-2 bg-white border border-gray-300 rounded-xl text-xs font-medium"
                  >
                    <option value="single">เฉพาะหลักสูตรปัจจุบัน ({formData.degreeAbbrTh})</option>
                    <option value="all">
                      ทุกหลักสูตรในระบบ ({allPrograms.length || 3} หลักสูตร)
                    </option>
                  </select>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 font-mono">
                  {exportScope === "all"
                    ? `Dataset: Array<GraduateCurriculum> (${allPrograms.length} items)`
                    : `Dataset: GraduateCurriculum (${formData.courses?.length || 0} courses)`}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">คัดลอกสำเร็จ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-600" />
                        <span>คัดลอก JSON</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ดาวน์โหลดไฟล์ .json</span>
                  </button>
                </div>
              </div>

              {/* JSON Code Viewer */}
              <div className="relative rounded-xl border border-gray-800 bg-slate-950 p-4 text-gray-100 font-mono text-[11px] overflow-x-auto max-h-[420px] shadow-inner">
                <pre className="whitespace-pre">{formattedExportJson}</pre>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: IMPORT JSON */}
          {/* ============================================================== */}
          {activeTab === "import" && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4 text-teal-700" />
                    <span>นำเข้าโครงสร้างหลักสูตรด้วย JSON (Import Curriculum JSON)</span>
                  </h3>
                  <p className="text-gray-600 text-xs mt-1">
                    อัปโหลดไฟล์ `.json` หรือวางโค้ด JSON เพื่ออัปเดตข้อมูลโครงสร้างหลักสูตร รายวิชา และคณาจารย์
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadSampleTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 rounded-xl text-xs font-semibold shadow-xs shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลดแม่แบบ JSON</span>
                </button>
              </div>

              {/* Dropzone File Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl p-6 text-center bg-gray-50/60 hover:bg-amber-50/40 transition-colors cursor-pointer space-y-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelected(file);
                  }}
                />
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <FileJson className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 text-xs">คลิกเพื่อเลือกไฟล์ .json</span>
                  <span className="text-gray-500 text-xs"> หรือลากไฟล์มาวางที่นี่</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  รองรับไฟล์ JSON มาตรฐาน (UTF-8) ที่มีโครงสร้าง GraduateCurriculum
                </p>
              </div>

              {/* Paste JSON Raw Text */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-700">หรือวางโค้ด JSON โดยตรง:</label>
                  {importJsonText && (
                    <button
                      type="button"
                      onClick={() => handleJsonTextChange("")}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      ล้างข้อความ
                    </button>
                  )}
                </div>
                <textarea
                  rows={6}
                  placeholder={`{\n  "nameTh": "หลักสูตรพุทธศาสตรดุษฎีบัณฑิต...",\n  "degreeLevel": "ปริญญาเอก",\n  "courses": [...]\n}`}
                  value={importJsonText}
                  onChange={(e) => handleJsonTextChange(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-amber-200 border border-slate-700 rounded-xl text-xs font-mono leading-relaxed focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              {/* Validation Result Preview Card */}
              {validationResult && (
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    validationResult.isValid
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-rose-50 border-rose-300 text-rose-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {validationResult.isValid ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>โครงสร้าง JSON ถูกต้องสมบูรณ์ (Validation Passed)</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>พบข้อผิดพลาดในโครงสร้าง JSON (Validation Failed)</span>
                      </>
                    )}
                  </div>

                  {validationResult.summary && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-200/60 text-[11px]">
                      <div>
                        <span className="text-gray-500 block">ชื่อหลักสูตร:</span>
                        <span className="font-semibold text-gray-900 truncate block">
                          {validationResult.summary.nameTh}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">ระดับการศึกษา:</span>
                        <span className="font-semibold text-gray-900">
                          {validationResult.summary.degreeLevel}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">จำนวนรายวิชา:</span>
                        <span className="font-bold text-emerald-700">
                          {validationResult.summary.totalCourses} รายวิชา
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">คณาจารย์:</span>
                        <span className="font-semibold text-gray-900">
                          {validationResult.summary.lecturersCount} ท่าน
                        </span>
                      </div>
                    </div>
                  )}

                  {validationResult.errors.length > 0 && (
                    <div className="pt-2 space-y-1">
                      {validationResult.errors.map((err, i) => (
                        <p
                          key={i}
                          className={`text-[11px] ${
                            err.startsWith("คำเตือน") ? "text-amber-700" : "text-rose-700"
                          }`}
                        >
                          • {err}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setImportJsonText("");
                    setValidationResult(null);
                  }}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-xl font-semibold text-gray-700"
                >
                  รีเซ็ต
                </button>

                <button
                  type="button"
                  disabled={!validationResult || !validationResult.isValid}
                  onClick={handleApplyImport}
                  className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-sm inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>บันทึกนำเข้าโครงสร้างหลักสูตร (Apply JSON)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
