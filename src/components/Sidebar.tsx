"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scroll, Info } from "lucide-react";
import { navigationGroups } from "@/data/navigationData";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();

  // Hide sidebar on login and register pages for clean authentication view
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 bg-white/70 backdrop-blur border-r border-amber-200/70 shrink-0 flex-col justify-between p-4 space-y-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
      <div className="space-y-4">
        <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
            <Scroll className="w-4 h-4 text-amber-700" />
            <span>ระบบบริหารสถาบันศาสนทายาท</span>
          </div>
          <p className="text-[11px] text-amber-800/80 mt-1">
            มุ่งสร้างศากยบุตรสามเณรสีหะ ผู้ทรงพระไตรปิฎกบาลีเถรวาท
          </p>
        </div>

        <nav className="space-y-4">
          {navigationGroups.map((group) => (
            <div key={group.groupName} className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900/60 bg-amber-100/40 rounded-md">
                {group.groupName}
              </div>
              <div className="space-y-1 pt-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all group",
                        isActive
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-700/20 font-semibold"
                          : "text-slate-700 hover:bg-amber-50/80 hover:text-amber-900"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-amber-100" : "text-amber-700 group-hover:scale-110 transition-transform")} />
                        <div className="min-w-0">
                          <p className="leading-tight truncate">{item.name}</p>
                          <p className={cn("text-[10px] truncate", isActive ? "text-amber-100" : "text-slate-400")}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ml-1",
                          isActive ? "bg-amber-800/60 text-amber-100" : "bg-amber-100/70 text-amber-800"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Account Session Box */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-2 mt-auto">
        {currentUser ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {currentUser.avatarText || "SB"}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate text-[11px]">
                    {currentUser.fullName}
                  </p>
                  <p className="text-[10px] text-amber-800 font-mono truncate">
                    {currentUser.memberId}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-amber-200/60 text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-amber-200/60 text-amber-900 font-semibold">
                {currentUser.role}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <p className="text-[11px] text-slate-600 font-medium">
              เข้าถึงระบบด้วยบัญชีสมาชิก
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/login"
                className="py-1.5 px-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] text-center shadow-xs"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="py-1.5 px-2 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px] text-center"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* College Info Box */}
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
          <Info className="w-4 h-4 text-amber-600" />
          <span>ข้อมูลวิทยาเขต</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม<br/>
          สังกัด: มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)
        </p>
        <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
          <span>Production Pilot v1.2 (๒๓ โมดูล)</span>
          <span className="text-emerald-600 font-medium">● ระบบสมบูรณ์</span>
        </div>
      </div>
    </aside>
  );
}
