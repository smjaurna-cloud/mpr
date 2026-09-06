# Architecture Blueprint
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**สถาปัตยกรรมระบบบริหารจัดการสถาบันศาสนทายาทและบาลีศากยบุตร (Enterprise Modular Architecture)**

---

## 1. High-Level Architecture Topology
ระบบใช้สถาปัตยกรรม **Modular Monolith บน Next.js 15 (App Router)** ร่วมกับ **Event-Driven Asynchronous Processing (Redis + BullMQ)** เพื่อรองรับการขยายตัวและลดความซับซ้อนในการพัฒนาด้วย Vibe Coding:

```
[ Client Layer ]
├── LINE LIFF / Mobile Web (โยมอุปถัมภ์, ผู้ปกครอง)
├── Responsive Web / PWA (พระอาจารย์, พระพี่เลี้ยง, สามเณร)
└── Executive Portal (ผอ.วส., คณะกรรมการ, นายทะเบียน)
           │
           ▼
[ Edge & Security Layer ]
├── Cloudflare CDN & Reverse Proxy (Rate Limiting, WAF, SSL)
└── Auth.js (NextAuth) with Sangha Claims (Role-Based Access Control)
           │
           ▼
[ Core Application Layer (Next.js Modular Monolith) ]
├── modules/monastic-life/  (MOD-01: กิจวัตร, สุขภาพ, เวชระเบียน)
├── modules/alms-patron/    (MOD-02: ภัตตาหารเพล, โยมอุปถัมภ์, e-Donation)
├── modules/mukhopatha/     (MOD-03: มุขปาฐะ, คลิปเสียง, ทรงจำคัมภีร์)
├── modules/e-approval/     (MOD-04: สารบรรณ, คำสั่ง, ลายเซ็นดิจิทัล)
└── modules/mcu-bridge/     (MOD-05: ทะเบียนประวัติ, ส่งออกข้อมูล MCU REG)
           │
     ┌─────┴────────────────────────┐
     ▼                              ▼
[ Data Persistence ]         [ Asynchronous Event Broker ]
├── PostgreSQL 16 (Prisma)   ├── Redis 7 (Cache & BullMQ)
└── MinIO / R2 (Audio/Files) ├── Audio Transcoder Worker (Opus/FFmpeg)
                             └── Notification Worker (LINE Push / SMS)
```

---

## 2. Integration Adapters & Resilience Patterns

### 2.1 MCU REG Adapter (ระบบทะเบียนกลาง มจร วังน้อย)
* **Pattern:** *Transactional Outbox Pattern*
* **Behavior:** เมื่อมีการตัดเกรดหรือเปลี่ยนสถานภาพนิสิต ข้อมูลจะถูกบันทึกลงฐานข้อมูลท้องถิ่นและเข้าคิว `mcu_sync_queue`
* **Fallback:** หากระบบส่วนกลางไม่พร้อมใช้งาน รองรับการกดปุ่มสร้าง Encrypted CSV Batch File เพื่อนำส่งผ่านระบบสารบรรณแทน

### 2.2 Revenue Dept e-Donation Adapter (กรมสรรพากร)
* **Pattern:** *Asynchronous Event with Exponential Backoff Retry*
* **Behavior:** ออกใบอนุโมทนาบัตรพร้อมรหัส Hash ให้ผู้บริจาคทันทีทาง LINE ส่วนการส่งข้อมูลภาษีจะประมวลผลช่วงกลางคืน
* **Fallback:** หาก API กรมสรรพากรขัดข้อง ให้ Retry 3 ครั้ง และแจ้งเตือนเจ้าหน้าที่การเงินหากเกิน 24 ชั่วโมง

### 2.3 Offline PWA Capability (วิถีชีวิตและมุขปาฐะ)
* **Storage:** Service Worker แคชหน้าจอและเก็บข้อมูลลง IndexedDB ชั่วคราว
* **Sync:** เมื่อเชื่อมต่ออินเทอร์เน็ตได้ ข้อมูลการเช็กชื่อและไฟล์เสียงจะถูก Sync ขึ้นเซิร์ฟเวอร์พร้อมตรวจสอบ Idempotency Key ป้องกันข้อมูลซ้ำซ้อน

---

## 3. Security, Privacy & Compliance (PDPA for Minors)
1. **Child Safeguarding:** ภาพถ่ายและข้อมูลของศากยบุตรสามเณร (ผู้เยาว์) ถูกเข้ารหัสระดับฟิลด์ และจำกัดสิทธิ์การมองเห็นเฉพาะพระอาจารย์ฝ่ายปกครองและโยมอุปถัมภ์ที่จับคู่แล้วเท่านั้น
2. **Access Control Matrix:**
   * `SUPER_ADMIN`: ผู้อำนวยการวิทยาลัยสงฆ์
   * `ACADEMIC_ADMIN`: ผอ.สำนักวิชาการ, นายทะเบียน
   * `PALI_TEACHER`: พระคัมภีราจารย์ (เข้าถึงการประเมินมุขปาฐะและคะแนน)
   * `DISCIPLINE_MONK`: พระพี่เลี้ยง (เข้าถึงกิจวัตรและสุขภาพสามเณร)
   * `PATRON_USER`: โยมอุปถัมภ์ (เข้าถึงสมุดพกดิจิทัลและปฏิทินภัตตาหาร)
