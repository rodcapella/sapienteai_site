// /content/en/iaGenerativaPolicy.ts
import { Icons } from "@/lib/icons";

export const iaGenerativaPolicyEN = {
  label: "Generative AI Policy",
  title: "Compliant with GDPR and the EU AI Act",
  subtitle: "Clear guidelines for the responsible, transparent, and secure use of",
  highlight: "generative artificial intelligence.",

  sections: [
    {
      id: "shadow-ai",
      icon: Icons.Ban,
      title: "1. Prohibition of Shadow AI (Unauthorized Tools)",
      content:
        "At Sapiente.AI, protecting our clients' data is our top priority. We guarantee that all generative AI tools used in our daily operations are fully approved and operated exclusively through secure corporate accounts. We do not use free versions or personal accounts to process project information. This ensures that no confidential data, code, or intellectual property is retained by third-party platforms for model training, keeping your business completely safe and private."
    },
    {
      id: "anonymization",
      icon: Icons.EyeOff,
      title: "2. Mandatory Anonymization Rules for Prompts",
      content: [
        "Before entering any information into generative AI systems (including local AI solutions), the user must apply an anonymization process that includes:",
        "Replacement of direct identifiers (names, emails, tax numbers, addresses, phone numbers) with generic placeholders, e.g., «[CLIENT A]», «[SUPPLIER X]»;",
        "Generalization of dates (e.g., «2025» instead of «15/03/2025») and values (e.g., «above €1000»);",
        "Removal of metadata that could allow indirect re-identification.",
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
        "Prompt injection attacks – attempts to manipulate model behavior through malicious inputs;",
        "Extraction attacks – attempts to obtain training data or confidential information from model responses;",
        "Inadvertent data leakage – when the model reproduces sensitive information from previous interactions.",
        "Any team member who notices anomalous responses or suspects any vulnerability in our systems must report the situation immediately to internal management. As a protective measure, the company may temporarily suspend access to AI tools while the situation is evaluated."
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
        "Before utilizing or implementing any AI system classified as high-risk by the European Union (such as recruitment or workforce management tools), Sapiente.AI conducts an internal impact assessment. This analysis ensures that the technology respects people's rights, safeguarding transparency, non-discrimination, and human oversight throughout the entire process. The results are documented internally and remain available to the competent authorities whenever required by law."
    }
  ]
};
