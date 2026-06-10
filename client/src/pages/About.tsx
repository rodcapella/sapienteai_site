import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

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
  alt: string;
};

function AboutOriginSection({ content }: { content: AboutOriginContent }) {
  const c = content;

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-24">
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

function AboutVisualSection({ content }: { content: AboutVisualSectionContent }) {
  return (
    <section className="bg-white px-4 py-5 md:px-6 md:py-8">
      <Reveal>
        <div className="mx-auto max-w-7xl overflow-x-auto rounded-2xl md:overflow-visible">
          <img
            src={content.image}
            alt={content.alt}
            width={1920}
            height={700}
            className="aspect-[1920/700] h-auto w-[920px] max-w-none md:w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const { t, lang } = useTranslation();

  const content = getContent("about", lang);
  const isPT = lang !== "en";
  const aboutLabel = isPT ? "Sobre Nós" : t("nav.about");

  useSEOHead(
    {
      title: `${aboutLabel} - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: "website",
    },
    [lang, content, aboutLabel],
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
      />

      <AboutOriginSection content={content.origin} />
      <AboutVisualSection content={content.visualSections.founders} />
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
