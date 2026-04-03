'use client';

import { useState, useEffect, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import ScanlineOverlay from '../effects/ScanlineOverlay';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      setSidebarCollapsed(JSON.parse(stored));
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const sidebarWidth = sidebarCollapsed ? 72 : 280;
  
  return (
    <div className={styles.layout}>
      <ScanlineOverlay />
      <Sidebar 
        isOpen={mobileMenuOpen} 
        isMobile={isMobile}
        onToggle={handleSidebarToggle}
      />
      <div 
        className={styles.content}
        style={{ 
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`
        }}
      >
        <Header 
          onMenuToggle={handleSidebarToggle} 
          showMenuButton={isMobile}
        />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
      {isMobile && mobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  );
}