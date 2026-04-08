'use client';

import { useState, useEffect, ReactNode } from 'react';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import ScanlineOverlay from '../effects/ScanlineOverlay';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarCollapsed(JSON.parse(stored));
    }
  }, []);

  const handleSidebarToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  };

  const sidebarWidth = sidebarCollapsed ? 72 : 280;

  return (
    <div className={styles.layout} suppressHydrationWarning>
      <ScanlineOverlay />
      <Sidebar
        isOpen={mobileMenuOpen}
        isMobile={isMobile}
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
      />
      <div
        className={styles.content}
        style={{
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <Header onMenuToggle={handleSidebarToggle} showMenuButton={isMobile} />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer sidebarWidth={sidebarWidth} />
      </div>
      {isMobile && mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
