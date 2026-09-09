"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  QrCode,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { mainCollegeContact } from "@/data/contactDirectoryData";

export default function QuickContactSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Speed Dial Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-300/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-amber-100" />
              </div>
              <div>
                <h4 className="font-bold text-xs">ศูนย์บริการข้อมูลติดต่อด่วน</h4>
                <p className="text-[10px] text-amber-200">วส. มจร วัดบาลีเถรวาทสังฆาราม</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-amber-100 hover:bg-white/20 transition-colors"
              title="ปิดเมนู"
              aria-label="ปิดเมนูติดต่อด่วน"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Quick Actions */}
          <div className="p-3 space-y-2 text-xs divide-y divide-slate-100">
            {/* Action 1: Call Central */}
            <div className="pt-1">
              <a
                href={`tel:${mainCollegeContact.phones.centralSwitchboard.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-900 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-800">โทรเบอร์กลางราชวิทยาลัย</p>
                    <p className="text-[11px] text-amber-700 font-medium">
                      {mainCollegeContact.phones.centralSwitchboard}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                  โทรออก
                </span>
              </a>
            </div>

            {/* Action 2: 24h Emergency Hotline */}
            <div className="pt-2">
              <a
                href={`tel:${mainCollegeContact.phones.emergency24h.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 text-slate-700 hover:text-rose-900 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-xs text-slate-800">สายด่วนพระพี่เลี้ยง & พยาบาล</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    </div>
                    <p className="text-[11px] text-rose-700 font-medium">
                      {mainCollegeContact.phones.emergency24h} (๒๔ ชม.)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-medium">
                  ฉุกเฉิน
                </span>
              </a>
            </div>

            {/* Action 3: LINE Official */}
            <div className="pt-2">
              <a
                href="https://line.me/R/ti/p/@palitheravada"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-800">LINE Official Account</p>
                    <p className="text-[11px] text-emerald-700 font-medium">@palitheravada</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </a>
            </div>

            {/* Action 4: Google Maps */}
            <div className="pt-2">
              <a
                href={mainCollegeContact.coordinates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-800">แผนที่นำทาง GPS</p>
                    <p className="text-[11px] text-blue-700">อ.กำแพงแสน จ.นครปฐม</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              </a>
            </div>

            {/* Action 5: Contact Page & Inquiry */}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-900">ศูนย์ติดต่อราชการเต็มรูปแบบ</p>
                    <p className="text-[11px] text-amber-800">ทำเนียบ ๘ ฝ่ายงาน & ส่งข้อความ</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="ติดต่อสถาบัน"
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-slate-800 text-white ring-4 ring-slate-200"
            : "bg-gradient-to-r from-amber-600 to-amber-700 text-white ring-4 ring-amber-200/60 shadow-amber-700/30"
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-amber-100 animate-pulse" />
            <span className="font-semibold text-xs tracking-tight hidden sm:inline">
              ติดต่อสถาบัน
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
