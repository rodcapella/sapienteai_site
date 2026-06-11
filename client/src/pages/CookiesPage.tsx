import { useState } from "react";

import ContactModal from "@/components/ContactModal";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Check, Globe, Icons, RefreshCw } from "@/lib/icons";
import "@/styles/faq_legal.css";

// ─── Tipos ───────────────────────────────────────────────────────────────────

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

// ─── Reset consent button ─────────────────────────────────────────────────────

function ResetConsentButton({ label }: { label: string }) {
  function handleReset() {
    try {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookiePreferences");
      localStorage.removeItem("cookieBannerVersion");
      window.location.reload();
    } catch {
      // silently fail
    }
  }

  return (
    <PremiumButton
      size="sm"
      variant="outline"
      onClick={handleReset}
      className="mt-6"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      {label}
    </PremiumButton>
  );
}

// ─── Section detail ───────────────────────────────────────────────────────────

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
    <div>
      <Reveal>
        <p className="cookie-section-eyebrow mb-3">
          {data.eyebrow}
        </p>
        <h2 className="mb-5 text-[clamp(1.4rem,3vw,2rem)] font-black leading-tight text-[var(--brand-night)]">
          {data.title}
        </h2>
        <p className="mb-8 max-w-2xl text-[15px] font-medium leading-relaxed text-[color-mix(in_srgb,var(--brand-night)_65%,transparent)]">
          {data.description}
        </p>
      </Reveal>

      {/* Cookie table */}
      {data.table && (
        <Reveal delay={80}>
          <div className="legal-list mb-8 overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 border-b border-[color-mix(in_srgb,var(--brand-mid)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-primary)_6%,transparent)] px-5 py-3">
              {[tableHeaders.type, tableHeaders.purpose, tableHeaders.required].map((h) => (
                <span key={h} className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                  {h}
                </span>
              ))}
            </div>
            {data.table.map((row, i) => (
              <div
                key={row.type}
                className={[
                  "grid grid-cols-[1fr_2fr_auto] items-start gap-4 px-5 py-4",
                  i % 2 === 0 ? "bg-white" : "bg-[color-mix(in_srgb,var(--brand-primary)_3%,transparent)]",
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
        </Reveal>
      )}

      {/* Browser guides */}
      {data.browsers && (
        <Reveal delay={80}>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {data.browsers.map((browser) => (
              <div
                key={browser.name}
                className="flex items-start gap-3 rounded-xl border border-[var(--brand-mid)]/30 bg-white px-5 py-4 shadow-sm"
              >
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
        </Reveal>
      )}

      {/* Bullets */}
      {data.bullets && (
        <Reveal delay={100}>
          <ul className="legal-a-inner !pt-0">
            {data.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="legal-check" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* Contact block */}
      {data.contact && onContact && (
        <Reveal delay={80}>
          <PremiumButton size="sm" onClick={onContact} className="mt-6">
            {contactLabel}
          </PremiumButton>
        </Reveal>
      )}

      {/* Reset consent */}
      {data.resetLabel && (
        <Reveal delay={120}>
          <ResetConsentButton label={data.resetLabel} />
        </Reveal>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function CookiesPage() {
  const { lang } = useTranslation();
  const content = getContent("cookies", lang);
  const sections = content.sections as CookieSection[];
  const hero = content.hero;
  const cta  = content.cta;

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const contactTopic = lang === "en" ? "Cookie Policy" : "Política de Cookies";
  const contactLabel = lang === "en" ? "Talk to us" : "Falar connosco";

  useSEOHead({
    title: `${hero.label} – Sapiente.AI`,
    description: hero.subtitle,
    url: `https://www.sapienteai.com/${lang}/cookies`,
    type: "website",
  }, [hero, lang]);

  const activeSectionData = (content.sectionContent as Record<string, SectionContent>)[activeSection];

  return (
    <div className="legal-page flex flex-col">

      <InternalHero
        label={hero.label}
        title={hero.title}
        highlight={hero.highlight}
        subtitle={hero.subtitle}
        image="/media/bg/bg_LegalPages.webp"
        imageAlt="Sapiente.AI Cookie Policy"
        compact
      />

      <section className="legal-main">
        <div className="legal-inner">

          {/* Sidebar */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar-label">{content.sidebarTitle}</div>
            <div className="legal-cats">
              {sections.map((s) => {
                const Icon = Icons[s.icon] as React.ElementType;
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSection(s.id)}
                    className={[
                      "flex min-h-11 w-full items-center gap-2 rounded-xl border px-4 py-3 text-left text-[13px] font-black uppercase tracking-[0.08em] shadow-sm transition-all duration-200",
                      isActive
                        ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-[0_12px_26px_color-mix(in_srgb,var(--brand-primary)_22%,transparent)]"
                        : "border-[var(--brand-primary)]/20 bg-white text-[var(--brand-primary)] hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_12px_26px_color-mix(in_srgb,var(--brand-primary)_18%,transparent)]",
                    ].join(" ")}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    <span>{s.navLabel}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Conteúdo variável */}
          <Reveal delay={80}>
            <div className="legal-document-card">
              {activeSectionData && (
                <CookieDetail
                  key={activeSection}
                  data={activeSectionData}
                  tableHeaders={content.tableHeaders}
                  tableYes={content.tableYes}
                  tableNo={content.tableNo}
                  onContact={() => setIsContactOpen(true)}
                  contactLabel={contactLabel}
                />
              )}
            </div>
          </Reveal>

        </div>
      </section>

      <FinalCTA
        title={cta.title}
        title_highlight={cta.highlight}
        description={cta.description}
        button={cta.button}
      />

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialTopic={contactTopic}
        />
      )}

    </div>
  );
}
