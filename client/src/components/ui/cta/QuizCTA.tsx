import { Link } from "wouter";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { HelpCircle } from "@/lib/icons";

const highlightStyle = {
  font: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  letterSpacing: "inherit",
  // Aplica o gradiente linear de 90º diretamente no texto
  backgroundImage: "linear-gradient(90deg, #5de0e6 0%, #004aad 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const quizCtaContent = {
  pt: {
    label: "Quiz IA",
    title: "Descubra o potencial da IA", // Corrigido de potcacial para potencial
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
          <span style={highlightStyle}>
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
    <section className="relative flex items-center overflow-hidden bg-[var(--section-ice)] px-4 py-12 text-[var(--foreground)] sm:px-6 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in srgb,var(--brand-cyan-bright) 12%,transparent),transparent_34%)]" />

      {/* Alterado max-w-2xl para max-w-5xl e adicionado md:flex-row para alinhar na horizontal */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col md:flex-row items-center justify-between gap-8 w-full">
        
        {/* Lado Esquerdo: Conteúdo de Texto (Alinhado à esquerda no desktop) */}
        <div className="flex-1 text-center md:text-left max-w-2xl">
          <Reveal>
            <p className="mb-3 font-detail text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              {content.label}
            </p>

            <h2 className="font-heading font-black leading-tight text-[var(--foreground)]" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
              {renderTitle(content.title, content.title_highlight)}
            </h2>

            <p className="mt-4 font-medium leading-relaxed text-[var(--muted-foreground)]" style={{ fontSize: "clamp(14px, 2vw, 16px)" }}>
              {renderDescription(
                content.description,
                content.description_highlight
              )}
            </p>
          </Reveal>
        </div>

        {/* Lado Direito: Botão em Destaque com o Gradiente Customizado */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <Reveal delay={120}>
            <Link href={href} className="w-full sm:w-auto">
              <PremiumButton 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #5de0e6 0%, #004aad 100%)",
                  border: "none",
                  padding: "16px 32px",
                  fontSize: "16px"
                }}
              >
                <HelpCircle className="h-5 w-5 mr-2 animate-pulse" />
                {content.button}
              </PremiumButton>
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}