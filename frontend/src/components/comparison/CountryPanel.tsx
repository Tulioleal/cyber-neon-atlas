'use client';

import Image from 'next/image';
import { Country } from '@/types/country';
import styles from './CountryPanel.module.scss';

interface CountryPanelProps {
  country: Country | null;
  variant: 'primary' | 'secondary';
  idSuffix?: string;
}

export default function CountryPanel({
  country,
  variant,
  idSuffix = 'PENDING',
}: CountryPanelProps) {
  const isPrimary = variant === 'primary';
  const borderColor = isPrimary
    ? 'rgba(0, 255, 209, 0.3)'
    : 'rgba(47, 248, 1, 0.3)';
  const valueClass = isPrimary ? styles.statValue : styles.statValueSecondary;

  if (!country) {
    return (
      <div
        className={styles.countryPanel}
        style={{
          borderColor,
          textAlign: isPrimary ? 'left' : 'right',
        }}
      >
        <div className={styles.countryId}>ID: ---_{idSuffix}</div>
        <div
          className={styles.stats}
          style={{ textAlign: isPrimary ? 'left' : 'right' }}
        >
          <div className={styles.stat}>
            <span className={styles.statLabel}>STATUS</span>
            <span className={valueClass}>AWAITING DATA</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.countryPanel}
      style={{
        borderColor,
        textAlign: isPrimary ? 'left' : 'right',
      }}
    >
      <div className={styles.countryId}>
        ID: {country.cca3}_{idSuffix}
      </div>
      <div
        className={styles.countryHeader}
        style={{ flexDirection: isPrimary ? 'row' : 'row-reverse' }}
      >
        <div>
          <Image
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            width={64}
            height={48}
            className={styles.flag}
          />
          <h2
            className={
              isPrimary ? styles.countryName : styles.countryNameSecondary
            }
          >
            {country.name.official}
          </h2>
          <p className={isPrimary ? styles.coords : styles.coordsSecondary}>
            {country.capitalInfo?.latlng
              ? `${country.capitalInfo.latlng[0]}° N, ${country.capitalInfo.latlng[1]}° E`
              : 'N/A'}
          </p>
        </div>
      </div>
      <div
        className={styles.stats}
        style={{ textAlign: isPrimary ? 'left' : 'right' }}
      >
        <div className={styles.stat}>
          <span className={styles.statLabel}>CAPITAL</span>
          <span className={valueClass}>{country.capital?.[0] || 'N/A'}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>REGION</span>
          <span className={valueClass}>{country.region || 'N/A'}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>POPULATION</span>
          <span className={valueClass}>
            {country.population.toLocaleString()}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>AREA</span>
          <span className={valueClass}>
            {(country.area || 0).toLocaleString()} km²
          </span>
        </div>
      </div>
    </div>
  );
}
