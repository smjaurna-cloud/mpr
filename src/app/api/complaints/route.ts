import { NextRequest, NextResponse } from "next/server";
import {
  mockComplaints,
  mockUnifiedTrackedTasks,
  ComplaintItem,
  UnifiedTrackedTask,
} from "@/data/complaintsTrackingData";

export const dynamic = "force-dynamic";

let complaintsStore: ComplaintItem[] = [...mockComplaints];
const tasksStore: UnifiedTrackedTask[] = [...mockUnifiedTrackedTasks];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingCode = searchParams.get("code");
    const systemType = searchParams.get("system");

    if (trackingCode) {
      const foundTask = tasksStore.find(
        (t) => t.trackingCode.toLowerCase() === trackingCode.toLowerCase()
      );
      const foundComplaint = complaintsStore.find(
        (c) => c.trackingCode.toLowerCase() === trackingCode.toLowerCase()
      );

      if (!foundTask && !foundComplaint) {
        return NextResponse.json(
          { success: false, error: `ไม่พบรหัสติดตาม "${trackingCode}" ในระบบสารสนเทศ` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        task: foundTask || null,
        complaint: foundComplaint || null,
      });
    }

    let filteredTasks = [...tasksStore];
    if (systemType && systemType !== "ALL") {
      filteredTasks = filteredTasks.filter((t) => t.systemType === systemType);
    }

    return NextResponse.json({
      success: true,
      totalComplaints: complaintsStore.length,
      totalTrackedTasks: filteredTasks.length,
      complaints: complaintsStore,
      tasks: filteredTasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      categoryThai,
      details,
      complainantName,
      isAnonymous,
      contactPhone,
      contactEmail,
      locationArea,
      priority,
    } = body;

    if (!title || !details) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุหัวข้อและรายละเอียดเรื่องร้องเรียน" },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const trackingCode = `CMP-2569-${randomNum}`;

    const newComplaint: ComplaintItem = {
      id: `cmp-${Date.now()}`,
      trackingCode,
      title,
      category: category || "GENERAL_SUGGESTION",
      categoryThai: categoryThai || "ข้อเสนอแนะทั่วไป",
      details,
      complainantName: isAnonymous ? "ไม่ประสงค์ระบุตัวตน (Anonymous)" : (complainantName || "ศรัทธาสาธุชน"),
      isAnonymous: Boolean(isAnonymous),
      contactPhone: contactPhone || "-",
      contactEmail: contactEmail || "-",
      locationArea: locationArea || "บริเวณวิทยาลัย",
      status: "RECEIVED",
      priority: priority || "NORMAL",
      submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      assignedDepartment: "สำนักงานผู้อำนวยการราชวิทยาลัย",
      officerInCharge: "พระมหาเถระฝ่ายสารบรรณสงฆ์",
      evidenceAttachmentsCount: 0,
    };

    complaintsStore = [newComplaint, ...complaintsStore];

    return NextResponse.json({
      success: true,
      message: "ยื่นเรื่องร้องเรียนและออกรหัสติดตามงานสำเร็จ",
      trackingCode,
      data: newComplaint,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
