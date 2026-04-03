'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import styles from './BarChart.module.scss';

interface BarChartProps {
  data: Array<{
    name: string;
    country1: number;
    country2: number;
  }>;
  country1Name: string;
  country2Name: string;
}

export default function BarChart({
  data,
  country1Name,
  country2Name,
}: BarChartProps) {
  const formatValue = (value: number, name: string) => {
    if (name === 'Population') return value.toLocaleString();
    if (name === 'Area') return `${value.toLocaleString()} km²`;
    if (name === 'GDP per capita') return `$${value.toLocaleString()}`;
    return value.toLocaleString();
  };

  const maxValue = Math.max(
    ...data.flatMap((d) => [d.country1, d.country2])
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>COMPARATIVE METRICS</h3>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#00FFD1' }} />
          <span className={styles.legendLabel}>{country1Name}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#2ff801' }} />
          <span className={styles.legendLabel}>{country2Name}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, maxValue]}
            tick={{ fill: '#abaab1', fontSize: 10, fontFamily: 'Fira Code' }}
            axisLine={{ stroke: '#47474e' }}
            tickLine={{ stroke: '#47474e' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#f7f5fd', fontSize: 11, fontFamily: 'Space Mono' }}
            axisLine={{ stroke: '#47474e' }}
            tickLine={false}
            width={100}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const val1 = typeof payload[0]?.value === 'number' ? payload[0].value : 0;
              const val2 = typeof payload[1]?.value === 'number' ? payload[1].value : 0;
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tooltipLabel}>{payload[0]?.payload?.name}</p>
                  <p style={{ color: '#00FFD1' }}>
                    {country1Name}: {formatValue(val1, payload[0]?.payload?.name ?? '')}
                  </p>
                  <p style={{ color: '#2ff801' }}>
                    {country2Name}: {formatValue(val2, payload[1]?.payload?.name ?? '')}
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="country1" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-1-${index}`} fill="#00FFD1" />
            ))}
            <LabelList
              dataKey="country1"
              position="right"
              formatter={(value: unknown) =>
                typeof value === 'number' ? formatValue(value, '') : ''
              }
              style={{ fill: '#00FFD1', fontSize: 10, fontFamily: 'Fira Code' }}
            />
          </Bar>
          <Bar dataKey="country2" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-2-${index}`} fill="#2ff801" />
            ))}
            <LabelList
              dataKey="country2"
              position="right"
              formatter={(value: unknown) =>
                typeof value === 'number' ? formatValue(value, '') : ''
              }
              style={{ fill: '#2ff801', fontSize: 10, fontFamily: 'Fira Code' }}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
