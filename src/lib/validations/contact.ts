import { z } from "zod";

export const contactInquirySchema = z.object({
  senderName: z
    .string()
    .min(2, "ชื่อผู้ติดต่อต้องมีความยาวอย่างน้อย ๒ ตัวอักษร")
    .trim(),
  senderEmail: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .trim(),
  senderPhone: z.string().optional().default("-"),
  targetDepartment: z.string().optional().default("สำนักงานผู้อำนวยการราชวิทยาลัย"),
  subject: z
    .string()
    .min(3, "หัวข้อเรื่องต้องมีความยาวอย่างน้อย ๓ ตัวอักษร")
    .trim(),
  message: z
    .string()
    .min(5, "ข้อความต้องมีความยาวอย่างน้อย ๕ ตัวอักษร")
    .trim(),
});

export const updateTicketSchema = z.object({
  ticketCode: z.string().min(1, "กรุณาระบุรหัสตั๋วติดตาม (Ticket Code)"),
  status: z.enum(["RECEIVED", "PROCESSING", "RESPONDED"]).optional(),
  responseNote: z.string().optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
