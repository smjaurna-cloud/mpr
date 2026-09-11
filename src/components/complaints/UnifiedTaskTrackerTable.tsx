"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Printer,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Car,
  Utensils,
  Sparkles,
  RefreshCw,
  FileText,
  BookOpen,
} from "lucide-react";
import {
  UnifiedTrackedTask,
  TrackedSystemType,
} from "@/data/complaintsTrackingData";

interface UnifiedTaskTrackerTableProps {
  tasks: UnifiedTrackedTask[];
  onSelectTaskForPrint: (task: UnifiedTrackedTask) => void;
}

export default function UnifiedTaskTrackerTable({
  tasks,
  onSelectTaskForPrint,
}: UnifiedTaskTrackerTableProps) {
  const [taskSearch, setTaskSearch] = useState("");
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>("ALL");

  const getSystemIcon = (type: TrackedSystemType) => {
    switch (type) {
      case "COMPLAINT":
        return <ShieldCheck className="w-5 h-5 text-amber-700" />;
      case "VEHICLE_BOOKING":
        return <Car className="w-5 h-5 text-amber-700" />;
      case "E_APPROVAL":
        return <FileText className="w-5 h-5 text-amber-700" />;
      case "MEETING_ROOM":
        return <Building className="w-5 h-5 text-amber-700" />;
      case "ACADEMIC_REG":
        return <BookOpen className="w-5 h-5 text-amber-700" />;
      case "ALMS_PATRON":
        return <Utensils className="w-5 h-5 text-amber-700" />;
      case "PROCUREMENT_PRJ":
        return <Sparkles className="w-5 h-5 text-amber-700" />;
      default:
        return <RefreshCw className="w-5 h-5 text-amber-700" />;
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch =
        taskSearch.trim() === "" ||
        task.trackingCode.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.requesterName.toLowerCase().includes(taskSearch.toLowerCase());

      const matchSystem =
        selectedSystemFilter === "ALL" || task.systemType === selectedSystemFilter;

      return matchSearch && matchSystem;
    });
  }, [tasks, taskSearch, selectedSystemFilter]);

  return (
    <div className="space-y-6">
      {/* Tracker Instructions & Search Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-amber-600" />
              ระบบติดตามสถานะคำร้องและภารกิจราชการรวมศูนย์ (Unified Task Tracker)
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              กรอกรหัสติดตามจากระบบใดก็ได้ในวิทยาลัย: เรื่องร้องเรียน (<code>CMP-</code>), ขอใช้รถ (<code>VB-</code>), สารบรรณ (<code>DOC-</code>), ห้องประชุม (<code>MTG-</code>), แผนงบประมาณ/e-Bidding (<code>PRJ-</code>), ภัตตาหารโยมอุปถัมภ์ (<code>ALM-</code>)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "ทั้งหมด", val: "ALL" },
              { label: "ร้องเรียน (CMP-)", val: "COMPLAINT" },
              { label: "ขอใช้รถ (VB-)", val: "VEHICLE_BOOKING" },
              { label: "สารบรรณ (DOC-)", val: "E_APPROVAL" },
              { label: "ห้องประชุม (MTG-)", val: "MEETING_ROOM" },
              { label: "โครงการจัดซื้อ (PRJ-)", val: "PROCUREMENT_PRJ" },
              { label: "ภัตตาหาร (ALM-)", val: "ALMS_PATRON" },
            ].map((pill) => (
              <button
                key={pill.val}
                onClick={() => setSelectedSystemFilter(pill.val)}
                type="button"
                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  selectedSystemFilter === pill.val
                    ? "bg-amber-700 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="พิมพ์รหัสติดตามงาน เช่น VB-2569-001, CMP-2569-001, DOC-67-001, PRJ-69-SOLAR หรือชื่อผู้ยื่น..."
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-amber-300/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
          />
        </div>
      </div>

      {/* Cross-System Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            ไม่พบภารกิจหรือคำร้องตามรหัสที่ระบุ
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-amber-400 transition-all space-y-4"
            >
              {/* Top Bar of Task */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    {getSystemIcon(task.systemType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                        {task.trackingCode}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {task.systemNameThai}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-slate-900 mt-0.5">
                      {task.title}
                    </h4>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    {task.statusThai} ({task.currentStep}/{task.totalSteps})
                  </span>
                  <button
                    onClick={() => onSelectTaskForPrint(task)}
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>พิมพ์ใบติดตามงาน</span>
                  </button>
                  <Link
                    href={task.relatedUrl}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                    <span>เปิดโมดูล</span>
                  </Link>
                </div>
              </div>

              {/* Task Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400">ผู้ยื่นเรื่อง/ผู้รับผิดชอบ:</span>
                  <p className="font-semibold text-slate-800">{task.requesterName}</p>
                </div>
                <div>
                  <span className="text-slate-400">หน่วยงาน/ฝ่าย:</span>
                  <p className="font-semibold text-slate-800">{task.departmentOrUnit}</p>
                </div>
                <div>
                  <span className="text-slate-400">วันที่ยื่นเรื่อง:</span>
                  <p className="font-mono text-slate-800">{task.submittedDate}</p>
                </div>
                <div>
                  <span className="text-slate-400">กำหนดแล้วเสร็จ:</span>
                  <p className="font-mono text-slate-800">{task.targetCompletionDate}</p>
                </div>
              </div>

              {/* Interactive Stepper Progress Bar */}
              <div className="pt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {task.stepsHistory.map((step) => (
                    <div
                      key={step.stepNo}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        step.isCompleted
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold flex items-center gap-1 text-[11px]">
                          {step.isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          ขั้นตอนที่ {step.stepNo}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="font-semibold line-clamp-1">{step.stepTitle}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        ผู้ปฏิบัติ: {step.actionBy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
