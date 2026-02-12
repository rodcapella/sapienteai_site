import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-PT', label: 'PT', flag: '🇵🇹' },
  { code: 'pt-BR', label: 'BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xl px-2 py-1 rounded transition-all ${
            language === lang.code
              ? 'bg-primary text-white scale-110'
              : 'bg-transparent hover:bg-primary/10'
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
