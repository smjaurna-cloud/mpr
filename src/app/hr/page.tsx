"use client";

import React, { useState } from "react";
import { 
  UserCog, 
  Search, 
  Plus, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Building2, 
  Briefcase,
  Scroll,
  FileBadge,
  LayoutGrid,
  Table as TableIcon,
  Printer,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  X,
  Phone,
  Mail,
  ShieldCheck
} from "lucide-react";
import { mockHRStaffList, HRStaff } from "@/data/mockData";

export default function HRManagementPage() {
  const [staffList, setStaffList] = useState<HRStaff[]>(mockHRStaffList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedStaff, setSelectedStaff] = useState<HRStaff | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter logic
  const filtered = staffList.filter(s => {
    const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (s.paliName && s.paliName.includes(searchQuery)) ||
                       (s.positionNumber && s.positionNumber.includes(searchQuery)) ||
                       s.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedGroup === "ALL") return matchQuery;
    if (selectedGroup === "ACADEMIC_REGULAR") return matchQuery && s.group === "สายวิชาการ (ประจำ)";
    if (selectedGroup === "ACADEMIC_CONTRACT") return matchQuery && s.group === "สายวิชาการ (อัตราจ้าง)";
    if (selectedGroup === "SUPPORT_REGULAR") return matchQuery && s.group === "สายปฏิบัติการ (ประจำ)";
    if (selectedGroup === "SUPPORT_CONTRACT") return matchQuery && s.group === "สายปฏิบัติการและบริการ (อัตราจ้าง)";
    if (selectedGroup === "VACANT") return false; // Handled separately
    return matchQuery;
  });

  const academicRegularCount = staffList.filter(s => s.group === "สายวิชาการ (ประจำ)").length;
  const academicContractCount = staffList.filter(s => s.group === "สายวิชาการ (อัตราจ้าง)").length;
  const supportRegularCount = staffList.filter(s => s.group === "สายปฏิบัติการ (ประจำ)").length;
  const supportContractCount = staffList.filter(s => s.group === "สายปฏิบัติการและบริการ (อัตราจ้าง)").length;
  const monkCount = staffList.filter(s => s.type.includes("บรรพชิต")).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-200/60">
            <UserCog className="w-4 h-4 text-amber-600" />
            <span>กลุ่มงานบริหารงานบุคคล & อัตรากำลัง วส. มจร</span>
            <span className="text-amber-500">•</span>
            <span className="text-emerald-700 font-bold">เอกสารแนบบุคลากร มบร. (สมบูรณ์ ๓๖+๑ อัตรา)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-serif">
            ระบบทะเบียนและบริหารงานบุคคล (HR & Personnel Management)
          </h1>
          <p className="text-xs text-slate-600">
            มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) • อิงตามบัญชีอัตรากำลังทางการ บรรพชิตและคฤหัสถ์
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 z-10">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>พิมพ์รายงานบัญชีรายชื่อ</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setNotification("ระบบกำลังเชื่อมต่อฐานข้อมูลอัตรากำลังบุคลากร มจร วังน้อย");
              setTimeout(() => setNotification(null), 4000);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>เสนอขออนุมัติบรรจุอัตรากำลัง</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">บุคลากรที่ปฏิบัติหน้าที่</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-sans">{staffList.length} <span className="text-xs font-normal text-slate-500">รูป/คน</span></p>
          <span className="text-[10px] text-emerald-600 font-medium">● ๓๖ อัตรา + ๑ ว่าง</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">พระคณาจารย์ (สงฆ์)</span>
          <p className="text-2xl font-bold text-amber-800 mt-1 font-sans">
            {monkCount} <span className="text-xs font-normal text-amber-700">รูป</span>
          </p>
          <span className="text-[10px] text-amber-700 font-medium">พระราชาคณะ / พระมหา / ดร.</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">อาจารย์ประจำ (วิชาการ)</span>
          <p className="text-2xl font-bold text-slate-800 mt-1 font-sans">
            {academicRegularCount} <span className="text-xs font-normal text-slate-500">อัตรา</span>
          </p>
          <span className="text-[10px] text-slate-500 font-medium">รศ.ดร. / ดร. / คณาจารย์</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">อาจารย์อัตราจ้าง</span>
          <p className="text-2xl font-bold text-blue-800 mt-1 font-sans">
            {academicContractCount} <span className="text-xs font-normal text-blue-700">อัตรา</span>
          </p>
          <span className="text-[10px] text-blue-600 font-medium">ผศ.ดร. / ดร. (ว่าง ๑)</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-slate-500 font-medium">สายปฏิบัติการ & บริการ</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-sans">
            {supportRegularCount + supportContractCount} <span className="text-xs font-normal text-emerald-600">คน</span>
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">บริหาร ๑๐ / แม่บ้าน-รถ ๑๒</span>
        </div>
      </div>

      {/* Vacant Position Banner */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5 text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold text-amber-950">ตำแหน่งว่าง ๑ อัตรา:</span>{" "}
            <span>ตำแหน่งอาจารย์ (สายวิชาการ อัตราจ้าง) เลขที่ตำแหน่ง </span>
            <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-900">1427003</span>
            <span> • สังกัดสำนักวิชาการ</span>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-amber-200/80 text-amber-900 rounded-lg font-bold text-[11px] shrink-0">
          เปิดสรรหาคณาจารย์ใหม่
        </span>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, ฉายา, เลขที่ตำแหน่ง (เช่น 1421021), ตำแหน่ง..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
          />
        </div>

        {/* View Mode & Group Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">กลุ่มงานทั้งหมด ({staffList.length})</option>
            <option value="ACADEMIC_REGULAR">สายวิชาการ (อาจารย์ประจำ) ({academicRegularCount})</option>
            <option value="ACADEMIC_CONTRACT">สายวิชาการ (อาจารย์อัตราจ้าง) ({academicContractCount})</option>
            <option value="SUPPORT_REGULAR">สายปฏิบัติการวิชาชีพ ประจำ ({supportRegularCount})</option>
            <option value="SUPPORT_CONTRACT">สายปฏิบัติการและบริการ อัตราจ้าง ({supportContractCount})</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "grid" ? "bg-white text-amber-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="มุมมองการ์ด"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">การ์ด</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "table" ? "bg-white text-amber-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
              title="มุมมองตารางทางการ"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ตารางทางการ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {filtered.map((staff, idx) => {
            const isMonk = staff.type.includes("บรรพชิต");
            const isAcademic = staff.group?.includes("วิชาการ");
            return (
              <div
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group relative"
              >
                {/* Card Top */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      isMonk ? "bg-amber-100 text-amber-900 border border-amber-200" :
                      isAcademic ? "bg-blue-50 text-blue-900 border border-blue-200" :
                      "bg-slate-100 text-slate-800 border border-slate-200"
                    }`}>
                      {staff.group}
                    </span>
                    {staff.positionNumber && staff.positionNumber !== "-" ? (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-900 font-bold rounded border border-amber-300/80">
                        เลขที่ {staff.positionNumber}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">อัตราจ้างทั่วไป</span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors font-serif">
                      {staff.name}
                    </h2>
                    {staff.paliName && (
                      <p className="text-[11px] text-amber-800 font-serif font-semibold">
                        ฉายา: "{staff.paliName}"
                      </p>
                    )}
                    <p className="text-slate-600 font-medium text-xs mt-0.5">{staff.position}</p>
                  </div>
                </div>

                {/* Card Middle info */}
                <div className="p-3 bg-[#faf8f5] rounded-xl space-y-1.5 text-[11px] text-slate-600 border border-gold-subtle">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">หน่วยงาน:</span>
                    <span className="font-semibold text-slate-800">{staff.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">วุฒิ/วิชาการ:</span>
                    <span className="font-bold text-amber-800">{staff.academicRank}</span>
                  </div>
                  {isAcademic && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">ภาระงานสอน:</span>
                      <span className="font-semibold text-slate-800">{staff.teachingHoursPerWeek} ชม./สัปดาห์</span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">ลำดับที่ #{idx + 1}</span>
                  <div className="flex items-center gap-1.5 text-amber-700 font-semibold group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>ดูประวัติ</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Official Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-amber-50 to-orange-50/60 border-b border-amber-200 text-amber-950 font-bold text-[11px]">
                  <th className="py-3 px-3 text-center w-12">ที่</th>
                  <th className="py-3 px-4">ชื่อ - ฉายา - นามสกุล</th>
                  <th className="py-3 px-3">เลขที่ตำแหน่ง</th>
                  <th className="py-3 px-4">ตำแหน่งทางการ</th>
                  <th className="py-3 px-3">สายงาน / ประเภท</th>
                  <th className="py-3 px-3">หน่วยงานสังกัด</th>
                  <th className="py-3 px-3 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((staff, idx) => (
                  <tr 
                    key={staff.id} 
                    className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedStaff(staff)}
                  >
                    <td className="py-2.5 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif">{staff.name}</span>
                        {staff.paliName && (
                          <span className="text-[10px] text-amber-800 font-serif">({staff.paliName})</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-900">
                      {staff.positionNumber !== "-" ? (
                        <span className="px-2 py-0.5 bg-amber-100/70 text-amber-900 rounded border border-amber-300 text-[11px]">
                          {staff.positionNumber}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700">{staff.position}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {staff.group}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{staff.department}</td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStaff(staff);
                        }}
                        className="p-1 rounded text-amber-700 hover:bg-amber-100"
                        title="ดูรายละเอียด"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {selectedStaff.group}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-serif">
                  {selectedStaff.name}
                </h3>
                {selectedStaff.paliName && (
                  <p className="text-xs text-amber-800 font-serif">ฉายาบาลี: {selectedStaff.paliName}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Details Body */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">เลขที่ตำแหน่งราชการ:</span>
                  <span className="font-mono font-bold text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                    {selectedStaff.positionNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">ตำแหน่งทางการ:</span>
                  <span className="font-semibold text-slate-900">{selectedStaff.position}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">วุฒิการศึกษา / ตำแหน่งวิชาการ:</span>
                  <span className="font-bold text-amber-800">{selectedStaff.academicRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">หน่วยงานสังกัด:</span>
                  <span className="font-semibold text-slate-900">{selectedStaff.department}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">ภาระงานสอน</span>
                  <span className="text-base font-bold text-slate-800">{selectedStaff.teachingHoursPerWeek} ชม./สัปดาห์</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">ผลการประเมินปฏิบัติงาน</span>
                  <span className="text-base font-bold text-emerald-700">{selectedStaff.evaluationScore} คะแนน</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>การรับรองสถานะบุคลากร วส. มจร</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  ข้อมูลถูกต้องตรงตามทะเบียนอัตรากำลังวิทยาลัยสงฆ์ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย ในกำกับมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร วังน้อย)
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-slate-50 text-slate-700"
              >
                ปิดหน้าต่าง
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`สั่งพิมพ์บัตรประจำตัวบุคลากร: ${selectedStaff.name}`);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl text-xs shadow hover:from-amber-700"
              >
                พิมพ์บัตรประจำตัว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
