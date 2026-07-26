const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
export const TURNSTILE_LOAD_RETRIES = 2;
export const TURNSTILE_RETRY_DELAY_MS = 900;
const TURNSTILE_SCRIPT_TIMEOUT_MS = 5000;

export function waitForTurnstileRetry(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.failed === "true" || existingScript.dataset.loaded === "true") {
        existingScript.remove();
      } else {
        const timeoutId = window.setTimeout(
          () => reject(new Error("turnstile_script_timeout")),
          TURNSTILE_SCRIPT_TIMEOUT_MS,
        );

        existingScript.addEventListener("load", () => {
          window.clearTimeout(timeoutId);
          resolve();
        }, { once: true });
        existingScript.addEventListener("error", () => {
          window.clearTimeout(timeoutId);
          existingScript.dataset.failed = "true";
          reject(new Error("turnstile_script_failed"));
        }, { once: true });
        return;
      }
    }

    const script = document.createElement("script");
    const timeoutId = window.setTimeout(() => {
      script.dataset.failed = "true";
      script.remove();
      reject(new Error("turnstile_script_timeout"));
    }, TURNSTILE_SCRIPT_TIMEOUT_MS);

    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.clearTimeout(timeoutId);
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timeoutId);
      script.dataset.failed = "true";
      script.remove();
      reject(new Error("turnstile_script_failed"));
    };

    document.head.appendChild(script);
  });
}

export function preloadTurnstile(): void {
  loadTurnstileScript().catch(() => {
    // The widget will retry and show feedback if the user opens the form.
  });
}
