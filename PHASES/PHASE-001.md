# Phase 1: Setup & Core Infrastructure

## Overview

This phase establishes the foundational infrastructure for the Atlas Ciber-Neón project. It involves setting up the Next.js project with TypeScript, SCSS, and all required dependencies. The goal is to create a solid technical foundation with proper code quality tools, folder structure, and base components following the cyberpunk design system.

## Features

- Project initialization with Next.js 14+ and TypeScript
- SCSS configuration with design system variables
- ESLint and Prettier configuration
- API client for REST Countries integration
- Base UI components with cyberpunk styling
- Zustand state management setup
- Folder structure and routing foundation

## Tasks

### Task 1.1: Project Initialization

**Feature:** Project initialization
**Description:** Set up Next.js project with TypeScript, install all required dependencies including SCSS, react-icons, Zustand, Axios, Leaflet, and Recharts
**Deliverables:** Running Next.js project with all dependencies installed

#### Detailed Plan

1. Create new Next.js project with TypeScript: `npx create-next-app@latest frontend --typescript --eslint`
2. Navigate to frontend directory: `cd frontend`
3. Install SCSS: `npm install sass`
4. Install react-icons: `npm install react-icons`
5. Install Zustand: `npm install zustand`
6. Install Axios: `npm install axios`
7. Install Leaflet and react-leaflet: `npm install leaflet react-leaflet`
8. Install Recharts: `npm install recharts`
9. Install @types/leaflet: `npm install -D @types/leaflet`
10. Verify project builds successfully with `npm run build`

---

### Task 1.2: Design System Implementation

**Feature:** Project initialization
**Description:** Implement the cyberpunk design system with color palette, typography, spacing, and global styles
**Deliverables:** SCSS variables, global styles, font configuration

#### Detailed Plan

1. Create `src/styles/` directory with `variables.scss` containing:
   - Color palette (background primary #0d0e13, cyan #00FFD1, green #2FF801, etc.)
   - Typography definitions (Space Mono, Space Grotesk, Fira Code)
   - Spacing tokens (4px base unit)
   - Border and shadow definitions
2. Create `globals.scss` with:
   - CSS reset and base styles
   - Scanline overlay effect
   - Grid background pattern
   - Neon glow utility classes
   - Typography base styles
3. Configure `next.config.js` for SCSS and asset handling
4. Import fonts via next/font or local files in `public/fonts/`
5. Create responsive breakpoints mixin

---

### Task 1.3: Base Component Library

**Feature:** Base components
**Description:** Create reusable UI components including Button, Input, Card, Loader, and Badge with cyberpunk styling
**Deliverables:** Component library ready for use in all pages

#### Detailed Plan

1. Create `src/components/common/Button/`:
   - Button.tsx with variants (primary, secondary, danger, disabled)
   - Button.module.scss with neon border and glow effects
   - Props: variant, disabled, onClick, children
2. Create `src/components/common/Input/`:
   - Input.tsx with searchable input support
   - Input.module.scss with cyberpunk focus states
   - Props: value, onChange, placeholder, icon
3. Create `src/components/common/Card/`:
   - Card.tsx with hover effects
   - Card.module.scss with border transitions
   - Props: children, onClick, className
4. Create `src/components/common/Loader/`:
   - Loader.tsx with spinning animation
   - Loader.module.scss with cyan glow
5. Create `src/components/common/Badge/`:
   - Badge.tsx for status indicators
   - Badge.module.scss with color variants

---

### Task 1.4: API Client Setup

**Feature:** API client
**Description:** Implement REST Countries API client with Axios, caching strategy, and type definitions
**Deliverables:** Fully typed API service ready for data fetching

#### Detailed Plan

1. Create `src/types/country.ts` with TypeScript interfaces for:
   - Country (all fields from REST Countries API)
   - Currency, Language, Maps, Flags, IDD
2. Create `src/services/api.ts`:
   - Base Axios instance with base URL <https://restcountries.com/v4>
   - Request interceptors for logging
   - Response interceptors for error handling
3. Create `src/services/countryService.ts`:
   - `getAllCountries()` - fetch all countries
   - `getCountryByCode(code)` - fetch single country
   - `getCountriesByRegion(region)` - filter by region
   - Implement in-memory caching with 1-hour TTL
   - Add request throttling to avoid rate limiting
4. Create error handling utilities in `src/utils/errorUtils.ts`

---

### Task 1.5: State Management Setup

**Feature:** Project initialization
**Description:** Configure Zustand store with all required state for countries, filters, and UI state
**Deliverables:** Centralized state management ready for use

#### Detailed Plan

1. Create `src/store/useCountryStore.ts` with Zustand:
   - State: countries[], selectedCountry, comparisonCountries[], activeFilters, isLoading, error
   - Actions: fetchCountries, selectCountry, addToComparison, removeFromComparison, setFilter, clearFilters
   - Implement async fetchCountries with loading states
2. Create `src/store/useUIStore.ts` for:
   - Sidebar open/close state
   - Modal states
   - Toast notifications
3. Create `src/store/index.ts` for easy imports

---

### Task 1.6: Routing Structure

**Feature:** Project initialization
**Description:** Set up Next.js App Router with all 4 pages and dynamic routing for country profiles
**Deliverables:** Working routes for Home, Perfil, Versus, Databank

#### Detailed Plan

1. Create `src/app/page.tsx` for Home/Map Explorer (/)
2. Create `src/app/perfil/[countryCode]/page.tsx` for Country Profile
3. Create `src/app/versus/page.tsx` for Comparison page
4. Create `src/app/databank/page.tsx` for Filter page
5. Create `src/app/layout.tsx` with:
   - Header component
   - Footer component
   - Scanline overlay
   - Global styles import
6. Configure `next.config.js` for proper routing

---

### Task 1.7: Layout Components

**Feature:** Base components
**Description:** Create Header, Footer, Sidebar, and main Layout components
**Deliverables:** Complete layout structure ready for content

#### Detailed Plan

1. Create `src/components/layout/Header/`:
   - Header.tsx with logo and navigation links
   - Header.module.scss with fixed positioning, neon underline on active
   - Responsive hamburger menu for mobile
2. Create `src/components/layout/Footer/`:
   - Footer.tsx with REST Countries API attribution
   - Footer.module.scss with 48px height
3. Create `src/components/layout/Sidebar/`:
   - Sidebar.tsx with search and quick stats
   - Sidebar.module.scss with 280px fixed width
4. Create `src/components/layout/Layout.tsx`:
   - Combines Header, Sidebar, Footer
   - Responsive grid structure

---

### Task 1.8: Linting & Code Quality

**Feature:** Project initialization
**Description:** Configure ESLint with Airbnb base + custom rules, Prettier, and Git hooks
**Deliverables:** Enforced code quality on commit

#### Detailed Plan

1. Configure `.eslintrc.json` with:
   - Airbnb base config
   - TypeScript-specific rules
   - React and Next.js rules
   - Custom rules for cyberpunk naming conventions
2. Configure `.prettierrc` with:
   - Single quotes
   - 2-space indentation
   - Trailing commas
3. Set up husky and lint-staged:
   - `npm install husky lint-staged`
   - Create pre-commit hook to run lint
4. Add npm scripts for lint and format

---

### Task 1.9: Utility Functions

**Feature:** Project initialization
**Description:** Create utility functions for data formatting, validation, and common operations
**Deliverables:** Reusable utility library

#### Detailed Plan

1. Create `src/utils/formatUtils.ts`:
   - `formatNumber(num)` - add commas for thousands
   - `formatArea(area)` - convert to km²
   - `formatPopulation(pop)` - human readable format
   - `formatCurrency(code, symbol)` - proper currency display
2. Create `src/utils/filterUtils.ts`:
   - `filterByLanguage(countries, language)`
   - `filterByCurrency(countries, currency)`
   - `filterByRegion(countries, region)`
   - `filterBySubregion(countries, subregion)`
3. Create `src/utils/validationUtils.ts`:
   - `isValidCountryCode(code)` - validate ISO codes
   - `isValidRegion(region)` - validate region strings

---

## Technical Notes

- All components must use strict TypeScript with no `any` types
- Use CSS Modules (.module.scss) for component styling
- Follow cyberpunk aesthetic: sharp corners (0 border-radius), neon colors, grid backgrounds
- Implement proper loading and error states for all async operations
- Use proper ARIA labels for accessibility compliance
- Store should persist comparison countries in session storage

## Success Criteria

- [ ] Project builds without errors
- [ ] All 4 routes accessible and render content
- [ ] Design system colors and typography applied correctly
- [ ] API client successfully fetches country data
- [ ] Zustand store manages state correctly
- [ ] ESLint passes with no errors
- [ ] Base components render with proper cyberpunk styling
- [ ] Responsive layout works on mobile viewport
