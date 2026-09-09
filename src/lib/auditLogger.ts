/**
 * Centralized Enterprise Audit Logger
 * มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 * 
 * Compliant with ISO/IEC 27001, PDPA, and Monastic Confidentiality standards.
 */

import { formatThaiDate, toThaiDigits } from "./utils";

export type AuditActionType =
  | "AUTH_LOGIN"
  | "AUTH_LOGOUT"
  | "USER_CREATE"
  | "USER_UPDATE"
  | "USER_STATUS_CHANGE"
  | "USER_DISROBE_RECORD"
  | "MEETING_ROOM_BOOK"
  | "VEHICLE_BOOK"
  | "VEHICLE_APPROVE"
  | "E_APPROVAL_SIGN"
  | "E_APPROVAL_REJECT"
  | "ALMS_BOOKING_CREATE"
  | "ALMS_PAYMENT_VERIFY"
  | "MUKHOPATHA_EVALUATE"
  | "ROUTINE_CHECKIN"
  | "COMPLAINT_SUBMIT"
  | "COMPLAINT_STATUS_UPDATE"
  | "EXPORT_DATA"
  | "FILE_VIEW"
  | "SECURITY_ALERT";

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO 8601
  thaiTimestamp: string; // Thai Buddhist Era string
  actor: {
    userId: string;
    fullName: string;
    role: string;
    ipAddress?: string;
  };
  action: AuditActionType;
  module: string; // e.g. "MOD-04: E-Approval", "MOD-06: Users"
  resourceId?: string;
  status: "SUCCESS" | "WARNING" | "FAILURE";
  details: string;
  metadata?: Record<string, unknown>;
}

// In-memory audit buffer with initial seeds
const auditLogsStore: AuditLogEntry[] = [
  {
    id: "aud-001",
    timestamp: "2026-09-09T08:30:00.000Z",
    thaiTimestamp: "๙ กันยายน ๒๕๖๙ ๑๕:๓๐ น.",
    actor: {
      userId: "usr-001",
      fullName: "พระธรรมวชิราจารย์ รศ.ดร.",
      role: "SUPER_ADMIN",
      ipAddress: "192.168.1.10",
    },
    action: "E_APPROVAL_SIGN",
    module: "MOD-04: E-Approval",
    resourceId: "DOC-2569-001",
    status: "SUCCESS",
    details: "ลงนามอนุมัติฎีกาจัดสรรงบประมาณโครงการพัฒนาภูมิทัศน์และสวนป่าปฏิบัติธรรม",
  },
  {
    id: "aud-002",
    timestamp: "2026-09-09T08:45:00.000Z",
    thaiTimestamp: "๙ กันยายน ๒๕๖๙ ๑๕:๔๕ น.",
    actor: {
      userId: "usr-008",
      fullName: "อาจารย์ ดร.สมบูรณ์ จารุณะ",
      role: "SUPER_ADMIN",
      ipAddress: "192.168.1.25",
    },
    action: "USER_UPDATE",
    module: "MOD-06: User Management",
    resourceId: "usr-008",
    status: "SUCCESS",
    details: "ปรับปรุงสถานะและสิทธิ์การเข้าถึงระบบส่วนกลาง",
  },
  {
    id: "aud-003",
    timestamp: "2026-09-09T09:00:00.000Z",
    thaiTimestamp: "๙ กันยายน ๒๕๖๙ ๑๖:๐๐ น.",
    actor: {
      userId: "usr-005",
      fullName: "พระมหาเสฏฐวุฒิ วชิรญาโณ ดร. ป.ธ.๙",
      role: "PALI_TEACHER",
      ipAddress: "192.168.1.15",
    },
    action: "MUKHOPATHA_EVALUATE",
    module: "MOD-03: Mukhopatha",
    resourceId: "muko-01",
    status: "SUCCESS",
    details: "ประเมินผลการสาธยายคัมภีร์ปทรูปสิทธิ สามเณร นรินทร์เดช (ผล: ยอดเยี่ยม)",
  },
];

/**
 * Record an audit event into the centralized log
 */
export function logAuditEvent(
  entry: Omit<AuditLogEntry, "id" | "timestamp" | "thaiTimestamp">
): AuditLogEntry {
  const now = new Date();
  const dateStr = formatThaiDate(now, { useThaiDigits: true });
  const timeStr = toThaiDigits(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} น.`
  );

  const fullEntry: AuditLogEntry = {
    ...entry,
    id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: now.toISOString(),
    thaiTimestamp: `${dateStr} ${timeStr}`,
  };

  auditLogsStore.unshift(fullEntry);
  // Cap memory store at 500 entries
  if (auditLogsStore.length > 500) {
    auditLogsStore.pop();
  }

  // Also log to console in development
  if (process.env.NODE_ENV !== "production") {
    console.log(`[AUDIT] [${fullEntry.action}] ${fullEntry.actor.fullName}: ${fullEntry.details}`);
  }

  return fullEntry;
}

/**
 * Get recent audit logs with filtering options
 */
export function getRecentAuditLogs(options?: {
  limit?: number;
  module?: string;
  action?: AuditActionType;
}): AuditLogEntry[] {
  let list = [...auditLogsStore];
  if (options?.module) {
    list = list.filter((l) => l.module.includes(options.module!));
  }
  if (options?.action) {
    list = list.filter((l) => l.action === options.action);
  }
  return list.slice(0, options?.limit ?? 50);
}
