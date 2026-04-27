import { cn } from "@/lib/utils";

type TechBackdropProps = {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
};

const intensityMap = {
  soft: "opacity-70",
  medium: "opacity-90",
  strong: "opacity-100",
};

export function TechBackdrop({ className, intensity = "medium" }: TechBackdropProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensityMap[intensity],
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute -left-28 top-[-18%] h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute -right-24 bottom-[-20%] h-80 w-80 rounded-full bg-accent-purple/25 blur-[140px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.08]" />
    </div>
  );
}

export function TechParticleField({ className }: { className?: string }) {
  const particles = [
    { left: "8%", top: "20%", delay: "0s" },
    { left: "18%", top: "68%", delay: "1.6s" },
    { left: "32%", top: "34%", delay: "2.4s" },
    { left: "50%", top: "16%", delay: "0.7s" },
    { left: "66%", top: "74%", delay: "1.2s" },
    { left: "80%", top: "30%", delay: "2.8s" },
    { left: "90%", top: "60%", delay: "1.9s" },
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_16px_rgba(0,212,255,0.8)] animate-tech-float"
          style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
        />
      ))}
    </div>
  );
}
