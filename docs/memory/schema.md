# Schema Blueprint
## มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
**โครงสร้างฐานข้อมูลและแบบจำลองข้อมูล (Database Models & Enums)**

---

## 1. Global Enums
```prisma
enum UserRole {
  SUPER_ADMIN      // ผู้อำนวยการวิทยาลัยสงฆ์
  ADMIN_OFFICE     // เจ้าหน้าที่ฝ่ายบริหาร / การเงิน / พัสดุ
  ACADEMIC_OFFICE  // เจ้าหน้าที่สำนักวิชาการ / นายทะเบียน
  PALI_TEACHER     // พระคัมภีราจารย์ / ผู้สอน
  DISCIPLINE_MONK  // พระพี่เลี้ยง / ฝ่ายปกครอง
  SAMANERA         // ศากยบุตรสามเณร
  PATRON           // โยมอุปถัมภ์ / สาธุชน
}

enum MonasticType {
  BHIKKHU          // พระภิกษุ
  SAMANERA         // สามเณร
  LAYPERSON        // ฆราวาส / คฤหัสถ์
}

enum RoutineType {
  MORNING_CHANTING // ทำวัตรเช้า
  EVENING_CHANTING // ทำวัตรเย็น
  KAMMATTHANA      // เจริญกัมมัฏฐาน / ภาวนา
  PINDBAT          // ออกบิณฑบาต
  MEAL_OFFERING    // ฉันภัตตาหารในบาตร
}

enum RoutineStatus {
  PRESENT          // มาปฏิบัติ
  LATE             // มาสาย
  SICK_LEAVE       // ลาป่วย (มีใบรับรองพยาบาล)
  MISSION_LEAVE    // ติดศาสนกิจพิเศษ
  ABSENT           // ขาด
}

enum AlmsMealType {
  BREAKFAST        // ภัตตาหารเช้า
  LUNCH            // ภัตตาหารเพล
  PANA_BEVERAGE    // น้ำปานะ
}

enum BookingStatus {
  PENDING          // รอการยืนยัน
  CONFIRMED        // ยืนยันการเป็นเจ้าภาพ
  COMPLETED        // ถวายภัตตาหารเรียบร้อย
  CANCELLED        // ยกเลิก
}

enum MukhopathaGrade {
  EXCELLENT        // ยอดเยี่ยม (ถูกต้องตามอักขรวิธีและฐานกรณ์ 100%)
  GOOD             // ดี (ผ่านเกณฑ์มาตรฐาน)
  NEEDS_IMPROVE    // ต้องฝึกซ้อมเพิ่มเติม
  FAILED           // ไม่ผ่าน
}

enum ApprovalStatus {
  DRAFT            // ร่างเอกสาร
  PENDING_REVIEW   // รอตรวจสอบ
  PENDING_APPROVAL // รอ ผอ.วส. อนุมัติ
  APPROVED         // อนุมัติแล้ว
  REJECTED         // ตีกลับ / แก้ไข
}
```

---

## 2. Core Relational Models (Prisma Schema Outline)

### 2.1 User & Identity
* **User:** `id`, `email`, `passwordHash`, `role`, `monasticType`, `lineUserId`, `createdAt`
* **UserProfile:** `fullName`, `paliName` (ฉายา), `sanghaRank` (สมณศักดิ์), `vassa` (พรรษา), `templeName` (วัดสังกัด), `idCardOrPassport`, `phone`

### 2.2 MOD-01: Monastic Life & Routine
* **SamaneraProfile:** `id`, `userId`, `enrollmentNumber`, `batchNumber`, `kutiNumber`, `dateOfOrdination`, `preceptorName` (พระอุปัชฌาย์), `emergencyContact`
* **HealthRecord:** `id`, `samaneraId`, `bloodType`, `allergies` (การแพ้ยา/อาหาร), `chronicIllness`, `currentMedications`, `updatedAt`
* **RoutineLog:** `id`, `samaneraId`, `routineType`, `date`, `status`, `checkedByUserId`, `remarks`

### 2.3 MOD-02: Patron & Alms
* **PatronProfile:** `id`, `userId`, `nationalTaxId`, `address`, `totalDonations`, `preferredSamaneraId`
* **AlmsBooking:** `id`, `patronId`, `bookingDate`, `mealType`, `hostName`, `numberOfGuests`, `menuItems`, `status`, `donationAmount`
* **DonationRecord:** `id`, `patronId`, `bookingId`, `amount`, `receiptNumber`, `eDonationStatus`, `taxDeductible`, `createdAt`

### 2.4 MOD-03: Mukhopātha & Pali Progress
* **PaliCourse:** `id`, `code`, `title` (เช่น คัมภีร์ปทรูปสิทธิ, สัททนีติ), `level` (ชั้น ๑ - ๙), `totalChapters`
* **MukhopathaChapter:** `id`, `courseId`, `chapterNumber`, `chapterName`, `paliPassage`
* **MukhopathaSubmission:** `id`, `samaneraId`, `chapterId`, `evaluatedByUserId`, `grade`, `audioUrl`, `evaluatorComment`, `passedAt`

### 2.5 MOD-04: Mobile E-Approval
* **SarabanDocument:** `id`, `docNumber`, `title`, `category`, `urgencyLevel`, `submittedByUserId`, `currentStatus`, `filePath`
* **ApprovalStep:** `id`, `documentId`, `approverUserId`, `stepOrder`, `decision`, `signatureImage`, `timestampHash`, `comment`

### 2.6 MOD-05: Student Registry & MCU Bridge
* **AcademicRecord:** `id`, `samaneraId`, `academicYear`, `semester`, `gpax`, `mcuStudentCode`, `status`
* **MCUExportBatch:** `id`, `batchCode`, `exportType`, `recordCount`, `exportedByUserId`, `fileChecksum`, `createdAt`

---

## 3. State Machines
1. **Alms Booking Lifecycle:** `PENDING` $\rightarrow$ `CONFIRMED` $\rightarrow$ `COMPLETED` (หรือ `CANCELLED`)
2. **Mukhopātha Evaluation Lifecycle:** `SUBMITTED` $\rightarrow$ `REVIEWING` $\rightarrow$ `EXCELLENT / GOOD` (บันทึกสำเร็จ) หรือ `NEEDS_IMPROVE` (ให้ท่องซ้ำ)
3. **E-Approval Lifecycle:** `DRAFT` $\rightarrow$ `PENDING_APPROVAL` $\rightarrow$ `APPROVED` (ประทับลายเซ็นดิจิทัล) หรือ `REJECTED`
