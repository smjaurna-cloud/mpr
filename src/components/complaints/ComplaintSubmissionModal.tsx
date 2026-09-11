"use client";

import React, { useState } from "react";
import {
  PlusCircle,
  Send,
} from "lucide-react";
import {
  ComplaintItem,
  ComplaintCategory,
} from "@/data/complaintsTrackingData";

interface ComplaintSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplaintCreated: (complaint: ComplaintItem) => void;
}

export default function ComplaintSubmissionModal({
  isOpen,
  onClose,
  onComplaintCreated,
}: ComplaintSubmissionModalProps) {
  const [formCategory, setFormCategory] = useState<ComplaintCategory>("FACILITIES_VEHICLES");
  const [formTitle, setFormTitle] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formIsAnonymous, setFormIsAnonymous] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPriority, setFormPriority] = useState<"NORMAL" | "HIGH" | "URGENT">("NORMAL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDetails || !formLocation) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    const categoryThaiMap: Record<ComplaintCategory, string> = {
      FACILITIES_VEHICLES: "อาคารสถานที่และระบบเทคโนโลยี",
      ACADEMIC: "การศึกษาและวิชาการ",
      MONASTIC_DISCIPLINE: "ระเบียบวินัยสงฆ์และสามเณร",
      SERVICE_STAFF: "การให้บริการและบุคลากร",
      TRANSPARENCY_ITA: "ความโปร่งใสและจัดซื้อจัดจ้าง (ITA)",
      GENERAL_SUGGESTION: "ข้อเสนอแนะทั่วไปและภูมิทัศน์",
    };

    const payload = {
      title: formTitle,
      category: formCategory,
      categoryThai: categoryThaiMap[formCategory],
      details: formDetails,
      complainantName: formIsAnonymous ? "ไม่ประสงค์ระบุตัวตน (Anonymous)" : (formName || "ศรัทธาสาธุชน"),
      isAnonymous: formIsAnonymous,
      contactPhone: formPhone || "-",
      contactEmail: formEmail || "-",
      locationArea: formLocation,
      priority: formPriority,
    };

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success && data.data) {
        onComplaintCreated(data.data);
        onClose();
      } else {
        alert(data.error || "เกิดข้อผิดพลาดในการส่งเรื่อง");
      }
    } catch {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">
              แบบฟอร์มยื่นเรื่องร้องเรียน & ข้อเสนอแนะออนไลน์
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmitComplaint} className="p-6 space-y-4 text-xs">
          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                หมวดหมู่เรื่องร้องเรียน <span className="text-rose-500">*</span>
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as ComplaintCategory)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
                required
              >
                <option value="FACILITIES_VEHICLES">อาคารสถานที่และระบบเทคโนโลยี</option>
                <option value="ACADEMIC">การศึกษาและวิชาการ</option>
                <option value="MONASTIC_DISCIPLINE">ระเบียบวินัยสงฆ์และสามเณร</option>
                <option value="SERVICE_STAFF">การให้บริการและบุคลากร</option>
                <option value="TRANSPARENCY_ITA">ความโปร่งใสและจัดซื้อจัดจ้าง (ITA)</option>
                <option value="GENERAL_SUGGESTION">ข้อเสนอแนะทั่วไปและภูมิทัศน์</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ระดับความเร่งด่วน
              </label>
              <select
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value as "NORMAL" | "HIGH" | "URGENT")}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="NORMAL">ปกติ (Normal)</option>
                <option value="HIGH">สำคัญ (High)</option>
                <option value="URGENT">ด่วนที่สุด (Urgent)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              หัวข้อเรื่องร้องเรียน / ข้อเสนอแนะ <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ระบุประเด็นสำคัญ เช่น ปรับปรุงสัญญาณ Wi-Fi กุฏิโซน C"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              สถานที่หรือจุดที่พบปัญหา / อาคาร <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="เช่น หอฉันศากยบุตร, อาคารเรียน A 2, กุฏิสงฆ์โซน C"
              value={formLocation}
              onChange={(e) => setFormLocation(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Details */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              รายละเอียดเหตุการณ์ / ข้อเสนอแนะ <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="อธิบายรายละเอียดข้อเท็จจริง วันเวลา และข้อเสนอแนะที่ต้องการให้ดำเนินการ..."
              value={formDetails}
              onChange={(e) => setFormDetails(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Anonymous Checkbox */}
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-amber-950">
              <input
                type="checkbox"
                checked={formIsAnonymous}
                onChange={(e) => setFormIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
              />
              <span>ไม่ประสงค์ระบุตัวตน (Anonymous Submission)</span>
            </label>
            <p className="text-[11px] text-amber-800 mt-1 pl-6">
              เมื่อเลือกช่องนี้ ข้อมูลชื่อ เบอร์โทร และอีเมลของท่านจะไม่ถูกจัดเก็บในระบบเพื่อความปลอดภัยสูงสุด
            </p>
          </div>

          {/* Contact Info (if not anonymous) */}
          {!formIsAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อ-นามสกุล หรือฉายา
                </label>
                <input
                  type="text"
                  placeholder="เช่น พระมหา... หรือ นาย..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  เบอร์โทรศัพท์ติดต่อ
                </label>
                <input
                  type="text"
                  placeholder="08X-XXX-XXXX"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  อีเมล (สำหรับรับผลการแก้ไข)
                </label>
                <input
                  type="email"
                  placeholder="example@mcu.ac.th"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-lg shadow-md transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "กำลังส่งเรื่อง..." : "ส่งเรื่องร้องเรียน & รับรหัสติดตาม"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
