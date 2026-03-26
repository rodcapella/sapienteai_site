/**
 * Portfolio Page - Detailed Product Showcase
 * Modern tech-forward design with product details
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Download, Users, Zap, Shield } from 'lucide-react';
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
  color: string;
  icon: string;
  playStoreUrl: string;
  appStoreUrl: string;
}

export default function Portfolio() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<string>('simulador-ir');

  useEffect(() => {
    setSEOHead({
      title: 'Portfólio - SAPIENTE.AI | Nossos Produtos e Soluções',
      description: 'Conheça os produtos desenvolvidos pela SAPIENTE.AI: Simulador IR, CupãoMania e ScanMyName.',
      keywords: 'portfólio, produtos, Simulador IR, CupãoMania, ScanMyName, aplicativos',
      url: 'https://sapiente-ai.manus.space/portfolio',
      type: 'website'
    });
  }, []);

  const products: Record<string, Product> = {
    'simulador-ir': {
      id: 'simulador-ir',
      name: 'Simulador IR',
      description: 'Aplicativo inteligente para cálculo de Imposto de Renda',
      fullDescription: 'O Simulador IR é uma solução completa para cálculo e planejamento de Imposto de Renda. Com validação automatizada da legislação e motor normativo estruturado, oferece precisão e confiabilidade.',
      features: [
        'Validação automatizada da legislação',
        'Motor normativo estruturado',
        'Automatização com apoio de IA',
        'Cálculos precisos e atualizados',
        'Interface intuitiva e responsiva',
        'Suporte a múltiplos cenários'
      ],
      benefits: [
        'Economia de tempo no cálculo de IR',
        'Redução de erros e omissões',
        'Planejamento fiscal mais eficiente',
        'Acesso offline aos cálculos',
        'Histórico de simulações'
      ],
      stats: [
        { label: 'Downloads', value: '100K+' },
        { label: 'Usuários Ativos', value: '50K+' },
        { label: 'Rating', value: '4.8/5' }
      ],
      color: 'from-blue-600 to-cyan-500',
      icon: '📊',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.simulador_ir',
      appStoreUrl: 'https://apps.apple.com/br/app/simulador-ir/id1234567890'
    },
    'cupaomania': {
      id: 'cupaomania',
      name: 'CupãoMania',
      description: 'Plataforma de gestão de cupons e promoções',
      fullDescription: 'CupãoMania é uma plataforma inteligente que ajuda você a encontrar as melhores promoções e cupons disponíveis. Com análise de ofertas e recomendações personalizadas, maximize suas economias.',
      features: [
        'Busca inteligente de cupons',
        'Análise de ofertas em tempo real',
        'Integração com múltiplos varejistas',
        'Recomendações personalizadas',
        'Notificações de promoções',
        'Histórico de economias'
      ],
      benefits: [
        'Encontre as melhores ofertas rapidamente',
        'Economize dinheiro em compras',
        'Receba notificações de promoções',
        'Acompanhe suas economias',
        'Descubra novos produtos'
      ],
      stats: [
        { label: 'Usuários', value: '50K+' },
        { label: 'Cupons Ativos', value: '10K+' },
        { label: 'Economia Média', value: '30%' }
      ],
      color: 'from-purple-600 to-pink-500',
      icon: '🎟️',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.cupaomania',
      appStoreUrl: 'https://apps.apple.com/br/app/cupaomania/id1234567891'
    },
    'scanmyname': {
      id: 'scanmyname',
      name: 'ScanMyName',
      description: 'Verificador inteligente de disponibilidade de nomes',
      fullDescription: 'ScanMyName é um verificador inteligente que busca a disponibilidade de nomes em múltiplas plataformas. Perfeito para criar marcas, contas em redes sociais e domínios.',
      features: [
        'Busca em múltiplas plataformas',
        'Análise de similaridade',
        'Sugestões alternativas inteligentes',
        'Verificação de domínios',
        'Histórico de buscas',
        'Alertas de disponibilidade'
      ],
      benefits: [
        'Encontre nomes disponíveis rapidamente',
        'Verifique múltiplas plataformas simultaneamente',
        'Receba sugestões criativas',
        'Acompanhe nomes desejados',
        'Crie marcas com confiança'
      ],
      stats: [
        { label: 'Buscas Realizadas', value: '30K+' },
        { label: 'Plataformas', value: '50+' },
        { label: 'Taxa de Sucesso', value: '95%' }
      ],
      color: 'from-green-600 to-emerald-500',
      icon: '🔍',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.scanmyname',
      appStoreUrl: 'https://apps.apple.com/br/app/scanmyname/id1234567892'
    }
  };

  const product = products[selectedProduct];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center">
            <p className="text-cyan-400 font-semibold mb-4 text-sm md:text-base uppercase tracking-wider">
              {t('portfolio.label')}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-slate-300">
              {t('portfolio.description')}
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SELECTOR */}
      <section className="py-8 px-4 border-b border-blue-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {Object.entries(products).map(([key, prod]) => (
              <button
                key={key}
                onClick={() => setSelectedProduct(key)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedProduct === key
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-900/80 border border-slate-800'
                }`}
              >
                {prod.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="py-32 md:py-40 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Product Info */}
            <div>
              <div className="mb-6">
                <span className="text-5xl">{product.icon}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h2>
              <p className="text-xl text-slate-300 mb-8">{product.fullDescription}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {product.stats.map((stat, idx) => (
                  <div key={idx} className="
                    bg-white/[0.03]
                    backdrop-blur-xl
                    border border-white/[0.08]
                    rounded-2xl
                    p-8
                    shadow-[0_0_40px_rgba(0,0,0,0.3)]
                    transition-all duration-300 ease-out
                    hover:scale-[1.015]
                    hover:shadow-[0_0_60px_rgba(0,255,255,0.08)]
                    ">
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="mb-8">
                <AppDownloadButtons 
                  appName={product.name}
                  playStoreUrl={product.playStoreUrl}
                  appStoreUrl={product.appStoreUrl}
                  className="flex flex-col gap-3"
                />
              </div>
            </div>

            {/* Right: Features & Benefits */}
            <div className="space-y-8">
              {/* Features */}
              <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-800/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-cyan-400" />
                  Funcionalidades
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-3">
                      <span className="text-cyan-400 mt-1 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="
                bg-white/[0.03]
                backdrop-blur-xl
                border border-white/[0.08]
                rounded-2xl
                p-8
                shadow-[0_0_40px_rgba(0,0,0,0.3)]
                transition-all duration-300 ease-out
                hover:scale-[1.015]
                hover:shadow-[0_0_60px_rgba(0,255,255,0.08)]
                ">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-cyan-400" />
                  Benefícios
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-3">
                      <span className="text-cyan-400 mt-1 flex-shrink-0">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 md:py-40 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Quer saber mais sobre nossas soluções?
          </h2>
          <p className="text-lg text-slate-300 mb-12">
            Entre em contato com nossos especialistas e descubra como podemos ajudar seu negócio
          </p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl transition-colors duration-300 flex items-center gap-2 mx-auto">
            Solicitar Demonstração
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
