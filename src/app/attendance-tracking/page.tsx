"use client";

import React, { useState } from "react";
import { 
  ScanFace, 
  Video, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Users,
  Clock,
  BookOpen,
  Calendar
} from "lucide-react";

interface ScheduleItem {
  id: string;
  day: "วันพฤหัสบดี" | "วันศุกร์";
  period: string;
  timeRange: string;
  courseCode: string;
  courseNameTh: string;
  courseNameEn?: string;
  courseType: string;
  credits: string;
  instructor: string;
  teachingTeam?: string[];
  cohortPlan?: string;
}

interface ZoomRoomInfo {
  roomNumber: number;
  name: string;
  targetProgram: string;
  location: string;
  account: string;
  pass: string;
  zoomUrl: string;
  isLive: boolean;
  topic: string;
  schedules?: ScheduleItem[];
}

const ZOOM_ROOMS: ZoomRoomInfo[] = [
  {
    roomNumber: 1,
    name: "ซูมห้องที่ ๑ (พธ.ม. พระไตรปิฎกเถรวาท)",
    targetProgram: "พุทธศาสตรมหาบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท รุ่นที่ ๓ (ชั้นปีที่ ๑)",
    location: "อาคารพระไตรปิฎกศึกษา ชั้น ๑ ห้อง ๑๐๑",
    account: "mcu.bv352@gmail.com",
    pass: "MCU-034352253.zoom",
    zoomUrl: "https://zoom.us/join",
    isLive: true,
    topic: "๖๒๐ ๑๐๑ หลักประมวลคำสอนของพระพุทธเจ้าในพระไตรปิฎกเถรวาท",
    schedules: [
      {
        id: "sch-r1-1",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๖๒๐ ๑๐๑",
        courseNameTh: "หลักประมวลคำสอนของพระพุทธเจ้าในพระไตรปิฎกเถรวาท",
        courseNameEn: "The Nine Bases of Buddha Teaching in Theravada Tipitaka",
        courseType: "วิชาบังคับ",
        credits: "๓ (๓-๐-๖)",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร", "อ.ดร.ประสิทธิ์ อัครสุวรรณกุล", "ดร.อวยพร ทิพย์สุวรรณ"],
        cohortPlan: "พธ.ม. พระไตรปิฎกเถรวาท ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r1-2",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๐ ๑๐๔",
        courseNameTh: "การวิเคราะห์พระวินัยปิฎกเถรวาท",
        courseNameEn: "Theravada Vinaya Pitaka Analysis",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร.", "พระมหาประสิทธิ์ ญาณรํสี, ผศ.ดร."],
        cohortPlan: "พธ.ม. พระไตรปิฎกเถรวาท ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r1-3",
        day: "วันศุกร์",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๖๒๐ ๑๐๕",
        courseNameTh: "ทฤษฎีและวิธีวิเคราะห์พระสุตตันตปิฎกเถรวาท",
        courseNameEn: "Theravada Suttanta Pitaka Analysis",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "รศ.ดร.เวทย์ บรรณกรกุล และคณะ",
        teachingTeam: ["รศ.ดร.เวทย์ บรรณกรกุล", "พระมหาชาญชัย, ผศ.ดร.", "ดร.อวยพร ทิพย์สุวรรณ"],
        cohortPlan: "พธ.ม. พระไตรปิฎกเถรวาท ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r1-4",
        day: "วันศุกร์",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๐ ๑๐๒",
        courseNameTh: "ระเบียบวิธีวิจัยขั้นสูง",
        courseNameEn: "Advanced Research Methodology in the Tipitaka",
        courseType: "วิชาบังคับ",
        credits: "๓ (๓-๐-๖)",
        instructor: "พระราชรัตนมุนี, รศ.ดร. และคณะ",
        teachingTeam: ["พระราชรัตนมุนี, รศ.ดร.", "พระมหาบุญเลิศ อินฺทปญฺโญ, ศ.ดร.", "ผศ.ดร.ประสิทธิ์ มีนวล"],
        cohortPlan: "พธ.ม. พระไตรปิฎกเถรวาท ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
    ],
  },
  {
    roomNumber: 2,
    name: "ซูมห้องที่ ๒ (พธ.ม. พระอภิธรรมปิฎก)",
    targetProgram: "พุทธศาสตรมหาบัณฑิต สาขาวิชาพระอภิธรรมปิฎก รุ่นที่ ๑ และ ๒ (ชั้นปีที่ ๑ และ ๒)",
    location: "อาคารพระไตรปิฎกศึกษา ชั้น ๑ ห้อง ๑๐๒",
    account: "palitheravad034352253@gmail.com",
    pass: "MCU-034352253.zoom",
    zoomUrl: "https://zoom.us/join",
    isLive: true,
    topic: "๖๒๑ ๑๐๑ การศึกษาคัมภีร์ธัมมสังคณี / ๖๒๒ ๒๐๗ จิตวิทยาในพระอภิธรรม",
    schedules: [
      {
        id: "sch-r2-1",
        day: "วันพฤหัสบดี",
        period: "คาบเช้า",
        timeRange: "๐๙.๐๐ - ๑๑.๓๐ น.",
        courseCode: "๖๒๑ ๑๐๐",
        courseNameTh: "การใช้ภาษาบาลีเพื่อการศึกษาคัมภีร์",
        courseNameEn: "Usage of Pali",
        courseType: "วิชาปรับพื้นฐาน",
        credits: "ไม่นับหน่วยกิต",
        instructor: "พระมหาปิยะพันธุ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาปิยะพันธุ์, รศ.ดร."],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๑ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r2-2",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๖๒๑ ๑๐๑",
        courseNameTh: "การศึกษาคัมภีร์ธัมมสังคณี",
        courseNameEn: "A Study of Dhammasangani",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร", "ดร.ประภา สุวรรณเกต และคณะครู"],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๑ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r2-3",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๑ ๑๐๒",
        courseNameTh: "การศึกษาวิเคราะห์คัมภีร์ปุคคลบัญญัติ กถาวัตถุ และยมก",
        courseNameEn: "An Analytical Study of Puggalapannatti, Kathavatthu and Yamaka",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร."],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๑ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r2-4",
        day: "วันศุกร์",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๖๒๑ ๑๐๔",
        courseNameTh: "การศึกษาพระอภิธรรมปิฎก",
        courseNameEn: "Abhidhamma Pitaka Study",
        courseType: "วิชาบังคับ",
        credits: "๒-๓ (๓-๐-๖)",
        instructor: "ดร.ประภา และคณะครู",
        teachingTeam: ["ดร.ประภา สุวรรณเกต และคณะครู"],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๑ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r2-5",
        day: "วันศุกร์",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๑ ๑๐๓",
        courseNameTh: "การศึกษาวิเคราะห์คัมภีร์วิภังค์และธาตุกถา",
        courseNameEn: "An Analytical Study of Vibhanga and Dhatukatha",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "ดร.บุญชู พรหมเผ่าพันธุ์ และคณะ",
        teachingTeam: ["ดร.บุญชู พรหมเผ่าพันธุ์"],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๑ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r2-6",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๖๒๒ ๒๐๗",
        courseNameTh: "จิตวิทยาในพระอภิธรรม",
        courseNameEn: "Psychology in the Abhidhamma",
        courseType: "วิชาเลือก",
        credits: "๓ (๓-๐-๖)",
        instructor: "ดร.ประภา และคณะครู",
        teachingTeam: ["ดร.ประภา สุวรรณเกต และคณะครู"],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๒ (รุ่นที่ ๑)",
      },
      {
        id: "sch-r2-7",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๒ ๒๐๒",
        courseNameTh: "สัมมนาพระอภิธรรม",
        courseNameEn: "Seminar on Abhidhamma",
        courseType: "วิชาบังคับ",
        credits: "๓ (๓-๐-๖)",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร"],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๒ (รุ่นที่ ๑)",
      },
      {
        id: "sch-r2-8",
        day: "วันศุกร์",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๖๒๒ ๒๐๑",
        courseNameTh: "กัมมัฏฐาน",
        courseNameEn: "Buddhist Meditation",
        courseType: "วิชาบังคับไม่นับหน่วยกิต",
        credits: "(๓) (๓-๐-๖)",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร."],
        cohortPlan: "พธ.ม. พระอภิธรรมปิฎก ชั้นปีที่ ๒ (รุ่นที่ ๑)",
      },
    ],
  },
  {
    roomNumber: 3,
    name: "ซูมห้องที่ ๓ (พธ.ด. พระไตรปิฎกเถรวาท)",
    targetProgram: "พุทธศาสตรดุษฎีบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท (รุ่นที่ ๒ และ ๓ แผน ๑.๑ และ ๒.๑)",
    location: "อาคารพระไตรปิฎกศึกษา ชั้น ๒ ห้อง ๒๐๑",
    account: "palitheravad27042564@hotmail.com",
    pass: "palitheravad27042564",
    zoomUrl: "https://zoom.us/join",
    isLive: true,
    topic: "๘๒๐ ๑๐๐ ดุษฎีนิพนธ์ / ๘๒๐ ๑๐๑ ระเบียบวิธีวิจัยทางพระไตรปิฎกขั้นสูง",
    schedules: [
      {
        id: "sch-r3-1",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๘๒๐ ๑๐๐",
        courseNameTh: "ดุษฎีนิพนธ์",
        courseNameEn: "Dissertation",
        courseType: "วิทยานิพนธ์/ดุษฎีนิพนธ์",
        credits: "๓๖ หน่วยกิต",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร.", "คณะกรรมการที่ปรึกษาดุษฎีนิพนธ์"],
        cohortPlan: "พธ.ด. แผน ๑.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-2",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๑๐๑",
        courseNameTh: "ระเบียบวิธีวิจัยทางพระไตรปิฎกขั้นสูง",
        courseNameEn: "Advanced Research Methodology in the Tipitaka",
        courseType: "วิชาบังคับไม่นับหน่วยกิต",
        credits: "(๓) (๓-๐-๖)",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร"],
        cohortPlan: "พธ.ด. แผน ๑.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-3",
        day: "วันศุกร์",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๘๒๐ ๑๐๒",
        courseNameTh: "พุทธปรัชญาวิทยาศาสตร์",
        courseNameEn: "Buddhist Philosophy of Science",
        courseType: "วิชาบังคับไม่นับหน่วยกิต",
        credits: "(๓) (๓-๐-๖)",
        instructor: "รศ.ดร.เวทย์ บรรณกรกุล และคณะ",
        teachingTeam: ["รศ.ดร.เวทย์ บรรณกรกุล"],
        cohortPlan: "พธ.ด. แผน ๑.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-4",
        day: "วันศุกร์",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๒๐๑",
        courseNameTh: "วิปัสสนากัมมัฏฐาน",
        courseNameEn: "Insight Meditation",
        courseType: "วิชาบังคับไม่นับหน่วยกิต",
        credits: "(๓) (๓-๐-๖)",
        instructor: "อาจารย์สมบูรณ์, รศ.ดร. และคณะ",
        teachingTeam: ["อาจารย์สมบูรณ์, รศ.ดร."],
        cohortPlan: "พธ.ด. แผน ๑.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-5",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๔ - ๖",
        timeRange: "๑๒.๔๕ - ๑๕.๔๕ น.",
        courseCode: "๘๒๐ ๑๐๓",
        courseNameTh: "สัมมนาพระพุทธศาสนากับสังคมไทย",
        courseNameEn: "Seminar on Buddhist University and Thai Society",
        courseType: "วิชาบังคับไม่นับหน่วยกิต",
        credits: "๓ (๓-๐-๖)",
        instructor: "ดร.บุญชู พรหมเผ่าพันธุ์ และคณะ",
        teachingTeam: ["ดร.บุญชู พรหมเผ่าพันธุ์"],
        cohortPlan: "พธ.ด. แผน ๒.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-6",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๑๐๑",
        courseNameTh: "ระเบียบวิธีวิจัยทางพระไตรปิฎกขั้นสูง",
        courseNameEn: "Advanced Research Methodology in the Tipitaka",
        courseType: "วิชาบังคับ",
        credits: "๓ (๓-๐-๖)",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร"],
        cohortPlan: "พธ.ด. แผน ๒.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-7",
        day: "วันศุกร์",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๒๐๒",
        courseNameTh: "สัมมนาพระไตรปิฎก",
        courseNameEn: "Seminar on Tipitaka",
        courseType: "วิชาเอก",
        credits: "๓ (๓-๐-๖)",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร."],
        cohortPlan: "พธ.ด. แผน ๒.๑ ชั้นปีที่ ๑ (รุ่นที่ ๓)",
      },
      {
        id: "sch-r3-8",
        day: "วันพฤหัสบดี",
        period: "คาบที่ ๗ - ๙",
        timeRange: "๑๖.๐๐ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๒๐๕",
        courseNameTh: "ศาสตร์และวิทยาการร่วมสมัยในพระไตรปิฎกเถรวาท",
        courseNameEn: "The Hermeneutics in Theravada Tipitaka",
        courseType: "วิชาเลือก",
        credits: "๓ (๓-๐-๖)",
        instructor: "พระมหาอภิเชษฐ์, รศ.ดร. และคณะ",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร."],
        cohortPlan: "พธ.ด. แผน ๒.๑ ชั้นปีที่ ๒ (รุ่นที่ ๒)",
      },
      {
        id: "sch-r3-9",
        day: "วันศุกร์",
        period: "คาบที่ ๔ - ๙",
        timeRange: "๑๒.๔๕ - ๑๙.๐๐ น.",
        courseCode: "๘๒๐ ๕๐๐",
        courseNameTh: "ดุษฎีนิพนธ์",
        courseNameEn: "Dissertation",
        courseType: "วิทยานิพนธ์/ดุษฎีนิพนธ์",
        credits: "๓๖ หน่วยกิต",
        instructor: "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร และคณะ",
        teachingTeam: ["ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร"],
        cohortPlan: "พธ.ด. แผน ๒.๑ ชั้นปีที่ ๒ (รุ่นที่ ๒)",
      },
    ],
  },
  {
    roomNumber: 4,
    name: "ซูมห้องที่ ๔ (ห้องสอบดุษฎีนิพนธ์ & สัมมนาวิชาการ)",
    targetProgram: "ทุกสาขาวิชาบัณฑิตศึกษา / กองบริการวิชาการและงานวิจัย",
    location: "ห้องประชุมสมเด็จพระสังฆราช ชั้น ๓ อาคารวิทยบริการ",
    account: "mcu.zoom515@mcu.ac.th",
    pass: "mcuzoom515",
    zoomUrl: "https://zoom.us/join",
    isLive: false,
    topic: "การสอบวัดคุณสมบัติดุษฎีบัณฑิต (QE) และการสอบป้องกันดุษฎีนิพนธ์",
    schedules: [
      {
        id: "sch-r4-1",
        day: "วันพฤหัสบดี",
        period: "คาบเช้า",
        timeRange: "๐๙.๐๐ - ๑๒.๐๐ น.",
        courseCode: "QE-800",
        courseNameTh: "การสอบวัดคุณสมบัติดุษฎีบัณฑิต (Qualifying Examination)",
        courseNameEn: "Ph.D. Qualifying Examination",
        courseType: "วิทยานิพนธ์/ดุษฎีนิพนธ์",
        credits: "เกณฑ์มาตรฐาน ผ่าน/ไม่ผ่าน",
        instructor: "คณะกรรมการผู้ทรงคุณวุฒิประจำสาขาวิชา",
        teachingTeam: ["พระราชรัตนมุนี, รศ.ดร.", "พระมหาสมบูรณ์ สุมงฺคโล, รศ.ดร.", "ผศ.ดร.สุทธิพงษ์ พรชัยธนบวร"],
        cohortPlan: "นิสิตดุษฎีบัณฑิตทุกสาขา",
      },
      {
        id: "sch-r4-2",
        day: "วันศุกร์",
        period: "คาบบ่าย",
        timeRange: "๑๓.๐๐ - ๑๖.๓๐ น.",
        courseCode: "DEF-800",
        courseNameTh: "การสอบป้องกันดุษฎีนิพนธ์และวิทยานิพนธ์ (Final Defense)",
        courseNameEn: "Doctoral Dissertation & Master Thesis Defense",
        courseType: "วิทยานิพนธ์/ดุษฎีนิพนธ์",
        credits: "ตามแผนหลักสูตร",
        instructor: "คณะกรรมการผู้ทรงคุณวุฒิภายนอกและภายใน",
        teachingTeam: ["พระมหาอภิเชษฐ์, รศ.ดร.", "รศ.ดร.เวทย์ บรรณกรกุล", "ดร.บุญชู พรหมเผ่าพันธุ์"],
        cohortPlan: "นิสิตผู้ยื่นขอสอบวิทยานิพนธ์",
      },
    ],
  },
];

export default function AttendanceTrackingPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"classrooms" | "tuition" | "petitions">("classrooms");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-amber-50 via-warm to-rose-50 rounded-2xl border border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-100/70 px-2.5 py-1 rounded-full w-fit">
            <ScanFace className="w-4 h-4 text-rose-600" />
            <span>ระบบสารสนเทศบัณฑิตศึกษา วส. มจร (SMST ERP)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบติดตามการเข้าเรียนชีวมิติ & ห้องเรียน Hybrid ๔ ซูม
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            พุทธศาสตรดุษฎีบัณฑิต และ พุทธศาสตรมหาบัณฑิต (สาขาวิชาพระไตรปิฎกศึกษา / พระอภิธรรมปิฎก รุ่นที่ ๑ และ ๒)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <ScanFace className="w-4 h-4" />
            <span>เปิดสถานีสแกนใบหน้า (SMST Workstation)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {copiedText && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>คัดลอก &quot;{copiedText}&quot; ลงคลิปบอร์ดเรียบร้อยแล้ว</span>
        </div>
      )}

      {/* Cohorts Matrix Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-amber-900">พธ.ด. พระไตรปิฎกศึกษา (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาเอก</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            Smart Room 1
          </span>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-rose-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-rose-900">พธ.ม. พระไตรปิฎกศึกษา (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาโท</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            Lecture Hall 2
          </span>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-900">พธ.ม. พระอภิธรรมปิฎก (รุ่น ๑-๒)</div>
            <div className="text-xs text-slate-500">ระดับปริญญาโท</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            Abhidhamma 3
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("classrooms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "classrooms"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>ห้องเรียน Hybrid ๔ ซูม</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tuition")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "tuition"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ชำระค่าเทอม & QR Code</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("petitions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "petitions"
              ? "bg-rose-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-stone-200"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ระบบยื่นคำร้องเรียน</span>
        </button>
      </div>

      {/* Tab 1: Hybrid Classrooms (4 Zoom Rooms) */}
      {activeTab === "classrooms" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZOOM_ROOMS.map((room) => (
              <div
                key={room.roomNumber}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center">
                        {room.roomNumber}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{room.name}</h3>
                    </div>
                    {room.isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Hybrid Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-600">
                        Standby
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{room.location}</span>
                  </p>

                  <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/80 text-xs text-amber-950 mt-2">
                    <span className="font-semibold block mb-0.5">หัวข้อบรรยายปัจจุบัน:</span>
                    <span className="text-amber-900">{room.topic}</span>
                  </div>

                  {/* Credentials Box */}
                  <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Zoom Account:</span>
                      <div className="flex items-center gap-1">
                        <code className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-slate-200">
                          {room.account}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopy(room.account)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="คัดลอกอีเมล"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Password:</span>
                      <div className="flex items-center gap-1">
                        <code className="font-mono text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                          {room.pass}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopy(room.pass)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="คัดลอกรหัสผ่าน"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Official Timetable & Faculty Section */}
                  <div className="mt-4 pt-3 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>ตารางเรียน & คณาจารย์ผู้สอน (ภาค ๑/๒๕๖๙)</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                        {room.schedules ? room.schedules.length : 0} รายวิชา
                      </span>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {room.schedules && room.schedules.length > 0 ? (
                        room.schedules.map((sch) => (
                          <div
                            key={sch.id}
                            className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-1 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    sch.day === "วันพฤหัสบดี"
                                      ? "bg-orange-100 text-orange-800 border border-orange-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                                  }`}
                                >
                                  {sch.day}
                                </span>
                                <span className="text-slate-700 text-[11px] font-semibold">
                                  {sch.timeRange}
                                </span>
                                <span className="text-slate-400 text-[10px]">({sch.period})</span>
                              </div>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                  sch.courseType === "วิชาเอก"
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : sch.courseType === "วิชาบังคับ"
                                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                                    : sch.courseType === "วิชาเลือก"
                                    ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                                    : sch.courseType === "วิทยานิพนธ์/ดุษฎีนิพนธ์"
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                {sch.courseType} • {sch.credits}
                              </span>
                            </div>

                            <div>
                              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-amber-900 bg-amber-100 px-1 py-0.5 rounded text-[10px] font-bold border border-amber-200">
                                  {sch.courseCode}
                                </span>
                                <span>{sch.courseNameTh}</span>
                              </div>
                              {sch.courseNameEn && (
                                <div className="text-[10px] text-slate-500 italic mt-0.5">
                                  {sch.courseNameEn}
                                </div>
                              )}
                              {sch.cohortPlan && (
                                <div className="text-[10px] text-rose-700 font-medium mt-1">
                                  🎯 {sch.cohortPlan}
                                </div>
                              )}
                            </div>

                            <div className="pt-1.5 border-t border-stone-200/70 flex flex-col gap-0.5">
                              <div className="flex items-start gap-1 text-[11px]">
                                <span className="font-semibold text-slate-600 shrink-0">
                                  อาจารย์ผู้สอน:
                                </span>
                                <span className="font-bold text-amber-950">{sch.instructor}</span>
                              </div>
                              {sch.teachingTeam && sch.teachingTeam.length > 0 && (
                                <div className="flex items-start gap-1 text-[10px] text-slate-500 pl-1">
                                  <span className="shrink-0">• คณะผู้สอน:</span>
                                  <span>{sch.teachingTeam.join(", ")}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3 text-xs text-slate-400">
                          ไม่มีข้อมูลตารางเรียน
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-stone-100">
                  <a
                    href={room.zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Video className="w-4 h-4" />
                    <span>เปิดห้องเรียน Zoom</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Tuition & QR Code */}
      {activeTab === "tuition" && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ข้อมูลการชำระค่าธรรมเนียมการศึกษา (Tuition Services)
              </h3>
              <p className="text-xs text-slate-500">
                สแกนผ่าน PromptPay Biller ID หรือธนาคารกรุงไทย บัญชีมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full w-fit">
              PromptPay: 0-9940-00165-43-2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200 space-y-2 text-xs">
              <div className="font-bold text-amber-950">ช่องทางโอนชำระเงินทางการ:</div>
              <p className="text-slate-700 leading-relaxed">
                • <strong>ธนาคาร:</strong> ธนาคารกรุงไทย สาขากำแพงแสน<br />
                • <strong>เลขที่บัญชี:</strong> 726-0-45892-1<br />
                • <strong>ชื่อบัญชี:</strong> มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (กองทุนการศึกษา)<br />
                • <strong>เบอร์ติดต่อการเงิน:</strong> 034-352-253, สายด่วน 099-445-4256
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900">การออกใบเสร็จรับเงินทางการ (A4):</div>
              <p className="text-slate-600 leading-relaxed">
                เมื่อชำระเงินเรียบร้อยแล้ว นิสิตสามารถแจ้งผ่านระบบ SMST เพื่อรับใบเสร็จรับเงินดิจิทัลมาตรฐาน A4 ที่มีตราประทับทางการและสามารถใช้เบิกจ่ายต้นสังกัดได้ทันที
              </p>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                ไปที่หน้าออกใบเสร็จรับเงิน &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Petitions Tracker */}
      {activeTab === "petitions" && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ระบบรับเรื่องและติดตามคำร้องเรียน ๕ หมวดหมู่
              </h3>
              <p className="text-xs text-slate-500">
                วิชาการ, อาคารสถานที่, การเงิน/ค่าธรรมเนียม, ระบบไอที/สแกนใบหน้า, ข้อเสนอแนะทั่วไป
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              รองรับ Anonymous
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            นิสิตสามารถส่งคำร้องเรียนหรือข้อเสนอแนะได้ทั้งแบบเปิดเผยตัวตนหรือแบบไม่ระบุชื่อ (Anonymous) เพื่อให้ผู้บริหารวิทยาลัยสงฆ์ดำเนินการตรวจสอบและตอบรับอย่างโปร่งใส
          </div>

          <div className="flex justify-end">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>เปิดระบบยื่นคำร้องเรียนใน SMST</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
