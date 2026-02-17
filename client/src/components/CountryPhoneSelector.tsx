/**
 * Country Phone Selector Component
 * Allows users to select country code with flag
 * Shows only flag + prefix (no country name)
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SORTED_COUNTRY_PHONE_CODES, CountryPhoneCode } from '@/lib/countryPhoneCodes';

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (prefix: string, phone: string) => void;
  disabled?: boolean;
}

export default function CountryPhoneSelector({ value, onChange, disabled = false }: CountryPhoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryPhoneCode>(SORTED_COUNTRY_PHONE_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleCountrySelect = (country: CountryPhoneCode) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    onChange(country.prefix, phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    onChange(selectedCountry.prefix, phone);
  };

  // Filter countries by prefix or flag
  const filteredCountries = searchQuery
    ? SORTED_COUNTRY_PHONE_CODES.filter(country =>
        country.prefix.includes(searchQuery) || country.flag.includes(searchQuery)
      )
    : SORTED_COUNTRY_PHONE_CODES;

  return (
    <div className="flex gap-2">
      {/* Country Selector Dropdown */}
      <div ref={dropdownRef} className="relative w-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors flex items-center justify-between gap-2 disabled:opacity-50"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.prefix}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-foreground z-50 shadow-lg rounded">
            {/* Search Input */}
            <div className="p-2 border-b border-foreground">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar prefixo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            {/* Country List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={`${country.code}-${country.prefix}`}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-4 py-2 text-left hover:bg-primary/10 flex items-center gap-3 transition-colors border-b border-foreground/10 last:border-b-0"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium">{country.prefix}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-sm text-muted-foreground">
                  Nenhum resultado encontrado
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Número de telefone"
        disabled={disabled}
        className="flex-1 px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
      />
    </div>
  );
}
