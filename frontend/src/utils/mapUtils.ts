import L from 'leaflet';

export const zoomToCountry = (
  map: L.Map,
  bounds: L.LatLngBoundsExpression,
  options?: {
    padding?: [number, number];
    maxZoom?: number;
    duration?: number;
  }
): void => {
  const padding = options?.padding ?? [50, 50];
  const maxZoom = options?.maxZoom ?? 8;
  const duration = options?.duration ?? 1.5;

  map.flyToBounds(bounds, {
    padding,
    maxZoom,
    duration,
    easeLinearity: 0.25,
  });
};

export const fitBounds = (
  map: L.Map,
  bounds: L.LatLngBoundsExpression,
  options?: {
    padding?: [number, number];
    maxZoom?: number;
  }
): void => {
  const padding = options?.padding ?? [50, 50];
  const maxZoom = options?.maxZoom ?? 8;

  map.fitBounds(bounds, {
    padding,
    maxZoom,
  });
};

export const getCountryBounds = (
  geoJson: GeoJSON.Feature,
  countryCode: string
): L.LatLngBoundsExpression | null => {
  const geometry = geoJson.geometry;
  if (!geometry) return null;

  try {
    const layer = L.geoJSON(geoJson);
    return layer.getBounds();
  } catch {
    return null;
  }
};
