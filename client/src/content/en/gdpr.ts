import { Icons } from "@/lib/icons";

export const gdprContentEN = {
  label: "Legal Document",
  title: "GDPR Compliance",
  subtitle: "Strict compliance with the European Union’s General Data Protection Regulation.",

  sections: [
    {
      id: "compliance",
      icon: Icons.Scale,
      title: "1. Full GDPR Compliance",
      content:
        "SAPIENTE.AI operates in full compliance with Regulation (EU) 2016/679 (GDPR). Our data governance framework is designed to meet the highest standards of privacy and security required by European data protection authorities, ensuring lawful, fair, and transparent processing."
    },
    {
      id: "infrastructure-eu",
      icon: Icons.Globe,
      title: "2. Approved Tooling Ecosystem",
      content:
        "We work exclusively with technology providers and infrastructure partners that demonstrate proven GDPR compliance. All data flows are maintained within the European Economic Area (EEA) or in jurisdictions offering an equivalent level of protection, ensuring the integrity of the data chain."
    },
    {
      id: "local-repository",
      icon: Icons.Database,
      title: "3. Local Repository & Project Asset Security",
      content:
        "We maintain a highly secure and controlled development environment. Our local project repositories use full disk encryption and version control systems with complete audit logs. Access to source code and configurations is restricted through strong authentication and limited to directly involved team members."
    },
    {
      id: "local-ai-sovereignty",
      icon: Icons.Cpu,
      title: "4. Local AI & Sensitive Data Sovereignty",
      content:
        "For scenarios involving the processing of special categories of data (sensitive data), SAPIENTE.AI implements Local AI architectures. This approach uses isolated environments or dedicated instances (VPCs), ensuring processing occurs without communication with external third-party APIs."
    },
    {
      id: "privacy-by-design",
      icon: Icons.ShieldCheck,
      title: "5. Privacy by Design & by Default",
      content:
        "Data protection is embedded into the architecture of all our systems from the outset. We apply technical measures to ensure data minimization, guaranteeing that only strictly necessary information is processed by default."
    },
    {
      id: "security-measures",
      icon: Icons.Lock,
      title: "6. Technical Protection & Security",
      content: [
        "Advanced encryption in transit and at rest for all datasets.",
        "Granular Role-Based Access Control (RBAC).",
        "Logical and physical isolation of development, testing, and production environments.",
        "Active monitoring systems for anomaly detection."
      ]
    },
    {
      id: "data-subject-rights",
      icon: Icons.UserCheck,
      title: "7. Data Subject Rights",
      content:
        "We fully respect the rights granted under GDPR, including the right of access, rectification, erasure ('right to be forgotten'), portability, and objection. We provide direct channels to ensure these requests are handled without undue delay."
    },
    {
      id: "ai-ethics-eu",
      icon: Icons.ShieldCheck,
      title: "8. Ethical Governance & Responsible AI",
      content:
        "Aligned with European guidelines for trustworthy AI, we ensure our models operate with transparency. In Local AI deployments, clients retain full control over processing logic, enabling technical audits and compliance validation."
    },
    {
      id: "retention",
      icon: Icons.History,
      title: "9. Data Retention & Secure Disposal",
      content:
        "Personal data is retained only for the period necessary for its intended purposes. After this period, we apply definitive deletion or irreversible anonymization procedures."
    },
    {
      id: "dpo-contact",
      icon: Icons.Mail,
      title: "10. Contact & Data Protection",
      content:
        "SAPIENTE.AI maintains internal oversight processes to ensure continuous compliance. For any data protection inquiries or technical questions regarding repository security, please use our official contact channels."
    }
  ]
};