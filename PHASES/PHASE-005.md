# Phase 5: Databank & Filters

## Overview

This phase implements the Databank page with advanced filtering capabilities. Users will be able to filter countries by language, currency, region, and subregion using multi-select filters. The filtered results display in a grid view with pagination, allowing for efficient data exploration across all countries.

## Features

- Filter UI with multi-select dropdowns
- Filter logic with AND combination
- Count display for matching countries
- Grid display with country cards
- Pagination functionality
- Clear all filters option
- Quick add to comparison

## Tasks

### Task 5.1: Databank Page Structure

**Feature:** Filter UI by language/currency/region
**Description:** Create the Databank page route and basic layout
**Deliverables:** Page structure with filter sidebar and results grid

#### Detailed Plan

1. Create `src/app/databank/page.tsx`:
   - Main page component
   - Two-column layout: Filters (left) and Results (right)
2. Create `src/components/databank/DatabankLayout/DatabankLayout.tsx`:
   - Container with header
   - Filter panel component
   - Results grid component
3. Create `src/components/databank/DatabankLayout/DatabankLayout.module.scss`:
   - Responsive: Filters collapse to drawer on mobile
   - Grid: Results in 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
   - Sticky filter panel on desktop
4. Add page header:
   - Title: "Databank"
   - Subtitle: "Explore all countries"
   - Result count display

---

### Task 5.2: Region Filter

**Feature:** Filter by Region
**Description:** Implement single-select region filter dropdown
**Deliverables:** Working region filter

#### Detailed Plan

1. Create `src/components/databank/filters/RegionFilter/RegionFilter.tsx`:
   - Single-select dropdown
   - Options: Africa, Americas, Asia, Europe, Oceania, Antarctic
2. Create `src/components/databank/filters/RegionFilter/RegionFilter.module.scss`:
   - Cyberpunk styled dropdown
   - Open/closed states
   - Option hover highlighting
3. Add region data:
   - Extract unique regions from country data
   - Sort alphabetically
   - Show count per region (e.g., "Europe (52)")
4. Implement selection:
   - Click to select region
   - Click again to deselect (toggle)
   - Only one region at a time

---

### Task 5.3: Subregion Filter

**Feature:** Filter by Subregion
**Description:** Implement subregion filter that updates based on selected region
**Deliverables:** Dynamic subregion filter

#### Detailed Plan

1. Create `src/components/databank/filters/SubregionFilter/SubregionFilter.tsx`:
   - Single-select dropdown
   - Options update based on Region selection
2. Create dynamic subregion options:
   - If no region selected: All subregions
   - If region selected: Only subregions in that region
   - Example: "Western Europe", "Eastern Europe", "Southern Europe"
3. Add subregion data:
   - Extract unique subregions from country data
   - Group by region
   - Show count per subregion
4. Handle cascade:
   - Changing region clears and updates subregion
   - "All Subregions" option when region selected
   - Disable subregion filter when no region selected

---

### Task 5.4: Language Filter

**Feature:** Filter by Language
**Description:** Implement multi-select language filter
**Deliverables:** Working multi-select language filter

#### Detailed Plan

1. Create `src/components/databank/filters/LanguageFilter/LanguageFilter.tsx`:
   - Multi-select dropdown with checkboxes
   - Search input for filtering options
   - Selected languages as removable chips
2. Create language data extraction:
   - Extract all unique languages from country data
   - Parse nested language objects
   - Format: "English (45)", "Spanish (25)"
3. Implement multi-select:
   - Checkbox to toggle each language
   - "Select All" option
   - Show selected count in label
4. Add search to filter:
   - Type to filter language options
   - Case-insensitive matching
   - "No results" message if no matches

---

### Task 5.5: Currency Filter

**Feature:** Filter by Currency
**Description:** Implement multi-select currency filter
**Deliverables:** Working multi-select currency filter

#### Detailed Plan

1. Create `src/components/databank/filters/CurrencyFilter/CurrencyFilter.tsx`:
   - Multi-select dropdown with checkboxes
   - Search input for filtering options
   - Selected currencies as removable chips
2. Create currency data extraction:
   - Extract all unique currencies from country data
   - Parse nested currency objects
   - Format: "USD - US Dollar (25)", "EUR - Euro (35)"
3. Implement multi-select:
   - Checkbox to toggle each currency
   - "Select All" option
   - Show selected count in label
4. Handle currency display:
   - Show code and full name
   - Show symbol if available

---

### Task 5.6: Filter Logic Implementation

**Feature:** Filter logic
**Description:** Implement combined filter logic with AND operation
**Deliverables:** Working filter application

#### Detailed Plan

1. Create `src/utils/filterUtils.ts`:
   - `filterCountries(countries, filters)` function
   - Apply all active filters with AND logic
2. Implement filter conditions:
   - Region: `country.region === filter.region`
   - Subregion: `country.subregion === filter.subregion`
   - Language: `Object.keys(country.languages).some(l => filter.languages.includes(l))`
   - Currency: `Object.keys(country.currencies).some(c => filter.currencies.includes(c))`
3. Add filter state to store:
   - `activeFilters` object in Zustand
   - Update on filter change
   - Clear individual or all filters
4. Optimize filtering:
   - Memoize filtered results
   - Debounce filter changes
   - Show loading for large filter operations

---

### Task 5.7: Filter Count Display

**Feature:** Filter count display
**Description:** Show count of matching countries for each filter option
**Deliverables:** Dynamic count badges

#### Detailed Plan

1. Calculate filter option counts:
   - For each region option, count matching countries
   - For each language, count countries with that language
   - For each currency, count countries with that currency
2. Display counts:
   - Show in parentheses: "English (45)"
   - Update dynamically as filters change
   - Gray out options with 0 results
3. Show total results count:
   - "Showing X of Y countries"
   - Update as filters are applied
   - Show "No results" message when empty
4. Add "No results" state:
   - Display message with suggestion
   - Suggest clearing some filters
   - Quick "Clear all" button

---

### Task 5.8: Country Grid Display

**Feature:** Grid display
**Description:** Create grid layout to display filtered countries
**Deliverables:** Country card grid

#### Detailed Plan

1. Create `src/components/country/CountryGrid/CountryGrid.tsx`:
   - CSS Grid container
   - Responsive columns based on viewport
   - Gap: 16px
2. Create `src/components/country/CountryCard/CountryCard.tsx`:
   - Display: Flag, Name, Region, Population, Capital
   - "View Details" link to profile
   - "Compare" button to add to versus
3. Style grid:
   - Desktop: 4 columns
   - Tablet: 3 columns
   - Mobile: 2 columns
   - Extra small: 1 column
4. Add card hover effects:
   - Border color change to cyan
   - Subtle lift animation
   - Show additional actions

---

### Task 5.9: Pagination Component

**Feature:** Pagination
**Description:** Implement pagination with configurable page size
**Deliverables:** Working pagination

#### Detailed Plan

1. Create `src/components/common/Pagination/Pagination.tsx`:
   - Page numbers display
   - Previous/Next buttons
   - Items per page selector
   - "Go to page" input
2. Create pagination logic:
   - Default 20 items per page
   - Options: 10, 20, 50, 100
   - Calculate total pages
   - Handle edge cases (first/last page)
3. Style pagination:
   - Cyberpunk styling
   - Active page highlighted with cyan
   - Disabled buttons for first/last
4. Implement URL-based pagination:
   - Update URL params (?page=2)
   - Allow bookmarking specific pages
   - Handle page refresh

---

### Task 5.10: Clear Filters Functionality

**Feature:** Clear all filters button
**Description:** Add button to reset all filters at once
**Deliverables:** Working clear filters

#### Detailed Plan

1. Add "Clear All Filters" button:
   - Position: Top of filter panel
   - Only visible when any filter active
   - Show count of active filters
2. Implement clear action:
   - Reset all filter states to initial
   - Clear URL params
   - Scroll to top of results
   - Show confirmation toast
3. Add individual filter clear:
   - X button on each selected filter
   - Clear single filter while keeping others
4. Add "Reset" to page header:
   - "Reset filters" button
   - Works from anywhere in page

---

### Task 5.11: Quick Add to Comparison

**Feature:** Quick-action to add filtered results to Versus
**Description:** Add button to add all filtered countries to comparison
**Deliverables:** Working quick comparison

#### Detailed Plan

1. Add "Add All to Compare" button:
   - Position: Above results grid
   - Shows count: "Add X countries to compare"
   - Disabled if 0 or > 3 results
2. Implement add logic:
   - If 1-3 results: Add directly to comparison
   - If >3 results: Show modal to select which
   - Navigate to Versus page after add
3. Create selection modal:
   - Checkbox list of filtered countries
   - Select up to 3
   - "Add Selected" button
4. Handle duplicates:
   - Don't add countries already in comparison
   - Show warning for duplicates

---

### Task 5.12: Sort Functionality

**Feature:** Data sorting
**Description:** Add sorting options for results
**Deliverables:** Working sort

#### Detailed Plan

1. Add sort dropdown:
   - Position: Above results grid
   - Options: Name (A-Z), Name (Z-A), Population (High to Low), Population (Low to High), Area (High to Low), Area (Low to High)
2. Implement sorting logic:
   - Sort filtered results array
   - Default: Name (A-Z)
3. Add sort indicator:
   - Arrow icon showing sort direction
   - Click to toggle direction
4. Persist sort preference:
   - Save in URL params
   - Remember across sessions

---

### Task 5.13: URL Sync for Filters

**Feature:** Filter URL sync
**Description:** Sync filter state with URL parameters
**Deliverables:** Shareable filter URLs

#### Detailed Plan

1. Implement URL parameters:
   - region=Europe
   - subregion=Western+Europe
   - languages=English,Spanish
   - currencies=USD,EUR
   - page=2
   - sort=population-desc
2. Parse URL on page load:
   - Apply filters from URL
   - Set initial page and sort
3. Update URL on filter change:
   - Use router.replace with params
   - Avoid full page reload
   - Enable browser back/forward
4. Add share button:
   - Copy URL to clipboard
   - Show toast confirmation
   - Include all filter state

---

## Technical Notes

- Use React Query or SWR for data fetching and caching
- Implement virtual scrolling for large result sets (optional)
- Use proper loading states for filter operations
- Ensure accessibility for filter controls (ARIA labels, keyboard navigation)
- Implement proper keyboard support for multi-select (Space to toggle, Enter to confirm)
- Use URL search params for shareability

## Success Criteria

- [ ] All four filter types work correctly
- [ ] Multi-select filters allow multiple selections
- [ ] Filter logic combines with AND operation
- [ ] Counts update correctly for each filter option
- [ ] Grid displays country cards properly
- [ ] Pagination works with correct page counts
- [ ] Clear filters resets all filter state
- [ ] Quick add to comparison works
- [ ] Sort functionality works correctly
- [ ] URL reflects filter state and can be shared
