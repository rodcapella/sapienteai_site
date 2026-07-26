const ALLOWED_SCRIPT_ORIGINS = new Set([
  window.location.origin,
  "https://challenges.cloudflare.com",
]);

function validateScriptUrl(value: string): string {
  const url = new URL(value, window.location.origin);

  if (!ALLOWED_SCRIPT_ORIGINS.has(url.origin)) {
    throw new TypeError(`Blocked script URL origin: ${url.origin}`);
  }

  return url.href;
}

export function initializeTrustedTypes(): void {
  if (!window.trustedTypes || window.sapienteTrustedTypesPolicy) return;

  window.sapienteTrustedTypesPolicy = window.trustedTypes.createPolicy("default", {
    createScriptURL: validateScriptUrl,
  });
}

declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (
        name: string,
        rules: {
          createScriptURL?: (value: string) => string;
        },
      ) => {
        createScriptURL: (value: string) => unknown;
      };
    };
    sapienteTrustedTypesPolicy?: {
      createScriptURL: (value: string) => unknown;
    };
  }
}
