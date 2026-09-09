"use client";

import React from "react";
import Link from "next/link";
import { Bell, ShieldCheck, UserCircle2, Sparkles, BookOpen, MessageSquareText, Phone } from "lucide-react";
import { VisitorCounterBadge } from "./VisitorCounterBadge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-amber-200/80 px-4 lg:px-8 py-3 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Emblem */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-base md:text-lg tracking-tight">
                มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-300/60">
                วส. มจร
              </span>
            </div>
            <p className="text-xs text-amber-800 font-medium hidden sm:block">
              สถาบันการศึกษาพระปริยัติธรรมบาลีเถรวาท • โรงเรียนศากยบุตรสามเณรสีหะ
            </p>
          </div>
        </Link>

        {/* Center Quick Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-amber-50/60 p-1 rounded-xl border border-amber-200/50">
          <Link 
            href="/" 
            className="px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-white hover:text-amber-700 hover:shadow-xs rounded-lg transition-all"
          >
            แดชบอร์ดภาพรวม
          </Link>
          <Link 
            href="/alms-patron" 
            className="px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-white hover:text-amber-700 hover:shadow-xs rounded-lg transition-all flex items-center gap-1.5"
          >
            <span>ใบอนุโมทนาบัตร & e-Donation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </Link>
          <Link 
            href="/mukhopatha" 
            className="px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-white hover:text-amber-700 hover:shadow-xs rounded-lg transition-all"
          >
            มุขปาฐะบาลี
          </Link>
          <Link 
            href="/mcu-bridge" 
            className="px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-white hover:text-amber-700 hover:shadow-xs rounded-lg transition-all"
          >
            ทะเบียน มจร
          </Link>
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visitor Counter Live Badge */}
          <VisitorCounterBadge className="hidden md:inline-flex" />

          {/* Quick Contact Access */}
          <Link
            href="/contact"
            title="ช่องทางติดต่อราชการ & ทำเนียบ ๘ ฝ่ายงาน (MOD-21)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">ติดต่อเรา</span>
          </Link>

          {/* Quick Chat Board Access */}
          <Link
            href="/chat-board"
            title="แชตบอร์ด & สนทนาธรรมออนไลน์ (MOD-19)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-semibold transition-colors"
          >
            <MessageSquareText className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">แชตบอร์ด</span>
          </Link>

          <button 
            type="button" 
            title="การแจ้งเตือน"
            aria-label="เปิดกล่องข้อความแจ้งเตือนระบบ"
            className="p-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-amber-300/40">
              SB
            </div>
            <div className="hidden lg:block text-left text-xs">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-slate-900">Somboon</p>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-bold rounded">
                  Super Admin
                </span>
              </div>
              <p className="text-slate-500 text-[10px]">smjaurna@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
