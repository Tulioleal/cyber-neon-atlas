import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.copyright}>© 2026 ATLAS CIBER-NEÓN</span>
      </div>
      <div className={styles.right}>
        <span className={styles.coords}>LAT: 0.0000 | LON: 0.0000</span>
        <span className={styles.separator}>|</span>
        <span className={styles.status}>
          <span className={styles.statusDot} />
          SISTEMA ACTIVO
        </span>
      </div>
    </footer>
  );
}
