import { useTranslation } from "@/hooks/useTranslation";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Privacy() {
  const { lang } = useTranslation();
  const content = getContent("privacy", lang);

  return <LegalDocumentPage content={content} slug="privacy" fallbackDescription={lang === "en" ? "Privacy Policy" : "Política de Privacidade"} />;
}
