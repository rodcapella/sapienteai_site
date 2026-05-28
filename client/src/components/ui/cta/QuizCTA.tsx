import { Link, useLocation } from "wouter";

import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Icons } from "@/lib/icons";

const quizCtaContent = {
  pt: {
    label: "Quiz IA",
    title: "Descubra o potencial da IA para o seu negócio",
    description: "Responda a um quiz rápido e perceba onde a inteligência artificial pode gerar mais eficiência, crescimento e clareza.",
    button: "Fazer o Quiz IA",
  },
  en: {
    label: "AI Quiz",
    title: "Discover the AI potential inside your business",
    description: "Take a quick quiz and understand where artificial intelligence can create more efficiency, growth, and clarity.",
    button: "Take the AI Quiz",
  },
};

export function QuizCTA() {
  const [location] = useLocation();
  const lang = location.startsWith("/en") ? "en" : "pt";
  const content = quizCtaContent[lang];
  const href = lang === "en" ? "/en/quiz-ai" : "/pt/quiz-ia";

  return (
    <section className="relative overflow-hidden bg-[#0A84FF] px-6 py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,246,255,0.22),transparent_34%)]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 font-detail text-[12px] font-black uppercase tracking-[0.24em] text-white/78">{content.label}</p>
            <h2 className="font-heading text-[40px] font-black leading-tight text-white">{content.title}</h2>
            <p className="mt-5 max-w-2xl text-[14px] font-medium leading-relaxed text-white/82">{content.description}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Link href={href}>
            <PremiumButton className="!bg-white !text-[#001547] hover:!bg-[#EAF6FF] hover:!text-[#001547] [&>span]:!text-[#001547]" size="lg">
              <Icons.HelpCircle className="h-4 w-4" />
              {content.button}
            </PremiumButton>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
