"use client";

import React, { useState } from "react";
import { 
  Share2, 
  Download, 
  CheckCircle2, 
  FileSpreadsheet, 
  Database, 
  ShieldCheck, 
  Search, 
  Filter, 
  GraduationCap,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { mockSamaneras } from "@/data/mockData";

export default function MCUBridgePage() {
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExportBatch = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportSuccess(true);
      
      // Simulate CSV file download
      const csvHeader = "MCU_STUDENT_ID,SAMANERA_CODE,FULL_NAME,PALI_NAME,TEMPLE,PALI_LEVEL,GPAX,VIPASSANA_HOURS,STATUS\n";
      const csvRows = mockSamaneras.map(s => 
        `${s.mcuId},${s.enrollmentNo},"${s.fullName}","${s.paliName}","${s.originTemple}","${s.paliLevel}",3.88,120,ACTIVE`
      ).join("\n");
      
      const blob = new Blob(["\uFEFF" + csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `MCU_REG_BATCH_EXPORT_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setExportSuccess(false), 6000);
    }, 1500);
  };

  const filtered = mockSamaneras.filter(s => 
    s.fullName.includes(searchQuery) || 
    s.paliName.includes(searchQuery) || 
    s.mcuId.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>MOD-05: ระบบทะเบียนสองมิติ & สะพานข้อมูล มจร (MCU Data Bridge)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ทะเบียนประวัตินิสิตสงฆ์ & ส่งออกข้อมูลเข้าสู่ระบบ MCU REG
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            เชื่อมประสานข้อมูลผลการเรียน ชั่วโมงปฏิบัติธรรมวิปัสสนากรรมฐาน และสถานภาพนิสิตส่งตรงสู่ส่วนกลาง มจร วังน้อย
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportBatch}
          disabled={exporting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {exporting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>กำลังแปลงโครงสร้างข้อมูล...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>ส่งออกไฟล์ MCU-REG Batch CSV</span>
            </>
          )}
        </button>
      </div>

      {exportSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">ส่งออกชุดข้อมูล MCU REG สำเร็จแล้ว!</p>
              <p className="text-[11px] text-emerald-700">
                ไฟล์ CSV ได้รับการเข้ารหัส UTF-8 with BOM รองรับการ Import เข้าสู่ระบบทะเบียนกลาง มจร ทันทีโดยภาษาไทยไม่เพี้ยน
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-mono px-2 py-1 rounded">
            CheckSum: 0x8FA4...C21B
          </span>
        </div>
      )}

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>รูปแบบเชื่อมโยง</span>
            <Database className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-bold text-slate-800">MCU REG Batch Schema v2.4</p>
          <p className="text-[11px] text-emerald-600">✓ แมปฟิลด์ข้อมูลถูกต้อง ๑๐๐%</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>เกณฑ์ปฏิบัติธรรม มจร</span>
            <GraduationCap className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-bold text-slate-800">วิปัสสนากรรมฐาน ๑๐ วัน/ปี</p>
          <p className="text-[11px] text-emerald-600">✓ ผ่านเกณฑ์ครบทุกรูป (๑๒๐ ชม.)</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>มาตรฐานความปลอดภัย</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-bold text-slate-800">PDPA Compliant (เด็ก/สามเณร)</p>
          <p className="text-[11px] text-slate-500">เข้ารหัสข้อมูลบัตร ปชช. / ฉายา</p>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">ทะเบียนศากยบุตรสามเณรสีหะ & ข้อมูลเชื่อม มจร</h2>
            <p className="text-xs text-slate-500">รายชื่อพร้อมรหัสนิสิต มจร เพื่อการส่งเกรดและการขึ้นทะเบียนปริญญา</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ, ฉายา, รหัส มจร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">รหัสศากยบุตร</th>
                <th className="py-3 px-4">รหัสนิสิต มจร</th>
                <th className="py-3 px-4">ชื่อ - นามสกุล (ฉายา)</th>
                <th className="py-3 px-4">ระดับการศึกษาบาลี</th>
                <th className="py-3 px-4">วัดต้นสังกัด</th>
                <th className="py-3 px-4 text-center">ชั่วโมงกัมมัฏฐาน</th>
                <th className="py-3 px-4 text-center">สถานะ มจร</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-900">{s.enrollmentNo}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{s.mcuId}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{s.fullName}</span>
                    <span className="text-[11px] text-amber-800 font-serif">ฉายา "{s.paliName}"</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{s.paliLevel}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.originTemple}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-emerald-700">๑๒๐ ชม.</span>
                    <span className="block text-[10px] text-slate-400">ครบเกณฑ์</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      ปกติ (Active)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
