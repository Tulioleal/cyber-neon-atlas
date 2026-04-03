# ATLAS CIBER-NEÓN - Product Requirements Document

| Document Information |                  |
|----------------------|------------------|
| **Project Name**     | ATLAS CIBER-NEÓN |
| **Version** | 1.0.0 |
| **Status** | Draft |
| **Last Updated** | 2026-04-02 |
| **Document Owner** | Product Team |

---

## Table of Contents

1. [Project Summary](#1-project-summary)
2. [Problem Statement](#2-problem-statement)
3. [User Personas](#3-user-personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [UI/UX Specification](#6-uiux-specification)
7. [Technical Architecture](#7-technical-architecture)
8. [API Integration](#8-api-integration)
9. [Project Timeline/Phases](#9-project-timelinephases)
10. [Success Metrics](#10-success-metrics)

---

## 1. Project Summary

### 1.1 Overview

**ATLAS CIBER-NEÓN** is a geographic intelligence tool that enables users to view global demographic data, compare countries, and explore geographic information visually. The application provides an immersive, cyberpunk-themed dashboard experience for analyzing country-level data with interactive maps, comparative analytics, and advanced filtering capabilities.

### 1.2 Vision

To create a weaponized interface for geographic intelligence—a "Terminal Obscura" where high-density data meets brutalist structural integrity. The platform serves as a tactical command center for exploring global demographics through an immersive cyberpunk aesthetic.

### 1.3 Target Audience

- Data analysts and researchers studying global demographics
- Educators teaching geography and international relations
- Business professionals conducting market research
- General users interested in exploring country information

---

## 2. Problem Statement

### 2.1 Current Challenges

1. **Fragmented Data Sources**: Country data is scattered across multiple sources requiring users to visit multiple websites
2. **Limited Visualization**: Existing tools lack interactive map exploration and comparative visualizations
3. **Poor Filtering Capabilities**: Users cannot easily filter countries by shared languages or currencies
4. **No Comparison Tools**: No unified platform for side-by-side country comparisons
5. **Dated Interfaces**: Existing demographic tools lack modern, engaging user interfaces

### 2.2 Solution

ATLAS CIBER-NEÓN consolidates global demographic data into a single, unified platform with:

- Interactive world map with clickable country selection
- Country versus mode for comparative analysis
- Advanced filtering by language and currency
- Smart search with autocomplete and map zoom
- Cyberpunk-themed UI with modern data visualization

---

## 3. User Personas

### 3.1 Primary Personas

| Persona | Role | Goals | Pain Points |
|---------|------|-------|-------------|
| **Data Analyst** | Research Professional | Compare multiple countries quickly; export data for reports | Multiple data sources; manual comparison |
| **Educator** | Geography Teacher | Demonstrate country differences visually; engage students | Static textbooks; limited interactivity |
| **Business Analyst** | Market Researcher | Identify countries with specific languages/currencies | Cannot filter by specific criteria |
| **Curious User** | General Public | Explore world demographics for personal interest | Overwhelming interfaces; poor search |

### 3.2 User Stories

1. **As a** Data Analyst, **I want to** select two countries and see comparative bar charts for population, area, and borders, **so that** I can quickly analyze differences for my research report.

2. **As an** Educator, **I want to** click on a country on the map and see detailed demographics, **so that** I can demonstrate geographic concepts to my students.

3. **As a** Business Analyst, **I want to** filter all countries that share the same currency, **so that** I can identify potential markets for business expansion.

4. **As a** Curious User, **I want to** search for a country with autocomplete and have the map zoom to that country, **so that** I can explore its location and neighbors.

---

## 4. Functional Requirements

### 4.1 Core Features

#### 4.1.1 Interactive Map Explorer

**FR-001**: Display an interactive world map using Leaflet.js or similar mapping library

- **Requirements**:
  - Render world map with country boundaries
  - Support zoom and pan controls
  - Display country boundaries with hover highlighting
  - Show country name tooltip on hover

**FR-002**: Country selection interaction

- **Requirements**:
  - Click on any country to select it
  - Update dashboard with selected country's information
  - Highlight selected country with distinctive border/glow
  - Support keyboard navigation (Tab + Enter)

**FR-003**: Map controls

- **Requirements**:
  - Zoom in/out buttons
  - Reset view to world
  - Toggle between map styles (default, satellite)

#### 4.1.2 Country Comparator (Versus Mode)

**FR-004**: Country selector for comparison

- **Requirements**:
  - Allow selection of 2-3 countries for comparison
  - Display selected countries in dedicated comparison panel
  - Support country search/selection via dropdown with autocomplete

**FR-005**: Comparative bar charts

- **Requirements**:
  - Generate automatic bar charts for:
    - Population (current estimates)
    - Area in km²
    - Number of bordering countries
  - Normalize values for visualization
  - Display actual values alongside bars

**FR-006**: Radar chart comparison

- **Requirements**:
  - Display radar/spider chart comparing:
    - Population
    - Area
    - GDP (if available)
    - HDI (if available)
  - Use distinct colors for each country
  - Animate chart on data load

#### 4.1.3 Advanced Filters by Language and Currency

**FR-007**: Language-based filtering

- **Requirements**:
  - Display list of all languages in database
  - Allow selection of one or more languages
  - Filter countries that share the selected language(s)
  - Show count of matching countries

**FR-008**: Currency-based filtering

- **Requirements**:
  - Display list of all currencies in database
  - Allow selection of one or more currencies
  - Filter countries that use the selected currency(s)
  - Show count of matching countries

**FR-009**: Combined filtering

- **Requirements**:
  - Support AND/OR logic for language + currency filters
  - Display filtered results in scrollable list
  - Allow clicking filtered result to view country details

#### 4.1.4 Smart Search with Autocomplete

**FR-010**: Search input with autocomplete

- **Requirements**:
  - Display suggestions as user types (minimum 2 characters)
  - Show matching country names with flag icons
  - Limit suggestions to top 5-10 results
  - Highlight matching text in suggestions
  - Debounce input (300ms)

**FR-011**: Search execution

- **Requirements**:
  - On selection, zoom map to country location
  - Pan to center country in view
  - Auto-zoom to show full country boundaries
  - Update country detail panel

### 4.2 UI Screens

#### 4.2.1 Home/Navigation Global

**FR-012**: Sidebar navigation

- **Requirements**:
  - Collapsible sidebar (300px expanded, 80px collapsed)
  - Navigation items: FILTROS, PARÁMETROS, TELEMETRÍA, HISTORIAL
  - Region matrix filter (APAC, EMEA, LATAM)
  - Execute Scan button

**FR-013**: Search console

- **Requirements**:
  - Command-style search input with `>` prefix
  - Autocomplete dropdown with country suggestions
  - Real-time matching indicators

**FR-014**: Holo-globe visualization

- **Requirements**:
  - Central map container with grid floor decoration
  - Glow rings animation
  - Floating target overlay for selected country
  - Signal strength indicators

**FR-015**: Global footer

- **Requirements**:
  - Display current coordinates
  - Uptime indicator
  - Version number
  - System status links

#### 4.2.2 Country Profile

**FR-016**: Header identity block

- **Requirements**:
  - Country flag display (pixelated effect)
  - Country code (cca2, cca3)
  - Country name in English and native language
  - Coordinates display
  - Signal strength indicator
  - "Initiate Versus Protocol" button

**FR-017**: Bento-grid layout sections

- **Requirements**:
  - Economy Telemetry (GDP, GINI, HDI, Inflation, Unemployment, Currency)
  - Demographics (Population, Density, Languages, Median Age, Urbanization)
  - Geopolitics (Government Type, Capital, Map Visualization)
  - Additional data cards (Timezone, Internet TLD, Dialing Code)

**FR-018**: Data visualization components

- **Requirements**:
  - Population density bar charts
  - Language tags/flags
  - Map preview with coordinates
  - Numeric KPI displays with labels

#### 4.2.3 Versus/Comparison Screen

**FR-019**: Dual country selector

- **Requirements**:
  - Two search inputs side by side
  - "VERSUS" label between selectors
  - Clear selection capability

**FR-020**: Side-by-side data panels

- **Requirements**:
  - Left panel: First country data
  - Right panel: Second country data
  - Matching data fields displayed
  - Visual differentiation (cyan vs green theme)

**FR-021**: Radar chart comparison

- **Requirements**:
  - Central radar chart container
  - Grid background
  - Data polygons for each country
  - Animated data points for key metrics
  - Legend with country indicators

**FR-022**: Intersection analysis

- **Requirements**:
  - Display shared borders (or "None Detected")
  - Show shared regional blocs/memberships
  - Security/synergy level indicator
  - Export analysis button

### 4.3 Data Display Requirements

**FR-023**: All countries data points

- The application MUST display the following data fields for each country (from REST Countries API):

| Field | Type | Display Priority |
|-------|------|------------------|
| `name.common` | String | Primary |
| `name.official` | String | Secondary |
| `cca2` / `cca3` | String | Primary |
| `flag.svg` | SVG | Primary |
| `population` | Integer | Primary |
| `area` | Double | Primary |
| `continents` | Array | Secondary |
| `region` / `subregion` | String | Secondary |
| `capital` | Array | Secondary |
| `capitalInfo.latlng` | Array | Secondary |
| `languages` | Object | Secondary |
| `currencies` | Object | Secondary |
| `borders` | Array | Tertiary |
| `timezones` | Array | Tertiary |
| `maps.googleMaps` | String | Tertiary |
| `car.side` | String | Tertiary |
| `idd.root` + `suffixes` | String | Tertiary |
| `postalCode.format` | String | Tertiary |
| `startOfWeek` | String | Tertiary |
| `gini` | Object | Tertiary |
| `coatOfArms.svg` | String | Tertiary |
| `demonyms` | Object | Tertiary |

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

| Metric | Target |
|--------|--------|
| Initial Page Load | < 3 seconds |
| Map Interaction Response | < 100ms |
| Search Autocomplete Response | < 300ms |
| Country Selection Update | < 500ms |
| API Data Fetch | Cache with 1-hour TTL |

### 5.2 Accessibility Requirements

- WCAG 2.1 AA compliance target
- Keyboard navigation support for all interactive elements
- Screen reader compatible labels
- Minimum contrast ratio 4.5:1 for text
- Focus indicators visible

### 5.3 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### 5.4 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| < 768px | Stacked layout, hamburger menu |
| 768px - 1024px | Collapsed sidebar, adapted grid |
| > 1024px | Full sidebar, 12-column grid |

### 5.5 Code Quality

- ESLint with strict configuration
- Prettier for code formatting
- TypeScript strict mode
- Husky pre-commit hooks
- lint-staged for staged files

---

## 6. UI/UX Specification

### 6.1 Design System Overview

**Aesthetic**: "Terminal Obscura" - Tactical Intelligence Interface

- Cyberpunk/Neon aesthetic
- Scanline effects
- Glowing borders
- Dark mode only (no light mode)

### 6.2 Color Palette

| Token | Hex Code | Usage |
|-------|----------|-------|
| `primary` | `#00FFD1` | Active states, primary CTAs, critical data nodes |
| `primary-dim` | `#00e9bf` | Hover states, secondary emphasis |
| `primary-fixed` | `#00f9cc` | High emphasis elements |
| `secondary` | `#2ff801` | Success states, verified targets |
| `secondary-dim` | `#2be800` | Secondary emphasis |
| `background` | `#0d0e13` | Main background |
| `surface` | `#0d0e13` | Surface layer |
| `surface-container-low` | `#121319` | Primary workspace |
| `surface-container-high` | `#1e1f26` | Elevated panels |
| `surface-container-highest` | `#24252d` | Floating modules |
| `surface-bright` | `#2a2c34` | Active surfaces |
| `tertiary` | `#ff7073` | Warning/Error states |
| `error` | `#ff716c` | Error indicators |
| `on-primary` | `#006653` | Text on primary |
| `on-surface` | `#f7f5fd` | Primary text |
| `on-surface-variant` | `#abaab1` | Secondary text |
| `outline-variant` | `#47474e` | Borders |

### 6.3 Typography

| Style | Font | Weight | Usage |
|-------|------|--------|-------|
| `headline` | Space Mono | 700 | Section headers, alerts |
| `body` | Space Grotesk | 400-600 | Navigation, labels |
| `data` | Fira Code | 400 | Coordinates, timestamps |
| `display` | Rajdhani | 500-700 | Large numbers |

**Type Scale**:

- Display: 48px / 56px line-height
- H1: 36px / 44px line-height
- H2: 24px / 32px line-height
- H3: 20px / 28px line-height
- Body: 14px / 20px line-height
- Label: 12px / 16px line-height
- Caption: 10px / 14px line-height

### 6.4 Spacing System

Base unit: 4px

| Token | Value |
|-------|-------|
| `spacing-xs` | 4px |
| `spacing-sm` | 8px |
| `spacing-md` | 16px |
| `spacing-lg` | 24px |
| `spacing-xl` | 32px |
| `spacing-2xl` | 48px |

### 6.5 Component Specifications

#### Buttons

| Variant | Style |
|---------|-------|
| Primary | Solid primary background, 0px corners, inset shadow |
| Secondary | Transparent, 1px primary border, glow on hover |
| Tertiary | Text-only, underline expansion on hover |

**States**:

- Default: Base styling
- Hover: Border glow, slight brightness increase
- Active: 0.7 opacity, scale(0.98)
- Disabled: 40% opacity, no interactions

#### Input Fields

- Style: Underline-only or subtle surface-variant fill
- Active State: Bottom border flashes secondary
- Typography: User input in Fira Code

#### Cards (Tactical Modules)

- No dividers between content
- Separate using surface color shifts
- Header: Coordinate stamp in top-right (Fira Code, label-sm)
- Hover: Glow effect with primary color

#### Scanline Overlay

- Applied globally across viewport
- Linear gradient: 50% transparent, 50% black at 25% opacity
- Horizontal lines: 3px 100%
- Fixed position, 0.03 opacity
- pointer-events: none

### 6.6 Visual Effects

#### Neon Bloom (Shadow)

```
box-shadow: 0 0 15px rgba(0, 255, 209, 0.3)
```

- Use on tactical windows floating over map
- 15% opacity primary color tint
- 4px to 24px blur

#### Ghost Border

```
outline: 1px solid rgba(0, 255, 209, 0.2)
```

- Use only when border is required for accessibility
- Never use 100% opaque borders

#### CRT Glow (Text)

```
text-shadow: 0 0 5px rgba(0, 255, 209, 0.5)
```

- Use on active/targeted text elements

---

## 7. Technical Architecture

### 7.1 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16+ (latest) |
| Language | TypeScript | 5.x |
| Styling | SCSS + CSS Modules | - |
| Server State | TanStack Query + fetch | 5.x |
| Client State | Zustand | 4.x |
| Icons | react-icons | 5.x |
| Maps | Leaflet + react-leaflet | 4.x |
| Charts | Chart.js + react-chartjs-2 | 4.x |
| Linting | ESLint | 9.x |
| Formatting | Prettier | 3.x |
| Git Hooks | husky + lint-staged | latest |

### 7.2 Project Structure

```
/home/tulio/Documents/proyectos/world-canvas/
├── frontend/                           # Next.js application
│   ├── src/
│   │   ├── app/                        # App Router pages
│   │   │   ├── layout.tsx              # Root layout
│   │   │   ├── page.tsx                # Home page
│   │   │   ├── profile/
│   │   │   │   └── [cca3]/
│   │   │   │       └── page.tsx        # Country profile
│   │   │   ├── versus/
│   │   │   │   └── page.tsx            # Comparison page
│   │   │   └── globals.scss            # Global styles
│   │   ├── components/
│   │   │   ├── common/                 # Reusable UI components
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   └── Card/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Header/
│   │   │   │   └── Footer/
│   │   │   ├── map/
│   │   │   │   ├── WorldMap/
│   │   │   │   └── CountryMarker/
│   │   │   ├── country/
│   │   │   │   ├── CountryCard/
│   │   │   │   ├── CountryDetail/
│   │   │   │   └── CountryFlag/
│   │   │   ├── charts/
│   │   │   │   ├── BarChart/
│   │   │   │   ├── RadarChart/
│   │   │   │   └── ComparisonChart/
│   │   │   └── filters/
│   │   │       ├── LanguageFilter/
│   │   │       ├── CurrencyFilter/
│   │   │       └── RegionFilter/
│   │   ├── hooks/
│   │   │   ├── useCountries.ts        # Country data hooks
│   │   │   ├── useMap.ts               # Map interaction hooks
│   │   │   └── useSearch.ts           # Search hooks
│   │   ├── stores/
│   │   │   ├── useCountryStore.ts     # Country selection state
│   │   │   ├── useFilterStore.ts      # Filter state
│   │   │   └── useSearchStore.ts      # Search state
│   │   ├── services/
│   │   │   └── api.ts                 # REST Countries API calls
│   │   ├── types/
│   │   │   ├── country.ts             # Country type definitions
│   │   │   └── index.ts               # Global types
│   │   ├── styles/
│   │   │   ├── _variables.scss        # Design tokens
│   │   │   ├── _mixins.scss           # SCSS mixins
│   │   │   ├── _scanlines.scss        # Scanline effect
│   │   │   └── _typography.scss       # Font styles
│   │   └── utils/
│   │       ├── formatters.ts          # Number/date formatters
│   │       └── validators.ts          # Validation helpers
│   ├── public/
│   │   ├── assets/                    # Static assets
│   │   └── fonts/                     # Self-hosted fonts (if needed)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── ...
├── references/                         # Design reference files
├── PRD.md                             # This document
└── README.md                          # Project overview
```

### 7.3 State Management Architecture

#### Server State (TanStack Query)

```
- Query: getAllCountries
  - Key: ['countries', 'all']
  - Fetcher: fetchAllCountries()
  - Stale Time: 1 hour

- Query: getCountryByCode
  - Key: ['country', cca3]
  - Fetcher: fetchCountryByCode(code)
  - Enabled: code provided
```

#### Client State (Zustand)

```
- useCountryStore
  - selectedCountry: Country | null
  - comparedCountries: Country[]
  - setSelectedCountry(country)
  - addToCompare(country)
  - removeFromCompare(country)
  - clearComparison()

- useFilterStore
  - selectedLanguages: string[]
  - selectedCurrencies: string[]
  - selectedRegions: string[]
  - filteredCountries: Country[]
  - toggleLanguageFilter(lang)
  - toggleCurrencyFilter(currency)
  - applyFilters()

- useSearchStore
  - searchQuery: string
  - suggestions: Country[]
  - setSearchQuery(query)
  - fetchSuggestions()
  - clearSearch()
```

### 7.4 Build Configuration

**Next.js Config**:

- TypeScript strict mode
- SCSS modules enabled
- Image optimization for flag SVGs
- API routes for proxy (if CORS needed)

---

## 8. API Integration

### 8.1 REST Countries API

**Base URL**: `https://restcountries.com/v4.1`

**Endpoints**:

| Endpoint | Description |
|----------|-------------|
| `GET /all` | Fetch all countries with all fields |
| `GET /alpha/{code}` | Fetch country by cca2 or cca3 |
| `GET /region/{region}` | Fetch countries by region |
| `GET /subregion/{subregion}` | Fetch countries by subregion |

### 8.2 Data Fetching Strategy

1. **Initial Load**: Fetch all countries on app mount
   - Cache for 1 hour
   - Show loading skeleton during fetch
   - Handle errors gracefully with retry

2. **Country Detail**: Fetch individual country on selection
   - Use alpha endpoint with cca3
   - Preload neighboring countries for borders

3. **Search**: Client-side filtering from cached data
   - Debounced search input
   - Fuzzy matching on common name

### 8.3 Error Handling

| Error Type | Handling |
|------------|----------|
| Network Error | Show retry button, cache fallback |
| Empty Result | Display "No countries found" message |
| API Rate Limit | Implement exponential backoff |
| Invalid Country Code | Redirect to 404 page |

---

## 9. Project Timeline/Phases

### 9.1 Phase 1: Foundation (Week 1-2)

**Goals**: Set up project infrastructure and core data layer

| Task | Description |
|------|-------------|
| P1.1 | Initialize Next.js 16 project with TypeScript |
| P1.2 | Configure SCSS and CSS modules |
| P1.3 | Set up ESLint, Prettier, Husky |
| P1.4 | Create design tokens (colors, typography) |
| P1.5 | Implement REST Countries API service |
| P1.6 | Set up TanStack Query with caching |
| P1.7 | Create Zustand stores |

**Deliverables**:

- Working Next.js project structure
- API service layer
- Global styles and design tokens

### 9.2 Phase 2: Core UI (Week 3-4)

**Goals**: Build base layout components and navigation

| Task | Description |
|------|-------------|
| P2.1 | Create global layout (Sidebar, Header, Footer) |
| P2.2 | Implement scanline overlay effect |
| P2.3 | Build collapsible sidebar component |
| P2.4 | Create navigation components |
| P2.5 | Add typography styles |
| P2.6 | Build button and input components |

**Deliverables**:

- Complete layout system
- Reusable UI component library

### 9.3 Phase 3: Map & Search (Week 5-6)

**Goals**: Implement interactive map and search functionality

| Task | Description |
|------|-------------|
| P3.1 | Integrate Leaflet map |
| P3.2 | Render country boundaries |
| P3.3 | Implement country click selection |
| P3.4 | Build search with autocomplete |
| P3.5 | Implement map zoom-to-country |
| P3.6 | Add country tooltip on hover |

**Deliverables**:

- Interactive world map
- Smart search with autocomplete
- Map-country interaction flow

### 9.4 Phase 4: Country Profile (Week 7-8)

**Goals**: Build detailed country profile page

| Task | Description |
|------|-------------|
| P4.1 | Create country detail view |
| P4.2 | Build bento-grid layout |
| P4.3 | Implement economy telemetry section |
| P4.4 | Implement demographics section |
| P4.5 | Implement geopolitics section |
| P4.6 | Add data visualization components |

**Deliverables**:

- Country profile page
- All data sections displayed

### 9.5 Phase 5: Comparison Mode (Week 9-10)

**Goals**: Build versus/comparison functionality

| Task | Description |
|------|-------------|
| P5.1 | Create versus page layout |
| P5.2 | Build dual country selector |
| P5.3 | Implement comparative bar charts |
| P5.4 | Build radar chart comparison |
| P5.5 | Implement intersection analysis |
| P5.6 | Add export functionality |

**Deliverables**:

- Versus comparison page
- Bar and radar charts

### 9.6 Phase 6: Filters & Polish (Week 11-12)

**Goals**: Implement advanced filters and final polish

| Task | Description |
|------|-------------|
| P6.1 | Build language filter |
| P6.2 | Build currency filter |
| P6.3 | Implement region filter |
| P6.4 | Add combined filter logic |
| P6.5 | Performance optimization |
| P6.6 | Accessibility audit |
| P6.7 | Cross-browser testing |

**Deliverables**:

- Advanced filtering system
- Production-ready application

### 9.7 Timeline Summary

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| Phase 1 | 2 weeks | Project setup, API layer |
| Phase 2 | 2 weeks | Core UI, components |
| Phase 3 | 2 weeks | Map, search |
| Phase 4 | 2 weeks | Country profile |
| Phase 5 | 2 weeks | Comparison mode |
| Phase 6 | 2 weeks | Filters, polish |
| **Total** | **12 weeks** | **Production ready** |

---

## 10. Success Metrics

### 10.1 Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 3s | Lighthouse/GTmetrix |
| Time to Interactive | < 5s | Lighthouse |
| First Contentful Paint | < 1.5s | Lighthouse |
| Lighthouse Performance | > 80 | Lighthouse |
| Lighthouse Accessibility | > 90 | Lighthouse |

### 10.2 User Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily Active Users | Monitor | Analytics |
| Average Session Duration | > 2 min | Analytics |
| Search Usage Rate | > 50% of sessions | Analytics |
| Map Interaction Rate | > 70% of sessions | Analytics |
| Comparison Usage | > 30% of sessions | Analytics |

### 10.3 Technical Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| ESLint Errors | 0 | CI/CD pipeline |
| TypeScript Errors | 0 | CI/CD pipeline |
| Bundle Size | < 500KB (initial) | Webpack stats |
| API Cache Hit Rate | > 80% | TanStack Query |
| Crash-free Sessions | > 99.5% | Error tracking |

### 10.4 Success Criteria

The project will be considered successful when:

1. **All core features implemented**: Interactive map, comparator, filters, and search
2. **Performance targets met**: Page load under 3 seconds
3. **Visual design complete**: Cyberpunk aesthetic applied consistently
4. **Code quality maintained**: Zero ESLint/TS errors
5. **Responsive design verified**: Works on all target breakpoints
6. **User acceptance**: Features meet user stories

---

## Appendix

### A. Reference Files

- **IDEA.md**: Original feature requirements and data field specifications
- **DESIGN.md**: Tactical Intelligence Design System documentation
- **HTML References**:
  - `home_navegacion_global/code.html` - Home screen design
  - `perfil_especifico_detalle_de_pais/code.html` - Country profile design
  - `versus_comparativa_binaria/code.html` - Versus comparison design

### B. External Dependencies

- REST Countries API: <https://restcountries.com/>
- Leaflet.js: <https://leafletjs.com/>
- Google Fonts: Space Mono, Space Grotesk, Fira Code, Rajdhani

### C. Design Tokens Summary

```scss
// Colors
$primary: #00FFD1;
$primary-dim: #00e9bf;
$secondary: #2ff801;
$background: #0d0e13;
$surface: #12151C;
$on-surface: #f7f5fd;

// Typography
$font-headline: 'Space Mono', monospace;
$font-body: 'Space Grotesk', sans-serif;
$font-data: 'Fira Code', monospace;
$font-display: 'Rajdhani', sans-serif;

// Spacing
$spacing-unit: 4px;
```

---
