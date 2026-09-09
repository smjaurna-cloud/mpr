"use client";

import React, { useState, useMemo } from "react";
import {
  Car,
  Bus,
  Truck,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Search,
  Plus,
  Filter,
  FileText,
  Printer,
  Download,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Phone,
  Fuel,
  Wrench,
  Navigation,
  X
} from "lucide-react";
import {
  centralVehicles,
  initialBookings,
  getVehicleFleetStats,
  Vehicle,
  VehicleBooking,
  VehicleCategory,
  BookingStatus,
  BookingPurpose
} from "@/data/vehicleData";

export default function VehicleBookingPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(centralVehicles);
  const [bookings, setBookings] = useState<VehicleBooking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<"fleet" | "bookings" | "timeline">("fleet");
  const [categoryFilter, setCategoryFilter] = useState<string>("ทั้งหมด");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<Vehicle | null>(null);
  const [printingBooking, setPrintingBooking] = useState<VehicleBooking | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    vehicleId: "",
    purpose: "รับ-ส่งพระเถระ/ผู้บริหาร" as BookingPurpose,
    destination: "",
    departureDate: new Date().toISOString().split("T")[0],
    departureTime: "08:30",
    returnDate: new Date().toISOString().split("T")[0],
    returnTime: "16:30",
    monksCount: 1,
    samanerasCount: 0,
    laypeopleCount: 1,
    requesterName: "",
    requesterDept: "สำนักงานวิทยาลัย",
    requesterPhone: "",
    driverRequired: true,
    notes: ""
  });

  // Calculate stats
  const stats = useMemo(() => getVehicleFleetStats(vehicles, bookings), [vehicles, bookings]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchCat = categoryFilter === "ทั้งหมด" || v.category === categoryFilter;
      const matchSearch =
        searchQuery === "" ||
        v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.assignedDriver.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [vehicles, categoryFilter, searchQuery]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus = bookingStatusFilter === "ทั้งหมด" || b.status === bookingStatusFilter;
      const matchSearch =
        searchQuery === "" ||
        b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [bookings, bookingStatusFilter, searchQuery]);

  const handleOpenBookingModal = (v?: Vehicle) => {
    if (v) {
      setSelectedVehicleForBooking(v);
      setFormData((prev) => ({ ...prev, vehicleId: v.id }));
    } else {
      setSelectedVehicleForBooking(null);
      setFormData((prev) => ({ ...prev, vehicleId: vehicles[0].id }));
    }
    setIsBookingModalOpen(true);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenVehicle = vehicles.find((v) => v.id === formData.vehicleId) || vehicles[0];

    const newBooking: VehicleBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: `VB-2569-${String(bookings.length + 90).padStart(3, "0")}`,
      vehicleId: chosenVehicle.id,
      vehiclePlate: chosenVehicle.plateNumber,
      vehicleModel: `${chosenVehicle.brand} ${chosenVehicle.model}`,
      purpose: formData.purpose,
      destination: formData.destination || "ภารกิจตามที่ระบุ",
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      returnDate: formData.returnDate,
      returnTime: formData.returnTime,
      monksCount: Number(formData.monksCount),
      samanerasCount: Number(formData.samanerasCount),
      laypeopleCount: Number(formData.laypeopleCount),
      requesterName: formData.requesterName || "เจ้าหน้าที่ผู้ขอ",
      requesterDept: formData.requesterDept,
      requesterPhone: formData.requesterPhone || "08X-XXX-XXXX",
      driverRequired: formData.driverRequired,
      assignedDriver: formData.driverRequired ? chosenVehicle.assignedDriver : "ขับเอง (ได้รับอนุญาต)",
      status: "รออนุมัติ",
      notes: formData.notes,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    setBookings([newBooking, ...bookings]);
    setIsBookingModalOpen(false);
    setNotification(`บันทึกคำขอจองรถรหัส ${newBooking.bookingCode} เรียบร้อยแล้ว (สถานะ: รออนุมัติ)`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleApproveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: "อนุมัติแล้ว",
            approvedBy: "พระธรรมวชิราจารย์, รศ.ดร.",
            approvalDate: new Date().toISOString().replace("T", " ").substring(0, 16)
          };
        }
        return b;
      })
    );
    setNotification("อนุมัติคำขอใช้ยานพาหนะส่วนกลางเรียบร้อยแล้ว");
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-2xl shadow-sm border border-amber-700/50">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200 bg-amber-900/60 px-3 py-1 rounded-full w-fit border border-amber-600/40">
            <Car className="w-4 h-4 text-amber-300" />
            <span>กลุ่มงานยานพาหนะและอาคารสถานที่ (สำนักงานวิทยาลัย)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            ระบบบริหารยานพาหนะส่วนกลาง & การจองรถราชการ
          </h1>
          <p className="text-xs text-amber-200/80 max-w-2xl leading-relaxed">
            บริหารจัดการยานพาหนะส่วนกลาง ๑๐ คัน ตามพระวินัยและสมณสารูป เพื่อภารกิจรับ-ส่งพระเถระ การนำสามเณรสอบบาลีสนามหลวง การรับภัตตาหารเพล และการบริการวิชาการ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenBookingModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-900/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ขอใช้รถส่วนกลาง (จองรถ)</span>
          </button>
          <a
            href="/vehicles/central-fleet-document.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium border border-white/20 transition-colors"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>เอกสารรถทางการ (PDF)</span>
          </a>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-gray-500 block text-[11px]">รถทั้งหมดในบัญชี</span>
          <span className="text-2xl font-bold text-gray-900 mt-1 block">
            {stats.total} <span className="text-xs font-normal text-gray-500">คัน</span>
          </span>
          <span className="text-[10px] text-amber-700 font-medium">มจร วส. นครปฐม</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs">
          <span className="text-emerald-700 block text-[11px]">พร้อมใช้งาน (ว่าง)</span>
          <span className="text-2xl font-bold text-emerald-800 mt-1 block">
            {stats.available} <span className="text-xs font-normal text-emerald-600">คัน</span>
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">พร้อมรับภารกิจทันที</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-2xs">
          <span className="text-blue-700 block text-[11px]">กำลังปฏิบัติงาน</span>
          <span className="text-2xl font-bold text-blue-800 mt-1 block">
            {stats.onDuty} <span className="text-xs font-normal text-blue-600">คัน</span>
          </span>
          <span className="text-[10px] text-blue-600 font-medium">กำลังเดินทางนอกพื้นที่</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs">
          <span className="text-amber-700 block text-[11px]">จองล่วงหน้าแล้ว</span>
          <span className="text-2xl font-bold text-amber-800 mt-1 block">
            {stats.reserved} <span className="text-xs font-normal text-amber-600">คัน</span>
          </span>
          <span className="text-[10px] text-amber-600 font-medium">มีคิวอนุมัติในรอบสัปดาห์</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-purple-200 shadow-2xs">
          <span className="text-purple-700 block text-[11px]">รอการอนุมัติ</span>
          <span className="text-2xl font-bold text-purple-800 mt-1 block">
            {stats.pendingApprovals} <span className="text-xs font-normal text-purple-600">รายการ</span>
          </span>
          <span className="text-[10px] text-purple-600 font-medium">รอผู้บริหารลงนาม</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
          <span className="text-gray-500 block text-[11px]">ซ่อมบำรุง / ตรวจสภาพ</span>
          <span className="text-2xl font-bold text-gray-700 mt-1 block">
            {stats.maintenance} <span className="text-xs font-normal text-gray-500">คัน</span>
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">สภาพสมบูรณ์ทุกคัน</span>
        </div>
      </div>

      {/* Tabs & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("fleet")}
            className={`pb-2.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "fleet"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>ทำเนียบรถส่วนกลาง (๑๐ คัน)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`pb-2.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "bookings"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>รายการคำขอจองและการอนุมัติ</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
              {bookings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`pb-2.5 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "timeline"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Clock3 className="w-4 h-4" />
            <span>ตารางเวลาและคิวการใช้รถ</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === "fleet" ? "ค้นหาทะเบียน, ยี่ห้อ, คนขับ..." : "ค้นหาปลายทาง, ผู้ขอ, ทะเบียน..."}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white border border-gray-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* =========================================================================
          TAB 1: Fleet Overview (10 Vehicles)
         ========================================================================= */}
      {activeTab === "fleet" && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
            {["ทั้งหมด", "รถตู้โดยสาร", "รถบัสปรับอากาศ", "รถกระบะบรรทุก", "รถยนต์ตรวจการ", "รถสุขาเคลื่อนที่", "รถรางนำเที่ยว", "รถบริการภายใน"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-amber-800 text-white font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vehicle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-2xs hover:shadow-sm hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Header: Order No & Status */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ลำดับที่ ๐{vehicle.orderNo} • {vehicle.code}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                        vehicle.status === "พร้อมใช้งาน"
                          ? "bg-emerald-100 text-emerald-800"
                          : vehicle.status === "กำลังปฏิบัติงาน"
                          ? "bg-blue-100 text-blue-800"
                          : vehicle.status === "จองแล้ว"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {vehicle.status}
                    </span>
                  </div>

                  {/* Thai License Plate Badge */}
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-300 text-center space-y-0.5">
                    <div className="text-[10px] text-amber-700 tracking-wider font-semibold">
                      {vehicle.brand} • {vehicle.category}
                    </div>
                    <div className="text-base font-extrabold text-gray-900 tracking-wide">
                      {vehicle.plateNumber}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      {vehicle.model}
                    </div>
                  </div>

                  {/* Specs Details */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-[10px]">ความจุที่นั่ง</span>
                      <strong className="text-gray-800">{vehicle.capacityDesc}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">ชนิดเชื้อเพลิง</span>
                      <strong className="text-gray-800">{vehicle.fuelType}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">พนักงานขับรถ</span>
                      <strong className="text-gray-800">{vehicle.assignedDriver}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">เลขไมล์สะสม</span>
                      <strong className="text-gray-800 font-mono">{vehicle.currentMileage.toLocaleString()} กม.</strong>
                    </div>
                  </div>

                  {/* Usage Note */}
                  <p className="text-[11px] text-gray-600 leading-relaxed italic">
                    "{vehicle.usageNote}"
                  </p>

                  {/* Features Badges */}
                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 rounded text-[10px]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{vehicle.driverPhone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenBookingModal(vehicle)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>จองคันนี้</span>
                    <ChevronRight className="w-3 h-3 text-amber-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: Bookings & Approvals
         ========================================================================= */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
            {["ทั้งหมด", "รออนุมัติ", "อนุมัติแล้ว", "กำลังเดินทาง", "เสร็จสิ้น"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setBookingStatusFilter(st)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  bookingStatusFilter === st
                    ? "bg-amber-800 text-white font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-xs">
                  ไม่พบรายการคำขอจองรถที่ตรงกับเงื่อนไข
                </div>
              ) : (
                filteredBookings.map((bk) => (
                  <div key={bk.id} className="p-5 hover:bg-amber-50/20 transition-colors space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      {/* Booking Title & Meta */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            {bk.bookingCode}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                            {bk.purpose}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              bk.status === "อนุมัติแล้ว"
                                ? "bg-emerald-100 text-emerald-800"
                                : bk.status === "กำลังเดินทาง"
                                ? "bg-blue-100 text-blue-800"
                                : bk.status === "รออนุมัติ"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {bk.status}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>ปลายทาง: {bk.destination}</span>
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Car className="w-3.5 h-3.5 text-gray-400" />
                            <strong>{bk.vehiclePlate}</strong> ({bk.vehicleModel})
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {bk.departureDate} {bk.departureTime} น. ถึง {bk.returnDate} {bk.returnTime} น.
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            คณะเดินทาง: ภิกษุ {bk.monksCount} รูป • สามเณร {bk.samanerasCount} รูป • ฆราวาส {bk.laypeopleCount} คน
                          </span>
                        </div>
                      </div>

                      {/* Requester & Action Buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start lg:self-center">
                        <div className="text-right text-xs">
                          <div className="font-bold text-gray-900">{bk.requesterName}</div>
                          <div className="text-[11px] text-gray-500">{bk.requesterDept}</div>
                          <div className="text-[10px] text-amber-800">คนขับ: {bk.assignedDriver}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          {bk.status === "รออนุมัติ" && (
                            <button
                              type="button"
                              onClick={() => handleApproveBooking(bk.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              อนุมัติ
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setPrintingBooking(bk)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium border border-gray-200 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-gray-500" />
                            <span>พิมพ์ใบขอใช้รถ</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {bk.notes && (
                      <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 text-[11px] text-amber-900">
                        <span className="font-semibold">หมายเหตุ:</span> {bk.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: Schedule Timeline
         ========================================================================= */}
      {activeTab === "timeline" && (
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="font-bold text-gray-900 text-sm">ตารางเวลาการใช้ยานพาหนะส่วนกลางรายวัน</h2>
              <p className="text-gray-500 text-[11px]">ตรวจสอบคิวรถเพื่อป้องกันเวลาชนกัน และจัดสรรพนักงานขับรถให้สอดคล้องกับภารกิจ</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-[10px]">
              สัปดาห์ปัจจุบัน (กันยายน ๒๕๖๙)
            </span>
          </div>

          <div className="space-y-3">
            {centralVehicles.slice(0, 6).map((veh) => {
              const vehBookings = bookings.filter((b) => b.vehicleId === veh.id);
              return (
                <div key={veh.id} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{veh.plateNumber}</span>
                      <span className="text-gray-500 text-[11px]">({veh.brand} {veh.model})</span>
                    </div>
                    <span className="text-[10px] text-amber-800 font-medium">คนขับประจำ: {veh.assignedDriver}</span>
                  </div>

                  {vehBookings.length === 0 ? (
                    <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                      ✓ ว่างตลอดวัน สามารถจองได้ทันที
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {vehBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-2.5 rounded-lg bg-white border border-amber-200 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                        >
                          <div className="space-y-0.5">
                            <span className="font-bold text-amber-900 block">{b.destination}</span>
                            <span className="text-gray-500">
                              {b.departureDate} ({b.departureTime} - {b.returnTime} น.) • วัตถุประสงค์: {b.purpose}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold self-start sm:self-auto ${
                              b.status === "อนุมัติแล้ว" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {b.status} ({b.requesterName})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: Booking Form
         ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-amber-300 shadow-2xl p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>แบบฟอร์มขออนุมัติใช้ยานพาหนะส่วนกลาง</span>
                </h3>
                <p className="text-gray-500 text-[11px]">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              {/* Select Vehicle */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">เลือกยานพาหนะส่วนกลาง *</label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-500 text-xs bg-white"
                  required
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.plateNumber} — {v.brand} {v.model} ({v.capacityDesc}) [{v.status}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">วัตถุประสงค์การใช้รถ *</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as BookingPurpose })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-500 text-xs bg-white"
                  >
                    <option value="รับ-ส่งพระเถระ/ผู้บริหาร">รับ-ส่งพระเถระ/ผู้บริหาร</option>
                    <option value="นำสามเณรเข้าสอบบาลีสนามหลวง">นำสามเณรเข้าสอบบาลีสนามหลวง</option>
                    <option value="รับบิณฑบาต/ภัตตาหารเพล">รับบิณฑบาต/ภัตตาหารเพล</option>
                    <option value="ศึกษาดูงาน/วิจัยพระไตรปิฎก">ศึกษาดูงาน/วิจัยพระไตรปิฎก</option>
                    <option value="บริการวิชาการชุมชน">บริการวิชาการชุมชน</option>
                    <option value="ขนส่งสังฆภัณฑ์/พัสดุวิทยาลัย">ขนส่งสังฆภัณฑ์/พัสดุวิทยาลัย</option>
                    <option value="นำเที่ยวชมวิทยาลัย">นำเที่ยวชมวิทยาลัย</option>
                    <option value="สนับสนุนงานสุขาภิบาล/พิธีสงฆ์">สนับสนุนงานสุขาภิบาล/พิธีสงฆ์</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">สถานที่ปลายทาง / เส้นทาง *</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="เช่น มจร วังน้อย, วัดไร่ขิง, นครปฐม"
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">วันเดินทางไป</label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">เวลาไป</label>
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">วันเดินทางกลับ</label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">เวลากลับ</label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="w-full p-2 rounded-lg border border-gray-300 text-xs bg-white"
                    required
                  />
                </div>
              </div>

              {/* Passenger Counts */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">จำนวนผู้เดินทางตามสมณสารูป (รูป/คน)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-gray-500 block mb-0.5">พระภิกษุ (รูป)</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.monksCount}
                      onChange={(e) => setFormData({ ...formData, monksCount: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block mb-0.5">สามเณร (รูป)</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.samanerasCount}
                      onChange={(e) => setFormData({ ...formData, samanerasCount: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block mb-0.5">ฆราวาส (คน)</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.laypeopleCount}
                      onChange={(e) => setFormData({ ...formData, laypeopleCount: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-gray-300 text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Requester Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">ชื่อผู้ขอใช้รถ *</label>
                  <input
                    type="text"
                    value={formData.requesterName}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    placeholder="เช่น พระมหา... / อ...."
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">สังกัดกลุ่มงาน / แผนก</label>
                  <input
                    type="text"
                    value={formData.requesterDept}
                    onChange={(e) => setFormData({ ...formData, requesterDept: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                  <input
                    type="text"
                    value={formData.requesterPhone}
                    onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                    placeholder="08X-XXX-XXXX"
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="เช่น ต้องกลับถึงก่อน ๑๑:๐๐ น. เพื่อทันฉันเพล หรือ มีสัมภาระขนาดใหญ่"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold shadow-xs cursor-pointer"
                >
                  ยืนยันการจองรถ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: Printable Request Sheet (Official A4 Format)
         ========================================================================= */}
      {printingBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-gray-300 shadow-2xl p-8 space-y-6 text-xs text-gray-900">
            {/* Action Bar (Top) */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 print:hidden">
              <span className="font-bold text-gray-500">ตัวอย่างใบขออนุมัติใช้ยานพาหนะส่วนกลาง (A4)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์เอกสารนี้</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrintingBooking(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Document Body */}
            <div className="space-y-5 p-6 border border-gray-300 rounded-xl bg-white font-serif">
              {/* Header */}
              <div className="text-center space-y-1 border-b border-gray-200 pb-4">
                <div className="text-base font-bold tracking-wide">มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย</div>
                <div className="text-sm font-semibold text-amber-950">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)</div>
                <div className="text-xs text-gray-600">แบบฟอร์มขออนุมัติใช้ยานพาหนะส่วนกลางเพื่อปฏิบัติศาสนกิจและราชการ</div>
                <div className="text-[11px] font-mono text-gray-500 pt-1">
                  เลขที่คำขอ: <strong>{printingBooking.bookingCode}</strong> | วันที่ยื่นคำขอ: {printingBooking.createdAt}
                </div>
              </div>

              {/* Requester & Trip Details */}
              <div className="space-y-3 leading-relaxed text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>ผู้ขอใช้รถ:</strong> {printingBooking.requesterName}</div>
                  <div><strong>สังกัด:</strong> {printingBooking.requesterDept}</div>
                  <div><strong>เบอร์โทรศัพท์:</strong> {printingBooking.requesterPhone}</div>
                  <div><strong>วัตถุประสงค์:</strong> {printingBooking.purpose}</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                  <div><strong>สถานที่ปลายทาง:</strong> {printingBooking.destination}</div>
                  <div>
                    <strong>กำหนดการเดินทาง:</strong> วันที่ {printingBooking.departureDate} เวลา {printingBooking.departureTime} น. ถึง วันที่ {printingBooking.returnDate} เวลา {printingBooking.returnTime} น.
                  </div>
                  <div>
                    <strong>คณะเดินทาง:</strong> พระภิกษุ {printingBooking.monksCount} รูป, สามเณร {printingBooking.samanerasCount} รูป, ฆราวาส {printingBooking.laypeopleCount} คน (รวมทั้งสิ้น {printingBooking.monksCount + printingBooking.samanerasCount + printingBooking.laypeopleCount} รูป/คน)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div><strong>ยานพาหนะที่จัดสรร:</strong> {printingBooking.vehiclePlate} ({printingBooking.vehicleModel})</div>
                  <div><strong>พนักงานขับรถ:</strong> {printingBooking.assignedDriver}</div>
                </div>

                {printingBooking.notes && (
                  <div><strong>หมายเหตุ:</strong> {printingBooking.notes}</div>
                )}
              </div>

              {/* Signature Blocks */}
              <div className="grid grid-cols-3 gap-4 pt-8 text-center text-[11px]">
                <div className="space-y-10">
                  <div>ลงชื่อ.......................................................</div>
                  <div>({printingBooking.requesterName})<br />ผู้ขอใช้รถ</div>
                </div>

                <div className="space-y-10">
                  <div>ลงชื่อ.......................................................</div>
                  <div>(นายเสน่ห์ แซ่วรัมย์)<br />หัวหน้างานยานพาหนะ</div>
                </div>

                <div className="space-y-10">
                  <div>ลงชื่อ.......................................................</div>
                  <div>(พระธรรมวชิราจารย์, รศ.ดร.)<br />ผู้อำนวยการ / ผู้มีอำนาจอนุมัติ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
