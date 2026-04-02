# PHASE-002: Map Explorer

## Overview
This phase implements the interactive map feature using Leaflet.js and react-leaflet. The map displays country boundaries with cyberpunk-styled tiles, supports click interactions to navigate to country profiles, shows hover labels with country names, and includes a reset button to return to the default view. Additionally, a smart search with debounced autocomplete is implemented to allow users to quickly find and navigate to countries. This phase delivers the primary interaction mechanism for the application.

## Features
- Interactive Leaflet Map with Cyberpunk Tiles
- Country Click Handling and Navigation
- Hover Labels with Country Names
- Map Reset Button
- Smart Search with Debounced Autocomplete
- Basic Country Cards Display

## Tasks

### Interactive Leaflet Map
- [ ] Task 1.1: Install and configure Leaflet with react-leaflet, including CSS imports
- [ ] Task 1.2: Find and integrate cyberpunk-styled map tiles (CartoDB Dark Matter or similar dark tiles)
- [ ] Task 1.3: Create MapContainer component with proper initial center coordinates (lat: 20, lng: 0) and zoom level (zoom: 2)
- [ ] Task 1.4: Implement country polygon/circle markers layer using country GeoJSON data
- [ ] Task 1.5: Add map controls customization (zoom buttons styled to match cyberpunk theme)
- [ ] Task 1.6: Implement map tile loading states and error handling

### Country Click Handling
- [ ] Task 2.1: Create country GeoJSON data source (convert REST Countries data or use separate GeoJSON file)
- [ ] Task 2.2: Implement onEachFeature callback for polygon mouse events
- [ ] Task 2.3: Add click event handler that extracts country code from clicked feature
- [ ] Task 2.4: Implement programmatic navigation to /country/[code] route using Next.js router
- [ ] Task 2.5: Add click feedback with visual highlight effect on selected country
- [ ] Task 2.6: Track selected country in Zustand store for global access

### Hover Labels
- [ ] Task 3.1: Implement mouseover event to show country name tooltip
- [ ] Task 3.2: Create custom tooltip component with cyberpunk styling (dark background, neon border)
- [ ] Task 3.3: Add mouseout event to hide tooltip
- [ ] Task 3.4: Add hover highlight effect (color change or glow) on country polygon
- [ ] Task 3.5: Optimize tooltip rendering to prevent performance issues with many features

### Map Reset Button
- [ ] Task 4.1: Create custom map control component for reset button
- [ ] Task 4.2: Implement reset functionality to restore initial view (center: [20, 0], zoom: 2)
- [ ] Task 4.3: Style reset button with cyberpunk theme (neon border, glow on hover)
- [ ] Task 4.4: Add smooth fly-to animation on reset using map.flyTo()
- [ ] Task 4.5: Add tooltip or label explaining reset button function

### Smart Search with Debounced Autocomplete
- [ ] Task 5.1: Create SearchInput component with input field and results dropdown
- [ ] Task 5.2: Implement debounce logic with 300ms delay using useEffect cleanup
- [ ] Task 5.3: Create search filtering function that matches country name (name.official, name.common)
- [ ] Task 5.4: Limit results to maximum 8 suggestions
- [ ] Task 5.5: Implement keyboard navigation (Arrow Up/Down, Enter to select, Escape to close)
- [ ] Task 5.6: Add click outside handler to close dropdown
- [ ] Task 5.7: Style search results with highlighted matching text
- [ ] Task 5.8: On selection, fly to country location on map using map.flyTo() with animation

### Basic Country Cards
- [ ] Task 6.1: Create CountryCard component for list display
- [ ] Task 6.2: Display key info: flag, name, region, population on card
- [ ] Task 6.3: Add click handler to navigate to country profile
- [ ] Task 6.4: Implement grid layout for multiple cards
- [ ] Task 6.5: Add hover effects with cyberpunk glow
- [ ] Task 6.6: Create card skeleton loading state

## Detailed Plan

### Interactive Leaflet Map Implementation
1. **Leaflet Setup**: Create `src/components/map/Map.tsx` using MapContainer from react-leaflet, fix Leaflet icon import issues in Next.js
2. **Tile Layer**: Use CartoDB Dark Matter tiles (https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png) as default with attribution
3. **Country Data**: Fetch country GeoJSON from REST Countries API or use local simplified world GeoJSON file in public/data/
4. **Feature Layer**: Use GeoJSON component to render country polygons with onEachFeature for events
5. **Performance**: Implement clustering for low zoom levels or use TopoJSON for smaller file size

### Country Click Handling Implementation
1. **GeoJSON Structure**: Ensure each feature has country code in properties (cca2, cca3)
2. **Event Handler**: Add onClick prop to GeoJSON layer that calls router.push(`/country/${code}`)
3. **Selection State**: Update Zustand store with selectedCountryCode, highlight in different color
4. **Visual Feedback**: Add active state style for clicked country (cyan border, increased opacity)

### Search Autocomplete Implementation
1. **Component Structure**: Create `src/components/search/SearchAutocomplete.tsx` with input, dropdown, and keyboard handlers
2. **Debounce Hook**: Implement custom useDebounce hook that delays search until 300ms after last keystroke
3. **Filter Logic**: Use String.includes() with toLowerCase() for case-insensitive matching against name.common and name.official
4. **Results Display**: Render suggestions in dropdown with country flag + name + region
5. **Selection**: On Enter or click, get country coordinates from data and call mapRef.current.flyTo()

### Map Reset Implementation
1. **Custom Control**: Create L.Control subclass or use custom div element positioned in map corner
2. **Fly Animation**: Use MapContainer's imperative methods via ref to call flyTo([20, 0], 2, { duration: 1.5 })
3. **Button Styling**: Match to cyberpunk theme with #00FFD1 border, dark background, hover glow effect

## Dependencies
- **External**: Leaflet, react-leaflet, GeoJSON data
- **Internal**: PHASE-001 design system components, API client, Zustand store

## Deliverables
- Fully functional interactive map with cyberpunk-styled dark tiles
- Country polygon rendering with click navigation to profiles
- Hover tooltips showing country names with neon styling
- Map reset button with fly-to animation
- Debounced search autocomplete with max 8 results and keyboard navigation
- Basic country cards with click-to-navigate functionality