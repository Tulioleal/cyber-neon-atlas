import React, { useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  value: number;
  max?: number;
  animated?: boolean;
}

export default function ProgressBar({ value, max = 100, animated = true }: ProgressBarProps) {
  const [width, setWidth] = useState(animated ? 0 : (value / max) * 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setWidth((value / max) * 100);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setWidth((value / max) * 100);
    }
  }, [value, max, animated]);

  return (
    <div className={styles.progressBar}>
      <div className={styles.fill} style={{ width: `${width}%` }} />
    </div>
  );
}