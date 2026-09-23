"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  Search, 
  BookOpen, 
  Sparkles, 
  LogOut, 
  IdCard, 
  LogIn, 
  UserPlus, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { navigationGroups } from "@/data/navigationData";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMemberCard?: () => void;
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenMemberCard,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Close drawer on path change
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items by search query
  const filteredGroups = navigationGroups.map((group) => {
    const matchedItems = group.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return {
      ...group,
      items: matchedItems,
    };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside 
        className="fixed inset-y-0 left-0 max-w-[85vw] w-80 bg-white shadow-2xl flex flex-col z-10 border-r border-amber-200 transition-transform transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="สารบบนำทางโมดูลวิทยาลัยสงฆ์"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-4 shrink-0 flex items-center justify-between border-b border-amber-700/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/30 border border-amber-400/50 flex items-center justify-center text-amber-200 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight text-amber-100">
                วส. มจร • สารบบงาน
              </h2>
              <p className="text-[10px] text-amber-300/80 font-medium">
                ระบบ ERP วิทยาลัยสงฆ์ ๒๔ โมดูล
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="ปิดเมนู"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Area */}
        <div className="p-3 bg-amber-50/70 border-b border-amber-200/80 shrink-0">
          {currentUser ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-amber-300/40">
                  {currentUser.avatarText || "SB"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {currentUser.fullName}
                    </p>
                    <span className="px-1.5 py-0.5 bg-amber-200/80 text-amber-900 text-[9px] font-bold rounded shrink-0">
                      {currentUser.role === "SUPER_ADMIN" ? "Super Admin" : currentUser.memberCategory}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] font-mono truncate">
                    {currentUser.memberId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                {onOpenMemberCard && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenMemberCard();
                      onClose();
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-amber-300 text-amber-900 text-[11px] font-semibold flex items-center justify-center gap-1 hover:bg-amber-100 transition-colors"
                  >
                    <IdCard className="w-3.5 h-3.5 text-amber-700" />
                    <span>บัตรสมาชิกดิจิทัล</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="py-1.5 px-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold flex items-center gap-1 hover:bg-rose-100 transition-colors"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="sr-only sm:not-sr-only">ออก</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>เข้าสู่ระบบแอดมิน</span>
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="py-2 px-3 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-50 transition-colors"
              >
                <span>สมัคร</span>
              </Link>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาโมดูล / ระบบงาน..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <p>ไม่พบระบบงานที่ตรงกับ &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.groupName} className="space-y-1">
                <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900/70 bg-amber-100/50 rounded-md">
                  {group.groupName}
                </p>
                <div className="space-y-0.5 pt-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-xl text-xs transition-colors",
                          isActive
                            ? "bg-amber-600 text-white font-semibold shadow-xs"
                            : "text-slate-700 hover:bg-amber-50 hover:text-amber-900"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-amber-700")} />
                          <div className="truncate">
                            <p className="truncate font-medium">{item.name}</p>
                            <p className={cn("text-[10px] truncate", isActive ? "text-amber-100" : "text-slate-400")}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ml-1.5",
                              isActive
                                ? "bg-amber-700 text-amber-100"
                                : "bg-amber-100 text-amber-800"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 text-center shrink-0">
          <p className="font-semibold text-slate-700">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
          <p className="text-[9px] text-slate-400 mt-0.5">รองรับ Android & iOS • PWA Standalone</p>
        </div>
      </aside>
    </div>
  );
}
