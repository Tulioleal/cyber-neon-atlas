import Link from 'next/link';
import styles from './NavItem.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { colors } from '@/utils/colors';

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
    <Link href={href} aria-current={active ? 'page' : undefined}>
      <motion.span
        className={styles.navItem}
        initial={{
          background: 'transparent',
          color: active ? colors.primaryFixed : colors.onSurface,
        }}
        whileHover={{
          background: colors.surfaceContainerHigh,
          color: colors.primaryFixed,
        }}
        exit={{
          background: 'transparent',
          color: active ? colors.primaryFixed : colors.onSurface,
        }}
        transition={{ duration: 0.05 }}
      >
        <span className={styles.icon}>{icon}</span>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className={styles.label}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.1, delay: collapsed ? 0.2 : 0 }}
            >
              {' '}
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          className={styles.indicator}
          animate={{ background: active ? colors.primaryFixed : 'transparent' }}
          transition={{ duration: 0.5, ease: 'backIn' }}
        />
      </motion.span>
    </Link>
  );
}
