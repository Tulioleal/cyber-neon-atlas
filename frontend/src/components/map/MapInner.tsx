'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_CONFIG = {
  center: [20, 0] as [number, number],
  zoom: 2,
  minZoom: 2,
  maxZoom: 18,
};

const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function MapController({ children }: { children?: React.ReactNode }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.style.background = 'colors.background';
  }, [map]);

  return <>{children}</>;
}

export default function MapInner({ children }: { children?: React.ReactNode }) {
  const mapRef = useRef<L.Map>(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        ref={mapRef}
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        maxBoundsViscosity={1}
        maxBounds={L.latLngBounds([-90, -180], [90, 180])}
        zoomControl={false}
        zoomSnap={0.25}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <MapController>{children}</MapController>
        <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background: colors.background !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 0 15px colorsWithAlpha.primary(0.2) !important;
        }
        .leaflet-control-zoom a {
          background: colors.surfaceContainerLow !important;
          color: colors.primary !important;
          border: 1px solid colorsWithAlpha.primary(0.3) !important;
        }
        // .leaflet-control-zoom a:hover {
        //   background: colors.surfaceContainerHigh !important;
        //   box-shadow: 0 0 8px colorsWithAlpha.primary(0.4);
        // }
        .leaflet-control-attribution {
          background: colorsWithAlpha.background(0.8) !important;
          color: colors.onSurfaceVariant !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: colors.primary !important;
        }
      `}</style>
    </div>
  );
}
