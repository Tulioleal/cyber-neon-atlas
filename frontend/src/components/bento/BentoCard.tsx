import React from 'react';
import styles from './BentoCard.module.scss';
import { motion } from 'motion/react';
import { colorsWithAlpha } from '@/utils/colors';

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
    <motion.div
      className={`${styles.card} ${styles[variant]} ${className || ''}`}
      whileHover={{
        boxShadow: `0 0 15px ${colorsWithAlpha.primary(0.3)}`
      }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {coordinate && <span className={styles.coordinate}>{coordinate}</span>}
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
