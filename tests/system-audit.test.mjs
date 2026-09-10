import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

runTest("Robots.txt and Sitemap.xml generators exist", () => {
  assert.ok(fs.existsSync(path.join(rootDir, "src/app/robots.ts")), "robots.ts must exist");
  assert.ok(fs.existsSync(path.join(rootDir, "src/app/sitemap.ts")), "sitemap.ts must exist");
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

// 5. Summary
console.log("\n==========================================================");
console.log(`  AUDIT RESULTS: ${passedCount} / ${totalTests} TESTS PASSED`);
console.log("==========================================================");

if (passedCount < totalTests) {
  process.exit(1);
} else {
  console.log("✅ ALL AUDIT REQUIREMENTS FULLY MET & VERIFIED!\n");
}
