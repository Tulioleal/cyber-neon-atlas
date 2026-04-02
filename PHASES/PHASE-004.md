# PHASE-004: Versus Mode

## Overview
This phase implements the country comparison feature called "Versus Mode" that allows users to compare 2-3 countries side-by-side. The comparison displays key metrics using bar charts created with Recharts, shows percentage differences between countries, and highlights the winner (highest/lowest) for each metric with visual indicators. This feature transforms the data exploration experience by enabling direct country-to-country analysis.

## Features
- Comparison Selection UI
- Multi-Country Comparison (2-3 countries)
- Bar Charts with Recharts
- Percentage Difference Display
- Winner Highlighting

## Tasks

### Comparison Selection UI
- [ ] Task 1.1: Create Versus mode page at `/versus` route
- [ ] Task 1.2: Build country selector dropdowns using existing search autocomplete component
- [ ] Task 1.3: Add "Add Country" button to allow selecting 2nd and 3rd country (max 3)
- [ ] Task 1.4: Implement "Remove" button for each selected country
- [ ] Task 1.5: Add "Swap Countries" button to rearrange comparison order
- [ ] Task 1.6: Pre-populate first country from URL params if coming from profile page
- [ ] Task 1.7: Show quick-select suggestions for popular comparisons

### Multi-Country Comparison
- [ ] Task 2.1: Fetch all selected countries data in parallel using Promise.all
- [ ] Task 2.2: Create comparison data structure with unified metrics across countries
- [ ] Task 2.3: Normalize data for consistent comparison (handle missing values, different units)
- [ ] Task 2.4: Implement comparison categories: Population, Area, GDP, GDP per Capita, HDI, Life Expectancy
- [ ] Task 2.5: Add comparison for additional metrics: Capital, Currency, Language, Timezone
- [ ] Task 2.6: Handle edge cases when countries have no comparable data

### Bar Charts with Recharts
- [ ] Task 3.1: Create ComparisonChart component using Recharts BarChart
- [ ] Task 3.2: Configure horizontal bar chart layout for better label readability
- [ ] Task 3.3: Style chart with cyberpunk color palette (different neon color per country)
- [ ] Task 3.4: Add proper axis labels and value tooltips
- [ ] Task 3.5: Implement responsive sizing with viewBox for different screen sizes
- [ ] Task 3.6: Add chart animation on data load

### Percentage Difference Display
- [ ] Task 4.1: Calculate percentage difference between highest and lowest values
- [ ] Task 4.2: Display percentage difference as text below each chart
- [ ] Task 4.3: Create diff indicator showing "+X%" or "-X%" from baseline
- [ ] Task 4.4: Format large percentage differences with proper notation (e.g., "15,000% larger")
- [ ] Task 4.5: Show absolute difference in numbers alongside percentage

### Winner Highlighting
- [ ] Task 5.1: Determine winner for each metric (highest for positive, lowest for negative metrics)
- [ ] Task 5.2: Add trophy/crown icon next to winner value with neon glow effect
- [ ] Task 5.3: Create "vs" badge showing head-to-head winner for 2-country comparisons
- [ ] Task 5.4: Build "Overall Winner" summary section counting wins across all metrics
- [ ] Task 5.5: Add tie handling with special "TIE" indicator
- [ ] Task 5.6: Style winning values with green (#2FF801) accent, losers with muted styling

## Detailed Plan

### Versus Page Implementation
1. **Route Setup**: Create `src/app/versus/page.tsx` with Suspense boundary and loading state
2. **Selection Panel**: Build `src/components/versus/CountrySelector.tsx` using search component for autocomplete
3. **Country Cards**: Create `src/components/versus/CountryBadge.tsx` with flag, name, and remove button
4. **State Management**: Use Zustand store to track selected countries array, persist in sessionStorage

### Chart Implementation
1. **Data Preparation**: Transform country data to array format [{ country: "USA", value: 331000000 }, { country: "CAN", value: 38000000 }]
2. **Chart Component**: Create `src/components/versus/ComparisonChart.tsx` with BarChart, XAxis, YAxis, Tooltip, Bar
3. **Custom Colors**: Use cyan (#00FFD1), green (#2FF801), pink (#FF7073) for up to 3 countries
4. **Tooltip**: Create CustomTooltip showing country name, metric value formatted properly
5. **Responsive**: Use ResponsiveContainer to fill parent width, set min-height for mobile

### Comparison Logic Implementation
1. **Metric Definitions**: Create `src/constants/comparisonMetrics.ts` with all comparable fields and their display names
2. **Winner Calculation**: Implement getWinner() function comparing values, returning { winner: countryCode, diff: number }
3. **Percentage Calc**: Formula: ((max - min) / min) * 100 for percentage difference
4. **Text Generation**: Create getComparisonText() for natural language descriptions

### Styling Implementation
1. **Layout**: Use CSS Grid for side-by-side country cards at top, charts below
2. **Chart Colors**: Each country gets unique neon color for easy visual distinction
3. **Winner Badge**: Absolute positioned crown/trophy icon with #2FF801 glow
4. **Animations**: Fade in charts on load, pulse animation on winner highlight

## Dependencies
- **External**: Recharts for visualization
- **Internal**: PHASE-001 UI components, PHASE-003 country data types, existing search component

## Deliverables
- Functional Versus mode page with country selector (2-3 countries)
- Bar charts displaying key metrics with proper formatting
- Percentage difference calculation and display
- Visual winner highlighting with crown icons and color coding
- Overall winner summary showing total wins per country
- Pre-populated selection from profile page link
- Responsive design for mobile and desktop comparison views