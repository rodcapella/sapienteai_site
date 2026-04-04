import { useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";

export default function About() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("about", lang);

  useEffect(() => {
    setSEOHead({
      title: `Sobre Nós - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: 'website'
    });
  }, [lang, content]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* HERO BANNER - Modern Gradient */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
              {content.hero.title} <br/>
              <span className="text-primary drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">{content.hero.highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* MANIFESTO - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="space-y-8">
                {content.manifesto.map((line: string, i: number) => (
                  <p key={i} className={`text-2xl md:text-5xl font-black tracking-tight leading-tight ${line === "" ? "h-8" : "text-foreground"}`}>
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SHIFT - Blue Tint Solid */}
      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-black mb-20 text-foreground tracking-tighter leading-none">
                {content.shift.title}
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {content.shift.items.map((item: string, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <SectionCard className="bg-white border-foreground/5 p-12 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700">
                    <p className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-relaxed">
                      {item.split(' → ').map((part, idx) => (
                        <span key={idx} className={idx === 1 ? "text-primary block mt-4" : "text-foreground/40 block"}>
                          {idx === 1 ? `→ ${part}` : part}
                        </span>
                      ))}
                    </p>
                  </SectionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROBLEM & VISION - Modern Gradient */}
      <Section className="bg-modern-gradient py-24 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-neon-purple/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">
                  {content.problem.title}
                </h3>
                <p className="text-xl md:text-2xl text-foreground/60 font-medium leading-relaxed">
                  {content.problem.text}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <SectionCard className="bg-white p-12 md:p-16 shadow-2xl border-primary/10 relative group">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-all duration-500">
                  <Icons.Zap className="text-white w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-10">
                  {content.vision.title}
                </h3>
                <p className="text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed">
                  {content.vision.text}
                </p>
              </SectionCard>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SYMBOL - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none mb-16">
                {content.logo.title}
              </h3>
            </Reveal>

            <div className="space-y-6">
              {content.logo.text.map((line: string, i: number) => (
                <Reveal key={i} delay={i * 50}>
                  <p className={`text-xl md:text-3xl font-bold tracking-tight ${line === "" ? "h-8" : "text-foreground/50"}`}>
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="mt-24 pt-24 border-t border-foreground/5">
                <p className="text-5xl md:text-9xl font-black text-primary tracking-tighter opacity-10 uppercase select-none">
                  {content.closing}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
