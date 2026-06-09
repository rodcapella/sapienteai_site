import { useEffect, useState } from "react";

import ContactModal from "@/components/ContactModal";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useFixedAfterScroll } from "@/hooks/useFixedAfterScroll";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";
import "@/styles/legal.css";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type ServiceSection = {
  id: string;
  navLabel: string;
  icon: keyof typeof Icons;
  backgroundImage: string;
};

// ─── Sticky Nav ──────────────────────────────────────────────────────────────

function ServicesStickyNav({
  sections,
  active,
  onSelect,
  title,
}: {
  sections: ServiceSection[];
  active: string;
  onSelect: (id: string) => void;
  title: string;
}) {
  const nav = useFixedAfterScroll<HTMLDivElement>();

  return (
    <>
      {nav.isFixed && <div aria-hidden="true" style={{ height: nav.height }} />}
      <div
        ref={nav.ref}
        className={[
          "z-30 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md",
          nav.isFixed ? "fixed inset-x-0 top-16" : "relative",
        ].join(" ")}
      >
      <div className="mx-auto w-full max-w-6xl">
        <div className="legal-group-title mb-3">{title}</div>
        <nav className="flex flex-row flex-wrap gap-1.5">
          {sections.map((s) => {
            const Icon = Icons[s.icon] as React.ElementType;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                className={[
                  "flex items-center gap-2 rounded-xl border-0 px-3 py-2 text-sm font-bold transition-all duration-200",
                  isActive
                    ? "bg-[var(--brand-offwhite)] text-[var(--brand-primary)] shadow-[0_8px_18px_color-mix(in_srgb,var(--brand-mid)_12%,transparent)]"
                    : "bg-transparent text-[var(--brand-night)] hover:bg-[var(--brand-offwhite)]/70 hover:text-[var(--brand-primary)]",
                ].join(" ")}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span>{s.navLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
      </div>
    </>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Services(_props: { lang?: string }) {
  const { lang } = useTranslation();
  const content = getContent("services", lang);
  const sections = content.sections as ServiceSection[];
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedContactTopic, setSelectedContactTopic] = useState(content.visualServices.ia.topic);

  useSEOHead({
    title: `${content.hero.label} — Sapiente.AI`,
    description: content.hero.subtitle,
    url: `https://sapienteai.com/${lang}/services`,
    type: "website",
  }, [content, lang]);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id.startsWith("service-")) {
          setActiveSection(visible.target.id.replace("service-", ""));
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(`service-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <InternalHero
        label={content.hero.label}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/servicos/bg_Servicos.webp"
        imageAlt="Sapiente.AI"
        compact
      />

      {/* ── Docs Layout ── */}
      <section className="flex-1 bg-white px-0 pb-6 pt-8 md:pb-8 md:pt-10">
        <ServicesStickyNav sections={sections} active={activeSection} onSelect={handleSelectSection} title={lang === "en" ? "Services" : "Serviços"} />

        <div className="w-full px-4 sm:px-6">
          <div className="w-full">
            <div className="w-full">
              {/* Conteúdo */}
              <main className="flex min-w-0 flex-1 flex-col gap-6">
                <div className="contents">
                  {sections.map((section) => {
                    const data =
                      content.visualServices?.[
                        section.id as keyof typeof content.visualServices
                      ];

                    if (!data) return null;

                    return (
                      <div
                        key={section.id}
                        id={`service-${section.id}`}
                        aria-label={section.navLabel}
                        className="min-h-[360px] w-full scroll-mt-32 rounded-2xl bg-cover bg-center bg-no-repeat px-5 py-5 md:min-h-[420px] md:px-10 lg:px-12"
                        style={{ backgroundImage: `url(${section.backgroundImage})` }}
                      >
                        <div className="grid min-h-[inherit] gap-8 lg:grid-cols-[minmax(260px,0.72fr)_minmax(260px,0.55fr)] lg:items-center xl:grid-cols-[minmax(320px,0.78fr)_minmax(300px,0.52fr)]">
                          <Reveal>
                            <div className="max-w-[440px] rounded-2xl bg-white/90 p-5 text-left shadow-[0_14px_34px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)] md:py-5 lg:bg-transparent lg:p-0 lg:shadow-none">
                              <p className="mb-4 font-[var(--font-body)] text-[11px] font-black uppercase tracking-[0.22em] text-[var(--brand-night)]">
                                {data.eyebrow}
                              </p>

                              <h2 className="whitespace-pre-line font-[var(--font-body)] text-[clamp(2.1rem,4.7vw,4rem)] font-black leading-[0.98] tracking-normal text-[var(--brand-primary)]">
                                {data.title}
                              </h2>

                              <p className="mt-7 max-w-[390px] font-[var(--font-body)] text-[15px] font-medium leading-[1.16] text-[var(--brand-night)]">
                                {data.description}
                              </p>

                              <div className="mt-8 max-w-[390px] md:mt-11">
                                <p className="mb-2 font-[var(--font-detail)] text-[12px] font-black uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                                  {data.audienceLabel}
                                </p>
                                <p className="font-[var(--font-body)] text-[14px] font-semibold leading-[1.12] text-[var(--brand-night)]">
                                  {data.audience}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedContactTopic(data.topic);
                                  setIsContactOpen(true);
                                }}
                                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-primary)] px-7 font-[var(--font-body)] text-[12px] font-black uppercase tracking-normal text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-primary) 18%,transparent)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-primary-hover)] hover:shadow-[0_14px_30px_color-mix(in_srgb,var(--brand-primary) 26%,transparent)]"
                              >
                                {data.cta}
                              </button>
                            </div>
                          </Reveal>

                          <Reveal delay={120}>
                            <ul className="ml-auto grid max-w-[390px] gap-4 rounded-2xl bg-white/90 p-5 font-[var(--font-body)] text-[15px] font-medium leading-relaxed text-[var(--brand-night)] shadow-[0_14px_34px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)] lg:bg-transparent lg:p-0 lg:py-5 lg:shadow-none">
                              {data.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-4">
                                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-night)]" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </Reveal>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </main>

            </div>
          </div>
        </div>
      </section>

      <QuizCTA />

      {/* ── Final CTA ── */}
      <FinalCTA
        title={content.finalCta.title}
        title_highlight={content.finalCta.highlight}
        description={content.finalCta.description}
        description_highlight={content.finalCta.description_highlight} 
        button={content.finalCta.button}
        align="left"
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialTopic={selectedContactTopic}
      />
    </div>
  );
}
