import React from 'react';
import ProgressBar from '../ui/ProgressBar';
import styles from './DemographicsCard.module.scss';

interface DemographicsCardProps {
  population: number;
  area?: number;
  languages?: Record<string, string>;
}

export default function DemographicsCard({
  population,
  area,
  languages,
}: DemographicsCardProps) {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCompact = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  };

  const populationDensity = area && population ? Math.round(population / area) : null;

  const languageEntries = languages ? Object.entries(languages).slice(0, 5) : [];
  const totalLanguages = languageEntries.length;
  
  const languagePercentages = languageEntries.map((_, index) => {
    if (totalLanguages === 0) return 0;
    return 100 / totalLanguages;
  });

  return (
    <div className={styles.demographicsCard}>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Population</span>
        <span className={styles.statValue}>{formatNumber(population)}</span>
      </div>

      {populationDensity && (
        <div className={styles.stat}>
          <span className={styles.statLabel}>Density</span>
          <span className={styles.statValue}>{populationDensity} /km²</span>
        </div>
      )}

      <div className={styles.stat}>
        <span className={styles.statLabel}>Area</span>
        <span className={styles.statValue}>
          {area ? `${formatCompact(area)} km²` : 'N/A'}
        </span>
      </div>

      {languageEntries.length > 0 && (
        <div className={styles.languagesSection}>
          <div className={styles.languagesTitle}>Languages</div>
          <div className={styles.languageBar}>
            {languageEntries.map(([name, _], index) => (
              <div key={name} className={styles.languageItem}>
                <span className={styles.languageName}>{name}</span>
                <div className={styles.languageProgress}>
                  <div 
                    className={styles.languageFill} 
                    style={{ width: `${languagePercentages[index]}%` }}
                  />
                </div>
                <span className={styles.languagePercent}>
                  {languagePercentages[index].toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}