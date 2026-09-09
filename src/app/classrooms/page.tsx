"use client";

import React, { useState, useMemo } from "react";
import {
  School,
  BookOpen,
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  GraduationCap,
  Clock,
  Laptop,
  CheckCircle2,
  Printer,
  Info
} from "lucide-react";
import {
  mockClassrooms,
  classroomRules,
  getClassroomStats,
  ClassroomInfo,
  ClassroomStudent
} from "@/data/classroomsData";

export default function ClassroomsPage() {
  const stats = useMemo(() => getClassroomStats(), []);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("ALL");
  const [courseFilter, setCourseFilter] = useState<"ALL" | "นักธรรม" | "บาลีสนามหลวง">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [unmaskPdpa, setUnmaskPdpa] = useState(false);

  // Masking helper function for Novice Minor protection
  const formatIdCard = (idStr: string) => {
    if (unmaskPdpa) return idStr;
    const trimmed = idStr.trim();
    if (trimmed.length <= 6) return "***" + trimmed.slice(-2);
    // Mask middle digits
    if (trimmed.includes("-")) {
      const parts = trimmed.split("-");
      if (parts.length >= 4) {
        return `${parts[0]}-XXXX-XXXXX-${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
      }
    }
    return trimmed.slice(0, 3) + "******" + trimmed.slice(-2);
  };

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    let list = mockClassrooms;
    if (selectedRoomId !== "ALL") {
      list = list.filter((r) => r.roomId === selectedRoomId);
    }
    return list;
  }, [selectedRoomId]);

  // Aggregate or search students
  const filteredStudentEntries = useMemo(() => {
    const results: { room: ClassroomInfo; sectionName: string; courseType: string; teacherList: string[]; student: ClassroomStudent }[] = [];
    
    filteredRooms.forEach((room) => {
      room.sections.forEach((sec) => {
        if (courseFilter !== "ALL" && sec.courseType !== courseFilter) {
          return;
        }
        sec.students.forEach((student) => {
          const matchQuery =
            !searchQuery ||
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.idCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (student.note && student.note.toLowerCase().includes(searchQuery.toLowerCase()));

          if (matchQuery) {
            results.push({
              room,
              sectionName: sec.levelName,
              courseType: sec.courseType,
              teacherList: sec.teachers,
              student,
            });
          }
        });
      });
    });
    return results;
  }, [filteredRooms, courseFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <School className="w-80 h-80" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-amber-100 text-xs font-medium mb-3 backdrop-blur-xs border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>สำนักวิชาการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            การจัดผังห้องเรียน & บาลีสนามหลวง (A 1 – A 6)
          </h1>
          <p className="text-amber-100/90 text-sm max-w-3xl leading-relaxed">
            ระบบบริหารจัดการห้องเรียน ๖ ห้องเรียน ประจำหลักสูตรนักธรรมและบาลีสนามหลวง จัดสรรอาจารย์ผู้สอน 
            และบัญชีรายนามสามเณรศากยบุตรอย่างเป็นสัดส่วน พร้อมมาตรการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ตามกฎบัตรสงฆ์
          </p>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalRooms} ห้อง</div>
            <div className="text-xs text-amber-900 font-medium">ห้องเรียนหลัก (A 1 ถึง A 6)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalNakThamEnrollments} รูป/คน</div>
            <div className="text-xs text-gray-600 font-medium">ชั้นนักธรรม (ตรี, โท, เอก)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPaliEnrollments} รูป</div>
            <div className="text-xs text-gray-600 font-medium">บาลีสนามหลวง (+๑๐ อัตรา ป.ธ.๔)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stats.uniqueStudentsCount} รูป/คน</div>
            <div className="text-xs text-gray-600 font-medium">จำนวนศาสนทายาทสุทธิ</div>
          </div>
        </div>
      </div>

      {/* Monastic Classroom Regulations */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-amber-900 font-semibold text-sm">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>ข้อปฏิบัติและระเบียบการใช้ห้องเรียน มบร.</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-amber-950">
          {classroomRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-amber-200/60">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar: Filters, Search, and PDPA Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-4">
        {/* Room Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100">
          <button
            onClick={() => setSelectedRoomId("ALL")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedRoomId === "ALL"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-800"
            }`}
          >
            ทุกห้องเรียน (A 1 – A 6)
          </button>
          {mockClassrooms.map((room) => (
            <button
              key={room.roomId}
              onClick={() => setSelectedRoomId(room.roomId)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedRoomId === room.roomId
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              {room.roomName}
            </button>
          ))}
        </div>

        {/* Sub-Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 text-xs">
              <button
                onClick={() => setCourseFilter("ALL")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  courseFilter === "ALL" ? "bg-white font-semibold text-gray-900 shadow-xs" : "text-gray-600"
                }`}
              >
                ทุกสายวิชา
              </button>
              <button
                onClick={() => setCourseFilter("นักธรรม")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  courseFilter === "นักธรรม" ? "bg-emerald-500 text-white font-semibold shadow-xs" : "text-gray-600"
                }`}
              >
                นักธรรม
              </button>
              <button
                onClick={() => setCourseFilter("บาลีสนามหลวง")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  courseFilter === "บาลีสนามหลวง" ? "bg-indigo-600 text-white font-semibold shadow-xs" : "text-gray-600"
                }`}
              >
                บาลีสนามหลวง
              </button>
            </div>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อสามเณร, เลขบัตร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {/* PDPA Masking Button */}
            <button
              onClick={() => setUnmaskPdpa(!unmaskPdpa)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                unmaskPdpa
                  ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              }`}
              title="คุ้มครองข้อมูลเยาวชนตามกฎบัตรสงฆ์และ PDPA"
            >
              {unmaskPdpa ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>แสดงเลขบัตรเต็ม (เจ้าหน้าที่)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>โหมดคุ้มครอง PDPA (ปิดบังเลข)</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gray-600" />
              <span>พิมพ์ใบรายชื่อ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Room Header Card (When single room selected) */}
      {selectedRoomId !== "ALL" && (
        <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs">
          {mockClassrooms
            .filter((r) => r.roomId === selectedRoomId)
            .map((room) => (
              <div key={room.roomId} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                      <School className="w-5 h-5 text-amber-600" />
                      <span>{room.roomName}</span>
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">{room.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      {room.cleaningDutyTeam}
                    </span>
                    {room.requiresTechLabApproval && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
                        <Laptop className="w-3 h-3" />
                        <span>ขออนุญาตห้องคอมล่วงหน้า</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        sec.courseType === "นักธรรม"
                          ? "bg-emerald-50/40 border-emerald-200"
                          : "bg-indigo-50/40 border-indigo-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            sec.courseType === "นักธรรม"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-indigo-100 text-indigo-800"
                          }`}
                        >
                          {sec.courseType}
                        </span>
                        <span className="text-xs font-medium text-gray-600">
                          {sec.students.length} {sec.students.length > 0 ? "รูป/คน" : "(เปิดรับ ๑๐ อัตรา)"}
                        </span>
                      </div>
                      <div className="font-semibold text-sm text-gray-900 mb-1">{sec.levelName}</div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium text-gray-800">อาจารย์ผู้สอน: </span>
                        {sec.teachers.join(" | ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Roster Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-gray-800">
              บัญชีรายนามสามเณรและพระภิกษุผู้เข้ารับการอบรม
            </span>
            <span className="text-xs text-gray-500">
              ({filteredStudentEntries.length} รายการที่ตรงกับเงื่อนไข)
            </span>
          </div>
          <div className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            วส. มจร สงฆ์สังฆาภิบาล
          </div>
        </div>

        {filteredStudentEntries.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            ไม่พบข้อมูลนักเรียนตามเงื่อนไขที่เลือก
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/70 border-b border-amber-200/80 text-amber-900 font-semibold">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">ลำดับ</th>
                  <th className="py-3 px-4 w-24">ห้องเรียน</th>
                  <th className="py-3 px-4 w-32">สายวิชา</th>
                  <th className="py-3 px-4 w-44">ระดับชั้น</th>
                  <th className="py-3 px-4">ชื่อ - นามสกุล</th>
                  <th className="py-3 px-4 w-44">เลขประจำตัว / พาสปอร์ต</th>
                  <th className="py-3 px-4 w-16 text-center">อายุ</th>
                  <th className="py-3 px-4 w-48">อาจารย์ผู้สอน</th>
                  <th className="py-3 px-4 w-28">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredStudentEntries.map((item) => (
                  <tr
                    key={item.student.id}
                    className="hover:bg-amber-50/40 transition-colors"
                  >
                    <td className="py-2.5 px-4 text-center font-medium text-gray-500">
                      {item.student.orderNo}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-amber-900">
                      {item.student.roomNo}
                    </td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                          item.courseType === "นักธรรม"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {item.courseType}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-medium text-gray-800">
                      {item.sectionName}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">
                      {item.student.name}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-gray-600">
                      {formatIdCard(item.student.idCard)}
                    </td>
                    <td className="py-2.5 px-4 text-center font-medium text-gray-700">
                      {item.student.age}
                    </td>
                    <td className="py-2.5 px-4 text-gray-600 text-[11px]">
                      {item.teacherList.join(", ")}
                    </td>
                    <td className="py-2.5 px-4">
                      {item.student.note ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold text-[10px]">
                          {item.student.note}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Special Information for Room A 6: ประโยค ป.ธ. 4 */}
      {(selectedRoomId === "ALL" || selectedRoomId === "A6") && (
        <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-4 text-amber-950 text-xs space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
            <Info className="w-4 h-4 text-amber-700" />
            <span>หมายเหตุพิเศษสำหรับ ห้อง A 6 (ประโยค ป.ธ. ๔)</span>
          </div>
          <p>
            • ประโยค ป.ธ. ๔ (อาจารย์ผู้สอน: พระมหาเสฏฐวุฒิ วชิรญาโณ, ป.ธ.๙) กำหนดโควตาจำนวน ๑๐ อัตรา 
            ขณะนี้อยู่ในขั้นตอนการคัดเลือกและจัดสรรสามเณรผู้สอบผ่าน ป.ธ. ๓ เข้าประจำห้องเรียนตามระเบียบสนามหลวง
          </p>
          <p>
            • รองรับสามเณรนานาชาติ (ลาว, บังกลาเทศ) โดยใช้เลขหนังสือเดินทาง (Passport Number) ในการระบุตัวตน 
            เช่น Thanavat Keokaysone (P2499745), Pratay barua (A 05974209), Puottoy barua joy (A 06201845), เป็นต้น
          </p>
        </div>
      )}
    </div>
  );
}
