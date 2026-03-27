import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

import { Button } from '@/components/ui/button';
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { useScrollSpy } from '@/hooks/useScrollSpy';

// 🔥 motion
import { Reveal } from "@/components/ui/motion/Reveal";

export default function Home() {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const values = [
    {
      icon: Icons.Lightbulb,
      title: t('values.innovation'),
      description: t('values.innovation.desc')
    },
    {
      icon: Icons.Trophy,
      title: t('values.excellence'),
      description: t('values.excellence.desc')
    },
    {
      icon: Icons.Handshake,
      title: t('values.partnership'),
      description: t('values.partnership.desc')
    },
    {
      icon: Icons.Target,
      title: t('values.results'),
      description: t('values.results.desc')
    }
  ];

  const services = [
    { icon: Icons.Brain, key: 'services.ml' },
    { icon: Icons.Zap, key: 'services.automation' },
    { icon: Icons.BarChart3, key: 'services.consulting' }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-[var(--foreground)] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.08),transparent_60%)]"></div>
      </div>

      <Header />

      {/* HERO */}
      <section id="home" className="pt-32 md:pt-40 pb-32 md:pb-40 px-4 text-center">
        <div className="max-w-4xl mx-auto">

          <Reveal>
            <p className="text-cyan-400/80 uppercase tracking-[0.2em] text-xs mb-4">
              {t('hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="
              text-5xl md:text-7xl lg:text-8xl
              font-semibold
              tracking-tight
              leading-[1.02]
              bg-gradient-to-b from-white via-white to-white/60
              bg-clip-text text-transparent
            ">
              {t('hero.title')}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-lg text-slate-400 mt-6 mb-10 max-w-2xl mx-auto">
              {t('hero.tagline')}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsContactOpen(true)}
                className="
                bg-cyan-400
                text-black
                font-medium
                px-8 py-3
                rounded-full
                shadow-[0_10px_40px_rgba(0,255,255,0.25)]
                hover:shadow-[0_20px_60px_rgba(0,255,255,0.35)]
                hover:scale-[1.02]
                transition-all duration-300
                "
              >
                {t('hero.cta1')}
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border border-white/15 text-white/90 hover:bg-white/5 hover:border-white/30 px-8 py-3"
              >
                {t('hero.cta2')}
              </Button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* VALUES */}
      <Section id="values">
        <Reveal>
          <SectionHeader>
            <SectionTitle
              label={t('values.label')}
              title={t('values.title')}
            />
          </SectionHeader>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {values.map((value, i) => {
            const Icon = value.icon;

            return (
              <Reveal key={i} delay={i * 100}>
                <SectionCard>
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Icon className="text-white" />
                  </div>

                  <h3 className="text-white font-semibold mb-2">
                    {value.title}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {value.description}
                  </p>
                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <Reveal>
          <SectionHeader>
            <SectionTitle
              label={t('services.label')}
              title={t('services.title')}
            />
          </SectionHeader>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <Reveal key={i} delay={i * 120}>
                <SectionCard variant={i === 0 ? "highlight" : "default"}>
                  <div className="w-12 h-12 mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Icon className="text-white" />
                  </div>

                  <h3 className="text-white font-semibold mb-3">
                    {t(service.key)}
                  </h3>

                  <p className="text-slate-400">
                    {t(`${service.key}.desc`)}
                  </p>
                </SectionCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" className="text-center">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {t('cta.title')}
            </h2>

            <p className="text-slate-400 mb-10">
              {t('cta.description')}
            </p>

            <Button
              onClick={() => setIsContactOpen(true)}
              className="
              bg-cyan-400
              text-black
              font-medium
              px-8 py-3
              rounded-full
              shadow-[0_10px_40px_rgba(0,255,255,0.25)]
              hover:shadow-[0_20px_60px_rgba(0,255,255,0.35)]
              hover:scale-[1.02]
              transition-all duration-300
              "
            >
              {t('cta.button')}
            </Button>
          </div>
        </Reveal>
      </Section>

      <Footer />

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
}