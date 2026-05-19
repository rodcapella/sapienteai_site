import { useLocation } from "wouter";

import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function RGPD() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("RGPD", lang);

  return <LegalDocumentPage content={content} slug="rgpd" fallbackDescription={content.subtitle || "RGPD"} />;
}
