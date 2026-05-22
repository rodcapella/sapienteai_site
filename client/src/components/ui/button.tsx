import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-heading font-extrabold uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--brand-cyan)] text-[var(--brand-night)] shadow-[0_10px_40px_rgba(0,255,255,0.25)] hover:scale-[1.04] hover:shadow-[0_20px_60px_rgba(0,255,255,0.4)]",
        secondary:
          "border border-white/10 bg-white/5 text-[var(--brand-offwhite)] hover:border-white/20 hover:bg-white/10",
        ghost:
          "text-[var(--brand-offwhite)]/80 hover:bg-white/5 hover:text-[var(--brand-offwhite)]",
        outline:
          "border border-white/20 text-[var(--brand-offwhite)] hover:border-white/30 hover:bg-white/10",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, children, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <span className="absolute inset-0 opacity-0 transition hover:opacity-100 bg-white/10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
