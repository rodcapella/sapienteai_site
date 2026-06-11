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
        <>
          <br className="hidden md:block" />
          <span className="quiz-text-gradient">
            {highlight}
          </span>
        </>
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
    <section className="relative flex min-h-[340px] w-full items-center overflow-hidden bg-[var(--section-ice)] py-12 md:min-h-[415px] md:py-0">
      {/* Luz de fundo sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in srgb,var(--brand-cyan-bright) 8%,transparent),transparent_40%)]" />

      {/* Container principal estruturado com alinhamento vertical forçado (items-center) */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl">
        
        {/* Lado Esquerdo: Texto alinhado e equilibrado */}
        <div className="w-full md:w-3/5 text-center md:text-left flex flex-col justify-center">
          <Reveal>
            <p className="mb-3 font-detail text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              {content.label}
            </p>

            <h2 className="font-heading font-black leading-tight text-[var(--foreground)]" style={{ fontSize: "clamp(24px, 4.5vw, 38px)" }}>
              {renderTitle(content.title, content.title_highlight)}
            </h2>

            <p className="mt-4 font-medium leading-relaxed text-[var(--muted-foreground)]" style={{ fontSize: "clamp(14px, 1.8vw, 16px)" }}>
              {renderDescription(
                content.description,
                content.description_highlight
              )}
            </p>
          </Reveal>
        </div>

{/* Lado Direito: Wrapper do botão corrigido para forçar o Gradiente e o Glow */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end items-center">
          <Reveal delay={120}>
            <div className="quiz-gradient-btn-wrapper">
              <Link href={href}>
                <HelpCircle size={20} />
                {content.button}
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
