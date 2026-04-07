'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  BarShapeProps,
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

  const renderChart = (metricName: string) => {
    const metricData = data.filter(d => d.name === metricName);
    const maxValue =
      Math.max(...metricData.flatMap(d => [d.country1, d.country2])) || 1;

    return (
      <div key={metricName} className={styles.metricChart}>
        <h4 className={styles.metricTitle}>{metricName.toUpperCase()}</h4>
        <ResponsiveContainer width="100%" height={120}>
          <RechartsBarChart
            data={metricData}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
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
              tick={false}
              axisLine={{ stroke: '#47474e' }}
              tickLine={false}
              width={0}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;
                const val1 =
                  typeof payload[0]?.value === 'number' ? payload[0].value : 0;
                const val2 =
                  typeof payload[1]?.value === 'number' ? payload[1].value : 0;
                return (
                  <div className={styles.tooltip}>
                    <p style={{ color: '#00FFD1' }}>
                      {country1Name}: {formatValue(val1, metricName)}
                    </p>
                    <p style={{ color: '#2ff801' }}>
                      {country2Name}: {formatValue(val2, metricName)}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="country1"
              radius={[0, 4, 4, 0]}
              shape={props => <Rect {...props} color="#00FFD1" />}
            >
              <LabelList
                dataKey="country1"
                position="right"
                formatter={(value: unknown) =>
                  typeof value === 'number'
                    ? formatValue(value, metricName)
                    : ''
                }
                style={{
                  fill: '#00FFD1',
                  fontSize: 10,
                  fontFamily: 'Fira Code',
                }}
              />
            </Bar>
            <Bar
              dataKey="country2"
              radius={[0, 4, 4, 0]}
              shape={props => <Rect {...props} color="#2ff801" />}
            >
              <LabelList
                dataKey="country2"
                position="right"
                formatter={(value: unknown) =>
                  typeof value === 'number'
                    ? formatValue(value, metricName)
                    : ''
                }
                style={{
                  fill: '#2ff801',
                  fontSize: 10,
                  fontFamily: 'Fira Code',
                }}
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const populationData = data.filter(d => d.name === 'Population');
  const areaData = data.filter(d => d.name === 'Area');

  if (populationData.length === 0 && areaData.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>COMPARATIVE METRICS</h3>
        <div className={styles.noData}>NO DATA AVAILABLE</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>COMPARATIVE METRICS</h3>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#00FFD1' }} />
          <span className={styles.legendLabel}>
            {country1Name || 'Country 1'}
          </span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#2ff801' }} />
          <span className={styles.legendLabel}>
            {country2Name || 'Country 2'}
          </span>
        </div>
      </div>
      {populationData.length > 0 && renderChart('Population')}
      {areaData.length > 0 && renderChart('Area')}
    </div>
  );
}

interface RectProps extends BarShapeProps {
  color?: string;
}

const Rect = (props: RectProps) => {
  const { x, y, width, height, color } = props;
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
};
