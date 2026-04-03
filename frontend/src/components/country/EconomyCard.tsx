import React from 'react';
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import StatCard from '../ui/StatCard';
import styles from './EconomyCard.module.scss';

interface EconomyCardProps {
  population: number;
  area?: number;
  gini?: Record<string, number>;
  currencies?: Record<string, { name: string; symbol: string }>;
}

export default function EconomyCard({
  population,
  area,
  gini,
  currencies,
}: EconomyCardProps) {
  const formatCompact = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const areaInSqMi = area ? Math.round(area * 0.386102) : null;
  const gdpEstimate = population * 15000;
  
  const giniValue = gini ? Object.values(gini)[0] : null;
  const currencyInfo = currencies ? Object.values(currencies)[0] : null;

  return (
    <div className={styles.economyCard}>
      <StatCard
        label="Population"
        value={population}
        format="compact"
      />
      
      <div className={styles.stat}>
        <span className={styles.statLabel}>Area</span>
        <span className={styles.statValue}>
          {area ? `${formatCompact(area * 1000000)} km²` : 'N/A'}
          {areaInSqMi && <span className={styles.trend}>({formatCompact(areaInSqMi)} mi²)</span>}
        </span>
      </div>

      {giniValue && (
        <div className={styles.stat}>
          <span className={styles.statLabel}>GINI Index</span>
          <span className={styles.statValue}>
            {giniValue.toFixed(1)}%
          </span>
        </div>
      )}

      {currencyInfo && (
        <div className={styles.stat}>
          <span className={styles.statLabel}>Currency</span>
          <span className={styles.statValue}>
            {currencyInfo.name} ({currencyInfo.symbol})
          </span>
        </div>
      )}

      <div className={styles.gdpEstimate}>
        <div className={styles.gdpLabel}>ESTIMATED GDP</div>
        <div className={styles.gdpValue}>
          ${formatCompact(gdpEstimate)}
        </div>
      </div>
    </div>
  );
}