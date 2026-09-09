// ============================================================================
// ข้อมูลทำเนียบช่องทางติดต่อราชการตามระบบมาตรฐานสถาบันอุดมศึกษาและเกณฑ์ ITA
// มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
// อ้างอิงมาตรฐานเว็บไซต์ https://palitheravada.mcu.ac.th/ และเกณฑ์ OIT (O1-O5)
// ============================================================================

export interface DepartmentContact {
  id: string;
  deptCode: string;
  nameThai: string;
  nameEng: string;
  headName: string;
  headRole: string;
  buildingLocation: string;
  floor: string;
  phoneExtension: string;
  directPhone?: string;
  officialEmail: string;
  lineId?: string;
  operatingHours: string;
  services: string[];
  isEmergency24h?: boolean;
}

export interface SocialMediaChannel {
  platform: "WEBSITE" | "LINE" | "FACEBOOK" | "YOUTUBE" | "TIKTOK" | "MCU_PORTAL";
  title: string;
  handleOrUrl: string;
  displayUrl: string;
  description: string;
  qrCodeValue?: string;
  followerCount?: string;
  iconName: string;
}

export interface InquiryTicket {
  id: string;
  ticketCode: string; // เช่น INQ-2569-001
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  targetDepartment: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: "RECEIVED" | "PROCESSING" | "RESPONDED";
  responseNote?: string;
}

// ข้อมูลการติดต่อหลักของสถาบัน (Institutional Primary Contact)
export const mainCollegeContact = {
  institutionNameThai: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  institutionNameEng: "Mahavajiralongkorn Pali Theravada College (MVU)",
  affiliation: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (วส. มจร)",
  sanghaTemple: "วัดบาลีเถรวาทสังฆาราม",
  address: {
    street: "เลขที่ ๑ หมู่ที่ ๑ วัดบาลีเถรวาทสังฆาราม",
    subDistrict: "ตำบลรางพิกุล",
    district: "อำเภอกำแพงแสน",
    province: "จังหวัดนครปฐม",
    postcode: "๗๓๑๔๐",
    fullAddressThai: "วัดบาลีเถรวาทสังฆาราม ตำบลรางพิกุล อำเภอกำแพงแสน จังหวัดนครปฐม ๗๓๑๔๐",
    fullAddressEng: "Wat Pali Theravada Sangharama, Rang Pikul Sub-district, Kamphaeng Saen District, Nakhon Pathom Province 73140, Thailand",
  },
  coordinates: {
    lat: 14.0325,
    lng: 99.9856,
    googleMapsUrl: "https://maps.google.com/?q=14.0325,99.9856",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.5!2d99.9856!3d14.0325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDAxJzU3LjAiTiA5OcKwNTknMDguMiJF!5e0!3m2!1sth!2sth!4v1",
  },
  phones: {
    centralSwitchboard: "034-109-888",
    directorOffice: "034-109-888 ต่อ 101",
    mobileDirect: "099-445-4256",
    fax: "034-109-889",
    emergency24h: "099-445-4256",
  },
  emails: {
    primary: "palitheravada@mcu.ac.th",
    academic: "academic.pt@mcu.ac.th",
    contact: "contact@mvu.mcu.ac.th",
    itHelpdesk: "it.support@mvu.mcu.ac.th",
  },
  website: "https://palitheravada.mcu.ac.th/",
  officeHours: "วันจันทร์ - วันศุกร์ เวลา ๐๘.๓๐ - ๑๖.๓๐ น. (ปิดวันหยุดนักขัตฤกษ์)",
  monasticVisitingHours: "ทุกวัน เวลา ๐๗.๐๐ - ๑๘.๐๐ น. (ถวายภัตตาหารเพลก่อน ๑๑.๐๐ น.)",
};

// ทำเนียบ ๘ ฝ่ายงานทางการ (Departmental Directory)
export const officialDepartments: DepartmentContact[] = [
  {
    id: "dept-01",
    deptCode: "DIR",
    nameThai: "สำนักงานผู้อำนวยการราชวิทยาลัย",
    nameEng: "Office of the College Director",
    headName: "พระธรรมวชิราจารย์, รศ.ดร.",
    headRole: "ผู้อำนวยการวิทยาลัยสงฆ์",
    buildingLocation: "อาคารเตปิฏกมหาสังคีติสิทธาคาร",
    floor: "ชั้น ๒ ห้อง ๒๐๑",
    phoneExtension: "101",
    directPhone: "099-445-4256",
    officialEmail: "director.pt@mcu.ac.th",
    operatingHours: "วันจันทร์ - ศุกร์ ๐๘.๓๐ - ๑๖.๓๐ น.",
    services: [
      "งานอำนวยการและนโยบายวิทยาลัยสงฆ์",
      "งานประสานงานสภาวิทยาลัย มจร ส่วนกลาง",
      "งานต้อนรับพระเถรานุเถระและแขกต่างประเทศ",
      "การรับเรื่องร้องเรียนถึงผู้อำนวยการ",
    ],
  },
  {
    id: "dept-02",
    deptCode: "ACAD",
    nameThai: "สำนักวิชาการและงานทะเบียนนิสิต",
    nameEng: "Academic Affairs & Registrar Division",
    headName: "พระมหาเสฏฐวุฒิ วชิรญาโณ ป.ธ.๙, ดร.",
    headRole: "รองผู้อำนวยการฝ่ายวิชาการ",
    buildingLocation: "อาคารเรียนรวมบาลีศากยบุตร",
    floor: "ชั้น ๑ ห้องทะเบียน ๑๐๒",
    phoneExtension: "201 - 203",
    directPhone: "034-109-888 ต่อ 201",
    officialEmail: "academic.pt@mcu.ac.th",
    lineId: "@pt-academic",
    operatingHours: "วันจันทร์ - เสาร์ ๐๘.๐๐ - ๑๗.๐๐ น.",
    services: [
      "รับสมัครนักเรียนบาลีศากยบุตร และนิสิตบัณฑิตศึกษา (มคอ.๒)",
      "งานทะเบียนประวัติ วัดผลการศึกษา และเชื่อมโยง MCU REG",
      "งานสอบมุขปาฐะปากเปล่าและบาลีสนามหลวง",
      "ออกใบรับรองผลการเรียน (Transcript / Certificate)",
    ],
  },
  {
    id: "dept-03",
    deptCode: "DISC",
    nameThai: "ฝ่ายปกครองและกิจการศากยบุตรสามเณร",
    nameEng: "Monastic Student Affairs & Discipline Division",
    headName: "พระมหาบุญช่วย สุวฑฺฒโน ป.ธ.๙",
    headRole: "หัวหน้างานฝ่ายปกครองและพระพี่เลี้ยง",
    buildingLocation: "ศูนย์ประสานงานอาศรมศากยบุตร",
    floor: "อาคารกุฏิสงฆ์ส่วนกลาง",
    phoneExtension: "301",
    directPhone: "089-112-3456",
    officialEmail: "proctor.pt@mcu.ac.th",
    operatingHours: "ให้บริการและดูแลกิจวัตร ๒๔ ชั่วโมง",
    isEmergency24h: true,
    services: [
      "การดูแลวิถีชีวิตและระเบียบวินัยพระภิกษุสามเณร ๒๔ ชม.",
      "การจัดเวรทำวัตรเช้า-เย็น และเจริญกัมมัฏฐาน",
      "การประสานงานผู้ปกครองและโยมอุปถัมภ์",
      "การขออนุญาตลากิจนิมนต์และตรวจเยี่ยมกุฏิที่พัก",
    ],
  },
  {
    id: "dept-04",
    deptCode: "HR",
    nameThai: "ฝ่ายบริหารงานบุคคลและสารบรรณ",
    nameEng: "Human Resources & General Administration Division",
    headName: "พระปลัดชัยฤทธิ์ โชติวโร",
    headRole: "หัวหน้างานสารบรรณและบุคลากร",
    buildingLocation: "อาคารสำนักงานวิทยาลัยสงฆ์",
    floor: "ชั้น ๑ ห้องสารบรรณ",
    phoneExtension: "401",
    directPhone: "034-109-888 ต่อ 401",
    officialEmail: "hr.pt@mcu.ac.th",
    operatingHours: "วันจันทร์ - ศุกร์ ๐๘.๓๐ - ๑๖.๓๐ น.",
    services: [
      "งานสารบรรณ รับ-ส่งหนังสือราชการและระบบ LessPaper2 มจร",
      "งานอัตรากำลังคณาจารย์และเจ้าหน้าที่ ๓๖ อัตรา",
      "งานสิทธิประโยชน์ สวัสดิการ และสมณศักดิ์สงฆ์",
      "การขอหนังสือรับรองการทำงานและใบกำกับราชการ",
    ],
  },
  {
    id: "dept-05",
    deptCode: "FIN",
    nameThai: "ฝ่ายการเงิน บัญชี และพัสดุ",
    nameEng: "Finance, Accounting & Procurement Division",
    headName: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ",
    headRole: "หัวหน้างานการเงินและพัสดุ",
    buildingLocation: "อาคารสำนักงานวิทยาลัยสงฆ์",
    floor: "ชั้น ๑ ห้องการเงิน",
    phoneExtension: "501 - 502",
    directPhone: "034-109-888 ต่อ 501",
    officialEmail: "finance.pt@mcu.ac.th",
    operatingHours: "วันจันทร์ - ศุกร์ ๐๘.๓๐ - ๑๖.๓๐ น.",
    services: [
      "การบริหารงบประมาณแผ่นดินและงบรายได้ มจร ปี ๖๙ (๘๑.๓๙ ลบ.)",
      "การรับบริจาค ๓ กองทุนสงฆ์ และออกใบเสร็จรับเงิน",
      "การจัดซื้อจัดจ้าง e-Bidding ตาม พ.ร.บ. จัดซื้อจัดจ้างฯ",
      "การเบิกจ่ายงบประมาณโครงการวิจัยและสัมมนา",
    ],
  },
  {
    id: "dept-06",
    deptCode: "ALMS",
    nameThai: "ศูนย์โภชนาการและกองทุนภัตตาหารเพล",
    nameEng: "Nutritional & Alms Offering Center",
    headName: "แม่ครัวมณฑา & คณะกรรมการฝ่ายอุปัฏฐาก",
    headRole: "ผู้จัดการศูนย์โภชนาการและโรงครัวสงฆ์",
    buildingLocation: "อาคารหอฉันภัตตาหารศากยบุตร",
    floor: "ชั้น ๑",
    phoneExtension: "601",
    directPhone: "081-445-5678",
    officialEmail: "alms.pt@mcu.ac.th",
    lineId: "@alms-pt",
    operatingHours: "ทุกวัน ๐๖.๐๐ - ๑๓.๐๐ น.",
    services: [
      "เปิดรับจองเจ้าภาพภัตตาหารเช้า ภัตตาหารเพล และน้ำปานะ",
      "ออกใบอนุโมทนาบัตรทองคำ e-Donation ลดหย่อนภาษี ๒ เท่า",
      "การจัดสำรับภัตตาหารตามพระวินัยและปลอดสารก่อภูมิแพ้",
      "บริการรองรับคณะศรัทธาสาธุชนที่มาร่วมทำบุญ",
    ],
  },
  {
    id: "dept-07",
    deptCode: "IT",
    nameThai: "ศูนย์เทคโนโลยีสารสนเทศและพุทธปัญญาประดิษฐ์",
    nameEng: "Information Technology & Buddhist AI Center",
    headName: "ดร.สมบูรณ์ จารุณะ",
    headRole: "ผู้อำนวยการศูนย์ไอทีและนวัตกรรม",
    buildingLocation: "อาคารวิทยบริการและนวัตกรรมดิจิทัล",
    floor: "ชั้น ๓ ห้องเซิร์ฟเวอร์",
    phoneExtension: "701",
    directPhone: "099-445-4256",
    officialEmail: "it.support@mvu.mcu.ac.th",
    lineId: "@mvu-helpdesk",
    operatingHours: "วันจันทร์ - ศุกร์ ๐๘.๐๐ - ๑๘.๐๐ น. (ระบบทำงาน ๒๔ ชม.)",
    services: [
      "การพัฒนาระบบ ERP มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
      "งานวิจัยและพัฒนาพุทธปัญญาประดิษฐ์ (Buddhist AI: BAI)",
      "ดูแลระบบเครือข่าย Wi-Fi ทั่วมหาวิทยาลัย และระบบ Zoom ห้องเรียน",
      "บริการบัญชีผู้ใช้งาน สิทธิ์ RBAC และความมั่นคงปลอดภัยไซเบอร์",
    ],
  },
  {
    id: "dept-08",
    deptCode: "HEALTH",
    nameThai: "หน่วยปฐมพยาบาลและเวชระเบียนสุขภาวะสงฆ์",
    nameEng: "Monastic Health & Infirmary Center",
    headName: "พยาบาลวิชาชีพประจำวิทยาลัย / พระอุปัฏฐาก",
    headRole: "หัวหน้าหน่วยพยาบาลและเวชระเบียน",
    buildingLocation: "อาคารเรือนพยาบาลศากยบุตร",
    floor: "ชั้น ๑",
    phoneExtension: "801",
    directPhone: "099-445-4256",
    officialEmail: "infirmary.pt@mcu.ac.th",
    operatingHours: "ดูแลฉุกเฉินตลอด ๒๔ ชั่วโมง",
    isEmergency24h: true,
    services: [
      "การดูแลรักษาพยาบาลเบื้องต้นสำหรับพระภิกษุและสามเณร",
      "เวชระเบียนประวัติการแพ้ยาและแพ้อาหาร (คุ้มครองตาม PDPA)",
      "การส่งตัวผู้ป่วยฉุกเฉินไปยังโรงพยาบาลกำแพงแสน",
      "การตรวจสุขภาพและส่งเสริมสุขภาวะสงฆ์ประจำภาคการศึกษา",
    ],
  },
];

// ช่องทางดิจิทัลและสื่อสังคมออนไลน์ (Social & Digital Channels)
export const officialSocialChannels: SocialMediaChannel[] = [
  {
    platform: "WEBSITE",
    title: "เว็บไซต์หลัก มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    handleOrUrl: "https://palitheravada.mcu.ac.th/",
    displayUrl: "palitheravada.mcu.ac.th",
    description: "พอร์ทัลข้อมูลทางการ ข่าวประชาสัมพันธ์ หลักสูตร มคอ.๒ และประกาศจัดซื้อจัดจ้าง e-Bidding",
    iconName: "Globe",
  },
  {
    platform: "LINE",
    title: "LINE Official Account ราชวิทยาลัย",
    handleOrUrl: "https://line.me/R/ti/p/@palitheravada",
    displayUrl: "@palitheravada",
    description: "ช่องทางติดต่อสอบถามข้อมูล จองภัตตาหารเพล รับแจ้งเตือนผลการเรียน และสมุดพกดิจิทัล",
    qrCodeValue: "https://line.me/R/ti/p/@palitheravada",
    followerCount: "๑๒,๔๕๐ คน",
    iconName: "MessageCircle",
  },
  {
    platform: "FACEBOOK",
    title: "Facebook แฟนเพจทางการ",
    handleOrUrl: "https://www.facebook.com/palitheravada",
    displayUrl: "facebook.com/palitheravada",
    description: "ข่าวสารกิจวัตร กิจกรรมธรรมยาตรา ภาพพิธีบรรพชาสามเณร และการสาธยายพระไตรปิฎก",
    followerCount: "๒๘,๙๐๐ ผู้ติดตาม",
    iconName: "Facebook",
  },
  {
    platform: "YOUTUBE",
    title: "YouTube: Mahavajiralongkorn Channel",
    handleOrUrl: "https://www.youtube.com/@palitheravada",
    displayUrl: "youtube.com/@palitheravada",
    description: "ถ่ายทอดสดการสาธยายมุขปาฐะบาลี คลังวิดีโอบรรยายพระอภิธรรม และสารคดีศาสนทายาท",
    followerCount: "๑๕,๒๐๐ สมาชิก",
    iconName: "Youtube",
  },
  {
    platform: "MCU_PORTAL",
    title: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร ส่วนกลาง)",
    handleOrUrl: "https://www.mcu.ac.th/",
    displayUrl: "mcu.ac.th",
    description: "เครือข่ายมหาวิทยาลัยสงฆ์ มจร วังน้อย พระนครศรีอยุธยา เชื่อมโยงฐานข้อมูล MCU REG",
    iconName: "Building",
  },
];

// ข้อมูลอาคารสถานที่และผังวิทยาเขตจากเอกสารทางการ
export interface CampusBuilding {
  id: number;
  nameThai: string;
  usableAreaSqM: string;
  usableAreaNumber: number;
  description: string;
  category: "ADMIN" | "ACADEMIC" | "MONASTIC" | "SERVICE" | "HEALTH";
}

export const campusLandInfo = {
  totalAreaRai: "๑๗๗ ไร่เศษ",
  totalUsableAreaSqM: "๙,๕๖๘ ตรม.",
  documentPath: "/buildings/อาคารสถานที่มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย.docx",
  documentFileName: "อาคารสถานที่มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย.docx",
};

export const officialCampusBuildings: CampusBuilding[] = [
  {
    id: 1,
    nameThai: "อาคารรับรองพระอาคันตุกะ",
    usableAreaSqM: "๑๐๐ ตรม.",
    usableAreaNumber: 100,
    description: "ต้อนรับพระเถระ พระอาคันตุกะ และแขกผู้ทรงเกียรติจากทั้งในและต่างประเทศ",
    category: "MONASTIC",
  },
  {
    id: 2,
    nameThai: "อาคารเรือนไม้ ๒ ชั้น (ห้องรับรอง)",
    usableAreaSqM: "๖๐ ตรม.",
    usableAreaNumber: 60,
    description: "ห้องรับรองพิเศษและมุมสนทนาธรรม บรรยากาศร่มรื่น",
    category: "SERVICE",
  },
  {
    id: 3,
    nameThai: "อาคารสำนักงาน ๒ ชั้น",
    usableAreaSqM: "๑,๔๐๘ ตรม.",
    usableAreaNumber: 1408,
    description: "สำนักงานผู้อำนวยการ, ฝ่ายบริหารงานบุคคล, งานสารบรรณ, ฝ่ายการเงินและพัสดุ",
    category: "ADMIN",
  },
  {
    id: 4,
    nameThai: "อาคารห้องประชุมย่อยและปฐมพยาบาล ๑ ชั้น",
    usableAreaSqM: "๔๐๐ ตรม.",
    usableAreaNumber: 400,
    description: "ห้องประชุมสัมมนากลุ่มย่อย และหน่วยปฐมพยาบาล/เวชระเบียนสุขภาวะสงฆ์ ๒๔ ชม.",
    category: "HEALTH",
  },
  {
    id: 5,
    nameThai: "อาคารเรือนไทยที่พักสงฆ์ “โสภณอนันต์กิจ”",
    usableAreaSqM: "๑๕๐ ตรม.",
    usableAreaNumber: 150,
    description: "กุฏิที่พักพระเถรานุเถระและอาจารย์ใหญ่ สถาปัตยกรรมเรือนไทยประยุกต์",
    category: "MONASTIC",
  },
  {
    id: 6,
    nameThai: "อุปัฏฐานศาลา พระราชวชิรเวที (บรรจบ ขนฺติโก)",
    usableAreaSqM: "๔๕๐ ตรม.",
    usableAreaNumber: 450,
    description: "ศาลาบำเพ็ญกุศล ศูนย์อุปัฏฐากพระสงฆ์ และจัดกิจกรรมศาสนพิธีสำคัญ",
    category: "SERVICE",
  },
  {
    id: 7,
    nameThai: "อาคารหอสมุดและเทคโนโลยีสารสนเทศ",
    usableAreaSqM: "๘๐๐ ตรม.",
    usableAreaNumber: 800,
    description: "คลังพระไตรปิฎก ๔๕ เล่ม, ศูนย์ไอที, ห้อง Server และพุทธปัญญาประดิษฐ์ (BAI)",
    category: "ACADEMIC",
  },
  {
    id: 8,
    nameThai: "อาคารเรียนรวม",
    usableAreaSqM: "๑,๓๕๐ ตรม.",
    usableAreaNumber: 1350,
    description: "ห้องเรียนรวมบาลีศากยบุตร A1–A6, ห้องสอบบาลีสนามหลวง และห้องบรรยายบัณฑิตศึกษา",
    category: "ACADEMIC",
  },
  {
    id: 9,
    nameThai: "อาคารหอพัก",
    usableAreaSqM: "๑,๓๕๐ ตรม.",
    usableAreaNumber: 1350,
    description: "กุฏิที่พักอาศัยและจำวัดของศากยบุตรสามเณรและพระภิกษุ ๑๔๓ รูป",
    category: "MONASTIC",
  },
  {
    id: 10,
    nameThai: "อาคารหอฉันและโรงครัวอาคารเอนกประสงค์ คศล. ๓ ชั้น",
    usableAreaSqM: "๒,๑๐๐ ตรม.",
    usableAreaNumber: 2100,
    description: "โรงครัวมาตรฐาน, โต๊ะฉันภัตตาหารสงฆ์ ๑๔๓ รูป และหอประชุมเอนกประสงค์",
    category: "SERVICE",
  },
  {
    id: 11,
    nameThai: "อาคารห้องน้ำชาย-หญิง",
    usableAreaSqM: "๑,๓๕๐ ตรม.",
    usableAreaNumber: 1350,
    description: "สุขาภิบาลและห้องสุขารวมสำหรับพระภิกษุ สามเณร และคณะศรัทธาสาธุชน",
    category: "SERVICE",
  },
];

// รายการตัวอย่าง Inquiry Tickets สำหรับการติดต่อ
export const mockInquiryTickets: InquiryTicket[] = [
  {
    id: "inq-01",
    ticketCode: "INQ-2569-012",
    senderName: "คุณวิภาดา รัตนโชติ",
    senderEmail: "wiphada@gmail.com",
    senderPhone: "081-456-7890",
    targetDepartment: "ศูนย์โภชนาการและกองทุนภัตตาหารเพล",
    subject: "ขอจองเป็นเจ้าภาพภัตตาหารเพลในวันคล้ายวันเกิดครอบครัว",
    message: "ประสงค์ขอจองเป็นเจ้าภาพถวายภัตตาหารเพลแด่พระภิกษุสามเณร ๑๔๓ รูป ในวันที่ ๑๕ ตุลาคม ๒๕๖๙ พร้อมขอรับใบอนุโมทนาบัตร e-Donation",
    submittedAt: "2026-09-08 14:30",
    status: "RESPONDED",
    responseNote: "เจ้าหน้าที่ฝ่ายโภชนาการได้ติดต่อกลับยืนยันวันว่างและจัดส่งหมายเลขบัญชีกองทุนพร้อมรหัส e-Donation เรียบร้อยแล้ว",
  },
  {
    id: "inq-02",
    ticketCode: "INQ-2569-013",
    senderName: "พระมหาธีรภัทร ปภสฺสโร",
    senderEmail: "theeraphat@mcu.ac.th",
    senderPhone: "089-778-9900",
    targetDepartment: "สำนักวิชาการและงานทะเบียนนิสิต",
    subject: "สอบถามเกณฑ์การรับสมัครหลักสูตร พธ.ด. พระไตรปิฎกเถรวาท",
    message: "ต้องการสอบถามคุณสมบัติของผู้สมัครระดับปริญญาเอก มคอ.๒ ว่าเทียบวุฒิเปรียญธรรม ๙ ประโยค สามารถเทียบโอนวิชาบาลีได้หรือไม่",
    submittedAt: "2026-09-09 09:15",
    status: "PROCESSING",
    responseNote: "อยู่ระหว่างอาจารย์ประจำหลักสูตรพิจารณาตรวจสอบรายละเอียดข้อบังคับ มจร",
  },
];


