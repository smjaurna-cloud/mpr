// ============================================================================
// ข้อมูลระบบแชตบอร์ด กระดานสนทนาธรรม และห้องแชตสด (MOD-19: Chat Board)
// มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
// ============================================================================

export type BoardCategory = 
  | "DHAMMA_PALI"       // สนทนาธรรมและบาลีศึกษา
  | "CAMPUS_LIFE"       // ข่าวสารและกิจวัตรวิทยาลัย
  | "IT_ERP_SUPPORT"    // ศูนย์ช่วยเหลือไอที & ระบบ ERP
  | "PATRON_PUBLIC";    // มุมศรัทธาสาธุชน & โยมอุปถัมภ์

export interface ThreadReply {
  id: string;
  authorName: string;
  authorRole: "MONK" | "NOVICE" | "FACULTY" | "STAFF" | "PATRON" | "SUPER_ADMIN";
  authorRoleThai: string;
  avatarBg: string;
  content: string;
  createdAt: string;
  sadhuCount: number;
}

export interface BoardThread {
  id: string;
  category: BoardCategory;
  categoryThai: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: "MONK" | "NOVICE" | "FACULTY" | "STAFF" | "PATRON" | "SUPER_ADMIN";
  authorRoleThai: string;
  avatarBg: string;
  createdAt: string;
  viewsCount: number;
  repliesCount: number;
  sadhuCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  replies: ThreadReply[];
}

export interface LiveChatMessage {
  id: string;
  senderName: string;
  senderRole: "MONK" | "NOVICE" | "FACULTY" | "STAFF" | "PATRON" | "BOT" | "SUPER_ADMIN";
  senderRoleThai: string;
  avatarBg: string;
  text: string;
  timestamp: string;
  isBot?: boolean;
}

export interface OnlineUserItem {
  id: string;
  name: string;
  roleThai: string;
  avatarBg: string;
  statusText: string;
  isMonkOrNovice: boolean;
}

export const mockOnlineUsers: OnlineUserItem[] = [
  { id: "u-1", name: "พระธรรมวชิราจารย์ รศ.ดร.", roleThai: "ผู้อำนวยการวิทยาลัย", avatarBg: "bg-amber-700", statusText: "ออนไลน์ (ตรวจงานราชการ)", isMonkOrNovice: true },
  { id: "u-2", name: "สมบูรณ์ (แอดมินระบบ)", roleThai: "Super Admin", avatarBg: "bg-slate-800", statusText: "ออนไลน์ (ดูแลระบบ ERP)", isMonkOrNovice: false },
  { id: "u-3", name: "พระมหาเสฏฐวุฒิ ดร. ป.ธ.๙", roleThai: "อาจารย์ประจำหลักสูตร", avatarBg: "bg-amber-600", statusText: "ออนไลน์ (เตรียมสอน มคอ.๒)", isMonkOrNovice: true },
  { id: "u-4", name: "พระมหาวีรวิชญ์ ป.ธ.๙", roleThai: "อาจารย์บาลีสนามหลวง", avatarBg: "bg-amber-600", statusText: "ออนไลน์ (ห้องสมุดพระไตรปิฎก)", isMonkOrNovice: true },
  { id: "u-5", name: "สามเณรสมชาย มณีจินดา (ป.ธ.๖)", roleThai: "สามเณรพี่เลี้ยง", avatarBg: "bg-yellow-600", statusText: "ออนไลน์ (ทบทวนมุขปาฐะ)", isMonkOrNovice: true },
  { id: "u-6", name: "คุณหญิงกัลยา โสภณ", roleThai: "โยมอุปถัมภ์", avatarBg: "bg-emerald-600", statusText: "ออนไลน์ (จองภัตตาหารเพล)", isMonkOrNovice: false },
  { id: "u-7", name: "รศ.ดร.เวทย์ บรรณกรกุล", roleThai: "อาจารย์ประจำหลักสูตร", avatarBg: "bg-blue-700", statusText: "ออนไลน์ (วิจัยพระไตรปิฎก)", isMonkOrNovice: false },
];

export const mockBoardThreads: BoardThread[] = [
  {
    id: "th-1",
    category: "CAMPUS_LIFE",
    categoryThai: "ข่าวสารและกิจวัตรวิทยาลัย",
    title: "📌 ประกาศกำหนดการสอบประโยคบาลีสนามหลวง ประจำปี ๒๕๖๙ และแนวทางเตรียมตัวของสามเณร",
    content: "สืบเนื่องจากการเปิดภาคการศึกษา คณาจารย์ได้จัดสรรตารางการทบทวนมุขปาฐะและฝึกแปลคัมภีร์อรรถกถาธรรมบทและมังคลัตถทีปนี ณ ห้องเรียน A 1 ถึง A 6 ขอให้พระพี่เลี้ยงและสามเณรทุกรูปเตรียมพร้อมทั้งร่างกายและจิตใจตามพระธรรมวินัย",
    authorName: "พระมหาเสฏฐวุฒิ วชิรญาโณ ป.ธ.๙, ดร.",
    authorRole: "FACULTY",
    authorRoleThai: "อาจารย์ประจำหลักสูตร",
    avatarBg: "bg-amber-700",
    createdAt: "2026-09-08 09:00",
    viewsCount: 1450,
    repliesCount: 3,
    sadhuCount: 48,
    isPinned: true,
    isLocked: false,
    tags: ["บาลีสนามหลวง", "กำหนดการสอบ", "ห้องเรียน A1-A6"],
    replies: [
      {
        id: "rep-1-1",
        authorName: "พระมหาวีรวิชญ์ ตนฺติปาโล ป.ธ.๙",
        authorRole: "MONK",
        authorRoleThai: "คณาจารย์ผู้สอนบาลี",
        avatarBg: "bg-amber-600",
        content: "กราบเรียนท่านอาจารย์ ทางห้องสมุดได้เตรียมชุดคัมภีร์สัททาวิเสสและพระไตรปิฎกฉบับสากลพร้อมสำหรับการสืบค้นเสริมในชั่วโมงค่ำเรียบร้อยแล้วครับ",
        createdAt: "2026-09-08 10:15",
        sadhuCount: 14,
      },
      {
        id: "rep-1-2",
        authorName: "สามเณรสมชาย มณีจินดา",
        authorRole: "NOVICE",
        authorRoleThai: "สามเณร ป.ธ.๖",
        avatarBg: "bg-yellow-600",
        content: "ขอกราบขอบพระคุณพระอาจารย์ครับ สามเณรทุกรูปกำลังตั้งใจท่องจำมุขปาฐะทุกวันเวลา ๑๙.๐๐ - ๒๑.๐๐ น. ครับ",
        createdAt: "2026-09-08 11:30",
        sadhuCount: 22,
      },
    ],
  },
  {
    id: "th-2",
    category: "DHAMMA_PALI",
    categoryThai: "สนทนาธรรมและบาลีศึกษา",
    title: "📌 ระเบียบปฏิบัติและกติกามารยาทในการสนทนาบนระบบแชตบอร์ดสงฆ์ ตามกรอบพระวินัยปิฎก",
    content: "เพื่อความเป็นระเบียบเรียบร้อย สมณสารูป และส่งเสริมสัมมาวาจา ขอความร่วมมือผู้ใช้งานทุกท่านใช้ถ้อยคำสุภาพ ไม่ขัดต่อพระธรรมวินัย และหลีกเลี่ยงการเปิดเผยข้อมูลส่วนบุคคลหรือสุขภาพของสามเณรผู้เยาว์สู่สาธารณะ",
    authorName: "พระครูสังฆรักษ์อำนวย เขมปญฺโญ",
    authorRole: "MONK",
    authorRoleThai: "พระเถระฝ่ายบริหารสงฆ์",
    avatarBg: "bg-amber-800",
    createdAt: "2026-09-07 14:00",
    viewsCount: 1820,
    repliesCount: 2,
    sadhuCount: 65,
    isPinned: true,
    isLocked: true,
    tags: ["พระวินัย", "มารยาทสงฆ์", "กฎบัตร AGENTS"],
    replies: [
      {
        id: "rep-2-1",
        authorName: "สมบูรณ์ (แอดมินระบบ)",
        authorRole: "SUPER_ADMIN",
        authorRoleThai: "ผู้ดูแลระบบหลัก",
        avatarBg: "bg-slate-800",
        content: "ระบบได้ติดตั้งตัวกรองคำสุภาพอัตโนมัติ (Monastic Decorum Filter) และมีทีมงานมอนิเตอร์ตลอด ๒๔ ชั่วโมง เพื่อความสงบเรียบร้อยครับ",
        createdAt: "2026-09-07 14:30",
        sadhuCount: 31,
      },
    ],
  },
  {
    id: "th-3",
    category: "DHAMMA_PALI",
    categoryThai: "สนทนาธรรมและบาลีศึกษา",
    title: "ข้อสงสัยเรื่องการแจกแจงวิภัตติในคัมภีร์สัททาวิเสสและปทรูปสิทธิ (กถาว่าด้วยนามศัพท์)",
    content: "ในการศึกษาคัมภีร์ปทรูปสิทธิ หมวดนามกัณฑ์ การแปลงสิปฐมาวิภัตติเป็น โอ ในอการันต์ปุงลิงค์ ขอเรียนถามแนวทางการอธิบายเปรียบเทียบกับไวยากรณ์บาลีสนามหลวงเพื่อให้สามเณรเข้าใจง่ายครับ",
    authorName: "พระมหาวีรวิชญ์ ตนฺติปาโล ป.ธ.๙",
    authorRole: "FACULTY",
    authorRoleThai: "คณาจารย์ผู้สอนบาลี",
    avatarBg: "bg-amber-600",
    createdAt: "2026-09-08 16:20",
    viewsCount: 890,
    repliesCount: 2,
    sadhuCount: 27,
    isPinned: false,
    isLocked: false,
    tags: ["ปทรูปสิทธิ", "สัททาวิเสส", "บาลีไวยากรณ์"],
    replies: [
      {
        id: "rep-3-1",
        authorName: "รศ.ดร.เวทย์ บรรณกรกุล",
        authorRole: "FACULTY",
        authorRoleThai: "อาจารย์ประจำหลักสูตร",
        avatarBg: "bg-blue-700",
        content: "ในปทรูปสิทธิ สูตร 'โส' มีการตั้งอุทาหรณ์ ปุริโส โดยอธิบายกระบวนการสนธิและการอาเทศวิภัตติไว้อย่างเป็นระบบ สามารถนำตารางเปรียบเทียบใน มคอ.๒ วิชาคัมภีร์บาลีสายคันถรจนามาฉายในจอ Hybrid Screen ได้ครับ",
        createdAt: "2026-09-08 17:05",
        sadhuCount: 19,
      },
    ],
  },
  {
    id: "th-4",
    category: "PATRON_PUBLIC",
    categoryThai: "มุมศรัทธาสาธุชน & โยมอุปถัมภ์",
    title: "ขอสอบถามแนวทางการจองภัตตาหารเพลและ e-Donation สำหรับเจ้าภาพต่างจังหวัด",
    content: "ครอบครัวโยมอยู่เชียงใหม่ มีความประสงค์จะร่วมเป็นเจ้าภาพถวายภัตตาหารเพลแด่พระภิกษุและสามเณร ๑๔๓ รูป สามารถจองผ่านระบบและโอน e-Donation เพื่อรับใบอนุโมทนาบัตรทองคำ A4 ได้อย่างไรบ้างคะ",
    authorName: "คุณหญิงกัลยา โสภณ",
    authorRole: "PATRON",
    authorRoleThai: "โยมอุปถัมภ์",
    avatarBg: "bg-emerald-600",
    createdAt: "2026-09-07 11:20",
    viewsCount: 1120,
    repliesCount: 1,
    sadhuCount: 42,
    isPinned: false,
    isLocked: false,
    tags: ["ภัตตาหารเพล", "e-Donation", "ใบอนุโมทนาบัตร"],
    replies: [
      {
        id: "rep-4-1",
        authorName: "พระปลัดชัยฤทธิ์ โชติวโร",
        authorRole: "MONK",
        authorRoleThai: "งานโภชนาการและอุปัฏฐาก",
        avatarBg: "bg-amber-700",
        content: "เจริญพรคุณโยม สามารถเข้าเมนู 'ภัตตาหาร & โยมอุปถัมภ์ (MOD-02)' เลือกวันที่ต้องการเป็นเจ้าภาพ และโอนผ่าน QR e-Donation ระบบจะออกใบอนุโมทนาบัตรทองคำ A4 หักลดหย่อนภาษี ๒ เท่าให้ทันที หรือโทรสอบถามสายด่วน ๐๙๒-๖๙๔๘๘๘๓ ได้ทุกวันครับ",
        createdAt: "2026-09-07 11:45",
        sadhuCount: 28,
      },
    ],
  },
  {
    id: "th-5",
    category: "IT_ERP_SUPPORT",
    categoryThai: "ศูนย์ช่วยเหลือไอที & ระบบ ERP",
    title: "ระบบจองรถส่วนกลาง ๑๐ คัน หากต้องเดินทางไปประชุมสภา มจร วังน้อย ต้องยื่นล่วงหน้ากี่วัน",
    content: "ต้องการขอใช้รถตู้ TOYOTA Commuter VIP สำหรับนำคณาจารย์ไปร่วมประชุมสภาวิทยาลัย มจร วังน้อย ต้องทำเรื่องในระบบ MOD-16 ล่วงหน้ากี่วัน และมีระเบียบเรื่องเวลาเพลอย่างไรครับ",
    authorName: "พระมหากันตพงศ์ กนฺตวีโร",
    authorRole: "MONK",
    authorRoleThai: "คณาจารย์",
    avatarBg: "bg-amber-600",
    createdAt: "2026-09-08 13:10",
    viewsCount: 670,
    repliesCount: 1,
    sadhuCount: 15,
    isPinned: false,
    isLocked: false,
    tags: ["ระบบจองรถ", "MOD-16", "เวลาเพล"],
    replies: [
      {
        id: "rep-5-1",
        authorName: "สมบูรณ์ (แอดมินระบบ)",
        authorRole: "SUPER_ADMIN",
        authorRoleThai: "ผู้ดูแลระบบหลัก",
        avatarBg: "bg-slate-800",
        content: "กราบเรียนพระอาจารย์ สามารถยื่นคำขอในระบบ /vehicle-booking ล่วงหน้าอย่างน้อย ๒๔ ชั่วโมงครับ โดยระบบจะมีระบบตรวจเช็กพระวินัยอัตโนมัติ หากออกเดินทางช่วงเช้าจะต้องระบุจุดฉันเพลให้เรียบร้อยก่อนเวลา ๑๑:๐๐ น. ครับ",
        createdAt: "2026-09-08 13:40",
        sadhuCount: 18,
      },
    ],
  },
  {
    id: "th-6",
    category: "CAMPUS_LIFE",
    categoryThai: "ข่าวสารและกิจวัตรวิทยาลัย",
    title: "การจัดเวรทำความสะอาด ๖ ห้องเรียน A 1 ถึง A 6 และหอฉันศากยบุตรประจำสัปดาห์",
    content: "ขอแจ้งตารางเวรศาสนกิจพัฒนาเสนาสนะประจำวันพุธหลังทำวัตรเช้า โดยแบ่งตามสายวิชา ประโยค ๑-๒ รับผิดชอบหอฉัน และ ป.ธ.๓-๕ รับผิดชอบอาคารเรียน A1-A6 ครับ",
    authorName: "พระปลัดชัยฤทธิ์ โชติวโร",
    authorRole: "MONK",
    authorRoleThai: "พระเลขานุการ",
    avatarBg: "bg-amber-700",
    createdAt: "2026-09-09 08:30",
    viewsCount: 540,
    repliesCount: 1,
    sadhuCount: 33,
    isPinned: false,
    isLocked: false,
    tags: ["เสนาสนะ", "กิจวัตรสงฆ์", "ห้องเรียน A1-A6"],
    replies: [
      {
        id: "rep-6-1",
        authorName: "สามเณรจิรายุ ชัดประเสริฐ",
        authorRole: "NOVICE",
        authorRoleThai: "ตัวแทนสามเณร",
        avatarBg: "bg-yellow-600",
        content: "รับทราบและพร้อมปฏิบัติศาสนกิจครับผม",
        createdAt: "2026-09-09 08:45",
        sadhuCount: 12,
      },
    ],
  },
];

export const mockLiveChatMessages: LiveChatMessage[] = [
  {
    id: "msg-1",
    senderName: "ระบบอัตโนมัติ MCU Pali Bot",
    senderRole: "BOT",
    senderRoleThai: "ผู้ช่วยอัจฉริยะ วส. มจร",
    avatarBg: "bg-amber-600",
    text: "🙏 นมัสการพระคุณเจ้า และยินดีต้อนรับสาธุชนทุกท่านสู่ห้องสนทนาสดราชวิทยาลัย สอบถามข้อมูลสถาบัน ตารางเพล หรือการสมัครเรียนได้ทันทีครับ",
    timestamp: "13:00",
    isBot: true,
  },
  {
    id: "msg-2",
    senderName: "พระมหาเสฏฐวุฒิ ดร.",
    senderRole: "FACULTY",
    senderRoleThai: "อาจารย์ประจำหลักสูตร",
    avatarBg: "bg-amber-700",
    text: "ขออนุโมทนาคุณหญิงกัลยาและคณะเจ้าภาพ ที่ได้จองเป็นเจ้าภาพถวายภัตตาหารเพลในวันพรุ่งนี้ด้วยครับ",
    timestamp: "13:12",
  },
  {
    id: "msg-3",
    senderName: "คุณหญิงกัลยา โสภณ",
    senderRole: "PATRON",
    senderRoleThai: "โยมอุปถัมภ์",
    avatarBg: "bg-emerald-600",
    text: "กราบขอบพระคุณพระอาจารย์ค่ะ คณะเจ้าภาพรู้สึกปลาบปลื้มใจที่ได้อุปถัมภ์ศาสนทายาท ๑๔๓ รูปค่ะ 🙏",
    timestamp: "13:15",
  },
  {
    id: "msg-4",
    senderName: "สามเณรสมชาย (ป.ธ.๖)",
    senderRole: "NOVICE",
    senderRoleThai: "สามเณรพี่เลี้ยง",
    avatarBg: "bg-yellow-600",
    text: "สามเณรทุกรูปกำลังลงแถวเตรียมเข้าคาบเรียนบาลีบ่ายเวลา ๑๓:๓๐ น. ครับผม",
    timestamp: "13:22",
  },
  {
    id: "msg-5",
    senderName: "สมบูรณ์ (แอดมินระบบ)",
    senderRole: "SUPER_ADMIN",
    senderRoleThai: "ผู้ดูแลระบบหลัก",
    avatarBg: "bg-slate-800",
    text: "ระบบ ERP ได้อัปเดตสถิติผู้เข้าชมแบบเรียลไทม์ และระบบ QR Code ติดตามงานเรียบร้อยแล้วครับ หากพบปัญหาแจ้งได้ทันทีครับ",
    timestamp: "13:28",
  },
];

// Smart bot responses based on user queries
export function getSmartBotReply(input: string): string {
  const query = input.toLowerCase();

  if (query.includes("เพล") || query.includes("ภัตตาหาร") || query.includes("อาหาร") || query.includes("จองวัน")) {
    return "🍱 [ตารางภัตตาหารเพล]: พระภิกษุและสามเณร ๑๔๓ รูป ฉันเพลเวลา ๑๑:๐๐ น. เจ้าภาพสามารถจองวันถวายภัตตาหารเพลและ e-Donation ได้ที่หน้าเมนู '/alms-patron' หรือโทรสายด่วน ๐๙๒-๖๙๔๘๘๘๓ ครับ";
  }
  if (query.includes("เบอร์") || query.includes("ติดต่อ") || query.includes("โทร") || query.includes("สายด่วน")) {
    return "📞 [ช่องทางติดต่อสถาบัน]:\n• สายด่วนรับเรื่องร้องเรียน/บริการ: ๐๙๒-๖๙๔๘๘๘๓\n• เบอร์โทรสำนักงานวิทยาลัย: ๐๙๙-๔๔๕-๔๒๕๖\n• อีเมล: info@palitheravada.mcu.ac.th\n• ที่อยู่: ๒๓๔ ถ.เพชรเกษม ต.รางพิกุล อ.กำแพงแสน จ.นครปฐม ๗๓๑๔๐";
  }
  if (query.includes("สมัคร") || query.includes("เรียน") || query.includes("มคอ") || query.includes("ปริญญา")) {
    return "🎓 [หลักสูตรระดับบัณฑิตศึกษา มคอ.๒]: สถาบันเปิดสอน ๓ หลักสูตร ได้แก่ พธ.ด. พระไตรปิฎกเถรวาท (๔๘ หน่วยกิต), พธ.ม. พระไตรปิฎกเถรวาท (๓๖ หน่วยกิต), และ พธ.ม. พระอภิธรรมปิฎก (๓๖ หน่วยกิต) ตรวจสอบรายละเอียดและดาวน์โหลดระเบียบการได้ที่เมนู '/graduate-curriculum' ครับ";
  }
  if (query.includes("รถ") || query.includes("ยานพาหนะ") || query.includes("จองรถ")) {
    return "🚐 [ระบบยานพาหนะส่วนกลาง]: วิทยาลัยมีรถตู้และรถส่วนกลาง ๑๐ คัน สามารถส่งแบบฟอร์มขอใช้รถราชการพร้อมตรวจสอบเวลาเพลตามพระวินัยได้ที่หน้า '/vehicle-booking' ล่วงหน้า ๒๔ ชม. ครับ";
  }
  if (query.includes("ร้องเรียน") || query.includes("ข้อเสนอแนะ") || query.includes("แจ้งปัญหา") || query.includes("qr")) {
    return "📋 [ศูนย์รับเรื่องร้องเรียน QR Code]: สามารถยื่นเรื่องร้องเรียน/ข้อเสนอแนะ หรือสแกน QR Code เพื่อติดตามงานทุกระบบได้ที่หน้า '/complaints-tracking' รองรับการยื่นแบบไม่ระบุตัวตน (Anonymous) ตามมาตรฐาน PDPA ครับ";
  }
  if (query.includes("นมัสการ") || query.includes("สวัสดี") || query.includes("กราบ")) {
    return "🙏 นมัสการพระคุณเจ้า / เจริญพรสาธุชน ยินดีต้อนรับสู่ระบบแชตบอร์ด วส. มจร มีข้อมูลด้านใดให้ผู้ช่วยอัจฉริยะรับใช้ สามารถพิมพ์สอบถามได้เลยครับ";
  }
  if (query.includes("สาธุ") || query.includes("อนุโมทนา")) {
    return "✨ ขออนุโมทนาสาธุในกุศลเจตนาและศรัทธาบารมีของทุกท่านครับ ขอความเจริญในธรรมจงมีแด่ท่าน";
  }

  return "🙏 รับทราบข้อความครับ เจ้าหน้าที่และผู้ดูแลระบบจะประสานงานตรวจสอบให้โดยเร็ว หรือหากเป็นเรื่องด่วนสามารถติดต่อสายด่วนวิทยาลัยได้ที่ ๐๙๒-๖๙๔๘๘๘๓ ครับ";
}

export const bannedWordsList: string[] = [
  "คำหยาบ", "ด่าทอ", "ก่นด่า", "ใส่ร้าย", "โฆษณาเว็บพนัน", "การพนัน", "เงินกู้", "ขายของหลอกลวง"
];
