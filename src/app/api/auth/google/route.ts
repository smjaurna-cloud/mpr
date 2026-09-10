import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { authenticateGoogleUser, initialAuthUsers, AuthUser } from "@/data/authData";

// Global store reference
let googleUsersStore: AuthUser[] = [...initialAuthUsers];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatarUrl } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "กรุณาระบุอีเมลบัญชี Google",
        },
        { status: 400 }
      );
    }

    const { user, isNew } = authenticateGoogleUser(
      email,
      name,
      avatarUrl,
      googleUsersStore
    );

    if (isNew) {
      googleUsersStore.push(user);
    }

    const { password, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      isNewMember: isNew,
      message: isNew
        ? `สร้างบัญชีและเข้าสู่ระบบสำเร็จด้วย Google (${email})`
        : `เข้าสู่ระบบสำเร็จด้วย Google Workspace (${email})`,
      user: safeUser,
      token: `mpr-google-session-${safeUser.id}-${Date.now()}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "เกิดข้อผิดพลาดในการยืนยันตัวตนด้วย Google",
      },
      { status: 500 }
    );
  }
}
