import { useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";

const ArrowLeft = Icons.ArrowLeft; 
const Shield = Icons.Shield; 

export default function Trust() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("trust", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/trust`,
      type: 'website'
    });
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI Trust Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6">
          <div className="container max-w-4xl text-center md:text-left">
            <Link href={`/${lang}`} className="text-white/60 hover:text-white mb-8 inline-flex items-center gap-2 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Voltar</span>
            </Link>

            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Shield className="text-primary w-6 h-6" />
              <span className="text-sm text-white/80 uppercase tracking-widest font-bold">
                {content.label}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              {content.title}
            </h1>

            <p className="text-lg md:text-2xl text-white/90 max-w-2xl drop-shadow-md leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      <Breadcrumb />

      {/* CONTENT - Ice White */}
      <Section className="bg-ice py-20 md:py-32 flex-grow">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            {content.sections.map((section: any, i: number) => (
              <SectionCard
                key={i}
                className="bg-white p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border-foreground/5"
              >
                <h3 className="text-2xl font-bold mb-8 text-foreground border-b border-foreground/5 pb-4">
                  {section.title}
                </h3>

                <ul className="space-y-4 text-foreground/70 text-lg leading-relaxed">
                  {section.content.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
