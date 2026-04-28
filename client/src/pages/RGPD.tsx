import { useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { TOC } from "@/components/ui/navigation/TOC";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { setSEOHead } from '@/components/SEOHead';

import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

const ArrowLeft = Icons.ArrowLeft;

export default function RGPD() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("RGPD", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `${window.location.origin}/${lang}/RGPD`,
      type: 'website'
    });
  }, [lang, content]);

  const tocItems = content.sections.map((s: any) => ({
    id: s.id,
    label: s.title.replace(/^\d+\.\s/, "")
  }));

  const activeId = useScrollSpy(content.sections.map((s: any) => s.id));

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
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-sm text-foreground/40 uppercase tracking-[0.3em] font-black">
                {content.label}
              </span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* CONTENT - Solid Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-48 flex-grow">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-20">

            {/* TOC */}
            <aside className="hidden md:block">
              <div className="sticky top-32">
                <Reveal>
                  <TOC items={tocItems} activeId={activeId} />
                </Reveal>
              </div>
            </aside>

            {/* DOCUMENT */}
            <div className="space-y-24">
              {content.sections.map((section: any, idx: number) => (
                <Reveal key={section.id} delay={idx * 50}>
                  <section id={section.id} className="space-y-10 scroll-mt-32">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-none border-l-4 border-primary pl-8">
                      {section.title}
                    </h2>

                    <div className="text-foreground/60 text-xl leading-relaxed font-medium space-y-8">
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
        </div>
      </Section>
    </div>
  );
}
