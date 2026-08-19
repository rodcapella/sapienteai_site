import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { initializeTrustedTypes } from "./lib/trustedTypes";

initializeTrustedTypes();

function applyLaunchTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "light");
}

applyLaunchTheme();

createRoot(document.getElementById("root")!).render(
  <App />
);
