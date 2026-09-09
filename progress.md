# Project Progress Tracker
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**บันทึกสถานะการพัฒนาระบบสด (Living State & Active Pointer)**

---

## 1. Overall Status
- **Current Milestone:** Enterprise Buddhist College ERP System (17 Full Modules Complete)
- **Active User:** `somboon` (Super Administrator: `smjaurna@gmail.com`, เบอร์โทร: `099-445-4256`)
- **Status:** ✅ Production Build Ready & Verified (22/22 Static Pages Prerendered Successfully)
- **Health:** 🟢 Excellent (Zero Errors, Strict Mode Type-Checked)
- **Verified Date:** 2026-09-09
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
* **Latest Action:** พัฒนาระบบ MOD-17 ศูนย์รับเรื่องร้องเรียน QR Code และติดตามงานทุกระบบ ผ่านการทดสอบ Next.js Build ๑๐๐% (22/22 routes)

---

## 3. Module Completion Status
| Module ID | Module Name | Status | Key Deliverables |
| :---: | :--- | :---: | :--- |
| **DOCS** | Context Memory 6 Files | ✅ Completed | `docs/memory/*.md`, `AGENTS.md` ครบ 6 ไฟล์ |
| **CORE** | Next.js 15 + Tailwind + Layout | ✅ Completed | `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/*` |
| **MOD-01**| Samanera 24/7 Wellbeing | ✅ Completed | `src/app/monastic-life/page.tsx` (เช็กกิจวัตร, สุขภาพ, แจ้งเตือนครัว) |
| **MOD-02**| Patron CRM & Smart Alms | ✅ Completed | `src/app/alms-patron/page.tsx` (ปฏิทินเพล, LINE View, e-Donation) |
| **MOD-03**| Mukhopātha & Pali Engine | ✅ Completed | `src/app/mukhopatha/page.tsx` (ตรวจมุขปาฐะ, คลังเสียงสวด, คัมภีร์) |
| **MOD-04**| Mobile E-Approval | ✅ Completed | `src/app/e-approval/page.tsx` (เกษียณหนังสือด่วน, ลงนามดิจิทัล) |
| **MOD-05**| MCU Data Bridge | ✅ Completed | `src/app/mcu-bridge/page.tsx` (ทะเบียนสองมิติ, ส่งออก MCU REG CSV) |
| **MOD-06**| User & Role Management (RBAC) | ✅ Completed | `src/app/users/page.tsx` (จัดการบัญชีผู้ใช้, ข้อมูลสงฆ์, บันทึกการลาสิกขา) |
| **MOD-07**| Smart Meeting Room & Signage | ✅ Completed | `src/app/meeting-rooms/page.tsx` (จองห้องประชุม, ป้ายดิจิทัล, IoT, น้ำปานะ) |
| **MOD-08**| Human Resource Management (HR) | ✅ Completed | `src/app/hr/page.tsx` (อัตรากำลังสงฆ์, ประวัติสมณศักดิ์, เลื่อนขั้น) |
| **MOD-09**| Finance & Procurement | ✅ Completed | `src/app/finance-procurement/page.tsx` (๓ กองทุนบริจาค, คลังสังฆภัณฑ์) |
| **MOD-10**| Planning & Strategic Budget | ✅ Completed | `src/app/planning-budget/page.tsx` (กรอบงบประมาณปี ๖๙ ตัวจริง ๘๑.๓๙ ลบ., แผนยุทธศาสตร์ ๕ ปี, KPI วส. มจร) |
| **MOD-11**| Tipitaka Library & IT | ✅ Completed | `src/app/library/page.tsx` (พระไตรปิฎก ๔๕ เล่ม, สัททนีติ, ปทรูปสิทธิ) |
| **MOD-12**| Research & Educational QA | ✅ Completed | `src/app/research-qa/page.tsx` (คลังวิจัยพุทธศาสตร์, AUN-QA, สมศ.) |
| **MOD-13**| Academic Services & Outreach | ✅ Completed | `src/app/academic-services/page.tsx` (ตารางสอนบาลี ๔ ชั้น, อบรมเยาวชน) |
| **MOD-14**| Classrooms & Sanam Luang | ✅ Completed | `src/app/classrooms/page.tsx` (๖ ห้องเรียน A1-A6, นักธรรม, บาลีสนามหลวง, กฎระเบียบ, PDPA) |
| **MOD-15**| Graduate Curricula (TQF 2) | ✅ Completed | `src/app/graduate-curriculum/page.tsx` (มคอ.๒ พธ.ด. พระไตรปิฎก, พธ.ม. พระไตรปิฎก, พธ.ม. พระอภิธรรม, ๕๓ รายวิชา, PDF) |
| **MOD-16**| Central Fleet & Vehicle Booking | ✅ Completed | `src/app/vehicle-booking/page.tsx` (รถส่วนกลาง ๑๐ คัน, ฟอร์มจองตามพระวินัย, ไทม์ไลน์, ใบขอใช้รถ A4) |
| **MOD-17**| e-Complaint & Cross-System Tracker | ✅ Completed | `src/app/complaints-tracking/page.tsx` (QR Code ร้องเรียน, ป้าย Standee A4, ติดตาม ๗ ระบบ CMP/VB/DOC/MTG/PRJ/ALM, e-Bidding, ประตูบริการ มจร) |

