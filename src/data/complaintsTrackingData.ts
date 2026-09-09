// ============================================================================
// ข้อมูลศูนย์รับเรื่องร้องเรียน QR Code และระบบติดตามงานรวมศูนย์ทุกระบบ (MOD-17)
// มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
// อ้างอิงมาตรฐานเว็บไซต์ทางการ https://palitheravada.mcu.ac.th/ และเกณฑ์ธรรมาภิบาล ITA
// ============================================================================

export type ComplaintCategory = 
  | "ACADEMIC"              // การศึกษาและวิชาการ
  | "MONASTIC_DISCIPLINE"   // ระเบียบวินัยสงฆ์และสามเณร
  | "SERVICE_STAFF"         // การให้บริการและบุคลากร
  | "FACILITIES_VEHICLES"   // อาคารสถานที่ ยานพาหนะ และความปลอดภัย
  | "TRANSPARENCY_ITA"      // ความโปร่งใสและการจัดซื้อจัดจ้าง (ITA)
  | "GENERAL_SUGGESTION";   // ข้อเสนอแนะทั่วไป

export type ComplaintStatus = 
  | "RECEIVED"        // รับเรื่องแล้ว
  | "INVESTIGATING"   // อยู่ระหว่างตรวจสอบข้อเท็จจริง
  | "ACTION_TAKEN"    // ดำเนินการแก้ไขแล้ว
  | "RESOLVED";       // ยุติเรื่องและแจ้งผล

export type ComplaintPriority = "NORMAL" | "HIGH" | "URGENT";

export interface ComplaintItem {
  id: string;
  trackingCode: string; // เช่น CMP-2569-001
  title: string;
  category: ComplaintCategory;
  categoryThai: string;
  details: string;
  complainantName: string; // ชื่อ หรือ "ไม่ประสงค์ระบุตัวตน (Anonymous)"
  isAnonymous: boolean;
  contactPhone?: string;
  contactEmail?: string;
  locationArea: string; // จุดที่เกิดเหตุ / อาคาร
  status: ComplaintStatus;
  priority: ComplaintPriority;
  submittedAt: string;
  assignedDepartment: string;
  officerInCharge: string;
  resolutionNote?: string;
  resolvedAt?: string;
  evidenceAttachmentsCount: number;
}

export const mockComplaints: ComplaintItem[] = [
  {
    id: "cmp-01",
    trackingCode: "CMP-2569-001",
    title: "ขอให้ปรับปรุงสัญญาณ Wi-Fi ณ กุฏิสามเณรโซน C สำหรับศึกษาพระไตรปิฎกออนไลน์",
    category: "FACILITIES_VEHICLES",
    categoryThai: "อาคารสถานที่และระบบเทคโนโลยี",
    details: "สัญญาณอินเทอร์เน็ตไร้สายบริเวณกุฏิสามเณรโซน C มีความไม่เสถียรในช่วงค่ำ (เวลา ๑๙.๐๐ - ๒๑.๐๐ น.) ซึ่งเป็นช่วงเวลาที่สามเณรต้องทบทวนมุขปาฐะและค้นคว้าคัมภีร์บาลีออนไลน์",
    complainantName: "พระพี่เลี้ยงประจำหอพักกุฏิสงฆ์",
    isAnonymous: false,
    contactPhone: "089-112-3456",
    contactEmail: "proctor@mvu.mcu.ac.th",
    locationArea: "อาศรมศากยบุตร กุฏิโซน C",
    status: "ACTION_TAKEN",
    priority: "HIGH",
    submittedAt: "2026-09-07 08:30",
    assignedDepartment: "ศูนย์เทคโนโลยีสารสนเทศและบริหารระบบ (IT Center)",
    officerInCharge: "อาจารย์สมบูรณ์ (ผู้ดูแลระบบหลัก)",
    resolutionNote: "ได้สั่งการให้ฝ่ายเทคนิคติดตั้ง Access Point เพิ่มเติมจำนวน ๒ จุด พร้อมปรับปรุง Bandwidth เรียบร้อยแล้ว",
    resolvedAt: "2026-09-08 14:00",
    evidenceAttachmentsCount: 1,
  },
  {
    id: "cmp-02",
    trackingCode: "CMP-2569-002",
    title: "เสนอแนะให้เพิ่มไฟส่องสว่างพลังงานแสงอาทิตย์บริเวณทางเดินเชื่อมระหว่างหอฉันกับอาคารเรียน A1-A6",
    category: "GENERAL_SUGGESTION",
    categoryThai: "ข้อเสนอแนะทั่วไปและภูมิทัศน์",
    details: "ในช่วงเช้ามืดเวลา ๐๔.๓๐ น. ที่สามเณรเดินทางไปทำวัตรเช้า ทางเดินระหว่างหอฉันกับห้องเรียนมืดพอสมควร เสนอให้ติดตั้ง Solar Streetlight เพื่อความปลอดภัยในการสัญจรของศาสนทายาท",
    complainantName: "ไม่ประสงค์ระบุตัวตน (Anonymous)",
    isAnonymous: true,
    locationArea: "ทางเดินเชื่อมระหว่างหอฉันกับอาคารเรียน A 1 - A 6",
    status: "INVESTIGATING",
    priority: "NORMAL",
    submittedAt: "2026-09-08 10:15",
    assignedDepartment: "สำนักงานวิทยาลัย (งานอาคารสถานที่และยานพาหนะ)",
    officerInCharge: "นายประสิทธิ์ มั่นคง (หัวหน้างานอาคารสถานที่)",
    resolutionNote: "บรรจุเข้าแผนงานติดตั้งไฟ Solar Walkway ภายใต้โครงการพัฒนาภูมิทัศน์และพลังงานสะอาดปีงบ ๖๙",
    evidenceAttachmentsCount: 2,
  },
  {
    id: "cmp-03",
    trackingCode: "CMP-2569-003",
    title: "ข้อร้องเรียนเรื่องการจัดสำรับภัตตาหารเจ/มังสวิรัติสำหรับพระเถระอาคันตุกะ",
    category: "SERVICE_STAFF",
    categoryThai: "การให้บริการและโภชนาการโรงครัว",
    details: "มีพระมหาเถระผู้ทรงคุณวุฒินิมนต์มาบรรยายพิเศษฉันมังสวิรัติ แต่รายการอาหารในมื้อเพลยังมีการปะปน ขอให้มีระบบป้ายชื่อกำกับสำรับอาหารพิเศษอย่างชัดเจน",
    complainantName: "พระมหากันตพงศ์ กนฺตวีโร",
    isAnonymous: false,
    contactPhone: "089-000-0012",
    contactEmail: "monk12@mvu.mcu.ac.th",
    locationArea: "หอฉันศากยบุตรราชวิทยาลัย",
    status: "RESOLVED",
    priority: "URGENT",
    submittedAt: "2026-09-06 11:15",
    assignedDepartment: "สำนักงานวิทยาลัย (งานโภชนาการและอุปัฏฐาก)",
    officerInCharge: "พระปลัดชัยฤทธิ์ โชติวโร (พระเลขาฯ สารบรรณสงฆ์)",
    resolutionNote: "ฝ่ายโรงครัวได้จัดทำป้ายกำกับสำรับอาหารเฉพาะบุคคล (Vegetarian / Allergy Tag) และมอบหมายเจ้าหน้าที่รับผิดชอบตรวจสอบก่อนเวลาเพลทุกมื้อ",
    resolvedAt: "2026-09-06 13:30",
    evidenceAttachmentsCount: 0,
  },
  {
    id: "cmp-04",
    trackingCode: "CMP-2569-004",
    title: "ข้อซักถามเกี่ยวกับขั้นตอนการสมัครเข้าศึกษาต่อระดับบัณฑิตศึกษา (มคอ.๒) ปีการศึกษา ๒๕๖๙",
    category: "ACADEMIC",
    categoryThai: "การศึกษาและวิชาการ",
    details: "ต้องการสอบถามกำหนดการสอบข้อเขียนภาษาบาลีและสัมภาษณ์ สำหรับผู้สมัครหลักสูตรพุทธศาสตรดุษฎีบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท",
    complainantName: "พระมหาบรรจบ ญาณวีโร (ผู้สมัครศึกษาต่อ)",
    isAnonymous: false,
    contactPhone: "092-6948883",
    contactEmail: "applicant@gmail.com",
    locationArea: "สำนักวิชาการ (กลุ่มงานบัณฑิตศึกษา)",
    status: "RESOLVED",
    priority: "NORMAL",
    submittedAt: "2026-09-05 14:20",
    assignedDepartment: "สำนักวิชาการ (งานทะเบียนและบัณฑิตศึกษา)",
    officerInCharge: "รศ.ดร.เวทย์ บรรณกรกุล (อาจารย์ประจำหลักสูตร)",
    resolutionNote: "เจ้าหน้าที่ได้โทรศัพท์ชี้แจงและส่งเอกสารประกาศรับสมัคร มคอ.๒ พร้อมแนวทางการเตรียมตัวสอบให้ทางอีเมลเรียบร้อยแล้ว",
    resolvedAt: "2026-09-05 16:00",
    evidenceAttachmentsCount: 1,
  },
  {
    id: "cmp-05",
    trackingCode: "CMP-2569-005",
    title: "การตรวจสอบความโปร่งใสการประกาศประกวดราคาจ้างก่อสร้างอาคารหอประชุมเตปิฏกมหาสังคีติสิทธาคาร (e-bidding)",
    category: "TRANSPARENCY_ITA",
    categoryThai: "ความโปร่งใสและจัดซื้อจัดจ้าง (ITA)",
    details: "ขอตรวจสอบรายละเอียด TOR และราคากลาง เพื่อความโปร่งใสตามเกณฑ์ประเมินคุณธรรมและความโปร่งใส (ITA) ของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
    complainantName: "คณะกรรมการติดตามธรรมาภิบาลชุมชน",
    isAnonymous: false,
    contactPhone: "081-998-7766",
    contactEmail: "ita.monitor@community.or.th",
    locationArea: "โครงการก่อสร้างหอประชุมเตปิฏกมหาสังคีติสิทธาคาร",
    status: "RESOLVED",
    priority: "HIGH",
    submittedAt: "2026-09-04 09:00",
    assignedDepartment: "สำนักงานวิทยาลัย (กลุ่มงานการเงิน พัสดุ และแผนงาน)",
    officerInCharge: "พระธรรมวชิราจารย์ รศ.ดร. (ผู้อำนวยการราชวิทยาลัย)",
    resolutionNote: "วิทยาลัยได้เผยแพร่เอกสาร TOR, ราคากลาง, และประกาศ e-bidding ฉบับสมบูรณ์บนเว็บไซต์ทางการ palitheravada.mcu.ac.th และระบบ e-GP กรมบัญชีกลางอย่างเปิดเผยตามกฎหมาย",
    resolvedAt: "2026-09-04 15:30",
    evidenceAttachmentsCount: 3,
  }
];

// ============================================================================
// ระบบติดตามสถานะคำร้องและภารกิจรวมศูนย์ทุกระบบ (Unified Request Tracker)
// รวมรหัสติดตามจาก: CMP-, VB-, DOC-, MTG-, ACAD-, ALM-, PRJ-
// ============================================================================

export type TrackedSystemType = 
  | "COMPLAINT"         // เรื่องร้องเรียน / ข้อเสนอแนะ (CMP-)
  | "VEHICLE_BOOKING"   // ขอใช้รถยนต์ส่วนกลาง (VB-)
  | "E_APPROVAL"        // สารบรรณและเกษียณหนังสือ (DOC-)
  | "MEETING_ROOM"      // จองห้องประชุมอัจฉริยะ (MTG-)
  | "ACADEMIC_REG"      // ทะเบียนและคำร้องวิชาการ (ACAD-)
  | "ALMS_PATRON"       // จองภัตตาหารและโยมอุปถัมภ์ (ALM-)
  | "PROCUREMENT_PRJ";  // โครงการงบประมาณและจัดซื้อจัดจ้าง (PRJ-)

export interface UnifiedTrackedTask {
  id: string;
  trackingCode: string;
  systemType: TrackedSystemType;
  systemNameThai: string;
  title: string;
  requesterName: string;
  departmentOrUnit: string;
  submittedDate: string;
  targetCompletionDate: string;
  currentStep: number; // 1 to 4
  totalSteps: number;
  status: "PENDING" | "PROCESSING" | "APPROVED" | "COMPLETED" | "REJECTED";
  statusThai: string;
  stepsHistory: {
    stepNo: number;
    stepTitle: string;
    actionBy: string;
    timestamp: string;
    isCompleted: boolean;
    note?: string;
  }[];
  relatedUrl: string;
}

export const mockUnifiedTrackedTasks: UnifiedTrackedTask[] = [
  {
    id: "task-01",
    trackingCode: "CMP-2569-001",
    systemType: "COMPLAINT",
    systemNameThai: "ศูนย์รับเรื่องร้องเรียนและข้อเสนอแนะ (e-Complaint)",
    title: "ปรับปรุงสัญญาณ Wi-Fi กุฏิสามเณรโซน C",
    requesterName: "พระพี่เลี้ยงประจำหอพักกุฏิสงฆ์",
    departmentOrUnit: "ศูนย์เทคโนโลยีสารสนเทศ (IT Center)",
    submittedDate: "2026-09-07 08:30",
    targetCompletionDate: "2026-09-09 17:00",
    currentStep: 3,
    totalSteps: 4,
    status: "PROCESSING",
    statusThai: "อยู่ระหว่างดำเนินการแก้ไข",
    stepsHistory: [
      { stepNo: 1, stepTitle: "รับเรื่องในระบบ", actionBy: "เจ้าหน้าที่สารบรรณ", timestamp: "2026-09-07 08:35", isCompleted: true },
      { stepNo: 2, stepTitle: "ตรวจสอบข้อเท็จจริง", actionBy: "หัวหน้าฝ่ายเทคนิค", timestamp: "2026-09-07 14:20", isCompleted: true },
      { stepNo: 3, stepTitle: "ติดตั้งอุปกรณ์เพิ่มเติม", actionBy: "ทีมวิศวกรเครือข่าย", timestamp: "2026-09-08 10:00", isCompleted: true, note: "ติดตั้ง Access Point 2 จุด" },
      { stepNo: 4, stepTitle: "ทดสอบและปิดเรื่อง", actionBy: "ผู้อำนวยการศูนย์ไอที", timestamp: "รอการทดสอบ", isCompleted: false }
    ],
    relatedUrl: "/complaints-tracking?code=CMP-2569-001",
  },
  {
    id: "task-02",
    trackingCode: "VB-2569-001",
    systemType: "VEHICLE_BOOKING",
    systemNameThai: "ระบบยานพาหนะและขอใช้รถส่วนกลาง (MOD-16)",
    title: "ขอใช้รถ TOYOTA Commuter VIP (ฮม 7740) รับ-ส่งกรรมการสภาวิทยาลัย มจร",
    requesterName: "พระมหาเสฏฐวุฒิ วชิรญาโณ ป.ธ.๙, ดร.",
    departmentOrUnit: "สำนักวิชาการ (บัณฑิตศึกษา)",
    submittedDate: "2026-09-08 09:00",
    targetCompletionDate: "2026-09-10 16:30",
    currentStep: 2,
    totalSteps: 4,
    status: "APPROVED",
    statusThai: "อนุมัติเรียบร้อย (พร้อมเดินทาง)",
    stepsHistory: [
      { stepNo: 1, stepTitle: "ยื่นใบขอใช้รถราชการ", actionBy: "พระมหาเสฏฐวุฒิ ดร.", timestamp: "2026-09-08 09:00", isCompleted: true },
      { stepNo: 2, stepTitle: "ตรวจสอบรถและพลขับ", actionBy: "นายประสิทธิ์ (หัวหน้างานยานพาหนะ)", timestamp: "2026-09-08 10:30", isCompleted: true },
      { stepNo: 3, stepTitle: "อนุมัติการเดินทางตามพระวินัย", actionBy: "ผู้อำนวยการสำนักงานวิทยาลัย", timestamp: "2026-09-08 14:00", isCompleted: true, note: "กลับก่อน ๑๑.๐๐ น. (ฉันเพลในวิทยาลัย)" },
      { stepNo: 4, stepTitle: "เสร็จสิ้นภารกิจและลงบันทึก", actionBy: "พลขับประจำรถ", timestamp: "รอดำเนินการ", isCompleted: false }
    ],
    relatedUrl: "/vehicle-booking",
  },
  {
    id: "task-03",
    trackingCode: "DOC-67-001",
    systemType: "E_APPROVAL",
    systemNameThai: "ระบบสารบรรณและอนุมัติมือถือ (MOD-04)",
    title: "ขออนุมัติเบิกจ่ายงบประมาณจัดซื้อตำราคัมภีร์สัททาวิเสส ๓๐ ชุด",
    requesterName: "พระมหาวีรวิชญ์ ตนฺติปาโล ป.ธ.๙",
    departmentOrUnit: "สำนักวิชาการ (คลังคัมภีร์พระไตรปิฎก)",
    submittedDate: "2026-09-07 10:15",
    targetCompletionDate: "2026-09-08 12:00",
    currentStep: 3,
    totalSteps: 3,
    status: "COMPLETED",
    statusThai: "อนุมัติและลงนามเรียบร้อย (เสร็จสิ้น)",
    stepsHistory: [
      { stepNo: 1, stepTitle: "เสนอหนังสือราชการ", actionBy: "พระมหาวีรวิชญ์", timestamp: "2026-09-07 10:15", isCompleted: true },
      { stepNo: 2, stepTitle: "ฝ่ายการเงินตรวจสอบงบประมาณ", actionBy: "เจ้าหน้าที่การเงิน", timestamp: "2026-09-07 14:00", isCompleted: true },
      { stepNo: 3, stepTitle: "ลงนามอนุมัติดิจิทัล", actionBy: "พระธรรมวชิราจารย์ รศ.ดร.", timestamp: "2026-09-08 09:30", isCompleted: true, note: "ลงนามดิจิทัลผ่านสมาร์ทโฟน" }
    ],
    relatedUrl: "/e-approval",
  },
  {
    id: "task-04",
    trackingCode: "MTG-2569-01",
    systemType: "MEETING_ROOM",
    systemNameThai: "ระบบห้องประชุมอัจฉริยะ (MOD-07)",
    title: "จองห้องประชุมพระพรหมวชิรปัญญาจารย์ สำหรับประชุมคณะกรรมการสภาวิทยาลัย ครั้งที่ ๙/๒๕๖๙",
    requesterName: "นายสมบูรณ์ จารุณะ",
    departmentOrUnit: "สำนักงานวิทยาลัย (งานกลาง/สารบรรณ)",
    submittedDate: "2026-09-08 11:30",
    targetCompletionDate: "2026-09-12 16:00",
    currentStep: 3,
    totalSteps: 4,
    status: "APPROVED",
    statusThai: "อนุมัติห้องประชุมและตั้งค่า IoT แล้ว",
    stepsHistory: [
      { stepNo: 1, stepTitle: "ส่งคำขอจองห้องประชุม", actionBy: "นายสมบูรณ์", timestamp: "2026-09-08 11:30", isCompleted: true },
      { stepNo: 2, stepTitle: "จัดคิวและอนุมัติระบบ", actionBy: "ผู้ดูแลห้องประชุม", timestamp: "2026-09-08 13:00", isCompleted: true },
      { stepNo: 3, stepTitle: "ซิงค์ป้ายดิจิทัลและ IoT", actionBy: "Smart Signage System", timestamp: "2026-09-08 13:05", isCompleted: true, note: "ตั้งค่าเครื่องปรับอากาศ ๒๔°C และกล้อง Hybrid" },
      { stepNo: 4, stepTitle: "เริ่มการประชุมจริง", actionBy: "คณะกรรมการสภาวิทยาลัย", timestamp: "รอถึงวันนัดหมาย", isCompleted: false }
    ],
    relatedUrl: "/meeting-rooms",
  },
  {
    id: "task-05",
    trackingCode: "PRJ-69-SOLAR",
    systemType: "PROCUREMENT_PRJ",
    systemNameThai: "ระบบแผนงบประมาณและการจัดซื้อจัดจ้าง (MOD-10)",
    title: "ประกวดราคาจ้างติดตั้งระบบผลิตพลังงานไฟฟ้าจากแสงอาทิตย์ (Solar Rooftop) อาคารสำนักงาน ด้วยวิธี e-bidding",
    requesterName: "กลุ่มงานนโยบายและแผนงาน วส. มจร",
    departmentOrUnit: "ฝ่ายพัสดุและงบประมาณ",
    submittedDate: "2026-09-01 09:00",
    targetCompletionDate: "2026-10-15 16:30",
    currentStep: 2,
    totalSteps: 5,
    status: "PROCESSING",
    statusThai: "เปิดรับข้อเสนอ e-Bidding ผ่านระบบ e-GP",
    stepsHistory: [
      { stepNo: 1, stepTitle: "จัดทำและเผยแพร่ TOR ราคากลาง", actionBy: "คณะกรรมการจัดทำร่าง TOR", timestamp: "2026-09-01 10:00", isCompleted: true },
      { stepNo: 2, stepTitle: "ประกาศประกวดราคาอิเล็กทรอนิกส์", actionBy: "กรมบัญชีกลาง / มบร.", timestamp: "2026-09-05 08:30", isCompleted: true, note: "วงเงินงบประมาณ ๒,๕๖๐,๐๐๐ บาท" },
      { stepNo: 3, stepTitle: "เปิดซองและพิจารณาผล", actionBy: "คณะกรรมการพิจารณาผล", timestamp: "2026-09-20 10:00", isCompleted: false },
      { stepNo: 4, stepTitle: "ประกาศผู้ชนะและลงนามสัญญา", actionBy: "ผู้อำนวยการราชวิทยาลัย", timestamp: "2026-09-28 14:00", isCompleted: false },
      { stepNo: 5, stepTitle: "ตรวจรับงานและเชื่อมระบบไฟฟ้า", actionBy: "คณะกรรมการตรวจรับพัสดุ", timestamp: "2026-10-15 16:00", isCompleted: false }
    ],
    relatedUrl: "/planning-budget",
  },
  {
    id: "task-06",
    trackingCode: "PRJ-69-AUDITORIUM",
    systemType: "PROCUREMENT_PRJ",
    systemNameThai: "ระบบแผนงบประมาณและการจัดซื้อจัดจ้าง (MOD-10)",
    title: "ประกวดราคาจ้างก่อสร้างอาคารหอประชุมเตปิฏกมหาสังคีติสิทธาคารเฉลิมพระเกียรติ งบประมาณ พ.ศ. ๒๕๖๙",
    requesterName: "คณะกรรมการดำเนินงานจัดสร้างหอประชุม",
    departmentOrUnit: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    submittedDate: "2026-08-25 09:00",
    targetCompletionDate: "2026-12-30 17:00",
    currentStep: 2,
    totalSteps: 5,
    status: "PROCESSING",
    statusThai: "อยู่ระหว่างกระบวนการจัดซื้อจัดจ้าง e-Bidding (๒๔.๘๖ ลบ.)",
    stepsHistory: [
      { stepNo: 1, stepTitle: "อนุมัติแบบรูปรายการและประมาณราคา", actionBy: "สภาวิทยาลัยและกองอาคาร มจร", timestamp: "2026-08-25 11:00", isCompleted: true },
      { stepNo: 2, stepTitle: "ประกาศประกวดราคาในระบบ e-GP", actionBy: "กลุ่มงานพัสดุและงบประมาณ", timestamp: "2026-09-02 09:00", isCompleted: true, note: "งบลงทุนแผ่นดินและเงินรายได้รวม ๒๔,๘๖๐,๐๐๐ บาท" },
      { stepNo: 3, stepTitle: "พิจารณาข้อเสนอและตรวจสอบคุณสมบัติ", actionBy: "คณะกรรมการประกวดราคา", timestamp: "2026-09-25 10:00", isCompleted: false },
      { stepNo: 4, stepTitle: "ทำสัญญาจ้างก่อสร้าง", actionBy: "ผู้อำนวยการราชวิทยาลัย", timestamp: "2026-10-10 14:00", isCompleted: false },
      { stepNo: 5, stepTitle: "เริ่มงานฐานรากและศิลาฤกษ์", actionBy: "ผู้รับจ้างและคณะสงฆ์", timestamp: "2026-11-01 09:00", isCompleted: false }
    ],
    relatedUrl: "/planning-budget",
  },
  {
    id: "task-07",
    trackingCode: "ALM-101",
    systemType: "ALMS_PATRON",
    systemNameThai: "ระบบภัตตาหารและโยมอุปถัมภ์ (MOD-02)",
    title: "จองเป็นเจ้าภาพถวายภัตตาหารเพล สามเณร ๑๒๓ รูป และพระภิกษุ ๒๐ รูป",
    requesterName: "คุณหญิงกัลยา และครอบครัวโสภณ",
    departmentOrUnit: "ฝ่ายโยมอุปถัมภ์และโรงครัวสงฆ์",
    submittedDate: "2026-09-06 08:00",
    targetCompletionDate: "2026-09-09 12:00",
    currentStep: 3,
    totalSteps: 3,
    status: "COMPLETED",
    statusThai: "ถวายภัตตาหารและออกใบอนุโมทนาบัตรอิเล็กทรอนิกส์แล้ว",
    stepsHistory: [
      { stepNo: 1, stepTitle: "จองวันและเลือกเมนูอาหาร", actionBy: "เจ้าภาพโยมอุปถัมภ์", timestamp: "2026-09-06 08:00", isCompleted: true },
      { stepNo: 2, stepTitle: "โอนปัจจัย e-Donation สรรพากร ๒ เท่า", actionBy: "ระบบธนาคารกรุงไทย e-Donation", timestamp: "2026-09-06 08:15", isCompleted: true },
      { stepNo: 3, stepTitle: "ถวายภัตตาหารและรับพรสงฆ์", actionBy: "คณะสงฆ์และสามเณร ๑๔๓ รูป", timestamp: "2026-09-09 11:00", isCompleted: true, note: "ออกใบอนุโมทนาบัตร A4 ทองคำทางการ" }
    ],
    relatedUrl: "/alms-patron",
  }
];

// ============================================================================
// ข่าวสารประชาสัมพันธ์และประกาศทางการ อ้างอิงจาก palitheravada.mcu.ac.th
// ============================================================================

export interface OfficialNewsArticle {
  id: string;
  title: string;
  englishTitle?: string;
  category: "E_BIDDING" | "ACADEMIC_NEWS" | "BUDDHIST_EVENT" | "ROYAL_PROJECT";
  categoryThai: string;
  publishedDate: string;
  summary: string;
  fullUrl: string;
  isImportantNotice: boolean;
  department: string;
}

export const officialWebsiteNews: OfficialNewsArticle[] = [
  {
    id: "news-01",
    title: "ประกวดราคาจ้างติดตั้งระบบผลิตพลังงานไฟฟ้าจากแสงอาทิตย์ (Solar Rooftop) – อาคารสำนักงาน ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์ (e-bidding)",
    englishTitle: "Electronic Bidding (e-bidding) for Solar Rooftop System Installation - Administrative Building",
    category: "E_BIDDING",
    categoryThai: "ประกาศจัดซื้อจัดจ้าง e-Bidding",
    publishedDate: "2026-09-05",
    summary: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย มีความประสงค์จะประกวดราคาจ้างติดตั้งระบบ Solar Rooftop อาคารสำนักงาน เพื่อลดค่าใช้จ่ายด้านพลังงานและส่งเสริมพลังงานสะอาดพุทธสถานตามนโยบาย Green Monastic Campus",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=834",
    isImportantNotice: true,
    department: "สำนักงานวิทยาลัย (กลุ่มงานพัสดุและอาคารสถานที่)",
  },
  {
    id: "news-02",
    title: "ประกวดราคาจ้างก่อสร้างอาคารหอประชุมเตปิฏกมหาสังคีติสิทธาคารเฉลิมพระเกียรติ ประจำปีงบประมาณ พ.ศ. ๒๕๖๙ ด้วยวิธี e-bidding",
    englishTitle: "e-Bidding for the Construction of the Royal Celebratory Tipitaka Sangiti Conference Auditorium (FY 2026)",
    category: "E_BIDDING",
    categoryThai: "ประกาศจัดซื้อจัดจ้าง e-Bidding",
    publishedDate: "2026-09-02",
    summary: "โครงการก่อสร้างอาคารหอประชุมใหญ่เตปิฏกมหาสังคีติสิทธาคาร รองรับการจัดสังคายนานานาชาติ การประชุมวิชาการพระไตรปิฎก และกิจกรรมบรรยายธรรมระดับนานาชาติ วงเงิน ๒๔.๘๖ ล้านบาท",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=815",
    isImportantNotice: true,
    department: "สำนักงานวิทยาลัย (กลุ่มงานนโยบายและแผนงาน)",
  },
  {
    id: "news-03",
    title: "ประกาศรับสมัครนิสิตระดับบัณฑิตศึกษา (ปริญญาโท-ปริญญาเอก) ประจำปีการศึกษา ๒๕๖๙",
    englishTitle: "Admissions Open for Graduate Programs (M.A. & Ph.D.) Academic Year 2026",
    category: "ACADEMIC_NEWS",
    categoryThai: "ข่าวสารการศึกษา & บัณฑิตศึกษา",
    publishedDate: "2026-09-01",
    summary: "เปิดรับสมัครพระภิกษุ สามเณร และคฤหัสถ์ผู้สนใจ ศึกษาต่อหลักสูตร พธ.ด. สาขาวิชาพระไตรปิฎกเถรวาท, พธ.ม. สาขาวิชาพระไตรปิฎกเถรวาท และ พธ.ม. สาขาวิชาพระอภิธรรมปิฎก",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=826",
    isImportantNotice: true,
    department: "สำนักวิชาการ (บัณฑิตศึกษา)",
  },
  {
    id: "news-04",
    title: "งานสาธยายคัมภีร์มหาปัฏฐาน โดยพระสงฆ์พม่าและพระสงฆ์สามเณรไทย ๒๗๒ รูป ร่วมสวดสาธยายต่อเนื่อง ๗ วัน ๗ คืน",
    englishTitle: "Grand Mahāpatthāna Recitation by 272 Thai & Myanmar Monks and Novices Continuously for 7 Days & Nights",
    category: "BUDDHIST_EVENT",
    categoryThai: "งานศาสนพิธี & ธรรมปฏิบัติ",
    publishedDate: "2026-08-28",
    summary: "พิธีสวดสาธยายคัมภีร์มหาปัฏฐาน มหาปกรณ์ เพื่อเฉลิมพระเกียรติพระบาทสมเด็จพระเจ้าอยู่หัว และสร้างความเชี่ยวชาญด้านมุขปาฐะคัมภีร์อภิธรรมชั้นสูงแก่ศากยบุตรสามเณรสีหะ",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=456",
    isImportantNotice: false,
    department: "โรงเรียนศากยบุตรสามเณรสีหะ & วัดบาลีเถรวาทสังฆาราม",
  },
  {
    id: "news-05",
    title: "โครงการ Pali English Program (PEP) นวัตกรรมการจัดการเรียนการสอนพระปริยัติธรรมและภาษาอังกฤษสากล",
    englishTitle: "Pali English Program (PEP): Innovative Pali-English Immersion Curriculum for Novices",
    category: "ACADEMIC_NEWS",
    categoryThai: "นวัตกรรมการศึกษา",
    publishedDate: "2026-08-20",
    summary: "ยกระดับทักษะภาษาอังกฤษควบคู่ภาษาบาลีสำหรับศาสนทายาท เพื่อรองรับการเผยแผ่พระไตรปิฎกบาลีเถรวาทสู่สากลในเวทีพระพุทธศาสนาระดับโลก",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=140",
    isImportantNotice: false,
    department: "สำนักวิชาการ (โครงการพิเศษ PEP)",
  },
  {
    id: "news-06",
    title: "ศากยบุตรสามเณรสีหะ เรียนรู้การอนุรักษ์ธรรมชาติ โครงการพระราชดำริ และจาริกธุดงค์รุกขมูลกัมมัฏฐาน ณ เทือกเขาภูพาน",
    englishTitle: "Samanera Forest Monastic Meditation and Royal Nature Conservation Pilgrimage at Phu Phan Mountains",
    category: "ROYAL_PROJECT",
    categoryThai: "โครงการพระราชดำริ & กัมมัฏฐาน",
    publishedDate: "2026-08-15",
    summary: "คณะศากยบุตรสามเณรสีหะฝึกอบรมวิปัสสนากัมมัฏฐานกลางแจ้ง เรียนรู้วิถีธรรมชาติและโครงการอนุรักษ์สิ่งแวดล้อมตามแนวพระราชดำริ เสริมสร้างปฏิปทาแห่งสมณะแท้",
    fullUrl: "https://palitheravada.mcu.ac.th/?p=152",
    isImportantNotice: false,
    department: "ฝ่ายปกครองและวิปัสสนาธุระ",
  }
];

// ============================================================================
// ศูนย์บริการระบบ มจร ดิจิทัล (MCU Digital Gateway Links)
// ============================================================================

export interface McuDigitalServiceLink {
  id: string;
  nameThai: string;
  nameEng: string;
  category: "STUDENT" | "STAFF" | "RESEARCH" | "GOVERNANCE";
  url: string;
  description: string;
  isExternal: boolean;
}

export const mcuDigitalServices: McuDigitalServiceLink[] = [
  {
    id: "svc-01",
    nameThai: "ระบบบริการการศึกษา มจร (MCU REG)",
    nameEng: "MCU Educational Service System",
    category: "STUDENT",
    url: "https://regweb.mcu.ac.th/registrar/home.asp",
    description: "ระบบลงทะเบียนเรียน ผลการเรียน ตรวจสอบหน่วยกิต และตารางสอบสำหรับนิสิต มจร",
    isExternal: true,
  },
  {
    id: "svc-02",
    nameThai: "ระบบสารบรรณอิเล็กทรอนิกส์ (LessPaper2)",
    nameEng: "MCU e-Document & LessPaper2",
    category: "STAFF",
    url: "https://lesspaper2.affix.co.th/mcu/app/",
    description: "ระบบรับ-ส่งหนังสือราชการ เกษียณหนังสือ และลงนามอิเล็กทรอนิกส์กลางของ มจร",
    isExternal: true,
  },
  {
    id: "svc-03",
    nameThai: "คลังวิทยานิพนธ์อิเล็กทรอนิกส์ (e-Thesis)",
    nameEng: "MCU Electronic Theses & Dissertations",
    category: "RESEARCH",
    url: "https://e-thesis.mcu.ac.th/",
    description: "ฐานข้อมูลวิทยานิพนธ์ระดับปริญญาโทและปริญญาเอก คณะพุทธศาสตร์และบัณฑิตวิทยาลัย",
    isExternal: true,
  },
  {
    id: "svc-04",
    nameThai: "วารสารบาลีเถรวาทปริทรรศน์ (PTRJ)",
    nameEng: "Pali Theravada Review Journal",
    category: "RESEARCH",
    url: "https://so15.tci-thaijo.org/index.php/PTRJ",
    description: "วารสารวิชาการมาตรฐาน TCI กลุ่ม ๑ ด้านพระไตรปิฎก บาลีพุทธศาสตร์ และปรมัตถธรรม",
    isExternal: true,
  },
  {
    id: "svc-05",
    nameThai: "ระบบปฏิบัติศาสนกิจ (MCU SAS)",
    nameEng: "Monastic & Religious Practice System",
    category: "STUDENT",
    url: "https://stud.mcu.ac.th/sas/",
    description: "บันทึกและประเมินผลการปฏิบัติศาสนกิจของพระนิสิตก่อนสำเร็จการศึกษา",
    isExternal: true,
  },
  {
    id: "svc-06",
    nameThai: "ประมวลจริยธรรมและธรรมาภิบาล มจร (ITA)",
    nameEng: "MCU Ethical Code & Integrity Assessment",
    category: "GOVERNANCE",
    url: "https://www.mcu.ac.th/pages/ethics",
    description: "มาตรฐานธรรมาภิบาล ความโปร่งใส และจรรยาบรรณบุคลากรมหาวิทยาลัย",
    isExternal: true,
  }
];

export function getComplaintsStatistics() {
  const totalComplaints = mockComplaints.length;
  const resolvedCount = mockComplaints.filter(c => c.status === "RESOLVED").length;
  const inProgressCount = mockComplaints.filter(c => c.status === "INVESTIGATING" || c.status === "ACTION_TAKEN").length;
  const anonymousCount = mockComplaints.filter(c => c.isAnonymous).length;
  return {
    totalComplaints,
    resolvedCount,
    inProgressCount,
    anonymousCount,
  };
}
