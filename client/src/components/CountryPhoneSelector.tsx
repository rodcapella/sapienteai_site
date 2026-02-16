/**
 * Country Phone Selector Component
 * Allows users to select country code with flag
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

const countries: Country[] = [
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', prefix: '+351' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', prefix: '+55' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', prefix: '+1' },
  { code: 'ES', name: 'Espanha', flag: '🇪🇸', prefix: '+34' },
  { code: 'FR', name: 'França', flag: '🇫🇷', prefix: '+33' },
  { code: 'DE', name: 'Alemanha', flag: '🇩🇪', prefix: '+49' },
  { code: 'IT', name: 'Itália', flag: '🇮🇹', prefix: '+39' },
  { code: 'UK', name: 'Reino Unido', flag: '🇬🇧', prefix: '+44' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦', prefix: '+1' },
  { code: 'AU', name: 'Austrália', flag: '🇦🇺', prefix: '+61' },
];

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (prefix: string, phone: string) => void;
  disabled?: boolean;
}

export default function CountryPhoneSelector({ value, onChange, disabled = false }: CountryPhoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onChange(country.prefix, phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    onChange(selectedCountry.prefix, phone);
  };

  return (
    <div className="flex gap-2">
      {/* Country Selector Dropdown */}
      <div ref={dropdownRef} className="relative w-32">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors flex items-center justify-between gap-2 disabled:opacity-50"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm">{selectedCountry.prefix}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-foreground max-h-64 overflow-y-auto z-50 shadow-lg">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="w-full px-4 py-2 text-left hover:bg-primary/10 flex items-center gap-3 text-sm transition-colors"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-muted-foreground">{country.prefix}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="XXX XXX XXX"
        disabled={disabled}
        className="flex-1 px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
      />
    </div>
  );
}
