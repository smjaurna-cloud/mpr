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
  Sparkles
} from "lucide-react";
import { mockSamaneras, Samanera } from "@/data/mockData";

export default function MonasticLifePage() {
  const [samaneras, setSamaneras] = useState<Samanera[]>(mockSamaneras);
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "HEALTHY" | "ATTENTION">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

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

  const filtered = samaneras.filter(s => {
    const matchQuery = s.fullName.includes(searchQuery) || 
                       s.paliName.includes(searchQuery) || 
                       s.enrollmentNo.includes(searchQuery) || 
                       s.kuti.includes(searchQuery);
    if (selectedCategory === "ALL") return matchQuery;
    if (selectedCategory === "HEALTHY") return matchQuery && s.healthStatus === "HEALTHY";
    if (selectedCategory === "ATTENTION") return matchQuery && (s.healthStatus !== "HEALTHY" || s.allergies !== "ไม่มีประวัติแพ้ยาและอาหาร");
    return matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>MOD-01: วิถีชีวิต ๒๔ ชั่วโมง & สุขภาวะศากยบุตรสามเณร</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            บันทึกกิจวัตรสงฆ์ & เวชระเบียนศากยบุตรสามเณรสีหะ
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ระบบติดตามการทำวัตร บิณฑบาต กัมมัฏฐาน และสุขภาพตามมาตรฐานการคุ้มครองเด็ก (Child Safeguarding)
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl text-xs">
          <div className="text-center px-2">
            <p className="text-slate-500 text-[10px]">สามเณรทั้งหมด</p>
            <p className="font-bold text-slate-800 text-sm">{samaneras.length} รูป</p>
          </div>
          <div className="h-6 w-px bg-amber-200" />
          <div className="text-center px-2">
            <p className="text-slate-500 text-[10px]">พร้อมทำวัตร</p>
            <p className="font-bold text-emerald-700 text-sm">
              {samaneras.filter(s => s.healthStatus === "HEALTHY").length} รูป
            </p>
          </div>
          <div className="h-6 w-px bg-amber-200" />
          <div className="text-center px-2">
            <p className="text-slate-500 text-[10px]">พักฟื้น/เฝ้าระวัง</p>
            <p className="font-bold text-rose-700 text-sm">
              {samaneras.filter(s => s.healthStatus !== "HEALTHY").length} รูป
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Kitchen Alert Banner (Specific to monastic food safety) */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Utensils className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-orange-950">ข้อมูลการจัดภัตตาหารในบาตร (สำหรับโรงครัวมื้อเพล):</span>
            <p className="text-orange-900/80 mt-0.5">
              • สามเณร นรินทร์เดช (กุฏิ ๐๓): <strong>งดอาหารทะเลทุกชนิดเด็ดขาด</strong><br />
              • สามเณร ภูมิภัทร (กุฏิ ๐๘): <strong>แพ้ถั่วลิสงอย่างรุนแรง (Anaphylaxis Risk)</strong>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => alert("ระบบส่งแจ้งเตือนรายการอาหารแพ้ไปยัง LINE แม่ครัวและฝ่ายโภชนาการเรียบร้อยแล้ว")}
          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shrink-0 transition-colors shadow-sm"
        >
          ส่งสัญญาณยืนยันถึงแม่ครัว
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, ฉายา, รหัส, กุฏิ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === "ALL" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ทั้งหมด
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("HEALTHY")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === "HEALTHY" ? "bg-white text-emerald-800 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            สุขภาพปกติ
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("ATTENTION")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedCategory === "ATTENTION" ? "bg-white text-rose-800 shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            มีประวัติแพ้/อาพาธ
          </button>
        </div>
      </div>

      {/* Samanera Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((samanera) => (
          <div
            key={samanera.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-4"
          >
            {/* Top Identity Line */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    {samanera.enrollmentNo}
                  </span>
                  <span className="text-xs text-slate-500">มจร: {samanera.mcuId}</span>
                </div>
                <h2 className="font-bold text-slate-900 text-sm mt-1">
                  {samanera.fullName} <span className="text-amber-700 font-medium">({samanera.paliName})</span>
                </h2>
                <p className="text-xs text-slate-500">
                  อายุ {samanera.age} ปี • พรรษา {samanera.vassa} • {samanera.originTemple}
                </p>
              </div>

              {samanera.healthStatus === "HEALTHY" ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                  ปกติ
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-medium animate-pulse">
                  อาพาธ/พักฟื้น
                </span>
              )}
            </div>

            {/* Health & Shelter Info */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> ที่พัก:
                </span>
                <span className="font-medium text-slate-800">{samanera.kuti}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400" /> หมู่โลหิต:
                </span>
                <span className="font-medium text-slate-800">{samanera.bloodType}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-500 flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> การแพ้:
                </span>
                <span className={`font-semibold text-right ${samanera.allergies.includes('แพ้') ? 'text-rose-700' : 'text-slate-600'}`}>
                  {samanera.allergies}
                </span>
              </div>
            </div>

            {/* Today 24-Hour Routine Check-in Matrix */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                บันทึกกิจวัตรประจำวัน (คลิกเพื่อเช็กชื่อ):
              </p>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {/* Morning Chant */}
                <button
                  type="button"
                  onClick={() => toggleRoutine(samanera.id, "morningChant")}
                  className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${
                    samanera.todayRoutine.morningChant
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {samanera.todayRoutine.morningChant ? "✓" : "○"} ทำวัตรเช้า
                </button>

                {/* Pindabat */}
                <button
                  type="button"
                  onClick={() => toggleRoutine(samanera.id, "pindabat")}
                  className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${
                    samanera.todayRoutine.pindabat
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {samanera.todayRoutine.pindabat ? "✓" : "○"} บิณฑบาต
                </button>

                {/* Meal */}
                <button
                  type="button"
                  onClick={() => toggleRoutine(samanera.id, "meal")}
                  className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${
                    samanera.todayRoutine.meal
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {samanera.todayRoutine.meal ? "✓" : "○"} ฉันในบาตร
                </button>

                {/* Kammatthana */}
                <button
                  type="button"
                  onClick={() => toggleRoutine(samanera.id, "kammatthana")}
                  className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${
                    samanera.todayRoutine.kammatthana
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {samanera.todayRoutine.kammatthana ? "✓" : "○"} กัมมัฏฐาน
                </button>

                {/* Evening Chant */}
                <button
                  type="button"
                  onClick={() => toggleRoutine(samanera.id, "eveningChant")}
                  className={`p-2 rounded-lg border text-[10px] font-semibold transition-all ${
                    samanera.todayRoutine.eveningChant
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {samanera.todayRoutine.eveningChant ? "✓" : "○"} ทำวัตรเย็น
                </button>
              </div>
            </div>

            {/* Bottom Patron Link */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>โยมอุปถัมภ์: <strong className="text-slate-700">{samanera.patronName}</strong></span>
              <span className="text-amber-700 font-medium">คะแนนมุขปาฐะ {samanera.mukhopathaScore}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
