import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isDisposableEmail } from "@rodcapella/common-resources";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  source?: unknown;
  topic?: unknown;
  message?: unknown;
  lang?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const TURNSTILE_ACTION = "contact_form";
const DEFAULT_TURNSTILE_HOSTNAMES = [
  "sapienteai.com",
  "www.sapienteai.com",
  "sapienteaisite.vercel.app",
];
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 20,
  company: 160,
  source: 120,
  topic: 160,
  message: 1000,
} as const;

function textField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function hasOversizedFields(payload: ContactPayload) {
  return (Object.entries(MAX_LENGTHS) as [keyof typeof MAX_LENGTHS, number][])
    .some(([field, maxLength]) => typeof payload[field] === "string" && payload[field].length > maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type ContactConfirmationEmailTemplate = {
  name: string;
  topic: string;
  message: string;
  lang: "pt" | "en";
};

function buildContactConfirmationEmailHtml({
  name,
  topic,
  message,
  lang,
}: ContactConfirmationEmailTemplate) {
  const copy = lang === "en"
    ? {
        htmlLang: "en",
        title: "Message received",
        preheader: "Thank you for contacting Sapiente.AI. Your message has been received.",
        tagline: "Applied artificial intelligence, automation and digital growth.",
        footerTagline: "Digital transformation with applied artificial intelligence.",
        badge: "Message confirmed",
        heading: "Thank you for reaching out",
        greeting: `Hello ${name},`,
        intro: "Thank you for contacting Sapiente.AI. Your message has been received successfully and our team will respond within 48 business hours.",
        statusLabel: "Status",
        statusValue: "Message received",
        statusDetail: "Successfully delivered",
        responseLabel: "Expected response",
        responseValue: "Within 48 hours",
        responseDetail: "During business days",
        reference: "Message reference",
        messageLabel: "Your message",
        automated: "This is an automated confirmation that your message was delivered through sapienteai.com.",
        rights: "ALL RIGHTS RESERVED",
      }
    : {
        htmlLang: "pt-PT",
        footerTagline: "Transformação digital com inteligência artificial aplicada.",
        title: "Mensagem recebida",
        preheader: "Obrigado por contactar a Sapiente.AI. A sua mensagem foi recebida.",
        tagline: "Inteligência artificial aplicada, automação e crescimento digital.",
        badge: "Mensagem confirmada",
        heading: "Obrigado pelo seu contacto",
        greeting: `Olá ${name},`,
        intro: "Obrigado por contactar a Sapiente.AI. A sua mensagem foi recebida com sucesso e a nossa equipa responderá num prazo de até 48 horas úteis.",
        statusLabel: "Estado",
        statusValue: "Mensagem recebida",
        statusDetail: "Entregue com sucesso",
        responseLabel: "Resposta prevista",
        responseValue: "Até 48 horas",
        responseDetail: "Em dias úteis",
        reference: "Referência da mensagem",
        messageLabel: "A sua mensagem",
        automated: "Esta é uma confirmação automática de que a sua mensagem foi entregue através de sapienteai.com.",
        rights: "TODOS OS DIREITOS RESERVADOS",
      };

  return `<!doctype html>
<html lang="${copy.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>${copy.title}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
        .column { display: block !important; width: 100% !important; box-sizing: border-box !important; }
        .column-gap { display: none !important; }
        .brand-logo { width: 220px !important; max-width: 100% !important; height: auto !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#001027;color:#e8f1ff;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${copy.preheader}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#001027;">
      <tr>
        <td align="center" style="padding:16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:600px;max-width:600px;background-color:#041b38;border:1px solid #174c7d;border-collapse:separate;">
            <tr>
              <td class="email-padding" style="padding:20px 24px;border-bottom:1px solid #123b64;font-family:Arial,Helvetica,sans-serif;">
                <img class="brand-logo" src="https://www.sapienteai.com/media/logos/Original/Logo_Sapiente_fundo_escuro.png" width="230" alt="Sapiente.AI" style="display:block;width:230px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
                <div style="padding-top:8px;color:#a9bfd9;font-size:12px;line-height:18px;">
                  ${copy.tagline}
                </div>
              </td>
            </tr>
            <tr>
              <td class="email-padding" style="padding:28px 24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding-bottom:8px;color:#39c8f0;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      &#10003;&nbsp;&nbsp;${copy.badge}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#ffffff;font-size:32px;line-height:40px;font-weight:700;letter-spacing:-0.6px;">
                      ${copy.heading}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#d4e1f1;font-size:16px;line-height:25px;">
                      ${copy.greeting}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:28px;color:#d4e1f1;font-size:16px;line-height:25px;">
                      ${copy.intro}
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #174c7d;background-color:#062346;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:18px;color:#39c8f0;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">${copy.statusLabel}</td>
                        </tr>
                        <tr>
                          <td style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">${copy.statusValue}</td>
                        </tr>
                        <tr>
                          <td style="color:#a9bfd9;font-size:14px;line-height:20px;">${copy.statusDetail}</td>
                        </tr>
                      </table>
                    </td>
                    <td class="column-gap" width="16" style="width:16px;font-size:0;line-height:0;">&nbsp;</td>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #174c7d;background-color:#062346;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:18px;color:#39c8f0;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">${copy.responseLabel}</td>
                        </tr>
                        <tr>
                          <td style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">${copy.responseValue}</td>
                        </tr>
                        <tr>
                          <td style="color:#a9bfd9;font-size:14px;line-height:20px;">${copy.responseDetail}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;border:1px solid #174c7d;border-radius:6px;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 24px;background-color:#082b53;border-bottom:1px solid #174c7d;color:#39c8f0;font-size:12px;font-weight:700;letter-spacing:0.5px;">
                      ${copy.reference}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:17px 24px;color:#ffffff;font-size:15px;line-height:22px;font-weight:600;">
                      ${topic}
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
                  <tr>
                    <td style="padding-bottom:14px;color:#d4e1f1;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
                      &#9633;&nbsp;&nbsp;${copy.messageLabel}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;background-color:#082b53;border:1px solid #286da6;border-radius:8px;color:#80dcf7;font-size:17px;line-height:27px;font-weight:600;font-style:italic;">
                      &ldquo;${message}&rdquo;
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;padding-top:24px;border-top:1px solid #174c7d;">
                  <tr>
                    <td style="color:#91a9c5;font-size:12px;line-height:19px;">
                      ${copy.automated}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:30px 24px 26px;background-color:#001432;border-top:1px solid #174c7d;">
                <table role="presentation" width="72" cellspacing="0" cellpadding="0" border="0" style="width:72px;margin:0 auto 22px;">
                  <tr>
                    <td width="30" height="2" style="width:30px;height:2px;background-color:#1687ff;font-size:0;line-height:0;">&nbsp;</td>
                    <td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>
                    <td width="30" height="2" style="width:30px;height:2px;background-color:#39c8f0;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
                <img class="brand-logo" src="https://www.sapienteai.com/media/logos/Original/Logo_Sapiente_fundo_escuro.png" width="240" alt="Sapiente.AI" style="display:block;width:240px;max-width:100%;height:auto;margin:0 auto;border:0;outline:none;text-decoration:none;" />
                <div style="padding-top:14px;color:#d4e1f1;font-size:13px;line-height:20px;">
                  ${copy.footerTagline}
                </div>
                <div style="padding-top:14px;color:#91a9c5;font-size:11px;line-height:17px;letter-spacing:0.25px;">
                  &copy; 2026 Sapiente.AI &mdash; ${copy.rights}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function getClientIp(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const forwardedIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim();
  const realIp = req.headers["x-real-ip"];
  return forwardedIp || (Array.isArray(realIp) ? realIp[0] : realIp) || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();

  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore) {
      if (value.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const expectedHostnames = new Set([
    ...DEFAULT_TURNSTILE_HOSTNAMES,
    ...(process.env.TURNSTILE_EXPECTED_HOSTNAMES || "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  ]);

  if (!secret) {
    console.error("Turnstile server environment is incomplete.");
    return false;
  }
  if (!token || token === "verification_unavailable") return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = await response.json() as {
      success?: boolean;
      hostname?: string;
      action?: string;
    };
    const hostname = result.hostname?.toLowerCase() || "";

    return result.success === true
      && result.action === TURNSTILE_ACTION
      && expectedHostnames.has(hostname);
  } catch (error) {
    console.error("Turnstile verification failed.", error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "request_rejected" });
  }

  const payload = (req.body ?? {}) as ContactPayload;
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const website = textField(payload.website, 200);
  if (website) {
    return res.status(400).json({ error: "request_rejected" });
  }

  if (hasOversizedFields(payload)) {
    return res.status(400).json({ error: "request_rejected" });
  }

  const name = textField(payload.name, MAX_LENGTHS.name);
  const email = textField(payload.email, MAX_LENGTHS.email).toLowerCase();
  const phone = textField(payload.phone, MAX_LENGTHS.phone);
  const company = textField(payload.company, MAX_LENGTHS.company);
  const source = textField(payload.source, MAX_LENGTHS.source);
  const topic = textField(payload.topic, MAX_LENGTHS.topic);
  const message = textField(payload.message, MAX_LENGTHS.message);
  const lang = payload.lang === "en" ? "en" : "pt";
  const turnstileToken = textField(payload.turnstileToken, 2048);

  if (!name || !email || !topic || !message) {
    return res.status(400).json({ error: "request_rejected" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "request_rejected" });
  }
  if (isDisposableEmail(email)) {
    return res.status(422).json({ error: "disposable_email" });
  }

  if (!await verifyTurnstile(turnstileToken, ip)) {
    return res.status(400).json({ error: "turnstile_failed" });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_EMAIL_TO || user;

  if (!host || !user || !password || !recipient || !Number.isInteger(port)) {
    console.error("Contact SMTP environment is incomplete.");
    return res.status(503).json({ error: "request_failed" });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 10_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const details = [
    ["Nome", name],
    ["E-mail", email],
    ["Telefone", phone || "Não informado"],
    ["Empresa", company || "Não informada"],
    ["Como nos conheceu", source || "Não informado"],
    ["Assunto", topic],
  ];
  const subject = `Novo contacto pelo site — ${topic} — ${name}`;
  const text = `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMensagem:\n${message}`;
  const html = `
    <h2>Novo contacto pelo site Sapiente.AI</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      ${details.map(([label, value]) => `
        <tr>
          <th align="left" style="border-bottom:1px solid #dbeafe">${escapeHtml(label)}</th>
          <td style="border-bottom:1px solid #dbeafe">${escapeHtml(value)}</td>
        </tr>`).join("")}
    </table>
    <h3>Mensagem</h3>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Sapiente.AI — Formulário do site" <${user}>`,
      to: recipient,
      replyTo: { name, address: email },
      subject,
      text,
      html,
    });

    const safeName = escapeHtml(name);
    const safeTopic = escapeHtml(topic);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
    const confirmationText = lang === "en"
      ? [
          `Hello ${name},`,
          "",
          "Thank you for contacting Sapiente.AI. Your message has been received successfully and our team will respond within 48 business hours.",
          "",
          `Subject: ${topic}`,
          "",
          "Your message:",
          message,
          "",
          "Sapiente.AI",
          "https://www.sapienteai.com",
        ]
      : [
          `Olá ${name},`,
          "",
          "Obrigado por contactar a Sapiente.AI. A sua mensagem foi recebida com sucesso e a nossa equipa responderá num prazo de até 48 horas úteis.",
          "",
          `Assunto: ${topic}`,
          "",
          "A sua mensagem:",
          message,
          "",
          "Sapiente.AI",
          "https://www.sapienteai.com",
        ];

    try {
      await transporter.sendMail({
        from: `"Sapiente.AI" <${user}>`,
        to: { name, address: email },
        replyTo: recipient,
        subject: lang === "en"
          ? `Message received — ${topic}`
          : `Mensagem recebida — ${topic}`,
        text: confirmationText.join("\n"),
        html: buildContactConfirmationEmailHtml({
          name: safeName,
          topic: safeTopic,
          message: safeMessage,
          lang,
        }),
      });
    } catch (confirmationError) {
      // The original contact already reached Sapiente.AI. A failure in the
      // automated acknowledgement must not tell the visitor it was lost.
      console.error("SMTP contact confirmation delivery failed.", confirmationError);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP contact delivery failed.", error);
    return res.status(502).json({ error: "request_failed" });
  }
}
