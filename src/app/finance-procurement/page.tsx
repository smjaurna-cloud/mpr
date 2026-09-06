"use client";

import React, { useState } from "react";
import { 
  Coins, 
  Package, 
  Search, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck,
  FileSpreadsheet
} from "lucide-react";
import { mockFinanceFunds, mockInventoryList, FinanceFund, InventoryItem } from "@/data/mockData";
import { formatThaiCurrency } from "@/lib/utils";

export default function FinanceProcurementPage() {
  const [funds, setFunds] = useState<FinanceFund[]>(mockFinanceFunds);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryList);
  const [activeTab, setActiveTab] = useState<"funds" | "inventory">("funds");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const totalBudgetSum = funds.reduce((sum, f) => sum + f.totalBudget, 0);
  const totalSpentSum = funds.reduce((sum, f) => sum + f.spentAmount, 0);
  const totalRemainingSum = funds.reduce((sum, f) => sum + f.remainingAmount, 0);

  const filteredInventory = inventory.filter(item => 
    item.name.includes(searchQuery) || 
    item.itemCode.includes(searchQuery) || 
    item.category.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>กลุ่มงานการเงิน บัญชีและพัสดุ & อนุกรรมการการเงินและทรัพย์สิน</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบการเงิน บัญชี ๓ กองทุน & คลังพัสดุสังฆทาน
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            แยกบัญชีงบแผ่นดิน มจร, เงินรายได้ และกองทุนศรัทธาบิณฑบาต พร้อมระบบคุมสต็อกสังฆภัณฑ์และอุปกรณ์การศึกษาบาลี
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setNotification("สร้างใบคำขอเบิกจ่ายพัสดุ/จัดซื้อใหม่เรียบร้อย ส่งเรื่องเข้าสู่สายอนุมัติ");
              setTimeout(() => setNotification(null), 4000);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>ขออนุมัติจัดซื้อ/เบิกจ่ายพัสดุ</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Financial Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-medium">งบประมาณรวมทุกกองทุน</span>
          <p className="text-2xl font-bold text-slate-900">{formatThaiCurrency(totalBudgetSum)}</p>
          <p className="text-[11px] text-slate-400">๓ กองทุนหลักของราชวิทยาลัย</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-medium">เบิกจ่ายไปแล้ว</span>
          <p className="text-2xl font-bold text-amber-700">{formatThaiCurrency(totalSpentSum)}</p>
          <div className="flex items-center gap-2 text-[11px] text-amber-700">
            <span>อัตราการเบิกจ่าย: {((totalSpentSum / totalBudgetSum) * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-slate-500 font-medium">งบคงเหลือพร้อมใช้</span>
          <p className="text-2xl font-bold text-emerald-700">{formatThaiCurrency(totalRemainingSum)}</p>
          <span className="text-[11px] text-emerald-600 font-medium">✓ สภาพคล่องมั่นคง โปร่งใส</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("funds")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            activeTab === "funds"
              ? "border-emerald-600 text-emerald-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          บัญชี ๓ กองทุน (Fund Ledger)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("inventory")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            activeTab === "inventory"
              ? "border-emerald-600 text-emerald-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          คลังพัสดุและสังฆภัณฑ์ (Inventory)
        </button>
      </div>

      {/* TAB 1: Funds Ledger */}
      {activeTab === "funds" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {funds.map((fund) => {
            const pct = (fund.spentAmount / fund.totalBudget) * 100;
            return (
              <div
                key={fund.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm transition-all space-y-3 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                      {fund.sourceType}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{fund.fundName}</h3>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-slate-500">
                    <span>งบประมาณตั้งไว้:</span>
                    <span className="font-semibold text-slate-800">{formatThaiCurrency(fund.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>เบิกจ่ายแล้ว:</span>
                    <span className="font-bold text-amber-700">{formatThaiCurrency(fund.spentAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>คงเหลือสุทธิ:</span>
                    <span className="font-bold text-emerald-700">{formatThaiCurrency(fund.remainingAmount)}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>เบิกจ่ายไป {pct.toFixed(1)}%</span>
                  <span>คงเหลือ {(100 - pct).toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Inventory */}
      {activeTab === "inventory" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-bold text-slate-900 text-sm">รายการสต็อกพัสดุ สังฆภัณฑ์ และตำราเรียนบาลี</h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหารหัสพัสดุ, ชื่อรายการ, หมวด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">รหัสพัสดุ</th>
                  <th className="py-3 px-4">ชื่อรายการพัสดุ</th>
                  <th className="py-3 px-4">หมวดหมู่</th>
                  <th className="py-3 px-4 text-right">จำนวนคงเหลือ</th>
                  <th className="py-3 px-4">สถานที่จัดเก็บ</th>
                  <th className="py-3 px-4 text-center">สถานะสต็อก</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.map((item) => {
                  const isLow = item.stockQty <= item.minAlertQty;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{item.itemCode}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-800">
                        {item.stockQty} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{item.location}</td>
                      <td className="py-3.5 px-4 text-center">
                        {isLow ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                            ใกล้หมด (เติมสต็อก)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            เพียงพอ
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
