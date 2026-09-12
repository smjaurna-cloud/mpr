/**
 * Cryptographic Password Hashing & Timing-Safe Verification
 * มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 * 
 * ใช้ NIST-recommended Scrypt algorithm ผ่าน Node.js native crypto module
 * ป้องกัน Rainbow Tables และ Side-Channel Timing Attacks
 */

import crypto from "crypto";

const SCRYPT_PREFIX = "scrypt:";
const KEY_LEN = 64;

/**
 * Hash a plain text password with a unique cryptographic salt
 * Returns string formatted as: `scrypt:<salt>:<hash>`
 */
export function hashPassword(plainPassword: string): string {
  if (!plainPassword) {
    throw new Error("Password cannot be empty");
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(plainPassword, salt, KEY_LEN);
  return `${SCRYPT_PREFIX}${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Check if a stored password string is already in hashed format
 */
export function isPasswordHashed(stored: string): boolean {
  if (!stored) return false;
  return stored.startsWith(SCRYPT_PREFIX);
}

/**
 * Verify a plain text password against a stored hash or plaintext fallback
 * Uses crypto.timingSafeEqual to eliminate timing attack vectors
 */
export function verifyPassword(plainPassword: string, storedHashOrPlain?: string): boolean {
  if (!plainPassword || !storedHashOrPlain) {
    return false;
  }

  // 1. If stored as scrypt hash: scrypt:<salt>:<hash>
  if (storedHashOrPlain.startsWith(SCRYPT_PREFIX)) {
    const parts = storedHashOrPlain.slice(SCRYPT_PREFIX.length).split(":");
    if (parts.length !== 2) return false;

    const [salt, expectedHex] = parts;
    try {
      const derivedKey = crypto.scryptSync(plainPassword, salt, KEY_LEN);
      const expectedBuffer = Buffer.from(expectedHex, "hex");
      if (derivedKey.length !== expectedBuffer.length) {
        return false;
      }
      return crypto.timingSafeEqual(derivedKey, expectedBuffer);
    } catch {
      return false;
    }
  }

  // 2. Backward compatibility fallback for legacy plaintext passwords
  const inputBuffer = Buffer.from(plainPassword);
  const storedBuffer = Buffer.from(storedHashOrPlain);

  if (inputBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, storedBuffer);
}
