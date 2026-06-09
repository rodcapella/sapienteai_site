import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "wouter";
import { useMagnetic } from "@/hooks/useMagnetic";

const navLinkVariants = cva(
  `
  relative inline-flex items-center justify-center rounded-full border
  text-sm font-black uppercase tracking-[0.15em]
  transition-all duration-300
  group
  `,
  {
    variants: {
      variant: {
        default: `
          border-[var(--brand-primary)]/28 px-3.5 py-2
          text-[var(--brand-night)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)]
          dark:border-[var(--brand-primary)]/38 dark:text-[var(--brand-primary)] dark:hover:border-[var(--brand-cyan)] dark:hover:bg-[var(--brand-primary)]/12 dark:hover:text-[var(--brand-offwhite)]
        `,

        subtle: `
          border-transparent text-white/50 hover:text-white/80
        `,

        footer: `
          border-transparent font-serif text-[12px] font-medium normal-case tracking-normal text-[var(--brand-offwhite)]/80 hover:text-[var(--brand-primary)] hover:drop-shadow-[0_0_10px_rgba(10,180,255,0.75)]
        `,

        mobile: `
          border-[var(--brand-primary)]/30 px-4 py-3 text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-night)] text-base font-black
        `
      },

      active: {
        true: `
          border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-[0_10px_26px_rgba(10,132,255,0.22)]
          dark:border-[var(--brand-cyan)] dark:bg-[var(--brand-primary)] dark:text-white
        `
      }
    },

    defaultVariants: {
      variant: "default"
    }
  }
);

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "footer" | "mobile";
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  variant,
  onClick
}: Props) {
  const [location] = useLocation();

  const isLocalizedRoot = /^\/[a-z]{2}$/.test(href);
  const isActive = isLocalizedRoot ? location === href : location === href || location.startsWith(`${href}/`);

  const magnetic = useMagnetic(16);

  return (
    <Link href={href} onClick={onClick}>
      <span
        ref={magnetic.ref}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        className={cn(
          navLinkVariants({ variant, active: isActive }),
          "transition-transform duration-300 ease-out",
          className
        )}
      >
        {children}
      </span>
    </Link>
  );
}
