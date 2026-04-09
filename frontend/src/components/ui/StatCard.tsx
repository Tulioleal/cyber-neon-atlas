import React, { useEffect, useState } from 'react';
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import styles from './StatCard.module.scss';

interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  animated?: boolean;
  format?: 'number' | 'currency' | 'compact' | 'none';
}

export default function StatCard({
  icon,
  label,
  value,
  trend = 'neutral',
  trendValue,
  animated = true,
  format = 'number',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'compact':
        return new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(val);
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(val);
      case 'number':
        return new Intl.NumberFormat('en-US').format(val);
      default:
        return String(val);
    }
  };

  useEffect(() => {
    if (animated && typeof value === 'number') {
      const duration = 1000;
      const steps = 30;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(value);
    }
  }, [value, animated]);

  return (
    <div className={styles.statCard}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{formatValue(displayValue)}</span>
      {trend !== 'neutral' && trendValue && (
        <span className={`${styles.trend} ${styles[trend]}`}>
          {trend === 'up' ? <IoTrendingUp /> : <IoTrendingDown />}
          {trendValue}
        </span>
      )}
    </div>
  );
}
