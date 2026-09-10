"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  UserCheck,
  IdCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Scroll,
  Printer,
  QrCode,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { MemberCategory, AuthUser, formatCitizenId } from "@/data/authData";
import DigitalMemberCardModal from "@/components/DigitalMemberCardModal";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [memberCategory, setMemberCategory] = useState<MemberCategory>("MONK");

  // Form Fields
  const [title, setTitle] = useState("พระมหา");
  const [fullName, setFullName] = useState("");
  const [paliName, setPaliName] = useState("");
  const [sanghaRank, setSanghaRank] = useState("");
  const [vassa, setVassa] = useState("");
  const [originTemple, setOriginTemple] = useState("วัดบาลีเถรวาทสังฆาราม");
  const [department, setDepartment] = useState("สำนักวิชาการ");
  const [studentCode, setStudentCode] = useState("");
  const [positionCode, setPositionCode] = useState("");
  const [idCardNo, setIdCardNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<AuthUser | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  // Category Configuration
  const categories = [
    {
      id: "MONK" as MemberCategory,
      title: "พระภิกษุสงฆ์",
      subtitle: "พระเถรานุเถระ พระธรรมทูต ครูสอนบาลี",
      icon: Scroll,
      defaultTitle: "พระมหา",
      color: "border-amber-500 bg-amber-50/50 text-amber-950",
    },
    {
      id: "SAMANERA" as MemberCategory,
      title: "ศากยบุตรสามเณร",
      subtitle: "สามเณรผู้ทรงจำพระไตรปิฎก ชั้น ๑-๙",
      icon: BookOpen,
      defaultTitle: "สามเณร",
      color: "border-yellow-500 bg-yellow-50/50 text-yellow-950",
    },
    {
      id: "GRAD_STUDENT" as MemberCategory,
      title: "นิสิตระดับบัณฑิตศึกษา",
      subtitle: "นิสิต พธ.ด. และ พธ.ม. พระไตรปิฎกเถรวาท",
      icon: GraduationCap,
      defaultTitle: "พระมหา / นาย",
      color: "border-blue-500 bg-blue-50/50 text-blue-950",
    },
    {
      id: "FACULTY" as MemberCategory,
      title: "คณาจารย์ / บุคลากร",
      subtitle: "คัมภีราจารย์ คณาจารย์ประจำ และเจ้าหน้าที่",
      icon: Briefcase,
      defaultTitle: "อาจารย์ ดร.",
      color: "border-purple-500 bg-purple-50/50 text-purple-950",
    },
    {
      id: "PATRON" as MemberCategory,
      title: "โยมอุปถัมภ์ / ประชาชน",
      subtitle: "คณะเจ้าภาพภัตตาหาร โยมอุปถัมภ์การศึกษา",
      icon: HeartHandshake,
      defaultTitle: "นาย / นาง / นางสาว",
      color: "border-emerald-500 bg-emerald-50/50 text-emerald-950",
    },
  ];

  const handleSelectCategory = (cat: MemberCategory) => {
    setMemberCategory(cat);
    const found = categories.find((c) => c.id === cat);
    if (found) {
      if (cat === "MONK") setTitle("พระมหา");
      else if (cat === "SAMANERA") setTitle("สามเณร");
      else if (cat === "PATRON") setTitle("นาย");
      else if (cat === "FACULTY") setTitle("อาจารย์ ดร.");
      else setTitle("พระมหา");
    }
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!fullName || !email) {
      setErrorMessage("กรุณากรอกชื่อ-นามสกุล และอีเมลให้ครบถ้วน");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password && password !== confirmPassword) {
      setErrorMessage("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!pdpaConsent) {
      setErrorMessage("กรุณาให้ความยินยอมการประมวลผลข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)");
      return;
    }

    setIsLoading(true);

    const res = await register({
      memberCategory,
      title,
      fullName,
      paliName: paliName || undefined,
      sanghaRank: sanghaRank || undefined,
      vassa: vassa ? Number(vassa) : undefined,
      originTemple,
      department,
      studentCode: studentCode || undefined,
      positionCode: positionCode || undefined,
      idCardNo: idCardNo || undefined,
      email,
      phone,
      password: password || "123456",
    });

    setIsLoading(false);

    if (res.success && res.user) {
      setRegisteredUser(res.user);
      setStep(4);
    } else {
      setErrorMessage(res.error || "เกิดข้อผิดพลาดในการลงทะเบียนสมาชิก");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>ระบบรับสมัครเป็นสมาชิกใหม่และออกบัตรสมาชิกดิจิทัล (Member Registration)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          ลงทะเบียนสมาชิก มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          สร้างศาสนทายาท ศากยบุตรสามเณรสีหะ ผู้สืบทอดและทรงจำพระไตรปิฎกบาลีเถรวาท สมัครครั้งเดียวเข้าถึงระบบ ERP ทั้ง ๒๓ โมดูล
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-between text-xs font-bold px-4">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-amber-800" : "text-slate-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            ๑
          </div>
          <span className="hidden sm:inline">ประเภทสมาชิก</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? "bg-amber-500" : "bg-slate-200"}`} />

        <div className={`flex items-center gap-2 ${step >= 2 ? "text-amber-800" : "text-slate-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 2 ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            ๒
          </div>
          <span className="hidden sm:inline">ข้อมูลส่วนตัว</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? "bg-amber-500" : "bg-slate-200"}`} />

        <div className={`flex items-center gap-2 ${step >= 3 ? "text-amber-800" : "text-slate-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 3 ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            ๓
          </div>
          <span className="hidden sm:inline">ความปลอดภัย</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 ${step >= 4 ? "bg-amber-500" : "bg-slate-200"}`} />

        <div className={`flex items-center gap-2 ${step >= 4 ? "text-amber-800" : "text-slate-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 4 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            ๔
          </div>
          <span className="hidden sm:inline">บัตรสมาชิก</span>
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: SELECT CATEGORY */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center">
            <h2 className="text-base font-bold text-slate-900">
              ขั้นตอนที่ ๑: กรุณาเลือกประเภทสมาชิกของท่าน
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              เพื่อจัดสรรสิทธิ์และฟอร์มข้อมูลที่ตรงตามสมณสารูปและวินัยสงฆ์
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer flex items-start gap-3.5 ${
                    memberCategory === cat.id ? "border-amber-600 bg-amber-50/70 ring-2 ring-amber-300/60" : "border-slate-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/login"
              className="text-xs text-amber-800 hover:text-amber-950 font-semibold"
            >
              มีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่
            </Link>
          </div>
        </div>
      )}

      {/* STEP 2: PERSONAL & MONASTIC DETAILS */}
      {step === 2 && (
        <form onSubmit={handleNextToStep3} className="max-w-2xl mx-auto bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                ขั้นตอนที่ ๒: กรอกข้อมูลส่วนตัว & สังกัด
              </h2>
              <p className="text-[11px] text-slate-500">
                ประเภท: <strong>{categories.find((c) => c.id === memberCategory)?.title}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>เปลี่ยนประเภท</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                คำนำหน้า:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="พระมหา / สามเณร / นาย"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อ - นามสกุล: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ระบุชื่อและนามสกุลจริง"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Pali Name & Sangha Rank (For Monks / Novices) */}
          {(memberCategory === "MONK" || memberCategory === "SAMANERA" || memberCategory === "GRAD_STUDENT") && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div>
                <label className="block text-[11px] font-bold text-amber-950 mb-1">
                  ฉายาภาษาบาลี:
                </label>
                <input
                  type="text"
                  value={paliName}
                  onChange={(e) => setPaliName(e.target.value)}
                  placeholder="เช่น ปิยสีโล, ญาณธีโร"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs text-slate-900 bg-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-950 mb-1">
                  สมณศักดิ์ / วุฒิ ป.ธ.:
                </label>
                <input
                  type="text"
                  value={sanghaRank}
                  onChange={(e) => setSanghaRank(e.target.value)}
                  placeholder="เช่น เปรียญธรรม ๙ ประโยค"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs text-slate-900 bg-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-950 mb-1">
                  พรรษา:
                </label>
                <input
                  type="number"
                  value={vassa}
                  onChange={(e) => setVassa(e.target.value)}
                  placeholder="ระบุพรรษา"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs text-slate-900 bg-white outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* Temple or Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                วัดต้นสังกัด / ที่พักสงฆ์:
              </label>
              <input
                type="text"
                value={originTemple}
                onChange={(e) => setOriginTemple(e.target.value)}
                placeholder="วัดสระเกศ / วัดบาลีเถรวาทสังฆาราม"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ฝ่ายงาน / สังกัดวิทยาลัย:
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="สำนักวิชาการ / โรงเรียนศากยบุตร"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Identifiers (Citizen ID, Student Code, Position Code) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เลขประจำตัวประชาชน (๑๓ หลัก) / เลขที่ใบสุทธิ:
              </label>
              <input
                type="text"
                maxLength={17}
                value={idCardNo}
                onChange={(e) => setIdCardNo(e.target.value)}
                placeholder="เช่น 1-7399-00123-45-6"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">
                ใช้สำหรับยืนยันตัวตนและเข้าสู่ระบบด้วยเลขประจำตัว
              </p>
            </div>

            {memberCategory === "GRAD_STUDENT" || memberCategory === "SAMANERA" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รหัสนิสิต มจร / รหัสสามเณร:
                </label>
                <input
                  type="text"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  placeholder="เช่น 6701501001 หรือ SKB-2569-001"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500 font-mono"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รหัสตำแหน่งทางการ (ถ้ามี):
                </label>
                <input
                  type="text"
                  value={positionCode}
                  onChange={(e) => setPositionCode(e.target.value)}
                  placeholder="เช่น POS-ADMIN-001"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500 font-mono"
                />
              </div>
            )}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                อีเมลติดต่อ: <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@palitheravada.mcu.ac.th หรือ gmail"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เบอร์โทรศัพท์:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="เช่น 081-234-5678"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>ถัดไป (กำหนดรหัสผ่าน)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: SECURITY CREDENTIALS & CONSENT */}
      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="max-w-2xl mx-auto bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                ขั้นตอนที่ ๓: กำหนดรหัสผ่านและการคุ้มครองข้อมูลส่วนบุคคล
              </h2>
              <p className="text-[11px] text-slate-500">
                ตั้งรหัสผ่านสำหรับเข้าสู่ระบบเพิ่มเติมจากรหัสประจำตัว
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>แก้ไขข้อมูล</span>
            </button>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                กำหนดรหัสผ่าน (Password): <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ความยาวอย่างน้อย ๖ ตัวอักษร"
                  className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ยืนยันรหัสผ่านอีกครั้ง: <span className="text-rose-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Member Summary Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <IdCard className="w-4 h-4 text-amber-700" />
              <span>สรุปข้อมูลการสมัครสมาชิก:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 text-[11px]">
              <div><strong>ชื่อ-นามสกุล:</strong> {title} {fullName}</div>
              {paliName && <div><strong>ฉายาบาลี:</strong> {paliName}</div>}
              <div><strong>ประเภทสมาชิก:</strong> {categories.find((c) => c.id === memberCategory)?.title}</div>
              <div><strong>อีเมล:</strong> {email}</div>
              {idCardNo && <div><strong>เลขประจำตัว:</strong> {idCardNo}</div>}
              {studentCode && <div><strong>รหัสนิสิต:</strong> {studentCode}</div>}
            </div>
          </div>

          {/* PDPA Consent Agreement */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="pdpa-agree"
                checked={pdpaConsent}
                onChange={(e) => setPdpaConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="pdpa-agree" className="text-slate-700 leading-relaxed cursor-pointer select-none">
                <strong>การให้ความยินยอมตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA):</strong><br />
                ข้าพเจ้ายินยอมให้มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) เก็บรวบรวม ใช้ และประมวลผลข้อมูลส่วนบุคคลและข้อมูลสงฆ์ข้างต้น เพื่อประโยชน์ในการบริหารการศึกษา กิจวัตรสงฆ์ ทะเบียน มจร และการออกบัตรสมาชิกดิจิทัล โดยสถาบันจะคุ้มครองความปลอดภัยของข้อมูลตามมาตรฐาน ISO/IEC 27001 อย่างเคร่งครัด
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>กำลังลงทะเบียนสมาชิก...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                  <span>ยืนยันการสมัครและออกบัตรสมาชิก</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: SUCCESS & DIGITAL MEMBER CARD */}
      {step === 4 && registeredUser && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              ยินดีต้อนรับสมาชิกใหม่สู่ราชวิทยาลัย!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              การลงทะเบียนสมาชิกเสร็จสมบูรณ์ ระบบได้สร้างบัญชีผู้ใช้งานและออกรหัสประจำตัวสมาชิกทางการให้ท่านเรียบร้อยแล้ว
            </p>
          </div>

          {/* Member ID Badge */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border border-amber-300 max-w-md mx-auto space-y-1.5">
            <span className="text-xs text-amber-800 font-semibold block">
              รหัสสมาชิกทางการของคุณ (MEMBER ID)
            </span>
            <span className="text-2xl font-mono font-extrabold text-amber-950 tracking-wider block">
              {registeredUser.memberId}
            </span>
            <p className="text-[11px] text-amber-800/80">
              ท่านสามารถใช้ <strong>ชื่อ</strong> และ <strong>รหัสสมาชิกนี้</strong> หรือรหัสผ่าน เพื่อเข้าสู่ระบบได้ทุกที่ทุกเวลา
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2 text-xs">
            <button
              type="button"
              onClick={() => setShowCardModal(true)}
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>เปิดดู / พิมพ์บัตรสมาชิกดิจิทัล</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow flex items-center justify-center gap-2"
            >
              <span>เข้าสู่ระบบและไปหน้าหลัก</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Digital Member Card Modal */}
          <DigitalMemberCardModal
            isOpen={showCardModal}
            onClose={() => setShowCardModal(false)}
            user={registeredUser}
          />
        </div>
      )}
    </div>
  );
}
