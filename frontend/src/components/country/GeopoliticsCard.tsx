'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCountriesByCodes } from '@/services/api';
import { CountrySearchItem } from '@/services/api';
import styles from './GeopoliticsCard.module.scss';
import { motion } from 'motion/react';
import { colorsWithAlpha } from '@/utils/colors';

interface GeopoliticsCardProps {
  capital?: string[];
  capitalInfo?: { latlng?: [number, number] };
  region?: string;
  subregion?: string;
  borders?: string[];
}

export default function GeopoliticsCard({
  capital,
  capitalInfo,
  region,
  subregion,
  borders,
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

  const { data: neighborCountries } = useQuery<CountrySearchItem[]>({
    queryKey: ['countries', 'borders', borders],
    queryFn: () => fetchCountriesByCodes(borders || []),
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

      {borders && borders.length > 0 && (
        <div className={styles.neighborsSection}>
          <div className={styles.neighborsTitle}>
            Neighboring Countries ({borders.length})
          </div>
          <div className={styles.neighborsList}>
            {Array.isArray(neighborCountries)
              ? neighborCountries.map((country: CountrySearchItem) => (
                  <Link key={country.cca3} href={`/country/${country.cca3}`}>
                    <motion.span
                      className={styles.neighborLink}
                      initial={{
                        background: colorsWithAlpha.secondary(0),
                        border: `1px solid ${colorsWithAlpha.secondary(0.3)}`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        background: colorsWithAlpha.secondary(0.2),
                        boxShadow: `0 4px 8px ${colorsWithAlpha.secondary(0.3)}`,
                      }}
                      transition={{ duration: 0.05 }}
                    >
                      {country.name.common}
                    </motion.span>
                  </Link>
                ))
              : borders.map(code => (
                  <Link
                    key={code}
                    href={`/country/${code}`}
                    className={styles.neighborLink}
                  >
                    {code}
                  </Link>
                ))}
          </div>
        </div>
      )}

      {(!borders || borders.length === 0) && (
        <div className={styles.noNeighbors}>No neighboring countries</div>
      )}
    </div>
  );
}
