import { useState } from "react";

import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Globe, Icons, Instagram, Linkedin } from "@/lib/icons";

type AboutOriginContent = {
  eyebrow: string;
  title: string;
  titleBrand: string;
  titleSuffix: string;
  paragraphs: string[];
  cards: {
    icon: string;
    title: string;
    text: string;
  }[];
};

type AboutVisualSectionContent = {
  image: string;
  mobileImages?: string[];
  alt: string;
  links?: {
    label: string;
    options: {
      label: string;
      href: string;
    }[];
    area: {
      left: string;
      top: string;
      width: string;
      height: string;
    };
  }[];
};

function AboutOriginSection({ content }: { content: AboutOriginContent }) {
  const c = content;

  return (
    <section className="content-atmosphere bg-white px-6 py-12 md:py-18">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:gap-14 xl:gap-20">
        <Reveal>
          <div className="flex flex-col gap-6">
            <p
              className="text-[17px] font-semibold uppercase text-[var(--brand-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {c.eyebrow}
            </p>

            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.05] tracking-tight text-[var(--brand-night)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {c.title}{" "}
              <span className="text-[var(--brand-primary)]">
                {c.titleBrand}
              </span>
              <br />
              {c.titleSuffix}
            </h2>

            <div className="flex flex-col gap-4">
              {c.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] font-bold leading-relaxed text-[var(--brand-night)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {c.cards.map((card, index) => {
            const Icon = Icons[card.icon as keyof typeof Icons];

            if (!Icon) return null;

            return (
              <Reveal key={card.title} delay={index * 100}>
                <div className="flex items-start gap-4 rounded-2xl border border-[var(--brand-mid)] bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--brand-mid)]/30 bg-[var(--surface)]">
                    <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
                  </div>

                  <div>
                    <p
                      className="mb-1.5 text-[13px] font-black tracking-[0.14em] text-[var(--brand-primary)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {card.title}
                    </p>

                    <p
                      className="text-[14px] font-medium leading-relaxed text-[var(--brand-night)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function linkIcon(label: string) {
  const l = label.toLowerCase();
  if (l === "linkedin")  return <Linkedin  className="h-4 w-4" />;
  if (l === "instagram") return <Instagram className="h-4 w-4" />;
  return <Globe className="h-4 w-4" />;
}

function AboutVisualSection({ content }: { content: AboutVisualSectionContent }) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const mobileImages = content.mobileImages && content.mobileImages.length > 0
    ? content.mobileImages
    : [content.image, content.image, content.image];
  const usesMobileSplitImages = mobileImages.length > 1;

  return (
    <div className="content-atmosphere overflow-hidden bg-white">
      <section
        className="relative hidden w-full bg-white aspect-[1920/700] bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: `url(${content.image})` }}
        aria-label={content.alt}
        onClick={() => setActiveHotspot(null)}
      >
        {/* Hotspots interativos — hover no desktop, tap no mobile */}
        {content.links?.map((link) => {
          const isOpen = activeHotspot === link.label;
          return (
            <div
              key={link.label}
              className="absolute cursor-pointer"
              style={{ left: link.area.left, top: link.area.top, width: link.area.width, height: link.area.height }}
              onMouseEnter={() => setActiveHotspot(link.label)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={(e) => { e.stopPropagation(); setActiveHotspot(isOpen ? null : link.label); }}
              aria-label={link.label}
            >
              {/* Overlay visível no hover/tap */}
              <div
                className={[
                  "absolute inset-0 rounded-xl transition-all duration-200",
                  isOpen
                    ? "bg-[color-mix(in_srgb,var(--brand-night)_55%,transparent)] ring-2 ring-[var(--brand-cyan-bright)]/60"
                    : "bg-transparent hover:bg-[color-mix(in_srgb,var(--brand-night)_30%,transparent)]",
                ].join(" ")}
              />

              {/* Popup com ícones — aparece centrado dentro do hotspot */}
              {isOpen && (
                <div
                  className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-[var(--brand-cyan-bright)]/40 bg-[color-mix(in_srgb,var(--brand-night)_92%,transparent)] px-3 py-1.5 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-night)_40%,transparent)] backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="mr-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/60 whitespace-nowrap">
                    {link.label}
                  </span>
                  {link.options.map((option) => (
                    <a
                      key={option.href}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={option.label}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--brand-cyan-bright)]/35 bg-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] text-[var(--brand-cyan-bright)] transition hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-cyan-bright)]"
                    >
                      {linkIcon(option.label)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="bg-white md:hidden" aria-label={content.alt}>
        {mobileImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={[
              "w-full bg-no-repeat",
              usesMobileSplitImages
                ? "min-h-[88svh] bg-cover bg-center"
                : "min-h-[82svh] bg-cover bg-center",
            ].join(" ")}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: "center center",
              backgroundSize: usesMobileSplitImages ? "cover" : "112% auto",
            }}
            aria-hidden="true"
          />
        ))}

        {content.links && content.links.length > 0 && (
          <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-6 pb-8">
            {content.links.map((link) => (
              <div
                key={`${link.label}-mobile`}
                className="rounded-2xl border border-[var(--brand-mid)]/70 bg-white px-4 py-4 shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-night)_10%,transparent)]"
              >
                <p
                  className="text-center text-[13px] font-black uppercase tracking-[0.16em] text-[var(--brand-night)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
                  {link.options.map((option) => (
                    <a
                      key={`${link.label}-${option.href}`}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} - ${option.label}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--brand-primary)]/22 bg-[color-mix(in_srgb,var(--brand-primary)_8%,white)] px-4 py-2 font-[var(--font-body)] text-[11px] font-black uppercase tracking-[0.14em] text-[var(--brand-primary)] transition hover:border-[var(--brand-primary)]/45 hover:bg-[var(--brand-primary)] hover:text-white"
                    >
                      {linkIcon(option.label)}
                      <span>{option.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------

export default function About() {
  const { t, lang } = useTranslation();

  const content = getContent("about", lang);
  const isPT = lang !== "en";
  const aboutLabel = isPT ? "Sobre Nós" : t("nav.about");

  useSEOHead(
    {
      title: lang === "en"
        ? "About Sapiente.AI | Applied AI, strategy and execution"
        : "Sobre a Sapiente.AI | IA aplicada, estratégia e execução",
      description: content.seoDescription,
      url: `https://www.sapienteai.com/${lang}/about`,
      type: "website",
    },
    [lang, content],
  );

  return (
    <div className="flex flex-col">
      <InternalHero
        label={aboutLabel}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/sobre/bg_Sobre_nos.webp"
        imageAlt="Sapiente.AI"
        compact
      />

      <AboutOriginSection content={content.origin} />
      <AboutVisualSection content={content.visualSections.howWeWork} />

      <QuizCTA />

      <FinalCTA
        title={content.cta.title}
        title_highlight={content.cta.title_highlight}
        description={content.cta.description}
        description_highlight={content.cta.description_highlight}
        button={content.cta.button}
        variant="about"
        backgroundSrc="/media/bg/finalCTA/final_CTA_sobre.webp"
      />
    </div>
  );
}


