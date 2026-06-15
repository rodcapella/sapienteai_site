import { CheckCircle2, Cpu, Lock, Scale, ShieldCheck, UserCheck } from "@/lib/icons";

export const trustContentEN = {
  label: "Trust & Security",
  highlight: "Designed for trust.",
  subtitle:
    "Sapiente.AI is engineered to operate with security, transparency, and consistency in critical environments.",
  lastUpdated: "Last updated: June 2026",

  sections: [
    {
      title: "Security",
      icon: ShieldCheck,
      content: [
        "Encryption in transit and at rest",
        "Zero Trust architecture",
        "Least-privilege access control",
      ],
    },
    {
      title: "Data Protection",
      icon: Scale,
      content: [
        "Compliance with GDPR and applicable legislation",
        "Data minimization by design",
        "Anonymization when applicable",
        "Strict data retention policies",
      ],
    },
    {
      title: "Infrastructure",
      icon: Lock,
      content: [
        "EU-based infrastructure (EU/EEA)",
        "GDPR-compliant providers",
        "High availability and redundancy",
        "Performance-oriented scalability",
      ],
    },
    {
      title: "Reliability",
      icon: CheckCircle2,
      content: [
        "Continuous system monitoring",
        "Resilient architecture",
        "Controlled and auditable deployments",
        "Focus on stability and predictability",
      ],
    },
    {
      title: "Responsible AI",
      icon: UserCheck,
      content: [
        "Human-in-the-loop for critical decisions",
        "Bias mitigation strategies",
        "Explainability where applicable",
        "Controlled automation usage",
        "Labelling and transparency for AI-generated or AI-manipulated content, as described in our Generative AI Policy",
      ],
    },
    {
      title: "Governance",
      icon: Cpu,
      content: [
        "Operational traceability",
        "Periodic internal audits",
        "Continuous risk management",
        "Structured technical documentation",
      ],
    },
  ],
};
