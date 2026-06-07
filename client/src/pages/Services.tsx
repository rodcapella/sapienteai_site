import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";
import "@/content/styles/legal.css";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type ServiceSection = {
  id: string;
  navLabel: { pt: string; en: string };
  icon: keyof typeof Icons;
  backgroundImage: string;
};

// ─── Config das secções de navegação ─────────────────────────────────────────

const SERVICE_SECTIONS: ServiceSection[] = [
  { id: "ia", navLabel: { pt: "IA", en: "AI" }, icon: "Sparkles", backgroundImage: "/media/bg/servicos/bg_Serviços_ia.png" },
  { id: "automacao", navLabel: { pt: "Automação", en: "Automation" }, icon: "Zap", backgroundImage: "/media/bg/servicos/bg_Serviços_automacao.png" },
  { id: "crescimento", navLabel: { pt: "Crescimento", en: "Growth" }, icon: "TrendingUp", backgroundImage: "/media/bg/servicos/bg_Serviços_crescimento.png" },
  { id: "dados-bi", navLabel: { pt: "Dados & BI", en: "Data & BI" }, icon: "BarChart3", backgroundImage: "/media/bg/servicos/bg_Serviços_dados.png" },
  { id: "desenvolvimento", navLabel: { pt: "Website", en: "Website" }, icon: "Globe", backgroundImage: "/media/bg/servicos/bg_Serviços_website.png" },
  { id: "marketing", navLabel: { pt: "Marketing Digital", en: "Digital Marketing" }, icon: "MessageCircle", backgroundImage: "/media/bg/servicos/bg_Serviços_mkt_digital.png" },
];

// ─── Conteúdo de cada secção ──────────────────────────────────────────────────

type ServiceContent = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta?: string;
};

const SECTION_CONTENT: Record<string, { pt: ServiceContent; en: ServiceContent }> = {
  ia: {
    pt: {
      eyebrow: "Inteligência Artificial",
      title: "IA aplicada ao seu negócio",
      description:
        "Implementamos modelos de linguagem, automação cognitiva e soluções de IA generativa adaptadas à realidade da sua empresa — sem complexidade técnica desnecessária.",
      bullets: [
        "Chatbots e assistentes virtuais com IA generativa",
        "Automação de processos com LLMs (GPT-4, Claude, Gemini)",
        "Análise e síntese de documentos com IA",
        "Integração de IA em fluxos de trabalho existentes",
        "Soluções RAG (Retrieval-Augmented Generation)",
      ],
    },
    en: {
      eyebrow: "Artificial Intelligence",
      title: "AI applied to your business",
      description:
        "We implement language models, cognitive automation, and generative AI solutions tailored to your company's reality — without unnecessary technical complexity.",
      bullets: [
        "Chatbots and virtual assistants with generative AI",
        "Process automation with LLMs (GPT-4, Claude, Gemini)",
        "Document analysis and synthesis with AI",
        "AI integration into existing workflows",
        "RAG (Retrieval-Augmented Generation) solutions",
      ],
    },
  },
  automacao: {
    pt: {
      eyebrow: "Automação",
      title: "Automatize o que consome o seu tempo",
      description:
        "Identificamos os processos repetitivos do seu negócio e construímos automações robustas que poupam horas de trabalho manual todos os dias.",
      bullets: [
        "Automação de fluxos com Make, n8n e Zapier",
        "Integração entre plataformas via API",
        "Automação de email marketing e CRM",
        "Notificações e alertas automáticos",
        "Relatórios e dashboards gerados automaticamente",
      ],
    },
    en: {
      eyebrow: "Automation",
      title: "Automate what consumes your time",
      description:
        "We identify repetitive processes in your business and build robust automations that save hours of manual work every day.",
      bullets: [
        "Workflow automation with Make, n8n, and Zapier",
        "Platform integration via API",
        "Email marketing and CRM automation",
        "Automatic notifications and alerts",
        "Automatically generated reports and dashboards",
      ],
    },
  },
  crescimento: {
    pt: {
      eyebrow: "Crescimento",
      title: "Estratégias que geram resultados reais",
      description:
        "Definimos e executamos estratégias de crescimento digital centradas em dados, com foco em aquisição, retenção e monetização.",
      bullets: [
        "Estratégia de crescimento digital personalizada",
        "Funis de conversão e otimização de landing pages",
        "SEO técnico e de conteúdo",
        "Campanhas pagas (Google Ads, Meta Ads)",
        "Análise de métricas e KPIs de crescimento",
      ],
    },
    en: {
      eyebrow: "Growth",
      title: "Strategies that generate real results",
      description:
        "We define and execute data-driven digital growth strategies focused on acquisition, retention, and monetization.",
      bullets: [
        "Personalized digital growth strategy",
        "Conversion funnels and landing page optimization",
        "Technical and content SEO",
        "Paid campaigns (Google Ads, Meta Ads)",
        "Growth metrics and KPI analysis",
      ],
    },
  },
  "dados-bi": {
    pt: {
      eyebrow: "Dados & BI",
      title: "Decisões baseadas em dados reais",
      description:
        "Transformamos dados brutos em inteligência acionável com dashboards, pipelines e relatórios que apoiam decisões estratégicas.",
      bullets: [
        "Dashboards interativos com Power BI e Looker Studio",
        "Pipelines de dados com Python, PySpark e Databricks",
        "Data Warehousing e modelação dimensional",
        "Integração de fontes de dados heterogéneas",
        "Relatórios automáticos e alertas de negócio",
      ],
    },
    en: {
      eyebrow: "Data & BI",
      title: "Decisions based on real data",
      description:
        "We transform raw data into actionable intelligence with dashboards, pipelines, and reports that support strategic decisions.",
      bullets: [
        "Interactive dashboards with Power BI and Looker Studio",
        "Data pipelines with Python, PySpark, and Databricks",
        "Data Warehousing and dimensional modeling",
        "Integration of heterogeneous data sources",
        "Automated reports and business alerts",
      ],
    },
  },
  desenvolvimento: {
    pt: {
      eyebrow: "Desenvolvimento",
      title: "Produtos digitais construídos para escalar",
      description:
        "Desenvolvemos websites, plataformas e aplicações web com tecnologias modernas, foco em performance e experiência de utilizador.",
      bullets: [
        "Websites e landing pages em React, Next.js ou Webflow",
        "Plataformas web à medida com backend robusto",
        "APIs RESTful e integrações de terceiros",
        "Otimização de performance e Core Web Vitals",
        "Manutenção, suporte e evolução contínua",
      ],
    },
    en: {
      eyebrow: "Development",
      title: "Digital products built to scale",
      description:
        "We develop websites, platforms, and web applications with modern technologies, focused on performance and user experience.",
      bullets: [
        "Websites and landing pages in React, Next.js or Webflow",
        "Custom web platforms with robust backend",
        "RESTful APIs and third-party integrations",
        "Performance optimization and Core Web Vitals",
        "Maintenance, support, and continuous evolution",
      ],
    },
  },
  marketing: {
    pt: {
      eyebrow: "Marketing Digital",
      title: "Presença digital que gera negócio",
      description:
        "Gerimos a sua presença digital de forma integrada — desde o conteúdo às campanhas — com IA a amplificar cada ação.",
      bullets: [
        "Gestão de redes sociais (Instagram, LinkedIn, TikTok)",
        "Produção de conteúdo com IA (texto, imagem, vídeo)",
        "Email marketing e automação de nurturing",
        "Campanhas de performance e remarketing",
        "Relatórios mensais de crescimento e ROI",
      ],
    },
    en: {
      eyebrow: "Digital Marketing",
      title: "Digital presence that generates business",
      description:
        "We manage your digital presence in an integrated way — from content to campaigns — with AI amplifying every action.",
      bullets: [
        "Social media management (Instagram, LinkedIn, TikTok)",
        "AI-powered content production (text, image, video)",
        "Email marketing and nurturing automation",
        "Performance and remarketing campaigns",
        "Monthly growth and ROI reports",
      ],
    },
  },
};

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────

function ServicesSidebar({
  active,
  lang,
  onSelect,
}: {
  active: string;
  lang: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="legal-cats">
      {SERVICE_SECTIONS.map((s) => {
        const Icon = Icons[s.icon] as React.ElementType;
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`legal-cat ${isActive ? "active" : ""}`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{s.navLabel[lang === "en" ? "en" : "pt"]}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Conteúdo de cada secção ──────────────────────────────────────────────────

function ServiceDetail({
  id,
  lang,
}: {
  id: string;
  lang: string;
}) {
  const data = SECTION_CONTENT[id]?.[lang as "pt" | "en"] ?? SECTION_CONTENT[id]?.pt;
  if (!data) return null;

  return (
    <article id={`service-${id}`} className="scroll-mt-32 rounded-[18px] border-[6px] border-[color-mix(in_srgb,var(--brand-purple)_72%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] p-7 shadow-[0_18px_38px_rgba(1,32,80,0.06)] md:p-9">
      <Reveal>
        <p className="mb-4 font-[var(--font-detail)] text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">
          {data.eyebrow}
        </p>
        <h2 className="mb-4 font-[var(--font-heading)] text-3xl font-black leading-tight text-[var(--brand-night)] md:text-5xl">
          {data.title}
        </h2>
        <p className="mb-10 max-w-3xl font-[var(--font-body)] text-base font-medium leading-relaxed text-[var(--brand-ink)] md:text-lg">
          {data.description}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_22%,transparent)] bg-[rgba(234,246,255,0.58)] px-5 py-4 font-[var(--font-body)] text-sm font-semibold text-[var(--brand-night)] shadow-[0_8px_24px_rgba(1,32,80,0.08)]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D1FF] text-[var(--brand-night)]">
                <Icons.Check className="h-3 w-3" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Services(_props: { lang?: string }) {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("services", lang);
  const [activeSection, setActiveSection] = useState(SERVICE_SECTIONS[0].id);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedContactTopic, setSelectedContactTopic] = useState(content.visualServices.ia.topic);
  const [mobileNavSticky, setMobileNavSticky] = useState(false);
  const manualScrollLockRef = useRef<number | null>(null);

  useEffect(() => {
    setSEOHead({
      title: `${content.hero.label} — Sapiente.AI`,
      description: content.hero.subtitle,
      url: `https://sapienteai.com/${lang}/services`,
      type: "website",
    });
  }, [content, lang]);

  useEffect(() => {
    const hero = document.querySelector(".InternalHero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMobileNavSticky(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionElements = SERVICE_SECTIONS.map((section) => document.getElementById(`service-${section.id}`)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (manualScrollLockRef.current && Date.now() < manualScrollLockRef.current) return;

        if (visible?.target.id) {
          setActiveSection(visible.target.id.replace("service-", ""));
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleSelectSection = (id: string) => {
    manualScrollLockRef.current = Date.now() + 1100;
    setActiveSection(id);
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <InternalHero
        label={content.hero.label}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/servicos/bg_Servicos.png"
        imageAlt="Sapiente.AI"
        compact
      />

      {/* ── Docs Layout ── */}
      <section className="bg-white px-0 py-20 md:py-28 flex-1">
        <div className="w-full px-6">
          <div className="w-full">
            <div className="grid w-full items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6">

              {/* Sidebar fixa */}
              <aside className="hidden h-fit self-start justify-self-start lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-6 lg:pt-1">
                <div className="legal-sidebar-title">
                  {lang === "en" ? "Services" : "Serviços"}
                </div>

                <ServicesSidebar
                  active={activeSection}
                  lang={lang}
                  onSelect={handleSelectSection}
                />
              </aside>

              {/* Mobile Nav */}
              <div
                className={[
                  "flex gap-2 overflow-x-auto pb-2 lg:hidden transition-all duration-300",
                  mobileNavSticky
                    ? "fixed left-0 right-0 top-0 z-40 bg-white/95 px-4 pt-2 shadow-md backdrop-blur-md"
                    : "relative px-0",
                ].join(" ")}
              >
                {SERVICE_SECTIONS.map((s) => {
                  const Icon = Icons[s.icon] as React.ElementType;
                  const isActive = activeSection === s.id;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectSection(s.id)}
                      className={[
                        "flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition-all",
                        isActive
                          ? "border-[color-mix(in_srgb,#00D1FF_58%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] text-[var(--brand-night)]"
                          : "border-transparent text-[var(--brand-night)] hover:bg-[color-mix(in_srgb,#00D1FF_16%,var(--brand-offwhite))]",
                      ].join(" ")}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {s.navLabel[lang === "en" ? "en" : "pt"]}
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo */}
              <main className="flex min-w-0 flex-1 flex-col gap-6">
                <div className="contents">
                  {SERVICE_SECTIONS.map((section) => {
                    const data =
                      content.visualServices?.[
                        section.id as keyof typeof content.visualServices
                      ];

                    if (!data) return null;

                    return (
                      <article
                        key={section.id}
                        id={`service-${section.id}`}
                        aria-label={section.navLabel[lang === "en" ? "en" : "pt"]}
                        className="relative min-h-[420px] w-full scroll-mt-32 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat px-8 py-6 md:px-10 lg:px-12"
                        style={{
                          backgroundImage: `url('${section.backgroundImage}')`,
                        }}
                      >
                        {/* conteúdo do artigo */}
                      </article>
                    );
                  })}
                </div>
              </main>

            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <FinalCTA
        title={content.finalCta.title}
        title_highlight={content.finalCta.highlight}
        description={content.finalCta.description}
        description_highlight={content.finalCta.description_highlight} 
        button={content.finalCta.button}
        align="left"
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialTopic={selectedContactTopic}
      />
    </div>
  );
}
