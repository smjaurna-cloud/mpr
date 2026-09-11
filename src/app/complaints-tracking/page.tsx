"use client";

import React, { useState, useMemo } from "react";
import {
  QrCode,
  Search,
  PlusCircle,
  Clock,
  Printer,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Mail,
  Share2,
  Sparkles,
  RefreshCw,
  Building,
  Check,
} from "lucide-react";
import {
  mockComplaints,
  mockUnifiedTrackedTasks,
  officialWebsiteNews,
  getComplaintsStatistics,
  ComplaintItem,
  UnifiedTrackedTask,
} from "@/data/complaintsTrackingData";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { PrintableComplaintStandeeModal } from "@/components/PrintableComplaintStandeeModal";
import { PrintableTrackingSlipModal } from "@/components/PrintableTrackingSlipModal";
import UnifiedTaskTrackerTable from "@/components/complaints/UnifiedTaskTrackerTable";
import DigitalServicesGateway from "@/components/complaints/DigitalServicesGateway";
import ComplaintSubmissionModal from "@/components/complaints/ComplaintSubmissionModal";
import ComplaintDetailModal from "@/components/complaints/ComplaintDetailModal";

export default function ComplaintsTrackingPage() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"COMPLAINTS" | "TRACKER" | "NEWS" | "GATEWAY">("COMPLAINTS");

  // Standee Printable Modal State
  const [isStandeeModalOpen, setIsStandeeModalOpen] = useState(false);

  // Tracking Slip Printable Modal State
  const [selectedTaskForPrint, setSelectedTaskForPrint] = useState<UnifiedTrackedTask | null>(null);

  // Detailed View Modal for Complaint
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState<ComplaintItem | null>(null);

  // Complaints State & Filters
  const [complaintsList, setComplaintsList] = useState<ComplaintItem[]>(mockComplaints);
  const [complaintSearch, setComplaintSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");

  // New Complaint Submission Modal State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionSuccessData, setSubmissionSuccessData] = useState<{
    trackingCode: string;
    submittedAt: string;
  } | null>(null);

  // Cross-System Tasks State
  const [tasksList] = useState<UnifiedTrackedTask[]>(mockUnifiedTrackedTasks);

  // News State & Category Filter
  const [newsFilter, setNewsFilter] = useState<string>("ALL");

  // Statistics Calculation
  const stats = useMemo(() => getComplaintsStatistics(), []);

  // Filtered Complaints
  const filteredComplaints = useMemo(() => {
    return complaintsList.filter((item) => {
      const matchSearch =
        complaintSearch.trim() === "" ||
        item.title.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        item.trackingCode.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        item.complainantName.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        item.locationArea.toLowerCase().includes(complaintSearch.toLowerCase());

      const matchCategory =
        selectedCategoryFilter === "ALL" || item.category === selectedCategoryFilter;

      const matchStatus =
        selectedStatusFilter === "ALL" || item.status === selectedStatusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [complaintsList, complaintSearch, selectedCategoryFilter, selectedStatusFilter]);

  // Filtered News
  const filteredNews = useMemo(() => {
    if (newsFilter === "ALL") return officialWebsiteNews;
    return officialWebsiteNews.filter((n) => n.category === newsFilter);
  }, [newsFilter]);

  const handleComplaintCreated = (newComplaint: ComplaintItem) => {
    setComplaintsList((prev) => [newComplaint, ...prev]);
    setSubmissionSuccessData({
      trackingCode: newComplaint.trackingCode,
      submittedAt: newComplaint.submittedAt,
    });
  };

  const getStatusBadge = (status: ComplaintItem["status"]) => {
    switch (status) {
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> ยุติเรื่อง/แจ้งผลแล้ว
          </span>
        );
      case "ACTION_TAKEN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Check className="w-3 h-3" /> ดำเนินการแก้ไขแล้ว
          </span>
        );
      case "INVESTIGATING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 animate-spin" /> อยู่ระหว่างตรวจสอบ
          </span>
        );
      case "RECEIVED":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            <Clock className="w-3 h-3" /> รับเรื่องแล้ว
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-8 space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* Header Banner */}
      {/* ------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 md:p-8 shadow-xl border border-amber-500/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOD-17: ธรรมาภิบาล & การมีส่วนร่วม ITA ๒๕๖๙</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <QrCode className="w-8 h-8 text-amber-400" />
              ศูนย์รับเรื่องร้องเรียน QR Code & ติดตามงานทุกระบบ
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl">
              MCU Pali e-Complaint Center & Unified Cross-System Task Tracking Hub •
              มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) สอดคล้องตามมาตรฐานเว็บไซต์ทางการ{" "}
              <a
                href="https://palitheravada.mcu.ac.th"
                target="_blank"
                rel="noreferrer"
                className="text-amber-300 underline hover:text-amber-200"
              >
                palitheravada.mcu.ac.th
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> สายด่วนร้องเรียน: 092-6948883
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> สำนักงาน: 099-445-4256
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> info@palitheravada.mcu.ac.th
              </span>
            </div>
          </div>

          {/* Standee Print Quick Trigger */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setIsStandeeModalOpen(true)}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ป้าย QR Code Standee A4</span>
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>ยื่นเรื่องร้องเรียน/เสนอแนะใหม่</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Quick Metrics Cards */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">เรื่องร้องเรียนทั้งหมด</p>
            <p className="text-xl font-bold text-slate-900">{complaintsList.length} <span className="text-xs font-normal text-slate-500">เรื่อง</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">แก้ไข/ยุติเรื่องแล้ว</p>
            <p className="text-xl font-bold text-emerald-700">{stats.resolvedCount} <span className="text-xs font-normal text-slate-500">เรื่อง (100%)</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ติดตามภารกิจข้ามระบบ</p>
            <p className="text-xl font-bold text-blue-700">{tasksList.length} <span className="text-xs font-normal text-slate-500">ภารกิจ</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ประกาศจัดซื้อ e-Bidding</p>
            <p className="text-xl font-bold text-purple-700">๒ <span className="text-xs font-normal text-slate-500">โครงการ (๒๗.๔ ลบ.)</span></p>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ความโปร่งใส ITA</p>
            <p className="text-xl font-bold text-rose-700">ผ่านเกณฑ์ <span className="text-xs font-normal text-slate-500">AA (98.5)</span></p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Tab Navigation Controls */}
      {/* ------------------------------------------------------------- */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-sm font-medium">
        <button
          onClick={() => setActiveTab("COMPLAINTS")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "COMPLAINTS"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>๑. ช่องทางร้องเรียน & QR Code (e-Complaint)</span>
        </button>

        <button
          onClick={() => setActiveTab("TRACKER")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "TRACKER"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>๒. ติดตามสถานะคำร้องรวมศูนย์ทุกระบบ (Unified Tracker)</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-800 rounded-full font-mono">
            {tasksList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("NEWS")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "NEWS"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>๓. ข่าวสาร & ประกาศ e-Bidding ทางการ</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full font-mono">
            {officialWebsiteNews.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("GATEWAY")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "GATEWAY"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>๔. ประตูบริการดิจิทัล มจร & ธรรมาภิบาล ITA</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: E-COMPLAINT & QR CODE HUB */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "COMPLAINTS" && (
        <div className="space-y-6">
          {/* Top Banner: QR Code Box + Quick Notice */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Direct Institutional QR Code Card */}
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-50/80 p-6 rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full mb-3">
                <QrCode className="w-3.5 h-3.5 text-amber-700" />
                <span>QR Code ทางการสำหรับประชาชน & ศากยบุตร</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                สแกนยื่นเรื่องผ่านสมาร์ทโฟน
              </h3>
              <p className="text-xs text-slate-600 mb-4 max-w-xs">
                ใช้งานง่ายผ่านกล้องมือถือทุกรุ่น รองรับการร้องเรียนแบบไม่ระบุตัวตน 100%
              </p>

              <QRCodeDisplay
                value="https://palitheravada.mcu.ac.th/complaints-tracking"
                size={180}
                colorDark="#78350f"
                title="MCU Pali e-Complaint QR Code"
              />

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setIsStandeeModalOpen(true)}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์ Standee A4 ติดบอร์ด</span>
                </button>
              </div>
            </div>

            {/* Overview & Security Policy Guide */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  หลักเกณฑ์และช่องทางการรับเรื่องร้องเรียน (ITA เกณฑ์ O4/O5)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ศูนย์รับเรื่องร้องเรียน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) จัดตั้งขึ้นเพื่อรับฟังความคิดเห็น
                  ข้อเสนอแนะ และข้อร้องเรียนจากศรัทธาสาธุชน คณาจารย์ เจ้าหน้าที่ พระภิกษุ และสามเณร
                  โดยมุ่งเน้นการคุ้มครองสิทธิและความเป็นส่วนตัวตามพระวินัยและ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-600" />
                      ขอบเขตเรื่องที่รับดำเนินการ
                    </h4>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      <li>การบริหารงานและบริการของบุคลากร/เจ้าหน้าที่</li>
                      <li>อาคารสถานที่ ยานพาหนะ และระบบเทคโนโลยี</li>
                      <li>ความโปร่งใสและการจัดซื้อจัดจ้าง e-Bidding</li>
                      <li>การคุ้มครองระเบียบวินัยและสุขอนามัยของสามเณร</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      การคุ้มครองสิทธิและความปลอดภัย
                    </h4>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      <li>สามารถเลือก <strong>&quot;ไม่ประสงค์ระบุตัวตน (Anonymous)&quot;</strong> ได้</li>
                      <li>ห้ามเปิดเผยข้อมูลประวัติส่วนตัวของสามเณรผู้เยาว์สู่สาธารณะ</li>
                      <li>รับรหัสติดตามงาน (CMP-) เพื่อเช็กผลการแก้ไขได้ตลอด 24 ชม.</li>
                      <li>เจ้าหน้าที่ดำเนินการตรวจสอบข้อเท็จจริงภายใน ๒๔-๔๘ ชั่วโมง</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200 mt-2">
                <div className="text-xs text-amber-950">
                  <p className="font-bold">ต้องการยื่นข้อเสนอแนะหรือร้องเรียนทันที?</p>
                  <p className="text-amber-800">ระบบจะสร้างรหัสติดตาม (Tracking Code) ให้ทันทีหลังส่งข้อมูล</p>
                </div>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>ยื่นเรื่องในระบบเดี๋ยวนี้</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submission Success Toast Card */}
          {submissionSuccessData && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl shadow-md flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    ยื่นเรื่องร้องเรียนสำเร็จ! ได้รับรหัสติดตามภารกิจ:
                  </h4>
                  <p className="text-xs text-emerald-800">
                    รหัสของคุณคือ{" "}
                    <strong className="font-mono bg-emerald-200 px-2 py-0.5 rounded text-emerald-950">
                      {submissionSuccessData.trackingCode}
                    </strong>{" "}
                    ยื่นเมื่อเวลา {submissionSuccessData.submittedAt} (สามารถติดตามผลได้ในแท็บที่ ๒)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("TRACKER")}
                  type="button"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ติดตามสถานะทันที
                </button>
                <button
                  onClick={() => setSubmissionSuccessData(null)}
                  type="button"
                  className="text-xs text-emerald-700 hover:underline px-2 cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}

          {/* Complaints Table & Directory */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหาด้วยรหัส CMP-, หัวข้อ, สถานที่, หรือผู้ยื่น..."
                  value={complaintSearch}
                  onChange={(e) => setComplaintSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="ALL">ทุกหมวดหมู่ (All Categories)</option>
                  <option value="FACILITIES_VEHICLES">อาคารสถานที่และยานพาหนะ</option>
                  <option value="ACADEMIC">การศึกษาและวิชาการ</option>
                  <option value="MONASTIC_DISCIPLINE">ระเบียบวินัยสงฆ์และสามเณร</option>
                  <option value="SERVICE_STAFF">การให้บริการและบุคลากร</option>
                  <option value="TRANSPARENCY_ITA">ความโปร่งใส ITA</option>
                  <option value="GENERAL_SUGGESTION">ข้อเสนอแนะทั่วไป</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="ALL">ทุกสถานะ (All Status)</option>
                  <option value="RECEIVED">รับเรื่องแล้ว</option>
                  <option value="INVESTIGATING">อยู่ระหว่างตรวจสอบ</option>
                  <option value="ACTION_TAKEN">ดำเนินการแก้ไขแล้ว</option>
                  <option value="RESOLVED">ยุติเรื่องและแจ้งผล</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">รหัสติดตาม</th>
                    <th className="p-3">หัวข้อเรื่องร้องเรียน / ข้อเสนอแนะ</th>
                    <th className="p-3">หมวดหมู่</th>
                    <th className="p-3">ผู้ร้องเรียน</th>
                    <th className="p-3">สถานที่เกิดเหตุ</th>
                    <th className="p-3">วันเวลาที่ยื่น</th>
                    <th className="p-3 text-center">สถานะ</th>
                    <th className="p-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        ไม่พบข้อมูลเรื่องร้องเรียนตามเงื่อนไขที่ค้นหา
                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-800">
                          {item.trackingCode}
                        </td>
                        <td className="p-3 font-medium text-slate-900 max-w-xs">
                          <p className="line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.details}
                          </p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                            {item.categoryThai}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700">
                          {item.isAnonymous ? (
                            <span className="text-slate-500 italic">ไม่ประสงค์ออกนาม</span>
                          ) : (
                            item.complainantName
                          )}
                        </td>
                        <td className="p-3 text-slate-600 line-clamp-1">
                          {item.locationArea}
                        </td>
                        <td className="p-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                          {item.submittedAt}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedComplaintDetail(item)}
                            type="button"
                            className="px-2.5 py-1 text-[11px] font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors cursor-pointer"
                          >
                            ดูผลการแก้ไข
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: UNIFIED CROSS-SYSTEM TASK TRACKER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "TRACKER" && (
        <UnifiedTaskTrackerTable
          tasks={tasksList}
          onSelectTaskForPrint={setSelectedTaskForPrint}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: OFFICIAL ANNOUNCEMENTS & E-BIDDING */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "NEWS" && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                ข่าวสารและประกาศทางการ (Official Announcements & e-Bidding)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                บูรณาการข้อมูลล่าสุดจากเว็บไซต์มหาวิทยาลัย{" "}
                <a
                  href="https://palitheravada.mcu.ac.th"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-700 underline font-medium"
                >
                  palitheravada.mcu.ac.th
                </a>
              </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "ทั้งหมด", val: "ALL" },
                { label: "จัดซื้อจัดจ้าง e-Bidding", val: "E_BIDDING" },
                { label: "วิชาการ & ทุน", val: "ACADEMIC_NEWS" },
                { label: "งานพิธีสงฆ์", val: "BUDDHIST_EVENT" },
                { label: "โครงการพระราชูปถัมภ์", val: "ROYAL_PROJECT" },
              ].map((filter) => (
                <button
                  key={filter.val}
                  onClick={() => setNewsFilter(filter.val)}
                  type="button"
                  className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
                    newsFilter === filter.val
                      ? "bg-amber-700 text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        item.category === "E_BIDDING"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : item.category === "ROYAL_PROJECT"
                          ? "bg-purple-100 text-purple-900 border-purple-300"
                          : "bg-blue-100 text-blue-900 border-blue-300"
                      }`}
                    >
                      {item.categoryThai}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.publishedDate}
                    </span>
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  {item.englishTitle && (
                    <p className="text-xs text-slate-500 mt-1 italic line-clamp-1">
                      {item.englishTitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    ฝ่าย: {item.department}
                  </span>
                  <a
                    href={item.fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
                  >
                    <span>อ่านประกาศฉบับเต็ม</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: MCU DIGITAL SERVICES & ITA GATEWAY */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "GATEWAY" && <DigitalServicesGateway />}

      {/* ------------------------------------------------------------- */}
      {/* Modals */}
      {/* ------------------------------------------------------------- */}
      <ComplaintSubmissionModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onComplaintCreated={handleComplaintCreated}
      />

      <ComplaintDetailModal
        complaint={selectedComplaintDetail}
        onClose={() => setSelectedComplaintDetail(null)}
        renderStatusBadge={getStatusBadge}
      />

      <PrintableComplaintStandeeModal
        isOpen={isStandeeModalOpen}
        onClose={() => setIsStandeeModalOpen(false)}
        qrUrl="https://palitheravada.mcu.ac.th/complaints-tracking"
      />

      <PrintableTrackingSlipModal
        isOpen={Boolean(selectedTaskForPrint)}
        onClose={() => setSelectedTaskForPrint(null)}
        task={selectedTaskForPrint}
      />
    </div>
  );
}
