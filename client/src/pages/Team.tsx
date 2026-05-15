import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link, useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

type Member = {
  name: string;
  role: string;
  bio: string;
  story?: string;
  stack: string[];
  badges?: string[];
  image: string;
  link: string;
};

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
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full md:w-[420px]"
    >
      <span
        className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--x) var(--y), rgba(34,211,238,0.15), transparent 40%)",
        }}
      />

      <div className="relative rounded-2xl border border-foreground/5 bg-white/80 p-10 text-center backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
        <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/10">
          <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
        </div>

        <h3 className="mb-2 text-2xl font-black tracking-tight text-foreground">{member.name}</h3>
        <p className="mb-6 text-lg font-black uppercase tracking-widest text-primary">{member.role}</p>
        <p className="mb-4 font-medium leading-relaxed text-foreground/60">{member.bio}</p>

        {member.story && <p className="mb-6 text-sm leading-relaxed text-foreground/50">{member.story}</p>}

        {member.badges && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {member.badges.map((badge) => (
              <span key={badge} className="rounded-full bg-foreground/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-foreground/70">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {member.stack.map((tech) => (
            <span key={tech} className="rounded-full bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary/10">
              {tech}
            </span>
          ))}
        </div>
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

      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-center gap-10 md:flex-row">
            {members.map((member) => (
              <Reveal key={member.name}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
