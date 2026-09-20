"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  UserCheck
} from "lucide-react";

interface FirstRunAdminSetupModalProps {
  isOpen: boolean;
  onComplete: (newPassword: string) => void;
  onClose?: () => void;
}

export default function FirstRunAdminSetupModal({
  isOpen,
  onComplete,
  onClose,
}: FirstRunAdminSetupModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย ๖ ตัวอักษร");
      return;
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return;
    }

    setIsSubmitting(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("mvu_admin_custom_password", password);
        localStorage.setItem("mvu_admin_setup_completed", "true");
        localStorage.setItem("mvu_admin_setup_timestamp", new Date().toISOString());
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onComplete(password);
      }, 1000);
    } catch {
      setError("ไม่สามารถบันทึกการตั้งค่าลงหน่วยความจำเครื่องได้");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-amber-200/80 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Monastic Emblem */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldAlert className="w-9 h-9 text-amber-300" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> ติดตั้งระบบสำเร็จ • เปิดใช้งานครั้งแรก
          </span>
          <h2 className="text-xl font-bold tracking-tight text-amber-100">
            กำหนดรหัสผ่านผู้ดูแลระบบหลัก (Super Admin)
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 max-w-md mx-auto">
            มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Admin Identity Card */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
              สบ
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                อาจารย์ ดร.สมบูรณ์ จารุณะ
                <UserCheck className="w-3.5 h-3.5 text-amber-600 inline" />
              </p>
              <p className="text-slate-600">
                บัญชีผู้ดูแลระบบหลัก: <span className="font-mono font-semibold text-amber-800">somboon</span> ({`smjaurna@gmail.com`})
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            เพื่อความปลอดภัยสูงสุดในการใช้งานโปรแกรมบนคอมพิวเตอร์เครื่องนี้ กรุณากำหนดรหัสผ่านส่วนตัวสำหรับเข้าสู่ระบบแอดมิน เพื่อป้องกันบุคคลภายนอกเข้าถึงข้อมูลสงฆ์และระบบจัดการ
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>บันทึกรหัสผ่านสำเร็จ กำลังพาเข้าสู่หน้าล็อกอิน...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>รหัสผ่านใหม่ (อย่างน้อย ๖ ตัวอักษร)</span>
                <span className="text-[10px] text-slate-500">แนะนำผสมตัวอักษรและตัวเลข</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่านใหม่"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ยืนยันรหัสผ่านใหม่อีกครั้ง
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="กรอกยืนยันรหัสผ่านอีกครั้ง"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>กำลังบันทึกรหัสผ่าน...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>บันทึกรหัสผ่านและเริ่มใช้งานระบบ</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-between px-6">
          <span>ความมั่นคงปลอดภัยสารสนเทศ วส. มจร</span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-amber-700 hover:underline font-medium cursor-pointer"
            >
              ข้ามไปหน้าล็อกอิน (ใช้รหัสผ่านระบบ)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
