import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
import { authenticateGoogleUser, initialAuthUsers, AuthUser } from "@/data/authData";
import { googleAuthSchema } from "@/lib/validations/auth";
import { apiSuccess, apiError, apiValidationError } from "@/lib/apiResponse";
import { getErrorMessage } from "@/lib/utils";

// Global store reference
const googleUsersStore: AuthUser[] = [...initialAuthUsers];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = googleAuthSchema.safeParse(body);

    if (!parseResult.success) {
      return apiValidationError(parseResult.error);
    }

    const { email, name, avatarUrl } = parseResult.data;

    const { user, isNew } = authenticateGoogleUser(
      email,
      name,
      avatarUrl,
      googleUsersStore
    );

    if (isNew) {
      googleUsersStore.push(user);
    }

    const { password: _, ...safeUser } = user;

    return apiSuccess(
      safeUser,
      isNew
        ? `สร้างบัญชีและเข้าสู่ระบบสำเร็จด้วย Google (${email})`
        : `เข้าสู่ระบบสำเร็จด้วย Google Workspace (${email})`,
      200,
      {
        isNewMember: isNew,
        user: safeUser,
        token: `mpr-google-session-${safeUser.id}-${Date.now()}`,
      }
    );
  } catch (error: unknown) {
    return apiError(
      getErrorMessage(error, "เกิดข้อผิดพลาดในการยืนยันตัวตนด้วย Google"),
      500
    );
  }
}

