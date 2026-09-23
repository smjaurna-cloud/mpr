"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  QrCode,
  Wifi,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Share,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface MobileInfoData {
  primaryIp: string;
  port: string;
  mobileUrl: string;
  addresses: { iface: string; ip: string; isWifi: boolean }[];
  qrCodeDataUrl: string;
  instructions: {
    android: {
      os: string;
      brands: string[];
      browsers: string[];
      steps: string[];
    };
    ios: {
      os: string;
      devices: string[];
      browsers: string[];
      steps: string[];
    };
  };
}

export default function MobileConnectPage() {
  const [data, setData] = useState<MobileInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "android" | "ios">("all");

  const fetchMobileInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/mobile-info");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to load mobile info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobileInfo();
  }, []);

  const handleCopy = () => {
    if (!data?.mobileUrl) return;
    navigator.clipboard.writeText(data.mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-600/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold">
              <Wifi className="w-3.5 h-3.5 text-amber-300" />
              <span>ระบบเชื่อมต่อโทรศัพท์มือถือผ่าน Wi-Fi (Local LAN)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-100">
              สแกน QR Code เข้าใช้งานบนสมาร์ตโฟน
            </h1>
            <p className="text-sm text-amber-200/90 leading-relaxed">
              รองรับระบบปฏิบัติการหลักของโทรศัพท์มือถือครบถ้วนทั้ง{" "}
              <strong className="text-white">Android</strong> (Samsung, Xiaomi, OPPO, Vivo, Realme) และ{" "}
              <strong className="text-white">iOS</strong> (iPhone & iPad ทุกรุ่น) พร้อมติดตั้งเป็นแอป PWA Standalone
            </p>
          </div>

          <button
            type="button"
            onClick={fetchMobileInfo}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-semibold transition-colors border border-white/10 self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>รีเฟรช IP</span>
          </button>
        </div>
      </div>

      {/* Main Grid: QR Code + Connection Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* QR Code Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-md border border-amber-200/80 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-full text-left border-b border-amber-100 pb-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              ส่องกล้องเพื่อเปิดระบบ
            </span>
            <p className="text-xs text-slate-500">
              เชื่อม Wi-Fi เดียวกัน แล้วใช้กล้องมือถือสแกน
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 shadow-inner flex items-center justify-center relative min-h-[260px] w-full max-w-[280px]">
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-amber-800">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-600" />
                <span className="text-xs font-medium">กำลังตรวจหา IP และสร้าง QR...</span>
              </div>
            ) : data?.qrCodeDataUrl ? (
              <div className="relative group">
                <Image
                  src={data.qrCodeDataUrl}
                  alt="QR Code สำหรับเปิดบนมือถือ"
                  width={240}
                  height={240}
                  className="rounded-xl shadow-xs transition-transform group-hover:scale-105 duration-200"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-amber-950/20 backdrop-blur-[1px] rounded-xl">
                  <span className="text-xs font-bold text-white bg-amber-900/90 px-3 py-1.5 rounded-lg shadow-sm">
                    แตะกล้องสแกน
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400">
                <QrCode className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p>ไม่สามารถสร้าง QR Code ได้</p>
              </div>
            )}
          </div>

          {/* Direct URL Box */}
          <div className="w-full space-y-2">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block text-left">
              ที่อยู่ URL บนวงเครือข่ายเดียวกัน
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={data?.mobileUrl || "http://localhost:3001"}
                className="bg-transparent text-xs font-mono font-bold text-slate-800 px-2 flex-1 outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-left">
              สามารถพิมพ์ที่อยู่ด้านบนลงในเบราว์เซอร์ Chrome หรือ Safari บนมือถือได้เช่นกัน
            </p>
          </div>

          {/* Network Adapters Found */}
          {data?.addresses && data.addresses.length > 0 && (
            <div className="w-full pt-3 border-t border-slate-100 text-left space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                การเชื่อมต่อเครือข่ายที่พบในเครื่อง:
              </span>
              <div className="space-y-1">
                {data.addresses.map((addr) => (
                  <div
                    key={addr.ip}
                    className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-amber-50/50 border border-amber-200/50"
                  >
                    <div className="flex items-center gap-1.5">
                      <Wifi className={`w-3.5 h-3.5 ${addr.isWifi ? "text-emerald-600" : "text-slate-400"}`} />
                      <span className="font-medium text-slate-700">{addr.iface}</span>
                      {addr.isWifi && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Wi-Fi
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-amber-900 font-bold text-[11px]">{addr.ip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Operating Systems Guides (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* OS Switcher Filter */}
          <div className="flex items-center gap-2 p-1.5 bg-amber-100/60 rounded-2xl border border-amber-200/80">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-amber-950 shadow-sm"
                  : "text-slate-600 hover:text-amber-900"
              }`}
            >
              แสดงทั้งสองระบบ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("android")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "android"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-slate-600 hover:text-emerald-900"
              }`}
            >
              เฉพาะ Android
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ios")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ios"
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-600 hover:text-blue-900"
              }`}
            >
              เฉพาะ Apple iOS
            </button>
          </div>

          {/* Android Guide Card */}
          {(activeTab === "all" || activeTab === "android") && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-xs">
                    🤖
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-slate-800">
                      Android (แอนดรอยด์)
                    </h2>
                    <p className="text-xs text-emerald-800 font-medium">
                      Samsung, Xiaomi, OPPO, Vivo, Realme, Google Pixel
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  Chrome / WebAPK
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๑
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">เชื่อมต่อ Wi-Fi:</strong> ให้โทรศัพท์เชื่อมต่อกับ Wi-Fi เดียวกันกับคอมพิวเตอร์เครื่องนี้
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๒
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">สแกน QR Code:</strong> เปิดแอปกล้องถ่ายรูป หรือ Google Lens ส่องที่ภาพ QR Code ด้านซ้าย แล้วกดเปิดลิงก์
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๓
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">ติดตั้งลงเครื่อง (Add to Home):</strong> เมื่อเปิดหน้าเว็บใน Chrome จะมีปุ่ม{" "}
                    <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold text-[11px]">
                      &quot;ติดตั้งแอป&quot;
                    </span>{" "}
                    ปรากฏขึ้นมา หรือแตะเมนูจุดสามจุด <strong className="text-slate-900">⋮</strong> มุมขวาบน แล้วเลือก{" "}
                    <strong className="text-emerald-700">&quot;ติดตั้งแอป&quot;</strong> หรือ &quot;เพิ่มลงหน้าจอหลัก&quot;
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๔
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">ใช้งานเต็มจอ:</strong> ไอคอนตราสัญลักษณ์วิทยาลัยจะอยู่บนหน้าจอโทรศัพท์ เปิดใช้งานได้เร็วเสมือนแอปพลิเคชันจริง
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS Guide Card */}
          {(activeTab === "all" || activeTab === "ios") && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-blue-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center font-bold text-sm shadow-xs">
                    🍎
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-slate-800">
                      iOS (ไอโอเอส)
                    </h2>
                    <p className="text-xs text-blue-800 font-medium">
                      Apple iPhone & iPad ทุกรุ่น (รองรับ Dynamic Island & Notch)
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
                  Safari Standalone
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๑
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">เชื่อมต่อ Wi-Fi:</strong> ให้ iPhone หรือ iPad เชื่อมต่อกับเครือข่าย Wi-Fi เดียวกัน
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๒
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">สแกนด้วยกล้อง iPhone:</strong> เปิดแอปกล้อง (Camera) ส่อง QR Code จะมีแถบสีเหลืองแจ้งเตือนขึ้นมา ให้แตะเพื่อเปิดใน Safari
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๓
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">แตะปุ่มแชร์ [Share]:</strong> ที่แถบด้านล่างสุดของหน้าจอ Safari แตะไอคอนแชร์{" "}
                    <Share className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" /> (กล่องสี่เหลี่ยมลูกศรชี้ขึ้น)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๔
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">เลือก &quot;เพิ่มไปยังหน้าจอโฮม&quot; (Add to Home Screen):</strong>{" "}
                    เลื่อนลงมาแล้วแตะเลือก &quot;เพิ่มไปยังหน้าจอโฮม&quot; จากนั้นแตะ &quot;เพิ่ม&quot; (Add) มุมขวาบน
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ๕
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">เปิดใช้งาน:</strong> แตะไอคอนทองคำ &quot;วส. มจร ERP&quot; บนหน้าจอโฮม ระบบจะเปิดขึ้นมาแบบเต็มจอ (Standalone) ไม่มีแถบ Safari บังหน้าจอ
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Return to Dashboard */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-amber-700" />
              <span className="text-xs font-bold text-amber-950">
                พร้อมใช้งานบนคอมพิวเตอร์เครื่องนี้ด้วยหรือไม่?
              </span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>ไปที่แดชบอร์ด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
