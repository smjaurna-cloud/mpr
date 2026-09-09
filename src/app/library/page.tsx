"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  Sparkles, 
  Scroll, 
  Layers, 
  ExternalLink,
  FolderArchive,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  Building2,
  Calendar,
  HardDrive
} from "lucide-react";
import { mockTipitakaBooks, TipitakaBook } from "@/data/mockData";
import { officialInstitutionalDocuments, OfficialDocument, getOfficialDocumentsStats } from "@/data/officialDocumentsData";
import DocumentViewerModal from "@/components/DocumentViewerModal";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"tipitaka" | "official-documents">("tipitaka");
  const [books, setBooks] = useState<TipitakaBook[]>(mockTipitakaBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [readingBook, setReadingBook] = useState<TipitakaBook | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Official Documents state
  const [docSearchQuery, setDocSearchQuery] = useState("");
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>("ALL");
  const [viewerDoc, setViewerDoc] = useState<OfficialDocument | null>(null);

  const docStats = getOfficialDocumentsStats();

  const filteredBooks = books.filter(b => {
    const matchQuery = b.title.includes(searchQuery) ||
                       b.paliTitle.includes(searchQuery) ||
                       b.authorOrCompiler.includes(searchQuery) ||
                       b.catalogNumber.includes(searchQuery);
    const matchCat = selectedCategory === "ALL" || b.category.includes(selectedCategory);
    return matchQuery && matchCat;
  });

  const filteredDocs = officialInstitutionalDocuments.filter(d => {
    const matchQuery = d.realFileName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                       d.displayName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                       d.department.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                       d.description.toLowerCase().includes(docSearchQuery.toLowerCase());
    const matchCat = selectedDocCategory === "ALL" || d.category === selectedDocCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>กลุ่มงานห้องสมุด สารสนเทศ & คลังสารบรรณสถาบัน</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            หอคัมภีร์ & คลังเอกสารราชการจริงสถาบัน (Institutional Digital Repository)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ศูนย์รวมพระไตรปิฎก คัมภีร์สัททาวิเสส และทะเบียนเอกสารราชการจริงทั้งระบบ (ชื่อไฟล์จริงตรงตามข้อมูล)
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
            <div className="text-[10px] text-amber-700 font-semibold">คัมภีร์บาลี</div>
            <div className="font-bold text-amber-950 text-sm">๔,๕๐๐+ ระเบียน</div>
          </div>
          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
            <div className="text-[10px] text-emerald-700 font-semibold">เอกสารจริงทางการ</div>
            <div className="font-bold text-emerald-950 text-sm">{docStats.totalDocs} ฉบับ</div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Mode Navigation Tabs */}
      <div className="flex border-b border-amber-200 gap-3 text-xs">
        <button
          onClick={() => setActiveTab("tipitaka")}
          className={`pb-3 px-4 font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === "tipitaka"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>คลังพระไตรปิฎก & สัททาวิเสส</span>
        </button>

        <button
          onClick={() => setActiveTab("official-documents")}
          className={`pb-3 px-4 font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === "official-documents"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FolderArchive className="w-4 h-4 text-amber-600" />
          <span>คลังเอกสารราชการจริงทั้งระบบ ({docStats.totalDocs} รายการ)</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
            ชื่อไฟล์จริง
          </span>
        </button>
      </div>

      {/* TAB 1: TIPITAKA BOOKS */}
      {activeTab === "tipitaka" && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อคัมภีร์, ฉายาบาลี, พระอรรถกถาจารย์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 self-end sm:self-auto"
            >
              <option value="ALL">ทุกหมวดคัมภีร์</option>
              <option value="คัมภีร์สัททาวิเสส">คัมภีร์สัททาวิเสส (ไวยากรณ์บาลี)</option>
              <option value="พระวินัยปิฎก">พระวินัยปิฎก</option>
              <option value="พระสุตตันตปิฎก">พระสุตตันตปิฎก</option>
              <option value="พระอภิธรรมปิฎก">พระอภิธรรมปิฎก</option>
            </select>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] border border-amber-200">
                      {book.catalogNumber}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {book.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {book.title}
                    </h3>
                    <p className="font-serif italic text-amber-800 text-xs mt-0.5">
                      {book.paliTitle}
                    </p>
                  </div>

                  <p className="text-slate-500 line-clamp-2 leading-relaxed">
                    ประเภทอักษร: {book.scriptType} • จำนวน {book.pagesCount} หน้า (พร้อมยืม {book.availableCopies} เล่ม)
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span>รจนา/แปล: </span>
                    <span className="font-medium text-slate-700">{book.authorOrCompiler}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setReadingBook(book)}
                      className="px-2.5 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg flex items-center gap-1 font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>เปิดอ่าน</span>
                    </button>
                    <button
                      onClick={() => {
                        setNotification(`กำลังเริ่มดาวน์โหลดดิจิทัล: ${book.title}`);
                        setTimeout(() => setNotification(null), 4000);
                      }}
                      className="px-2.5 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1 font-medium transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL INSTITUTIONAL DOCUMENTS */}
      {activeTab === "official-documents" && (
        <div className="space-y-4">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">เอกสารทางการรวม</p>
                <p className="font-bold text-slate-900 text-sm">{docStats.totalDocs} รายการ</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">ไฟล์เอกสาร PDF</p>
                <p className="font-bold text-slate-900 text-sm">{docStats.pdfCount} ฉบับ</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">ไฟล์สเปรดชีต Excel</p>
                <p className="font-bold text-slate-900 text-sm">{docStats.xlsxCount} ฉบับ</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">ไฟล์ Word (DOCX)</p>
                <p className="font-bold text-slate-900 text-sm">{docStats.docxCount} ฉบับ</p>
              </div>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อไฟล์จริง (เช่น .xlsx, .pdf), หน่วยงาน, หรือเรื่อง..."
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
              />
            </div>

            <select
              value={selectedDocCategory}
              onChange={(e) => setSelectedDocCategory(e.target.value)}
              className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 self-end sm:self-auto"
            >
              <option value="ALL">ทุกหมวดหมู่เอกสารราชการ</option>
              <option value="พระธรรมวินัย & ทะเบียนสงฆ์">พระธรรมวินัย & ทะเบียนสงฆ์</option>
              <option value="บริหารงานบุคคล (HR)">บริหารงานบุคคล (HR)</option>
              <option value="สำนักวิชาการ & ห้องเรียน">สำนักวิชาการ & ห้องเรียน</option>
              <option value="แผนงานและงบประมาณ">แผนงานและงบประมาณ</option>
              <option value="อาคารสถานที่ & ยานพาหนะ">อาคารสถานที่ & ยานพาหนะ</option>
              <option value="หลักสูตรระดับบัณฑิตศึกษา">หลักสูตรระดับบัณฑิตศึกษา</option>
              <option value="ประวัติคณาจารย์บัณฑิตศึกษา">ประวัติคณาจารย์บัณฑิตศึกษา</option>
              <option value="งานวิจัยและนวัตกรรม (MOU)">งานวิจัยและนวัตกรรม (MOU)</option>
            </select>
          </div>

          {/* Official Documents List */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => {
                const isPdf = doc.fileFormat === "PDF";
                const isXlsx = doc.fileFormat === "XLSX";
                const isDocx = doc.fileFormat === "DOCX";

                return (
                  <div
                    key={doc.id}
                    className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                        isPdf ? "bg-rose-50 text-rose-600 border border-rose-200" :
                        isXlsx ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                        "bg-blue-50 text-blue-600 border border-blue-200"
                      }`}>
                        {isPdf && <FileText className="w-5 h-5" />}
                        {isXlsx && <FileSpreadsheet className="w-5 h-5" />}
                        {isDocx && <FileCode className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {doc.realFileName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-100/70 text-amber-800">
                            {doc.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {doc.fileSize}
                          </span>
                        </div>

                        <h3 className="font-semibold text-sm text-slate-900 leading-snug">
                          {doc.displayName}
                        </h3>

                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          {doc.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            {doc.department}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3 h-3 text-slate-400" />
                            ข้อมูล: {doc.recordsOrPages}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">
                            {doc.docsRepoPath}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewerDoc(doc)}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg flex items-center gap-1.5 font-bold transition-colors border border-amber-300 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>เปิดอ่าน</span>
                      </button>

                      <a
                        href={doc.downloadUrl}
                        download={doc.realFileName}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-1.5 font-medium shadow-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ดาวน์โหลด</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reading Modal */}
      {readingBook && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-amber-200 max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {readingBook.catalogNumber}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {readingBook.title}
                </h2>
                <p className="font-serif italic text-amber-800 text-xs">
                  {readingBook.paliTitle}
                </p>
              </div>
              <button
                onClick={() => setReadingBook(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2 text-xs text-slate-700 leading-relaxed font-serif">
              <p className="font-semibold text-amber-900 border-b border-amber-200 pb-1">
                บทนมัสการและเนื้อหาคัมภีร์ย่อ (สรุปสังเขป):
              </p>
              <p className="font-bold text-center text-amber-900">
                นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
              </p>
              <p className="text-justify indent-6">
                (คัมภีร์{readingBook.title}) คัมภีร์สำคัญแห่งพระพุทธศาสนาเถรวาท สถิตในหมวด{readingBook.category} บันทึกด้วย{readingBook.scriptType} ความยาวรวม {readingBook.pagesCount} หน้า ได้รับการตรวจทานรักษาตามมาตรฐานโบราณาจารย์
              </p>
              <p className="text-slate-500 text-[11px] pt-2">
                ผู้เรียบเรียง/รจนา: {readingBook.authorOrCompiler} • หมวด: {readingBook.category}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                ระบบสืบค้นพระไตรปิฎกดิจิทัล วส. มจร
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setReadingBook(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-medium text-slate-700"
                >
                  ปิดหน้าต่าง
                </button>
                <button
                  onClick={() => {
                    setNotification(`จำลองการเปิดอ่านฉบับเต็ม: ${readingBook.title}`);
                    setReadingBook(null);
                    setTimeout(() => setNotification(null), 4000);
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  อ่านฉบับเต็มบาลี-ไทย
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Document Viewer Modal */}
      {viewerDoc && (
        <DocumentViewerModal
          isOpen={!!viewerDoc}
          onClose={() => setViewerDoc(null)}
          fileIdentifier={viewerDoc.id}
          initialTitle={viewerDoc.displayName}
          initialFormat={viewerDoc.fileFormat}
          downloadUrl={viewerDoc.downloadUrl}
        />
      )}
    </div>
  );
}
