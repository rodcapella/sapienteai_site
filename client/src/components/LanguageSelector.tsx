import { useLanguage, type Language } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flagUrl: string; countryName: string }[] = [
  { code: 'pt-PT', label: 'PT-PT', flagUrl: '/flags/pt-PT.png', countryName: 'Portugal' },
  { code: 'pt-BR', label: 'PT-BR', flagUrl: '/flags/pt-BR.png', countryName: 'Brasil' },
  { code: 'en', label: 'EN', flagUrl: '/flags/en.png', countryName: 'English' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative w-10 h-10 rounded-lg transition-all border-2 flex items-center justify-center overflow-hidden ${
            language === lang.code
              ? 'border-blue-600 shadow-lg scale-105 ring-2 ring-blue-300'
              : 'border-slate-300 hover:border-blue-400 hover:shadow-md'
          }`}
          title={`Switch to ${lang.countryName} (${lang.label})`}
          aria-label={`Switch to ${lang.countryName} (${lang.label})`}
          aria-pressed={language === lang.code}
          type="button"
        >
          <img
            src={lang.flagUrl}
            alt={`${lang.countryName} flag`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
