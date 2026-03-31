import { Icons } from "@/lib/icons";
import { useEffect } from 'react';
import { useLocation } from "wouter";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";

const ArrowLeft = Icons.ArrowLeft; 

export default function Terms() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

<<<<<<< HEAD
  const content = getContent("terms", lang);
=======
  const content =
    lang === "en"
      ? privacyContentEN
      : privacyContentPT;
>>>>>>> 483f67648d4f2b9402935b142be26221ece9b5f6

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
<<<<<<< HEAD
      description:
        lang === "en"
          ? "Terms of Service of Sapiente AI."
          : "Termos de Serviço da SAPIENTE.AI.",
      url: `https://sapienteai.com/${lang}/terms`,
=======
      description: content.subtitle || "Privacy and data protection policy.",
      url: `https://sapienteai.com/${lang}/privacy`,
>>>>>>> 483f67648d4f2b9402935b142be26221ece9b5f6
      type: 'website'
    });
  }, [lang, content]);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container max-w-4xl">

<<<<<<< HEAD
          <a href={`/${lang}`} className="text-white/60 hover:text-white transition mb-6 inline-block">
=======
          <a
            href={`/${lang}`}
            className="text-white/60 hover:text-white transition mb-6 inline-block"
          >
>>>>>>> 483f67648d4f2b9402935b142be26221ece9b5f6
            <ArrowLeft className="h-5 w-5" />
          </a>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {content.title}
          </h1>

          <p className="text-white/70">
            {content.lastUpdated}
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow py-20">
        <div className="container max-w-4xl space-y-12 text-slate-700 leading-relaxed">

<<<<<<< HEAD
          {content.sections.map((section: any, i: number) => (
            <section key={i} className="space-y-3">
=======
          {content.sections.map((section) => (
            <section key={section.id} className="space-y-4">
>>>>>>> 483f67648d4f2b9402935b142be26221ece9b5f6

              <h2 className="text-xl font-semibold text-slate-900">
                {section.title}
              </h2>

              {Array.isArray(section.content) ? (
                <ul className="list-disc ml-5 space-y-2">
                  {section.content.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {section.content}
                </p>
              )}

              <div className="border-b border-gray-200 pt-6" />

            </section>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}
