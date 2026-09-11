import { z } from "zod";

export const identifierTypeSchema = z.enum([
  "ALL",
  "MEMBER_ID",
  "STUDENT_ID",
  "POSITION_CODE",
  "CITIZEN_ID",
  "PASSWORD",
]);

export const memberCategorySchema = z.enum([
  "MONK",
  "SAMANERA",
  "GRAD_STUDENT",
  "FACULTY",
  "STAFF",
  "PATRON",
]);

export const loginSchema = z.object({
  identifierName: z
    .string()
    .min(2, "ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย ๒ ตัวอักษร")
    .trim(),
  secretCode: z
    .string()
    .min(3, "รหัสยืนยันตัวตนต้องมีความยาวอย่างน้อย ๓ ตัวอักษร")
    .trim(),
  idType: identifierTypeSchema.optional().default("ALL"),
});

export const googleAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export const registerSchema = z.object({
  memberCategory: memberCategorySchema.default("PATRON"),
  title: z.string().optional().default(""),
  fullName: z.string().min(2, "กรุณากรอกชื่อ-นามสกุลจริงอย่างน้อย ๒ ตัวอักษร").trim(),
  paliName: z.string().optional(),
  sanghaRank: z.string().optional(),
  vassa: z
    .preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
      z.number().int().nonnegative().optional()
    ),
  originTemple: z.string().optional(),
  studentCode: z.string().optional(),
  positionCode: z.string().optional(),
  idCardNo: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.replace(/\D/g, "").length === 13,
      "เลขประจำตัวประชาชนต้องเป็นตัวเลข ๑๓ หลัก"
    ),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").trim(),
  phone: z.string().optional(),
  password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย ๖ ตัวอักษร").optional(),
  department: z.string().optional(),
  agreePdpa: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
