# Phase 3: Country Detail Page

## Overview

This phase implements the Country Profile page (Perfil) which displays comprehensive country information in a structured grid layout. Users will be able to view all data fields from the REST Countries API organized into logical sections with proper data formatting.

## Features

- Comprehensive country profile display
- Organized data sections (Basic Info, Demographics, Government, etc.)
- Economic and demographic data cards
- Geographic information display
- Data formatting utilities
- Direct navigation to Versus mode
- Flag and visual assets display

## Tasks

### Task 3.1: Profile Page Structure

**Feature:** Country profile display
**Description:** Create the profile page route and basic layout structure
**Deliverables:** Page structure ready for content

#### Detailed Plan

1. Create `src/app/perfil/[countryCode]/page.tsx`:
   - Dynamic route for country codes (e.g., /perfil/ES, /perfil/US)
   - Server component that fetches initial data
   - Client component for interactive elements
2. Create `src/components/country/CountryDetail/CountryDetail.tsx`:
   - Main container component
   - Header with country name and flag
   - Tabbed sections for different data categories
3. Create `src/components/country/CountryDetail/CountryDetail.module.scss`:
   - Grid layout for data cards
   - Section headers with cyan accent
   - Responsive two-column layout for desktop
4. Handle 404 for invalid country codes:
   - Custom 404 page with "Country not found" message
   - Link back to home or databank

---

### Task 3.2: Basic Information Section

**Feature:** Country profile display
**Description:** Display country name, capital, region, subregion, and continent
**Deliverables:** Basic info card with all fields

#### Detailed Plan

1. Create data card component:
   - Title: "Basic Information"
   - Icon: MdPublic (globe icon)
2. Display fields:
   - Official Name
   - Common Name
   - Capital City
   - Region (Africa, Americas, Asia, Europe, Oceania)
   - Subregion (e.g., Western Europe, Southeast Asia)
   - Continent
3. Format each field:
   - Show "N/A" for missing data
   - Bold labels with muted values
4. Style card:
   - Background: #0d0e13
   - Border: 1px solid #2A2A35
   - Padding: 20px

---

### Task 3.3: Demographics Section

**Feature:** Country profile display
**Description:** Display population, area, density, and ethnicity data
**Deliverables:** Demographics card with formatted numbers

#### Detailed Plan

1. Create demographics card:
   - Title: "Demographics"
   - Icon: MdPeople
2. Display and format fields:
   - Population: formatNumber() with commas (e.g., 47,000,000)
   - Area: formatArea() in km² (e.g., 550,000 km²)
   - Population Density: people per km² (population / area)
   - Ethnicity: List of ethnic groups (may be null)
3. Create derived calculations:
   - Calculate density from population and area
   - Rank country by population globally
4. Style with data visualization:
   - Show small sparkline or comparison for population

---

### Task 3.4: Government Section

**Feature:** Country profile display
**Description:** Display government type, independence status, UN membership
**Deliverables:** Government data card

#### Detailed Plan

1. Create government card:
   - Title: "Government"
   - Icon: MdAccountBalance
2. Display fields:
   - Government Type (e.g., Federal Republic, Constitutional Monarchy)
   - Independence Status (boolean, display "Independent" or "Territory")
   - UN Member Status (boolean)
   - Sovereign State Status (boolean)
   - CIA World Factbook ID (cioc)
   - FIFA Code
3. Format booleans:
   - "Yes" / "No" or "Member" / "Non-Member"
   - Use badge component for status
4. Style with status indicators:
   - Green badge for true
   - Red badge for false

---

### Task 3.5: Geography Section

**Feature:** Country profile display
**Description:** Display landlocked status, borders, and timezones
**Deliverables:** Geography card with border list

#### Detailed Plan

1. Create geography card:
   - Title: "Geography"
   - Icon: MdMap
2. Display fields:
   - Landlocked Status (boolean with icon)
   - Land Borders: List of country codes/names (e.g., "France, Germany, Italy")
   - Timezones: List of timezone strings
   - Capital Coordinates: lat/lng
3. Handle border display:
   - Show up to 10 borders, then "+X more"
   - Click border to navigate to that country
   - Show count of total borders
4. Handle timezones:
   - Display in standard format (e.g., UTC+1)
   - Show multiple timezones if applicable

---

### Task 3.6: Economy Section

**Feature:** Country profile display
**Description:** Display currencies, GDP (if available), and Gini coefficient
**Deliverables:** Economy card with currency display

#### Detailed Plan

1. Create economy card:
   - Title: "Economy"
   - Icon: MdAttachMoney
2. Display fields:
   - Currencies: Code, Name, Symbol (e.g., "USD - US Dollar ($)")
   - GDP: Note that API doesn't provide, show "Not available" if null
   - Gini Coefficient: Income inequality index (e.g., "38.5")
3. Handle multiple currencies:
   - Display all currencies if country has multiple
   - Show primary currency first
4. Format Gini:
   - If available, show as percentage
   - Display ranking context (e.g., "Medium inequality")

---

### Task 3.7: Culture Section

**Feature:** Country profile display
**Description:** Display languages, religions, and national holidays
**Deliverables:** Culture card with list displays

#### Detailed Plan

1. Create culture card:
   - Title: "Culture"
   - Icon: MdLanguage
2. Display fields:
   - Languages: Comma-separated list (e.g., "Spanish, Catalan, Basque")
   - Religions: Comma-separated list (e.g., "Christian 95%, Other 5%")
   - National Holiday: Name and date (if available)
3. Handle missing data:
   - Show "No data available" for null fields
   - Use muted text color
4. Create clickable language links:
   - Click language to filter databank by that language

---

### Task 3.8: Identity Section

**Feature:** Country profile display
**Description:** Display TLD, calling codes, ISO codes
**Deliverables:** Identity card with all identification codes

#### Detailed Plan

1. Create identity card:
   - Title: "Identity"
   - Icon: MdBadge
2. Display fields:
   - Top-Level Domain (TLD): e.g., ".es", ".us"
   - Calling Codes: e.g., "+34", "+1"
   - ISO 3166-1 alpha-2 (CCA2): e.g., "ES"
   - ISO 3166-1 alpha-3 (CCA3): e.g., "ESP"
   - ISO 3166-1 numeric (CCN3): e.g., "724"
   - CIA World Factbook (CIOC): e.g., "SPA"
   - FIFA Code: e.g., "ESP"
3. Format calling codes:
   - Display with + prefix
   - Show all if multiple
4. Add copy-to-clipboard:
   - Click to copy any code value

---

### Task 3.9: Visual Assets Section

**Feature:** Country profile display
**Description:** Display flag, coat of arms, and map links
**Deliverables:** Visual assets with external links

#### Detailed Plan

1. Create visuals card:
   - Title: "Visuals"
   - Icon: MdImage
2. Display flag:
   - Large SVG flag display
   - Download link for flag image
   - Alt text with country name
3. Display coat of arms:
   - Image if available from API
   - Placeholder if not available
4. Add map links:
   - Google Maps link (opens in new tab)
   - OpenStreetMap link (opens in new tab)
   - Styled as secondary buttons

---

### Task 3.10: Navigation to Versus Mode

**Feature:** Country profile display
**Description:** Add button to navigate to Versus mode with country pre-selected
**Deliverables:** Working "Compare" button from profile

#### Detailed Plan

1. Add "Compare" button on profile page:
   - Position: Top right of profile header
   - Icon: MdCompareArrows
   - Opens Versus page with this country selected
2. Implement pre-selection logic:
   - Pass country code as query parameter (e.g., /versus?country=ESP)
   - On Versus page load, auto-add country to comparison
3. Handle multiple selections:
   - First click adds to comparison
   - Second click shows "Added" state
   - Navigate to Versus page to see comparison

---

### Task 3.11: Data Formatting Utilities

**Feature:** Data formatting utilities
**Description:** Create comprehensive formatting functions for all data types
**Deliverables:** Utility functions ready for use

#### Detailed Plan

1. Create `src/utils/formatUtils.ts`:
   - `formatNumber(num)` - commas for thousands
   - `formatArea(area)` - add km² suffix
   - `formatPopulation(pop)` - human readable (e.g., "47M")
   - `formatCurrency(code, symbol)` - proper format
   - `formatPercentage(value)` - add % suffix
   - `formatCoordinates(lat, lng)` - display format
   - `formatTimezones(timezones)` - join and format
   - `formatBorders(borders)` - truncate long lists
2. Create `src/utils/nullUtils.ts`:
   - `displayNA(value)` - return "N/A" for null/undefined
   - `displayBoolean(bool)` - "Yes" / "No"
3. Test all formatters with real API data

---

### Task 3.12: Responsive Profile Layout

**Feature:** Country profile display
**Description:** Ensure profile page is responsive on mobile devices
**Deliverables:** Responsive layout for all viewports

#### Detailed Plan

1. Desktop layout (>1024px):
   - Two-column grid of data cards
   - Left: Basic, Government, Geography
   - Right: Demographics, Economy, Culture
   - Full-width: Identity, Visuals
2. Tablet layout (640-1024px):
   - Two-column grid
   - Smaller cards
3. Mobile layout (<640px):
   - Single column stack
   - Horizontal scroll for some data
   - Collapsible sections
4. Test on multiple devices:
   - Verify no horizontal overflow
   - Check all data is readable
   - Ensure touch targets are adequate

---

## Technical Notes

- Use ISR (Incremental Static Regeneration) for profile pages
- Implement proper loading state with Suspense
- Cache country data in store to avoid re-fetching
- Handle edge cases: territories, disputed areas, microstates
- Ensure proper ARIA labels for data tables
- Use proper semantic HTML (article, section, dl, dt, dd)

## Success Criteria

- [ ] Profile page displays all data fields from API
- [ ] Data organized in logical sections
- [ ] Numbers properly formatted with commas
- [ ] Missing data shows "N/A"
- [ ] Flag displays correctly
- [ ] Compare button navigates to Versus mode
- [ ] Responsive layout works on mobile
- [ ] External map links work correctly
- [ ] Loading state shows during data fetch
- [ ] Error state shows for invalid country codes
