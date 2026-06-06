import { Link, useLocation } from "wouter";

import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Icons } from "@/lib/icons";

const highlightStyle = {
  font: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  letterSpacing: "inherit",
};

const quizCtaContent = {
  pt: {
    label: "Quiz IA",
    title: "Descubra o potencial da IA",
    title_highlight: "para o seu negócio",
    description: "Responda a um quiz rápido e perceba onde a inteligência artificial pode gerar",
    description_highlight: "mais eficiência, crescimento e clareza.",
    button: "Fazer o Quiz IA",
  },
  en: {
    label: "AI Quiz",
    title: "Discover the AI potential",
    title_highlight: "inside your business",
    description: "Take a quick quiz and understand where artificial intelligence can create",
    description_highlight: "more efficiency, growth, and clarity.",
    button: "Take the AI Quiz",
  },
};

export function QuizCTA() {
  const [location] = useLocation();
  const lang = location.startsWith("/en") ? "en" : "pt";
  const content = quizCtaContent[lang];
  const href = lang === "en" ? "/en/quiz-ai" : "/pt/quiz-ia";

  return (
    <section className="relative overflow-hidden bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] px-6 py-16 text-[var(--brand-night)] md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,209,255,0.22),transparent_34%)]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 font-detail text-[12px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              {content.label}
            </p>
            <h2 className="font-heading text-[40px] font-black leading-tight text-[var(--brand-night)]">
              {content.title}
              {content.title_highlight && (
                <>
                  {" "}
                  <span className="text-[var(--brand-night)]" style={highlightStyle}>
                    {content.title_highlight}
                  </span>
                </>
              )}
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] font-medium leading-relaxed text-[var(--brand-ink)]">
              {content.description}
              {content.description_highlight && (
                <>
                  {" "}
                  <span className="text-[var(--brand-night)]" style={highlightStyle}>
                    {content.description_highlight}
                  </span>
                </>
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Link href={href}>
            <PremiumButton variant="secondary" size="lg">
              <Icons.HelpCircle className="h-4 w-4" />
              {content.button}
            </PremiumButton>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
