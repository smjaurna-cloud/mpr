import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import { 
  AuthUser, 
  initialAuthUsers, 
  MemberCategory, 
  formatCitizenId 
} from "@/data/authData";
import { SystemRole, MonasticStatus } from "@/data/mockData";
import { registerSchema } from "@/lib/validations/auth";
import { apiSuccess, apiError, apiValidationError } from "@/lib/apiResponse";
import { getErrorMessage } from "@/lib/utils";

const registeredStore: AuthUser[] = [...initialAuthUsers];

function getRegisteredStore(): AuthUser[] {
  return registeredStore;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = registerSchema.safeParse(body);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const {
      memberCategory,
      title,
      fullName,
      paliName,
      sanghaRank,
      vassa,
      originTemple,
      studentCode,
      positionCode,
      idCardNo,
      email,
      phone,
      password,
      department,
    } = parseResult.data;

    // Check duplicate email
    const duplicate = registeredStore.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (duplicate) {
      return apiError(`อีเมล "${email}" มีการลงทะเบียนในระบบแล้ว กรุณาเข้าสู่ระบบ`, 409);
    }

    // Determine monastic status & role
    const cat: MemberCategory = (memberCategory as MemberCategory) || "PATRON";
    let monasticStatus: MonasticStatus = "LAYPERSON";
    let defaultRole: SystemRole = "PATRON_USER";

    if (cat === "MONK") {
      monasticStatus = "ACTIVE_MONK";
      defaultRole = "PALI_TEACHER";
    } else if (cat === "SAMANERA") {
      monasticStatus = "ACTIVE_SAMANERA";
      defaultRole = "SAMANERA";
    } else if (cat === "GRAD_STUDENT") {
      monasticStatus = title?.includes("พระ") ? "ACTIVE_MONK" : "LAYPERSON";
      defaultRole = "PALI_TEACHER";
    } else if (cat === "FACULTY") {
      monasticStatus = title?.includes("พระ") ? "ACTIVE_MONK" : "LAYPERSON";
      defaultRole = "PALI_TEACHER";
    } else if (cat === "STAFF") {
      monasticStatus = "LAYPERSON";
      defaultRole = "REGISTRAR_STAFF";
    }

    // Generate unique Member ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const memberId = `MBR-2569-${randomSuffix}`;

    // Compute Thai current date
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const now = new Date();
    const thaiDate = `${now.getDate()} ${thaiMonths[now.getMonth()]} ๒๕๖๙`;

    const cleanCitizen = idCardNo ? formatCitizenId(idCardNo) : undefined;

    const newMember: AuthUser = {
      id: `usr-${Date.now()}`,
      username: email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, ""),
      fullName: `${title ? title + " " : ""}${fullName.trim()}`,
      title: title || (cat === "MONK" ? "พระ" : cat === "SAMANERA" ? "สามเณร" : "คุณ"),
      paliName: paliName?.trim() || undefined,
      sanghaRank: sanghaRank?.trim() || undefined,
      vassa: vassa !== undefined ? Number(vassa) : undefined,
      originTemple: originTemple?.trim() || undefined,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      role: defaultRole,
      memberCategory: cat,
      memberId,
      studentCode: studentCode?.trim() || undefined,
      positionCode: positionCode?.trim() || undefined,
      idCardNo: cleanCitizen,
      password: password || "123456",
      avatarText: fullName.trim().slice(0, 2),
      department: department?.trim() || "สมาชิกมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
      monasticStatus,
      accountStatus: "ACTIVE",
      registeredDate: thaiDate,
      digitalCardIssued: true,
      qrCodeToken: `MCU-MVU-${memberId}-DIGITAL-CARD-VERIFIED`
    };

    registeredStore.push(newMember);

    const { password: _, ...safeMember } = newMember;

    return apiSuccess(
      safeMember,
      `สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย รหัสสมาชิกของคุณคือ ${memberId}`,
      201,
      {
        memberId,
        user: safeMember,
        token: `mpr-session-${newMember.id}-${Date.now()}`,
      }
    );
  } catch (error: unknown) {
    return apiError(getErrorMessage(error, "เกิดข้อผิดพลาดในการสมัครสมาชิก"), 500);
  }
}
