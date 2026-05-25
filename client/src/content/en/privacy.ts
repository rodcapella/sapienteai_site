// /content/en/privacy.ts (or /content/pt/privacy.ts for Portuguese)
import { Icons } from "@/lib/icons";

export const privacyEN = {
  title: "Privacy Policy",
  subtitle: "Your privacy matters to us",
  highlight: "Simple, clear, and GDPR compliant.",
  lastUpdated: "Last updated: May, 2026",

  sections: [
    {
      id: "intro",
      icon: Icons.ShieldCheck,
      title: "1. Who we are and what we do",
      content: "Sapiente.AI is an Artificial Intelligence consulting company based in Aveiro, Portugal. This policy explains how we handle your personal data when you visit our website or contact us."
    },
    {
      id: "data",
      icon: Icons.UserPlus,
      title: "2. What data we collect",
      content: [
        "Name and work email (when you fill out the contact form or sign up for the newsletter).",
        "Messages you send us (by email or chat).",
        "Anonymous technical data (anonymized IP address, browser type) – used only for internal statistics."
      ]
    },
    {
      id: "purpose",
      icon: Icons.Target,
      title: "3. How we use your data",
      content: [
        "To answer your questions and send you quotes.",
        "To send our newsletter (only if you opt in).",
        "To improve our website and services."
      ]
    },
    {
      id: "legal",
      icon: Icons.Gavel,
      title: "4. Legal basis for processing",
      content: "We process your data based on your consent (e.g., newsletter) or our legitimate interest in responding to business inquiries. We never sell or share your data with third parties for marketing purposes."
    },
    {
      id: "sharing",
      icon: Icons.Share2,
      title: "5. Sharing with third parties",
      content: "We only use essential tools to run our website and manage contacts (e.g., email server, newsletter platform). All our providers comply with the GDPR and your data remains within the European Union."
    },
    {
      id: "rights",
      icon: Icons.UserCog,
      title: "6. Your rights",
      content: "You can request to view, correct, or delete your data at any time. You can also unsubscribe from the newsletter and object to the use of your data. Just send an email to contato@sapienteai.com."
    },
    {
      id: "retention",
      icon: Icons.Hourglass,
      title: "7. How long we keep your data",
      content: "We keep your data as long as we have an active business relationship or as needed to comply with legal obligations. After that, it is deleted or anonymized."
    },
    {
      id: "contact",
      icon: Icons.Mail,
      title: "8. Contact for privacy questions",
      content: "Any questions or want to exercise your rights? Write to contato@sapienteai.com with the subject 'Privacy'. We will reply as soon as possible."
    },
    {
      id: "gdpr-details",
      icon: Icons.Info,
      title: "9. Additional Information for Clients (GDPR)",
      content: "If you are a client or business partner and require technical details such as subcontractors, security measures, or contractual clauses, please request our 'Data Processing Addendum' by emailing contato@sapienteai.com."
    }
  ]
};