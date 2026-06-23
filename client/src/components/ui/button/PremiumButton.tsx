import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "black";
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

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current?.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const vividBlue =
    "bg-[var(--brand-primary)] text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-cyan-mid) 28%,transparent)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid) 28%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid) 24%,transparent)]";

  const variantClasses = {
    primary: vividBlue,
    secondary:
      "bg-white/10 text-[var(--brand-primary)] border border-[var(--brand-primary)] backdrop-blur-md hover:bg-[var(--brand-primary)] hover:text-white",
    outline:
      "border-2 border-[var(--brand-primary)] bg-[var(--brand-offwhite)]/[0.2] text-[var(--brand-primary)] shadow-[0_10px_26px_color-mix(in_srgb,var(--brand-cyan-mid) 12%,transparent)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid) 18%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid) 18%,transparent)] dark:border-[var(--brand-primary)] dark:text-[var(--brand-primary)] dark:hover:bg-[var(--brand-primary)] dark:hover:text-white",
    black:
      "bg-[var(--brand-primary)] text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-cyan-mid) 28%,transparent)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid) 20%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid) 22%,transparent)]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-[10px] sm:px-6 sm:py-3 sm:text-[12px]",
    md: "px-5 py-2.5 text-[10px] sm:px-8 sm:py-4 sm:text-[12px]",
    lg: "px-6 py-3 text-[10px] sm:px-11 sm:py-5 sm:text-[12px]",
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
        "neon-shimmer group relative overflow-hidden rounded-full border border-[white]/[0.12] font-[var(--font-body)] font-extrabold uppercase tracking-[0.18em] transition-all duration-500 hover:scale-[1.03] active:scale-95",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(180px circle at var(--x) var(--y), color-mix(in srgb,white 18%,transparent), transparent 70%)",
        }}
      />

      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in srgb,white 18%,transparent),transparent_55%)] opacity-18" />

      <span className="relative z-10 flex items-center justify-center gap-1.5 text-[10px] text-inherit sm:gap-3 sm:text-[12px]">{children}</span>
    </motion.button>
  );
}
