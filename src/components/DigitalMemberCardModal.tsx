"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen,
  Calendar,
  Building2,
  Award
} from "lucide-react";
import { AuthUser } from "@/data/authData";

interface DigitalMemberCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
}

export default function DigitalMemberCardModal({
  isOpen,
  onClose,
  user,
}: DigitalMemberCardModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (user && isOpen) {
      const qrPayload = JSON.stringify({
        org: "วส. มจร (Mahavajiralongkorn Pali College)",
        memberId: user.memberId,
        name: user.fullName,
        role: user.role,
        token: user.qrCodeToken || `VERIFIED-${user.memberId}`,
        verifiedAt: new Date().toISOString(),
      });

      QRCode.toDataURL(qrPayload, {
        width: 160,
        margin: 1,
        color: {
          dark: "#78350f", // Amber-900
          light: "#ffffff",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "MONK":
        return "สมาชิกประเภท: พระภิกษุสงฆ์";
      case "SAMANERA":
        return "สมาชิกประเภท: ศากยบุตรสามเณรสีหะ";
      case "GRAD_STUDENT":
        return "สมาชิกประเภท: นิสิตระดับบัณฑิตศึกษา (พธ.ด. / พธ.ม.)";
      case "FACULTY":
        return "สมาชิกประเภท: คณาจารย์ / นักวิชาการสงฆ์";
      case "STAFF":
        return "สมาชิกประเภท: บุคลากรทางการ / ฝ่ายบริหาร";
      case "PATRON":
        return "สมาชิกประเภท: โยมอุปถัมภ์ / สาธุชนทั่วไป";
      default:
        return "สมาชิกทางการ";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-300 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header toolbar */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold text-sm">บัตรประจำตัวสมาชิกดิจิทัล (Digital Membership Card)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="พิมพ์บัตรสมาชิก"
              aria-label="พิมพ์บัตรสมาชิก"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="ปิด"
              aria-label="ปิดหน้าต่างบัตรสมาชิก"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6">
          {/* Visual Digital Card in Sacred Royal Heritage Style */}
          <div 
            id="printable-member-card"
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-800 via-amber-900 to-yellow-950 text-white p-6 shadow-xl border-2 border-amber-400/80 aspect-[1.58/1] flex flex-col justify-between"
          >
            {/* Watermark Emblem */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <BookOpen className="w-64 h-64 text-yellow-200" />
            </div>

            {/* Top Bar of Card */}
            <div className="relative z-10 flex items-start justify-between border-b border-amber-500/40 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-amber-950 font-black shadow-md border border-amber-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wide text-amber-100">
                    มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
                  </h4>
                  <p className="text-[10px] text-amber-300/90 font-medium">
                    มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (วส. มจร)
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40 text-[9px] font-bold">
                บัตรสมาชิกทางการ
              </span>
            </div>

            {/* Middle: User Info & QR Code */}
            <div className="relative z-10 my-auto py-2 flex items-center justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  {getCategoryTitle(user.memberCategory)}
                </p>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                  {user.fullName}
                </h2>
                {user.paliName && (
                  <p className="text-xs text-amber-200 font-serif italic">
                    ฉายาบาลี: {user.paliName}
                  </p>
                )}
                {user.department && (
                  <p className="text-[11px] text-amber-200/80 truncate">
                    {user.department}
                  </p>
                )}
                <div className="pt-1 flex flex-wrap gap-2 text-[10px] text-amber-300/90 font-mono">
                  {user.studentCode && <span>รหัสนิสิต: {user.studentCode}</span>}
                  {user.positionCode && <span>รหัสตำแหน่ง: {user.positionCode}</span>}
                </div>
              </div>

              {/* QR Code */}
              <div className="shrink-0 text-center bg-white p-2 rounded-xl shadow-md border border-amber-300/80">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Member Verification QR"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-amber-100 animate-pulse rounded-lg" />
                )}
                <span className="block text-[8px] font-mono text-slate-600 mt-1 font-bold">
                  SCAN VERIFY
                </span>
              </div>
            </div>

            {/* Bottom: Member ID & Status */}
            <div className="relative z-10 flex items-end justify-between border-t border-amber-500/40 pt-3 text-[11px]">
              <div>
                <span className="text-[9px] text-amber-400 block font-semibold">รหัสสมาชิก (MEMBER ID)</span>
                <span className="font-mono font-bold text-sm tracking-wider text-yellow-300">
                  {user.memberId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-amber-400 block font-semibold">วันที่ออกบัตร</span>
                <span className="text-amber-200 text-[10px]">{user.registeredDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 text-xs pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์บัตรสมาชิก (A4 / Card)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
