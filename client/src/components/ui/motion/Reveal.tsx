import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: Props) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        `
        transition-all duration-700 ease-out
        `,
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}