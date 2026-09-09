"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Download,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  BookOpen,
  Filter,
  Users,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Eye,
  Edit3,
  RotateCcw,
  Check,
  X,
  Layers,
  ArrowUpRight
} from "lucide-react";
import {
  PHD_MILESTONES,
  MA_MILESTONES,
  INITIAL_PHD_STUDENTS,
  INITIAL_MA_STUDENTS,
  StudentProgress,
  MilestoneDefinition,
  calculateProgressPercentage
} from "@/data/graduateProgressData";

export default function GraduateProgressPage() {
  // State หลัก
  const [activeProgram, setActiveProgram] = useState<"PHD" | "MA">("PHD");
  const [phdStudents, setPhdStudents] = useState<StudentProgress[]>(INITIAL_PHD_STUDENTS);
  const [maStudents, setMaStudents] = useState<StudentProgress[]>(INITIAL_MA_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "proposal" | "meditation" | "qe">("all");
  const [viewMode, setViewMode] = useState<"matrix" | "card">("matrix");
  const [isAdminEdit, setIsAdminEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // โหลดข้อมูลที่เคยเซฟไว้ใน localStorage (ถ้ามี)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPhd = localStorage.getItem("mpr_phd_progress_v1");
      const savedMa = localStorage.getItem("mpr_ma_progress_v1");
      if (savedPhd) {
        try { setPhdStudents(JSON.parse(savedPhd)); } catch (e) { console.error(e); }
      }
      if (savedMa) {
        try { setMaStudents(JSON.parse(savedMa)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  // บันทึกการเปลี่ยนแปลง
  const saveToStorage = (updatedPhd: StudentProgress[], updatedMa: StudentProgress[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mpr_phd_progress_v1", JSON.stringify(updatedPhd));
      localStorage.setItem("mpr_ma_progress_v1", JSON.stringify(updatedMa));
    }
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้นตามกระดานจริง
  const handleResetDefaults = () => {
    if (confirm("ต้องการรีเซ็ตข้อมูลสถานะกลับเป็นค่าเริ่มต้นตามกระดานจริงของสถาบันใช่หรือไม่?")) {
      setPhdStudents(INITIAL_PHD_STUDENTS);
      setMaStudents(INITIAL_MA_STUDENTS);
      if (typeof window !== "undefined") {
        localStorage.removeItem("mpr_phd_progress_v1");
        localStorage.removeItem("mpr_ma_progress_v1");
      }
      showToast("รีเซ็ตสถานะกลับสู่ค่าเริ่มต้นตามกระดานประกาศทางการแล้ว");
    }
  };

  // สลับสถานะขั้นตอน (เมื่ออยู่ในโหมด Admin Edit)
  const toggleMilestone = (studentId: string, milestoneId: string) => {
    if (!isAdminEdit) return;

    if (activeProgram === "PHD") {
      const updated = phdStudents.map((s) => {
        if (s.id === studentId) {
          const current = !!s.milestones[milestoneId];
          const newMilestones = { ...s.milestones, [milestoneId]: !current };
          return { ...s, milestones: newMilestones, updatedAt: new Date().toISOString() };
        }
        return s;
      });
      setPhdStudents(updated);
      saveToStorage(updated, maStudents);
      showToast(`อัปเดตสถานะสำเร็จ`);
    } else {
      const updated = maStudents.map((s) => {
        if (s.id === studentId) {
          const current = !!s.milestones[milestoneId];
          const newMilestones = { ...s.milestones, [milestoneId]: !current };
          return { ...s, milestones: newMilestones, updatedAt: new Date().toISOString() };
        }
        return s;
      });
      setMaStudents(updated);
      saveToStorage(phdStudents, updated);
      showToast(`อัปเดตสถานะสำเร็จ`);
    }
  };

  // เลือกชุดข้อมูลตามหลักสูตร
  const currentStudents = activeProgram === "PHD" ? phdStudents : maStudents;
  const currentMilestones = activeProgram === "PHD" ? PHD_MILESTONES : MA_MILESTONES;
  const programTitle =
    activeProgram === "PHD"
      ? "หลักสูตรพุทธศาสตรดุษฎีบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท รุ่นที่ ๑"
      : "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท รุ่นที่ ๑";
  const degreeLevel = activeProgram === "PHD" ? "ระดับปริญญาเอก (พธ.ด.)" : "ระดับปริญญาโท (พธ.ม.)";
  const boardColor =
    activeProgram === "PHD"
      ? {
          banner: "from-rose-900 via-red-950 to-stone-900",
          accent: "text-rose-700 bg-rose-50 border-rose-200",
          headerBg: "bg-rose-950 text-white",
          btnActive: "bg-rose-800 text-white shadow-md shadow-rose-900/20",
          badge: "bg-rose-100 text-rose-900 border-rose-300",
        }
      : {
          banner: "from-blue-900 via-sky-950 to-stone-900",
          accent: "text-blue-700 bg-blue-50 border-blue-200",
          headerBg: "bg-blue-950 text-white",
          btnActive: "bg-blue-800 text-white shadow-md shadow-blue-900/20",
          badge: "bg-blue-100 text-blue-900 border-blue-300",
        };

  // กรองข้อมูลนิสิต
  const filteredStudents = useMemo(() => {
    return currentStudents.filter((student) => {
      const matchSearch =
        student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.chaya && student.chaya.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.surname && student.surname.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (selectedFilter === "proposal") {
        return !!student.milestones["proposal_exam"];
      }
      if (selectedFilter === "meditation") {
        return !!student.milestones["meditation_45"] || !!student.milestones["meditation_30"];
      }
      if (selectedFilter === "qe") {
        return !!student.milestones["qe_acad"];
      }
      return true;
    });
  }, [currentStudents, searchQuery, selectedFilter]);

  // คำนวณ KPI ภาพรวม
  const stats = useMemo(() => {
    const total = currentStudents.length;
    const proposalPassed = currentStudents.filter((s) => s.milestones["proposal_exam"]).length;
    const meditationPassed = currentStudents.filter(
      (s) => s.milestones["meditation_45"] || s.milestones["meditation_30"]
    ).length;
    const qePassed = currentStudents.filter((s) => s.milestones["qe_acad"]).length;
    const avgPercentage =
      total > 0
        ? Math.round(
            currentStudents.reduce(
              (acc, s) => acc + calculateProgressPercentage(s.milestones, currentMilestones.length),
              0
            ) / total
          )
        : 0;

    return { total, proposalPassed, meditationPassed, qePassed, avgPercentage };
  }, [currentStudents, currentMilestones]);

  // ส่งออกไฟล์ CSV UTF-8 BOM
  const exportCSV = () => {
    let csv = `\uFEFFลำดับ,ชื่อ-ฉายา-นามสกุล,หลักสูตร,รุ่นที่,ร้อยละความก้าวหน้า (%),`;
    csv += currentMilestones.map((m) => `"${m.name}"`).join(",") + "\n";

    currentStudents.forEach((s) => {
      const pct = calculateProgressPercentage(s.milestones, currentMilestones.length);
      const row = [
        s.no,
        `"${s.fullName}"`,
        `"${s.programName}"`,
        `"${s.cohort}"`,
        pct,
        ...currentMilestones.map((m) => (s.milestones[m.id] ? "ผ่าน" : "ยังไม่ผ่าน")),
      ];
      csv += row.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress_${activeProgram.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`ส่งออกไฟล์ Excel CSV สำเร็จ`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-3">
      {/* 1. Header Banner & Title */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${boardColor.banner} p-6 sm:p-8 text-white shadow-xl border border-white/10 print:border-none print:shadow-none print:p-4 print:bg-white print:text-black`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-amber-500/20 text-amber-300 border border-amber-400/30 print:border-stone-800 print:text-black">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-white/10 text-stone-200 border border-white/10 print:text-black">
                <span>มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 print:hidden">
                MOD-20
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white print:text-stone-900 font-serif">
                ตารางรายงานความก้าวหน้าการศึกษาของนิสิตระดับบัณฑิตศึกษา
              </h1>
              <p className="text-sm text-stone-300 print:text-stone-700 font-medium mt-1">
                {programTitle}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5 print:hidden">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="ดาวน์โหลดเป็นไฟล์ Excel CSV UTF-8"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>ดาวน์โหลด Excel</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="พิมพ์รายงานติดบอร์ด A4 แนวนอน"
            >
              <Printer className="w-4 h-4 text-sky-300" />
              <span>พิมพ์ติดบอร์ด</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdminEdit(!isAdminEdit)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                isAdminEdit
                  ? "bg-amber-500 text-stone-950 font-extrabold ring-2 ring-amber-300"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
              }`}
              title="เปิด/ปิด โหมดแก้ไขสถานะ"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isAdminEdit ? "กำลังแก้ไขสถานะ (Admin)" : "แก้ไขสถานะ"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="รีเซ็ตกลับเป็นค่าเริ่มต้นตามกระดานจริง"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 bottom-[-20px] text-white/5 pointer-events-none select-none print:hidden">
          <BookOpen className="w-48 h-48 -rotate-12" />
        </div>
      </div>

      {/* Toast Notification */}
      {notificationMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center justify-between shadow-sm animate-fade-in print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notificationMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationMsg(null)}
            className="text-emerald-700 hover:text-emerald-950 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Warning Notice */}
      {isAdminEdit && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>โหมดผู้ดูแลระบบ (Somboon Admin):</strong> ท่านสามารถคลิกที่ช่องในตารางเพื่อเปลี่ยนสถานะ 
              <span className="mx-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">✓ ผ่าน</span> / 
              <span className="mx-1 px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-bold">- ยังไม่ผ่าน</span> 
              ได้โดยตรง และข้อมูลจะถูกบันทึกอัตโนมัติ
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsAdminEdit(false)}
            className="px-3 py-1 bg-amber-700 text-white rounded-lg font-bold hover:bg-amber-800 text-[11px] self-end sm:self-auto cursor-pointer"
          >
            เสร็จสิ้นการแก้ไข
          </button>
        </div>
      )}

      {/* 2. Program Selector Tabs (ถอดแบบ ๒ กระดานจริง) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-2 print:hidden">
        <div className="flex items-center gap-2">
          {/* Tab 1: ปริญญาเอก (พธ.ด.) */}
          <button
            type="button"
            onClick={() => setActiveProgram("PHD")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeProgram === "PHD"
                ? "bg-rose-800 text-white shadow-md shadow-rose-900/20 ring-2 ring-rose-300"
                : "bg-white text-stone-700 hover:bg-rose-50 border border-stone-200"
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <span>พธ.ด. พระไตรปิฎกเถรวาท รุ่นที่ ๑</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white">
              ๒๖ รูป/คน
            </span>
          </button>

          {/* Tab 2: ปริญญาโท (พธ.ม.) */}
          <button
            type="button"
            onClick={() => setActiveProgram("MA")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeProgram === "MA"
                ? "bg-blue-800 text-white shadow-md shadow-blue-900/20 ring-2 ring-blue-300"
                : "bg-white text-stone-700 hover:bg-blue-50 border border-stone-200"
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400"></div>
            <span>พธ.ม. พระไตรปิฎกเถรวาท รุ่นที่ ๑</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white">
              ๘ รูป/คน
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/attendance-tracking"
            className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-semibold px-3 py-1.5 rounded-xl hover:bg-amber-100/60 border border-amber-200 transition-colors"
          >
            <span>กลับไประบบติดตามเข้าเรียน</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 print:grid-cols-5">
        {/* Total Students */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-medium">นิสิตในรุ่น</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-stone-900 font-serif">{stats.total}</span>
            <span className="text-xs text-stone-400">รูป/คน</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-1">
            {activeProgram === "PHD" ? "๒๑ ขั้นตอนดุษฎีนิพนธ์" : "๑๕ ขั้นตอนวิทยานิพนธ์"}
          </span>
        </div>

        {/* Proposal Exam Passed */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-medium">สอบโครงร่างผ่านแล้ว</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-amber-700 font-serif">{stats.proposalPassed}</span>
            <span className="text-xs text-stone-400">
              {Math.round((stats.proposalPassed / stats.total) * 100)}%
            </span>
          </div>
          <span className="text-[11px] text-amber-600 font-semibold mt-1">บทที่ ๑ - ๓ ครบถ้วน</span>
        </div>

        {/* Meditation Passed */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-medium">
            {activeProgram === "PHD" ? "ปฏิบัติธรรม ๔๕ วัน" : "ปฏิบัติธรรม ๓๐ วัน"}
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-700 font-serif">{stats.meditationPassed}</span>
            <span className="text-xs text-stone-400">
              {Math.round((stats.meditationPassed / stats.total) * 100)}%
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1">วิปัสสนากรรมฐาน</span>
        </div>

        {/* QE Passed (Ph.D. only) */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-medium">
            {activeProgram === "PHD" ? "ผ่านสอบ QE วิชาการ" : "สอบ Try Out เครื่องมือ"}
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-sky-700 font-serif">
              {activeProgram === "PHD" ? stats.qePassed : "๐"}
            </span>
            <span className="text-xs text-stone-400">
              {activeProgram === "PHD" ? `${Math.round((stats.qePassed / stats.total) * 100)}%` : "๐%"}
            </span>
          </div>
          <span className="text-[11px] text-sky-600 font-semibold mt-1">
            {activeProgram === "PHD" ? "Qualifying Exam" : "เครื่องมือวิจัย"}
          </span>
        </div>

        {/* Average Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-xs text-amber-900 font-medium">ความก้าวหน้าเฉลี่ย</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-amber-800 font-serif">{stats.avgPercentage}%</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="w-full bg-amber-200 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-amber-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.avgPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. Search, Filter & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs print:hidden">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อ-ฉายา หรือ นามสกุลนิสิต..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-stone-50 border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>กรอง:</span>
          </span>

          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === "all"
                ? "bg-stone-800 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            ทั้งหมด ({currentStudents.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("proposal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === "proposal"
                ? "bg-amber-700 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            ผ่านสอบโครงร่าง ({stats.proposalPassed})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter("meditation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === "meditation"
                ? "bg-emerald-700 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            ปฏิบัติธรรมแล้ว ({stats.meditationPassed})
          </button>

          {activeProgram === "PHD" && (
            <button
              type="button"
              onClick={() => setSelectedFilter("qe")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === "qe"
                  ? "bg-sky-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              ผ่านสอบ QE ({stats.qePassed})
            </button>
          )}
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode("matrix")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "matrix" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            แบบกระดานบอร์ด
          </button>
          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "card" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            แบบการ์ดรายบุคคล
          </button>
        </div>
      </div>

      {/* 5. Matrix Board View (จำลองแบบกระดานประกาศจริง ๑๐๐%) */}
      {viewMode === "matrix" && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden print:border print:border-black print:rounded-none">
          {/* Print Only Header */}
          <div className="hidden print:block p-4 text-center border-b border-black">
            <h2 className="text-base font-bold font-serif">{programTitle}</h2>
            <p className="text-xs text-stone-600">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (ข้อมูล ณ วันที่ {new Date().toLocaleDateString("th-TH")})</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              {/* Header Row */}
              <thead>
                <tr className={`${boardColor.headerBg} text-white print:bg-stone-200 print:text-black`}>
                  <th className="py-3 px-2 text-center text-xs font-bold border-r border-white/20 w-10 sticky left-0 z-20 bg-inherit print:border-black">
                    ที่
                  </th>
                  <th className="py-3 px-4 text-xs font-bold border-r border-white/20 min-w-[240px] sticky left-10 z-20 bg-inherit print:border-black">
                    ชื่อ-ฉายา-นามสกุล
                  </th>
                  <th className="py-3 px-2 text-center text-xs font-bold border-r border-white/20 min-w-[70px] print:border-black">
                    ความก้าวหน้า
                  </th>

                  {/* Vertical / Angled Milestone Columns */}
                  {currentMilestones.map((m) => (
                    <th
                      key={m.id}
                      className="py-3 px-1 text-center text-[11px] font-bold border-r border-white/20 last:border-r-0 min-w-[38px] max-w-[44px] hover:bg-white/10 transition-colors group relative cursor-help print:border-black"
                      title={`${m.name}: ${m.description}`}
                    >
                      <div className="h-28 flex items-end justify-center pb-2">
                        <span className="[writing-mode:vertical-rl] rotate-180 inline-block text-[11px] tracking-tight leading-tight whitespace-nowrap">
                          {m.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body Rows */}
              <tbody className="divide-y divide-stone-200 print:divide-black text-xs">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={currentMilestones.length + 3}
                      className="py-8 text-center text-stone-500"
                    >
                      ไม่พบข้อมูลนิสิตที่ตรงกับเงื่อนไขการค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, idx) => {
                    const progressPct = calculateProgressPercentage(
                      student.milestones,
                      currentMilestones.length
                    );

                    return (
                      <tr
                        key={student.id}
                        className={`hover:bg-amber-50/50 transition-colors ${
                          idx % 2 === 1 ? "bg-stone-50/60 print:bg-stone-50" : "bg-white"
                        }`}
                      >
                        {/* No */}
                        <td className="py-2.5 px-2 text-center font-bold text-stone-500 border-r border-stone-200 sticky left-0 z-10 bg-inherit print:border-black">
                          {student.no}
                        </td>

                        {/* Full Name & Title */}
                        <td className="py-2.5 px-4 font-medium text-stone-900 border-r border-stone-200 sticky left-10 z-10 bg-inherit print:border-black">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="font-semibold text-stone-900">{student.title}</span>{" "}
                              {student.chaya && (
                                <span className="text-amber-900 font-serif font-bold">
                                  {student.chaya}
                                </span>
                              )}{" "}
                              {student.surname && (
                                <span className="text-stone-600">{student.surname}</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(student)}
                              className="text-stone-400 hover:text-amber-800 p-1 print:hidden"
                              title="ดูรายละเอียดข้อมูลนิสิต"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Progress Badge */}
                        <td className="py-2.5 px-2 text-center border-r border-stone-200 print:border-black">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              progressPct >= 70
                                ? "bg-emerald-100 text-emerald-800"
                                : progressPct >= 30
                                ? "bg-amber-100 text-amber-800"
                                : progressPct > 0
                                ? "bg-sky-100 text-sky-800"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {progressPct}%
                          </span>
                        </td>

                        {/* Milestone Checkmarks */}
                        {currentMilestones.map((m) => {
                          const isDone = !!student.milestones[m.id];
                          return (
                            <td
                              key={m.id}
                              onClick={() => toggleMilestone(student.id, m.id)}
                              className={`py-2 px-1 text-center border-r border-stone-200 last:border-r-0 transition-colors print:border-black ${
                                isAdminEdit ? "cursor-pointer hover:bg-amber-200/60" : ""
                              } ${isDone ? "bg-amber-50/30 font-bold" : ""}`}
                              title={`${student.fullName} - ${m.name}: ${isDone ? "ผ่าน" : "ยังไม่ผ่าน"}`}
                            >
                              {isDone ? (
                                <span className="inline-flex items-center justify-center text-emerald-700 print:text-black font-extrabold text-sm select-none">
                                  ✓
                                </span>
                              ) : (
                                <span className="text-stone-200 print:text-stone-400 text-[10px] select-none">
                                  -
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
              <span>
                เครื่องหมาย <strong className="text-emerald-800 font-bold">✓</strong> แสดงขั้นตอนที่นิสิตดำเนินการสำเร็จแล้วตามกระดานรายงานของสถาบัน
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              แสดงผล {filteredStudents.length} จากทั้งหมด {currentStudents.length} รูป/คน
            </div>
          </div>
        </div>
      )}

      {/* 6. Card Detail View (มุมมองการ์ดรายบุคคล) */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:hidden">
          {filteredStudents.map((student) => {
            const progressPct = calculateProgressPercentage(
              student.milestones,
              currentMilestones.length
            );
            const doneCount = Object.values(student.milestones).filter(Boolean).length;

            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold flex items-center justify-center text-xs">
                        {student.no}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900">{student.title}</h3>
                        <p className="text-xs text-amber-900 font-serif font-semibold">
                          {student.chaya} {student.surname}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        progressPct >= 70
                          ? "bg-emerald-100 text-emerald-800"
                          : progressPct >= 30
                          ? "bg-amber-100 text-amber-800"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {progressPct}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-500">
                      <span>ความก้าวหน้าดุษฎีนิพนธ์</span>
                      <span className="font-semibold">
                        {doneCount} / {currentMilestones.length} ขั้นตอน
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {student.milestones["proposal_exam"] && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        ✓ สอบโครงร่าง
                      </span>
                    )}
                    {student.milestones["meditation_45"] && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ วิปัสสนา ๔๕ วัน
                      </span>
                    )}
                    {student.milestones["meditation_30"] && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ วิปัสสนา ๓๐ วัน
                      </span>
                    )}
                    {student.milestones["qe_acad"] && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        ✓ QE วิชาการ
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStudent(student)}
                  className="w-full py-2 px-3 bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>ดูรายละเอียดหมุดหมายทั้งหมด</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 7. Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-stone-200 animate-scale-up">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    ลำดับที่ {selectedStudent.no}
                  </span>
                  <span className="text-xs text-stone-500">{selectedStudent.programName}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mt-1 font-serif">
                  {selectedStudent.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Progress Summary */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-900 font-semibold">สรุปความก้าวหน้า</span>
                <p className="text-xl font-bold text-amber-950 mt-0.5">
                  {calculateProgressPercentage(selectedStudent.milestones, currentMilestones.length)}%
                </p>
              </div>
              <div className="text-right text-xs text-amber-800">
                สำเร็จ{" "}
                <strong className="text-sm font-bold text-amber-950">
                  {Object.values(selectedStudent.milestones).filter(Boolean).length}
                </strong>{" "}
                จาก {currentMilestones.length} ขั้นตอน
              </div>
            </div>

            {/* Checklist of Milestones */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                รายการหมุดหมายการศึกษาและวิทยานิพนธ์
              </h4>
              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {currentMilestones.map((m, i) => {
                  const isDone = !!selectedStudent.milestones[m.id];
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        if (isAdminEdit) {
                          toggleMilestone(selectedStudent.id, m.id);
                          setSelectedStudent({
                            ...selectedStudent,
                            milestones: {
                              ...selectedStudent.milestones,
                              [m.id]: !isDone,
                            },
                          });
                        }
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                        isAdminEdit ? "cursor-pointer hover:border-amber-400" : ""
                      } ${
                        isDone
                          ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                          : "bg-stone-50/50 border-stone-200 text-stone-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isDone
                              ? "bg-emerald-600 text-white"
                              : "bg-stone-200 text-stone-600"
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-stone-900">{m.name}</div>
                          <div className="text-[11px] text-stone-500">{m.description}</div>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isDone
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {isDone ? "ผ่านเรียบร้อย" : "รอดำเนินการ"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
