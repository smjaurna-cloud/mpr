import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { 
  initialAuthUsers, 
  authenticateMultiIdentifier, 
  IdentifierType,
  AuthUser 
} from "@/data/authData";
import { loginSchema } from "@/lib/validations/auth";
import { apiValidationError, apiError } from "@/lib/apiResponse";
import { getErrorMessage } from "@/lib/utils";

// In-memory session store across server runtime
let authUsersStore: AuthUser[] = [...initialAuthUsers];

function getAuthUsersStore(): AuthUser[] {
  return authUsersStore;
}

function updateAuthUsersStore(newUsers: AuthUser[]) {
  authUsersStore = newUsers;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { identifierName, secretCode, idType } = parseResult.data;

    const authResult = authenticateMultiIdentifier(
      identifierName,
      secretCode,
      idType as IdentifierType,
      authUsersStore
    );

    if (!authResult.user) {
      return apiError(authResult.error || "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง", 401);
    }

    // Sanitize user for client response
    const { password, ...safeUser } = authResult.user;

    return NextResponse.json({
      success: true,
      message: `เข้าสู่ระบบสำเร็จด้วย ${authResult.matchReason}`,
      matchReason: authResult.matchReason,
      user: safeUser,
      token: `mpr-session-${safeUser.id}-${Date.now()}`,
    });
  } catch (error: unknown) {
    return apiError(getErrorMessage(error, "เกิดข้อผิดพลาดในการประมวลผลการเข้าสู่ระบบ"), 500);
  }
}

export async function GET() {
  // Return list of available login methods and identifier types
  return NextResponse.json({
    success: true,
    supportedIdentifiers: [
      { type: "ALL", label: "ตรวจจับอัตโนมัติ (ทุกรหัส)" },
      { type: "MEMBER_ID", label: "รหัสสมาชิก (Member ID: MBR-XXXX)" },
      { type: "STUDENT_ID", label: "รหัสนิสิต (Student ID / รหัสสามเณร)" },
      { type: "POSITION_CODE", label: "รหัสตำแหน่ง (Position Code: POS-XXXX)" },
      { type: "CITIZEN_ID", label: "เลขประจำตัวประชาชน (๑๓ หลัก)" },
      { type: "PASSWORD", label: "รหัสผ่านส่วนตัว" },
    ],
    googleSsoEnabled: true,
  });
}
