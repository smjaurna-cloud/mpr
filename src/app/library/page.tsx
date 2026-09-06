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
  ExternalLink
} from "lucide-react";
import { mockTipitakaBooks, TipitakaBook } from "@/data/mockData";

export default function LibraryPage() {
  const [books, setBooks] = useState<TipitakaBook[]>(mockTipitakaBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [readingBook, setReadingBook] = useState<TipitakaBook | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = books.filter(b => {
    const matchQuery = b.title.includes(searchQuery) ||
                       b.paliTitle.includes(searchQuery) ||
                       b.authorOrCompiler.includes(searchQuery) ||
                       b.catalogNumber.includes(searchQuery);
    const matchCat = selectedCategory === "ALL" || b.category.includes(selectedCategory);
    return matchQuery && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>กลุ่มงานห้องสมุดและสารสนเทศ (สำนักวิชาการ)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            หอคัมภีร์ & ห้องสมุดพระไตรปิฎกดิจิทัล (Digital Tipitaka Archive)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            คลังคัมภีร์สัททาวิเสส ไวยากรณ์บาลีโบราณ (สัททนีติ, ปทรูปสิทธิ, มูลกัจจายนะ) คัมภีร์ใบลาน และระบบยืม-คืนตำรา
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs bg-amber-50 p-2 rounded-xl border border-amber-200">
          <Scroll className="w-4 h-4 text-amber-700" />
          <span className="font-semibold text-amber-900">คลังคัมภีร์โบราณ ๔,๕๐๐+ ระเบียน</span>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

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
        {filtered.map((book) => (
          <div
            key={book.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] border border-amber-200">
                  {book.catalogNumber}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {book.scriptType}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{book.title}</h3>
                <p className="text-amber-800 font-serif font-bold text-[11px] mt-0.5">
                  {book.paliTitle}
                </p>
                <p className="text-slate-500 text-[10px] mt-1">
                  รจนา/แปลโดย: {book.authorOrCompiler}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>หมวดหมู่:</span>
                  <span className="font-medium text-slate-800">{book.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนหน้า:</span>
                  <span className="font-medium text-slate-800">{book.pagesCount} หน้า</span>
                </div>
                <div className="flex justify-between">
                  <span>ตัวเล่มในห้องสมุด:</span>
                  <span className="font-bold text-emerald-700">ว่าง {book.availableCopies} เล่ม (ยืมได้)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setReadingBook(book)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg font-bold transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>เปิดอ่านคัมภีร์ออนไลน์</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNotification(`ดาวน์โหลดไฟล์คัมภีร์ ${book.title} (PDF) สำเร็จ`);
                  setTimeout(() => setNotification(null), 4000);
                }}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>ดาวน์โหลด PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal Simulation */}
      {readingBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-base">{readingBook.title}</h2>
                <p className="text-amber-800 font-serif font-bold text-xs">{readingBook.paliTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setReadingBook(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-slate-800 font-serif leading-relaxed text-sm space-y-2">
              <p className="font-bold text-center text-amber-900">
                นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
              </p>
              <p className="text-justify indent-6">
                (คัมภีร์ปทรูปสิทธิ สนธิกัณฑ์) สุริโยทโย วิจิตฺรนเยน สมาสาสิโต อภิธมฺโม สพฺพญฺญุตญาณสมุฏฺฐิโต... พระพุทธปิยเถระได้รจนาสูตรสังเขปแห่งคัมภีร์กัจจายนะ โดยจำแนกเป็น ๗ กัณฑ์ เพื่อเป็นกุญแจไขเข้าสู่พระไตรปิฎกบาลีเถรวาท
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t">
              <span>หมวด: {readingBook.category}</span>
              <button
                type="button"
                onClick={() => setReadingBook(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl"
              >
                ปิดหน้าต่างอ่าน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
