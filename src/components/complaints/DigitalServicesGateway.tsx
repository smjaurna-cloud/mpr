"use client";

import React from "react";
import {
  Building,
  ExternalLink,
} from "lucide-react";
import {
  mcuDigitalServices,
} from "@/data/complaintsTrackingData";

export default function DigitalServicesGateway() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-5 h-5 text-amber-600" />
          ประตูบริการดิจิทัลส่วนกลาง มจร & เกณฑ์ธรรมาภิบาล ITA
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          เชื่อมโยงระบบสารสนเทศระดับมหาวิทยาลัย เพื่อการบริหารจัดการที่มีประสิทธิภาพ โปร่งใส และตรวจสอบได้
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mcuDigitalServices.map((svc) => (
          <div
            key={svc.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {svc.category}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{svc.nameThai}</h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{svc.nameEng}</p>
              <p className="text-xs text-slate-600 mt-2">{svc.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href={svc.url}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <span>เข้าสู่ระบบบริการ มจร</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Contact & ITA Transparency Box */}
      <div className="bg-gradient-to-r from-amber-50 to-slate-50 p-6 rounded-2xl border border-amber-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
            </h4>
            <p className="text-slate-600">
              Mahavajiralongkorn Pali Theravada College (วส. มจร)
            </p>
            <p className="text-slate-500 mt-1">
              เลขที่ ๒๓๔ ถนนเพชรเกษม ตำบลรางพิกุล อำเภอกำแพงแสน จังหวัดนครปฐม ๗๓๑๔๐
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">ช่องทางติดต่อทางการ</h4>
            <p className="text-slate-700">
              <strong>ผู้อำนวยการวิทยาลัย:</strong> พระธรรมวชิราจารย์ รศ.ดร.
            </p>
            <p className="text-slate-700 mt-1">
              <strong>สายด่วนรับเรื่อง:</strong> ๐๙๒-๖๙๔๘๘๘๓
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>เบอร์สำนักงาน:</strong> ๐๙๙-๔๔๕-๔๒๕๖
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>อีเมล:</strong> info@palitheravada.mcu.ac.th
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">มาตรฐานธรรมาภิบาล ITA</h4>
            <p className="text-slate-600">
              มุ่งเน้นการเปิดเผยข้อมูลสาธารณะ (Open Data Integrity) และการป้องกันผลประโยชน์ทับซ้อน เพื่อสร้างความเชื่อมั่นต่อศรัทธาสาธุชนและคณะสงฆ์
            </p>
            <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px] border border-emerald-300">
              เกณฑ์ประเมิน ITA: ระดับยอดเยี่ยม (AA)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
