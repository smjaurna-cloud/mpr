# Project Progress Tracker
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**บันทึกสถานะการพัฒนาระบบสด (Living State & Active Pointer)**

---

## 1. Overall Status
- **Current Milestone:** Enterprise Buddhist College ERP System (23 Full Modules Complete)
- **Active User:** `somboon` (Super Administrator: `smjaurna@gmail.com`, เบอร์โทร: `099-445-4256`)
- **Status:** ✅ Production Build Ready & Verified (38/38 Static & Dynamic Pages Prerendered Successfully)
- **Health:** 🟢 Excellent (Zero Errors, Strict Mode Type-Checked)
- **Verified Date:** 2026-09-10
- **System Theme:** Sacred Royal Heritage (พุทธศิลป์โมเดิร์น: Royal Gold #C5A059, Civara Saffron, Midnight Navy, Warm Ivory)

---

## 2. Active Pointer for AI Agents
* **Current Completed Tasks:** 
  - TASK-001 ถึง TASK-503 (Core Modules 1–5): วิถีชีวิต 24 ชม., ภัตตาหาร & โยมอุปถัมภ์, มุขปาฐะบาลี, สารบรรณมือถือ, MCU Bridge ทะเบียนสงฆ์
  - TASK-601: User & Identity Management (MOD-06: `/users`) ครบถ้วน 100%
  - TASK-701: Smart Meeting Room & Conference Management (MOD-07: `/meeting-rooms`) ครบถ้วน 100%
  - TASK-801: เพิ่มบัญชีผู้ดูแลระบบหลัก `somboon` พร้อมสิทธิ์ Super Admin เต็มรูปแบบ
  - TASK-901: ระบบบริหารงานบุคคล (MOD-08: `/hr`) - อัตรากำลัง ๔๒ อัตรา บรรพชิตและคฤหัสถ์
  - TASK-902: ระบบการเงินบัญชีและพัสดุ (MOD-09: `/finance-procurement`) - ๓ กองทุนสงฆ์และคลังสังฆภัณฑ์
  - TASK-903: ระบบแผนงบประมาณ (MOD-10: `/planning-budget`) - ยุทธศาสตร์ ๕ ปี และตัวชี้วัด KPI มจร
  - TASK-904: ระบบห้องสมุดและสารสนเทศ (MOD-11: `/library`) - คลังพระไตรปิฎก ๔๕ เล่ม และคัมภีร์บาลีโบราณ
  - TASK-905: ระบบงานวิจัยและคุณภาพการศึกษา (MOD-12: `/research-qa`) - งานวิจัยพุทธศาสตร์ และเกณฑ์ AUN-QA / EdPEx
  - TASK-906: ระบบบริการการศึกษา (MOD-13: `/academic-services`) - ตารางเรียนบาลีศากยบุตร และโครงการบริการวิชาการชุมชน
  - TASK-907: บูรณาการโปรเจกต์ `D:\mpr` ผสาน Design System อัตลักษณ์ราชวิทยาลัย "Sacred Royal Heritage" เพิ่ม `A4CertificateModal` ใบอนุโมทนาบัตรทองคำ A4 สรรพากร ๒ เท่า และซิงค์ฐานข้อมูล Prisma SQLite (`dev.db`) สมบูรณ์
  - TASK-908: กำหนดค่า Git Repository ใน `D:\mpr`, เพิ่ม `.gitignore` คุ้มครองความปลอดภัย (ตัด node_modules, database, zip), ผูก Remote `https://github.com/smjaurna-cloud/mpr.git` และทำ Initial Commit สำเร็จ
  - TASK-909: สร้างสคริปต์อัตโนมัติ [push_to_github.bat](file:///d:/mpr/push_to_github.bat) อำนวยความสะดวกให้ผู้ดูแลระบบคลิกอัปโหลดขึ้น GitHub ได้ทันที
  - TASK-910: ยืนยันการสำรองข้อมูลขึ้น GitHub ครบถ้วน รวมถึงเอกสาร Context Memory ทั้ง ๖ ไฟล์ (PRD, AGENTS, architecture, implementation-plan, schema, progress)
  - TASK-911: นำเข้าบัญชีรายชื่อบุคลากรทางการ ๓๖ อัตรา + ๑ ตำแหน่งว่าง จาก `เอกสารบุคคล มบร.xlsx` เข้าสู่ระบบบริหารงานบุคคล (MOD-08: `/hr`) ครบ ๔ กลุ่มงาน พร้อมเลขที่ตำแหน่งทางการ มุมมองตารางราชการและมุมมองการ์ด
  - TASK-912: ระบบผังห้องเรียน ๖ ห้องเรียน (A 1 – A 6) และการจัดชั้นเรียนบาลีสนามหลวง & นักธรรม (`/classrooms`) ครบถ้วนตามเอกสารทางการ ๑๓ หน้า จัดสรรอาจารย์ผู้สอน, บัญชีรายชื่อสามเณร ๒ สายวิชา, ระบบคุ้มครองข้อมูล PDPA สำหรับผู้เยาว์, กฎระเบียบห้องเรียน และตารางเวรทำความสะอาด
  - TASK-913: บูรณาการกรอบงบประมาณรายจ่ายประจำปี พ.ศ. ๒๕๖๙ ตัวจริง (๘๑,๓๙๓,๙๐๐ บาท) เข้าสู่ระบบวางแผนและงบประมาณ (`/planning-budget`) ครบถ้วนตามเอกสารทางการ ๔ หน้า จำแนก ๓ แผนงานหลัก (บุคลากร, พัฒนาศักยภาพคน, วิจัยและนวัตกรรม), งบแผ่นดิน (๓๔.๗๑ ลบ.), งบรายได้ มจร (๔๖.๖๘ ลบ.), งบลงทุนสำคัญ (หอประชุม ๒๔.๘๖ ลบ., Solar Rooftop ๓ อาคาร ๗.๕๖ ลบ., ภูมิทัศน์ ๕.๕ ลบ., พุทธปัญญาประดิษฐ์ BAI, สังคายนานานาชาติ), ลายเซ็นรับรองสงฆ์ และปุ่มพิมพ์รายงาน
  - TASK-914: ระบบหลักสูตรระดับบัณฑิตศึกษา มคอ.๒ (`/graduate-curriculum`) จัดระเบียบไฟล์เอกสาร มคอ.๒ ทั้ง ๓ เล่ม (๓๙๙ หน้า) ใน `docs/curriculum/` และ `public/curriculum/` นำเข้าข้อมูลหลักสูตร พธ.ด. พระไตรปิฎกเถรวาท (๔๘ หน่วยกิต), พธ.ม. พระไตรปิฎกเถรวาท (๓๖ หน่วยกิต), พธ.ม. พระอภิธรรมปิฎก (๓๖ หน่วยกิต), โครงสร้าง ๕๓ รายวิชา, คณาจารย์ผู้รับผิดชอบ, PLOs และปุ่มดาวน์โหลด/เปิดอ่าน PDF ออนไลน์
  - TASK-915: บูรณาการและจัดระเบียบเอกสารประวัติคณาจารย์ประจำหลักสูตรบัณฑิตศึกษา (`docs/faculty/`) จัดเก็บไฟล์ประวัติทางการ ๔ ท่าน (พระธรรมวชิราจารย์ รศ.ดร., รศ.ดร.เวทย์ บรรณกรกุล, ผศ.ดร.สุพิชฌาย์ พรพิชณรงค์, พระมหาเสฏฐวุฒิ วชิรญาโณ ดร. ป.ธ.๙) สร้างสารบัญ `docs/faculty/README.md` และปรับปรุงข้อมูลคณาจารย์ผู้รับผิดชอบในโมดูลหลักสูตรบัณฑิตศึกษาครบถ้วนสมบูรณ์
  - TASK-916: บูรณาการเอกสารประวัติและผลงานคณาจารย์เพิ่มเติมครบ ๘ รูป/ท่าน (เพิ่ม ดร.ธนสิทธิ์ ฉัตรสุวรรณ, พระมหาทรงชัย วิชยเภรี ดร., ดร.สมบูรณ์ จารุณะ, พระมหาศุภวัฒน์ ฐานวุฑฺโฒ ดร.), ยกระดับหน้า `/graduate-curriculum` แสดงประวัติการศึกษา ความเชี่ยวชาญ และปุ่มเปิดอ่าน/ดาวน์โหลดไฟล์ประวัติ (.pdf / .docx) พร้อมสร้างคลังดาวน์โหลดใน `public/faculty/`
  - TASK-917: จัดเก็บและบูรณาการร่างบันทึกข้อตกลงความร่วมมือทางวิชาการ (MOU) ระหว่าง มจร กับ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.) ด้านการวิจัยและพัฒนาพุทธปัญญาประดิษฐ์ (Buddhist AI: BAI) ที่ผ่านการตรวจจากกองนิติการ มจร ใน `docs/mou/` และเพิ่มแท็บแสดงรายละเอียดความร่วมมือในระบบงานวิจัยและประกันคุณภาพการศึกษา (`/research-qa`) พร้อมปุ่มดาวน์โหลดร่างเอกสารทางการ
  - TASK-918: ระบบบริหารยานพาหนะและขอใช้รถส่วนกลาง (MOD-16: `/vehicle-booking`) นำเข้าข้อมูลทางการรถส่วนกลาง ๑๐ คัน จากเอกสารสถาบัน จัดเก็บใน `docs/vehicles/` และ `public/vehicles/` พร้อมคู่มือ `README.md` กำหนดโครงสร้างข้อมูล `src/data/vehicleData.ts` รองรับระบบจองรถ ๓ แท็บ (ภาพรวมยานพาหนะ ๑๐ คัน, รายการจองและอนุมัติ, ไทม์ไลน์การใช้รถ), ฟอร์มจองรถใหม่พร้อมตรวจสอบพระวินัย (เพลก่อน ๑๑:๐๐ น., สัดส่วนภิกษุ/สามเณร/คฤหัสถ์), แบบฟอร์มใบขอใช้รถราชการพิมพ์ได้ A4 ทางการ พร้อมเชื่อมโยงเมนูใน Sidebar
  - TASK-919: นำเข้าทะเบียนรายชื่อพระภิกษุ ๒๐ รูป และสามเณร ๑๒๓ รูป ที่มีอยู่จริง รวม ๑๔๓ รูป จาก `รายชื่อพระภิกษุและสามเณรวัดบาลีเถรวาทสังฆาราม.xlsx` สู่ `src/data/sanghaData.ts` และ `src/data/mockData.ts` พร้อมระบุสัญชาติ/กลุ่มชนชาติ (ไทย ๙๙ รูป, ชาคมาบังกลาเทศ ๗ รูป, บารูอา ๘ รูป, สปป.ลาว ๔ รูป, ศรีลังกา ๔ รูป, พระภิกษุต่างชาติ ๑ รูป) พัฒนาหน้า `/monastic-life` รองรับการดูทำเนียบสงฆ์และดาวน์โหลดไฟล์จริง และจัดทำระบบคลังเอกสารราชการจริงทั้งระบบ (`src/data/officialDocumentsData.ts`) ใน `/library` (๑๗ รายการตรงตามชื่อไฟล์จริง) พร้อมเชื่อมโยงปุ่มดาวน์โหลดเอกสารจริงตรงใน `/planning-budget` (งบ ๖๙ PDF), `/classrooms` (จัดห้องเรียน PDF), `/hr` (เอกสารบุคคล XLSX), และ `/monastic-life` (ทะเบียนสงฆ์ XLSX)
  - TASK-920: ศูนย์รับเรื่องร้องเรียน QR Code และระบบติดตามภารกิจราชการรวมศูนย์ทุกระบบ (MOD-17: `/complaints-tracking`) ศึกษาและบูรณาการมาตรฐานเว็บไซต์ทางการ `https://palitheravada.mcu.ac.th/` พัฒนาระบบรับเรื่องร้องเรียน e-Complaint Center พร้อมระบบสร้าง QR Code อัตโนมัติ (qrcode library) รองรับการสแกนด้วยโทรศัพท์มือถือ, ฟอร์มยื่นเรื่องแบบระบุตัวตนและไม่ประสงค์ระบุตัวตน (Anonymous) ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) และพระวินัย, ระบบพิมพ์ป้ายประชาสัมพันธ์ QR Code ขนาด A4 (Standee Notice) ติดบอร์ด/กุฏิ/อาคารเรียน, ระบบติดตามสถานะคำร้องและภารกิจราชการรวมศูนย์ทุกระบบ (Unified Task Tracker) ครอบคลุม ๗ ระบบ (CMP-, VB-, DOC-, MTG-, ACAD-, ALM-, PRJ-) พร้อมพิมพ์ใบติดตามงาน (Official Tracking Slip) และ Stepper Timeline ๔ ขั้นตอน, กระดานข่าวสารและประกาศจัดซื้อจัดจ้าง e-Bidding ตัวจริง (Solar Rooftop ๒.๕๖ ลบ., หอประชุม ๒๔.๘๖ ลบ.), และประตูบริการดิจิทัลส่วนกลาง มจร (MCU REG, LessPaper2, e-Thesis, PTRJ ThaiJO, MCU SAS, ITA) ครบถ้วน ๑๐๐%
  - TASK-921: ระบบสถิติข้อมูลผู้เข้าเยี่ยมชมและทราฟฟิกสารสนเทศ (MOD-18: `/visitor-analytics`) ติดตามยอดผู้เข้าชมสด (Real-time Live Online: ๔๒ รูป/คน), สถิติรายวัน (๑,๔๒๘), เดือนนี้ (๓๘,๙๒๐), ยอดสะสม (๑๒๘,๔๕๐), แหล่งที่มาของทราฟฟิก (สแกน QR Code ๓๔%, Google ๒๘%, MCU Portal ๒๑%, Social ๑๒%), สัดส่วนอุปกรณ์ (Mobile ๖๘.๔%, Desktop ๒๖.๘%, Tablet ๔.๘%), สถิติผู้เข้าชมตามจังหวัดและต่างประเทศ (นครปฐม, กทม., บังกลาเทศ ชาคมา/บารูอา, ศรีลังกา, สปป.ลาว, พม่า), กราฟแท่งเปรียบเทียบ ๗ วันและช่วงเวลาพีกรายชั่วโมง, ตาราง ๘ หน้าเพจยอดนิยม, ส่งออกรายงานสถิติ CSV, และวิดเจ็ตแสดงยอดผู้เข้าชมสด VisitorCounterBadge บน Navbar เชื่อมโยงทุกหน้า
  - TASK-922: ระบบแชตบอร์ด กระดานสนทนาธรรม และห้องแชตสดรวม (MOD-19: `/chat-board`) พัฒนากระดานสนทนา ๔ หมวดหมู่หลัก (สนทนาธรรมและบาลีศึกษา, ข่าวสารและกิจวัตรวิทยาลัย, ศูนย์ช่วยเหลือไอทีและระบบ ERP, มุมศรัทธาสาธุชนและโยมอุปถัมภ์), ระบบตั้งกระทู้ใหม่, ตอบกระทู้, และปุ่มอนุโมทนา/สาธุ 🙏 (Sadhu Reaction), ห้องแชตสด (Live Chat Room) โต้ตอบทันที พร้อมแสดงสมาชิกออนไลน์ ๗ รูป/คน, บอทตอบคำถามอัตโนมัติ MCU Pali Bot อ้างอิงข้อมูลสถาบัน, และศูนย์ควบคุมและตรวจสอบความสุภาพตามพระวินัย (Moderation Panel) ปักหมุด/ลบกระทู้ และตัวกรองคำสุภาพ (Monastic Decorum Filter) ครบถ้วน ๑๐๐%
  - TASK-923: ปรับปรุงสถาปัตยกรรมและข้อมูลระบบตามผลการตรวจ Audit รอบสมบูรณ์ (Production Pilot v1.2)
    * Data Reconciliation & Single Source of Truth: ซิงค์จำนวนสามเณร ๑๒๓ รูป + พระภิกษุ ๒๐ รูป = รวมสังฆะ ๑๔๓ รูป ตรงกันทุกหน้า, อัปเดตสถิติทำวัตรเช้า ๑๔๐/๑๔๓ รูป (๙๘%) พักฟื้น ๒ รูป, บูรณาการยอดงบประมาณทางการปี ๒๕๖๙ (๘๑,๓๙๓,๙๐๐ บาท หรือ ๘๑.๓๙ ลบ.) และปรับป้ายสถานะระบบเป็น "เวอร์ชันนำร่องใช้งานจริง (Production Pilot v1.2) กำลังบูรณาการฐานข้อมูลกลาง"
    * Performance & DOM Optimization: แก้ไขปัญหาปุ่มเช็กกิจวัตร ๖๐๐+ ปุ่มใน `/monastic-life` โดยติดตั้งระบบแบ่งหน้า Pagination (๑๒ รูป/หน้า) พร้อมแท็บกรองตามห้องเรียนบาลี A1 ถึง A6 ลดภาระ DOM กว่า 85%
    * Confirmation Modals & Safety Safeguards: เพิ่ม Modal ยืนยันก่อนระงับ/เปิดใช้งานบัญชีผู้ใช้ใน `/users` และ Modal ยืนยันก่อนลงนามอนุมัติ/ตีกลับคำสั่งใน `/e-approval` ป้องกันความผิดพลาด
    * PDPA & Monastic Privacy: เพิ่มระบบซ่อนเบอร์โทรศัพท์โยมอุปถัมภ์ใน `/alms-patron` (`081-xxx-4256`) พร้อมปุ่มสลับมุมมองเจ้าหน้าที่ และปกป้องข้อมูลเวชระเบียนสามเณรใน `/monastic-life`
    * Interactive Modals & CSV Export: เพิ่มฟังก์ชันส่งออก CSV ในหน้า `/monastic-life`, `/alms-patron`, `/mukhopatha`, `/users` และเชื่อมปุ่มเปิดใบอนุโมทนาบัตรทองคำทันทีหลังจองเพล
  - TASK-924: พัฒนาระบบติดตามความก้าวหน้าผลงานและดุษฎีนิพนธ์/วิทยานิพนธ์ของนิสิตระดับบัณฑิตศึกษา (MOD-20: `/graduate-progress`) ถอดแบบจากกระดานรายงานความก้าวหน้าจริงของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย ครอบคลุม:
    * ข้อมูลจริง ๑๐๐%: นิสิตระดับปริญญาเอก (พธ.ด. พระไตรปิฎกเถรวาท รุ่นที่ ๑) ๒๖ รูป/คน กับ ๒๑ ขั้นตอนหมุดหมาย และนิสิตระดับปริญญาโท (พธ.ม. พระไตรปิฎกเถรวาท รุ่นที่ ๑) ๘ รูป/คน กับ ๑๕ ขั้นตอนหมุดหมาย
    * ถอดแบบหน้ากระดานบอร์ด Matrix: หัวตารางแนวตั้ง สีกระดานตามของจริง (พธ.ด. แดงเลือดนก พธ.ม. น้ำเงินกรมท่า) ติ๊กถูก `✓` แสดงสถานะความสำเร็จตามกระดานจริง และคำนวณ % ความก้าวหน้าอัตโนมัติ
    * โหมดผู้ดูแลระบบ (Admin Edit Toggle): สำหรับ `Somboon Admin` สามารถคลิกสลับสถานะผ่าน/ยังไม่ผ่านในแต่ละขั้นตอนได้ทันที พร้อมบันทึกลง LocalStorage
    * ฟังก์ชันอัจฉริยะ: ค้นหาตามชื่อ-ฉายา-นามสกุล, กรองตามขั้นตอนสำคัญ (ผ่านโครงร่าง, ปฏิบัติธรรมวิปัสสนา, ผ่าน QE), สลับมุมมองบอร์ดและมุมมองการ์ด, Modal รายละเอียดหมุดหมายครบ ๕ หมวด
    * การส่งออกและการพิมพ์: ส่งออก Excel CSV ด้วย UTF-8 BOM รองรับภาษาไทย 100% และโหมดพิมพ์ A4 แนวนอน (Landscape) สำหรับพิมพ์ติดบอร์ดประกาศสถาบัน
  - TASK-925: ศูนย์บริการข้อมูลและช่องทางติดต่อราชการตามระบบมาตรฐานสถาบันอุดมศึกษาและเกณฑ์ ITA (MOD-21: `/contact`) ครอบคลุม:
    * ข้อมูลติดต่อทางการสถาบัน: วัดบาลีเถรวาทสังฆาราม กำแพงแสน นครปฐม, พิกัดภูมิศาสตร์ GPS (14.0325° N, 99.9856° E), แผนที่ดาวเทียม Google Maps Interactive, เส้นทางการเดินทาง ๓ รูปแบบ (รถยนต์ส่วนตัว, รถตู้ประจำทางสาย ๘๐, รถไฟ) และทำเนียบแผนผัง ๗ อาคารหลัก
    * ทำเนียบหมายเลขภายใน ๘ ฝ่ายงานทางการ (สำนักงานผู้อำนวยการ, สำนักวิชาการ/ทะเบียน, ฝ่ายปกครอง/พระพี่เลี้ยง ๒๔ ชม., ฝ่ายบริหารบุคคล/สารบรรณ, การเงิน/พัสดุ, ศูนย์โภชนาการ/ภัตตาหารเพล, ศูนย์ไอที/พุทธปัญญาประดิษฐ์ BAI, หน่วยปฐมพยาบาลสงฆ์ ๒๔ ชม.) พร้อมระบบค้นหา, เบอร์ต่อ, เบอร์ตรง, อีเมล และรายการงานบริการ
    * สื่อสังคมออนไลน์ & ดิจิทัล: LINE Official `@palitheravada` พร้อมปุ่ม Add Friend และกล่อง QR Code, Facebook Fanpage (๒๘,๙๐๐ ผู้ติดตาม), YouTube Channel (๑๕,๒๐๐ สมาชิก), เว็บไซต์หลัก palitheravada.mcu.ac.th และพอร์ทัล มจร วังน้อย
    * แบบฟอร์มติดต่อสอบถามออนไลน์และ Q&A (เกณฑ์ ITA O5) พร้อมระบบสร้างรหัสตั๋วอัตโนมัติ `INQ-2569-xxx`, ระบบค้นหาและตรวจสอบสถานะคำร้อง (Ticket Tracking) พร้อม Stepper ๓ ขั้นตอน (รับเรื่อง -> กำลังตรวจ -> ตอบกลับ)
    * ท้ายเว็บทางการระดับสถาบันอุดมศึกษา (Global Institutional Footer: `Footer.tsx`): ๔ คอลัมน์มาตรฐาน ข้อมูลที่ตั้ง เวลาทำการราชการ เวลาถวายภัตตาหารเพล ลิงก์ด่วน และเครื่องหมายรับรอง ITA / PDPA Compliant ติดตั้งทั่วทั้งระบบ
    * วิดเจ็ตโทรด่วนลอยหน้าจอ (Floating Quick Contact Speed-Dial: `QuickContactSpeedDial.tsx`): เมนูปุ่มลอยมุมขวาล่าง โทรเบอร์กลาง, สายด่วน ๒๔ ชม., LINE Official, แผนที่ GPS, ส่งข้อความ
    * Backend API (`src/app/api/contact/route.ts`): รองรับ GET ข้อมูลติดต่อ/ค้นหาตั๋ว, POST ส่งข้อความติดต่อพร้อมสร้าง Ticket Code, PATCH อัปเดตสถานะคำร้อง
  - TASK-926: ระบบเปิดอ่านเอกสารราชการและพรีวิวไฟล์งานอัจฉริยะ (MOD-22: `/file-viewer`) และโมดอลพรีวิวรวมศูนย์ (`DocumentViewerModal.tsx`):
    * ระบบแปลงและแสดงผลเอกสาร Word (DOCX): ใช้ `mammoth` สกัดโครงสร้าง HTML แปลงเอกสารเป็นมุมมองหน้ากระดาษทางการ จัดระเบียบหัวข้อ ย่อหน้า และตารางข้อมูลสีทองสง่างาม พร้อมลายน้ำตราสัญลักษณ์ วส. มจร
    * ระบบแสดงผลสเปรดชีต Excel (XLSX): ใช้ `xlsx` แปลงข้อมูลเป็นตาราง Spreadsheet Interactive รองรับการสลับชีต ค้นหาข้อมูลในตาราง และแถบระบุเลขแถว/คอลัมน์
    * ระบบแสดงผลเอกสาร PDF: ฝัง PDF Viewer แสดงผลหน้ากระดาษแบบอินเตอร์แอคทีฟ พร้อมปุ่มเปิดเต็มจอและพิมพ์เอกสาร
    * แถบเครื่องมือจัดการเอกสาร (Document Toolbar): ควบคุมการย่อ-ขยาย (Zoom: ๖๐% – ๑๕๐%), พิมพ์เอกสาร (Print), คัดลอกข้อความ (Copy Plain Text), ดาวน์โหลดไฟล์ต้นฉบับ, ขยายเต็มจอ (Fullscreen)
    * การรองรับไฟล์งานจริงทั้งระบบ (๑๘ รายการ): ตั้งค่าเริ่มต้นเปิดไฟล์ `อาคารสถานที่มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย.docx` (๑๗๗ ไร่เศษ, ๑๑ อาคาร), กรอบงบประมาณ ๒๕๖๙ (PDF), การจัดห้องเรียน (PDF), ทะเบียนสงฆ์ ๑๔๓ รูป (XLSX), อัตรากำลัง ๓๖ อัตรา (XLSX), มคอ.๒ (PDF), ประวัติคณาจารย์ (DOCX), MOU พุทธปัญญาประดิษฐ์ (DOCX)
    * การเปิดไฟล์ภายนอกจากเครื่องคอมพิวเตอร์ (Local File Opener): รองรับ Drag & Drop และการคลิกเลือกไฟล์ `.docx`, `.xlsx`, `.pdf`, `.csv`, `.txt` เพื่อแปลงและเปิดอ่านในเบราว์เซอร์ได้ทันที
    * Backend API (`src/app/api/file-viewer/route.ts`): รองรับทั้ง `GET` (ดึงไฟล์ในระบบตามชื่อ/รหัส) และ `POST` (รับไฟล์อัปโหลดจากผู้ใช้เพื่อแปลงผลสด)
    * บูรณาการข้ามโมดูล: เพิ่มปุ่ม "เปิดอ่านเอกสารทันที (DOCX)" ในหน้า `/contact`, อัปเกรดปุ่ม "เปิดอ่าน" ในหน้า `/library` ให้เปิดผ่าน DocumentViewerModal ทุกไฟล์, เพิ่มเมนูใน `Sidebar.tsx` (MOD-22), ผ่านการทดสอบ Next.js Production Build ๓๔/๓๔ routes สำเร็จ ๑๐๐%
  - TASK-927: ยกระดับมาตรฐานระบบสู่ระดับสมบูรณ์แบบสูงสุด (Full System Audit & Institutional Hardening) ตามข้อเสนอแนะการตรวจประเมินของ อาจารย์ ดร.สมบูรณ์ จารุณะ:
    * Data Consistency & Single Source of Truth: ซิงค์จำนวนสังฆะรวม ๑๔๓ รูป (แยกสามเณรศากยบุตร ๑๒๓ รูป และพระภิกษุ ๒๐ รูป ชัดเจนทุกจุด ไม่สับสน), ซิงค์ยอดงบประมาณแผ่นดินและรายได้ปี ๒๕๖๙ ๘๑.๓๙ ล้านบาท (๘๑,๓๙๓,๙๐๐ บาท), แปลงการแสดงผลวันที่เป็นปีพุทธศักราชและตัวเลขไทย (เช่น ๔ กันยายน ๒๕๖๙)
    * Complete 22 Modules Directory on Dashboard: ปรับปรุงหัวข้อสารบบงานราชวิทยาลัยบน Executive Cockpit ให้ครอบคลุมครบถ้วนทั้ง ๒๒ โมดูล แบ่งเป็น ๔ กลุ่มปีกงานสถาบัน (๑. ศูนย์อำนวยการ & วิถีศากยบุตร ๓ โมดูล, ๒. สำนักงานวิทยาลัย/ฝ่ายบริหาร ๖ โมดูล, ๓. สำนักวิชาการ/ฝ่ายวิชาการ ๔ โมดูล, ๔. สนับสนุน & สารสนเทศดิจิทัล ๙ โมดูล รวมถึง MOD-20 ความก้าวหน้าดุษฎีนิพนธ์, MOD-21 ติดต่อราชการ & แผนที่, MOD-22 เปิดอ่านเอกสาร)
    * SEO & Institutional Route Metadata: ติดตั้ง `layout.tsx` แยกเฉพาะรายโมดูลครบทั้ง ๒๓ เส้นทาง ให้มี `<title>` และคำอธิบายเฉพาะหน้า ไม่ซ้ำกัน, เพิ่ม OpenGraph, Twitter Cards, Canonical links, JSON-LD Structured Data (`EducationalOrganization` และ `WebSite`) ใน Root Layout, สร้าง `robots.ts` และ `sitemap.ts` (XML Sitemap อัตโนมัติ ๓๖ routes)
    * Enterprise Security & HTTP Headers: ติดตั้ง Security Headers ใน `next.config.ts` (Strict-Transport-Security, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy)
    * PDPA & Monastic Privacy Hardening: ปิดการแสดงรหัสผ่านในหน้าระบบบริหารผู้ใช้ (`/users`) โดยปกปิดด้วย `••••••••` เป็นค่าเริ่มต้น พร้อมปุ่มเปิด/ปิดดูรหัสผ่านอย่างปลอดภัย, พัฒนาศูนย์บันทึกประวัติการตรวจสอบรวม (`src/lib/auditLogger.ts`) รองรับ ISO/IEC 27001 และ PDPA
    * Accessibility (a11y): เพิ่ม `aria-label` ให้กับปุ่มและไอคอนที่ไม่มีข้อความกำกับทั่วระบบ (ปุ่มแจ้งเตือน Navbar, ปุ่ม Speed-Dial, ปุ่มย่อ/ขยาย/พิมพ์/คัดลอก/เต็มจอ/ปิด ใน Document Viewer)
    * Automated Test Suite & Production Build: สร้างชุดทดสอบอัตโนมัติ `tests/system-audit.test.mjs` ผ่านการทดสอบครบ ๓๓/๓๓ รายการ (100% Pass) และผ่านการตรวจสอบ Next.js Production Build ๓๖/๓๖ routes สำเร็จ ไร้ข้อผิดพลาด (0 errors)
  - TASK-928: ระบบศูนย์กลางอัปเดตและจัดการข้อมูลทุกระบบ (Centralized College Data Update & Management Hub / MOD-23: `/data-updater`) และโมดอลอัปเดตด่วนข้ามระบบ (`QuickDataUpdateModal.tsx`):
    * ขอบเขตครอบคลุม ๒๒ โมดูลหลัก (MOD-01 ถึง MOD-22): สร้างระบบทะเบียนเมทาดาทาและโครงสร้างฟิลด์ข้อมูล (`src/data/systemUpdaterData.ts`) รองรับการอัปเดตข้อมูลให้เป็นปัจจุบันครบทุกระบบตามข้อสั่งการ
    * ระบบสิทธิ์สองระดับ (Role-Based Admin Access & Persona Switcher):
      - Super Admin (อาจารย์ ดร.สมบูรณ์ จารุณะ / พระธรรมวชิราจารย์): สิทธิ์เข้าถึง ๑๐๐% สามารถอัปเดตและนำเข้าข้อมูลได้ทุกระบบของวิทยาลัย
      - แอดมินประจำฝ่าย (Departmental Admins ๑๔ ฝ่าย): จำกัดสิทธิ์เฉพาะโมดูลที่รับผิดชอบ (เช่น พระพี่เลี้ยงดูแล MOD-01, งานยานพาหนะดูแล MOD-16, แผนงานดูแล MOD-10 ฯลฯ) หากพยายามแก้ไขระบบอื่นจะถูกปฏิเสธด้วย HTTP 403 Forbidden
    * ๔ โหมดการทำงานหลัก:
      ๑. Interactive Form Matrix: ฟอร์มกรอกและแก้ไขข้อมูลตาม Field Schema ของแต่ละโมดูล
      ๒. Batch Import Center: นำเข้าไฟล์ชุด Excel / CSV พร้อมตัวอย่าง Template ให้ดาวน์โหลดและจำลองการซิงค์
      ๓. Data Freshness & Sync Monitor: กระดานตรวจสอบความสดใหม่ของข้อมูล ๒๒ โมดูล แสดงสถานะ "ข้อมูลสดใหม่ (Up to date)", "ต้องตรวจสอบ (Needs Review)", และ "ใกล้หมดอายุ"
      ๔. Audit & Activity Trail: ประวัติการบันทึกข้อมูลทุกรายการพร้อมระบุผู้แก้ วันเวลาแบบพุทธศักราช และส่งข้อมูลเข้า `src/lib/auditLogger.ts`
    * ติดตั้งวิดเจ็ตอัปเดตด่วนในระบบสำคัญ (`QuickDataUpdateModal`): เพิ่มปุ่ม "อัปเดตข้อมูล (Admin)" ในหน้า `/vehicle-booking`, `/monastic-life`, `/planning-budget`
    * การเชื่อมโยงสถาปัตยกรรม: เพิ่มใน `Sidebar.tsx` (MOD-23 ในหมวดฝ่ายบริหาร), `Navbar.tsx` (ปุ่มด่วน "อัปเดตข้อมูล"), `page.tsx` (สารบบ ๒๓ โมดูล), และ `sitemap.ts` (XML Sitemap ๓๗ เส้นทาง)
    * Automated Test Suite & Production Build: ปรับปรุง `tests/system-audit.test.mjs` ผ่านครบ ๓๗/๓๗ รายการ (100% Pass) และผ่านการตรวจสอบ Next.js Production Build ๓๘/๓๘ routes สำเร็จ ไร้ข้อผิดพลาด (0 errors)
  - TASK-929: ระบบยืนยันตัวตนหลายรูปแบบ (Multi-Identifier Login), Google SSO และระบบลงทะเบียนสมาชิกใหม่พร้อมบัตรสมาชิกดิจิทัล (MOD-24: `/login` & `/register`):
    * Multi-Identifier Login Matrix:
      - เข้าสู่ระบบด้วย "ชื่อ" (Username, ชื่อ-นามสกุล, ฉายาบาลี, อีเมล) ควบคู่กับหนึ่งใน ๔ รหัสทางการ:
        ๑. รหัสสมาชิก (Member ID เช่น `MBR-SOMBOON`, `MBR-2569-xxx`)
        ๒. รหัสนิสิต (Student ID เช่น `6701501001`, `SKB-2569-xxx`)
        ๓. รหัสตำแหน่ง (Position Code เช่น `POS-ADMIN-001`, `POS-DIR-001`, `POS-TCH-001`)
        ๔. เลขประจำตัวประชาชน ๑๓ หลัก (Citizen ID เช่น `1-7399-00123-45-6` หรือเลข ๑๓ หลักติดกัน)
        (หรือรหัสผ่านระบบเดิม)
      - ตัวตรวจจับอัตโนมัติ (Smart Auto-Detect) และตัวเลือกเจาะจงประเภท (Specific Identifier Selector)
    * Google Single Sign-On (SSO):
      - รองรับทั้งโดเมนสถาบัน `@mcu.ac.th` (MCU Google Workspace) และบุคคลภายนอก `@gmail.com`
      - ปุ่ม 1-Click Instant Demo Login บัญชีอาจารย์ ดร.สมบูรณ์ จารุณะ (`smjaurna@gmail.com`) เข้าสู่ระบบเป็น Super Admin ทันที
    * ระบบสมัครสมาชิกใหม่ (Member Registration: `/register`):
      - รองรับ ๕ หมวดหมู่สมาชิกสงฆ์และคฤหัสถ์ (พระภิกษุ, ศากยบุตรสามเณร, นิสิตบัณฑิตศึกษา, คณาจารย์/บุคลากร, โยมอุปถัมภ์/ประชาชน)
      - ขั้นตอน Wizard Stepper ๔ ขั้นตอน (เลือกประเภท -> ข้อมูลส่วนตัว/สมณศักดิ์ -> รหัสผ่าน/ความยินยอม PDPA -> รับบัตรสมาชิกดิจิทัล)
      - ออกรหัสสมาชิกอัตโนมัติ `MBR-2569-xxxx`
    * บัตรสมาชิกดิจิทัลพุทธศิลป์โมเดิร์น (Digital Member Card & Modal: `DigitalMemberCardModal.tsx`):
      - ลวดลายกรอบพุทธศิลป์สีทองคำ Royal Heritage (Royal Gold & Deep Midnight Navy)
      - ตราสัญลักษณ์มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
      - Dynamic QR Code สแกนตรวจสอบความถูกต้องผ่านมือถือ
      - สลับมุมมองบัตรแนวนอน / แบบฟอร์ม A4 ทางการพิมพ์ได้ทันที
    * สถาปัตยกรรมและการเชื่อมโยงทั่วทั้งระบบ:
      - `AuthContext.tsx` & `Providers.tsx` ห่อหุ้ม Root Layout จัดการ Session และ Persistent LocalStorage
      - `Navbar.tsx`: แสดงรูปอวตารผู้ใช้, ฉายา/ยศ, รหัสสมาชิก, เมนูเปิดบัตรสมาชิกดิจิทัล, ปุ่มสลับบทบาทฉับไว ๗ ท่าน (Quick Persona Switcher), ลิงก์เข้าสู่ระบบ/สมัครสมาชิกสำหรับผู้มาเยือน
      - `Sidebar.tsx`: กล่องข้อมูลผู้ใช้ด้านล่าง ป้ายบทบาทภาษาไทย และปุ่มออกจากระบบ
      - API Routes: `/api/auth/login`, `/api/auth/google`, `/api/auth/register`
      - XML Sitemap & Robots: บูรณาการ `/login` และ `/register` เข้าสู่ `sitemap.ts` (รวม ๓๙ เส้นทาง)
      - Automated Test Suite: ผ่านการทดสอบครบ ๔๓/๔๓ รายการ (100% Pass)
  - TASK-930: ติดตั้งและกำหนดค่าฐานข้อมูล PostgreSQL บน Localhost พร้อมสถาปัตยกรรม Dual-Database Switcher:
    * ดำเนินการติดตั้ง Postgres Pro Standard 17 (`PostgresPro.Standard.17` v17.7) บน Windows สำเร็จ ๑๐๐%
    * ตรวจสอบ Service `postgresql-X64-17` สถานะ Running และพอร์ต 5432 พร้อมรับการเชื่อมต่อ
    * สร้างฐานข้อมูล `mpr_db`, กำหนดรหัสผ่าน Superuser `postgres` และจัดทำ `.env` เชื่อมต่อสมบูรณ์
    * ดำเนินการ `prisma db push` ซิงค์ ๙ ตารางหลักเข้าสู่ PostgreSQL (AcademicRecord, AlmsBooking, ApprovalStep, MukhopathaRecord, PatronSamaneraPair, RoutineLog, SamaneraProfile, SarabanDocument, User)
    * ดำเนินการ Seeding บัญชีผู้ดูแลระบบหลัก (อาจารย์ ดร.สมบูรณ์ จารุณะ) และผู้บริหารเข้าสู่ PostgreSQL สำเร็จ
    * พัฒนาสคริปต์สลับฐานข้อมูลอัตโนมัติ `scripts/switch-db.mjs`, `scripts/switch-to-postgres.bat`, และ `scripts/switch-to-sqlite.bat`
  - TASK-931: การตรวจสอบคุณภาพโค้ดทั้งระบบ (Comprehensive Code Quality Audit), เสริมความแข็งแกร่ง Type-Safety, Zod Schema Validation, และแยกโมดูลย่อย (Component Modularization):
    * ติดตั้งและปรับใช้ Modern ESLint Flat Config (`eslint.config.mjs`) พร้อม `@eslint/js`, `typescript-eslint`, และ `eslint-config-next` ผ่านการตรวจ `npm run lint` ไร้ข้อผิดพลาดและคำเตือน (0 errors, 0 warnings)
    * สร้าง Standard API Response Envelope (`src/lib/apiResponse.ts` & `src/types/common.ts`) กำหนดโครงสร้าง Response กลาง `apiSuccess`, `apiError`, `apiValidationError` รองรับ Type-safe Generics ทั่วทั้งระบบ API
    * สร้างเลเยอร์ Zod Validation Schemas (`src/lib/validations/auth.ts`, `contact.ts`, `dataUpdater.ts`) คัดกรองและตรวจสอบ Payload ทุกช่องทางก่อนเข้าสู่ฐานข้อมูล ป้องกัน Injection และข้อมูลไม่สมบูรณ์
    * แยกโมดูลย่อย (Component Modularization) ลดขนาดโค้ดของ ๓ หน้าขนาดใหญ่ลงกว่า ๕๐% - ๘๐%:
      - `/contact` (ลดจาก ๑,๑๗๙ บรรทัดเหลือ ๓๒๑ บรรทัด): แยกเป็น `CampusMapCard`, `ContactDirectoryTable`, `InquiryFormCard`, `TicketStatusTracker`, `SocialChannelsGrid`
      - `/complaints-tracking` (ลดจาก ๑,๓๙๔ บรรทัดเหลือ ๗๒๒ บรรทัด): แยกเป็น `UnifiedTaskTrackerTable`, `DigitalServicesGateway`, `ComplaintSubmissionModal`, `ComplaintDetailModal`
      - `/attendance-tracking` (ลดจาก ๑,๑๙๖ บรรทัดเหลือ ๑๗๗ บรรทัด): สกัดข้อมูลห้องซูมสู่ `src/data/zoomScheduleData.ts` และแยกเป็น `ZoomClassroomsGrid`, `TuitionServicesCard`, `PetitionsTrackerCard`, `DownloadCenterCard`
    * รวมฟังก์ชันยูทิลิตี้นิรภัย (`src/lib/utils.ts`): รวมศูนย์ `cleanIdDigits`, `formatCitizenId`, `maskCitizenId` (PDPA สังฆะและสามเณรผู้เยาว์), `getErrorMessage`, และ `cn`
    * ขยายชุดทดสอบอัตโนมัติสู่ ๖๕ การทดสอบ (`npm test` / `tests/system-audit.test.mjs`): ครอบคลุมความถูกต้องของข้อมูลสังฆะ ๑๔๓ รูป, งบ ๘๑.๓๙ ลบ., เมทาดาทา ๒๖ เส้นทาง, สิทธิ์ RBAC, ระบบล็อกอิน ๔ รหัส, Zod Schemas, ยูทิลิตี้, API Envelopes, และขนาดคอมโพเนนต์ ผ่านฉลุย ๑๐๐% (๖๕/๖๕ รายการ)
    * ผ่านการตรวจ Type Check (`npx tsc --noEmit`) 0 errors และ Next.js Production Build (`npm run build`) ๓๖/๓๖ routes สำเร็จสมบูรณ์แบบ
  - TASK-932: การยกระดับความปลอดภัยระบบระดับ Production (Production Security Hardening & Vulnerability Remediation) ป้องกัน WannaCry, Ransomware, และ Crypto Mining:
    * ติดตั้ง Content-Security-Policy (CSP) ที่เข้มงวดใน `next.config.ts` ปิดกั้นการเชื่อมต่อ WebSocket ไปยัง Mining Pools (`wss://`) บล็อกสคริปต์ภายนอกที่ไม่ได้รับอนุญาต และป้องกัน XSS / Cryptojacking
    * พัฒนาระบบ In-Memory Sliding Window Rate Limiter (`src/lib/rateLimiter.ts`) สกัดกั้นการโจมตีแบบ Brute-force บน `/api/auth/login` (๕ ครั้ง/๑๕ นาที) และ File Viewer (๖๐ ครั้ง/นาที) พร้อมคืนค่า HTTP 429 Too Many Requests
    * ปิดช่องโหว่ Path Traversal (CWE-22) ใน `/api/file-viewer`: กักบริเวณไฟล์แบบ Strict Canonicalization ให้อยู่เฉพาะ `docs/` และ `public/`, บล็อก `..` และ Null bytes, บล็อกไฟล์ `.env` / ไฟล์ระบบ, จำกัดขนาดอัปโหลด ๑๐ MB, ปฏิเสธไฟล์ปฏิบัติการอันตราย (`.exe`, `.bat`, `.sh`, `.ps1`), และทำ Prototype Pollution Sanitization สำหรับไฟล์ `.xlsx`
    * ยกระดับการเข้ารหัสรหัสผ่าน (`src/lib/passwordSecurity.ts`): ใช้ NIST-recommended Scrypt algorithm (`crypto.scryptSync`) ผสม Salt สุ่ม ๑๖ ไบต์ พร้อม `crypto.timingSafeEqual` ป้องกัน Side-channel Timing Attacks และบูรณาการเข้าสู่ `src/data/authData.ts`
    * สร้างชุดสคริปต์ตรวจสอบความปลอดภัย: `scripts/security-audit-scan.mjs` (ผ่านการตรวจสอบ ๑๐/๑๐ รายการ) และ `scripts/windows-hardening-check.bat` (ตรวจสอบพอร์ต SMB 445 ป้องกัน WannaCry และพอร์ต PostgreSQL 5432 ป้องกันบอตเน็ต Kinsing)
    * ขยายชุดทดสอบอัตโนมัติรวม ๗๓ การทดสอบ (`npm test` / `tests/system-audit.test.mjs`) ผ่านครบ ๑๐๐% (๗๓/๗๓ รายการ), ESLint 0 errors, TypeScript 0 errors, และ Next.js Production Build ๓๖/๓๖ routes สำเร็จ
  - TASK-933: จัดทำพิมพ์เขียวและคู่มือการนำเสนอผลงาน (Master Presentation Guide & Live Demo Sequence) ครอบคลุม:
    * Executive Pitch Strategy & Single Source of Truth: สังฆะ ๑๔๓ รูป (ภิกษุ ๒๐ + สามเณร ๑๒๓), งบปี ๖๙ วส. มจร ๘๑.๓๙ ลบ., ๒๔ โมดูลครบวงจร
    * โครงสร้างสไลด์นำเสนอ ๑๐ หน้า (Slide Deck Blueprint) เจาะลึก ๔ ปีกงานสถาบัน และความมั่นคงปลอดภัย
    * สคริปต์บทพูดและถ้อยคำกราบเรียนสงฆ์ (Presenter Script & Monastic Decorum) สำหรับกราบเรียนพระเดชพระคุณพระธรรมวชิราจารย์ และคณะผู้บริหาร
    * ลำดับการสาธิตระบบจริง (Live Demonstration Sequence ๕ ซีนประทับใจ: Executive Dashboard, Multi-Identifier Login & บัตรสมาชิกดิจิทัล, ภัตตาหารโยมอุปถัมภ์ & ใบอนุโมทนาบัตรทองคำ A4, กระดานดุษฎีนิพนธ์ & Document Viewer, และเกราะความปลอดภัยระดับสากล)
    * คลังคำถามและแนวทางตอบข้อซักถามคณะกรรมการ (Anticipated Q&A Matrix) ๔ ประเด็นสำคัญ (การใช้งานของสงฆ์, PDPA ผู้เยาว์, การป้องกันภัยไซเบอร์, และความพร้อมใช้งานบน Production)
  - TASK-934: คลังบทความวิชาการและวิจัยระดับสากล TCI-ThaiJO (Faculty Publications & Global Journals Repository):
    * สกัดและรวบรวมข้อมูลผลงานตีพิมพ์จริงของคณาจารย์และบุคลากรในระบบ ๘ รูป/ท่าน รวม ๒๑ บทความวิจัยและวิชาการ จากแฟ้มประวัติทางการ (`docs/faculty/`)
    * จัดทำโมเดลข้อมูล `src/data/facultyPublicationsData.ts` ระบุรายละเอียดชื่อเรื่อง (ไทย-อังกฤษ), รายชื่อผู้แต่ง, วารสาร, ปีที่, ฉบับที่, ปี พ.ศ./ค.ศ., เลขหน้า, บทคัดย่อ, คำสำคัญ, ดัชนีวารสาร (Scopus Q1 ๑ เรื่อง, TCI กลุ่ม ๑ ๗ เรื่อง, TCI กลุ่ม ๒ ๑๓ เรื่อง) พร้อม Direct URL ลิงก์ตรงสู่บทความบนฐานข้อมูลวารสารจริง (https://www.tci-thaijo.org/, https://so0x.tci-thaijo.org/, Scopus Journal)
    * พัฒนาหน้าแสดงผลใน `/research-qa` เพิ่มแท็บ "บทความวิชาการ & วิจัยระดับสากล / TCI-ThaiJO" พร้อมการ์ดสถิติสรุป ๔ มิติ, แถบศูนย์เชื่อมโยง TCI-ThaiJO, ระบบสืบค้นและตัวกรองบุคลากร ๘ ท่าน/ดัชนี/ประเภท, ปุ่มเปิดอ่านบนวารสารตรง (`ExternalLink`), และปุ่มคัดลอกรายการอ้างอิง (Copy Citation)
    * เชื่อมโยงผลงานตีพิมพ์สู่บัตรคณาจารย์ในหน้าหลักสูตรระดับบัณฑิตศึกษา (`/graduate-curriculum`) แสดง Badge จำนวนบทความ TCI พร้อมลิงก์สืบค้น
    * พัฒนา Backend API Route: `src/app/api/publications/route.ts` รองรับการสืบค้นและกรองผ่าน Query Parameters
  - TASK-935: การตรวจสอบระบบเชิงลึกและขจัดข้อผิดพลาด/คำเตือนทั้งหมดสู่ความสมบูรณ์แบบสูงสุด (Full System Polish & Zero-Warning Execution):
    * ขจัดคำเตือน Next.js plugin ใน ESLint Flat Config (`eslint.config.mjs`): ติดตั้ง `@next/eslint-plugin-next` พร้อม Ruleset มาตรฐาน ทำให้การรัน `npm run lint` และ `next build` ไร้คำเตือนใดๆ ทั้งสิ้น (0 errors, 0 warnings)
    * ยกระดับ Node.js Environment ใน `package.json` เป็น `"type": "module"` แก้ไขปัญหา Typeless Module Warning ในชุดทดสอบระบบและสคริปต์สแกนความปลอดภัย ทำให้การรัน Console สะอาด ๑๐๐%
    * ปรับปรุง `start_presentation.bat` เพิ่มแท็บที่ ๖ เปิดหน้างานวิจัยวารสารนานาชาติและ TCI-ThaiJO (`/research-qa`) พร้อมสาธิตสด
    * ยืนยันผลการตรวจประเมินระบบ ๕ มิติหลัก:
      ๑. Automated Tests: ผ่านครบถ้วน ๗๙/๗๙ รายการ (100% Pass)
      ๒. Production Security Scan: ผ่านครบ ๑๐/๑๐ รายการ
      ๓. Linter: 0 errors, 0 warnings
      ๔. Type-Check: Strict Mode 0 errors
      ๕. Next.js Production Build: Prerendered ๓๗/๓๗ static & dynamic routes สำเร็จสมบูรณ์แบบ
  - TASK-936: ระบบนำเข้า (Import) และส่งออก (Export) ข้อมูลผู้ใช้งานด้วยไฟล์ CSV มาตรฐานสากล (MOD-06: `/users`):
    * พัฒนาโมดอลนำเข้าและส่งออกอเนกประสงค์ `UserCsvImportExportModal.tsx`:
      - นำเข้า (Import): ลากวางหรือเลือกไฟล์ CSV, ตัวแจกแจงแบบ Quote-aware ป้องกันเครื่องหมายจุลภาคคั่นในข้อความ, สร้างแม่แบบตัวอย่าง CSV ให้ดาวน์โหลด (`แม่แบบ_นำเข้าผู้ใช้งาน_วส_มจร.csv`), แสดงตารางพรีวิวและตรวจสอบความถูกต้องของข้อมูล (Validation Preview) จำแนกแถวสมบูรณ์ ข้อผิดพลาด และอีเมลซ้ำ พร้อมปุ่มบันทึกนำเข้าชุดใหญ่
      - ส่งออก (Export): รองรับการเลือกขอบเขตข้อมูล ๕ รูปแบบ (ข้อมูลทั้งหมด, ตามเงื่อนไขตัวกรอง, เฉพาะพระภิกษุ, เฉพาะสามเณร, เฉพาะคฤหัสถ์), มีตัวเลือกแสดง/ซ่อนรหัสผ่าน, และเข้ารหัสด้วย UTF-8 BOM (`\uFEFF`) ทำให้เปิดด้วย Microsoft Excel บน Windows ได้ภาษาไทยถูกต้อง ๑๐๐% ไม่เป็นภาษาต่างดาว
    * พัฒนาพื้นที่ทำงานศูนย์นำเข้า-ส่งออก CSV เต็มรูปแบบ `UserCsvManagementCard.tsx`: ติดตั้งเป็นแท็บที่ ๓ ในหน้า `/users` ("ศูนย์นำเข้า-ส่งออก CSV / CSV Hub")
    * ปรับปรุงหน้า `src/app/users/page.tsx`: เพิ่มปุ่ม "นำเข้า CSV" (Upload) และ "ส่งออก CSV" (Download) ในแถบเมนูด้านบน, เพิ่มแท็บที่ ๓ "ศูนย์นำเข้า-ส่งออก CSV (CSV Hub)", และติดตั้ง Modal ครบวงจร
    * อัปเดตชุดทดสอบอัตโนมัติ `tests/system-audit.test.mjs` เพิ่มหมวดที่ ๑๒ ครอบคลุมการทำงาน CSV Import/Export ผ่านการทดสอบครบถ้วน ๘๒/๘๒ รายการ (100% Pass) และผ่าน Next.js Production Build ๓๗/๓๗ routes สำเร็จ ไร้ข้อผิดพลาด
  - TASK-937: พัฒนาระบบจัดการหลักสูตรการศึกษา (Academic Programs) และโมดอล "แก้ไขหลักสูตร" พร้อมระบบ Import/Export JSON (MOD-15: `/academic-programs` & `/graduate-curriculum`):
    * พัฒนาโมดอล "แก้ไขหลักสูตร" `src/components/curriculum/CurriculumEditJsonModal.tsx`:
      - แท็บ ๑: ฟอร์มแก้ไขข้อมูลหลักสูตร (ชื่อไทย-อังกฤษ, ระดับการศึกษา ป.โท/ป.เอก, ชื่อปริญญา, อักษรย่อ, หน่วยกิต, ปรัชญา, วัตถุประสงค์, PLOs, อาชีพ และสรุปรายวิชา)
      - แท็บ ๒: ส่งออก JSON (Export) รองรับทั้งเฉพาะหลักสูตรปัจจุบันหรือทุกหลักสูตรในระบบ มีตัวแสดงผลโค้ด JSON จัดรูปแบบสวยงาม พร้อมปุ่มคัดลอก และปุ่มดาวน์โหลดไฟล์ `.json`
      - แท็บ ๓: นำเข้า JSON (Import) รองรับทั้งลากวางไฟล์ `.json` หรือวางโค้ด JSON ในกล่องข้อความ พร้อมระบบตรวจสอบความถูกต้องของโครงสร้าง (Schema Validation Engine) และดาวน์โหลดแม่แบบ JSON ตัวอย่าง
    * พัฒนาหน้าเพจเส้นทางตรง `src/app/academic-programs/page.tsx` และ `layout.tsx` (Prerendered 200 OK) และอัปเกรด `src/app/graduate-curriculum/page.tsx` ติดตั้งปุ่ม "แก้ไขหลักสูตร", "ส่งออก JSON", "นำเข้า JSON"
    * ซิงค์ข้อมูลข้ามหน้าด้วย `localStorage` (`mvu_academic_programs_curricula_v1`) พร้อมปุ่มรีเซ็ตค่าเริ่มต้นของวิทยาลัย
    * เพิ่มเมนูใน `src/components/Sidebar.tsx` และเพิ่ม URL ใน `src/app/sitemap.ts`
    * เพิ่มชุดทดสอบอัตโนมัติหมวดที่ ๑๓ ใน `tests/system-audit.test.mjs` ผ่านครบ ๘๖/๘๖ รายการ (100% Pass) และ Next.js Production Build ๓๘/๓๘ routes สำเร็จสมบูรณ์แบบ
* **Latest Action:** ติดตั้งเส้นทาง `/academic-programs` และโมดอล "แก้ไขหลักสูตร" พร้อมระบบนำเข้า/ส่งออก JSON ครบวงจร ทั้งดาวน์โหลดไฟล์ คัดลอก ตรวจสอบโครงสร้างความถูกต้อง และซิงค์ LocalStorage, ผ่านชุดทดสอบ ๘๖/๘๖ รายการ และ Next.js Production Build ๓๘/๓๘ routes สำเร็จสมบูรณ์แบบ

---

## 3. Module Completion Status
| Module ID | Module Name | Status | Key Deliverables |
| :---: | :--- | :--- | :--- |
| **DOCS** | Context Memory 6 Files | ✅ Completed | `docs/memory/*.md`, `AGENTS.md` ครบ 6 ไฟล์ |
| **CORE** | Next.js 15 + Tailwind + Layout | ✅ Completed | `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/*` |
| **MOD-01**| Samanera 24/7 Wellbeing | ✅ Completed | `src/app/monastic-life/page.tsx` (เช็กกิจวัตร, สุขภาพ, แจ้งเตือนครัว, Quick Update) |
| **MOD-02**| Patron CRM & Smart Alms | ✅ Completed | `src/app/alms-patron/page.tsx` (ปฏิทินเพล, LINE View, e-Donation) |
| **MOD-03**| Mukhopātha & Pali Engine | ✅ Completed | `src/app/mukhopatha/page.tsx` (ตรวจมุขปาฐะ, คลังเสียงสวด, คัมภีร์) |
| **MOD-04**| Mobile E-Approval | ✅ Completed | `src/app/e-approval/page.tsx` (เกษียณหนังสือด่วน, ลงนามดิจิทัล) |
| **MOD-05**| MCU Data Bridge | ✅ Completed | `src/app/mcu-bridge/page.tsx` (ทะเบียนสองมิติ, ส่งออก MCU REG CSV) |
| **MOD-06**| User & Role Management (RBAC) | ✅ Completed | `src/app/users/page.tsx`, `UserCsvImportExportModal.tsx`, `UserCsvManagementCard.tsx` (CSV Import/Export UTF-8 BOM, RBAC, Masking) |
| **MOD-07**| Smart Meeting Room & Signage | ✅ Completed | `src/app/meeting-rooms/page.tsx` (จองห้องประชุม, ป้ายดิจิทัล, IoT, น้ำปานะ) |
| **MOD-08**| Human Resource Management (HR) | ✅ Completed | `src/app/hr/page.tsx` (อัตรากำลังสงฆ์, ประวัติสมณศักดิ์, เลื่อนขั้น) |
| **MOD-09**| Finance & Procurement | ✅ Completed | `src/app/finance-procurement/page.tsx` (๓ กองทุนบริจาค, คลังสังฆภัณฑ์) |
| **MOD-10**| Planning & Strategic Budget | ✅ Completed | `src/app/planning-budget/page.tsx` (กรอบงบประมาณปี ๖๙ ตัวจริง ๘๑.๓๙ ลบ., แผนยุทธศาสตร์ ๕ ปี, KPI วส. มจร, Quick Update) |
| **MOD-11**| Tipitaka Library & IT | ✅ Completed | `src/app/library/page.tsx` (พระไตรปิฎก ๔๕ เล่ม, สัททนีติ, ปทรูปสิทธิ) |
| **MOD-12**| Research & Educational QA | ✅ Completed | `src/app/research-qa/page.tsx` (คลังวิจัยพุทธศาสตร์, AUN-QA, สมศ.) |
| **MOD-13**| Academic Services & Outreach | ✅ Completed | `src/app/academic-services/page.tsx` (ตารางสอนบาลี ๔ ชั้น, อบรมเยาวชน) |
| **MOD-14**| Classrooms & Sanam Luang | ✅ Completed | `src/app/classrooms/page.tsx` (๖ ห้องเรียน A1-A6, นักธรรม, บาลีสนามหลวง, กฎระเบียบ, PDPA) |
| **MOD-15**| Graduate Curricula & Academic Programs | ✅ Completed | `src/app/academic-programs/page.tsx`, `src/app/graduate-curriculum/page.tsx`, `CurriculumEditJsonModal.tsx` (แก้ไขหลักสูตร, JSON Import/Export, มคอ.๒) |
| **MOD-16**| Central Fleet & Vehicle Booking | ✅ Completed | `src/app/vehicle-booking/page.tsx` (รถส่วนกลาง ๑๐ คัน, ฟอร์มจองตามพระวินัย, ไทม์ไลน์, ใบขอใช้รถ A4, Quick Update) |
| **MOD-17**| e-Complaint & Cross-System Tracker | ✅ Completed | `src/app/complaints-tracking/page.tsx` (QR Code ร้องเรียน, ป้าย Standee A4, ติดตาม ๗ ระบบ CMP/VB/DOC/MTG/PRJ/ALM, e-Bidding, ประตูบริการ มจร) |
| **MOD-18**| Visitor Analytics & Traffic Insights | ✅ Completed | `src/app/visitor-analytics/page.tsx` (ทราฟฟิกสด ๔๒ คน, สถิติวัน/เดือน/ปี, แหล่งที่มา, อุปกรณ์, ส่งออก CSV) |
| **MOD-19**| Chat Board & Monastic Community | ✅ Completed | `src/app/chat-board/page.tsx` (กระดานสนทนา ๔ หมวดหมู่, ตอบกระทู้, อนุโมทนา 🙏, ห้องแชตสด, MCU Pali Bot, Moderation) |
| **MOD-20**| Graduate Academic & Thesis Progress | ✅ Completed | `src/app/graduate-progress/page.tsx` (พธ.ด. ๒๖ รูป ๒๑ ขั้นตอน, พธ.ม. ๘ รูป ๑๕ ขั้นตอน, Matrix Board, Admin Edit, Excel CSV, พิมพ์ A4) |
| **MOD-21**| Official Standard Contact & Directory | ✅ Completed | `src/app/contact/page.tsx` (ทำเนียบ ๘ ฝ่ายงาน, แผนที่ GPS, LINE, Q&A ฟอร์ม ITA O4-O5, Footer, SpeedDial, `/api/contact`) |
| **MOD-22**| Smart Document Reader & Official File Viewer | ✅ Completed | `src/app/file-viewer/page.tsx`, `src/components/DocumentViewerModal.tsx`, `src/app/api/file-viewer/route.ts` (DOCX, XLSX, PDF, Text) |
| **MOD-23**| Central Data Update & Sync Hub | ✅ Completed | `src/app/data-updater/page.tsx`, `src/app/data-updater/layout.tsx`, `src/components/QuickDataUpdateModal.tsx`, `src/app/api/data-updater/route.ts` (Super Admin & ๑๔ ฝ่าย, Batch Excel/CSV, Freshness Monitor, Audit Trail) |
| **MOD-24**| Multi-Identifier Auth, Google SSO & Member Registration | ✅ Completed | `src/app/login/page.tsx`, `src/app/register/page.tsx`, `src/data/authData.ts`, `src/context/AuthContext.tsx`, `src/components/DigitalMemberCardModal.tsx`, `/api/auth/*` |
| **QA-ENG**| Quality Assurance, Type Safety & Modular Architecture | ✅ Completed | Modern ESLint Flat Config, 73/73 Unit & System Tests (`npm test`), Zod Schema Validation, Uniform API Envelopes, Modular Decomposition |
| **SEC-PROD**| Production Security Hardening & Malware Defense | ✅ Completed | CSP Anti-Crypto Mining, Path Traversal Guard, Rate Limiting, Scrypt Password Hashing, WannaCry SMB 445 Check, Prototype Pollution Sanitization |





