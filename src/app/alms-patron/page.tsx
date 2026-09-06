"use client";

import React, { useState } from "react";
import { 
  Utensils, 
  Calendar as CalendarIcon, 
  Heart, 
  Sparkles, 
  Receipt, 
  CheckCircle, 
  Clock, 
  Users, 
  Phone, 
  Share2, 
  Plus,
  QrCode,
  ShieldCheck,
  Eye
} from "lucide-react";
import { mockAlmsBookings, AlmsBookingItem, mockSamaneras } from "@/data/mockData";
import { formatThaiCurrency } from "@/lib/utils";
import A4CertificateModal from "@/components/A4CertificateModal";

export default function AlmsPatronPage() {
  const [bookings, setBookings] = useState<AlmsBookingItem[]>(mockAlmsBookings);
  const [selectedTab, setSelectedTab] = useState<"calendar" | "patron-portal" | "receipts">("calendar");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<AlmsBookingItem | null>(null);

  
  // New Booking Form State
  const [newHostName, setNewHostName] = useState("");
  const [newHostPhone, setNewHostPhone] = useState("");
  const [newDate, setNewDate] = useState("2026-09-09");
  const [newOccasion, setNewOccasion] = useState("");
  const [newAmount, setNewAmount] = useState("10000");
  const [newMenu, setNewMenu] = useState("แกงจืดเต้าหู้หมูสับ, ผัดผักรวม, ไก่ทอดเกลือ");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: AlmsBookingItem = {
      id: `alm-${Date.now()}`,
      date: newDate,
      mealType: "ภัตตาหารเพล",
      hostName: newHostName || "คณะศรัทธาสาธุชน",
      hostPhone: newHostPhone || "081-999-8888",
      occasion: newOccasion || "ถวายมหาทานบารมีภัตตาหารเพล",
      guestCount: 20,
      menu: newMenu,
      amount: parseFloat(newAmount) || 10000,
      status: "CONFIRMED",
      eDonationHash: `EDON-${newDate.replace(/-/g, "")}-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setBookings([newEntry, ...bookings]);
    setShowBookingModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full w-fit">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>MOD-02: กองทุนภัตตาหาร & สายใยโยมอุปถัมภ์ศาสนทายาท</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบจองเจ้าภาพภัตตาหารเพล & สมุดพกดิจิทัล (LINE LIFF)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            เปิดจองภัตตาหารเพลออนไลน์ ออกใบอนุโมทนาบัตร e-Donation สรรพากร และส่งอัปเดตพัฒนาการถึงโยมอุปถัมภ์
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBookingModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>จองเป็นเจ้าภาพภัตตาหารเพล</span>
        </button>
      </div>

      {bookingSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-bold">จองภัตตาหารเพลสำเร็จ!</p>
              <p className="text-[11px] text-emerald-700">ระบบได้ออกรหัส e-Donation และส่งข้อความยืนยันทาง LINE เรียบร้อยแล้ว</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-2 py-1 rounded">
            สถานะ: ยืนยันแล้ว
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setSelectedTab("calendar")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            selectedTab === "calendar"
              ? "border-emerald-600 text-emerald-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ปฏิทินเจ้าภาพภัตตาหารเพล
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("patron-portal")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            selectedTab === "patron-portal"
              ? "border-emerald-600 text-emerald-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          สมุดพกดิจิทัลสำหรับโยมอุปถัมภ์ (LINE View)
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("receipts")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            selectedTab === "receipts"
              ? "border-emerald-600 text-emerald-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ใบอนุโมทนาบัตรอิเล็กทรอนิกส์ (e-Donation)
        </button>
      </div>

      {/* Tab 1: Alms Calendar & Schedule */}
      {selectedTab === "calendar" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookings.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    📅 วันที่: {item.date}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    {item.mealType}
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 text-sm">{item.hostName}</h2>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">{item.occasion}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    โทร: {item.hostPhone} • ผู้ติดตาม: {item.guestCount} ท่าน
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <p className="font-semibold text-slate-700">เมนูภัตตาหาร:</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.menu}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">ยอดบริจาคสมทบ</span>
                    <p className="font-bold text-slate-900">{formatThaiCurrency(item.amount)}</p>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg font-mono">
                    {item.eDonationHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Patron Digital Report Card View (LINE Mobile Preview) */}
      {selectedTab === "patron-portal" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>สมุดพกศากยบุตรดิจิทัล (ส่งตรงถึง LINE โยมอุปถัมภ์)</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              โยมอุปถัมภ์สามารถล็อกอินผ่าน LINE Official Account ของราชวิทยาลัย เพื่อติดตามชีวิต ผลการเรียนบาลี 
              และคลิปเสียงสาธยายพระคัมภีร์ของสามเณรที่ตนรับอุปถัมภ์ได้อย่างใกล้ชิด
            </p>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
              <p className="font-bold text-amber-950">ตัวอย่าง: คุณหญิงกัลยา และครอบครัวโสภณ</p>
              <p className="text-amber-900">
                อุปถัมภ์: <strong className="font-semibold">สามเณร นรินทร์เดช (สิริวฑฺฒโน)</strong>
              </p>
              <p className="text-[11px] text-amber-800">
                ระดับการศึกษา: เตปิฏกบาลีศากยบุตร ชั้น ๓ (เทียบ ป.ธ.๔)
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>ความก้าวหน้าการทรงจำคัมภีร์:</span>
                <span className="font-bold text-emerald-700">๙๘% (ปทรูปสิทธิ สนธิกัณฑ์)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>สุขภาพและการทำวัตร:</span>
                <span className="font-bold text-slate-800">สมบูรณ์แข็งแรง (ครบทุกวัตร)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("ระบบทดสอบส่งข้อความแจ้งเตือนผลการเรียนทาง LINE สำเร็จ!")}
              className="w-full py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>ส่งข้อความอัปเดตถึงโยมอุปถัมภ์ทาง LINE</span>
            </button>
          </div>

          {/* Smartphone Simulator Mockup */}
          <div className="max-w-xs mx-auto p-4 bg-slate-900 rounded-[2.5rem] shadow-2xl border-4 border-slate-700 text-slate-800">
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />
            <div className="bg-[#f2efe9] rounded-2xl p-3.5 space-y-3 text-xs min-h-[420px]">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <span className="font-bold text-amber-900 text-[11px]">LINE: วส. มหาวชิราลงกรณ</span>
                <span className="text-[10px] text-emerald-700 font-semibold">● กำลังเชื่อมต่อ</span>
              </div>

              <div className="p-3 bg-white rounded-xl shadow-sm space-y-2 border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold mx-auto text-sm">
                  สณ
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-xs">สามเณร นรินทร์เดช</p>
                  <p className="text-[10px] text-amber-800 font-serif">ฉายา "สิริวฑฺฒโน"</p>
                </div>
                <div className="text-[10px] text-slate-600 bg-amber-50 p-2 rounded-lg leading-relaxed">
                  "ขอเจริญพรขอบคุณโยมอุปถัมภ์ วันนี้สามเณรสอบสาธยายคัมภีร์ปทรูปสิทธิผ่านเกณฑ์ยอดเยี่ยมแล้ว ขออานุภาพพระรัตนตรัยคุ้มครองโยมและครอบครัว"
                </div>
                <div className="text-center pt-1">
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ คะแนนมุขปาฐะ ๙๘ คะแนน
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Receipts & e-Donation */}
      {selectedTab === "receipts" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">ใบอนุโมทนาบัตรอิเล็กทรอนิกส์ (e-Donation สรรพากร)</h2>
              <p className="text-xs text-slate-500">
                ระบบเชื่อมต่อข้อมูลการลดหย่อนภาษี ๒ เท่าสำหรับสถาบันการศึกษาพระพุทธศาสนา
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-lg">
              API Status: Online
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {bookings.map((b) => (
              <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{b.hostName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">({b.eDonationHash})</span>
                  </div>
                  <p className="text-slate-500">
                    วันที่ {b.date} • {b.occasion}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{formatThaiCurrency(b.amount)}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white rounded-lg font-bold transition-all text-[11px] shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>ใบอนุโมทนาบัตรทองคำ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold text-slate-900 text-base">จองเป็นเจ้าภาพภัตตาหารเพล</h2>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อเจ้าภาพ / คณะศรัทธา *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น คุณสมศักดิ์ และครอบครัว"
                  value={newHostName}
                  onChange={(e) => setNewHostName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="081-xxx-xxxx"
                    value={newHostPhone}
                    onChange={(e) => setNewHostPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">วันที่จองเพล *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">โอกาสการทำบุญ</label>
                <input
                  type="text"
                  placeholder="เช่น ทำบุญวันเกิด, บำเพ็ญกุศลอุทิศ"
                  value={newOccasion}
                  onChange={(e) => setNewOccasion(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">เมนูภัตตาหารที่เตรียมถวาย</label>
                <textarea
                  rows={2}
                  value={newMenu}
                  onChange={(e) => setNewMenu(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ยอดปัจจัยบำรุงวิทยาลัย (บาท)</label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  ยืนยันการจองภัตตาหาร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Sacred Royal Gold A4 Certificate Modal */}
      {selectedCertificate && (
        <A4CertificateModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          data={selectedCertificate}
        />
      )}
    </div>
  );
}
