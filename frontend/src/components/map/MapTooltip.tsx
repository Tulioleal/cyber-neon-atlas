'use client';

import { useEffect, useState } from 'react';

interface MapTooltipProps {
  countryName: string | null;
  position: { x: number; y: number };
}

export default function MapTooltip({ countryName, position }: MapTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!countryName);
  }, [countryName]);

  if (!isVisible || !countryName) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + 15,
        top: position.y + 15,
        background: '#0d0e13',
        border: '1px solid #00FFD1',
        padding: '8px 12px',
        color: '#E8E8E8',
        fontSize: '14px',
        fontFamily: 'Space Mono, monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        zIndex: 1000,
        pointerEvents: 'none',
        boxShadow: '0 0 10px rgba(0, 255, 209, 0.3)',
      }}
    >
      {countryName}
    </div>
  );
}
