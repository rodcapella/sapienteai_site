import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link, useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

type Member = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  story?: string;
  stack: string[];
  badges?: string[];
  image: string;
  link: string;
};

type Highlight = {
  value: string;
  title: string;
  text: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current.style.setProperty("--x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={member.link}
      target={member.link === "#" ? undefined : "_blank"}
      rel={member.link === "#" ? undefined : "noopener noreferrer"}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full"
    >
      <span
        className="absolute inset-0 rounded-[1.75rem] opacity-0 transition group-hover:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--x) var(--y), rgba(34,211,238,0.15), transparent 40%)",
        }}
      />

      <div className="relative flex h-full flex-col rounded-[1.75rem] border border-foreground/5 bg-white/85 p-8 text-left backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] md:p-10">
        <div className="mb-8 flex items-start gap-5">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-primary/10 bg-primary/10">
            {member.image ? (
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-[var(--brand-cyan)]/20 text-3xl font-black text-primary">
                {getInitials(member.name)}
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-primary/70">
              {member.role}
            </p>
            <h3 className="mb-3 text-3xl font-black tracking-tight text-foreground">{member.name}</h3>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-foreground/45">
              {member.focus}
            </p>
          </div>
        </div>

        <p className="mb-5 text-lg font-black leading-relaxed tracking-tight text-foreground">{member.bio}</p>

        {member.story && <p className="mb-8 text-base font-medium leading-relaxed text-foreground/55">{member.story}</p>}

        {member.badges && (
          <div className="mb-8 flex flex-wrap gap-2">
            {member.badges.map((badge) => (
              <span key={badge} className="rounded-full bg-foreground/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-foreground/70">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 border-t border-foreground/5 pt-8">
          {member.stack.map((tech) => (
            <span key={tech} className="rounded-full bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary/10">
              {tech}
            </span>
          ))}
        </div>

        {member.link !== "#" && (
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
            Website
            <Icons.ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function Team() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("team", lang);
  const members: Member[] = content.members;

  useEffect(() => {
    setSEOHead({
      title: `${content.hero.title} - SAPIENTE.AI`,
      description: content.hero.subtitle,
      url: `https://sapienteai.com/${lang}/team`,
      type: "website",
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      <div className="page-hero-banner relative flex h-[400px] w-full items-center justify-center overflow-hidden md:h-[600px]">
        <div className="container max-w-5xl px-6 text-center">
          <Reveal>
            <Link href={`/${lang}`} className="mb-8 inline-flex items-center gap-2 font-black uppercase tracking-widest text-[var(--brand-cyan)] transition-opacity hover:opacity-70">
              <Icons.ArrowLeft className="h-4 w-4" />
              {t("nav.home")}
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-10 text-4xl font-black leading-[0.9] tracking-tighter text-[var(--brand-offwhite)] md:text-8xl">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/75 drop-shadow-md md:text-3xl">
              {content.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="bg-ice py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                  {content.intro.eyebrow}
                </p>
                <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-foreground md:text-7xl">
                  {content.intro.title}
                </h2>
                <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">
                  {content.intro.text}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {content.intro.highlights.map((item: Highlight, index: number) => (
                <Reveal key={item.value} delay={index * 100}>
                  <SectionCard className="grid gap-5 border-foreground/5 bg-white/85 p-6 shadow-xl md:grid-cols-[80px_1fr] md:p-8">
                    <div className="text-4xl font-black leading-none tracking-tighter text-primary/35">
                      {item.value}
                    </div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-foreground/60">
                        {item.text}
                      </p>
                    </div>
                  </SectionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-blue-tint py-24 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                {content.presentation.eyebrow}
              </p>
              <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-foreground md:text-7xl">
                {content.presentation.title}
              </h2>
              <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">
                {content.presentation.text}
              </p>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {members.map((member) => (
              <Reveal key={member.name}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-foreground py-24 text-center md:py-36">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--brand-cyan)]">
                SAPIENTE.AI
              </p>
              <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-white md:text-7xl">
                {lang === "en" ? "Strategy, AI, and execution working as one." : "Estratégia, IA e execução a trabalhar como uma só."}
              </h2>
              <Link href={`/${lang}/contact`}>
                <PremiumButton variant="secondary">
                  {lang === "en" ? "Talk to the team" : "Falar com a equipa"}
                </PremiumButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
