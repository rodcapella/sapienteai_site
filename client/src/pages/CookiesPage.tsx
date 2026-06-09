import { useState } from "react";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Check, Globe, Icons, Mail, RefreshCw } from "@/lib/icons";

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
    <button
      type="button"
      onClick={handleReset}
      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--brand-cyan)]/30 bg-[var(--brand-cyan)]/8 px-5 py-2.5 text-[13px] font-black uppercase tracking-wider text-[var(--brand-cyan)] transition-all duration-200 hover:bg-[var(--brand-cyan)]/15 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--brand-cyan-bright)_20%,transparent)]"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

// ─── Section detail ───────────────────────────────────────────────────────────

function CookieDetail({
  data,
  tableHeaders,
  tableYes,
  tableNo,
}: {
  data: SectionContent;
  tableHeaders: { type: string; purpose: string; required: string };
  tableYes: string;
  tableNo: string;
}) {
  return (
    <div className="animate-fadeIn">
      <Reveal>
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
          {data.eyebrow}
        </p>
        <h2 className="mb-6 text-3xl font-black leading-tight text-[var(--brand-offwhite)] md:text-5xl">
          {data.title}
        </h2>
        <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-[var(--brand-offwhite)]/60 md:text-lg">
          {data.description}
        </p>
      </Reveal>

      {/* Cookie table */}
      {data.table && (
        <Reveal delay={80}>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--brand-purple)]/20">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 bg-[var(--brand-night)]/70 px-5 py-3">
              {[tableHeaders.type, tableHeaders.purpose, tableHeaders.required].map((h) => (
                <span key={h} className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-cyan)]">
                  {h}
                </span>
              ))}
            </div>
            {data.table.map((row, i) => (
              <div
                key={row.type}
                className={[
                  "grid grid-cols-[1fr_2fr_auto] items-start gap-4 px-5 py-4",
                  i % 2 === 0 ? "bg-[var(--brand-night)]/50" : "bg-[var(--brand-primary)]/10",
                ].join(" ")}
              >
                <span className="text-sm font-bold text-[var(--brand-offwhite)]">{row.type}</span>
                <span className="text-sm font-medium leading-relaxed text-[var(--brand-offwhite)]/65">{row.purpose}</span>
                <span className="flex items-center justify-center">
                  {row.required ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--brand-cyan)]/30 bg-[var(--brand-cyan)]/10 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--brand-cyan)]">
                      <Check className="h-3 w-3" />
                      {tableYes}
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-[var(--brand-offwhite)]/15 bg-[var(--brand-offwhite)]/5 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--brand-offwhite)]/35">
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
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {data.browsers.map((browser) => (
              <div
                key={browser.name}
                className="flex items-start gap-3 rounded-xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-5 py-4 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                  <Globe className="h-3 w-3" />
                </span>
                <div>
                  <p className="mb-1 text-sm font-bold text-[var(--brand-offwhite)]">{browser.name}</p>
                  <p className="text-sm font-medium leading-relaxed text-[var(--brand-offwhite)]/60">{browser.steps}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Bullets */}
      {data.bullets && (
        <Reveal delay={100}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-5 py-4 text-sm font-semibold text-[var(--brand-offwhite)]/75 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                  <Check className="h-3 w-3" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* Contact block */}
      {data.contact && (
        <Reveal delay={80}>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-6 py-5 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/20 text-[var(--brand-cyan)]">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black text-[var(--brand-offwhite)]">{data.contact.company}</p>
              <a
                href={`mailto:${data.contact.email}`}
                className="text-sm font-medium text-[var(--brand-cyan)] underline-offset-2 hover:underline"
              >
                {data.contact.email}
              </a>
            </div>
          </div>
        </Reveal>
      )}

      {/* Reset consent — only on consent section */}
      {data.resetLabel && (
        <Reveal delay={120}>
          <ResetConsentButton label={data.resetLabel} />
        </Reveal>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function CookiesPage(_props: { lang?: string }) {
  const { lang } = useTranslation();
  const content = getContent("cookies", lang);
  const sections = content.sections as CookieSection[];
  const hero = content.hero;
  const cta  = content.cta;

  const [activeSection, setActiveSection] = useState(sections[0].id);

  useSEOHead({
    title: `${hero.label} — Sapiente.AI`,
    description: hero.subtitle,
    url: `https://sapienteai.com/${lang}/cookies`,
    type: "website",
  }, [hero, lang]);

  const activeSectionData = (content.sectionContent as Record<string, SectionContent>)[activeSection];

  return (
    <div className="flex flex-col bg-white text-[var(--brand-night)]">

      {/* ── Hero ── */}
      <InternalHero
        label={hero.label}
        title={hero.title}
        highlight={hero.highlight}
        subtitle={hero.subtitle}
        image="/media/bg/bg_legal.webp"
        imageAlt="Sapiente.AI Cookie Policy"
        compact
      />

      {/* ── Docs Layout ── */}
      <Section className="bg-blue-tint py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16 xl:grid-cols-[260px_1fr]">

              {/* Sidebar — desktop */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="mb-3 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/25">
                    {content.sidebarTitle}
                  </p>
                  <nav className="flex flex-col gap-1">
                    {sections.map((s) => {
                      const Icon = Icons[s.icon] as React.ElementType;
                      const isActive = activeSection === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveSection(s.id)}
                          className={[
                            "group flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-black transition-all duration-200",
                            isActive
                              ? "bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-cyan) 25%,transparent)]"
                              : "text-[var(--brand-offwhite)]/50 hover:bg-[var(--brand-night)]/60 hover:text-[var(--brand-offwhite)]",
                          ].join(" ")}
                        >
                          {Icon && (
                            <Icon
                              className={[
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-[var(--brand-cyan)]"
                                  : "text-[var(--brand-offwhite)]/30 group-hover:text-[var(--brand-offwhite)]/60",
                              ].join(" ")}
                            />
                          )}
                          <span className="tracking-tight">{s.navLabel}</span>
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Nav mobile — horizontal scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {sections.map((s) => {
                  const Icon = Icons[s.icon] as React.ElementType;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSection(s.id)}
                      className={[
                        "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition-all",
                        isActive
                          ? "bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand-cyan) 30%,transparent)]"
                          : "border border-[var(--brand-purple)]/20 text-[var(--brand-offwhite)]/50",
                      ].join(" ")}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                      {s.navLabel}
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo variável */}
              <main className="min-h-[520px]">
                <div className="relative lg:pl-10 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-[var(--brand-cyan)]/20 lg:before:via-[var(--brand-purple)]/15 lg:before:to-transparent">
                  {activeSectionData && (
                    <CookieDetail
                      key={activeSection}
                      data={activeSectionData}
                      tableHeaders={content.tableHeaders}
                      tableYes={content.tableYes}
                      tableNo={content.tableNo}
                    />
                  )}
                </div>
              </main>

            </div>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <FinalCTA
        title={cta.title}
        title_highlight={cta.highlight}
        description={cta.description}
        button={cta.button}
        align="left"
      />

    </div>
  );
}
