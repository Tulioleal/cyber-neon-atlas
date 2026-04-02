'use client';

import { useRouter } from 'next/navigation';
import { Country } from '@/types/country';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/perfil/${country.cca2}`);
  };

  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat('en-US').format(pop);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: '#0d0e13',
        border: '1px solid #2A2A35',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#00FFD1';
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 209, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A35';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        {country.flags.svg && (
          <img
            src={country.flags.svg}
            alt={country.name.common}
            style={{
              width: '100%',
              maxWidth: '120px',
              height: 'auto',
              display: 'block',
            }}
          />
        )}
      </div>
      <h3
        style={{
          color: '#E8E8E8',
          fontFamily: 'Space Mono, monospace',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {country.name.common}
      </h3>
      <div
        style={{
          color: '#A0A0A0',
          fontSize: '14px',
          marginBottom: '4px',
        }}
      >
        <span style={{ color: '#606060' }}>Region: </span>
        {country.region}
      </div>
      <div
        style={{
          color: '#A0A0A0',
          fontSize: '14px',
        }}
      >
        <span style={{ color: '#606060' }}>Population: </span>
        <span style={{ fontFamily: 'Fira Code, monospace' }}>
          {formatPopulation(country.population)}
        </span>
      </div>
    </div>
  );
}
