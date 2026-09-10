"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  Save,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  UserCheck,
  Building2,
  Calendar,
  Layers,
  Search,
  Filter,
  ArrowRight,
  Download,
  ExternalLink,
  Edit,
  SlidersHorizontal,
  History,
  Activity,
  ChevronRight,
  Database,
  Lock,
  Unlock,
} from "lucide-react";
import {
  collegeModulesRegistry,
  adminPersonas,
  SystemModuleInfo,
  AdminPersona,
  DataUpdateLogItem,
  initialUpdateHistory,
  checkModulePermission,
} from "@/data/systemUpdaterData";
import QuickDataUpdateModal from "@/components/QuickDataUpdateModal";
import { formatThaiDate, toThaiDigits } from "@/lib/utils";

export default function CentralizedDataUpdaterPage() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("admin-super-somboon");
  const [activeTab, setActiveTab] = useState<"modules" | "batch" | "freshness" | "audit">("modules");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWing, setSelectedWing] = useState<string>("ALL");
  const [permissionFilter, setPermissionFilter] = useState<"ALL" | "CAN_EDIT" | "VIEW_ONLY">("ALL");
  const [modules, setModules] = useState<SystemModuleInfo[]>(collegeModulesRegistry);
  const [updateHistory, setUpdateHistory] = useState<DataUpdateLogItem[]>(initialUpdateHistory);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [targetModalModuleId, setTargetModalModuleId] = useState<string>("MOD-01");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentPersona =
    adminPersonas.find((p) => p.id === selectedPersonaId) || adminPersonas[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenUpdateModal = (moduleId: string) => {
    setTargetModalModuleId(moduleId);
    setModalOpen(true);
  };

  const handleUpdateSuccess = (msg: string) => {
    showToast(msg);
    // Refresh local module timestamp
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === targetModalModuleId) {
          const now = new Date();
          return {
            ...m,
            lastUpdated: `${formatThaiDate(now, { useThaiDigits: true })} ${toThaiDigits(
              `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} น.`
            )}`,
            lastUpdatedBy: currentPersona.name,
            freshnessStatus: "UP_TO_DATE",
          };
        }
        return m;
      })
    );
  };

  // Filter modules based on search, wing, and permission
  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.dataCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWing = selectedWing === "ALL" || m.wing === selectedWing;

    const canEdit = checkModulePermission(currentPersona, m.id);
    const matchesPermission =
      permissionFilter === "ALL" ||
      (permissionFilter === "CAN_EDIT" && canEdit) ||
      (permissionFilter === "VIEW_ONLY" && !canEdit);

    return matchesSearch && matchesWing && matchesPermission;
  });

  const editableCount = modules.filter((m) => checkModulePermission(currentPersona, m.id)).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-800 via-amber-700 to-yellow-900 text-white p-6 md:p-8 shadow-xl shadow-amber-950/20 border border-amber-500/30">
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-300/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/70 border border-amber-400/40 text-xs font-semibold text-amber-100 shadow-xs">
            <Database className="w-3.5 h-3.5 text-yellow-300" />
            <span>MOD-23: ระบบศูนย์กลางอัปเดตและจัดการข้อมูลทุกระบบ (Centralized Data Updater Hub)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
            ศูนย์กลางอัปเดตข้อมูลเป็นปัจจุบันทุกระบบ
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl">
            ช่องทางสำหรับผู้บริหารและเจ้าหน้าที่ผู้ดูแลระบบ (Super Admin & Departmental Admins) 
            ในการเพิ่มข้อมูล แก้ไข ปรับปรุงสถานะ และนำเข้าชุดข้อมูลสเปรดชีต Excel/CSV 
            เพื่อให้สารสนเทศทั้ง ๒๒ โมดูลของมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย มีความสดใหม่ ถูกต้อง และพร้อมใช้งานจริงตลอดเวลา
          </p>

          {/* Banner Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[11px] text-amber-200 block font-medium">โมดูลในระบบ</span>
              <span className="text-xl font-bold text-white">๒๒ โมดูล</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[11px] text-amber-200 block font-medium">สถานะข้อมูล</span>
              <span className="text-xl font-bold text-emerald-300">เป็นปัจจุบัน ๑๐๐%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[11px] text-amber-200 block font-medium">สิทธิ์ที่ท่านแก้ไขได้</span>
              <span className="text-xl font-bold text-yellow-300">{editableCount} / ๒๒ ระบบ</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-[11px] text-amber-200 block font-medium">แอดมินประจำฝ่าย</span>
              <span className="text-xl font-bold text-white">๑๗ บทบาท</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Persona Switcher Strip */}
      <div className="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-700" />
            <span className="font-bold text-sm text-slate-800">
              จำลองสิทธิ์แอดมินผู้ใช้งาน (Admin Role Persona Switcher):
            </span>
          </div>
          <span className="text-xs text-slate-500">
            คลิกเลือกเพื่อทดสอบการอนุญาตสิทธิ์เข้าถึงของแต่ละฝ่ายงาน
          </span>
        </div>

        {/* Persona Select Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {adminPersonas.slice(0, 8).map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-amber-600 text-white border-amber-700 shadow-sm scale-102"
                    : "bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? "bg-white text-amber-800" : "bg-amber-200 text-amber-900"
                  }`}
                >
                  {persona.avatarText}
                </div>
                <span>{persona.name.split(" ")[0]}</span>
                {persona.isSuperAdmin ? (
                  <span className="text-[9px] bg-yellow-400 text-slate-900 px-1.5 py-0.2 rounded-full font-bold">
                    Super
                  </span>
                ) : (
                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full">
                    {persona.assignedModuleIds.length} ระบบ
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Persona Details Card */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {currentPersona.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{currentPersona.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                  {currentPersona.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                🏛️ สังกัด: {currentPersona.department} • สิทธิ์:{" "}
                {currentPersona.isSuperAdmin
                  ? "เข้าถึงและอัปเดตได้ทุกระบบ ๑๐๐%"
                  : `จำกัดเฉพาะ ${currentPersona.assignedModuleIds.join(", ")}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedPersonaId}
              onChange={(e) => setSelectedPersonaId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-amber-500 shadow-2xs"
            >
              {adminPersonas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.title})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-2 bg-white px-4 pt-2 rounded-t-2xl shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("modules")}
          className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "modules"
              ? "border-amber-600 text-amber-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>สารบบอัปเดตข้อมูล ๒๒ โมดูล (Module Matrix)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("batch")}
          className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "batch"
              ? "border-amber-600 text-amber-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>นำเข้าข้อมูลชุด Excel/CSV (Batch Center)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("freshness")}
          className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "freshness"
              ? "border-amber-600 text-amber-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>มอนิเตอร์ความสดใหม่ข้อมูล (Data Freshness)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "audit"
              ? "border-amber-600 text-amber-800"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <History className="w-4 h-4" />
          <span>ประวัติการอัปเดต (Audit Trail)</span>
        </button>
      </div>

      {/* Tab 1: Module Matrix & Quick Updater Cards */}
      {activeTab === "modules" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหารหัสโมดูล, ชื่อระบบ, หรือฝ่ายงาน..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedWing}
                onChange={(e) => setSelectedWing(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">ทุกลุ่มปีกงาน (All Wings)</option>
                <option value="ศูนย์อำนวยการ & วิถีศากยบุตร">๑. ศูนย์อำนวยการ & วิถีศากยบุตร</option>
                <option value="สำนักงานวิทยาลัย (ฝ่ายบริหาร)">๒. สำนักงานวิทยาลัย (ฝ่ายบริหาร)</option>
                <option value="สำนักวิชาการ (ฝ่ายวิชาการ)">๓. สำนักวิชาการ (ฝ่ายวิชาการ)</option>
                <option value="กิจการนิสิต & สารสนเทศวิทยาลัยสงฆ์">๔. สนับสนุน & สารสนเทศดิจิทัล</option>
              </select>

              <select
                value={permissionFilter}
                onChange={(e) => setPermissionFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">สถานะสิทธิ์ทั้งหมด</option>
                <option value="CAN_EDIT">เฉพาะที่ท่านมีสิทธิ์แก้ไข ({editableCount})</option>
                <option value="VIEW_ONLY">เฉพาะดูข้อมูลอย่างเดียว</option>
              </select>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((m) => {
              const canEdit = checkModulePermission(currentPersona, m.id);
              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between ${
                    canEdit ? "border-amber-200 hover:border-amber-400" : "border-slate-200 opacity-90"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Module ID & Permission Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold font-mono text-xs border border-amber-300/60">
                          {m.id}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{m.badge}</span>
                      </div>

                      {canEdit ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Unlock className="w-3 h-3" />
                          <span>มีสิทธิ์อัปเดต</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                          <Lock className="w-3 h-3" />
                          <span>ดูอย่างเดียว</span>
                        </span>
                      )}
                    </div>

                    {/* Module Title */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{m.name}</h3>
                      <p className="text-slate-500 text-[11px] mt-0.5">{m.department}</p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1 text-slate-600">
                      <p className="truncate">
                        📁 <strong>ข้อมูล:</strong> {m.dataCategory}
                      </p>
                      <p>
                        📊 <strong>ปริมาณข้อมูล:</strong> {m.totalRecordsCount.toLocaleString()} {m.recordsUnit}
                      </p>
                      <p className="text-[10px] text-amber-800 font-medium">
                        🕒 อัปเดตล่าสุด: {m.lastUpdated}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        ผู้บันทึก: {m.lastUpdatedBy}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2 text-xs">
                    <Link
                      href={m.route}
                      className="text-slate-500 hover:text-amber-800 font-semibold inline-flex items-center gap-1"
                    >
                      <span>ไปยังหน้าระบบ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenUpdateModal(m.id)}
                      disabled={!canEdit}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-2xs ${
                        canEdit
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>อัปเดตข้อมูล</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Batch Excel / CSV Center */}
      {activeTab === "batch" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ระบบนำเข้าชุดข้อมูลสเปรดชีต Excel & CSV (Batch Import Center)
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              รองรับการอัปโหลดไฟล์สเปรดชีตเพื่อนำเข้าหรือปรับปรุงข้อมูลคราวละจำนวนมาก เหมาะสำหรับข้อมูลนักศึกษา, บัญชีรายชื่อพระภิกษุสามเณร, ทะเบียนรถ, หรือกรอบงบประมาณ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Upload Box */}
            <div className="lg:col-span-2 space-y-4">
              <div className="border-2 border-dashed border-amber-300 bg-amber-50/50 rounded-3xl p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  ลากและวางไฟล์ .XLSX หรือ .CSV ที่นี่ หรือคลิกเพื่อเลือกไฟล์
                </h4>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                  ระบบจะตรวจสอบโครงสร้างคอลัมน์และจับคู่ข้อมูล (Field Mapping) ตามมาตรฐานของแต่ละโมดูลโดยอัตโนมัติ
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenUpdateModal(modules[0].id)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>เลือกโมดูลและเริ่มนำเข้าข้อมูลทันที</span>
                  </button>
                </div>
              </div>

              {/* Supported Modules for Bulk Import */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  โมดูลที่รองรับการนำเข้าไฟล์ Excel/CSV เป็นประจำ:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-01: ทะเบียนสามเณร ๑๒๓ รูป
                  </span>
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-08: อัตรากำลัง ๓๖ อัตรา
                  </span>
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-16: ยานพาหนะ ๑๐ คัน
                  </span>
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-20: นิสิตบัณฑิต ๓๔ รูป
                  </span>
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-10: แผนงบประมาณ ๖๙
                  </span>
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                    MOD-05: ส่งออก MCU REG
                  </span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Download Templates */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-800" />
                  <h4 className="font-bold text-xs text-amber-950">
                    ดาวน์โหลดแม่แบบตัวอย่าง (Templates)
                  </h4>
                </div>
                <p className="text-[11px] text-amber-900/80">
                  ดาวน์โหลดไฟล์แม่แบบที่มีการจัดวางหัวตาราง (Headers) ครบถ้วน เพื่อกรอกข้อมูลก่อนนำเข้าสู่ระบบ:
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href="/api/file-viewer?download=samanera_template.csv"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300/80 transition-colors text-slate-800"
                  >
                    <span>แบบฟอร์มทะเบียนสามเณร (MOD-01)</span>
                    <Download className="w-3.5 h-3.5 text-amber-700" />
                  </a>
                  <a
                    href="/api/file-viewer?download=hr_template.csv"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300/80 transition-colors text-slate-800"
                  >
                    <span>แบบฟอร์มอัตรากำลังสงฆ์ (MOD-08)</span>
                    <Download className="w-3.5 h-3.5 text-amber-700" />
                  </a>
                  <a
                    href="/api/file-viewer?download=vehicle_template.csv"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300/80 transition-colors text-slate-800"
                  >
                    <span>แบบฟอร์มยานพาหนะส่วนกลาง (MOD-16)</span>
                    <Download className="w-3.5 h-3.5 text-amber-700" />
                  </a>
                  <a
                    href="/api/file-viewer?download=grad_progress_template.csv"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300/80 transition-colors text-slate-800"
                  >
                    <span>แบบฟอร์มความก้าวหน้าดุษฎีฯ (MOD-20)</span>
                    <Download className="w-3.5 h-3.5 text-amber-700" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data Freshness & Sync Monitor Table */}
      {activeTab === "freshness" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                กระดานติดตามความสดใหม่และการซิงค์ข้อมูล (Data Freshness Monitor)
              </h3>
              <p className="text-slate-500 text-[11px]">
                แสดงสถานะความสดใหม่ของข้อมูลครบทั้ง ๒๒ โมดูล รอบการอัปเดต และผู้รับผิดชอบทางการ
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                ✓ พร้อมใช้งาน ๒๒/๒๒ ระบบ
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-200">
              <thead className="bg-slate-50 text-[11px] text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">รหัส</th>
                  <th className="px-4 py-3">ชื่อโมดูล / ระบบ</th>
                  <th className="px-4 py-3">ฝ่ายงานรับผิดชอบ</th>
                  <th className="px-4 py-3">รอบอัปเดต</th>
                  <th className="px-4 py-3">อัปเดตล่าสุด</th>
                  <th className="px-4 py-3">สถานะข้อมูล</th>
                  <th className="px-4 py-3">ผู้บันทึกล่าสุด</th>
                  <th className="px-4 py-3 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {modules.map((m) => {
                  const canEdit = checkModulePermission(currentPersona, m.id);
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-amber-900 whitespace-nowrap">
                        {m.id}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                        {m.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {m.department}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {m.updateCycle}
                      </td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-medium">
                        {m.lastUpdated}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          ✓ เป็นปัจจุบัน
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {m.lastUpdatedBy}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenUpdateModal(m.id)}
                          disabled={!canEdit}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors ${
                            canEdit
                              ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          อัปเดตข้อมูล
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Audit & Activity Trail */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                บันทึกประวัติการอัปเดตข้อมูลระบบ (Data Update Audit Trail)
              </h3>
              <p className="text-slate-500 text-[11px]">
                เก็บบันทึกประวัติการเปลี่ยนแปลงข้อมูล วันเวลาพุทธศักราช ผู้ดำเนินการ และผลลัพธ์ ตามมาตรฐาน ISO/IEC 27001
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs">
              {updateHistory.length} รายการล่าสุด
            </span>
          </div>

          <div className="space-y-3">
            {updateHistory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-[10px]">
                      {item.moduleId}
                    </span>
                    <span className="font-semibold text-slate-900">{item.moduleName}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{item.summary}</p>
                  <p className="text-[10px] text-slate-400">
                    ผู้ดำเนินการ: <strong>{item.adminName}</strong> ({item.adminRole}) • จำนวนข้อมูลที่กระทบ: {item.affectedRecordsCount} รายการ
                  </p>
                </div>

                <div className="shrink-0 text-slate-400 text-[11px] font-medium whitespace-nowrap">
                  🕒 {item.timestampThai}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reusable Update Modal */}
      <QuickDataUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetModuleId={targetModalModuleId}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
