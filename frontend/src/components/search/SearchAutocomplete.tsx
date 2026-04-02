'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { Country } from '@/types/country';
import { useCountryStore } from '@/stores/countryStore';

interface SearchAutocompleteProps {
  onSelect?: (country: Country) => void;
}

export default function SearchAutocomplete({ onSelect }: SearchAutocompleteProps) {
  const router = useRouter();
  const { countries } = useCountryStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const filteredCountries = debouncedQuery
    ? countries
        .filter((country) => {
          const searchTerm = debouncedQuery.toLowerCase();
          return (
            country.name.common.toLowerCase().includes(searchTerm) ||
            country.name.official.toLowerCase().includes(searchTerm)
          );
        })
        .slice(0, 8)
    : [];

  const handleSelect = useCallback((country: Country) => {
    setQuery(country.name.common);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onSelect) {
      onSelect(country);
    } else {
      router.push(`/perfil/${country.cca2}`);
    }
  }, [onSelect, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredCountries[selectedIndex]) {
          handleSelect(filteredCountries[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder="Search countries..."
        style={{
          width: '100%',
          background: '#1e2028',
          border: '1px solid #2A2A35',
          color: '#E8E8E8',
          padding: '12px 16px',
          fontSize: '14px',
          fontFamily: 'Fira Code, monospace',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
      
      {isOpen && filteredCountries.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#0d0e13',
            border: '1px solid #00FFD1',
            borderTop: 'none',
            maxHeight: '320px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 0 10px rgba(0, 255, 209, 0.3)',
          }}
        >
          {filteredCountries.map((country, index) => (
            <div
              key={country.cca2}
              onClick={() => handleSelect(country)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                cursor: 'pointer',
                background: index === selectedIndex ? '#1e2028' : 'transparent',
                borderBottom: '1px solid #2A2A35',
                transition: 'background 0.1s ease',
              }}
            >
              <span style={{ fontSize: '20px', marginRight: '12px' }}>
                {country.flags.svg && (
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    style={{ width: '24px', height: 'auto', display: 'block' }}
                  />
                )}
              </span>
              <div>
                <div style={{ color: '#E8E8E8', fontSize: '14px' }}>
                  {country.name.common}
                </div>
                <div style={{ color: '#606060', fontSize: '12px' }}>
                  {country.region}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && filteredCountries.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#0d0e13',
            border: '1px solid #2A2A35',
            borderTop: 'none',
            padding: '16px',
            color: '#606060',
            fontSize: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
            textAlign: 'center',
          }}
        >
          No countries found
        </div>
      )}
    </div>
  );
}
