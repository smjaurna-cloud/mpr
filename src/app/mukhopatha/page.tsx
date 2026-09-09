"use client";

import React, { useState } from "react";
import { 
  BookMarked, 
  Volume2, 
  Play, 
  Pause, 
  CheckCircle2, 
  Award, 
  FileText, 
  Search, 
  Sparkles, 
  Plus, 
  BarChart3, 
  Bookmark,
  Download,
  Filter
} from "lucide-react";
import { mockMukhopathaRecords, MukhopathaChapter, mockSamaneras } from "@/data/mockData";

export default function MukhopathaPage() {
  const [records, setRecords] = useState<MukhopathaChapter[]>(mockMukhopathaRecords);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScriptureFilter, setSelectedScriptureFilter] = useState("ALL");

  // New Evaluation Form State
  const [evalSamaneraId, setEvalSamaneraId] = useState(mockSamaneras[0]?.id || "sam-01");
  const [evalScripture, setEvalScripture] = useState("คัมภีร์ปทรูปสิทธิ");
  const [evalChapter, setEvalChapter] = useState("การกวิภาค กัณฑ์ที่ ๔");
  const [evalScore, setEvalScore] = useState<number>(95);
  const [evalGrade, setEvalGrade] = useState<"EXCELLENT" | "GOOD" | "NEEDS_IMPROVEMENT">("EXCELLENT");
  const [evalNotes, setEvalNotes] = useState("ออกเสียงอักขระฐานกรณ์ถูกต้องชัดเจนตามพุทธพจน์ ทรงจำแม่นยำ");
  const [evalSuccess, setEvalSuccess] = useState(false);

  // Auto-calculate grade from score
  const handleScoreChange = (score: number) => {
    setEvalScore(score);
    if (score >= 90) setEvalGrade("EXCELLENT");
    else if (score >= 70) setEvalGrade("GOOD");
    else setEvalGrade("NEEDS_IMPROVEMENT");
  };

  const togglePlayAudio = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSamanera = mockSamaneras.find(s => s.id === evalSamaneraId);
    const newRecord: MukhopathaChapter = {
      id: `muko-${Date.now()}`,
      scripture: evalScripture,
      chapter: evalChapter,
      samaneraId: evalSamaneraId,
      samaneraName: selectedSamanera ? `${selectedSamanera.fullName} (${selectedSamanera.paliName})` : "ศากยบุตรสามเณร",
      grade: evalGrade,
      evaluator: "พระคัมภีราจารย์ผู้ตรวจการบ้าน",
      recordingDuration: "06:30 นาที",
      date: new Date().toISOString().split("T")[0],
      audioUrl: "/mock-audio/new-recitation.mp3",
    };

    setRecords([newRecord, ...records]);
    setShowEvaluationModal(false);
    setEvalSuccess(true);
    setTimeout(() => setEvalSuccess(false), 5000);
  };

  // Export Mukhopatha CSV
  const handleExportCsv = () => {
    const headers = "รหัส,ชื่อสามเณร,คัมภีร์,บทกัณฑ์,ผลการประเมิน,ผู้ตรวจ,ความยาวคลิป,วันที่\n";
    const rows = records.map(r => 
      `"${r.id}","${r.samaneraName}","${r.scripture}","${r.chapter}","${r.grade}","${r.evaluator}","${r.recordingDuration}","${r.date}"`
    ).join("\n");
    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ผลการสอบมุขปาฐะบาลี_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredRecords = records.filter(r => {
    const matchQuery = r.samaneraName.includes(searchQuery) ||
                       r.scripture.includes(searchQuery) ||
                       r.chapter.includes(searchQuery);
    const matchScripture = selectedScriptureFilter === "ALL" || r.scripture === selectedScriptureFilter;
    return matchQuery && matchScripture;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <BookMarked className="w-4 h-4 text-amber-600" />
            <span>MOD-03: การศึกษาพระปริยัติธรรม & ประเมินมุขปาฐะปากเปล่า</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบประเมินการสาธยายคัมภีร์บาลีโบราณ (Mukhopātha Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            คลังเสียงสวด ตรวจสอบอักขรวิธี ฐานกรณ์ คัมภีร์ปทรูปสิทธิ สัททนีติ และเตรียมสอบบาลีสนามหลวง
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>ส่งออก CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowEvaluationModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>บันทึกผลการสอบมุขปาฐะ</span>
          </button>
        </div>
      </div>

      {evalSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">บันทึกผลการประเมินมุขปาฐะเรียบร้อยแล้ว!</p>
            <p className="text-[11px] text-emerald-700">ผลคะแนนจะถูกนำไปอัปเดตลงสมุดพกออนไลน์ของโยมอุปถัมภ์ และฐานข้อมูลทะเบียน มจร อัตโนมัติ</p>
          </div>
        </div>
      )}

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
          <span className="text-slate-500 font-medium">คัมภีร์ปทรูปสิทธิ (ชั้น ๒-๓)</span>
          <p className="text-xl font-bold text-amber-900">ผ่านแล้ว ๘๖%</p>
          <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-amber-600 h-full rounded-full w-[86%]" />
          </div>
        </div>

        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
          <span className="text-slate-500 font-medium">คัมภีร์สัททนีติปกรณ์ (ชั้น ๔-๕)</span>
          <p className="text-xl font-bold text-amber-900">ผ่านแล้ว ๗๔%</p>
          <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-amber-600 h-full rounded-full w-[74%]" />
          </div>
        </div>

        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
          <span className="text-slate-500 font-medium">พระปาติโมกข์สังเขป (สิกขาบท)</span>
          <p className="text-xl font-bold text-amber-900">ผ่านแล้ว ๙๒%</p>
          <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mt-2">
            <div className="bg-amber-600 h-full rounded-full w-[92%]" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 font-semibold px-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            <span>คัมภีร์:</span>
          </span>
          {[
            { id: "ALL", label: "ทุกคัมภีร์" },
            { id: "คัมภีร์ปทรูปสิทธิ", label: "ปทรูปสิทธิ" },
            { id: "คัมภีร์สัททนีติปกรณ์", label: "สัททนีติปกรณ์" },
            { id: "พระปาติโมกข์สังเขป", label: "พระปาติโมกข์" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedScriptureFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedScriptureFilter === item.id
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="ค้นหาชื่อสามเณร, คัมภีร์, กัณฑ์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs"
          />
        </div>
      </div>

      {/* Recitation Records List */}
      <div className="space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-600" />
            <span>รายการส่งคลิปเสียงสาธยายและผลการตรวจ (Audio Portfolios)</span>
          </div>
          <span className="text-xs text-slate-500 font-normal">
            แสดง {filteredRecords.length} รายการ
          </span>
        </h2>

        <div className="space-y-3">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{rec.samaneraName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    rec.grade === "EXCELLENT"
                      ? "bg-emerald-100 text-emerald-800"
                      : rec.grade === "GOOD"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {rec.grade === "EXCELLENT" ? "ยอดเยี่ยม (๑๐๐%)" : rec.grade === "GOOD" ? "ดี (ผ่านเกณฑ์)" : "ต้องฝึกซ้อม"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-semibold text-amber-900">{rec.scripture}</span>
                  <span>•</span>
                  <span>{rec.chapter}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px]">
                  <span>ผู้ตรวจ: {rec.evaluator}</span>
                  <span>•</span>
                  <span>ความยาว: {rec.recordingDuration}</span>
                  <span>•</span>
                  <span>วันที่: {rec.date}</span>
                </div>
              </div>

              {/* Audio Play Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => togglePlayAudio(rec.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    playingId === rec.id
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  {playingId === rec.id ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>กำลังเล่นเสียงสาธยาย...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>ฟังเสียงสาธยายบาลี</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Evaluation Modal */}
      {showEvaluationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold text-slate-900 text-base">บันทึกผลการสอบมุขปาฐะ (ปากเปล่า)</h2>
              <button
                type="button"
                onClick={() => setShowEvaluationModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">เลือกศากยบุตรสามเณรผู้สอบ *</label>
                <select
                  value={evalSamaneraId}
                  onChange={(e) => setEvalSamaneraId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 text-xs"
                >
                  {mockSamaneras.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.enrollmentNo} - {s.fullName} ({s.paliName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">คัมภีร์ที่สาธยาย *</label>
                  <select
                    value={evalScripture}
                    onChange={(e) => setEvalScripture(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 text-xs"
                  >
                    <option value="คัมภีร์ปทรูปสิทธิ">คัมภีร์ปทรูปสิทธิ</option>
                    <option value="คัมภีร์สัททนีติปกรณ์">คัมภีร์สัททนีติปกรณ์</option>
                    <option value="พระปาติโมกข์สังเขป">พระปาติโมกข์สังเขป</option>
                    <option value="คัมภีร์มูลกัจจายนะ">คัมภีร์มูลกัจจายนะ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">คะแนนสอบ (๐ - ๑๐๐) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={evalScore}
                    onChange={(e) => handleScoreChange(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 font-mono font-bold text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <span className="text-slate-600">ระดับการประเมินอัตโนมัติ:</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                  evalGrade === "EXCELLENT" ? "bg-emerald-100 text-emerald-800" :
                  evalGrade === "GOOD" ? "bg-blue-100 text-blue-800" : "bg-rose-100 text-rose-800"
                }`}>
                  {evalGrade === "EXCELLENT" ? "ยอดเยี่ยม (ผ่าน ๑๐๐%)" :
                   evalGrade === "GOOD" ? "ดี (ผ่านเกณฑ์มาตรฐาน)" : "ต้องฝึกซ้อมเพิ่มเติม"}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">บท/กัณฑ์ ที่ทดสอบ</label>
                <input
                  type="text"
                  required
                  value={evalChapter}
                  onChange={(e) => setEvalChapter(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ข้อเสนอแนะของพระคัมภีราจารย์</label>
                <textarea
                  rows={2}
                  value={evalNotes}
                  onChange={(e) => setEvalNotes(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 text-xs"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow"
                >
                  บันทึกผลการสอบ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
