'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdPublic, MdCompareArrows, MdFilterList, MdMenu, MdClose } from 'react-icons/md';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: MdPublic },
    { href: '/versus', label: 'Versus', icon: MdCompareArrows },
    { href: '/databank', label: 'Databank', icon: MdFilterList },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ATLAS</span>
          <span className={styles.logoAccent}>CIBER-NEÓN</span>
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <link.icon className={styles.navIcon} />
              {link.label}
            </Link>
          ))}
        </nav>

        <button 
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>
    </header>
  );
};
