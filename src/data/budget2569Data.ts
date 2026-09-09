export interface BudgetItem {
  id: string;
  code?: string;
  name: string;
  category: string; // e.g. "งบประมาณบุคลากร", "ค่าใช้สอย", "ค่าครุภัณฑ์", "ค่าที่ดินและสิ่งก่อสร้าง", "โครงการสนับสนุนการผลิตบัณฑิต", "วิจัยและนวัตกรรม"
  program: "แผนงานบุคลากรภาครัฐ" | "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต" | "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม";
  subProgram?: string;
  govBudget: number; // งบประมาณแผ่นดิน
  univRevenue: number; // งบประมาณรายได้มหาวิทยาลัย
  totalBudget: number; // รวมทั้งสิ้น
  level: number; // 1: แผนงานหลัก, 2: ผลผลิต/หมวดใหญ่, 3: หมวดย่อย, 4: รายการย่อย
  isHeader?: boolean;
}

export interface BudgetSummary {
  fiscalYear: number;
  edition: string;
  collegeName: string;
  universityName: string;
  recorderName: string;
  recordedDate: string;
  printedDate: string;
  approvers: {
    role: string;
    name: string;
  }[];
  totalGovBudget: number;
  totalUnivRevenue: number;
  grandTotal: number;
}

export const budget2569Summary: BudgetSummary = {
  fiscalYear: 2569,
  edition: "ครั้งที่ ๑ (ปรับปรุง ไตรมาส ๓)",
  collegeName: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  universityName: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  recorderName: "นายเสน่ห์ แซ่วรัมย์",
  recordedDate: "30/03/2569 10:14:22",
  printedDate: "30/03/2569 10:14:29",
  approvers: [
    {
      role: "รักษาการผู้อำนวยการกองแผนงาน",
      name: "พระศรีวัชรสารบัณฑิต, ผศ.ดร."
    },
    {
      role: "รองอธิการบดีฝ่ายวางแผนและพัฒนา",
      name: "พระเทพวัชรสารบัณฑิต, รศ.ดร."
    }
  ],
  totalGovBudget: 34709140,
  totalUnivRevenue: 46684760,
  grandTotal: 81393900
};

export const budget2569Items: BudgetItem[] = [
  // --- แผนงานที่ 1: แผนงานบุคลากรภาครัฐ ---
  {
    id: "p1",
    name: "1. แผนงานบุคลากรภาครัฐ",
    category: "แผนงานหลัก",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 2921040,
    univRevenue: 5524760,
    totalBudget: 8445800,
    level: 1,
    isHeader: true
  },
  {
    id: "p1-prod1",
    name: "ผลผลิตที่ 1 : รายการค่าใช้จ่ายบุคลากรภาครัฐ",
    category: "ผลผลิต",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 2921040,
    univRevenue: 5524760,
    totalBudget: 8445800,
    level: 2,
    isHeader: true
  },
  {
    id: "p1-exp1",
    name: "1 ค่าใช้จ่ายบุคลากร",
    category: "ค่าใช้จ่ายบุคลากร",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 2412240,
    univRevenue: 5524760,
    totalBudget: 7937000,
    level: 2,
    isHeader: true
  },
  {
    id: "p1-1.1",
    name: "1.1 เงินเดือนและค่าจ้างประจำ",
    category: "เงินเดือนและค่าจ้างประจำ",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 2172240,
    univRevenue: 2254560,
    totalBudget: 4426800,
    level: 3,
    isHeader: true
  },
  {
    id: "p1-1.1-1",
    name: "1) บุคลากรสายวิชาการ",
    category: "เงินเดือนและค่าจ้างประจำ",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 1351440,
    univRevenue: 2254560,
    totalBudget: 3606000,
    level: 4
  },
  {
    id: "p1-1.1-2",
    name: "2) บุคลากรสายปฏิบัติการ",
    category: "เงินเดือนและค่าจ้างประจำ",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 820800,
    univRevenue: 0,
    totalBudget: 820800,
    level: 4
  },
  {
    id: "p1-1.2",
    name: "1.2 เงินเดือนและค่าจ้างชั่วคราว",
    category: "เงินเดือนและค่าจ้างชั่วคราว",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 0,
    univRevenue: 3198200,
    totalBudget: 3198200,
    level: 3,
    isHeader: true
  },
  {
    id: "p1-1.2-1",
    name: "1) บุคลากรสายวิชาการ (ชั่วคราว)",
    category: "เงินเดือนและค่าจ้างชั่วคราว",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 0,
    univRevenue: 810000,
    totalBudget: 810000,
    level: 4
  },
  {
    id: "p1-1.2-2",
    name: "2) บุคลากรสายปฏิบัติการ (ลูกจ้างชั่วคราว)",
    category: "เงินเดือนและค่าจ้างชั่วคราว",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 0,
    univRevenue: 2388200,
    totalBudget: 2388200,
    level: 4
  },
  {
    id: "p1-1.3",
    name: "1.3 เงินประจำตำแหน่งทางวิชาการ",
    category: "เงินประจำตำแหน่ง",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 240000,
    univRevenue: 72000,
    totalBudget: 312000,
    level: 3,
    isHeader: true
  },
  {
    id: "p1-1.3-1",
    name: "1) รองศาสตราจารย์",
    category: "เงินประจำตำแหน่ง",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 240000,
    univRevenue: 0,
    totalBudget: 240000,
    level: 4
  },
  {
    id: "p1-1.3-2",
    name: "2) ผู้ช่วยศาสตราจารย์",
    category: "เงินประจำตำแหน่ง",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 0,
    univRevenue: 72000,
    totalBudget: 72000,
    level: 4
  },
  {
    id: "p1-exp2",
    name: "2 ค่าใช้จ่ายดำเนินงาน",
    category: "ค่าใช้จ่ายดำเนินงาน",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 508800,
    univRevenue: 0,
    totalBudget: 508800,
    level: 2,
    isHeader: true
  },
  {
    id: "p1-2.1",
    name: "2.1 ค่าตอบแทนผู้บริหารที่มีวาระ",
    category: "ค่าตอบแทนผู้บริหาร",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 508800,
    univRevenue: 0,
    totalBudget: 508800,
    level: 3,
    isHeader: true
  },
  {
    id: "p1-2.1-1",
    name: "1) ผู้อำนวยการวิทยาลัย",
    category: "ค่าตอบแทนผู้บริหาร",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 240000,
    univRevenue: 0,
    totalBudget: 240000,
    level: 4
  },
  {
    id: "p1-2.1-2",
    name: "2) รองผู้อำนวยการวิทยาลัย",
    category: "ค่าตอบแทนผู้บริหาร",
    program: "แผนงานบุคลากรภาครัฐ",
    govBudget: 268800,
    univRevenue: 0,
    totalBudget: 268800,
    level: 4
  },

  // --- แผนงานที่ 2: แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต ---
  {
    id: "p2",
    name: "2. แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    category: "แผนงานหลัก",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 31788100,
    univRevenue: 39960000,
    totalBudget: 71748100,
    level: 1,
    isHeader: true
  },
  {
    id: "p2-prod1",
    name: "ผลผลิตที่ 1 : ผู้สำเร็จการศึกษาด้านสังคมศาสตร์",
    category: "ผลผลิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 31788100,
    univRevenue: 39960000,
    totalBudget: 71748100,
    level: 2,
    isHeader: true
  },
  {
    id: "p2-op-cost",
    name: "1. ค่าใช้จ่ายดำเนินงาน",
    category: "ค่าใช้จ่ายดำเนินงาน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 21810000,
    totalBudget: 21810000,
    level: 2,
    isHeader: true
  },
  {
    id: "p2-1.1",
    name: "1.1 ค่าตอบแทน",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1660000,
    totalBudget: 1660000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-1.1-1",
    name: "1) ค่าตอบแทนอาจารย์พิเศษ",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.1-3",
    name: "3) ค่าตอบแทนคณะกรรมการสอบวิทยานิพนธ์/หัวข้อโครงร่างวิทยานิพนธ์ สารนิพนธ์ และประชาพิจารณ์ (Public Hearing)",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.1-4",
    name: "4) ค่าตอบแทนคณะกรรมการตรวจรับและควบคุมงานก่อสร้าง",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.1-5",
    name: "5) ค่าตอบแทนคณะกรรมการสอบหัวข้อและโครงร่างวิทยานิพนธ์",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.1-6",
    name: "6) ค่าตอบแทนเจ้าหน้าที่ปฏิบัติงานล่วงเวลา",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-1.1-7",
    name: "7) ค่าตอบแทนตรวจบทคัดย่อภาษาอังกฤษวิทยานิพนธ์และสารนิพนธ์",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 10000,
    totalBudget: 10000,
    level: 4
  },
  {
    id: "p2-1.1-8",
    name: "8) ค่าตอบแทนที่ปรึกษา",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 150000,
    totalBudget: 150000,
    level: 4
  },
  {
    id: "p2-1.1-9",
    name: "9) ค่าตอบแทนคณะกรรมการสอบวัดคุณสมบัติ",
    category: "ค่าตอบแทน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2",
    name: "1.2 ค่าใช้สอย",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 9750000,
    totalBudget: 9750000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-1.2-1",
    name: "1) ค่าเบี้ยเลี้ยง ค่าเช่าที่พักและค่าพาหนะ",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2-2",
    name: "2) ค่าธรรมเนียมและภาษี",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-1.2-3",
    name: "3) ค่าซ่อมแซมครุภัณฑ์",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.2-4",
    name: "4) เงินค่าใช้จ่ายสวัสดิการบุคลากร (ค่ารักษาพยาบาล)",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-1.2-5",
    name: "5) ค่าประชุมคณะกรรมการประจำวิทยาลัย",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2-6",
    name: "6) ค่าภัตตาหารนักเรียน",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.2-7",
    name: "7) งานซ่อมแซมและบำรุงรักษาอาคารสถานที่",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.2-8",
    name: "8) ค่าใช้สอยอื่น",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1500000,
    totalBudget: 1500000,
    level: 4
  },
  {
    id: "p2-1.2-9",
    name: "9) ค่าจ้างเหมาบริการ",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1300000,
    totalBudget: 1300000,
    level: 4
  },
  {
    id: "p2-1.2-10",
    name: "10) ค่าใช้สอยงานประกันคุณภาพการศึกษา",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2-11",
    name: "11) งานพิมพ์หนังสือและเอกสาร",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-1.2-12",
    name: "12) ค่าเช่าเครื่องถ่ายเอกสาร",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.2-13",
    name: "13) งานกำจัดขยะ",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 50000,
    totalBudget: 50000,
    level: 4
  },
  {
    id: "p2-1.2-14",
    name: "14) งานป้องกันปลวก มด แมลง",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2-15",
    name: "15) งานดักสิ่งปฏิกูล",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 50000,
    totalBudget: 50000,
    level: 4
  },
  {
    id: "p2-1.2-16",
    name: "16) งานซ่อมแซมและบำรุงครุภัณฑ์ยานพาหนะ",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.2-17",
    name: "17) ค่าใช้จ่ายเช่าเหมารถรับส่งบุคลากรและนิสิต",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.2-18",
    name: "18) ค่าประชุมบุคลากร",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 50000,
    totalBudget: 50000,
    level: 4
  },
  {
    id: "p2-1.2-19",
    name: "19) ค่าจัดประชุมเฉพาะกิจ/ประสานงานทั่วไป",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-1.2-20",
    name: "20) งานซ่อมแซม ปรับปรุงและบำรุงสาธารณูปโภค",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-1.2-21",
    name: "21) ประชุมอนุกรรมการบริหารงานบุคคล/อนุทรัพย์สิน",
    category: "ค่าใช้สอย",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-1.3",
    name: "1.3 ค่าสาธารณูปโภค",
    category: "ค่าสาธารณูปโภค",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 2500000,
    totalBudget: 2500000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-1.3-1",
    name: "1) ค่าไฟฟ้า",
    category: "ค่าสาธารณูปโภค",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 2400000,
    totalBudget: 2400000,
    level: 4
  },
  {
    id: "p2-1.3-2",
    name: "2) ค่าประปา",
    category: "ค่าสาธารณูปโภค",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 50000,
    totalBudget: 50000,
    level: 4
  },
  {
    id: "p2-1.3-3",
    name: "3) ค่าโทรศัพท์",
    category: "ค่าสาธารณูปโภค",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 50000,
    totalBudget: 50000,
    level: 4
  },
  {
    id: "p2-1.4",
    name: "1.4 ค่าวัสดุ",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 7900000,
    totalBudget: 7900000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-1.4-1",
    name: "1) วัสดุสำนักงาน",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.4-2",
    name: "2) วัสดุก่อสร้าง",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 2500000,
    totalBudget: 2500000,
    level: 4
  },
  {
    id: "p2-1.4-3",
    name: "3) วัสดุงานบ้านงานครัว",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 2000000,
    totalBudget: 2000000,
    level: 4
  },
  {
    id: "p2-1.4-4",
    name: "4) วัสดุการศึกษา",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-1.4-5",
    name: "5) ค่าน้ำมันเชื้อเพลิง",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 600000,
    totalBudget: 600000,
    level: 4
  },
  {
    id: "p2-1.4-6",
    name: "6) ค่าวัสดุคอมพิวเตอร์",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-1.4-7",
    name: "7) ค่าวัสดุไฟฟ้าและวิทยุ",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-1.4-8",
    name: "8) ค่าวัสดุการเกษตร",
    category: "ค่าวัสดุ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },

  // 2. งบลงทุน
  {
    id: "p2-inv",
    name: "2. งบลงทุน",
    category: "งบลงทุน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 31788100,
    univRevenue: 8850000,
    totalBudget: 40638100,
    level: 2,
    isHeader: true
  },
  {
    id: "p2-2.1",
    name: "2.1 ค่าครุภัณฑ์",
    category: "ค่าครุภัณฑ์",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 8925400,
    univRevenue: 1350000,
    totalBudget: 10275400,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-2.1-1",
    name: "1) เครื่องปรับอากาศ แบบแยกส่วน ชนิดตั้งพื้นหรือชนิดแขวน (มีระบบฟอกอากาศ) ขนาด 13000 บีทียู",
    category: "ค่าครุภัณฑ์",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 1363000,
    univRevenue: 0,
    totalBudget: 1363000,
    level: 4
  },
  {
    id: "p2-2.1-2",
    name: "2) ระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์บนหลังคา (Solar Rooftop) อาคารหอฉัน",
    category: "ค่าครุภัณฑ์ (Solar Rooftop)",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 2520800,
    univRevenue: 0,
    totalBudget: 2520800,
    level: 4
  },
  {
    id: "p2-2.1-3",
    name: "3) ระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์บนหลังคา (Solar Rooftop) อาคารสำนักงาน",
    category: "ค่าครุภัณฑ์ (Solar Rooftop)",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 2520800,
    univRevenue: 0,
    totalBudget: 2520800,
    level: 4
  },
  {
    id: "p2-2.1-4",
    name: "4) ระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์บนหลังคา (Solar Rooftop) อาคารอเนกประสงค์",
    category: "ค่าครุภัณฑ์ (Solar Rooftop)",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 2520800,
    univRevenue: 0,
    totalBudget: 2520800,
    level: 4
  },
  {
    id: "p2-2.1-5",
    name: "5) ครุภัณฑ์การศึกษา",
    category: "ค่าครุภัณฑ์",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-2.1-6",
    name: "6) กล้องวงจรปิด",
    category: "ค่าครุภัณฑ์",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 30000,
    level: 4
  },
  {
    id: "p2-2.1-7",
    name: "7) ครุภัณฑ์สำนักงาน",
    category: "ค่าครุภัณฑ์",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 820000,
    totalBudget: 820000,
    level: 4
  },
  {
    id: "p2-2.2",
    name: "2.2 ค่าที่ดินและสิ่งก่อสร้าง",
    category: "ค่าที่ดินและสิ่งก่อสร้าง",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 22862700,
    univRevenue: 7500000,
    totalBudget: 30362700,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-2.2-2",
    name: "2) ค่าก่อสร้างอาคารหอประชุม",
    category: "ค่าที่ดินและสิ่งก่อสร้าง",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 22862700,
    univRevenue: 2000000,
    totalBudget: 24862700,
    level: 4
  },
  {
    id: "p2-2.2-3",
    name: "3) ปรับปรุงภูมิทัศน์",
    category: "ค่าที่ดินและสิ่งก่อสร้าง",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 5500000,
    totalBudget: 5500000,
    level: 4
  },

  // 3. เงินอุดหนุนค่าใช้จ่ายสนับสนุนการผลิตบัณฑิต
  {
    id: "p2-grant",
    name: "3. เงินอุดหนุนค่าใช้จ่ายสนับสนุนการผลิตบัณฑิต",
    category: "เงินอุดหนุน",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 9300000,
    totalBudget: 9300000,
    level: 2,
    isHeader: true
  },
  {
    id: "p2-3.1",
    name: "3.1 ค่าใช้จ่ายสนับสนุนการผลิตบัณฑิต",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 6500000,
    totalBudget: 6500000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-3.1-1",
    name: "1) โครงการจัดกิจกรรมเสริมหลักสูตร",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 2500000,
    totalBudget: 2500000,
    level: 4
  },
  {
    id: "p2-3.1-2",
    name: "2) โครงการปฐมนิเทศนิสิตใหม่",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 150000,
    totalBudget: 150000,
    level: 4
  },
  {
    id: "p2-3.1-3",
    name: "3) โครงการจัดทำและพัฒนาหลักสูตร",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.1-4",
    name: "4) โครงการประชาสัมพันธ์หลักสูตรและแนะแนวการศึกษา",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-5",
    name: "5) โครงการพัฒนาศักยภาพบุคลากรสายวิชาการและสายปฏิบัติการวิชาชีพ",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.1-6",
    name: "6) โครงการปัจฉิมนิเทศนิสิตปีสุดท้าย กิจกรรมพิธีซ้อมรับปริญญา",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 150000,
    totalBudget: 150000,
    level: 4
  },
  {
    id: "p2-3.1-7",
    name: "7) โครงการฝึกอบรมก่อนสอบบาลี และนักธรรม",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-8",
    name: "8) โครงการฝึกมูลกัมมัฏฐานศากยบุตรสามเณรสีหะ",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-3.1-9",
    name: "9) โครงการอัจฉริยสมาร์ทบาลี",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-10",
    name: "10) โครงการเตรียมความพร้อมศากยบุตรสามเณรสีหะ",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-3.1-11",
    name: "11) โครงการสร้างหลักสูตรบาลีปริยัตศาสตร์ เจ้าคุณพระสินีนาถ พิลาสกัลยาณี",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-12",
    name: "12) โครงการพัฒนาเว็บไซต์วิทยาลัย",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.1-13",
    name: "13) โครงการพัฒนาพุทธปัญญาประดิษฐ์ (BAI)",
    category: "โครงการสนับสนุนการผลิตบัณฑิต (BAI)",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.1-14",
    name: "14) โครงการเผยแพร่องค์ความรู้และนวัตกรรมผ่านเทคโนโลยี",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 4
  },
  {
    id: "p2-3.1-15",
    name: "15) โครงการพัฒนาหลักสูตรส่งเสริมการเรียนสำหรับศากยบุตรสามเณรสีหะ ระดับการศึกษาขั้นพื้นฐาน",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-16",
    name: "16) โครงการจัดทำวารสาร",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.1-17",
    name: "17) โครงการจัดตั้งและพัฒนาศูนย์การเรียนรู้และวิจัยพระไตรปิฎกเถรวาท",
    category: "โครงการสนับสนุนการผลิตบัณฑิต",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },

  // 3.2 ค่าใช้จ่ายบริการวิชาการ
  {
    id: "p2-3.2",
    name: "3.2 ค่าใช้จ่ายบริการวิชาการ",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1700000,
    totalBudget: 1700000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-3.2-1",
    name: "1) โครงการปฏิบัติธรรมวิปัสสนากรรมฐานสำหรับประชาชน",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-3.2-2",
    name: "2) โครงการบรรพชาสามเณรภาคฤดูร้อน",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1000000,
    totalBudget: 1000000,
    level: 4
  },
  {
    id: "p2-3.2-3",
    name: "3) โครงการสวดทรงจำมหาทศชาติชาดก/อัฏฐกถาชาดก",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-3.2-4",
    name: "4) โครงการสัมมนาพระไตรปิฎก/สัมมนาพระธรรมวินัย",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.2-5",
    name: "5) โครงการปฏิบัติวิปัสสนากัมมัฏฐานเฉลิมพระเกียรติ ฯ",
    category: "บริการวิชาการ",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },

  // 3.3 ค่าใช้จ่ายทำนุบำรุงศิลปวัฒนธรรม
  {
    id: "p2-3.3",
    name: "3.3 ค่าใช้จ่ายทำนุบำรุงศิลปวัฒนธรรม",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 1100000,
    totalBudget: 1100000,
    level: 3,
    isHeader: true
  },
  {
    id: "p2-3.3-1",
    name: "1) โครงการประชาสัมพันธ์และเผยแพร่อัตลักษณ์ภาพลักษณ์ของมหาวิทยาลัย",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.3-2",
    name: "2) โครงการเนื่องในวันสำคัญแห่งชาติ/ทางพระพุทธศาสนา",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-3.3-3",
    name: "3) โครงการวันไหว้ครู/สามีจิกรรม",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 100000,
    totalBudget: 100000,
    level: 4
  },
  {
    id: "p2-3.3-4",
    name: "4) โครงการสืบสานการเทศน์มหาชาติทำนองหลวง",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },
  {
    id: "p2-3.3-5",
    name: "5) โครงการบรรพชาอุปสมบทเฉลิมพระเกียรติ ฯ",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 300000,
    totalBudget: 300000,
    level: 4
  },
  {
    id: "p2-3.3-6",
    name: "6) โครงการอบรมศีลธรรม จรรยา สัมมาปฏิบัติ สำหรับเยาวชน",
    category: "ทำนุบำรุงศิลปวัฒนธรรม",
    program: "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 4
  },

  // --- แผนงานที่ 3: แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม ---
  {
    id: "p3",
    name: "3. แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    category: "แผนงานหลัก",
    program: "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    govBudget: 0,
    univRevenue: 1200000,
    totalBudget: 1200000,
    level: 1,
    isHeader: true
  },
  {
    id: "p3-proj1",
    name: "โครงการที่ 1 : โครงการการวิจัยและนวัตกรรมเพื่อการพัฒนาสังคมและสิ่งแวดล้อม",
    category: "วิจัยและนวัตกรรม",
    program: "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    govBudget: 0,
    univRevenue: 1200000,
    totalBudget: 1200000,
    level: 2,
    isHeader: true
  },
  {
    id: "p3-1",
    name: "1) โครงการสังคายนานานาชาติพระไตรปิฎกฉบับมหาวชิราลงกรณ",
    category: "วิจัยและนวัตกรรม (พระไตรปิฎก)",
    program: "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    govBudget: 0,
    univRevenue: 200000,
    totalBudget: 200000,
    level: 3
  },
  {
    id: "p3-2",
    name: "2) โครงการ ปริวรรต/แปลคัมภีร์อรรถกถา ฎีกา สัททาวิเสส",
    category: "วิจัยและนวัตกรรม (คัมภีร์บาลี)",
    program: "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 3
  },
  {
    id: "p3-3",
    name: "3) โครงการวิจัยเพื่อการพัฒนาชุมชนและสังคม",
    category: "วิจัยและนวัตกรรม",
    program: "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม",
    govBudget: 0,
    univRevenue: 500000,
    totalBudget: 500000,
    level: 3
  }
];

export function getBudgetProgramStats() {
  const programs = [
    "แผนงานบุคลากรภาครัฐ",
    "แผนงานยุทธศาสตร์พัฒนาศักยภาพคนตลอดช่วงชีวิต",
    "แผนงานยุทธศาสตร์การวิจัยและนวัตกรรม"
  ] as const;

  return programs.map((prog) => {
    const header = budget2569Items.find((i) => i.level === 1 && i.program === prog);
    return {
      name: prog,
      govBudget: header?.govBudget || 0,
      univRevenue: header?.univRevenue || 0,
      totalBudget: header?.totalBudget || 0,
      percentage: (((header?.totalBudget || 0) / budget2569Summary.grandTotal) * 100).toFixed(2)
    };
  });
}
