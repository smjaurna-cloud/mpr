"use client";

import React from "react";
import {
  Share2,
  ExternalLink,
  MessageCircle,
  QrCode,
} from "lucide-react";
import {
  officialSocialChannels,
} from "@/data/contactDirectoryData";

export default function SocialChannelsGrid() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-2">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-amber-600" />
          <span>ช่องทางสื่อดิจิทัลและสื่อสังคมออนไลน์ทางการ</span>
        </h3>
        <p className="text-xs text-slate-500">
          ติดตามข่าวสารพิธีสำคัญ ธรรมเทศนา ตารางสอบบาลี และการเปิดรับจองภัตตาหารเพลผ่านช่องทางทางการที่ได้รับการรับรอง
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {officialSocialChannels.map((channel, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-900">
                  {channel.platform}
                </span>
                {channel.followerCount && (
                  <span className="text-[11px] text-slate-500 font-medium">
                    {channel.followerCount}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
                {channel.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {channel.description}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Handle / URL:</span>
                <span className="font-mono font-semibold text-slate-700">{channel.displayUrl}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-medium">● ทางการ (Verified)</span>
              <a
                href={channel.handleOrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>เข้าชมช่องทาง</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {/* Special LINE QR Box */}
        <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl border border-emerald-300 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>LINE Official: @palitheravada</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              สแกนเพิ่มเพื่อนเพื่อรับแจ้งเตือนผลสอบบาลี สมุดพกสามเณร และรับคิวจองภัตตาหารเพลออนไลน์อัตโนมัติ
            </p>
            <div className="py-2 flex justify-center">
              <div className="w-32 h-32 rounded-xl bg-white border border-emerald-200 shadow-xs flex flex-col items-center justify-center p-2 text-center">
                <QrCode className="w-20 h-20 text-emerald-800" />
                <span className="text-[9px] font-mono text-emerald-700 font-bold mt-1">@palitheravada</span>
              </div>
            </div>
          </div>

          <a
            href="https://line.me/R/ti/p/@palitheravada"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center block transition-colors shadow-sm"
          >
            เพิ่มเพื่อน LINE Official
          </a>
        </div>
      </div>
    </div>
  );
}
