import { Icons } from "@/lib/icons";
import { useEffect } from 'react';
import { useLocation } from "wouter";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/content";

const ArrowLeft = Icons.ArrowLeft;

export default function Terms() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("terms", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description:
        lang === "en"
          ? "Terms of Service of SAPIENTE.AI."
          : "Termos de Serviço da SAPIENTE.AI.",
      url: `https://sapienteai.com/${lang}/terms`,
      type: 'website'
    });
  }, [lang, content]);

  return (
    <div className="space-y-20">

      {/* HERO */}
      <Section>
        <div className="max-w-4xl mx-auto">

          <a
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </a>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
            {content.title}
          </h1>

          <p className="text-white/50">
            {content.lastUpdated}
          </p>

        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-12 text-white/60 leading-relaxed">

          {content.sections.map((section: any) => (
            <section key={section.id} className="space-y-4">

              <h2 className="text-xl font-semibold text-white">
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

              <div className="border-b border-white/10 pt-6" />

            </section>
          ))}

        </div>
      </Section>

    </div>
  );
}