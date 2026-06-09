import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { useSEOHead } from "@/hooks/useSEOHead";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons";

// ─── Nossa História / Our Story ───────────────────────────────────────────────

const originContent = {
  pt: {
    eyebrow: "A nossa história",
    title: "Como a",
    titleBrand: "SAPIENTE.AI",
    titleSuffix: "nasceu",
    paragraphs: [
      "Vimos o mesmo problema repetido em dezenas de negócios: empresas a contratar agências que entregavam relatórios bonitos sem resultados, ferramentas que ninguém sabia usar, e consultores que desapareciam após o diagnóstico.",
      "O mercado estava fragmentado. Cada fornecedor entregava uma peça — mas ninguém montava o puzzle completo.",
      "Criámos a Sapiente.AI para ser exactamente o contrário disso. Um parceiro único que pensa o negócio de forma integrada — e executa do início ao fim, com transparência e métricas reais.",
      "Hoje, combinamos tecnologia de ponta com proximidade humana. Trabalhamos como se fôssemos parte da equipa dos nossos clientes — porque acreditamos que é assim que a transformação digital realmente acontece.",
    ],
    cards: [
      {
        icon: "Eye" as const,
        title: "VISÃO",
        text: "Ser uma referência em inovação tecnológica para PMEs e profissionais no mercado lusófono, aplicando IA com rigor e validação humana para gerar crescimento sustentável.",
      },
      {
        icon: "Handshake" as const,
        title: "MISSÃO",
        text: "Criamos soluções digitais que fazem negócios crescer, automatizam operações e transformam dados em decisões estratégicas — combinando expertise humana com IA avançada.",
      },
      {
        icon: "Target" as const,
        title: "POSICIONAMENTO",
        text: "Não somos uma agência. Não somos uma consultoria. Somos o parceiro tecnológico que une estratégia, execução e IA num só lugar.",
      },
    ],
  },
  en: {
    eyebrow: "Our story",
    title: "How",
    titleBrand: "SAPIENTE.AI",
    titleSuffix: "was born",
    paragraphs: [
      "We saw the same problem repeated across dozens of businesses: companies hiring agencies that delivered polished reports without results, tools nobody knew how to use, and consultants who disappeared after the diagnosis.",
      "The market was fragmented. Each vendor delivered a piece — but nobody assembled the full picture.",
      "We built Sapiente.AI to be exactly the opposite. A single partner that thinks about your business holistically — and executes from start to finish, with full transparency and real metrics.",
      "Today, we combine cutting-edge technology with human proximity. We work as if we were part of our clients' teams — because we believe that's how digital transformation truly happens.",
    ],
    cards: [
      {
        icon: "Eye" as const,
        title: "VISION",
        text: "To be a reference in technological innovation for SMEs and professionals in the Portuguese-speaking market, applying AI with rigour and human validation to generate sustainable growth.",
      },
      {
        icon: "Handshake" as const,
        title: "MISSION",
        text: "We create digital solutions that grow businesses, automate operations and transform data into strategic decisions — combining human expertise with advanced AI.",
      },
      {
        icon: "Target" as const,
        title: "POSITIONING",
        text: "We're not an agency. We're not a consultancy. We're the technology partner that unites strategy, execution and AI in one place.",
      },
    ],
  },
};

function AboutOriginSection({ lang }: { lang: "pt" | "en" }) {
  const c = originContent[lang];

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-24">

        {/* LEFT — texto */}
        <Reveal>
          <div className="flex flex-col gap-6">
            <p
              className="text-[13px] font-semibold italic text-[var(--brand-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {c.eyebrow}
            </p>

            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.05] tracking-tight text-[var(--brand-night)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {c.title}{" "}
              <span className="text-[var(--brand-primary)]">{c.titleBrand}</span>
              <br />
              {c.titleSuffix}
            </h2>

            <div className="flex flex-col gap-4">
              {c.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] font-bold leading-relaxed text-[var(--brand-night)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* RIGHT — cards */}
        <div className="flex flex-col gap-4">
          {c.cards.map((card, i) => {
            const Icon = Icons[card.icon];
            return (
              <Reveal key={card.title} delay={i * 100}>
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

// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const { t, lang } = useTranslation();

  const content = getContent("about", lang);
  const aboutLabel = lang === "pt" ? "Sobre Nós" : t("nav.about");

  useSEOHead(
    {
      title: `${aboutLabel} - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: "website",
    },
    [lang, content, aboutLabel]
  );

  return (
    <div className="flex flex-col">

      {/* HERO */}
      <InternalHero
        label={aboutLabel}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/sobre/bg_Sobre_nos.webp"
        imageAlt="Sapiente.AI"
      />

      {/* NOSSA HISTÓRIA */}
      <AboutOriginSection lang={lang === "en" ? "en" : "pt"} />

      <QuizCTA />

    </div>
  );
}
