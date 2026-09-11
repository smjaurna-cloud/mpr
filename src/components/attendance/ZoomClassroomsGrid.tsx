"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Copy,
  ExternalLink,
} from "lucide-react";
import { ZOOM_ROOMS } from "@/data/zoomScheduleData";

interface ZoomClassroomsGridProps {
  onCopy: (text: string) => void;
}

export default function ZoomClassroomsGrid({ onCopy }: ZoomClassroomsGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ZOOM_ROOMS.map((room) => (
          <div
            key={room.roomNumber}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center">
                    {room.roomNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{room.name}</h3>
                </div>
                {room.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Hybrid Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-600">
                    Standby
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{room.location}</span>
              </p>

              <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/80 text-xs text-amber-950 mt-2">
                <span className="font-semibold block mb-0.5">หัวข้อบรรยายปัจจุบัน:</span>
                <span className="text-amber-900">{room.topic}</span>
              </div>

              {/* Credentials Box */}
              <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Zoom Account:</span>
                  <div className="flex items-center gap-1">
                    <code className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                      {room.account}
                    </code>
                    <button
                      type="button"
                      onClick={() => onCopy(room.account)}
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="คัดลอกอีเมล"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Password:</span>
                  <div className="flex items-center gap-1">
                    <code className="font-mono text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                      {room.pass}
                    </code>
                    <button
                      type="button"
                      onClick={() => onCopy(room.pass)}
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="คัดลอกรหัสผ่าน"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Official Timetable & Faculty Section */}
              <div className="mt-4 pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>ตารางเรียน & คณาจารย์ผู้สอน (ภาค ๑/๒๕๖๙)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                    {room.schedules ? room.schedules.length : 0} รายวิชา
                  </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {room.schedules && room.schedules.length > 0 ? (
                    room.schedules.map((sch) => (
                      <div
                        key={sch.id}
                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                sch.day === "วันพฤหัสบดี"
                                  ? "bg-orange-100 text-orange-800 border border-orange-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {sch.day}
                            </span>
                            <span className="text-slate-700 text-[11px] font-semibold">
                              {sch.timeRange}
                            </span>
                            <span className="text-slate-400 text-[10px]">({sch.period})</span>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                              sch.courseType === "วิชาเอก"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : sch.courseType === "วิชาบังคับ"
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : sch.courseType === "วิชาเลือก"
                                ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                                : sch.courseType === "วิทยานิพนธ์/ดุษฎีนิพนธ์"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {sch.courseType} • {sch.credits}
                          </span>
                        </div>

                        <div>
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-amber-900 bg-amber-100 px-1 py-0.5 rounded text-[10px] font-bold border border-amber-200">
                              {sch.courseCode}
                            </span>
                            <span>{sch.courseNameTh}</span>
                          </div>
                          {sch.courseNameEn && (
                            <div className="text-[10px] text-slate-500 italic mt-0.5">
                              {sch.courseNameEn}
                            </div>
                          )}
                          {sch.cohortPlan && (
                            <div className="text-[10px] text-rose-700 font-medium mt-1">
                              🎯 {sch.cohortPlan}
                            </div>
                          )}
                        </div>

                        <div className="pt-1.5 border-t border-stone-200/70 flex flex-col gap-0.5">
                          <div className="flex items-start gap-1 text-[11px]">
                            <span className="font-semibold text-slate-600 shrink-0">
                              อาจารย์ผู้สอน:
                            </span>
                            <span className="font-bold text-amber-950">{sch.instructor}</span>
                          </div>
                          {sch.teachingTeam && sch.teachingTeam.length > 0 && (
                            <div className="flex items-start gap-1 text-[10px] text-slate-500 pl-1">
                              <span className="shrink-0">• คณะผู้สอน:</span>
                              <span>{sch.teachingTeam.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-slate-400">
                      ไม่มีตารางเรียนในภาคการศึกษานี้
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <a
                href={room.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <span>เข้าห้องเรียน Zoom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
