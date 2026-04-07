import React from 'react';
import styles from './BentoCard.module.scss';

interface BentoCardProps {
  title: string;
  variant?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  coordinate?: string;
  children: React.ReactNode;
  className?: string;
}

export default function BentoCard({
  title,
  variant = 'medium',
  coordinate,
  children,
  className,
}: BentoCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]} ${className || ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {coordinate && <span className={styles.coordinate}>{coordinate}</span>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
