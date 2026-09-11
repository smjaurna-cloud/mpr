"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ExternalLink,
  Building2,
  Copy,
  Sparkles,
  Car,
  Download,
  Eye,
  ChevronRight,
} from "lucide-react";
import {
  mainCollegeContact,
  officialCampusBuildings,
  campusLandInfo,
} from "@/data/contactDirectoryData";

interface CampusMapCardProps {
  onCopy: (text: string, label: string) => void;
  onOpenDocViewer: () => void;
}

export default function CampusMapCard({ onCopy, onOpenDocViewer }: CampusMapCardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Physical Address & Key Details */}
        <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>ที่ตั้งและข้อมูลทางการสถาบัน</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ศูนย์กลางการศึกษาพระบาลีและการปฏิบัติวิปัสสนากัมมัฏฐาน
            </p>
          </div>

          {/* Thai Address */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-2">
            <p className="text-xs font-semibold text-amber-900">ที่อยู่ภาษาไทย:</p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {mainCollegeContact.address.fullAddressThai}
            </p>
            <button
              type="button"
              onClick={() => onCopy(mainCollegeContact.address.fullAddressThai, "ที่อยู่ภาษาไทย")}
              className="text-[11px] text-amber-800 font-semibold hover:underline flex items-center gap-1 mt-1"
            >
              <Copy className="w-3 h-3" />
              <span>คัดลอกที่อยู่ภาษาไทย</span>
            </button>
          </div>

          {/* English Address */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-xs font-semibold text-slate-900">Official English Address:</p>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {mainCollegeContact.address.fullAddressEng}
            </p>
            <button
              type="button"
              onClick={() => onCopy(mainCollegeContact.address.fullAddressEng, "ที่อยู่ภาษาอังกฤษ")}
              className="text-[11px] text-slate-700 font-semibold hover:underline flex items-center gap-1 mt-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy English Address</span>
            </button>
          </div>

          {/* GPS Coordinates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">พิกัดทางภูมิศาสตร์ (GPS):</span>
              <span className="font-mono font-bold text-slate-800">
                {mainCollegeContact.coordinates.lat}° N, {mainCollegeContact.coordinates.lng}° E
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    `${mainCollegeContact.coordinates.lat}, ${mainCollegeContact.coordinates.lng}`,
                    "พิกัด GPS"
                  )
                }
                className="flex-1 py-2 px-3 rounded-lg border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอกพิกัด</span>
              </button>
              <a
                href={mainCollegeContact.coordinates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>เปิดใน Google Maps</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Box */}
          <div className="pt-4 border-t border-slate-200 text-xs space-y-3">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">เวลาทำการฝ่ายบริหารและราชการ:</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{mainCollegeContact.officeHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">เวลาเปิดต้อนรับศรัทธาสาธุชน:</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{mainCollegeContact.monasticVisitingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (2 spans): Interactive Map & Transportation Guide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Google Maps Embed Container */}
          <div className="bg-white rounded-2xl border border-amber-200/70 shadow-xs overflow-hidden">
            <div className="p-4 bg-amber-50/50 border-b border-amber-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-amber-950">
                  แผนที่ตั้งดาวเทียม วัดบาลีเถรวาทสังฆาราม (วส. มจร)
                </span>
              </div>
              <a
                href={mainCollegeContact.coordinates.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
              >
                <span>ขยายแผนที่เต็มจอ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative w-full h-80 bg-slate-100 flex items-center justify-center">
              <iframe
                title="มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย แผนที่"
                src={mainCollegeContact.coordinates.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-amber-200 text-xs text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">วัดบาลีเถรวาทสังฆาราม ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม</span>
              </div>
            </div>
          </div>

          {/* Transportation Instructions */}
          <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-600" />
              <span>คำแนะนำการเดินทางสู่วิทยาลัยสงฆ์</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-800">🚗 โดยรถยนต์ส่วนบุคคล</p>
                <p className="text-slate-600 leading-relaxed">
                  จากกรุงเทพฯ ใช้ถนนบรมราชชนนี หรือถนนเพชรเกษม มุ่งหน้าสู่อำเภอกำแพงแสน เลี้ยวเข้าสู่ตำบลรางพิกุล วัดบาลีเถรวาทสังฆาราม ตั้งอยู่ติดถนนหลัก มีลานจอดรถส่วนกลางรองรับกว่า ๑๐๐ คัน
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-800">🚐 โดยรถตู้โดยสารสาธารณะ</p>
                <p className="text-slate-600 leading-relaxed">
                  ขึ้นรถตู้ปรับอากาศ สายกรุงเทพฯ - กำแพงแสน จากสถานีขนส่งสายใต้ใหม่ หรือสถานีหมอชิต ๒ ลงที่แยกกำแพงแสน จากนั้นต่อรถรับจ้างหรือประสานงานรถส่วนกลางสถาบันเข้าสู่วิทยาลัย
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-800">🚆 โดยรถไฟ / ต่อรถท้องถิ่น</p>
                <p className="text-slate-600 leading-relaxed">
                  นั่งรถไฟสายใต้ ลงที่สถานีนครปฐม (องค์พระปฐมเจดีย์) แล้วต่อรถประจำทางสายนครปฐม-กำแพงแสน หรือรถสองแถวประจำทางรางพิกุล
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Building & Landmarks Guide (Authentic 177 Rai & 11 Buildings) */}
      <div className="bg-white rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>ทำเนียบอาคารสถานที่และผังวิทยาเขต (เนื้อที่ {campusLandInfo.totalAreaRai})</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              สิ่งก่อสร้างอำนวยความสะดวก ๑๑ รายการ พื้นที่ใช้สอยรวม {campusLandInfo.totalUsableAreaSqM} ณ ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDocViewer}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>เปิดอ่านเอกสารทันที (DOCX)</span>
            </button>
            <a
              href={campusLandInfo.documentPath}
              download={campusLandInfo.documentFileName}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-300/80 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>ดาวน์โหลด (.docx)</span>
            </a>
            <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
              ๑๑ อาคาร
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {officialCampusBuildings.map((b) => (
            <div
              key={b.id}
              className="p-3.5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/25 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-900 leading-snug">
                    {b.id}. {b.nameThai}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 font-mono text-[10px] font-bold shrink-0">
                    {b.usableAreaSqM}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-1.5">
                  {b.description}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>
                  {b.category === "ADMIN"
                    ? "ฝ่ายบริหาร/สำนักงาน"
                    : b.category === "ACADEMIC"
                    ? "ฝ่ายวิชาการ/ห้องเรียน"
                    : b.category === "MONASTIC"
                    ? "เขตสังฆาวาส/กุฏิ"
                    : b.category === "HEALTH"
                    ? "สุขภาวะ/พยาบาล"
                    : "บริการ/อุปัฏฐาก"}
                </span>
                <span className="text-emerald-700 font-medium">พร้อมใช้งาน</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
          <p>
            * แผนพัฒนาสิ่งก่อสร้างและภูมิทัศน์ได้รับการบรรจุในกรอบงบประมาณแผ่นดินและงบรายได้ มจร ปี ๒๕๖๙ (งบลงทุน ๒๔.๘๖ ลบ.)
          </p>
          <Link
            href="/vehicle-booking"
            className="text-amber-800 font-semibold hover:underline text-xs flex items-center gap-1 shrink-0"
          >
            <span>🚗 ระบบจองรถส่วนกลาง ๑๐ คัน</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
