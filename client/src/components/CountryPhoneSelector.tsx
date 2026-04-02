import { useState } from 'react';
import { COUNTRY_PHONE_CODES } from '@/lib/countryPhoneCodes';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface CountryPhoneSelectorProps {
  value: string;
  onChange: (prefix: string, phone: string) => void;
  disabled?: boolean;
}

export default function CountryPhoneSelector({ value, onChange, disabled }: CountryPhoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState('+351');

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="flex items-center gap-2 px-3 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
          >
            <span className="text-lg">
              {COUNTRY_PHONE_CODES.find(c => c.prefix === selectedPrefix)?.flag || '🏳️'}
            </span>
            <span className="font-medium">{selectedPrefix}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Procurar país..." />
            <CommandList>
              <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
              <CommandGroup>
                {COUNTRY_PHONE_CODES.map((country) => (
                  <CommandItem
                    key={`${country.code}-${country.prefix}`}
                    value={`${country.code} ${country.prefix}`}
                    onSelect={() => {
                      setSelectedPrefix(country.prefix);
                      onChange(country.prefix, value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPrefix === country.prefix ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2">{country.flag}</span>
                    <span className="flex-1">{country.code}</span>
                    <span className="text-gray-400">{country.prefix}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(selectedPrefix, e.target.value)}
        placeholder="912 345 678"
        disabled={disabled}
        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
      />
    </div>
  );
}
