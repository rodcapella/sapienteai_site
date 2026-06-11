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
  backgroundImage: "linear-gradient(90deg, #5de0e6 0%, #004aad 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

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
    <section className="relative w-full overflow-hidden bg-[var(--section-ice)] py-16 md:py-24">
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
            <Link href={href} className="inline-block structure-reset">
              {/* Esta DIV externa garante a aplicação correta do gradiente e do brilho sem interferência do componente */}
              <div 
                className="rounded-full transition-all duration-300 transform hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, #5de0e6 0%, #004aad 100%)",
                  boxShadow: "0 8px 24px rgba(93, 224, 230, 0.45)", // Brilho neon visível
                  padding: "2px", // Cria uma borda fina perfeita se o botão de dentro for escuro, ou serve de base total
                }}
              >
                <PremiumButton 
                  size="lg"
                  className="text-white font-bold tracking-wide rounded-full border-none bg-transparent hover:bg-transparent"
                  style={{
                    background: "transparent", // Força o botão a ficar transparente para exibir o gradiente de fundo da div
                    padding: "16px 36px",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HelpCircle className="h-5 w-5 mr-2.5 text-white" />
                  {content.button}
                </PremiumButton>
              </div>
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}