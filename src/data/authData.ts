/**
 * Centralized Authentication & Member Identity Models & Seed Data
 * มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 * 
 * รองรับการเข้าสู่ระบบด้วย:
 * ๑. ชื่อ (Username, Full Name, Pali Name, Email)
 * ๒. รหัสสมาชิก (Member ID)
 * ๓. รหัสนิสิต (Student ID)
 * ๔. รหัสตำแหน่ง (Position Code)
 * ๕. เลขประจำตัวประชาชน (National Citizen ID)
 * ๖. บัญชี Google (@mcu.ac.th / @gmail.com)
 */

import { SystemRole, MonasticStatus } from "./mockData";

export type MemberCategory = 
  | "MONK"          // พระภิกษุสงฆ์
  | "SAMANERA"      // ศากยบุตรสามเณร
  | "GRAD_STUDENT"  // นิสิตบัณฑิตศึกษา (พธ.ด. / พธ.ม.)
  | "FACULTY"       // คณาจารย์ / นักวิชาการ
  | "STAFF"         // เจ้าหน้าที่ / บุคลากรฝ่ายบริหาร
  | "PATRON";       // โยมอุปถัมภ์ / สาธุชนทั่วไป

export type IdentifierType = 
  | "ALL"           // ค้นหาอัตโนมัติจากทุกรหัส
  | "MEMBER_ID"     // รหัสสมาชิก
  | "STUDENT_ID"    // รหัสนิสิต
  | "POSITION_CODE" // รหัสตำแหน่ง
  | "CITIZEN_ID"    // เลขบัตรประชาชน
  | "PASSWORD";     // รหัสผ่าน

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  title: string;
  paliName?: string;
  sanghaRank?: string;
  vassa?: number;
  email: string;
  phone?: string;
  role: SystemRole;
  memberCategory: MemberCategory;
  memberId: string;         // e.g. MBR-SOMBOON, MBR-2569-001
  studentCode?: string;      // e.g. 6701501001, SKB-2569-001
  positionCode?: string;     // e.g. POS-ADMIN-001, POS-DIR-001
  idCardNo?: string;         // e.g. 1-7399-00123-45-6
  password?: string;
  googleEmail?: string;
  googleAvatar?: string;
  avatarText: string;
  department: string;
  originTemple?: string;
  monasticStatus: MonasticStatus;
  accountStatus: "ACTIVE" | "SUSPENDED";
  registeredDate: string;
  digitalCardIssued: boolean;
  qrCodeToken: string;
}

export const initialAuthUsers: AuthUser[] = [
  {
    id: "usr-somboon",
    username: "somboon",
    fullName: "อาจารย์ ดร.สมบูรณ์ จารุณะ",
    title: "อาจารย์ ดร.",
    email: "smjaurna@gmail.com",
    phone: "099-445-4256",
    role: "SUPER_ADMIN",
    memberCategory: "FACULTY",
    memberId: "MBR-SOMBOON",
    positionCode: "POS-ADMIN-001",
    idCardNo: "1-7399-00123-45-6",
    password: "password123",
    googleEmail: "smjaurna@gmail.com",
    avatarText: "ดร.ส",
    department: "ศูนย์เทคโนโลยีสารสนเทศและบริหารระบบ (Super Administrator)",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    registeredDate: "๑ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-SOMBOON-2569-VERIFIED"
  },
  {
    id: "usr-director",
    username: "director.mvu",
    fullName: "พระธรรมวชิราจารย์ (สุทัศน์ ปิยสีโล, รศ.ดร.)",
    title: "พระธรรมวชิราจารย์, รศ.ดร.",
    paliName: "ปิยสีโล",
    sanghaRank: "พระราชาคณะชั้นธรรม",
    vassa: 35,
    originTemple: "วัดสระเกศ ราชวรมหาวิหาร",
    email: "director@palitheravada.mcu.ac.th",
    phone: "081-888-9999",
    role: "SUPER_ADMIN",
    memberCategory: "MONK",
    memberId: "MBR-DIR-001",
    positionCode: "POS-DIR-001",
    idCardNo: "1-1001-00234-56-7",
    password: "password123",
    googleEmail: "director@palitheravada.mcu.ac.th",
    avatarText: "ผอ",
    department: "สำนักงานผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    registeredDate: "๑ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-DIR001-2569-VERIFIED"
  },
  {
    id: "usr-phd-songchai",
    username: "songchai.phd",
    fullName: "พระมหาทรงชัย วิชยเภรี ดร.",
    title: "พระมหา ดร.",
    paliName: "วิชยเภรี",
    sanghaRank: "เปรียญธรรม ๙ ประโยค",
    vassa: 16,
    originTemple: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    email: "songchai@mcu.ac.th",
    phone: "089-112-3344",
    role: "PALI_TEACHER",
    memberCategory: "GRAD_STUDENT",
    memberId: "MBR-2569-015",
    studentCode: "6701501001",
    positionCode: "POS-GRAD-001",
    idCardNo: "1-7399-00345-67-8",
    password: "password123",
    googleEmail: "songchai@mcu.ac.th",
    avatarText: "ม.ท",
    department: "หลักสูตรพุทธศาสตรดุษฎีบัณฑิต (พธ.ด. พระไตรปิฎกเถรวาท รุ่นที่ ๑)",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    registeredDate: "๑๕ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-6701501001-VERIFIED"
  },
  {
    id: "usr-teacher-settawut",
    username: "settawut.pali",
    fullName: "พระมหาเสฏฐวุฒิ วชิรญาโณ ดร.",
    title: "พระมหา ดร. ป.ธ.๙",
    paliName: "วชิรญาโณ",
    sanghaRank: "เปรียญธรรม ๙ ประโยค",
    vassa: 14,
    originTemple: "วัดโมลีโลกยาราม ราชวรวิหาร",
    email: "settawut@palitheravada.mcu.ac.th",
    phone: "086-455-6677",
    role: "PALI_TEACHER",
    memberCategory: "FACULTY",
    memberId: "MBR-2569-003",
    positionCode: "POS-TCH-001",
    idCardNo: "1-7399-00456-78-9",
    password: "password123",
    googleEmail: "settawut@palitheravada.mcu.ac.th",
    avatarText: "ม.ส",
    department: "สำนักวิชาการและคัมภีราจารย์ผู้สอนเตปิฏกบาลีศากยบุตร",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    registeredDate: "๑๐ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-TCH001-2569-VERIFIED"
  },
  {
    id: "usr-samanera-narindet",
    username: "narindet.skb",
    fullName: "สามเณร นรินทร์เดช โสภณ",
    title: "สามเณร",
    paliName: "สิริวฑฺฒโน",
    vassa: 3,
    originTemple: "วัดสระเกศ ราชวรมหาวิหาร",
    email: "narindet@samanera.palitheravada.mcu.ac.th",
    phone: "082-111-2233",
    role: "SAMANERA",
    memberCategory: "SAMANERA",
    memberId: "MBR-2569-101",
    studentCode: "SKB-2569-001",
    idCardNo: "1-7399-00567-89-0",
    password: "password123",
    googleEmail: "narindet@samanera.palitheravada.mcu.ac.th",
    avatarText: "นร",
    department: "โรงเรียนศากยบุตรสามเณรสีหะ (ห้องเรียน A 1)",
    monasticStatus: "ACTIVE_SAMANERA",
    accountStatus: "ACTIVE",
    registeredDate: "๒๐ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-SKB001-2569-VERIFIED"
  },
  {
    id: "usr-patron-kalaya",
    username: "kalaya.patron",
    fullName: "คุณหญิงกัลยา โสภณพานิช",
    title: "คุณหญิง",
    email: "kalaya.patron@gmail.com",
    phone: "081-456-7890",
    role: "PATRON_USER",
    memberCategory: "PATRON",
    memberId: "MBR-PATRON-001",
    idCardNo: "3-1006-00456-78-9",
    password: "password123",
    googleEmail: "kalaya.patron@gmail.com",
    avatarText: "กย",
    department: "คณะกรรมการโยมอุปถัมภ์โครงการสร้างศาสนทายาท",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    registeredDate: "๑ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-PATRON001-2569-VERIFIED"
  },
  {
    id: "usr-staff-akkaradech",
    username: "akkaradech.reg",
    fullName: "นายอัครเดช บวรวงศ์",
    title: "นาย",
    email: "registrar@palitheravada.mcu.ac.th",
    phone: "086-554-3321",
    role: "REGISTRAR_STAFF",
    memberCategory: "STAFF",
    memberId: "MBR-2569-004",
    positionCode: "POS-REG-004",
    idCardNo: "1-7399-00678-90-1",
    password: "password123",
    googleEmail: "akkaradech@mcu.ac.th",
    avatarText: "อด",
    department: "สำนักวิชาการ (กลุ่มงานทะเบียนและวัดผล MCU Bridge)",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    registeredDate: "๕ สิงหาคม ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: "MCU-MVU-MBR-REG004-2569-VERIFIED"
  }
];

/**
 * Remove formatting dashes and spaces from citizen ID
 */
export function cleanIdDigits(val: string): string {
  return (val || "").replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
}

/**
 * Format 13-digit national citizen ID with hyphens: X-XXXX-XXXXX-XX-X
 */
export function formatCitizenId(digits: string): string {
  const clean = (digits || "").replace(/\D/g, "");
  if (clean.length !== 13) return digits;
  return `${clean[0]}-${clean.slice(1, 5)}-${clean.slice(5, 10)}-${clean.slice(10, 12)}-${clean[12]}`;
}

/**
 * Multi-Identifier User Authentication Matcher
 * Matches:
 *  - Primary: Name / Username / Pali Name / Email
 *  - Secondary: Member ID / Student ID / Position Code / Citizen ID / Password
 */
export function authenticateMultiIdentifier(
  identifierName: string,
  secretCode: string,
  idType: IdentifierType = "ALL",
  userPool: AuthUser[] = initialAuthUsers
): { user: AuthUser | null; matchReason?: string; error?: string } {
  const normName = (identifierName || "").trim().toLowerCase();
  const normSecret = (secretCode || "").trim();
  const cleanSecret = cleanIdDigits(secretCode);

  if (!normName) {
    return { user: null, error: "กรุณาระบุชื่อผู้ใช้งาน, ชื่อ-นามสกุล, ฉายาบาลี หรืออีเมล" };
  }
  if (!normSecret) {
    return { user: null, error: "กรุณาระบุรหัสสมาชิก, รหัสนิสิต, รหัสตำแหน่ง หรือเลขประจำตัวประชาชน" };
  }

  // 1. Find candidates matching the Name / Username / Pali Name / Email
  const candidates = userPool.filter((u) => {
    const uName = u.username.toLowerCase();
    const fName = u.fullName.toLowerCase();
    const pName = (u.paliName || "").toLowerCase();
    const email = u.email.toLowerCase();
    const gEmail = (u.googleEmail || "").toLowerCase();

    return (
      uName === normName ||
      uName.includes(normName) ||
      fName.includes(normName) ||
      pName.includes(normName) ||
      email === normName ||
      gEmail === normName
    );
  });

  if (candidates.length === 0) {
    return { user: null, error: `ไม่พบบัญชีผู้ใช้งานที่ตรงกับชื่อ "${identifierName}" ในระบบ` };
  }

  // 2. Check each candidate against the secret / identifier
  for (const u of candidates) {
    const uMemberId = cleanIdDigits(u.memberId);
    const uStudentCode = cleanIdDigits(u.studentCode || "");
    const uPosCode = cleanIdDigits(u.positionCode || "");
    const uCitizenId = cleanIdDigits(u.idCardNo || "");
    const uPassword = u.password || "";

    // Specific match checks based on idType or ALL
    if (idType === "MEMBER_ID" || idType === "ALL") {
      if (uMemberId && (uMemberId === cleanSecret || uMemberId.includes(cleanSecret))) {
        return { user: u, matchReason: "รหัสสมาชิก (Member ID)" };
      }
    }

    if (idType === "STUDENT_ID" || idType === "ALL") {
      if (uStudentCode && (uStudentCode === cleanSecret || uStudentCode.includes(cleanSecret))) {
        return { user: u, matchReason: "รหัสนิสิต (Student ID)" };
      }
    }

    if (idType === "POSITION_CODE" || idType === "ALL") {
      if (uPosCode && (uPosCode === cleanSecret || uPosCode.includes(cleanSecret))) {
        return { user: u, matchReason: "รหัสตำแหน่ง (Position Code)" };
      }
    }

    if (idType === "CITIZEN_ID" || idType === "ALL") {
      if (uCitizenId && (uCitizenId === cleanSecret || uCitizenId.includes(cleanSecret))) {
        return { user: u, matchReason: "เลขประจำตัวประชาชน (National Citizen ID)" };
      }
    }

    if (idType === "PASSWORD" || idType === "ALL") {
      if (uPassword && uPassword === normSecret) {
        return { user: u, matchReason: "รหัสผ่าน (Password)" };
      }
    }
  }

  return { 
    user: null, 
    error: "รหัสสมาชิก, รหัสนิสิต, รหัสตำแหน่ง หรือเลขประจำตัวประชาชนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" 
  };
}

/**
 * Google SSO Matcher or provisioner
 */
export function authenticateGoogleUser(
  email: string,
  name?: string,
  avatar?: string,
  userPool: AuthUser[] = initialAuthUsers
): { user: AuthUser; isNew: boolean } {
  const normEmail = (email || "").trim().toLowerCase();
  const existing = userPool.find(
    (u) => u.email.toLowerCase() === normEmail || (u.googleEmail && u.googleEmail.toLowerCase() === normEmail)
  );

  if (existing) {
    return { user: existing, isNew: false };
  }

  // Provision new user from Google profile
  const isMCU = normEmail.endsWith("@mcu.ac.th");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newMemberId = `MBR-2569-${randomNum}`;
  const assignedName = name || email.split("@")[0];

  const newUser: AuthUser = {
    id: `usr-g-${Date.now()}`,
    username: email.split("@")[0],
    fullName: assignedName,
    title: isMCU ? "อาจารย์ / นิสิต มจร" : "สมาชิกทั่วไป",
    email: normEmail,
    role: isMCU ? "REGISTRAR_STAFF" : "PATRON_USER",
    memberCategory: isMCU ? "FACULTY" : "PATRON",
    memberId: newMemberId,
    googleEmail: normEmail,
    googleAvatar: avatar || undefined,
    avatarText: assignedName.slice(0, 2),
    department: isMCU ? "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย" : "สมาชิกทั่วไป",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    registeredDate: "๑๐ กันยายน ๒๕๖๙",
    digitalCardIssued: true,
    qrCodeToken: `MCU-MVU-${newMemberId}-GOOGLE-VERIFIED`
  };

  return { user: newUser, isNew: true };
}
