import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const navLinkVariants = cva(
  `
  relative
  text-sm font-medium
  transition-all duration-300
  `,
  {
    variants: {
      variant: {
        default: `
          text-white/70 hover:text-white

          after:absolute after:left-0 after:-bottom-1
          after:h-[1px] after:w-full
          after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500
          after:origin-left after:scale-x-0
          after:transition-transform after:duration-300

          hover:after:scale-x-100
        `,

        subtle: `
          text-white/50 hover:text-white/80
        `,

        footer: `
          text-white/40 hover:text-white/70 text-sm
        `,

        mobile: `
          text-white/80 hover:text-white text-base
        `
      },

      active: {
        true: `
          text-white

          after:absolute after:left-0 after:-bottom-1
          after:h-[1px] after:w-full
          after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500
        `
      }
    },

    defaultVariants: {
      variant: "default"
    }
  }
);

type Props = React.ComponentProps<"a"> &
  VariantProps<typeof navLinkVariants> & {
    isActive?: boolean;
  };

export function NavLink({
  className,
  variant,
  isActive,
  ...props
}: Props) {
  return (
    <a
      className={cn(
        navLinkVariants({ variant, active: isActive }),
        className
      )}
      {...props}
    />
  );
}