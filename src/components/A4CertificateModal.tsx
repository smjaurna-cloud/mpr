"use client";

import React, { useRef } from "react";
import { Printer, ShieldCheck, Award, Sparkles, X } from "lucide-react";
import { formatThaiCurrency } from "@/lib/utils";

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    hostName: string;
    amount: number;
    date: string;
    occasion: string;
    eDonationHash: string;
  };
}

export default function A4CertificateModal({ isOpen, onClose, data }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-amber-300/60 my-auto">
        {/* Modal Action Header */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-yellow-50 px-6 py-3 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-600 text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              e-Donation Certified
            </span>
            <span className="text-xs text-amber-900 font-medium hidden sm:inline">
              กรมสรรพากรรับรองสิทธิ์ลดหย่อน ๒ เท่า
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg font-bold text-xs shadow hover:from-amber-600 hover:to-amber-800 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบอนุโมทนาบัตร</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Container (A4 Proportions) */}
        <div className="p-4 sm:p-8 bg-[#faf8f5] flex justify-center max-h-[82vh] overflow-y-auto">
          <div 
            ref={certRef}
            className="w-full max-w-[700px] bg-white rounded-xl shadow-lg border-4 border-double border-amber-400 p-8 sm:p-12 relative text-slate-800 space-y-6"
            style={{
              backgroundImage: "radial-gradient(circle at center, rgba(254, 243, 199, 0.15) 0%, rgba(255, 255, 255, 0) 70%)"
            }}
          >
            {/* Header / Seal */}
            <div className="text-center space-y-2 relative z-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-50 flex items-center justify-center text-amber-800 font-bold">
                  <Award className="w-8 h-8 text-amber-700" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900 tracking-tight font-serif">
                มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
              </h2>
              <p className="text-xs text-amber-800 font-sans">
                วิทยาลัยสงฆ์ในกำกับ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (วส. มจร)
              </p>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-2" />
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                ใบอนุโมทนาบัตรเกียรติยศ
              </h3>
            </div>

            {/* Body Description */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 text-center relative z-10 font-serif">
              <p>ขออนุโมทนาบัตรนี้แสดงว่า</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-950 font-sans border-b-2 border-dotted border-amber-300 pb-1 inline-block px-8">
                {data.hostName}
              </p>
              <p>
                ได้มีจิตศรัทธาบำเพ็ญมหากุศล ร่วมบริจาคปัจจัยอุปถัมภ์โครงการ
                <br />
                <span className="font-semibold text-amber-900">{data.occasion}</span>
                <br />
                เพื่อสนับสนุนการศึกษาพระปริยัติธรรมและภัตตาหารแด่ศากยบุตรสามเณรสีหะ
              </p>

              <div className="my-4 py-3 bg-amber-50/80 rounded-xl border border-amber-200/60 max-w-sm mx-auto">
                <p className="text-xs text-amber-900/80 font-sans">จำนวนปัจจัยบำรุงการศึกษา</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-800 font-sans">
                  {formatThaiCurrency(data.amount)}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                ขออำนาจคุณพระศรีรัตนตรัย จงดลบันดาลให้ท่านและครอบครัว ประสบแต่ความสุข ความเจริญด้วยจตุรพิธพรชัยทุกประการเทอญ
              </p>
            </div>

            {/* Signatures & Stamp */}
            <div className="pt-6 border-t border-amber-200/80 grid grid-cols-2 items-end relative z-10 text-xs text-slate-600 font-sans">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ระบบบันทึก e-Donation สรรพากร</span>
                </div>
                <p className="font-mono text-[11px] text-slate-500">รหัสอ้างอิง: {data.eDonationHash}</p>
                <p className="text-[10px] text-slate-400">วันที่ออกเอกสาร: {data.date}</p>
                <p className="text-[10px] text-emerald-700 font-medium">✓ สรรพากรรับรองลดหย่อนภาษี ๒ เท่า (มาตรา ๔๗)</p>
              </div>

              <div className="text-center space-y-1">
                <div className="w-32 h-10 mx-auto border-b border-slate-400 border-dashed flex items-center justify-center">
                  <span className="text-xs italic text-amber-800 font-serif">(ลงนามดิจิทัล)</span>
                </div>
                <p className="font-bold text-slate-800 text-xs">พระธรรมวชิราจารย์, ศ.ดร.</p>
                <p className="text-[10px] text-slate-500">ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
