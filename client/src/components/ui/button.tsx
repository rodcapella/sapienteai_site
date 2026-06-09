import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-[var(--font-body)] text-[12px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--brand-primary)] text-white shadow-[0_10px_40px_color-mix(in_srgb,var(--brand-cyan-mid) 25%,transparent)] hover:scale-[1.04] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_20px_60px_color-mix(in_srgb,var(--brand-cyan-mid) 40%,transparent)]",
        secondary:
          "border border-white/10 bg-white/5 text-[var(--brand-offwhite)] hover:border-white/20 hover:bg-white/10",
        ghost:
          "text-[var(--brand-offwhite)]/80 hover:bg-white/5 hover:text-[var(--brand-offwhite)]",
        outline:
          "border border-white/20 text-[var(--brand-offwhite)] hover:border-white/30 hover:bg-white/10",
      },
      size: {
        sm: "px-4 py-2 text-[12px]",
        md: "px-6 py-3 text-[12px]",
        lg: "px-8 py-3 text-[12px]",
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
