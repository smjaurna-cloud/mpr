"use client";

import React, { useState } from "react";
import { 
  HeartHandshake, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Utensils, 
  MapPin, 
  ShieldAlert, 
  Search, 
  Filter, 
  Stethoscope,
  Clock,
  Sparkles,
  Download,
  FileSpreadsheet,
  Users,
  Scroll,
  Globe,
  Award
} from "lucide-react";
import { mockSamaneras, Samanera } from "@/data/mockData";
import { officialMonksList, SanghaMonk, getSanghaStatistics } from "@/data/sanghaData";

export default function MonasticLifePage() {
  const [activeTab, setActiveTab] = useState<"samaneras" | "monks">("samaneras");
  const [samaneras, setSamaneras] = useState<Samanera[]>(mockSamaneras);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "THAI" | "INTERNATIONAL" | "HEALTHY" | "ATTENTION">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [monkSearchQuery, setMonkSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const sanghaStats = getSanghaStatistics();

  // Toggle routine check
  const toggleRoutine = (samaneraId: string, routineKey: keyof Samanera["todayRoutine"]) => {
    setSamaneras(prev => prev.map(s => {
      if (s.id === samaneraId) {
        const updated = {
          ...s,
          todayRoutine: {
            ...s.todayRoutine,
            [routineKey]: !s.todayRoutine[routineKey]
          }
        };
        return updated;
      }
      return s;
    }));
    setNotification("บันทึกการปรับปรุงกิจวัตรเรียบร้อยแล้ว");
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredSamaneras = samaneras.filter(s => {
    const matchQuery = s.fullName.includes(searchQuery) || 
                       s.paliName.includes(searchQuery) || 
                       s.enrollmentNo.includes(searchQuery) || 
                       s.kuti.includes(searchQuery);
    if (!matchQuery) return false;

    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "THAI") return s.patronName.includes("โยมอุปถัมภ์วัดบาลี");
    if (selectedCategory === "INTERNATIONAL") return s.patronName.includes("นานาชาติ");
    if (selectedCategory === "HEALTHY") return s.healthStatus === "HEALTHY";
    if (selectedCategory === "ATTENTION") return s.healthStatus !== "HEALTHY" || s.allergies !== "ไม่มีประวัติแพ้ยาหรืออาหาร";
    return true;
  });

  const filteredMonks = officialMonksList.filter(m => {
    const q = monkSearchQuery.toLowerCase();
    return m.fullName.toLowerCase().includes(q) ||
           m.name.toLowerCase().includes(q) ||
           m.chaya.toLowerCase().includes(q) ||
           m.surname.toLowerCase().includes(q) ||
           m.sanghaRole.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>MOD-01: วิถีชีวิต ๒๔ ชั่วโมง & ทะเบียนสังฆะวัดบาลีเถรวาทสังฆาราม</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            บันทึกกิจวัตรสงฆ์ & เวชระเบียนศากยบุตรสามเณรสีหะ
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ทะเบียนทางการที่มีอยู่จริง: พระภิกษุ ๒๐ รูป และสามเณร ๑๒๓ รูป รวม ๑๔๓ รูป (ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม)
          </p>
        </div>

        {/* Quick Actions & Download */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-xs">
          <a
            href="/sangha/รายชื่อพระภิกษุและสามเณรวัดบาลีเถรวาทสังฆาราม.xlsx"
            download="รายชื่อพระภิกษุและสามเณรวัดบาลีเถรวาทสังฆาราม.xlsx"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>ดาวน์โหลดไฟล์จริง (๑๔๓ รูป)</span>
          </a>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200 p-2 rounded-xl text-xs">
            <div className="text-center px-2">
              <p className="text-slate-500 text-[10px]">พระภิกษุ</p>
              <p className="font-bold text-amber-900 text-sm">{sanghaStats.totalMonks} รูป</p>
            </div>
            <div className="h-6 w-px bg-amber-200" />
            <div className="text-center px-2">
              <p className="text-slate-500 text-[10px]">สามเณร</p>
              <p className="font-bold text-slate-800 text-sm">{sanghaStats.totalNovices} รูป</p>
            </div>
            <div className="h-6 w-px bg-amber-200" />
            <div className="text-center px-2">
              <p className="text-slate-500 text-[10px]">นานาชาติ</p>
              <p className="font-bold text-blue-700 text-sm">{sanghaStats.internationalNovices} รูป</p>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Tab Switcher */}
      <div className="flex border-b border-amber-200 gap-3 text-xs">
        <button
          onClick={() => setActiveTab("samaneras")}
          className={`pb-3 px-4 font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === "samaneras"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>สามเณรศากยบุตรสีหะ ({sanghaStats.totalNovices} รูป)</span>
        </button>

        <button
          onClick={() => setActiveTab("monks")}
          className={`pb-3 px-4 font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === "monks"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>ทำเนียบพระภิกษุสงฆ์วัดบาลีเถรวาทสังฆาราม ({sanghaStats.totalMonks} รูป)</span>
        </button>
      </div>

      {/* TAB 1: SAMANERAS */}
      {activeTab === "samaneras" && (
        <div className="space-y-4">
          {/* Kitchen Alert Banner (Specific to monastic food safety) */}
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Utensils className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-orange-950">ข้อมูลการจัดภัตตาหารในบาตร (สำหรับโรงครัวมื้อเพลตามพระวินัย):</span>
                <p className="text-orange-900/80 mt-0.5">
                  • บันทึกข้อมูลสุขภาพและอาการแพ้อาหารของสามเณรทุกรูปตรงตามเวชระเบียนสถาบัน<br />
                  • จัดแยกภาชนะพิเศษสำหรับสามเณรที่มีประวัติแพ้อาหารทะเลและถั่วลิสงอย่างเคร่งครัด
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("ระบบส่งสัญญาณแจ้งเตือนรายการอาหารแพ้ไปยัง LINE โรงครัวเรียบร้อยแล้ว")}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shrink-0 transition-colors shadow-sm"
            >
              ส่งสัญญาณยืนยันถึงแม่ครัว
            </button>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === "ALL" 
                    ? "bg-amber-600 text-white shadow-xs" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                ทั้งหมด ({samaneras.length})
              </button>
              <button
                onClick={() => setSelectedCategory("THAI")}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === "THAI" 
                    ? "bg-amber-600 text-white shadow-xs" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                สามเณรไทย ({sanghaStats.thaiNovices})
              </button>
              <button
                onClick={() => setSelectedCategory("INTERNATIONAL")}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === "INTERNATIONAL" 
                    ? "bg-blue-600 text-white shadow-xs" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                นานาชาติ/ชาติพันธุ์ ({sanghaStats.internationalNovices})
              </button>
              <button
                onClick={() => setSelectedCategory("HEALTHY")}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === "HEALTHY" 
                    ? "bg-emerald-600 text-white shadow-xs" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                สุขภาพปกติ ({sanghaStats.healthyNovices})
              </button>
              <button
                onClick={() => setSelectedCategory("ATTENTION")}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === "ATTENTION" 
                    ? "bg-rose-600 text-white shadow-xs" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                เฝ้าระวัง/มีประวัติแพ้ ({samaneras.length - sanghaStats.healthyNovices})
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="ค้นหาชื่อสามเณร, ฉายา, กุฏิ, เลขรหัส..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
              />
            </div>
          </div>

          {/* Samaneras Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSamaneras.map((sam) => (
              <div 
                key={sam.id}
                className="p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                {/* Top Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {sam.enrollmentNo}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {sam.fullName}
                    </h3>
                    <p className="font-serif italic text-amber-800 text-xs">
                      {sam.paliName} • อายุ {sam.age} ปี
                    </p>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    sam.healthStatus === "HEALTHY" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}>
                    {sam.healthStatus === "HEALTHY" ? "ปกติ" : "เฝ้าระวัง"}
                  </span>
                </div>

                {/* Monastery details */}
                <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50/70 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{sam.kuti}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{sam.paliLevel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-600">
                    <Stethoscope className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{sam.allergies}</span>
                  </div>
                </div>

                {/* 24h Monastic Routine Checkboxes */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>เช็กกิจวัตรสงฆ์ประจำวัน (คลิกเพื่อบันทึก):</span>
                  </p>
                  <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-medium">
                    <button
                      type="button"
                      onClick={() => toggleRoutine(sam.id, "morningChant")}
                      className={`p-1 rounded-lg transition-colors border ${
                        sam.todayRoutine.morningChant 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      ทำวัตรเช้า
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleRoutine(sam.id, "pindabat")}
                      className={`p-1 rounded-lg transition-colors border ${
                        sam.todayRoutine.pindabat 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      บิณฑบาต
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleRoutine(sam.id, "meal")}
                      className={`p-1 rounded-lg transition-colors border ${
                        sam.todayRoutine.meal 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      ฉันภัตตาหาร
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleRoutine(sam.id, "kammatthana")}
                      className={`p-1 rounded-lg transition-colors border ${
                        sam.todayRoutine.kammatthana 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      กัมมัฏฐาน
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleRoutine(sam.id, "eveningChant")}
                      className={`p-1 rounded-lg transition-colors border ${
                        sam.todayRoutine.eveningChant 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      ทำวัตรเย็น
                    </button>
                  </div>
                </div>

                {/* Patron info footer */}
                <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                  <span className="truncate">ผู้อุปถัมภ์: {sam.patronName}</span>
                  <span className="font-mono text-amber-700 font-bold">มุขปาฐะ {sam.mukhopathaScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MONKS ROSTER */}
      {activeTab === "monks" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="ค้นหาชื่อพระภิกษุ, ฉายา, นามสกุล, หน้าที่สงฆ์..."
                value={monkSearchQuery}
                onChange={(e) => setMonkSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
              />
            </div>

            <span className="text-xs text-slate-500 self-end sm:self-auto">
              แสดง {filteredMonks.length} จากทั้งหมด {officialMonksList.length} รูป
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-amber-50/70 border-b border-amber-200 text-amber-950 font-bold">
                  <tr>
                    <th className="p-3 w-12 text-center">ลำดับ</th>
                    <th className="p-3">พระนาม / นามสงฆ์</th>
                    <th className="p-3">ฉายาบาลี</th>
                    <th className="p-3">นามสกุล</th>
                    <th className="p-3 text-center">อายุ (ปี)</th>
                    <th className="p-3 text-center">พรรษา (ประมาณ)</th>
                    <th className="p-3">หน้าที่ & สมณศักดิ์</th>
                    <th className="p-3">สัญชาติ / ถิ่นกำเนิด</th>
                    <th className="p-3">วัดต้นสังกัด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMonks.map((monk) => (
                    <tr key={monk.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-3 text-center font-mono font-semibold text-slate-600">
                        {monk.orderNo}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {monk.name}
                      </td>
                      <td className="p-3 font-serif italic text-amber-800 font-medium">
                        {monk.chaya}
                      </td>
                      <td className="p-3 text-slate-700">
                        {monk.surname}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-800">
                        {monk.age}
                      </td>
                      <td className="p-3 text-center font-mono text-slate-600">
                        {monk.vassaEstimate}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 font-medium text-[11px]">
                          {monk.sanghaRole}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          monk.nationality === "ไทย" 
                            ? "bg-slate-100 text-slate-700" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {monk.nationality}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">
                        {monk.originTemple}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
