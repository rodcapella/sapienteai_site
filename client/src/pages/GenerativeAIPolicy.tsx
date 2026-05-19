import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function GenerativeAIPolicy() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("generativeAIPolicy", lang);

  return <LegalDocumentPage content={content} slug="generative-ai-policy" fallbackDescription={content.subtitle || "Generative AI Policy"} />;
}
