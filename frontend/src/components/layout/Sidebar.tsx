import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGlobe, FiGitMerge, FiFilter, FiInfo, FiMenu, FiX } from 'react-icons/fi';
import styles from './Sidebar.module.scss';
import NavItem from '../navigation/NavItem';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <FiGlobe />, label: 'EXPLORAR', href: '/' },
  { icon: <FiGitMerge />, label: 'COMPARAR', href: '/versus' },
  { icon: <FiFilter />, label: 'FILTROS', href: '/filters' },
  { icon: <FiInfo />, label: 'ACERCA', href: '/about' },
];

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, isMobile, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      setCollapsed(JSON.parse(stored));
    }
  }, []);

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
  };

  const sidebarClasses = [
    styles.sidebar,
    isMobile && !isOpen ? styles.hidden : '',
    collapsed ? styles.collapsed : '',
  ].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClasses}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1"/>
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          {!collapsed && <span className={styles.logoText}>ATLAS</span>}
        </div>
        <button 
          className={styles.collapseBtn}
          onClick={handleCollapseToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className={styles.footer}>
        {!collapsed && (
          <div className={styles.version}>
            <span>V.1.0.0</span>
            <span className={styles.statusDot} />
          </div>
        )}
      </div>
    </aside>
  );
}