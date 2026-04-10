'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/stores/useFilterStore';
import { useFilteredCountries } from '@/hooks/useFilteredCountries';
import {
  LanguageFilter,
  CurrencyFilter,
  RegionFilter,
  FilterSummary,
} from '@/components/filters';
import CountryCard from '@/components/country/CountryCard';
import styles from './page.module.scss';
import { AnimatePresence } from 'framer-motion';

function FiltersContent() {
  const searchParams = useSearchParams();
  const {
    regions,
    languages,
    currencies,
    setRegions,
    toggleLanguage,
    toggleCurrency,
  } = useFilterStore();
  const { countries, isLoading, error } = useFilteredCountries();

  return (
    <div className={styles.container}>
      <aside className={styles.filtersPanel}>
        <div className={styles.filterGroup}>
          <h2 className={styles.filterTitle}>Parámetros</h2>
          <RegionFilter />
          <LanguageFilter />
          <CurrencyFilter />
        </div>
        <FilterSummary />
      </aside>

      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <span className={styles.count}>
            {countries.length} países encontrados
          </span>
        </div>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        )}

        {error && (
          <div className={styles.error}>
            Error al cargar países: {error.message}
          </div>
        )}

        {!isLoading && !error && countries.length === 0 && (
          <div className={styles.empty}>
            No se encontraron países con los filtros seleccionados
          </div>
        )}

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {countries.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function FiltersLoading() {
  return (
    <div className={styles.container}>
      <aside className={styles.filtersPanel}>
        <div className={styles.skeletonFilter} />
        <div className={styles.skeletonFilter} />
        <div className={styles.skeletonFilter} />
      </aside>
      <section className={styles.results}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </section>
    </div>
  );
}

export default function FiltersPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>FILTROS</h1>
        <p className={styles.subtitle}>Configura los parámetros de búsqueda</p>
      </header>

      <Suspense fallback={<FiltersLoading />}>
        <FiltersContent />
      </Suspense>
    </main>
  );
}
