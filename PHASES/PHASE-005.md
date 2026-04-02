# PHASE-005: Databank & Filters

## Overview
This phase implements the Databank feature - a comprehensive data exploration page with advanced filtering capabilities. Users can filter countries by Language, Currency, Region, and Subregion using multi-select dropdowns with AND logic (a country must match all selected filters). The filtered results display in a responsive grid with pagination, allowing users to browse through large datasets efficiently. This phase delivers the most powerful data discovery tool in the application.

## Features
- Filter UI Components
- Multi-Select Filter Logic (AND)
- Filter by Language, Currency, Region, Subregion
- Grid Display with Pagination
- Sort Functionality

## Tasks

### Filter UI Components
- [ ] Task 1.1: Create FilterPanel component container for all filters
- [ ] Task 1.2: Build MultiSelectDropdown component with checkbox-style selection
- [ ] Task 1.3: Implement dropdown open/close with click outside to close
- [ ] Task 1.4: Add search within filter dropdown for large lists (e.g., languages)
- [ ] Task 1.5: Create "Clear All Filters" button and individual filter clear buttons
- [ ] Task 1.6: Show active filter count badge on filter button
- [ ] Task 1.7: Style filters with cyberpunk theme (neon borders, dark background)

### Multi-Select Filter Logic (AND)
- [ ] Task 2.1: Implement filter state in Zustand store (selectedLanguages, selectedCurrencies, etc.)
- [ ] Task 2.2: Create filter processor function that applies all active filters
- [ ] Task 2.3: Use AND logic: country must have ALL selected values in each category
- [ ] Task 2.4: Handle partial matches (e.g., language code matches any of selected languages)
- [ ] Task 2.5: Implement filter result caching to avoid re-processing on same filters
- [ ] Task 2.6: Add filter change detection to reset pagination to page 1
- [ ] Task 2.7: Show "No results" message with suggestions when filters return empty

### Filter by Language, Currency, Region, Subregion
- [ ] Task 3.1: Extract unique languages from all countries (create Language[] type with name and count)
- [ ] Task 3.2: Extract unique currencies from all countries (code, name, symbol)
- [ ] Task 3.3: Extract unique regions (Africa, Americas, Asia, Europe, Oceania) from countries
- [ ] Task 4.4: Extract unique subregions (Western Europe, South America, etc.) from countries
- [ ] Task 3.5: Create filter option lists sorted alphabetically with country count
- [ ] Task 3.6: Add "Select All" option for each filter category
- [ ] Task 3.7: Implement quick filter chips for popular options (English, USD, Europe)

### Grid Display with Pagination
- [ ] Task 4.1: Create CountryGrid component using CSS Grid with responsive columns (1-4 based on viewport)
- [ ] Task 4.2: Implement Pagination component with page numbers, prev/next buttons
- [ ] Task 4.3: Add items per page selector (12, 24, 48 options)
- [ ] Task 4.4: Show "Showing X-Y of Z countries" text
- [ ] Task 4.5: Add keyboard navigation (arrow keys between grid items)
- [ ] Task 4.6: Implement client-side pagination for performance (no server round-trips)
- [ ] Task 4.7: Add "Go to page" input for direct page jump

### Sort Functionality
- [ ] Task 5.1: Add sort dropdown with options: Name (A-Z, Z-A), Population (High-Low, Low-High), Area, Region
- [ ] Task 5.2: Implement sort logic in data processing layer
- [ ] Task 5.3: Preserve sort preference in URL query params for shareability
- [ ] 5.4: Add sort indicator icons showing active sort direction
- [ ] Task 5.5: Combine sorting with filters (apply sort after filtering)

## Detailed Plan

### Filter Panel Implementation
1. **Component Structure**: Create `src/components/databank/FilterPanel.tsx` containing all filter dropdowns
2. **MultiSelect Component**: Build `src/components/ui/MultiSelect.tsx` with checkbox list, search, select all
3. **Filter State**: Extend Zustand `useFilterStore` with { language: string[], currency: string[], region: string[], subregion: string[] }
4. **Filter Processor**: Create `filterCountries(countries, filters)` function that iterates through all countries applying each filter
5. **Optimization**: Use useMemo for filtered results to prevent unnecessary recalculation on re-renders

### Filter Options Data
1. **Data Extraction**: On initial load, process all countries to extract unique values for each filter type
2. **Option Objects**: Create filter options as { value: string, label: string, count: number } format
3. **Caching**: Store extracted filter options in state to avoid recalculation
4. **Search**: Add inline search for dropdowns with >10 options (languages, currencies, subregions)

### Grid and Pagination Implementation
1. **Grid Layout**: Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` for responsive cards
2. **Pagination Logic**: Create usePagination hook with { page, perPage, total } returning { startIndex, endIndex, totalPages }
3. **Page Change**: On page change, scroll to top of grid with smooth behavior
4. **URL Sync**: Update URL params (?page=2&sort=population-desc) for shareable filtered views

### Sort Implementation
1. **Sort Options**: Create const SORT_OPTIONS = [{ key: 'name', direction: 'asc' }, { key: 'population', direction: 'desc' }, ...]
2. **Sort Function**: Implement sortCountries(countries, sortKey, direction) using Array.sort()
3. **Combined Pipeline**: Apply filters first, then sort, then paginate to get display results

## Dependencies
- **External**: None additional required
- **Internal**: PHASE-001 UI components, PHASE-003 country data types, existing search component, Zustand store

## Deliverables
- Complete filter panel with Language, Currency, Region, and Subregion filters
- Multi-select dropdowns with AND logic and search within dropdown
- Active filter count badges and clear all functionality
- Responsive country grid with proper card display
- Full pagination with page numbers, items per page selector, and result counts
- Sort functionality (Name, Population, Area) with direction indicators
- URL-synced filter and sort state for shareable links
- "No results" state with helpful suggestions