export interface CourseItem {
  code: string;
  nameTh: string;
  nameEn?: string;
  credits: number;
  creditDesc: string; // e.g. "๓ (๓-๐-๖)"
  category: "วิชาเสริมพื้นฐาน" | "วิชาบังคับ" | "วิชาเอก/เฉพาะ" | "วิทยานิพนธ์" | "สารนิพนธ์";
  description?: string;
}

export interface CurriculumPlan {
  planCode: string; // e.g. "แผน ๑.๑", "แผน ๒.๑", "แผน ๑.๒", "แผน ๒"
  planName: string;
  totalCredits: number;
  courseworkCredits: number;
  thesisCredits: number;
  description: string;
}

export interface GraduateCurriculum {
  id: string; // "phd-tipitaka", "ma-tipitaka", "ma-abhidhamma"
  degreeLevel: "ปริญญาเอก" | "ปริญญาโท";
  programCode: string;
  nameTh: string;
  nameEn: string;
  degreeNameTh: string;
  degreeNameEn: string;
  degreeAbbrTh: string;
  degreeAbbrEn: string;
  effectiveYear: string; // e.g. "หลักสูตรใหม่ พ.ศ. ๒๕๖๗"
  approvalDate: string; // e.g. "๒๔ เมษายน ๒๕๖๗"
  councilApprovalSession: string;
  totalCreditsDesc: string;
  philosophy: string;
  objectives: string[];
  plos: {
    code: string;
    description: string;
  }[];
  careers: string[];
  plans: CurriculumPlan[];
  responsibleLecturers: {
    name: string;
    academicTitle: string;
    degrees: string[];
    position?: string;
  }[];
  courses: CourseItem[];
  pdfDownloadUrl: string;
  pdfFileName: string;
  totalPages: number;
}

export const graduateCurricula: GraduateCurriculum[] = [
  // =========================================================================
  // 1. Ph.D. in Theravada Tipitaka Studies
  // =========================================================================
  {
    id: "phd-tipitaka",
    degreeLevel: "ปริญญาเอก",
    programCode: "พธ.ด. พระไตรปิฎกเถรวาท",
    nameTh: "หลักสูตรพุทธศาสตรดุษฎีบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท",
    nameEn: "Doctor of Buddhism Program in Theravada Tipitaka",
    degreeNameTh: "พุทธศาสตรดุษฎีบัณฑิต (พระไตรปิฎกเถรวาท)",
    degreeNameEn: "Doctor of Buddhism (Theravada Tipitaka)",
    degreeAbbrTh: "พธ.ด. (พระไตรปิฎกเถรวาท)",
    degreeAbbrEn: "D.B. (Theravada Tipitaka)",
    effectiveYear: "หลักสูตรใหม่ พ.ศ. ๒๕๖๗",
    approvalDate: "๒๔ เมษายน พ.ศ. ๒๕๖๗",
    councilApprovalSession: "สภามหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ครั้งที่ ๔/๒๕๖๗",
    totalCreditsDesc: "๔๘ หน่วยกิต (ตลอดหลักสูตร)",
    philosophy: "รอบรู้พระไตรปิฎกเถรวาท เข้าใจหลักไตรสิกขาอย่างลึกซึ้ง สืบสานพระปริยัติศาสนา รักษาพระไตรปิฎกเถรวาท ต่อยอดวงศ์ปริยัติ รักษาสืบทอดพระสัทธรรม น้อมนำมาแก้ปัญหาแบบองค์รวมเพื่อสร้างสังคมอุดมปัญญา",
    objectives: [
      "มีความรู้เชี่ยวชาญแตกฉานในพระไตรปิฎกเถรวาทและหลักไตรสิกขาอย่างลึกซึ้ง",
      "สร้างองค์ความรู้ใหม่หรือนวัตกรรมจากหลักธรรมในพระไตรปิฎกเถรวาทเพื่อสร้างสังคมอุดมปัญญาอย่างมีความรับผิดชอบต่อสังคม",
      "มีศีลธรรม จรรยา สัมมาปฏิบัติ อุทิศตนเพื่อพระพุทธศาสนาในการรักษาสืบทอดพระสัทธรรม"
    ],
    plos: [
      {
        code: "PLO ๑",
        description: "รอบรู้เชี่ยวชาญแตกฉานในพระไตรปิฎกเถรวาท และหลักไตรสิกขา วินิจฉัยหลักธรรมตามหลักวิชาการได้อย่างลึกซึ้ง"
      },
      {
        code: "PLO ๒",
        description: "สังเคราะห์หลักธรรมในพระไตรปิฎกเถรวาทและหลักไตรสิกขากับศาสตร์สมัยใหม่ ผ่านกระบวนการวิจัยเพื่อสร้างองค์ความรู้ใหม่ที่นำไปสู่การแก้ไขปัญหาทางจิตใจและสังคมให้มีความสงบสุขอย่างยั่งยืน"
      },
      {
        code: "PLO ๓",
        description: "ผู้นำด้านจิตใจและปัญญา ศรัทธาอุทิศตนเพื่อพระพุทธศาสนา ในการรักษาสืบทอดพระไตรปิฎกเถรวาท และน้อมนำมาพัฒนาจิตใจและสังคม"
      }
    ],
    careers: [
      "ผู้เผยแผ่พระพุทธศาสนา / พระธรรมทูตสายต่างประเทศและในประเทศ",
      "อาจารย์ประจำสาขาวิชาพระไตรปิฎกและพุทธศาสตร์ในระดับอุดมศึกษา",
      "นักวิชาการชั้นสูงด้านคัมภีร์พระไตรปิฎกเถรวาทและบาลีพุทธพจน์",
      "อนุศาสนาจารย์ในหน่วยงานกองทัพและกระทรวงยุติธรรม",
      "นักวิจัย ผู้เชี่ยวชาญแปลและปริวรรตคัมภีร์พระไตรปิฎก อรรถกถา ฎีกา"
    ],
    plans: [
      {
        planCode: "แบบ ๑.๑",
        planName: "แบบ ๑.๑ (ทำวิทยานิพนธ์ ๔๘ หน่วยกิต)",
        totalCredits: 48,
        courseworkCredits: 0,
        thesisCredits: 48,
        description: "สำหรับผู้สำเร็จการศึกษาระดับปริญญาโทสาขาพุทธศาสตร์หรือเทียบเท่า และมีผลงานวิจัยหรือความเชี่ยวชาญในพระไตรปิฎก มุ่งเน้นการสร้างองค์ความรู้ใหม่ผ่านดุษฎีนิพนธ์ล้วน ๔๘ หน่วยกิต"
      },
      {
        planCode: "แบบ ๒.๑",
        planName: "แบบ ๒.๑ (ศึกษารายวิชา ๑๒ หน่วยกิต + วิทยานิพนธ์ ๓๖ หน่วยกิต)",
        totalCredits: 48,
        courseworkCredits: 12,
        thesisCredits: 36,
        description: "ศึกษารายวิชาบังคับ ๖ หน่วยกิต วิชาเลือก ๖ หน่วยกิต และทำดุษฎีนิพนธ์ ๓๖ หน่วยกิต รวมเป็น ๔๘ หน่วยกิต"
      }
    ],
    responsibleLecturers: [
      {
        name: "พระธรรมวชิราจารย์, รศ.ดร.",
        academicTitle: "รองศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "ศศ.ม. (ภาษาสันสกฤต)", "ป.ธ.๗"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      },
      {
        name: "รศ.ดร.เวทย์ บรรณกรกุล",
        academicTitle: "รองศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "อ.ม. (ภาษาบาลี)", "ป.ธ.๙"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      },
      {
        name: "ผศ.ดร.สุพิชฌาย์ พรพิชณรงค์",
        academicTitle: "ผู้ช่วยศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "ศศ.บ. (ภาษาไทย)"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      }
    ],
    courses: [
      {
        code: "๘๒๐ ๓๐๐",
        nameTh: "ดุษฎีนิพนธ์ (แผน ๑.๑)",
        nameEn: "Dissertation",
        credits: 48,
        creditDesc: "๔๘ หน่วยกิต",
        category: "วิทยานิพนธ์",
        description: "สร้างองค์ความรู้ใหม่ระดับดุษฎีบัณฑิตด้วยการวิจัยเชิงลึกในคัมภีร์พระไตรปิฎกเถรวาท อรรถกถา ฎีกา"
      },
      {
        code: "๘๒๐ ๑๐๑",
        nameTh: "ระเบียบวิธีวิจัยชั้นสูงทางพระไตรปิฎกเถรวาท",
        nameEn: "Advanced Research Methodology in Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาบังคับ",
        description: "หลักและระเบียบวิธีวิจัยเชิงลึกเพื่อการศึกษาพระไตรปิฎก การวิจารณ์คัมภีร์ และการวิเคราะห์สังเคราะห์หลักธรรม"
      },
      {
        code: "๘๒๐ ๒๐๕",
        nameTh: "สัมมนาพระไตรปิฎกเถรวาท",
        nameEn: "Seminar on Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๒-๒-๕)",
        category: "วิชาบังคับ",
        description: "การนำเสนอผลงานวิชาการและการอภิปรายประเด็นสำคัญในคัมภีร์พระไตรปิฎกเถรวาท"
      },
      {
        code: "๘๒๐ ๒๐๖",
        nameTh: "พระไตรปิฎกเถรวาทวิเคราะห์ชั้นสูง",
        nameEn: "Advanced Analysis of Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "วิเคราะห์เชิงลึกเกี่ยวกับโครงสร้าง วิวัฒนาการ และเนื้อหาของพระวินัย พระสุตตันตะ และพระอภิธรรม"
      },
      {
        code: "๘๒๐ ๒๐๗",
        nameTh: "พระไตรปิฎกเถรวาทกับปัญหาสังคมร่วมสมัย",
        nameEn: "Theravada Tipitaka and Contemporary Social Issues",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การประยุกต์หลักธรรมในพระไตรปิฎกเถรวาทเพื่อการวิเคราะห์และแก้ไขปัญหาความขัดแย้งและวิกฤติต่างๆ ในสังคมปัจจุบัน"
      },
      {
        code: "๘๒๐ ๒๐๘",
        nameTh: "ศาสตร์แห่งการตีความพระไตรปิฎกเถรวาท",
        nameEn: "Hermeneutics of Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "หลักอรรถศาสตร์และวิธีตีความคัมภีร์ทางพระพุทธศาสนาตามสายธารอรรถกถาจารย์"
      },
      {
        code: "๘๒๐ ๒๐๙",
        nameTh: "วิเคราะห์นวังคสัตถุศาสน์ในพระไตรปิฎกเถรวาท",
        nameEn: "Analysis of Navangasatthusasana in Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การศึกษาวิจัยคำสอน ๙ ประการของพระพุทธเจ้า (สุตตะ เคยยะ เวยยากรณะ คาถา อุทาน อิติวุตตกะ ชาตกะ อัพภูตธรรม เวทัลละ)"
      },
      {
        code: "๘๒๐ ๒๑๐",
        nameTh: "สหวิทยาการในพระไตรปิฎกเถรวาท",
        nameEn: "Interdisciplinary Approaches to Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การบูรณาการหลักพระพุทธศาสนากับวิทยาศาสตร์ จิตวิทยา สังคมวิทยา และเทคโนโลยีดิจิทัล"
      },
      {
        code: "๘๒๐ ๔๐๐",
        nameTh: "ดุษฎีนิพนธ์ (แผน ๒.๑)",
        nameEn: "Dissertation",
        credits: 36,
        creditDesc: "๓๖ หน่วยกิต",
        category: "วิทยานิพนธ์",
        description: "การทำวิจัยและเขียนดุษฎีนิพนธ์เพื่อสร้างองค์ความรู้ใหม่อย่างเป็นระบบ"
      },
      {
        code: "๑๐๒ ๓๐๒",
        nameTh: "การใช้ภาษาบาลี ๑",
        nameEn: "Pali Usage I",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖) ไม่นับหน่วยกิต",
        category: "วิชาเสริมพื้นฐาน",
        description: "ไวยากรณ์บาลีพื้นฐาน การแปล และโครงสร้างประโยคสำหรับนักศึกษาระดับบัณฑิตศึกษา"
      },
      {
        code: "๑๐๒ ๓๐๖",
        nameTh: "การใช้ภาษาบาลี ๒",
        nameEn: "Pali Usage II",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖) ไม่นับหน่วยกิต",
        category: "วิชาเสริมพื้นฐาน",
        description: "การอ่านและแปลคัมภีร์อรรถกถาและฎีกาภาษาบาลีชั้นสูง"
      }
    ],
    pdfDownloadUrl: "/curriculum/TQF2-PhD-Theravada-Tipitaka-2567.pdf",
    pdfFileName: "หลักสูตร มคอ.๒ ป.เอก พระไตรปิฎกเถรวาท.pdf",
    totalPages: 136
  },

  // =========================================================================
  // 2. M.A. in Theravada Tipitaka Studies
  // =========================================================================
  {
    id: "ma-tipitaka",
    degreeLevel: "ปริญญาโท",
    programCode: "พธ.ม. พระไตรปิฎกเถรวาท",
    nameTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาพระไตรปิฎกเถรวาท",
    nameEn: "Master of Buddhism Program in Theravada Tipitaka",
    degreeNameTh: "พุทธศาสตรมหาบัณฑิต (พระไตรปิฎกเถรวาท)",
    degreeNameEn: "Master of Buddhism (Theravada Tipitaka)",
    degreeAbbrTh: "พธ.ม. (พระไตรปิฎกเถรวาท)",
    degreeAbbrEn: "M.B. (Theravada Tipitaka)",
    effectiveYear: "หลักสูตรใหม่ พ.ศ. ๒๕๖๗",
    approvalDate: "๒๔ เมษายน พ.ศ. ๒๕๖๗",
    councilApprovalSession: "สภามหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ครั้งที่ ๔/๒๕๖๗",
    totalCreditsDesc: "๓๖ หน่วยกิต (ตลอดหลักสูตร)",
    philosophy: "ศึกษาพระไตรปิฎกแบบดั้งเดิมจากคัมภีร์พระพุทธศาสนาเถรวาท ใช้ปรัชญาการสอนแบบสอนธรรมนำปฏิบัติ ศีลธรรม จรรยา สัมมาปฏิบัติ เพื่อประยุกต์ใช้ในสถานการณ์ปัจจุบัน นำไปสู่การพัฒนาจิตใจและสังคมในยุคดิจิทัลให้อุดมไปด้วยคุณธรรมและจริยธรรมอย่างยั่งยืน",
    objectives: [
      "มีความรู้ในพระไตรปิฎกแบบดั้งเดิมจากคัมภีร์พระพุทธศาสนาเถรวาทอย่างถ่องแท้",
      "ประยุกต์และบูรณาการองค์ความรู้ในพระไตรปิฎกเถรวาทซึ่งนำไปสู่การพัฒนาทางจิตใจและสังคมในยุคดิจิทัล",
      "มีคุณธรรม จริยธรรม ปฏิปทาน่าเลื่อมใส สื่อสารได้ในยุคดิจิทัล มีจิตสาธารณะ มุ่งมั่นพัฒนาจิตใจและสังคม"
    ],
    plos: [
      {
        code: "PLO ๑",
        description: "รอบรู้ในพระไตรปิฎกแบบดั้งเดิมจากคัมภีร์พระพุทธศาสนาเถรวาท สามารถวิเคราะห์และจำแนกหลักธรรมในพระไตรปิฎกเถรวาทได้อย่างถูกต้องตามคัมภีร์"
      },
      {
        code: "PLO ๒",
        description: "ประยุกต์และบูรณาการหลักธรรมในพระไตรปิฎกเถรวาทผ่านกระบวนการวิจัยเพื่อหาแนวทางนำไปสู่การพัฒนาทางจิตใจและสังคมของมนุษย์ในยุคดิจิทัลให้มีความสงบสุขอย่างยั่งยืน"
      }
    ],
    careers: [
      "ผู้เผยแผ่พระพุทธศาสนาและพระธรรมทูต",
      "ครู อาจารย์สอนวิชาพระพุทธศาสนาและภาษาบาลี",
      "นักวิชาการศาสนาในหน่วยงานภาครัฐและเอกชน",
      "อนุศาสนาจารย์",
      "นักวิจัยด้านพุทธศาสน์ศึกษาและคัมภีร์บาลี"
    ],
    plans: [
      {
        planCode: "แผน ๑.๒",
        planName: "แผน ๑.๒ แบบวิชาการ (รายวิชา ๒๔ หน่วยกิต + วิทยานิพนธ์ ๑๒ หน่วยกิต)",
        totalCredits: 36,
        courseworkCredits: 24,
        thesisCredits: 12,
        description: "ศึกษารายวิชาบังคับ ๑๒ หน่วยกิต วิชาเอก ๑๒ หน่วยกิต และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวมทั้งสิ้น ๓๖ หน่วยกิต"
      }
    ],
    responsibleLecturers: [
      {
        name: "พระธรรมวชิราจารย์, รศ.ดร.",
        academicTitle: "รองศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "ศศ.ม. (ภาษาสันสกฤต)", "ป.ธ.๗"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      },
      {
        name: "รศ.ดร.เวทย์ บรรณกรกุล",
        academicTitle: "รองศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "อ.ม. (ภาษาบาลี)", "ป.ธ.๙"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      },
      {
        name: "ผศ.ดร.สุพิชฌาย์ พรพิชณรงค์",
        academicTitle: "ผู้ช่วยศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "ศศ.บ. (ภาษาไทย)"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      }
    ],
    courses: [
      {
        code: "๖๓๐ ๑๐๑",
        nameTh: "นวังคสัตถุศาสน์ในพระไตรปิฎกเถรวาท",
        nameEn: "Navangasatthusasana in Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาบังคับ",
        description: "การศึกษาวิเคราะห์คำสอนของพระพุทธเจ้า ๙ ส่วนตามโครงสร้างคัมภีร์ดั้งเดิม"
      },
      {
        code: "๖๓๐ ๒๐๒",
        nameTh: "ธรรมปฏิบัติขั้นสูง",
        nameEn: "Advanced Dhamma Practice",
        credits: 3,
        creditDesc: "๓ (๒-๒-๕)",
        category: "วิชาบังคับ",
        description: "การฝึกอบรมจิตตภาวนา วิปัสสนากัมมัฏฐานตามแนวทางสติปัฏฐานสูตร"
      },
      {
        code: "๖๓๐ ๓๐๓",
        nameTh: "ระเบียบวิธีวิจัยทางพระไตรปิฎกเถรวาท",
        nameEn: "Research Methodology in Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๒-๒-๕)",
        category: "วิชาบังคับ",
        description: "ระเบียบวิธีวิจัยทางเอกสาร การวิจารณ์ตัวบทภาษาบาลี และการสังเคราะห์องค์ความรู้"
      },
      {
        code: "๖๓๐ ๓๐๗",
        nameTh: "สัมมนาพระไตรปิฎกเถรวาท",
        nameEn: "Seminar on Theravada Tipitaka",
        credits: 3,
        creditDesc: "๓ (๒-๒-๕)",
        category: "วิชาบังคับ",
        description: "การสัมมนาประเด็นหลักธรรมสำคัญในพระไตรปิฎก"
      },
      {
        code: "๖๓๐ ๑๐๔",
        nameTh: "พระวินัยปิฎกเถรวาทวิเคราะห์",
        nameEn: "Analytical Study of Theravada Vinaya Pitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "ศึกษาวิเคราะห์สิกขาบท พุทธบัญญัติ และสมณสารูปในพระวินัยปิฎก"
      },
      {
        code: "๖๓๐ ๑๐๕",
        nameTh: "พระสุตตันตปิฎกเถรวาทวิเคราะห์",
        nameEn: "Analytical Study of Theravada Suttanta Pitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "ศึกษาวิเคราะห์พระสูตรสำคัญใน ๕ นิกาย (ทีฆ, มัชฌิม, สังยุตต, อังคุตตร, ขุททก)"
      },
      {
        code: "๖๓๐ ๒๐๖",
        nameTh: "พระอภิธรรมปิฎกเถรวาทวิเคราะห์",
        nameEn: "Analytical Study of Theravada Abhidhamma Pitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "ศึกษาวิเคราะห์ปรมัตถธรรม จิต เจตสิก รูป นิพพาน ใน ๗ คัมภีร์อภิธรรม"
      },
      {
        code: "๖๓๐ ๒๐๘",
        nameTh: "พระไตรปิฎกเถรวาทกับศาสตร์สมัยใหม่",
        nameEn: "Theravada Tipitaka and Modern Sciences",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การเปรียบเทียบหลักพุทธธรรมกับวิทยาศาสตร์ยุคใหม่และเทคโนโลยีสารสนเทศ"
      },
      {
        code: "๖๓๐ ๒๐๙",
        nameTh: "พระไตรปิฎกเถรวาทกับศาสตร์แห่งการตีความ",
        nameEn: "Theravada Tipitaka and Hermeneutics",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การตีความคัมภีร์พระพุทธศาสนาตามหลักเนตติปกรณ์และเปฏโกปเทส"
      },
      {
        code: "๖๓๐ ๔๐๐",
        nameTh: "วิทยานิพนธ์",
        nameEn: "Thesis",
        credits: 12,
        creditDesc: "๑๒ หน่วยกิต",
        category: "วิทยานิพนธ์",
        description: "การดำเนินการวิจัยและเขียนรายงานวิทยานิพนธ์ระดับปริญญาโท"
      },
      {
        code: "๑๐๒ ๓๐๒",
        nameTh: "การใช้ภาษาบาลี ๑",
        nameEn: "Pali Usage I",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖) ไม่นับหน่วยกิต",
        category: "วิชาเสริมพื้นฐาน",
        description: "ทบทวนไวยากรณ์บาลีและการแปลความคัมภีร์พระไตรปิฎกเบื้องต้น"
      },
      {
        code: "๑๐๒ ๓๐๖",
        nameTh: "การใช้ภาษาบาลี ๒",
        nameEn: "Pali Usage II",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖) ไม่นับหน่วยกิต",
        category: "วิชาเสริมพื้นฐาน",
        description: "การอ่านและวิเคราะห์พระบาลีในชั้นอรรถกถาและฎีกา"
      }
    ],
    pdfDownloadUrl: "/curriculum/TQF2-MA-Theravada-Tipitaka-2567.pdf",
    pdfFileName: "หลักสูตร มคอ.๒ ป.โท พระไตรปิฎกเถรวาท.pdf",
    totalPages: 123
  },

  // =========================================================================
  // 3. M.A. in Abhidhamma Pitaka Studies
  // =========================================================================
  {
    id: "ma-abhidhamma",
    degreeLevel: "ปริญญาโท",
    programCode: "๖๘๕๙๒๒๑ / ๖๘๕๙๒๒๒",
    nameTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาพระอภิธรรมปิฎก",
    nameEn: "Master of Buddhism Program in Abhidhamma Pitaka",
    degreeNameTh: "พุทธศาสตรมหาบัณฑิต (พระอภิธรรมปิฎก)",
    degreeNameEn: "Master of Buddhism (Abhidhamma Pitaka)",
    degreeAbbrTh: "พธ.ม. (พระอภิธรรมปิฎก)",
    degreeAbbrEn: "M.B. (Abhidhamma Pitaka)",
    effectiveYear: "หลักสูตรใหม่ พ.ศ. ๒๕๖๘",
    approvalDate: "ปีการศึกษา ๒๕๖๘",
    councilApprovalSession: "สภามหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
    totalCreditsDesc: "๓๖ หน่วยกิต (ตลอดหลักสูตร)",
    philosophy: "มุ่งหมายให้ผู้ศึกษามีองค์ความรู้ปรมัตถธรรมอย่างลึกซึ้ง และมีทักษะในการคิดวิเคราะห์หลักธรรมในพระอภิธรรมปิฎก มีความซื่อตรงต่อพระสัทธรรม นำไปสู่การปฏิบัติเพื่อความผาสุกในชีวิต",
    objectives: [
      "เพื่อผลิตมหาบัณฑิตให้มีปัญญาแตกฉานในพระอภิธรรมปิฎก สามารถวิเคราะห์วิจัยเนื้อหาของพระอภิธรรมปิฎกได้",
      "เพื่อผลิตมหาบัณฑิตที่สามารถประยุกต์องค์ความรู้ในพระอภิธรรมปิฎกไปใช้ในการพัฒนาตนเองและสังคมอย่างสร้างสรรค์",
      "เพื่อผลิตมหาบัณฑิตที่มีความซื่อตรงต่อพระสัทธรรม มีความเข้าใจชีวิตและนำไปสู่การปฏิบัติเพื่อความผาสุกในชีวิต"
    ],
    plos: [
      {
        code: "PLO ๑",
        description: "มีความรู้ในอภิธรรมปิฎกอย่างลึกซึ้ง สามารถวิเคราะห์วิจัยเนื้อหาของพระอภิธรรมปิฎกได้"
      },
      {
        code: "PLO ๒",
        description: "มีความสามารถประยุกต์องค์ความรู้พระอภิธรรมปิฎกเพื่อใช้ในการวิจัยและการปฏิบัติ"
      },
      {
        code: "PLO ๓",
        description: "มีความซื่อตรงต่อพระสัทธรรม มีความเข้าใจชีวิตและนำไปสู่การปฏิบัติเพื่อความผาสุกในชีวิต"
      }
    ],
    careers: [
      "อาจารย์ประจำสาขาวิชาในสถาบันอุดมศึกษาทั้งภาครัฐและเอกชน",
      "ผู้เชี่ยวชาญบรรยายด้านพระอภิธรรมในสถานปฏิบัติธรรมและสำนักอภิธรรมทั่วประเทศ",
      "อาจารย์สอนพระไตรปิฎกและพระพุทธศาสนาประจำสถาบันการศึกษา",
      "นักวิชาการอิสระและผู้ทรงคุณวุฒิวิจัยด้านปรมัตถธรรม",
      "เจ้าหน้าที่ของรัฐและบุคลากรผู้ปฏิบัติงานด้านศาสนูปถัมภ์"
    ],
    plans: [
      {
        planCode: "แผน ๑.๒ (แบบวิชาการ)",
        planName: "แผน ๑.๒ แบบวิชาการ (รหัส ๖๘๕๙๒๒๑)",
        totalCredits: 36,
        courseworkCredits: 24,
        thesisCredits: 12,
        description: "ศึกษารายวิชา ๒๔ หน่วยกิต (วิชาบังคับ ๙ หน่วยกิต, วิชาเฉพาะ ๑๕ หน่วยกิต) และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวม ๓๖ หน่วยกิต"
      },
      {
        planCode: "แผน ๒ (แบบวิชาชีพ)",
        planName: "แผน ๒ แบบวิชาชีพหรือปฏิบัติการ (รหัส ๖๘๕๙๒๒๒)",
        totalCredits: 36,
        courseworkCredits: 30,
        thesisCredits: 6,
        description: "ศึกษารายวิชา ๓๐ หน่วยกิต (วิชาบังคับ ๙ หน่วยกิต, วิชาเฉพาะ ๒๑ หน่วยกิต) และทำสารนิพนธ์ ๖ หน่วยกิต รวม ๓๖ หน่วยกิต"
      }
    ],
    responsibleLecturers: [
      {
        name: "พระธรรมวชิราจารย์, รศ.ดร.",
        academicTitle: "รองศาสตราจารย์, ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "ศศ.ม. (ภาษาสันสกฤต)", "ป.ธ.๗"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      },
      {
        name: "พระมหาชณัตนิติสนธิ์ คุณสํวโร, ดร. (พันธ์เจริญ)",
        academicTitle: "ดร.",
        degrees: ["พธ.ด. (พระพุทธศาสนา)", "พธ.ม. (พระพุทธศาสนา)", "ป.ธ.๙"],
        position: "อาจารย์ผู้รับผิดชอบหลักสูตร"
      }
    ],
    courses: [
      {
        code: "๖๓๖ ๑๐๑",
        nameTh: "พระอภิธรรมปิฎกศึกษา",
        nameEn: "Studies in Abhidhamma Pitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาบังคับ",
        description: "โครงสร้าง ภาพรวม และความเป็นมาของพระอภิธรรมปิฎกทั้ง ๗ คัมภีร์"
      },
      {
        code: "๖๓๖ ๑๐๒",
        nameTh: "สัมมนาพระอภิธรรม",
        nameEn: "Seminar on Abhidhamma",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาบังคับ",
        description: "การสัมมนาวิเคราะห์ประเด็นปรมัตถธรรมและอภิธรรมสังคหะ"
      },
      {
        code: "๖๓๖ ๒๐๓",
        nameTh: "ระเบียบวิธีวิจัยทางพระอภิธรรม",
        nameEn: "Research Methodology in Abhidhamma",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาบังคับ",
        description: "การออกแบบและทำวิจัยในคัมภีร์พระอภิธรรมและคัมภีร์อรรถกถาอัฏฐสาลินี สัมโมหวิโนทนี ปัญจปกรณัฏฐกถา"
      },
      {
        code: "๖๓๖ ๑๐๔",
        nameTh: "การศึกษาวิเคราะห์ธัมมสังคณี",
        nameEn: "Analytical Study of Dhammasangani",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การวิเคราะห์คัมภีร์ธัมมสังคณี มาติกา ๒๒ ติกะ ๑๐๐ ทุกะ จิตตุปปาทกัณฑ์ และรูปกัณฑ์"
      },
      {
        code: "๖๓๖ ๑๐๕",
        nameTh: "การศึกษาวิเคราะห์วิภังค์และธาตุกถา",
        nameEn: "Analytical Study of Vibhanga and Dhatukatha",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "วิเคราะห์การแจกแจงขันธ์ อายตนะ ธาตุ สัจจะ อินทรีย์ และปฏิจจสมุปบาทในวิภังค์และธาตุกถา"
      },
      {
        code: "๖๓๖ ๒๐๖",
        nameTh: "การศึกษาวิเคราะห์ปุคคลบัญญัติ กถาวัตถุและยมก",
        nameEn: "Analytical Study of Puggalapannatti, Kathavatthu and Yamaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การศึกษาวิเคราะห์บัญญัติธรรม การโต้วาทีหักล้างปรัปวาท ๒๑๙ กถา และหลักยมกคู่แห่งธรรม"
      },
      {
        code: "๖๓๖ ๒๐๗",
        nameTh: "การศึกษาวิเคราะห์ปัฏฐาน",
        nameEn: "Analytical Study of Patthana",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การศึกษาวิเคราะห์คัมภีร์มหาปัฏฐาน ปัจจัย ๒๔ และปัจจยุบบันนธรรมอย่างลึกซึ้ง"
      },
      {
        code: "๖๓๖ ๒๐๘",
        nameTh: "ศึกษาอิสระในพระอภิธรรมปิฎก",
        nameEn: "Independent Study in Abhidhamma Pitaka",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การค้นคว้าด้วยตนเองในหัวข้อเฉพาะที่เกี่ยวกับพระอภิธรรม"
      },
      {
        code: "๖๓๖ ๒๐๙",
        nameTh: "จิตวิทยาในพระอภิธรรม",
        nameEn: "Psychology in Abhidhamma",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การเปรียบเทียบกระบวนการทำงานของจิตและเจตสิกกับจิตวิทยาสมัยใหม่"
      },
      {
        code: "๖๓๖ ๒๑๐",
        nameTh: "อภิธัมมัตถสังคหศึกษา",
        nameEn: "Studies in Abhidhammatthasangaha",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การศึกษาคู่มืออภิธัมมัตถสังคหะ ๙ ปริจเฉทของพระอนุรุทธาจารย์"
      },
      {
        code: "๖๓๖ ๒๑๑",
        nameTh: "กัมมัฏฐานในพระอภิธรรม",
        nameEn: "Kammatthana in Abhidhamma",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "สมถกรรมฐานและวิปัสสนากรรมฐานตามหลักการในพระอภิธรรม"
      },
      {
        code: "๖๓๖ ๒๑๒",
        nameTh: "ปรัปวาทในกถาวัตถุ",
        nameEn: "Controversial Points in Kathavatthu",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การศึกษาเปรียบเทียบทรรศนะที่ขัดแย้งของนิกายโบราณในคัมภีร์กถาวัตถุ"
      },
      {
        code: "๖๓๖ ๒๑๓",
        nameTh: "อภิธรรมในวิถีชีวิต",
        nameEn: "Abhidhamma in Daily Life",
        credits: 3,
        creditDesc: "๓ (๓-๐-๖)",
        category: "วิชาเอก/เฉพาะ",
        description: "การน้อมนำหลักปรมัตถธรรมมาพัฒนาสติ สมาธิ และปัญญาในการดำเนินชีวิตประจำวัน"
      },
      {
        code: "๖๓๖ ๔๐๐",
        nameTh: "วิทยานิพนธ์ (แผน ๑.๒)",
        nameEn: "Thesis",
        credits: 12,
        creditDesc: "๑๒ หน่วยกิต",
        category: "วิทยานิพนธ์",
        description: "การทำวิจัยและเขียนวิทยานิพนธ์ทางพระอภิธรรมปิฎก"
      },
      {
        code: "๖๓๖ ๓๐๐",
        nameTh: "สารนิพนธ์ (แผน ๒)",
        nameEn: "Thematic Paper",
        credits: 6,
        creditDesc: "๖ หน่วยกิต",
        category: "สารนิพนธ์",
        description: "การศึกษาค้นคว้าอิสระและเขียนสารนิพนธ์ทางพระอภิธรรมปิฎก"
      }
    ],
    pdfDownloadUrl: "/curriculum/TQF2-MA-Abhidhamma-Pitaka-2568.pdf",
    pdfFileName: "หลักสูตร มคอ.๒ พธ.ม. พระอภิธรรมปิฎก.pdf",
    totalPages: 140
  }
];

export function getCurriculumStats() {
  return {
    totalPrograms: graduateCurricula.length,
    phdPrograms: graduateCurricula.filter(c => c.degreeLevel === "ปริญญาเอก").length,
    maPrograms: graduateCurricula.filter(c => c.degreeLevel === "ปริญญาโท").length,
    totalCourses: graduateCurricula.reduce((acc, c) => acc + c.courses.length, 0),
    totalPdfPages: graduateCurricula.reduce((acc, c) => acc + c.totalPages, 0)
  };
}
