import { NextRequest, NextResponse } from "next/server";
import {
  mockVisitorOverview,
  mockDailyTrends,
  mockHourlyTraffic,
  mockTrafficSources,
  mockDeviceBreakdown,
  mockGeographicVisitors,
  mockTopVisitedRoutes,
} from "@/data/visitorAnalyticsData";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      overview: mockVisitorOverview,
      dailyTrends: mockDailyTrends,
      hourlyTraffic: mockHourlyTraffic,
      trafficSources: mockTrafficSources,
      deviceBreakdown: mockDeviceBreakdown,
      geographicVisitors: mockGeographicVisitors,
      topVisitedRoutes: mockTopVisitedRoutes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
