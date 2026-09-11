import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import {
  mainCollegeContact,
  officialDepartments,
  officialSocialChannels,
  mockInquiryTickets,
  InquiryTicket,
} from "@/data/contactDirectoryData";
import { contactInquirySchema, updateTicketSchema } from "@/lib/validations/contact";
import { apiSuccess, apiError, apiValidationError } from "@/lib/apiResponse";
import { getErrorMessage } from "@/lib/utils";

const inquiryTicketsStore: InquiryTicket[] = [...mockInquiryTickets];

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
        return apiError(`ไม่พบรหัสติดตามการติดต่อ "${code}" ในระบบ`, 404);
      }
      return apiSuccess(ticket, undefined, 200, { ticket });
    }

    let departments = [...officialDepartments];
    if (deptId && deptId !== "ALL") {
      departments = departments.filter((d) => d.id === deptId || d.deptCode === deptId);
    }

    return apiSuccess(departments, undefined, 200, {
      college: mainCollegeContact,
      departments,
      socialChannels: officialSocialChannels,
      tickets: inquiryTicketsStore,
      totalTickets: inquiryTicketsStore.length,
    });
  } catch (error: unknown) {
    return apiError(getErrorMessage(error, "Internal server error"), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = contactInquirySchema.safeParse(body);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { senderName, senderEmail, senderPhone, targetDepartment, subject, message } = parseResult.data;

    const nextId = inquiryTicketsStore.length + 1;
    const ticketCode = `INQ-2569-${String(nextId).padStart(3, "0")}`;

    const newTicket: InquiryTicket = {
      id: `inq-${Date.now()}`,
      ticketCode,
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      senderPhone: senderPhone || "-",
      targetDepartment: targetDepartment || "สำนักงานผู้อำนวยการราชวิทยาลัย",
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "RECEIVED",
      responseNote: "ระบบได้รับข้อความของท่านแล้ว เจ้าหน้าที่ประจำฝ่ายงานจะดำเนินการตรวจสอบและติดต่อกลับภายใน ๑ วันทำการ",
    };

    inquiryTicketsStore.unshift(newTicket);

    return apiSuccess(newTicket, "บันทึกข้อความติดต่อสอบถามสำเร็จ", 201, {
      ticket: newTicket,
    });
  } catch (error: unknown) {
    return apiError(getErrorMessage(error, "Internal server error"), 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = updateTicketSchema.safeParse(body);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { ticketCode, status, responseNote } = parseResult.data;

    const ticketIndex = inquiryTicketsStore.findIndex(
      (t) => t.ticketCode.toLowerCase() === ticketCode.toLowerCase().trim()
    );

    if (ticketIndex === -1) {
      return apiError(`ไม่พบตั๋วรหัส "${ticketCode}"`, 404);
    }

    if (status) inquiryTicketsStore[ticketIndex].status = status;
    if (responseNote) inquiryTicketsStore[ticketIndex].responseNote = responseNote;

    return apiSuccess(inquiryTicketsStore[ticketIndex], "อัปเดตสถานะการติดต่อสำเร็จ", 200, {
      ticket: inquiryTicketsStore[ticketIndex],
    });
  } catch (error: unknown) {
    return apiError(getErrorMessage(error, "Internal server error"), 500);
  }
}
