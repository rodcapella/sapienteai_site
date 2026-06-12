export const cookiesEN = {
  // ── sidebar navigation ───────────────────────────────────────────────────────
  sidebarTitle: "Sections",

  lastUpdated: "Last updated: June 2026",

  sections: [
    { id: "what",    navLabel: "What are cookies", icon: "Info"        },
    { id: "use",     navLabel: "Cookies we use",   icon: "List"        },
    { id: "manage",  navLabel: "How to manage",    icon: "Settings"    },
    { id: "consent", navLabel: "Consent",          icon: "ShieldCheck" },
    { id: "third",   navLabel: "Third parties",    icon: "Share2"      },
    { id: "updates", navLabel: "Updates",          icon: "RefreshCw"   },
    { id: "contact", navLabel: "Contact",          icon: "Mail"        },
  ],

  // ── cookie table headers ─────────────────────────────────────────────────────
  tableHeaders: {
    type:     "Type",
    purpose:  "Purpose",
    required: "Required",
  },
  tableYes: "Yes",
  tableNo:  "No",

  // ── hero ─────────────────────────────────────────────────────────────────────
  hero: {
    label:     "Cookie Policy",
    title:     "Full transparency about",
    highlight: "how we use cookies.",
    subtitle:  "Clear and objective information about the cookies used on this website, how to manage them, and your rights under the GDPR.",
  },

  // ── final CTA ────────────────────────────────────────────────────────────────
  cta: {
    title:       "Questions about",
    highlight:   "privacy or cookies?",
    description: "Our team is available to clarify any questions about your data handling or cookie preferences.",
    button:      "Talk to the team",
  },

  // ── section content ──────────────────────────────────────────────────────────
  sectionContent: {
    what: {
      eyebrow:     "Cookies",
      title:       "What are cookies?",
      description: "Cookies are small text files stored on your device when you visit a website. They allow the site to remember your preferences and actions over time, improving your browsing experience and helping us understand how our site is used.",
    },

    use: {
      eyebrow:     "Transparency",
      title:       "What cookies do we use?",
      description: "We use the following categories of cookies on our website:",
      table: [
        { type: "Essential", purpose: "Required for the website to function correctly (navigation, security, session management).", required: true  },
        { type: "Analytics", purpose: "Help us understand how visitors interact with the site through anonymous usage statistics.",   required: false },
        { type: "Marketing", purpose: "Used to deliver relevant advertising and remarketing campaigns.",                             required: false },
      ],
    },

    manage: {
      eyebrow:     "Control",
      title:       "How to manage cookies",
      description: "You can control and delete cookies through your browser settings at any time. Below are instructions for the most common browsers:",
      browsers: [
        { name: "Google Chrome",   steps: "Open Settings → Privacy and Security → Cookies and other site data."          },
        { name: "Microsoft Edge",  steps: "Open Settings → Cookies and site permissions → Manage and delete cookies."    },
        { name: "Mozilla Firefox", steps: "Open Settings → Privacy & Security → Cookies and Site Data → Manage Data."   },
        { name: "Safari",          steps: "Open Preferences → Privacy → Manage Website Data to remove cookies."          },
      ],
    },

    consent: {
      eyebrow:     "GDPR",
      title:       "Your consent",
      description: "When you first visit our website, a banner will ask for your cookie preferences. You may accept all cookies, reject optional ones, or customise your choices.",
      bullets: [
        "Accept all cookies (includes analytics and marketing).",
        "Reject optional — only essential cookies remain active.",
        "Customise — choose category by category what you allow.",
        "Change your preferences at any time via the footer link.",
      ],
      resetLabel: "Review cookie preferences",
    },

    third: {
      eyebrow:     "Partners",
      title:       "Third-party cookies",
      description: "Some cookies may be set by third-party services we use, such as analytics or advertising platforms. All partners we work with are GDPR compliant and your data remains within the European Union.",
      bullets: [
        "Analytics platforms (e.g. Google Analytics).",
        "Email marketing and automation tools.",
        "Advertising and remarketing platforms.",
        "All providers are GDPR certified.",
      ],
    },

    updates: {
      eyebrow:     "Revisions",
      title:       "Updates to this policy",
      description: "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. The date at the top of this page indicates the most recent revision.",
      bullets: [
        "Significant changes will be communicated by email (if you subscribed to the newsletter).",
        "The last updated date is always visible at the top of the page.",
        "Version history is available upon request.",
      ],
    },

    contact: {
      eyebrow:     "Support",
      title:       "Contact",
      description: "If you have any questions about our use of cookies or this policy, please get in touch. We will respond as soon as possible.",
      contact:     { company: "Sapiente.AI", email: "contato@sapienteai.com" },
      bullets: [
        "Send an email with the subject 'Cookie Policy'.",
        "Response guaranteed within 5 business days.",
        "You can also exercise your GDPR rights through the same channel.",
      ],
    },
  },
} as const;
