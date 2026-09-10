import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { 
  initialAuthUsers, 
  authenticateMultiIdentifier, 
  IdentifierType,
  AuthUser 
} from "@/data/authData";

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
    const { identifierName, secretCode, idType } = body;

    if (!identifierName || !secretCode) {
      return NextResponse.json(
        {
          success: false,
          error: "กรุณาระบุชื่อผู้ใช้งาน/ฉายา และรหัสระบุตัวตน (รหัสสมาชิก / รหัสนิสิต / รหัสตำแหน่ง / เลขบัตรประชาชน)",
        },
        { status: 400 }
      );
    }

    const authResult = authenticateMultiIdentifier(
      identifierName,
      secretCode,
      (idType as IdentifierType) || "ALL",
      authUsersStore
    );

    if (!authResult.user) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error || "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง",
        },
        { status: 401 }
      );
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "เกิดข้อผิดพลาดในการประมวลผลการเข้าสู่ระบบ",
      },
      { status: 500 }
    );
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
