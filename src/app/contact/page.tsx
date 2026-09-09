"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Globe,
  Building,
  Building2,
  MessageCircle,
  BookOpen,
  Search,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  ChevronRight,
  Share2,
  HelpCircle,
  Sparkles,
  PhoneForwarded,
  Car,
  Compass,
  QrCode,
  Calendar,
  Layers,
  FileCheck2,
  HeartPulse,
  Download,
} from "lucide-react";
import {
  mainCollegeContact,
  officialDepartments,
  officialSocialChannels,
  mockInquiryTickets,
  officialCampusBuildings,
  campusLandInfo,
  DepartmentContact,
  InquiryTicket,
} from "@/data/contactDirectoryData";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "directory" | "social" | "inquiry">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("ALL");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    targetDepartment: "สำนักงานผู้อำนวยการราชวิทยาลัย",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessTicket, setSubmitSuccessTicket] = useState<InquiryTicket | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Inquiry Status Tracker State
  const [trackCodeInput, setTrackCodeInput] = useState("");
  const [trackingResult, setTrackingResult] = useState<InquiryTicket | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [allTickets, setAllTickets] = useState<InquiryTicket[]>(mockInquiryTickets);

  // Check URL params for initial tab
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "directory" || tabParam === "social" || tabParam === "inquiry") {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2500);
    }
  };

  // Filter departments
  const filteredDepartments = officialDepartments.filter((dept) => {
    const matchesSearch =
      dept.nameThai.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.nameEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.phoneExtension.includes(searchQuery) ||
      dept.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDeptFilter === "ALL" || dept.id === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  // Handle Form Submit
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccessTicket(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success && data.ticket) {
        setSubmitSuccessTicket(data.ticket);
        setAllTickets((prev) => [data.ticket, ...prev]);
        setFormData({
          senderName: "",
          senderEmail: "",
          senderPhone: "",
          targetDepartment: "สำนักงานผู้อำนวยการราชวิทยาลัย",
          subject: "",
          message: "",
        });
      } else {
        setSubmitError(data.error || "เกิดข้อผิดพลาดในการส่งข้อความ");
      }
    } catch (err: any) {
      setSubmitError(err?.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Tracking Search
  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCodeInput.trim()) return;

    setIsTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/contact?code=${encodeURIComponent(trackCodeInput.trim())}`);
      const data = await res.json();

      if (data.success && data.ticket) {
        setTrackingResult(data.ticket);
      } else {
        setTrackingError(data.error || "ไม่พบรหัสติดตามนี้ในระบบ");
      }
    } catch (err: any) {
      setTrackingError("เกิดข้อผิดพลาดในการตรวจสอบสถานะ");
    } finally {
      setIsTrackingLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>มาตรฐาน ITA / OIT (O4–O5)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-100 text-xs font-semibold border border-white/20">
                วส. มจร วัดบาลีเถรวาทสังฆาราม
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              ศูนย์บริการข้อมูลและช่องทางติดต่อราชการ
            </h1>
            <p className="text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              ทำเนียบหมายเลขโทรศัพท์ภายใน ๘ ฝ่ายงาน แผนที่การเดินทาง ช่องทางสื่อสังคมออนไลน์ และระบบติดต่อสอบถามออนไลน์ เพื่อความโปร่งใสและการเข้าถึงของสาธุชน
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/30 backdrop-blur flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ทำเนียบ A4</span>
            </button>
            <a
              href={`tel:${mainCollegeContact.phones.centralSwitchboard.replace(/[^0-9]/g, "")}`}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-900/30 flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>โทรเบอร์กลาง: {mainCollegeContact.phones.centralSwitchboard}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Central Switchboard */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              สายตรง
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500 font-medium">เบอร์โทรศัพท์กลาง</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {mainCollegeContact.phones.centralSwitchboard}
            </p>
            <p className="text-[11px] text-amber-700 mt-1">ต่อ 101 ฝ่ายอำนวยการ</p>
          </div>
        </div>

        {/* Card 2: Monastic Hours */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
              ทุกวัน
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500 font-medium">เวลาถวายภัตตาหารเพล</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">ก่อน ๑๑.๐๐ น.</p>
            <p className="text-[11px] text-emerald-700 mt-1">เวลาเยี่ยมชม ๐๗.๐๐ - ๑๘.๐๐ น.</p>
          </div>
        </div>

        {/* Card 3: 24h Emergency Hotline */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200/70 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>๒๔ ชม.</span>
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500 font-medium">สายด่วนพระพี่เลี้ยง & พยาบาล</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {mainCollegeContact.phones.emergency24h}
            </p>
            <p className="text-[11px] text-rose-700 mt-1">รับเรื่องฉุกเฉินและเวชระเบียนสงฆ์</p>
          </div>
        </div>

        {/* Card 4: Official Email */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">
              มจร
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-500 font-medium">ไปรษณีย์อิเล็กทรอนิกส์กลาง</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 truncate" title={mainCollegeContact.emails.primary}>
              {mainCollegeContact.emails.primary}
            </p>
            <p className="text-[11px] text-blue-700 mt-1">palitheravada.mcu.ac.th</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-amber-200 bg-white rounded-2xl p-1.5 shadow-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "overview"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>๑. ภาพรวม & แผนที่การเดินทาง</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "directory"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <PhoneForwarded className="w-4 h-4" />
          <span>๒. ทำเนียบหมายเลขภายใน ๘ ฝ่ายงาน</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900">
            ๘
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "social"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>๓. สื่อสังคมออนไลน์ & ดิจิทัล</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("inquiry")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "inquiry"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Send className="w-4 h-4" />
          <span>๔. ติดต่อสอบถามออนไลน์ & ตรวจสอบสถานะ (O5)</span>
        </button>
      </div>

      {/* Copy Notification Toast */}
      {copiedText && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-amber-400/40 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>คัดลอก {copiedText} เรียบร้อยแล้ว</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW & CAMPUS MAP */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Physical Address & Key Details */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>ที่ตั้งและข้อมูลทางการสถาบัน</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ศูนย์กลางการศึกษาพระบาลีและการปฏิบัติวิปัสสนากัมมัฏฐาน
                </p>
              </div>

              {/* Thai Address */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                <p className="text-xs font-semibold text-amber-900">ที่อยู่ภาษาไทย:</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {mainCollegeContact.address.fullAddressThai}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(mainCollegeContact.address.fullAddressThai, "ที่อยู่ภาษาไทย")}
                  className="text-[11px] text-amber-800 font-semibold hover:underline flex items-center gap-1 mt-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>คัดลอกที่อยู่ภาษาไทย</span>
                </button>
              </div>

              {/* English Address */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs font-semibold text-slate-900">Official English Address:</p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {mainCollegeContact.address.fullAddressEng}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(mainCollegeContact.address.fullAddressEng, "ที่อยู่ภาษาอังกฤษ")}
                  className="text-[11px] text-slate-700 font-semibold hover:underline flex items-center gap-1 mt-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy English Address</span>
                </button>
              </div>

              {/* GPS Coordinates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">พิกัดทางภูมิศาสตร์ (GPS):</span>
                  <span className="font-mono font-bold text-slate-800">
                    {mainCollegeContact.coordinates.lat}° N, {mainCollegeContact.coordinates.lng}° E
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        `${mainCollegeContact.coordinates.lat}, ${mainCollegeContact.coordinates.lng}`,
                        "พิกัด GPS"
                      )
                    }
                    className="flex-1 py-2 px-3 rounded-lg border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอกพิกัด</span>
                  </button>
                  <a
                    href={mainCollegeContact.coordinates.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>เปิดใน Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours Box */}
              <div className="pt-4 border-t border-slate-200 text-xs space-y-3">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">เวลาทำการฝ่ายบริหารและราชการ:</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">{mainCollegeContact.officeHours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">เวลาเปิดต้อนรับศรัทธาสาธุชน:</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">{mainCollegeContact.monasticVisitingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col (2 spans): Interactive Map & Transportation Guide */}
            <div className="lg:col-span-2 space-y-6">
              {/* Google Maps Embed / Visual Map Container */}
              <div className="bg-white rounded-2xl border border-amber-200/70 shadow-xs overflow-hidden">
                <div className="p-4 bg-amber-50/50 border-b border-amber-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-amber-950">
                      แผนที่ตั้งดาวเทียม วัดบาลีเถรวาทสังฆาราม (วส. มจร)
                    </span>
                  </div>
                  <a
                    href={mainCollegeContact.coordinates.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
                  >
                    <span>ขยายแผนที่เต็มจอ</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative w-full h-80 bg-slate-100 flex items-center justify-center">
                  <iframe
                    title="มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย แผนที่"
                    src={mainCollegeContact.coordinates.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  {/* Overlay Helper */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-amber-200 text-xs text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">วัดบาลีเถรวาทสังฆาราม ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม</span>
                  </div>
                </div>
              </div>

              {/* Transportation Instructions */}
              <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>คำแนะนำการเดินทางสู่วิทยาลัยสงฆ์</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-800">🚗 โดยรถยนต์ส่วนบุคคล</p>
                    <p className="text-slate-600 leading-relaxed">
                      จากกรุงเทพฯ ใช้ถนนบรมราชชนนี หรือถนนเพชรเกษม มุ่งหน้าสู่อำเภอกำแพงแสน เลี้ยวเข้าสู่ตำบลรางพิกุล วัดบาลีเถรวาทสังฆาราม ตั้งอยู่ติดถนนหลัก มีลานจอดรถส่วนกลางรองรับกว่า ๑๐๐ คัน
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-800">🚐 โดยรถตู้โดยสารสาธารณะ</p>
                    <p className="text-slate-600 leading-relaxed">
                      ขึ้นรถตู้ปรับอากาศ สายกรุงเทพฯ - กำแพงแสน จากสถานีขนส่งสายใต้ใหม่ หรือสถานีหมอชิต ๒ ลงที่แยกกำแพงแสน จากนั้นต่อรถรับจ้างหรือประสานงานรถส่วนกลางสถาบันเข้าสู่วิทยาลัย
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-800">🚆 โดยรถไฟ / ต่อรถท้องถิ่น</p>
                    <p className="text-slate-600 leading-relaxed">
                      นั่งรถไฟสายใต้ ลงที่สถานีนครปฐม (องค์พระปฐมเจดีย์) แล้วต่อรถประจำทางสายนครปฐม-กำแพงแสน หรือรถสองแถวประจำทางรางพิกุล
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Building & Landmarks Guide (Authentic 177 Rai & 11 Buildings) */}
          <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>ทำเนียบอาคารสถานที่และผังวิทยาเขต (เนื้อที่ {campusLandInfo.totalAreaRai})</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  สิ่งก่อสร้างอำนวยความสะดวก ๑๑ รายการ พื้นที่ใช้สอยรวม {campusLandInfo.totalUsableAreaSqM} ณ ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={campusLandInfo.documentPath}
                  download={campusLandInfo.documentFileName}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-300/80 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                  <span>ดาวน์โหลดเอกสารอาคาร (.docx)</span>
                </a>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                  ๑๑ อาคาร
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              {officialCampusBuildings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/25 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 leading-snug">
                        {b.id}. {b.nameThai}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 font-mono text-[10px] font-bold shrink-0">
                        {b.usableAreaSqM}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed mt-1.5">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>
                      {b.category === "ADMIN"
                        ? "ฝ่ายบริหาร/สำนักงาน"
                        : b.category === "ACADEMIC"
                        ? "ฝ่ายวิชาการ/ห้องเรียน"
                        : b.category === "MONASTIC"
                        ? "เขตสังฆาวาส/กุฏิ"
                        : b.category === "HEALTH"
                        ? "สุขภาวะ/พยาบาล"
                        : "บริการ/อุปัฏฐาก"}
                    </span>
                    <span className="text-emerald-700 font-medium">พร้อมใช้งาน</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
              <p>
                * แผนพัฒนาสิ่งก่อสร้างและภูมิทัศน์ได้รับการบรรจุในกรอบงบประมาณแผ่นดินและงบรายได้ มจร ปี ๒๕๖๙ (งบลงทุน ๒๔.๘๖ ลบ.)
              </p>
              <Link
                href="/vehicle-booking"
                className="text-amber-800 font-semibold hover:underline text-xs flex items-center gap-1 shrink-0"
              >
                <span>🚗 ระบบจองรถส่วนกลาง ๑๐ คัน</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENT DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาฝ่ายงาน, ชื่อผู้รับผิดชอบ, เบอร์ต่อ, หรือบริการ..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs text-slate-500 shrink-0 font-medium">กรองฝ่ายงาน:</span>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                aria-label="กรองฝ่ายงานราชวิทยาลัย"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-700"
              >
                <option value="ALL">ทุกฝ่ายงาน (๘ ฝ่ายงาน)</option>
                {officialDepartments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameThai}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                  dept.isEmergency24h
                    ? "border-amber-300 ring-1 ring-amber-300/50 bg-gradient-to-br from-white to-amber-50/30"
                    : "border-slate-200/80"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Dept Badge & Extension */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-[11px] font-bold">
                          {dept.deptCode}
                        </span>
                        {dept.isEmergency24h && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            <span>บริการ ๒๔ ชั่วโมง</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-1.5">
                        {dept.nameThai}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-sans">{dept.nameEng}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block">เบอร์ต่อภายใน</span>
                      <span className="text-lg font-extrabold text-amber-700 font-mono">
                        {dept.phoneExtension}
                      </span>
                    </div>
                  </div>

                  {/* Head of Dept & Location */}
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">ผู้รับผิดชอบ/หัวหน้างาน:</span>
                      <span className="font-semibold text-slate-800">{dept.headName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">ตำแหน่ง:</span>
                      <span className="text-amber-800 font-medium">{dept.headRole}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500">ที่ตั้ง:</span>
                      <span className="text-slate-700">
                        {dept.buildingLocation} ({dept.floor})
                      </span>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-slate-700">ขอบเขตงานบริการ:</p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {dept.services.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Contact Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px]">{dept.operatingHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${dept.officialEmail}`} className="text-[11px] hover:text-amber-700 text-slate-700">
                        {dept.officialEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {dept.directPhone && (
                      <a
                        href={`tel:${dept.directPhone.replace(/[^0-9]/g, "")}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-amber-200"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-700" />
                        <span>โทรตรง: {dept.directPhone}</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("inquiry");
                        setFormData((prev) => ({ ...prev, targetDepartment: dept.nameThai }));
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>ส่งข้อความ</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL & DIGITAL CHANNELS */}
      {activeTab === "social" && (
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
      )}

      {/* TAB 4: ONLINE INQUIRY & TRACKING (ITA O5) */}
      {activeTab === "inquiry" && (
        <div className="space-y-8">
          {/* Top Notice */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>ศูนย์รับข้อความติดต่อสอบถามออนไลน์และ Q&A (เกณฑ์ ITA O5)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ส่งคำถาม ติดต่อประสานงาน หรือขอรับข้อมูลราชการ ระบบจะออกรหัสติดตามตั๋ว (Ticket Code) ทันที
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PDPA Protected</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Inquiry Submission Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-bold text-sm text-slate-900">แบบฟอร์มส่งข้อความติดต่อราชการ</h4>
                <p className="text-xs text-slate-500">กรุณากรอกข้อมูลให้ครบถ้วน เจ้าหน้าที่จะติดต่อกลับภายใน ๑ วันทำการ</p>
              </div>

              {submitSuccessTicket && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>บันทึกข้อความติดต่อสำเร็จ! รหัสติดตามตั๋วของท่านคือ:</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 flex items-center justify-between">
                    <span className="font-mono font-extrabold text-base text-emerald-800">
                      {submitSuccessTicket.ticketCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(submitSuccessTicket.ticketCode, "รหัสติดตามตั๋ว")}
                      className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกรหัส</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    ท่านสามารถนำรหัสนี้ไปตรวจสอบสถานะการดำเนินงานของฝ่ายงานได้ที่ช่อง &ldquo;ตรวจสอบสถานะการติดต่อ&rdquo;
                  </p>
                </div>
              )}

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">ชื่อ-นามสกุล / ฉายาบาลี *</label>
                    <input
                      type="text"
                      required
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      placeholder="เช่น พระมหาสมชาย ญาณวโร หรือ คุณโยมสมศรี"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">เบอร์โทรศัพท์สำหรับติดต่อกลับ</label>
                    <input
                      type="tel"
                      value={formData.senderPhone}
                      onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                      placeholder="เช่น 081-234-5678"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">อีเมลทางการ / ส่วนบุคคล *</label>
                    <input
                      type="email"
                      required
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                      placeholder="เช่น contact@domain.com"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">ฝ่ายงานที่ประสงค์ติดต่อ *</label>
                    <select
                      value={formData.targetDepartment}
                      onChange={(e) => setFormData({ ...formData, targetDepartment: e.target.value })}
                      aria-label="เลือกฝ่ายงานที่ประสงค์ติดต่อ"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      {officialDepartments.map((d) => (
                        <option key={d.id} value={d.nameThai}>
                          {d.nameThai} (ต่อ {d.phoneExtension})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">เรื่องที่ต้องการติดต่อสอบถาม *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="เช่น สอบถามการเทียบโอนวิชาบาลี หรือ จองภัตตาหารเพลวันเกิด"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">รายละเอียดข้อความ *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="ระบุรายละเอียดข้อความ คำถาม หรือข้อมูลที่ต้องการให้เจ้าหน้าที่ฝ่ายงานประสานงานกลับ..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "กำลังส่งข้อความเข้าระบบ..." : "ส่งข้อความติดต่อราชการ"}</span>
                </button>
              </form>
            </div>

            {/* Right: Ticket Status Checker & Recent Inquiries (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tracker Box */}
              <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-600" />
                    <span>ตรวจสอบสถานะการติดต่อ (Ticket Tracking)</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    กรอกรหัสติดตาม เช่น <code>INQ-2569-012</code>
                  </p>
                </div>

                <form onSubmit={handleTrackTicket} className="flex gap-2">
                  <input
                    type="text"
                    value={trackCodeInput}
                    onChange={(e) => setTrackCodeInput(e.target.value)}
                    placeholder="รหัส เช่น INQ-2569-012"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={isTrackingLoading}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors disabled:opacity-50"
                  >
                    {isTrackingLoading ? "ค้นหา..." : "ตรวจสอบ"}
                  </button>
                </form>

                {trackingError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{trackingError}</span>
                  </div>
                )}

                {trackingResult && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 space-y-3 animate-in fade-in text-xs">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                      <span className="font-mono font-bold text-amber-900">{trackingResult.ticketCode}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          trackingResult.status === "RESPONDED"
                            ? "bg-emerald-100 text-emerald-800"
                            : trackingResult.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {trackingResult.status === "RESPONDED"
                          ? "✓ ตอบกลับแล้ว"
                          : trackingResult.status === "PROCESSING"
                          ? "⏳ กำลังดำเนินการ"
                          : "📥 รับเรื่องแล้ว"}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 py-1">
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">1</span>
                        <span>รับเรื่อง</span>
                      </div>
                      <div className={`h-0.5 flex-1 ${trackingResult.status !== "RECEIVED" ? "bg-amber-500" : "bg-slate-200"}`} />
                      <div className="flex flex-col items-center gap-1">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${trackingResult.status !== "RECEIVED" ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
                        <span>กำลังตรวจ</span>
                      </div>
                      <div className={`h-0.5 flex-1 ${trackingResult.status === "RESPONDED" ? "bg-emerald-500" : "bg-slate-200"}`} />
                      <div className="flex flex-col items-center gap-1">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${trackingResult.status === "RESPONDED" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>3</span>
                        <span>ตอบกลับ</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <p className="font-semibold text-slate-800">{trackingResult.subject}</p>
                      <p className="text-[11px] text-slate-600">
                        <strong>ผู้ส่ง:</strong> {trackingResult.senderName} ({trackingResult.targetDepartment})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        <strong>ยื่นเมื่อ:</strong> {trackingResult.submittedAt} น.
                      </p>
                    </div>

                    {trackingResult.responseNote && (
                      <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-[11px] text-slate-700">
                        <strong className="text-amber-900 block mb-0.5">การตอบกลับจากเจ้าหน้าที่:</strong>
                        <p>{trackingResult.responseNote}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sample Public Inquiries Table for Transparency */}
              <div className="bg-white p-6 rounded-2xl border border-amber-200/70 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-amber-600" />
                    <span>คำร้องสอบถามล่าสุดในระบบ ({allTickets.length})</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">ITA O5 Public Log</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {allTickets.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setTrackCodeInput(item.ticketCode);
                            setTrackingResult(item);
                          }}
                          className="font-mono text-[11px] font-bold text-amber-700 hover:underline"
                        >
                          {item.ticketCode}
                        </button>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                            item.status === "RESPONDED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.status === "RESPONDED" ? "ตอบแล้ว" : "กำลังตรวจ"}
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium truncate">{item.subject}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{item.targetDepartment}</span>
                        <span>{item.submittedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
