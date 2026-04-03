import React from 'react';
import styles from './CountrySkeleton.module.scss';

export default function CountrySkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.flag} />
        <div className={styles.info}>
          <div className={styles.name} />
          <div className={styles.code} />
        </div>
      </div>
      <div className={styles.grid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTitle} />
            <div className={styles.cardLine} />
            <div className={styles.cardLine} />
            <div className={styles.cardLine} />
          </div>
        ))}
      </div>
    </div>
  );
}