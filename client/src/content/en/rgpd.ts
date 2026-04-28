// /content/en/gdpr.ts
import { 
  ShieldCheck, 
  Globe, 
  Database, 
  Lock, 
  UserCheck, 
  Cpu, 
  History, 
  Mail,
  Scale
} from "lucide-react";

export const gdprContentEN = {
  label: "Legal Document",
  title: "GDPR Compliance",
  subtitle: "Strict compliance with the European Union's General Data Protection Regulation.",

  sections: [
    {
      id: "compliance",
      icon: Scale,
      title: "1. Full GDPR Compliance",
      content:
        "SAPIENTE.AI operates in full compliance with Regulation (EU) 2016/679 (GDPR). Our data governance framework is designed to meet the highest standards of privacy and security required by EU data protection authorities, ensuring lawful, fair, and transparent processing."
    },
    {
      id: "infrastructure-eu",
      icon: Globe,
      title: "2. Approved Tooling Ecosystem",
      content:
        "We work exclusively with technology providers and infrastructure partners that demonstrate proven GDPR compliance. All data flows are maintained within the European Economic Area (EEA) or in jurisdictions offering an equivalent level of protection, ensuring the integrity of the chain of custody."
    },
    {
      id: "local-repository",
      icon: Database,
      title: "3. Local Repository & Project Asset Security",
      content:
        "We maintain a highly secure and controlled development environment. Our local project repositories utilize full disk encryption and version control systems with comprehensive audit logs. Access to source code and project configurations is restricted via strong authentication and limited only to directly involved team members."
    },
    {
      id: "local-ai-sovereignty",
      icon: Cpu,
      title: "4. Local AI & Sensitive Data Sovereignty",
      content:
        "For scenarios involving the processing of special categories of data (sensitive data), SAPIENTE.AI implements Local AI architectures. Technically, this approach utilizes isolated environments or dedicated instances (VPCs), ensuring that processing occurs without communication with external third-party APIs."
    },
    {
      id: "privacy-by-design",
      icon: ShieldCheck,
      title: "5. Privacy by Design & by Default",
      content:
        "Data protection is integrated into the architecture of all our systems from the point of conception. We apply technical measures to ensure data minimization, guaranteeing that only the information strictly necessary for each specific purpose is processed by default."
    },
    {
      id: "security-measures",
      icon: Lock,
      title: "6. Technical Protection & Security",
      content: [
        "Advanced encryption in transit and at rest for all data sets.",
        "Granular Role-Based Access Control (RBAC).",
        "Logical and physical isolation of development, testing, and production environments.",
        "Active monitoring systems for anomaly detection and protection against unauthorized access."
      ]
    },
    {
      id: "data-subject-rights",
      icon: UserCheck,
      title: "7. Data Subject Rights",
      content:
        "We fully respect the rights granted by the GDPR, including the right of access, rectification, erasure ('right to be forgotten'), portability, and the right to object. We provide direct channels to ensure these requests are addressed without undue delay, within European regulatory timeframes."
    },
    {
      id: "ai-ethics-eu",
      icon: ShieldCheck,
      title: "8. Ethical Governance & Responsible AI",
      content:
        "Aligned with European guidelines for Trustworthy AI, we ensure our models operate with transparency and explainability. In Local AI deployments, the client retains full control over the processing logic, allowing for technical audits to validate compliance with European security standards."
    },
    {
      id: "retention",
      icon: History,
      title: "9. Conservation & Secure Disposal",
      content:
        "Personal data is kept only for the period necessary for the purposes for which it is processed. After this period, we apply definitive deletion or irreversible anonymization procedures, preventing any reconstitution of the data subject's identity."
    },
    {
      id: "dpo-contact",
      icon: Mail,
      title: "10. Contact & Data Protection",
      content:
        "SAPIENTE.AI maintains internal oversight processes to ensure continuous compliance. For questions regarding data protection or technical details about our repository security, please use our official contact channels."
    }
  ]
};
