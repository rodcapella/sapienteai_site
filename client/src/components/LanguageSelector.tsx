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
          className={`w-10 h-10 rounded-md transition-all border-2 flex items-center justify-center text-lg leading-none ${
            language === lang.code
              ? 'border-cyan-500 bg-cyan-50 shadow-md shadow-cyan-300/50'
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'
          }`}
          title={`Switch to ${lang.label}`}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <span className="inline-block text-base">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
