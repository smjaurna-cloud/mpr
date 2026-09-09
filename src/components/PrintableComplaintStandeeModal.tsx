"use client";

import React, { useRef } from "react";
import { X, Printer, ShieldCheck, Phone, Mail, Globe, MapPin, Building, Sparkles } from "lucide-react";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface PrintableComplaintStandeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrUrl?: string;
  collegeNameThai?: string;
  collegeNameEng?: string;
}

export const PrintableComplaintStandeeModal: React.FC<PrintableComplaintStandeeModalProps> = ({
  isOpen,
  onClose,
  qrUrl = "https://palitheravada.mcu.ac.th/complaints-tracking",
  collegeNameThai = "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  collegeNameEng = "Mahavajiralongkorn Pali Theravada College, MCU",
}) => {
  const printContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200/80 my-8 print:border-none print:shadow-none print:my-0 print:max-w-none">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-semibold text-lg">ป้ายประชาสัมพันธ์ QR Code ขนาดมาตรฐาน A4</h3>
            <span className="text-xs bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">
              Print Standee Notice
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow transition-all hover:scale-105 text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>สั่งพิมพ์โปสเตอร์ (Print A4)</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Standee Content - Exactly Styled for A4 Page */}
        <div
          ref={printContentRef}
          id="printable-standee-area"
          className="p-8 md:p-12 bg-white text-slate-800 flex flex-col items-center border-[6px] border-double border-amber-700 m-2 rounded-xl print:m-0 print:border-amber-800 print:p-8"
        >
          {/* Decorative Corner Ornaments */}
          <div className="w-full flex items-center justify-between text-xs text-amber-800 font-semibold tracking-wider uppercase mb-2 border-b border-amber-200 pb-2">
            <span>วส. มจร • MCU PALI COLLEGE</span>
            <span>ช่องทางรับเรื่องร้องเรียนอิเล็กทรอนิกส์</span>
            <span>ITA 2569</span>
          </div>

          {/* Institution Header */}
          <div className="text-center my-3 max-w-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-600 text-amber-800 mb-3 shadow-inner">
              <Building className="w-8 h-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-amber-950 tracking-tight leading-snug">
              {collegeNameThai}
            </h1>
            <p className="text-xs md:text-sm font-medium text-amber-800 mt-1">
              {collegeNameEng}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (วส. มจร)
            </p>
          </div>

          {/* Golden Divider */}
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent my-3"></div>

          {/* Title Banner */}
          <div className="text-center my-2 max-w-lg">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full mb-2 border border-amber-300">
              ศูนย์รับเรื่องร้องเรียนและข้อเสนอแนะออนไลน์ (e-Complaint Center)
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              สแกน QR Code เพื่อยื่นเรื่องร้องเรียนหรือข้อเสนอแนะ
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              รองรับทั้งการระบุตัวตนและไม่ประสงค์ระบุตัวตน (Anonymous) พร้อมติดตามสถานะได้ตลอด ๒๔ ชั่วโมง
            </p>
          </div>

          {/* Big QR Code Display */}
          <div className="my-6 p-4 bg-gradient-to-b from-amber-50 to-white rounded-2xl border-2 border-amber-400 shadow-md flex flex-col items-center">
            <QRCodeDisplay
              value={qrUrl}
              size={230}
              colorDark="#78350f"
              colorLight="#ffffff"
              showCopy={false}
              showDownload={false}
              className="border-none shadow-none p-0 bg-transparent"
            />
            <div className="mt-3 text-center">
              <span className="inline-block font-mono text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                {qrUrl}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                เปิดกล้องมือถือแล้วสแกนได้ทันที โดยไม่ต้องลงแอปพลิเคชันเพิ่มเติม
              </p>
            </div>
          </div>

          {/* 3 Steps Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full my-3">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                1
              </div>
              <h4 className="text-xs font-bold text-amber-950">สแกนคิวอาร์โค้ด</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Scan QR Code with Phone Camera
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                2
              </div>
              <h4 className="text-xs font-bold text-amber-950">ระบุรายละเอียด</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Fill Details (เลือกไม่ระบุตัวตนได้)
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                3
              </div>
              <h4 className="text-xs font-bold text-amber-950">รับรหัสติดตามงาน</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Get Tracking ID (CMP-2569-XXX)
              </p>
            </div>
          </div>

          {/* Monastic Sensitivity & Privacy Guarantee */}
          <div className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-center my-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-700">
              <strong>คุ้มครองข้อมูลส่วนบุคคล (PDPA):</strong> ข้อมูลผู้ร้องเรียนจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐานจรรยาบรรณสงฆ์และเกณฑ์ ITA
            </span>
          </div>

          {/* Footer Contact Details */}
          <div className="w-full pt-4 mt-3 border-t-2 border-amber-200 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-600 text-center">
            <div className="flex items-center justify-center gap-1">
              <Phone className="w-3 h-3 text-amber-700" />
              <span>สายด่วน: ๐๙๒-๖๙๔๘๘๘๓</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Phone className="w-3 h-3 text-amber-700" />
              <span>สำนักงาน: ๐๙๙-๔๔๕๔๒๕๖</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Mail className="w-3 h-3 text-amber-700" />
              <span>info@palitheravada.mcu.ac.th</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Globe className="w-3 h-3 text-amber-700" />
              <span>palitheravada.mcu.ac.th</span>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            เลขที่ ๒๓๔ ถนนเพชรเกษม ตำบลรางพิกุล อำเภอกำแพงแสน จังหวัดนครปฐม ๗๓๑๔๐
          </p>
        </div>
      </div>
    </div>
  );
};
