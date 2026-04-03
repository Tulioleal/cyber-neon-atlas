import { TextareaHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function TextField({ 
  label, 
  error, 
  className, 
  id,
  ...props 
}: TextFieldProps) {
  const inputId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
  
  return (
    <div className={`${styles.textFieldWrapper} ${className || ''}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <textarea 
        id={inputId}
        className={`${styles.textField} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}