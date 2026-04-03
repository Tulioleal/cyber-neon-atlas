## Phase 3: Map & Search

### Overview

Implement interactive map and search functionality. This phase integrates Leaflet for map visualization and builds the smart search with autocomplete.

### Features

1. Interactive World Map
2. Country Selection
3. Smart Search with Autocomplete

### Tasks

**3.1 Integrate Leaflet Map**

- Install leaflet and react-leaflet
- Create MapContainer component
- Configure map tiles with custom styling
- Set up initial map center and zoom

**3.2 Render Country Boundaries**

- Fetch country GeoJSON data
- Implement country polygon rendering
- Add styling for country fill/stroke
- Optimize rendering for performance

**3.3 Implement Country Click Selection**

- Add click event handlers to country layers
- Update country store on selection
- Implement visual feedback on hover
- Add zoom animation on selection

**3.4 Build Search with Autocomplete**

- Create SearchBar component
- Implement debounced search input
- Create dropdown with autocomplete results
- Add keyboard navigation for results

**3.5 Implement Map Zoom-to-Country**

- Add zoomToCountry function in map utils
- Implement smooth pan and zoom animation
- Handle edge cases for small countries
- Add bounds padding for viewport

**3.6 Add Country Tooltip on Hover**

- Create Tooltip component
- Show country name on hover
- Display basic info (capital, region)
- Implement tooltip positioning logic

### Detailed Plan

1. 3.1.1 Install dependencies: `npm install leaflet react-leaflet @types/leaflet`
1. 3.1.2 Create src/components/map/MapContainer.tsx
1. 3.1.3 Configure tile layer with CartoDB Dark Matter tiles
1. 3.1.4 Set default view to lat: 20, lng: 0, zoom: 2
1. 3.1.5 Add map attribution and controls

1. 2.1 Fetch GeoJSON from <https://raw.githubusercontent.com/djaiss/mapsicle/master/all.geo.json> or use natural earth data
2.2 Create CountryLayer component to render all countries
2.3 Style countries with default fill (transparent) and stroke (cyan)
2.4 Use useMemo to optimize GeoJSON parsing
2.5 Implement layer caching for performance

1. 3.1 Add onEachFeature callback to GeoJSON layer
3.2 On click: dispatch to country store setSelectedCountry
3.3 Add mouseOver/mouseOut for hover states
3.4 Use feature.properties.name for country name
3.5 Implement setFeatureStyle for visual feedback

1. 4.1 Create src/components/search/SearchBar.tsx
4.2 Implement useDebounce hook (300ms delay)
4.3 Create SearchResults dropdown component
4.4 Add arrow key navigation and enter to select
4.5 Highlight matching text in results

1. 5.1 Create map utils: src/utils/mapUtils.ts
5.2 Implement fitBounds with country bounds
5.3 Use map.flyTo for smooth animation
5.4 Handle countries that span multiple bounds
5.5 Add 50px padding to prevent edge touching

1. 6.1 Create Tooltip component using Leaflet tooltip
6.2 Show country name, capital, and region
6.3 Style tooltip with cyberpunk theme
6.4 Implement smart positioning (flip if near edge)
6.5 Add delay before showing (200ms)
