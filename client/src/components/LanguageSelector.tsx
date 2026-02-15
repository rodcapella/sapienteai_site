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
          className={`p-2 rounded-lg transition-all border-2 font-semibold text-2xl flex items-center justify-center ${
            language === lang.code
              ? 'border-cyan-300 bg-cyan-300/10 shadow-md'
              : 'border-white/30 hover:border-white/60 hover:bg-white/10'
          }`}
          title={`Switch to ${lang.label}`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span role="img" aria-hidden="true">
            {lang.flag}
          </span>
        </button>
      ))}
    </div>
  );
}
