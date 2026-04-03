'use client';

import { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { fetchAllCountries } from '@/services/api';
import { Country } from '@/types/country';
import { useCountryStore } from '@/stores/useCountryStore';
import { useRouter } from 'next/navigation';
import SearchBar from '../search/SearchBar';
import styles from './WorldMap.module.scss';

const GEOJSON_URL = 'https://raw.githubusercontent.com/djaiss/mapsicle/master/all.geo.json';

const MapWrapper = dynamic(
  () => import('./MapInner'),
  { ssr: false }
);

interface CountryLayerProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onCountryClick: (feature: GeoJSON.Feature) => void;
}

function CountryLayer({ geoJsonData, onCountryClick }: CountryLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData || !map) return;

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: {
        fillColor: 'transparent',
        fillOpacity: 0,
        stroke: true,
        color: 'rgba(0, 255, 209, 0.3)',
        weight: 1,
      },
      onEachFeature: (feature: GeoJSON.Feature, layer: L.Path) => {
        layer.on({
          mouseover: (e: L.LeafletEvent) => {
            const target = e.target as L.Path;
            target.setStyle({
              fillColor: 'rgba(0, 255, 209, 0.1)',
              fillOpacity: 1,
              color: '#00FFD1',
              weight: 1.5,
            });
            target.bringToFront();
            const el = target.getElement() as HTMLElement | null;
            if (el) el.style.cursor = 'pointer';
          },
          mouseout: (e: L.LeafletEvent) => {
            const target = e.target as L.Path;
            target.setStyle({
              fillColor: 'transparent',
              fillOpacity: 0,
              color: 'rgba(0, 255, 209, 0.3)',
              weight: 1,
            });
            const el = target.getElement() as HTMLElement | null;
            if (el) el.style.cursor = 'default';
          },
          click: () => {
            onCountryClick(feature);
          },
        });
      },
    });

    geoJsonLayer.addTo(map);

    return () => {
      if (geoJsonLayer && map.hasLayer(geoJsonLayer)) {
        map.removeLayer(geoJsonLayer);
      }
    };
  }, [geoJsonData, map, onCountryClick]);

  return null;
}

function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { countries, loading };
}

export default function MapClient() {
  const router = useRouter();
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);
  const { countries, loading } = useCountries();
  const { setSelectedCountry } = useCountryStore();

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err));
  }, []);

  const handleCountryClick = useCallback(async (feature: GeoJSON.Feature) => {
    const countryName = feature.properties?.name;
    if (!countryName || !countries.length) return;

    const matchedCountry = countries.find(
      (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
    );

    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
      setSelectedCountryName(countryName);
      router.push(`/profile/${matchedCountry.cca3}`);
    }
  }, [countries, setSelectedCountry, router]);

  const handleSearchSelect = useCallback(async (countryCode: string) => {
    if (!countries.length || !geoJsonData) return;

    const country = countries.find((c) => c.cca3 === countryCode);
    if (!country) return;

    const feature = geoJsonData.features.find(
      (f) => f.properties?.name?.toLowerCase() === country.name.common.toLowerCase()
    );

    if (feature) {
      setSelectedCountry(country);
      setSelectedCountryName(country.name.common);
    }
  }, [countries, geoJsonData, setSelectedCountry]);

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
          {geoJsonData && (
            <CountryLayer 
              geoJsonData={geoJsonData} 
              onCountryClick={handleCountryClick}
            />
          )}
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