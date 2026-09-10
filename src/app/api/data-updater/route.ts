import { NextRequest, NextResponse } from "next/server";
import {
  collegeModulesRegistry,
  adminPersonas,
  initialUpdateHistory,
  DataUpdateLogItem,
  checkModulePermission,
  SystemModuleInfo,
} from "@/data/systemUpdaterData";
import { logAuditEvent } from "@/lib/auditLogger";
import { formatThaiDate, toThaiDigits } from "@/lib/utils";

// In-memory update history & live module state buffer
let updateHistoryStore: DataUpdateLogItem[] = [...initialUpdateHistory];
let modulesState: SystemModuleInfo[] = [...collegeModulesRegistry];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const moduleId = searchParams.get("moduleId");
  const adminId = searchParams.get("adminId");

  let filteredModules = modulesState;
  if (moduleId) {
    filteredModules = filteredModules.filter((m) => m.id === moduleId);
  }

  // If filtered by adminId, annotate which modules are editable
  let currentAdmin = adminPersonas.find((a) => a.id === adminId) || adminPersonas[0];
  const modulesWithPermission = filteredModules.map((m) => ({
    ...m,
    canEdit: checkModulePermission(currentAdmin, m.id),
  }));

  const upToDateCount = modulesState.filter((m) => m.freshnessStatus === "UP_TO_DATE").length;
  const needsReviewCount = modulesState.filter((m) => m.freshnessStatus !== "UP_TO_DATE").length;

  return NextResponse.json({
    success: true,
    totalModules: modulesState.length,
    upToDateCount,
    needsReviewCount,
    currentAdmin,
    adminPersonas,
    modules: modulesWithPermission,
    history: updateHistoryStore.slice(0, 50),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      moduleId,
      adminPersonaId,
      updateType = "FORM_EDIT",
      formData,
      batchRows,
      customSummary,
    } = body;

    if (!moduleId || !adminPersonaId) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุรหัสโมดูล (moduleId) และแอดมินผู้ดำเนินการ (adminPersonaId)" },
        { status: 400 }
      );
    }

    const targetModule = modulesState.find((m) => m.id === moduleId);
    if (!targetModule) {
      return NextResponse.json(
        { success: false, error: `ไม่พบโมดูลรหัส ${moduleId} ในระบบ` },
        { status: 404 }
      );
    }

    const currentAdmin = adminPersonas.find((a) => a.id === adminPersonaId);
    if (!currentAdmin) {
      return NextResponse.json(
        { success: false, error: `ไม่พบข้อมูลแอดมินรหัส ${adminPersonaId}` },
        { status: 404 }
      );
    }

    // Permission Check: Super Admin vs Dedicated Departmental Admin
    const hasPermission = checkModulePermission(currentAdmin, moduleId);
    if (!hasPermission) {
      return NextResponse.json(
        {
          success: false,
          error: `ท่านไม่มีสิทธิ์อัปเดตข้อมูลของ ${targetModule.name} (${targetModule.id}) เนื่องจากสิทธิ์ของท่าน (${currentAdmin.title}) จำกัดเฉพาะฝ่าย ${currentAdmin.department}`,
        },
        { status: 403 }
      );
    }

    const now = new Date();
    const thaiDate = formatThaiDate(now, { useThaiDigits: true });
    const thaiTime = toThaiDigits(
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} น.`
    );
    const timestampThai = `${thaiDate} ${thaiTime}`;

    let affectedCount = 1;
    let autoSummary = customSummary;

    if (updateType === "BATCH_IMPORT" && Array.isArray(batchRows)) {
      affectedCount = batchRows.length;
      autoSummary =
        customSummary ||
        `นำเข้าข้อมูลสเปรดชีต Excel/CSV ชุดใหม่สำหรับ ${targetModule.shortName} จำนวน ${toThaiDigits(affectedCount)} รายการ`;
    } else if (updateType === "STATUS_CHANGE") {
      autoSummary = customSummary || `ปรับปรุงสถานะความสดใหม่ของข้อมูล ${targetModule.name} เป็น 'ปัจจุบันสมบูรณ์'`;
    } else {
      const keys = formData ? Object.keys(formData).join(", ") : "ข้อมูลทั่วไป";
      autoSummary =
        customSummary ||
        `อัปเดตข้อมูล ${targetModule.shortName}: บันทึกข้อมูล (${keys}) เรียบร้อย`;
    }

    // Update target module live metadata
    targetModule.lastUpdated = timestampThai;
    targetModule.lastUpdatedBy = currentAdmin.name;
    targetModule.freshnessStatus = "UP_TO_DATE";
    if (updateType === "BATCH_IMPORT") {
      targetModule.totalRecordsCount += affectedCount;
    }

    // Create log record
    const newLogItem: DataUpdateLogItem = {
      id: `upd-${Date.now()}`,
      moduleId: targetModule.id,
      moduleName: targetModule.name,
      adminPersonaId: currentAdmin.id,
      adminName: currentAdmin.name,
      adminRole: currentAdmin.role,
      updateType,
      summary: autoSummary!,
      timestampThai,
      affectedRecordsCount: affectedCount,
      status: "SUCCESS",
    };

    updateHistoryStore.unshift(newLogItem);

    // Audit Logger integration
    logAuditEvent({
      actor: {
        userId: currentAdmin.id,
        fullName: currentAdmin.name,
        role: currentAdmin.role,
        ipAddress: "127.0.0.1",
      },
      action: "USER_UPDATE",
      module: `${targetModule.id}: ${targetModule.shortName}`,
      resourceId: targetModule.code,
      status: "SUCCESS",
      details: autoSummary!,
      metadata: {
        formData,
        affectedCount,
        isSuperAdmin: currentAdmin.isSuperAdmin,
      },
    });

    return NextResponse.json({
      success: true,
      message: `อัปเดตข้อมูล ${targetModule.name} (${targetModule.id}) เรียบร้อยแล้ว`,
      updatedModule: targetModule,
      newLogEntry: newLogItem,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
}
