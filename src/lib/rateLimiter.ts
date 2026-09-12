/**
 * In-Memory Sliding Window Rate Limiter & IP Extraction Helper
 * มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
 * 
 * ใช้ป้องกันการโจมตีแบบ Brute-force, Password Spraying, DoS, และ Resource Exhaustion
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale records periodically (every 10 minutes)
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleRecords(now: number, windowMs: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfterSeconds?: number;
}

/**
 * Check and consume a rate limit token
 * @param key Unique key (e.g. IP address, user identifier, or route:ip)
 * @param limit Maximum allowed requests within the window
 * @param windowSeconds Window duration in seconds
 */
export function checkRateLimit(
  key: string,
  limit: number = 60,
  windowSeconds: number = 60
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  cleanupStaleRecords(now, windowMs);

  let record = rateLimitStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(key, record);
  }

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

    return {
      success: false,
      limit,
      remaining: 0,
      resetTime,
      retryAfterSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  const resetTime = record.timestamps[0] + windowMs;

  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetTime,
  };
}

/**
 * Extract client IP from Next.js Request headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Clear rate limit store (useful for unit testing)
 */
export function clearRateLimitStore(): void {
  rateLimitStore.clear();
}
