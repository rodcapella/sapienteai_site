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

    x.set(dx * 0.14);
    y.set(dy * 0.14);

    if (ref.current) {
      ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary:
      "bg-[#00D4FF] text-[#03162A] shadow-[0_0_0_1px_rgba(0,212,255,0.45),0_0_42px_rgba(0,212,255,0.42)] hover:bg-[#22D3EE] hover:shadow-[0_0_0_1px_rgba(0,212,255,0.8),0_0_58px_rgba(0,212,255,0.62)]",
    purple:
      "bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_0_34px_rgba(37,99,235,0.34)] hover:from-[#2563EB] hover:to-[#00D4FF] hover:shadow-[0_0_0_1px_rgba(0,212,255,0.6),0_0_50px_rgba(0,212,255,0.45)]",
    secondary:
      "bg-[#3B82F6] text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)] hover:bg-[#0EA5E9] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_0_42px_rgba(34,211,238,0.4)]",
    outline:
      "bg-transparent border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.36)]",
    black: "bg-black text-white hover:bg-black/90 shadow-2xl",
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-xs",
    md: "px-10 py-5 text-base",
    lg: "px-14 py-7 text-lg",
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
        "neon-shimmer relative overflow-hidden rounded-full font-black uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.05] active:scale-95 group",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(180px circle at var(--x) var(--y), rgba(255,255,255,0.35), transparent 70%)`,
        }}
      />

      <span className="pointer-events-none absolute inset-0 animate-pulse-slow opacity-20 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.6),transparent_55%)]" />

      <span className="relative z-10 flex items-center justify-center gap-3">{children}</span>
    </motion.button>
  );
}
