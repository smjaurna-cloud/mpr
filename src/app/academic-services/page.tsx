"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  Search, 
  MapPin, 
  ExternalLink,
  Award
} from "lucide-react";
import { mockCourseSchedule, mockOutreachProjects, CourseScheduleItem, AcademicOutreachProject } from "@/data/mockData";

export default function AcademicServicesPage() {
  const [schedule, setSchedule] = useState<CourseScheduleItem[]>(mockCourseSchedule);
  const [outreach, setOutreach] = useState<AcademicOutreachProject[]>(mockOutreachProjects);
  const [selectedDay, setSelectedDay] = useState<string>("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const filteredSchedule = schedule.filter(s => 
    selectedDay === "ALL" || s.dayOfWeek === selectedDay
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-teal-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full w-fit">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>กลุ่มงานบริการการศึกษา (สำนักวิชาการ)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบบริการการศึกษา & ตารางสอนพระปริยัติธรรมบาลี
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            จัดตารางสอน-ตารางสอบบาลีศากยบุตร และโครงการบริการวิชาการพระพุทธศาสนาแก่สังคม (ติวสอบบาลีสนามหลวง)
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotification("ระบบเปิดฟอร์มสร้างตารางสอน/เปิดคอร์สบริการวิชาการใหม่");
            setTimeout(() => setNotification(null), 4000);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>จัดตารางสอน / เปิดคอร์สอบรม</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Outreach Highlights */}
      <div className="space-y-3">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-teal-600" />
          <span>โครงการบริการวิชาการพระพุทธศาสนาแก่คณะสงฆ์และสังคม</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {outreach.map((proj) => (
            <div
              key={proj.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 shadow-sm transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold text-[10px] border border-teal-200">
                    กลุ่มเป้าหมาย: {proj.targetAudience}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1.5">{proj.projectTitle}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {proj.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>กำหนดการอบรม:</span>
                  <span className="font-semibold text-slate-800">{proj.dateRange}</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนผู้สมัครเข้าร่วม:</span>
                  <span className="font-bold text-teal-700">{proj.registeredCount} / {proj.maxSeats} ที่นั่ง</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Schedule Section */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>ตารางสอนประจำสัปดาห์ (Pali Course Timetable)</span>
            </h2>
            <p className="text-slate-500">ตารางการเรียนการสอนบาลีไวยากรณ์ คัมภีร์ปทรูปสิทธิ สัททนีติ และพระวินัย</p>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {["ALL", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedDay === d ? "bg-white text-slate-900 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {d === "ALL" ? "ทุกวัน" : d}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSchedule.map((item) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[10px] border border-teal-200">
                    {item.courseCode}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{item.courseName}</span>
                </div>
                <p className="text-slate-600">
                  ผู้สอน: <strong className="text-slate-800">{item.instructor}</strong> • ระดับชั้น: {item.classLevel}
                </p>
              </div>

              <div className="flex items-center gap-4 text-[11px] self-end sm:self-center">
                <div className="text-right">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> {item.dayOfWeek} {item.timeSlot}
                  </span>
                  <span className="text-slate-500 block">ห้อง: {item.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
