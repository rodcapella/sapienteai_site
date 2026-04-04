import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadButtons from '@/components/AppDownloadButtons';

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { getContent } from "@/lib/content";
import { setSEOHead } from '@/components/SEOHead';

const ArrowRight = Icons.ArrowRight; 
const Zap = Icons.Zap; 
const Shield = Icons.Shield; 

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
  const [selectedProduct, setSelectedProduct] = useState<string>('simulador-ir');
  const lang = "pt"; // Fixed for now, can be dynamic

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
      fullDescription: 'Solução completa com motor normativo e IA para simplificar a sua declaração e planeamento fiscal.',
      features: ['Validação automática de dados', 'IA aplicada a normas fiscais', 'Cálculo preciso e instantâneo'],
      benefits: ['Economia de tempo significativa', 'Redução drástica de erros', 'Melhor planeamento fiscal anual'],
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
      fullDescription: 'Descubra as melhores ofertas e cupons de desconto personalizados através do nosso motor de recomendação IA.',
      features: ['Cupons em tempo real', 'Recomendação personalizada', 'Alertas de preço inteligente'],
      benefits: ['Economia real em cada compra', 'Alertas automáticos de marcas favoritas', 'Interface simples e rápida'],
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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI Portfolio Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="container max-w-4xl text-center">
            <p className="text-primary text-sm md:text-lg font-bold tracking-widest uppercase mb-4 drop-shadow-md">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              Produtos Digitais
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mt-6 drop-shadow-md max-w-2xl mx-auto">
              Soluções inteligentes criadas para resolver problemas reais com o poder da IA.
            </p>
          </div>
        </div>
      </div>

      {/* SELECTOR - Ice White */}
      <Section className="bg-ice py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.entries(products).map(([key, p]) => (
              <button
                key={key}
                onClick={() => setSelectedProduct(key)}
                className={`
                  px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300
                  ${
                    selectedProduct === key
                      ? 'bg-primary text-primary-foreground shadow-xl scale-105'
                      : 'bg-white border border-foreground/5 text-foreground/60 hover:bg-foreground/5'
                  }
                `}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* PRODUCT DETAILS - Blue Tint */}
      <Section className="bg-blue-tint py-20 md:py-32 flex-grow">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* LEFT */}
                <div className="text-center lg:text-left">
                  <div className="text-6xl md:text-8xl mb-8">{product.icon}</div>

                  <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                    {product.name}
                  </h2>

                  <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
                    {product.fullDescription}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    {product.stats.map((s, i) => (
                      <div key={i} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-foreground/5 text-center">
                        <p className="text-xs md:text-sm text-foreground/40 font-bold uppercase tracking-wider mb-2">{s.label}</p>
                        <p className="text-xl md:text-3xl text-primary font-black">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    <AppDownloadButtons
                      appName={product.name}
                      playStoreUrl={product.playStoreUrl}
                      appStoreUrl={product.appStoreUrl}
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-8">
                  <SectionCard className="bg-white p-8 md:p-12 shadow-lg border-foreground/5">
                    <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-foreground">
                      <Zap className="text-primary w-6 h-6" />
                      Funcionalidades
                    </h3>

                    <ul className="space-y-4 text-foreground/70 text-lg leading-relaxed">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary font-bold">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>

                  <SectionCard className="bg-white p-8 md:p-12 shadow-lg border-foreground/5">
                    <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-foreground">
                      <Shield className="text-primary w-6 h-6" />
                      Benefícios
                    </h3>

                    <ul className="space-y-4 text-foreground/70 text-lg leading-relaxed">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary font-bold">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* CTA - Ice White */}
      <Section className="bg-ice py-24 md:py-40 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
              Interessado nas nossas soluções?
            </h2>
            <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
              Descubra como os nossos produtos podem transformar o seu negócio.
            </p>
            <PremiumButton className="scale-110">
              <span className="flex items-center gap-3">
                Solicitar Demo
                <ArrowRight className="w-5 h-5" />
              </span>
            </PremiumButton>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
