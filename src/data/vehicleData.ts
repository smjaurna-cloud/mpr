export type VehicleCategory = 
  | "รถตู้โดยสาร" 
  | "รถบัสปรับอากาศ" 
  | "รถกระบะบรรทุก" 
  | "รถยนต์ตรวจการ" 
  | "รถสุขาเคลื่อนที่" 
  | "รถรางนำเที่ยว" 
  | "รถบริการภายใน";

export type VehicleStatus = "พร้อมใช้งาน" | "กำลังปฏิบัติงาน" | "จองแล้ว" | "ซ่อมบำรุง";

export type BookingPurpose = 
  | "รับ-ส่งพระเถระ/ผู้บริหาร" 
  | "นำสามเณรเข้าสอบบาลีสนามหลวง" 
  | "รับบิณฑบาต/ภัตตาหารเพล" 
  | "ศึกษาดูงาน/วิจัยพระไตรปิฎก" 
  | "บริการวิชาการชุมชน" 
  | "ขนส่งสังฆภัณฑ์/พัสดุวิทยาลัย" 
  | "นำเที่ยวชมวิทยาลัย" 
  | "สนับสนุนงานสุขาภิบาล/พิธีสงฆ์" 
  | "งานอาคารสถานที่และภูมิทัศน์";

export type BookingStatus = "อนุมัติแล้ว" | "รออนุมัติ" | "กำลังเดินทาง" | "เสร็จสิ้น" | "ยกเลิก";

export interface Vehicle {
  id: string;
  code: string;
  orderNo: number;
  brand: string;
  model: string;
  plateNumber: string;
  category: VehicleCategory;
  capacity: number;
  capacityDesc: string;
  fuelType: "ดีเซล" | "เบนซิน" | "ไฟฟ้า (EV)";
  status: VehicleStatus;
  color: string;
  assignedDriver: string;
  driverPhone: string;
  currentMileage: number;
  lastMaintenanceDate: string;
  insuranceExpiryDate: string;
  usageNote: string;
  features: string[];
}

export interface VehicleBooking {
  id: string;
  bookingCode: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  purpose: BookingPurpose;
  destination: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  monksCount: number;
  samanerasCount: number;
  laypeopleCount: number;
  requesterName: string;
  requesterDept: string;
  requesterPhone: string;
  driverRequired: boolean;
  assignedDriver: string;
  status: BookingStatus;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
  createdAt: string;
}

export const centralVehicles: Vehicle[] = [
  {
    id: "v-01",
    orderNo: 1,
    code: "MVU-VAN-01",
    brand: "TOYOTA",
    model: "Commuter VIP Executive",
    plateNumber: "ฮม 7740 กรุงเทพมหานคร",
    category: "รถตู้โดยสาร",
    capacity: 11,
    capacityDesc: "๑๑ ที่นั่ง (เบาะ VIP พระเถระ)",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีขาวมุก (พระราชทาน)",
    assignedDriver: "นายสมชาย ยานยนต์",
    driverPhone: "081-456-7890",
    currentMileage: 48250,
    lastMaintenanceDate: "๒๕ ส.ค. ๒๕๖๙",
    insuranceExpiryDate: "๑๕ พ.ย. ๒๕๖๙",
    usageNote: "ภารกิจรับ-ส่งพระมหาเถระ ผู้บริหารวิทยาลัย และพระวิทยากรผู้ทรงคุณวุฒิ",
    features: ["เบาะ VIP นวดไฟฟ้า", "เครื่องฟอกอากาศ Nanoe", "ที่วางบริขารสงฆ์", "Wi-Fi ประจำรถ"]
  },
  {
    id: "v-02",
    orderNo: 2,
    code: "MVU-VAN-02",
    brand: "TOYOTA",
    model: "Commuter มาตรฐาน",
    plateNumber: "1 นข 2202 กรุงเทพมหานคร",
    category: "รถตู้โดยสาร",
    capacity: 14,
    capacityDesc: "๑๔ ที่นั่ง",
    fuelType: "ดีเซล",
    status: "จองแล้ว",
    color: "สีบรอนซ์เงิน",
    assignedDriver: "นายประสิทธิ์ บริการ",
    driverPhone: "089-123-4567",
    currentMileage: 76400,
    lastMaintenanceDate: "๑๐ ก.ค. ๒๕๖๙",
    insuranceExpiryDate: "๓๑ ธ.ค. ๒๕๖๙",
    usageNote: "ภารกิจกิจการสงฆ์ทั่วไป นำนิสิตบัณฑิตศึกษาศึกษาดูงาน และบริการวิชาการ",
    features: ["ไมโครโฟนบรรยาย", "แอร์ราวสองตอน", "ช่องเสียบ USB ชาร์จไฟ"]
  },
  {
    id: "v-03",
    orderNo: 3,
    code: "MVU-PU-01",
    brand: "ISUZU",
    model: "D-MAX Hi-Lander 4 ประตู",
    plateNumber: "กษ 3142 นครปฐม",
    category: "รถกระบะบรรทุก",
    capacity: 5,
    capacityDesc: "๕ ที่นั่ง + กระบะหลัง",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีขาว",
    assignedDriver: "นายบุญมี ขับขี่",
    driverPhone: "086-789-0123",
    currentMileage: 53100,
    lastMaintenanceDate: "๑๕ ส.ค. ๒๕๖๙",
    insuranceExpiryDate: "๑๕ ม.ค. ๒๕๗๐",
    usageNote: "ตรวจเยี่ยมโครงการก่อสร้าง ติดต่อประสานงานราชการจังหวัดนครปฐม",
    features: ["ขับเคลื่อน 2 ล้อยกสูง", "กล้องถอยหลัง", "หลังคาแครี่บอย"]
  },
  {
    id: "v-04",
    orderNo: 4,
    code: "MVU-BUS-01",
    brand: "HINO",
    model: "Air-Bus 6 ล้อ ปรับอากาศ",
    plateNumber: "40-1106 นครปฐม",
    category: "รถบัสปรับอากาศ",
    capacity: 45,
    capacityDesc: "๔๕ ที่นั่ง",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีเหลืองอำพัน-ขาว (ตรา มจร)",
    assignedDriver: "นายวิชัย ชำนาญทาง",
    driverPhone: "084-567-8901",
    currentMileage: 112000,
    lastMaintenanceDate: "๑ ส.ค. ๒๕๖๙",
    insuranceExpiryDate: "๒๘ ก.พ. ๒๕๗๐",
    usageNote: "นำสามเณรและพระภิกษุเข้าสอบบาลีสนามหลวง และกิจกรรมทัศนศึกษาทางธรรม",
    features: ["เครื่องเสียงบรรยายธรรม", "ระบบ GPS ควบคุมความเร็ว", "ถังดับเพลิงและประตูฉุกเฉินมาตรฐาน"]
  },
  {
    id: "v-05",
    orderNo: 5,
    code: "MVU-PU-02",
    brand: "ISUZU",
    model: "D-MAX SpaceCab ตู้ทึบ",
    plateNumber: "2 ฒญ 9173 กรุงเทพมหานคร",
    category: "รถกระบะบรรทุก",
    capacity: 3,
    capacityDesc: "๓ ที่นั่ง + ตู้บรรทุกภัตตาหาร",
    fuelType: "ดีเซล",
    status: "กำลังปฏิบัติงาน",
    color: "สีบรอนซ์เงิน",
    assignedDriver: "นายอำนวย ส่งเสริม",
    driverPhone: "082-345-6789",
    currentMileage: 89300,
    lastMaintenanceDate: "๑๒ ก.ค. ๒๕๖๙",
    insuranceExpiryDate: "๑๘ ต.ค. ๒๕๖๙",
    usageNote: "รับส่งภัตตาหารบิณฑบาต สังฆทาน โยมอุปถัมภ์ และวัตถุดิบโรงครัวส่วนกลาง",
    features: ["ตู้สแตนเลสเก็บความเย็น", "ชั้นวางปิ่นโตภัตตาหารมาตรฐาน", "ระบบฆ่าเชื้อ UV"]
  },
  {
    id: "v-06",
    orderNo: 6,
    code: "MVU-SUV-01",
    brand: "TOYOTA",
    model: "Fortuner 2.8 4WD",
    plateNumber: "4 ขน 5262 กรุงเทพมหานคร",
    category: "รถยนต์ตรวจการ",
    capacity: 7,
    capacityDesc: "๗ ที่นั่ง",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีดำ",
    assignedDriver: "นายสุรศักดิ์ ว่องไว",
    driverPhone: "083-987-6543",
    currentMileage: 64200,
    lastMaintenanceDate: "๒๐ มิ.ย. ๒๕๖๙",
    insuranceExpiryDate: "๓๐ พ.ย. ๒๕๖๙",
    usageNote: "ตรวจการงานวิจัย งานโครงการศูนย์วิจัยพุทธศาสตร์ และภารกิจเร่งด่วน",
    features: ["ขับเคลื่อน 4 ล้อสมบูรณ์แบบ", "ระบบนำทาง Navigation", "วิทยุสื่อสารฉุกเฉิน"]
  },
  {
    id: "v-07",
    orderNo: 7,
    code: "MVU-PU-03",
    brand: "ISUZU",
    model: "D-MAX Spark กระบะตอนเดียว",
    plateNumber: "ปย 1456 กรุงเทพมหานคร",
    category: "รถกระบะบรรทุก",
    capacity: 2,
    capacityDesc: "๒ ที่นั่ง + พื้นที่บรรทุกสัมภาระ",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีขาว",
    assignedDriver: "นายสมคิด สารพัดช่าง",
    driverPhone: "087-654-3210",
    currentMileage: 94800,
    lastMaintenanceDate: "๕ ก.ค. ๒๕๖๙",
    insuranceExpiryDate: "๓๑ ธ.ค. ๒๕๖๙",
    usageNote: "ขนส่งพัสดุอุปกรณ์ช่าง โต๊ะเก้าอี้ห้องสอบบาลี และสังฆทานงานพิธี",
    features: ["คอกเหล็กเสริมข้างกระบะ", "ผ้าใบคลุมกันฝน", "รอกผูกสัมภาระแน่นหนา"]
  },
  {
    id: "v-08",
    orderNo: 8,
    code: "MVU-WC-01",
    brand: "รถบัสห้องน้ำ",
    model: "Restroom Coach ปรับอากาศ",
    plateNumber: "รถบัสห้องน้ำ (มจร วส.)",
    category: "รถสุขาเคลื่อนที่",
    capacity: 6,
    capacityDesc: "๖ ห้องสุขา (แยกชาย-หญิง/พระภิกษุ)",
    fuelType: "ดีเซล",
    status: "พร้อมใช้งาน",
    color: "สีขาว-ทอง (สัญลักษณ์พุทธศิลป์)",
    assignedDriver: "นายประยงค์ บริบาล",
    driverPhone: "085-432-1098",
    currentMileage: 32400,
    lastMaintenanceDate: "๑๘ ก.ค. ๒๕๖๙",
    insuranceExpiryDate: "๒๘ ก.พ. ๒๕๗๐",
    usageNote: "สนับสนุนงานพิธีสงฆ์ใหญ่ งานพระราชทานกฐิน งานปฏิบัติธรรม และจาริกธุดงค์",
    features: ["ระบบบำบัดน้ำเสียปลอดกลิ่น", "ถังน้ำดีสำรอง ๒,๐๐๐ ลิตร", "เครื่องปรับอากาศทุกห้อง", "ห้องเฉพาะสำหรับพระเถระ"]
  },
  {
    id: "v-09",
    orderNo: 9,
    code: "MVU-TRAM-01",
    brand: "รถนำเที่ยว",
    model: "Electric Tram Shuttle 100% EV",
    plateNumber: "รถนำเที่ยว (วส. ๐๑)",
    category: "รถรางนำเที่ยว",
    capacity: 18,
    capacityDesc: "๑๘ ที่นั่ง",
    fuelType: "ไฟฟ้า (EV)",
    status: "พร้อมใช้งาน",
    color: "สีทอง Royal Gold และขาวมุก",
    assignedDriver: "เจ้าหน้าที่เวรภูมิทัศน์",
    driverPhone: "089-876-5432",
    currentMileage: 14500,
    lastMaintenanceDate: "๒ ส.ค. ๒๕๖๙",
    insuranceExpiryDate: "๓๑ มี.ค. ๒๕๗๐",
    usageNote: "นำญาติโยม สาธุชน และแขกผู้มีเกียรติ เยี่ยมชมอาคารเรียน หอพระไตรปิฎก และสวนพุทธธรรม",
    features: ["ขับเคลื่อนไฟฟ้า 100% ไร้มลพิษ", "ระบบเสียงบรรยายอัตโนมัติ", "หลังคากันแดดฝน", "ทางลาดสำหรับผู้สูงอายุ"]
  },
  {
    id: "v-10",
    orderNo: 10,
    code: "MVU-CART-01",
    brand: "รถซาเล้ง",
    model: "Motorized Utility Sidecar",
    plateNumber: "รถซาเล้ง (งานสถานที่)",
    category: "รถบริการภายใน",
    capacity: 2,
    capacityDesc: "๒ ที่นั่ง + พ่วงข้างบรรทุก",
    fuelType: "เบนซิน",
    status: "กำลังปฏิบัติงาน",
    color: "สีเขียวเข้ม",
    assignedDriver: "เจ้าหน้าที่งานอาคารสถานที่",
    driverPhone: "081-234-5678",
    currentMileage: 18900,
    lastMaintenanceDate: "๒๘ ส.ค. ๒๕๖๙",
    insuranceExpiryDate: "๓๑ พ.ค. ๒๕๗๐",
    usageNote: "ขนส่งภัตตาหารระหว่างหอฉัน-กุฏิสงฆ์ เก็บขยะดูแลความสะอาด และขนดินปุ๋ยงานภูมิทัศน์",
    features: ["พ่วงข้างรับน้ำหนัก ๓๐๐ กก.", "แผ่นเหล็กรองรับกระบะแข็งแรง", "ไฟส่องสว่างหัวรถ"]
  }
];

export const initialBookings: VehicleBooking[] = [
  {
    id: "bk-01",
    bookingCode: "VB-2569-088",
    vehicleId: "v-05",
    vehiclePlate: "2 ฒญ 9173 กรุงเทพมหานคร",
    vehicleModel: "ISUZU D-MAX ตู้ทึบ",
    purpose: "รับบิณฑบาต/ภัตตาหารเพล",
    destination: "บ้านโยมอุปถัมภ์ อ.เมือง จ.นครปฐม",
    departureDate: "2026-09-09",
    departureTime: "09:00",
    returnDate: "2026-09-09",
    returnTime: "10:45",
    monksCount: 2,
    samanerasCount: 0,
    laypeopleCount: 1,
    requesterName: "พระมหาโกมล กมโล",
    requesterDept: "กองทุนภัตตาหารและโยมอุปถัมภ์",
    requesterPhone: "089-988-7766",
    driverRequired: true,
    assignedDriver: "นายอำนวย ส่งเสริม",
    status: "กำลังเดินทาง",
    approvedBy: "พระธรรมวชิราจารย์, รศ.ดร.",
    approvalDate: "2026-09-08 14:30",
    notes: "รับภัตตาหารเพลและเครื่องไทยธรรม กลับถึงวิทยาลัยก่อน ๑๑:๐๐ น. เพื่อทันฉันเพล",
    createdAt: "2026-09-08 10:15"
  },
  {
    id: "bk-02",
    bookingCode: "VB-2569-089",
    vehicleId: "v-02",
    vehiclePlate: "1 นข 2202 กรุงเทพมหานคร",
    vehicleModel: "TOYOTA Commuter มาตรฐาน",
    purpose: "ศึกษาดูงาน/วิจัยพระไตรปิฎก",
    destination: "หอสมุดแห่งชาติ ท่าวาสุกรี กรุงเทพมหานคร",
    departureDate: "2026-09-10",
    departureTime: "07:30",
    returnDate: "2026-09-10",
    returnTime: "16:30",
    monksCount: 4,
    samanerasCount: 0,
    laypeopleCount: 4,
    requesterName: "รศ.ดร.เวทย์ บรรณกรกุล",
    requesterDept: "หลักสูตรระดับบัณฑิตศึกษา (มคอ.๒)",
    requesterPhone: "081-334-5566",
    driverRequired: true,
    assignedDriver: "นายประสิทธิ์ บริการ",
    status: "อนุมัติแล้ว",
    approvedBy: "พระธรรมวชิราจารย์, รศ.ดร.",
    approvalDate: "2026-09-08 16:00",
    notes: "นำนิสิตปริญญาโท-เอก สาขาพระไตรปิฎกเถรวาท ตรวจสอบคัมภีร์ใบลานอักษรขอม",
    createdAt: "2026-09-07 11:20"
  },
  {
    id: "bk-03",
    bookingCode: "VB-2569-090",
    vehicleId: "v-04",
    vehiclePlate: "40-1106 นครปฐม",
    vehicleModel: "HINO Air-Bus 6 ล้อ",
    purpose: "นำสามเณรเข้าสอบบาลีสนามหลวง",
    destination: "สนามสอบวัดไร่ขิง พระอารามหลวง อ.สามพราน จ.นครปฐม",
    departureDate: "2026-09-12",
    departureTime: "11:30",
    returnDate: "2026-09-12",
    returnTime: "17:30",
    monksCount: 3,
    samanerasCount: 38,
    laypeopleCount: 2,
    requesterName: "พระมหาวีรวิชญ์ ตนฺติปาโล, ป.ธ.๙",
    requesterDept: "สำนักวิชาการ (ฝ่ายบาลีสนามหลวง)",
    requesterPhone: "085-777-8899",
    driverRequired: true,
    assignedDriver: "นายวิชัย ชำนาญทาง",
    status: "อนุมัติแล้ว",
    approvedBy: "พระศรีวัชรสารบัณฑิต, ผศ.ดร.",
    approvalDate: "2026-09-08 17:00",
    notes: "นำสามเณร ป.ธ. ๑-๒ และ ป.ธ. ๓ เข้าสนามสอบข้อเขียนบาลีสนามหลวง ภาคบ่าย",
    createdAt: "2026-09-08 09:00"
  },
  {
    id: "bk-04",
    bookingCode: "VB-2569-091",
    vehicleId: "v-01",
    vehiclePlate: "ฮม 7740 กรุงเทพมหานคร",
    vehicleModel: "TOYOTA Commuter VIP",
    purpose: "รับ-ส่งพระเถระ/ผู้บริหาร",
    destination: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย อ.วังน้อย จ.พระนครศรีอยุธยา",
    departureDate: "2026-09-11",
    departureTime: "06:30",
    returnDate: "2026-09-11",
    returnTime: "18:00",
    monksCount: 3,
    samanerasCount: 0,
    laypeopleCount: 1,
    requesterName: "ดร.สมบูรณ์ จารุณะ",
    requesterDept: "สำนักงานผู้อำนวยการวิทยาลัย",
    requesterPhone: "099-445-4256",
    driverRequired: true,
    assignedDriver: "นายสมชาย ยานยนต์",
    status: "รออนุมัติ",
    notes: "เดินทางร่วมประชุมสภามหาวิทยาลัย มจร และติดตามงบประมาณรายจ่ายปี ๒๕๖๙",
    createdAt: "2026-09-09 08:30"
  },
  {
    id: "bk-05",
    bookingCode: "VB-2569-092",
    vehicleId: "v-08",
    vehiclePlate: "รถบัสห้องน้ำ (มจร วส.)",
    vehicleModel: "Restroom Coach ปรับอากาศ",
    purpose: "สนับสนุนงานสุขาภิบาล/พิธีสงฆ์",
    destination: "ศูนย์ปฏิบัติธรรมธรรมโมลี อ.ปากช่อง จ.นครราชสีมา",
    departureDate: "2026-09-15",
    departureTime: "05:00",
    returnDate: "2026-09-18",
    returnTime: "20:00",
    monksCount: 0,
    samanerasCount: 0,
    laypeopleCount: 3,
    requesterName: "นายเสน่ห์ แซ่วรัมย์",
    requesterDept: "ฝ่ายอาคารสถานที่และยานพาหนะ",
    requesterPhone: "081-555-1234",
    driverRequired: true,
    assignedDriver: "นายประยงค์ บริบาล",
    status: "รออนุมัติ",
    notes: "สนับสนุนสุขาเคลื่อนที่ในโครงการอบรมพระอุปัชฌาย์ทั่วประเทศ ๔ วัน",
    createdAt: "2026-09-09 11:00"
  }
];

export function getVehicleFleetStats(vehicles: Vehicle[], bookings: VehicleBooking[]) {
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === "พร้อมใช้งาน").length;
  const onDuty = vehicles.filter((v) => v.status === "กำลังปฏิบัติงาน").length;
  const reserved = vehicles.filter((v) => v.status === "จองแล้ว").length;
  const maintenance = vehicles.filter((v) => v.status === "ซ่อมบำรุง").length;
  const pendingApprovals = bookings.filter((b) => b.status === "รออนุมัติ").length;
  const approvedBookings = bookings.filter((b) => b.status === "อนุมัติแล้ว").length;

  return {
    total,
    available,
    onDuty,
    reserved,
    maintenance,
    pendingApprovals,
    approvedBookings
  };
}
