// /content/en/iaGenerativaPolicy.ts
import { Icons } from "@/lib/icons";

export const iaGenerativaPolicyEN = {
  label: "Generative AI",
  title: "Generative AI Usage Policy",
  subtitle: "Clear rules for the responsible, transparent, and secure use of",
  highlight: "generative artificial intelligence, in compliance with the GDPR and the EU AI Act.",

  sections: [
    {
      id: "shadow-ai",
      icon: Icons.Ban,
      title: "1. Prohibition of Shadow AI (Unauthorized Tools)",
      content:
        "Employees, partners, and service providers of Sapiente.AI are expressly forbidden from using personal accounts or free versions of generative AI tools (such as ChatGPT, Gemini, DeepSeek, personal Copilot, or similar) to process, store, or analyze any confidential data, personal data, or intellectual property of the company or its clients. Only AI tools previously approved by the Security and Data Protection department, which contractually guarantee non-retention of data for model training, are authorized. Non-compliance constitutes a serious disciplinary violation and may result in individual liability."
    },
    {
      id: "anonymization",
      icon: Icons.EyeOff,
      title: "2. Mandatory Anonymization Rules for Prompts",
      content: [
        "Before entering any information into generative AI systems (including local AI solutions), the user must apply an anonymization process that includes:",
        "• Replacement of direct identifiers (names, emails, tax numbers, addresses, phone numbers) with generic placeholders, e.g., «[CLIENT A]», «[SUPPLIER X]»;",
        "• Generalization of dates (e.g., «2025» instead of «15/03/2025») and values (e.g., «above €1000»);",
        "• Removal of metadata that could allow indirect re-identification.",
        "It is forbidden to introduce special categories of data (Article 9 of the GDPR) into any AI model without the express authorization of the Data Protection Officer and appropriate technical isolation measures."
      ]
    },
    {
      id: "human-oversight",
      icon: Icons.UserCheck,
      title: "3. Human Oversight with Veto Power",
      content:
        "Whenever a generative AI or decision-support system is used to produce recommendations, evaluations, or decisions that may affect the rights, interests, or legal status of individuals (for example, in recruitment, performance evaluation, access to benefits, or credit analysis), the final decision must be reviewed and validated by a qualified human. That reviewer shall have the authority to reject, modify, or override the algorithm's proposal. Oversight is documented in an audit trail, including the rationale for the human decision, and the company provides a recourse mechanism for contested automated decisions."
    },
    {
      id: "transparency-labeling",
      icon: Icons.Tag,
      title: "4. Transparency and Labeling of AI-Generated Content",
      content:
        "Any text, image, audio, or video generated or substantially edited by artificial intelligence, and which is published, shared externally, or provided to clients, shall be clearly identified as «AI-generated content» or «with the use of generative AI». The identification shall be perceivable to an average user, in accordance with Article 50 of the EU AI Act. This obligation applies notably to automated reports, chatbots, synthetic images, AI-generated summaries, and AI-assisted marketing communications."
    },
    {
      id: "ai-incidents",
      icon: Icons.AlertTriangle,
      title: "5. Response to AI-Specific Security Incidents",
      content: [
        "In addition to classic security incidents, Sapiente.AI actively monitors:",
        "• Prompt injection attacks – attempts to manipulate model behavior through malicious inputs;",
        "• Extraction attacks – attempts to obtain training data or confidential information from model responses;",
        "• Inadvertent data leakage – when the model reproduces sensitive information from previous interactions.",
        "Any employee who detects anomalous behavior, responses with apparently confidential data, or signs of extraction must immediately report it to the Security/DLP team. The company reserves the right to suspend the use of the AI system during the investigation."
      ]
    },
    {
      id: "right-to-be-forgotten",
      icon: Icons.Trash2,
      title: "6. Right to be Forgotten and Limitations in Trained AI Models",
      content:
        "Sapiente.AI fully complies with the right to erasure (Article 17 of the GDPR) with respect to all personal data stored in traditional databases. However, when an AI model has already been trained on certain data, the complete removal of that data from the model (unlearning) is technically complex or even impossible in many cases. To mitigate this risk, the company adopts a policy of not using personal data for training generalist models and, whenever possible, opts for AI models that support scheduled data deletion or offer contractual guarantees of non-memorization. If a data subject exercises the right to erasure over data that has been used in training, Sapiente.AI will document the technical impossibility and apply alternative measures (irreversible anonymization of the data at source and deletion of interaction logs)."
    },
    {
      id: "high-risk-ia",
      icon: Icons.ShieldAlert,
      title: "7. Fundamental Rights Impact Assessment for High-Risk AI (FRIA)",
      content:
        "Before implementing any AI system classified as «high-risk» under the EU AI Act (e.g., recruitment, credit assessment, worker management), Sapiente.AI conducts a Fundamental Rights Impact Assessment (FRIA). This assessment identifies, documents, and mitigates risks to individuals' rights, including non-discrimination, transparency, and human oversight. The findings are reviewed by the AI Governance Committee and made available to competent authorities when required."
    }
  ]
};
