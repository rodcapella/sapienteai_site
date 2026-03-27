// SectionCard.tsx

import { cn } from "@/lib/utils";

export function SectionCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `
        bg-white/[0.03]
        backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl
        p-6 md:p-8

        transition-all duration-300 ease-out
        hover:scale-[1.015]
        hover:border-cyan-400/30
        hover:shadow-[0_0_60px_rgba(0,255,255,0.08)]
        `,
        className
      )}
      {...props}
    />
  );
}