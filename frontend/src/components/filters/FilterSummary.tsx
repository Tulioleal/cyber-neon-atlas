import { useFilterStore } from '@/stores/useFilterStore';
import { FiX } from 'react-icons/fi';
import styles from './FilterSummary.module.scss';

export default function FilterSummary() {
  const { regions, subregion, languages, currencies, resetFilters } = useFilterStore();

  const hasFilters =
    regions.length > 0 || subregion !== null || languages.length > 0 || currencies.length > 0;

  if (!hasFilters) return null;

  return (
    <div className={styles.summary}>
      <div className={styles.activeFilters}>
        {regions.length > 0 && (
          <span className={styles.tag}>
            Regiones: {regions.join(', ')}
          </span>
        )}
        {subregion && (
          <span className={styles.tag}>
            Subregión: {subregion}
          </span>
        )}
        {languages.length > 0 && (
          <span className={styles.tag}>
            {languages.length} idioma{languages.length > 1 ? 's' : ''}
          </span>
        )}
        {currencies.length > 0 && (
          <span className={styles.tag}>
            {currencies.length} moneda{currencies.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <button className={styles.clearButton} onClick={resetFilters} aria-label="Clear all filters">
        <FiX />
        Limpiar filtros
      </button>
    </div>
  );
}