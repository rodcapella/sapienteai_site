import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Link, useLocation } from "wouter";
import { useMagnetic } from "@/hooks/useMagnetic";

const navLinkVariants = cva(
  `
  relative
  text-sm font-medium
  transition-all duration-300
  group
  `,
  {
    variants: {
      variant: {
        default: `
          text-gray-600 hover:text-gray-900

          after:absolute after:left-0 after:-bottom-1
          after:h-[2px] after:w-full
          after:bg-primary
          after:rounded-full
          after:origin-left after:scale-x-0
          after:transition-transform after:duration-300

          group-hover:after:scale-x-100
        `,

        subtle: `
          text-gray-500 hover:text-gray-800
        `,

        footer: `
          text-gray-400 hover:text-gray-600 text-sm
        `,

        mobile: `
          text-gray-700 hover:text-gray-900 text-base
        `
      },

      active: {
        true: `
          text-gray-900

          after:absolute after:left-0 after:-bottom-1
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