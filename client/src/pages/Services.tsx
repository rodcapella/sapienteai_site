import React, { useEffect, useRef, useState } from "react";

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
import "@/styles/faq_legal.css";

type ServiceSection = {
  id: string;
  navLabel: string;
  icon: keyof typeof Icons;
  backgroundImage: string;
};

const serviceMobileBackgroundPosition: Record<string, string> = {
  ia: "68% top",
  automacao: "68% top",
  crescimento: "67% top",
  "dados-bi": "67% top",
  desenvolvimento: "66% top",
  marketing: "66% top",
};

function ServicesStickyNav({
  sections,
  active,
  onSelect,
}: {
  sections: ServiceSection[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const nav = useFixedAfterScroll<HTMLDivElement>();

  return (
    <>
      {nav.isFixed && <div aria-hidden="true" style={{ height: nav.height }} />}
      <div
        id="services-menu"
        ref={nav.ref}
        className={[
          "z-30 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md md:py-4",
          nav.isFixed ? "fixed inset-x-0 top-16" : "relative",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-6xl">
          <nav className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
            {sections.map((s) => {
              const Icon = Icons[s.icon] as React.ElementType;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className={[
                    "flex min-h-[68px] w-full flex-col items-center justify-center gap-1 rounded-xl border-0 px-2 py-2 text-center text-[10px] font-black leading-tight transition-all duration-200 sm:min-h-11 sm:w-auto sm:flex-row sm:gap-2.5 sm:px-4 sm:text-[13px] sm:leading-normal md:text-sm",
                    isActive
                      ? "bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-cyan))] text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-primary)_22%,transparent)]"
                      : "bg-transparent text-[var(--brand-night)] hover:bg-[var(--brand-offwhite)]/80 hover:text-[var(--brand-primary)]",
                  ].join(" ")}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />}
                  <span className="max-w-[72px] sm:max-w-none">{s.navLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default function Services() {
  const { lang } = useTranslation();
  const content = getContent("services", lang);
  const sections = content.sections as ServiceSection[];
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedContactTopic, setSelectedContactTopic] = useState(content.visualServices.ia.topic);
  const manualSelectionRef = useRef<string | null>(null);

  const scrollToSection = (id: string, behavior: ScrollBehavior) => {
    const section = document.getElementById(`service-${id}`);
    if (!section) return;

    const stickyMenuHeight = document.getElementById("services-menu")?.getBoundingClientRect().height ?? 72;
    const headerOffset = window.innerWidth >= 1024 ? 88 : window.innerWidth >= 768 ? 80 : 64;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(sectionTop - stickyMenuHeight - headerOffset - 12, 0);

    window.scrollTo({ top: targetTop, behavior });

    window.setTimeout(() => {
      if (Math.abs(window.scrollY - targetTop) <= 4) return;

      document.documentElement.scrollTop = targetTop;
      document.body.scrollTop = targetTop;
      window.scrollTo(0, targetTop);
    }, behavior === "smooth" ? 460 : 40);
  };

  const scrollToMenu = (behavior: ScrollBehavior) => {
    const menu = document.getElementById("services-menu");
    if (!menu) return;

    const headerOffset = window.innerWidth >= 1024 ? 88 : window.innerWidth >= 768 ? 80 : 64;
    const menuTop = menu.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(menuTop - headerOffset - 12, 0);

    window.scrollTo({ top: targetTop, behavior });

    window.setTimeout(() => {
      if (Math.abs(window.scrollY - targetTop) <= 4) return;

      document.documentElement.scrollTop = targetTop;
      document.body.scrollTop = targetTop;
      window.scrollTo(0, targetTop);
    }, behavior === "smooth" ? 460 : 40);
  };

  useSEOHead({
    title: `${content.hero.label} — Sapiente.AI`,
    description: content.hero.subtitle,
    url: `https://www.sapienteai.com/${lang}/services`,
    type: "website",
  }, [content, lang]);

  useEffect(() => {
    const vs = content.visualServices as Record<string, { title: string; description: string }>;
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: content.hero.label,
      url: `https://www.sapienteai.com/${lang}/services`,
      itemListElement: Object.values(vs).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title.replace(/\n/g, " "),
          description: s.description,
          provider: {
            "@type": "Organization",
            name: "Sapiente.AI",
            url: "https://www.sapienteai.com",
          },
        },
      })),
    };

    const id = "service-schema-ld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(serviceSchema);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [content, lang]);

  useEffect(() => {
    const hash = window.location.hash.replace("#service-", "");
    const hashedSection = sections.find((section) => section.id === hash);

    if (!hashedSection) return;

    setActiveSection(hashedSection.id);
    window.requestAnimationFrame(() => {
      scrollToSection(hashedSection.id, "auto");
    });
  }, [sections]);

  const handleSelectSection = (id: string) => {
    manualSelectionRef.current = id;
    setActiveSection(id);
    window.history.replaceState(null, "", `#service-${id}`);
    scrollToSection(id, "smooth");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const manuallySelectedId = manualSelectionRef.current;

        if (manuallySelectedId) {
          const selectedEntry = entries.find((entry) => entry.target.id === `service-${manuallySelectedId}`);

          if (selectedEntry?.isIntersecting && selectedEntry.intersectionRatio >= 0.35) {
            manualSelectionRef.current = null;
            setActiveSection(manuallySelectedId);
            window.history.replaceState(null, "", `#service-${manuallySelectedId}`);
          }

          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id.startsWith("service-")) {
          const nextSection = visible.target.id.replace("service-", "");
          setActiveSection(nextSection);
          window.history.replaceState(null, "", `#service-${nextSection}`);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(`service-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={content.hero.label}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/servicos/bg_Servicos.webp"
        imageAlt="Sapiente.AI"
        imagePosition="right center"
        compact
      />

      <section className="content-atmosphere flex-1 bg-white px-0 pb-6 pt-8 md:pb-8 md:pt-10">
        <ServicesStickyNav sections={sections} active={activeSection} onSelect={handleSelectSection} />

        <div className="w-full px-4 sm:px-6">
          <div className="w-full">
            <div className="w-full">
              <main className="flex min-w-0 flex-1 flex-col gap-6">
                <div className="contents">
                  {sections.map((section) => {
                    const data =
                      content.visualServices?.[
                        section.id as keyof typeof content.visualServices
                      ];

                    if (!data) return null;

                    return (
                      <React.Fragment key={section.id}>
                        <div
                          id={`service-${section.id}`}
                          aria-label={section.navLabel}
                          className="min-h-[360px] w-full scroll-mt-32 rounded-2xl bg-cover bg-[position:var(--service-mobile-bg-position)] bg-no-repeat px-4 py-5 md:min-h-[420px] md:bg-center md:px-10 lg:px-12"
                          style={{
                            backgroundImage: `url(${section.backgroundImage})`,
                            "--service-mobile-bg-position": serviceMobileBackgroundPosition[section.id] || "center top",
                          } as React.CSSProperties}
                        >
                          <div className="mx-auto grid min-h-[inherit] max-w-6xl gap-6 lg:grid-cols-[minmax(320px,0.54fr)_minmax(300px,0.46fr)] lg:items-center lg:gap-20 xl:grid-cols-[minmax(360px,0.52fr)_minmax(330px,0.48fr)] xl:gap-28">
                            <Reveal>
                              <div className="max-w-[440px] rounded-2xl bg-white/95 p-4 text-left shadow-[0_14px_34px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)] md:p-5 lg:max-w-[390px] lg:bg-transparent lg:p-0 lg:pr-12 lg:shadow-none xl:max-w-[410px] xl:pr-16">
                                <p className="mb-4 font-[var(--font-heading)] text-[12px] font-black uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                                  {data.eyebrow}
                                </p>

                                <h2
                                  className="whitespace-pre-line font-[var(--font-body)] text-[clamp(2.1rem,4.7vw,4rem)] font-black leading-[0.98] tracking-normal text-[var(--brand-primary)]"
                                  style={{ fontFamily: "var(--font-body)" }}
                                >
                                  {data.title}
                                </h2>

                                <p className="mt-7 max-w-full font-[var(--font-body)] text-[16px] font-medium leading-[1.42] text-[var(--brand-night)] sm:max-w-[410px]">
                                  {data.description}
                                </p>

                                <div className="mt-8 max-w-full sm:max-w-[410px] md:mt-10">
                                  <p className="mb-2 font-[var(--font-detail)] text-[12px] font-black uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                                    {data.audienceLabel}
                                  </p>
                                  <p className="font-[var(--font-body)] text-[15px] font-semibold leading-[1.35] text-[var(--brand-night)]">
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
                              <ul className="mx-auto grid max-w-full gap-4 rounded-2xl bg-white/95 p-4 font-[var(--font-body)] text-[16px] font-medium leading-[1.6] text-[var(--brand-night)] shadow-[0_14px_34px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)] sm:max-w-[410px] md:p-5 lg:ml-12 lg:mr-0 lg:max-w-[300px] lg:justify-self-end lg:self-center lg:rounded-[28px] lg:bg-white/88 lg:p-6 lg:py-7 lg:pl-7 lg:shadow-[0_18px_42px_color-mix(in_srgb,var(--brand-deep)_10%,transparent)] lg:backdrop-blur-[4px] xl:ml-20 xl:max-w-[330px] xl:p-7 xl:pl-8 2xl:ml-24">
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
                        <a
                          href="#services-menu"
                          onClick={(event) => {
                            event.preventDefault();
                            window.history.replaceState(null, "", "#services-menu");
                            scrollToMenu("smooth");
                          }}
                          className="mt-3 flex items-center justify-center gap-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-[var(--brand-primary)] opacity-70 transition-opacity hover:opacity-100 md:justify-end md:pr-2"
                        >
                          {lang === "pt" ? "↑ Voltar ao menu" : "↑ Back to menu"}
                        </a>
                      </React.Fragment>
                    );
                  })}
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      <QuizCTA />

      <FinalCTA
        title={content.finalCta.title}
        title_highlight={content.finalCta.highlight}
        description={content.finalCta.description}
        description_highlight={content.finalCta.description_highlight}
        button={content.finalCta.button}
        variant="services"
        backgroundSrc="/media/bg/finalCTA/final_CTA_servicos.webp"
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialTopic={selectedContactTopic}
      />
    </div>
  );
}
