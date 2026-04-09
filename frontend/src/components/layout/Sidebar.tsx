import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiGlobe, FiGitMerge, FiFilter, FiX } from 'react-icons/fi';
import styles from './Sidebar.module.scss';
import NavItem from '../navigation/NavItem';
import logo from '@/../public/logo.svg';
import Image from 'next/image';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <FiGlobe />, label: 'EXPLORAR', href: '/' },
  { icon: <FiGitMerge />, label: 'COMPARAR', href: '/versus' },
  { icon: <FiFilter />, label: 'FILTROS', href: '/filters' },
];

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({
  isOpen,
  isMobile,
  collapsed: externalCollapsed,
  onCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(JSON.parse(stored));
    }
  }, []);

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
    if (onCollapse) {
      onCollapse(newCollapsed);
    }
  };

  const isCollapsed =
    externalCollapsed !== undefined ? externalCollapsed : collapsed;

  const sidebarClasses = [
    styles.sidebar,
    isMobile && !isOpen ? styles.hidden : '',
    isCollapsed ? styles.collapsed : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={sidebarClasses}>
      <div className={styles.header}>
        {isCollapsed ? (
          <button
            className={styles.expandBtn}
            onClick={handleCollapseToggle}
            aria-label="Expand sidebar"
          >
            <Image src={logo} alt="Logo" className={styles.logoIcon} />
          </button>
        ) : (
          <div className={styles.logo}>
            <Image src={logo} alt="Logo" className={styles.logoIcon} />
            <span className={styles.logoText}>ATLAS</span>
          </div>
        )}
        <button
          className={styles.collapseBtn}
          onClick={handleCollapseToggle}
          aria-label="Collapse sidebar"
        >
          <FiX />
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            collapsed={isCollapsed}
          />
        ))}
      </nav>
      <div className={styles.footer}>
        <div className={styles.version}>
          <span>V.1.0.0</span>
          <span className={styles.statusDot} />
        </div>
      </div>
    </aside>
  );
}
