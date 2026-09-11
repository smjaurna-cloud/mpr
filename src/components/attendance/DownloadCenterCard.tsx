"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  Users,
  ScanFace,
  CreditCard,
  MessageSquare,
  Award,
  FileJson,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { ZOOM_ROOMS } from "@/data/zoomScheduleData";

export default function DownloadCenterCard() {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const triggerDownload = (filename: string, content: string, mimeType: string = "text/csv;charset=utf-8;") => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadMsg(`ดาวน์โหลดไฟล์ "${filename}" เรียบร้อยแล้ว`);
    setTimeout(() => setDownloadMsg(null), 3500);
  };

  const handleDownloadTimetable = () => {
    let csv = "\uFEFFห้องซูม,ชื่อห้อง,วัน,ช่วงเวลา,เวลา,รหัสวิชา,ชื่อวิชา (ภาษาไทย),ชื่อวิชา (ภาษาอังกฤษ),ประเภทวิชา,หน่วยกิต,อาจารย์ผู้รับผิดชอบ,คณะผู้สอน,กลุ่มผู้เรียน\n";
    ZOOM_ROOMS.forEach((room) => {
      room.schedules?.forEach((sch) => {
        const team = sch.teachingTeam ? `"${sch.teachingTeam.join(", ")}"` : `"${sch.instructor}"`;
        csv += `"${room.roomNumber}","${room.name}","${sch.day}","${sch.period}","${sch.timeRange}","${sch.courseCode}","${sch.courseNameTh}","${sch.courseNameEn || "" }","${sch.courseType}","${sch.credits}","${sch.instructor}",${team},"${sch.cohortPlan || ""}"\n`;
      });
    });
    triggerDownload(`timetable_4_rooms_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadStudents = () => {
    const csv = "\uFEFFรหัสประจำตัว,คำนำหน้า,ชื่อ,ฉายา/นามสกุล,ระดับการศึกษา,สาขาวิชา,รุ่นที่,สถานะภาพ,อีเมลประจำตัว\n" +
      `"670101","พระ","สมศักดิ์","ธมฺมกาโม","พธ.ม.","สาขาวิชาพระไตรปิฎกเถรวาท","รุ่นที่ ๓","กำลังศึกษา","somsak@mcu.ac.th"\n` +
      `"670102","สามเณร","นรินทร์","บุญชัย","พธ.ม.","สาขาวิชาพระไตรปิฎกเถรวาท","รุ่นที่ ๓","กำลังศึกษา","narin@mcu.ac.th"\n` +
      `"670103","นาย","วิชัย","วัฒนกิจ","พธ.ม.","สาขาวิชาพระไตรปิฎกเถรวาท","รุ่นที่ ๓","กำลังศึกษา","wichai@mcu.ac.th"\n` +
      `"670201","พระ","กิตติ","กิตฺติธโร","พธ.ม.","สาขาวิชาพระอภิธรรมปิฎก","รุ่นที่ ๒","กำลังศึกษา","kitti@mcu.ac.th"\n` +
      `"670202","พระมหา","อนันต์","ญาณธีโร","พธ.ม.","สาขาวิชาพระอภิธรรมปิฎก","รุ่นที่ ๑","กำลังศึกษา","anan@mcu.ac.th"\n` +
      `"670203","แม่ชี","วรินดา","โชคดี","พธ.ม.","สาขาวิชาพระอภิธรรมปิฎก","รุ่นที่ ๒","กำลังศึกษา","warinda@mcu.ac.th"\n` +
      `"670301","พระครู","วินัยธรบุญชู","ชุตินฺธโร","พธ.ด.","สาขาวิชาพระไตรปิฎกศึกษา","รุ่นที่ ๓","กำลังศึกษา","boonchu@mcu.ac.th"\n` +
      `"670302","พระมหา","ชัชวาลย์","ชวนปญฺโญ","พธ.ด.","สาขาวิชาพระไตรปิฎกศึกษา","รุ่นที่ ๒","กำลังศึกษา","chatchawal@mcu.ac.th"\n` +
      `"670401","พระ","ปัญญา","ปญฺญาวโร","ป.บ.ส.","หลักสูตรประกาศนียบัตรพระไตรปิฎกศึกษา","รุ่นที่ ๔","กำลังศึกษา","panya@mcu.ac.th"\n` +
      `"670402","นางสาว","กัญญา","สุขสมบูรณ์","ป.บ.ส.","หลักสูตรประกาศนียบัตรพระไตรปิฎกศึกษา","รุ่นที่ ๔","กำลังศึกษา","kanya@mcu.ac.th"\n`;
    triggerDownload(`students_roster_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadAttendance = () => {
    const csv = "\uFEFFวันที่,เวลา,รหัสประจำตัว,ชื่อ-ฉายา,ห้องเรียน/วิชา,วิธีการเช็คชื่อ,ค่าความคล้ายคลึง (%),สถานะ\n" +
      `"${new Date().toISOString().slice(0, 10)}","12:48:15","670101","พระสมศักดิ์ ธมฺมกาโม","ซูมห้องที่ ๑ (๖๒๐ ๑๐๑)","สแกนใบหน้า Face Mesh","98.5","เข้าเรียนตรงเวลา (On Time)"\n` +
      `"${new Date().toISOString().slice(0, 10)}","12:51:02","670102","สามเณรนรินทร์ บุญชัย","ซูมห้องที่ ๑ (๖๒๐ ๑๐๑)","สแกนใบหน้า Face Mesh","96.2","เข้าเรียนตรงเวลา (On Time)"\n` +
      `"${new Date().toISOString().slice(0, 10)}","13:05:40","670201","พระกิตติ กิตฺติธโร","ซูมห้องที่ ๒ (๖๒๑ ๑๐๑)","สแกนใบหน้า Face Mesh","94.8","เข้าเรียนสาย (Late)"\n` +
      `"${new Date().toISOString().slice(0, 10)}","13:10:12","670301","พระครูวินัยธรบุญชู ชุตินฺธโร","ซูมห้องที่ ๓ (๖๒๑ ๑๐๕)","สแกนใบหน้า Face Mesh","97.1","เข้าเรียนสาย (Late)"\n`;
    triggerDownload(`attendance_log_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadTuition = () => {
    const csv = "\uFEFFเลขที่ใบเสร็จ,รหัสประจำตัว,ชื่อ-ฉายา,หลักสูตร,ภาคการศึกษา,จำนวนเงิน (บาท),ช่องทางชำระ,สถานะการชำระ,วันที่ออกใบเสร็จ\n" +
      `"INV-256901-001","670101","พระสมศักดิ์ ธมฺมกาโม","พธ.ม. พระไตรปิฎกเถรวาท","ภาคการศึกษาที่ ๑/๒๕๖๙","15000","QR PromptPay ผ่าน Krungthai","ชำระแล้ว (Paid)","2026-09-01"\n` +
      `"INV-256901-002","670102","สามเณรนรินทร์ บุญชัย","พธ.ม. พระไตรปิฎกเถรวาท","ภาคการศึกษาที่ ๑/๒๕๖๙","15000","ทุนการศึกษาสงฆ์","ชำระแล้ว (Paid)","2026-09-01"\n` +
      `"INV-256901-003","670201","พระกิตติ กิตฺติธโร","พธ.ม. พระอภิธรรมปิฎก","ภาคการศึกษาที่ ๑/๒๕๖๙","15000","QR PromptPay ผ่าน Krungthai","ชำระแล้ว (Paid)","2026-09-02"\n` +
      `"INV-256901-004","670301","พระครูวินัยธรบุญชู ชุตินฺธโร","พธ.ด. พระไตรปิฎกศึกษา","ภาคการศึกษาที่ ๑/๒๕๖๙","25000","โอนผ่านเคาน์เตอร์ธนาคาร","ชำระแล้ว (Paid)","2026-09-03"\n`;
    triggerDownload(`tuition_receipts_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadPetitions = () => {
    const csv = "\uFEFFรหัสคำร้อง,วันที่ยื่น,หมวดหมู่,หัวข้อคำร้อง,สถานะการดำเนินงาน,ผู้รับผิดชอบ\n" +
      `"REQ-2569-001","2026-09-02","งานวิชาการ","ขอเอกสารรับรองสถานภาพการศึกษาออนไลน์","อนุมัติแล้ว (Approved)","ฝ่ายทะเบียนและประมวลผล"\n` +
      `"REQ-2569-002","2026-09-03","ระบบไอที/สแกนใบหน้า","ขอลงทะเบียนใบหน้าซ้ำเนื่องจากกล้องเดิมภาพเบลอ","เสร็จสิ้น (Completed)","ผู้ดูแลระบบไอที (Somboon Admin)"\n` +
      `"REQ-2569-003","2026-09-05","อาคารสถานที่","ขอจองห้องพระไตรปิฎกศึกษาสำหรับกลุ่มสัมมนาพิเศษ","กำลังดำเนินการ (In Progress)","ฝ่ายบริหารอาคารสถานที่"\n`;
    triggerDownload(`petitions_log_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadGraduateProgress = () => {
    const csv = "\uFEFFลำดับ,ชื่อ-ฉายา-นามสกุล,หลักสูตร,รุ่นที่,ร้อยละความก้าวหน้า (%),สถานะสอบโครงร่าง,สถานะปฏิบัติธรรม,สถานะสอบ QE\n" +
      `"1","พระครูสิริรัตนบัณฑิต สุยวฑฺฒโน แก้วมณี","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","14%","ยังไม่สอบ","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"2","พระครูวิสิฐกิจจารักษ์ รตนโชโต ศะตากูล","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","14%","ยังไม่สอบ","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"3","พระครูเกษมธรรมาภิรักษ์ ชิตตาโภ บุญมา","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","14%","ยังไม่สอบ","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"4","พระครูปลัดนายกวรวัฒน์ ญาณทีโป ตติยวังสนสิทธิ","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","43%","ผ่านสอบโครงร่าง","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"5","พระครูสิทธิสารคุณ ธีรจิตฺโต วรวิทยอาศา","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","43%","ผ่านสอบโครงร่าง","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"6","พระปลัดจตุรภัทร ถาวโร วงศ์วรชนทัต","พธ.ด. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","48%","ผ่านสอบโครงร่าง","ผ่าน (๔๕ วัน)","ผ่าน"\n` +
      `"7","พระหาญศักดิ์ ขนฺติสุโภ สังสัมฤทธิ์","พธ.ม. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","27%","ผ่านสอบโครงร่าง","รอดำเนินการ","-"\n` +
      `"8","พระสมุห์ นภดล ปภาโส โพธิวุฒิ","พธ.ม. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","27%","ผ่านสอบโครงร่าง","รอดำเนินการ","-"\n` +
      `"9","พระมหาวิศรุต นริสฺสโร อาษาวัง","พธ.ม. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","27%","ผ่านสอบโครงร่าง","รอดำเนินการ","-"\n` +
      `"10","นายอาณัติชัย เหลืองอมรชัย","พธ.ม. พระไตรปิฎกเถรวาท","รุ่นที่ ๑","27%","ผ่านสอบโครงร่าง","รอดำเนินการ","-"\n`;
    triggerDownload(`graduate_progress_summary_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const handleDownloadSystemJSON = () => {
    const data = {
      system: "SMST & Mahavajiralongkorn Bali Theravada Rajavidyalaya Portal",
      exportDate: new Date().toISOString(),
      admin: "Somboon Admin (addmin)",
      zoomRooms: ZOOM_ROOMS,
      version: "1.0.0",
    };
    triggerDownload(`mpr_system_config_${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2), "application/json;charset=utf-8;");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-rose-600" />
              <span>ศูนย์ดาวน์โหลดและส่งออกชุดข้อมูลระบบ (Data Export & Download Center)</span>
            </h3>
            <p className="text-xs text-slate-500">
              ดาวน์โหลดข้อมูลเพื่อนำไปวิเคราะห์ใน Microsoft Excel, Google Sheets (UTF-8 BOM รองรับภาษาไทย 100%) หรือส่งต่อหน่วยงานที่เกี่ยวข้อง
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200">
              UTF-8 BOM Thai Compatible
            </span>
          </div>
        </div>

        {downloadMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Timetable */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-amber-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">ตารางเรียนและอาจารย์ ๔ ห้อง</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                ตารางสอนรวม ๔ ห้องซูม ภาคเรียนที่ ๑/๒๕๖๙ รายชื่อวิชา คณาจารย์ผู้สอน วันและเวลาเรียน
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">๔ หลักสูตร</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadTimetable}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด CSV (Excel)</span>
            </button>
          </div>

          {/* Card 2: Student Roster */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-blue-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">ทะเบียนรายชื่อนิสิต (Student Roster)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                รายชื่อพระภิกษุ สามเณร คฤหัสถ์ รหัสนิสิต ระดับการศึกษา สาขาวิชา รุ่นที่ และสถานะภาพ
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">PDPA Protected</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadStudents}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด CSV (Excel)</span>
            </button>
          </div>

          {/* Card 3: Attendance Logs */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-emerald-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <ScanFace className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">ประวัติการเข้าเรียน (Attendance Log)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                บันทึกการเช็คชื่อเข้าชั้นเรียน วันที่ เวลา วิชา วิธีสแกน Face Mesh และสถานะตรงเวลา/มาสาย
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Biometric Verified</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadAttendance}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด CSV (Excel)</span>
            </button>
          </div>

          {/* Card 4: Tuition Receipts */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-purple-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">ทะเบียนชำระค่าเทอม (Tuition Ledger)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                รายการออกใบเสร็จรับเงินค่าลงทะเบียนเรียน จำนวนเงิน เลขที่ใบเสร็จ ช่องทางชำระ และสถานะ
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">การเงิน & บัญชี</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadTuition}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด CSV (Excel)</span>
            </button>
          </div>

          {/* Card 5: Petitions Log */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-rose-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">บันทึกคำร้องเรียน (Petitions Log)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                รายการคำร้องเรียนและข้อเสนอแนะ ๕ หมวดหมู่ รหัสติดตาม วันที่ยื่น และสถานะผลการดำเนินการ
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">๕ หมวดหมู่</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadPetitions}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด CSV (Excel)</span>
            </button>
          </div>

          {/* Card 6: Graduate Progress Tracking */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-amber-500 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">ความก้าวหน้าดุษฎีนิพนธ์ & วิทยานิพนธ์</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                รายงานความก้าวหน้า ๒๑ ขั้นตอน (พธ.ด. ๒๖ รูป) และ ๑๕ ขั้นตอน (พธ.ม. ๘ รูป)
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.CSV (Excel)</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">พธ.ด. & พธ.ม.</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleDownloadGraduateProgress}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลด CSV (Excel)</span>
              </button>
              <Link
                href="/graduate-progress"
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-[11px] font-semibold transition-colors"
              >
                <span>เปิดกระดานบอร์ด &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 7: Full System JSON */}
          <div className="p-5 rounded-xl border border-stone-200 hover:border-slate-400 bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <FileJson className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">สำรองคอนฟิกระบบ (System JSON)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                ไฟล์โครงสร้างระบบทั้งหมด ตารางห้องเรียน สิทธิ์ผู้ดูแลระบบ Somboon Admin ในรูปแบบ JSON
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded">.JSON</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Full Config</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadSystemJSON}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Quick Access to Standalone SMST App */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-amber-900">
            <span className="font-bold">ต้องการดาวน์โหลดฐานข้อมูลไบโอเมตริกซ์สดหรือสำรอง LocalStorage?</span>
            <p className="text-amber-700 text-[11px]">คุณสามารถเปิดระบบ SMST Standalone App ที่พอร์ต 5173 เพื่อส่งออกเวกเตอร์และสถิติเรียลไทม์ได้เช่นกัน</p>
          </div>
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
          >
            <span>เปิด SMST Data Center</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
