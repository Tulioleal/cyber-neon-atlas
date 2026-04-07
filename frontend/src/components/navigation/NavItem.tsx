import Link from 'next/link';
import styles from './NavItem.module.scss';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

export default function NavItem({
  icon,
  label,
  href,
  active = false,
  collapsed = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`${styles.navItem} ${active ? styles.active : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      {!collapsed && <span className={styles.label}>{label}</span>}
      {active && <span className={styles.indicator} />}
    </Link>
  );
}
