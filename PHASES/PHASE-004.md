# Phase 4: Versus Mode

## Overview

This phase implements the Versus Mode feature that allows users to compare 2-3 countries side-by-side. It includes country selection UI, comparison chart components using Recharts, and the logic to calculate and display percentage differences between countries with visual highlighting of winners.

## Features

- Dual/triple country selection interface
- Comparison chart component with bar charts
- Comparison logic and percentage calculations
- Winner highlighting in each category
- Dynamic add/remove of countries
- Session persistence for selected countries

## Tasks

### Task 4.1: Versus Page Structure

**Feature:** Dual/triple country selection
**Description:** Create the Versus page route and basic layout
**Deliverables:** Page structure with selection area and chart area

#### Detailed Plan

1. Create `src/app/versus/page.tsx`:
   - Main page component
   - Two sections: Country selector (top) and Charts (bottom)
2. Create `src/components/versus/VersusLayout/VersusLayout.tsx`:
   - Container with header
   - Three slots for country selection
   - Chart display area
3. Create `src/components/versus/VersusLayout/VersusLayout.module.scss`:
   - Grid layout for country slots
   - Full-width chart area
   - Responsive: stack on mobile, side-by-side on desktop
4. Add page state:
   - Empty state: "Select countries to compare"
   - Partial state: 1-2 countries selected
   - Full state: 3 countries selected

---

### Task 4.2: Country Selector Component

**Feature:** Dual/triple country selection
**Description:** Create selector component for adding countries to comparison
**Deliverables:** Working country selection interface

#### Detailed Plan

1. Create `src/components/versus/CountrySelector/CountrySelector.tsx`:
   - Search input with autocomplete
   - Dropdown showing matching countries
   - Selected country display (flag + name)
   - Remove (X) button to clear selection
2. Implement search functionality:
   - Filter from cached country list
   - Show flag + name in results
   - Max 8 suggestions
3. Create selector states:
   - Empty: Show "Select country" placeholder
   - Active: Show selected country info
   - Hover: Highlight with cyan border
4. Create multiple selectors:
   - Slot 1: Country A
   - Slot 2: Country B
   - Slot 3: Country C (optional)
   - Disable Slot 3 until Slot 2 filled

---

### Task 4.3: Quick Selection from Recent

**Feature:** Dual/triple country selection
**Description:** Add quick access to recently viewed or selected countries
**Deliverables:** Recent countries list for fast selection

#### Detailed Plan

1. Track recently viewed countries:
   - Store last 10 viewed countries
   - Persist in localStorage
   - Show in "Recent" section of selector
2. Create recent countries display:
   - Horizontal scrollable list
   - Thumbnail: Flag + Name
   - Click to select
3. Create "Popular" quick selection:
   - Show top 10 most viewed countries
   - Persist across sessions
4. Add "Clear All" button:
   - Reset all three slots
   - Confirmation if countries selected

---

### Task 4.4: Comparison Chart Component

**Feature:** Comparison chart component
**Description:** Create bar chart component for comparing metrics
**Deliverables:** Recharts-based comparison visualization

#### Detailed Plan

1. Create `src/components/charts/ComparisonChart/ComparisonChart.tsx`:
   - Recharts BarChart component
   - Horizontal bar layout
   - Multiple series (one per country)
2. Create `src/components/charts/ComparisonChart/ComparisonChart.module.scss`:
   - Cyberpunk styled chart
   - Green neon bars (#2FF801)
   - Grid background
   - Animated on data load
3. Configure chart:
   - Y-axis: Country names
   - X-axis: Metric value
   - Tooltip: Show exact value
   - Legend: Show country colors
4. Handle responsive:
   - Resize chart on window resize
   - Mobile: vertical layout
   - Desktop: horizontal bars

---

### Task 4.5: Population Comparison Chart

**Feature:** Comparison chart component
**Description:** Create first chart comparing population of selected countries
**Deliverables:** Population comparison bar chart

#### Detailed Plan

1. Implement population chart:
   - Data: Population number from each country
   - Format: Use formatPopulation() for display
   - Scale: Automatically adjust to largest value
2. Create chart header:
   - Title: "Population Comparison"
   - Icon: MdPeople
   - Show total for each country
3. Add data labels:
   - Show value on bar end
   - Format: "47M" or "47,000,000"
4. Style bars:
   - Different shade for each country
   - Neon glow effect on hover

---

### Task 4.6: Area Comparison Chart

**Feature:** Comparison chart component
**Description:** Create chart comparing land area
**Deliverables:** Area comparison bar chart

#### Detailed Plan

1. Implement area chart:
   - Data: Area in km² from each country
   - Format: formatArea() with km² suffix
2. Create chart header:
   - Title: "Land Area Comparison"
   - Icon: MdSquareFoot
   - Show area for each country
3. Add comparison context:
   - Show multiple of comparison
   - e.g., "Country A is 5.2x larger than Country B"
4. Handle edge cases:
   - Show "N/A" if area is null
   - Handle very large areas (Russia, etc.)

---

### Task 4.7: Border Count Comparison

**Feature:** Comparison chart component
**Description:** Create chart comparing number of land borders
**Deliverables:** Border count comparison bar chart

#### Detailed Plan

1. Implement border count chart:
   - Data: Length of borders array from each country
   - Format: Count as number
2. Create chart header:
   - Title: "Land Borders"
   - Icon: MdBorderAll
   - Show count for each country
3. Add extra context:
   - List border countries on hover
   - Show "Landlocked" for countries with 0
4. Sort data for chart:
   - Order by border count descending

---

### Task 4.8: Percentage Difference Calculation

**Feature:** Comparison logic and display
**Description:** Calculate and display percentage differences between countries
**Deliverables:** Percentage difference display

#### Detailed Plan

1. Create percentage calculator:
   - Formula: ((value - compareValue) / compareValue) * 100
   - Handle both directions (A vs B, B vs A)
2. Display percentage differences:
   - Show in chart tooltip
   - Show in summary section below chart
3. Format percentages:
   - Positive: "+X%" in green
   - Negative: "-X%" in red
   - Handle zero and equal values
4. Create comparison summary:
   - Text summary: "Country A is X% larger than Country B"
   - Update dynamically as selections change

---

### Task 4.9: Winner Highlighting

**Feature:** Comparison logic and display
**Description:** Highlight the highest value in each comparison category
**Deliverables:** Visual winner indicators

#### Detailed Plan

1. Create winner detection logic:
   - Compare values for each metric
   - Identify highest value
   - Handle ties (no winner)
2. Add visual indicators:
   - Trophy/crown icon next to winner
   - Highlight bar in chart
   - Bold the winner in text
3. Create winner summary card:
   - Title: "Comparison Winners"
   - List each metric with winning country
   - Show value difference
4. Style indicators:
   - Gold/yellow accent for winner
   - Animated sparkle effect
   - Cyan glow on hover

---

### Task 4.10: Add/Remove Countries Dynamically

**Feature:** Dynamic add/remove countries
**Description:** Allow users to add or remove countries during comparison
**Deliverables:** Working dynamic country management

#### Detailed Plan

1. Implement add country flow:
   - Click empty slot to open selector
   - Type to search, select from dropdown
   - Country added, chart updates
2. Implement remove country flow:
   - Click X button on selected country
   - Slot cleared, chart updates
   - Smooth animation on removal
3. Handle limit:
   - Maximum 3 countries
   - Disable "Add" when 3 selected
   - Show message: "Remove one to add another"
4. Add keyboard shortcuts:
   - Backspace to remove selected
   - Arrow keys to navigate slots

---

### Task 4.11: Session Persistence

**Feature:** Session persistence
**Description:** Persist selected countries during browser session
**Deliverables:** Countries remembered on page refresh

#### Detailed Plan

1. Implement session storage:
   - Save selected countries on change
   - Load on page mount
   - Clear on "Clear All" action
2. Use Zustand with persist middleware:
   - Add to comparison store
   - Configure for session storage
   - Add expiry (24 hours)
3. Handle page refresh:
   - Restore selected countries
   - Fetch fresh data for each country
   - Show loading while fetching
4. Handle browser back/forward:
   - Restore state correctly
   - Update URL params for shareability

---

### Task 4.12: URL-based Comparison Sharing

**Feature:** Session persistence
**Description:** Allow sharing comparison via URL parameters
**Deliverables:** Shareable comparison links

#### Detailed Plan

1. Implement URL parameters:
   - Format: ?countries=ESP,USA,BRA
   - Parse on page load
   - Auto-select countries from URL
2. Create share button:
   - Copy current URL to clipboard
   - Show confirmation toast
   - Include summary in shared link
3. Handle invalid codes:
   - Skip invalid country codes
   - Show message for removed codes
4. Add Open Graph meta tags:
   - Title: "Comparing: Spain, USA, Brazil"
   - Description: "View country comparison on Atlas Ciber-Neón"

---

## Technical Notes

- Use Recharts for chart rendering with responsive container
- Implement proper chart loading states
- Handle missing data gracefully (show N/A, skip chart)
- Use React.memo for chart performance
- Ensure accessibility for chart data (ARIA labels, screen reader descriptions)
- Use CSS animations for smooth transitions between states

## Success Criteria

- [ ] Can select 2-3 countries for comparison
- [ ] Search autocomplete works in selectors
- [ ] Population chart displays correctly
- [ ] Area chart displays correctly
- [ ] Border count chart displays correctly
- [ ] Percentage differences calculated and shown
- [ ] Winner highlighted in each category
- [ ] Can add/remove countries dynamically
- [ ] Selection persists on page refresh
- [ ] URL sharing works correctly
