# PHASE-001: Foundation

## Overview

This phase establishes the complete project foundation for Atlas Ciber-Neón. It includes setting up Next.js 16 with TypeScript and SCSS, implementing the cyberpunk design system, integrating the REST Countries API client, and creating the basic layout components (Header, Footer, Navigation). The goal is to have a working skeleton application with proper tooling, styling infrastructure, and data access layer ready for feature development.

## Features

- Project Setup (Next.js 16 + TypeScript + SCSS)
- Cyberpunk Design System Implementation
- REST Countries API Client Integration
- Basic Layout Components (Header, Footer, Navigation)

## Tasks

### Project Setup

- [ ] Task 1.1: Initialize Next.js 16 project with TypeScript template using `npx create-next-app@latest --typescript`
- [ ] Task 1.2: Configure SCSS support and set up module-based styling approach
- [ ] Task 1.3: Set up ESLint and Prettier with cyberpunk-friendly formatting rules
- [ ] Task 1.4: Install core dependencies: `zustand`, `react-leaflet`, `leaflet`, `recharts`, `react-icons`, `sass`
- [ ] Task 1.5: Configure TypeScript paths with `@/` alias for cleaner imports
- [ ] Task 1.6: Set up Git repository and initial commit with .gitignore for node_modules, .next, etc.

### Design System Implementation

- [ ] Task 2.1: Create SCSS variables file with cyberpunk color palette (#0d0e13, #16181f, #1e2028 backgrounds, #00FFD1 cyan, #2FF801 green, #FF7073 red accents, #E8E8E8, #A0A0A0, #606060 text colors)
- [ ] Task 2.2: Import and configure Google Fonts (Space Mono, Space Grotesk, Fira Code) in Next.js layout
- [ ] Task 2.3: Create global SCSS with CSS reset, base typography, and utility classes
- [ ] Task 2.4: Build reusable UI component library: Button, Card, Input, Badge, Loader, Modal
- [ ] Task 2.5: Implement cyberpunk glow effects and neon border utilities
- [ ] Task 2.6: Create responsive breakpoints mixins for mobile/tablet/desktop

### REST Countries API Client Integration

- [ ] Task 3.1: Create API service layer using Native Fetch API with base configuration
- [ ] Task 3.2: Implement GET /all endpoint to fetch complete country dataset
- [ ] Task 3.3: Implement GET /alpha/{code} endpoint for single country lookup
- [ ] Task 3.4: Create TypeScript interfaces for Country, Currency, Language, RegionalBloc types
- [ ] Task 3.5: Add error handling with custom API error classes
- [ ] Task 3.6: Implement request caching layer with Zustand for performance optimization

### Basic Layout Components

- [ ] Task 4.1: Build fixed Header component with logo, navigation links (Home, Versus, Databank), and mobile hamburger menu
- [ ] Task 4.2: Create Footer component with copyright, social links, and credits
- [ ] Task 4.3: Implement responsive navigation with mobile drawer/overlay
- [ ] Task 4.4: Create main layout wrapper with proper structure and CSS Grid/Flexbox
- [ ] Task 4.5: Add skip-to-content accessibility links
- [ ] Task 4.6: Implement Loading states with cyberpunk-styled spinners

## Detailed Plan

### Project Setup Implementation

1. **Initialize Next.js Project**: Run `npx create-next-app@latest atlas-ciber-neon --typescript --eslint --src-dir --app --import-alias "@/*"` in the projects directory
2. **Install Dependencies**: Navigate to project and run `npm install zustand react-leaflet leaflet recharts react-icons sass` for core dependencies
3. **Configure SCSS**: Create `src/styles/variables.scss` and `src/styles/mixins.scss`, then add to next.config.js
4. **TypeScript Config**: Update tsconfig.json to include path aliases and strict mode settings

### Design System Implementation

1. **Color Variables**: Define all cyberpunk colors as SCSS variables in `src/styles/variables.scss` with semantic naming (--color-bg-primary, --color-accent-cyan, etc.)
2. **Font Setup**: Add `<link>` tags for Space Mono (400, 700), Space Grotesk (400, 500, 700), Fira Code (400) in layout.tsx
3. **Global Styles**: Create `src/styles/global.scss` with base styles for html, body, headings, links, and utility classes
4. **Component Library**: Create `src/components/ui/` directory with Button, Card, Input, Badge components using CSS modules
5. **Glow Effects**: Implement box-shadow based neon glow mixins using cyan (#00FFD1), green (#2FF801), and red (#FF7073)

### API Client Implementation

1. **Service Layer**: Create `src/services/api.ts` with Fetch API instance configured for REST Countries API (<https://restcountries.com/v4>)
2. **Type Definitions**: Create `src/types/country.ts` with interfaces for all country data structures
3. **API Methods**: Implement fetchAllCountries() and fetchCountryByCode() in `src/services/countryService.ts`
4. **State Store**: Create `src/stores/countryStore.ts` using Zustand to cache API responses

### Layout Components Implementation

1. **Header**: Build `src/components/layout/Header.tsx` with fixed position, logo, nav links, and hamburger for mobile
2. **Footer**: Build `src/components/layout/Footer.tsx` with minimal content and responsive design
3. **Navigation**: Create responsive nav that switches between horizontal links (desktop) and hamburger menu (mobile/tablet)
4. **Main Layout**: Update `src/app/layout.tsx` to include Header, Footer, and children properly

## Dependencies

- **External**: Next.js 16, React 18, TypeScript 5, Leaflet, Recharts, React Icons, Zustand, Fetch API
- **Internal**: This is the foundation phase with no internal dependencies

## Deliverables

- Fully configured Next.js 16 project with TypeScript and SCSS
- Complete cyberpunk design system with colors, typography, and base components
- REST Countries API client with type-safe service methods
- Functional layout with Header, Footer, and responsive navigation
- Git repository initialized with proper configuration
