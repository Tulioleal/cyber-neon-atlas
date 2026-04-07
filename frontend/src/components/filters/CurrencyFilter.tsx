'use client';

import { useState, useMemo } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { useAllCountries } from '@/hooks/useCountries';
import { useFilterStore } from '@/stores/useFilterStore';
import styles from './CurrencyFilter.module.scss';

interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  count: number;
}

export default function CurrencyFilter() {
  const { data: countries } = useAllCountries();
  const { currencies, toggleCurrency, hasActiveFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const currencyOptions = useMemo(() => {
    if (!countries) return [];

    const currencyMap = new Map<string, CurrencyOption>();

    countries.forEach(country => {
      if (country.currencies) {
        Object.entries(country.currencies).forEach(
          ([code, { name, symbol }]) => {
            const existing = currencyMap.get(code);
            if (existing) {
              existing.count += 1;
            } else {
              currencyMap.set(code, { code, name, symbol, count: 1 });
            }
          }
        );
      }
    });

    return Array.from(currencyMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [countries]);

  const filteredOptions = useMemo(() => {
    if (!search) return currencyOptions;
    const lower = search.toLowerCase();
    return currencyOptions.filter(
      opt =>
        opt.name.toLowerCase().includes(lower) ||
        opt.code.toLowerCase().includes(lower) ||
        opt.symbol.toLowerCase().includes(lower)
    );
  }, [currencyOptions, search]);

  const selectedCount = currencies.length;
  const active = hasActiveFilters();

  return (
    <div className={styles.filter}>
      <button
        className={`${styles.trigger} ${active ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Filter by currency"
      >
        <span className={styles.label}>
          MONEDA
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
              placeholder="Buscar moneda..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search currencies"
            />
          </div>

          <div className={styles.options}>
            {filteredOptions.map(option => (
              <label
                key={option.code}
                className={`${styles.option} ${
                  currencies.includes(option.code) ? styles.selected : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={currencies.includes(option.code)}
                  onChange={() => toggleCurrency(option.code)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}>
                  {currencies.includes(option.code) && <FiCheck />}
                </span>
                <span className={styles.symbol}>{option.symbol}</span>
                <span className={styles.optionText}>
                  <span className={styles.optionName}>{option.name}</span>
                  <span className={styles.optionCode}>{option.code}</span>
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
