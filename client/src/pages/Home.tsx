import { useState } from 'react';
import { useLocation } from "wouter";

import { Button } from '@/components/ui/button';
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

      {/* HERO - Ice White Background */}
      <Section className="bg-ice text-center pt-20 md:pt-32 pb-20 md:pb-40">
        <div className="max-w-4xl mx-auto">

          <Reveal>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-6">
              {content.hero.label}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-foreground/70 mt-8 mb-12 max-w-2xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <PremiumButton onClick={() => setIsContactOpen(true)}>
              {content.hero.cta1}
            </PremiumButton>

              <Button 
                variant="outline" 
                className="rounded-full px-8 py-6 border-foreground/10 hover:bg-foreground/5 transition-all"
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {content.hero.cta2}
              </Button>

            </div>
          </Reveal>

        </div>
      </Section>

      {/* VALUES - Blue Tint Background */}
      <Section className="bg-blue-tint py-32">
        <SectionHeader>
          <SectionTitle
            label={content.values.label}
            title={content.values.title}
            className="text-foreground"
          />
        </SectionHeader>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          {content.values.items.map((value, i) => {
            const Icon = valueIcons[i];

            return (
              <Reveal key={value.title} delay={i * 100}>
                <SectionCard className="bg-white border-foreground/5 shadow-sm hover:shadow-xl transition-all duration-500">

                  <div className="w-12 h-12 mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="text-primary w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {value.title}
                  </h3>

                  <p className="text-foreground/60 leading-relaxed">
                    {value.description}
                  </p>

                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SERVICES - Ice White Background */}
      <Section id="services" className="bg-ice py-32">
        <SectionHeader>
          <SectionTitle
            label={content.services.label}
            title={content.services.title}
          />
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
          {content.services.items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <Reveal key={service.title} delay={i * 120}>
                <SectionCard className="bg-white border-foreground/5 shadow-md hover:shadow-2xl transition-all duration-500 p-10">

                  <div className="w-14 h-14 mb-8 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="text-primary w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h3>

                  <p className="text-foreground/60 text-lg leading-relaxed">
                    {service.description}
                  </p>

                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* CTA - Blue Tint Background */}
      <Section className="bg-blue-tint text-center py-40">
        <div className="max-w-3xl mx-auto px-6">

          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
              {content.cta.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
              {content.cta.description}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <PremiumButton onClick={() => setIsContactOpen(true)} className="scale-110">
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
