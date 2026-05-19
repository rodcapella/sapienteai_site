import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Terms() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("terms", lang);

  return <LegalDocumentPage content={content} slug="terms" fallbackDescription={lang === "en" ? "Terms of Service" : "Termos de Serviço"} />;
}
