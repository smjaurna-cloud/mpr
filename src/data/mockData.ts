export interface Samanera {
  id: string;
  enrollmentNo: string;
  mcuId: string;
  fullName: string;
  paliName: string;
  age: number;
  vassa: number;
  originTemple: string;
  kuti: string;
  paliLevel: string;
  bloodType: string;
  allergies: string;
  healthStatus: "HEALTHY" | "MILD_ILL" | "ADMITTED";
  todayRoutine: {
    morningChant: boolean;
    pindabat: boolean;
    meal: boolean;
    kammatthana: boolean;
    eveningChant: boolean;
  };
  mukhopathaScore: number;
  patronName: string;
}

export const mockSamaneras: Samanera[] = [
  {
    id: "sam-01",
    enrollmentNo: "สณ.๖๗๐๐๑",
    mcuId: "6701501001",
    fullName: "สามเณร นรินทร์เดช โสภณ",
    paliName: "สิริวฑฺฒโน",
    age: 14,
    vassa: 3,
    originTemple: "วัดสระเกศ ราชวรมหาวิหาร",
    kuti: "อาศรมศากยบุตร กุฏิ ๐๓",
    paliLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๓ (เทียบ ป.ธ.๔)",
    bloodType: "O",
    allergies: "แพ้อาหารทะเลทุกชนิด",
    healthStatus: "HEALTHY",
    todayRoutine: {
      morningChant: true,
      pindabat: true,
      meal: true,
      kammatthana: true,
      eveningChant: true,
    },
    mukhopathaScore: 98,
    patronName: "คุณหญิงกัลยา และครอบครัวโสภณ",
  },
  {
    id: "sam-02",
    enrollmentNo: "สณ.๖๗๐๐๒",
    mcuId: "6701501002",
    fullName: "สามเณร ธนภูมิ ปัญญาวงศ์",
    paliName: "ญาณเมธี",
    age: 13,
    vassa: 2,
    originTemple: "วัดพระธาตุศรีจอมทอง จ.เชียงใหม่",
    kuti: "อาศรมศากยบุตร กุฏิ ๐๕",
    paliLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๒ (เทียบ ป.ธ.๓)",
    bloodType: "B",
    allergies: "ไม่มีประวัติแพ้ยาและอาหาร",
    healthStatus: "HEALTHY",
    todayRoutine: {
      morningChant: true,
      pindabat: true,
      meal: true,
      kammatthana: true,
      eveningChant: false,
    },
    mukhopathaScore: 92,
    patronName: "ดร.วิชัย รัตนโภคา",
  },
  {
    id: "sam-03",
    enrollmentNo: "สณ.๖๗๐๐๓",
    mcuId: "6701501003",
    fullName: "สามเณร ภูมิภัทร ศรีสะอาด",
    paliName: "ปภสฺสโร",
    age: 12,
    vassa: 1,
    originTemple: "วัดป่าประดู่ จ.ระยอง",
    kuti: "อาศรมศากยบุตร กุฏิ ๐๘",
    paliLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๑ (บาลีไวยากรณ์)",
    bloodType: "A",
    allergies: "แพ้ละอองเกสรดอกไม้ / ถั่วลิสง",
    healthStatus: "MILD_ILL",
    todayRoutine: {
      morningChant: true,
      pindabat: false,
      meal: true,
      kammatthana: true,
      eveningChant: false,
    },
    mukhopathaScore: 88,
    patronName: "พ.อ. สมเกียรติ มงคลกุล",
  },
  {
    id: "sam-04",
    enrollmentNo: "สณ.๖๗๐๐๔",
    mcuId: "6701501004",
    fullName: "สามเณร กิตติศักดิ์ พรหมมา",
    paliName: "ปญฺญาวชิโร",
    age: 15,
    vassa: 4,
    originTemple: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    kuti: "อาศรมศากยบุตร กุฏิ ๐๑",
    paliLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๔ (เทียบ ป.ธ.๕)",
    bloodType: "AB",
    allergies: "แพ้ยาเพนิซิลลิน",
    healthStatus: "HEALTHY",
    todayRoutine: {
      morningChant: true,
      pindabat: true,
      meal: true,
      kammatthana: true,
      eveningChant: true,
    },
    mukhopathaScore: 96,
    patronName: "คุณแม่สมศรี สุขเกษม",
  },
];

export interface AlmsBookingItem {
  id: string;
  date: string;
  mealType: "ภัตตาหารเช้า" | "ภัตตาหารเพล" | "น้ำปานะ";
  hostName: string;
  hostPhone: string;
  occasion: string;
  guestCount: number;
  menu: string;
  amount: number;
  status: "CONFIRMED" | "PENDING" | "COMPLETED";
  eDonationHash: string;
}

export const mockAlmsBookings: AlmsBookingItem[] = [
  {
    id: "alm-101",
    date: "2026-09-06",
    mealType: "ภัตตาหารเพล",
    hostName: "ครอบครัวสิริวัฒนกุล",
    hostPhone: "081-456-7890",
    occasion: "ทำบุญอายุวัฒนมงคลครบรอบ ๖๐ ปี",
    guestCount: 25,
    menu: "ต้มยำปลากะพงน้ำใส, ผัดผักรวมมิตร, แกงเขียวหวานไก่, ผลไม้รวม (จัดแยกอาหารสำหรับสามเณรแพ้อาหารทะเล)",
    amount: 15000,
    status: "CONFIRMED",
    eDonationHash: "EDON-20260906-882193",
  },
  {
    id: "alm-102",
    date: "2026-09-07",
    mealType: "ภัตตาหารเพล",
    hostName: "ชมรมพุทธศาสตร์ศรัทธาธรรม",
    hostPhone: "089-123-4567",
    occasion: "บำเพ็ญกุศลอุทิศบูรพาจารย์",
    guestCount: 15,
    menu: "แกงส้มชะอมกุ้ง (เปลี่ยนเป็นเต้าหู้เห็ดหอมสำหรับกุฏิพิเศษ), ผัดกะเพราไก่, ลอดช่องน้ำกะทิ",
    amount: 12000,
    status: "CONFIRMED",
    eDonationHash: "EDON-20260907-331902",
  },
  {
    id: "alm-103",
    date: "2026-09-08",
    mealType: "ภัตตาหารเพล",
    hostName: "คณะศิษยานุศิษย์กำแพงแสน",
    hostPhone: "086-778-9901",
    occasion: "ถวายมหาทานบารมีแด่ศากยบุตรสามเณรสีหะ",
    guestCount: 30,
    menu: "ต้มจืดเต้าหู้หมูสับ, ไก่ทอดเกลือ, น้ำพริกหนุ่มผักลวก, ขนมถ้วยโบราณ",
    amount: 20000,
    status: "CONFIRMED",
    eDonationHash: "EDON-20260908-771249",
  },
];

export interface MukhopathaChapter {
  id: string;
  scripture: string;
  chapter: string;
  samaneraId: string;
  samaneraName: string;
  grade: "EXCELLENT" | "GOOD" | "NEEDS_IMPROVEMENT";
  evaluator: string;
  recordingDuration: string;
  date: string;
  audioUrl: string;
}

export const mockMukhopathaRecords: MukhopathaChapter[] = [
  {
    id: "muko-01",
    scripture: "คัมภีร์ปทรูปสิทธิ",
    chapter: "สนธิกัณฑ์ วักกัณโฑ สุริโยทโย วิจิตฺรนเยน",
    samaneraId: "sam-01",
    samaneraName: "สามเณร นรินทร์เดช (สิริวฑฺฒโน)",
    grade: "EXCELLENT",
    evaluator: "พระมหาคัมภีราจารย์ ดร.",
    recordingDuration: "08:45 นาที",
    date: "2026-09-04",
    audioUrl: "/mock-audio/padarupasiddhi-01.mp3",
  },
  {
    id: "muko-02",
    scripture: "คัมภีร์สัททนีติปกรณ์",
    chapter: "สุตตมาลา บทที่ ๑-๕๐ ธาตุวิภาค",
    samaneraId: "sam-02",
    samaneraName: "สามเณร ธนภูมิ (ญาณเมธี)",
    grade: "GOOD",
    evaluator: "พระอาจารย์มหาธนพล",
    recordingDuration: "12:20 นาที",
    date: "2026-09-03",
    audioUrl: "/mock-audio/saddaniti-02.mp3",
  },
  {
    id: "muko-03",
    scripture: "พระปาติโมกข์สังเขป",
    chapter: "ปาจิตตีย์ วรรคที่ ๑ สิกขาบทที่ ๑-๑๐",
    samaneraId: "sam-04",
    samaneraName: "สามเณร กิตติศักดิ์ (ปญฺญาวชิโร)",
    grade: "EXCELLENT",
    evaluator: "พระครูวินัยธร",
    recordingDuration: "15:10 นาที",
    date: "2026-09-02",
    audioUrl: "/mock-audio/patimokkha-03.mp3",
  },
];

export interface EApprovalDoc {
  id: string;
  docNumber: string;
  title: string;
  originator: string;
  date: string;
  urgency: "ด่วนที่สุด" | "ด่วนมาก" | "ปกติ";
  category: "คำสั่งราชวิทยาลัย" | "งบประมาณ/พัสดุ" | "การศึกษา/ศาสนกิจ";
  status: "PENDING_DIRECTOR" | "APPROVED" | "REJECTED";
  summary: string;
  signers: string[];
}

export const mockEApprovalDocs: EApprovalDoc[] = [
  {
    id: "doc-501",
    docNumber: "มจร.วส.มวก. ๐๕๔/๒๕๖๙",
    title: "ขออนุมัติจัดสรรงบประมาณสนับสนุนโครงการติวเข้มบาลีสนามหลวง ประจำปีการศึกษา ๒๕๖๙",
    originator: "สำนักวิชาการ (กลุ่มงานบริการการศึกษา)",
    date: "2026-09-05",
    urgency: "ด่วนที่สุด",
    category: "งบประมาณ/พัสดุ",
    status: "PENDING_DIRECTOR",
    summary: "ขออนุมัติงบประมาณจำนวน ๑๘๕,๐๐๐ บาท เพื่อเป็นค่าภัตตาหาร ค่าพาหนะพระวิทยากร และจัดพิมพ์ตำราเสริมสำหรับศากยบุตรสามเณรสีหะ จำนวน ๑๒๐ รูป",
    signers: ["รอง ผอ. ฝ่ายวิชาการ", "ผอ.สำนักงานวิทยาลัย"],
  },
  {
    id: "doc-502",
    docNumber: "มจร.วส.มวก. ๐๕๕/๒๕๖๙",
    title: "คำสั่งราชวิทยาลัยแต่งตั้งคณะกรรมการตรวจประเมินผลการสอบมุขปาฐะบาลีโบราณ กัณฑ์ที่ ๓",
    originator: "โรงเรียนศากยบุตรสามเณรสีหะ",
    date: "2026-09-04",
    urgency: "ด่วนมาก",
    category: "คำสั่งราชวิทยาลัย",
    status: "APPROVED",
    summary: "แต่งตั้งพระคัมภีราจารย์จำนวน ๗ รูป ร่วมเป็นคณะกรรมการตรวจทานการสาธยายคัมภีร์ปทรูปสิทธิและสัททนีติ ประจำภาคการศึกษาที่ ๑",
    signers: ["ผู้อำนวยการราชวิทยาลัย (ลงนามแล้ว)", "รอง ผอ. ฝ่ายวิชาการ"],
  },
  {
    id: "doc-503",
    docNumber: "มจร.วส.มวก. ๐๕๖/๒๕๖๙",
    title: "ขออนุมัติปรับปรุงซ่อมบำรุงระบบ Solar Cell และระบบสูบน้ำบาดาล อาศรมศากยบุตร โซน บี",
    originator: "สำนักงานวิทยาลัย (กลุ่มงานบริหารและเสนาสนะ)",
    date: "2026-09-03",
    urgency: "ปกติ",
    category: "งบประมาณ/พัสดุ",
    status: "APPROVED",
    summary: "ดำเนินการซ่อมบำรุงตามรอบระยะเวลา เพื่อความต่อเนื่องของระบบประปาและแสงสว่างในกุฏิที่พักสามเณร งบประมาณ ๔๒,๐๐๐ บาท",
    signers: ["ผู้อำนวยการราชวิทยาลัย (ลงนามแล้ว)", "รอง ผอ. ฝ่ายบริหาร"],
  },
];

// -------------------------------------------------------------
// USER & IDENTITY MANAGEMENT TYPES & MOCK DATA (MOD-06)
// -------------------------------------------------------------

export type SystemRole = 
  | "SUPER_ADMIN"      // ผู้อำนวยการราชวิทยาลัย
  | "EXECUTIVE_BOARD"  // คณะกรรมการประจำราชวิทยาลัย / อนุกรรมการ
  | "PALI_TEACHER"     // พระคัมภีราจารย์ / อาจารย์ผู้สอนบาลี
  | "DISCIPLINE_MONK"  // พระพี่เลี้ยง / ฝ่ายปกครอง
  | "REGISTRAR_STAFF"  // เจ้าหน้าที่สำนักงาน / นายทะเบียน
  | "SAMANERA"         // ศากยบุตรสามเณร
  | "PATRON_USER";     // โยมอุปถัมภ์ / สาธุชน

export type MonasticStatus = "ACTIVE_MONK" | "ACTIVE_SAMANERA" | "LAYPERSON" | "DISROBED";
export type AccountStatus = "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";

export interface SystemUser {
  id: string;
  username: string;
  fullName: string;
  title: string;          // พระธรรม..., พระมหา, พระครู, สามเณร, นาย, นาง, ดร.
  paliName?: string;       // ฉายา เช่น ปิยสีโล, สิริวฑฺฒโน
  sanghaRank?: string;     // สมณศักดิ์
  vassa?: number;          // พรรษา
  originTemple?: string;   // วัดต้นสังกัด
  department: string;      // หน่วยงานสังกัด
  role: SystemRole;
  monasticStatus: MonasticStatus;
  accountStatus: AccountStatus;
  email: string;
  phone: string;
  idCardNo?: string;
  lineConnected: boolean;
  lastLogin: string;
  permissions: {
    monasticLife: "NONE" | "READ" | "WRITE" | "FULL";
    almsPatron: "NONE" | "READ" | "WRITE" | "FULL";
    mukhopatha: "NONE" | "READ" | "WRITE" | "FULL";
    eApproval: "NONE" | "READ" | "WRITE" | "APPROVE" | "FULL";
    mcuBridge: "NONE" | "READ" | "WRITE" | "FULL";
    userManagement: "NONE" | "READ" | "WRITE" | "FULL";
  };
}

export const mockSystemUsers: SystemUser[] = [
  {
    id: "usr-somboon",
    username: "somboon",
    fullName: "อาจารย์สมบูรณ์ (somboon)",
    title: "อาจารย์",
    department: "ศูนย์เทคโนโลยีสารสนเทศและบริหารระบบ (System Administrator)",
    role: "SUPER_ADMIN",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    email: "smjaurna@gmail.com",
    phone: "099-445-4256",
    lineConnected: true,
    lastLogin: "2026-09-05 17:05 (เข้าสู่ระบบปัจจุบัน)",
    permissions: {
      monasticLife: "FULL",
      almsPatron: "FULL",
      mukhopatha: "FULL",
      eApproval: "FULL",
      mcuBridge: "FULL",
      userManagement: "FULL",
    }
  },
  {
    id: "usr-001",
    username: "director.mvu",
    fullName: "พระธรรมวชิราจารย์ (สุทัศน์)",
    title: "พระราชาคณะชั้นธรรม",
    paliName: "ปิยสีโล",
    sanghaRank: "พระธรรมวชิราจารย์",
    vassa: 35,
    originTemple: "วัดสระเกศ ราชวรมหาวิหาร",
    department: "คณะผู้บริหารระดับสูง (ผู้อำนวยการราชวิทยาลัย)",
    role: "SUPER_ADMIN",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    email: "director@mvu.mcu.ac.th",
    phone: "081-888-9999",
    lineConnected: true,
    lastLogin: "2026-09-05 15:30",
    permissions: {
      monasticLife: "FULL",
      almsPatron: "FULL",
      mukhopatha: "FULL",
      eApproval: "FULL",
      mcuBridge: "FULL",
      userManagement: "FULL",
    }
  },
  {
    id: "usr-002",
    username: "pali.dean",
    fullName: "พระมหา ดร.เวชสุภัทโท",
    title: "พระมหาเถระ",
    paliName: "เวทสุภทฺโท",
    sanghaRank: "เปรียญธรรม ๙ ประโยค",
    vassa: 28,
    originTemple: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    department: "สำนักวิชาการ (คัมภีราจารย์ผู้ทรงคุณวุฒิ)",
    role: "PALI_TEACHER",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    email: "pali.master@mvu.mcu.ac.th",
    phone: "089-777-6655",
    lineConnected: true,
    lastLogin: "2026-09-05 14:15",
    permissions: {
      monasticLife: "READ",
      almsPatron: "READ",
      mukhopatha: "FULL",
      eApproval: "APPROVE",
      mcuBridge: "WRITE",
      userManagement: "READ",
    }
  },
  {
    id: "usr-003",
    username: "discipline.proctor",
    fullName: "พระครูวินัยธร สมพงษ์",
    title: "พระครูฐานานุกรม",
    paliName: "กิตฺติธโร",
    sanghaRank: "พระครูวินัยธร",
    vassa: 18,
    originTemple: "วัดพระปฐมเจดีย์ ราชวรมหาวิหาร",
    department: "โรงเรียนศากยบุตรสามเณรสีหะ (ฝ่ายปกครองและหอพัก)",
    role: "DISCIPLINE_MONK",
    monasticStatus: "ACTIVE_MONK",
    accountStatus: "ACTIVE",
    email: "discipline@mvu.mcu.ac.th",
    phone: "084-332-1100",
    lineConnected: true,
    lastLogin: "2026-09-05 16:00",
    permissions: {
      monasticLife: "FULL",
      almsPatron: "WRITE",
      mukhopatha: "READ",
      eApproval: "READ",
      mcuBridge: "READ",
      userManagement: "READ",
    }
  },
  {
    id: "usr-004",
    username: "registrar.office",
    fullName: "นายอัครเดช บวรวงศ์",
    title: "นาย",
    department: "สำนักวิชาการ (กลุ่มงานทะเบียนและวัดผล)",
    role: "REGISTRAR_STAFF",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    email: "registrar@mvu.mcu.ac.th",
    phone: "086-554-3321",
    lineConnected: true,
    lastLogin: "2026-09-05 11:20",
    permissions: {
      monasticLife: "READ",
      almsPatron: "READ",
      mukhopatha: "READ",
      eApproval: "WRITE",
      mcuBridge: "FULL",
      userManagement: "WRITE",
    }
  },
  {
    id: "usr-005",
    username: "patron.kalaya",
    fullName: "คุณหญิงกัลยา โสภณพานิช",
    title: "คุณหญิง",
    department: "โยมอุปถัมภ์โครงการศากยบุตรสามเณรสีหะ",
    role: "PATRON_USER",
    monasticStatus: "LAYPERSON",
    accountStatus: "ACTIVE",
    email: "kalaya.patron@gmail.com",
    phone: "081-456-7890",
    lineConnected: true,
    lastLogin: "2026-09-04 19:45",
    permissions: {
      monasticLife: "NONE",
      almsPatron: "WRITE",
      mukhopatha: "READ",
      eApproval: "NONE",
      mcuBridge: "NONE",
      userManagement: "NONE",
    }
  },
  {
    id: "usr-006",
    username: "samanera.narindet",
    fullName: "สามเณร นรินทร์เดช โสภณ",
    title: "สามเณร",
    paliName: "สิริวฑฺฒโน",
    vassa: 3,
    originTemple: "วัดสระเกศ ราชวรมหาวิหาร",
    department: "โรงเรียนศากยบุตรสามเณรสีหะ (ชั้น ๓)",
    role: "SAMANERA",
    monasticStatus: "ACTIVE_SAMANERA",
    accountStatus: "ACTIVE",
    email: "narindet@samanera.mvu.ac.th",
    phone: "082-111-2233",
    lineConnected: false,
    lastLogin: "2026-09-05 08:30",
    permissions: {
      monasticLife: "READ",
      almsPatron: "NONE",
      mukhopatha: "READ",
      eApproval: "NONE",
      mcuBridge: "READ",
      userManagement: "NONE",
    }
  }
];

// -------------------------------------------------------------
// SMART MEETING ROOM & CONFERENCE TYPES & MOCK DATA (MOD-07)
// -------------------------------------------------------------

export type RoomStatus = "AVAILABLE" | "IN_USE" | "RESERVED" | "MAINTENANCE";

export interface MeetingRoom {
  id: string;
  name: string;
  paliName: string;
  building: string;
  floor: string;
  capacity: number;
  status: RoomStatus;
  currentMeeting?: string;
  nextAvailableTime?: string;
  temperature: number; // Celsius
  smartDevices: {
    airConditioner: boolean;
    projector: boolean;
    soundSystem: boolean;
    smartDisplay: boolean;
    hybridCamera: boolean;
  };
  features: string[];
  image: string;
}

export interface MeetingBooking {
  id: string;
  roomId: string;
  roomName: string;
  title: string;
  organizerName: string;
  chairperson: string;
  date: string;
  startTime: string;
  endTime: string;
  attendeesCount: number;
  isHybrid: boolean;
  zoomLink?: string;
  pānaType: "น้ำปานะและเภสัช (บ่าย)" | "ภัตตาหารว่าง (เช้า)" | "น้ำดื่มสมุนไพร";
  status: "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  agendaItems: string[];
}

export const mockMeetingRooms: MeetingRoom[] = [
  {
    id: "room-01",
    name: "หอประชุมศากยบุตรสีหะ",
    paliName: "สากฺยปุตฺตสีหสภาคาร",
    building: "อาคารพระธรรมวชิราจารย์",
    floor: "ชั้น ๑",
    capacity: 300,
    status: "AVAILABLE",
    nextAvailableTime: "ตลอดทั้งวัน (เว้น ๑๓:๐๐ น.)",
    temperature: 25.0,
    smartDevices: {
      airConditioner: false,
      projector: false,
      soundSystem: true,
      smartDisplay: true,
      hybridCamera: true,
    },
    features: ["ไมค์ลอย ๘ ตัว", "โปรเจกเตอร์ ๔K คู่", "ระบบถ่ายทอดสด Live Stream", "ที่นั่งสงฆ์ยกพื้น"],
    image: "🏛️"
  },
  {
    id: "room-02",
    name: "ห้องประชุมสภาวิทยาลัยสงฆ์",
    paliName: "วิทฺยาลยวุฑฺฒิสภา",
    building: "อาคารสำนักงานวิทยาลัย",
    floor: "ชั้น ๒",
    capacity: 35,
    status: "IN_USE",
    currentMeeting: "การประชุมคณะกรรมการประจำวิทยาลัยสงฆ์ ครั้งที่ ๕/๒๕๖๙",
    nextAvailableTime: "๑๖:๐๐ น. เป็นต้นไป",
    temperature: 23.5,
    smartDevices: {
      airConditioner: true,
      projector: true,
      soundSystem: true,
      smartDisplay: true,
      hybridCamera: true,
    },
    features: ["ไมโครโฟนประจำที่ ๓๕ ตัว", "จอแสดงผลไร้สาย", "Zoom Room Auto-Tracking", "ป้ายชื่อดิจิทัล"],
    image: "💼"
  },
  {
    id: "room-03",
    name: "ห้องประชุมสำนักวิชาการ & คัมภีราจารย์",
    paliName: "คมฺภีราจริยสมฺมนฺตนสภา",
    building: "อาคารสำนักวิชาการ",
    floor: "ชั้น ๑",
    capacity: 25,
    status: "RESERVED",
    nextAvailableTime: "๑๑:๓๐ น. (มีจองภาคบ่าย)",
    temperature: 24.0,
    smartDevices: {
      airConditioner: false,
      projector: false,
      soundSystem: false,
      smartDisplay: true,
      hybridCamera: true,
    },
    features: ["กระดานอัจฉริยะ Interactive Board", "เครื่องสแกนพระคัมภีร์ใบลาน", "ระบบแปลเสียงคู่ขนาน"],
    image: "📜"
  },
  {
    id: "room-04",
    name: "สตูดิโอสื่อการสอนพระบาลีไฮบริด",
    paliName: "ปาลีทิพฺพคเวสณสาลี",
    building: "อาคารเทคโนโลยีสารสนเทศ",
    floor: "ชั้น ๓",
    capacity: 10,
    status: "AVAILABLE",
    nextAvailableTime: "ว่างตลอดวัน",
    temperature: 22.0,
    smartDevices: {
      airConditioner: false,
      projector: false,
      soundSystem: false,
      smartDisplay: true,
      hybridCamera: true,
    },
    features: ["กล้อง ๔K Broadcast ๓ ตัว", "ห้องเก็บเสียงมาตรฐาน", "ระบบบันทึกมุขปาฐะความละเอียดสูง"],
    image: "🎙️"
  }
];

export const mockMeetingBookings: MeetingBooking[] = [
  {
    id: "mb-001",
    roomId: "room-02",
    roomName: "ห้องประชุมสภาวิทยาลัยสงฆ์",
    title: "การประชุมคณะกรรมการประจำวิทยาลัยสงฆ์ ครั้งที่ ๕/๒๕๖๙",
    organizerName: "สำนักงานวิทยาลัย (กลุ่มงานบริหาร)",
    chairperson: "พระธรรมวชิราจารย์ (ผู้อำนวยการราชวิทยาลัย)",
    date: "2026-09-05",
    startTime: "๑๓:๓๐ น.",
    endTime: "๑๖:๐๐ น.",
    attendeesCount: 28,
    isHybrid: true,
    zoomLink: "https://zoom.us/j/99821388102?pwd=mvu",
    pānaType: "น้ำปานะและเภสัช (บ่าย)",
    status: "IN_PROGRESS",
    agendaItems: [
      "๑. แจ้งเพื่อทราบ: รายงานความก้าวหน้าโครงการศากยบุตรสามเณรสีหะ ภาคเรียนที่ ๑",
      "๒. รับรองรายงานการประชุมครั้งที่ ๔/๒๕๖๙",
      "๓. เรื่องพิจารณา: ขออนุมัติงบประมาณปรับปรุงระบบ Solar Cell เสนาสนะกุฏิ",
      "๔. เรื่องพิจารณา: แผนส่งเสริมการสอบบาลีสนามหลวง ชั้นเปรียญธรรม ๓ ถึง ๙ ประโยค",
      "๕. เรื่องอื่นๆ"
    ]
  },
  {
    id: "mb-002",
    roomId: "room-03",
    roomName: "ห้องประชุมสำนักวิชาการ & คัมภีราจารย์",
    title: "สัมมนาแนวทางการตรวจประเมินมุขปาฐะคัมภีร์ปทรูปสิทธิและสัททนีติ",
    organizerName: "สำนักวิชาการ",
    chairperson: "พระมหา ดร.เวชสุภัทโท (ป.ธ.๙)",
    date: "2026-09-06",
    startTime: "๐๙:๐๐ น.",
    endTime: "๑๑:๓๐ น.",
    attendeesCount: 18,
    isHybrid: false,
    pānaType: "ภัตตาหารว่าง (เช้า)",
    status: "CONFIRMED",
    agendaItems: [
      "๑. มาตรฐานการประเมินอักขระ ฐานกรณ์ และสัมพันธบท",
      "๒. การจัดทำคลังข้อสอบท่องจำปากเปล่าสำหรับศากยบุตรสามเณร",
      "๓. ตารางตรวจการบ้านมุขปาฐะประจำสัปดาห์"
    ]
  }
];

// -------------------------------------------------------------
// 1. HR & PERSONNEL (ระบบบริหารงานบุคคล)
// -------------------------------------------------------------
export interface HRStaff {
  id: string;
  name: string;
  paliName?: string;
  sanghaRank?: string;
  type: "บรรพชิต (พระภิกษุ)" | "ฆราวาส (อาจารย์)" | "ฆราวาส (เจ้าหน้าที่)";
  position: string;
  department: string;
  teachingHoursPerWeek: number;
  missionLeaveCount: number; // วันลาศาสนกิจ
  academicRank: string; // ผศ., รศ., ศ., เปรียญธรรม ๙ ประโยค
  status: "ปฏิบัติหน้าที่ปกติ" | "ติดศาสนกิจพิเศษ" | "ลาศึกษาต่อ";
  evaluationScore: number;
}

export const mockHRStaffList: HRStaff[] = [
  {
    id: "hr-01",
    name: "พระมหา ดร.เวชสุภัทโท",
    paliName: "เวทสุภทฺโท",
    sanghaRank: "ป.ธ.๙, ดร.",
    type: "บรรพชิต (พระภิกษุ)",
    position: "คัมภีราจารย์ผู้ทรงคุณวุฒิพิเศษ (หัวหน้าภาควิชาพระบาลี)",
    department: "สำนักวิชาการ",
    teachingHoursPerWeek: 18,
    missionLeaveCount: 2,
    academicRank: "ผู้ช่วยศาสตราจารย์ (ผศ.ดร.)",
    status: "ปฏิบัติหน้าที่ปกติ",
    evaluationScore: 98.5
  },
  {
    id: "hr-02",
    name: "พระครูวินัยธร สมพงษ์",
    paliName: "กิตฺติธโร",
    sanghaRank: "พระครูวินัยธร, ป.ธ.๗",
    type: "บรรพชิต (พระภิกษุ)",
    position: "อาจารย์ใหญ่ฝ่ายปกครองและอาจาระสงฆ์",
    department: "โรงเรียนศากยบุตรสามเณรสีหะ",
    teachingHoursPerWeek: 14,
    missionLeaveCount: 1,
    academicRank: "อาจารย์ประจำ",
    status: "ปฏิบัติหน้าที่ปกติ",
    evaluationScore: 95.0
  },
  {
    id: "hr-03",
    name: "ดร.วิสิฐศักดิ์ ปิยธรรมโชติ",
    type: "ฆราวาส (อาจารย์)",
    position: "อาจารย์ประจำกลุ่มวิชาประวัติศาสตร์พุทธศิลป์และโบราณคดี",
    department: "สำนักวิชาการ",
    teachingHoursPerWeek: 16,
    missionLeaveCount: 0,
    academicRank: "รองศาสตราจารย์ (รศ.ดร.)",
    status: "ปฏิบัติหน้าที่ปกติ",
    evaluationScore: 96.0
  },
  {
    id: "hr-04",
    name: "นายอัครเดช บวรวงศ์",
    type: "ฆราวาส (เจ้าหน้าที่)",
    position: "นักวิชาการศึกษาชำนาญการ (หัวหน้างานทะเบียนและวัดผล)",
    department: "สำนักงานวิทยาลัย",
    teachingHoursPerWeek: 0,
    missionLeaveCount: 0,
    academicRank: "เจ้าหน้าที่สายสนับสนุน",
    status: "ปฏิบัติหน้าที่ปกติ",
    evaluationScore: 94.2
  }
];

// -------------------------------------------------------------
// 2. FINANCE & PROCUREMENT (ระบบการเงิน บัญชีและพัสดุ)
// -------------------------------------------------------------
export interface FinanceFund {
  id: string;
  fundName: string;
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
  sourceType: "งบประมาณแผ่นดิน / มจร วังน้อย" | "เงินรายได้วิทยาลัย" | "กองทุนศรัทธาบริจาค / ผ้าป่าสงฆ์";
}

export const mockFinanceFunds: FinanceFund[] = [
  {
    id: "fund-01",
    fundName: "งบอุดหนุนดำเนินงานและบุคลากร (มจร ส่วนกลาง)",
    totalBudget: 12500000,
    spentAmount: 8450000,
    remainingAmount: 4050000,
    sourceType: "งบประมาณแผ่นดิน / มจร วังน้อย"
  },
  {
    id: "fund-02",
    fundName: "กองทุนบิณฑบาต ภัตตาหาร และค่ายานพาหนะศากยบุตร",
    totalBudget: 4800000,
    spentAmount: 2650000,
    remainingAmount: 2150000,
    sourceType: "กองทุนศรัทธาบริจาค / ผ้าป่าสงฆ์"
  },
  {
    id: "fund-03",
    fundName: "เงินรายได้ค่าธรรมเนียมและบริการวิชาการวิทยาลัย",
    totalBudget: 3200000,
    spentAmount: 1420000,
    remainingAmount: 1780000,
    sourceType: "เงินรายได้วิทยาลัย"
  }
];

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: "สังฆภัณฑ์ & เครื่องนุ่งห่ม" | "ตำราเรียน & เอกสารคัมภีร์" | "ครุภัณฑ์คอมพิวเตอร์ & โสต" | "เวชภัณฑ์ห้องพยาบาล";
  stockQty: number;
  unit: string;
  minAlertQty: number;
  location: string;
}

export const mockInventoryList: InventoryItem[] = [
  {
    id: "inv-01",
    itemCode: "SKP-6901",
    name: "ผ้าไตรจีวรศากยบุตรสามเณร (ผ้ามัสลินแท้ สีกรักเข้ม)",
    category: "สังฆภัณฑ์ & เครื่องนุ่งห่ม",
    stockQty: 85,
    unit: "ไตร",
    minAlertQty: 30,
    location: "คลังพัสดุกลาง ชั้น ๑"
  },
  {
    id: "inv-02",
    itemCode: "BK-6902",
    name: "คัมภีร์ปทรูปสิทธิ ฉบับสากลบาลีเถรวาท (ปกแข็งทอง)",
    category: "ตำราเรียน & เอกสารคัมภีร์",
    stockQty: 240,
    unit: "เล่ม",
    minAlertQty: 50,
    location: "หอคัมภีร์ตำรา สำนักวิชาการ"
  },
  {
    id: "inv-03",
    itemCode: "IT-6903",
    name: "แท็บเล็ตบันทึกเสียงมุขปาฐะศากยบุตร ๑๐.๕ นิ้ว",
    category: "ครุภัณฑ์คอมพิวเตอร์ & โสต",
    stockQty: 120,
    unit: "เครื่อง",
    minAlertQty: 10,
    location: "ห้องโสตทัศนูปกรณ์ ชั้น ๒"
  },
  {
    id: "inv-04",
    itemCode: "MED-6904",
    name: "ยาพาราเซตามอลและยาบรรเทาหวัดสามเณร",
    category: "เวชภัณฑ์ห้องพยาบาล",
    stockQty: 450,
    unit: "แผง",
    minAlertQty: 100,
    location: "ห้องพยาบาล อาศรมศากยบุตร"
  }
];

// -------------------------------------------------------------
// 3. STRATEGIC PLANNING & BUDGETING (ระบบวางแผนและงบประมาณ)
// -------------------------------------------------------------
export interface StrategicPlanKPI {
  id: string;
  kpiCode: string;
  pillar: "ยุทธศาสตร์ที่ ๑: ความเป็นเลิศด้านพระไตรปิฎกบาลี" | "ยุทธศาสตร์ที่ ๒: ศาสนทายาทต้นแบบวิถีศีล สมาธิ ปัญญา" | "ยุทธศาสตร์ที่ ๓: บูรณาการพระพุทธศาสนาสู่สากล";
  title: string;
  target: string;
  actual: string;
  percentage: number;
  status: "ON_TRACK" | "EXCEEDED" | "NEEDS_ATTENTION";
}

export const mockStrategicKPIs: StrategicPlanKPI[] = [
  {
    id: "kpi-01",
    kpiCode: "KPI-1.1",
    pillar: "ยุทธศาสตร์ที่ ๑: ความเป็นเลิศด้านพระไตรปิฎกบาลี",
    title: "อัตราสามเณรที่สามารถทรงจำคัมภีร์ปทรูปสิทธิและสัททนีติแบบมุขปาฐะ",
    target: "ไม่น้อยกว่า ๘๐%",
    actual: "๘๙.๔%",
    percentage: 89.4,
    status: "EXCEEDED"
  },
  {
    id: "kpi-02",
    kpiCode: "KPI-1.2",
    pillar: "ยุทธศาสตร์ที่ ๑: ความเป็นเลิศด้านพระไตรปิฎกบาลี",
    title: "อัตราการสอบผ่านบาลีสนามหลวง ชั้นเปรียญธรรม ๓ ถึง ๙ ประโยค",
    target: "ไม่น้อยกว่า ๗๐%",
    actual: "๗๘.๐%",
    percentage: 78.0,
    status: "ON_TRACK"
  },
  {
    id: "kpi-03",
    kpiCode: "KPI-2.1",
    pillar: "ยุทธศาสตร์ที่ ๒: ศาสนทายาทต้นแบบวิถีศีล สมาธิ ปัญญา",
    title: "ชั่วโมงการเจริญวิปัสสนากัมมัฏฐานสะสมของศากยบุตรสามเณร",
    target: "๑๒๐ ชั่วโมง/รูป/ปี",
    actual: "๑๒๐ ชั่วโมง",
    percentage: 100.0,
    status: "EXCEEDED"
  },
  {
    id: "kpi-04",
    kpiCode: "KPI-3.1",
    pillar: "ยุทธศาสตร์ที่ ๓: บูรณาการพระพุทธศาสนาสู่สากล",
    title: "การจัดสัมมนาวิชาการพระบาลีเถรวาทนานาชาติ (Hybrid Conference)",
    target: "ปีละ ๒ ครั้ง",
    actual: "๑ ครั้ง",
    percentage: 50.0,
    status: "ON_TRACK"
  }
];

// -------------------------------------------------------------
// 4. LIBRARY & DIGITAL TIPITAKA (ระบบห้องสมุดและคลังคัมภีร์)
// -------------------------------------------------------------
export interface TipitakaBook {
  id: string;
  catalogNumber: string;
  title: string;
  paliTitle: string;
  category: "พระวินัยปิฎก" | "พระสุตตันตปิฎก" | "พระอภิธรรมปิฎก" | "คัมภีร์สัททาวิเสส (ไวยากรณ์บาลีโบราณ)" | "อรรถกถาและฎีกา";
  authorOrCompiler: string;
  scriptType: "อักษรไทย-บาลี" | "อักษรโรมัน-บาลี" | "อักษรพม่า-บาลี" | "คัมภีร์ใบลานดิจิทัล";
  pagesCount: number;
  availableCopies: number;
  digitalPdfUrl: string;
}

export const mockTipitakaBooks: TipitakaBook[] = [
  {
    id: "tipi-01",
    catalogNumber: "TIP-PAL-001",
    title: "คัมภีร์ปทรูปสิทธิปกรณ์ พร้อมอรรถกถา",
    paliTitle: "ปทรูปสิทฺธิปกรณํ",
    category: "คัมภีร์สัททาวิเสส (ไวยากรณ์บาลีโบราณ)",
    authorOrCompiler: "พระพุทธปิยเถระ พระภัททันตะ",
    scriptType: "อักษรไทย-บาลี",
    pagesCount: 680,
    availableCopies: 15,
    digitalPdfUrl: "/docs/padarupasiddhi-complete.pdf"
  },
  {
    id: "tipi-02",
    catalogNumber: "TIP-PAL-002",
    title: "คัมภีร์สัททนีติปกรณ์ ฉบับธาตุมาลาและสุตตมาลา",
    paliTitle: "สทฺทนีติปกรณํ",
    category: "คัมภีร์สัททาวิเสส (ไวยากรณ์บาลีโบราณ)",
    authorOrCompiler: "พระอัคควังสะเถระ (พุกาม)",
    scriptType: "อักษรโรมัน-บาลี",
    pagesCount: 1150,
    availableCopies: 8,
    digitalPdfUrl: "/docs/saddaniti-complete.pdf"
  },
  {
    id: "tipi-03",
    catalogNumber: "TIP-PAL-003",
    title: "พระวินัยปิฎก มหาวิภังค์ เล่ม ๑ (ปฐมสมันตปาสาทิกา)",
    paliTitle: "สมนฺตปาสาทิกา นาม วินยฏฺฐกถา",
    category: "พระวินัยปิฎก",
    authorOrCompiler: "พระพุทธโฆษาจารย์",
    scriptType: "อักษรไทย-บาลี",
    pagesCount: 820,
    availableCopies: 12,
    digitalPdfUrl: "/docs/samantapasadika-01.pdf"
  },
  {
    id: "tipi-04",
    catalogNumber: "TIP-PAL-004",
    title: "คัมภีร์มูลกัจจายนะ วุฒิและสูตร",
    paliTitle: "มูลกจฺจายนพฺยากรณํ",
    category: "คัมภีร์สัททาวิเสส (ไวยากรณ์บาลีโบราณ)",
    authorOrCompiler: "พระมหากัจจายนเถระ",
    scriptType: "คัมภีร์ใบลานดิจิทัล",
    pagesCount: 350,
    availableCopies: 5,
    digitalPdfUrl: "/docs/mulakaccayana.pdf"
  }
];

// -------------------------------------------------------------
// 5. RESEARCH & QUALITY ASSURANCE (ระบบวิจัยและคุณภาพการศึกษา)
// -------------------------------------------------------------
export interface ResearchProject {
  id: string;
  projectCode: string;
  title: string;
  researcher: string;
  budget: number;
  category: "พุทธศาสตร์ประยุกต์" | "การแปลและอนุรักษ์คัมภีร์โบราณ" | "นวัตกรรมการสอนภาษาบาลี";
  progress: number;
  publishedIn?: string;
  status: "กำลังวิจัย" | "เผยแพร่แล้ว (TCI กลุ่ม ๑)" | "รอประเมิน";
}

export const mockResearchProjects: ResearchProject[] = [
  {
    id: "res-01",
    projectCode: "RES-69-01",
    title: "การศึกษาวิเคราะห์เปรียบเทียบโครงสร้างไวยากรณ์คัมภีร์สัททนีติกับหลักภาษาศาสตร์สากล",
    researcher: "พระมหา ดร.เวชสุภัทโท และคณะ",
    budget: 250000,
    category: "การแปลและอนุรักษ์คัมภีร์โบราณ",
    progress: 85,
    publishedIn: "วารสารมหาจุฬาวิชาการ (TCI กลุ่ม ๑)",
    status: "เผยแพร่แล้ว (TCI กลุ่ม ๑)"
  },
  {
    id: "res-02",
    projectCode: "RES-69-02",
    title: "นวัตกรรมมุขปาฐะร่วมกับเทคโนโลยีดิจิทัลในการส่งเสริมการทรงจำพระไตรปิฎกของสามเณร",
    researcher: "อาจารย์สมบูรณ์ และฝ่ายเทคโนโลยีสารสนเทศ",
    budget: 180000,
    category: "นวัตกรรมการสอนภาษาบาลี",
    progress: 70,
    status: "กำลังวิจัย"
  }
];

export interface QAMetric {
  id: string;
  standard: "AUN-QA" | "EdPEx" | "สมศ. / มจร-QA";
  indicatorNo: string;
  title: string;
  scoreTarget: number;
  scoreActual: number;
  evidenceDocsCount: number;
  status: "PASSED" | "EXCELLENT" | "PENDING_AUDIT";
}

export const mockQAMetrics: QAMetric[] = [
  {
    id: "qa-01",
    standard: "AUN-QA",
    indicatorNo: "Criteria 1.1",
    title: "Expected Learning Outcomes (ผลการเรียนรู้ที่คาดหวังด้านบาลีไตรปิฎก)",
    scoreTarget: 5.0,
    scoreActual: 5.0,
    evidenceDocsCount: 14,
    status: "EXCELLENT"
  },
  {
    id: "qa-02",
    standard: "สมศ. / มจร-QA",
    indicatorNo: "ตัวชี้วัด ๒.๑",
    title: "อัตลักษณ์บัณฑิต มจร: ศรัทธา อุทิศตน ปัญญา ศีลธรรม",
    scoreTarget: 4.5,
    scoreActual: 4.8,
    evidenceDocsCount: 22,
    status: "EXCELLENT"
  },
  {
    id: "qa-03",
    standard: "EdPEx",
    indicatorNo: "หมวด ๓",
    title: "การมุ่งเน้นลูกค้าและผู้มีส่วนได้ส่วนเสีย (โยมอุปถัมภ์และคณะสงฆ์)",
    scoreTarget: 4.0,
    scoreActual: 4.2,
    evidenceDocsCount: 18,
    status: "PASSED"
  }
];

// -------------------------------------------------------------
// 6. ACADEMIC SERVICES (ระบบบริการการศึกษาและตารางสอน)
// -------------------------------------------------------------
export interface CourseScheduleItem {
  id: string;
  dayOfWeek: "จันทร์" | "อังคาร" | "พุธ" | "พฤหัสบดี" | "ศุกร์" | "เสาร์";
  timeSlot: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  classLevel: string;
  room: string;
}

export const mockCourseSchedule: CourseScheduleItem[] = [
  {
    id: "sch-01",
    dayOfWeek: "จันทร์",
    timeSlot: "๐๘:๓๐ - ๑๑:๐๐ น.",
    courseCode: "PAL-301",
    courseName: "คัมภีร์ปทรูปสิทธิ สนธิกัณฑ์และนามกัณฑ์",
    instructor: "พระมหา ดร.เวชสุภัทโท",
    classLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๓",
    room: "ห้องเรียนพระไตรปิฎก ๑๐๑"
  },
  {
    id: "sch-02",
    dayOfWeek: "จันทร์",
    timeSlot: "๑๓:๐๐ - ๑๕:๓๐ น.",
    courseCode: "PAL-102",
    courseName: "บาลีไวยากรณ์สมถะและมุขปาฐะพื้นฐาน",
    instructor: "พระอาจารย์มหาธนพล",
    classLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๑",
    room: "ห้องเรียนพระไตรปิฎก ๑๐๒"
  },
  {
    id: "sch-03",
    dayOfWeek: "อังคาร",
    timeSlot: "๐๘:๓๐ - ๑๑:๐๐ น.",
    courseCode: "VIN-201",
    courseName: "พระวินัยบัญญัติและการลงอุโบสถสังฆกรรม",
    instructor: "พระครูวินัยธร สมพงษ์",
    classLevel: "เตปิฏกบาลีศากยบุตร ชั้น ๒",
    room: "หอประชุมศากยบุตรสีหะ"
  }
];

export interface AcademicOutreachProject {
  id: string;
  projectTitle: string;
  targetAudience: "พระสังฆาธิการ" | "ประชาชนทั่วไป" | "พระธรรมทูต" | "ครูสอนพระปริยัติธรรม";
  dateRange: string;
  registeredCount: number;
  maxSeats: number;
  status: "เปิดรับสมัคร" | "กำลังอบรม" | "เสร็จสิ้นแล้ว";
}

export const mockOutreachProjects: AcademicOutreachProject[] = [
  {
    id: "out-01",
    projectTitle: "โครงการติวเข้มและจำลองการสอบบาลีสนามหลวง ประจำปี ๒๕๖๙",
    targetAudience: "ครูสอนพระปริยัติธรรม",
    dateRange: "๑๕ - ๒๐ ตุลาคม ๒๕๖๙",
    registeredCount: 145,
    maxSeats: 150,
    status: "เปิดรับสมัคร"
  },
  {
    id: "out-02",
    projectTitle: "หลักสูตรพระบาลีเพื่อการศึกษาพระไตรปิฎกสำหรับสาธุชน (ระยะสั้น ๑๒ สัปดาห์)",
    targetAudience: "ประชาชนทั่วไป",
    dateRange: "๑ กันยายน - ๓๐ พฤศจิกายน ๒๕๖๙",
    registeredCount: 88,
    maxSeats: 100,
    status: "กำลังอบรม"
  }
];


