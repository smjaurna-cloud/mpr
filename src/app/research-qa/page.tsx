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
  BookOpenCheck
} from "lucide-react";
import { mockResearchProjects, mockQAMetrics, ResearchProject, QAMetric } from "@/data/mockData";
import { formatThaiCurrency } from "@/lib/utils";

export default function ResearchQAPage() {
  const [researchList, setResearchList] = useState<ResearchProject[]>(mockResearchProjects);
  const [qaMetrics, setQaMetrics] = useState<QAMetric[]>(mockQAMetrics);
  const [activeTab, setActiveTab] = useState<"research" | "qa" | "mou">("research");
  const [notification, setNotification] = useState<string | null>(null);

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
            ระบบงานวิจัยพุทธศาสตร์ & ประกันคุณภาพการศึกษา (QA / EdPEx)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            บริหารโครงการวิจัยคัมภีร์บาลี ทุนวิจัย TCI และระบบรวบรวมเอกสารหลักฐานตัวชี้วัด AUN-QA, EdPEx, สมศ. และบันทึกข้อตกลง MOU
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotification("ระบบเปิดแบบฟอร์มขอรับทุนอุดหนุนการวิจัยทางพระพุทธศาสนาประจำปี");
            setTimeout(() => setNotification(null), 4000);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>เสนอโครงการวิจัยใหม่</span>
        </button>
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

      {/* TAB 1: Research Projects */}
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

      {/* TAB 2: QA Metrics */}
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

      {/* TAB 3: Academic MOU */}
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
