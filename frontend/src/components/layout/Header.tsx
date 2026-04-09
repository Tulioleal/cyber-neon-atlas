import { FiSearch } from 'react-icons/fi';
import styles from './Header.module.scss';
import { motion } from 'motion/react';

interface HeaderProps {
  onMenuToggle: () => void;
  showMenuButton?: boolean;
}

export default function Header({
  onMenuToggle,
  showMenuButton = false,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {showMenuButton && (
        <button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <FiSearch />
        </button>
      )}

      <div className={styles.title}>
        <span className={styles.titlePrefix}>&gt;</span>
        <span className={styles.titleText}>ATLAS CIBER-NEÓN</span>
        <motion.span
          className={styles.titleCursor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            ease: 'anticipate',
            duration: 1,
          }}
        >
          _
        </motion.span>
      </div>
    </header>
  );
}
