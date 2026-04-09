import { motion } from 'framer-motion';
import styles from './Footer.module.scss';
import { colors, colorsWithAlpha } from '@/utils/colors';

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
          <motion.span
            className={styles.statusDot}
            initial={{
              background: colors.secondary,
              boxShadow: `0 0 8px ${colors.secondary}`,
            }}
            animate={{
              background: colorsWithAlpha.secondary(0.5),
              boxShadow: `0 0 12px ${colorsWithAlpha.secondary(0.5)}`,
            }}
            transition={{
              repeat: Infinity,
              ease: 'anticipate',
              duration: 1,
            }}
          />
          SISTEMA ACTIVO
        </span>
      </div>
    </footer>
  );
}
