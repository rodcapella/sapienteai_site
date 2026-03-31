import { useEffect } from 'react';
import { useLocation } from "wouter";

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { TOC } from "@/components/ui/navigation/TOC";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { setSEOHead } from '@/components/SEOHead';

import { getContent } from "@/lib/content";

const content = getContent("lgpd", lang);


export default function LGPD() {

  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/lgpd`,
      type: 'website'
    });
  }, [lang]);

  const tocItems = content.sections.map(s => ({
    id: s.id,
    label: s.title.replace(/^\d+\.\s/, "")
  }));

  const activeId = useScrollSpy(content.sections.map(s => s.id));

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Header />

      {/* HERO */}
      <Section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">

          <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">
            {content.label}
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            {content.title}
          </h1>

          <p className="text-gray-600">
            {content.subtitle}
          </p>

        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-16">

          <aside className="hidden md:block">
            <div className="sticky top-24">
              <TOC items={tocItems} activeId={activeId} />
            </div>
          </aside>

          <div className="space-y-12">

            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">

                <h2 className="text-xl font-semibold">
                  {section.title}
                </h2>

                {Array.isArray(section.content) ? (
                  <ul className="list-disc ml-5 space-y-2 text-gray-600">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}

                <div className="border-b border-gray-200 pt-6" />

              </section>
            ))}

          </div>
        </div>
      </Section>

      <Footer />

    </div>
  );
}