import { useLanguage, type Language } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-PT', label: 'PT-PT', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'PT-BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-10 h-10 rounded-md transition-all border-2 flex items-center justify-center text-xl leading-none ${
            language === lang.code
              ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/50'
              : 'border-white/40 hover:border-white/70 hover:bg-white/15'
          }`}
          title={`Switch to ${lang.label}`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span className="inline-block">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
