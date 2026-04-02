'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: '#0d0e13',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#00FFD1',
      fontFamily: 'Fira Code, monospace'
    }}>
      Loading map tiles...
    </div>
  ),
});
