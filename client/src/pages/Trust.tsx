import { useTranslation } from "@/hooks/useTranslation";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Trust() {
  const { lang } = useTranslation();
  const content = getContent("trust", lang);

  return <LegalDocumentPage content={content} slug="trust" fallbackDescription={content.subtitle || "Trust"} />;
}
