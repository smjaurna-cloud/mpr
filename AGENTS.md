# AI Agent Operating Charter (AGENTS.md)
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**กฎบัตรและข้อปฏิบัติการทำงานของ AI Coding Agents**

---

## 1. Context Ingestion Protocol (กฎการอ่าน Context)
ก่อนที่ AI Agent จะเริ่มเขียนหรือแก้ไขโค้ดใดๆ ต้องปฏิบัติตามลำดับดังนี้:
1. อ่าน `docs/memory/progress.md` เพื่อตรวจดู Active Task Pointer
2. อ่าน `docs/memory/schema.md` ก่อนเขียน Database Queries เสมอ
3. อ่าน `docs/memory/PRD.md` หากมีข้อสงสัยเกี่ยวกับ Business Rules และสิทธิ์ผู้ใช้งาน

---

## 2. Coding Standards & Tech Stack
* **Language & Framework:** TypeScript (Strict Mode) + Next.js 15 (App Router)
* **Styling:** Tailwind CSS + Lucide Icons (ใช้โทนสีสงบ พุทธศิลป์โมเดิร์น: Saffron Amber `#d97706`, Warm Sand, Clean Slate)
* **Components:** Functional Components พร้อม React Hooks และ 'use client' เมื่อจำเป็น
* **State & Validation:** Zod สำหรับ Schema Validation ทุกจุด
* **Database:** Prisma ORM สำหรับ Type-safe Queries

---

## 3. Cultural & Monastic Sensitivity (ความละเอียดอ่อนทางสงฆ์)
1. **คำนำหน้าและฉายา:** ต้องรองรับข้อมูลสมณศักดิ์, ฉายาบาลี, และชื่อ-นามสกุลทางโลก โดยไม่ตัดทอน
2. **การขบฉันและเวลา:** ต้องคำนึงถึงกรอบเวลาพระวินัย (เช่น เพลก่อน 12:00 น.)
3. **การแสดงความเคารพ:** หน้า UI ฝั่งพระเถระต้องเรียบง่าย อ่านง่าย และไม่มีโฆษณาหรือสิ่งรบกวน

---

## 4. Prohibited Actions (ข้อห้ามเด็ดขาด)
* ❌ ห้ามลบหรือแก้ไขข้อความใน `docs/memory/PRD.md` โดยไม่ได้รับคำสั่ง
* ❌ ห้ามเปิดเผยข้อมูลสุขภาพหรือประวัติส่วนตัวของสามเณร (ผู้เยาว์) สู่สาธารณะ
* ❌ ห้าม Hardcode รหัสผ่าน, Token, หรือ Secret Keys ในโค้ด
* ❌ ห้ามทิ้งงานโดยไม่อัปเดต `docs/memory/progress.md` เมื่อเสร็จสิ้น Task
