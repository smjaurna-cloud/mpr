"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  Download,
  Printer,
  Copy,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Search,
  Building2,
  Info,
  Layers,
  AlertCircle,
  Loader2,
  BookOpen,
  Upload,
  ChevronRight,
  FolderArchive,
  Eye,
  FileUp,
  Sparkles,
} from "lucide-react";
import {
  officialInstitutionalDocuments,
  OfficialDocument,
} from "@/data/officialDocumentsData";

export default function FileViewerPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("doc-18"); // Default to building docx!
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"doc" | "raw" | "info">("doc");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [sheetSearch, setSheetSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read URL query param ?file= or ?id=
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fileParam = params.get("file") || params.get("id");
      if (fileParam) {
        // Check if matches doc ID
        const matched = officialInstitutionalDocuments.find(
          (d) =>
            d.id === fileParam ||
            d.realFileName.toLowerCase() === fileParam.toLowerCase() ||
            d.displayName.toLowerCase() === fileParam.toLowerCase()
        );
        if (matched) {
          setSelectedDocId(matched.id);
          loadDocument(matched.id);
          return;
        } else {
          loadDocument(fileParam);
          return;
        }
      }
    }
    // Default load doc-18
    loadDocument("doc-18");
  }, []);

  const loadDocument = async (target: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/file-viewer?file=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (data.success) {
        setFileData(data);
        if (data.sheetNames && data.sheetNames.length > 0) {
          setSelectedSheet(data.sheetNames[0]);
        }
      } else {
        setError(data.error || "ไม่สามารถโหลดเนื้อหาไฟล์ได้");
      }
    } catch (err: any) {
      setError(err?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOfficialDoc = (doc: OfficialDocument) => {
    setSelectedDocId(doc.id);
    loadDocument(doc.id);
  };

  // Upload local file from computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/file-viewer", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFileData(data);
        setSelectedDocId(""); // Custom uploaded file
        if (data.sheetNames && data.sheetNames.length > 0) {
          setSelectedSheet(data.sheetNames[0]);
        }
      } else {
        setError(data.error || "ไม่สามารถอ่านไฟล์ที่อัปโหลดได้");
      }
    } catch (err: any) {
      setError("เกิดข้อผิดพลาดในการอัปโหลดและแปลงไฟล์");
    } finally {
      setIsUploading(false);
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCopyText = () => {
    const textToCopy = fileData?.rawText || fileData?.content || "";
    if (textToCopy && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredOfficialDocs = officialInstitutionalDocuments.filter((doc) => {
    const matchesSearch =
      doc.realFileName.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      doc.displayName.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      doc.department.toLowerCase().includes(sidebarSearch.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const currentFormat = fileData?.fileFormat || "DOCX";
  const title = fileData?.displayName || fileData?.fileName || "เปิดอ่านเอกสารราชการ";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ระบบเปิดอ่านเอกสารอัจฉริยะ (MOD-22)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs">
              วส. มจร
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ระบบเปิดอ่านเอกสารราชการและพรีวิวไฟล์ออนไลน์
          </h1>
          <p className="text-xs text-amber-100 max-w-2xl leading-relaxed">
            เปิดดูไฟล์เอกสาร Word (DOCX), Excel (XLSX), PDF และเอกสารราชการทั้งหมดในระบบได้ทันทีในเว็บเบราว์เซอร์ ไม่ต้องติดตั้งโปรแกรมเพิ่ม
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".docx,.xlsx,.xls,.pdf,.csv,.txt"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-900/30 flex items-center gap-2 transition-all"
          >
            <FileUp className="w-4 h-4" />
            <span>{isUploading ? "กำลังอัปโหลด..." : "เปิดไฟล์จากเครื่อง (.docx / .xlsx)"}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official Documents Directory (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-amber-200/70 shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FolderArchive className="w-4 h-4 text-amber-600" />
                <span>คลังไฟล์งานพร้อมเปิด ({officialInstitutionalDocuments.length})</span>
              </h3>
              <p className="text-[11px] text-slate-500">คลิกที่รายการเพื่อเปิดอ่านเนื้อหาทันที</p>
            </div>
          </div>

          {/* Search in Documents */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="ค้นหาชื่อไฟล์ หรือหน่วยงาน..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
            >
              <option value="ALL">ทุกหมวดหมู่ ({officialInstitutionalDocuments.length})</option>
              <option value="อาคารสถานที่ & ยานพาหนะ">อาคารสถานที่ & ยานพาหนะ</option>
              <option value="แผนงานและงบประมาณ">แผนงานและงบประมาณ</option>
              <option value="สำนักวิชาการ & ห้องเรียน">สำนักวิชาการ & ห้องเรียน</option>
              <option value="พระธรรมวินัย & ทะเบียนสงฆ์">พระธรรมวินัย & ทะเบียนสงฆ์</option>
              <option value="บริหารงานบุคคล (HR)">บริหารงานบุคคล (HR)</option>
              <option value="หลักสูตรระดับบัณฑิตศึกษา">หลักสูตรระดับบัณฑิตศึกษา</option>
              <option value="ประวัติคณาจารย์บัณฑิตศึกษา">ประวัติคณาจารย์บัณฑิตศึกษา</option>
              <option value="งานวิจัยและนวัตกรรม (MOU)">งานวิจัยและนวัตกรรม (MOU)</option>
            </select>
          </div>

          {/* List of Files */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredOfficialDocs.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              const isDocx = doc.fileFormat === "DOCX";
              const isXlsx = doc.fileFormat === "XLSX";
              const isPdf = doc.fileFormat === "PDF";

              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleSelectOfficialDoc(doc)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/40 shadow-xs"
                      : "bg-white hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                      isDocx
                        ? "bg-blue-100 text-blue-800"
                        : isXlsx
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isDocx ? <FileCode className="w-4 h-4" /> : isXlsx ? <FileSpreadsheet className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] font-bold text-slate-700 truncate max-w-[180px]">
                        {doc.realFileName}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-100 text-slate-500">
                        {doc.fileSize}
                      </span>
                    </div>

                    <p className={`text-xs font-semibold truncate leading-tight mt-0.5 ${isSelected ? "text-amber-950" : "text-slate-800"}`}>
                      {doc.displayName}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span className="truncate">{doc.department}</span>
                      {isSelected && <span className="text-amber-800 font-bold shrink-0">กำลังดูอยู่ ●</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Local Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 hover:bg-amber-100/50 text-center cursor-pointer transition-colors space-y-1.5"
          >
            <Upload className="w-5 h-5 text-amber-700 mx-auto" />
            <p className="text-xs font-bold text-slate-800">เปิดไฟล์เอกสารอื่นจากเครื่อง</p>
            <p className="text-[11px] text-slate-500">
              คลิกหรือลากไฟล์ .docx, .xlsx, .pdf มาวางที่นี่
            </p>
          </div>
        </div>

        {/* Right Column: Main Document Reading Pane (8 cols) */}
        <div
          className={`lg:col-span-8 bg-slate-100 rounded-2xl border border-amber-200/80 shadow-md flex flex-col overflow-hidden ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none h-full" : "min-h-[750px]"
          }`}
        >
          {/* Document Header Toolbar */}
          <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                {currentFormat === "DOCX" ? (
                  <FileCode className="w-4 h-4 text-blue-200" />
                ) : currentFormat === "XLSX" ? (
                  <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                ) : (
                  <FileText className="w-4 h-4 text-rose-200" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-white/20 text-amber-100 font-mono">
                    {currentFormat}
                  </span>
                  {fileData?.fileSize && (
                    <span className="text-[10px] text-amber-200 font-mono">
                      {fileData.fileSize}
                    </span>
                  )}
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white truncate" title={title}>
                  {title}
                </h2>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0 text-xs">
              {currentFormat === "DOCX" && (
                <div className="hidden sm:flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(z - 15, 60))}
                    title="ย่อ"
                    aria-label="ย่อขนาดเอกสาร"
                    className="p-1 hover:bg-white/20 rounded text-amber-100"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 font-mono text-[10px] text-amber-200 min-w-[36px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(z + 15, 150))}
                    title="ขยาย"
                    aria-label="ขยายขนาดเอกสาร"
                    className="p-1 hover:bg-white/20 rounded text-amber-100"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(100)}
                    title="100%"
                    aria-label="รีเซ็ตขนาด 100%"
                    className="p-1 hover:bg-white/20 rounded text-amber-100 ml-0.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handlePrint}
                title="พิมพ์เอกสาร"
                aria-label="พิมพ์เอกสาร"
                className="p-2 hover:bg-white/20 rounded-lg text-amber-100 transition-colors flex items-center gap-1"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">พิมพ์</span>
              </button>

              {fileData?.rawText && (
                <button
                  type="button"
                  onClick={handleCopyText}
                  title="คัดลอกข้อความ"
                  aria-label="คัดลอกข้อความ"
                  className="p-2 hover:bg-white/20 rounded-lg text-amber-100 transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline text-[11px]">
                    {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                  </span>
                </button>
              )}

              {fileData?.downloadUrl && (
                <a
                  href={fileData.downloadUrl}
                  download
                  title="ดาวน์โหลดไฟล์ต้นฉบับ"
                  aria-label="ดาวน์โหลดไฟล์ต้นฉบับ"
                  className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ดาวน์โหลด</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "ย่อหน้าต่าง" : "ขยายเต็มจอ"}
                aria-label={isFullscreen ? "ย่อหน้าต่าง" : "ขยายเต็มจอ"}
                className="p-2 hover:bg-white/20 rounded-lg text-amber-100 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("doc")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === "doc"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>มุมมองเอกสาร (Document View)</span>
              </button>

              {fileData?.rawText && (
                <button
                  type="button"
                  onClick={() => setActiveTab("raw")}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === "raw"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>ข้อความล้วน (Raw Text)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === "info"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>ข้อมูลจำเพาะ</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 hidden sm:block font-mono">
              {fileData?.fileName}
            </div>
          </div>

          {/* Document Content Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/80 flex justify-center">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
                <p className="text-xs font-semibold">กำลังแปลงและเรนเดอร์เอกสาร...</p>
              </div>
            )}

            {error && (
              <div className="max-w-md w-full my-auto p-6 bg-white rounded-2xl border border-rose-200 shadow-md text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">ไม่สามารถเปิดไฟล์ได้</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{error}</p>
                {fileData?.downloadUrl && (
                  <a
                    href={fileData.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    <Download className="w-4 h-4" />
                    <span>ดาวน์โหลดไฟล์ไปเปิดในเครื่อง</span>
                  </a>
                )}
              </div>
            )}

            {!loading && !error && fileData && (
              <>
                {/* TAB: DOCUMENT VIEW */}
                {activeTab === "doc" && (
                  <div className="w-full flex justify-center">
                    {/* 1. DOCX RENDERED DOCUMENT */}
                    {currentFormat === "DOCX" && (
                      <div
                        style={{ zoom: `${zoomLevel}%` }}
                        className="w-full max-w-4xl bg-white rounded-xl shadow-xl border border-slate-300 p-8 sm:p-14 transition-all duration-150 relative min-h-[700px]"
                      >
                        {/* Institutional Watermark Header */}
                        <div className="border-b-2 border-amber-500/50 pb-4 mb-6 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif font-bold text-base">
                              ม
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-xs">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)</p>
                              <p className="text-[10px] text-amber-800">ระบบคลังและเปิดอ่านเอกสารราชการทางการ</p>
                            </div>
                          </div>
                          <div className="text-right text-[10px] text-slate-400 font-mono">
                            <span>{fileData.fileName}</span>
                          </div>
                        </div>

                        {/* Rendered HTML */}
                        <div
                          className="docx-content prose prose-sm max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: fileData.html || "<p>ไม่พบข้อความในไฟล์</p>" }}
                        />

                        {/* Footer signoff */}
                        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                          <p className="italic">
                            * เอกสารทางการจัดเก็บในคลังข้อมูลสถาบัน วัดบาลีเถรวาทสังฆาราม ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม
                          </p>
                          <span className="text-[11px] font-mono text-slate-400">
                            Verified Official Document
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 2. XLSX RENDERED SPREADSHEET */}
                    {currentFormat === "XLSX" && (
                      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-slate-300 p-4 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3 text-xs">
                          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                            <span className="text-slate-500 font-semibold shrink-0">แผ่นงาน:</span>
                            {fileData.sheetNames?.map((sheet: string) => (
                              <button
                                key={sheet}
                                type="button"
                                onClick={() => setSelectedSheet(sheet)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs shrink-0 transition-colors ${
                                  selectedSheet === sheet
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }`}
                              >
                                {sheet}
                              </button>
                            ))}
                          </div>

                          <div className="relative w-full sm:w-64">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={sheetSearch}
                              onChange={(e) => setSheetSearch(e.target.value)}
                              placeholder="ค้นหาในตาราง..."
                              className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="overflow-x-auto border border-slate-200 rounded-lg max-h-[600px] overflow-y-auto">
                          <table className="w-full text-left text-xs border-collapse font-sans">
                            <tbody>
                              {fileData.sheetsData?.[selectedSheet]
                                ?.filter((row: any[]) =>
                                  !sheetSearch
                                    ? true
                                    : row.some((cell) =>
                                        String(cell || "").toLowerCase().includes(sheetSearch.toLowerCase())
                                      )
                                )
                                .map((row: any[], rowIdx: number) => {
                                  const isHeader = rowIdx === 0 || rowIdx === 1;
                                  return (
                                    <tr
                                      key={rowIdx}
                                      className={`border-b border-slate-200 ${
                                        isHeader
                                          ? "bg-emerald-50/80 font-bold text-emerald-950 sticky top-0 z-10"
                                          : rowIdx % 2 === 0
                                          ? "bg-white hover:bg-slate-50"
                                          : "bg-slate-50/60 hover:bg-slate-100/60"
                                      }`}
                                    >
                                      <td className="p-2 border-r border-slate-200 bg-slate-100 text-slate-400 font-mono text-[10px] text-center w-10 shrink-0 select-none">
                                        {rowIdx + 1}
                                      </td>
                                      {row.map((cell: any, colIdx: number) => (
                                        <td
                                          key={colIdx}
                                          className="p-2.5 border-r border-slate-200 text-slate-800 whitespace-nowrap"
                                        >
                                          {cell !== undefined && cell !== null ? String(cell) : ""}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 3. PDF VIEWER */}
                    {currentFormat === "PDF" && (
                      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden flex flex-col h-[75vh]">
                        <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs">
                          <span className="font-semibold text-amber-900">
                            เอกสาร PDF ทางการ: {fileData.fileName}
                          </span>
                          <a
                            href={fileData.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-800 hover:underline flex items-center gap-1 font-bold"
                          >
                            <span>เปิดในแท็บใหม่</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <iframe
                          title={fileData.fileName}
                          src={fileData.downloadUrl}
                          className="w-full flex-1 border-0"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: RAW TEXT */}
                {activeTab === "raw" && (
                  <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl border border-slate-300 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <h4 className="font-bold text-xs text-slate-800">ข้อความที่สกัดได้จากเอกสาร (Plain Text)</h4>
                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copied ? "คัดลอกสำเร็จ!" : "คัดลอกทั้งหมด"}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
                      {fileData.rawText || fileData.content || "ไม่พบข้อความ"}
                    </pre>
                  </div>
                )}

                {/* TAB: METADATA */}
                {activeTab === "info" && (
                  <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-slate-300 p-6 sm:p-8 space-y-5 text-xs">
                    <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600" />
                      <span>ข้อมูลจำเพาะของไฟล์เอกสารราชการ</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">ชื่อไฟล์ทางการ:</span>
                        <p className="font-mono font-bold text-slate-900">{fileData.fileName}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">ขนาดไฟล์:</span>
                        <p className="font-mono font-bold text-slate-900">{fileData.fileSize}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">หมวดหมู่:</span>
                        <p className="font-bold text-amber-900">{fileData.category || "เอกสารทางการ"}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">หน่วยงานผู้รับผิดชอบ:</span>
                        <p className="font-bold text-slate-800">{fileData.department || "วิทยาลัยสงฆ์ วส. มจร"}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">วันที่ตรวจสอบล่าสุด:</span>
                        <p className="font-mono text-slate-700">
                          {fileData.metadata?.lastModified ? new Date(fileData.metadata.lastModified).toLocaleString("th-TH") : "2026-09-09"}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px]">รูปแบบไฟล์:</span>
                        <p className="font-bold text-slate-800">{fileData.fileFormat} File</p>
                      </div>
                    </div>

                    {fileData.downloadUrl && (
                      <div className="pt-2">
                        <a
                          href={fileData.downloadUrl}
                          download
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>ดาวน์โหลดไฟล์ต้นฉบับ ({fileData.fileSize})</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Global CSS for DOCX Table and Typography Rendering */}
      <style jsx global>{`
        .docx-content table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin-top: 1.25rem !important;
          margin-bottom: 1.25rem !important;
          border: 1px solid #cbd5e1 !important;
        }
        .docx-content table tr:first-child {
          background-color: #fef3c7 !important;
          color: #78350f !important;
          font-weight: bold !important;
        }
        .docx-content table td,
        .docx-content table th {
          border: 1px solid #cbd5e1 !important;
          padding: 0.625rem 0.75rem !important;
          vertical-align: top !important;
        }
        .docx-content table tr:nth-child(even):not(:first-child) {
          background-color: #f8fafc !important;
        }
        .docx-content table tr:hover:not(:first-child) {
          background-color: #f1f5f9 !important;
        }
        .docx-content p {
          margin-bottom: 0.75rem !important;
        }
        .docx-content strong {
          color: #0f172a !important;
        }
      `}</style>
    </div>
  );
}
