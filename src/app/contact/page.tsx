"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  HeartPulse,
  Share2,
  Send,
  Building,
  Layers,
} from "lucide-react";
import DocumentViewerModal from "@/components/DocumentViewerModal";
import CampusMapCard from "@/components/contact/CampusMapCard";
import ContactDirectoryTable from "@/components/contact/ContactDirectoryTable";
import SocialChannelsGrid from "@/components/contact/SocialChannelsGrid";
import InquiryFormCard from "@/components/contact/InquiryFormCard";
import TicketStatusTracker from "@/components/contact/TicketStatusTracker";
import {
  mainCollegeContact,
  mockInquiryTickets,
  campusLandInfo,
  InquiryTicket,
} from "@/data/contactDirectoryData";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "directory" | "social" | "inquiry">("overview");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [targetDepartmentForInquiry, setTargetDepartmentForInquiry] = useState("สำนักงานผู้อำนวยการราชวิทยาลัย");
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

  const handleSelectDepartmentForInquiry = (deptName: string) => {
    setTargetDepartmentForInquiry(deptName);
    setActiveTab("inquiry");
  };

  const handleTicketCreated = (ticket: InquiryTicket) => {
    setAllTickets((prev) => [ticket, ...prev]);
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
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/30 backdrop-blur flex items-center gap-2 transition-all cursor-pointer"
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
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>๑. ข้อมูลที่ตั้ง & แผนผังวิทยาเขต (๑๗๗ ไร่)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "directory"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>๒. ทำเนียบหมายเลขภายใน ๘ ฝ่ายงาน</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "social"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>๓. สื่อสังคมออนไลน์ & ดิจิทัล</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("inquiry")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === "inquiry"
              ? "bg-amber-600 text-white shadow-xs"
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
        <CampusMapCard
          onCopy={handleCopy}
          onOpenDocViewer={() => setIsDocViewerOpen(true)}
        />
      )}

      {/* TAB 2: DEPARTMENT DIRECTORY */}
      {activeTab === "directory" && (
        <ContactDirectoryTable
          onSelectDepartmentForInquiry={handleSelectDepartmentForInquiry}
        />
      )}

      {/* TAB 3: SOCIAL & DIGITAL CHANNELS */}
      {activeTab === "social" && <SocialChannelsGrid />}

      {/* TAB 4: ONLINE INQUIRY & TRACKING (ITA O5) */}
      {activeTab === "inquiry" && (
        <div className="space-y-8">
          {/* Top Notice */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-600" />
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
            <div className="lg:col-span-7">
              <InquiryFormCard
                initialDepartment={targetDepartmentForInquiry}
                onTicketCreated={handleTicketCreated}
                onCopy={handleCopy}
              />
            </div>
            <div className="lg:col-span-5">
              <TicketStatusTracker allTickets={allTickets} />
            </div>
          </div>
        </div>
      )}

      {/* Official Building Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={isDocViewerOpen}
        onClose={() => setIsDocViewerOpen(false)}
        fileIdentifier="อาคารสถานที่มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย.docx"
        initialTitle="ข้อมูลอาคารสถานที่และผังวิทยาเขต มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (๑๗๗ ไร่เศษ)"
        initialFormat="DOCX"
        downloadUrl={campusLandInfo.documentPath}
      />
    </div>
  );
}
