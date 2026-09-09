import { NextRequest, NextResponse } from "next/server";
import { mockAlmsBookings, AlmsBookingItem } from "@/data/mockData";

// In-memory store for pilot execution
let almsStore: AlmsBookingItem[] = [...mockAlmsBookings];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");
    const isAuthorized = searchParams.get("authorized") === "true";

    let result = [...almsStore];

    if (date) {
      result = result.filter((b) => b.date === date);
    }
    if (status) {
      result = result.filter((b) => b.status === status);
    }

    // Apply PDPA masking if not authorized staff
    const sanitized = result.map((item) => {
      if (isAuthorized) return item;
      const cleanPhone = item.hostPhone.replace(/[^0-9]/g, "");
      const maskedPhone =
        cleanPhone.length >= 9
          ? `${cleanPhone.slice(0, 3)}-xxx-${cleanPhone.slice(-4)}`
          : item.hostPhone;
      return {
        ...item,
        hostPhone: maskedPhone,
      };
    });

    const totalDonation = result.reduce((sum, b) => sum + b.amount, 0);

    return NextResponse.json({
      success: true,
      totalCount: sanitized.length,
      totalDonationAmount: totalDonation,
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
    const { date, mealType, hostName, hostPhone, occasion, guestCount, menu, amount } = body;

    if (!hostName || !date) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุชื่อเจ้าภาพและวันที่จองภัตตาหาร" },
        { status: 400 }
      );
    }

    const cleanDate = date.replace(/-/g, "");
    const randomHash = Math.floor(100000 + Math.random() * 900000);
    const newBooking: AlmsBookingItem = {
      id: `alm-${Date.now()}`,
      date,
      mealType: mealType || "ภัตตาหารเพล",
      hostName,
      hostPhone: hostPhone || "081-xxx-xxxx",
      occasion: occasion || "ถวายมหาทานบารมีภัตตาหารเพล",
      guestCount: guestCount ? Number(guestCount) : 10,
      menu: menu || "ภัตตาหารตามพระวินัย",
      amount: amount ? Number(amount) : 10000,
      status: "CONFIRMED",
      eDonationHash: `EDON-${cleanDate}-${randomHash}`,
    };

    almsStore = [newBooking, ...almsStore];

    return NextResponse.json({
      success: true,
      message: "บันทึกการจองภัตตาหารเพลและออกรหัส e-Donation สำเร็จ",
      data: newBooking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
