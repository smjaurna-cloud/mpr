"use client";

import React, { useState } from "react";
import { 
  UserCog, 
  Search, 
  Plus, 
  CheckCircle2, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Award, 
  Building2, 
  Briefcase,
  Scroll,
  FileBadge
} from "lucide-react";
import { mockHRStaffList, HRStaff } from "@/data/mockData";

export default function HRManagementPage() {
  const [staffList, setStaffList] = useState<HRStaff[]>(mockHRStaffList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = staffList.filter(s => {
    const matchQuery = s.name.includes(searchQuery) ||
                       (s.paliName && s.paliName.includes(searchQuery)) ||
                       s.position.includes(searchQuery) ||
                       s.department.includes(searchQuery);
    const matchType = selectedType === "ALL" || s.type.includes(selectedType);
    return matchQuery && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <UserCog className="w-4 h-4 text-amber-600" />
            <span>กลุ่มงานบริหาร & อนุกรรมการบริหารงานบุคคล</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบบริหารงานบุคคล (HR & Monastic Personnel)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ทะเบียนประวัติคณาจารย์สงฆ์ คัมภีราจารย์ บุคลากรสายสนับสนุน ภาระงานสอน (TOR) และการลาศาสนกิจ
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotification("ระบบเปิดแบบฟอร์มขออนุมัติบรรจุแต่งตั้งอาจารย์และเจ้าหน้าที่ใหม่");
            setTimeout(() => setNotification(null), 4000);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มทะเบียนบุคลากรใหม่</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">บุคลากรทั้งหมด</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{staffList.length} รูป/คน</p>
          <span className="text-[10px] text-emerald-600">● ปฏิบัติหน้าที่ครบถ้วน</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">พระคัมภีราจารย์ (สงฆ์)</span>
          <p className="text-2xl font-bold text-amber-800 mt-1">
            {staffList.filter(s => s.type.includes("บรรพชิต")).length} รูป
          </p>
          <span className="text-[10px] text-amber-700">เปรียญธรรม ๗-๙ ประโยค</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">คณาจารย์ฆราวาส</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {staffList.filter(s => s.type.includes("ฆราวาส (อาจารย์)")).length} ท่าน
          </p>
          <span className="text-[10px] text-slate-500">ผศ., รศ., ดร.</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">คะแนนประเมินเฉลี่ย</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">๙๕.๙%</p>
          <span className="text-[10px] text-emerald-600">ระดับดีเด่น</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, ฉายา, ตำแหน่ง, ฝ่ายงาน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 self-end sm:self-auto"
        >
          <option value="ALL">บุคลากรทุกประเภท</option>
          <option value="บรรพชิต">พระภิกษุ (คณาจารย์สงฆ์)</option>
          <option value="อาจารย์">คณาจารย์ฆราวาส</option>
          <option value="เจ้าหน้าที่">เจ้าหน้าที่สายสนับสนุน</option>
        </select>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.map((staff) => (
          <div
            key={staff.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  staff.type.includes("บรรพชิต") ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900"
                }`}>
                  {staff.type}
                </span>
                <h2 className="font-bold text-slate-900 text-sm mt-1">
                  {staff.name} {staff.paliName && <span className="text-amber-800 font-serif">({staff.paliName})</span>}
                </h2>
                <p className="text-slate-600 font-medium">{staff.position}</p>
              </div>

              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-semibold text-[10px]">
                {staff.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span>หน่วยงานสังกัด:</span>
                <span className="font-semibold text-slate-800">{staff.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ตำแหน่งทางวิชาการ/วุฒิ:</span>
                <span className="font-bold text-amber-800">{staff.academicRank}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ภาระงานสอนตามเกณฑ์:</span>
                <span className="font-semibold text-slate-800">{staff.teachingHoursPerWeek} ชั่วโมง/สัปดาห์</span>
              </div>
              <div className="flex items-center justify-between">
                <span>การลาศาสนกิจสะสม:</span>
                <span className="text-slate-600">{staff.missionLeaveCount} ครั้ง/ปี</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">ผลการประเมินรอบล่าสุด:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {staff.evaluationScore} คะแนน (ดีเด่น)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
