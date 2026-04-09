import { useState } from 'react';
import { useLocation } from "wouter";
import { motion } from "framer-motion";

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
    <div className="flex flex-col bg-background">

      {/* HERO - Advanced Mesh Gradient */}
      <Section className="bg-modern-gradient min-h-[90vh] flex items-center justify-center pt-32 pb-24 md:pt-48 md:pb-40 relative overflow-hidden">
        {/* CYBER GLOW ELEMENTS */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-primary/10 blur-[180px] rounded-full -z-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent-purple/10 blur-[150px] rounded-full -z-10 animate-pulse-slow"></div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-primary/20 mb-12 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                {content.hero.label}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] mb-12">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 mt-10 mb-20 max-w-4xl mx-auto leading-relaxed font-bold tracking-tight">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="purple">
                {content.hero.cta1}
              </PremiumButton>

              <button 
                className="group flex items-center gap-5 text-xl font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-all duration-700"
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="w-16 h-16 rounded-full border-2 border-foreground/5 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-700">
                  <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-500" />
                </span>
                {content.hero.cta2}
              </button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* VALUES - Solid Ice/Blue Tint Pattern */}
      <Section className="bg-blue-tint py-32 md:py-56 relative overflow-hidden">
        {/* GRID OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.values.label}
              title={content.values.title}
              className="text-foreground"
            />
          </Reveal>
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-6 mt-24 relative z-10">
          {content.values.items.map((value, i) => {
            const Icon = valueIcons[i];

            return (
              <SectionCard key={value.title} delay={i * 0.1}>
                <div className="w-20 h-20 mb-10 bg-primary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-xl group-hover:shadow-primary/40">
                  <Icon className="text-primary w-10 h-10 group-hover:text-white transition-colors duration-700" />
                </div>

                <h3 className="text-3xl font-black mb-6 text-foreground tracking-tighter leading-none">
                  {value.title}
                </h3>

                <p className="text-foreground/50 text-xl leading-relaxed font-bold tracking-tight">
                  {value.description}
                </p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      {/* SERVICES - Advanced Mesh Gradient */}
      <Section id="services" className="bg-modern-gradient py-32 md:py-56 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        
        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.services.label}
              title={content.services.title}
            />
          </Reveal>
        </SectionHeader>

        <div className="grid lg:grid-cols-3 gap-10 md:gap-16 max-w-7xl mx-auto px-6 mt-24 relative z-10">
          {content.services.items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <SectionCard key={service.title} delay={i * 0.15} variant="highlight">
                <div className="w-24 h-24 mb-12 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 shadow-2xl border border-white/10">
                  <Icon className="text-primary w-12 h-12 group-hover:text-white transition-colors duration-700" />
                </div>

                <h3 className="text-4xl font-black mb-8 text-foreground tracking-tighter leading-[0.9]">
                  {service.title}
                </h3>

                <p className="text-foreground/70 text-2xl leading-relaxed font-bold tracking-tight">
                  {service.description}
                </p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      {/* CTA - Solid Ice White High-Impact */}
      <Section className="bg-ice py-48 md:py-72 relative text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative">
          {/* DECORATIVE NEON ELEMENTS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] rounded-full -z-10"></div>

          <Reveal>
            <h2 className="text-6xl md:text-[10rem] font-black mb-12 text-foreground tracking-tighter leading-[0.8]">
              {content.cta.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-2xl md:text-4xl text-foreground/50 mb-20 leading-relaxed font-black uppercase tracking-widest max-w-4xl mx-auto">
              {content.cta.description}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <PremiumButton onClick={() => setIsContactOpen(true)} className="scale-125" variant="purple" size="lg">
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
