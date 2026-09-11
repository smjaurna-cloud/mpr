"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import {
  officialDepartments,
} from "@/data/contactDirectoryData";

interface ContactDirectoryTableProps {
  onSelectDepartmentForInquiry: (deptName: string) => void;
}

export default function ContactDirectoryTable({
  onSelectDepartmentForInquiry,
}: ContactDirectoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("ALL");

  const filteredDepartments = officialDepartments.filter((dept) => {
    const matchesSearch =
      dept.nameThai.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.nameEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.phoneExtension.includes(searchQuery) ||
      dept.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDeptFilter === "ALL" || dept.id === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาฝ่ายงาน, ชื่อผู้รับผิดชอบ, เบอร์ต่อ, หรือบริการ..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 shrink-0 font-medium">กรองฝ่ายงาน:</span>
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            aria-label="กรองฝ่ายงานราชวิทยาลัย"
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-700"
          >
            <option value="ALL">ทุกฝ่ายงาน (๘ ฝ่ายงาน)</option>
            {officialDepartments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nameThai}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              dept.isEmergency24h
                ? "border-amber-300 ring-1 ring-amber-300/50 bg-gradient-to-br from-white to-amber-50/30"
                : "border-slate-200/80"
            }`}
          >
            <div className="space-y-4">
              {/* Top Dept Badge & Extension */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-[11px] font-bold">
                      {dept.deptCode}
                    </span>
                    {dept.isEmergency24h && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span>บริการ ๒๔ ชั่วโมง</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1.5">
                    {dept.nameThai}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans">{dept.nameEng}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">เบอร์ต่อภายใน</span>
                  <span className="text-lg font-extrabold text-amber-700 font-mono">
                    {dept.phoneExtension}
                  </span>
                </div>
              </div>

              {/* Head of Dept & Location */}
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ผู้รับผิดชอบ/หัวหน้างาน:</span>
                  <span className="font-semibold text-slate-800">{dept.headName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ตำแหน่ง:</span>
                  <span className="text-amber-800 font-medium">{dept.headRole}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500">ที่ตั้ง:</span>
                  <span className="text-slate-700">
                    {dept.buildingLocation} ({dept.floor})
                  </span>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-700">ขอบเขตงานบริการ:</p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {dept.services.map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Contact Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{dept.operatingHours}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${dept.officialEmail}`} className="text-[11px] hover:text-amber-700 text-slate-700">
                    {dept.officialEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {dept.directPhone && (
                  <a
                    href={`tel:${dept.directPhone.replace(/[^0-9]/g, "")}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-amber-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>โทรตรง: {dept.directPhone}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onSelectDepartmentForInquiry(dept.nameThai)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>ส่งข้อความ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
