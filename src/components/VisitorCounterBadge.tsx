"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Eye, TrendingUp } from "lucide-react";
import { mockVisitorOverview } from "@/data/visitorAnalyticsData";

export const VisitorCounterBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [activeCount, setActiveCount] = useState<number>(mockVisitorOverview.activeNow);
  const [todayVisits, setTodayVisits] = useState<number>(mockVisitorOverview.visitsToday);

  // Subtle fluctuation to simulate real-time live visitors on an enterprise site
  useEffect(() => {
    const interval = setInterval(() => {
      // Random delta between -1 and +2
      const delta = Math.floor(Math.random() * 4) - 1;
      setActiveCount((prev) => Math.max(28, Math.min(65, prev + delta)));
      
      // Gradually increment today's visits periodically
      if (Math.random() > 0.6) {
        setTodayVisits((prev) => prev + 1);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href="/visitor-analytics"
      title="คลิกเพื่อดูสถิติผู้เข้าเยี่ยมชมระบบเชิงลึก (MOD-18: Visitor Analytics)"
      className={`group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white text-xs font-medium border border-amber-400/40 shadow-sm transition-all hover:scale-105 hover:border-amber-400 ${className}`}
    >
      {/* Live Indicator Pulse */}
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <Users className="w-3 h-3 text-emerald-400" />
          <span>สด {activeCount}</span>
        </span>
      </div>

      <span className="w-px h-3 bg-slate-700" />

      {/* Today Visits */}
      <div className="flex items-center gap-1 text-amber-200 text-[11px]">
        <Eye className="w-3 h-3 text-amber-400" />
        <span className="font-mono font-bold text-amber-300">
          {todayVisits.toLocaleString()}
        </span>
        <span className="text-slate-400 text-[10px] hidden sm:inline">ครั้ง</span>
      </div>

      <TrendingUp className="w-3 h-3 text-amber-400/80 group-hover:text-amber-300 transition-colors hidden sm:block" />
    </Link>
  );
};
