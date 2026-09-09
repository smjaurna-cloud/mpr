import { NextRequest, NextResponse } from "next/server";
import { mockSystemUsers, SystemUser } from "@/data/mockData";

let userStore: SystemUser[] = [...mockSystemUsers];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("q")?.toLowerCase() || "";

    let result = [...userStore];

    if (role && role !== "ALL") {
      result = result.filter((u) => u.role === role);
    }
    if (status && status !== "ALL") {
      result = result.filter((u) => u.accountStatus === status);
    }
    if (search) {
      result = result.filter(
        (u) =>
          u.fullName.toLowerCase().includes(search) ||
          (u.paliName && u.paliName.toLowerCase().includes(search)) ||
          u.email.toLowerCase().includes(search) ||
          u.department.toLowerCase().includes(search)
      );
    }

    // Sanitize passwords from API response for security
    const sanitized = result.map(({ password, ...rest }) => rest);

    return NextResponse.json({
      success: true,
      total: sanitized.length,
      data: sanitized,
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
    const { fullName, title, role, email, phone, department, originTemple } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุชื่อ-นามสกุล และอีเมลของผู้ใช้งาน" },
        { status: 400 }
      );
    }

    const isMonk = title?.includes("พระ");
    const isSamanera = title?.includes("สามเณร");
    const monasticStatus = isMonk ? "ACTIVE_MONK" : isSamanera ? "ACTIVE_SAMANERA" : "LAYPERSON";

    const newUser: SystemUser = {
      id: `usr-${Date.now()}`,
      username: email.split("@")[0],
      fullName: title ? `${title} ${fullName}` : fullName,
      title: title || "นาย",
      originTemple: originTemple || "วัดบาลีเถรวาทสังฆาราม",
      department: department || "สำนักวิชาการ",
      role: role || "PALI_TEACHER",
      monasticStatus,
      accountStatus: "ACTIVE",
      email,
      phone: phone || "081-xxx-xxxx",
      lineConnected: false,
      lastLogin: "ยังไม่เคยเข้าสู่ระบบ",
      permissions: {
        monasticLife: role === "SUPER_ADMIN" ? "FULL" : "READ",
        almsPatron: role === "SUPER_ADMIN" ? "FULL" : "READ",
        mukhopatha: role === "SUPER_ADMIN" || role === "PALI_TEACHER" ? "FULL" : "READ",
        eApproval: role === "SUPER_ADMIN" ? "FULL" : "NONE",
        mcuBridge: role === "SUPER_ADMIN" ? "FULL" : "READ",
        userManagement: role === "SUPER_ADMIN" ? "FULL" : "NONE",
      },
    };

    userStore = [newUser, ...userStore];

    const { password, ...safeUser } = newUser;
    return NextResponse.json({
      success: true,
      message: `สร้างบัญชีผู้ใช้ ${newUser.fullName} สำเร็จ`,
      data: safeUser,
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
    const { id, action } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = userStore.find((u) => u.id === id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (action === "TOGGLE_STATUS") {
      user.accountStatus = user.accountStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
      return NextResponse.json({
        success: true,
        message: `ปรับสถานะบัญชี ${user.fullName} เป็น ${user.accountStatus} เรียบร้อย`,
        data: { id: user.id, accountStatus: user.accountStatus },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
