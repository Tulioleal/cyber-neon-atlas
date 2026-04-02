'use client';

import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapResetButtonProps {
  className?: string;
}

export default function MapResetButton({ className }: MapResetButtonProps) {
  const map = useMap();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controlRef = useRef<L.Control | null>(null);

  useEffect(() => {
    if (buttonRef.current && !controlRef.current) {
      const CustomControl = L.Control.extend({
        onAdd: () => {
          return buttonRef.current!;
        },
      });

      controlRef.current = new CustomControl({
        position: 'bottomright',
      });

      map.addControl(controlRef.current);
    }

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
    };
  }, [map]);

  const handleReset = () => {
    map.flyTo([20, 0], 2, {
      duration: 1.5,
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleReset}
      style={{
        background: '#0d0e13',
        border: '1px solid #00FFD1',
        color: '#00FFD1',
        padding: '8px 12px',
        fontSize: '12px',
        fontFamily: 'Fira Code, monospace',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        transition: 'all 0.2s ease',
        display: 'none',
      }}
      title="Reset map view"
    >
      Reset View
    </button>
  );
}
