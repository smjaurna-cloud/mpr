"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ScanFace,
  Video,
  CreditCard,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Download,
} from "lucide-react";
import ZoomClassroomsGrid from "@/components/attendance/ZoomClassroomsGrid";
import TuitionServicesCard from "@/components/attendance/TuitionServicesCard";
import PetitionsTrackerCard from "@/components/attendance/PetitionsTrackerCard";
import DownloadCenterCard from "@/components/attendance/DownloadCenterCard";

export default function AttendanceTrackingPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"classrooms" | "tuition" | "petitions" | "downloads">("classrooms");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-amber-50 via-warm to-rose-50 rounded-2xl border border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-100/70 px-2.5 py-1 rounded-full w-fit">
            <ScanFace className="w-4 h-4 text-rose-600" />
            <span>ระบบสารสนเทศบัณฑิตศึกษา วส. มจร (SMST ERP)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบติดตามการเข้าเรียนชีวมิติ & ห้องเรียน Hybrid ๔ ซูม
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            พุทธศาสตรดุษฎีบัณฑิต และ พุทธศาสตรมหาบัณฑิต (สาขาวิชาพระไตรปิฎกศึกษา / พระอภิธรรมปิฎก รุ่นที่ ๑ และ ๒)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <ScanFace className="w-4 h-4" />
            <span>เปิดสถานีสแกนใบหน้า (SMST Workstation)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {copiedText && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>คัดลอก &quot;{copiedText}&quot; ลงคลิปบอร์ดเรียบร้อยแล้ว</span>
        </div>
      )}

      {/* Graduate Progress Tracking Feature Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-blue-500/10 rounded-2xl border border-amber-300/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900">
                กระดานรายงานความก้าวหน้าดุษฎีนิพนธ์ & วิทยานิพนธ์ (MOD-20)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                พธ.ด. ๒๖ รูป + พธ.ม. ๘ รูป
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              ติดตามหมุดหมายการศึกษา ๒๑ ขั้นตอน (ป.เอก) และ ๑๕ ขั้นตอน (ป.โท) ถอดแบบจากกระดานประกาศจริงของสถาบัน
            </p>
          </div>
        </div>
        <Link
          href="/graduate-progress"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs"
        >
          <span>เปิดกระดานความก้าวหน้า</span>
          <ArrowUpRight className="w-4 h-4 text-amber-400" />
        </Link>
      </div>

      {/* Cohorts Matrix Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-amber-900">พธ.ด. พระไตรปิฎกศึกษา (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาเอก</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            Smart Room 1
          </span>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-rose-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-rose-900">พธ.ม. พระไตรปิฎกศึกษา (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาโท</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            Lecture Hall 2
          </span>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-900">พธ.ม. พระอภิธรรมปิฎก (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาโท</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            Abhidhamma 3
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("classrooms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "classrooms"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>ห้องเรียน Hybrid ๔ ซูม</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tuition")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "tuition"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ชำระค่าเทอม & QR Code</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("petitions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "petitions"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ระบบยื่นคำร้องเรียน</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("downloads")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "downloads"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>ศูนย์ดาวน์โหลดข้อมูล (Download Center)</span>
        </button>
      </div>

      {/* Tab 1: Hybrid Classrooms (4 Zoom Rooms) */}
      {activeTab === "classrooms" && <ZoomClassroomsGrid onCopy={handleCopy} />}

      {/* Tab 2: Tuition & QR Code */}
      {activeTab === "tuition" && <TuitionServicesCard />}

      {/* Tab 3: Petitions Tracker */}
      {activeTab === "petitions" && <PetitionsTrackerCard />}

      {/* Tab 4: Download Center */}
      {activeTab === "downloads" && <DownloadCenterCard />}
    </div>
  );
}
