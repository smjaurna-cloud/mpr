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
  Printer,
  ChevronRight,
  BookMarked,
  Globe,
  Edit3,
  FileJson
} from "lucide-react";
import Link from "next/link";
import {
  graduateCurricula as defaultCurricula,
  getCurriculumStats,
  GraduateCurriculum,
  CourseItem
} from "@/data/graduateCurriculumData";
import { facultyPublications } from "@/data/facultyPublicationsData";
import CurriculumEditJsonModal from "@/components/curriculum/CurriculumEditJsonModal";

const LOCAL_STORAGE_KEY = "mvu_academic_programs_curricula_v1";

export default function GraduateCurriculumPage() {
  const [curricula, setCurricula] = useState<GraduateCurriculum[]>(defaultCurricula);
  const [selectedProgId, setSelectedProgId] = useState<string>("phd-tipitaka");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalTab, setModalTab] = useState<"edit" | "export" | "import">("edit");

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

  const stats = useMemo(() => {
    const totalPrograms = curricula.length;
    const totalCourses = curricula.reduce((sum, c) => sum + (c.courses?.length || 0), 0);
    const totalPdfPages = curricula.reduce((sum, c) => sum + (c.totalPages || 0), 0);
    return { totalPrograms, totalCourses, totalPdfPages };
  }, [curricula]);

  const currentProgram: GraduateCurriculum = useMemo(() => {
    return curricula.find((c) => c.id === selectedProgId) || curricula[0];
  }, [curricula, selectedProgId]);

  // Filter courses
  const filteredCourses = useMemo(() => {
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
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-amber-100 text-xs font-medium mb-3 backdrop-blur-xs border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>สำนักวิชาการ & บัณฑิตศึกษา | วส. มจร</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            หลักสูตรระดับบัณฑิตศึกษา มคอ.๒ (TQF 2 Master & Doctoral)
          </h1>
          <p className="text-amber-100/90 text-sm max-w-3xl leading-relaxed">
            คลังข้อมูลหลักสูตรพุทธศาสตรดุษฎีบัณฑิต (พธ.ด.) และพุทธศาสตรมหาบัณฑิต (พธ.ม.) สาขาวิชาพระไตรปิฎกเถรวาท 
            และสาขาวิชาพระอภิธรรมปิฎก ตามกรอบมาตรฐานคุณวุฒิระดับอุดมศึกษาแห่งชาติ พร้อมโครงสร้างรายวิชาและเอกสาร มคอ.๒ ฉบับเต็ม
          </p>
        </div>
      </div>

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
            <div className="text-xs text-gray-600 font-medium">เอกสาร มคอ.๒ ฉบับสมบูรณ์ ๓ เล่ม</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">สภา มจร</div>
            <div className="text-xs text-gray-600 font-medium">อนุมัติใช้จัดการเรียนการสอน</div>
          </div>
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

          {/* Download, Edit & JSON Action Buttons */}
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

            <a
              href={currentProgram.pdfDownloadUrl}
              download={currentProgram.pdfFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium border border-gray-200 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-500" />
              <span>มคอ.๒ (PDF)</span>
            </a>
            <a
              href={currentProgram.pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium border border-gray-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
              <span>เปิดอ่าน</span>
            </a>
          </div>
        </div>

        {/* Philosophy, Objectives & PLOs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Philosophy & Objectives */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <BookMarked className="w-4 h-4 text-amber-700" />
                <span>ปรัชญาของหลักสูตร</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed italic">
                "{currentProgram.philosophy}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>วัตถุประสงค์ของหลักสูตร</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {currentProgram.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expected Learning Outcomes (PLOs) & Careers */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                <Award className="w-4 h-4 text-indigo-700" />
                <span>ผลลัพธ์การเรียนรู้ที่คาดหวัง (Program Learning Outcomes: PLOs)</span>
              </div>
              <div className="space-y-2 text-xs">
                {currentProgram.plos.map((plo, idx) => (
                  <div key={idx} className="bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                    <span className="font-bold text-indigo-800">{plo.code}: </span>
                    <span className="text-gray-700">{plo.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-xs">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <span>อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {currentProgram.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 text-[11px]"
                  >
                    • {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Study Plans */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>โครงสร้างและแผนการศึกษา</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProgram.plans.map((plan, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-amber-200 bg-white shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
                    {plan.planCode}
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    รวม {plan.totalCredits} หน่วยกิต
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-800">{plan.planName}</div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {plan.description}
                </p>
                <div className="flex items-center gap-3 pt-2 text-[11px] text-gray-500 border-t border-gray-100">
                  <span>รายวิชา: <strong>{plan.courseworkCredits}</strong> นก.</span>
                  <span>วิทยานิพนธ์/สารนิพนธ์: <strong>{plan.thesisCredits}</strong> นก.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible Faculty */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Users className="w-4 h-4 text-amber-600" />
              <span>คณาจารย์ผู้รับผิดชอบและผู้สอนประจำหลักสูตร</span>
              <span className="text-xs font-normal text-gray-500">
                ({currentProgram.responsibleLecturers.length} รูป/ท่าน)
              </span>
            </div>
            <div className="text-[11px] text-amber-800 font-medium">
              เอกสารประวัติจัดเก็บที่ <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">docs/faculty/</code>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            {currentProgram.responsibleLecturers.map((lec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-amber-200/80 bg-gradient-to-b from-white to-amber-50/20 shadow-2xs space-y-2 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    {lec.position || "อาจารย์ประจำหลักสูตร"}
                  </span>
                  {lec.cvUrl && (
                    <a
                      href={lec.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 hover:text-amber-900 hover:underline bg-white px-2 py-0.5 rounded border border-amber-200 shadow-2xs"
                    >
                      <FileText className="w-3 h-3 text-amber-600" />
                      <span>ดูประวัติ (PDF)</span>
                    </a>
                  )}
                </div>
                <div className="font-bold text-gray-900 text-xs leading-snug">{lec.name}</div>
                <div className="text-[11px] text-amber-800 font-medium">
                  {lec.academicTitle}
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                  {lec.degrees.join(" • ")}
                </div>
                {lec.specialization && (
                  <div className="pt-1.5 text-[10px] text-gray-500 border-t border-gray-100">
                    <span className="font-semibold text-gray-700">เชี่ยวชาญ:</span> {lec.specialization}
                  </div>
                )}
                {lec.contact && (
                  <div className="text-[10px] text-gray-500">
                    <span className="font-semibold text-gray-700">ติดต่อ:</span> {lec.contact}
                  </div>
                )}
                {(() => {
                  const cleanName = lec.name.replace(/^(อาจารย์|ดร\.|พระธรรม|พระมหา|รศ\.|ผศ\.)\s*/g, "").trim();
                  const pubs = facultyPublications.filter(p => p.facultyPersonnel.includes(cleanName) || p.authors.some(a => a.includes(cleanName)));
                  if (pubs.length === 0) return null;
                  return (
                    <div className="pt-2 border-t border-amber-100/80 flex items-center justify-between">
                      <span className="text-[10px] text-purple-900 font-semibold flex items-center gap-1">
                        <Globe className="w-3 h-3 text-purple-600" />
                        <span>{pubs.length} บทความ TCI / วารสาร</span>
                      </span>
                      <Link
                        href="/research-qa"
                        className="text-[10px] font-bold text-purple-700 hover:text-purple-900 hover:underline"
                      >
                        สืบค้น TCI-ThaiJO &rarr;
                      </Link>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>

        {/* Course Directory */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>บัญชีรายวิชาในหลักสูตร</span>
              <span className="text-xs font-normal text-gray-500">
                ({filteredCourses.length} รายวิชา)
              </span>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 text-xs">
                <button
                  onClick={() => setCourseCategoryFilter("ALL")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    courseCategoryFilter === "ALL"
                      ? "bg-white font-semibold text-gray-900 shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  ทั้งหมด
                </button>
                <button
                  onClick={() => setCourseCategoryFilter("วิชาบังคับ")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    courseCategoryFilter === "วิชาบังคับ"
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  วิชาบังคับ
                </button>
                <button
                  onClick={() => setCourseCategoryFilter("วิชาเอก/เฉพาะ")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    courseCategoryFilter === "วิชาเอก/เฉพาะ"
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  วิชาเอก/เฉพาะ
                </button>
                <button
                  onClick={() => setCourseCategoryFilter("วิทยานิพนธ์")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    courseCategoryFilter === "วิทยานิพนธ์"
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  วิทยานิพนธ์
                </button>
              </div>

              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหารหัสวิชา, ชื่อวิชา..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-gray-600" />
                <span>พิมพ์</span>
              </button>
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/70 border-b border-amber-200 text-amber-900 font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5 w-24">รหัสวิชา</th>
                  <th className="py-2.5 px-3.5 w-32">หมวดวิชา</th>
                  <th className="py-2.5 px-3.5">ชื่อรายวิชา (ภาษาไทย / อังกฤษ)</th>
                  <th className="py-2.5 px-3.5 w-24 text-center">หน่วยกิต</th>
                  <th className="py-2.5 px-3.5">คำอธิบายสังเขป</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredCourses.map((course) => (
                  <tr key={course.code} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-2.5 px-3.5 font-mono font-bold text-amber-900">
                      {course.code}
                    </td>
                    <td className="py-2.5 px-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          course.category === "วิชาบังคับ"
                            ? "bg-amber-100 text-amber-800"
                            : course.category === "วิชาเอก/เฉพาะ"
                            ? "bg-emerald-100 text-emerald-800"
                            : course.category === "วิทยานิพนธ์"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {course.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-gray-900">{course.nameTh}</div>
                      {course.nameEn && (
                        <div className="text-[10px] text-gray-500 font-mono">
                          {course.nameEn}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3.5 text-center font-mono">
                      <span className="font-bold text-gray-800">{course.credits}</span>
                      <div className="text-[10px] text-gray-500">{course.creditDesc}</div>
                    </td>
                    <td className="py-2.5 px-3.5 text-[11px] text-gray-600 leading-relaxed">
                      {course.description || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
