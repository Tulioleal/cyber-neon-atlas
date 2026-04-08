import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { colors, colorsWithAlpha } from '@/utils/colors';

interface CountryLayerProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onCountryClick: (feature: GeoJSON.Feature) => void;
}

export default function CountryLayer({
  geoJsonData,
  onCountryClick,
}: CountryLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData || !map) return;

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: {
        fillColor: 'transparent',
        fillOpacity: 0,
        stroke: true,
        color: colorsWithAlpha.primary(0.3), // primary color with 30% opacity
        weight: 1,
      },
      onEachFeature: (feature: GeoJSON.Feature, layer: L.Path) => {
        layer.on({
          mouseover: (e: L.LeafletEvent) => {
            const target = e.target as L.Path;
            target.setStyle({
              fillColor: colorsWithAlpha.primary(0.1), // primary color with 10% opacity
              fillOpacity: 1,
              color: colors.primary,
              weight: 1.5,
            });
            target.bringToFront();
            const el = target.getElement() as HTMLElement | null;
            if (el) el.style.cursor = 'pointer';
          },
          mouseout: (e: L.LeafletEvent) => {
            const target = e.target as L.Path;
            target.setStyle({
              fillColor: 'transparent',
              fillOpacity: 0,
              color: colorsWithAlpha.primary(0.3), // primary color with 30% opacity
              weight: 1,
            });
            const el = target.getElement() as HTMLElement | null;
            if (el) el.style.cursor = 'default';
          },
          click: () => {
            onCountryClick(feature);
          },
        });
      },
    });

    geoJsonLayer.addTo(map);

    return () => {
      if (geoJsonLayer && map.hasLayer(geoJsonLayer)) {
        map.removeLayer(geoJsonLayer);
      }
    };
  }, [geoJsonData, map, onCountryClick]);

  return null;
}
