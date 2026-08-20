const ALLOWED_SCRIPT_ORIGINS = new Set([
  window.location.origin,
  "https://challenges.cloudflare.com",
  "https://www.googletagmanager.com",
]);

function validateScriptUrl(value: string): string {
  const url = new URL(value, window.location.origin);

  if (!ALLOWED_SCRIPT_ORIGINS.has(url.origin)) {
    throw new TypeError(`Blocked script URL origin: ${url.origin}`);
  }

  return url.href;
}

function validateStructuredDataScript(value: string): string {
  const data = JSON.parse(value) as { "@context"?: unknown };

  if (!data || typeof data !== "object" || data["@context"] !== "https://schema.org") {
    throw new TypeError("Blocked non-JSON-LD script content.");
  }

  return value;
}

export function initializeTrustedTypes(): void {
  if (!window.trustedTypes || window.sapienteTrustedTypesPolicy) return;

  window.sapienteTrustedTypesPolicy = window.trustedTypes.createPolicy("default", {
    createScript: validateStructuredDataScript,
    createScriptURL: validateScriptUrl,
  });
}

declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (
        name: string,
        rules: {
          createScript?: (value: string) => string;
          createScriptURL?: (value: string) => string;
        },
      ) => {
        createScript: (value: string) => unknown;
        createScriptURL: (value: string) => unknown;
      };
    };
    sapienteTrustedTypesPolicy?: {
      createScript: (value: string) => unknown;
      createScriptURL: (value: string) => unknown;
    };
  }
}
