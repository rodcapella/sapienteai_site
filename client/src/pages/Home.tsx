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
  <div className="min-h-screen bg-white text-gray-900">

    <Header />

    {/* HERO */}
    <section className="pt-32 md:pt-40 pb-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">

        <Reveal>
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
            {t('hero.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {t('hero.title')}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg text-gray-600 mt-6 mb-10 max-w-2xl mx-auto">
            {t('hero.tagline')}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-primary text-white rounded-xl shadow-soft hover:opacity-90 transition"
            >
              {t('hero.cta1')}
            </Button>

            <Button
              variant="outline"
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
            >
              {t('hero.cta2')}
            </Button>

          </div>
        </Reveal>

      </div>
    </section>

    {/* VALUES */}
    <Section>
      <SectionHeader>
        <SectionTitle
          label={t('values.label')}
          title={t('values.title')}
        />
      </SectionHeader>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {values.map((value, i) => {
          const Icon = value.icon;

          return (
            <Reveal key={i} delay={i * 100}>
              <SectionCard className="bg-white border shadow-soft">

                <div className="w-10 h-10 mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="text-gray-700" />
                </div>

                <h3 className="font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>

                <p className="text-sm text-gray-600">
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
          label={t('services.label')}
          title={t('services.title')}
        />
      </SectionHeader>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => {
          const Icon = service.icon;

          return (
            <Reveal key={i} delay={i * 120}>
              <SectionCard className="bg-white border shadow-soft">

                <div className="w-10 h-10 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-gray-700" />
                </div>

                <h3 className="font-semibold mb-3 text-gray-900">
                  {t(service.key)}
                </h3>

                <p className="text-gray-600">
                  {t(`${service.key}.desc`)}
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

        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          {t('cta.title')}
        </h2>

        <p className="text-gray-600 mb-10">
          {t('cta.description')}
        </p>

        <Button
          onClick={() => setIsContactOpen(true)}
          className="px-6 py-3 bg-primary text-white rounded-xl shadow-soft hover:opacity-90"
        >
          {t('cta.button')}
        </Button>

      </div>
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