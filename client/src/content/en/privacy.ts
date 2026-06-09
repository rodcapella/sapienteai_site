// /content/en/privacy.ts (or /content/pt/privacy.ts for Portuguese)
import { Gavel, Hourglass, Info, Mail, Share2, ShieldCheck, Target, UserCog, UserPlus } from "@/lib/icons";

export const privacyEN = {
  title: "Privacy Policy",
  subtitle: "Your privacy matters to us",
  highlight: "Simple, clear, and GDPR compliant.",
  lastUpdated: "Last updated: June, 2026",

  sections: [
    {
      id: "intro",
      icon: ShieldCheck,
      title: "1. Who we are and what we do",
      content: "Sapiente.AI is an Artificial Intelligence consulting company based in Aveiro, Portugal. This policy explains how we handle your personal data when you visit our website or contact us."
    },
    {
      id: "data",
      icon: UserPlus,
      title: "2. What data we collect",
      content: [
        "Name and work email (when you fill out the contact form or sign up for the newsletter).",
        "Mobile phone number, company and job title when these details are provided through forms or business communications.",
        "Technical preferences stored in the browser, such as the selected browsing theme, the language associated with the URL and cookie banner choices.",
        "For cookie consent, we only store the user's decision (accepted, rejected or custom), category preferences (essential, analytics and marketing) and the cookie banner version shown.",
        "Messages you send us by email, website forms or other contact channels.",
        "Anonymous technical data (anonymized IP address, browser type) – used only for internal statistics."
      ]
    },
    {
      id: "purpose",
      icon: Target,
      title: "3. How we use your data",
      content: [
        "To answer your questions and send you quotes.",
        "To send our newsletter (only if you opt in).",
        "To improve our website and services."
      ]
    },
    {
      id: "legal",
      icon: Gavel,
      title: "4. Legal basis for processing",
      content: "We process your data based on your consent (e.g., newsletter) or our legitimate interest in responding to business inquiries. We never sell or share your data with third parties for marketing purposes."
    },
    {
      id: "sharing",
      icon: Share2,
      title: "5. Sharing with third parties",
      content: "We only use essential tools to run our website and manage contacts (e.g., email server, newsletter platform). All our providers comply with the GDPR and your data remains within the European Union."
    },
    {
      id: "rights",
      icon: UserCog,
      title: "6. Your rights",
      content: "You can request to view, correct, or delete your data at any time. You can also unsubscribe from the newsletter and object to the use of your data. Just send an email to contato@sapienteai.com."
    },
    {
      id: "retention",
      icon: Hourglass,
      title: "7. How long we keep your data",
      content: "We keep your data as long as we have an active business relationship or as needed to comply with legal obligations. After that, it is deleted or anonymized."
    },
    {
      id: "contact",
      icon: Mail,
      title: "8. Contact for privacy questions",
      content: "Any questions or want to exercise your rights? Write to contato@sapienteai.com with the subject 'Privacy'. We will reply as soon as possible."
    },
    {
      id: "gdpr-details",
      icon: Info,
      title: "9. Additional Information for Clients (GDPR)",
      content: "If you are a client or business partner and require technical details such as subcontractors, security measures, or contractual clauses, please request our 'Data Processing Addendum' by emailing contato@sapienteai.com."
    }
  ]
};
