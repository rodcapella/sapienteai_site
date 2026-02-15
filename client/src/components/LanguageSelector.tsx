import { useLanguage, type Language } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-PT', label: 'PT-PT', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'PT-BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`p-2 rounded transition-all border-2 font-semibold text-sm flex items-center justify-center ${
            language === lang.code
              ? 'border-primary bg-primary/10 shadow-md'
              : 'border-gray-300 hover:border-primary/50 bg-white'
          }`}
          title={lang.label}
          aria-label={`Switch to ${lang.label}`}
          type="button"
        >
          <span className="text-base leading-none">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
