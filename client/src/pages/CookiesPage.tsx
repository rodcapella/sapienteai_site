import { useState } from "react";

import ContactModal from "@/components/ContactModal";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Check, Globe, Icons, RefreshCw } from "@/lib/icons";
import "@/styles/faq_legal.css";

type CookieSection = {
  id: string;
  navLabel: string;
  icon: keyof typeof Icons;
};

type CookieTableRow = {
  type: string;
  purpose: string;
  required: boolean;
};

type BrowserGuide = {
  name: string;
  steps: string;
};

type SectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  table?: readonly CookieTableRow[];
  browsers?: readonly BrowserGuide[];
  bullets?: readonly string[];
  contact?: { company: string; email: string };
  resetLabel?: string;
};

const isMeaningfulText = (value?: string | null) =>
  typeof value === "string" && value.trim() !== "" && value.trim().toLowerCase() !== "undefined";

function ResetConsentButton({ label }: { label: string }) {
  function handleReset() {
    try {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookiePreferences");
      localStorage.removeItem("cookieBannerVersion");
      window.location.reload();
    } catch {
      // Ignore storage access issues.
    }
  }

  return (
    <PremiumButton
      size="sm"
      variant="primary"
      onClick={handleReset}
      className="mt-6 min-w-[240px] shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-cyan-mid)_28%,transparent)] hover:scale-[1.03] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid)_24%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid)_22%,transparent)]"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      {label}
    </PremiumButton>
  );
}

function CookieDetail({
  data,
  tableHeaders,
  tableYes,
  tableNo,
  onContact,
  contactLabel,
}: {
  data: SectionContent;
  tableHeaders: { type: string; purpose: string; required: string };
  tableYes: string;
  tableNo: string;
  onContact?: () => void;
  contactLabel?: string;
}) {
  return (
    <div className="cookie-detail">
      <p className="mb-8 max-w-2xl">{data.description}</p>

      {data.table && (
        <div className="cookie-table mb-8 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--brand-mid)_55%,transparent)] bg-white">
          <div className="grid grid-cols-[1fr_2fr_auto] gap-4 border-b border-[color-mix(in_srgb,var(--brand-mid)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-primary)_6%,transparent)] px-5 py-3">
            {[tableHeaders.type, tableHeaders.purpose, tableHeaders.required].map((heading) => (
              <span key={heading} className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                {heading}
              </span>
            ))}
          </div>
          {data.table.map((row, index) => (
            <div
              key={row.type}
              className={[
                "grid grid-cols-[1fr_2fr_auto] items-start gap-4 px-5 py-4",
                index % 2 === 0 ? "bg-white" : "bg-[color-mix(in_srgb,var(--brand-primary)_3%,transparent)]",
              ].join(" ")}
            >
              <span className="text-sm font-bold text-[var(--brand-night)]">{row.type}</span>
              <span className="text-sm font-medium leading-relaxed text-[color-mix(in_srgb,var(--brand-night)_60%,transparent)]">{row.purpose}</span>
              <span className="flex items-center justify-center">
                {row.required ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--color-success)]">
                    <Check className="h-3 w-3" />
                    {tableYes}
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-[var(--brand-mid)]/30 bg-[var(--brand-mid)]/5 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[color-mix(in_srgb,var(--brand-night)_40%,transparent)]">
                    {tableNo}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {data.browsers && (
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {data.browsers.map((browser) => (
            <div key={browser.name} className="flex items-start gap-3 rounded-xl border border-[var(--brand-mid)]/30 bg-white px-5 py-4 shadow-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                <Globe className="h-3 w-3" />
              </span>
              <div>
                <p className="cookie-card-topic-title mb-1">{browser.name}</p>
                <p className="text-sm font-medium leading-relaxed text-[color-mix(in_srgb,var(--brand-night)_60%,transparent)]">{browser.steps}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.bullets && (
        <ul>
          {data.bullets.map((bullet, index) => (
            <li key={index}>
              <span className="legal-check">
                <Check className="h-3 w-3" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {data.contact && onContact && (
        <PremiumButton
          size="sm"
          variant="primary"
          onClick={onContact}
          className="mt-6 min-w-[200px] shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-cyan-mid)_28%,transparent)] hover:scale-[1.03] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid)_24%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid)_22%,transparent)]"
        >
          {contactLabel}
        </PremiumButton>
      )}

      {data.resetLabel && <ResetConsentButton label={data.resetLabel} />}
    </div>
  );
}

export default function CookiesPage() {
  const { lang } = useTranslation();
  const content = getContent("cookies", lang);
  const sections = content.sections as readonly CookieSection[];
  const [isContactOpen, setIsContactOpen] = useState(false);

  const contactTopic = lang === "en" ? "Cookie Policy" : "Política de Cookies";
  const contactLabel = lang === "en" ? "Talk to us" : "Falar connosco";

  const legalContent = {
    label: content.hero.label,
    title: content.hero.title,
    highlight: content.hero.highlight,
    subtitle: content.hero.subtitle,
    lastUpdated: content.lastUpdated,
    sidebarTitle: content.sidebarTitle,
    groupTitle: lang === "en" ? "Cookie policy details" : "Detalhes da política de cookies",
    cta: {
      title: content.cta.title,
      title_highlight: content.cta.highlight,
      description: content.cta.description,
      description_highlight: content.cta.description_highlight,
      button: content.cta.button,
    },
    sections: sections.map((section) => {
      const data = (content.sectionContent as Record<string, SectionContent>)[section.id];
      const Icon = Icons[section.icon];
      const fallbackTitle = isMeaningfulText(data?.title)
        ? data.title
        : isMeaningfulText(section.navLabel)
          ? section.navLabel
          : section.id;

      return {
        id: section.id,
        navLabel: fallbackTitle,
        title: isMeaningfulText(data?.title) ? data.title : fallbackTitle,
        icon: Icon,
        content: (
          <CookieDetail
            data={data}
            tableHeaders={content.tableHeaders}
            tableYes={content.tableYes}
            tableNo={content.tableNo}
            onContact={() => setIsContactOpen(true)}
            contactLabel={contactLabel}
          />
        ),
      };
    }),
  };

  return (
    <>
      <LegalDocumentPage
        content={legalContent}
        slug="cookies"
        fallbackDescription={content.hero.subtitle}
        showQuizCTA={false}
      />

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialTopic={contactTopic}
        />
      )}
    </>
  );
}
