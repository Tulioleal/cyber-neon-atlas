import { ReactNode } from 'react';
import styles from './NavMenu.module.scss';

interface NavMenuProps {
  title?: string;
  children: ReactNode;
}

export default function NavMenu({ title, children }: NavMenuProps) {
  return (
    <div className={styles.navMenu}>
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.items}>{children}</div>
    </div>
  );
}
