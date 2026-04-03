import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>
          <span className={styles.prefix}>&gt;</span> INICIAR ESCANEO_
        </h1>
        <p className={styles.description}>
          Sistema de inteligencia geográfica ATLAS CIBER-NEÓN preparado para análisis táctico.
        </p>
        <div className={styles.statusGrid}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>MAPA MUNDIAL</span>
            <span className={styles.statusValue}>ESPERA</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>BASE DE DATOS</span>
            <span className={styles.statusValue}>CONECTADO</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>TELEMETRÍA</span>
            <span className={styles.statusValue}>ACTIVA</span>
          </div>
        </div>
      </div>
    </div>
  );
}