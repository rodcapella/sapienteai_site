import { useEffect, useState } from "react";
import type { ElementType } from "react";
import { Link, useLocation } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { setSEOHead } from "@/components/SEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { Icons } from "@/lib/icons";

type SitemapLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

type SitemapGroup = {
  label: string;
  title: string;
  links: SitemapLink[];
};

const copy = {
  pt: {
    label: "Mapa do Site",
    title: "Todas as páginas",
    highlight: "num só lugar.",
    subtitle: "Navegue facilmente por todas as secções do site da Sapiente.AI.",
    sections: {
      main: "Páginas principais",
      mainTitle: "Navegação principal",
      resources: "Recursos e ferramentas",
      resourcesTitle: "Conteúdos úteis",
      legal: "Informação legal",
      legalTitle: "Transparência e confiança",
    },
    links: {
      home: ["Início", "Visão geral das soluções, serviços e proposta de valor."],
      about: ["Sobre nós", "A nossa visão, método de trabalho e forma de aplicar IA."],
      services: ["Serviços", "Soluções digitais, automação, marketing e IA aplicada ao crescimento."],
      faq: ["FAQ", "Respostas às perguntas mais frequentes sobre os nossos serviços."],
      quiz: ["Quiz IA", "Diagnóstico inicial para identificar oportunidades de automação."],
      newsletter: ["Newsletter", "Conteúdo prático sobre IA, automação e crescimento."],
      terms: ["Termos de Serviço", "Condições de utilização do site e dos nossos serviços."],
      privacy: ["Política de Privacidade", "Como recolhemos, tratamos e protegemos dados pessoais."],
      trust: ["Confiança & Segurança", "Princípios de segurança, ética e responsabilidade."],
      policy: ["Política de IA Generativa", "Como enquadramos o uso responsável de IA generativa."],
    },
  },
  en: {
    label: "Sitemap",
    title: "All pages",
    highlight: "in one place.",
    subtitle: "Easily navigate all sections of the Sapiente.AI website.",
    sections: {
      main: "Main pages",
      mainTitle: "Main navigation",
      resources: "Resources and tools",
      resourcesTitle: "Useful content",
      legal: "Legal information",
      legalTitle: "Transparency and trust",
    },
    links: {
      home: ["Home", "Overview of our solutions, services, and value proposition."],
      about: ["About us", "Our vision, working method, and approach to applied AI."],
      services: ["Services", "Digital solutions, automation, marketing and applied AI for growth."],
      faq: ["FAQ", "Quick answers to the most common questions about our services."],
      quiz: ["AI Quiz", "Initial diagnosis to identify automation opportunities."],
      newsletter: ["Newsletter", "Practical content on AI, automation, and growth."],
      terms: ["Terms of Service", "Terms of use for the website and services."],
      privacy: ["Privacy Policy", "How we collect, process, and protect personal data."],
      trust: ["Trust & Security", "Security, ethics, and accountability principles."],
      policy: ["Generative AI Policy", "How we frame responsible use of generative AI."],
    },
  },
} as const;

function makeLink(lang: string, path = "") {
  return `/${lang}${path}`;
}

function SitemapCard({ group, icon: Icon }: { group: SitemapGroup; icon: ElementType }) {
  const linkClass =
    "site-action-link group border-[var(--brand-purple)]/35 bg-[var(--brand-night)]/70 text-[var(--brand-offwhite)] hover:!bg-[var(--brand-cyan)] hover:!text-[var(--brand-night)] hover:shadow-[0_18px_40px_rgba(85,212,242,0.26)]";

  return (
    <SectionCard className="h-full border border-[var(--brand-purple)]/45 bg-[var(--brand-deep)] p-6 text-[var(--brand-offwhite)] shadow-[0_18px_42px_rgba(1,32,80,0.24)] md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/35 bg-[var(--brand-night)] text-[var(--brand-cyan)] shadow-[0_12px_24px_rgba(10,180,255,0.18)]">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-cyan)] opacity-70">
            {group.label}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-[var(--brand-offwhite)]">
            {group.title}
          </h2>
        </div>
      </div>

      <ul className="space-y-3">
        {group.links.map((link) => (
          <li key={link.href || link.title}>
            {link.href ? (
              <Link href={link.href} className={linkClass}>
                <span className="flex items-center justify-between gap-4 text-lg font-black tracking-tight text-inherit">
                  {link.title}
                  <Icons.ArrowRight className="h-4 w-4 shrink-0 text-[var(--brand-cyan)] transition group-hover:translate-x-1 group-hover:text-[var(--brand-night)]" />
                </span>
                <span className="text-sm font-medium leading-relaxed text-inherit opacity-75">
                  {link.description}
                </span>
              </Link>
            ) : (
              <button type="button" onClick={link.onClick} className={`${linkClass} w-full text-left`}>
                <span className="flex items-center justify-between gap-4 text-lg font-black tracking-tight text-inherit">
                  {link.title}
                  <Icons.Mail className="h-4 w-4 shrink-0 text-[var(--brand-cyan)] transition group-hover:translate-x-1 group-hover:text-[var(--brand-night)]" />
                </span>
                <span className="text-sm font-medium leading-relaxed text-inherit opacity-75">
                  {link.description}
                </span>
              </button>
            )}
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
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const groups: SitemapGroup[] = [
    {
      label: content.sections.main,
      title: content.sections.mainTitle,
      links: [
        { title: l.home[0], description: l.home[1], href: makeLink(lang) },
        { title: l.about[0], description: l.about[1], href: makeLink(lang, "/about") },
        { title: l.services[0], description: l.services[1], href: makeLink(lang, "/services") },
      ],
    },
    {
      label: content.sections.resources,
      title: content.sections.resourcesTitle,
      links: [
        { title: l.faq[0], description: l.faq[1], href: makeLink(lang, "/faq") },
        { title: l.quiz[0], description: l.quiz[1], href: quizHref },
        { title: l.newsletter[0], description: l.newsletter[1], onClick: () => setIsNewsletterOpen(true) },
      ],
    },
    {
      label: content.sections.legal,
      title: content.sections.legalTitle,
      links: [
        { title: l.terms[0], description: l.terms[1], href: makeLink(lang, "/terms") },
        { title: l.privacy[0], description: l.privacy[1], href: makeLink(lang, "/privacy") },
        { title: l.trust[0], description: l.trust[1], href: makeLink(lang, "/trust") },
        { title: l.policy[0], description: l.policy[1], href: makeLink(lang, "/generative-ai-policy") },
      ],
    },
  ];

  useEffect(() => {
    setSEOHead({
      title: `${content.label} — Sapiente.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/sitemap`,
      type: "website",
    });
  }, [content, lang]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={content.label}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        compact
      />

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

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
}