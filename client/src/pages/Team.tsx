import { Icons } from "@/lib/icons";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/content";

const team = [
  {
    name: "Rodrigo Póvoa",
    role: "Founder & Tech Lead",
    bio: "Building intelligent systems focused on clarity, speed, and decision-making.",
    stack: ["AI", "Automation", "Data Analytics Engineer", "Product Strategy"],
    image: "/media/photos/tati.jpg",
    link: "https://www.rpovoadata.tech",
  },
  {
    name: "Tatiane Gomes",
    role: "Marketing",
    bio: "Turning complex ideas into scalable and efficient systems.",
    stack: ["Marketing", "SEO", "GEO", "AEO", "AI"],
    image: "/media/photos/member.jpg",
    link: "#",
  },
];

type Member = typeof team[number];

// TOOLTIP
function getTechDescription(tech: string) {
  const map: Record<string, string> = {
    AI: "Artificial Intelligence systems",
    Automation: "Process automation & workflows",
    "Product Strategy": "Product vision & execution",
    React: "Frontend framework",
    Node: "Backend runtime",
    "AI Systems": "Machine learning & decision engines",
  };

  return map[tech] || tech;
}

// CARD
function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
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
      {/* 🌌 GLOW */}
      <span
        className="
          absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition
        "
        style={{
          background: `
            radial-gradient(
              300px circle at var(--x) var(--y),
              rgba(34,211,238,0.15),
              transparent 40%
            )
          `
        }}
      />

      {/* CARD */}
      <div className="
        relative bg-white dark:bg-card
        border border-gray-200 dark:border-white/10
        rounded-2xl p-8 text-center
        transition-all duration-300
        group-hover:-translate-y-2
        group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      ">

        {/* IMAGE */}
        <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden">
          <img src={member.image} alt={member.name} />
        </div>

        <h3 className="text-xl font-semibold mb-1">
          {member.name}
        </h3>

        <p className="text-sm text-primary mb-4">
          {member.role}
        </p>

        <p className="text-sm text-muted-foreground mb-6">
          {member.bio}
        </p>

        {/* STACK */}
        <div className="flex flex-wrap justify-center gap-2">
          {member.stack.map((tech, idx) => (
            <span
              key={idx}
              className="
                text-xs px-3 py-1 rounded-full
                bg-gray-100 dark:bg-white/5
                text-gray-600 dark:text-white/70
                hover:bg-cyan-400/10
                transition
              "
            >
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
  const lang = location.split("/")[1] || "pt";

  const content = getContent("team", lang);

  useEffect(() => {
    setSEOHead({
      title: content.title,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/team`,
      type: "website"
    });
  }, [lang, content]);

  return (
    <div className="space-y-20">

      {/* HERO */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-white">
            {content.title}
          </h1>

          <p className="text-lg text-white/60">
            {content.subtitle}
          </p>

        </div>
      </Section>

      {/* TEAM */}
      <Section>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </Section>

    </div>
  );
}