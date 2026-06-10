import { useEffect } from "react";
import { setSEOHead } from "@/components/SEOHead";

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
}

/**
 * Hook that sets SEO meta tags whenever the provided deps change.
 * Replaces the repeated `useEffect(() => setSEOHead({...}), [lang])` pattern.
 */
export function useSEOHead(config: SEOConfig, deps: React.DependencyList = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setSEOHead(config); }, deps);
}
