import { useLanguage, type Language } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-PT', label: 'PT-PT', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'PT-BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-2 rounded-lg transition-all border-2 font-semibold text-base flex items-center justify-center min-w-[44px] ${
            language === lang.code
              ? 'border-primary bg-primary/10 shadow-md'
              : 'border-gray-300 hover:border-primary/50 bg-white hover:bg-gray-50'
          }`}
          title={`Switch to ${lang.label}`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span className="text-xl" role="img" aria-hidden="true">
            {lang.flag}
          </span>
        </button>
      ))}
    </div>
  );
}
