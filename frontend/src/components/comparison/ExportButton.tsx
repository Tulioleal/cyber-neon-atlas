'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import styles from './ExportButton.module.scss';
import { colors } from '@/utils/colors';

interface ExportButtonProps {
  comparisonRef: React.RefObject<HTMLDivElement | null>;
  country1Code?: string;
  country2Code?: string;
}

export default function ExportButton({
  comparisonRef,
  country1Code,
  country2Code,
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExportPNG = async () => {
    if (!comparisonRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(comparisonRef.current, {
        backgroundColor: colors.background,
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `versus_${country1Code}_vs_${country2Code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
    setLoading(false);
  };

  const handleCopyURL = () => {
    const url = new URL(window.location.href);
    if (country1Code) url.searchParams.set('c1', country1Code);
    if (country2Code) url.searchParams.set('c2', country2Code);
    navigator.clipboard.writeText(url.toString());
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleExportPNG}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'PROCESSING...' : 'EXPORT ANALYSIS'}
      </button>
      <button onClick={handleCopyURL} className={styles.secondary}>
        COPY URL
      </button>
    </div>
  );
}
