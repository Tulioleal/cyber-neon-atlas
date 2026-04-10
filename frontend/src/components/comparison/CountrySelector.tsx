'use client';

import { useState, useRef, useEffect } from 'react';
import { Country } from '@/types/country';
import { CountrySearchItem } from '@/services/api';
import styles from './CountrySelector.module.scss';
import { FiX, FiSearch } from "react-icons/fi"
import { colors } from '@/utils/colors';

interface CountrySelectorProps {
  selectedCountry: Country | null;
  onSelect: (cca3: string) => void;
  searchList: CountrySearchItem[];
  label: string;
  color: 'primary' | 'secondary';
}

export default function CountrySelector({
  selectedCountry,
  onSelect,
  searchList,
  label,
  color,
}: CountrySelectorProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = searchList
    .filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: CountrySearchItem) => {
    onSelect(country.cca3);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect('');
    setQuery('');
  };

  return (
    <div className={styles.selector} ref={wrapperRef}>
      <label className={`${styles.label} ${styles[color]}`}>{label}</label>
      <div className={`${styles.inputWrapper} ${styles[color]}`}>
        {selectedCountry ? (
          <div className={styles.selected}>
            {/* <Image src={selectedCountry.flags.svg} alt="" className={styles.flag} /> */}
            <span className={styles.name}>{selectedCountry.name.common}</span>
            <button onClick={handleClear} className={`${styles.clear} ${styles[color]}`}>
              <FiX />
            </button>
          </div>
        ) : (
          <>
            <span className={`${styles.searchIcon} ${styles[color]}`} >
              <FiSearch />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="SEARCH COUNTRY..."
              className={`${styles.input} ${styles[color]}`}
            />
          </>
        )}
      </div>
      {isOpen && !selectedCountry && query.length > 0 && (
        <div className={`${styles.dropdown} ${styles[color]}`}>
          {filtered.length === 0 ? (
            <div className={styles.noResult}>NO DATA FOUND</div>
          ) : (
            filtered.map(country => (
              <button
                key={country.cca3}
                onClick={() => handleSelect(country)}
                className={styles.option}
              >
                {/* <Image src={country.flags.svg} alt="" className={styles.flag} /> */}
                <span>{country.name.common}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
