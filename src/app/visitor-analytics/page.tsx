"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Printer,
  Download,
  Share2,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  QrCode
} from "lucide-react";
import {
  mockVisitorOverview,
  mockDailyTrends,
  mockHourlyTraffic,
  mockTrafficSources,
  mockDeviceBreakdown,
  mockGeographicVisitors,
  mockTopVisitedRoutes,
} from "@/data/visitorAnalyticsData";

export default function VisitorAnalyticsPage() {
  const [activeNow, setActiveNow] = useState<number>(mockVisitorOverview.activeNow);
  const [selectedPeriod, setSelectedPeriod] = useState<"TODAY" | "7DAYS" | "30DAYS" | "ALL">("7DAYS");
  const [searchRoute, setSearchRoute] = useState("");

  // Subtle real-time visitor fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1;
      setActiveNow((prev) => Math.max(30, Math.min(65, prev + delta)));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleExportCSV = () => {
    const headers = "Route,Title,Category,PageViews,AvgDurationSec,BounceRate\n";
    const rows = mockTopVisitedRoutes
      .map((r) => `"${r.path}","${r.title}","${r.category}",${r.pageViews},${r.avgDurationSec},${r.bounceRatePercent}%`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `visitor-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredRoutes = mockTopVisitedRoutes.filter(
    (r) =>
      r.title.toLowerCase().includes(searchRoute.toLowerCase()) ||
      r.path.toLowerCase().includes(searchRoute.toLowerCase()) ||
      r.category.toLowerCase().includes(searchRoute.toLowerCase())
  );

  const maxDailyVisits = Math.max(...mockDailyTrends.map((d) => d.visits));
  const maxHourlyVisits = Math.max(...mockHourlyTraffic.map((h) => h.visits));

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-8 space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* Header Banner: Sacred Royal Heritage & Analytics Overview     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 md:p-8 shadow-xl border border-amber-500/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOD-18: ศูนย์สถิติสารสนเทศ & ทราฟฟิกผู้เข้าชม (Web Analytics)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-amber-400" />
              สถิติข้อมูลผู้เข้าเยี่ยมชมและปริมาณการใช้งานระบบ
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl">
              Institutional Traffic Intelligence & Audience Analytics • มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
              ติดตามการเข้าชมแบบเรียลไทม์ แหล่งที่มา สัดส่วนอุปกรณ์ และกลุ่มผู้ใช้งานทั้งในและต่างประเทศ
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                อัปเดตข้อมูลล่าสุด: {mockVisitorOverview.lastUpdated} น.
              </span>
              <span>•</span>
              <span>เกณฑ์ความโปร่งใส ITA 100% (PDPA Anonymized)</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์รายงานสรุป (Print)</span>
            </button>
            <button
              onClick={handleExportCSV}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>ส่งออกข้อมูล (Export CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 Primary Metric Cards                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Now */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ออนไลน์ขณะนี้ (Active Now)</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-emerald-600 font-mono">
              {activeNow}
            </span>
            <span className="text-xs text-slate-500 font-medium">รูป / ท่าน</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>พระภิกษุ, สามเณร, โยมอุปถัมภ์, เจ้าหน้าที่</span>
          </p>
        </div>

        {/* Visits Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ผู้เข้าชมวันนี้ (Visits Today)</span>
            <Eye className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 font-mono">
              {mockVisitorOverview.visitsToday.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">ครั้ง</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% เมื่อเทียบกับเมื่อวาน ({mockVisitorOverview.visitsYesterday.toLocaleString()})</span>
          </p>
        </div>

        {/* Visits This Month */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ยอดเข้าชมเดือนนี้ (This Month)</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-blue-700 font-mono">
              {mockVisitorOverview.visitsThisMonth.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">ครั้ง</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            เฉลี่ยวันละ ~๑,๖๕๐ ครั้ง (กันยายน ๒๕๖๙)
          </p>
        </div>

        {/* All-Time Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ยอดเข้าชมสะสมทั้งหมด (All-Time)</span>
            <Globe className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-purple-700 font-mono">
              {mockVisitorOverview.visitsAllTime.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-medium">ครั้ง</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ระบบเริ่มบันทึกสถิติ ๒๕๖๗-๒๕๖๙</span>
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Secondary Performance Indicators                             */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">เวลาเฉลี่ยบนเว็บไซต์ (Avg Time on Site)</p>
            <p className="text-lg font-bold text-slate-900">๔ นาที ๔๕ วินาที <span className="text-xs text-emerald-600">(สูงมาก)</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">อัตราการตีกลับ (Bounce Rate)</p>
            <p className="text-lg font-bold text-slate-900">๒๔.๖% <span className="text-xs text-emerald-600 font-semibold">(ต่ำมาก เกณฑ์ดีเยี่ยม)</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">หน้าเปิดดูเฉลี่ยต่อครั้ง (Pages / Session)</p>
            <p className="text-lg font-bold text-slate-900">๓.๐๒ หน้า <span className="text-xs text-slate-500">/ ผู้เข้าชม</span></p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Traffic Trends Visualizer (Daily & Hourly)                   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                แนวโน้มปริมาณการเข้าชม ๗ วันล่าสุด (Daily Traffic Trend)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                เปรียบเทียบยอดการเข้าชมทั้งหมด (Visits) และผู้เข้าชมไม่ซ้ำ (Unique Visitors)
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="flex items-center gap-1 font-medium text-amber-800">
                <span className="w-3 h-3 rounded bg-amber-600 inline-block" /> ยอดเข้าชม
              </span>
              <span className="mx-1 text-slate-300">|</span>
              <span className="flex items-center gap-1 font-medium text-slate-600">
                <span className="w-3 h-3 rounded bg-slate-300 inline-block" /> ผู้ใช้ไม่ซ้ำ
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-2 space-y-3">
            {mockDailyTrends.map((day) => {
              const visitPct = (day.visits / maxDailyVisits) * 100;
              const uniquePct = (day.uniqueVisitors / maxDailyVisits) * 100;

              return (
                <div key={day.date} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold w-32 truncate">{day.dayName}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{day.date}</span>
                    <span className="font-mono font-bold text-slate-900 ml-auto">
                      {day.visits.toLocaleString()} ครั้ง
                    </span>
                  </div>
                  {/* Dual Bar */}
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${visitPct}%` }}
                      title={`Visits: ${day.visits}`}
                    />
                    <div
                      className="bg-slate-300 rounded-full transition-all duration-500"
                      style={{ width: `${uniquePct}%` }}
                      title={`Unique Visitors: ${day.uniqueVisitors}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>💡 <strong>ข้อสังเกต:</strong> ปริมาณการเข้าชมจะพุ่งสูงที่สุดในวันพระและวันหยุด (เช่น ๖ ก.ย. ยอด ๒,๔๙๐ ครั้ง) จากศรัทธาสาธุชนที่เข้ามาจองภัตตาหารเพลและร่วมอนุโมทนา e-Donation</span>
          </div>
        </div>

        {/* Hourly Distribution (Peak Times) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              ช่วงเวลาเข้าชมในรอบวัน (Peak Hours)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              พฤติกรรมการใช้งานตามกิจวัตรสงฆ์ ๒๔ ชม.
            </p>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            {mockHourlyTraffic.map((item) => {
              const pct = (item.visits / maxHourlyVisits) * 100;
              const isPeak = item.visits >= 290;

              return (
                <div key={item.hour} className="space-y-0.5">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-mono font-medium">{item.hour} น.</span>
                    <span className={`font-mono ${isPeak ? "text-amber-700 font-bold" : "text-slate-500"}`}>
                      {item.visits} ครั้ง {isPeak && "🔥 ช่วงพีก"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPeak ? "bg-amber-600" : "bg-slate-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Traffic Sources & Devices & Geographic Demographics          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-600" />
              แหล่งที่มาของทราฟฟิก (Traffic Sources)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ช่องทางที่นำพาผู้ใช้เข้าสู่ระบบสถาบัน
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {mockTrafficSources.map((source) => (
              <div key={source.sourceName} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    {source.sourceCategory === "QR_CODE" && <QrCode className="w-4 h-4 text-amber-700" />}
                    {source.sourceCategory === "SEARCH_ENGINE" && <Search className="w-4 h-4 text-blue-600" />}
                    {source.sourceCategory === "MCU_PORTAL" && <Globe className="w-4 h-4 text-purple-600" />}
                    {source.sourceCategory === "SOCIAL_MEDIA" && <Share2 className="w-4 h-4 text-emerald-600" />}
                    {source.sourceCategory === "DIRECT" && <ExternalLink className="w-4 h-4 text-slate-600" />}
                    {source.sourceName}
                  </span>
                  <span className="font-mono font-bold text-amber-900 text-sm">
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${source.percentage * 2.5}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>ยอดเข้าชมสะสม</span>
                  <span className="font-mono font-medium">{source.visits.toLocaleString()} ครั้ง</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Technology Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-600" />
              สัดส่วนอุปกรณ์ (Device & Tech Breakdown)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              จำแนกตามมือถือ, คอมพิวเตอร์ และแท็บเล็ต
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {mockDeviceBreakdown.map((dev) => (
              <div key={dev.deviceType} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center gap-2">
                    {dev.deviceType.includes("Mobile") && <Smartphone className="w-4 h-4 text-amber-700" />}
                    {dev.deviceType.includes("Desktop") && <Monitor className="w-4 h-4 text-blue-600" />}
                    {dev.deviceType.includes("Tablet") && <Tablet className="w-4 h-4 text-purple-600" />}
                    {dev.deviceType}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {dev.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      dev.deviceType.includes("Mobile")
                        ? "bg-amber-600"
                        : dev.deviceType.includes("Desktop")
                        ? "bg-blue-600"
                        : "bg-purple-600"
                    }`}
                    style={{ width: `${dev.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>เบราว์เซอร์หลัก: {dev.browserTop}</span>
                  <span className="font-mono">{dev.visits.toLocaleString()} ครั้ง</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
            📱 <strong>Mobile-First Priority:</strong> ผู้ใช้กว่า ๖๘% เข้าใช้งานผ่านโทรศัพท์มือถือ หน้าจอและแบบฟอร์มจึงถูกปรับแต่งให้ตอบสนองบนจอเล็กได้อย่างสมบูรณ์แบบ
          </p>
        </div>

        {/* Geographic & International Visitors */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-600" />
              กลุ่มผู้เข้าชมในประเทศ & นานาชาติ
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เชื่อมโยงเครือข่ายพระพุทธศาสนาเถรวาทสากล
            </p>
          </div>

          <div className="space-y-2.5 text-xs max-h-[380px] overflow-y-auto pr-1">
            {mockGeographicVisitors.map((geo) => (
              <div
                key={geo.regionOrCountry}
                className={`p-3 rounded-xl border transition-colors ${
                  geo.isInternational
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="text-base">{geo.flagEmoji}</span>
                    {geo.regionOrCountry}
                  </span>
                  <span className="font-mono font-bold text-amber-950 text-xs">
                    {geo.visitorsCount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {geo.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Top 10 Most Visited Pages Table                               */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              หน้าที่ได้รับความนิยมสูงสุดในระบบ (Top Visited Pages)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              วิเคราะห์ความสนใจของผู้ใช้งานในแต่ละโมดูลงาน
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาหน้าเพจหรือหมวดหมู่..."
              value={searchRoute}
              onChange={(e) => setSearchRoute(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-12 text-center">อันดับ</th>
                <th className="p-3">ชื่อหน้าเพจ / โมดูล</th>
                <th className="p-3">เส้นทาง (URL Path)</th>
                <th className="p-3">หมวดหมู่งาน</th>
                <th className="p-3 text-right">จำนวนเปิดดู (Views)</th>
                <th className="p-3 text-right">เวลาเปิดดูเฉลี่ย</th>
                <th className="p-3 text-right">อัตราตีกลับ</th>
                <th className="p-3 text-center">เปิดหน้า</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoutes.map((route, idx) => (
                <tr key={route.path} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-center font-mono font-bold text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    {route.title}
                  </td>
                  <td className="p-3 font-mono text-amber-800">
                    {route.path}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      {route.category}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {route.pageViews.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-600">
                    {Math.floor(route.avgDurationSec / 60)}m {route.avgDurationSec % 60}s
                  </td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-semibold">
                    {route.bounceRatePercent}%
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href={route.path}
                      className="inline-flex items-center gap-1 p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-md transition-colors"
                      title="ไปยังหน้าดังกล่าว"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
