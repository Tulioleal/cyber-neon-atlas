# PHASE-006: Polish & Deploy

## Overview
This final phase focuses on polish, optimization, and production deployment. It includes performance improvements (code splitting, image optimization, bundle analysis), accessibility fixes (WCAG 2.1 AA compliance audit), comprehensive testing (unit tests, integration tests, E2E tests), bug fixes, and deployment to production. The goal is to deliver a production-ready application that is fast, accessible, and stable.

## Features
- Performance Optimization
- Accessibility Audit and Fixes
- Production Deployment
- Testing and Bug Fixes

## Tasks

### Performance Optimization
- [ ] Task 1.1: Analyze bundle size using next build analyze or @next/bundle-analyzer
- [ ] Task 1.2: Implement code splitting with dynamic imports for heavy components (Map, Charts)
- [ ] Task 1.3: Optimize images using next/image with proper sizing and lazy loading
- [ ] Task 1.4: Implement React.lazy() for Versus page and other non-critical routes
- [ ] Task 1.5: Add service worker for offline capability and caching static assets
- [ ] Task 1.6: Optimize API calls with proper caching headers and SWR-like strategy
- [ ] Task 1.7: Reduce JavaScript bundle by tree-shaking unused recharts components
- [ ] Task 1.8: Add performance monitoring with Web Vitals tracking

### Accessibility Audit and Fixes
- [ ] Task 2.1: Run Lighthouse accessibility audit and fix all critical issues
- [ ] Task 2.2: Ensure all interactive elements are keyboard accessible
- [ ] Task 2.3: Add proper ARIA labels to map, charts, and custom components
- [ ] Task 2.4: Implement proper focus management for modals and dropdowns
- [ ] Task 2.5: Add skip-to-content links for screen readers
- [ ] Task 2.6: Ensure color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Task 2.7: Add screen reader announcements for dynamic content updates
- [ ] Task 2.8: Test with NVDA and VoiceOver screen readers

### Production Deployment
- [ ] Task 3.1: Configure environment variables for production API endpoints
- [ ] Task 3.2: Set up Vercel or alternative hosting (Netlify, AWS, etc.)
- [ ] Task 3.3: Configure build pipeline with proper Node.js version (18+)
- [ ] Task 3.4: Set up custom domain if applicable
- [ ] Task 3.5: Configure CDN for static assets and image optimization
- [ ] [ Task 3.6: Set up monitoring and error tracking (Sentry)
- [ ] Task 3.7: Configure CI/CD pipeline for automatic deployments on main branch
- [ ] Task 3.8: Run production build and verify no errors

### Testing and Bug Fixes
- [ ] Task 4.1: Write unit tests for utility functions (formatters, filter logic)
- [ ] Task 4.2: Write component tests for UI components using React Testing Library
- [ ] Task 4.3: Write integration tests for critical user flows (search, filter, compare)
- [ ] Task 4.4: Set up E2E tests with Playwright or Cypress for critical paths
- [ ] Task 4.5: Fix any bugs discovered during testing
- [ ] Task 4.6: Perform cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Task 4.7: Test on real devices (mobile, tablet) for responsive issues
- [ ] Task 4.8: Conduct final QA pass to verify all features work as expected

## Detailed Plan

### Performance Optimization Implementation
1. **Bundle Analysis**: Run `npm run build` then analyze .next/static chunks, identify large dependencies
2. **Dynamic Imports**: Use next/dynamic for Map component: `const Map = dynamic(() => import('@/components/map/Map'), { ssr: false })`
3. **Image Optimization**: Convert flag images to use next/image with sizes prop, use WebP format
4. **Memoization**: Wrap expensive computations with useMemo, useCallback for event handlers
5. **Service Worker**: Add basic offline page via next-pwa or custom service worker

### Accessibility Implementation
1. **Audit**: Use Chrome DevTools Accessibility pane, Axe browser extension, and Lighthouse
2. **Keyboard Navigation**: Ensure Tab order is logical, all buttons/links are focusable
3. **ARIA Labels**: Add aria-label to icon buttons, role="presentation" to decorative elements
4. **Focus Management**: Create useFocusTrap hook for modals, restore focus on close
5. **Color Check**: Verify text colors against background pass contrast requirements, adjust neon colors if needed
6. **Testing**: Install NVDA on Windows for testing, use VoiceOver on Mac

### Deployment Implementation
1. **Hosting Setup**: Deploy to Vercel (recommended for Next.js) with GitHub integration
2. **Environment**: Add VERCEL_URL, production API base URL in Vercel dashboard
3. **Build Command**: vercel build with NODE_VERSION=18
4. **Custom Domain**: Point domain to Vercel nameservers, add to project settings
5. **Monitoring**: Integrate Sentry for error tracking, add Sentry.init() in app initialization

### Testing Implementation
1. **Unit Tests**: Create tests/utils/formatters.test.ts, tests/utils/filters.test.ts
2. **Component Tests**: Create tests/components/Button.test.tsx using @testing-library/react
3. **Test Fixtures**: Create mock country data for consistent testing
4. **E2E Setup**: Configure Playwright for full browser testing
5. **Test Coverage**: Target 70%+ code coverage for critical paths

## Dependencies
- **External**: Lighthouse, Axe, Playwright or Cypress, Sentry, Vercel/Netlify
- **Internal**: Complete application from all previous phases

## Deliverables
- Optimized production build with reduced bundle size
- Fully accessible application meeting WCAG 2.1 AA standards
- Deployed application on production URL
- Comprehensive test suite with unit, integration, and E2E tests
- Error monitoring and performance tracking configured
- Final QA sign-off with all critical bugs resolved