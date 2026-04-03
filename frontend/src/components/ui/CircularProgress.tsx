import React, { useEffect, useState } from 'react';
import styles from './CircularProgress.module.scss';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  animated?: boolean;
}

export default function CircularProgress({
  value,
  max = 100,
  size = 60,
  strokeWidth = 4,
  label,
  animated = true,
}: CircularProgressProps) {
  const [offset, setOffset] = useState(animated ? 0 : (1 - value / max) * 2 * Math.PI * 20);
  
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = (1 - value / max) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setOffset(dashOffset);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setOffset(dashOffset);
    }
  }, [value, max, animated, dashOffset]);

  return (
    <div className={styles.circularProgress} style={{ width: size, height: size }}>
      <svg className={styles.svg} width={size} height={size}>
        <circle
          className={styles.background}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}