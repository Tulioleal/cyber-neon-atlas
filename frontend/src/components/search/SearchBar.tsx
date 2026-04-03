'use client';

import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCountries } from '@/services/api';
import { useSearchStore } from '@/stores/useSearchStore';
import styles from './SearchBar.module.scss';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface SearchBarProps {
  onCountrySelect?: (countryCode: string) => void;
}

export default function SearchBar({ onCountrySelect }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const debouncedValue = useDebounce(inputValue, 300);
  const { results, setResults, clearSearch } = useSearchStore();

  const { data: countries } = useQuery({
    queryKey: ['countries', 'all'],
    queryFn: fetchAllCountries,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (debouncedValue.length >= 2 && countries) {
      const filtered = countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(debouncedValue.toLowerCase())
        )
        .slice(0, 8);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedValue, countries, setResults]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && results[highlightedIndex]) {
            handleSelect(results[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, results, highlightedIndex]
  );

  const handleSelect = (country: (typeof results)[0]) => {
    setInputValue(country.name.common);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onCountrySelect?.(country.cca3);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchInput}>
        <span className={styles.prefix}>&gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="BUSCAR_PAIS..."
          className={styles.input}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((country, index) => (
            <button
              key={country.cca3}
              className={`${styles.resultItem} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
              onClick={() => handleSelect(country)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <span className={styles.flag}>
                {country.flags?.svg ? (
                  <img src={country.flags.svg} alt={country.name.common} />
                ) : (
                  '🏳️'
                )}
              </span>
              <span className={styles.name}>
                {highlightMatch(country.name.common, debouncedValue)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}