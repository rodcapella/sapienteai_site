import { Icons } from "@/lib/icons";
import { useEffect } from 'react';
import { useLocation } from "wouter";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/content";

const ArrowLeft = Icons.ArrowLeft; 

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
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("privacy", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description:
        lang === "en"
          ? "Privacy and data protection policy."
          : "Política de privacidade e proteção de dados.",
      url: `https://sapienteai.com/${lang}/privacy`,
      type: 'website'
    });
  }, [lang]);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-32">
        <div className="container max-w-4xl">

          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <a
                href={`/${lang}`}
                className="text-white/60 hover:text-white transition"
              >
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              {content.title}
            </h1>

            <p className="text-white/70">
              {content.lastUpdated}
            </p>
          </AnimatedSection>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow py-20">
        <div className="container max-w-4xl space-y-16 text-slate-700 leading-relaxed">

          {content.sections.map((section: any, i: number) => (
            <AnimatedSection key={i}>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {section.title}
              </h2>

              {Array.isArray(section.content) ? (
                <ul className="list-disc ml-5 space-y-2">
                  {section.content.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.content}</p>
              )}
            </AnimatedSection>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}