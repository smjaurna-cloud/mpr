"use client";

import React, { useState, useEffect } from "react";
import {
  X,
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
} from "lucide-react";

export interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileIdentifier?: string; // File name, path, or document ID (e.g. doc-18 or "อาคารสถานที่...")
  initialTitle?: string;
  initialFormat?: "DOCX" | "XLSX" | "PDF" | "TEXT";
  downloadUrl?: string;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  fileIdentifier,
  initialTitle,
  initialFormat,
  downloadUrl: fallbackDownloadUrl,
}: DocumentViewerModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"doc" | "raw" | "info">("doc");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [sheetSearch, setSheetSearch] = useState("");

  useEffect(() => {
    if (isOpen && fileIdentifier) {
      loadFile(fileIdentifier);
    } else {
      setFileData(null);
      setError(null);
      setZoomLevel(100);
    }
  }, [isOpen, fileIdentifier]);

  const loadFile = async (target: string) => {
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

  if (!isOpen) return null;

  const currentFormat = fileData?.fileFormat || initialFormat || "DOCX";
  const title = fileData?.displayName || initialTitle || fileData?.fileName || fileIdentifier || "เปิดอ่านเอกสาร";
  const activeDownloadUrl = fileData?.downloadUrl || fallbackDownloadUrl;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className={`bg-slate-100 rounded-2xl shadow-2xl border border-amber-300/80 flex flex-col transition-all duration-200 overflow-hidden ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "max-w-6xl w-full h-[92vh] max-h-[950px]"
        }`}
      >
        {/* Header Toolbar */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
              {currentFormat === "DOCX" ? (
                <FileCode className="w-5 h-5 text-blue-200" />
              ) : currentFormat === "XLSX" ? (
                <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
              ) : (
                <FileText className="w-5 h-5 text-rose-200" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-white/20 text-amber-100 border border-white/20">
                  {currentFormat}
                </span>
                {fileData?.fileSize && (
                  <span className="text-[10px] text-amber-200/80 font-mono">
                    {fileData.fileSize}
                  </span>
                )}
                <span className="text-[10px] text-amber-200/90 hidden md:inline">
                  • ระบบเปิดอ่านเอกสารทางการ วส. มจร
                </span>
              </div>
              <h3 className="font-bold text-sm text-white truncate mt-0.5" title={title}>
                {title}
              </h3>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs">
            {/* Zoom Controls (for docx / text) */}
            {currentFormat === "DOCX" && (
              <div className="hidden sm:flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(z - 15, 60))}
                  title="ย่อขนาด"
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
                  title="ขยายขนาด"
                  aria-label="ขยายขนาดเอกสาร"
                  className="p-1 hover:bg-white/20 rounded text-amber-100"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  title="รีเซ็ต 100%"
                  aria-label="รีเซ็ตขนาด 100%"
                  className="p-1 hover:bg-white/20 rounded text-amber-100 ml-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Print Button */}
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

            {/* Copy Button */}
            {fileData?.rawText && (
              <button
                type="button"
                onClick={handleCopyText}
                title="คัดลอกข้อความในเอกสาร"
                aria-label="คัดลอกข้อความในเอกสาร"
                className="p-2 hover:bg-white/20 rounded-lg text-amber-100 transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span className="hidden md:inline text-[11px] text-emerald-300">คัดลอกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden md:inline text-[11px]">คัดลอก</span>
                  </>
                )}
              </button>
            )}

            {/* Download Original File */}
            {activeDownloadUrl && (
              <a
                href={activeDownloadUrl}
                download
                title="ดาวน์โหลดไฟล์ต้นฉบับ"
                aria-label="ดาวน์โหลดไฟล์ต้นฉบับ"
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="text-[11px]">ดาวน์โหลด</span>
              </a>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "ย่อหน้าต่าง" : "ขยายเต็มจอ"}
              aria-label={isFullscreen ? "ย่อหน้าต่าง" : "ขยายเต็มจอ"}
              className="p-2 hover:bg-white/20 rounded-lg text-amber-100 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              title="ปิดหน้าต่าง (Esc)"
              aria-label="ปิดหน้าต่างเปิดอ่านเอกสาร"
              className="p-1.5 hover:bg-rose-600 rounded-lg text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Modes Tab Bar */}
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
              <span>ข้อมูลจำเพาะไฟล์</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-2">
            <span>สังกัด: <strong>{fileData?.department || "วส. มจร"}</strong></span>
            <span>•</span>
            <span className="font-mono">{fileData?.fileName}</span>
          </div>
        </div>

        {/* Main Document Content Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/70 flex justify-center">
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
              {activeDownloadUrl && (
                <div className="pt-2">
                  <a
                    href={activeDownloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    <Download className="w-4 h-4" />
                    <span>ดาวน์โหลดไฟล์ไปเปิดในเครื่อง</span>
                  </a>
                </div>
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
                          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif font-bold text-sm">
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

                      {/* Rendered HTML with custom Tailwind typography for DOCX */}
                      <div
                        className="docx-content prose prose-sm max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: fileData.html || "<p>ไม่พบข้อความในไฟล์</p>" }}
                      />

                      {/* Document Footer Signoff */}
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
                      {/* Sheet Switcher & Search */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3 text-xs">
                        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                          <span className="text-slate-500 font-semibold shrink-0">แผ่นงาน (Sheets):</span>
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
                            placeholder="ค้นหาข้อมูลในตาราง..."
                            className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Spreadsheet Table View */}
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
                    <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden flex flex-col h-[78vh]">
                      <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-900">
                          พรีวิวเอกสาร PDF ทางการ: {fileData.fileName}
                        </span>
                        <a
                          href={fileData.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-800 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>เปิดในแท็บใหม่เต็มจอ</span>
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

              {/* TAB: RAW TEXT VIEW */}
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

              {/* TAB: METADATA VIEW */}
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

                  {activeDownloadUrl && (
                    <div className="pt-2">
                      <a
                        href={activeDownloadUrl}
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
