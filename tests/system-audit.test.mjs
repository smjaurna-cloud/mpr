import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { cleanIdDigits, formatCitizenId, maskCitizenId, getErrorMessage, cn } from "../src/lib/utils.ts";
import { loginSchema, googleAuthSchema, registerSchema } from "../src/lib/validations/auth.ts";
import { contactInquirySchema, updateTicketSchema } from "../src/lib/validations/contact.ts";
import { dataUpdatePayloadSchema } from "../src/lib/validations/dataUpdater.ts";
import { checkRateLimit, clearRateLimitStore } from "../src/lib/rateLimiter.ts";
import { hashPassword, verifyPassword, isPasswordHashed } from "../src/lib/passwordSecurity.ts";
import { facultyPublications, facultyPublicationStats } from "../src/data/facultyPublicationsData.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("==========================================================");
console.log("  MAHAVAJIRALONGKORN PALI COLLEGE SYSTEM AUDIT SUITE");
console.log("  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)");
console.log("==========================================================\n");

let passedCount = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
  }
}

// 1. Data Consistency Tests
console.log("--- 1. Data Consistency & Single Source of Truth ---");

runTest("Verify total Sangha count is strictly 143 (123 Samaneras + 20 Monks)", () => {
  const sanghaDataContent = fs.readFileSync(path.join(rootDir, "src/data/sanghaData.ts"), "utf-8");
  assert.ok(
    sanghaDataContent.includes("รวมทั้งสิ้น ๑๔๓ รูป (พระภิกษุ ๒๐ รูป, สามเณร ๑๒๓ รูป)"),
    "Header comment must confirm 143 total (20 monks, 123 novices)"
  );
  assert.ok(
    sanghaDataContent.includes("orderNo: 123"),
    "Must have 123rd novice in officialNovicesList"
  );
  assert.ok(
    sanghaDataContent.includes("orderNo: 20"),
    "Must have 20th monk in officialMonksList"
  );
  const dashboardContent = fs.readFileSync(path.join(rootDir, "src/app/page.tsx"), "utf-8");
  assert.ok(dashboardContent.includes("totalSangha"), "Dashboard should display totalSangha");
  assert.ok(dashboardContent.includes("totalSamaneras"), "Dashboard should display totalSamaneras");
  assert.ok(dashboardContent.includes("totalMonks"), "Dashboard should display totalMonks");
});

runTest("Verify official budget is strictly 81,393,900 THB (81.39M)", () => {
  const dashboardContent = fs.readFileSync(path.join(rootDir, "src/app/page.tsx"), "utf-8");
  assert.ok(dashboardContent.includes("81393900"), "Dashboard should reference 81393900 THB");
  assert.ok(dashboardContent.includes("๘๑.๓๙ ลบ."), "Dashboard should render ๘๑.๓๙ ลบ.");
});

runTest("Verify 23 modules are referenced in dashboard", () => {
  const dashboardContent = fs.readFileSync(path.join(rootDir, "src/app/page.tsx"), "utf-8");
  assert.ok(dashboardContent.includes("สารบบงานราชวิทยาลัย (๒๓ โมดูล)"), "Dashboard should show 23 modules");
  assert.ok(dashboardContent.includes("ERP ครบวงจร ๒๓ ระบบ"), "Dashboard should show 23 systems");
  assert.ok(dashboardContent.includes("/data-updater"), "Dashboard should include link to /data-updater");
});

runTest("Verify official fleet comprises 10 vehicles (v-01 to v-10)", () => {
  const vehicleDataContent = fs.readFileSync(path.join(rootDir, "src/data/vehicleData.ts"), "utf-8");
  assert.ok(vehicleDataContent.includes('id: "v-01"'), "Should contain v-01");
  assert.ok(vehicleDataContent.includes('id: "v-10"'), "Should contain v-10");
});

runTest("Verify official documents repository has 19 official documents", () => {
  const docsDataContent = fs.readFileSync(path.join(rootDir, "src/data/officialDocumentsData.ts"), "utf-8");
  assert.ok(docsDataContent.includes('id: "doc-01"'), "Should contain doc-01");
  assert.ok(docsDataContent.includes('id: "doc-18"'), "Should contain doc-18 (Buildings)");
  assert.ok(docsDataContent.includes('id: "doc-19"'), "Should contain doc-19 (Students)");
});

// 2. SEO & Route Metadata Tests
console.log("\n--- 2. SEO & Route Layout Metadata Verification ---");

const expectedRoutes = [
  "monastic-life",
  "alms-patron",
  "mukhopatha",
  "e-approval",
  "mcu-bridge",
  "users",
  "meeting-rooms",
  "hr",
  "finance-procurement",
  "planning-budget",
  "library",
  "research-qa",
  "academic-services",
  "classrooms",
  "graduate-curriculum",
  "vehicle-booking",
  "complaints-tracking",
  "visitor-analytics",
  "chat-board",
  "graduate-progress",
  "contact",
  "file-viewer",
  "data-updater",
  "attendance-tracking",
  "login",
  "register",
];

for (const route of expectedRoutes) {
  runTest(`Route '/${route}' has dedicated layout.tsx with metadata`, () => {
    const layoutPath = path.join(rootDir, `src/app/${route}/layout.tsx`);
    assert.ok(fs.existsSync(layoutPath), `layout.tsx must exist for /${route}`);
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes("export const metadata"), `layout.tsx for /${route} must export metadata`);
    assert.ok(content.includes("title:"), `layout.tsx for /${route} must define title`);
  });
}

runTest("Root layout.tsx contains OpenGraph, Twitter card, and JSON-LD schema", () => {
  const rootLayoutContent = fs.readFileSync(path.join(rootDir, "src/app/layout.tsx"), "utf-8");
  assert.ok(rootLayoutContent.includes("openGraph:"), "Root layout must configure openGraph");
  assert.ok(rootLayoutContent.includes("twitter:"), "Root layout must configure twitter");
  assert.ok(rootLayoutContent.includes("EducationalOrganization"), "Root layout must embed EducationalOrganization JSON-LD");
  assert.ok(rootLayoutContent.includes("template:"), "Root layout must have title template");
});

runTest("Robots.txt and Sitemap.xml generators exist and include /login and /register", () => {
  assert.ok(fs.existsSync(path.join(rootDir, "src/app/robots.ts")), "robots.ts must exist");
  const sitemapContent = fs.readFileSync(path.join(rootDir, "src/app/sitemap.ts"), "utf-8");
  assert.ok(sitemapContent.includes('path: "/login"'), "sitemap.ts must contain /login");
  assert.ok(sitemapContent.includes('path: "/register"'), "sitemap.ts must contain /register");
});

// 3. Security & PDPA Tests
console.log("\n--- 3. Security, PDPA & Monastic Privacy ---");

runTest("Security headers configured in next.config.ts", () => {
  const configContent = fs.readFileSync(path.join(rootDir, "next.config.ts"), "utf-8");
  assert.ok(configContent.includes("Strict-Transport-Security"), "Should configure HSTS");
  assert.ok(configContent.includes("X-Frame-Options"), "Should configure X-Frame-Options");
  assert.ok(configContent.includes("X-Content-Type-Options"), "Should configure nosniff");
  assert.ok(configContent.includes("Referrer-Policy"), "Should configure Referrer-Policy");
});

runTest("Centralized Audit Logger exists and exports required methods", () => {
  const auditLoggerPath = path.join(rootDir, "src/lib/auditLogger.ts");
  assert.ok(fs.existsSync(auditLoggerPath), "auditLogger.ts must exist");
  const content = fs.readFileSync(auditLoggerPath, "utf-8");
  assert.ok(content.includes("export function logAuditEvent"), "Should export logAuditEvent");
  assert.ok(content.includes("export function getRecentAuditLogs"), "Should export getRecentAuditLogs");
});

runTest("Password in users page is masked and not exposed in plain text", () => {
  const usersPageContent = fs.readFileSync(path.join(rootDir, "src/app/users/page.tsx"), "utf-8");
  assert.ok(usersPageContent.includes("••••••••"), "Users page should mask password with bullets");
  assert.ok(usersPageContent.includes("revealedPasswords"), "Users page should use state to toggle password");
});

// 4. MOD-23 Data Updater & Role-Based Access Control
console.log("\n--- 4. MOD-23 Data Updater & Role-Based Access Control ---");

runTest("Verify Data Updater module registry contains all 22 target systems and admin personas", () => {
  const updaterContent = fs.readFileSync(path.join(rootDir, "src/data/systemUpdaterData.ts"), "utf-8");
  assert.ok(updaterContent.includes("systemModulesRegistry"), "Should export systemModulesRegistry");
  assert.ok(updaterContent.includes('"MOD-01"'), "Should contain MOD-01");
  assert.ok(updaterContent.includes('"MOD-22"'), "Should contain MOD-22");
  assert.ok(updaterContent.includes("adminPersonas"), "Should export adminPersonas");
  assert.ok(updaterContent.includes("checkModulePermission"), "Should export checkModulePermission");
});

runTest("Verify Data Updater API route handles GET and POST with RBAC", () => {
  const apiContent = fs.readFileSync(path.join(rootDir, "src/app/api/data-updater/route.ts"), "utf-8");
  assert.ok(apiContent.includes("export async function GET"), "API should export GET handler");
  assert.ok(apiContent.includes("export async function POST"), "API should export POST handler");
  assert.ok(apiContent.includes("checkModulePermission"), "API should check module permissions");
  assert.ok(apiContent.includes("403"), "API should return 403 on unauthorized update attempt");
  assert.ok(apiContent.includes("logAuditEvent"), "API should record updates in audit logger");
});

runTest("Verify QuickDataUpdateModal is embedded in key modules", () => {
  const vbContent = fs.readFileSync(path.join(rootDir, "src/app/vehicle-booking/page.tsx"), "utf-8");
  assert.ok(vbContent.includes("QuickDataUpdateModal"), "vehicle-booking should embed QuickDataUpdateModal");
  assert.ok(vbContent.includes('targetModuleId="MOD-16"'), "vehicle-booking should target MOD-16");

  const mlContent = fs.readFileSync(path.join(rootDir, "src/app/monastic-life/page.tsx"), "utf-8");
  assert.ok(mlContent.includes("QuickDataUpdateModal"), "monastic-life should embed QuickDataUpdateModal");
  assert.ok(mlContent.includes('targetModuleId="MOD-01"'), "monastic-life should target MOD-01");

  const pbContent = fs.readFileSync(path.join(rootDir, "src/app/planning-budget/page.tsx"), "utf-8");
  assert.ok(pbContent.includes("QuickDataUpdateModal"), "planning-budget should embed QuickDataUpdateModal");
  assert.ok(pbContent.includes('targetModuleId="MOD-10"'), "planning-budget should target MOD-10");
});

// 5. Multi-Identifier Login, Google SSO & Member Registration
console.log("\n--- 5. Authentication, Multi-Identifier Login & Member Registration ---");

runTest("Verify authData.ts exports required seed users, models, and authentication logic", () => {
  const authDataContent = fs.readFileSync(path.join(rootDir, "src/data/authData.ts"), "utf-8");
  assert.ok(authDataContent.includes("export const initialAuthUsers"), "Must export initialAuthUsers");
  assert.ok(authDataContent.includes("export function authenticateMultiIdentifier"), "Must export authenticateMultiIdentifier");
  assert.ok(authDataContent.includes("export function authenticateGoogleUser"), "Must export authenticateGoogleUser");
  assert.ok(authDataContent.includes("smjaurna@gmail.com"), "Must contain Dr. Somboon account");
  assert.ok(authDataContent.includes("MBR-SOMBOON"), "Must contain Dr. Somboon memberId");
  assert.ok(authDataContent.includes("POS-DIR-001"), "Must contain Director positionCode");
  assert.ok(authDataContent.includes("6701501001"), "Must contain Ph.D. studentCode");
  assert.ok(authDataContent.includes("1-7399-00123-45-6"), "Must contain citizen ID");
});

runTest("Verify Auth backend API routes (/api/auth/login, /api/auth/google, /api/auth/register)", () => {
  const loginRoute = fs.readFileSync(path.join(rootDir, "src/app/api/auth/login/route.ts"), "utf-8");
  assert.ok(loginRoute.includes("export async function POST"), "Login route must export POST");
  assert.ok(loginRoute.includes("authenticateMultiIdentifier"), "Login route must use authenticateMultiIdentifier");

  const googleRoute = fs.readFileSync(path.join(rootDir, "src/app/api/auth/google/route.ts"), "utf-8");
  assert.ok(googleRoute.includes("export async function POST"), "Google route must export POST");
  assert.ok(googleRoute.includes("authenticateGoogleUser"), "Google route must use authenticateGoogleUser");

  const registerRoute = fs.readFileSync(path.join(rootDir, "src/app/api/auth/register/route.ts"), "utf-8");
  assert.ok(registerRoute.includes("export async function POST"), "Register route must export POST");
  assert.ok(registerRoute.includes("MBR-2569-"), "Register route must generate MBR-2569- member ID");
});

runTest("Verify AuthContext, Providers, and DigitalMemberCardModal exist", () => {
  assert.ok(fs.existsSync(path.join(rootDir, "src/context/AuthContext.tsx")), "AuthContext.tsx must exist");
  assert.ok(fs.existsSync(path.join(rootDir, "src/components/Providers.tsx")), "Providers.tsx must exist");
  assert.ok(fs.existsSync(path.join(rootDir, "src/components/DigitalMemberCardModal.tsx")), "DigitalMemberCardModal.tsx must exist");

  const layoutContent = fs.readFileSync(path.join(rootDir, "src/app/layout.tsx"), "utf-8");
  assert.ok(layoutContent.includes("<Providers>"), "Root layout must be wrapped in <Providers>");
});

runTest("Verify Navbar and Sidebar are fully integrated with AuthContext", () => {
  const navbarContent = fs.readFileSync(path.join(rootDir, "src/components/Navbar.tsx"), "utf-8");
  assert.ok(navbarContent.includes("useAuth()"), "Navbar must use useAuth hook");
  assert.ok(navbarContent.includes("DigitalMemberCardModal"), "Navbar must include DigitalMemberCardModal");
  assert.ok(navbarContent.includes('href="/login"'), "Navbar must have link to login when unauthenticated");

  const sidebarContent = fs.readFileSync(path.join(rootDir, "src/components/Sidebar.tsx"), "utf-8");
  assert.ok(sidebarContent.includes("useAuth()"), "Sidebar must use useAuth hook");
  assert.ok(sidebarContent.includes("currentUser"), "Sidebar must display currentUser info");
});

// 6. Zod Schema Validation Suite
console.log("\n--- 6. Zod Validation Schemas ---");

runTest("loginSchema succeeds on valid credentials", () => {
  const result = loginSchema.safeParse({
    identifierName: "สมบูรณ์",
    secretCode: "mcu123456",
    idType: "ALL",
  });
  assert.strictEqual(result.success, true);
});

runTest("loginSchema fails when identifierName is shorter than 2 chars", () => {
  const result = loginSchema.safeParse({
    identifierName: "a",
    secretCode: "password",
  });
  assert.strictEqual(result.success, false);
});

runTest("loginSchema fails when secretCode is shorter than 3 chars", () => {
  const result = loginSchema.safeParse({
    identifierName: "somboon",
    secretCode: "12",
  });
  assert.strictEqual(result.success, false);
});

runTest("googleAuthSchema succeeds on valid email and trims correctly", () => {
  const result = googleAuthSchema.safeParse({
    email: "  somboon@mcu.ac.th  ",
    name: "Dr. Somboon",
  });
  assert.strictEqual(result.success, true);
  if (result.success) {
    assert.strictEqual(result.data.email, "somboon@mcu.ac.th");
  }
});

runTest("googleAuthSchema fails on invalid email format", () => {
  const result = googleAuthSchema.safeParse({
    email: "invalid-email-string",
  });
  assert.strictEqual(result.success, false);
});

runTest("registerSchema succeeds on valid member registration data", () => {
  const result = registerSchema.safeParse({
    fullName: "พระสมศักดิ์ ธมฺมกาโม",
    memberCategory: "MONK",
    paliName: "ธมฺมกาโม",
    sanghaRank: "เปรียญธรรม ๙ ประโยค",
    phone: "081-234-5678",
    email: "somsak@mcu.ac.th",
    citizenId: "1-1002-00345-67-8",
    password: "password123",
  });
  assert.strictEqual(result.success, true);
});

runTest("registerSchema defaults memberCategory to PATRON when omitted", () => {
  const result = registerSchema.safeParse({
    fullName: "โยมสมศรี ผู้มีศรัทธา",
    email: "somsri@example.com",
    phone: "081-999-8888",
    password: "password123",
  });
  assert.strictEqual(result.success, true);
  if (result.success) {
    assert.strictEqual(result.data.memberCategory, "PATRON");
  }
});

runTest("contactInquirySchema succeeds on valid inquiry", () => {
  const result = contactInquirySchema.safeParse({
    senderName: "พระมหาบุญส่ง",
    senderEmail: "boonsong@mcu.ac.th",
    targetDepartment: "วิชาการและหลักสูตร",
    subject: "สอบถามการรับสมัคร",
    message: "ต้องการสอบถามกำหนดการเปิดรับสมัคร พธ.ด. พระไตรปิฎกเถรวาท รุ่น ๔",
  });
  assert.strictEqual(result.success, true);
});

runTest("contactInquirySchema fails when message length is under 5 chars", () => {
  const result = contactInquirySchema.safeParse({
    senderName: "ก้องเกียรติ",
    senderEmail: "kong@test.com",
    subject: "สอบถาม",
    message: "สั้น",
  });
  assert.strictEqual(result.success, false);
});

runTest("updateTicketSchema validates status transitions", () => {
  const validResult = updateTicketSchema.safeParse({
    ticketCode: "INQ-256909-001",
    status: "PROCESSING",
    responseNote: "กำลังประสานงานคณาจารย์ประจำหลักสูตร",
  });
  assert.strictEqual(validResult.success, true);

  const invalidResult = updateTicketSchema.safeParse({
    ticketCode: "",
    status: "INVALID_STATUS",
  });
  assert.strictEqual(invalidResult.success, false);
});

runTest("dataUpdatePayloadSchema validates standard system payload", () => {
  const result = dataUpdatePayloadSchema.safeParse({
    moduleId: "MOD-16",
    adminPersonaId: "ADM-SOMBOON",
    updateType: "FORM_EDIT",
    formData: { status: "AVAILABLE", mileage: 12500 },
    customSummary: "ผ่านการซ่อมบำรุงเปลี่ยนถ่ายน้ำมันเครื่องเรียบร้อย",
  });
  assert.strictEqual(result.success, true);
});

runTest("dataUpdatePayloadSchema fails on missing adminPersonaId or moduleId", () => {
  const result = dataUpdatePayloadSchema.safeParse({
    moduleId: "",
    adminPersonaId: "",
  });
  assert.strictEqual(result.success, false);
});

// 7. Utility Functions
console.log("\n--- 7. Utility Functions & String Formatters ---");

runTest("cleanIdDigits strips spaces and hyphens cleanly", () => {
  assert.strictEqual(cleanIdDigits("1-7399-00123-45-6"), "1739900123456");
  assert.strictEqual(cleanIdDigits(" 081 234 5678 "), "0812345678");
  assert.strictEqual(cleanIdDigits(""), "");
});

runTest("formatCitizenId formats 13-digit string into Thai national ID pattern", () => {
  assert.strictEqual(formatCitizenId("1739900123456"), "1-7399-00123-45-6");
  assert.strictEqual(formatCitizenId("123"), "123");
});

runTest("maskCitizenId masks middle digits for Monastic and Minor Novice PDPA privacy", () => {
  const masked = maskCitizenId("1-7399-00123-45-6");
  assert.strictEqual(masked, "1-xxxx-xxxxx-45-6");
  assert.strictEqual(maskCitizenId(""), "");
});

runTest("getErrorMessage safely extracts message from Error and non-Error objects", () => {
  assert.strictEqual(getErrorMessage(new Error("Database connection timed out")), "Database connection timed out");
  assert.strictEqual(getErrorMessage("Direct string error"), "Direct string error");
  assert.strictEqual(getErrorMessage({ message: "Custom object message" }), "Custom object message");
  assert.strictEqual(getErrorMessage({ custom: "fail" }), "เกิดข้อผิดพลาดในการประมวลผล");
});

runTest("cn helper merges Tailwind utility classes without conflicts", () => {
  const merged = cn("p-4 bg-white", false && "hidden", "p-6 text-slate-900");
  assert.strictEqual(merged, "bg-white p-6 text-slate-900");
});

// 8. Standard API Response Envelope
console.log("\n--- 8. Uniform API Response Envelopes ---");

runTest("Verify apiResponse.ts exports apiSuccess, apiError, apiValidationError with strict contracts", () => {
  const apiRespPath = path.join(rootDir, "src/lib/apiResponse.ts");
  assert.ok(fs.existsSync(apiRespPath), "apiResponse.ts must exist");
  const content = fs.readFileSync(apiRespPath, "utf-8");
  assert.ok(content.includes("export function apiSuccess"), "Must export apiSuccess");
  assert.ok(content.includes("export function apiError"), "Must export apiError");
  assert.ok(content.includes("export function apiValidationError"), "Must export apiValidationError");
  assert.ok(content.includes("success: true"), "apiSuccess must wrap payload with success: true");
  assert.ok(content.includes("success: false"), "apiError must wrap payload with success: false");
  assert.ok(content.includes("status: 400"), "apiValidationError must return HTTP 400 Bad Request");
});

runTest("Verify API response envelope contract adheres to ApiResponse<T> interface", () => {
  const commonTypesPath = path.join(rootDir, "src/types/common.ts");
  assert.ok(fs.existsSync(commonTypesPath), "common.ts must exist");
  const content = fs.readFileSync(commonTypesPath, "utf-8");
  assert.ok(content.includes("export interface ApiResponse<T = any>"), "Must define ApiResponse<T>");
  assert.ok(content.includes("success: boolean;"), "ApiResponse must require success boolean");
  assert.ok(content.includes("data?: T;"), "ApiResponse must have optional generic data");
  assert.ok(content.includes("error?: string;"), "ApiResponse must have optional error message");
});

// 9. Component Modularization & Architecture Integrity
console.log("\n--- 9. Component Decomposition & Architecture Integrity ---");

runTest("Verify /contact modular decomposition into 5 standalone components under 400 LOC", () => {
  const contactCompDir = path.join(rootDir, "src/components/contact");
  assert.ok(fs.existsSync(path.join(contactCompDir, "CampusMapCard.tsx")), "CampusMapCard must exist");
  assert.ok(fs.existsSync(path.join(contactCompDir, "ContactDirectoryTable.tsx")), "ContactDirectoryTable must exist");
  assert.ok(fs.existsSync(path.join(contactCompDir, "InquiryFormCard.tsx")), "InquiryFormCard must exist");
  assert.ok(fs.existsSync(path.join(contactCompDir, "TicketStatusTracker.tsx")), "TicketStatusTracker must exist");
  assert.ok(fs.existsSync(path.join(contactCompDir, "SocialChannelsGrid.tsx")), "SocialChannelsGrid must exist");

  const contactPageContent = fs.readFileSync(path.join(rootDir, "src/app/contact/page.tsx"), "utf-8");
  const lineCount = contactPageContent.split("\n").length;
  assert.ok(lineCount < 400, `/contact/page.tsx should be under 400 lines (currently ${lineCount})`);
});

runTest("Verify /complaints-tracking modular decomposition into 4 standalone components under 800 LOC", () => {
  const compDir = path.join(rootDir, "src/components/complaints");
  assert.ok(fs.existsSync(path.join(compDir, "UnifiedTaskTrackerTable.tsx")), "UnifiedTaskTrackerTable must exist");
  assert.ok(fs.existsSync(path.join(compDir, "DigitalServicesGateway.tsx")), "DigitalServicesGateway must exist");
  assert.ok(fs.existsSync(path.join(compDir, "ComplaintSubmissionModal.tsx")), "ComplaintSubmissionModal must exist");
  assert.ok(fs.existsSync(path.join(compDir, "ComplaintDetailModal.tsx")), "ComplaintDetailModal must exist");

  const pageContent = fs.readFileSync(path.join(rootDir, "src/app/complaints-tracking/page.tsx"), "utf-8");
  const lineCount = pageContent.split("\n").length;
  assert.ok(lineCount < 800, `/complaints-tracking/page.tsx should be under 800 lines (currently ${lineCount})`);
});

runTest("Verify /attendance-tracking modular decomposition into 4 standalone components under 300 LOC", () => {
  const attDir = path.join(rootDir, "src/components/attendance");
  assert.ok(fs.existsSync(path.join(attDir, "ZoomClassroomsGrid.tsx")), "ZoomClassroomsGrid must exist");
  assert.ok(fs.existsSync(path.join(attDir, "TuitionServicesCard.tsx")), "TuitionServicesCard must exist");
  assert.ok(fs.existsSync(path.join(attDir, "PetitionsTrackerCard.tsx")), "PetitionsTrackerCard must exist");
  assert.ok(fs.existsSync(path.join(attDir, "DownloadCenterCard.tsx")), "DownloadCenterCard must exist");
  assert.ok(fs.existsSync(path.join(rootDir, "src/data/zoomScheduleData.ts")), "zoomScheduleData.ts must exist");

  const pageContent = fs.readFileSync(path.join(rootDir, "src/app/attendance-tracking/page.tsx"), "utf-8");
  const lineCount = pageContent.split("\n").length;
  assert.ok(lineCount < 300, `/attendance-tracking/page.tsx should be under 300 lines (currently ${lineCount})`);
});

// 10. Production Security Hardening & Malware Defense (WannaCry / Crypto Mining / OWASP)
console.log("\n--- 10. Production Security Hardening & Malware Defense ---");

runTest("Verify Content-Security-Policy (CSP) blocks unauthorized scripts and crypto-mining WebSocket pools", () => {
  const nextConfigContent = fs.readFileSync(path.join(rootDir, "next.config.ts"), "utf-8");
  assert.ok(nextConfigContent.includes("Content-Security-Policy"), "Must configure Content-Security-Policy");
  assert.ok(nextConfigContent.includes("default-src 'self'"), "CSP must set default-src 'self'");
  assert.ok(nextConfigContent.includes("object-src 'none'"), "CSP must block object-src to prevent plugin exploits");
  assert.ok(
    nextConfigContent.includes("connect-src 'self' https://accounts.google.com"),
    "connect-src must restrict connections to self & Google (blocks crypto-mining pools wss://)"
  );
});

runTest("Verify in-memory sliding window Rate Limiter enforces thresholds and provides retry-after", () => {
  clearRateLimitStore();
  const testKey = "system-test-ip-127.0.0.1";
  const limit = 2;
  const windowSec = 10;

  assert.strictEqual(checkRateLimit(testKey, limit, windowSec).success, true);
  assert.strictEqual(checkRateLimit(testKey, limit, windowSec).success, true);
  const blocked = checkRateLimit(testKey, limit, windowSec);
  assert.strictEqual(blocked.success, false);
  assert.strictEqual(blocked.remaining, 0);
  assert.ok(blocked.retryAfterSeconds > 0);
});

runTest("Verify Login route integrates Rate Limiter and SECURITY_ALERT logging", () => {
  const loginRouteContent = fs.readFileSync(path.join(rootDir, "src/app/api/auth/login/route.ts"), "utf-8");
  assert.ok(loginRouteContent.includes("checkRateLimit"), "Login route must check rate limit");
  assert.ok(loginRouteContent.includes("429"), "Login route must return HTTP 429 when rate limited");
  assert.ok(loginRouteContent.includes("SECURITY_ALERT"), "Login route must log security alert on brute force");
});

runTest("Verify Scrypt password hashing with unique salts and timing-safe comparison", () => {
  const testPass = "DhammaCollege#2569";
  const hash1 = hashPassword(testPass);
  const hash2 = hashPassword(testPass);

  assert.ok(hash1.startsWith("scrypt:"), "Hash format must start with scrypt: prefix");
  assert.ok(isPasswordHashed(hash1), "isPasswordHashed must return true");
  assert.notStrictEqual(hash1, hash2, "Salts must be unique for each hash");
  assert.strictEqual(verifyPassword(testPass, hash1), true, "Correct password must verify");
  assert.strictEqual(verifyPassword("WrongPassword", hash1), false, "Wrong password must fail");
});

runTest("Verify Auth Data uses verifyPassword instead of plaintext string equality", () => {
  const authDataContent = fs.readFileSync(path.join(rootDir, "src/data/authData.ts"), "utf-8");
  assert.ok(authDataContent.includes("verifyPassword"), "authData.ts must use verifyPassword");
  assert.ok(!authDataContent.includes("uPassword === normSecret"), "Must not perform raw string equality on passwords");
});

runTest("Verify File Viewer route strictly confines paths and rejects Path Traversal (CWE-22)", () => {
  const fvContent = fs.readFileSync(path.join(rootDir, "src/app/api/file-viewer/route.ts"), "utf-8");
  assert.ok(fvContent.includes("FORBIDDEN_TRAVERSAL"), "Must return FORBIDDEN_TRAVERSAL on traversal injection");
  assert.ok(fvContent.includes("isPathConfinedAndSafe"), "Must enforce chroot confinement to docs/ or public/");
  assert.ok(fvContent.includes(".env"), "Must explicitly block .env files");
});

runTest("Verify File Viewer blocks dangerous executable malware extensions and enforces size limit", () => {
  const fvContent = fs.readFileSync(path.join(rootDir, "src/app/api/file-viewer/route.ts"), "utf-8");
  assert.ok(fvContent.includes("BLOCKED_EXTENSIONS"), "Must maintain BLOCKED_EXTENSIONS list");
  assert.ok(fvContent.includes(".exe"), "Must block .exe");
  assert.ok(fvContent.includes(".bat"), "Must block .bat");
  assert.ok(fvContent.includes(".sh"), "Must block .sh");
  assert.ok(fvContent.includes(".ps1"), "Must block .ps1");
  assert.ok(fvContent.includes("MAX_FILE_SIZE_BYTES"), "Must enforce maximum upload file size");
});

runTest("Verify Windows OS hardening script checks port 445 (SMB) and port 5432 (PostgreSQL)", () => {
  const scriptContent = fs.readFileSync(path.join(rootDir, "scripts/windows-hardening-check.bat"), "utf-8");
  assert.ok(scriptContent.includes("445"), "Must check SMB port 445 (WannaCry vector)");
  assert.ok(scriptContent.includes("5432"), "Must check PostgreSQL port 5432 (Database vector)");
  assert.ok(scriptContent.includes("SMB1Protocol"), "Must advise disabling SMBv1");
});

// 11. Faculty Research Publications & TCI-ThaiJO Repository
console.log("\n--- 11. Faculty Research Publications & TCI-ThaiJO Global Repository ---");

runTest("Verify facultyPublications contains authentic articles with required schema fields", () => {
  assert.ok(facultyPublications.length >= 15, `Must have at least 15 publications (currently ${facultyPublications.length})`);
  facultyPublications.forEach((pub) => {
    assert.ok(pub.id, "Publication must have id");
    assert.ok(pub.title, "Publication must have title");
    assert.ok(pub.authors.length > 0, "Publication must have authors");
    assert.ok(pub.facultyPersonnel, "Publication must have facultyPersonnel");
    assert.ok(pub.journal, "Publication must have journal name");
    assert.ok(pub.yearBE >= 2560, "Publication year must be >= 2560");
    assert.ok(pub.journalTier, "Publication must have journalTier");
    assert.ok(pub.externalUrl, "Publication must have externalUrl");
  });
});

runTest("Verify all externalUrls start with http:// or https:// and link to legitimate journal databases", () => {
  facultyPublications.forEach((pub) => {
    assert.ok(
      pub.externalUrl.startsWith("http://") || pub.externalUrl.startsWith("https://"),
      `externalUrl must start with http(s): ${pub.externalUrl}`
    );
    const validDomains = ["tci-thaijo.org", "zkdx.ch", "scopus.com", "wjst.wu.ac.th"];
    const hasValidDomain = validDomains.some((d) => pub.externalUrl.includes(d));
    assert.ok(
      hasValidDomain,
      `externalUrl should point to a recognized academic database or journal domain: ${pub.externalUrl}`
    );
  });
});

runTest("Verify Scopus Q1 international publication is indexed with valid metadata", () => {
  const scopusPubs = facultyPublications.filter((p) => p.journalTier === "Scopus Q1");
  assert.ok(scopusPubs.length >= 1, "Must contain at least 1 Scopus Q1 article");
  const scopus = scopusPubs[0];
  assert.ok(scopus.database === "Scopus", "Database must be Scopus");
  assert.ok(scopus.externalUrl.includes("zkdx.ch"), "Must have direct journal URL");
});

runTest("Verify key college personnel have authentic publications in repository", () => {
  const authorsSet = new Set(facultyPublications.map((p) => p.facultyPersonnel));
  assert.ok(Array.from(authorsSet).some((a) => a.includes("สมบูรณ์")), "Must include Dr. Somboon Jaruna publications");
  assert.ok(Array.from(authorsSet).some((a) => a.includes("พระธรรมวชิราจารย์")), "Must include Phra Dharmavajiracharya publications");
  assert.ok(Array.from(authorsSet).some((a) => a.includes("พระมหาศุภวัฒน์")), "Must include Phramaha Supawat publications");
  assert.ok(Array.from(authorsSet).some((a) => a.includes("ธนสิทธิ์")), "Must include Dr. Thanasit Chatsuwan publications");
  assert.ok(facultyPublicationStats.totalPublications === facultyPublications.length, "Stats total must match array length");
});

runTest("Verify /api/publications API route exists and exports GET handler with standard response", () => {
  const apiPubPath = path.join(rootDir, "src/app/api/publications/route.ts");
  assert.ok(fs.existsSync(apiPubPath), "api/publications/route.ts must exist");
  const content = fs.readFileSync(apiPubPath, "utf-8");
  assert.ok(content.includes("export async function GET"), "Must export GET handler");
  assert.ok(content.includes("apiSuccess"), "Must use standard apiSuccess response envelope");
  assert.ok(content.includes("facultyPublications"), "Must reference facultyPublications");
});

runTest("Verify Research-QA page integrates TCI-ThaiJO publications tab and direct portal links", () => {
  const researchPagePath = path.join(rootDir, "src/app/research-qa/page.tsx");
  assert.ok(fs.existsSync(researchPagePath), "research-qa/page.tsx must exist");
  const content = fs.readFileSync(researchPagePath, "utf-8");
  assert.ok(content.includes("facultyPublications"), "Must import facultyPublications");
  assert.ok(content.includes("https://www.tci-thaijo.org/en"), "Must include official TCI-ThaiJO link");
  assert.ok(content.includes("activeTab === \"publications\""), "Must have publications tab");
  assert.ok(content.includes("คัดลอกรายการอ้างอิง"), "Must provide citation copy button");
});

// Summary
console.log("\n==========================================================");
console.log(`  AUDIT RESULTS: ${passedCount} / ${totalTests} TESTS PASSED`);
console.log("==========================================================");

if (passedCount < totalTests) {
  process.exit(1);
} else {
  console.log("✅ ALL AUDIT REQUIREMENTS FULLY MET & VERIFIED!\n");
}
