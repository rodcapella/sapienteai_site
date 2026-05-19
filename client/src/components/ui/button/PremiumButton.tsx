import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "purple" | "secondary" | "outline" | "black";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

export function PremiumButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  type = "button",
}: PremiumButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.1);
    y.set(dy * 0.1);

    ref.current?.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const standardBlue =
    "bg-[var(--brand-primary)] text-white shadow-[0_12px_30px_rgba(10,138,255,0.35)] hover:bg-[var(--brand-purple)] hover:text-white hover:shadow-[0_0_0_1px_rgba(123,129,255,0.55),0_0_44px_rgba(123,129,255,0.42)]";

  const variantClasses = {
    primary: standardBlue,
    secondary: standardBlue,
    purple: standardBlue,
    outline:
      "border-2 border-[var(--brand-primary)] bg-transparent text-[var(--brand-primary)] shadow-[0_10px_26px_rgba(10,138,255,0.18)] hover:border-[var(--brand-purple)] hover:bg-[var(--brand-purple)] hover:text-white hover:shadow-[0_0_0_1px_rgba(123,129,255,0.55),0_0_44px_rgba(123,129,255,0.42)]",
    black:
      "bg-[var(--brand-primary)] text-white shadow-[0_12px_30px_rgba(10,138,255,0.35)] hover:bg-[var(--brand-purple)] hover:text-white hover:shadow-[0_0_0_1px_rgba(123,129,255,0.55),0_0_44px_rgba(123,129,255,0.42)]",
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-11 py-5 text-base",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn(
        "neon-shimmer group relative overflow-hidden rounded-full border border-[rgba(255,255,255,0.12)] font-heading font-extrabold uppercase tracking-[0.18em] transition-all duration-500 hover:scale-[1.04] active:scale-95",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(180px circle at var(--x) var(--y), rgba(255,255,255,0.32), transparent 70%)",
        }}
      />

      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.42),transparent_55%)] opacity-18" />

      <span className="relative z-10 flex items-center justify-center gap-3 text-white">{children}</span>
    </motion.button>
  );
}
