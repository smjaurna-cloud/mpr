"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";
import {
  officialDepartments,
  InquiryTicket,
} from "@/data/contactDirectoryData";

interface InquiryFormCardProps {
  initialDepartment?: string;
  onTicketCreated: (ticket: InquiryTicket) => void;
  onCopy: (text: string, label: string) => void;
}

export default function InquiryFormCard({
  initialDepartment = "สำนักงานผู้อำนวยการราชวิทยาลัย",
  onTicketCreated,
  onCopy,
}: InquiryFormCardProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    targetDepartment: initialDepartment,
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (initialDepartment) {
      setFormData((prev) => ({ ...prev, targetDepartment: initialDepartment }));
    }
  }, [initialDepartment]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessTicket, setSubmitSuccessTicket] = useState<InquiryTicket | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccessTicket(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success && data.ticket) {
        setSubmitSuccessTicket(data.ticket);
        onTicketCreated(data.ticket);
        setFormData({
          senderName: "",
          senderEmail: "",
          senderPhone: "",
          targetDepartment: "สำนักงานผู้อำนวยการราชวิทยาลัย",
          subject: "",
          message: "",
        });
      } else {
        setSubmitError(data.error || "เกิดข้อผิดพลาดในการส่งข้อความ");
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h4 className="font-bold text-sm text-slate-900">แบบฟอร์มส่งข้อความติดต่อราชการ</h4>
        <p className="text-xs text-slate-500">กรุณากรอกข้อมูลให้ครบถ้วน เจ้าหน้าที่จะติดต่อกลับภายใน ๑ วันทำการ</p>
      </div>

      {submitSuccessTicket && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>บันทึกข้อความติดต่อสำเร็จ! รหัสติดตามตั๋วของท่านคือ:</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-emerald-200 flex items-center justify-between">
            <span className="font-mono font-extrabold text-base text-emerald-800">
              {submitSuccessTicket.ticketCode}
            </span>
            <button
              type="button"
              onClick={() => onCopy(submitSuccessTicket.ticketCode, "รหัสติดตามตั๋ว")}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>คัดลอกรหัส</span>
            </button>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            ท่านสามารถนำรหัสนี้ไปตรวจสอบสถานะการดำเนินงานของฝ่ายงานได้ที่ช่อง &ldquo;ตรวจสอบสถานะการติดต่อ&rdquo;
          </p>
        </div>
      )}

      {submitError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">ชื่อ-นามสกุล / ฉายาบาลี *</label>
            <input
              type="text"
              required
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="เช่น พระมหาสมชาย ญาณวโร หรือ คุณโยมสมศรี"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">เบอร์โทรศัพท์สำหรับติดต่อกลับ</label>
            <input
              type="tel"
              value={formData.senderPhone}
              onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
              placeholder="เช่น 081-234-5678"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">อีเมลทางการ / ส่วนบุคคล *</label>
            <input
              type="email"
              required
              value={formData.senderEmail}
              onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
              placeholder="เช่น contact@domain.com"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">ฝ่ายงานที่ประสงค์ติดต่อ *</label>
            <select
              value={formData.targetDepartment}
              onChange={(e) => setFormData({ ...formData, targetDepartment: e.target.value })}
              aria-label="เลือกฝ่ายงานที่ประสงค์ติดต่อ"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              {officialDepartments.map((d) => (
                <option key={d.id} value={d.nameThai}>
                  {d.nameThai} (ต่อ {d.phoneExtension})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">เรื่องที่ต้องการติดต่อสอบถาม *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="เช่น สอบถามการเทียบโอนวิชาบาลี หรือ จองภัตตาหารเพลวันเกิด"
            className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">รายละเอียดข้อความ *</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="ระบุรายละเอียดข้อความ คำถาม หรือข้อมูลที่ต้องการให้เจ้าหน้าที่ฝ่ายงานประสานงานกลับ..."
            className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "กำลังส่งข้อความเข้าระบบ..." : "ส่งข้อความติดต่อราชการ"}</span>
        </button>
      </form>
    </div>
  );
}
