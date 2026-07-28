import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isDisposableEmail } from "@rodcapella/common-resources";
import nodemailer from "nodemailer";

type NewsletterPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  company?: unknown;
  source?: unknown;
  accepted?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const TURNSTILE_ACTION = "contact_form";
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  role: 120,
  company: 160,
  source: 120,
} as const;

function textField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const forwardedIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim();
  const realIp = req.headers["x-real-ip"];
  return forwardedIp || (Array.isArray(realIp) ? realIp[0] : realIp) || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const expectedHostnames = (process.env.TURNSTILE_EXPECTED_HOSTNAMES || "")
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (!secret || expectedHostnames.length === 0 || !token || token === "verification_unavailable") {
    return false;
  }

  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
    const hostname = result.hostname?.toLowerCase() || "";

    return result.success === true
      && result.action === TURNSTILE_ACTION
      && expectedHostnames.includes(hostname);
  } catch (error) {
    console.error("Newsletter Turnstile verification failed.", error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "request_rejected" });
  }

  const payload = (req.body ?? {}) as NewsletterPayload;
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "request_rejected" });
  }

  if (textField(payload.website, 200)) {
    return res.status(400).json({ error: "request_rejected" });
  }

  const oversized = (Object.entries(MAX_LENGTHS) as [keyof typeof MAX_LENGTHS, number][])
    .some(([field, maxLength]) => typeof payload[field] === "string" && payload[field].length > maxLength);
  if (oversized) {
    return res.status(400).json({ error: "request_rejected" });
  }

  const name = textField(payload.name, MAX_LENGTHS.name);
  const email = textField(payload.email, MAX_LENGTHS.email).toLowerCase();
  const role = textField(payload.role, MAX_LENGTHS.role);
  const company = textField(payload.company, MAX_LENGTHS.company);
  const source = textField(payload.source, MAX_LENGTHS.source);
  const turnstileToken = textField(payload.turnstileToken, 2048);

  if (!name || !email || payload.accepted !== true || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "request_rejected" });
  }
  if (isDisposableEmail(email)) {
    return res.status(422).json({ error: "disposable_email" });
  }
  if (!await verifyTurnstile(turnstileToken, ip)) {
    return res.status(400).json({ error: "request_rejected" });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_EMAIL_TO || user;

  if (!host || !user || !password || !recipient || !Number.isInteger(port)) {
    console.error("Newsletter SMTP environment is incomplete.");
    return res.status(503).json({ error: "request_failed" });
  }

  const details = [
    ["Nome", name],
    ["E-mail", email],
    ["Cargo", role || "Não informado"],
    ["Empresa", company || "Não informada"],
    ["Como nos conheceu", source || "Não informado"],
    ["Consentimento", "Aceite"],
  ];
  const text = details.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2>Novo registo na newsletter Sapiente.AI</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      ${details.map(([label, value]) => `
        <tr>
          <th align="left" style="border-bottom:1px solid #dbeafe">${escapeHtml(label)}</th>
          <td style="border-bottom:1px solid #dbeafe">${escapeHtml(value)}</td>
        </tr>`).join("")}
    </table>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: `"Sapiente.AI — Newsletter" <${user}>`,
      to: recipient,
      replyTo: { name, address: email },
      subject: `Novo registo na newsletter — ${name}`,
      text,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP newsletter delivery failed.", error);
    return res.status(502).json({ error: "request_failed" });
  }
}
