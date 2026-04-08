'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCountryByCode, fetchAllCountries } from '@/services/api';
import { Country } from '@/types/country';
import { BentoGrid, BentoCard } from '@/components/bento';
import EconomyCard from '@/components/country/EconomyCard';
import DemographicsCard from '@/components/country/DemographicsCard';
import GeopoliticsCard from '@/components/country/GeopoliticsCard';
import CountrySkeleton from '@/components/country/CountrySkeleton';
import styles from './page.module.scss';
import Image from 'next/image';
import { colors } from '@/utils/colors';
import { motion } from 'motion/react';

export default function CountryPage() {
  const params = useParams();
  const code = params?.code as string;
  const [mounted] = useState(() => {
    if (typeof window !== 'undefined') {
      return true;
    }
    return false;
  });

  const { data: countries } = useQuery({
    queryKey: ['countries', 'all'],
    queryFn: fetchAllCountries,
    staleTime: 3600000,
  });

  const {
    data: country,
    isLoading,
    error,
  } = useQuery<Country, Error>({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code),
    enabled: !!code,
    staleTime: 3600000,
  });

  useEffect(() => {
    if (countries && code && !isLoading) {
      const validCodes = countries.map((c: Country) => c.cca3.toLowerCase());
      if (!validCodes.includes(code.toLowerCase())) {
        notFound();
      }
    }
  }, [countries, code, isLoading]);

  if (!mounted || isLoading) {
    return <CountrySkeleton />;
  }

  if (error || !country) {
    notFound();
  }

  const lat = country.capitalInfo?.latlng?.[0];
  const lng = country.capitalInfo?.latlng?.[1];
  const formatCoord = (coord: number): string => {
    const direction = coord >= 0 ? 'N' : 'S';
    return `${Math.abs(coord).toFixed(2)}°${direction}`;
  };
  const formatLng = (lng: number): string => {
    const direction = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lng).toFixed(2)}°${direction}`;
  };

  return (
    <div className={styles.page}>
      <Link href="/">
       <motion.span className={styles.backLink}
          whileHover={{ color: colors.secondary, opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        > ← Return to Map
        </motion.span>
      </Link>

      <div className={styles.header}>
        <Image
          src={country.flags.svg}
          alt={country.flags.alt || country.name.common}
          className={styles.flag}
          width={64}
          height={48}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{country.name.common}</h1>
          <p className={styles.officialName}>{country.name.official}</p>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Code</span>
              <span className={styles.metaValue}>{country.cca3}</span>
            </div>
            {lat !== undefined && lng !== undefined && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Coordinates</span>
                <span className={styles.metaValue}>
                  {formatCoord(lat)} {formatLng(lng)}
                </span>
              </div>
            )}
            {country.continents && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Continent</span>
                <span className={styles.metaValue}>
                  {country.continents[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <BentoGrid>
        <BentoCard title="Economy Telemetry" coordinate="ECO-001">
          <EconomyCard
            population={country.population}
            area={country.area}
            gini={country.gini}
            currencies={country.currencies}
          />
        </BentoCard>

        <BentoCard title="Demographics" coordinate="DEM-001">
          <DemographicsCard
            population={country.population}
            area={country.area}
            languages={country.languages}
          />
        </BentoCard>

        <BentoCard title="Geopolitics" coordinate="GEO-001">
          <GeopoliticsCard
            capital={country.capital}
            capitalInfo={country.capitalInfo}
            region={country.region}
            subregion={country.subregion}
            borders={country.borders}
            countryCode={country.cca3}
          />
        </BentoCard>

        <BentoCard title="Identifiers" coordinate="ID-001">
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {country.cca2 && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: colors.onSurfaceVariant, fontSize: '12px' }}
                >
                  CCA2
                </span>
                <span
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    color: colors.onSurface,
                  }}
                >
                  {country.cca2}
                </span>
              </div>
            )}
            {country.tld && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: colors.onSurfaceVariant, fontSize: '12px' }}
                >
                  TLD
                </span>
                <span
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    color: colors.onSurface,
                  }}
                >
                  {country.tld[0]}
                </span>
              </div>
            )}
            {country.idd && country.idd.root && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: colors.onSurfaceVariant, fontSize: '12px' }}
                >
                  IDD
                </span>
                <span
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    color: colors.onSurface,
                  }}
                >
                  {country.idd.root}
                  {country.idd.suffixes?.[0] || ''}
                </span>
              </div>
            )}
            {country.car?.side && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: colors.onSurfaceVariant, fontSize: '12px' }}
                >
                  Driving Side
                </span>
                <span
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    color: colors.onSurface,
                    textTransform: 'capitalize',
                  }}
                >
                  {country.car.side}
                </span>
              </div>
            )}
            {country.startOfWeek && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: colors.onSurfaceVariant, fontSize: '12px' }}
                >
                  Start of Week
                </span>
                <span
                  style={{
                    fontFamily: 'Fira Code, monospace',
                    color: colors.onSurface,
                    textTransform: 'capitalize',
                  }}
                >
                  {country.startOfWeek}
                </span>
              </div>
            )}
          </div>
        </BentoCard>

        {country.timezones && country.timezones.length > 0 && (
          <BentoCard title="Timezones" coordinate="TZ-001">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {country.timezones.slice(0, 6).map(tz => (
                <span
                  key={tz}
                  style={{
                    padding: '4px 8px',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '10px',
                    color: colors.primary,
                    border: '1px solid rgba(0, 255, 209, 0.3)',
                    background: 'rgba(0, 255, 209, 0.05)',
                  }}
                >
                  {tz}
                </span>
              ))}
            </div>
          </BentoCard>
        )}

        {country.demonyms && (
          <BentoCard title="Demonyms" coordinate="DMN-001">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {country.demonyms.eng && (
                <>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span
                      style={{
                        color: colors.onSurfaceVariant,
                        fontSize: '12px',
                      }}
                    >
                      English (M/F)
                    </span>
                    <span
                      style={{
                        fontFamily: 'Fira Code, monospace',
                        color: colors.onSurface,
                      }}
                    >
                      {country.demonyms.eng.m} / {country.demonyms.eng.f}
                    </span>
                  </div>
                </>
              )}
            </div>
          </BentoCard>
        )}
      </BentoGrid>
    </div>
  );
}
