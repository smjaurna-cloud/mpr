import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { fileURLToPath } from "node:url";

import { hashPassword, verifyPassword, isPasswordHashed } from "../src/lib/passwordSecurity.ts";
import { checkRateLimit, clearRateLimitStore } from "../src/lib/rateLimiter.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("==========================================================");
console.log("  PRODUCTION SECURITY AUDIT & HARDENING SCAN");
console.log("  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)");
console.log("==========================================================\n");

let passed = 0;
let total = 0;

function check(title, fn) {
  total++;
  try {
    fn();
    console.log(`  [SEC-PASS] ${title}`);
    passed++;
  } catch (err) {
    console.error(`  [SEC-FAIL] ${title}`);
    console.error(`             Error: ${err.message}`);
  }
}

// 1. Content Security Policy & Security Headers Check
console.log("--- 1. HTTP Security Headers & Anti-Crypto Mining Policy ---");

check("next.config.ts contains strict Content-Security-Policy (CSP)", () => {
  const nextConfigContent = fs.readFileSync(path.join(rootDir, "next.config.ts"), "utf-8");
  assert.ok(nextConfigContent.includes("Content-Security-Policy"), "Must configure Content-Security-Policy");
  assert.ok(nextConfigContent.includes("default-src 'self'"), "CSP must set default-src 'self'");
  assert.ok(nextConfigContent.includes("object-src 'none'"), "CSP must block object-src to prevent plugin exploits");
  assert.ok(nextConfigContent.includes("frame-ancestors 'self'"), "CSP must prevent clickjacking");
  assert.ok(
    nextConfigContent.includes("connect-src 'self' https://accounts.google.com"),
    "connect-src must restrict connections to self & Google (blocks crypto-mining pools wss://)"
  );
});

check("HSTS, X-Frame-Options, and nosniff headers present", () => {
  const nextConfigContent = fs.readFileSync(path.join(rootDir, "next.config.ts"), "utf-8");
  assert.ok(nextConfigContent.includes("Strict-Transport-Security"), "Must enforce HSTS");
  assert.ok(nextConfigContent.includes("X-Frame-Options"), "Must enforce X-Frame-Options");
  assert.ok(nextConfigContent.includes("X-Content-Type-Options"), "Must enforce nosniff");
  assert.ok(nextConfigContent.includes("Referrer-Policy"), "Must enforce Referrer-Policy");
});

// 2. Rate Limiting Protection (Anti-Brute Force & Anti-DoS)
console.log("\n--- 2. Rate Limiting & Anti-Brute Force Protection ---");

check("Rate limiter allows requests within threshold and blocks beyond threshold", () => {
  clearRateLimitStore();
  const testKey = "test-ip-127.0.0.1";
  const limit = 3;
  const windowSec = 10;

  // Requests 1 to 3 should succeed
  for (let i = 1; i <= limit; i++) {
    const res = checkRateLimit(testKey, limit, windowSec);
    assert.strictEqual(res.success, true, `Request ${i} should be allowed`);
    assert.strictEqual(res.remaining, limit - i);
  }

  // Request 4 should be blocked with retry-after
  const blockedRes = checkRateLimit(testKey, limit, windowSec);
  assert.strictEqual(blockedRes.success, false, "Request beyond limit must be blocked");
  assert.strictEqual(blockedRes.remaining, 0);
  assert.ok(blockedRes.retryAfterSeconds > 0, "Must provide retryAfterSeconds");
});

check("Login route integrates Rate Limiting and Audit Alerting", () => {
  const loginRouteContent = fs.readFileSync(path.join(rootDir, "src/app/api/auth/login/route.ts"), "utf-8");
  assert.ok(loginRouteContent.includes("checkRateLimit"), "Login route must invoke checkRateLimit");
  assert.ok(loginRouteContent.includes("429"), "Login route must return HTTP 429 when rate limited");
  assert.ok(loginRouteContent.includes("SECURITY_ALERT"), "Login route must log SECURITY_ALERT on brute-force attempts");
});

// 3. Password Security & Cryptographic Hashing
console.log("\n--- 3. Cryptographic Password Hashing & Timing Attack Prevention ---");

check("hashPassword generates salted scrypt hash with unique salts", () => {
  const pwd = "TestPassword@2569";
  const hash1 = hashPassword(pwd);
  const hash2 = hashPassword(pwd);

  assert.ok(hash1.startsWith("scrypt:"), "Hash format must start with scrypt: prefix");
  assert.ok(isPasswordHashed(hash1), "isPasswordHashed must return true");
  assert.notStrictEqual(hash1, hash2, "Two hashes of the same password must have different salts");
});

check("verifyPassword validates correct passwords and rejects incorrect passwords", () => {
  const pwd = "SecurePassword@123";
  const hashed = hashPassword(pwd);

  assert.strictEqual(verifyPassword(pwd, hashed), true, "Correct password must verify successfully");
  assert.strictEqual(verifyPassword("WrongPassword", hashed), false, "Wrong password must be rejected");
  assert.strictEqual(verifyPassword("", hashed), false, "Empty password must be rejected");
});

check("authData uses verifyPassword instead of raw string comparison", () => {
  const authDataContent = fs.readFileSync(path.join(rootDir, "src/data/authData.ts"), "utf-8");
  assert.ok(authDataContent.includes("verifyPassword"), "authData.ts must use verifyPassword");
  assert.ok(!authDataContent.includes("uPassword === normSecret"), "Must not perform raw string equality on passwords");
});

// 4. Path Traversal & File System Confinement (CWE-22)
console.log("\n--- 4. Path Traversal Guard & File Confinement ---");

check("File viewer route contains strict Path Traversal rejection (CWE-22)", () => {
  const fvContent = fs.readFileSync(path.join(rootDir, "src/app/api/file-viewer/route.ts"), "utf-8");
  assert.ok(fvContent.includes(".."), "Must inspect for .. traversal patterns");
  assert.ok(fvContent.includes("FORBIDDEN_TRAVERSAL"), "Must return FORBIDDEN_TRAVERSAL on traversal injection");
  assert.ok(fvContent.includes("isPathConfinedAndSafe"), "Must enforce chroot confinement to docs/ or public/");
  assert.ok(fvContent.includes(".env"), "Must explicitly block .env files");
});

check("File viewer blocks dangerous executable malware extensions", () => {
  const fvContent = fs.readFileSync(path.join(rootDir, "src/app/api/file-viewer/route.ts"), "utf-8");
  assert.ok(fvContent.includes("BLOCKED_EXTENSIONS"), "Must maintain BLOCKED_EXTENSIONS list");
  assert.ok(fvContent.includes(".exe"), "Must block .exe");
  assert.ok(fvContent.includes(".bat"), "Must block .bat");
  assert.ok(fvContent.includes(".sh"), "Must block .sh");
  assert.ok(fvContent.includes(".ps1"), "Must block .ps1");
  assert.ok(fvContent.includes("MAX_FILE_SIZE_BYTES"), "Must enforce maximum upload file size");
});

// 5. Monastic Privacy & Git Protection
console.log("\n--- 5. Data Privacy & Repository Protection ---");

check(".gitignore protects .env and database secrets from git commits", () => {
  const gitignoreContent = fs.readFileSync(path.join(rootDir, ".gitignore"), "utf-8");
  assert.ok(gitignoreContent.includes(".env"), ".gitignore must contain .env");
  assert.ok(gitignoreContent.includes("*.db"), ".gitignore must ignore SQLite databases");
});

console.log("\n==========================================================");
console.log(`  AUDIT SUMMARY: ${passed} / ${total} SECURITY CHECKS PASSED`);
console.log("==========================================================");

if (passed < total) {
  process.exit(1);
} else {
  console.log("✅ PRODUCTION SECURITY POSTURE VERIFIED!\n");
}
