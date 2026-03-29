import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      relative w-10 h-10
      flex items-center justify-center
      rounded-lg
      border border-gray-200
      bg-white
      hover:bg-gray-100
      transition-all
      dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800
      "
    >
      <Sun
        className={`h-4 w-4 transition-all ${
          theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 absolute"
        }`}
      />

      <Moon
        className={`h-4 w-4 transition-all ${
          theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90 absolute"
        }`}
      />
    </button>
  );
}