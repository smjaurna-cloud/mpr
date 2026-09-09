"use client";

import React, { useRef } from "react";
import { X, Printer, CheckCircle, Clock, Building, Shield, QrCode } from "lucide-react";
import { UnifiedTrackedTask } from "@/data/complaintsTrackingData";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface PrintableTrackingSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: UnifiedTrackedTask | null;
}

export const PrintableTrackingSlipModal: React.FC<PrintableTrackingSlipModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !task) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: UnifiedTrackedTask["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "APPROVED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "PROCESSING":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "PENDING":
        return "bg-slate-100 text-slate-800 border-slate-300";
      default:
        return "bg-rose-100 text-rose-800 border-rose-300";
    }
  };

  const trackingUrl = typeof window !== "undefined"
    ? `${window.location.origin}/complaints-tracking?code=${task.trackingCode}`
    : `https://palitheravada.mcu.ac.th/complaints-tracking?code=${task.trackingCode}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200 my-8 print:border-none print:shadow-none print:my-0 print:max-w-none">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-base">ใบติดตามภารกิจราชการ (Official Tracking Slip)</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>สั่งพิมพ์ (Print Slip)</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div
          ref={printAreaRef}
          id="printable-tracking-slip"
          className="p-8 md:p-10 bg-white text-slate-800 border-4 border-slate-200 m-2 rounded-xl print:m-0 print:border-slate-800 print:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-amber-600 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-600 flex items-center justify-center text-amber-800 shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
                </h2>
                <p className="text-xs text-amber-800 font-medium">
                  Mahavajiralongkorn Pali Theravada College (วส. มจร)
                </p>
                <p className="text-[11px] text-slate-500">
                  ระบบติดตามสถานะคำร้องและภารกิจราชการรวมศูนย์ทุกระบบ
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block font-mono text-sm font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md">
                {task.trackingCode}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">รหัสติดตามงานสากล</p>
            </div>
          </div>

          {/* Details & QR Code Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="md:col-span-2 space-y-2 text-xs">
              <div>
                <span className="text-slate-500 font-medium">ระบบต้นทาง:</span>
                <span className="ml-2 font-bold text-slate-800">{task.systemNameThai}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">หัวข้อภารกิจ:</span>
                <span className="ml-2 font-semibold text-slate-900">{task.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-500">ผู้ยื่นคำร้อง:</span>
                  <p className="font-medium text-slate-800">{task.requesterName}</p>
                </div>
                <div>
                  <span className="text-slate-500">หน่วยงาน/ฝ่าย:</span>
                  <p className="font-medium text-slate-800">{task.departmentOrUnit}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500">วันที่ยื่นเรื่อง:</span>
                  <p className="font-medium text-slate-800">{task.submittedDate}</p>
                </div>
                <div>
                  <span className="text-slate-500">เป้าหมายแล้วเสร็จ:</span>
                  <p className="font-medium text-slate-800">{task.targetCompletionDate}</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-slate-500">สถานะปัจจุบัน:</span>
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(task.status)}`}>
                  {task.statusThai} ({task.currentStep}/{task.totalSteps})
                </span>
              </div>
            </div>

            {/* Tracking QR */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <QRCodeDisplay
                value={trackingUrl}
                size={110}
                colorDark="#0f172a"
                colorLight="#ffffff"
                showCopy={false}
                showDownload={false}
                className="p-0 border-none shadow-none bg-transparent"
              />
              <span className="text-[10px] text-slate-500 text-center mt-1">
                สแกนดูไทม์ไลน์สด
              </span>
            </div>
          </div>

          {/* Stepper Timeline Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>ลำดับขั้นตอนการปฏิบัติงาน (Workflow Progress)</span>
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2 w-10 text-center">ขั้น</th>
                    <th className="p-2">ขั้นตอนการดำเนินงาน</th>
                    <th className="p-2">ผู้ปฏิบัติ / ตำแหน่ง</th>
                    <th className="p-2">วันเวลาดำเนินการ</th>
                    <th className="p-2 text-center">ผลการตรวจ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {task.stepsHistory.map((step) => (
                    <tr key={step.stepNo} className={step.isCompleted ? "bg-white" : "bg-slate-50/50"}>
                      <td className="p-2 text-center font-mono font-bold text-slate-500">
                        {step.stepNo}
                      </td>
                      <td className="p-2 font-medium text-slate-900">
                        {step.stepTitle}
                        {step.note && (
                          <p className="text-[11px] text-amber-700 mt-0.5">
                            * {step.note}
                          </p>
                        )}
                      </td>
                      <td className="p-2 text-slate-600">{step.actionBy}</td>
                      <td className="p-2 font-mono text-slate-500">{step.timestamp}</td>
                      <td className="p-2 text-center">
                        {step.isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            สำเร็จ
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">รอขั้นตอน</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Signatures Section */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-slate-200 text-center text-xs">
            <div>
              <div className="h-12 border-b border-dashed border-slate-300 mx-4 mb-2"></div>
              <p className="font-semibold text-slate-800">({task.requesterName})</p>
              <p className="text-[11px] text-slate-500">ผู้ยื่นคำร้อง/เจ้าของเรื่อง</p>
            </div>
            <div>
              <div className="h-12 border-b border-dashed border-slate-300 mx-4 mb-2"></div>
              <p className="font-semibold text-slate-800">(..................................................)</p>
              <p className="text-[11px] text-slate-500">เจ้าหน้าที่ผู้รับผิดชอบงาน</p>
            </div>
            <div>
              <div className="h-12 border-b border-dashed border-slate-300 mx-4 mb-2"></div>
              <p className="font-semibold text-slate-800">พระธรรมวชิราจารย์ รศ.ดร.</p>
              <p className="text-[11px] text-slate-500">ผู้อำนวยการวิทยาลัย / ผู้อนุมัติ</p>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>พิมพ์จากระบบบริหารงานราชการ วส. มจร (MCU ERP)</span>
            <span>สายด่วนสอบถามสถานะ: ๐๙๒-๖๙๔๘๘๘๓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
