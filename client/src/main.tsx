import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function applyStoredTheme() {
  try {
    const storedTheme = localStorage.getItem("theme");
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
  }
}

applyStoredTheme();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
