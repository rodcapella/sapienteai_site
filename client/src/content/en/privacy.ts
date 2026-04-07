// /content/en/privacy.ts
import { 
  ShieldCheck, 
  UserPlus, 
  Target, 
  Gavel, 
  Share2, 
  Globe, 
  Lock, 
  Component, 
  Hourglass, 
  UserCog, 
  FileSearch, 
  Activity, 
  ClipboardCheck, 
  Server, 
  Send
} from "lucide-react";

export const privacyEN = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: February 16, 2026",
  sections: [
    {
      id: "overview",
      icon: ShieldCheck,
      title: "1. General Overview",
      content: "SAPIENTE.AI operates as a Data Controller and Processor under the strict framework of the General Data Protection Regulation (GDPR - Regulation EU 2016/679). Our privacy architecture is designed to protect the fundamental rights and freedoms of natural persons, particularly their right to the protection of personal data."
    },
    {
      id: "collection",
      icon: UserPlus,
      title: "2. Personal Data Collected",
      content: [
        "Identification & Contact: Full name, professional email, and verified phone numbers.",
        "Professional Context: Organizational affiliation, job title, and department.",
        "Metadata & Technical Identifiers: Hashed IP addresses, device fingerprints, and browser user-agents.",
        "Interaction Data: Granular telemetry on service usage and feature engagement via secure logs."
      ]
    },
    {
      id: "purpose",
      icon: Target,
      title: "3. Purpose of Processing",
      content: [
        "Provisioning of AI-driven services and algorithmic optimization.",
        "Client relationship management and technical support lifecycle.",
        "Strict adherence to legal, regulatory, and tax obligations within the EU.",
        "Proactive threat detection, anomaly monitoring, and fraud prevention."
      ]
    },
    {
      id: "legal-basis",
      icon: Gavel,
      title: "4. Legal Basis for Processing",
      content: "All processing activities are anchored in Article 6 of the GDPR: explicit consent for specific purposes, performance of a contract, compliance with legal obligations, and legitimate interests—provided they do not override the subject's fundamental rights."
    },
    {
      id: "sharing",
      icon: Share2,
      title: "5. Sub-processors & Data Sharing",
      content: "SAPIENTE.AI employs a 'GDPR-first' vendor selection policy. Data is only shared with third-party sub-processors that provide Tier-1 security guarantees, governed by robust Data Processing Agreements (DPA) that enforce the same level of protection we commit to our users."
    },
    {
      id: "transfers",
      icon: Globe,
      title: "6. International Data Transfers",
      content: "Data is primarily processed within the European Economic Area (EEA). Any cross-border transfers to third countries rely on Adequacy Decisions or the latest European Commission Standard Contractual Clauses (SCCs), supplemented by Transfer Impact Assessments (TIA) where necessary."
    },
    {
      id: "security",
      icon: Lock,
      title: "7. Technical & Organizational Security",
      content: "We implement defense-in-depth measures, including AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our security stack includes granular Role-Based Access Control (RBAC), multi-factor authentication (MFA), and automated vulnerability scanning across our production environments."
    },
    {
      id: "design",
      icon: Component,
      title: "8. Privacy by Design & Default",
      content: "Privacy is a core requirement in our SDLC (Software Development Life Cycle). We enforce data minimization by ensuring that data collection is adequate, relevant, and limited to what is strictly necessary for our AI models to function without compromising user privacy."
    },
    {
      id: "retention",
      icon: Hourglass,
      title: "9. Data Retention Policy",
      content: "Personal data is subject to a defined retention schedule. It is stored only for the duration of the active business relationship or as required by statutory limitation periods, followed by secure cryptographic erasure or irreversible anonymization."
    },
    {
      id: "rights",
      icon: UserCog,
      title: "10. Data Subject Rights",
      content: [
        "Right of access and data portability (structured, machine-readable formats).",
        "Right to rectification and erasure ('Right to be Forgotten').",
        "Right to restriction of processing and objection to automated decision-making.",
        "Right to lodge a complaint with a Supervisory Authority (DPA) within the EU."
      ]
    },
    {
      id: "audit",
      icon: FileSearch,
      title: "11. Records of Processing Activities (ROPA)",
      content: "In compliance with Article 30 of the GDPR, we maintain internal records of all processing activities. This ensures full traceability of data flows, purpose binding, and provides a clear audit trail for regulatory inquiries."
    },
    {
      id: "dpia",
      icon: Activity,
      title: "12. Data Protection Impact Assessments (DPIA)",
      content: "For high-risk processing, particularly involving AI and sensitive data sets, we conduct formal DPIAs. These assessments evaluate the necessity, proportionality, and risk mitigation strategies to protect individuals from algorithmic bias or data exposure."
    },
    {
      id: "accountability",
      icon: ClipboardCheck,
      title: "13. Accountability & Governance",
      content: "Accountability is our operational standard. We implement internal policies, staff training, and periodic privacy audits to demonstrate that our processing activities are not only compliant on paper but secure in practice."
    },
    {
      id: "infrastructure",
      icon: Server,
      title: "14. EU-Based Infrastructure",
      content: "SAPIENTE.AI prioritizes 'Data Sovereignty' by utilizing European-headquartered cloud providers or EU-specific data zones. This minimizes legal exposure to non-EU jurisdictional reach (e.g., US Cloud Act) and reinforces GDPR compliance."
    },
    {
      id: "contact",
      icon: Send,
      title: "15. Contact & DPO",
      content: "To exercise your rights or engage with our Privacy Team, please contact our Data Protection Officer through our official support portal or via dpo@sapiente.ai."
    }
  ]
};