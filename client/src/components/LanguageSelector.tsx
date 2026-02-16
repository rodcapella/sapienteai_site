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
          className={`relative w-10 h-10 rounded-md transition-all border-2 flex items-center justify-center text-xl ${
            language === lang.code
              ? 'border-cyan-500 bg-cyan-50 shadow-md'
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'
          }`}
          title={`Switch to ${lang.label}`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span className="inline-block leading-none">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
