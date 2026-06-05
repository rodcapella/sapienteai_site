import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type ServiceSection = {
  id: string;
  navLabel: string;
  icon: keyof typeof Icons;
};

// ─── Config das secções de navegação ─────────────────────────────────────────

const SERVICE_SECTIONS: ServiceSection[] = [
  { id: "ia",              navLabel: "IA",               icon: "Sparkles"   },
  { id: "automacao",       navLabel: "Automação",         icon: "Zap"        },
  { id: "crescimento",     navLabel: "Crescimento",       icon: "TrendingUp" },
  { id: "dados-bi",        navLabel: "Dados & BI",        icon: "BarChart"   },
  { id: "desenvolvimento", navLabel: "Desenvolvimento",   icon: "Code"       },
  { id: "marketing",       navLabel: "Marketing Digital", icon: "Megaphone"  },
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
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-1 self-start">
      {SERVICE_SECTIONS.map((s) => {
        const Icon = Icons[s.icon] as React.ElementType;
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={[
              "group flex w-full items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-left font-[var(--font-body)] text-[18px] font-bold leading-tight transition-all duration-200",
              isActive
                ? "border-[color-mix(in_srgb,#00D1FF_58%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] text-[var(--brand-night)] dark:border-[color-mix(in_srgb,#00D1FF_72%,transparent)] dark:bg-[color-mix(in_srgb,#00D1FF_72%,var(--brand-offwhite))]"
                : "border-transparent bg-transparent text-[var(--brand-night)] hover:bg-[color-mix(in_srgb,#00D1FF_16%,var(--brand-offwhite))] dark:text-[var(--brand-offwhite)] dark:hover:bg-[color-mix(in_srgb,#00D1FF_72%,var(--brand-offwhite))] dark:hover:text-[var(--brand-night)]",
            ].join(" ")}
          >
            {Icon && (
              <Icon
                className={[
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-[var(--brand-primary)] dark:text-[var(--brand-night)]" : "text-[var(--brand-night)]/35 group-hover:text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]/50 dark:group-hover:text-[var(--brand-night)]",
                ].join(" ")}
              />
            )}
            <span className="tracking-tight">{s.navLabel}</span>
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
    <div className="animate-fadeIn">
      <Reveal>
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
          {data.eyebrow}
        </p>
        <h2 className="mb-6 text-3xl font-black leading-tight text-[var(--brand-offwhite)] md:text-5xl">
          {data.title}
        </h2>
        <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-[var(--brand-offwhite)]/60 md:text-lg">
          {data.description}
        </p>
      </Reveal>

      <Reveal delay={100}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-5 py-4 text-sm font-semibold text-[var(--brand-offwhite)]/75 shadow-[0_8px_24px_rgba(1,32,80,0.12)]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                <Icons.Check className="h-3 w-3" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Services(_props: { lang?: string }) {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("services", lang);
  const [activeSection, setActiveSection] = useState(SERVICE_SECTIONS[0].id);

  useEffect(() => {
    setSEOHead({
      title: `${content.hero.label} — Sapiente.AI`,
      description: content.hero.subtitle,
      url: `https://sapienteai.com/${lang}/services`,
      type: "website",
    });
  }, [content, lang]);

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
      <Section className="bg-blue-tint py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16 xl:grid-cols-[280px_1fr]">

              {/* Sidebar fixa */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  {/* Label do grupo */}
                  <p className="mb-4 px-3.5 font-[var(--font-detail)] text-[16px] font-black uppercase tracking-[0.2em] text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                    {lang === "en" ? "Services" : "Serviços"}
                  </p>
                  <ServicesSidebar active={activeSection} onSelect={setActiveSection} />
                </div>
              </aside>

              {/* Nav mobile (horizontal scroll) */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {SERVICE_SECTIONS.map((s) => {
                  const Icon = Icons[s.icon] as React.ElementType;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSection(s.id)}
                      className={[
                        "flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition-all",
                        isActive
                          ? "border-[color-mix(in_srgb,#00D1FF_58%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] text-[var(--brand-night)]"
                          : "border-transparent text-[var(--brand-night)] hover:bg-[color-mix(in_srgb,#00D1FF_16%,var(--brand-offwhite))] dark:text-[var(--brand-offwhite)]",
                      ].join(" ")}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                      {s.navLabel}
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo variável */}
              <main className="min-h-[520px]">
                {/* Divisor vertical visível apenas em desktop */}
                <div className="relative lg:pl-10 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-[var(--brand-cyan)]/20 lg:before:via-[var(--brand-purple)]/15 lg:before:to-transparent">
                  <ServiceDetail key={activeSection} id={activeSection} lang={lang} />
                </div>
              </main>

            </div>
          </div>
        </div>
      </Section>

      {/* ── Problem / Vision ── */}
      <Section className="relative overflow-hidden py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {[content.problem, content.vision].map((block, index) => (
              <Reveal key={block.title} delay={index * 120}>
                <SectionCard className="h-full border-[var(--brand-purple)]/20 bg-[var(--card)] p-8 shadow-2xl md:p-10">
                  <Icons.Zap className="mb-8 h-9 w-9 text-primary" />
                  <h3 className="mb-6 text-3xl font-black leading-tight text-foreground md:text-5xl">
                    {block.title}
                  </h3>
                  <p className="text-lg font-medium leading-relaxed text-foreground/65">{block.text}</p>
                </SectionCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <FinalCTA
        title={content.finalCta.title}
        title_highlight={content.finalCta.highlight}
        description={content.finalCta.description}
        button={content.finalCta.button}
        align="left"
      />
    </div>
  );
}
