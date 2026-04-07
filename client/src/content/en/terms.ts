// /content/en/terms.ts
import { 
  CheckCircle, 
  Cpu, 
  ShieldAlert, 
  IntellectualProperty, // Note: Use 'Lightbulb' or 'FileCode' if your Lucide version lacks this
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Gavel, 
  Ban, 
  Handshake,
  Zap,
  Globe,
  Info
} from "lucide-react";

export const termsContentEN = {
  title: "Terms of Service",
  subtitle: "Standard conditions for the use of SAPIENTE.AI services and platforms.",
  lastUpdated: "Last updated: February 16, 2026",

  sections: [
    {
      id: "acceptance",
      icon: CheckCircle,
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using SAPIENTE.AI services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using the services on behalf of an organization, you represent that you have the authority to bind that entity to these conditions."
    },
    {
      id: "services",
      icon: Zap,
      title: "2. Description of Services",
      content:
        "SAPIENTE.AI provides advanced artificial intelligence solutions, automation, and strategic consulting. We reserve the right to modify, update, or deprecate features to ensure technological evolution and security, provided that core contractual obligations are maintained."
    },
    {
      id: "usage",
      icon: ShieldAlert,
      title: "3. Eligibility and Prohibited Use",
      content: [
        "Use services strictly for lawful purposes in compliance with EU and international law.",
        "Prohibition of 'Reverse Engineering' or attempting to extract the source code of our AI models.",
        "Strict prohibition of using the services to generate harmful, biased, or illegal content.",
        "Maintenance of account credential confidentiality and reporting of any security breaches."
      ]
    },
    {
      id: "ip",
      icon: FileText, // Representing IP and Documentation
      title: "4. Intellectual Property",
      content:
        "All algorithms, software, trademarks, and methodologies are the exclusive property of SAPIENTE.AI. Usage of our services does not grant any transfer of ownership. Any output generated may be subject to specific licensing agreements defined in your service contract."
    },
    {
      id: "data",
      icon: Handshake,
      title: "5. Data and Privacy",
      content:
        "Your privacy is paramount. Personal data processing is governed by our Privacy Policy and is strictly compliant with the GDPR. By using our services, you consent to the data flows necessary for the execution of the digital service."
    },
    {
      id: "ai",
      icon: Cpu,
      title: "6. AI Disclaimer and Responsibility",
      content:
        "Our services utilize Artificial Intelligence. While we strive for accuracy, AI outputs may occasionally be incorrect or biased. The user is solely responsible for validating critical decisions and should not rely exclusively on automated outputs for high-stakes legal, medical, or financial matters."
    },
    {
      id: "availability",
      icon: RefreshCw,
      title: "7. Service Level and Availability",
      content:
        "We aim for 99.9% availability; however, we do not guarantee uninterrupted service. Suspensions may occur for scheduled maintenance, security patches, or due to external infrastructure failures beyond our reasonable control."
    },
    {
      id: "liability",
      icon: AlertTriangle,
      title: "8. Limitation of Liability",
      content:
        "To the maximum extent permitted by applicable law, SAPIENTE.AI shall not be liable for indirect, incidental, or consequential damages, including loss of profits or data, resulting from the use or inability to use our AI systems."
    },
    {
      id: "changes",
      icon: Info,
      title: "9. Modifications to Terms",
      content:
        "SAPIENTE.AI reserves the right to update these terms at any time. Continued use of the platform after such changes constitutes acceptance of the new terms. Significant changes will be notified via the platform or registered email."
    },
    {
      id: "termination",
      icon: Ban,
      title: "10. Suspension and Termination",
      content:
        "We reserve the right to suspend or terminate access immediately, without prior notice, if there is a breach of these terms, suspected fraudulent activity, or if required by law enforcement."
    },
    {
      id: "law",
      icon: Globe,
      title: "11. Governing Law and Jurisdiction",
      content:
        "These terms are governed by and construed in accordance with the laws of Portugal and the European Union. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lisbon, Portugal."
    }
  ]
};