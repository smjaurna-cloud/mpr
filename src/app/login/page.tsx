"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  User,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  IdCard,
  GraduationCap,
  Briefcase,
  Layers,
  HelpCircle,
  UserPlus
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { IdentifierType, initialAuthUsers } from "@/data/authData";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"MULTI_ID" | "GOOGLE">("MULTI_ID");
  const [identifierName, setIdentifierName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [idType, setIdType] = useState<IdentifierType>("ALL");
  const [showSecret, setShowSecret] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("smjaurna@gmail.com");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle Multi-ID Login
  const handleMultiIdLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const res = await login(identifierName, secretCode, idType);
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || "เข้าสู่ระบบสำเร็จ กำลังพาไปยังแดชบอร์ด...");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } else {
      setErrorMessage(res.error || "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async (customEmail?: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const emailToUse = customEmail || googleEmail;
    const res = await loginWithGoogle(
      emailToUse,
      emailToUse === "smjaurna@gmail.com" ? "อาจารย์ ดร.สมบูรณ์ จารุณะ" : undefined
    );
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || "เข้าสู่ระบบด้วย Google สำเร็จ!");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } else {
      setErrorMessage(res.error || "เกิดข้อผิดพลาดในการยืนยันตัวตนด้วย Google");
    }
  };

  // Quick Demo Autofill
  const handleQuickDemoFill = (
    name: string,
    secret: string,
    type: IdentifierType
  ) => {
    setIdentifierName(name);
    setSecretCode(secret);
    setIdType(type);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8">
      {/* Top Heritage Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>ระบบสารสนเทศอัตลักษณ์และบริการสมาชิกดิจิทัล (Identity & Member Access)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          เข้าสู่ระบบ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          ยินดีต้อนรับพระภิกษุสงฆ์ ศากยบุตรสามเณร นิสิต คณาจารย์ บุคลากร และโยมอุปถัมภ์ สู่ศูนย์กลางระบบ ERP วิทยาลัยสงฆ์ ๒๓ โมดูล (วส. มจร)
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden max-w-xl mx-auto">
        {/* Tab Selection */}
        <div className="grid grid-cols-2 bg-amber-50/70 border-b border-amber-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab("MULTI_ID"); setErrorMessage(null); }}
            className={`py-3.5 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === "MULTI_ID"
                ? "border-amber-700 text-amber-900 bg-white shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <IdCard className="w-4 h-4 text-amber-700" />
            <span>เข้าสู่ระบบด้วยชื่อและรหัสระบุตัวตน</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("GOOGLE"); setErrorMessage(null); }}
            className={`py-3.5 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === "GOOGLE"
                ? "border-amber-700 text-amber-900 bg-white shadow-xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>เข้าสู่ระบบด้วย Google</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Notification Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">{successMessage}</span>
            </div>
          )}

          {/* TAB 1: MULTI-IDENTIFIER LOGIN */}
          {activeTab === "MULTI_ID" && (
            <form onSubmit={handleMultiIdLogin} className="space-y-4">
              {/* Field 1: Name / Username / Pali Name / Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  ๑. ชื่อผู้ใช้งาน / ชื่อ-นามสกุล / ฉายาบาลี หรือ อีเมล: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifierName}
                    onChange={(e) => setIdentifierName(e.target.value)}
                    placeholder="เช่น somboon, พระธรรมวชิราจารย์, นรินทร์เดช, หรืออีเมล"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-xs text-slate-900 outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  รองรับทั้งชื่อภาษาอังกฤษ, ชื่อภาษาไทย, ฉายาบาลี, หรืออีเมลที่ลงทะเบียน
                </p>
              </div>

              {/* Field 2: Identifier Type Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  ๒. ประเภทของรหัสระบุตัวตน:
                </label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value as IdentifierType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all cursor-pointer"
                >
                  <option value="ALL">✨ ตรวจจับอัตโนมัติจากทุกรหัส (แนะนำ)</option>
                  <option value="MEMBER_ID">🪪 รหัสสมาชิก (Member ID: เช่น MBR-XXXX)</option>
                  <option value="STUDENT_ID">🎓 รหัสนิสิต / รหัสสามเณร (Student ID: เช่น 6701501001, SKB-XXXX)</option>
                  <option value="POSITION_CODE">🏛️ รหัสตำแหน่งทางการ (Position Code: เช่น POS-XXXX)</option>
                  <option value="CITIZEN_ID">📄 เลขประจำตัวประชาชน (๑๓ หลัก: 1-XXXX-XXXXX-XX-X)</option>
                  <option value="PASSWORD">🔒 รหัสผ่านส่วนตัว (Password)</option>
                </select>
              </div>

              {/* Field 3: Secret Code Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  ๓. รหัสระบุตัวตน / เลขประจำตัว / รหัสผ่าน: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showSecret ? "text" : "password"}
                    required
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    placeholder={
                      idType === "CITIZEN_ID"
                        ? "ระบุเลขบัตรประชาชน ๑๓ หลัก เช่น 1739900123456"
                        : idType === "STUDENT_ID"
                        ? "ระบุรหัสนิสิต เช่น 6701501001"
                        : idType === "POSITION_CODE"
                        ? "ระบุรหัสตำแหน่ง เช่น POS-ADMIN-001"
                        : idType === "MEMBER_ID"
                        ? "ระบุรหัสสมาชิก เช่น MBR-SOMBOON"
                        : "กรอกรหัสสมาชิก / รหัสนิสิต / รหัสตำแหน่ง / เลขบัตรประชาชน หรือรหัสผ่าน"
                    }
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-xs text-slate-900 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showSecret ? "ซ่อนรหัส" : "แสดงรหัส"}
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-white font-bold text-xs shadow-md shadow-amber-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>กำลังตรวจสอบข้อมูล...</span>
                  </>
                ) : (
                  <>
                    <span>เข้าสู่ระบบสารสนเทศ</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: GOOGLE SIGN-IN */}
          {activeTab === "GOOGLE" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-center space-y-2">
                <p className="text-xs font-semibold text-amber-950">
                  บริการลงชื่อเข้าใช้งานด้วยบัญชี Google ของมหาวิทยาลัย
                </p>
                <p className="text-[11px] text-amber-800/80">
                  รองรับบัญชี Google Workspace ของ มจร (<strong>@mcu.ac.th</strong>) และบัญชี Google ส่วนบุคคล (<strong>@gmail.com</strong>)
                </p>
              </div>

              {/* Instant 1-Click Button for Dr. Somboon */}
              <button
                type="button"
                onClick={() => handleGoogleLogin("smjaurna@gmail.com")}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>เข้าสู่ระบบด้วย Google: smjaurna@gmail.com (ดร.สมบูรณ์)</span>
              </button>

              {/* Or type another Google email */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] text-slate-400">หรือใช้อีเมล Google อื่น</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="ระบุบัญชี Google เช่น yourname@mcu.ac.th"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  ลงชื่อเข้าใช้ด้วยบัญชี Google นี้
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Autofill Chips */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700">
                ⚡ ตัวอย่างข้อมูลทดสอบเข้าสู่ระบบด่วน (Click to Auto-fill):
              </span>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                ครบ ๕ กลุ่ม
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {/* 1. Dr. Somboon by Citizen ID */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("MULTI_ID");
                  handleQuickDemoFill("somboon", "1-7399-00123-45-6", "CITIZEN_ID");
                }}
                className="p-2 rounded-lg bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-amber-950 flex items-center justify-between">
                  <span>ดร.สมบูรณ์ จารุณะ</span>
                  <span className="text-[9px] text-amber-700 bg-amber-200/70 px-1 rounded">เลขบัตรประชาชน</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ID: 1-7399-00123-45-6 (Super Admin)
                </div>
              </button>

              {/* 2. Director by Member ID */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("MULTI_ID");
                  handleQuickDemoFill("director.mvu", "MBR-DIR-001", "MEMBER_ID");
                }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>พระธรรมวชิราจารย์</span>
                  <span className="text-[9px] text-blue-700 bg-blue-100 px-1 rounded">รหัสสมาชิก</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ID: MBR-DIR-001 (ผอ.วส.มจร)
                </div>
              </button>

              {/* 3. Ph.D. Student by Student ID */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("MULTI_ID");
                  handleQuickDemoFill("พระมหาทรงชัย", "6701501001", "STUDENT_ID");
                }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>พระมหาทรงชัย (พธ.ด.)</span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1 rounded">รหัสนิสิต</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ID: 6701501001 (พธ.ด. รุ่น ๑)
                </div>
              </button>

              {/* 4. Pali Teacher by Position Code */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("MULTI_ID");
                  handleQuickDemoFill("พระมหาเสฏฐวุฒิ", "POS-TCH-001", "POSITION_CODE");
                }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>พระมหาเสฏฐวุฒิ ป.ธ.๙</span>
                  <span className="text-[9px] text-purple-700 bg-purple-100 px-1 rounded">รหัสตำแหน่ง</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ID: POS-TCH-001 (อาจารย์บาลี)
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Register Prompt */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-600">
              ยังไม่มีบัญชีสมาชิกวิทยาลัยสงฆ์?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors"
            >
              <UserPlus className="w-4 h-4 text-amber-700" />
              <span>สมัครเป็นสมาชิกใหม่ (ออกรหัส & บัตรสมาชิกทันที)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
