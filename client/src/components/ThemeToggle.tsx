import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn(
        "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl",
        "border border-[var(--tech-border)] bg-[var(--glass-bg)] text-foreground/80",
        "backdrop-blur-xl transition-all duration-500",
        "hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground hover:shadow-[var(--shadow-neon-blue)]",
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.3),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
        )}
      />

      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-75 opacity-0",
        )}
      />
    </button>
  );
}
