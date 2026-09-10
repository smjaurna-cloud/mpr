import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import {
  mainCollegeContact,
  officialDepartments,
  officialSocialChannels,
  mockInquiryTickets,
  InquiryTicket,
} from "@/data/contactDirectoryData";

let inquiryTicketsStore: InquiryTicket[] = [...mockInquiryTickets];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const deptId = searchParams.get("dept");

    if (code) {
      const ticket = inquiryTicketsStore.find(
        (t) => t.ticketCode.toLowerCase() === code.toLowerCase().trim()
      );
      if (!ticket) {
        return NextResponse.json(
          { success: false, error: `ไม่พบรหัสติดตามการติดต่อ "${code}" ในระบบ` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, ticket });
    }

    let departments = [...officialDepartments];
    if (deptId && deptId !== "ALL") {
      departments = departments.filter((d) => d.id === deptId || d.deptCode === deptId);
    }

    return NextResponse.json({
      success: true,
      college: mainCollegeContact,
      departments,
      socialChannels: officialSocialChannels,
      tickets: inquiryTicketsStore,
      totalTickets: inquiryTicketsStore.length,
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
    const { senderName, senderEmail, senderPhone, targetDepartment, subject, message } = body;

    if (!senderName || !senderEmail || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อผู้ติดต่อ, อีเมล, เรื่อง, ข้อความ)" },
        { status: 400 }
      );
    }

    const nextId = inquiryTicketsStore.length + 1;
    const ticketCode = `INQ-2569-${String(nextId).padStart(3, "0")}`;

    const newTicket: InquiryTicket = {
      id: `inq-${Date.now()}`,
      ticketCode,
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      senderPhone: senderPhone?.trim() || "-",
      targetDepartment: targetDepartment || "สำนักงานผู้อำนวยการราชวิทยาลัย",
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "RECEIVED",
      responseNote: "ระบบได้รับข้อความของท่านแล้ว เจ้าหน้าที่ประจำฝ่ายงานจะดำเนินการตรวจสอบและติดต่อกลับภายใน ๑ วันทำการ",
    };

    inquiryTicketsStore.unshift(newTicket);

    return NextResponse.json({
      success: true,
      message: "บันทึกข้อความติดต่อสอบถามสำเร็จ",
      ticket: newTicket,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketCode, status, responseNote } = body;

    if (!ticketCode) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุรหัสตั๋ว (ticketCode)" },
        { status: 400 }
      );
    }

    const ticketIndex = inquiryTicketsStore.findIndex(
      (t) => t.ticketCode.toLowerCase() === ticketCode.toLowerCase().trim()
    );

    if (ticketIndex === -1) {
      return NextResponse.json(
        { success: false, error: `ไม่พบตั๋วรหัส "${ticketCode}"` },
        { status: 404 }
      );
    }

    if (status) inquiryTicketsStore[ticketIndex].status = status;
    if (responseNote) inquiryTicketsStore[ticketIndex].responseNote = responseNote;

    return NextResponse.json({
      success: true,
      message: "อัปเดตสถานะการติดต่อสำเร็จ",
      ticket: inquiryTicketsStore[ticketIndex],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
