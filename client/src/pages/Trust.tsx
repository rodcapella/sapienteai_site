import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Trust() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("trust", lang);

<<<<<<< HEAD
  useEffect(() => {
    setSEOHead({
      title: `${content.title} - Sapiente.AI`,
      description: content.subtitle,
      url: `${window.location.origin}/${lang}/trust`,
      type: 'website'
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER - Modern Gradient */}
      <div className="page-hero-banner relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal delay={100}>
            <div className="flex items-center justify-center gap-3 mb-6">
              {Shield && <Shield className="text-primary w-6 h-6" />}
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

      {/* TRUST SECTIONS - Solid Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
            {content.sections.map((section: any, idx: number) => (
              <Reveal key={idx} delay={idx * 100}>
                <SectionCard className="h-full bg-white/80 backdrop-blur-2xl border-foreground/5 p-12 shadow-2xl hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group">
                  <h2 className="text-3xl font-black mb-8 text-foreground tracking-tight leading-none border-b border-foreground/5 pb-6">
                    {section.title}
                  </h2>

                  <ul className="space-y-6">
                    {Array.isArray(section.content) ? (
                      section.content.map((item: string, i: number) => (
                        <li key={i} className="flex gap-4 text-foreground/60 text-xl leading-relaxed font-medium">
                          <span className="text-primary font-black">•</span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-foreground/60 text-xl leading-relaxed font-medium">{section.content}</p>
                    )}
                  </ul>
                </SectionCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
=======
  return <LegalDocumentPage content={content} slug="trust" fallbackDescription={content.subtitle || "Trust"} />;
>>>>>>> 5f49ef592044ef3f83d978b04a76b3cc6eb5069e
}
