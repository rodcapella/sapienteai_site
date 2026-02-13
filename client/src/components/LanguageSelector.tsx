import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-PT', label: 'PT', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-2xl px-3 py-2 rounded-lg transition-all border-2 ${
            language === lang.code
              ? 'border-primary scale-110 shadow-md'
              : 'border-transparent hover:border-primary/30'
          }`}
          title={lang.label}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
