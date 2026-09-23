import React from "react";
import { 
  LayoutDashboard, 
  HeartHandshake, 
  Utensils, 
  BookMarked, 
  FileCheck2, 
  Share2,
  Scroll,
  Users,
  Building2,
  UserCog,
  Coins,
  Target,
  BookOpen,
  Microscope,
  GraduationCap,
  UserCheck,
  School,
  Car,
  QrCode,
  BarChart3,
  MessageSquareText,
  Award,
  PhoneCall,
  Eye,
  Database,
} from "lucide-react";

export interface NavItem {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    groupName: "ศูนย์อำนวยการ & วิถีศากยบุตร",
    items: [
      {
        name: "แดชบอร์ดภาพรวม",
        description: "Executive Cockpit & BI",
        href: "/",
        icon: LayoutDashboard,
        badge: "รวมศูนย์",
      },
      {
        name: "วิถีชีวิต & สุขภาวะสามเณร",
        description: "MOD-01: กิจวัตร 24 ชม. & เวชระเบียน",
        href: "/monastic-life",
        icon: HeartHandshake,
        badge: "๒๔ ชม.",
      },
      {
        name: "ภัตตาหาร & โยมอุปถัมภ์",
        description: "MOD-02: ปฏิทินจองเพล & e-Donation",
        href: "/alms-patron",
        icon: Utensils,
        badge: "LINE",
      },
      {
        name: "มุขปาฐะ & บาลีศึกษา",
        description: "MOD-03: สาธยายคัมภีร์ & บันทึกเสียง",
        href: "/mukhopatha",
        icon: BookMarked,
        badge: "ศากยบุตร",
      },
      {
        name: "แชตบอร์ด & สนทนาธรรม",
        description: "MOD-19: กระดานสนทนา & ห้องแชตสด",
        href: "/chat-board",
        icon: MessageSquareText,
        badge: "Live",
      },
    ],
  },
  {
    groupName: "สำนักงานวิทยาลัย (ฝ่ายบริหาร)",
    items: [
      {
        name: "บริหารงานบุคคล",
        description: "บุคลากร พระอาจารย์ & เจ้าหน้าที่",
        href: "/hr",
        icon: UserCog,
        badge: "อัตรากำลัง",
      },
      {
        name: "การเงิน บัญชี และพัสดุ",
        description: "๓ กองทุน & คลังสังฆภัณฑ์",
        href: "/finance-procurement",
        icon: Coins,
        badge: "การเงิน",
      },
      {
        name: "แผนงานและงบประมาณ",
        description: "กรอบงบประมาณปี ๖๙ (๘๑.๔ ลบ.) & ยุทธศาสตร์ ๕ ปี",
        href: "/planning-budget",
        icon: Target,
        badge: "งบ ๖๙",
      },
      {
        name: "สารบรรณ & อนุมัติมือถือ",
        description: "MOD-04: เกษียณหนังสือ & ลายเซ็น",
        href: "/e-approval",
        icon: FileCheck2,
        badge: "ด่วนที่สุด",
      },
      {
        name: "ห้องประชุมอัจฉริยะ",
        description: "MOD-07: จองห้อง & ป้ายดิจิทัล",
        href: "/meeting-rooms",
        icon: Building2,
        badge: "Smart",
      },
      {
        name: "บริหารผู้ใช้ & สิทธิ์",
        description: "MOD-06: บัญชีผู้ใช้ & สิทธิ์สงฆ์",
        href: "/users",
        icon: Users,
        badge: "RBAC",
      },
      {
        name: "ยานพาหนะ & ระบบจองรถ",
        description: "MOD-16: รถส่วนกลาง ๑๐ คัน & ขอใช้รถ",
        href: "/vehicle-booking",
        icon: Car,
        badge: "๑๐ คัน",
      },
      {
        name: "เรื่องร้องเรียน & ติดตามงาน",
        description: "MOD-17: QR Code ร้องเรียน & ติดตามงานทุกระบบ",
        href: "/complaints-tracking",
        icon: QrCode,
        badge: "QR & Track",
      },
      {
        name: "สถิติผู้เข้าเยี่ยมชม",
        description: "MOD-18: ทราฟฟิกสด & การใช้งานระบบ",
        href: "/visitor-analytics",
        icon: BarChart3,
        badge: "Live",
      },
      {
        name: "ช่องทางติดต่อราชการ",
        description: "MOD-21: ทำเนียบ ๘ ฝ่ายงาน & แผนที่ (ITA O4)",
        href: "/contact",
        icon: PhoneCall,
        badge: "ITA O4",
      },
      {
        name: "ศูนย์อัปเดตข้อมูลทุกระบบ",
        description: "MOD-23: อัปเดตข้อมูลสด & Excel ทุกฝ่าย",
        href: "/data-updater",
        icon: Database,
        badge: "MOD-23",
      },
    ],
  },
  {
    groupName: "สำนักวิชาการ (ฝ่ายวิชาการ)",
    items: [
      {
        name: "ทะเบียน & เชื่อม มจร",
        description: "MOD-05: ทะเบียนสงฆ์ & MCU REG",
        href: "/mcu-bridge",
        icon: Share2,
        badge: "REG",
      },
      {
        name: "พระไตรปิฎก & สารสนเทศ",
        description: "คัมภีร์บาลีสากล & หอสมุด",
        href: "/library",
        icon: BookOpen,
        badge: "พระไตรปิฎก",
      },
      {
        name: "เปิดอ่านเอกสาร & พรีวิวไฟล์",
        description: "MOD-22: Word, Excel, PDF อัจฉริยะ",
        href: "/file-viewer",
        icon: Eye,
        badge: "DocViewer",
      },
      {
        name: "งานวิจัย & คุณภาพการศึกษา",
        description: "คลังงานวิจัยพุทธ & ประกัน AUN-QA",
        href: "/research-qa",
        icon: Microscope,
        badge: "QA",
      },
      {
        name: "บริการการศึกษา",
        description: "ตารางเรียนบาลี & โครงการบริการสังคม",
        href: "/academic-services",
        icon: GraduationCap,
        badge: "วิชาการ",
      },
      {
        name: "ห้องเรียน & บาลีสนามหลวง",
        description: "๖ ห้องเรียน A1-A6 & ทะเบียนสามเณร",
        href: "/classrooms",
        icon: School,
        badge: "A1-A6",
      },
      {
        name: "หลักสูตรบัณฑิตศึกษา (มคอ.๒)",
        description: "ป.โท-ป.เอก พระไตรปิฎก & พระอภิธรรม",
        href: "/graduate-curriculum",
        icon: BookMarked,
        badge: "มคอ.๒",
      },
      {
        name: "จัดการหลักสูตร (JSON Hub)",
        description: "แก้ไขหลักสูตร & นำเข้า-ส่งออก JSON",
        href: "/academic-programs",
        icon: Scroll,
        badge: "JSON",
      },
      {
        name: "ติดตามเข้าเรียน & บัณฑิตศึกษา",
        description: "สแกนใบหน้า, ๔ ห้อง Zoom, ค่าเทอม & ร้องเรียน",
        href: "/attendance-tracking",
        icon: UserCheck,
        badge: "FaceScan",
      },
      {
        name: "ความก้าวหน้าบัณฑิตศึกษา",
        description: "MOD-20: หมุดหมายดุษฎีนิพนธ์ & วิทยานิพนธ์",
        href: "/graduate-progress",
        icon: Award,
        badge: "ป.โท-เอก",
      },
    ],
  },
];
