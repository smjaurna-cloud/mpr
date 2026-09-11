import { NextResponse } from "next/server";
import { z } from "zod";
import { ApiResponse } from "@/types/common";

/**
 * Standard API Success Response Envelope
 */
export function apiSuccess<T>(
  data?: T,
  message?: string,
  status: number = 200,
  extra?: Record<string, unknown>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      ...(message ? { message } : {}),
      ...(data !== undefined ? { data } : {}),
      ...(extra || {}),
      timestamp: new Date().toISOString(),
    } as ApiResponse<T>,
    { status }
  );
}

/**
 * Standard API Error Response Envelope
 */
export function apiError(
  error: string,
  status: number = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Convert Zod validation errors to standard API response
 */
export function apiValidationError(zodError: z.ZodError): NextResponse<ApiResponse<null>> {
  const formattedErrors: Record<string, string[]> = {};
  for (const issue of zodError.issues) {
    const path = issue.path.join(".") || "payload";
    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }
    formattedErrors[path].push(issue.message);
  }

  const primaryMessage = zodError.issues[0]?.message || "ข้อมูลที่ส่งมาไม่ถูกต้องตามเกณฑ์";

  return NextResponse.json(
    {
      success: false,
      error: primaryMessage,
      details: formattedErrors,
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  );
}
