import { useEffect } from "react";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { getContent } from "@/lib/content";
import { setSEOHead } from "@/components/SEOHead";

export default function About({ lang = "pt" }: { lang?: string }) {
  const content = getContent("about", lang);

  useEffect(() => {
    setSEOHead({
      title: 'Sobre Nós - SAPIENTE.AI',
      description: 'Sobre nós, SAPIENTE.AI.',
      url: `https://sapienteai.com/${lang}/about`,
      type: 'website'
    });
  }, [lang]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
              {lang === "en" ? "This didn’t start as a company." : "Isto não começou como uma empresa."}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mt-4 drop-shadow-md">
              {lang === "en" ? "It started as a question: why is making decisions still so hard?" : "Começou com uma pergunta: por que tomar decisões ainda é tão difícil?"}
            </p>
          </div>
        </div>
      </div>

      {/* STORY - Ice White */}
      <Section className="bg-ice py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8 text-foreground/70 text-lg md:text-xl leading-relaxed text-center md:text-left">
            <p>
              {lang === "en" 
                ? "Sapiente AI was born from a simple frustration: businesses have more data than ever, but still struggle to make clear, fast decisions."
                : "A Sapiente AI nasceu de uma frustração simples: as empresas têm mais dados do que nunca, mas ainda lutam para tomar decisões claras e rápidas."}
            </p>

            <p>
              {lang === "en"
                ? "Tools became more complex. Dashboards multiplied. But clarity didn’t."
                : "As ferramentas tornaram-se mais complexas. Os dashboards multiplicaram-se. Mas a clareza não."}
            </p>

            <p className="text-foreground font-bold text-2xl md:text-3xl border-l-4 border-primary pl-6 py-2 my-10">
              {lang === "en"
                ? "So we asked a different question: what if systems could think with you?"
                : "Então fizemos uma pergunta diferente: e se os sistemas pudessem pensar consigo?"}
            </p>

            <p>
              {lang === "en"
                ? "Not just automate tasks — but help you decide better, faster, and with confidence."
                : "Não apenas automatizar tarefas — mas ajudá-lo a decidir melhor, mais rápido e com confiança."}
            </p>
          </div>
        </div>
      </Section>

      {/* IDEA - Blue Tint */}
      <Section className="bg-blue-tint py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            <SectionCard className="bg-white p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {lang === "en" ? "The Problem" : "O Problema"}
              </h3>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {lang === "en"
                  ? "Decision-making is fragmented. Tools are reactive. Teams waste time interpreting instead of acting."
                  : "A tomada de decisão está fragmentada. As ferramentas são reativas. As equipas perdem tempo a interpretar em vez de agir."}
              </p>
            </SectionCard>

            <SectionCard className="bg-white p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                {lang === "en" ? "The Vision" : "A Visão"}
              </h3>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {lang === "en"
                  ? "Build intelligent systems that don’t just show data — but guide action."
                  : "Construir sistemas inteligentes que não apenas mostram dados — mas guiam a ação."}
              </p>
            </SectionCard>
          </div>
        </div>
      </Section>

      {/* LOGO PHILOSOPHY - Ice White */}
      <Section className="bg-ice py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              {lang === "en" ? "The logo wasn’t random." : "O logotipo não foi aleatório."}
            </h2>

            <p className="text-foreground/70 text-lg md:text-xl">
              {lang === "en"
                ? "It represents structure, intelligence, and evolution. Every line, every shape was designed to reflect clarity emerging from complexity."
                : "Representa estrutura, inteligência e evolução. Cada linha, cada forma foi desenhada para refletir a clareza emergindo da complexidade."}
            </p>

            <div className="py-10">
              <p className="text-primary font-bold text-3xl md:text-5xl">
                Sapiente
              </p>
              <p className="text-foreground/50 text-xl mt-2 italic">
                {lang === "en" ? "means \"to be wise\"" : "significa \"ser sábio\""}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FUTURE - Blue Tint */}
      <Section className="bg-blue-tint py-20 md:py-40 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
              {lang === "en" ? "We’re just getting started." : "Estamos apenas a começar."}
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed">
              {lang === "en"
                ? "The future belongs to companies that make better decisions faster."
                : "O futuro pertence às empresas que tomam melhores decisões mais rapidamente."}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
