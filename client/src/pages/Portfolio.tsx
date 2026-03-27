import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadButtons from '@/components/AppDownloadButtons';

import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  stats: { label: string; value: string }[];
  icon: string;
  playStoreUrl: string;
  appStoreUrl: string;
}

export default function Portfolio() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<string>('simulador-ir');

  useEffect(() => {
    setSEOHead({
      title: 'Portfólio - SAPIENTE.AI',
      description: 'Produtos e soluções em IA',
      url: 'https://sapienteai.com/portfolio',
      type: 'website'
    });
  }, []);

  const products: Record<string, Product> = {
    'simulador-ir': {
      id: 'simulador-ir',
      name: 'Simulador IR',
      description: 'Cálculo inteligente de imposto',
      fullDescription: 'Solução completa com motor normativo e IA.',
      features: ['Validação automática', 'IA aplicada', 'Cálculo preciso'],
      benefits: ['Economia de tempo', 'Menos erros', 'Planejamento fiscal'],
      stats: [
        { label: 'Downloads', value: '100K+' },
        { label: 'Usuários', value: '50K+' },
        { label: 'Rating', value: '4.8' }
      ],
      icon: '📊',
      playStoreUrl: '#',
      appStoreUrl: '#'
    },
    'cupaomania': {
      id: 'cupaomania',
      name: 'CupãoMania',
      description: 'Promoções inteligentes',
      fullDescription: 'Descubra ofertas com IA.',
      features: ['Cupons em tempo real', 'Recomendação'],
      benefits: ['Economia', 'Alertas'],
      stats: [
        { label: 'Users', value: '50K+' },
        { label: 'Cupons', value: '10K+' },
        { label: 'Save', value: '30%' }
      ],
      icon: '🎟️',
      playStoreUrl: '#',
      appStoreUrl: '#'
    }
  };

  const product = products[selectedProduct];

  return (
    <div className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
    ">
      <Header />

      {/* HERO */}
      <section className="pt-32 pb-16 text-center">
        <p className="text-cyan-400 text-sm tracking-widest uppercase">
          Portfolio
        </p>

        <h1 className="text-5xl font-black mt-4">
          Produtos Digitais
        </h1>

        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          Soluções inteligentes criadas para resolver problemas reais.
        </p>
      </section>

      {/* SELECTOR */}
      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {Object.entries(products).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setSelectedProduct(key)}
            className={`
              px-6 py-3 rounded-xl text-sm transition-all
              ${
                selectedProduct === key
                  ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:border-cyan-400/30'
              }
            `}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* PRODUCT TRANSITION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="container mx-auto max-w-6xl px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <div className="text-5xl mb-4">{product.icon}</div>

              <h2 className="text-4xl font-bold mb-4">
                {product.name}
              </h2>

              <p className="text-white/60 mb-8">
                {product.fullDescription}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {product.stats.map((s, i) => (
                  <div key={i} className="
                    bg-white/[0.03]
                    border border-white/10
                    rounded-xl p-4 text-center
                    hover:border-cyan-400/30 transition
                  ">
                    <p className="text-xs text-white/40">{s.label}</p>
                    <p className="text-xl text-cyan-400 font-bold">{s.value}</p>
                  </div>
                ))}
              </div>

              <AppDownloadButtons
                appName={product.name}
                playStoreUrl={product.playStoreUrl}
                appStoreUrl={product.appStoreUrl}
              />
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* FEATURES */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 mb-4">
                  <Zap className="text-cyan-400 w-5 h-5" />
                  Funcionalidades
                </h3>

                <ul className="space-y-2 text-white/70">
                  {product.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* BENEFITS */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 mb-4">
                  <Shield className="text-cyan-400 w-5 h-5" />
                  Benefícios
                </h3>

                <ul className="space-y-2 text-white/70">
                  {product.benefits.map((b, i) => (
                    <li key={i}>→ {b}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="text-center py-24">
        <button className="
          group bg-cyan-400 text-black px-8 py-4 rounded-xl font-semibold
        ">
          <span className="flex items-center gap-2">
            Solicitar Demo
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </span>
        </button>
      </div>

      <Footer />
    </div>
  );
}