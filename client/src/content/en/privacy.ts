// /content/en/privacy.ts
import { createElement as h } from "react";
import { FileText, Gavel, Hourglass, Mail, Share2, ShieldCheck, Target, UserCog, UserPlus } from "@/lib/icons";

const privacyMailtoEN = "mailto:contato@sapienteai.com?subject=Privacy%20Policy";

function createPrivacyContactBlockEN(text: string) {
  return h(
    "div",
    { className: "flex flex-col gap-4" },
    h("p", null, text),
    h(
      "div",
      { className: "pt-1" },
      h(
        "a",
        {
          href: privacyMailtoEN,
          className:
            "inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-center font-[var(--font-body)] text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid)_24%,transparent)]",
        },
        "Talk to us",
      ),
    ),
  );
}

export const privacyEN = {
  title: "Privacy Policy",
  subtitle: "Your privacy matters to us",
  highlight: "Simple, clear, and GDPR compliant.",
  lastUpdated: "Last updated: June 2026",

  sections: [
    {
      id: "intro",
      icon: ShieldCheck,
      navLabel: "Who we are",
      title: "1. Who we are and what we do",
      content:
        "Sapiente.AI is an Artificial Intelligence consulting company based in Aveiro, Portugal. This policy explains how we handle your personal data when you visit our website or contact us.",
    },
    {
      id: "data",
      icon: UserPlus,
      navLabel: "Data collected",
      title: "2. What data we collect",
      content: [
        "Name and work email (when you fill out the contact form or sign up for the newsletter).",
        "Mobile phone number, company and job title when these details are provided through forms or business communications.",
        "Technical preferences stored in the browser, such as the selected browsing theme, the language associated with the URL and cookie banner choices.",
        "For cookie consent, we only store the user's decision (accepted, rejected or custom), category preferences (essential, analytics and marketing) and the cookie banner version shown.",
        "Messages you send us by email, website forms or other contact channels.",
        "Anonymous technical data (anonymized IP address, browser type) - used only for internal statistics.",
      ],
    },
    {
      id: "purpose",
      icon: Target,
      navLabel: "Usage",
      title: "3. How we use your data",
      content: [
        "To answer your questions and send you quotes.",
        "To send our newsletter (only if you opt in).",
        "To improve our website and services.",
      ],
    },
    {
      id: "legal",
      icon: Gavel,
      navLabel: "Legal basis",
      title: "4. Legal basis for processing",
      content:
        "We process your data based on your consent (e.g., newsletter) or our legitimate interest in responding to business inquiries. We never sell or share your data with third parties for marketing purposes.",
    },
    {
      id: "sharing",
      icon: Share2,
      navLabel: "Sharing",
      title: "5. Sharing with third parties",
      content:
        "We only use essential tools to run our website and manage contacts (e.g., email server, newsletter platform). All our providers comply with the GDPR and your data remains within the European Union.",
    },
    {
      id: "rights",
      icon: UserCog,
      navLabel: "Rights",
      title: "6. Your rights",
      content: h(
        "p",
        null,
        "You can request to view, correct, or delete your data at any time. You can also unsubscribe from the newsletter and object to the use of your data. Just send an email to ",
        h(
          "a",
          {
            href: privacyMailtoEN,
            className: "font-semibold text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-4",
          },
          "contato@sapienteai.com",
        ),
        ".",
      ),
    },
    {
      id: "retention",
      icon: Hourglass,
      navLabel: "Retention",
      title: "7. How long we keep your data",
      content:
        "We keep your data as long as we have an active business relationship or as needed to comply with legal obligations. After that, it is deleted or anonymized.",
    },
    {
      id: "contact",
      icon: Mail,
      navLabel: "Contact",
      title: "8. Contact for privacy questions",
      content: createPrivacyContactBlockEN(
        "Any questions about our Privacy Policy or want to exercise your rights? Use the button below to contact us and we will reply as soon as possible.",
      ),
    },
    {
      id: "gdpr-details",
      icon: FileText,
      navLabel: "GDPR addendum",
      title: "9. Additional Information for Clients (GDPR)",
      content: createPrivacyContactBlockEN(
        "If you are a client or business partner and require technical details such as subcontractors, security measures, or contractual clauses, you can request our 'Data Processing Addendum' using the button below.",
      ),
    },
  ],
};
