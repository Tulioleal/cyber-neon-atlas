## Phase 4: Country Profile

### Overview

Build detailed country profile page with all data visualizations. This phase creates the bento-grid layout displaying economy, demographics, and geopolitics data.

### Features

1. Country Detail View
2. Data Visualization Components

### Tasks

**4.1 Create Country Detail View**

- Create src/app/country/[code]/page.tsx
- Implement SSR data fetching
- Add loading skeleton component
- Handle country not found error

**4.2 Build Bento-Grid Layout**

- Create src/components/bento/BentoGrid.tsx
- Create src/components/bento/BentoCard.tsx
- Implement responsive grid (1-4 columns)
- Add gap and padding tokens

**4.3 Implement Economy Telemetry Section**

- Create EconomyCard component
- Display GDP, GDP per capita, inflation
- Add trend indicators (up/down arrows)
- Implement data formatting (currency, compact)

**4.4 Implement Demographics Section**

- Create DemographicsCard component
- Display population, area, density
- Add population pyramid visualization
- Show language distribution

**4.5 Implement Geopolitics Section**

- Create GeopoliticsCard component
- Display capital, region, subregion
- Show neighboring countries
- Add interactive neighbor map markers

**4.6 Add Data Visualization Components**

- Create ProgressBar component
- Create CircularProgress component
- Create StatCard component
- Implement animations for data reveal

### Detailed Plan

1. 4.1.1 Create dynamic route: src/app/country/[code]/page.tsx
1. 4.1.2 Use generateStaticParams for static export
1. 4.1.3 Fetch country data using TanStack Query
1. 4.1.4 Create CountrySkeleton loading component
1. 4.1.5 Add notFound() for invalid country codes

1. 2.1 Create BentoGrid with CSS Grid layout
2.2 Use grid-template-columns with minmax for responsiveness
2.3 Create BentoCard with title and content slots
2.4 Add variant prop for card sizes (small, medium, large, wide, tall)
2.5 Implement span calculations based on content importance

1. 3.1 Create EconomyCard component
3.2 Fetch additional economy data if needed
3.3 Format numbers with Intl.NumberFormat
3.4 Add trend arrows with color coding
3.5 Create mini sparkline for inflation trend

1. 4.1 Create DemographicsCard component
4.2 Calculate population density (population/area)
4.3 Create simple population bar visualization
4.4 Display top 5 languages with percentages
4.5 Add area conversion (km² to sq mi)

1. 5.1 Create GeopoliticsCard component
5.2 Display capital city with map marker
5.3 Show region and subregion with badges
5.4 Fetch neighboring countries from API
5.5 Add clickable neighbors to navigate to their pages

1. 6.1 Create ProgressBar with animated fill
6.2 Create CircularProgress with SVG
6.3 Create StatCard with icon, label, and value
6.4 Add framer-motion for reveal animations
6.5 Implement number counting animation
