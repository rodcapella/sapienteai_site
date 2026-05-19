import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Trust() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("trust", lang);

  return <LegalDocumentPage content={content} slug="trust" fallbackDescription={content.subtitle || "Trust"} />;
}
