"use client";

import React, { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  BarChart3, 
  PieChart, 
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { mockStrategicKPIs, StrategicPlanKPI } from "@/data/mockData";

export default function PlanningBudgetPage() {
  const [kpis, setKpis] = useState<StrategicPlanKPI[]>(mockStrategicKPIs);
  const [selectedPillar, setSelectedPillar] = useState<string>("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = kpis.filter(k => 
    selectedPillar === "ALL" || k.pillar.includes(selectedPillar)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-blue-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full w-fit">
            <Target className="w-4 h-4 text-blue-600" />
            <span>กลุ่มงานวางแผนและงบประมาณ</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบแผนยุทธศาสตร์ ๕ ปี & ติดตามงบประมาณ (Strategic Planning)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            กำกับตัวชี้วัดความสำเร็จการสร้างศาสนทายาท การเบิกจ่ายงบประมาณตามงวด และการจัดทำคำของบประจำปี
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotification("ระบบเปิดแบบฟอร์มจัดทำข้อเสนอโครงการและคำของบประมาณประจำปี ๒๕๗๐");
            setTimeout(() => setNotification(null), 4000);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เสนอโครงการ/คำของบใหม่</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ตัวชี้วัดยุทธศาสตร์ทั้งหมด</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{kpis.length} ตัวชี้วัด</p>
          <span className="text-[10px] text-slate-400">ครอบคลุม ๓ ยุทธศาสตร์หลัก</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">บรรลุเกินเป้าหมาย</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {kpis.filter(k => k.status === "EXCEEDED").length} ตัวชี้วัด
          </p>
          <span className="text-[10px] text-emerald-600">✓ มุขปาฐะ & กัมมัฏฐาน</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ดำเนินงานตามแผน</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            {kpis.filter(k => k.status === "ON_TRACK").length} ตัวชี้วัด
          </p>
          <span className="text-[10px] text-blue-600">● สอบสนามหลวง & นานาชาติ</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ความก้าวหน้ารวม</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">๗๙.๔%</p>
          <span className="text-[10px] text-emerald-600">+12% เทียบปีก่อน</span>
        </div>
      </div>

      {/* Filter by Strategic Pillar */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setSelectedPillar("ALL")}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            selectedPillar === "ALL" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
          }`}
        >
          ทุกยุทธศาสตร์
        </button>
        <button
          type="button"
          onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๑")}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            selectedPillar === "ยุทธศาสตร์ที่ ๑" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
          }`}
        >
          ยุทธศาสตร์ ๑: ความเป็นเลิศพระไตรปิฎก
        </button>
        <button
          type="button"
          onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๒")}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            selectedPillar === "ยุทธศาสตร์ที่ ๒" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
          }`}
        >
          ยุทธศาสตร์ ๒: ศาสนทายาทศีล สมาธิ ปัญญา
        </button>
        <button
          type="button"
          onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๓")}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            selectedPillar === "ยุทธศาสตร์ที่ ๓" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
          }`}
        >
          ยุทธศาสตร์ ๓: บูรณาการสู่สากล
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.map((kpi) => (
          <div
            key={kpi.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono font-bold text-blue-700 text-[11px] bg-blue-50 px-2 py-0.5 rounded">
                  {kpi.kpiCode}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{kpi.title}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpi.pillar}</p>
              </div>

              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                kpi.status === "EXCEEDED" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
              }`}>
                {kpi.status === "EXCEEDED" ? "เกินเป้าหมาย" : "ตามเป้าหมาย"}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">เป้าหมายตามแผน:</span>
                <span className="font-bold text-slate-800">{kpi.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ผลงานปัจจุบัน:</span>
                <span className="font-bold text-emerald-700">{kpi.actual}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    kpi.percentage >= 100 ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                  style={{ width: `${Math.min(kpi.percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>ความสำเร็จ</span>
                <span className="font-bold text-slate-700">{kpi.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
