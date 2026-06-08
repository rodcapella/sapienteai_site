import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const THEME_STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextType | null>(null);

function resolveInitialTheme(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  const setTheme = () => {
    setThemeState("light");
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");

    try {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    } catch {
      // localStorage may be unavailable (private mode / policies)
    }
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    setThemeState("light");
    setIsTransitioning(false);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isTransitioning,
    }),
    [theme, isTransitioning],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
