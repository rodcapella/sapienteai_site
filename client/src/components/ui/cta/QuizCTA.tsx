import { Link } from "wouter";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { HelpCircle } from "@/lib/icons";
import "@/styles/quizAI.css";

const quizCtaContent = {
  pt: {
    label: "Quiz IA",
    title: "Descubra o potencial da IA",
    title_highlight: "para o seu negócio",
    description:
      "Responda a um quiz rápido e perceba onde a inteligência artificial pode gerar",
    description_highlight: "mais eficiência, crescimento e clareza.",
    button: "Fazer o Quiz IA",
  },
  en: {
    label: "AI Quiz",
    title: "Discover the AI potential",
    title_highlight: "inside your business",
    description:
      "Take a quick quiz and understand where artificial intelligence can create",
    description_highlight: "more efficiency, growth, and clarity.",
    button: "Take the AI Quiz",
  },
};

function renderTitle(title: string, highlight?: string) {
  return (
    <>
      {title}{" "}
      {highlight && (
        <span className="quiz-text-gradient">{highlight}</span>
      )}
    </>
  );
}

function renderDescription(description: string, highlight?: string) {
  return (
    <>
      {description}{" "}
      {highlight && (
        <span className="block mt-1 font-semibold text-[var(--foreground)] dark:text-white">
          {highlight}
        </span>
      )}
    </>
  );
}

export function QuizCTA() {
  const { lang } = useTranslation();
  const content = quizCtaContent[lang];
  const href = lang === "en" ? "/en/quiz-ai" : "/pt/quiz-ia";

  return (
    <section className="relative flex w-full items-center overflow-hidden bg-[var(--section-ice)] py-5 md:h-[220px] md:py-0">
      {/* Luz de fundo sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in srgb,var(--brand-cyan-bright) 8%,transparent),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-row items-center justify-between gap-4 md:gap-12 max-w-6xl">

        {/* Texto */}
        <div className="flex flex-col justify-center text-left min-w-0">
          <Reveal>
            <p className="mb-1 font-detail text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              {content.label}
            </p>

            <h2 className="font-heading font-black leading-[1.15] text-[var(--foreground)]" style={{ fontSize: "clamp(16px, 2.4vw, 28px)" }}>
              {renderTitle(content.title, content.title_highlight)}
            </h2>

            <p className="hidden md:block mt-2 font-medium leading-snug text-[var(--muted-foreground)] text-[14px]">
              {renderDescription(content.description, content.description_highlight)}
            </p>
          </Reveal>
        </div>

        {/* Botão */}
        <div className="shrink-0 flex items-center">
          <Reveal delay={120}>
            <div className="quiz-gradient-btn-wrapper">
              <Link href={href}>
                <HelpCircle size={20} />
                <span className="hidden sm:inline">{content.button}</span>
                <span className="sm:hidden">{lang === "en" ? "Quiz" : "Quiz IA"}</span>
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
