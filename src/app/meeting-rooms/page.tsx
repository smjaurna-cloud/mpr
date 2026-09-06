"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Tv, 
  Mic, 
  Wind, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  QrCode, 
  Monitor, 
  Coffee, 
  Sparkles, 
  Radio, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  FileText
} from "lucide-react";
import { mockMeetingRooms, mockMeetingBookings, MeetingRoom, MeetingBooking } from "@/data/mockData";

export default function MeetingRoomsPage() {
  const [rooms, setRooms] = useState<MeetingRoom[]>(mockMeetingRooms);
  const [bookings, setBookings] = useState<MeetingBooking[]>(mockMeetingBookings);
  const [selectedRoomForSignage, setSelectedRoomForSignage] = useState<MeetingRoom | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Booking Form State
  const [bookRoomId, setBookRoomId] = useState(mockMeetingRooms[0].id);
  const [bookTitle, setBookTitle] = useState("");
  const [bookChair, setBookChair] = useState("พระธรรมวชิราจารย์ (ผู้อำนวยการราชวิทยาลัย)");
  const [bookDate, setBookDate] = useState("2026-09-07");
  const [bookStartTime, setBookStartTime] = useState("๑๓:๓๐ น.");
  const [bookEndTime, setBookEndTime] = useState("๑๖:๐๐ น.");
  const [bookAttendees, setBookAttendees] = useState(25);
  const [bookIsHybrid, setBookIsHybrid] = useState(true);
  const [bookPana, setBookPana] = useState<MeetingBooking["pānaType"]>("น้ำปานะและเภสัช (บ่าย)");
  const [bookAgendas, setBookAgendas] = useState("๑. แจ้งเพื่อทราบ\n๒. รับรองรายงานการประชุม\n๓. เรื่องพิจารณาการศึกษาบาลี\n๔. เรื่องอื่นๆ");

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // Toggle IoT Device state in room
  const toggleDevice = (roomId: string, deviceKey: keyof MeetingRoom["smartDevices"]) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        const nextState = !r.smartDevices[deviceKey];
        return {
          ...r,
          smartDevices: {
            ...r.smartDevices,
            [deviceKey]: nextState
          }
        };
      }
      return r;
    }));
    showNotice("ส่งสัญญาณคำสั่งไปยังอุปกรณ์ IoT ในห้องเรียบร้อย");
  };

  // One-click Smart Room Prep (Turn on AC, Projector, Sound)
  const handleQuickPrep = (roomId: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          smartDevices: {
            ...r.smartDevices,
            airConditioner: true,
            projector: true,
            soundSystem: true,
            smartDisplay: true
          },
          temperature: 23.0
        };
      }
      return r;
    }));
    showNotice("⚡ โหมด Smart Prep: เปิดเครื่องปรับอากาศ โปรเจกเตอร์ และระบบไมค์ล่วงหน้าแล้ว");
  };

  // Create New Booking Handler
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = rooms.find(r => r.id === bookRoomId);
    const newBooking: MeetingBooking = {
      id: `mb-${Date.now()}`,
      roomId: bookRoomId,
      roomName: targetRoom ? targetRoom.name : "ห้องประชุม",
      title: bookTitle || "การประชุมราชวิทยาลัย",
      organizerName: "สำนักงานวิทยาลัย",
      chairperson: bookChair,
      date: bookDate,
      startTime: bookStartTime,
      endTime: bookEndTime,
      attendeesCount: Number(bookAttendees),
      isHybrid: bookIsHybrid,
      zoomLink: bookIsHybrid ? `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}` : undefined,
      pānaType: bookPana,
      status: "CONFIRMED",
      agendaItems: bookAgendas.split("\n").filter(line => line.trim().length > 0)
    };

    setBookings([newBooking, ...bookings]);
    setShowBookingModal(false);
    showNotice(`จอง ${newBooking.roomName} สำเร็จ! ออกรหัสห้องและแจ้งฝ่ายเสนาสนะแล้ว`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>MOD-07: ระบบบริหารจัดการห้องประชุมอัจฉริยะ (Smart Meeting Room)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ศูนย์จองห้องประชุม & ป้ายดิจิทัลหน้าห้อง (Digital Signage)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            รองรับการประชุมสภาวิทยาลัยสงฆ์ สัมมนาคัมภีราจารย์ วาระการประชุมไร้กระดาษ และการจัดน้ำปานะตามพระวินัย
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBookingModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>จองห้องประชุมใหม่</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ห้องประชุมทั้งหมด</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{rooms.length} ห้อง</p>
          <span className="text-[10px] text-slate-400">หอประชุม, บอร์ดรูม, สตูดิโอ</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ห้องว่างพร้อมใช้งาน</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {rooms.filter(r => r.status === "AVAILABLE").length} ห้อง
          </p>
          <span className="text-[10px] text-emerald-600">● สแตนด์บายพร้อมจอง</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">กำลังประชุมอยู่</span>
          <p className="text-2xl font-bold text-rose-700 mt-1">
            {rooms.filter(r => r.status === "IN_USE").length} ห้อง
          </p>
          <span className="text-[10px] text-rose-600">🔴 ป้ายหน้าห้อง: ห้ามรบกวน</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">นัดหมายประชุมวันนี้</span>
          <p className="text-2xl font-bold text-amber-800 mt-1">{bookings.length} วาระ</p>
          <span className="text-[10px] text-amber-700">มีจัดน้ำปานะ ๑ วาระ</span>
        </div>
      </div>

      {/* Rooms Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-4"
          >
            {/* Top Room Name and Status Badge */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{room.image}</span>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">{room.name}</h2>
                    <p className="text-[11px] text-amber-800 font-serif font-semibold">
                      ฉายาบาลี: "{room.paliName}"
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {room.building} ({room.floor}) • รองรับได้สูงสุด <strong className="font-semibold text-slate-800">{room.capacity} ที่นั่ง</strong>
                </p>
              </div>

              {room.status === "IN_USE" ? (
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold animate-pulse flex items-center gap-1">
                  <Radio className="w-3 h-3 text-rose-600" />
                  <span>กำลังประชุม</span>
                </span>
              ) : room.status === "RESERVED" ? (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold">
                  จองแล้ว
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  ห้องว่าง (Available)
                </span>
              )}
            </div>

            {/* Current / Next Meeting Notice */}
            <div className={`p-3 rounded-xl text-xs space-y-1 ${
              room.status === "IN_USE" ? "bg-rose-50 border border-rose-200 text-rose-950" : "bg-slate-50 border border-slate-200 text-slate-700"
            }`}>
              {room.status === "IN_USE" ? (
                <>
                  <span className="font-bold block flex items-center gap-1 text-rose-900">
                    <Clock className="w-3.5 h-3.5" /> กำลังดำเนินการประชุม:
                  </span>
                  <p className="font-medium text-[11px]">{room.currentMeeting}</p>
                  <p className="text-[10px] text-rose-700">เสร็จสิ้นเวลาประมาณ {room.nextAvailableTime}</p>
                </>
              ) : (
                <div className="flex items-center justify-between text-[11px]">
                  <span>สถานะการจอง:</span>
                  <span className="font-semibold text-emerald-700">{room.nextAvailableTime}</span>
                </div>
              )}
            </div>

            {/* Smart IoT Device Controls Simulation */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">ระบบควบคุมอุปกรณ์อัจฉริยะ (IoT):</span>
                <span className="text-[11px] text-slate-500">อุณหภูมิ: <strong>{room.temperature}°C</strong></span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                {/* Air Conditioner */}
                <button
                  type="button"
                  onClick={() => toggleDevice(room.id, "airConditioner")}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    room.smartDevices.airConditioner
                      ? "bg-blue-50 border-blue-300 text-blue-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <Wind className="w-4 h-4" />
                  <span>แอร์ {room.smartDevices.airConditioner ? "เปิด" : "ปิด"}</span>
                </button>

                {/* Projector */}
                <button
                  type="button"
                  onClick={() => toggleDevice(room.id, "projector")}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    room.smartDevices.projector
                      ? "bg-amber-50 border-amber-300 text-amber-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>จอภาพ {room.smartDevices.projector ? "เปิด" : "ปิด"}</span>
                </button>

                {/* Sound System */}
                <button
                  type="button"
                  onClick={() => toggleDevice(room.id, "soundSystem")}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    room.smartDevices.soundSystem
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>ไมค์ {room.smartDevices.soundSystem ? "พร้อม" : "ปิด"}</span>
                </button>

                {/* Hybrid Camera */}
                <button
                  type="button"
                  onClick={() => toggleDevice(room.id, "hybridCamera")}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    room.smartDevices.hybridCamera
                      ? "bg-purple-50 border-purple-300 text-purple-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>กล้อง {room.smartDevices.hybridCamera ? "Zoom" : "ปิด"}</span>
                </button>
              </div>
            </div>

            {/* Room Features Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {room.features.map((f, i) => (
                <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {f}
                </span>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setSelectedRoomForSignage(room)}
                className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-bold"
              >
                <Monitor className="w-3.5 h-3.5 text-amber-600" />
                <span>ดูป้ายหน้าห้องดิจิทัล (Signage)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPrep(room.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 rounded-lg font-semibold transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>เตรียมห้อง ๑ คลิก</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booked Agendas & Paperless Meetings Section */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>ตารางการประชุม & ระเบียบวาระการประชุมไร้กระดาษ (Paperless E-Agenda)</span>
            </h2>
            <p className="text-slate-500">
              ผู้เข้าร่วมประชุมสามารถสแกน QR Code หน้าห้องประชุมเพื่อดาวน์โหลดเอกสารประกอบวาระผ่านมือถือ
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{b.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    b.status === "IN_PROGRESS" ? "bg-rose-100 text-rose-800 animate-pulse" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {b.status === "IN_PROGRESS" ? "กำลังประชุม" : "ยืนยันแล้ว"}
                  </span>
                </div>
                <span className="text-amber-800 font-medium">
                  📍 {b.roomName} • {b.date} ({b.startTime} - {b.endTime})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                <span>ประธาน: <strong>{b.chairperson}</strong></span>
                <span>ผู้เข้าร่วม: {b.attendeesCount} รูป/ท่าน</span>
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <Coffee className="w-3.5 h-3.5" /> {b.pānaType}
                </span>
                {b.isHybrid && b.zoomLink && (
                  <a
                    href={b.zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-700 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" /> ลิงก์ Zoom ไฮบริด <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Agenda items list */}
              <div className="p-3 bg-white rounded-lg border border-slate-200/70 text-[11px] space-y-1">
                <p className="font-bold text-slate-800">ระเบียบวาระการประชุม:</p>
                {b.agendaItems.map((agenda, idx) => (
                  <p key={idx} className="text-slate-600 pl-2">
                    {agenda}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Digital Signage Screen Simulator (ป้ายหน้าห้องประชุมดิจิทัล) */}
      {selectedRoomForSignage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-6 relative overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedRoomForSignage.image}</span>
                <div>
                  <h2 className="font-bold text-lg text-amber-400">{selectedRoomForSignage.name}</h2>
                  <p className="text-xs text-slate-400 font-serif">ฉายา: {selectedRoomForSignage.paliName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRoomForSignage(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Main Signage Status Display */}
            <div className={`p-6 rounded-2xl border text-center space-y-3 ${
              selectedRoomForSignage.status === "IN_USE"
                ? "bg-rose-950/50 border-rose-600/60"
                : "bg-emerald-950/50 border-emerald-600/60"
            }`}>
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                selectedRoomForSignage.status === "IN_USE"
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-emerald-500 text-white"
              }`}>
                {selectedRoomForSignage.status === "IN_USE" ? "🔴 กำลังประชุม (IN SESSION)" : "🟢 ห้องว่าง (AVAILABLE)"}
              </span>

              {selectedRoomForSignage.status === "IN_USE" ? (
                <>
                  <h3 className="text-xl font-bold text-white max-w-lg mx-auto">
                    {selectedRoomForSignage.currentMeeting}
                  </h3>
                  <p className="text-xs text-rose-300">
                    ประธาน: พระธรรมวชิราจารย์ (ผู้อำนวยการราชวิทยาลัย)
                  </p>
                  <p className="text-[11px] text-slate-400">
                    เวลาประชุม: ๑๓:๓๐ - ๑๖:๐๐ น.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-200">
                    พร้อมสำหรับการประชุมถัดไป
                  </h3>
                  <p className="text-xs text-emerald-300">
                    {selectedRoomForSignage.nextAvailableTime}
                  </p>
                </>
              )}
            </div>

            {/* QR Code & Paperless Scan Section */}
            <div className="grid grid-cols-2 gap-4 items-center bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs">
              <div className="space-y-1.5">
                <p className="font-bold text-amber-300 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" /> สแกนเอกสารวาระการประชุม
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  สแกนเพื่อเปิดดูระเบียบวาระ ๑-๕ และรายงานการประชุมบนสมาร์ตโฟน โดยไม่ต้องพิมพ์กระดาษ
                </p>
                <div className="pt-1 flex items-center gap-3 text-[10px] text-slate-400">
                  <span>ความจุ: {selectedRoomForSignage.capacity} ที่นั่ง</span>
                  <span>อุณหภูมิ: {selectedRoomForSignage.temperature}°C</span>
                </div>
              </div>

              {/* QR Code Graphic Box */}
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl shadow-lg text-center">
                  <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-[9px] p-1 text-center">
                    [ SMART-AGENDA QR-CODE ]
                  </div>
                  <span className="text-[9px] text-slate-600 font-bold block mt-1">
                    SCAN FOR AGENDA
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-500 border-t border-slate-800 pt-3">
              มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย • Smart Campus IoT Display v1.0
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: New Meeting Booking */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold text-slate-900 text-base">จองห้องประชุมราชวิทยาลัย</h2>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">เลือกห้องประชุม *</label>
                <select
                  value={bookRoomId}
                  onChange={(e) => setBookRoomId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-medium"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.capacity} ที่นั่ง - {r.building})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">หัวข้อ / วาระการประชุม *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ประชุมวางแผนติวเข้มบาลีสนามหลวง"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ประธานการประชุม (พระเถระ/ผู้บริหาร) *</label>
                <input
                  type="text"
                  required
                  value={bookChair}
                  onChange={(e) => setBookChair(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">วันที่ประชุม *</label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">เวลาเริ่ม</label>
                  <input
                    type="text"
                    value={bookStartTime}
                    onChange={(e) => setBookStartTime(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">เวลาสิ้นสุด</label>
                  <input
                    type="text"
                    value={bookEndTime}
                    onChange={(e) => setBookEndTime(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Monastic Hospitality & Vinaya Check */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <label className="block font-bold text-amber-900 flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  <span>การจัดเตรียมเครื่องดื่ม/น้ำปานะ (ตามพระวินัย)</span>
                </label>
                <select
                  value={bookPana}
                  onChange={(e) => setBookPana(e.target.value as any)}
                  className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs"
                >
                  <option value="น้ำปานะและเภสัช (บ่าย)">น้ำปานะและเภสัช (บ่าย) - พระวินัยบัญญัติหลังเที่ยง</option>
                  <option value="ภัตตาหารว่าง (เช้า)">ภัตตาหารว่าง (เช้า) - ก่อนเที่ยงวัน</option>
                  <option value="น้ำดื่มสมุนไพร">น้ำดื่มสมุนไพรและน้ำเปล่า</option>
                </select>
                <p className="text-[10px] text-amber-800">
                  * หลังเวลา ๑๒:๐๐ น. ระบบจะประสานงานฝ่ายบริการจัดเฉพาะน้ำปานะที่ถูกต้องตามพระวินัย
                </p>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">ระบบการประชุมแบบ Hybrid (Zoom Link)</span>
                <input
                  type="checkbox"
                  checked={bookIsHybrid}
                  onChange={(e) => setBookIsHybrid(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ร่างระเบียบวาระการประชุม (สำหรับป้ายดิจิทัล)</label>
                <textarea
                  rows={3}
                  value={bookAgendas}
                  onChange={(e) => setBookAgendas(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow"
                >
                  ยืนยันการจองห้องประชุม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
