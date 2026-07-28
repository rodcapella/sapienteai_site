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
  action?: unknown;
  lang?: unknown;
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

const SOCIAL_LINKS = [
  ["LinkedIn", "https://www.linkedin.com/company/sapiente-ai/"],
  ["Instagram", "https://www.instagram.com/sapienteai/"],
  ["Facebook", "https://facebook.com/sapienteai"],
  ["TikTok", "https://www.tiktok.com/@sapienteai"],
  ["X", "https://x.com/SapienteAI"],
  ["Pinterest", "https://www.pinterest.com/sapienteai"],
] as const;

function socialButtonsHtml() {
  return SOCIAL_LINKS.map(([name, url]) =>
    `<a href="${url}" style="display:inline-block;margin:4px 3px;padding:8px 11px;border:1px solid #00a3e0;border-radius:6px;background:#001432;color:#ffffff;font-size:12px;font-weight:bold;text-decoration:none">${name}</a>`,
  ).join("");
}

function buildWelcomeEmail(name: string, lang: "pt" | "en") {
  const isEnglish = lang === "en";
  const safeName = escapeHtml(name);
  const baseUrl = "https://www.sapienteai.com";
  const pagePrefix = isEnglish ? "/en" : "/pt";
  const copy = isEnglish
    ? {
        subject: "Welcome to the Sapiente.AI newsletter",
        welcome: "Welcome!",
        confirmed: "Your newsletter subscription is confirmed.",
        thanks: "Thank you for subscribing",
        greeting: `Hello ${safeName}! We are delighted to have you with us at <strong>Sapiente.AI</strong>. You are now part of a community focused on the future.`,
        expectation: "Get ready to receive the latest <strong>news, market trends and exclusive AI insights</strong> directly in your inbox — completely free.",
        feature: "Exclusive insights",
        featureText: "Content curated by our specialists to keep you ahead in the age of artificial intelligence.",
        latest: "DISCOVER OUR LATEST PUBLICATIONS",
        follow: "FOLLOW US",
        privacy: "Privacy Policy",
        unsubscribe: "Unsubscribe",
        rights: "ALL RIGHTS RESERVED",
      }
    : {
        subject: "Bem-vindo à newsletter Sapiente.AI",
        welcome: "Bem-vindo!",
        confirmed: "A sua subscrição da newsletter está confirmada.",
        thanks: "Obrigado por subscrever",
        greeting: `Olá ${safeName}! Ficamos muito felizes por o ter connosco na <strong>Sapiente.AI</strong>. A partir de agora, faz parte de uma comunidade focada no futuro.`,
        expectation: "Prepare-se para receber diretamente na sua caixa de entrada as últimas <strong>notícias, tendências de mercado e dicas exclusivas de IA</strong> — tudo isto de forma totalmente gratuita.",
        feature: "Insights exclusivos",
        featureText: "Conteúdo curado pelos nossos especialistas para o manter à frente na era da inteligência artificial.",
        latest: "CONHEÇA AS NOSSAS ÚLTIMAS PUBLICAÇÕES",
        follow: "SIGA-NOS",
        privacy: "Política de Privacidade",
        unsubscribe: "Cancelar subscrição",
        rights: "TODOS OS DIREITOS RESERVADOS",
      };

  const text = [
    copy.welcome,
    copy.confirmed,
    "",
    copy.thanks,
    copy.greeting.replace(/<[^>]+>/g, ""),
    copy.expectation.replace(/<[^>]+>/g, ""),
  ].join("\n");

  const html = `<!doctype html>
<html lang="${isEnglish ? "en" : "pt-PT"}">
<body style="margin:0;padding:0;background:#f0f7ff;color:#151c22;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f7ff">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff">
        <tr>
          <td style="padding:18px 32px;border-bottom:1px solid #e8eff7">
            <img src="${baseUrl}/media/logos/Original/Logo_Sapiente_fundo_claro.png" width="180" alt="Sapiente.AI" style="display:block;width:180px;max-width:100%;height:auto;border:0">
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:44px 32px;background:#f0f7ff">
            <div style="display:inline-block;padding:14px 18px;border-radius:12px;background:#dae8fb;color:#003d9b;font-size:36px;line-height:36px">✉</div>
            <h1 style="margin:20px 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:40px;line-height:48px;color:#001432">${copy.welcome}</h1>
            <p style="margin:0;font-size:18px;line-height:28px;color:#434654">${copy.confirmed}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:42px 32px 20px">
            <h2 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:32px;color:#001432">${copy.thanks}</h2>
            <div style="width:48px;height:4px;margin:14px 0 18px;border-radius:4px;background:#00a3e0"></div>
            <p style="margin:0 0 16px;font-size:16px;line-height:25px;color:#434654">${copy.greeting}</p>
            <p style="margin:0;font-size:16px;line-height:25px;color:#434654">${copy.expectation}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 28px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f7ff;border:1px solid #d4e2f6;border-radius:8px">
              <tr>
                <td style="padding:18px">
                  <strong style="display:block;margin-bottom:4px;font-size:16px;line-height:22px;color:#001432">${copy.feature}</strong>
                  <span style="font-size:14px;line-height:21px;color:#434654">${copy.featureText}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:10px 32px 22px">
            <p style="margin:0;font-size:11px;line-height:16px;letter-spacing:1.2px;color:#737685">${copy.latest}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 34px">
            <a href="${baseUrl}${pagePrefix}/blog" style="text-decoration:none">
              <img src="${baseUrl}/media/banners/banner_2_sapienteai.png" width="536" alt="${copy.latest}" style="display:block;width:100%;max-width:536px;height:auto;border:0;border-radius:8px">
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:28px 32px;border-top:1px solid #e8eff7">
            <p style="margin:0 0 14px;font-size:11px;font-weight:bold;letter-spacing:2px;color:#001432">${copy.follow}</p>
            <div>${socialButtonsHtml()}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:34px 24px;background:#001432;color:#ffffff">
            <img src="${baseUrl}/media/logos/Original/Logo_Sapiente_fundo_escuro.png" width="190" alt="Sapiente.AI" style="display:block;width:190px;max-width:100%;height:auto;margin:0 auto 24px;border:0">
            <p style="margin:0 0 18px;font-size:13px;line-height:22px">
              <a href="${baseUrl}${pagePrefix}/privacy" style="color:#dce8f8;text-decoration:none">${copy.privacy}</a>
              &nbsp;&nbsp;·&nbsp;&nbsp; <a href="${baseUrl}${pagePrefix}/newsletter/unsubscribe" style="color:#dce8f8;text-decoration:none">${copy.unsubscribe}</a>
            </p>
            <p style="margin:0;font-size:11px;line-height:18px;letter-spacing:1px;color:#aebdd0">© 2026 SAPIENTE.AI · ${copy.rights}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: copy.subject, text, html };
}

function buildCancellationEmail(lang: "pt" | "en") {
  const isEnglish = lang === "en";
  const baseUrl = "https://www.sapienteai.com";
  const pagePrefix = isEnglish ? "/en" : "/pt";
  const copy = isEnglish
    ? {
        subject: "Newsletter unsubscribe request received",
        title: "Request received",
        message: "We have received your request to unsubscribe from the Sapiente.AI newsletter. Your email address will be removed from future newsletter communications.",
        note: "Thank you for being part of our community.",
        follow: "YOU CAN STILL FOLLOW US",
        privacy: "Privacy Policy",
        rights: "ALL RIGHTS RESERVED",
      }
    : {
        subject: "Pedido de cancelamento da newsletter recebido",
        title: "Pedido recebido",
        message: "Recebemos o seu pedido de cancelamento da newsletter Sapiente.AI. O seu endereço será removido das próximas comunicações da newsletter.",
        note: "Obrigado por ter feito parte da nossa comunidade.",
        follow: "PODE CONTINUAR A ACOMPANHAR-NOS",
        privacy: "Política de Privacidade",
        rights: "TODOS OS DIREITOS RESERVADOS",
      };

  const text = `${copy.title}\n\n${copy.message}\n\n${copy.note}`;
  const html = `<!doctype html>
<html lang="${isEnglish ? "en" : "pt-PT"}">
<body style="margin:0;padding:0;background:#f0f7ff;color:#151c22;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f7ff">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff">
        <tr><td style="padding:18px 32px;border-bottom:1px solid #e8eff7">
          <img src="${baseUrl}/media/logos/Original/Logo_Sapiente_fundo_claro.png" width="180" alt="Sapiente.AI" style="display:block;width:180px;max-width:100%;height:auto;border:0">
        </td></tr>
        <tr><td align="center" style="padding:48px 32px;background:#f0f7ff">
          <div style="display:inline-block;padding:14px 18px;border-radius:12px;background:#dae8fb;color:#003d9b;font-size:34px;line-height:34px">✓</div>
          <h1 style="margin:20px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:44px;color:#001432">${copy.title}</h1>
          <p style="max-width:480px;margin:0;font-size:16px;line-height:26px;color:#434654">${copy.message}</p>
          <p style="margin:18px 0 0;font-size:15px;line-height:24px;color:#434654">${copy.note}</p>
        </td></tr>
        <tr><td align="center" style="padding:32px">
          <p style="margin:0 0 14px;font-size:11px;font-weight:bold;letter-spacing:1.8px;color:#001432">${copy.follow}</p>
          <div>${socialButtonsHtml()}</div>
        </td></tr>
        <tr><td align="center" style="padding:34px 24px;background:#001432;color:#ffffff">
          <img src="${baseUrl}/media/logos/Original/Logo_Sapiente_fundo_escuro.png" width="190" alt="Sapiente.AI" style="display:block;width:190px;max-width:100%;height:auto;margin:0 auto 22px;border:0">
          <p style="margin:0 0 16px;font-size:13px"><a href="${baseUrl}${pagePrefix}/privacy" style="color:#dce8f8;text-decoration:none">${copy.privacy}</a></p>
          <p style="margin:0;font-size:11px;line-height:18px;letter-spacing:1px;color:#aebdd0">© 2026 SAPIENTE.AI · ${copy.rights}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: copy.subject, text, html };
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
  const lang = payload.lang === "en" ? "en" : "pt";
  const action = payload.action === "unsubscribe" ? "unsubscribe" : "subscribe";
  const turnstileToken = textField(payload.turnstileToken, 2048);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "request_rejected" });
  }
  if (action === "subscribe" && (!name || payload.accepted !== true)) {
    return res.status(400).json({ error: "request_rejected" });
  }
  if (action === "subscribe" && isDisposableEmail(email)) {
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

    if (action === "unsubscribe") {
      const cancellationEmail = buildCancellationEmail(lang);
      await Promise.all([
        transporter.sendMail({
          from: `"Sapiente.AI — Newsletter" <${user}>`,
          to: recipient,
          replyTo: email,
          subject: `Pedido de cancelamento da newsletter — ${email}`,
          text: `Foi solicitado o cancelamento da newsletter para o endereço: ${email}`,
          html: `<h2>Pedido de cancelamento da newsletter</h2><p>Remover o endereço <strong>${escapeHtml(email)}</strong> da lista de distribuição.</p>`,
        }),
        transporter.sendMail({
          from: `"Sapiente.AI" <${user}>`,
          to: email,
          replyTo: user,
          subject: cancellationEmail.subject,
          text: cancellationEmail.text,
          html: cancellationEmail.html,
        }),
      ]);
      return res.status(200).json({ ok: true });
    }

    const welcomeEmail = buildWelcomeEmail(name, lang);
    await Promise.all([
      transporter.sendMail({
        from: `"Sapiente.AI — Newsletter" <${user}>`,
        to: recipient,
        replyTo: { name, address: email },
        subject: `Novo registo na newsletter — ${name}`,
        text,
        html,
      }),
      transporter.sendMail({
        from: `"Sapiente.AI" <${user}>`,
        to: { name, address: email },
        replyTo: user,
        subject: welcomeEmail.subject,
        text: welcomeEmail.text,
        html: welcomeEmail.html,
      }),
    ]);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP newsletter delivery failed.", error);
    return res.status(502).json({ error: "request_failed" });
  }
}
