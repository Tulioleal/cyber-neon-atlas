# Phase 2: Home Page & Map Integration

## Overview

This phase focuses on building the core Home page with interactive map integration, global navigation, sidebar functionality, and country search with autocomplete. The user will be able to explore the world map, click on countries to see their data, and search for specific countries.

## Features

- Interactive world map with Leaflet.js
- Country click handling and data display
- Sidebar with search and quick stats
- Smart search with debounced autocomplete
- Home dashboard with country statistics
- Map fly-to and zoom functionality
- Country hover tooltips with flag preview

## Tasks

### Task 2.1: Leaflet Map Integration

**Feature:** Interactive map
**Description:** Set up Leaflet map with custom cyberpunk-styled tiles and country polygons
**Deliverables:** Interactive world map with proper styling

#### Detailed Plan

1. Install Leaflet and react-leaflet: `npm install leaflet react-leaflet`
2. Create `src/components/map/WorldMap/WorldMap.tsx`:
   - Initialize MapContainer with center [20, 0] and zoom 2
   - Add TileLayer with OpenStreetMap tiles
   - Implement custom cyberpunk tile styling via CSS filters
3. Create `src/components/map/WorldMap/WorldMap.module.scss`:
   - Apply dark filter to map tiles for cyberpunk look
   - Add neon border effects to map container
   - Style zoom controls with cyan accent
4. Add custom map controls:
   - Zoom in/out buttons with neon styling
   - Reset view button to return to global view
   - Map attribution styled to be less prominent

---

### Task 2.2: Country Polygons & Click Handling

**Feature:** Interactive map
**Description:** Fetch GeoJSON data for country borders and implement click handling
**Deliverables:** Clickable country polygons with hover states

#### Detailed Plan

1. Create `src/services/geoService.ts`:
   - Fetch country GeoJSON from natural earth data or similar source
   - Cache GeoJSON data for performance
2. Create `src/components/map/CountryPolygon/CountryPolygon.tsx`:
   - Render country borders using GeoJSON layer
   - Style borders with neon cyan color (#00FFD1)
   - Add hover effect: border color intensifies
3. Implement click handler:
   - On country click, extract country code from GeoJSON properties
   - Fetch country data from REST Countries API
   - Update store with selected country
4. Add country label on hover:
   - Show country name tooltip
   - Display flag emoji in tooltip

---

### Task 2.3: Global Navigation Header

**Feature:** Global navigation
**Description:** Implement fixed top navigation bar with logo and menu links
**Deliverables:** Navigation bar with active page indicator

#### Detailed Plan

1. Update `src/components/layout/Header/Header.tsx`:
   - Logo: "ATLAS CIBER-NEÓN" in Space Mono font with neon glow
   - Navigation links: Home, Versus, Databank
   - Use react-icons for navigation icons
2. Implement active page indicator:
   - Neon underline effect on active link
   - Cyan color (#00FFD1) for underline
   - CSS transition for hover effects
3. Add responsive hamburger menu:
   - For viewport < 640px
   - Slide-in menu from right
   - Animated hamburger icon (three lines to X)
4. Style header:
   - Fixed position at top, 64px height
   - Background: #0d0e13 with bottom border
   - Z-index: 1000 to stay above map

---

### Task 2.4: Sidebar with Search

**Feature:** Global navigation
**Description:** Create sidebar component with search input and quick stats display
**Deliverables:** Functional sidebar with search functionality

#### Detailed Plan

1. Update `src/components/layout/Sidebar/Sidebar.tsx`:
   - Width: 280px fixed
   - Background: #0d0e13 with border
   - Contains: Search input, Quick stats, Navigation
2. Create search section:
   - Search input field with search icon
   - Placeholder: "Search country..."
   - Focus state with cyan border glow
3. Create quick stats section:
   - Total countries count
   - Top 5 most populous countries
   - Top 5 largest countries by area
   - Display in cyberpunk styled list
4. Create navigation shortcuts:
   - Quick links to key pages
   - Active indicator for current page

---

### Task 2.5: Search with Autocomplete

**Feature:** Country search with autocomplete
**Description:** Implement debounced search with autocomplete dropdown
**Deliverables:** Fully functional country search

#### Detailed Plan

1. Create `src/components/country/CountrySearch/CountrySearch.tsx`:
   - Input component with search icon
   - Debounce: 300ms delay before filtering
2. Create `src/components/country/CountrySearch/CountrySearch.module.scss`:
   - Dropdown container with max-height
   - Result items with flag + name
   - Hover state with background color change
   - Keyboard navigation highlighting
3. Implement search logic:
   - Filter countries by name (case-insensitive, partial match)
   - Display up to 8 suggestions
   - Show "No results found" when no matches
4. Implement keyboard navigation:
   - Arrow keys to navigate results
   - Enter to select highlighted result
   - Escape to close dropdown
   - Tab to move focus
5. Add clear button:
   - X icon to clear search input
   - Appears when input has value
   - Resets search state

---

### Task 2.6: Map Fly-to and Zoom

**Feature:** Country search with autocomplete
**Description:** On search selection, animate map to fly to selected country
**Deliverables:** Smooth map animation to country location

#### Detailed Plan

1. Get country coordinates from:
   - Capital lat/lng from REST Countries API
   - Or centroid of country boundaries from GeoJSON
2. Implement map.flyTo() animation:
   - Duration: 2 seconds
   - EaseLineTo easing for smooth motion
   - Zoom to appropriate level based on country size
3. Create country zoom levels:
   - Large countries: zoom 3-4
   - Medium countries: zoom 5-6
   - Small countries/islands: zoom 7-8
4. Add pan animation for country click:
   - When clicking country on map
   - Fly to country bounds with padding
5. Handle edge cases:
   - Countries that span date line
   - Countries with multiple territories

---

### Task 2.7: Country Selection Display

**Feature:** Interactive map
**Description:** Display selected country data in sidebar or overlay
**Deliverables:** Country card showing key information

#### Detailed Plan

1. Create `src/components/country/CountryCard/CountryCard.tsx`:
   - Display: Flag, Name, Capital, Region, Population
   - "View Details" button linking to profile page
   - "Add to Compare" button for versus mode
2. Style card with cyberpunk aesthetics:
   - Background: #16181f
   - Border: 1px solid #2A2A35, cyan on hover
   - Neon glow on hover
3. Create country card state:
   - Loading state with spinner
   - Error state with retry button
   - Empty state when no country selected
4. Position card:
   - In sidebar for desktop
   - Bottom sheet for mobile
   - Animate slide-in when country selected

---

### Task 2.8: Home Dashboard Stats

**Feature:** Home dashboard with stats
**Description:** Display global statistics and interesting country facts
**Deliverables:** Dashboard with multiple stat widgets

#### Detailed Plan

1. Create dashboard components:
   - Total countries in database
   - Total world population (sum of all countries)
   - Total world area (sum in km²)
   - Countries by region breakdown
2. Create stat widgets:
   - Small cards with icon + number + label
   - Animated count-up on load
   - Cyberpunk styling with borders
3. Create region distribution chart:
   - Simple bar chart showing countries per region
   - Use Recharts library
   - Style with green neon bars
4. Add "Quick Facts" section:
   - Random interesting country facts
   - Rotate every 10 seconds
   - Click to view that country

---

### Task 2.9: Map Reset Functionality

**Feature:** Interactive map
**Description:** Button to reset map to global view
**Deliverables:** Working reset map button

#### Detailed Plan

1. Add reset button to map controls:
   - Position: top-right corner
   - Icon: globe or reset icon
   - Style: cyan border, transparent background
2. Implement reset action:
   - Set map center to [20, 0]
   - Set zoom level to 2
   - Clear selected country
   - Smooth animation to reset position
3. Add keyboard shortcut:
   - Press "R" key to reset map
   - Show tooltip hint on hover

---

### Task 2.10: Loading and Error States

**Feature:** Interactive map
**Description:** Handle loading and error states for API calls
**Deliverables:** Graceful error handling with user feedback

#### Detailed Plan

1. Implement loading states:
   - Show spinner when fetching country data
   - Skeleton loader for map tiles loading
   - Progress indicator for initial data load
2. Implement error handling:
   - API failure: Show toast with retry button
   - Invalid country: Show "Country not found" message
   - Network offline: Show cached data + offline indicator
3. Create error components:
   - `src/components/common/Error/Error.tsx`
   - Reusable error display with icon, message, retry button
4. Add toast notifications:
   - Use react-hot-toast or custom implementation
   - Position: bottom-right
   - Auto-dismiss after 5 seconds

---

## Technical Notes

- Map must be client-side rendered with "use client" directive
- Use dynamic imports for Leaflet to avoid SSR issues
- Implement proper cleanup of map instances on unmount
- Cache GeoJSON data to avoid repeated fetches
- Use React.memo for map components to prevent unnecessary re-renders
- Ensure keyboard accessibility for all interactive elements

## Success Criteria

- [ ] Map renders with cyberpunk styling
- [ ] Countries are clickable and show data
- [ ] Search autocomplete shows up to 8 results
- [ ] Keyboard navigation works in search
- [ ] Map animates smoothly to selected country
- [ ] Sidebar displays correctly with search
- [ ] Dashboard stats load and display
- [ ] Reset button returns to global view
- [ ] Loading and error states work correctly
- [ ] Mobile responsive layout functions properly
