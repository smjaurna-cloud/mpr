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
  const [activeTab, setActiveTab] = useState<"research" | "qa">("research");
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
            บริหารโครงการวิจัยคัมภีร์บาลี ทุนวิจัย TCI และระบบรวบรวมเอกสารหลักฐานตัวชี้วัด AUN-QA, EdPEx และ สมศ.
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
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("research")}
          className={`pb-3 px-3 transition-all border-b-2 ${
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
          className={`pb-3 px-3 transition-all border-b-2 ${
            activeTab === "qa"
              ? "border-purple-600 text-purple-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ระบบประกันคุณภาพ (AUN-QA / EdPEx / สมศ.)
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

      {/* TAB 2: Quality Assurance (QA) */}
      {activeTab === "qa" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">การประเมินประกันคุณภาพการศึกษาและหลักฐานอ้างอิง</h2>
              <p className="text-slate-500">สะสมผลการดำเนินงานแบบอัตโนมัติ ไม่ต้องเร่งทำเอกสารปลายปี</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold text-[11px]">
              ผลคะแนนเฉลี่ย: ๔.๖๕ / ๕.๐๐
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
    </div>
  );
}
