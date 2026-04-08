'use client';

import { useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useCountryStore } from '@/stores/useCountryStore';
import { useRouter } from 'next/navigation';
import SearchBar from '../search/SearchBar';
import styles from './WorldMap.module.scss';
import geoJsonOrigin from '@/utils/geo.json';
import { useAllCountries } from '@/hooks/useCountries';
import CountryLayer from './CountryLayer';

const geoJsonData = geoJsonOrigin as unknown as GeoJSON.FeatureCollection;

const MapWrapper = dynamic(() => import('./MapInner'), { ssr: false });

export default function MapClient() {
  const router = useRouter();
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );
  const { data: countries, isLoading: loading } = useAllCountries();
  const { setSelectedCountry } = useCountryStore();

  const handleCountryClick = useCallback(
    async (feature: GeoJSON.Feature) => {
      const countryName = feature.properties?.name;
      if (!countryName || !countries?.length) return;

      const matchedCountry = (countries || []).find(
        c => c.name.common.toLowerCase() === countryName.toLowerCase()
      );

      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setSelectedCountryName(countryName);
        router.push(`/country/${matchedCountry.cca3}`);
      }
    },
    [countries, setSelectedCountry, router]
  );

  const handleSearchSelect = useCallback(
    async (countryCode: string) => {
      if (!countries?.length || !geoJsonData) return;

      const country = (countries || []).find(c => c.cca3 === countryCode);
      if (!country) return;

      const feature = geoJsonData.features.find(
        f =>
          f.properties?.name?.toLowerCase() ===
          country.name.common.toLowerCase()
      );

      if (feature) {
        setSelectedCountry(country);
        setSelectedCountryName(country.name.common);
      }
    },
    [countries, setSelectedCountry]
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>CARGANDO_BASE_DE_DATOS...</div>
      </div>
    );
  }

  return (
    <div className={styles.mapPage}>
      <div className={styles.searchOverlay}>
        <SearchBar onCountrySelect={handleSearchSelect} />
      </div>
      <div className={styles.mapContainer}>
        <MapWrapper>
          <CountryLayer
            geoJsonData={geoJsonData}
            onCountryClick={handleCountryClick}
          />
        </MapWrapper>
      </div>
      {selectedCountryName && (
        <div className={styles.countryInfo}>
          <span className={styles.label}>SELECCIONADO:</span>
          <span className={styles.value}>{selectedCountryName}</span>
        </div>
      )}
    </div>
  );
}
