'use client';

import { colors } from '@/utils/colors';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('@/components/map/MapClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.background,
        color: colors.primary,
        fontFamily: 'Fira Code, monospace',
        fontSize: '14px',
      }}
    >
      CARGANDO_TELEMETRÍA_MAPA...
    </div>
  ),
});

export default function Home() {
  return <MapClient />;
}
