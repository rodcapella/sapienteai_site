import { useTranslation } from "@/hooks/useTranslation";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function GenerativeAIPolicy() {
  const { lang } = useTranslation();
  const content = getContent("generativeAIPolicy", lang);

  return <LegalDocumentPage content={content} slug="generative-ai-policy" fallbackDescription={content.subtitle || "Generative AI Policy"} />;
}
