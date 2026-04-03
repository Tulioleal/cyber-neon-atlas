import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled,
  children,
  className,
  ...props 
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      <span className={loading ? styles.hiddenText : ''}>{children}</span>
    </button>
  );
}