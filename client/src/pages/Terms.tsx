import { useTranslation } from "@/hooks/useTranslation";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { getContent } from "@/lib/content";

export default function Terms() {
  const { lang } = useTranslation();
  const content = getContent("terms", lang);

  return <LegalDocumentPage content={content} slug="terms" fallbackDescription={lang === "en" ? "Terms of Service" : "Termos de Serviço"} />;
}
