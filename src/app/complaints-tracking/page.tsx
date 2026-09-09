"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  QrCode,
  Search,
  PlusCircle,
  Clock,
  Printer,
  FileText,
  ExternalLink,
  ShieldCheck,
  Send,
  Building,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Mail,
  Car,
  Utensils,
  Share2,
  Sparkles,
  RefreshCw,
  Copy,
  Check
} from "lucide-react";
import {
  mockComplaints,
  mockUnifiedTrackedTasks,
  officialWebsiteNews,
  mcuDigitalServices,
  getComplaintsStatistics,
  ComplaintItem,
  UnifiedTrackedTask,
  ComplaintCategory,
  TrackedSystemType
} from "@/data/complaintsTrackingData";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { PrintableComplaintStandeeModal } from "@/components/PrintableComplaintStandeeModal";
import { PrintableTrackingSlipModal } from "@/components/PrintableTrackingSlipModal";

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

  // New Complaint Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [formCategory, setFormCategory] = useState<ComplaintCategory>("FACILITIES_VEHICLES");
  const [formTitle, setFormTitle] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formIsAnonymous, setFormIsAnonymous] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPriority, setFormPriority] = useState<"NORMAL" | "HIGH" | "URGENT">("NORMAL");
  const [submissionSuccessData, setSubmissionSuccessData] = useState<{
    trackingCode: string;
    submittedAt: string;
  } | null>(null);

  // Cross-System Tasks State & Filters
  const [tasksList] = useState<UnifiedTrackedTask[]>(mockUnifiedTrackedTasks);
  const [taskSearch, setTaskSearch] = useState("");
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>("ALL");
  const [copiedTaskCode, setCopiedTaskCode] = useState<string | null>(null);

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

  // Filtered Cross-System Tasks
  const filteredTasks = useMemo(() => {
    return tasksList.filter((task) => {
      const matchSearch =
        taskSearch.trim() === "" ||
        task.trackingCode.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.requesterName.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.departmentOrUnit.toLowerCase().includes(taskSearch.toLowerCase());

      const matchSystem =
        selectedSystemFilter === "ALL" || task.systemType === selectedSystemFilter;

      return matchSearch && matchSystem;
    });
  }, [tasksList, taskSearch, selectedSystemFilter]);

  // Filtered News
  const filteredNews = useMemo(() => {
    if (newsFilter === "ALL") return officialWebsiteNews;
    return officialWebsiteNews.filter((n) => n.category === newsFilter);
  }, [newsFilter]);

  // Handle New Complaint Submission
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDetails.trim() || !formLocation.trim()) {
      alert("กรุณากรอกข้อมูลสำคัญ (หัวข้อ, รายละเอียด, และสถานที่) ให้ครบถ้วน");
      return;
    }

    const newTrackingCode = `CMP-2569-00${complaintsList.length + 1}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}`;

    const categoryThaiMap: Record<ComplaintCategory, string> = {
      ACADEMIC: "การศึกษาและวิชาการ",
      MONASTIC_DISCIPLINE: "ระเบียบวินัยสงฆ์และสามเณร",
      SERVICE_STAFF: "การให้บริการและบุคลากร",
      FACILITIES_VEHICLES: "อาคารสถานที่และระบบเทคโนโลยี",
      TRANSPARENCY_ITA: "ความโปร่งใสและจัดซื้อจัดจ้าง (ITA)",
      GENERAL_SUGGESTION: "ข้อเสนอแนะทั่วไปและภูมิทัศน์",
    };

    const newComplaint: ComplaintItem = {
      id: `cmp-${Date.now()}`,
      trackingCode: newTrackingCode,
      title: formTitle,
      category: formCategory,
      categoryThai: categoryThaiMap[formCategory],
      details: formDetails,
      complainantName: formIsAnonymous ? "ไม่ประสงค์ระบุตัวตน (Anonymous)" : (formName || "ประชาชนทั่วไป"),
      isAnonymous: formIsAnonymous,
      contactPhone: formIsAnonymous ? undefined : formPhone,
      contactEmail: formIsAnonymous ? undefined : formEmail,
      locationArea: formLocation,
      status: "RECEIVED",
      priority: formPriority,
      submittedAt: formattedDate,
      assignedDepartment: "สำนักงานวิทยาลัย (ศูนย์รับเรื่องและสารบรรณกลาง)",
      officerInCharge: "เจ้าหน้าที่เวรรับเรื่องประจำวัน",
      evidenceAttachmentsCount: 0,
    };

    setComplaintsList([newComplaint, ...complaintsList]);
    setSubmissionSuccessData({
      trackingCode: newTrackingCode,
      submittedAt: formattedDate,
    });

    // Reset fields
    setFormTitle("");
    setFormDetails("");
    setFormLocation("");
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setShowSubmitModal(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTaskCode(code);
    setTimeout(() => setCopiedTaskCode(null), 2000);
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

  const getSystemIcon = (systemType: TrackedSystemType) => {
    switch (systemType) {
      case "VEHICLE_BOOKING":
        return <Car className="w-4 h-4 text-emerald-600" />;
      case "E_APPROVAL":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "MEETING_ROOM":
        return <Building className="w-4 h-4 text-purple-600" />;
      case "PROCUREMENT_PRJ":
        return <Building className="w-4 h-4 text-amber-600" />;
      case "ALMS_PATRON":
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case "COMPLAINT":
      default:
        return <ShieldCheck className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-8 space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* Header Banner: Sacred Royal Heritage & Institutional Presence */}
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ป้าย QR Code Standee A4</span>
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors"
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
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">เรื่องร้องเรียนทั้งหมด</p>
            <p className="text-xl font-bold text-slate-900">{complaintsList.length} <span className="text-xs font-normal text-slate-500">เรื่อง</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">แก้ไข/ยุติเรื่องแล้ว</p>
            <p className="text-xl font-bold text-emerald-700">{stats.resolvedCount} <span className="text-xs font-normal text-slate-500">เรื่อง (100%)</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ติดตามภารกิจข้ามระบบ</p>
            <p className="text-xl font-bold text-blue-700">{tasksList.length} <span className="text-xs font-normal text-slate-500">ภารกิจ</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ประกาศจัดซื้อ e-Bidding</p>
            <p className="text-xl font-bold text-purple-700">๒ <span className="text-xs font-normal text-slate-500">โครงการ (๒๗.๔ ลบ.)</span></p>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
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
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
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
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
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
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
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
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
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
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-50/80 p-6 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col items-center text-center">
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
                colorLight="#ffffff"
                title="MCU Pali e-Complaint"
                subtitle="palitheravada.mcu.ac.th"
                showCopy={true}
                showDownload={true}
              />

              <div className="mt-4 pt-3 border-t border-amber-200/80 w-full flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsStandeeModalOpen(true)}
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์ป้ายประชาสัมพันธ์ A4 (Standee)</span>
                </button>
              </div>
            </div>

            {/* Quick Submit or Guideline Banner */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-amber-600" />
                    <h3 className="text-lg font-bold text-slate-900">
                      แนวทางการรับฟังข้อร้องเรียนและข้อเสนอแนะ
                    </h3>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    คุ้มครองผู้แจ้งตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      ขอบเขตเรื่องที่รับดำเนินการ
                    </h4>
                    <ul className="space-y-1 list-disc list-inside text-slate-600">
                      <li>การบริหารการศึกษาและหลักสูตรบาลีศากยบุตร</li>
                      <li>อาคารสถานที่ หอพักกุฏิสงฆ์ ไฟฟ้า และระบบอินเทอร์เน็ต</li>
                      <li>การให้บริการของเจ้าหน้าที่และโภชนาการโรงครัว</li>
                      <li>ความโปร่งใสในการจัดซื้อจัดจ้างตามเกณฑ์ ITA</li>
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg shadow transition-colors shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>ยื่นเรื่องในระบบเดี๋ยวนี้</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submission Success Toast Card if Just Submitted */}
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
                  onClick={() => {
                    setActiveTab("TRACKER");
                    setTaskSearch(submissionSuccessData.trackingCode);
                  }}
                  type="button"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  ติดตามสถานะทันที
                </button>
                <button
                  onClick={() => setSubmissionSuccessData(null)}
                  type="button"
                  className="text-xs text-emerald-700 hover:underline px-2"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}

          {/* Complaints Table & Directory */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                            className="px-2.5 py-1 text-[11px] font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
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
        <div className="space-y-6">
          {/* Tracker Instructions & Search Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                  ระบบติดตามสถานะคำร้องและภารกิจราชการรวมศูนย์ (Unified Task Tracker)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  กรอกรหัสติดตามจากระบบใดก็ได้ในวิทยาลัย: เรื่องร้องเรียน (<code>CMP-</code>), ขอใช้รถ (<code>VB-</code>), สารบรรณ (<code>DOC-</code>), ห้องประชุม (<code>MTG-</code>), แผนงบประมาณ/e-Bidding (<code>PRJ-</code>), ภัตตาหารโยมอุปถัมภ์ (<code>ALM-</code>)
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "ทั้งหมด", val: "ALL" },
                  { label: "ร้องเรียน (CMP-)", val: "COMPLAINT" },
                  { label: "ขอใช้รถ (VB-)", val: "VEHICLE_BOOKING" },
                  { label: "สารบรรณ (DOC-)", val: "E_APPROVAL" },
                  { label: "ห้องประชุม (MTG-)", val: "MEETING_ROOM" },
                  { label: "โครงการจัดซื้อ (PRJ-)", val: "PROCUREMENT_PRJ" },
                  { label: "ภัตตาหาร (ALM-)", val: "ALMS_PATRON" },
                ].map((pill) => (
                  <button
                    key={pill.val}
                    onClick={() => setSelectedSystemFilter(pill.val)}
                    type="button"
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                      selectedSystemFilter === pill.val
                        ? "bg-amber-700 text-white font-semibold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="พิมพ์รหัสติดตามงาน เช่น VB-2569-001, CMP-2569-001, DOC-67-001, PRJ-69-SOLAR หรือชื่อผู้ยื่น..."
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-amber-300/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              />
            </div>
          </div>

          {/* Cross-System Tasks List */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
                ไม่พบภารกิจหรือคำร้องตามรหัสที่ระบุ
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-amber-400 transition-all space-y-4"
                >
                  {/* Top Bar of Task */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                        {getSystemIcon(task.systemType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                            {task.trackingCode}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {task.systemNameThai}
                          </span>
                        </div>
                        <h4 className="text-sm md:text-base font-bold text-slate-900 mt-0.5">
                          {task.title}
                        </h4>
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {task.statusThai} ({task.currentStep}/{task.totalSteps})
                      </span>
                      <button
                        onClick={() => setSelectedTaskForPrint(task)}
                        type="button"
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        <span>พิมพ์ใบติดตามงาน</span>
                      </button>
                      <Link
                        href={task.relatedUrl}
                        className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                        <span>เปิดโมดูล</span>
                      </Link>
                    </div>
                  </div>

                  {/* Task Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400">ผู้ยื่นเรื่อง/ผู้รับผิดชอบ:</span>
                      <p className="font-semibold text-slate-800">{task.requesterName}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">หน่วยงาน/ฝ่าย:</span>
                      <p className="font-semibold text-slate-800">{task.departmentOrUnit}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">วันที่ยื่นเรื่อง:</span>
                      <p className="font-mono text-slate-800">{task.submittedDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">กำหนดแล้วเสร็จ:</span>
                      <p className="font-mono text-slate-800">{task.targetCompletionDate}</p>
                    </div>
                  </div>

                  {/* Interactive Stepper Progress Bar */}
                  <div className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      {task.stepsHistory.map((step) => (
                        <div
                          key={step.stepNo}
                          className={`p-2.5 rounded-xl border text-xs transition-colors ${
                            step.isCompleted
                              ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                              : "bg-slate-50 border-slate-200 text-slate-500"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold flex items-center gap-1 text-[11px]">
                              {step.isCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                              )}
                              ขั้นตอนที่ {step.stepNo}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="font-semibold line-clamp-1">{step.stepTitle}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            โดย: {step.actionBy}
                          </p>
                          {step.note && (
                            <p className="text-[10px] text-amber-700 mt-1 italic line-clamp-1">
                              * {step.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QR Code Quick Copy Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-amber-600" />
                      ลิงก์ติดตามงานทางมือถือ:{" "}
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                        palitheravada.mcu.ac.th/complaints-tracking?code={task.trackingCode}
                      </code>
                    </span>
                    <button
                      onClick={() => handleCopyCode(task.trackingCode)}
                      type="button"
                      className="flex items-center gap-1 text-amber-700 hover:text-amber-900 font-medium"
                    >
                      {copiedTaskCode === task.trackingCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">คัดลอกรหัสแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>คัดลอกรหัส</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
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
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
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
      {activeTab === "GATEWAY" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-600" />
              ประตูบริการดิจิทัลส่วนกลาง มจร & เกณฑ์ธรรมาภิบาล ITA
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              เชื่อมโยงระบบสารสนเทศระดับมหาวิทยาลัย เพื่อการบริหารจัดการที่มีประสิทธิภาพ โปร่งใส และตรวจสอบได้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mcuDigitalServices.map((svc) => (
              <div
                key={svc.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {svc.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{svc.nameThai}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{svc.nameEng}</p>
                  <p className="text-xs text-slate-600 mt-2">{svc.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <span>เข้าสู่ระบบบริการ มจร</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Contact & ITA Transparency Box */}
          <div className="bg-gradient-to-r from-amber-50 to-slate-50 p-6 rounded-2xl border border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
                </h4>
                <p className="text-slate-600">
                  Mahavajiralongkorn Pali Theravada College (วส. มจร)
                </p>
                <p className="text-slate-500 mt-1">
                  เลขที่ ๒๓๔ ถนนเพชรเกษม ตำบลรางพิกุล อำเภอกำแพงแสน จังหวัดนครปฐม ๗๓๑๔๐
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">ช่องทางติดต่อทางการ</h4>
                <p className="text-slate-700">
                  <strong>ผู้อำนวยการวิทยาลัย:</strong> พระธรรมวชิราจารย์ รศ.ดร.
                </p>
                <p className="text-slate-700 mt-1">
                  <strong>สายด่วนรับเรื่อง:</strong> ๐๙๒-๖๙๔๘๘๘๓
                </p>
                <p className="text-slate-700 mt-0.5">
                  <strong>เบอร์สำนักงาน:</strong> ๐๙๙-๔๔๕-๔๒๕๖
                </p>
                <p className="text-slate-700 mt-0.5">
                  <strong>อีเมล:</strong> info@palitheravada.mcu.ac.th
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">มาตรฐานธรรมาภิบาล ITA</h4>
                <p className="text-slate-600">
                  มุ่งเน้นการเปิดเผยข้อมูลสาธารณะ (Open Data Integrity) และการป้องกันผลประโยชน์ทับซ้อน เพื่อสร้างความเชื่อมั่นต่อศรัทธาสาธุชนและคณะสงฆ์
                </p>
                <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px] border border-emerald-300">
                  เกณฑ์ประเมิน ITA: ระดับยอดเยี่ยม (AA)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Modal: New Complaint Submission Form */}
      {/* ------------------------------------------------------------- */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">
                  แบบฟอร์มยื่นเรื่องร้องเรียน & ข้อเสนอแนะออนไลน์
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                type="button"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitComplaint} className="p-6 space-y-4 text-xs">
              {/* Category & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    หมวดหมู่เรื่องร้องเรียน <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ComplaintCategory)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="FACILITIES_VEHICLES">อาคารสถานที่และระบบเทคโนโลยี</option>
                    <option value="ACADEMIC">การศึกษาและวิชาการ</option>
                    <option value="MONASTIC_DISCIPLINE">ระเบียบวินัยสงฆ์และสามเณร</option>
                    <option value="SERVICE_STAFF">การให้บริการและบุคลากร</option>
                    <option value="TRANSPARENCY_ITA">ความโปร่งใสและจัดซื้อจัดจ้าง (ITA)</option>
                    <option value="GENERAL_SUGGESTION">ข้อเสนอแนะทั่วไปและภูมิทัศน์</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ระดับความเร่งด่วน
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as "NORMAL" | "HIGH" | "URGENT")}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="NORMAL">ปกติ (Normal)</option>
                    <option value="HIGH">สำคัญ (High)</option>
                    <option value="URGENT">ด่วนที่สุด (Urgent)</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  หัวข้อเรื่องร้องเรียน / ข้อเสนอแนะ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ระบุประเด็นสำคัญ เช่น ปรับปรุงสัญญาณ Wi-Fi กุฏิโซน C"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  สถานที่หรือจุดที่พบปัญหา / อาคาร <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น หอฉันศากยบุตร, อาคารเรียน A 2, กุฏิสงฆ์โซน C"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Details */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  รายละเอียดเหตุการณ์ / ข้อเสนอแนะ <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="อธิบายรายละเอียดข้อเท็จจริง วันเวลา และข้อเสนอแนะที่ต้องการให้ดำเนินการ..."
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-amber-950">
                  <input
                    type="checkbox"
                    checked={formIsAnonymous}
                    onChange={(e) => setFormIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>ไม่ประสงค์ระบุตัวตน (Anonymous Submission)</span>
                </label>
                <p className="text-[11px] text-amber-800 mt-1 pl-6">
                  เมื่อเลือกช่องนี้ ข้อมูลชื่อ เบอร์โทร และอีเมลของท่านจะไม่ถูกจัดเก็บในระบบเพื่อความปลอดภัยสูงสุด
                </p>
              </div>

              {/* Contact Info (if not anonymous) */}
              {!formIsAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      ชื่อ-นามสกุล หรือฉายา
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น พระมหา... หรือ นาย..."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      เบอร์โทรศัพท์ติดต่อ
                    </label>
                    <input
                      type="text"
                      placeholder="08X-XXX-XXXX"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      อีเมล (สำหรับรับผลการแก้ไข)
                    </label>
                    <input
                      type="email"
                      placeholder="example@mcu.ac.th"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  type="button"
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งเรื่องร้องเรียน & รับรหัสติดตาม</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Modal: Complaint Detail & Resolution Note */}
      {/* ------------------------------------------------------------- */}
      {selectedComplaintDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">รายละเอียดและผลการดำเนินการแก้ไข</h3>
              </div>
              <button
                onClick={() => setSelectedComplaintDetail(null)}
                type="button"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                  {selectedComplaintDetail.trackingCode}
                </span>
                {getStatusBadge(selectedComplaintDetail.status)}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {selectedComplaintDetail.title}
                </h4>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {selectedComplaintDetail.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">หมวดหมู่:</span>
                  <p className="font-semibold text-slate-800">{selectedComplaintDetail.categoryThai}</p>
                </div>
                <div>
                  <span className="text-slate-400">สถานที่:</span>
                  <p className="font-semibold text-slate-800">{selectedComplaintDetail.locationArea}</p>
                </div>
                <div>
                  <span className="text-slate-400">ผู้ร้องเรียน:</span>
                  <p className="font-semibold text-slate-800">
                    {selectedComplaintDetail.isAnonymous
                      ? "ไม่ประสงค์ระบุตัวตน (Anonymous)"
                      : selectedComplaintDetail.complainantName}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">วันเวลาที่ยื่นเรื่อง:</span>
                  <p className="font-mono text-slate-800">{selectedComplaintDetail.submittedAt}</p>
                </div>
              </div>

              {/* Resolution Note Section */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 space-y-2">
                <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  บันทึกผลการดำเนินการแก้ไข
                </h5>
                <p className="text-slate-700 leading-relaxed">
                  {selectedComplaintDetail.resolutionNote || "อยู่ระหว่างการลงพื้นที่ตรวจสอบข้อเท็จจริง"}
                </p>
                <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 text-[11px] text-slate-500">
                  <div>
                    <span>หน่วยงานรับผิดชอบ:</span>
                    <p className="font-medium text-slate-800">{selectedComplaintDetail.assignedDepartment}</p>
                  </div>
                  <div>
                    <span>เจ้าหน้าที่ผู้รับผิดชอบ:</span>
                    <p className="font-medium text-slate-800">{selectedComplaintDetail.officerInCharge}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setSelectedComplaintDetail(null)}
                  type="button"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Printable Modals */}
      {/* ------------------------------------------------------------- */}
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
