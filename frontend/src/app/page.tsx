'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorldMap } from '@/components/map';
import SearchAutocomplete from '@/components/search/SearchAutocomplete';
import CountryCard from '@/components/country/CountryCard';
import { useCountryStore } from '@/stores/countryStore';

interface GeoJsonData {
  type: string;
  features: Array<{
    type: string;
    properties: {
      ADMIN: string;
      ISO_A3: string;
    };
    geometry: {
      type: string;
      coordinates: number[][][] | number[][][][];
    };
  }>;
}

export default function Home() {
  const router = useRouter();
  const { countries, fetchCountries } = useCountryStore();
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchCountries();
      
      try {
        const response = await fetch('/data/world.geojson');
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error('Failed to load GeoJSON:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchCountries]);

  const handleCountryClick = (countryCode: string) => {
    router.push(`/perfil/${countryCode}`);
  };

  const handleCountryHover = (countryName: string | null) => {
  };

  const handleSearchSelect = (country: any) => {
    const countryData = countries.find(c => c.cca3 === country.cca3 || c.cca2 === country.cca2);
    if (countryData && countryData.capitalInfo?.latlng) {
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px - 48px)' }}>
      <aside style={{
        width: '320px',
        background: '#0d0e13',
        borderRight: '1px solid #2A2A35',
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div>
          <h2 style={{
            color: '#00FFD1',
            fontFamily: 'Space Mono, monospace',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Search Database
          </h2>
          <SearchAutocomplete onSelect={handleSearchSelect} />
        </div>

        <div>
          <h2 style={{
            color: '#00FFD1',
            fontFamily: 'Space Mono, monospace',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Quick Stats
          </h2>
          <div style={{
            background: '#16181f',
            border: '1px solid #2A2A35',
            padding: '16px',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#606060', fontSize: '12px', marginBottom: '4px' }}>TOTAL COUNTRIES</div>
              <div style={{ color: '#E8E8E8', fontSize: '24px', fontFamily: 'Fira Code, monospace' }}>
                {countries.length}
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#606060', fontSize: '12px', marginBottom: '4px' }}>REGIONS</div>
              <div style={{ color: '#E8E8E8', fontSize: '24px', fontFamily: 'Fira Code, monospace' }}>
                6
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{
            color: '#00FFD1',
            fontFamily: 'Space Mono, monospace',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Featured Countries
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {countries.slice(0, 5).map((country) => (
              <CountryCard key={country.cca2} country={country} />
            ))}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, position: 'relative' }}>
        {isLoading ? (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#0d0e13',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00FFD1',
            fontFamily: 'Fira Code, monospace',
          }}>
            Loading map data...
          </div>
        ) : (
          <WorldMap
            geoJsonData={geoJsonData || undefined}
            onCountryClick={handleCountryClick}
            onCountryHover={handleCountryHover}
          />
        )}
      </div>
    </div>
  );
}
