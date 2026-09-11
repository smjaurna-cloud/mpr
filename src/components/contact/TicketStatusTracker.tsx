"use client";

import React, { useState } from "react";
import {
  Search,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { InquiryTicket } from "@/data/contactDirectoryData";

interface TicketStatusTrackerProps {
  allTickets: InquiryTicket[];
}

export default function TicketStatusTracker({ allTickets }: TicketStatusTrackerProps) {
  const [trackCodeInput, setTrackCodeInput] = useState("");
  const [trackingResult, setTrackingResult] = useState<InquiryTicket | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);

  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCodeInput.trim()) return;

    setIsTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/contact?code=${encodeURIComponent(trackCodeInput.trim())}`);
      const data = await res.json();

      if (data.success && data.ticket) {
        setTrackingResult(data.ticket);
      } else {
        setTrackingError(data.error || "ไม่พบรหัสติดตามนี้ในระบบ");
      }
    } catch {
      setTrackingError("เกิดข้อผิดพลาดในการตรวจสอบสถานะ");
    } finally {
      setIsTrackingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tracker Box */}
      <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-600" />
            <span>ตรวจสอบสถานะการติดต่อ (Ticket Tracking)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            กรอกรหัสติดตาม เช่น <code>INQ-2569-012</code>
          </p>
        </div>

        <form onSubmit={handleTrackTicket} className="flex gap-2">
          <input
            type="text"
            value={trackCodeInput}
            onChange={(e) => setTrackCodeInput(e.target.value)}
            placeholder="รหัส เช่น INQ-2569-012"
            className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={isTrackingLoading}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors disabled:opacity-50"
          >
            {isTrackingLoading ? "ค้นหา..." : "ตรวจสอบ"}
          </button>
        </form>

        {trackingError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{trackingError}</span>
          </div>
        )}

        {trackingResult && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 space-y-3 animate-in fade-in text-xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <span className="font-mono font-bold text-amber-900">{trackingResult.ticketCode}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  trackingResult.status === "RESPONDED"
                    ? "bg-emerald-100 text-emerald-800"
                    : trackingResult.status === "PROCESSING"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {trackingResult.status === "RESPONDED"
                  ? "✓ ตอบกลับแล้ว"
                  : trackingResult.status === "PROCESSING"
                  ? "⏳ กำลังดำเนินการ"
                  : "📥 รับเรื่องแล้ว"}
              </span>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 py-1">
              <div className="flex flex-col items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">1</span>
                <span>รับเรื่อง</span>
              </div>
              <div className={`h-0.5 flex-1 ${trackingResult.status !== "RECEIVED" ? "bg-amber-500" : "bg-slate-200"}`} />
              <div className="flex flex-col items-center gap-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${trackingResult.status !== "RECEIVED" ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
                <span>กำลังตรวจ</span>
              </div>
              <div className={`h-0.5 flex-1 ${trackingResult.status === "RESPONDED" ? "bg-emerald-500" : "bg-slate-200"}`} />
              <div className="flex flex-col items-center gap-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${trackingResult.status === "RESPONDED" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>3</span>
                <span>ตอบกลับ</span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="font-semibold text-slate-800">{trackingResult.subject}</p>
              <p className="text-[11px] text-slate-600">
                <strong>ผู้ส่ง:</strong> {trackingResult.senderName} ({trackingResult.targetDepartment})
              </p>
              <p className="text-[11px] text-slate-500">
                <strong>ยื่นเมื่อ:</strong> {trackingResult.submittedAt} น.
              </p>
            </div>

            {trackingResult.responseNote && (
              <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-[11px] text-slate-700">
                <strong className="text-amber-900 block mb-0.5">การตอบกลับจากเจ้าหน้าที่:</strong>
                <p>{trackingResult.responseNote}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sample Public Inquiries Table for Transparency */}
      <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <span>คำร้องสอบถามล่าสุดในระบบ ({allTickets.length})</span>
          </h4>
          <span className="text-[10px] text-slate-400">ITA O5 Public Log</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {allTickets.slice(0, 3).map((item) => (
            <div key={item.id} className="py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setTrackCodeInput(item.ticketCode);
                    setTrackingResult(item);
                  }}
                  className="font-mono text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  {item.ticketCode}
                </button>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    item.status === "RESPONDED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {item.status === "RESPONDED" ? "ตอบแล้ว" : "กำลังตรวจ"}
                </span>
              </div>
              <p className="text-slate-800 font-medium truncate">{item.subject}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{item.targetDepartment}</span>
                <span>{item.submittedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
