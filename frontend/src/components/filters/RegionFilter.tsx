'use client';

import { useState, useMemo } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { useAllCountries } from '@/hooks/useCountries';
import { useFilterStore } from '@/stores/useFilterStore';
import styles from './RegionFilter.module.scss';

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const SUBREGIONS: Record<string, string[]> = {
  Africa: [
    'Eastern Africa',
    'Middle Africa',
    'Northern Africa',
    'Southern Africa',
    'Western Africa',
  ],
  Americas: [
    'Caribbean',
    'Central America',
    'South America',
    'Northern America',
  ],
  Asia: [
    'Central Asia',
    'Eastern Asia',
    'South-Eastern Asia',
    'Southern Asia',
    'Western Asia',
  ],
  Europe: [
    'Eastern Europe',
    'Northern Europe',
    'Southern Europe',
    'Western Europe',
  ],
  Oceania: [
    'Australia and New Zealand',
    'Melanesia',
    'Micronesia',
    'Polynesia',
  ],
};

export default function RegionFilter() {
  const { data: countries } = useAllCountries();
  const { regions, subregion, setRegions, setSubregion, hasActiveFilters } =
    useFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [subregionOpen, setSubregionOpen] = useState(false);

  const availableSubregions = useMemo(() => {
    if (regions.length === 0) return [];
    const subs = new Set<string>();
    countries?.forEach(country => {
      if (
        country.region &&
        regions.includes(country.region) &&
        country.subregion
      ) {
        subs.add(country.subregion);
      }
    });
    return Array.from(subs).sort();
  }, [countries, regions]);

  const handleRegionToggle = (region: string) => {
    if (regions.includes(region)) {
      const newRegions = regions.filter(r => r !== region);
      setRegions(newRegions);
      if (newRegions.length === 0) {
        setSubregion(null);
      }
    } else {
      setRegions([...regions, region]);
    }
  };

  const handleAllRegions = () => {
    setRegions([]);
    setSubregion(null);
  };

  const active = hasActiveFilters() || subregion !== null;

  return (
    <div className={styles.filter}>
      <button
        className={`${styles.trigger} ${active ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Filter by region"
      >
        <span className={styles.label}>
          REGIÓN
          {regions.length > 0 && (
            <span className={styles.badge}>{regions.length}</span>
          )}
        </span>
        <FiChevronDown
          className={`${styles.icon} ${isOpen ? styles.open : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={`${styles.allButton} ${regions.length === 0 ? styles.selected : ''}`}
            onClick={handleAllRegions}
          >
            <span className={styles.radio}>
              {regions.length === 0 && <FiCheck />}
            </span>
            Todas las Regiones
          </button>

          <div className={styles.divider} />

          <div className={styles.regions}>
            {REGIONS.map(region => (
              <button
                key={region}
                className={`${styles.regionButton} ${
                  regions.includes(region) ? styles.selected : ''
                }`}
                onClick={() => handleRegionToggle(region)}
              >
                <span className={styles.radio}>
                  {regions.includes(region) && <FiCheck />}
                </span>
                {region}
              </button>
            ))}
          </div>

          {regions.length > 0 && availableSubregions.length > 0 && (
            <>
              <div className={styles.divider} />
              <button
                className={`${styles.subregionButton} ${subregion ? styles.selected : ''}`}
                onClick={() => setSubregionOpen(!subregionOpen)}
              >
                Subregión: {subregion || 'Todas'}
                <FiChevronDown className={subregionOpen ? styles.open : ''} />
              </button>

              {subregionOpen && (
                <div className={styles.subregionList}>
                  <button
                    className={`${styles.subregionItem} ${!subregion ? styles.selected : ''}`}
                    onClick={() => setSubregion(null)}
                  >
                    Todas las subregiones
                  </button>
                  {availableSubregions.map(sub => (
                    <button
                      key={sub}
                      className={`${styles.subregionItem} ${subregion === sub ? styles.selected : ''}`}
                      onClick={() => setSubregion(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
