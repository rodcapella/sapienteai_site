import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

import { Button } from '@/components/ui/button';
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import AppDownloadButtons from '@/components/AppDownloadButtons';

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-[var(--foreground)]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO */}
      <section className="pt-28 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">

          <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
            {t('hero.subtitle')}
          </p>

          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[1.05] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10">
            {t('hero.tagline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsContactOpen(true)}
              className="bg-cyan-500 text-black font-medium px-8 py-3 rounded-full shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-300"
            >
              {t('hero.cta1')}
              <Icons.ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="border border-white/20 text-white hover:bg-white/10 px-8 py-3"
            >
              {t('hero.cta2')}
            </Button>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <p className="text-cyan-400 uppercase text-sm mb-4">
            {t('values.label')}
          </p>
          <h2 className="text-4xl font-bold text-white">
            {t('values.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, i) => {
            const Icon = value.icon;

            return (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:scale-[1.03] hover:shadow-cyan-500/10 transition-all"
              >
                <div className="w-12 h-12 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Icon className="text-white" />
                </div>

                <h3 className="text-white font-bold mb-2">
                  {value.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <p className="text-cyan-400 uppercase text-sm mb-4">
            {t('services.label')}
          </p>
          <h2 className="text-4xl font-bold text-white">
            {t('services.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:scale-[1.03] hover:shadow-cyan-500/10 transition-all"
              >
                <div className="w-14 h-14 mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Icon className="text-white" />
                </div>

                <h3 className="text-white font-bold mb-3">
                  {t(service.key)}
                </h3>

                <p className="text-slate-400">
                  {t(`${service.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>

        <p className="text-slate-400 mb-10">
          {t('cta.description')}
        </p>

        <Button
          onClick={() => setIsContactOpen(true)}
          className="bg-cyan-500 text-black font-medium px-8 py-3 rounded-full shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-300"
        >
          {t('cta.button')}
        </Button>
      </section>

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