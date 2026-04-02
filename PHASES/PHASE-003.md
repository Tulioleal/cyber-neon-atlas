# PHASE-003: Country Profile

## Overview
This phase implements the comprehensive country profile page that displays all data returned from the REST Countries API. The profile page serves as the detailed view when users click on a country from the map or search results. It displays information across 8 categories: Basic Info, Demographics, Government, Geography, Economy, Culture, Identity, and Visual Assets. This phase ensures users can access detailed country information in a well-organized, cyberpunk-themed interface.

## Features
- Country Profile Page Route
- Comprehensive Data Display (8 Categories)
- Data Formatting Utilities
- Navigation Integration
- Back Navigation with Map State

## Tasks

### Country Profile Page Route
- [ ] Task 1.1: Create dynamic route `src/app/country/[code]/page.tsx`
- [ ] Task 1.2: Implement getCountryByCode() to fetch data using SSR or client-side
- [ ] Task 1.3: Handle 404 for invalid country codes with custom error page
- [ ] Task 1.4: Add loading skeleton while fetching country data
- [ ] Task 1.5: Implement SSG (Static Site Generation) for top 50 countries for performance
- [ ] Task 1.6: Add dynamic metadata (title, description) based on country name

### Comprehensive Data Display
- [ ] Task 2.1: Create ProfileHeader component with flag, name, official name, and tagline
- [ ] Task 2.2: Build Basic Info section: Capital, Population, Area, Global Rank
- [ ] Task 2.3: Build Demographics section: Population density, Median age, Birth/death rates, Urban population %
- [ ] Task 2.4: Build Government section: Government type, Independence status, Official language, Currency
- [ ] Task 2.5: Build Geography section: Continent, Subregion, bordering countries list, Timezones, Total area breakdown
- [ ] Task 2.6: Build Economy section: GDP, GDP per capita, Unemployment rate, Main industries
- [ ] Task 2.7: Build Culture section: Languages, Ethnic groups, Religions, Holidays
- [ ] Task 2.8: Build Identity section: ISO codes, TLD, Calling code, Driving side, Car sign

### Data Formatting Utilities
- [ ] Task 3.1: Create number formatter for population, area, GDP (add commas, handle millions/billions)
- [ ] Task 3.2: Create percentage formatter for demographics and economic indicators
- [ ] Task 3.3: Implement currency formatter with proper symbols ($ USD, € EUR, etc.)
- [ ] Task 3.4: Create array formatter for lists (languages, borders, timezones) with proper joining
- [ ] Task 3.5: Build null/undefined handler that shows "N/A" or "-" for missing data
- [ ] Task 3.6: Create date/time formatter for timezones display

### Navigation Integration
- [ ] Task 4.1: Add breadcrumb navigation component (Home > Country > [Country Name])
- [ ] Task 4.2: Implement "Back to Map" button that returns to map with previous view state
- [ ] Task 4.3: Add "Compare with..." button linking to Versus mode with this country pre-selected
- [ ] Task 4.4: Integrate Related Countries section linking to bordering countries
- [ ] Task 4.5: Add keyboard navigation (Escape to go back, arrow keys for sections)
- [ ] Task 4.6: Implement smooth scroll between sections within the profile page

### Back Navigation with Map State
- [ ] Task 5.1: Store last map position/zoom in Zustand before navigation
- [ ] Task 5.2: On back navigation, restore map to previous position
- [ ] Task 5.3: Handle browser back button to restore map state properly
- [ ] Task 5.4: Add transition animation when returning from profile to map

## Detailed Plan

### Country Profile Page Implementation
1. **Dynamic Route**: Create `src/app/country/[code]/page.tsx` using Next.js App Router dynamic segments
2. **Data Fetching**: Use Axios to call REST Countries API v4 endpoint /alpha/{code} with full=true parameter
3. **Data Transformation**: Transform API response to internal Country type with proper TypeScript interfaces
4. **Error Handling**: Implement try/catch with custom error for 404 Not Found, display user-friendly message
5. **Component Structure**: Create modular section components for each data category (BasicInfo, Demographics, etc.)

### Section Components Implementation
1. **ProfileHeader**: Large flag image (use flagcdn.com for high-res), country name in Space Grotesk, native names list
2. **InfoCard Component**: Reusable card with title, icon, and value - styled with cyberpunk border and glow
3. **Section Layout**: Use CSS Grid for 2-column layout on desktop, single column on mobile
4. **Data Presentation**: Use tables for multi-value data, inline lists for tags, icons for visual appeal

### Formatting Utilities Implementation
1. **Formatters File**: Create `src/utils/formatters.ts` with all formatting functions
2. **Number Formatting**: Use Intl.NumberFormat for locale-aware number display with suffixes (K, M, B)
3. **Currency Conversion**: Create currencyMap for symbol lookup, format with proper decimals
4. **List Joining**: Create listFormatter that handles empty arrays, Oxford comma, and "and" before last item

### Navigation and State Implementation
1. **Zustand Store Extension**: Add mapViewState { center: [number, number], zoom: number } to countryStore
2. **Back Button**: Create BackButton component using router.back() with state restoration
3. **Compare Link**: Pre-populate comparison selection via URL params /versus?country1=USA&country2=CAN

## Dependencies
- **External**: REST Countries API v4, flagcdn.com for flag images
- **Internal**: PHASE-001 UI components and Zustand store, PHASE-002 Map component

## Deliverables
- Functional country profile page at /country/[code] route
- Display of all 8 data categories with proper formatting
- Responsive design with cyberpunk styling across all sections
- Back navigation that preserves map view state
- Loading states and error handling for invalid country codes
- Compare button linking to Versus mode with country pre-selected