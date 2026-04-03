'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCountryByCode } from '@/services/api';
import styles from './GeopoliticsCard.module.scss';

interface GeopoliticsCardProps {
  capital?: string[];
  capitalInfo?: { latlng?: [number, number] };
  region?: string;
  subregion?: string;
  borders?: string[];
  countryCode: string;
}

export default function GeopoliticsCard({
  capital,
  capitalInfo,
  region,
  subregion,
  borders,
  countryCode,
}: GeopoliticsCardProps) {
  const formatCoord = (coord: number): string => {
    const direction = coord >= 0 ? 'N' : 'S';
    return `${Math.abs(coord).toFixed(2)}°${direction}`;
  };

  const formatLng = (lng: number): string => {
    const direction = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lng).toFixed(2)}°${direction}`;
  };

  const lat = capitalInfo?.latlng?.[0];
  const lng = capitalInfo?.latlng?.[1];

  const { data: neighborCountries } = useQuery({
    queryKey: ['countries', 'borders', borders],
    queryFn: async () => {
      if (!borders || borders.length === 0) return [];
      const codes = borders.join(',');
      const response = await fetch(`https://restcountries.com/v4.1/alpha?codes=${codes}&fields=name,cca3`);
      return response.json();
    },
    enabled: !!borders && borders.length > 0,
  });

  return (
    <div className={styles.geopoliticsCard}>
      {capital && capital.length > 0 && (
        <div className={styles.capitalSection}>
          <span className={styles.statLabel}>Capital</span>
          <span className={styles.capitalName}>{capital[0]}</span>
          {lat !== undefined && lng !== undefined && (
            <span className={styles.capitalCoords}>
              {formatCoord(lat)} {formatLng(lng)}
            </span>
          )}
        </div>
      )}

      {region && (
        <div className={styles.stat}>
          <span className={styles.statLabel}>Region</span>
          <span className={styles.statValue}>{region}</span>
        </div>
      )}

      {subregion && (
        <div className={styles.stat}>
          <span className={styles.statLabel}>Subregion</span>
          <span className={styles.statValue}>{subregion}</span>
        </div>
      )}

      {region && (
        <div className={styles.regionBadges}>
          {region && <span className={styles.badge}>{region}</span>}
          {subregion && <span className={styles.badge}>{subregion}</span>}
        </div>
      )}

      {borders && borders.length > 0 && (
        <div className={styles.neighborsSection}>
          <div className={styles.neighborsTitle}>
            Neighboring Countries ({borders.length})
          </div>
          <div className={styles.neighborsList}>
            {Array.isArray(neighborCountries) ? (
              neighborCountries.map((country: { name: { common: string }; cca3: string }) => (
                <Link
                  key={country.cca3}
                  href={`/country/${country.cca3}`}
                  className={styles.neighborLink}
                >
                  {country.name.common}
                </Link>
              ))
            ) : (
              borders.map((code) => (
                <Link
                  key={code}
                  href={`/country/${code}`}
                  className={styles.neighborLink}
                >
                  {code}
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {(!borders || borders.length === 0) && (
        <div className={styles.noNeighbors}>No neighboring countries</div>
      )}
    </div>
  );
}