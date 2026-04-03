## Phase 5: Comparison Mode

### Overview

Build versus/comparison functionality with bar charts and radar charts for side-by-side country analysis.

### Features

1. Versus Page Layout
2. Comparative Charts
3. Intersection Analysis

### Tasks

**5.1 Create Versus Page Layout**

- Create src/app/versus/page.tsx
- Implement dual country selector
- Build side-by-side layout
- Add responsive design for mobile

**5.2 Build Dual Country Selector**

- Create CountrySelector component
- Implement searchable dropdown
- Add "vs" divider between selectors
- Show selected country flags

**5.3 Implement Comparative Bar Charts**

- Create BarChart component
- Compare: population, area, GDP
- Add animated bar transitions
- Include value labels on bars

**5.4 Build Radar Chart Comparison**

- Create RadarChart component
- Compare metrics: economy, quality of life, cost of living, safety, climate
- Overlay both countries on same chart
- Add legend with country colors

**5.5 Implement Intersection Analysis**

- Create IntersectionCard component
- Show shared languages, currencies
- Display timezones overlap
- Highlight differences section

**5.6 Add Export Functionality**

- Create ExportButton component
- Implement PNG export of comparison
- Add PDF report generation
- Copy comparison to clipboard

### Detailed Plan

1. 5.1.1 Create src/app/versus/page.tsx
1. 5.1.2 Implement split-screen layout (50/50)
1. 5.1.3 Add header with "Versus" title
1. 5.1.4 Create responsive layout (stack on mobile)
1. 5.1.5 Add comparison header showing both countries

1. 6.2.1 Create src/components/comparison/CountrySelector.tsx
1. 6.2.2 Use react-select or custom dropdown
1. 6.2.3 Add search with autocomplete
1. 6.2.4 Display flag + name in selected state
1. 6.2.5 Add clear button for each selector

1. 7.3.1 Create src/components/charts/BarChart.tsx using recharts
1. 7.3.2 Prepare data: [{ name: 'Population', country1: 1000000, country2: 2000000 }]
1. 7.3.3 Add animated transitions on data change
1. 7.3.4 Style bars with country colors
1. 7.3.5 Add value tooltips on hover

1. 8.4.1 Create src/components/charts/RadarChart.tsx using recharts
1. 8.4.2 Normalize metrics to 0-100 scale
1. 8.4.3 Render both countries as overlays
1. 8.4.4 Add interactive legend
1. 8.4.5 Style with cyberpunk color scheme

1. 9.5.1 Create src/components/comparison/IntersectionCard.tsx
1. 9.5.2 Compare arrays: languages, currencies, timezones
1. 9.5.3 Find intersection (shared items)
1. 9.5.4 Show unique items for each country
1. 9.5.5 Style with visual distinction

1. 10.6.1 Install html2canvas: `npm install html2canvas`
1. 10.6.2 Create ExportButton component
1. 10.6.3 Implement screenshot of comparison section
1. 10.6.4 Add "Share" button to copy URL with query params
1. 10.6.5 Create printable CSS for PDF export
