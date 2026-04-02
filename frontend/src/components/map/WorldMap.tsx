'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryFeature {
  type: string;
  properties: {
    ADMIN: string;
    ISO_A3: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJsonData {
  type: string;
  features: CountryFeature[];
}

interface WorldMapProps {
  geoJsonData?: GeoJsonData;
  onCountryClick?: (countryCode: string) => void;
  onCountryHover?: (countryName: string | null) => void;
}

function MapController({ geoJsonData, onCountryClick, onCountryHover }: WorldMapProps) {
  const map = useMap();
  const geoJsonLayer = useRef<L.GeoJSON | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (geoJsonData && map) {
      if (geoJsonLayer.current) {
        map.removeLayer(geoJsonLayer.current);
      }

      geoJsonLayer.current = L.geoJSON(geoJsonData as any, {
        style: {
          fillColor: '#1e2028',
          fillOpacity: 0.6,
          color: '#2A2A35',
          weight: 1,
        },
        onEachFeature: (feature, layer) => {
          const countryCode = feature.properties.ISO_A3;
          const countryName = feature.properties.ADMIN;

          layer.on({
            click: () => {
              if (countryCode && countryCode !== '-99') {
                onCountryClick?.(countryCode);
              }
            },
            mouseover: (e) => {
              const target = e.target;
              target.setStyle({
                fillColor: '#00FFD1',
                fillOpacity: 0.8,
                color: '#00FFD1',
                weight: 2,
              });
              const latlng = e.latlng;
              const point = map.latLngToContainerPoint(latlng);
              setTooltip({ name: countryName, x: point.x, y: point.y });
              onCountryHover?.(countryName);
            },
            mousemove: (e) => {
              const latlng = e.latlng;
              const point = map.latLngToContainerPoint(latlng);
              setTooltip((prev) => prev ? { ...prev, x: point.x, y: point.y } : null);
            },
            mouseout: (e) => {
              const target = e.target;
              target.setStyle({
                fillColor: '#1e2028',
                fillOpacity: 0.6,
                color: '#2A2A35',
                weight: 1,
              });
              setTooltip(null);
              onCountryHover?.(null);
            },
          });
        },
      }).addTo(map);
    }

    return () => {
      if (geoJsonLayer.current) {
        map.removeLayer(geoJsonLayer.current);
      }
    };
  }, [geoJsonData, map, onCountryClick, onCountryHover]);

  useEffect(() => {
    if (map && !resetButtonRef.current) {
      const button = document.createElement('button');
      button.innerHTML = '&#x21BA; RESET';
      button.title = 'Reset map view';
      button.style.cssText = `
        background: #0d0e13;
        border: 1px solid #00FFD1;
        color: #00FFD1;
        padding: 8px 12px;
        font-size: 11px;
        font-family: 'Fira Code', monospace;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: all 0.2s ease;
      `;
      
      button.addEventListener('mouseenter', () => {
        button.style.boxShadow = '0 0 10px rgba(0, 255, 209, 0.5)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.boxShadow = 'none';
      });
      
      button.addEventListener('click', () => {
        map.flyTo([20, 0], 2, { duration: 1.5 });
      });

      const customControl = (L.control as any)({
        position: 'bottomright',
      });

      customControl.onAdd = () => {
        return button;
      };

      map.addControl(customControl);
      resetButtonRef.current = button;
    }
  }, [map]);

  if (!tooltip) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: tooltip.x + 15,
        top: tooltip.y + 15,
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
      {tooltip.name}
    </div>
  );
}

export default function WorldMap({ geoJsonData, onCountryClick, onCountryHover }: WorldMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: '#0d0e13',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#606060'
      }}>
        Initializing map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: '100%', height: '100%' }}
      minZoom={2}
      maxZoom={18}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController 
        geoJsonData={geoJsonData} 
        onCountryClick={onCountryClick}
        onCountryHover={onCountryHover}
      />
    </MapContainer>
  );
}
