import { useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from '@/components/SEOHead';
<<<<<<< HEAD
import { getContent } from "@/lib/content";
=======
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

const ArrowLeft = Icons.ArrowLeft;

<<<<<<< HEAD
type PrivacySection = {
  id: string;
  title: string;
  content: string | string[];
  icon?: React.ElementType;
};

function AnimatedSection({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Privacidade() {
=======
export default function Privacy() {
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("privacy", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
<<<<<<< HEAD
      description: content.description,
      url: `${window.location.origin}/${lang}/privacy`,
=======
      description: content.subtitle || (lang === "en" ? "Privacy Policy" : "Política de Privacidade"),
      url: `https://sapienteai.com/${lang}/privacy`,
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
      type: 'website'
    });
  }, [lang, content]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = `/${lang}`;
    }
  };

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

<<<<<<< HEAD
      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-32">
        <div className="container max-w-4xl">

          <AnimatedSection>

            <button
              onClick={handleBack}
              className="text-white/60 hover:text-white mb-6 inline-flex items-center gap-2 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm">
                {content.back || "Voltar"}
              </span>
            </button>

            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
=======
          <Reveal delay={100}>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle || content.lastUpdated}
            </p>
<<<<<<< HEAD

          </AnimatedSection>

=======
          </Reveal>
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
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

<<<<<<< HEAD
          {content.sections.map((section: PrivacySection, i: number) => {
            const Icon = section.icon;

            return (
              <AnimatedSection key={section.id || i}>

                {/* HEADER COM ÍCONE */}
                <div className="flex items-start gap-4 mb-4">

                  {Icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                  )}

                  <h2 className="text-2xl font-semibold text-slate-900 leading-tight">
                    {section.title}
                  </h2>

                </div>

                {/* CONTENT */}
                {Array.isArray(section.content) ? (
                  <ul className="list-disc ml-16 space-y-2">
                    {section.content.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-16">{section.content}</p>
                )}

              </AnimatedSection>
            );
          })}

=======
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
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472
        </div>
      </Section>
    </div>
  );
}
