import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { initializeTrustedTypes } from "./lib/trustedTypes";
import { initializeGoogleConsentMode, restoreStoredGoogleConsent } from "./lib/googleAnalytics";

initializeTrustedTypes();
initializeGoogleConsentMode();
restoreStoredGoogleConsent();

window.addEventListener("vite:preloadError", (event) => {
  const reloadKey = `sapiente:chunk-reload:${window.location.pathname}`;
  const now = Date.now();
  let lastReload = 0;

  try {
    lastReload = Number(window.sessionStorage.getItem(reloadKey) || 0);
  } catch {
    // Browsers with restricted storage can still recover through a single reload.
  }

  if (now - lastReload < 15_000) return;

  event.preventDefault();
  try {
    window.sessionStorage.setItem(reloadKey, String(now));
  } catch {
    // The reload itself does not depend on storage being available.
  }
  window.location.reload();
});

function applyLaunchTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "light");
}

applyLaunchTheme();

createRoot(document.getElementById("root")!).render(
  <App />
);
