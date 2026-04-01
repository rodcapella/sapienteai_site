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
    <div className="space-y-24">

      {/* HERO */}
      <Section className="text-center pt-10 md:pt-20">
        <div className="max-w-4xl mx-auto">

          <Reveal>
            <p className="text-sm uppercase tracking-wide text-white/40 mb-4">
              {content.hero.label}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg text-white/60 mt-6 mb-10 max-w-2xl mx-auto">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <PremiumButton onClick={() => setIsContactOpen(true)}>
              {content.hero.cta1}
            </PremiumButton>

              <Button variant="outline">
                {content.hero.cta2}
              </Button>

            </div>
          </Reveal>

        </div>
      </Section>

      {/* VALUES */}
      <Section>
        <SectionHeader>
          <SectionTitle
            label={content.values.label}
            title={content.values.title}
          />
        </SectionHeader>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {content.values.items.map((value, i) => {
            const Icon = valueIcons[i];

            return (
              <Reveal key={value.title} delay={i * 100}>
                <SectionCard>

                  <div className="w-10 h-10 mb-4 bg-white/5 rounded-lg flex items-center justify-center">
                    <Icon className="text-white/70" />
                  </div>

                  <h3 className="font-semibold mb-2 text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm text-white/60">
                    {value.description}
                  </p>

                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <SectionHeader>
          <SectionTitle
            label={content.services.label}
            title={content.services.title}
          />
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.services.items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <Reveal key={service.title} delay={i * 120}>
                <SectionCard>

                  <div className="w-10 h-10 mb-4 bg-white/5 rounded-lg flex items-center justify-center">
                    <Icon className="text-white/70" />
                  </div>

                  <h3 className="font-semibold mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="text-white/60">
                    {service.description}
                  </p>

                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <div className="max-w-2xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
            {content.cta.title}
          </h2>

          <p className="text-white/60 mb-10">
            {content.cta.description}
          </p>

          <PremiumButton>
            {content.cta.button}
          </PremiumButton>

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