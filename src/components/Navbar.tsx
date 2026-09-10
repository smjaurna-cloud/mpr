"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  ShieldCheck, 
  UserCircle2, 
  Sparkles, 
  BookOpen, 
  MessageSquareText, 
  Phone, 
  Database,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  IdCard,
  Users
} from "lucide-react";
import { VisitorCounterBadge } from "./VisitorCounterBadge";
import { useAuth } from "@/context/AuthContext";
import { initialAuthUsers } from "@/data/authData";
import DigitalMemberCardModal from "./DigitalMemberCardModal";

export default function Navbar() {
  const { currentUser, logout, switchPersona } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMemberCardModal, setShowMemberCardModal] = useState(false);

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

          {/* Quick Data Updater Access (MOD-23) */}
          <Link
            href="/data-updater"
            title="ศูนย์อัปเดตข้อมูลทุกระบบ (MOD-23)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Database className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden sm:inline">อัปเดตข้อมูล</span>
          </Link>

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
            className="p-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          </button>

          {/* User Authentication Profile Area */}
          {currentUser ? (
            <div className="relative pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-left p-1 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-amber-300/40 shrink-0">
                  {currentUser.avatarText || "SB"}
                </div>
                <div className="hidden lg:block text-left text-xs">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 truncate max-w-[110px]">
                      {currentUser.fullName.split(" ")[0]}
                    </p>
                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-bold rounded">
                      {currentUser.role === "SUPER_ADMIN" ? "Super Admin" : currentUser.memberCategory}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] truncate max-w-[120px]">
                    {currentUser.memberId}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {/* Profile Dropdown Popover */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-amber-200 p-3 space-y-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Header */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                    <p className="text-xs font-bold text-slate-900">{currentUser.fullName}</p>
                    {currentUser.paliName && (
                      <p className="text-[11px] text-amber-800 font-serif">ฉายา: {currentUser.paliName}</p>
                    )}
                    <p className="text-[10px] text-slate-500 font-mono">รหัสสมาชิก: {currentUser.memberId}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 text-[9px] font-bold">
                      {currentUser.role}
                    </span>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMemberCardModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 flex items-center gap-2 text-slate-700 hover:text-amber-900 transition-colors cursor-pointer"
                    >
                      <IdCard className="w-4 h-4 text-amber-700" />
                      <span>เปิดดูบัตรสมาชิกดิจิทัล (Digital Card)</span>
                    </button>

                    <Link
                      href="/users"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 flex items-center gap-2 text-slate-700 hover:text-amber-900 transition-colors"
                    >
                      <Users className="w-4 h-4 text-amber-700" />
                      <span>ระบบจัดการผู้ใช้งาน (MOD-06)</span>
                    </Link>

                    {/* Switch Persona Fast Buttons */}
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                        สลับบทบาททดสอบ (Quick Switch)
                      </p>
                      <div className="space-y-0.5">
                        {initialAuthUsers.slice(0, 4).map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => {
                              switchPersona(u.id);
                              setShowProfileMenu(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center justify-between cursor-pointer ${
                              currentUser.id === u.id
                                ? "bg-amber-100 text-amber-950 font-bold"
                                : "hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span className="truncate">{u.fullName}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{u.memberId}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-700 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>ออกจากระบบ (Logout)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Buttons (Not Logged In) */
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-700" />
                <span>เข้าสู่ระบบ</span>
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <UserPlus className="w-3.5 h-3.5 text-yellow-200" />
                <span>สมัครสมาชิก</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Digital Member Card Modal */}
      {currentUser && (
        <DigitalMemberCardModal
          isOpen={showMemberCardModal}
          onClose={() => setShowMemberCardModal(false)}
          user={currentUser}
        />
      )}
    </header>
  );
}
