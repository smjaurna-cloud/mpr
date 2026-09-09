// ============================================================================
// ข้อมูลสถิติผู้เข้าเยี่ยมชมและปริมาณการใช้งานระบบ (MOD-18: Visitor Analytics)
// มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
// ============================================================================

export interface DailyTrafficTrend {
  date: string;
  dayName: string;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

export interface HourlyTraffic {
  hour: string;
  visits: number;
}

export interface TrafficSource {
  sourceName: string;
  sourceCategory: "QR_CODE" | "SEARCH_ENGINE" | "MCU_PORTAL" | "SOCIAL_MEDIA" | "DIRECT";
  visits: number;
  percentage: number;
  iconType: string;
}

export interface DeviceBreakdown {
  deviceType: string;
  percentage: number;
  visits: number;
  browserTop: string;
}

export interface GeographicVisitor {
  regionOrCountry: string;
  isInternational: boolean;
  visitorsCount: number;
  flagEmoji: string;
  notes: string;
}

export interface TopVisitedRoute {
  path: string;
  title: string;
  category: string;
  pageViews: number;
  avgDurationSec: number;
  bounceRatePercent: number;
}

export interface VisitorAnalyticsOverview {
  activeNow: number;
  visitsToday: number;
  visitsYesterday: number;
  visitsThisMonth: number;
  visitsAllTime: number;
  avgTimeOnSiteSec: number;
  bounceRatePercent: number;
  lastUpdated: string;
}

export const mockVisitorOverview: VisitorAnalyticsOverview = {
  activeNow: 42,
  visitsToday: 1428,
  visitsYesterday: 1895,
  visitsThisMonth: 38920,
  visitsAllTime: 128450,
  avgTimeOnSiteSec: 285, // 4 นาที 45 วินาที
  bounceRatePercent: 24.6,
  lastUpdated: "2026-09-09 13:30",
};

export const mockDailyTrends: DailyTrafficTrend[] = [
  { date: "2026-09-03", dayName: "พฤหัสบดี", visits: 1640, uniqueVisitors: 1210, pageViews: 4890 },
  { date: "2026-09-04", dayName: "ศุกร์", visits: 1780, uniqueVisitors: 1350, pageViews: 5240 },
  { date: "2026-09-05", dayName: "เสาร์", visits: 2150, uniqueVisitors: 1680, pageViews: 6720 },
  { date: "2026-09-06", dayName: "อาทิตย์ (วันพระ)", visits: 2490, uniqueVisitors: 1920, pageViews: 7850 },
  { date: "2026-09-07", dayName: "จันทร์", visits: 1720, uniqueVisitors: 1280, pageViews: 5120 },
  { date: "2026-09-08", dayName: "อังคาร", visits: 1895, uniqueVisitors: 1410, pageViews: 5630 },
  { date: "2026-09-09", dayName: "พุธ (วันนี้)", visits: 1428, uniqueVisitors: 1090, pageViews: 4310 },
];

export const mockHourlyTraffic: HourlyTraffic[] = [
  { hour: "04:00", visits: 85 },   // เวลาตื่นทำวัตรเช้า
  { hour: "06:00", visits: 142 },  // เวลาบิณฑบาต
  { hour: "08:00", visits: 210 },  // เริ่มคาบเรียนบาลีเช้า
  { hour: "10:00", visits: 295 },  // ตรวจตารางเพล & ภัตตาหาร
  { hour: "12:00", visits: 180 },  // พักเพล
  { hour: "14:00", visits: 260 },  // คาบเรียนบาลีบ่าย
  { hour: "16:00", visits: 195 },  // นาวิกรรม & กิจกรรม
  { hour: "18:00", visits: 230 },  // ทำวัตรเย็น
  { hour: "20:00", visits: 310 },  // เวลาท่องมุขปาฐะ & ค้นคว้าออนไลน์ (Peak)
  { hour: "22:00", visits: 125 },  // จำวัด
];

export const mockTrafficSources: TrafficSource[] = [
  {
    sourceName: "สแกน QR Code ประชาสัมพันธ์ / ป้าย Standee",
    sourceCategory: "QR_CODE",
    visits: 43673,
    percentage: 34.0,
    iconType: "QrCode",
  },
  {
    sourceName: "การค้นหาผ่าน Google (Search Organic)",
    sourceCategory: "SEARCH_ENGINE",
    visits: 35966,
    percentage: 28.0,
    iconType: "Search",
  },
  {
    sourceName: "เว็บไซต์ส่วนกลาง มจร (palitheravada.mcu.ac.th / mcu.ac.th)",
    sourceCategory: "MCU_PORTAL",
    visits: 26975,
    percentage: 21.0,
    iconType: "Globe",
  },
  {
    sourceName: "สื่อสังคมออนไลน์ (Facebook / Line Official โยมอุปถัมภ์)",
    sourceCategory: "SOCIAL_MEDIA",
    visits: 15414,
    percentage: 12.0,
    iconType: "Share2",
  },
  {
    sourceName: "เข้าชมโดยตรง / บุ๊กมาร์ก (Direct URL)",
    sourceCategory: "DIRECT",
    visits: 6422,
    percentage: 5.0,
    iconType: "ExternalLink",
  },
];

export const mockDeviceBreakdown: DeviceBreakdown[] = [
  {
    deviceType: "สมาร์ทโฟนมือถือ (Mobile)",
    percentage: 68.4,
    visits: 87860,
    browserTop: "Chrome Mobile / Safari iOS",
  },
  {
    deviceType: "คอมพิวเตอร์ตั้งโต๊ะ/โน้ตบุ๊ก (Desktop)",
    percentage: 26.8,
    visits: 34425,
    browserTop: "Chrome / Edge / Safari",
  },
  {
    deviceType: "แท็บเล็ต (Tablet/iPad)",
    percentage: 4.8,
    visits: 6165,
    browserTop: "iPadOS Safari / Chrome",
  },
];

export const mockGeographicVisitors: GeographicVisitor[] = [
  {
    regionOrCountry: "จังหวัดนครปฐม (พื้นที่ตั้งวิทยาลัย)",
    isInternational: false,
    visitorsCount: 46250,
    flagEmoji: "🇹🇭",
    notes: "พระสงฆ์ สามเณร เจ้าหน้าที่ และสาธุชนในพื้นที่กำแพงแสน",
  },
  {
    regionOrCountry: "กรุงเทพมหานครและปริมณฑล",
    isInternational: false,
    visitorsCount: 38400,
    flagEmoji: "🇹🇭",
    notes: "คณะกรรมการสภาวิทยาลัย มจร, โยมอุปถัมภ์, ผู้สมัครเรียน มคอ.๒",
  },
  {
    regionOrCountry: "ภาคกลางและภูมิภาคอื่นทั่วประเทศ",
    isInternational: false,
    visitorsCount: 24500,
    flagEmoji: "🇹🇭",
    notes: "วัดเครือข่ายบาลีศากยบุตร และโรงเรียนพระปริยัติธรรมทั่วประเทศ",
  },
  {
    regionOrCountry: "ประเทศบังกลาเทศ (Chakma & Barua Community)",
    isInternational: true,
    visitorsCount: 9650,
    flagEmoji: "🇧🇩",
    notes: "ครอบครัวและญาติโยมของพระภิกษุและสามเณรชนเผ่าชาคมาและบารูอา ๑๖ รูป",
  },
  {
    regionOrCountry: "ประเทศศรีลังกา (Sri Lanka)",
    isInternational: true,
    visitorsCount: 4320,
    flagEmoji: "🇱🇰",
    notes: "เครือข่ายสถาบันบาลีเถรวาทและครอบครัวสามเณรศรีลังกา ๔ รูป",
  },
  {
    regionOrCountry: "สาธารณรัฐประชาธิปไตยประชาชนลาว (Lao PDR)",
    isInternational: true,
    visitorsCount: 3180,
    flagEmoji: "🇱🇦",
    notes: "คณะสงฆ์ลาวและครอบครัวสามเณรลาว ๔ รูป",
  },
  {
    regionOrCountry: "สาธารณรัฐแห่งสหภาพเมียนมา (Myanmar)",
    isInternational: true,
    visitorsCount: 2150,
    flagEmoji: "🇲🇲",
    notes: "นักวิชาการพระอภิธรรมปิฎกและคัมภีร์บาลีโบราณ",
  },
];

export const mockTopVisitedRoutes: TopVisitedRoute[] = [
  {
    path: "/monastic-life",
    title: "กิจวัตร & ทะเบียนพระภิกษุ-สามเณร ๑๔๓ รูป",
    category: "วิถีศากยบุตร",
    pageViews: 32450,
    avgDurationSec: 360,
    bounceRatePercent: 18.2,
  },
  {
    path: "/alms-patron",
    title: "ภัตตาหาร & โยมอุปถัมภ์ e-Donation",
    category: "ศรัทธาอุปถัมภ์",
    pageViews: 28900,
    avgDurationSec: 240,
    bounceRatePercent: 15.4,
  },
  {
    path: "/complaints-tracking",
    title: "ศูนย์รับเรื่องร้องเรียน QR Code & ติดตามงานทุกระบบ",
    category: "ธรรมาภิบาล ITA",
    pageViews: 21400,
    avgDurationSec: 310,
    bounceRatePercent: 20.1,
  },
  {
    path: "/graduate-curriculum",
    title: "หลักสูตรระดับบัณฑิตศึกษา มคอ.๒ พธ.ด./พธ.ม.",
    category: "วิชาการบัณฑิต",
    pageViews: 19850,
    avgDurationSec: 420,
    bounceRatePercent: 22.8,
  },
  {
    path: "/library",
    title: "คลังพระไตรปิฎก ๔๕ เล่ม & คลังเอกสารราชการ",
    category: "สารสนเทศพระไตรปิฎก",
    pageViews: 17300,
    avgDurationSec: 480,
    bounceRatePercent: 16.5,
  },
  {
    path: "/classrooms",
    title: "ผัง ๖ ห้องเรียน A1-A6 & บาลีสนามหลวง",
    category: "การศึกษาพระปริยัติธรรม",
    pageViews: 15600,
    avgDurationSec: 290,
    bounceRatePercent: 19.4,
  },
  {
    path: "/vehicle-booking",
    title: "ระบบยานพาหนะ & ขอใช้รถส่วนกลาง ๑๐ คัน",
    category: "บริหารงานวิทยาลัย",
    pageViews: 11200,
    avgDurationSec: 210,
    bounceRatePercent: 26.5,
  },
  {
    path: "/planning-budget",
    title: "แผนงบประมาณปี ๖๙ (๘๑.๔ ลบ.) & e-Bidding",
    category: "ยุทธศาสตร์และแผนงาน",
    pageViews: 9800,
    avgDurationSec: 330,
    bounceRatePercent: 25.0,
  },
];
