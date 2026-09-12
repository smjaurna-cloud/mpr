"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Scroll,
  FileText,
  Download,
  Upload,
  ExternalLink,
  Search,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Layers,
  Calendar,
  Briefcase,
  Edit3,
  FileJson,
  RotateCcw,
  BookMarked,
  Filter,
  Check
} from "lucide-react";
import Link from "next/link";
import {
  graduateCurricula as defaultCurricula,
  GraduateCurriculum,
  CourseItem
} from "@/data/graduateCurriculumData";
import CurriculumEditJsonModal from "@/components/curriculum/CurriculumEditJsonModal";

const LOCAL_STORAGE_KEY = "mvu_academic_programs_curricula_v1";

export default function AcademicProgramsPage() {
  // Curricula State with LocalStorage Persistence
  const [curricula, setCurricula] = useState<GraduateCurriculum[]>(defaultCurricula);
  const [selectedProgId, setSelectedProgId] = useState<string>("phd-tipitaka");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalTab, setModalTab] = useState<"edit" | "export" | "import">("edit");

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCurricula(parsed);
        }
      }
    } catch {
      // Use defaults
    }
  }, []);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Currently Selected Program
  const currentProgram: GraduateCurriculum = useMemo(() => {
    return curricula.find((c) => c.id === selectedProgId) || curricula[0];
  }, [curricula, selectedProgId]);

  // Statistics
  const stats = useMemo(() => {
    const totalPrograms = curricula.length;
    const totalCourses = curricula.reduce((sum, c) => sum + (c.courses?.length || 0), 0);
    const totalPdfPages = curricula.reduce((sum, c) => sum + (c.totalPages || 0), 0);
    return { totalPrograms, totalCourses, totalPdfPages };
  }, [curricula]);

  // Save Single Program Handler
  const handleSaveProgram = (updated: GraduateCurriculum) => {
    const newCurricula = curricula.map((c) => (c.id === updated.id ? updated : c));
    setCurricula(newCurricula);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCurricula));
    } catch {
      // Storage error
    }
    showNotice(`บันทึกการแก้ไขหลักสูตร "${updated.nameTh}" สำเร็จเรียบร้อยแล้ว`);
  };

  // Import Multiple Programs Handler
  const handleImportPrograms = (imported: GraduateCurriculum[]) => {
    setCurricula(imported);
    if (imported.length > 0) {
      setSelectedProgId(imported[0].id);
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(imported));
    } catch {
      // Storage error
    }
    showNotice(`นำเข้าข้อมูลหลักสูตรสำเร็จจำนวน ${imported.length} หลักสูตร`);
  };

  // Reset to Defaults
  const handleResetToDefault = () => {
    if (window.confirm("คุณต้องการรีเซ็ตข้อมูลหลักสูตรกลับเป็นค่าเริ่มต้นทางการของวิทยาลัยหรือไม่?")) {
      setCurricula(defaultCurricula);
      setSelectedProgId("phd-tipitaka");
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {
        // Ignore
      }
      showNotice("รีเซ็ตข้อมูลหลักสูตรกลับสู่ค่าเริ่มต้นของวิทยาลัยเรียบร้อยแล้ว");
    }
  };

  // Filter courses
  const filteredCourses = useMemo(() => {
    if (!currentProgram?.courses) return [];
    return currentProgram.courses.filter((course) => {
      if (courseCategoryFilter !== "ALL" && course.category !== courseCategoryFilter) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          course.code.toLowerCase().includes(q) ||
          course.nameTh.toLowerCase().includes(q) ||
          (course.nameEn && course.nameEn.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [currentProgram, courseCategoryFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <GraduationCap className="w-80 h-80" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-amber-100 text-xs font-medium mb-3 backdrop-blur-xs border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOD-15: สำนักวิชาการ & ระบบบริหารหลักสูตร มคอ.๒</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              ระบบจัดการหลักสูตรการศึกษา (Academic Programs)
            </h1>
            <p className="text-amber-100/90 text-sm max-w-2xl leading-relaxed">
              บริหารจัดการและปรับปรุงโครงสร้างหลักสูตรพุทธศาสตรดุษฎีบัณฑิต (พธ.ด.) และมหาบัณฑิต (พธ.ม.) 
              รองรับการส่งออกและนำเข้าข้อมูล JSON อัตโนมัติ พร้อมตรวจทาน มคอ.๒ ฉบับสมบูรณ์
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setModalTab("edit");
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl text-xs shadow-md transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>แก้ไขหลักสูตร</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModalTab("export");
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all"
            >
              <FileJson className="w-4 h-4" />
              <span>ส่งออก JSON</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModalTab("import");
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>นำเข้า JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Notification */}
      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
          >
            ปิด
          </button>
        </div>
      )}

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPrograms} หลักสูตร</div>
            <div className="text-xs text-amber-900 font-medium">ระดับบัณฑิตศึกษา (ป.เอก & ป.โท)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalCourses} รายวิชา</div>
            <div className="text-xs text-gray-600 font-medium">วิชาบังคับ, วิชาเอก และวิทยานิพนธ์</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPdfPages} หน้า</div>
            <div className="text-xs text-gray-600 font-medium">เอกสาร มคอ.๒ ฉบับสมบูรณ์</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">สภา มจร</div>
              <div className="text-xs text-gray-600 font-medium">อนุมัติใช้จัดการเรียนการสอน</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetToDefault}
            title="รีเซ็ตหลักสูตรกลับสู่ค่าเริ่มต้น"
            className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Program Selector Tabs */}
      <div className="bg-white rounded-xl border border-amber-200 p-2 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {curricula.map((prog) => {
            const isSelected = selectedProgId === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => {
                  setSelectedProgId(prog.id);
                  setCourseCategoryFilter("ALL");
                  setSearchQuery("");
                }}
                className={`p-3.5 rounded-xl text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                    : "bg-gray-50/70 hover:bg-amber-50 text-gray-700 border border-gray-100"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  <Scroll className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-amber-800/60 text-amber-100"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {prog.degreeLevel}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected ? "text-amber-200" : "text-gray-500"
                      }`}
                    >
                      {prog.totalCreditsDesc}
                    </span>
                  </div>
                  <div className="font-bold text-xs truncate">
                    {prog.degreeAbbrTh}
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? "text-amber-100/90" : "text-gray-500"
                    }`}
                  >
                    {prog.nameTh}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Program Master Detail */}
      {currentProgram && (
        <div className="bg-white rounded-2xl border border-amber-200/90 p-6 shadow-xs space-y-6">
          {/* Program Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {currentProgram.degreeLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {currentProgram.effectiveYear}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{currentProgram.councilApprovalSession}</span>
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {currentProgram.nameTh}
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                {currentProgram.nameEn}
              </p>
              <div className="text-xs text-amber-900 font-medium pt-1">
                ปริญญา: {currentProgram.degreeNameTh} ({currentProgram.degreeAbbrTh}) | {currentProgram.degreeNameEn} ({currentProgram.degreeAbbrEn})
              </div>
            </div>

            {/* Action Buttons: Edit, Export JSON, Import JSON, PDF */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalTab("edit");
                  setShowEditModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>แก้ไขหลักสูตร</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("export");
                  setShowEditModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                title="ส่งออกโครงสร้างเป็น JSON"
              >
                <FileJson className="w-4 h-4 text-amber-300" />
                <span>ส่งออก JSON</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("import");
                  setShowEditModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                title="นำเข้าโครงสร้างด้วย JSON"
              >
                <Upload className="w-4 h-4 text-teal-700" />
                <span>นำเข้า JSON</span>
              </button>

              {currentProgram.pdfDownloadUrl && (
                <a
                  href={currentProgram.pdfDownloadUrl}
                  download={currentProgram.pdfFileName}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium border border-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                  <span>มคอ.๒ PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* Philosophy, Objectives & PLOs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Philosophy & Objectives */}
            <div className="space-y-4">
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/60">
                <h3 className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>ปรัชญาของหลักสูตร</span>
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {currentProgram.philosophy}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>วัตถุประสงค์ของหลักสูตร</span>
                </h3>
                <ul className="space-y-1.5">
                  {currentProgram.objectives?.map((obj, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">{i + 1}.</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* PLOs and Career Paths */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ผลลัพธ์การเรียนรู้ที่คาดหวัง (PLOs)</span>
                </h3>
                <div className="space-y-2">
                  {currentProgram.plos?.map((plo, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-bold text-amber-900">{plo.code}: </span>
                      <span className="text-gray-700">{plo.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {currentProgram.careers?.map((car, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="truncate">{car}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Responsible Lecturers */}
          {currentProgram.responsibleLecturers && currentProgram.responsibleLecturers.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>คณาจารย์ผู้รับผิดชอบและผู้สอนประจำหลักสูตร</span>
                </h3>
                <span className="text-xs text-gray-500">
                  {currentProgram.responsibleLecturers.length} ท่าน
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentProgram.responsibleLecturers.map((lec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50/70 hover:bg-amber-50/50 rounded-xl border border-gray-200/80 transition-all flex items-start gap-3 text-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900">{lec.name}</div>
                      <div className="text-[11px] text-amber-900 font-medium">
                        {lec.position || "อาจารย์ประจำหลักสูตร"}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate mt-0.5">
                        {lec.degrees?.join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Catalog */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-amber-700" />
                  <span>บัญชีรายวิชาในหลักสูตร ({filteredCourses.length} จาก {currentProgram.courses?.length || 0} รายวิชา)</span>
                </h3>
                <p className="text-xs text-gray-500">
                  โครงสร้างวิชาเสริมพื้นฐาน วิชาบังคับ วิชาเอก และดุษฎีนิพนธ์/วิทยานิพนธ์
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="ค้นหารหัสวิชา หรือชื่อวิชา..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white"
                  />
                </div>

                <select
                  value={courseCategoryFilter}
                  onChange={(e) => setCourseCategoryFilter(e.target.value)}
                  className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                >
                  <option value="ALL">ทุกหมวดวิชา</option>
                  <option value="วิชาเสริมพื้นฐาน">วิชาเสริมพื้นฐาน</option>
                  <option value="วิชาบังคับ">วิชาบังคับ</option>
                  <option value="วิชาเอก/เฉพาะ">วิชาเอก/เฉพาะ</option>
                  <option value="วิทยานิพนธ์">วิทยานิพนธ์/ดุษฎีนิพนธ์</option>
                </select>
              </div>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                    <th className="py-3 px-3 w-12 text-center">#</th>
                    <th className="py-3 px-3 w-28">รหัสวิชา</th>
                    <th className="py-3 px-4">ชื่อรายวิชา (ไทย - อังกฤษ)</th>
                    <th className="py-3 px-3 w-28 text-center">หน่วยกิต</th>
                    <th className="py-3 px-3 w-32 text-center">หมวดวิชา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredCourses.map((course, idx) => (
                    <tr key={course.code + idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-2.5 px-3 text-center text-gray-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-900">{course.code}</td>
                      <td className="py-2.5 px-4">
                        <div className="font-semibold text-gray-900">{course.nameTh}</div>
                        {course.nameEn && (
                          <div className="text-[11px] text-gray-500 font-mono">{course.nameEn}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-gray-800">
                        {course.creditDesc || `${course.credits} หน่วยกิต`}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            course.category === "วิชาบังคับ"
                              ? "bg-amber-100 text-amber-900 font-semibold"
                              : course.category === "วิทยานิพนธ์"
                              ? "bg-purple-100 text-purple-900 font-semibold"
                              : course.category === "วิชาเสริมพื้นฐาน"
                              ? "bg-blue-50 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        ไม่พบรายวิชาที่ตรงตามเงื่อนไขการค้นหา
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Edit & JSON Import/Export Modal */}
      {currentProgram && (
        <CurriculumEditJsonModal
          key={`${currentProgram.id}-${modalTab}-${showEditModal}`}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          program={currentProgram}
          allPrograms={curricula}
          onSaveProgram={handleSaveProgram}
          onImportPrograms={handleImportPrograms}
          defaultTab={modalTab}
        />
      )}
    </div>
  );
}
