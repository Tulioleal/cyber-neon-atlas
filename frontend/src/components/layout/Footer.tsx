import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          Data provided by <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">REST Countries API</a>
        </p>
        <p className={styles.copyright}>
          ATLAS CIBER-NEÓN v1.0
        </p>
      </div>
    </footer>
  );
};
