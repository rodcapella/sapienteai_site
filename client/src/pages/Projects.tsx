import { useEffect } from "react";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { CalendarDays, RefreshCw, Search } from "@/lib/icons";

const projectIcons = { CalendarDays, RefreshCw, Search };

const projectTone = {
  cyan: {
    surface: "from-[var(--brand-night)] via-[#05335f] to-[#087da1]",
    glow: "bg-[var(--brand-cyan-bright)]",
    icon: "text-[var(--brand-cyan)]",
  },
  purple: {
    surface: "from-[var(--brand-night)] via-[#192354] to-[#513a91]",
    glow: "bg-[var(--brand-purple-bright)]",
    icon: "text-[#b9aaff]",
  },
  aqua: {
    surface: "from-[var(--brand-deep)] via-[#087f8b] to-[var(--brand-cyan)]",
    glow: "bg-[var(--brand-cyan-bright)]",
    icon: "text-[var(--brand-night)]",
  },
} as const;

const projectStatusTone = {
  development: {
    badge: "border-amber-300 bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
  },
  testing: {
    badge: "border-blue-300 bg-blue-50 text-blue-800",
    dot: "bg-blue-500",
  },
  production: {
    badge: "border-emerald-300 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
  },
} as const;

export default function Projects() {
  const { lang } = useTranslation();
  const content = getContent("projects", lang);

  useSEOHead({
    title: lang === "en" ? "Projects in Development" : "Projetos em Desenvolvimento",
    description: content.seoDescription,
    url: `https://www.sapienteai.com/${lang}/projects`,
    type: "website",
    keywords: lang === "en"
      ? "Sapiente.AI projects, Hoje em SJM, São João da Madeira cultural calendar, Aveiro cultural events, specialised item exchange, SEO GEO AEO validator, digital projects Portugal"
      : "projetos Sapiente.AI, Hoje em SJM, agenda cultural São João da Madeira, eventos culturais Aveiro, plataforma de trocas especializadas, validador SEO GEO AEO, projetos digitais Portugal",
  }, [content, lang]);

  useEffect(() => {
    const isEN = lang === "en";
    const pageUrl = `https://www.sapienteai.com/${lang}/projects`;
    const validatorUrl = `https://www.sapienteai.com/${lang}/seo-geo-aeo-validator`;
    const language = isEN ? "en" : "pt-PT";

    const projectSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: isEN ? "Sapiente.AI Projects in Development" : "Projetos em Desenvolvimento da Sapiente.AI",
          description: content.seoDescription,
          inLanguage: language,
          isPartOf: { "@id": "https://www.sapienteai.com/#website" },
          about: { "@id": `${pageUrl}#projects` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".hero-subtitle", "article h3", "article p"],
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: isEN ? "Home" : "Início",
              item: `https://www.sapienteai.com/${lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: isEN ? "Projects" : "Projetos",
              item: pageUrl,
            },
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#projects`,
          name: isEN ? "Sapiente.AI digital projects" : "Projetos digitais da Sapiente.AI",
          numberOfItems: 3,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#hoje-sjm`,
                name: "Hoje em SJM",
                applicationCategory: "LifestyleApplication",
                operatingSystem: "Web",
                description: content.items[0].description,
                inLanguage: language,
                author: { "@id": "https://www.sapienteai.com/#organization" },
                about: {
                  "@type": "Place",
                  name: "São João da Madeira, Aveiro, Portugal",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "São João da Madeira",
                    addressRegion: "Aveiro",
                    addressCountry: "PT",
                  },
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: "Aveiro",
                    containedInPlace: { "@type": "Country", name: "Portugal" },
                  },
                },
                areaServed: {
                  "@type": "City",
                  name: "São João da Madeira",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "São João da Madeira",
                    addressRegion: "Aveiro",
                    addressCountry: "PT",
                  },
                  containedInPlace: { "@type": "AdministrativeArea", name: "Aveiro" },
                },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#specialised-exchange`,
                name: isEN ? "Specialised item exchange platform" : "Plataforma de trocas de itens especializados",
                applicationCategory: "MarketplaceApplication",
                operatingSystem: "Web",
                description: content.items[1].description,
                inLanguage: language,
                author: { "@id": "https://www.sapienteai.com/#organization" },
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "WebApplication",
                "@id": `${validatorUrl}#webapplication`,
                name: isEN ? "SEO, GEO and AEO Validator" : "Validador de SEO, GEO e AEO",
                url: validatorUrl,
                applicationCategory: "BusinessApplication",
                browserRequirements: "Requires a modern web browser",
                operatingSystem: "Web",
                description: content.items[2].description,
                inLanguage: language,
                author: { "@id": "https://www.sapienteai.com/#organization" },
              },
            },
          ],
        },
      ],
    };

    const id = "projects-schema-ld";
    let element = document.getElementById(id) as HTMLScriptElement | null;
    if (!element) {
      element = document.createElement("script");
      element.id = id;
      element.type = "application/ld+json";
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(projectSchema);

    return () => document.getElementById(id)?.remove();
  }, [content, lang]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={content.hero.label}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/bg_Projetos.webp"
        imageAlt={content.hero.label}
        imagePosition="center"
        contentPanelClassName="!bg-[rgba(0,20,50,0.16)] !backdrop-blur-[1px] md:!rounded-3xl md:!px-5 md:!py-5"
        compact
      />

      <section className="content-atmosphere bg-white px-5 py-12 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <p className="type-label text-[var(--brand-primary)]">{content.intro.label}</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight text-[var(--brand-night)]">
                {content.intro.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-[var(--brand-mid)]">
                {content.intro.description}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-7 md:grid-cols-2">
            {content.items.map((project, index) => {
              const Icon = projectIcons[project.icon as keyof typeof projectIcons];
              const tone = projectTone[project.tone as keyof typeof projectTone];
              const statusTone =
                projectStatusTone[project.statusKey as keyof typeof projectStatusTone];

              return (
                <Reveal key={project.id} delay={index * 90} className={index === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.875rem)]" : ""}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-[var(--brand-primary)]/25 bg-white shadow-[0_18px_48px_color-mix(in_srgb,var(--brand-night)_10%,transparent)] transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/55 hover:shadow-[0_24px_60px_color-mix(in_srgb,var(--brand-primary)_18%,transparent)]">
                    <div className={`relative flex min-h-[230px] items-center justify-center overflow-hidden bg-gradient-to-br ${tone.surface}`}>
                      <div className={`absolute -right-12 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl ${tone.glow}`} />
                      <div className={`absolute -bottom-20 -left-12 h-52 w-52 rounded-full opacity-20 blur-3xl ${tone.glow}`} />
                      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/25 bg-white/10 shadow-[0_0_50px_rgba(85,212,242,.22)] backdrop-blur-md">
                        <Icon className={`h-14 w-14 ${tone.icon}`} strokeWidth={1.4} />
                      </div>
                      <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-[var(--brand-night)]/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${statusTone.badge}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${statusTone.dot}`} />
                        {project.status}
                      </div>
                      <h3 className="text-[clamp(1.55rem,3vw,2rem)] font-black leading-tight text-[var(--brand-night)]">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-[15px] font-medium leading-7 text-[var(--brand-mid)]">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <QuizCTA />
      <FinalCTA
        title={content.cta.title}
        title_highlight={content.cta.title_highlight}
        description={content.cta.description}
        description_highlight={content.cta.description_highlight}
        button={content.cta.button}
      />
    </div>
  );
}
