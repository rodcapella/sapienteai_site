import { ArrowLeft, Shield } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

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
    <div className="min-h-screen bg-white flex flex-col">

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container max-w-4xl">

          <a href={`/${lang}`} className="text-white/60 hover:text-white mb-6 inline-block">
            <ArrowLeft className="h-5 w-5" />
          </a>

          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-cyan-400" />
            <span className="text-sm text-white/60 uppercase tracking-wide">
              {content.label}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {content.title}
          </h1>

          <p className="text-white/70 max-w-2xl">
            {content.subtitle}
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow py-20">
        <div className="container max-w-5xl grid md:grid-cols-2 gap-10">

          {content.sections.map((section: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-4">
                {section.title}
              </h3>

              <ul className="space-y-2 text-gray-600">
                {section.content.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}