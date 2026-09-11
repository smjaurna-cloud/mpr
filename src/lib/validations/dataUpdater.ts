import { z } from "zod";

export const dataUpdatePayloadSchema = z.object({
  moduleId: z.string().min(1, "กรุณาระบุรหัสโมดูลที่ต้องการอัปเดต"),
  adminPersonaId: z.string().min(1, "กรุณาระบุรหัสผู้ดูแลระบบ (Admin Persona)"),
  updateType: z.enum(["FORM_EDIT", "BATCH_IMPORT", "QUICK_SYNC", "STATUS_CHANGE"]).default("FORM_EDIT"),
  formData: z.record(z.string(), z.unknown()).optional(),
  batchRows: z.array(z.record(z.string(), z.unknown())).optional(),
  customSummary: z.string().optional(),
});

export type DataUpdatePayloadInput = z.infer<typeof dataUpdatePayloadSchema>;
