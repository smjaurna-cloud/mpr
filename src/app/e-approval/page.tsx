"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  PenTool, 
  FileText, 
  ShieldCheck, 
  Smartphone,
  Send,
  Plus
} from "lucide-react";
import { mockEApprovalDocs, EApprovalDoc } from "@/data/mockData";

export default function EApprovalPage() {
  const [docs, setDocs] = useState<EApprovalDoc[]>(mockEApprovalDocs);
  const [selectedDoc, setSelectedDoc] = useState<EApprovalDoc | null>(null);
  const [signingSuccess, setSigningSuccess] = useState(false);
  const [signatureNote, setSignatureNote] = useState("อนุมัติ ดำเนินการตามระเบียบ มจร ได้");

  const handleApprove = (docId: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: "APPROVED",
          signers: ["ผู้อำนวยการราชวิทยาลัย (ลงนามดิจิทัลเรียบร้อย)", ...d.signers]
        };
      }
      return d;
    }));
    setSelectedDoc(null);
    setSigningSuccess(true);
    setTimeout(() => setSigningSuccess(false), 5000);
  };

  const handleReject = (docId: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: "REJECTED"
        };
      }
      return d;
    }));
    setSelectedDoc(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-purple-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full w-fit">
            <FileCheck2 className="w-4 h-4 text-purple-600" />
            <span>MOD-04: สารบรรณคำสั่งด่วน & ลงนามดิจิทัลบนอุปกรณ์พกพา</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            แฟ้มเกษียณหนังสือ & อนุมัติคำสั่งราชวิทยาลัย (Mobile E-Office)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            อำนวยความสะดวกให้ ผอ.วส. และผู้บริหาร สามารถลงลายมือชื่อดิจิทัลได้ทันทีแม้ติดศาสนกิจภายนอก
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-xs">
          <Smartphone className="w-5 h-5 text-purple-700" />
          <div>
            <span className="font-bold text-purple-900 block">Mobile Fast-Track</span>
            <span className="text-[10px] text-purple-700">ลงนามปลอดภัยผ่าน HTTPS/JWT</span>
          </div>
        </div>
      </div>

      {signingSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">ลงนามอนุมัติเอกสารดิจิทัลสำเร็จ!</p>
            <p className="text-[11px] text-emerald-700">ประทับเวลา Timestamp และส่งต่อคำสั่งไปยังฝ่ายงานที่เกี่ยวข้องเรียบร้อยแล้ว</p>
          </div>
        </div>
      )}

      {/* Docs List */}
      <div className="space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <span>รายการเอกสารรอการพิจารณาและประวัติคำสั่ง</span>
        </h2>

        <div className="space-y-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-slate-500 font-medium">{doc.docNumber}</span>
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                    doc.urgency === "ด่วนที่สุด"
                      ? "bg-rose-100 text-rose-800"
                      : doc.urgency === "ด่วนมาก"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {doc.urgency}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px]">
                    {doc.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {doc.title}
                </h3>

                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {doc.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                  <span>ผู้เสนอ: {doc.originator}</span>
                  <span>วันที่: {doc.date}</span>
                  <span>
                    ผู้ลงนาม: {doc.signers.join(", ")}
                  </span>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                {doc.status === "PENDING_DIRECTOR" ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>พิจารณาลงนาม</span>
                  </button>
                ) : doc.status === "APPROVED" ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>อนุมัติแล้ว</span>
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-bold flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>ไม่อนุมัติ</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold text-slate-900 text-base">เกษียณหนังสือและลงนามดิจิทัล</h2>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1">
                <span className="text-[10px] text-purple-700 font-mono">{selectedDoc.docNumber}</span>
                <p className="font-bold text-slate-900 text-xs">{selectedDoc.title}</p>
                <p className="text-slate-600 text-[11px]">{selectedDoc.summary}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ความเห็น/คำสั่งการของผู้บริหาร:</label>
                <textarea
                  rows={3}
                  value={signatureNote}
                  onChange={(e) => setSignatureNote(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 text-xs"
                />
              </div>

              {/* Digital Signature Pad Preview */}
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center space-y-1">
                <div className="font-serif italic text-lg text-slate-700 font-bold tracking-wider">
                  พระธรรมวชิราจารย์ / ผู้อำนวยการ
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Digital Certificate Hash: SHA256:8f4c2e...b91a (Verified)
                </p>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleReject(selectedDoc.id)}
                  className="px-4 py-2 border border-rose-200 text-rose-700 rounded-xl hover:bg-rose-50 font-semibold"
                >
                  ส่งกลับแก้ไข
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedDoc.id)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow"
                >
                  ยืนยันลงนามอนุมัติ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
