import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "wouter";
import { useMagnetic } from "@/hooks/useMagnetic";

const navLinkVariants = cva(
  `
  relative
  text-sm font-black uppercase tracking-[0.15em]
  transition-all duration-300
  group
  `,
  {
    variants: {
      variant: {
        default: `
          text-[var(--brand-primary)] hover:text-[var(--brand-cyan-bright)]

          after:absolute after:left-0 after:-bottom-2
          after:h-[2px] after:w-full
          after:bg-[var(--brand-gradient-border)]
          after:rounded-full
          after:origin-left after:scale-x-0
          after:transition-transform after:duration-500

          group-hover:after:scale-x-100
        `,

        subtle: `
          text-white/50 hover:text-white/80
        `,

        footer: `
          font-serif text-[12px] font-medium normal-case tracking-normal text-[var(--brand-offwhite)]/80 hover:text-[var(--brand-primary)] hover:drop-shadow-[0_0_10px_rgba(10,180,255,0.75)]
        `,

        mobile: `
          text-[var(--brand-primary)] hover:text-[var(--brand-cyan-bright)] text-2xl font-black
        `
      },

      active: {
        true: `
          text-[var(--brand-deep)] dark:text-[var(--brand-offwhite)]

          after:absolute after:left-0 after:-bottom-2
          after:h-[2px] after:w-full
          after:bg-[var(--brand-gradient-border)]
          after:rounded-full
          after:scale-x-100
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

  const isActive = location === href;

  const magnetic = useMagnetic(16);

  return (
    <Link href={href} onClick={onClick}>
      <span
        ref={magnetic.ref}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        className={cn(
          navLinkVariants({ variant, active: isActive }),
          "inline-block transition-transform duration-300 ease-out",
          className
        )}
      >
        {children}
      </span>
    </Link>
  );
}
