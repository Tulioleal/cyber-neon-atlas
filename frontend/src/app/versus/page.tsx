'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Country } from '@/types/country';
import { useAllCountries } from '@/hooks/useCountries';
import CountrySelector from '@/components/comparison/CountrySelector';
import BarChart from '@/components/charts/BarChart';
import RadarChart from '@/components/charts/RadarChart';
import IntersectionCard from '@/components/comparison/IntersectionCard';
import ExportButton from '@/components/comparison/ExportButton';
import styles from './page.module.scss';

function VersusContent() {
  const { data: countries = [], isLoading } = useAllCountries();
  const searchParams = useSearchParams();
  const comparisonRef = useRef<HTMLDivElement>(null);

  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);

  useEffect(() => {
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    if (countries.length > 0) {
      if (c1) {
        const found = countries.find((c) => c.cca3 === c1);
        if (found) setCountry1(found);
      }
      if (c2) {
        const found = countries.find((c) => c.cca3 === c2);
        if (found) setCountry2(found);
      }
    }
  }, [countries, searchParams]);

  const barData = useMemo(() => {
    if (!country1 || !country2) return [];
    return [
      { name: 'Population', country1: country1.population, country2: country2.population },
      { name: 'Area', country1: country1.area || 0, country2: country2.area || 0 },
    ];
  }, [country1, country2]);

  const radarData = useMemo(() => {
    if (!country1 || !country2) return [];
    const maxPop = Math.max(country1.population, country2.population);
    const maxArea = Math.max(country1.area || 0, country2.area || 0);

    return [
      { metric: 'Population', country1: Math.round((country1.population / maxPop) * 100), country2: Math.round((country2.population / maxPop) * 100) },
      { metric: 'Area', country1: Math.round(((country1.area || 0) / maxArea) * 100), country2: Math.round(((country2.area || 0) / maxArea) * 100) },
      { metric: 'Borders', country1: Math.min(((country1.borders?.length || 0) / 15) * 100, 100), country2: Math.min(((country2.borders?.length || 0) / 15) * 100, 100) },
      { metric: 'Timezones', country1: Math.min(((country1.timezones?.length || 0) / 15) * 100, 100), country2: Math.min(((country2.timezones?.length || 0) / 15) * 100, 100) },
      { metric: 'Languages', country1: Math.min(((Object.keys(country1.languages || {}).length) / 15) * 100, 100), country2: Math.min(((Object.keys(country2.languages || {}).length) / 15) * 100, 100) },
    ];
  }, [country1, country2]);

  const handleCountry1Select = (country: Country) => {
    setCountry1(country);
  };

  const handleCountry2Select = (country: Country) => {
    setCountry2(country);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loader}>INITIALIZING COMPARISON PROTOCOL...</span>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.selectors}>
          <CountrySelector
            selectedCountry={country1}
            onSelect={handleCountry1Select}
            countries={countries}
            label="PRIMARY TARGET"
            color="primary"
          />
          <div className={styles.vs}>
            <span className={styles.vsText}>VERSUS</span>
            <div className={styles.vsLine} />
          </div>
          <CountrySelector
            selectedCountry={country2}
            onSelect={handleCountry2Select}
            countries={countries}
            label="SECONDARY TARGET"
            color="secondary"
          />
        </div>
      </header>

      {country1 && country2 ? (
        <div className={styles.content} ref={comparisonRef}>
          <div className={styles.countries}>
            <div className={styles.countryPanel} style={{ borderColor: 'rgba(0, 255, 209, 0.3)' }}>
              <div className={styles.countryId}>
                ID: {country1.cca3}_OPERATIONAL_DATA_SEC_01
              </div>
              <div className={styles.countryHeader}>
                <img src={country1.flags.svg} alt="" className={styles.flag} />
                <div>
                  <h2 className={styles.countryName}>{country1.name.official}</h2>
                  <p className={styles.coords}>
                    {country1.capitalInfo?.latlng
                      ? `${country1.capitalInfo.latlng[0]}° N, ${country1.capitalInfo.latlng[1]}° E`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>CAPITAL</span>
                  <span className={styles.statValue}>{country1.capital?.[0] || 'N/A'}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>REGION</span>
                  <span className={styles.statValue}>{country1.region || 'N/A'}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>POPULATION</span>
                  <span className={styles.statValue}>{country1.population.toLocaleString()}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>AREA</span>
                  <span className={styles.statValue}>{(country1.area || 0).toLocaleString()} km²</span>
                </div>
              </div>
            </div>

            <div className={styles.center}>
              <div className={styles.charts}>
                <BarChart
                  data={barData}
                  country1Name={country1.name.common}
                  country2Name={country2.name.common}
                />
                <RadarChart
                  data={radarData}
                  country1Name={country1.name.common}
                  country2Name={country2.name.common}
                />
              </div>
              <IntersectionCard country1={country1} country2={country2} />
              <ExportButton
                comparisonRef={comparisonRef}
                country1Code={country1.cca3}
                country2Code={country2.cca3}
              />
            </div>

            <div className={styles.countryPanel} style={{ borderColor: 'rgba(47, 248, 1, 0.3)', textAlign: 'right' }}>
              <div className={styles.countryId}>
                ID: {country2.cca3}_OPERATIONAL_DATA_SEC_07
              </div>
              <div className={styles.countryHeader} style={{ flexDirection: 'row-reverse' }}>
                <img src={country2.flags.svg} alt="" className={styles.flag} />
                <div>
                  <h2 className={styles.countryNameSecondary}>{country2.name.official}</h2>
                  <p className={styles.coordsSecondary}>
                    {country2.capitalInfo?.latlng
                      ? `${country2.capitalInfo.latlng[0]}° N, ${country2.capitalInfo.latlng[1]}° E`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className={styles.stats} style={{ textAlign: 'right' }}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>CAPITAL</span>
                  <span className={styles.statValueSecondary}>{country2.capital?.[0] || 'N/A'}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>REGION</span>
                  <span className={styles.statValueSecondary}>{country2.region || 'N/A'}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>POPULATION</span>
                  <span className={styles.statValueSecondary}>{country2.population.toLocaleString()}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>AREA</span>
                  <span className={styles.statValueSecondary}>{(country2.area || 0).toLocaleString()} km²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderContent}>
            <span className={styles.placeholderIcon}>⌕</span>
            <p className={styles.placeholderText}>SELECT TWO COUNTRIES TO INITIATE COMPARISON</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VersusPage() {
  return (
    <Suspense fallback={
      <div className={styles.loading}>
        <span className={styles.loader}>INITIALIZING COMPARISON PROTOCOL...</span>
      </div>
    }>
      <VersusContent />
    </Suspense>
  );
}
