'use client';

import { useMemo, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Country } from '@/types/country';
import { useCountry, useCountrySearchList } from '@/hooks/useCountries';
import CountrySelector from '@/components/comparison/CountrySelector';
import CountryPanel from '@/components/comparison/CountryPanel';
import BarChart from '@/components/charts/BarChart';
import RadarChart from '@/components/charts/RadarChart';
import IntersectionCard from '@/components/comparison/IntersectionCard';
import ExportButton from '@/components/comparison/ExportButton';
import styles from './page.module.scss';

function VersusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comparisonRef = useRef<HTMLDivElement>(null);

  const c1Param = searchParams.get('c1');
  const c2Param = searchParams.get('c2');

  const { data: searchList = [], isLoading: isSearchLoading } =
    useCountrySearchList();
  const { data: country1Data, isLoading: isCountry1Loading } =
    useCountry(c1Param);
  const { data: country2Data, isLoading: isCountry2Loading } =
    useCountry(c2Param);

  const isLoading = isSearchLoading || isCountry1Loading || isCountry2Loading;

  const country1 = c1Param && country1Data ? country1Data : null;
  const country2 = c2Param && country2Data ? country2Data : null;

  const handleCountry1Select = (cca3: string) => {
    const params = new URLSearchParams();
    if (cca3) params.set('c1', cca3);
    if (c2Param) params.set('c2', c2Param);
    router.push(params.toString() ? `/versus?${params.toString()}` : '/versus');
  };

  const handleCountry2Select = (cca3: string) => {
    const params = new URLSearchParams();
    if (cca3) params.set('c2', cca3);
    if (c1Param) params.set('c1', c1Param);
    router.push(params.toString() ? `/versus?${params.toString()}` : '/versus');
  };

  const getSelectedCountry = (cca3: string | null): Country | null => {
    if (!cca3) return null;
    const found = searchList.find(c => c.cca3 === cca3);
    if (found) {
      return {
        name: found.name,
        cca3: found.cca3,
        population: 0,
      } as Country;
    }
    return null;
  };

  const barData = useMemo(() => {
    if (country1 && !country2) {
      return [
        { name: 'Population', country1: country1.population, country2: 0 },
        { name: 'Area', country1: country1.area || 0, country2: 0 },
      ];
    }
    if (country2 && !country1) {
      return [
        { name: 'Population', country1: 0, country2: country2.population },
        { name: 'Area', country1: 0, country2: country2.area || 0 },
      ];
    }
    if (!country1 || !country2) return [];
    return [
      {
        name: 'Population',
        country1: country1.population,
        country2: country2.population,
      },
      {
        name: 'Area',
        country1: country1.area || 0,
        country2: country2.area || 0,
      },
    ];
  }, [country1, country2]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loader}>
          INITIALIZING COMPARISON PROTOCOL...
        </span>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.selectors}>
          <CountrySelector
            selectedCountry={getSelectedCountry(c1Param)}
            onSelect={handleCountry1Select}
            searchList={searchList}
            label="PRIMARY TARGET"
            color="primary"
          />
          <div className={styles.vs}>
            <span className={styles.vsText}>VERSUS</span>
            <div className={styles.vsLine} />
          </div>
          <CountrySelector
            selectedCountry={getSelectedCountry(c2Param)}
            onSelect={handleCountry2Select}
            searchList={searchList}
            label="SECONDARY TARGET"
            color="secondary"
          />
        </div>
      </header>
        <div className={styles.content} ref={comparisonRef} >
          <div className={styles.countries}>
            <CountryPanel
              country={country1}
              variant="primary"
              idSuffix="OPERATIONAL_DATA_SEC_01"
            />
            {
              (country1 || country2) ? (
                <div className={styles.center}>
                  <div className={styles.charts}>
                    <BarChart
                      data={barData}
                      country1Name={country1?.name.common || ''}
                      country2Name={country2?.name.common || ''}
                    />
                    <RadarChart
                      country1={country1}
                      country2={country2}
                      country1Name={country1?.name.common || ''}
                      country2Name={country2?.name.common || ''}
                    />
                  </div>
                  <IntersectionCard country1={country1} country2={country2} />
                  <ExportButton
                    comparisonRef={comparisonRef}
                    country1Code={country1?.cca3 || ''}
                    country2Code={country2?.cca3 || ''}
                  />
                </div>
              ) : (
                <div className={styles.placeholder}>
                  <div className={styles.placeholderContent}>
                    <span className={styles.placeholderIcon}>⌕</span>
                    <p className={styles.placeholderText}>SELECT A COUNTRY TO BEGIN</p>
                  </div>
                </div>
              )
            }
            <CountryPanel
              country={country2}
              variant="secondary"
              idSuffix="OPERATIONAL_DATA_SEC_02"
            />
          </div>
        </div>
    </div>
  );
}

export default function VersusPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <span className={styles.loader}>
            INITIALIZING COMPARISON PROTOCOL...
          </span>
        </div>
      }
    >
      <VersusContent />
    </Suspense>
  );
}
