"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  HeartHandshake, 
  Utensils, 
  BookMarked, 
  FileCheck2, 
  Share2,
  Scroll,
  Info,
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
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const navigationGroups: NavGroup[] = [
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white/70 backdrop-blur border-r border-amber-200/70 shrink-0 flex flex-col justify-between p-4 space-y-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
      <div className="space-y-4">
        <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
            <Scroll className="w-4 h-4 text-amber-700" />
            <span>ระบบบริหารสถาบันศาสนทายาท</span>
          </div>
          <p className="text-[11px] text-amber-800/80 mt-1">
            มุ่งสร้างศากยบุตรสามเณรสีหะ ผู้ทรงพระไตรปิฎกบาลีเถรวาท
          </p>
        </div>

        <nav className="space-y-4">
          {navigationGroups.map((group) => (
            <div key={group.groupName} className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900/60 bg-amber-100/40 rounded-md">
                {group.groupName}
              </div>
              <div className="space-y-1 pt-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all group",
                        isActive
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-700/20 font-semibold"
                          : "text-slate-700 hover:bg-amber-50/80 hover:text-amber-900"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-amber-100" : "text-amber-700 group-hover:scale-110 transition-transform")} />
                        <div className="min-w-0">
                          <p className="leading-tight truncate">{item.name}</p>
                          <p className={cn("text-[10px] truncate", isActive ? "text-amber-100" : "text-slate-400")}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ml-1",
                          isActive ? "bg-amber-800/60 text-amber-100" : "bg-amber-100/70 text-amber-800"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* College Info Box */}
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-2 mt-auto">
        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
          <Info className="w-4 h-4 text-amber-600" />
          <span>ข้อมูลวิทยาเขต</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม<br/>
          สังกัด: มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)
        </p>
        <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
          <span>เวอร์ชัน ๑.๐ MVP (๑๓ โมดูล)</span>
          <span className="text-emerald-600 font-medium">● ระบบสมบูรณ์</span>
        </div>
      </div>
    </aside>
  );
}
