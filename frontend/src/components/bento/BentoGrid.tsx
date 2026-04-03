import React from 'react';
import styles from './BentoGrid.module.scss';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={`${styles.grid} ${className || ''}`}>
      {children}
    </div>
  );
}