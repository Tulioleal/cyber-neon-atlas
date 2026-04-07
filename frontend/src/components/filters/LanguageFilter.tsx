'use client';

import { useState, useMemo } from 'react';
import { FiChevronDown, FiX, FiCheck } from 'react-icons/fi';
import { useAllCountries } from '@/hooks/useCountries';
import { useFilterStore } from '@/stores/useFilterStore';
import styles from './LanguageFilter.module.scss';

interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
  count: number;
}

export default function LanguageFilter() {
  const { data: countries } = useAllCountries();
  const { languages, toggleLanguage, hasActiveFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const languageOptions = useMemo(() => {
    if (!countries) return [];

    const languageMap = new Map<string, LanguageOption>();

    countries.forEach(country => {
      if (country.languages) {
        Object.entries(country.languages).forEach(([code, name]) => {
          const existing = languageMap.get(code);
          if (existing) {
            existing.count += 1;
          } else {
            const nativeNames = country.name.nativeName;
            let nativeName: string | undefined;
            if (nativeNames && Object.keys(nativeNames).length > 0) {
              const firstNative = Object.values(nativeNames)[0];
              nativeName = firstNative?.common;
            }
            languageMap.set(code, { code, name, nativeName, count: 1 });
          }
        });
      }
    });

    return Array.from(languageMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [countries]);

  const filteredOptions = useMemo(() => {
    if (!search) return languageOptions;
    const lower = search.toLowerCase();
    return languageOptions.filter(
      opt =>
        opt.name.toLowerCase().includes(lower) ||
        opt.code.toLowerCase().includes(lower)
    );
  }, [languageOptions, search]);

  const handleToggle = (code: string) => {
    toggleLanguage(code);
  };

  const selectedCount = languages.length;
  const active = hasActiveFilters();

  return (
    <div className={styles.filter}>
      <button
        className={`${styles.trigger} ${active ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Filter by language"
      >
        <span className={styles.label}>
          IDIOMA
          {selectedCount > 0 && (
            <span className={styles.badge}>{selectedCount}</span>
          )}
        </span>
        <FiChevronDown
          className={`${styles.icon} ${isOpen ? styles.open : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Buscar idioma..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search languages"
            />
          </div>

          <div className={styles.options}>
            {filteredOptions.map(option => (
              <label
                key={option.code}
                className={`${styles.option} ${
                  languages.includes(option.code) ? styles.selected : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={languages.includes(option.code)}
                  onChange={() => handleToggle(option.code)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}>
                  {languages.includes(option.code) && <FiCheck />}
                </span>
                <span className={styles.optionText}>
                  <span className={styles.optionName}>{option.name}</span>
                  {option.nativeName && (
                    <span className={styles.optionNative}>
                      {option.nativeName}
                    </span>
                  )}
                </span>
                <span className={styles.optionCount}>{option.count}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
