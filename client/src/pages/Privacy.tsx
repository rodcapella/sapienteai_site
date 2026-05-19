import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Privacy() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("privacy", lang);

  return <LegalDocumentPage content={content} slug="privacy" fallbackDescription={lang === "en" ? "Privacy Policy" : "Política de Privacidade"} />;
}
