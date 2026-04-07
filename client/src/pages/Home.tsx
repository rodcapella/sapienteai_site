import { useState } from 'react';
import { useLocation } from "wouter";

import { Icons } from "@/lib/icons";
import ContactModal from '@/components/ContactModal';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { Reveal } from "@/components/ui/motion/Reveal";

import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = lang === "en" ? homeEN : homePT;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const valueIcons = [
    Icons.Lightbulb,
    Icons.Trophy,
    Icons.Handshake,
    Icons.Target
  ];

  const serviceIcons = [
    Icons.Brain,
    Icons.Zap,
    Icons.BarChart3
  ];

  return (
    <div className="flex flex-col">

      {/* HERO - Modern Gradient Background */}
      <Section className="bg-modern-gradient text-center py-24 md:py-40 relative overflow-hidden">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">
                {content.hero.label}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[1] mb-10">
              {content.hero.title.split(' ').map((word, i) => (
                <span key={i} className={i === content.hero.title.split(' ').length - 1 ? "text-primary drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-2xl text-foreground/60 mt-8 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg">
                {content.hero.cta1}
              </PremiumButton>

              <button 
                className="group flex items-center gap-4 text-lg font-black uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all duration-500"
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                  <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {content.hero.cta2}
              </button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* VALUES - Solid Blue Tint Background */}
      <Section className="bg-blue-tint py-32 md:py-48 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
        
        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.values.label}
              title={content.values.title}
              className="text-foreground"
            />
          </Reveal>
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto px-6 mt-20">
          {content.values.items.map((value, i) => {
            const Icon = valueIcons[i];

            return (
              <Reveal key={value.title} delay={i * 100}>
                <SectionCard className="bg-white/80 backdrop-blur-xl border-foreground/5 shadow-xl hover:shadow-2xl transition-all duration-500 group p-10 h-full">
                  <div className="w-16 h-16 mb-8 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:rotate-[10deg] transition-all duration-500">
                    <Icon className="text-primary w-8 h-8 group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-foreground tracking-tight">
                    {value.title}
                  </h3>

                  <p className="text-foreground/50 text-lg leading-relaxed font-medium">
                    {value.description}
                  </p>
                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SERVICES - Modern Gradient Background */}
      <Section id="services" className="bg-modern-gradient py-32 md:py-48 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
        
        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.services.label}
              title={content.services.title}
            />
          </Reveal>
        </SectionHeader>

        <div className="grid lg:grid-cols-3 gap-10 md:gap-12 max-w-7xl mx-auto px-6 mt-20">
          {content.services.items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <Reveal key={service.title} delay={i * 150}>
                <SectionCard className="bg-white border-foreground/5 shadow-2xl hover:shadow-[0_20px_80px_rgba(0,0,0,0.1)] transition-all duration-700 p-12 h-full group">
                  <div className="w-20 h-20 mb-10 bg-primary/5 rounded-[2rem] flex items-center justify-center group-hover:bg-neon-purple group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <Icon className="text-primary w-10 h-10 group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="text-3xl font-black mb-6 text-foreground tracking-tighter leading-none">
                    {service.title}
                  </h3>

                  <p className="text-foreground/60 text-xl leading-relaxed font-medium">
                    {service.description}
                  </p>
                  
                  <div className="mt-10 pt-10 border-t border-foreground/5">
                    <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary hover:text-neon-purple transition-colors">
                      {content.services.more || "Saiba Mais"}
                      <Icons.ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* CTA - Solid Ice White Background */}
      <Section className="bg-ice py-40 md:py-60 relative text-center">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative">
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 blur-[100px] rounded-full -z-10"></div>

          <Reveal>
            <h2 className="text-5xl md:text-8xl font-black mb-10 text-foreground tracking-tighter leading-[0.9]">
              {content.cta.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xl md:text-2xl text-foreground/50 mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
              {content.cta.description}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <PremiumButton onClick={() => setIsContactOpen(true)} className="scale-125">
              {content.cta.button}
            </PremiumButton>
          </Reveal>
        </div>
      </Section>

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}

    </div>
  );
}
