import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { initializeTrustedTypes } from "./lib/trustedTypes";
import { initializeGoogleConsentMode, restoreStoredGoogleConsent } from "./lib/googleAnalytics";

initializeTrustedTypes();
initializeGoogleConsentMode();
restoreStoredGoogleConsent();

function applyLaunchTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "light");
}

applyLaunchTheme();

createRoot(document.getElementById("root")!).render(
  <App />
);
