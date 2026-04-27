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
          text-foreground/70 hover:text-foreground

          after:absolute after:left-0 after:-bottom-2
          after:h-[2px] after:w-full
          after:bg-primary
          after:rounded-full
          after:origin-left after:scale-x-0
          after:transition-transform after:duration-500

          group-hover:after:scale-x-100
        `,

        subtle: `
          text-white/50 hover:text-white/80
        `,

        footer: `
          text-[#93C5FD]/80 hover:text-[#22D3EE] text-base font-medium normal-case tracking-normal hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.75)]
        `,

        mobile: `
          text-white/60 hover:text-white text-2xl font-black
        `
      },

      active: {
        true: `
          text-foreground

          after:absolute after:left-0 after:-bottom-2
          after:h-[2px] after:w-full
          after:bg-primary
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
