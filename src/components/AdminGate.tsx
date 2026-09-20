"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Sparkles } from "lucide-react";

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicRoute = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }
  }, [mounted, isLoading, isAuthenticated, isPublicRoute, router]);

  // If still checking authentication
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-slate-50 to-amber-100/50 p-6">
        <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-lg animate-pulse">
            <ShieldCheck className="w-8 h-8 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-600" />
              ระบบรักษาความปลอดภัย วส. มจร
            </h3>
            <p className="text-xs text-slate-500">
              กำลังตรวจสอบสิทธิ์การเข้าใช้งานระบบ...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and trying to access internal routes, block and hold until redirected
  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shadow-md mb-4 animate-bounce">
          <Lock className="w-7 h-7 text-amber-700" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          ระบบปิดกั้นความปลอดภัย (Admin Security Gate)
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
          ต้องเข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบก่อนเข้าใช้งานส่วนนี้ กำลังนำท่านไปยังหน้าเข้าสู่ระบบ...
        </p>
        <button
          onClick={() => router.replace("/login")}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" /> ไปยังหน้าเข้าสู่ระบบทันที
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
