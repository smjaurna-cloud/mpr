"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ComplaintItem } from "@/data/complaintsTrackingData";

interface ComplaintDetailModalProps {
  complaint: ComplaintItem | null;
  onClose: () => void;
  renderStatusBadge: (status: ComplaintItem["status"]) => React.ReactNode;
}

export default function ComplaintDetailModal({
  complaint,
  onClose,
  renderStatusBadge,
}: ComplaintDetailModalProps) {
  if (!complaint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">รายละเอียดและผลการดำเนินการแก้ไข</h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-mono text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
              {complaint.trackingCode}
            </span>
            {renderStatusBadge(complaint.status)}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {complaint.title}
            </h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              {complaint.details}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400">หมวดหมู่:</span>
              <p className="font-semibold text-slate-800">{complaint.categoryThai}</p>
            </div>
            <div>
              <span className="text-slate-400">สถานที่:</span>
              <p className="font-semibold text-slate-800">{complaint.locationArea}</p>
            </div>
            <div>
              <span className="text-slate-400">ผู้ร้องเรียน:</span>
              <p className="font-semibold text-slate-800">
                {complaint.isAnonymous
                  ? "ไม่ประสงค์ระบุตัวตน (Anonymous)"
                  : complaint.complainantName}
              </p>
            </div>
            <div>
              <span className="text-slate-400">วันเวลาที่ยื่นเรื่อง:</span>
              <p className="font-mono text-slate-800">{complaint.submittedAt}</p>
            </div>
          </div>

          {/* Resolution Note Section */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 space-y-2">
            <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              บันทึกผลการดำเนินการแก้ไข
            </h5>
            <p className="text-slate-700 leading-relaxed">
              {complaint.resolutionNote || "อยู่ระหว่างการลงพื้นที่ตรวจสอบข้อเท็จจริง"}
            </p>
            <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 text-[11px] text-slate-500">
              <div>
                <span>หน่วยงานรับผิดชอบ:</span>
                <p className="font-medium text-slate-800">{complaint.assignedDepartment}</p>
              </div>
              <div>
                <span>เจ้าหน้าที่ผู้รับผิดชอบ:</span>
                <p className="font-medium text-slate-800">{complaint.officerInCharge}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
