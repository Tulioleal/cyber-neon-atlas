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

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function MapController({ children }: { children?: React.ReactNode }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.style.background = '#0d0e13';
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
          background: #0d0e13 !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 0 15px rgba(0, 255, 209, 0.2) !important;
        }
        .leaflet-control-zoom a {
          background: #121319 !important;
          color: #00ffd1 !important;
          border: 1px solid rgba(0, 255, 209, 0.3) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #1e1f26 !important;
          box-shadow: 0 0 8px rgba(0, 255, 209, 0.4);
        }
        .leaflet-control-attribution {
          background: rgba(13, 14, 19, 0.8) !important;
          color: #abaab1 !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: #00ffd1 !important;
        }
      `}</style>
    </div>
  );
}