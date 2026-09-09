"use client";

import React, { useState, useMemo } from "react";
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Calendar,
  Layers,
  Sparkles,
  Coins,
  Building,
  Sun,
  Bot,
  Scroll,
  Search,
  Printer,
  FileSpreadsheet,
  Check,
  Briefcase,
  GraduationCap,
  Microscope,
  Info,
  ChevronDown,
  ChevronRight,
  Download
} from "lucide-react";
import { mockStrategicKPIs, StrategicPlanKPI } from "@/data/mockData";
import { 
  budget2569Summary, 
  budget2569Items, 
  getBudgetProgramStats,
  BudgetItem 
} from "@/data/budget2569Data";

export default function PlanningBudgetPage() {
  // Tabs: "BUDGET_69" or "STRATEGIC_KPIS"
  const [activeTab, setActiveTab] = useState<"BUDGET_69" | "STRATEGIC_KPIS">("BUDGET_69");

  // Budget 2569 state
  const [budgetSearch, setBudgetSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string>("ALL");
  const [onlyInvestment, setOnlyInvestment] = useState(false);
  const [onlyProjects, setOnlyProjects] = useState(false);

  // Strategic KPI state
  const [kpis] = useState<StrategicPlanKPI[]>(mockStrategicKPIs);
  const [selectedPillar, setSelectedPillar] = useState<string>("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const programStats = useMemo(() => getBudgetProgramStats(), []);

  // Filter budget items
  const filteredBudgetItems = useMemo(() => {
    return budget2569Items.filter((item) => {
      // Program filter
      if (selectedProgram !== "ALL" && item.program !== selectedProgram) {
        return false;
      }
      // Only investment filter
      if (onlyInvestment) {
        const isInv = item.category.includes("ค่าครุภัณฑ์") || 
                      item.category.includes("ค่าที่ดินและสิ่งก่อสร้าง") || 
                      item.name.includes("งบลงทุน");
        if (!isInv) return false;
      }
      // Only projects filter
      if (onlyProjects) {
        const isProj = item.name.includes("โครงการ") || 
                       item.category.includes("โครงการ") || 
                       item.category.includes("วิจัย");
        if (!isProj) return false;
      }
      // Search query
      if (budgetSearch) {
        const q = budgetSearch.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedProgram, onlyInvestment, onlyProjects, budgetSearch]);

  // Format currency
  const formatCurrency = (val: number) => {
    return val.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Filter KPIs
  const filteredKpis = kpis.filter(k => 
    selectedPillar === "ALL" || k.pillar.includes(selectedPillar)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Coins className="w-80 h-80" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-amber-100 text-xs font-medium mb-3 backdrop-blur-xs border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>กลุ่มงานวางแผนและงบประมาณ | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            ระบบแผนงบประมาณ & ยุทธศาสตร์วิทยาลัย (Budget & Strategy)
          </h1>
          <p className="text-amber-100/90 text-sm max-w-3xl leading-relaxed">
            กรอบงบประมาณรายจ่ายประจำปีงบประมาณ พ.ศ. ๒๕๖๙ ครั้งที่ ๑ (๘๑.๓๙ ล้านบาท) สอดคล้องตามแผนยุทธศาสตร์ ๕ ปี 
            ของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เพื่อการสร้างศาสนทายาทและพลังงานหมุนเวียนพุทธสถาน
          </p>

          {/* Tab Switcher & Official File Download */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("BUDGET_69")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "BUDGET_69"
                    ? "bg-white text-amber-900 shadow-md"
                    : "bg-amber-900/40 text-amber-100 hover:bg-amber-900/70 border border-amber-500/30"
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>กรอบงบประมาณ พ.ศ. ๒๕๖๙ (เอกสารจริง ๘๑.๓๙ ลบ.)</span>
              </button>
              <button
                onClick={() => setActiveTab("STRATEGIC_KPIS")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "STRATEGIC_KPIS"
                    ? "bg-white text-amber-900 shadow-md"
                    : "bg-amber-900/40 text-amber-100 hover:bg-amber-900/70 border border-amber-500/30"
                }`}
              >
                <Target className="w-4 h-4" />
                <span>แผนยุทธศาสตร์ ๕ ปี & KPI วส. มจร</span>
              </button>
            </div>

            <a
              href="/budget/กรอบงบประมาณ 2569 ปรับปรุง ไตรมาส 3.pdf"
              download="กรอบงบประมาณ 2569 ปรับปรุง ไตรมาส 3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border border-emerald-400/40"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดเอกสารจริง PDF (๘๑.๓๙ ลบ.)</span>
            </a>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: OFFICIAL BUDGET FY 2569 (81.39M) */}
      {/* ========================================================================= */}
      {activeTab === "BUDGET_69" && (
        <div className="space-y-6">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-amber-900 font-semibold mb-1">
                <span>งบประมาณรวมทั้งสิ้น</span>
                <span className="p-1 rounded bg-amber-100 text-amber-800 text-[10px]">ปี ๒๕๖๙</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(budget2569Summary.grandTotal)}
              </div>
              <div className="text-xs text-gray-500 mt-1">บาท (๑๐๐%)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-blue-900 font-semibold mb-1">
                <span>งบประมาณแผ่นดิน</span>
                <span className="p-1 rounded bg-blue-100 text-blue-800 text-[10px]">๔๒.๖๔%</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {formatCurrency(budget2569Summary.totalGovBudget)}
              </div>
              <div className="text-xs text-gray-500 mt-1">บาท (จากรัฐบาล)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-emerald-900 font-semibold mb-1">
                <span>งบประมาณรายได้มหาวิทยาลัย</span>
                <span className="p-1 rounded bg-emerald-100 text-emerald-800 text-[10px]">๕๗.๓๖%</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700">
                {formatCurrency(budget2569Summary.totalUnivRevenue)}
              </div>
              <div className="text-xs text-gray-500 mt-1">บาท (เงินรายได้ มจร)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs text-purple-900 font-semibold mb-1">
                <span>งบลงทุน (ครุภัณฑ์ & อาคาร)</span>
                <span className="p-1 rounded bg-purple-100 text-purple-800 text-[10px]">๔๙.๙๓%</span>
              </div>
              <div className="text-2xl font-bold text-purple-700">
                ๔๐,๖๓๘,๑๐๐.๐๐
              </div>
              <div className="text-xs text-gray-500 mt-1">บาท (หอประชุม & โซลาร์เซลล์)</div>
            </div>
          </div>

          {/* Strategic Highlights Cards */}
          <div className="bg-white rounded-xl border border-amber-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>โครงการลงทุนและยุทธศาสตร์สำคัญ พ.ศ. ๒๕๖๙</span>
              </h3>
              <span className="text-xs text-gray-500">เอกสารอนุมัติครั้งที่ ๑</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Hall */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Building className="w-4 h-4 text-amber-700" />
                  <span>ค่าก่อสร้างอาคารหอประชุม</span>
                </div>
                <div className="text-lg font-bold text-amber-950">๒๔,๘๖๒,๗๐๐ บาท</div>
                <p className="text-[11px] text-gray-600 mt-1">
                  งบแผ่นดิน ๒๒.๘๖ ลบ. + งบรายได้ ๒.๐๐ ลบ.
                </p>
              </div>

              {/* Solar Rooftop */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Sun className="w-4 h-4 text-amber-700" />
                  <span>Solar Rooftop ๓ อาคาร</span>
                </div>
                <div className="text-lg font-bold text-amber-950">๗,๕๖๒,๔๐๐ บาท</div>
                <p className="text-[11px] text-gray-600 mt-1">
                  หอฉัน, สำนักงาน, อเนกประสงค์ (อาคารละ ๒.๕๒ ลบ.)
                </p>
              </div>

              {/* Buddhist AI */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Bot className="w-4 h-4 text-amber-700" />
                  <span>พุทธปัญญาประดิษฐ์ (BAI)</span>
                </div>
                <div className="text-lg font-bold text-amber-950">๓๐๐,๐๐๐ บาท</div>
                <p className="text-[11px] text-gray-600 mt-1">
                  พัฒนา Buddhist AI เพื่อการศึกษาพระไตรปิฎก
                </p>
              </div>

              {/* Tipitaka Sangayana */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Scroll className="w-4 h-4 text-amber-700" />
                  <span>สังคายนานานาชาติ & แปลคัมภีร์</span>
                </div>
                <div className="text-lg font-bold text-amber-950">๗๐๐,๐๐๐ บาท</div>
                <p className="text-[11px] text-gray-600 mt-1">
                  พระไตรปิฎกฉบับมหาวชิราลงกรณ & แปลฎีกา
                </p>
              </div>
            </div>
          </div>

          {/* Program Distribution Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-800">
              การจัดสรรงบประมาณตาม ๓ แผนงานหลัก
            </h3>
            <div className="space-y-3">
              {programStats.map((p, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className="font-mono text-gray-700">
                      {formatCurrency(p.totalBudget)} บาท ({p.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-amber-600 h-full"
                      style={{ width: `${(p.govBudget / p.totalBudget) * 100}%` }}
                      title={`งบแผ่นดิน: ${formatCurrency(p.govBudget)} บาท`}
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${(p.univRevenue / p.totalBudget) * 100}%` }}
                      title={`งบรายได้มหาวิทยาลัย: ${formatCurrency(p.univRevenue)} บาท`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>งบแผ่นดิน: {formatCurrency(p.govBudget)} บาท</span>
                    <span>งบรายได้: {formatCurrency(p.univRevenue)} บาท</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 text-xs">
                <button
                  onClick={() => {
                    setSelectedProgram("ALL");
                    setOnlyInvestment(false);
                    setOnlyProjects(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedProgram === "ALL" && !onlyInvestment && !onlyProjects
                      ? "bg-white font-semibold text-gray-900 shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  ทั้งหมด
                </button>
                <button
                  onClick={() => {
                    setSelectedProgram("แผนงานบุคลากรภาครัฐ");
                    setOnlyInvestment(false);
                    setOnlyProjects(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedProgram === "แผนงานบุคลากรภาครัฐ"
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  บุคลากร (๘.๔๕ ลบ.)
                </button>
                <button
                  onClick={() => {
                    setSelectedProgram("แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต");
                    setOnlyInvestment(false);
                    setOnlyProjects(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedProgram === "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต" && !onlyInvestment && !onlyProjects
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  พัฒนาศักยภาพคน (๗๑.๗๕ ลบ.)
                </button>
                <button
                  onClick={() => {
                    setSelectedProgram("แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม");
                    setOnlyInvestment(false);
                    setOnlyProjects(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedProgram === "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม"
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "text-gray-600"
                  }`}
                >
                  วิจัยและนวัตกรรม (๑.๒๐ ลบ.)
                </button>
              </div>

              {/* Quick pills */}
              <button
                onClick={() => {
                  setOnlyInvestment(!onlyInvestment);
                  setOnlyProjects(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  onlyInvestment
                    ? "bg-purple-50 text-purple-700 border-purple-300 font-bold"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                🏢 เฉพาะงบลงทุน (๔๐.๖ ลบ.)
              </button>

              <button
                onClick={() => {
                  setOnlyProjects(!onlyProjects);
                  setOnlyInvestment(false);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  onlyProjects
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                🎓 เฉพาะโครงการวิชาการ/อบรม
              </button>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหารายการ, โครงการ..."
                  value={budgetSearch}
                  onChange={(e) => setBudgetSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors shrink-0"
              >
                <Printer className="w-3.5 h-3.5 text-gray-600" />
                <span>พิมพ์รายงาน</span>
              </button>
            </div>
          </div>

          {/* Master Budget Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-gray-800">
                  ตารางกรอบงบประมาณรายจ่ายประจำปี พ.ศ. ๒๕๖๙ (ครั้งที่ ๑)
                </span>
                <span className="text-xs text-gray-500">
                  ({filteredBudgetItems.length} รายการ)
                </span>
              </div>
              <div className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                วส. มจร
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50/70 border-b border-amber-200/80 text-amber-900 font-semibold">
                  <tr>
                    <th className="py-3 px-4">แผนงาน / ผลผลิต / โครงการ</th>
                    <th className="py-3 px-4 w-36 text-right">งบประมาณแผ่นดิน</th>
                    <th className="py-3 px-4 w-40 text-right">งบประมาณรายได้ มจร</th>
                    <th className="py-3 px-4 w-36 text-right">รวมทั้งสิ้น (บาท)</th>
                    <th className="py-3 px-4 w-20 text-center">สัดส่วน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {/* Grand total top row */}
                  <tr className="bg-amber-100/60 font-bold text-amber-950 border-b-2 border-amber-300">
                    <td className="py-3 px-4 text-sm">รวมทั้งสิ้นทั้งระบบ</td>
                    <td className="py-3 px-4 text-right font-mono">
                      {formatCurrency(budget2569Summary.totalGovBudget)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      {formatCurrency(budget2569Summary.totalUnivRevenue)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-amber-900">
                      {formatCurrency(budget2569Summary.grandTotal)}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">100.00%</td>
                  </tr>

                  {filteredBudgetItems.map((item) => {
                    const isLvl1 = item.level === 1;
                    const isLvl2 = item.level === 2;
                    const isLvl3 = item.level === 3;
                    const isLvl4 = item.level === 4;

                    const rowBg = isLvl1
                      ? "bg-amber-50 font-bold text-amber-900"
                      : isLvl2
                      ? "bg-gray-50/70 font-semibold text-gray-900"
                      : isLvl3
                      ? "bg-white font-medium text-gray-800"
                      : "bg-white text-gray-600 hover:bg-amber-50/30";

                    const indentClass = isLvl1
                      ? "pl-4"
                      : isLvl2
                      ? "pl-7"
                      : isLvl3
                      ? "pl-10"
                      : "pl-14 text-[11px]";

                    const pct = ((item.totalBudget / budget2569Summary.grandTotal) * 100).toFixed(2);

                    return (
                      <tr key={item.id} className={`${rowBg} transition-colors`}>
                        <td className={`py-2.5 pr-4 ${indentClass}`}>
                          {item.name}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono">
                          {item.govBudget > 0 ? formatCurrency(item.govBudget) : "-"}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono">
                          {item.univRevenue > 0 ? formatCurrency(item.univRevenue) : "-"}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-medium text-gray-900">
                          {formatCurrency(item.totalBudget)}
                        </td>
                        <td className="py-2.5 px-4 text-center font-mono text-[10px] text-gray-500">
                          {item.totalBudget > 0 ? `${pct}%` : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monastic Certification & Sign-off Block */}
          <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>การรับรองและบันทึกข้อมูลกรอบงบประมาณตามระเบียบสงฆ์ มจร</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-100 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                <span className="text-gray-500 font-medium">ผู้บันทึกเอกสาร:</span>
                <p className="font-bold text-gray-900">{budget2569Summary.recorderName}</p>
                <p className="text-[10px] text-gray-500">
                  บันทึก: {budget2569Summary.recordedDate}
                </p>
                <p className="text-[10px] text-gray-500">
                  พิมพ์: {budget2569Summary.printedDate}
                </p>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-lg space-y-1 border border-amber-200/60">
                <span className="text-amber-800 font-medium">รับรองตามนี้:</span>
                <p className="font-bold text-amber-950">
                  {budget2569Summary.approvers[0].name}
                </p>
                <p className="text-[11px] text-amber-800">
                  {budget2569Summary.approvers[0].role}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1">
                  <Check className="w-3 h-3" />
                  <span>รับรองความถูกต้อง</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-lg space-y-1 border border-amber-200/60">
                <span className="text-amber-800 font-medium">รับรองตามนี้:</span>
                <p className="font-bold text-amber-950">
                  {budget2569Summary.approvers[1].name}
                </p>
                <p className="text-[11px] text-amber-800">
                  {budget2569Summary.approvers[1].role}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1">
                  <Check className="w-3 h-3" />
                  <span>รับรองความถูกต้อง</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STRATEGIC KPIS (5-YEAR PLAN) */}
      {/* ========================================================================= */}
      {activeTab === "STRATEGIC_KPIS" && (
        <div className="space-y-6">
          {/* Header Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                ตัวชี้วัดความสำเร็จตามแผนยุทธศาสตร์ ๕ ปี (Strategic Plan KPIs)
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                กำกับตัวชี้วัดความสำเร็จการสร้างศาสนทายาท การผลิตบัณฑิต และการเบิกจ่ายงบประมาณ
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setNotification("ระบบเปิดแบบฟอร์มจัดทำข้อเสนอโครงการและคำของบประมาณประจำปี ๒๕๗๐");
                setTimeout(() => setNotification(null), 4000);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>เสนอโครงการ/คำของบใหม่</span>
            </button>
          </div>

          {/* KPI Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 font-medium">ตัวชี้วัดยุทธศาสตร์ทั้งหมด</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{kpis.length} ตัวชี้วัด</p>
              <span className="text-[10px] text-slate-400">ครอบคลุม ๓ ยุทธศาสตร์หลัก</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 font-medium">บรรลุเกินเป้าหมาย</span>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {kpis.filter(k => k.status === "EXCEEDED").length} ตัวชี้วัด
              </p>
              <span className="text-[10px] text-emerald-600">✓ มุขปาฐะ & กัมมัฏฐาน</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 font-medium">ดำเนินงานตามแผน</span>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {kpis.filter(k => k.status === "ON_TRACK").length} ตัวชี้วัด
              </p>
              <span className="text-[10px] text-blue-600">● สอบสนามหลวง & นานาชาติ</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 font-medium">ความก้าวหน้ารวม</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">๗๙.๔%</p>
              <span className="text-[10px] text-emerald-600">+12% เทียบปีก่อน</span>
            </div>
          </div>

          {/* Filter by Strategic Pillar */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedPillar("ALL")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPillar === "ALL" ? "bg-amber-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
              }`}
            >
              ทุกยุทธศาสตร์
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๑")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPillar === "ยุทธศาสตร์ที่ ๑" ? "bg-amber-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
              }`}
            >
              ยุทธศาสตร์ ๑: ความเป็นเลิศพระไตรปิฎก
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๒")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPillar === "ยุทธศาสตร์ที่ ๒" ? "bg-amber-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
              }`}
            >
              ยุทธศาสตร์ ๒: ศาสนทายาทศีล สมาธิ ปัญญา
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("ยุทธศาสตร์ที่ ๓")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedPillar === "ยุทธศาสตร์ที่ ๓" ? "bg-amber-600 text-white shadow-sm" : "bg-white text-slate-600 border hover:bg-slate-50"
              }`}
            >
              ยุทธศาสตร์ ๓: บูรณาการสู่สากล
            </button>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {filteredKpis.map((kpi) => (
              <div
                key={kpi.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-amber-700 text-[11px] bg-amber-50 px-2 py-0.5 rounded">
                      {kpi.kpiCode}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{kpi.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{kpi.pillar}</p>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    kpi.status === "EXCEEDED" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {kpi.status === "EXCEEDED" ? "เกินเป้าหมาย" : "ตามเป้าหมาย"}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">เป้าหมายตามแผน:</span>
                    <span className="font-bold text-slate-800">{kpi.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ผลงานปัจจุบัน:</span>
                    <span className="font-bold text-emerald-700">{kpi.actual}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        kpi.percentage >= 100 ? "bg-emerald-600" : "bg-amber-600"
                      }`}
                      style={{ width: `${Math.min(kpi.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>ความสำเร็จ</span>
                    <span className="font-bold text-slate-700">{kpi.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
