# Implementation Plan
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**แผนการดำเนินงานพัฒนาระบบและการแบ่งย่อยภารกิจ (WBS & Sprint Breakdown)**

---

## 1. Timeline & Phasing Overview (6–9 เดือน MVP)

```
[ Phase 1: Foundation & Scaffold ] (Sprint 1–2 / เดือนที่ 1)
  ├── ติดตั้ง Next.js 15, Tailwind, Prisma, Auth & RBAC
  └── วางรากฐาน UI Design System (ธีมราชวิทยาลัย/พุทธศิลป์โมเดิร์น)

[ Phase 2: Core Gurukula & Alms ] (Sprint 3–6 / เดือนที่ 2–4)
  ├── MOD-01: กิจวัตร 24 ชม. & เวชระเบียนสามเณร
  └── MOD-02: ปฏิทินภัตตาหารเพล LINE LIFF & โยมอุปถัมภ์

[ Phase 3: Academic Engine & E-Office ] (Sprint 7–10 / เดือนที่ 5–7)
  ├── MOD-03: ประเมินมุขปาฐะ & คลังเสียงสาธยายคัมภีร์
  └── MOD-04: สารบรรณคำสั่งด่วน & ลายเซ็นดิจิทัลผ่านมือถือ

[ Phase 4: MCU Bridge & Hardening ] (Sprint 11–12 / เดือนที่ 8–9)
  ├── MOD-05: ทะเบียนคู่ขนาน & ตัวส่งออกข้อมูลเข้า MCU REG
  └── Security Audit (PDPA เด็ก), User Acceptance Test (UAT) & Go-Live
```

---

## 2. Granular Task Breakdown by Module

### Sprint 1: Foundation & Navigation Shell
- [x] **TASK-001:** Setup Next.js 15 Project with TypeScript & Tailwind CSS
- [x] **TASK-002:** Configure Prisma Database Schema with SQLite/PostgreSQL
- [x] **TASK-003:** Build App Layout with Responsive Navigation (Sidebar & Mobile Dock)
- [x] **TASK-004:** Implement Role-Based Dashboard Shell (Executive / Teacher / Staff)

### Sprint 2: MOD-01 Samanera Wellbeing & Routine Tracker
- [x] **TASK-101:** Create Daily Routine Attendance Screen (ทำวัตรเช้า-เย็น, บิณฑบาต, กัมมัฏฐาน)
- [x] **TASK-102:** Implement Health & Allergy Record View (ข้อมูลสุขภาพ & อาหารต้องห้าม)
- [x] **TASK-103:** Create Kitchen Summary Widget (สรุปยอดภัตตาหาร & การแพ้อาหาร)

### Sprint 3: MOD-02 Patron CRM & Smart Alms Calendar
- [x] **TASK-201:** Build Interactive Alms Host Calendar (ปฏิทินจองภัตตาหารเพล)
- [x] **TASK-202:** Implement Sponsor-Samanera Digital Profile (สมุดพกออนไลน์สำหรับโยม)
- [x] **TASK-203:** Build e-Donation & Receipt Generation Module

### Sprint 4: MOD-03 Mukhopātha & Pali Progress Engine
- [x] **TASK-301:** Build Mukhopātha Chapter Checklist (คัมภีร์ปทรูปสิทธิ / สัททนีติ)
- [x] **TASK-302:** Implement Audio Recitation Player & Rating Interface
- [x] **TASK-303:** Create Pali Competency Progress Dashboard for Teachers

### Sprint 5: MOD-04 Mobile E-Approval & Saraban Lite
- [x] **TASK-401:** Create Fast-track Memo Approval Queue for Executives
- [x] **TASK-402:** Implement Digital Signature Pad & Stamp Verification
- [x] **TASK-403:** Build Document Dispatch Routing System

### Sprint 6: MOD-05 MCU Data Bridge & Student Registry
- [x] **TASK-501:** Implement Dual-Profile Student Registry (ฉายา, สมณศักดิ์, บัตร ปชช.)
- [x] **TASK-502:** Build MCU REG Batch CSV/JSON Exporter
- [x] **TASK-503:** Create End-to-End System Integration Dashboard & Data Integrity Check
