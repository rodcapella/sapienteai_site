// /content/en/cookies.ts
import { Icons } from "@/lib/icons";

export const cookiesEN = {
  title: "Cookie Policy",
  subtitle: "How we use cookies on this website",
  highlight: "Transparent, minimal, and GDPR compliant.",
  lastUpdated: "Last updated: June, 2026",

  // Banner consent text
  banner: {
    message: "We use cookies to improve your browsing experience, analyse traffic, and personalise content.",
    acceptAll: "Accept all",
    rejectOptional: "Reject optional",
    customize: "Preferences",
  },

  // Consent options labels
  consent: {
    acceptAll: "accepted",
    rejected: "rejected",
    custom: "custom",
    storageKey: "cookieConsent",
  },

  sections: [
    {
      id: "what-are-cookies",
      icon: Icons.Info,
      title: "1. What are cookies?",
      content:
        "Cookies are small text files stored on your device when you visit a website. They allow the site to remember your preferences and actions over time, improving your browsing experience and helping us understand how our site is used.",
    },
    {
      id: "cookies-we-use",
      icon: Icons.List,
      title: "2. What cookies do we use?",
      content: "We use the following categories of cookies on our website:",
      table: [
        {
          type: "Essential",
          purpose: "Required for the website to function correctly (navigation, security, session management).",
          required: true,
        },
        {
          type: "Analytics",
          purpose: "Help us understand how visitors interact with the site through anonymous usage statistics.",
          required: false,
        },
        {
          type: "Marketing",
          purpose: "Used to deliver relevant advertising and remarketing campaigns.",
          required: false,
        },
      ],
    },
    {
      id: "manage-cookies",
      icon: Icons.Settings,
      title: "3. How to manage cookies",
      content:
        "You can control and delete cookies through your browser settings at any time. Below are instructions for the most common browsers:",
      browsers: [
        {
          name: "Google Chrome",
          steps:
            "Open Settings → Privacy and Security → Cookies and other site data. Choose your preferred option or clear existing cookies.",
        },
        {
          name: "Microsoft Edge",
          steps:
            "Open Settings → Cookies and site permissions → Manage and delete cookies and site data.",
        },
        {
          name: "Mozilla Firefox",
          steps:
            "Open Settings → Privacy & Security → Cookies and Site Data. Click 'Manage Data' to view or delete cookies.",
        },
        {
          name: "Safari",
          steps:
            "Open Preferences → Privacy → Manage Website Data. You can remove cookies for specific sites or all sites.",
        },
      ],
    },
    {
      id: "consent",
      icon: Icons.ShieldCheck,
      title: "4. Your consent",
      content:
        "When you first visit our website, a banner will ask for your cookie preferences. You may accept all cookies, reject optional ones, or customise your choices. You can change your preferences at any time via the cookie settings link in the footer.",
    },
    {
      id: "third-parties",
      icon: Icons.Share2,
      title: "5. Third-party cookies",
      content:
        "Some cookies may be set by third-party services we use, such as analytics or advertising platforms. These providers have their own privacy policies and we encourage you to review them. All third-party partners we work with are GDPR compliant.",
    },
    {
      id: "updates",
      icon: Icons.RefreshCw,
      title: "6. Updates to this policy",
      content:
        "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. The date at the top of this page indicates the most recent revision. We encourage you to review this page periodically.",
    },
    {
      id: "contact",
      icon: Icons.Mail,
      title: "7. Contact",
      content:
        "If you have any questions about our use of cookies or this policy, please contact us at contato@sapienteai.com with the subject 'Cookies'. We will respond as soon as possible.",
      contact: {
        company: "Sapiente.AI",
        email: "contato@sapienteai.com",
      },
    },
  ],
};