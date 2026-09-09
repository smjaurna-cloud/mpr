import { NextRequest, NextResponse } from "next/server";
import { officialMonksList, officialNovicesList, getSanghaStatistics } from "@/data/sanghaData";
import { mockSamaneras } from "@/data/mockData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "all"; // all, monks, novices, stats
    const search = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category"); // THAI, INTERNATIONAL

    const stats = getSanghaStatistics();

    if (type === "stats") {
      return NextResponse.json({
        success: true,
        data: {
          ...stats,
          asOfDate: "๒๕๖๙",
          institution: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
        },
      });
    }

    if (type === "monks") {
      let filtered = officialMonksList;
      if (search) {
        filtered = filtered.filter(
          (m) =>
            m.fullName.toLowerCase().includes(search) ||
            m.chaya.toLowerCase().includes(search) ||
            m.sanghaRole.toLowerCase().includes(search)
        );
      }
      return NextResponse.json({
        success: true,
        total: filtered.length,
        data: filtered,
      });
    }

    if (type === "novices") {
      let filtered = mockSamaneras;
      if (search) {
        filtered = filtered.filter(
          (n) =>
            n.fullName.toLowerCase().includes(search) ||
            n.paliName.toLowerCase().includes(search) ||
            n.enrollmentNo.toLowerCase().includes(search) ||
            n.kuti.toLowerCase().includes(search)
        );
      }
      if (category === "THAI") {
        filtered = filtered.filter((n) => n.patronName.includes("โยมอุปถัมภ์วัดบาลี"));
      } else if (category === "INTERNATIONAL") {
        filtered = filtered.filter((n) => n.patronName.includes("นานาชาติ"));
      }

      return NextResponse.json({
        success: true,
        total: filtered.length,
        data: filtered,
      });
    }

    // Default: all Sangha members (143)
    return NextResponse.json({
      success: true,
      summary: {
        totalSangha: stats.totalSangha,
        totalMonks: stats.totalMonks,
        totalNovices: stats.totalNovices,
        thaiNovices: stats.thaiNovices,
        internationalNovices: stats.internationalNovices,
      },
      monks: officialMonksList,
      novices: mockSamaneras,
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
    const { action, samaneraId, routineKey, status } = body;

    if (action === "UPDATE_ROUTINE") {
      if (!samaneraId || !routineKey) {
        return NextResponse.json(
          { success: false, error: "Missing required fields: samaneraId or routineKey" },
          { status: 400 }
        );
      }

      // Simulate updating routine state
      return NextResponse.json({
        success: true,
        message: `บันทึกกิจวัตร ${routineKey} ของรหัส ${samaneraId} เรียบร้อยแล้ว`,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action type" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
