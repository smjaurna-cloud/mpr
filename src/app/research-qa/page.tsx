"use client";

import React, { useState } from "react";
import { 
  Microscope, 
  Award, 
  Search, 
  Plus, 
  CheckCircle2, 
  FileText, 
  BarChart, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  BookOpenCheck,
  BookOpen,
  Globe,
  Filter,
  GraduationCap,
  Copy,
  Layers,
  ArrowUpRight,
  BookmarkCheck,
  Building2,
  Users
} from "lucide-react";
import { mockResearchProjects, mockQAMetrics, ResearchProject, QAMetric } from "@/data/mockData";
import { 
  facultyPublications, 
  facultyPublicationStats, 
  FacultyPublication 
} from "@/data/facultyPublicationsData";
import { formatThaiCurrency } from "@/lib/utils";

export default function ResearchQAPage() {
  const [researchList, setResearchList] = useState<ResearchProject[]>(mockResearchProjects);
  const [qaMetrics, setQaMetrics] = useState<QAMetric[]>(mockQAMetrics);
  const [activeTab, setActiveTab] = useState<"publications" | "research" | "qa" | "mou">("publications");
  const [notification, setNotification] = useState<string | null>(null);

  // Publications Filter & Search State
  const [searchPubQuery, setSearchPubQuery] = useState("");
  const [selectedPersonnel, setSelectedPersonnel] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Personnel filter list
  const personnelList = [
    { label: "บุคลากรทั้งหมด", value: "all" },
    { label: "ดร.สมบูรณ์ จารุณะ", value: "สมบูรณ์" },
    { label: "พระธรรมวชิราจารย์, รศ.ดร.", value: "พระธรรมวชิราจารย์" },
    { label: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.", value: "พระมหาศุภวัฒน์" },
    { label: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ", value: "ธนสิทธิ์" },
    { label: "พระมหาเสฏฐวุฒิ วชิรญาโณ, ดร.", value: "เสฏฐวุฒิ" },
    { label: "รศ.ดร.เวทย์ บรรณกรกุล", value: "เวทย์" },
    { label: "พระมหาทรงชัย วิชยเภรี, ดร.", value: "ทรงชัย" },
  ];

  // Filtered publications
  const filteredPublications = facultyPublications.filter((pub) => {
    if (selectedPersonnel !== "all" && !pub.facultyPersonnel.includes(selectedPersonnel)) {
      return false;
    }
    if (selectedTier !== "all" && pub.journalTier !== selectedTier) {
      return false;
    }
    if (selectedType !== "all" && !pub.articleType.includes(selectedType)) {
      return false;
    }
    if (searchPubQuery.trim()) {
      const q = searchPubQuery.toLowerCase();
      const matchTitle = pub.title.toLowerCase().includes(q) || (pub.titleEn && pub.titleEn.toLowerCase().includes(q));
      const matchJournal = pub.journal.toLowerCase().includes(q);
      const matchAuthor = pub.authors.some(a => a.toLowerCase().includes(q));
      const matchPersonnel = pub.facultyPersonnel.toLowerCase().includes(q);
      const matchKeyword = pub.keywords.some(k => k.toLowerCase().includes(q));
      if (!matchTitle && !matchJournal && !matchAuthor && !matchPersonnel && !matchKeyword) {
        return false;
      }
    }
    return true;
  });

  const handleCopyCitation = (pub: FacultyPublication) => {
    const citation = `${pub.authors.join(", ")}. (${pub.yearBE}). “${pub.title}”. ${pub.journal}. ${pub.volume}(${pub.issue}): ${pub.pages || ""}. ${pub.externalUrl}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setNotification(`คัดลอกรายการอ้างอิงของ ${pub.facultyPersonnel} เรียบร้อยแล้ว`);
    setTimeout(() => {
      setCopiedId(null);
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-purple-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full w-fit">
            <Microscope className="w-4 h-4 text-purple-600" />
            <span>กลุ่มงานวิจัยและคุณภาพการศึกษา (สำนักวิชาการ)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบงานวิจัยพุทธศาสตร์ วารสารวิชาการ & ประกันคุณภาพ (QA / EdPEx)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            คลังบทความวิจัยระดับสากลและ TCI-ThaiJO ของคณาจารย์ โครงการวิจัยคัมภีร์บาลี ตัวชี้วัด AUN-QA / EdPEx และข้อตกลง MOU พุทธปัญญาประดิษฐ์
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.tci-thaijo.org/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold transition-all"
          >
            <Globe className="w-4 h-4 text-purple-600" />
            <span>ฐานข้อมูล TCI-ThaiJO</span>
            <ExternalLink className="w-3 h-3 text-purple-500" />
          </a>

          <button
            type="button"
            onClick={() => {
              setNotification("ระบบเปิดแบบฟอร์มขอรับทุนอุดหนุนการวิจัยทางพระพุทธศาสนาประจำปี");
              setTimeout(() => setNotification(null), 4000);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-700/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>เสนอโครงการวิจัยใหม่</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("publications")}
          className={`pb-3 px-3 transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "publications"
              ? "border-purple-600 text-purple-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>บทความวิชาการ & วิจัยระดับสากล / TCI-ThaiJO</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-bold">
            {facultyPublications.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("research")}
          className={`pb-3 px-3 transition-all border-b-2 whitespace-nowrap ${
            activeTab === "research"
              ? "border-purple-600 text-purple-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          คลังผลงานวิจัยพระพุทธศาสนา (Research Hub)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qa")}
          className={`pb-3 px-3 transition-all border-b-2 whitespace-nowrap ${
            activeTab === "qa"
              ? "border-purple-600 text-purple-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ระบบประกันคุณภาพ (AUN-QA / EdPEx / สมศ.)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mou")}
          className={`pb-3 px-3 transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "mou"
              ? "border-purple-600 text-purple-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>ข้อตกลงความร่วมมือ (MOU)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-bold">
            พุทธปัญญาประดิษฐ์ BAI
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB 0: FACULTY PUBLICATIONS & TCI-THAIJO GLOBAL REPOSITORY
          ======================================================== */}
      {activeTab === "publications" && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 bg-gradient-to-br from-purple-900 to-indigo-900 text-white rounded-2xl shadow-sm border border-purple-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-purple-200 text-xs">
                <span>บทความตีพิมพ์รวม</span>
                <BookOpenCheck className="w-4 h-4 text-purple-300" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-white">{facultyPublicationStats.totalPublications} เรื่อง</div>
                <div className="text-[11px] text-purple-200 mt-0.5">ในวารสารระดับชาติและสากล</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-800 text-xs font-semibold">
                <span>นานาชาติ Scopus Q1</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-amber-900">{facultyPublicationStats.scopusCount} เรื่อง</div>
                <div className="text-[11px] text-slate-500 mt-0.5">ฐานข้อมูล Scopus ระดับสูงสุด</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold">
                <span>TCI กลุ่ม ๑ (Tier 1)</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-emerald-900">{facultyPublicationStats.tci1Count} เรื่อง</div>
                <div className="text-[11px] text-slate-500 mt-0.5">วารสารวิชาการคุณภาพระดับ ๑</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-sky-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-sky-800 text-xs font-semibold">
                <span>TCI กลุ่ม ๒ (Tier 2)</span>
                <FileText className="w-4 h-4 text-sky-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-sky-900">{facultyPublicationStats.tci2Count} เรื่อง</div>
                <div className="text-[11px] text-slate-500 mt-0.5">วารสารวิชาการระดับชาติมาตรฐาน</div>
              </div>
            </div>
          </div>

          {/* ThaiJO National Gateway Banner */}
          <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white rounded-2xl border border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-purple-950 text-sm">
                  ศูนย์เชื่อมโยงฐานข้อมูลวารสารวิชาการระดับชาติ TCI-ThaiJO (Thailand Journals Online)
                </h2>
                <p className="text-slate-600 text-[11px]">
                  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย เชื่อมโยงผลงานวิจัยของคณาจารย์สู่ระบบฐานข้อมูลระดับชาติและนานาชาติอย่างโปร่งใสตามเกณฑ์ AUN-QA
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="https://www.tci-thaijo.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold shadow-xs transition-colors"
              >
                <span>เข้าสู่ TCI-ThaiJO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tci-thailand.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-purple-900 border border-purple-200 rounded-lg font-semibold transition-colors"
              >
                <span>ศูนย์ดัชนี TCI</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchPubQuery}
                  onChange={(e) => setSearchPubQuery(e.target.value)}
                  placeholder="ค้นหาชื่อบทความ, ชื่อวารสาร, ผู้แต่ง, คำสำคัญ, หรือรหัสเอกสาร..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-purple-500 rounded-xl text-xs text-slate-900 outline-hidden transition-all"
                />
                {searchPubQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchPubQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Personnel Dropdown */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600 shrink-0" />
                <select
                  value={selectedPersonnel}
                  onChange={(e) => setSelectedPersonnel(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-hidden focus:border-purple-500"
                >
                  {personnelList.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Tier Filter */}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-hidden focus:border-purple-500"
                >
                  <option value="all">ดัชนีวารสารทั้งหมด</option>
                  <option value="Scopus Q1">Scopus Q1 (นานาชาติ)</option>
                  <option value="TCI กลุ่ม ๑">TCI กลุ่ม ๑ (Tier 1)</option>
                  <option value="TCI กลุ่ม ๒">TCI กลุ่ม ๒ (Tier 2)</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500 shrink-0" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-hidden focus:border-purple-500"
                >
                  <option value="all">ประเภทบทความทั้งหมด</option>
                  <option value="วิจัย">บทความวิจัย (Research Article)</option>
                  <option value="วิชาการ">บทความวิชาการ (Academic Article)</option>
                </select>
              </div>
            </div>

            {/* Quick Result Indicator */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>
                แสดงผล <strong>{filteredPublications.length}</strong> จากทั้งหมด {facultyPublications.length} บทความ
              </span>
              {(selectedPersonnel !== "all" || selectedTier !== "all" || selectedType !== "all" || searchPubQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPersonnel("all");
                    setSelectedTier("all");
                    setSelectedType("all");
                    setSearchPubQuery("");
                  }}
                  className="text-purple-700 hover:text-purple-900 font-semibold underline"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              )}
            </div>
          </div>

          {/* Publications Cards Grid */}
          <div className="space-y-4">
            {filteredPublications.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700 text-sm">ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหา</p>
                <p className="text-xs text-slate-400">ลองเปลี่ยนคำค้นหรือเลือกแสดงบุคลากรทั้งหมด</p>
              </div>
            ) : (
              filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all space-y-3.5"
                >
                  {/* Card Header: Badges & Tier */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Tier Badge */}
                      {pub.journalTier === "Scopus Q1" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-700 to-amber-600 text-white shadow-2xs">
                          <Sparkles className="w-3 h-3" />
                          <span>Scopus Q1 (นานาชาติ)</span>
                        </span>
                      )}
                      {pub.journalTier === "TCI กลุ่ม ๑" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          <Award className="w-3 h-3 text-emerald-700" />
                          <span>TCI กลุ่ม ๑ (Tier 1)</span>
                        </span>
                      )}
                      {pub.journalTier === "TCI กลุ่ม ๒" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
                          <BookmarkCheck className="w-3 h-3 text-sky-700" />
                          <span>TCI กลุ่ม ๒ (Tier 2)</span>
                        </span>
                      )}

                      {/* Type Badge */}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        pub.articleType.includes("วิจัย")
                          ? "bg-purple-50 text-purple-800 border border-purple-200"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}>
                        {pub.articleType}
                      </span>

                      <span className="font-mono text-[10px] text-slate-400">
                        {pub.id}
                      </span>
                    </div>

                    {/* Personnel Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                      <span>{pub.facultyPersonnel}</span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-purple-800 transition-colors">
                      {pub.title}
                    </h3>
                    {pub.titleEn && pub.titleEn !== pub.title && (
                      <p className="text-xs text-slate-500 font-medium italic">
                        {pub.titleEn}
                      </p>
                    )}
                  </div>

                  {/* Authors & Personnel */}
                  <div className="text-xs text-slate-700 flex flex-wrap items-center gap-1 leading-relaxed">
                    <span className="text-slate-500 font-medium">ผู้แต่ง / คณะผู้วิจัย:</span>
                    {pub.authors.map((author, aIdx) => {
                      const isTargetFaculty = author.includes(pub.facultyPersonnel.replace(/,.*$/, "").replace(/พระมหา|ดร\.|รศ\.|ผศ\./g, "").trim());
                      return (
                        <span
                          key={aIdx}
                          className={isTargetFaculty ? "font-bold text-purple-900 bg-purple-50 px-1.5 py-0.5 rounded" : "font-normal"}
                        >
                          {author}{aIdx < pub.authors.length - 1 ? "," : ""}
                        </span>
                      );
                    })}
                  </div>

                  {/* Publication Source Details Box */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">ชื่อวารสาร / แหล่งเผยแพร่</span>
                      <strong className="text-slate-900 font-semibold">{pub.journal}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">ปีที่ / ฉบับที่ / เลขหน้า</span>
                      <span className="text-slate-800 font-medium">
                        ปีที่ {pub.volume} ฉบับที่ {pub.issue} {pub.pages ? `(หน้า ${pub.pages})` : ""}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">ปีที่ตีพิมพ์ / ฐานข้อมูล</span>
                      <span className="text-slate-800 font-medium">
                        พ.ศ. {pub.yearBE} (ค.ศ. {pub.yearCE}) • ฐาน {pub.database}
                      </span>
                    </div>
                  </div>

                  {/* Abstract */}
                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                    <strong className="font-semibold text-slate-800">บทคัดย่อโดยสังเขป: </strong>
                    {pub.abstractSummary}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400">คำสำคัญ:</span>
                    {pub.keywords.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-medium"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Direct TCI-ThaiJO Link & Copy Citation */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="text-[11px] text-slate-500">
                      สังกัด: <strong className="text-slate-700">{pub.facultyRole}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyCitation(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                      >
                        {copiedId === pub.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>คัดลอกรายการอ้างอิง</span>
                          </>
                        )}
                      </button>

                      <a
                        href={pub.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>เปิดอ่านบน {pub.database}</span>
                        <ExternalLink className="w-3 h-3 text-purple-200" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 1: Research Projects (Original Tab)
          ======================================================== */}
      {activeTab === "research" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {researchList.map((res) => (
            <div
              key={res.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-sm transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[10px]">
                    {res.projectCode}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    res.status.includes("เผยแพร่") ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {res.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{res.title}</h3>
                <p className="text-slate-600 text-[11px]">
                  หัวหน้าโครงการวิจัย: <strong className="font-semibold text-slate-800">{res.researcher}</strong>
                </p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>หมวดหมู่งานวิจัย:</span>
                    <span className="font-medium text-slate-800">{res.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>งบประมาณอุดหนุน:</span>
                    <span className="font-bold text-slate-800">{formatThaiCurrency(res.budget)}</span>
                  </div>
                  {res.publishedIn && (
                    <div className="flex justify-between">
                      <span>แหล่งตีพิมพ์เผยแพร่:</span>
                      <span className="font-semibold text-emerald-700">{res.publishedIn}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full rounded-full transition-all"
                    style={{ width: `${res.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>ความก้าวหน้าโครงการ</span>
                  <span className="font-bold text-purple-700">{res.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          TAB 2: QA Metrics
          ======================================================== */}
      {activeTab === "qa" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-sm">ตัวบ่งชี้การประกันคุณภาพการศึกษา (Quality Assurance KPI)</h2>
            </div>
            <span className="text-[11px] text-slate-400">
              อัปเดตรอบการประเมินปีการศึกษาล่าสุด
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {qaMetrics.map((qa) => (
              <div key={qa.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded text-[10px]">
                      {qa.standard}
                    </span>
                    <span className="font-mono text-slate-400 font-semibold">{qa.indicatorNo}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{qa.title}</h3>
                  <p className="text-[11px] text-slate-500">
                    เอกสารหลักฐานอ้างอิงสะสมในระบบ: <strong className="text-slate-800">{qa.evidenceDocsCount} ฉบับ</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">เป้าหมาย / ได้จริง</span>
                    <span className="font-bold text-slate-900 text-sm">{qa.scoreActual} / {qa.scoreTarget}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                    {qa.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: Academic MOU
          ======================================================== */}
      {activeTab === "mou" && (
        <div className="space-y-5">
          {/* Main MOU Card */}
          <div className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 rounded-2xl border border-purple-200 shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>MOU ระดับสถาบัน</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ผ่านการตรวจจากกองนิติการ มจร เรียบร้อยแล้ว</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    งบประมาณ ๒๕๖๙: โครงการ BAI ๓๐๐,๐๐๐ บาท
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  บันทึกข้อตกลงความร่วมมือทางวิชาการ (MOU) การวิจัยและพัฒนาพุทธปัญญาประดิษฐ์ (Buddhist AI: BAI)
                </h2>
                <p className="text-xs text-slate-600">
                  ระหว่าง <strong>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)</strong> กับ <strong>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.)</strong>
                </p>
              </div>

              {/* Download Draft DOCX */}
              <div className="flex items-center gap-2">
                <a
                  href="/mou/MOU_MCU_KMITL_Buddhist_AI.docx"
                  download="ร่างบันทึกข้อตกลงความร่วมมือ_MOU_มจร_สจล_พุทธปัญญาประดิษฐ์_ตรวจกองนิติการ.docx"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>ดาวน์โหลดร่าง MOU (.docx)</span>
                </a>
              </div>
            </div>

            {/* Parties & Signatories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-purple-100 bg-white space-y-1.5">
                <span className="font-bold text-purple-900 text-xs block">ฝ่ายที่ ๑: มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)</span>
                <div className="text-slate-800 font-semibold">พระพรหมวัชรธีราจารย์, ศ.ดร.</div>
                <div className="text-slate-500 text-[11px]">ตำแหน่ง อธิการบดี มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย</div>
                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                  หน่วยงานร่วมดำเนินการ: มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
                </div>
              </div>

              <div className="p-4 rounded-xl border border-indigo-100 bg-white space-y-1.5">
                <span className="font-bold text-indigo-900 text-xs block">ฝ่ายที่ ๒: สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.)</span>
                <div className="text-slate-800 font-semibold">รองศาสตราจารย์ ดร.คมสัน มาลีสี</div>
                <div className="text-slate-500 text-[11px]">ตำแหน่ง อธิการบดี สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</div>
                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                  หน่วยงานร่วมดำเนินการ: คณะวิศวกรรมศาสตร์ / วิทยาลัยนวัตกรรมการผลิตขั้นสูง
                </div>
              </div>
            </div>

            {/* Scope of Cooperation */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>กรอบและวัตถุประสงค์ความร่วมมือ ๓ มิติหลัก (Buddhist AI Architecture)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-purple-900">๑. การวิจัยและพัฒนาโมเดล AI</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    พัฒนาแบบจำลองปัญญาประดิษฐ์สำหรับภาษาบาลีและพระพุทธศาสนา ทั้งด้านการประมวลผลภาษาธรรมชาติ (NLP), การรู้จำเสียงสวด (Speech), และการตรวจจับตัวอักษรคัมภีร์ใบลาน (Vision OCR)
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-indigo-900">๒. คลังข้อมูลดิจิทัล (Digital Corpus)</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    สร้างฐานข้อมูลพระไตรปิฎก อรรถกถา ฎีกา และคัมภีร์บาลีโบราณที่ผ่านการกำกับและรับรองความถูกต้อง (Ground Truth Validation) โดยคณาจารย์ผู้เชี่ยวชาญบาลี ป.ธ.๙
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-emerald-900">๓. นวัตกรรมแพลตฟอร์มการเรียนรู้</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    ร่วมกันพัฒนาแพลตฟอร์มช่วยสอนบาลีศากยบุตร, ระบบตรวจทานมุขปาฐะอัตโนมัติ, และระบบสืบค้นพุทธวจนะอัจฉริยะเพื่อการบริการวิชาการแก่พระสงฆ์และสาธารณชน
                  </p>
                </div>
              </div>
            </div>

            {/* Document Info Footer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                เอกสารจัดเก็บต้นฉบับ: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">docs/mou/01_MOU_MCU_KMITL_Buddhist_AI.docx</code>
              </div>
              <div className="font-medium text-purple-700">
                สถานะ: ผ่านการตรวจร่างความชอบธรรมด้วยกฎหมายและระเบียบสงฆ์แล้ว
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
