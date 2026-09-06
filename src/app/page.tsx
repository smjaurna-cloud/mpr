"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpenCheck, 
  UtensilsCrossed, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Download
} from "lucide-react";
import { mockSamaneras, mockAlmsBookings, mockMukhopathaRecords, mockEApprovalDocs } from "@/data/mockData";
import { formatThaiCurrency } from "@/lib/utils";

export default function ExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports">("overview");

  // Summary Metrics
  const totalSamaneras = 120; // Nominal total in project
  const currentCheckedToday = mockSamaneras.filter(s => s.todayRoutine.morningChant).length;
  const passedMukhopathaRate = 89.4; // %
  const pendingDocsCount = mockEApprovalDocs.filter(d => d.status === "PENDING_DIRECTOR").length;
  const thisWeekAlmsTotal = mockAlmsBookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner with Buddhist College Aesthetics */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-yellow-900 text-white p-6 md:p-8 shadow-lg shadow-amber-900/15">
        <div className="absolute right-0 top-0 w-80 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 border border-amber-400/40 text-xs font-medium text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>ศูนย์กลางการบริหารราชวิทยาลัยอัจฉริยะ (Smart Gurukula Cockpit)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-amber-50">
            มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
          </h1>
          <p className="text-amber-200/90 text-sm leading-relaxed">
            โครงการสร้างศาสนทายาท "ศากยบุตรสามเณรสีหะ" ผู้สืบทอดและทรงจำพระไตรปิฎกบาลีเถรวาท 
            บูรณาการการบริหารตามโครงสร้าง มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-600/40 flex flex-wrap items-center justify-between gap-4 text-xs text-amber-200">
          <div className="flex items-center gap-4">
            <span>🏛️ วิทยาเขต: กำแพงแสน จ.นครปฐม</span>
            <span>📅 ปีการศึกษา: ๒๕๖๙</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>สถานะระบบ: เชื่อมต่อข้อมูล มจร วังน้อย เรียบร้อย</span>
          </div>
        </div>
      </div>

      {/* 4 Core Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">ศากยบุตรสามเณรทั้งหมด</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalSamaneras}</span>
            <span className="text-xs text-emerald-600 font-semibold">รูป (เต็ม ๑๐๐%)</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            ทำวัตรเช้าวันนี้: {currentCheckedToday + 116} รูป • อาพาธพักฟื้น ๑ รูป
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">ความก้าวหน้ามุขปาฐะ</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <BookOpenCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-700">{passedMukhopathaRate}%</span>
            <span className="text-xs text-emerald-600 font-semibold">+4.2% สัปดาห์นี้</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            คัมภีร์ปทรูปสิทธิ & สัททนีติ ชั้น ๑-๔
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">กองทุนภัตตาหารเพลสัปดาห์นี้</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{formatThaiCurrency(thisWeekAlmsTotal)}</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-700 font-medium">
            ✓ มีเจ้าภาพครบทุกวัน (ไม่มีวันว่าง)
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">เอกสารรอ ผอ.วส. อนุมัติ</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-700">{pendingDocsCount}</span>
            <span className="text-xs text-rose-600 font-semibold">ฉบับเร่งด่วน</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            ลงนามผ่านมือถือได้ทันที (MOD-04)
          </p>
        </div>
      </div>

      {/* Grid: 2 Columns (Operational Highlights & Quick Modules) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Operational Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kitchen & Nutrition Safety Box (Important Monastic Feature) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
                <h2 className="font-bold text-sm text-amber-950">
                  แจ้งเตือนโรงครัว & สุขภาวะสามเณรประจำวัน (มื้อเพล)
                </h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-medium">
                วันนี้ ๑๑:๐๐ น.
              </span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              ยอดภัตตาหารในบาตรรวม: <strong className="font-semibold">๑๑๙ รูป</strong> (พักฟื้นที่ห้องพยาบาล ๑ รูป - ส่งภัตตาหารถึงกุฏิ)
              <br />
              <span className="text-rose-700 font-medium">⚠️ ข้อควรระวัง:</span> มีสามเณร ๒ รูปแพ้อาหารทะเล และ ๑ รูปแพ้ถั่วลิสงอย่างรุนแรง กรุณาแยกสำรับปลอดสารก่อภูมิแพ้
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/monastic-life"
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
              >
                ดูรายละเอียดเวชระเบียนสามเณร <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Mukhopatha Recitation Passes */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">
                  ผลการสาธยายมุขปาฐะคัมภีร์ล่าสุด (MOD-03)
                </h2>
                <p className="text-xs text-slate-500">บันทึกสดจากพระคัมภีราจารย์ผู้ตรวจ</p>
              </div>
              <Link
                href="/mukhopatha"
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1"
              >
                ดูทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {mockMukhopathaRecords.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.samaneraName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-[10px]">
                        {item.grade === "EXCELLENT" ? "ยอดเยี่ยม" : "ดี"}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">
                      📖 {item.scripture} - <span className="text-slate-500">{item.chapter}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      ผู้ตรวจ: {item.evaluator} • ความยาวเสียง: {item.recordingDuration}
                    </p>
                  </div>
                  <span className="text-slate-400 text-[11px] whitespace-nowrap">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Strategic Action Hub */}
        <div className="space-y-6">
          {/* Quick Access to College Wings */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm">สารบบงานราชวิทยาลัย (๑๓ โมดูล)</h2>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                ERP ครบวงจร
              </span>
            </div>

            {/* Wing 1: ศูนย์อำนวยการ & วิถีศากยบุตร */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-amber-950 uppercase tracking-wide px-1">
                ๑. ศูนย์อำนวยการ & วิถีศากยบุตร
              </p>
              <div className="space-y-1.5">
                <Link
                  href="/monastic-life"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 hover:bg-amber-100/70 border border-amber-200/60 transition-all text-xs"
                >
                  <div>
                    <span className="font-semibold text-amber-900">วิถีชีวิต & สุขภาวะสามเณร</span>
                    <p className="text-[10px] text-amber-800/80">เช็กชื่อทำวัตร กัมมัฏฐาน & เวชระเบียน</p>
                  </div>
                  <span className="text-[10px] text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">๒๔ ชม.</span>
                </Link>

                <Link
                  href="/alms-patron"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-200/60 transition-all text-xs"
                >
                  <div>
                    <span className="font-semibold text-emerald-900">ภัตตาหาร & โยมอุปถัมภ์</span>
                    <p className="text-[10px] text-emerald-800/80">ปฏิทินจองเพล & e-Donation</p>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-200/60 px-1.5 py-0.5 rounded">LINE</span>
                </Link>

                <Link
                  href="/mukhopatha"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/70 border border-blue-200/60 transition-all text-xs"
                >
                  <div>
                    <span className="font-semibold text-blue-900">มุขปาฐะ & บาลีศึกษา</span>
                    <p className="text-[10px] text-blue-800/80">ตรวจท่องจำคัมภีร์ & คลังเสียงสาธยาย</p>
                  </div>
                  <span className="text-[10px] text-blue-700 bg-blue-200/60 px-1.5 py-0.5 rounded">คัมภีร์</span>
                </Link>
              </div>
            </div>

            {/* Wing 2: สำนักงานวิทยาลัย (ฝ่ายบริหาร) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-amber-950 uppercase tracking-wide px-1">
                ๒. สำนักงานวิทยาลัย (ฝ่ายบริหาร)
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <Link
                  href="/hr"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">บริหารงานบุคคล</span>
                  <span className="text-[10px] text-slate-400">อัตรากำลังสงฆ์</span>
                </Link>

                <Link
                  href="/finance-procurement"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">การเงิน & พัสดุ</span>
                  <span className="text-[10px] text-slate-400">๓ กองทุนบริจาค</span>
                </Link>

                <Link
                  href="/planning-budget"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">แผนงบประมาณ</span>
                  <span className="text-[10px] text-slate-400">KPI ๕ ปี วส.มจร</span>
                </Link>

                <Link
                  href="/e-approval"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">สารบรรณด่วน</span>
                  <span className="text-[10px] text-rose-600 font-medium">รออนุมัติ {pendingDocsCount}</span>
                </Link>

                <Link
                  href="/meeting-rooms"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">ห้องประชุม</span>
                  <span className="text-[10px] text-indigo-600">Smart Room</span>
                </Link>

                <Link
                  href="/users"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">ผู้ใช้ & สิทธิ์</span>
                  <span className="text-[10px] text-slate-400">RBAC สงฆ์</span>
                </Link>
              </div>
            </div>

            {/* Wing 3: สำนักวิชาการ (ฝ่ายวิชาการ) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-amber-950 uppercase tracking-wide px-1">
                ๓. สำนักวิชาการ (ฝ่ายวิชาการ)
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <Link
                  href="/mcu-bridge"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">เชื่อม มจร</span>
                  <span className="text-[10px] text-emerald-600">MCU REG</span>
                </Link>

                <Link
                  href="/library"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">พระไตรปิฎก</span>
                  <span className="text-[10px] text-slate-400">หอสมุดดิจิทัล</span>
                </Link>

                <Link
                  href="/research-qa"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">วิจัย & QA</span>
                  <span className="text-[10px] text-slate-400">AUN-QA มาตรฐาน</span>
                </Link>

                <Link
                  href="/academic-services"
                  className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 transition-all group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-amber-900 block truncate">บริการการศึกษา</span>
                  <span className="text-[10px] text-slate-400">ตารางเรียน & ชุมชน</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick MCU REG Sync Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400">MCU REG Bridge Status</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                พร้อมส่งออก
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ข้อมูลผลการเรียนภาคเรียนที่ ๑/๒๕๖๙ ตรวจสอบความถูกต้องครบถ้วนแล้ว พร้อมส่งออกรูปแบบ CSV ไปยัง มจร วังน้อย
            </p>
            <Link
              href="/mcu-bridge"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow"
            >
              <Download className="w-4 h-4" />
              <span>ไปยังระบบส่งออกข้อมูล มจร</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
