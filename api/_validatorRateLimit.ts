import type { VercelRequest } from "@vercel/node";

const MAX_REQUESTS = 2;
const WINDOW_MS = 2 * 60 * 60 * 1000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: VercelRequest) {
  const forwarded = req.headers["x-forwarded-for"];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim()
    || req.socket.remoteAddress
    || "unknown";
}

export function isValidatorRateLimited(req: VercelRequest) {
  if (process.env.VERCEL_ENV !== "production") return false;

  const ip = clientIp(req);
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}
