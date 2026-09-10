"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Save,
  Download,
  ShieldCheck,
  UserCheck,
  Building2,
  Calendar,
  Layers,
} from "lucide-react";
import {
  collegeModulesRegistry,
  adminPersonas,
  SystemModuleInfo,
  AdminPersona,
  checkModulePermission,
} from "@/data/systemUpdaterData";

export interface QuickDataUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetModuleId?: string; // e.g. "MOD-16"
  onSuccess?: (message: string) => void;
  onUpdateSuccess?: (message?: string) => void;
}

export default function QuickDataUpdateModal({
  isOpen,
  onClose,
  targetModuleId,
  onSuccess,
  onUpdateSuccess,
}: QuickDataUpdateModalProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    targetModuleId || "MOD-01"
  );
  const [selectedAdminId, setSelectedAdminId] = useState<string>("admin-super-somboon");
  const [activeTab, setActiveTab] = useState<"form" | "batch">("form");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Sync selectedModuleId when targetModuleId prop changes
  useEffect(() => {
    if (targetModuleId) {
      setSelectedModuleId(targetModuleId);
    }
  }, [targetModuleId]);

  const currentModule: SystemModuleInfo =
    collegeModulesRegistry.find((m) => m.id === selectedModuleId) || collegeModulesRegistry[0];

  const currentAdmin: AdminPersona =
    adminPersonas.find((a) => a.id === selectedAdminId) || adminPersonas[0];

  const hasPermission = checkModulePermission(currentAdmin, currentModule.id);

  // Initialize form fields when module changes
  useEffect(() => {
    if (currentModule) {
      const initial: Record<string, any> = {};
      currentModule.fields.forEach((f) => {
        initial[f.key] = f.defaultValue ?? "";
      });
      // Pre-fill with first sample record if available
      if (currentModule.sampleRecords && currentModule.sampleRecords.length > 0) {
        Object.assign(initial, currentModule.sampleRecords[0]);
      }
      setFormData(initial);
      setNotice(null);
    }
  }, [selectedModuleId]);

  if (!isOpen) return null;

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPermission) {
      setNotice({
        type: "error",
        message: `สิทธิ์ไม่เพียงพอ: ${currentAdmin.name} ไม่มีสิทธิ์อัปเดตระบบ ${currentModule.name}`,
      });
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const res = await fetch("/api/data-updater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: currentModule.id,
          adminPersonaId: currentAdmin.id,
          updateType: "FORM_EDIT",
          formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotice({ type: "success", message: data.message });
        if (onSuccess) onSuccess(data.message);
        if (onUpdateSuccess) onUpdateSuccess(data.message);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setNotice({ type: "error", message: data.error || "บันทึกข้อมูลไม่สำเร็จ" });
      }
    } catch (err: any) {
      setNotice({ type: "error", message: "เกิดข้อผิดพลาดในการส่งข้อมูลไปยังเซิร์ฟเวอร์" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBatchSimulate = async () => {
    if (!hasPermission) {
      setNotice({
        type: "error",
        message: `สิทธิ์ไม่เพียงพอ: ${currentAdmin.name} ไม่มีสิทธิ์นำเข้าข้อมูลชุดนี้`,
      });
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const simulatedRows = [formData, { ...formData, id: Date.now() }];
      const res = await fetch("/api/data-updater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: currentModule.id,
          adminPersonaId: currentAdmin.id,
          updateType: "BATCH_IMPORT",
          batchRows: simulatedRows,
          customSummary: `นำเข้าข้อมูลสเปรดชีต Excel จำนวน ${simulatedRows.length} รายการ เข้าสู่ ${currentModule.name}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotice({ type: "success", message: data.message });
        if (onSuccess) onSuccess(data.message);
        if (onUpdateSuccess) onUpdateSuccess(data.message);
        setTimeout(() => {
          onClose();
        }, 1600);
      } else {
        setNotice({ type: "error", message: data.error || "เกิดข้อผิดพลาด" });
      }
    } catch (err) {
      setNotice({ type: "error", message: "เกิดข้อผิดพลาดในการเชื่อมต่อ" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-300/80 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-yellow-800 text-white p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-amber-200 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-600/70 border border-amber-400/40 text-amber-100">
                  MOD-23 • Data Management Hub
                </span>
                <span className="text-[10px] text-amber-200 font-medium">
                  {currentModule.id}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white mt-0.5">
                ศูนย์อัปเดตข้อมูลเป็นปัจจุบัน: {currentModule.shortName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างอัปเดตข้อมูล"
            className="p-1.5 rounded-full text-amber-200 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Controls: Module & Admin Switcher */}
        <div className="bg-amber-50/70 border-b border-amber-200/80 p-4 space-y-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Module Picker */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                ระบบ/โมดูลที่ต้องการอัปเดตข้อมูล:
              </label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 text-xs shadow-xs"
              >
                {collegeModulesRegistry.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.id}: {m.name} ({m.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Persona Switcher */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                บันทึกในนามแอดมิน (Admin Persona):
              </label>
              <select
                value={selectedAdminId}
                onChange={(e) => setSelectedAdminId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 text-xs shadow-xs"
              >
                {adminPersonas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} [{a.isSuperAdmin ? "Super Admin สิทธิ์ทุกระบบ" : a.title}]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Permission Status Banner */}
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
              hasPermission
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-rose-50 border-rose-300 text-rose-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {hasPermission ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>
                {hasPermission
                  ? `✓ สิทธิ์ถูกต้อง: ${currentAdmin.name} สามารถแก้ไขข้อมูล ${currentModule.name} ได้`
                  : `⚠️ จำกัดสิทธิ์: ${currentAdmin.name} ไม่มีสิทธิ์แก้ไข ${currentModule.shortName} (ต้องใช้สิทธิ์ Super Admin หรือ แอดมินประจำฝ่าย)`}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border shadow-2xs">
              {currentAdmin.isSuperAdmin ? "SUPER ADMIN" : currentAdmin.role}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 border-b border-slate-200 flex items-center gap-2 bg-white text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "form"
                ? "border-amber-600 text-amber-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>กรอกแบบฟอร์มอัปเดตสด (Interactive Form)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("batch")}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "batch"
                ? "border-amber-600 text-amber-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>นำเข้าข้อมูลชุด Excel/CSV (Batch Upload)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {notice && (
            <div
              className={`mb-4 p-3 rounded-xl border flex items-center gap-2 ${
                notice.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium"
                  : "bg-rose-50 border-rose-300 text-rose-900 font-medium"
              }`}
            >
              {notice.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{notice.message}</span>
            </div>
          )}

          {activeTab === "form" ? (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <span>
                  📂 หมวดหมู่ข้อมูล: <strong>{currentModule.dataCategory}</strong>
                </span>
                <span>
                  🕒 ความถี่ในการอัปเดต: <strong>{currentModule.updateCycle}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentModule.fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.type === "textarea" ? "sm:col-span-2" : ""}
                  >
                    <label className="font-semibold text-slate-800 block mb-1 text-xs">
                      {field.label}
                      {field.required && <span className="text-rose-600 ml-1">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={formData[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        required={field.required}
                        disabled={!hasPermission}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500 disabled:bg-slate-100"
                      >
                        <option value="">-- เลือกรายการ --</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        rows={3}
                        required={field.required}
                        disabled={!hasPermission}
                        placeholder={field.placeholder || `ระบุ${field.label}...`}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500 disabled:bg-slate-100"
                      />
                    ) : field.type === "boolean" ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id={field.key}
                          checked={!!formData[field.key]}
                          onChange={(e) => handleFieldChange(field.key, e.target.checked)}
                          disabled={!hasPermission}
                          className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                        />
                        <label htmlFor={field.key} className="text-slate-700 cursor-pointer">
                          เปิดใช้งาน / ยืนยันความถูกต้อง
                        </label>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key] || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            field.key,
                            field.type === "number" ? Number(e.target.value) : e.target.value
                          )
                        }
                        required={field.required}
                        disabled={!hasPermission}
                        placeholder={field.placeholder || `กรอก${field.label}...`}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500 disabled:bg-slate-100"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={!hasPermission || isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold transition-all shadow-md shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>กำลังบันทึกข้อมูล...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>บันทึกและอัปเดตข้อมูลเป็นปัจจุบัน</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Batch Upload Tab */
            <div className="space-y-4">
              <div className="border-2 border-dashed border-amber-300 bg-amber-50/40 rounded-2xl p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  อัปโหลดไฟล์สเปรดชีต Excel (.xlsx) หรือ CSV
                </h4>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                  ระบบจะทำการตรวจสอบโครงสร้างคอลัมน์และผสานข้อมูลเข้าสู่ฐานข้อมูล {currentModule.name} โดยอัตโนมัติ
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleBatchSimulate}
                    disabled={!hasPermission || isSubmitting}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>จำลองอัปโหลดไฟล์ Excel เพื่อนำเข้าชุดข้อมูล</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">
                    โครงสร้างคอลัมน์มาตรฐานสำหรับไฟล์นำเข้า:
                  </span>
                  <a
                    href={`/api/file-viewer?download=${currentModule.code}.csv`}
                    download
                    className="text-[11px] text-amber-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>ดาวน์โหลดแม่แบบ Template (.csv)</span>
                  </a>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentModule.fields.map((f) => (
                    <code
                      key={f.key}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700"
                    >
                      {f.key}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
