import { useEffect } from 'react';
<<<<<<< HEAD
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";
=======
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { TOC } from "@/components/ui/navigation/TOC";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";

<<<<<<< HEAD
const ArrowLeft = Icons.ArrowLeft;
=======
import { getContent } from "@/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

<<<<<<< HEAD
type LGPDSection = {
  id: string;
  title: string;
  content: string | string[];
  icon?: React.ElementType;
};
=======
const ArrowLeft = Icons.ArrowLeft;
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

export default function LGPD() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("lgpd", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `${window.location.origin}/${lang}/lgpd`,
      type: 'website'
    });
  }, [lang, content]);

<<<<<<< HEAD
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = `/${lang}`;
    }
  };

  const tocItems = content.sections.map((s: LGPDSection) => ({
=======
  const tocItems = content.sections.map((s: any) => ({
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
    id: s.id,
    label: s.title.replace(/^\d+\.\s/, "")
  }));

<<<<<<< HEAD
  const activeId = useScrollSpy(content.sections.map((s: LGPDSection) => s.id));
=======
  const activeId = useScrollSpy(content.sections.map((s: any) => s.id));
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
=======
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
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

<<<<<<< HEAD
      <Header />

      {/* HERO */}
      <Section className="bg-modern-gradient text-center py-24 md:py-40">
        <div className="max-w-3xl mx-auto">
=======
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
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

<<<<<<< HEAD
          {/* BACK */}
          <button
            onClick={handleBack}
            className="mb-8 inline-flex items-center gap-2 text-foreground/50 hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{content.back || "Voltar"}</span>
          </button>

          <p className="text-sm text-foreground/40 mb-4 uppercase tracking-wider">
            {content.label}
          </p>

          <h1 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
            {content.title}
          </h1>

          <p className="text-foreground/60">
            {content.subtitle}
          </p>

=======
          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle}
            </p>
          </Reveal>
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
        </div>
      </div>

<<<<<<< HEAD
      {/* CONTENT */}
      <Section className="bg-blue-tint py-24 md:py-32 flex-grow">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[240px_1fr] gap-16 px-6">
=======
      {/* CONTENT - Solid Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-48 flex-grow">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-20">
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

            {/* TOC */}
            <aside className="hidden md:block">
              <div className="sticky top-32">
                <Reveal>
                  <TOC items={tocItems} activeId={activeId} />
                </Reveal>
              </div>
            </aside>

<<<<<<< HEAD
          {/* DOCUMENT */}
          <div className="space-y-16">
=======
            {/* DOCUMENT */}
            <div className="space-y-24">
              {content.sections.map((section: any, idx: number) => (
                <Reveal key={section.id} delay={idx * 50}>
                  <section id={section.id} className="space-y-10 scroll-mt-32">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-none border-l-4 border-primary pl-8">
                      {section.title}
                    </h2>
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

<<<<<<< HEAD
            {content.sections.map((section: LGPDSection) => {
              const Icon = section.icon;

              return (
                <section key={section.id} id={section.id} className="space-y-4">

                  {/* HEADER COM ÍCONE */}
                  <div className="flex items-start gap-4">

                    {Icon && (
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                    )}

                    <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      {section.title}
                    </h2>

                  </div>

                  {/* CONTENT */}
                  {Array.isArray(section.content) ? (
                    <ul className="ml-16 space-y-2 text-foreground/60 leading-relaxed">
                      {section.content.map((item: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ml-16 text-foreground/60 leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  <div className="border-b border-foreground/10 pt-6" />

                </section>
              );
            })}

=======
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
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
          </div>
        </div>
      </Section>
<<<<<<< HEAD

      <Footer />
=======
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
    </div>
  );
}
