// /content/en/gdpr.ts
import { Icons } from "@/lib/icons";

export const gdprContentEN = {
  label: "Legal Document",
  title: "GDPR Compliance",
  subtitle: "Strict compliance with the European Union's General Data Protection Regulation.",

  sections: [
    { id: "compliance", icon: Icons.Scale, title: "1. Full GDPR Compliance", content: "SAPIENTE.AI operates in full compliance with Regulation (EU) 2016/679 (GDPR)." },
    { id: "infrastructure-eu", icon: Icons.Globe, title: "2. Approved Tooling Ecosystem", content: "We work only with GDPR-compliant providers." },
    { id: "local-repository", icon: Icons.Database, title: "3. Local Repository Security", content: "Secure environments and restricted access." },
    { id: "local-ai-sovereignty", icon: Icons.Cpu, title: "4. Local AI", content: "Sensitive data processed locally without external APIs." },
    { id: "privacy-by-design", icon: Icons.ShieldCheck, title: "5. Privacy by Design", content: "Data protection built into systems." },
    { id: "security-measures", icon: Icons.Lock, title: "6. Security", content: ["Encryption","RBAC","Isolation"] },
    { id: "data-subject-rights", icon: Icons.UserCheck, title: "7. Rights", content: "Full GDPR rights respected." },
    { id: "ai-ethics-eu", icon: Icons.ShieldCheck, title: "8. Ethical AI", content: "Transparent and explainable AI." },
    { id: "retention", icon: Icons.History, title: "9. Retention", content: "Data kept only as needed." },
    { id: "dpo-contact", icon: Icons.Mail, title: "10. Contact", content: "Use official channels." }
  ]
};
