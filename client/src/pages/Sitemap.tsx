import { useEffect } from "react";
import type { ElementType } from "react";
import { Link, useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { Icons } from "@/lib/icons";

type SitemapLink = {
  title: string;
  description: string;
  href: string;
};

type SitemapGroup = {
  label: string;
  title: string;
  links: SitemapLink[];
};

const copy = {
  pt: {
    label: "Mapa do site",
    title: "Encontre rapidamente cada página da Sapiente.ai.",
    subtitle: "Uma visão organizada das áreas principais, conteúdos e páginas legais do site.",
    sections: {
      main: "Páginas principais",
      mainTitle: "Conheça a Sapiente.ai",
      resources: "Conteúdos e recursos",
      resourcesTitle: "Explore conteúdos úteis",
      legal: "Confiança e legal",
      legalTitle: "Informação institucional",
    },
    links: {
      home: ["Início", "Visão geral das soluções, serviços e proposta de valor."],
      about: ["Sobre", "A nossa visão, método de trabalho e forma de aplicar IA."],
      team: ["Equipa", "Quem transforma estratégia, tecnologia e execução em resultados."],
      contact: ["Contacto", "Fale connosco para avaliar oportunidades no seu negócio."],
      faq: ["FAQ", "Respostas rápidas às perguntas mais frequentes."],
      quiz: ["Quiz IA", "Diagnóstico inicial para identificar oportunidades de automação."],
      newsletter: ["Newsletter", "Conteúdo prático sobre IA, automação e crescimento."],
      terms: ["Termos", "Condições de utilização do site e serviços."],
      privacy: ["Privacidade", "Como recolhemos, tratamos e protegemos dados pessoais."],
      trust: ["Confiança", "Princípios de segurança, ética e responsabilidade."],
      rgpd: ["RGPD", "Informação sobre proteção de dados e direitos dos titulares."],
      policy: ["Política de IA Generativa", "Como enquadramos o uso responsável de IA generativa."],
    },
  },
  en: {
    label: "Sitemap",
    title: "Find every Sapiente.ai page quickly.",
    subtitle: "A structured view of the main areas, content, and legal pages across the website.",
    sections: {
      main: "Main pages",
      mainTitle: "Get to know Sapiente.ai",
      resources: "Content and resources",
      resourcesTitle: "Explore useful content",
      legal: "Trust and legal",
      legalTitle: "Institutional information",
    },
    links: {
      home: ["Home", "Overview of our solutions, services, and value proposition."],
      about: ["About", "Our vision, working method, and approach to applied AI."],
      team: ["Team", "The people turning strategy, technology, and execution into results."],
      contact: ["Contact", "Talk to us about opportunities inside your business."],
      faq: ["FAQ", "Quick answers to the most common questions."],
      quiz: ["AI Quiz", "Initial diagnosis to identify automation opportunities."],
      newsletter: ["Newsletter", "Practical content on AI, automation, and growth."],
      terms: ["Terms", "Terms of use for the website and services."],
      privacy: ["Privacy", "How we collect, process, and protect personal data."],
      trust: ["Trust", "Security, ethics, and accountability principles."],
      rgpd: ["GDPR", "Information about data protection and data subject rights."],
      policy: ["Generative AI Policy", "How we frame responsible use of generative AI."],
    },
  },
} as const;

function makeLink(lang: string, path = "") {
  return `/${lang}${path}`;
}

function SitemapCard({ group, icon: Icon }: { group: SitemapGroup; icon: ElementType }) {
  return (
    <SectionCard className="h-full border-foreground/5 bg-white/85 p-8 shadow-xl md:p-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-primary/70">{group.label}</p>
          <h2 className="text-2xl font-black tracking-tight text-foreground">{group.title}</h2>
        </div>
      </div>

      <ul className="space-y-4">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group grid gap-2 rounded-2xl border border-transparent bg-foreground/[0.03] p-5 transition hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/5"
            >
              <span className="flex items-center justify-between gap-4 text-lg font-black tracking-tight text-foreground">
                {link.title}
                <Icons.ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-1" />
              </span>
              <span className="text-sm font-medium leading-relaxed text-foreground/55">{link.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default function Sitemap() {
  const [location] = useLocation();
  const lang = location.split("/")[1] === "en" ? "en" : "pt";
  const content = copy[lang];
  const l = content.links;
  const quizHref = lang === "pt" ? makeLink(lang, "/quiz-ia") : makeLink(lang, "/quiz-ai");

  const groups: SitemapGroup[] = [
    {
      label: content.sections.main,
      title: content.sections.mainTitle,
      links: [
        { title: l.home[0], description: l.home[1], href: makeLink(lang) },
        { title: l.about[0], description: l.about[1], href: makeLink(lang, "/about") },
        { title: l.team[0], description: l.team[1], href: makeLink(lang, "/team") },
        { title: l.contact[0], description: l.contact[1], href: makeLink(lang, "/contact") },
      ],
    },
    {
      label: content.sections.resources,
      title: content.sections.resourcesTitle,
      links: [
        { title: l.faq[0], description: l.faq[1], href: makeLink(lang, "/faq") },
        { title: l.quiz[0], description: l.quiz[1], href: quizHref },
        { title: l.newsletter[0], description: l.newsletter[1], href: makeLink(lang, "/newsletter") },
      ],
    },
    {
      label: content.sections.legal,
      title: content.sections.legalTitle,
      links: [
        { title: l.terms[0], description: l.terms[1], href: makeLink(lang, "/terms") },
        { title: l.privacy[0], description: l.privacy[1], href: makeLink(lang, "/privacy") },
        { title: l.trust[0], description: l.trust[1], href: makeLink(lang, "/trust") },
        { title: l.rgpd[0], description: l.rgpd[1], href: makeLink(lang, "/rgpd") },
        { title: l.policy[0], description: l.policy[1], href: makeLink(lang, "/generative-ai-policy") },
      ],
    },
  ];

  useEffect(() => {
    setSEOHead({
      title: `${content.label} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/sitemap`,
      type: "website",
    });
  }, [content, lang]);

  return (
    <div className="flex flex-col">
      <div className="page-hero-banner relative flex h-[400px] w-full items-center justify-center overflow-hidden bg-modern-gradient md:h-[600px]">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="container max-w-5xl px-6 text-center">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-3">
              <Icons.Globe className="h-6 w-6 text-primary" />
              <span className="text-sm font-black uppercase tracking-[0.3em] text-foreground/45">
                {content.label}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-10 text-4xl font-black leading-[0.9] tracking-tighter text-foreground md:text-8xl">
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto max-w-3xl text-xl font-black uppercase tracking-[0.18em] text-foreground/60 md:text-2xl">
              {content.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="bg-blue-tint py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            {groups.map((group, index) => {
              const Icon = [Icons.Home, Icons.Sparkles, Icons.ShieldCheck][index];

              return (
                <Reveal key={group.label} delay={index * 100}>
                  <SitemapCard group={group} icon={Icon} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
