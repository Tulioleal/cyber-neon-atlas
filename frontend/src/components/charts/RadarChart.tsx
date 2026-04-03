'use client';

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

interface RadarChartProps {
  data: Array<{
    metric: string;
    country1: number;
    country2: number;
  }>;
  country1Name: string;
  country2Name: string;
}

export default function RadarChart({
  data,
  country1Name,
  country2Name,
}: RadarChartProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>RADAR ANALYSIS</h3>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#333C4D" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: '#00FFD1', fontSize: 10, fontFamily: 'Space Mono' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#abaab1', fontSize: 9, fontFamily: 'Fira Code' }}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const val1 = typeof payload[0]?.value === 'number' ? payload[0].value : 0;
              const val2 = typeof payload[1]?.value === 'number' ? payload[1].value : 0;
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tooltipLabel}>{payload[0]?.payload?.metric}</p>
                  <p style={{ color: '#00FFD1' }}>{country1Name}: {val1}</p>
                  <p style={{ color: '#2ff801' }}>{country2Name}: {val2}</p>
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span style={{ color: '#f7f5fd', fontFamily: 'Fira Code', fontSize: 11 }}>
                {value}
              </span>
            )}
          />
          <Radar
            name={country1Name}
            dataKey="country1"
            stroke="#00FFD1"
            fill="#00FFD1"
            fillOpacity={0.15}
          />
          <Radar
            name={country2Name}
            dataKey="country2"
            stroke="#2ff801"
            fill="#2ff801"
            fillOpacity={0.15}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
