# Atlas Ciber-Neón - Product Requirements Document (PRD)

## 1. Project Overview

### Project Name

**Atlas Ciber-Neón**

### Project Description

A geographic intelligence tool that enables users to view, compare, and analyze country data visually through an immersive cyberpunk-styled dashboard interface. The application fetches real-time data from the REST Countries API V4 and presents it through interactive maps, comparative charts, and advanced filtering capabilities.

### Project Mission

Transform raw country data into actionable geographic intelligence through a terminal-inspired, data-dense interface that appeals to data enthusiasts, researchers, and users seeking an immersive country exploration experience.

---

## 2. Problem Statement

Users currently access country data through disparate sources that lack visual integration and comparative capabilities. The challenges include:

1. **Fragmented Data Sources**: Country information is scattered across multiple websites without unified visualization
2. **Limited Comparative Tools**: No streamlined way to compare multiple countries side-by-side
3. **Inefficient Discovery**: Difficulty finding countries by specific attributes (language, currency, region)
4. **Static Visualization**: Traditional map interfaces lack interactive, real-time data overlay
5. **Aesthetic Disconnect**: Existing tools prioritize function over form, lacking engaging visual experiences

---

## 3. Target Users

| User Segment | Use Case | Pain Points |
|-------------|----------|--------------|
| **Data Enthusiasts** | Explore country statistics for hobbyist research | Data scattered, no visual comparison |
| **Students/Educators** | Geography homework assistance, teaching aids | Static data, difficult to demonstrate relationships |
| **Researchers** | Preliminary country data gathering | Need quick comparisons, filtering by specific attributes |
| **Travel Planners** | Pre-travel country research | Inefficient to gather comprehensive country info |
| **Developers** | Testing APIs, prototyping | Need reliable mock data with visual representation |

---

## 4. Functional Requirements

### 4.1 Interactive Map Explorer

**FR-001**: Display an interactive world map using Leaflet.js with custom cyberpunk-styled tiles

**FR-002**: Clicking on any country polygon triggers a data fetch for that country's information

**FR-003**: Display country name label on hover with flag preview tooltip

**FR-004**: Map resets to global view with a dedicated button

**FR-005**: Display country borders with neon accent styling

**User Story**: *As a user, I want to click on a country on the map and immediately see its key statistics displayed on the dashboard so I can quickly explore different nations.*

### 4.2 Country Profile Page (Perfil)

**FR-007**: Display comprehensive country data in a structured grid layout

**FR-008**: Present the following data fields in organized sections:

- Basic Info: Name, Capital, Region, Subregion, Continent
- Demographics: Population, Area (km²), Density, Ethnicity
- Government: Government Type, Independence Status, UN Member Status
- Geography: Landlocked Status, Land Borders (list), Timezones
- Economy: Currencies, GDP (if available), Gini Coefficient
- Culture: Languages, Religions, National Holidays
- Identity: TLD, Calling Codes, ISO Codes (CCA2, CCA3, CIC, FIFA)
- Visual Assets: Flag (SVG), Coat of Arms, Map Links
- Additional: Start of Week, Regional Blocs

**FR-009**: Display formatted numbers (commas for thousands, proper units)

**FR-010**: Show "N/A" for missing/null data fields gracefully

**FR-011**: Navigate to Versus mode directly from the profile with country pre-selected

**User Story**: *As a user, I want to view detailed country information organized in logical sections so I can quickly find specific data points.*

### 4.3 Country Comparison (Versus Mode)

**FR-012**: Support selecting 2-3 countries for comparison

**FR-013**: Generate horizontal bar charts comparing:

- Population
- Area (km²)
- Number of Land Borders

**FR-014**: Display percentage difference calculations between compared countries

**FR-015**: Highlight the "winner" in each category (highest value)

**FR-016**: Visual chart styling consistent with cyberpunk theme (neon bars, grid background)

**FR-017**: Allow adding/removing countries from comparison dynamically

**FR-018**: Persist selected countries during session

**User Story**: *As a user, I want to compare multiple countries side-by-side with visual charts so I can understand relative differences in key metrics.*

### 4.4 Advanced Filters (Databank)

**FR-019**: Filter countries by Language (e.g., "Spanish", "English", "French")

**FR-020**: Filter countries by Currency (e.g., "USD", "EUR", "JPY")

**FR-021**: Filter by Region (Africa, Americas, Asia, Europe, Oceania, Antarctic)

**FR-022**: Filter by Subregion (e.g., "Western Europe", "Southeast Asia")

**FR-023**: Multi-select filters that combine with AND logic

**FR-024**: Display count of matching countries for each filter

**FR-025**: Grid view of filtered countries with key info preview

**FR-026**: Quick-action to add filtered results to Versus comparison

**FR-027**: Clear all filters button

**User Story**: *As a user, I want to filter countries by specific attributes like language or currency so I can discover countries that share characteristics.*

### 4.5 Smart Search with Autocomplete

**FR-028**: Search input with debounced autocomplete (300ms delay)

**FR-029**: Display matching country names with flag icons in dropdown

**FR-030**: Maximum 8 suggestions displayed in dropdown

**FR-031**: Keyboard navigation support (Arrow keys, Enter to select, Escape to close)

**FR-032**: On selection, animate map to fly to selected country

**FR-033**: Zoom to country bounds with appropriate zoom level

**FR-034**: Clear search button

**FR-035**: Display "No results found" message for unmatched queries

**User Story**: *As a user, I want to search for a country by name and have the map automatically zoom to that country so I can quickly navigate to specific locations.*

### 4.6 Global Navigation

**FR-036**: Fixed top navigation bar with logo and menu links

**FR-037**: Navigation links: Home, Versus, Databank

**FR-038**: Active page indicator with neon underline effect

**FR-039**: Responsive hamburger menu for mobile viewports

**FR-040**: Footer with attribution to REST Countries API

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-001**: Initial page load under 3 seconds on 3G connection

**NFR-002**: API response caching to reduce redundant network calls

**NFR-003**: Lazy loading for non-critical components

**NFR-004**: Map tile loading with progressive enhancement

### 5.2 Accessibility

**NFR-006**: WCAG 2.1 AA compliance target

**NFR-007**: Keyboard navigation support throughout application

**NFR-008**: Proper ARIA labels for interactive elements

**NFR-009**: Color contrast ratios meeting accessibility standards

**NFR-010**: Screen reader compatible data tables

### 5.3 Browser Support

**NFR-011**: Support latest two versions of Chrome, Firefox, Safari, Edge

**NFR-012**: Graceful degradation for older browsers (no crash, limited functionality)

### 5.4 Code Quality

**NFR-013**: TypeScript strict mode enabled

**NFR-014**: ESLint configuration with Airbnb base + custom rules

**NFR-015**: Prettier for consistent code formatting

**NFR-016**: Git hooks (pre-commit) to enforce linting before commit

**NFR-017**: Component documentation via JSDoc comments

---

## 6. UI/UX Specifications

### 6.1 Design Philosophy

The interface embodies a **"Data-Dense + Drill-Down"** pattern, presenting maximum information upfront while enabling progressive detail revelation through user interaction. The aesthetic draws from cyberpunk/terminal interfaces, creating an immersive data exploration environment.

### 6.2 Color Palette

| Color Role | Hex Code | Usage |
|------------|----------|-------|
| **Background Primary** | `#0d0e13` | Main background, cards |
| **Background Secondary** | `#16181f` | Elevated surfaces, modals |
| **Background Tertiary** | `#1e2028` | Hover states, inputs |
| **Primary Accent (Cyan)** | `#00FFD1` | Primary actions, highlights, links |
| **Secondary Accent (Green)** | `#2FF801` | Success states, data visualization |
| **Tertiary Accent (Red)** | `#FF7073` | Errors, warnings, negative indicators |
| **Text Primary** | `#E8E8E8` | Headings, important text |
| **Text Secondary** | `#A0A0A0` | Body text, descriptions |
| **Text Muted** | `#606060` | Placeholders, disabled states |
| **Border** | `#2A2A35` | Dividers, card borders |

### 6.3 Typography

| Element | Font Family | Weight | Size |
|---------|-------------|--------|------|
| **Display/H1** | Space Mono | 700 | 32px |
| **H2** | Space Mono | 600 | 24px |
| **H3** | Space Mono | 500 | 18px |
| **Body Large** | Space Grotesk | 400 | 16px |
| **Body** | Space Grotesk | 400 | 14px |
| **Data/Numbers** | Fira Code | 400 | 14px |
| **Labels** | Fira Code | 500 | 12px |
| **Micro** | Fira Code | 400 | 11px |

### 6.4 Spacing System

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight spacing, icon gaps |
| `--space-sm` | 8px | Component internal padding |
| `--space-md` | 16px | Standard spacing between elements |
| `--space-lg` | 24px | Section spacing |
| `--space-xl` | 32px | Large section gaps |
| `--space-2xl` | 48px | Page-level spacing |

### 6.5 Layout Structure

#### Bento Grid System

- 12-column grid system
- Gap: 16px
- Container max-width: 1440px
- Responsive breakpoints:
  - Mobile: < 640px (1-2 columns)
  - Tablet: 640px - 1024px (4 columns)
  - Desktop: > 1024px (12 columns)

#### Page Layout

``` ASCII
┌─────────────────────────────────────────────────────┐
│ HEADER (Fixed, 64px height)                        │
├─────────────────────────────────────────────────────┤
│ MAIN CONTENT                                        │
│ ┌─────────────────┬───────────────────────────────┐ │
│ │ SIDEBAR        │ CONTENT AREA                  │ │
│ │ (280px fixed)  │ (flex-grow)                   │ │
│ │ - Search       │ - Map / Charts / Grid         │ │
│ │ - Quick Stats  │                               │ │
│ │ - Nav          │                               │ │
│ └─────────────────┴───────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ FOOTER (48px height)                               │
└─────────────────────────────────────────────────────┘
```

### 6.6 Visual Effects

#### Scanline Overlay

```css
.scanline-overlay {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 209, 0.03) 2px,
    rgba(0, 255, 209, 0.03) 4px
  );
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
```

#### Grid Background

```css
.grid-background {
  background-image: 
    linear-gradient(rgba(42, 42, 53, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(42, 42, 53, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

#### Neon Glow Effects

```css
.neon-cyan {
  text-shadow: 0 0 10px rgba(0, 255, 209, 0.7),
               0 0 20px rgba(0, 255, 209, 0.5),
               0 0 30px rgba(0, 255, 209, 0.3);
}

.neon-border {
  box-shadow: 0 0 5px rgba(0, 255, 209, 0.5),
              inset 0 0 5px rgba(0, 255, 209, 0.1);
}
```

#### Corner Treatment

- All corners use sharp edges: `border-radius: 0`
- No rounded buttons, cards, or inputs
- Exception: Custom styled select dropdowns may use minimal 2px radius

### 6.7 Component Specifications

#### Button Styles

| Variant | Background | Border | Text Color |
|---------|------------|--------|------------|
| Primary | `#00FFD1` | 1px solid `#00FFD1` | `#0d0e13` |
| Secondary | transparent | 1px solid `#00FFD1` | `#00FFD1` |
| Danger | `#FF7073` | 1px solid `#FF7073` | `#0d0e13` |
| Disabled | `#2A2A35` | 1px solid `#2A2A35` | `#606060` |

#### Input Fields

- Background: `#1e2028`
- Border: 1px solid `#2A2A35`
- Focus border: 1px solid `#00FFD1`
- Placeholder color: `#606060`
- Height: 44px
- Padding: 12px 16px

#### Cards

- Background: `#0d0e13`
- Border: 1px solid `#2A2A35`
- Padding: 20px
- Hover: Border color transitions to `#00FFD1`

#### Data Tables

- Header background: `#16181f`
- Row hover: `#1e2028`
- Alternating rows: subtle 5% opacity difference
- Cell padding: 12px 16px

### 6.8 Icons

**Icon Library**: Material Symbols Outlined (via react-icons/md)

Key icons used:

- `MdPublic` - Globe/Map
- `MdSearch` - Search
- `MdCompareArrows` - Versus/Compare
- `MdFilterList` - Filters
- `MdLocationOn` - Location
- `MdLanguage` - Language
- `MdAttachMoney` - Currency
- `MdPeople` - Population
- `MdSquareFoot` - Area
- `MdMap` - Map
- `MdHome` - Home
- `MdClose` - Close/Clear
- `MdKeyboardArrowDown` - Dropdown

---

## 7. Technical Architecture

### 7.1 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── frontend/                    # Next.js application
│   ├── public/
│   │   ├── fonts/              # Local font files
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # Home/Map Explorer
│   │   │   ├── perfil/
│   │   │   │   └── [countryCode]/
│   │   │   │       └── page.tsx
│   │   │   ├── versus/
│   │   │   │   └── page.tsx
│   │   │   ├── databank/
│   │   │   │   └── page.tsx
│   │   │   └── globals.scss
│   │   ├── components/
│   │   │   ├── common/         # Reusable components
│   │   │   ├── layout/         # Header, Footer, Sidebar
│   │   │   ├── map/            # Map-specific components
│   │   │   ├── charts/         # Chart components
│   │   │   └── country/        # Country-specific components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API calls, data fetching
│   │   ├── store/              # State management
│   │   ├── types/              # TypeScript interfaces
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # Global SCSS, variables
│   │   └── constants/          # App constants
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   └── .prettierrc
├── .gitignore
├── .eslintrc.json               # Root ESLint (monorepo)
├── package.json                 # Root package.json for workspaces
├── tsconfig.json                # Base TypeScript config
└── README.md
```

### 7.2 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x (latest) |
| Language | TypeScript | 5.x |
| Styling | SCSS / SASS | 1.77.x |
| Map | Leaflet + react-leaflet | 4.x / 4.x |
| Charts | Recharts | 2.x |
| Icons | react-icons (Material Symbols) | 4.x |
| State | Zustand | 4.x |
| HTTP | Native Fetch API | Built-in (Next.js) |
| Lint | ESLint | 8.x |
| Format | Prettier | 3.x |
| Git Hooks | husky + lint-staged | 9.x / 15.x |

### 7.3 API Integration

**Base URL**: `https://restcountries.com/v4`

**Endpoints Used**:

| Endpoint | Purpose |
|----------|---------|
| `GET /all` | Fetch all countries (cached) |
| `GET /alpha/{code}` | Fetch single/multiple countries by code |
| `GET /region/{region}` | Filter by region |
| `GET /subregion/{subregion}` | Filter by subregion |

**Data Caching Strategy**:

- Cache all countries in memory on initial load
- TTL: 1 hour (configurable)
- Invalidate cache on explicit user action

### 7.4 Component Architecture

```
src/components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.scss
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── Input.module.scss
│   ├── Select/
│   │   ├── Select.tsx
│   │   └── Select.module.scss
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.module.scss
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   └── DataTable.module.scss
│   ├── Loader/
│   │   ├── Loader.tsx
│   │   └── Loader.module.scss
│   └── Badge/
│       ├── Badge.tsx
│       └── Badge.module.scss
├── layout/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.scss
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.scss
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   └── Sidebar.module.scss
│   └── Layout.tsx
├── map/
│   ├── WorldMap/
│   │   ├── WorldMap.tsx
│   │   └── WorldMap.module.scss
│   ├── CountryMarker/
│   │   └── CountryMarker.tsx
│   └── MapControls/
│       └── MapControls.tsx
├── charts/
│   ├── ComparisonChart/
│   │   ├── ComparisonChart.tsx
│   │   └── ComparisonChart.module.scss
│   ├── BarChart/
│   │   ├── BarChart.tsx
│   │   └── BarChart.module.scss
│   └── DataViz/
│       └── DataViz.tsx
└── country/
    ├── CountryCard/
    │   ├── CountryCard.tsx
    │   └── CountryCard.module.scss
    ├── CountryDetail/
    │   ├── CountryDetail.tsx
    │   └── CountryDetail.module.scss
    ├── CountrySearch/
    │   ├── CountrySearch.tsx
    │   └── CountrySearch.module.scss
    └── CountryFlag/
        ├── CountryFlag.tsx
        └── CountryFlag.module.scss
```

### 7.5 State Management (Zustand)

```typescript
// Store structure
interface AppStore {
  // Countries
  countries: Country[];
  selectedCountry: Country | null;
  comparisonCountries: Country[];
  
  // Filters
  activeFilters: {
    language: string | null;
    currency: string | null;
    region: string | null;
    subregion: string | null;
  };
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCountries: () => Promise<void>;
  selectCountry: (country: Country) => void;
  addToComparison: (country: Country) => void;
  removeFromComparison: (countryCode: string) => void;
  setFilter: (filterType: string, value: string | null) => void;
  clearFilters: () => void;
}
```

### 7.6 Routing Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home/Map Explorer | Interactive world map with sidebar |
| `/perfil/[countryCode]` | Country Profile | Detailed country information |
| `/versus` | Comparison | Multi-country comparison view |
| `/databank` | Databank | Filter and explore all countries |

---

## 8. Component Behavior Specifications

### 8.1 Map Interaction

1. Initial load: Map centers on coordinates [20, 0] with zoom level 2
2. On country click: Pan to country bounds, zoom to level 4, fetch country data
3. Search selection: Fly animation to country bounds with zoom 5
4. Cluster markers for small territories (optional enhancement)

### 8.2 Search Autocomplete

1. User types in search input
2. After 300ms debounce, filter countries by name (case-insensitive, partial match)
3. Display up to 8 results in dropdown with flag + name
4. On selection: Navigate to profile page + fly map to country
5. Keyboard: Arrow to navigate, Enter to select, Escape to close

### 8.3 Versus Mode

1. Default: Empty state with "Add countries" prompt
2. Add first country: Search or select from recent
3. Add second/third country: Same flow
4. Chart renders automatically when 2+ countries selected
5. Remove: Click X on country chip
6. Clear all: Reset button

### 8.4 Databank Filters

1. Multi-select dropdown for Language
2. Multi-select dropdown for Currency
3. Single-select for Region
4. Single-select for Subregion (updates based on Region)
5. Results display: Grid of CountryCards
6. Pagination: 20 items per page
7. Sort: By name (A-Z), population (desc), area (desc)

---

## 9. Acceptance Criteria

### 9.1 Functional Acceptance

| ID | Criteria | Test Method |
|----|----------|-------------|
| AC-001 | Map loads and displays all countries | Visual verification |
| AC-002 | Clicking a country fetches and displays its data | Click test |
| AC-003 | Search autocomplete shows relevant results within 500ms | Performance test |
| AC-004 | Selecting a country via search zooms map to that country | Visual verification |
| AC-005 | Versus mode displays comparison chart for 2+ countries | Functional test |
| AC-006 | Filters correctly narrow down country list | Functional test |
| AC-007 | All pages accessible via navigation | Navigation test |
| AC-008 | Mobile responsive layout works correctly | Device testing |

### 9.2 Visual Acceptance

| ID | Criteria | Checkpoint |
|----|----------|------------|
| VC-001 | Cyberpunk color scheme applied consistently | Hex verification |
| VC-002 | Typography matches specification | Visual inspection |
| VC-003 | Scanline overlay visible on all pages | Visual verification |
| VC-004 | Neon glow effects on interactive elements | Interaction test |
| VC-005 | Sharp corners (0 border-radius) on all elements | CSS inspection |
| VC-006 | Grid background visible | Visual verification |
| VC-007 | Icons render correctly (Material Symbols) | Visual inspection |

### 9.3 Performance Acceptance

| ID | Criteria | Threshold |
|----|----------|-----------|
| PC-001 | First Contentful Paint | < 1.5s |
| PC-002 | Time to Interactive | < 3s |
| PC-003 | Lighthouse Performance Score | > 80 |
| PC-004 | No layout shifts (CLS) | 0 |

### 9.4 Accessibility Acceptance

| ID | Criteria | Standard |
|----|----------|----------|
| AC-001 | All interactive elements keyboard accessible | WCAG 2.1 |
| AC-002 | Color contrast meets 4.5:1 ratio | WCAG AA |
| AC-003 | ARIA labels on custom components | WCAG 2.1 |
| AC-004 | Focus indicators visible | WCAG 2.1 |

---

## 10. Timeline / Phases

### Phase 1: Foundation (Week 1-2)

- Project setup (Next.js + TypeScript + SCSS)
- Design system implementation (colors, typography, base components)
- API integration (REST Countries client)
- Basic layout (Header, Footer, Sidebar)

**Deliverables**: Empty shell project with design system and API client

### Phase 2: Map Explorer (Week 3-4)

- Leaflet map integration
- Country click handling
- Search with autocomplete
- Basic country cards

**Deliverables**: Functional map with country selection

### Phase 3: Country Profile (Week 5-6)

- Profile page implementation
- All data fields display
- Data formatting utilities
- Navigation integration

**Deliverables**: Complete country detail pages

### Phase 4: Versus Mode (Week 7-8)

- Comparison selection UI
- Chart component (Recharts)
- Comparison logic and display

**Deliverables**: Functional comparison feature

### Phase 5: Databank & Filters (Week 9-10)

- Filter UI components
- Filter logic implementation
- Grid display with pagination

**Deliverables**: Searchable, filterable country database

### Phase 6: Polish & Deploy (Week 11-12)

- Performance optimization
- Accessibility audit fixes
- Production deployment
- Testing and bug fixes

**Deliverables**: Production-ready application

---

## 11. Risks and Dependencies

### 11.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API rate limiting | Medium | High | Implement caching, request throttling |
| Map performance with 250+ markers | Medium | Medium | Use clustering, lazy load |
| TypeScript strict mode breaking changes | Low | Medium | Incremental adoption, proper types |
| Browser compatibility issues | Low | Medium | Test across browsers, polyfills |

### 11.2 External Dependencies

| Dependency | Risk | Mitigation |
|------------|------|------------|
| REST Countries API availability | Low | Cache aggressively, show cached data |
| Leaflet map tiles availability | Low | Use reliable tile providers (OpenStreetMap) |
| Font CDN availability | Low | Self-host fonts |
| react-icons updates | Low | Pin versions |

### 11.3 Project Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep (additional features) | High | Medium | Strict PRD adherence, clear priorities |
| Design implementation time | Medium | Medium | Detailed specs, reusable components |
| Testing coverage gaps | Medium | Medium | Automated tests for critical paths |

---

## 12. Appendix

### A. Data Field Mapping

The application will utilize the following fields from REST Countries API:

| Category | Fields |
|----------|--------|
| **Identity** | name.common, name.official, cca2, cca3, ccn3, cioc, fifa, idd.root, idd.suffixes |
| **Status** | independent, status, unMember, sovereignState |
| **Geography** | capital, capitalInfo.latlng, altSpellings, region, subregion, continents, landlocked, borders, area, maps.googleMaps, maps.openStreetMaps |
| **Demographics** | population, demonyms.eng.f, demonyms.eng.m, density |
| **Economy** | currencies.{code}.name, currencies.{code}.symbol, gini |
| **Culture** | languages, religions, ethnicity, government, nationalHoliday.name, anthem.name, anthem.lyrics, hdi |
| **Transport** | car.signs, car.side, postalCode.format |
| **Time** | startOfWeek, timezones |
| **Finance** | tld, callingCodes, regionalBlocs |
| **Visuals** | flag (emoji/SVG), coatOfArms.png |

### B. Component States

All interactive components should implement these states:

- Default
- Hover
- Active/Focus
- Disabled
- Loading
- Error

### C. Error Handling

| Scenario | User Feedback |
|----------|---------------|
| API failure | Toast notification with retry button |
| No search results | "No countries found" message |
| Invalid country code | Redirect to 404 page |
| Network offline | Cached data + offline indicator |

---

*Document Version: 1.0*  
*Last Updated: April 2026*  
*Prepared for: Atlas Ciber-Neón Development Team*
