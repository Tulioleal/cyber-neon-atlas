'use client';

import { useMemo } from 'react';
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import styles from './RadarChart.module.scss';
import { Country } from '@/types/country';

interface RadarChartProps {
  country1: Country | null;
  country2: Country | null;
  country1Name: string;
  country2Name: string;
}

export default function RadarChart({
  country1,
  country2,
  country1Name,
  country2Name,
}: RadarChartProps) {
  const data = useMemo(() => {
    const normalizeBorders = (c: Country | null) =>
      c ? Math.min(((c.borders?.length || 0) / 15) * 100, 100) : 0;
    const normalizeGini = (c: Country | null) => {
      if (!c?.gini) return 0;
      const giniValues = Object.values(c.gini);
      if (giniValues.length === 0) return 0;
      return Math.min((giniValues[0] / 60) * 100, 100);
    };
    const normalizeLanguages = (c: Country | null) =>
      c ? Math.min((Object.keys(c.languages || {}).length / 15) * 100, 100) : 0;
    const getBordersCount = (c: Country | null) => c?.borders?.length || 0;
    const getGiniValue = (c: Country | null): string => {
      if (!c?.gini) return '-';
      const giniValues = Object.values(c.gini);
      return giniValues.length > 0 ? `${giniValues[0]}` : '-';
    };
    const getLanguagesCount = (c: Country | null) =>
      c ? Object.keys(c.languages || {}).length : 0;

    const formatPop = (v: number) => v.toLocaleString();
    const formatArea = (v: number) => `${v.toLocaleString()} km²`;
    const formatCount = (v: number) => v.toString();

    if (country1 && !country2) {
      return [
        {
          metric: 'Population',
          country1: 100,
          country2: 0,
          real1: formatPop(country1.population),
          real2: '-',
        },
        {
          metric: 'Area',
          country1: 100,
          country2: 0,
          real1: formatArea(country1.area || 0),
          real2: '-',
        },
        {
          metric: 'Borders',
          country1: normalizeBorders(country1),
          country2: 0,
          real1: formatCount(getBordersCount(country1)),
          real2: '-',
        },
        {
          metric: 'Gini',
          country1: normalizeGini(country1),
          country2: 0,
          real1: getGiniValue(country1),
          real2: '-',
        },
        {
          metric: 'Languages',
          country1: normalizeLanguages(country1),
          country2: 0,
          real1: formatCount(getLanguagesCount(country1)),
          real2: '-',
        },
      ];
    }
    if (country2 && !country1) {
      return [
        {
          metric: 'Population',
          country1: 0,
          country2: 100,
          real1: '-',
          real2: formatPop(country2.population),
        },
        {
          metric: 'Area',
          country1: 0,
          country2: 100,
          real1: '-',
          real2: formatArea(country2.area || 0),
        },
        {
          metric: 'Borders',
          country1: 0,
          country2: normalizeBorders(country2),
          real1: '-',
          real2: formatCount(getBordersCount(country2)),
        },
        {
          metric: 'Gini',
          country1: 0,
          country2: normalizeGini(country2),
          real1: '-',
          real2: getGiniValue(country2),
        },
        {
          metric: 'Languages',
          country1: 0,
          country2: normalizeLanguages(country2),
          real1: '-',
          real2: formatCount(getLanguagesCount(country2)),
        },
      ];
    }
    if (!country1 || !country2) return [];

    const maxPop = Math.max(country1.population, country2.population);
    const maxArea = Math.max(country1.area || 0, country2.area || 0);

    return [
      {
        metric: 'Population',
        country1: Math.round((country1.population / maxPop) * 100),
        country2: Math.round((country2.population / maxPop) * 100),
        real1: formatPop(country1.population),
        real2: formatPop(country2.population),
      },
      {
        metric: 'Area',
        country1: Math.round(((country1.area || 0) / maxArea) * 100),
        country2: Math.round(((country2.area || 0) / maxArea) * 100),
        real1: formatArea(country1.area || 0),
        real2: formatArea(country2.area || 0),
      },
      {
        metric: 'Borders',
        country1: normalizeBorders(country1),
        country2: normalizeBorders(country2),
        real1: formatCount(getBordersCount(country1)),
        real2: formatCount(getBordersCount(country2)),
      },
      {
        metric: 'Gini',
        country1: normalizeGini(country1),
        country2: normalizeGini(country2),
        real1: getGiniValue(country1),
        real2: getGiniValue(country2),
      },
      {
        metric: 'Languages',
        country1: normalizeLanguages(country1),
        country2: normalizeLanguages(country2),
        real1: formatCount(getLanguagesCount(country1)),
        real2: formatCount(getLanguagesCount(country2)),
      },
    ];
  }, [country1, country2]);

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>RADAR ANALYSIS</h3>
        <div className={styles.noData}>NO DATA AVAILABLE</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>RADAR ANALYSIS</h3>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333C4D" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{
              fill: 'colors.primary',
              fontSize: 10,
              fontFamily: 'Space Mono',
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{
              fill: 'colors.onSurfaceVariant',
              fontSize: 9,
              fontFamily: 'Fira Code',
            }}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const payloadData = payload[0]?.payload;
              const real1 = payloadData?.real1 as string;
              const real2 = payloadData?.real2 as string;

              return (
                <div className={styles.tooltip}>
                  <p className={styles.tooltipLabel}>{payloadData?.metric}</p>
                  <p style={{ color: 'colors.primary' }}>
                    {country1Name}: {real1}
                  </p>
                  <p style={{ color: 'colors.secondary' }}>
                    {country2Name}: {real2}
                  </p>
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={value => (
              <span
                style={{
                  color: 'colors.onSurface',
                  fontFamily: 'Fira Code',
                  fontSize: 11,
                }}
              >
                {value}
              </span>
            )}
          />
          <Radar
            name={country1Name}
            dataKey="country1"
            stroke="colors.primary"
            fill="colors.primary"
            fillOpacity={0.15}
          />
          <Radar
            name={country2Name}
            dataKey="country2"
            stroke="colors.secondary"
            fill="colors.secondary"
            fillOpacity={0.15}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
