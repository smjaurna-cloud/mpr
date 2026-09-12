/**
 * ข้อมูลบทความวิชาการและบทความวิจัยที่ได้รับการตีพิมพ์ในวารสารวิชาการระดับชาติและนานาชาติ
 * ของคณาจารย์และบุคลากร มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 * ดัชนีอ้างอิง: TCI กลุ่ม ๑ (Tier 1), TCI กลุ่ม ๒ (Tier 2), Scopus Q1, และฐานข้อมูล TCI-ThaiJO
 */

export interface FacultyPublication {
  id: string;
  title: string;
  titleEn?: string;
  authors: string[];
  facultyPersonnel: string; // ชื่อบุคลากรในระบบ
  facultyRole: string;      // ตำแหน่งในวิทยาลัย
  articleType: "บทความวิจัย (Research Article)" | "บทความวิชาการ (Academic Article)";
  journal: string;
  journalTier: "Scopus Q1" | "TCI กลุ่ม ๑" | "TCI กลุ่ม ๒" | "วารสารระดับชาติ";
  volume: string;
  issue: string;
  yearBE: number; // พ.ศ.
  yearCE: number; // ค.ศ.
  pages?: string;
  database: "TCI-ThaiJO" | "Scopus" | "ThaiJO / Direct";
  externalUrl: string; // ลิงก์เชื่อมต่อไปยังฐานข้อมูลวารสารจริง
  doi?: string;
  abstractSummary: string;
  keywords: string[];
}

export const facultyPublications: FacultyPublication[] = [
  // ==========================================
  // ๑. พระมหาศุภวัฒน์ ฐานวุฑฺโฒ (บุญทอง), ดร., ป.ธ.๖
  // ==========================================
  {
    id: "PUB-2568-SPW-001",
    title: "An Integrated Buddhist Mechanism to Promote Self-Esteem among Elderly Volunteer Groups in Sam Phran District, Nakhon Pathom Province, Thailand",
    titleEn: "An Integrated Buddhist Mechanism to Promote Self-Esteem among Elderly Volunteer Groups in Sam Phran District, Nakhon Pathom Province, Thailand",
    authors: [
      "Phramahanarongsak Sudanto",
      "Pattamawadee Sankheangaew",
      "Phramahaboonlert Indhapañño",
      "Phrajaroenphong Wichai",
      "Phrasamunoppadol Suthon",
      "Phramahasupawat Boonthong"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "Zhongguo Kuangye Daxue Xuebao",
    journalTier: "Scopus Q1",
    volume: "30",
    issue: "2",
    yearBE: 2568,
    yearCE: 2025,
    pages: "20-202",
    database: "Scopus",
    externalUrl: "https://zkdx.ch/journal/zkdx/article/view/345",
    abstractSummary: "การศึกษากลไกเชิงพุทธบูรณาการเพื่อส่งเสริมการเห็นคุณค่าในตัวเองของกลุ่มผู้สูงอายุจิตอาสา ในอำเภอสามพราน จังหวัดนครปฐม ตีพิมพ์ในวารสารระดับนานาชาติฐานข้อมูล Scopus Q1",
    keywords: ["Buddhist Mechanism", "Self-Esteem", "Elderly Volunteer", "Sam Phran", "Scopus Q1"]
  },
  {
    id: "PUB-2568-SPW-002",
    title: "การพัฒนาระบบการฝึกกรรมฐานสำหรับชาวต่างชาติสู่การสร้างมาตรฐาน Soft Power",
    titleEn: "Development of a Meditation Training System for Foreigners Towards Creating a Soft Power Standard",
    authors: ["แม่ชีจิราภรณ์ ขนาดนิด", "พระเจริญพงษ์ วิชัย", "พระมหาศุภวัฒน์ บุญทอง"],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารเสียงธรรมจากมหายาน",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๑๑",
    issue: "๕",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๓๑๐-๓๒๔",
    database: "TCI-ThaiJO",
    externalUrl: "https://so09.tci-thaijo.org/index.php/nsc/article/view/7638",
    abstractSummary: "วิจัยและพัฒนาระบบการฝึกกรรมฐานวิปัสสนาภาวนาตามหลักพุทธธรรมสำหรับชาวต่างชาติ เพื่อยกระดับสู่การเป็น Soft Power ทางจิตวิญญาณระดับสากล",
    keywords: ["กรรมฐานสำหรับชาวต่างชาติ", "Soft Power", "วิปัสสนาภาวนา", "วารสารเสียงธรรมจากมหายาน"]
  },
  {
    id: "PUB-2568-SPW-003",
    title: "การส่งเสริมวิถีชุมชนเชิงพุทธเพื่อการอนุรักษ์แม่น้ำท่าจีนของชุมชน อำเภอสามพราน จังหวัดนครปฐม",
    titleEn: "Promoting Buddhist Community Way of Life for the Conservation of the Tha Chin River in Sam Phran District, Nakhon Pathom Province",
    authors: ["กฤติยา ถ้ำทอง", "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ"],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสาร มจร ปรัชญาปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๘",
    issue: "๑",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๓๒๘-๓๔๑",
    database: "TCI-ThaiJO",
    externalUrl: "https://so06.tci-thaijo.org/index.php/jmpr/article/view/281754",
    abstractSummary: "การบูรณาการหลักพุทธธรรมและมิติสิ่งแวดล้อมเพื่อสร้างความเข้มแข็งของชุมชนในการฟื้นฟูและอนุรักษ์ลุ่มน้ำท่าจีน นครปฐม",
    keywords: ["วิถีชุมชนเชิงพุทธ", "อนุรักษ์แม่น้ำท่าจีน", "สามพราน", "มจร ปรัชญาปริทรรศน์"]
  },
  {
    id: "PUB-2567-SPW-004",
    title: "หลักการและวิธีการปฏิบัติสมถภาวนา",
    titleEn: "Principles and Methods of Samatha Bhavana Practice",
    authors: [
      "พระครูพิพิธวรกิจจานุการ",
      "พระมหาถนอม ฐานวโร",
      "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ",
      "สรวิชญ์ วงษ์สะอาด",
      "บรรพต ต้นธีรวงศ์"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสาร มจร บาฬีศึกษาพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๑๐",
    issue: "๑",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๑๘๙-๒๐๖",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa/article/view/264033",
    abstractSummary: "วิเคราะห์หลักการ อารมณ์แห่งการฝึกสมถกรรมฐาน และแนวทางปฏิบัติสมาธิตามแนวคัมภีร์วิสุทธิมรรคและพระไตรปิฎก",
    keywords: ["สมถภาวนา", "สมาธิ", "คัมภีร์วิสุทธิมรรค", "มจร บาฬีศึกษาพุทธโฆสปริทรรศน์"]
  },
  {
    id: "PUB-2567-SPW-005",
    title: "การประยุกต์ใช้หลักโพชฌงค์ ๗ เพื่อป้องกันภาวะซึมเศร้าสำหรับคนวัยทำงาน ร่วมกับปัญญาประดิษฐ์ (AI) ในโลกแห่งอนาคต",
    titleEn: "Application of the Bojjhanga 7 to Prevent Depression for Working-Age People Combined with Artificial Intelligence (AI) in the Future World",
    authors: [
      "พระครูสังฆกิจจารักษ์ ฐานวุฑฺโฒ",
      "กฤติยา ถ้ำทอง",
      "บรรพต ต้นธีรวงศ์",
      "พระมหาศุภวัฒน์ บุญทอง",
      "พระเจริญพงษ์ วิชัย"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสารเสียงธรรมจากมหายาน",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๑๐",
    issue: "๔",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๓๘๔-๓๙๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so09.tci-thaijo.org/index.php/nsc/article/view/4656",
    abstractSummary: "ศึกษาการนำหลักโพชฌงค์ ๗ บูรณาการร่วมกับเทคโนโลยีพุทธปัญญาประดิษฐ์ (AI) เพื่อตรวจจับและบำบัดฟื้นฟูสุขภาพจิตในกลุ่มคนวัยทำงาน",
    keywords: ["โพชฌงค์ ๗", "ภาวะซึมเศร้า", "ปัญญาประดิษฐ์ (AI)", "พุทธนวัตกรรม"]
  },
  {
    id: "PUB-2566-SPW-006",
    title: "ไตรลักษณ์: หลักแห่งความเสมอภาคในพระพุทธศาสนา",
    titleEn: "Tilakkhana: The Principle of Equality in Buddhism",
    authors: [
      "พระมหาศุภวัฒน์ บุญทอง",
      "กฤติยา ถ้ำทอง",
      "พระครูพิพิธวรกิจจานุการ",
      "พระมหาณรงค์ศักดิ์ สุทนฺโต",
      "ชำนาญ เกิดช่อ"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสาร มจร พุทธศาสตร์ปริทรรศน์",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๗",
    issue: "๑",
    yearBE: 2566,
    yearCE: 2023,
    pages: "๖๕-๗๗",
    database: "TCI-ThaiJO",
    externalUrl: "https://so06.tci-thaijo.org/index.php/jmb/article/view/263175",
    abstractSummary: "วิเคราะห์ปรัชญาความเสมอภาคทางมนุษยชาติผ่านกฎแห่งอนิจจัง ทุกขัง อนัตตา ในคัมภีร์พระพุทธศาสนาเถรวาท",
    keywords: ["ไตรลักษณ์", "ความเสมอภาค", "อนัตตา", "มจร พุทธศาสตร์ปริทรรศน์"]
  },
  {
    id: "PUB-2566-SPW-007",
    title: "พญานาค: ความเป็นมา ความเชื่อ และคุณูปการต่อสังคมไทย",
    titleEn: "Naga: Origin, Belief, and Contributions to Thai Society",
    authors: [
      "ชำนาญ เกิดช่อ",
      "ฐิติพร สะสม",
      "พระมหาศุภวัฒน์ บุญทอง",
      "กฤติยา ถ้ำทอง",
      "พระมหาถนอม ฐานวโร"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสาร มจร พุทธศาสตร์ปริทรรศน์",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๗",
    issue: "๑",
    yearBE: 2566,
    yearCE: 2023,
    pages: "๙๓-๑๐๖",
    database: "TCI-ThaiJO",
    externalUrl: "https://so06.tci-thaijo.org/index.php/jmb/article/view/263209",
    abstractSummary: "การศึกษาวิเคราะห์ความเชื่อเรื่องพญานาคในบริบทพระพุทธศาสนา วัฒนธรรมไทย และบทบาทต่อการอนุรักษ์ระบบนิเวศทางน้ำ",
    keywords: ["พญานาค", "ความเชื่อทางพุทธศาสนา", "มรดกวัฒนธรรม", "มจร พุทธศาสตร์ปริทรรศน์"]
  },
  {
    id: "PUB-2565-SPW-008",
    title: "การรู้เท่าทันสื่อด้วยพุทธิปัญญาสำหรับพระสงฆ์",
    titleEn: "Media Literacy through Buddhist Wisdom for Monks",
    authors: [
      "พุทธชาติ แผนสมบุญ",
      "พระมหาบุญเลิศ ช่วยธานี",
      "พระมหาประกาศิต ฐิติปสิทธิกร",
      "พระมหาสาทร บุญชูยะ",
      "พระมหาศุภวัฒน์ บุญทอง",
      "กฤติยา ถ้ำทอง"
    ],
    facultyPersonnel: "พระมหาศุภวัฒน์ ฐานวุฑฺโฒ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสาร มจร พุทธปัญญาปริทรรศน์",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๗",
    issue: "๓",
    yearBE: 2565,
    yearCE: 2022,
    pages: "๑๘๕-๒๐๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so03.tci-thaijo.org/index.php/jmbr/article/view/255155",
    abstractSummary: "การสังเคราะห์ทักษะการรู้เท่าทันสื่อในยุคดิจิทัลด้วยปัญญาตามหลักพุทธธรรม เพื่อเป็นแนวปฏิบัติในการเผยแผ่ธรรมของพระสงฆ์",
    keywords: ["การรู้เท่าทันสื่อ", "พุทธิปัญญา", "พระสงฆ์ในยุคดิจิทัล", "TCI 1"]
  },

  // ==========================================
  // ๒. ดร.สมบูรณ์ จารุณะ (Dr. Somboon Jaruna)
  // ==========================================
  {
    id: "PUB-2568-SBJ-001",
    title: "รูปแบบการศึกษาคัมภีร์พระพุทธศาสนา: กรณีศึกษาคัมภีร์อภิธัมมาวตาร",
    titleEn: "A Study Model of Buddhist Scriptures: A Case Study of the Abhidhammavatara Scripture",
    authors: ["สมบูรณ์ จารุณะ"],
    facultyPersonnel: "ดร.สมบูรณ์ จารุณะ",
    facultyRole: "อาจารย์ประจำ / Super Administrator",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๑๐",
    issue: "๓",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๗๕-๙๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa",
    abstractSummary: "วิเคราะห์โครงสร้างระเบียบวิธีศึกษาคัมภีร์พระอภิธรรมปิฎกผ่านคัมภีร์อภิธัมมาวตารของพระพุทธทัตตเถระ เพื่อพัฒนารูปแบบการสอนคัมภีร์บาลีแก่สามเณรและนิสิตระดับบัณฑิตศึกษา",
    keywords: ["คัมภีร์อภิธัมมาวตาร", "การศึกษาคัมภีร์", "พระอภิธรรม", "พุทธโฆสปริทรรศน์"]
  },
  {
    id: "PUB-2568-SBJ-002",
    title: "การพัฒนาน้ำปานะจากสมัยพุทธกาลถึงปัจจุบัน",
    titleEn: "Development of Bana Drinks from the Buddha's Time to the Present",
    authors: ["สมบูรณ์ จารุณะ"],
    facultyPersonnel: "ดร.สมบูรณ์ จารุณะ",
    facultyRole: "อาจารย์ประจำ / Super Administrator",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสารนวังคสัตถุสาสน์ปริทรรศน์ มูลนิธิพระศรีสุทธิเวที",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๓",
    issue: "๑",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๕๗-๗๑",
    database: "TCI-ThaiJO",
    externalUrl: "https://www.tci-thaijo.org/",
    abstractSummary: "ศึกษาประวัติ วิวัฒนาการ และข้อกำหนดทางพระวินัยเกี่ยวกับน้ำอัฏฐบานและน้ำปานะ ตั้งแต่สมัยพุทธกาลจนถึงสังคมสมัยใหม่เพื่อการขบฉันที่ถูกต้องตามพุทธานุญาต",
    keywords: ["น้ำปานะ", "อัฏฐบาน", "พระวินัยปิฎก", "นวังคสัตถุสาสน์ปริทรรศน์"]
  },
  {
    id: "PUB-2568-SBJ-003",
    title: "ครูตามทัศนะทางพระพุทธศาสนา",
    titleEn: "Teachers from a Buddhist Perspective",
    authors: ["พระศรีสุทธิเวที", "บุญเรือง สมประจบ", "พระมหาบุญรุ่ง สิริโชติ", "สมบูรณ์ จารุณะ"],
    facultyPersonnel: "ดร.สมบูรณ์ จารุณะ",
    facultyRole: "อาจารย์ประจำ / Super Administrator",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสาร มจร บาฬีศึกษาพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๙",
    issue: "๓",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๑๕๒-๑๖๘",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa",
    abstractSummary: "ศึกษาวิเคราะห์บทบาท หน้าที่ และคุณธรรมของความเป็นครูตามหลักธรรมในพระไตรปิฎก เช่น ทิศ ๖ กัลยาณมิตรธรรม ๗ เพื่อยกระดับจิตวิญญาณความเป็นครูในศตวรรษที่ ๒๑",
    keywords: ["จิตวิญญาณความเป็นครู", "ทิศ ๖", "พุทธศาสนศึกษา", "มจร บาฬีศึกษาพุทธโฆสปริทรรศน์"]
  },
  {
    id: "PUB-2567-SBJ-004",
    title: "การพัฒนาคุณธรรมจริยธรรมตามหลักกัลยาณมิตรธรรม ๗ ในคัมภีร์พระพุทธศาสนาเถรวาท",
    titleEn: "Moral and Ethical Development according to Kalyanamitta Dhamma 7 in Theravada Buddhist Scriptures",
    authors: ["สังข์วาล เสริมแก้ว", "ภานุมาตร์ เนโส", "สมบูรณ์ จารุณะ"],
    facultyPersonnel: "ดร.สมบูรณ์ จารุณะ",
    facultyRole: "อาจารย์ประจำ / Super Administrator",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสารนวังคสัตถุสาสน์ปริทรรศน์ มูลนิธิพระศรีสุทธิเวที",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๒",
    issue: "๒",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๑-๑๔",
    database: "TCI-ThaiJO",
    externalUrl: "https://www.tci-thaijo.org/",
    abstractSummary: "วิเคราะห์หลักกัลยาณมิตรธรรม ๗ ประการสำหรับใช้เป็นแม่แบบในการพัฒนาจิตสำนึกและคุณธรรมจริยธรรมของเยาวชนและนิสิตบรรพชิต",
    keywords: ["กัลยาณมิตรธรรม ๗", "จริยธรรม", "พระพุทธศาสนาเถรวาท", "นวังคสัตถุสาสน์ปริทรรศน์"]
  },

  // ==========================================
  // ๓. พระธรรมวชิราจารย์ (สุชาติ กิตฺติปญฺโญ), รศ.ดร.
  // ==========================================
  {
    id: "PUB-2565-SCK-001",
    title: "การพัฒนาองค์ความรู้ เทคนิค กระบวนการดูแลด้านสุขภาวะสำหรับพระสงฆ์",
    titleEn: "Development of Knowledge, Techniques, and Healthcare Processes for Buddhist Monks",
    authors: ["สุพิชฌาย์ พรพิชณรงค์", "พระธรรมวชิราจารย์ (สุชาติ กิตฺติปญฺโญ)"],
    facultyPersonnel: "พระธรรมวชิราจารย์, รศ.ดร.",
    facultyRole: "ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารสันติศึกษาปริทรรศน์ มจร",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๑๑",
    issue: "๖",
    yearBE: 2565,
    yearCE: 2022,
    pages: "๒๔๙๗-๒๕๐๗",
    database: "TCI-ThaiJO",
    externalUrl: "https://so03.tci-thaijo.org/index.php/journal-peace",
    abstractSummary: "วิจัยและพัฒนากระบวนการดูแลสุขภาวะองค์รวม (Holistic Healthcare) ของพระภิกษุสงฆ์ตามกรอบพระธรรมวินัยและสุขอนามัยชุมชน เพื่อลดปัญหาโรคไม่ติดต่อเรื้อรัง (NCDs)",
    keywords: ["สุขภาวะพระสงฆ์", "พระธรรมวินัย", "สันติศึกษาปริทรรศน์", "TCI 1"]
  },
  {
    id: "PUB-2566-SCK-002",
    title: "การบูรณาการหลักพุทธธรรมและศาสตร์พระราชาในการพัฒนาชุมชนตามศาสตร์พระราชา บ้านทุ่งเจริญ ตำบลพระแก้ว อำเภอสังขะ จังหวัดสุรินทร์",
    titleEn: "Integration of Buddhist Principles and the King's Philosophy for Community Development at Ban Thung Charoen, Surin Province",
    authors: ["สุพิชฌาย์ พรพิชณรงค์", "พระธรรมวชิราจารย์ (สุชาติ กิตฺติปญฺโญ)"],
    facultyPersonnel: "พระธรรมวชิราจารย์, รศ.ดร.",
    facultyRole: "ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสาร มจร บาฬีศึกษาพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๙",
    issue: "๒",
    yearBE: 2566,
    yearCE: 2023,
    pages: "๙๒-๑๐๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa",
    abstractSummary: "การประยุกต์ศาสตร์พระราชาและความสามัคคีตามหลักสาราณียธรรมเพื่อพัฒนาวิถีชีวิตความเป็นอยู่ของชาวบ้านในชุมชนชนบทอย่างยั่งยืน",
    keywords: ["ศาสตร์พระราชา", "พุทธธรรม", "พัฒนาชุมชน", "บาฬีศึกษาพุทธโฆสปริทรรศน์"]
  },
  {
    id: "PUB-2567-SCK-003",
    title: "การบูรณาการหลักพุทธธรรมและศาสตร์พระราชาเพื่อพัฒนาชุมชนหมู่บ้านเศรษฐกิจพอเพียง บ้านศรีไคออก อำเภอวารินชำราบ จังหวัดอุบลราชธานี",
    titleEn: "Integration of Buddhist Principles and King's Philosophy for Sufficiency Economy Village Development in Ubon Ratchathani",
    authors: ["สุพิชฌาย์ พรพิชณรงค์", "พระเทพวชิรโกศล", "พระธรรมวชิราจารย์"],
    facultyPersonnel: "พระธรรมวชิราจารย์, รศ.ดร.",
    facultyRole: "ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารนวัตกรรมการจัดการศึกษาและการวิจัย",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๖",
    issue: "๓",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๖๐๙-๖๒๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so02.tci-thaijo.org/",
    abstractSummary: "วิจัยเชิงปฏิบัติการในการสร้างหมู่บ้านเศรษฐกิจพอเพียงต้นแบบด้วยความร่วมมือของ บวร (บ้าน วัด โรงเรียน) ในจังหวัดอุบลราชธานี",
    keywords: ["เศรษฐกิจพอเพียง", "บวร", "วารินชำราบ", "นวัตกรรมการจัดการศึกษา"]
  },
  {
    id: "PUB-2562-SCK-004",
    title: "พระจิตอาสาคิลานธรรม: รูปแบบและกระบวนการเยียวยาใจผู้ป่วยด้วยธรรมะ",
    titleEn: "Phra Chit-Asa Gilanadhamma: Models and Processes of Healing Patients' Hearts with Dhamma",
    authors: ["พระเทพสุวรรณเมธี (สุชาติ กิตฺติปญฺโญ)", "สุพิชฌาย์ พรพิชณรงค์"],
    facultyPersonnel: "พระธรรมวชิราจารย์, รศ.ดร.",
    facultyRole: "ผู้อำนวยการมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสารสันติศึกษาปริทรรศน์ มจร",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๗",
    issue: "๖",
    yearBE: 2562,
    yearCE: 2019,
    pages: "๑๗๘๖-๑๗๙๖",
    database: "TCI-ThaiJO",
    externalUrl: "https://so03.tci-thaijo.org/index.php/journal-peace",
    abstractSummary: "ศึกษารูปแบบการทำงานของพระคิลานธรรมในการให้การบริบาลจิตวิญญาณ (Spiritual Care) แก่ผู้ป่วยระยะท้ายในโรงพยาบาลด้วยพุทธธรรม",
    keywords: ["คิลานธรรม", "เยียวยาใจผู้ป่วย", "จิตอาสา", "สันติศึกษาปริทรรศน์ TCI 1"]
  },

  // ==========================================
  // ๔. ดร.ธนสิทธิ์ ฉัตรสุวรรณ (Dr. Thanasit Chatsuwan)
  // ==========================================
  {
    id: "PUB-2567-TSC-001",
    title: "กะเทยในคัมภีร์พุทธศาสนา",
    titleEn: "Kathoey in Buddhist Scriptures",
    authors: ["ธนสิทธิ์ ฉัตรสุวรรณ"],
    facultyPersonnel: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารศิลปะและไทยศึกษา มหาวิทยาลัยศิลปากร",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๔๗",
    issue: "๒",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๑๑๒-๑๓๕",
    database: "TCI-ThaiJO",
    externalUrl: "https://so04.tci-thaijo.org/index.php/jarts",
    abstractSummary: "การศึกษาวิเคราะห์ความหมาย บริบททางสังคม และทัศนะของคัมภีร์พระไตรปิฎกและอรรถกถาต่อความหลากหลายทางเพศในประวัติศาสตร์พุทธศาสนา",
    keywords: ["กะเทยในคัมภีร์", "ความหลากหลายทางเพศ", "ศิลปะและไทยศึกษา", "TCI 1"]
  },
  {
    id: "PUB-2567-TSC-002",
    title: "บัณเฑาะก์กับการบวชเป็นภิกษุในพุทธศาสนา",
    titleEn: "Pandaka and Ordination as a Bhikkhu in Buddhism",
    authors: ["ธนสิทธิ์ ฉัตรสุวรรณ"],
    facultyPersonnel: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารมนุษยศาสตร์สาร มหาวิทยาลัยเชียงใหม่",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๒๕",
    issue: "๑",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๑๕๐-๑๗๔",
    database: "TCI-ThaiJO",
    externalUrl: "https://so03.tci-thaijo.org/index.php/human",
    abstractSummary: "ศึกษาวิเคราะห์พุทธบัญญัติในพระวินัยปิฎกเรื่องข้อห้ามและข้อกำหนดในการอุปสมบทของบุคคลกลุ่มบัณเฑาะก์อย่างลึกซึ้งตามหลักภาษาบาลี",
    keywords: ["บัณเฑาะก์", "การอุปสมบท", "พระวินัยปิฎก", "มนุษยศาสตร์สาร มช. TCI 1"]
  },
  {
    id: "PUB-2567-TSC-003",
    title: "เพศวิถีกับผู้หลุดพ้นในพุทธศาสนาเถรวาท",
    titleEn: "Sexuality and the Liberated Ones in Theravada Buddhism",
    authors: ["ธนสิทธิ์ ฉัตรสุวรรณ"],
    facultyPersonnel: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารมนุษยวิทยา ศูนย์มานุษยวิทยาสิรินธร",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๗",
    issue: "๑",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๘๕-๑๐๘",
    database: "TCI-ThaiJO",
    externalUrl: "https://so06.tci-thaijo.org/index.php/anthro",
    abstractSummary: "การตีความมิติเพศวิถีข้ามพ้นสภาวะทางกายภาพสู่ความหลุดพ้นแห่งจิตตามคัมภีร์เถรวาท",
    keywords: ["เพศวิถี", "ความหลุดพ้น", "ศูนย์มานุษยวิทยาสิรินธร", "TCI 2"]
  },
  {
    id: "PUB-2566-TSC-004",
    title: "การสร้างภราดรภาพในสังคมพหุวัฒนธรรม : มุมมองจากพุทธศาสนา",
    titleEn: "Building Fraternity in a Multicultural Society: A Buddhist Perspective",
    authors: ["ธนสิทธิ์ ฉัตรสุวรรณ"],
    facultyPersonnel: "ดร.ธนสิทธิ์ ฉัตรสุวรรณ",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารพุทธศาสน์ศึกษา จุฬาลงกรณ์มหาวิทยาลัย",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๓๐",
    issue: "๒",
    yearBE: 2566,
    yearCE: 2023,
    pages: "๔๕-๖๘",
    database: "TCI-ThaiJO",
    externalUrl: "https://so04.tci-thaijo.org/index.php/buddhist",
    abstractSummary: "รายงานผลวิจัยทุนอุดหนุน สกสว. ด้านการสร้างความสมานฉันท์และการอยู่ร่วมกันอย่างสันติในสังคมพหุวัฒนธรรมด้วยหลักพุทธธรรม",
    keywords: ["ภราดรภาพ", "พหุวัฒนธรรม", "จุฬาลงกรณ์มหาวิทยาลัย", "TCI 2"]
  },

  // ==========================================
  // ๕. พระมหาเสฏฐวุฒิ วชิรญาโณ, ดร., ป.ธ.๙
  // ==========================================
  {
    id: "PUB-2567-STW-001",
    title: "การสังเคราะห์ความรู้ระบบการจัดการพื้นที่และเครือข่ายสุขภาวะเพื่อพัฒนาคุณภาพชีวิตตามแนวพระพุทธศาสนา",
    titleEn: "Knowledge Synthesis of Spatial Management Systems and Health Networks for Quality of Life Development according to Buddhism",
    authors: ["พระมหาเสฏฐวุฒิ วชิรญาโณ (ปาสวน)", "วุฒินันท์ กันทะเตียน"],
    facultyPersonnel: "พระมหาเสฏฐวุฒิ วชิรญาโณ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารบัณฑิตแสงโคมคำ (Journal of SaengKhomKham Buddhist Studies)",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๙",
    issue: "๒",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๑๑๕-๑๓๒",
    database: "TCI-ThaiJO",
    externalUrl: "https://so02.tci-thaijo.org/index.php/jsbs",
    abstractSummary: "สังเคราะห์องค์ความรู้เชิงระบบในการบริหารจัดการพื้นที่วัดและชุมชนให้เป็นแหล่งส่งเสริมสุขภาพกายและสุขภาพจิตตามแนวพุทธ",
    keywords: ["สุขภาวะชุมชน", "พื้นที่สุขภาวะ", "บัณฑิตแสงโคมคำ", "TCI 1"]
  },
  {
    id: "PUB-2568-STW-002",
    title: "มหาวิทยาลัยสุขภาพ : การสร้างเสริมด้วยแนวคิดและหลักการทางพระพุทธศาสนา",
    titleEn: "Healthy University: Promotion through Buddhist Concepts and Principles",
    authors: ["พระมหาเสฏฐวุฒิ วชิรญาโณ (ปาสวน)", "วุฒินันท์ กันทะเตียน"],
    facultyPersonnel: "พระมหาเสฏฐวุฒิ วชิรญาโณ, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสารวิจยวิชาการ",
    journalTier: "TCI กลุ่ม ๑",
    volume: "๘",
    issue: "๖",
    yearBE: 2568,
    yearCE: 2025,
    pages: "๔๕-๖๐",
    database: "TCI-ThaiJO",
    externalUrl: "https://so06.tci-thaijo.org/",
    abstractSummary: "การพัฒนารูปแบบสถาบันอุดมศึกษาให้เป็นมหาวิทยาลัยส่งเสริมสุขภาพทั้งทางกาย วาจา และใจแก่นิสิตและบุคลากร",
    keywords: ["มหาวิทยาลัยสุขภาพ", "สุขภาวะเชิงพุทธ", "วิจยวิชาการ", "TCI 1"]
  },

  // ==========================================
  // ๖. รศ.ดร.เวทย์ บรรณกรกุล
  // ==========================================
  {
    id: "PUB-2566-VET-001",
    title: "วิเคราะห์หลักอัปปมาทธรรมตามแนวเนตติปกรณ์",
    titleEn: "Analysis of Appamada Dhamma according to the Nettipakarana Approach",
    authors: ["สุภีร์ ทุมทอง", "อาณัติชัย เหลืองอมรชัย", "พระศรีวินยาภรณ์", "เวทย์ บรรณกรกุล"],
    facultyPersonnel: "รศ.ดร.เวทย์ บรรณกรกุล",
    facultyRole: "อาจารย์ผู้รับผิดชอบหลักสูตรบัณฑิตศึกษา",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสาร มจร บาฬีศึกษาพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๙",
    issue: "๑",
    yearBE: 2566,
    yearCE: 2023,
    pages: "๙๖-๑๑๔",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa",
    abstractSummary: "ศึกษาระเบียบวิธีวิเคราะห์ความไม่ประมาท (อัปปมาทะ) ตามโครงสร้าง ๑๖ หาระ และ ๕ นัย แห่งคัมภีร์เนตติปกรณ์โบราณ",
    keywords: ["อัปปมาทธรรม", "เนตติปกรณ์", "๑๖ หาระ", "บาฬีศึกษาพุทธโฆสปริทรรศน์"]
  },
  {
    id: "PUB-2564-VET-002",
    title: "วิเคราะห์คำสอนวิปัสสนาในเตภูมิกถาที่มีผลต่อคตินิยมเชิงพุทธในสังคมไทย",
    titleEn: "Analysis of Vipassana Teachings in Traibhumikatha Influencing Buddhist Beliefs in Thai Society",
    authors: ["ชัยชาญ ศรีหานู", "พระครูปลัดสัมพิพัฒนธรรมาจารย์", "วิโรจน์ คุ้มครอง", "เวทย์ บรรณกรกุล"],
    facultyPersonnel: "รศ.ดร.เวทย์ บรรณกรกุล",
    facultyRole: "อาจารย์ผู้รับผิดชอบหลักสูตรบัณฑิตศึกษา",
    articleType: "บทความวิจัย (Research Article)",
    journal: "วารสาร มจร บาฬีศึกษาพุทธโฆสปริทรรศน์",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๗",
    issue: "๑",
    yearBE: 2564,
    yearCE: 2021,
    pages: "๑๓-๒๖",
    database: "TCI-ThaiJO",
    externalUrl: "https://so05.tci-thaijo.org/index.php/Palisueksabuddhaghosa",
    abstractSummary: "วิเคราะห์อิทธิพลของคัมภีร์เตภูมิกถาต่อการทำความเข้าใจเรื่องวัฏสงสารและขั้นตอนการปฏิบัติวิปัสสนาในประวัติศาสตร์พุทธศาสนาไทย",
    keywords: ["เตภูมิกถา", "วิปัสสนา", "คตินิยมเชิงพุทธ", "TCI 2"]
  },

  // ==========================================
  // ๗. พระมหาทรงชัย วิชยเภรี, ดร., ป.ธ.๙
  // ==========================================
  {
    id: "PUB-2567-SNC-001",
    title: "วิธีการอ่านภาษาบาลีเบื้องต้น",
    titleEn: "Methods of Elementary Pali Reading",
    authors: ["พระมหาทรงชัย วิชยเภรี (ศิริ)"],
    facultyPersonnel: "พระมหาทรงชัย วิชยเภรี, ดร.",
    facultyRole: "อาจารย์ประจำ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    articleType: "บทความวิชาการ (Academic Article)",
    journal: "วารสารเสียงธรรมจากมหายาน",
    journalTier: "TCI กลุ่ม ๒",
    volume: "๑๐",
    issue: "๑",
    yearBE: 2567,
    yearCE: 2024,
    pages: "๕๕-๖๘",
    database: "TCI-ThaiJO",
    externalUrl: "https://so09.tci-thaijo.org/index.php/nsc",
    abstractSummary: "สังเคราะห์หลักและทฤษฎีการออกเสียงอักขระฐานกรณ์ภาษาบาลีตามคัมภีร์สัททนีติและปทรูปสิทธิ สำหรับผู้เริ่มต้นศึกษาบาลีศากยบุตร",
    keywords: ["การอ่านภาษาบาลี", "ฐานกรณ์", "คัมภีร์สัททนีติ", "เสียงธรรมจากมหายาน"]
  }
];

/**
 * สถิติสรุปผลงานตีพิมพ์ทางวิชาการ
 */
export const facultyPublicationStats = {
  totalPublications: facultyPublications.length,
  scopusCount: facultyPublications.filter(p => p.journalTier === "Scopus Q1").length,
  tci1Count: facultyPublications.filter(p => p.journalTier === "TCI กลุ่ม ๑").length,
  tci2Count: facultyPublications.filter(p => p.journalTier === "TCI กลุ่ม ๒").length,
  researchCount: facultyPublications.filter(p => p.articleType.includes("บทความวิจัย")).length,
  academicCount: facultyPublications.filter(p => p.articleType.includes("บทความวิชาการ")).length,
  facultyCount: Array.from(new Set(facultyPublications.map(p => p.facultyPersonnel))).length,
  globalDatabases: ["TCI-ThaiJO (Thailand)", "Scopus (Elsevier)", "Google Scholar", "Chulalongkorn University Index", "Silpakorn Index"]
};
