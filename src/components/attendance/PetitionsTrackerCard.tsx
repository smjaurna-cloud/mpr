"use client";

import React from "react";
import { MessageSquare, ExternalLink } from "lucide-react";

export default function PetitionsTrackerCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            ระบบรับเรื่องและติดตามคำร้องเรียน ๕ หมวดหมู่
          </h3>
          <p className="text-xs text-slate-500">
            วิชาการ, อาคารสถานที่, การเงิน/ค่าธรรมเนียม, ระบบไอที/สแกนใบหน้า, ข้อเสนอแนะทั่วไป
          </p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
          รองรับ Anonymous
        </span>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        นิสิตสามารถส่งคำร้องเรียนหรือข้อเสนอแนะได้ทั้งแบบเปิดเผยตัวตนหรือแบบไม่ระบุชื่อ (Anonymous) เพื่อให้ผู้บริหารวิทยาลัยสงฆ์ดำเนินการตรวจสอบและตอบรับอย่างโปร่งใส
      </div>

      <div className="flex justify-end">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>เปิดระบบยื่นคำร้องเรียนใน SMST</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
