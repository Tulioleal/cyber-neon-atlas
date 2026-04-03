## Phase 6: Filters & Polish

### Overview

Implement advanced filters and final polish. This phase adds language/currency filters and ensures production readiness.

### Features

1. Advanced Filtering System
2. Performance Optimization
3. Accessibility & Cross-Browser Testing

### Tasks

**6.1 Build Language Filter**

- Create LanguageFilter component
- Fetch all unique languages from countries
- Implement multi-select dropdown
- Add search within languages

**6.2 Build Currency Filter**

- Create CurrencyFilter component
- Extract all unique currencies
- Implement multi-select with checkboxes
- Show currency symbols in options

**6.3 Implement Region Filter**

- Create RegionFilter component
- Use predefined regions (Africa, Americas, Asia, Europe, Oceania)
- Implement single-select or multi-select
- Add subregion filtering

**6.4 Add Combined Filter Logic**

- Create FilterProvider context
- Implement AND logic between filters
- Add URL query params sync
- Create "Clear all filters" button

**6.5 Performance Optimization**

- Implement virtualization for long lists
- Add lazy loading for images
- Optimize bundle size with code splitting
- Implement caching strategies

**6.6 Accessibility Audit**

- Run axe-core automated tests
- Add ARIA labels to all components
- Ensure keyboard navigation works
- Add focus management

**6.7 Cross-Browser Testing**

- Test in Chrome, Firefox, Safari, Edge
- Fix CSS compatibility issues
- Test touch interactions on mobile
- Verify responsive layouts

**6.8 Final Bug Fixes & Polish**

- Fix any remaining bugs
- Polish animations and transitions
- Review all error states
- Final visual QA pass

### Detailed Plan

1. 6.1.1 Create src/components/filters/LanguageFilter.tsx
1. 6.1.2 Extract unique languages from country data
1. 6.1.3 Create searchable multi-select component
1. 6.1.4 Use Checkbox for selection
1. 6.1.5 Add "X languages selected" count badge

1. 6.2.1 Create src/components/filters/CurrencyFilter.tsx
1. 6.2.2 Extract currencies with codes and names
1. 6.2.3 Create multi-select with checkboxes
1. 6.2.4 Show currency symbol ($, €, etc.) in options
1. 6.2.5 Group by currency code

1. 6.3.1 Create src/components/filters/RegionFilter.tsx
1. 6.3.2 Use defined regions from API
1. 6.3.3 Add radio buttons for single select
1. 6.3.4 Add "All Regions" option
1. 6.3.5 Include subregion dropdown

1. 6.4.1 Create src/contexts/FilterContext.tsx
1. 4.2 Combine all filter states
1. 4.3 Implement useMemo for filtered results
1. 4.4 Sync with URL searchParams
1. 4.5 Create FilterSummary component

1. 6.5.1 Install react-window for virtualization
1. 5.2 Virtualize country list in sidebar
1. 5.3 Add dynamic imports for heavy components
1. 5.4 Configure TanStack Query prefetching
1. 5.5 Optimize images with next/image

1. 6.6.1 Install axe-core: `npm install -D @axe-core/react`
1. 6.2 Add aria-label to all interactive elements
1. 3 Add aria-expanded for dropdowns
1. 4 Use semantic HTML (main, nav, article)
1. 5 Add skip links for keyboard users
1. 6 Manage focus on route changes

1. 6.7.1 Test in all major browsers
1. 2 Add vendor prefixes where needed
1. 3 Test touch gestures on mobile
1. 4 Verify viewport meta tag works
1. 5 Check console for errors

1. 6.8.1 Review GitHub issues for bugs
1. 2 Polish micro-interactions
1. 3 Add skeleton loading states
1. 4 Verify all error messages are helpful
1. 5 Final design QA with screenshots
