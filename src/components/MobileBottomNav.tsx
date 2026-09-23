"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  BookMarked,
  Grid3X3,
  UserCircle2,
  LogIn,
} from "lucide-react";
import { useMobileNav } from "@/context/MobileNavContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { openDrawer, openMemberCard } = useMobileNav();
  const { currentUser } = useAuth();

  // Hide bottom nav on authentication pages for a clean full-screen view
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isHome = pathname === "/";
  const isAlms = pathname === "/alms-patron";
  const isMukhopatha = pathname === "/mukhopatha";

  return (
    <nav
      aria-label="แถบนำทางด่วนบนโทรศัพท์มือถือ"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 md:hidden px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg shadow-amber-950/10"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {/* 1. Dashboard */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all group",
            isHome
              ? "text-amber-800 font-bold"
              : "text-slate-500 hover:text-amber-700 hover:bg-amber-50/50"
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
              isHome
                ? "bg-amber-600 text-white shadow-xs scale-105"
                : "text-slate-500 group-hover:text-amber-700"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="mt-0.5 tracking-tight truncate max-w-full">แดชบอร์ด</span>
        </Link>

        {/* 2. Alms & Patron */}
        <Link
          href="/alms-patron"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all group relative",
            isAlms
              ? "text-amber-800 font-bold"
              : "text-slate-500 hover:text-amber-700 hover:bg-amber-50/50"
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all relative",
              isAlms
                ? "bg-amber-600 text-white shadow-xs scale-105"
                : "text-slate-500 group-hover:text-amber-700"
            )}
          >
            <Utensils className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <span className="mt-0.5 tracking-tight truncate max-w-full">ภัตตาหาร</span>
        </Link>

        {/* 3. Mukhopatha */}
        <Link
          href="/mukhopatha"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium transition-all group",
            isMukhopatha
              ? "text-amber-800 font-bold"
              : "text-slate-500 hover:text-amber-700 hover:bg-amber-50/50"
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
              isMukhopatha
                ? "bg-amber-600 text-white shadow-xs scale-105"
                : "text-slate-500 group-hover:text-amber-700"
            )}
          >
            <BookMarked className="w-4 h-4" />
          </div>
          <span className="mt-0.5 tracking-tight truncate max-w-full">มุขปาฐะ</span>
        </Link>

        {/* 4. All 24 Modules Drawer Trigger */}
        <button
          type="button"
          onClick={openDrawer}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium text-slate-500 hover:text-amber-700 hover:bg-amber-50/50 transition-all group"
          aria-label="เปิดสารบบระบบงาน ๒๔ โมดูล"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-100/70 border border-amber-300/60 text-amber-800 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
            <Grid3X3 className="w-4 h-4" />
          </div>
          <span className="mt-0.5 tracking-tight truncate max-w-full font-semibold text-amber-900">
            สารบบ
          </span>
        </button>

        {/* 5. User Profile / Login */}
        {currentUser ? (
          <button
            type="button"
            onClick={openMemberCard}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium text-slate-500 hover:text-amber-700 hover:bg-amber-50/50 transition-all group"
            aria-label="ดูบัตรสมาชิกดิจิทัล"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white text-[10px] font-bold flex items-center justify-center shadow-xs ring-1 ring-amber-300">
              {currentUser.avatarText || "SB"}
            </div>
            <span className="mt-0.5 tracking-tight truncate max-w-[56px]">
              {currentUser.fullName.split(" ")[0]}
            </span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[10px] font-medium text-slate-500 hover:text-amber-700 hover:bg-amber-50/50 transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:text-amber-700 group-hover:bg-amber-100 transition-colors">
              <LogIn className="w-4 h-4" />
            </div>
            <span className="mt-0.5 tracking-tight truncate max-w-full">เข้าสู่ระบบ</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
