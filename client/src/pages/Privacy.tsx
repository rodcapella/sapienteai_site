import { useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

const ArrowLeft = Icons.ArrowLeft;

export default function Privacy() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("privacy", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle || (lang === "en" ? "Privacy Policy" : "Política de Privacidade"),
      url: `https://sapienteai.com/${lang}/privacy`,
      type: 'website'
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER - Modern Gradient */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal>
            <Link 
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle || content.lastUpdated}
            </p>
          </Reveal>
        </div>
      </div>

      {/* PRIVACY SECTIONS - Solid Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-20">
            {content.sections.map((section: any, idx: number) => (
              <Reveal key={idx} delay={idx * 50}>
                <section className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-none border-l-4 border-primary pl-8">
                    {section.title}
                  </h2>

                  <div className="text-foreground/60 text-xl leading-relaxed font-medium space-y-6">
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-4">
                        {section.content.map((item: string, i: number) => (
                          <li key={i} className="flex gap-4">
                            <span className="text-primary font-black">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
