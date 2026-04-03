import { FiSearch, FiSettings } from 'react-icons/fi';
import styles from './Header.module.scss';

interface HeaderProps {
  onMenuToggle: () => void;
  showMenuButton?: boolean;
}

export default function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  return (
    <header className={styles.header}>
      {showMenuButton && (
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          <FiSearch />
        </button>
      )}
      
      <div className={styles.title}>
        <span className={styles.titlePrefix}>&gt;</span>
        <span className={styles.titleText}>ATLAS CIBER-NEÓN</span>
        <span className={styles.titleCursor}>_</span>
      </div>

      <div className={styles.searchArea}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="BUSCAR PROTOCOLO..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionBtn} aria-label="Settings">
          <FiSettings />
        </button>
      </div>
    </header>
  );
}