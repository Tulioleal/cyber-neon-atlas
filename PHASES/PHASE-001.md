## Phase 1: Foundation

### Overview

Set up project infrastructure, API layer, design tokens, and state management. This phase establishes the technical foundation for the entire application.

### Features

1. Project Infrastructure Setup
2. Design System Implementation
3. API Service Layer
4. State Management Setup

### Tasks

**1.1 Initialize Next.js 16 Project**

- Create Next.js project with TypeScript
- Configure project structure
- Set up routing (App Router)
- Verify empty shell builds and runs

**1.2 Configure SCSS and CSS Modules**

- Install sass package
- Configure next.config.ts for SCSS
- Set up CSS module file extensions
- Create base directory structure

**1.3 Set Up ESLint, Prettier, Husky**

- Install ESLint and configure
- Install Prettier and create .prettierrc
- Install husky and initialize
- Configure lint-staged
- Create pre-commit hook scripts

**1.4 Create Design Tokens**

- Define color palette in _variables.scss
- Create typography styles in _typography.scss
- Set up spacing system
- Create mixins for common styles
- Define component tokens (buttons, inputs, cards)

**1.5 Implement REST Countries API Service**

- Create services/api.ts
- Implement fetchAllCountries()
- Implement fetchCountryByCode(code)
- Implement fetchCountriesByRegion(region)
- Handle API errors
- Add TypeScript interfaces

**1.6 Set Up TanStack Query**

- Install @tanstack/react-query
- Configure QueryClient provider
- Set up query keys and caching
- Implement useCountries hook
- Configure stale time (1 hour)

**1.7 Create Zustand Stores**

- Create useCountryStore (selectedCountry, comparedCountries)
- Create useFilterStore (filters state)
- Create useSearchStore (search state)
- Add TypeScript types for stores

### Detailed Plan

1.1.1 Run `npx create-next-app@latest frontend --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*"`
1.1.2 Navigate to frontend and install dependencies
1.1.3 Verify build: `npm run build`
1.1.4 Verify dev server starts: `npm run dev`

2.2.1 Run `npm install sass`
2.2.2 Create src/styles/ directory structure
2.2.3 Configure next.config.ts to include sass loader
2.2.4 Test SCSS compilation with sample file

3.3.1 Install ESLint: `npm install -D eslint`
3.3.2 Create .eslintrc.json with strict config
3.3.3 Install Prettier: `npm install -D prettier`
3.3.4 Create .prettierrc
3.3.5 Install husky: `npm install -D husky`
3.3.6 Run `npx husky init`
3.3.7 Install lint-staged: `npm install -D lint-staged`
3.3.8 Configure lint-staged in package.json

4.4.1 Create src/styles/_variables.scss with color tokens
4.4.2 Create src/styles/_typography.scss with font definitions
4.4.3 Create src/styles/_mixins.scss with reusable mixins
4.4.4 Create src/styles/_scanlines.scss for visual effect
4.4.5 Create src/styles/globals.scss importing all tokens
4.4.6 Import globals.scss in app/layout.tsx

5.5.1 Create src/services/api.ts
5.5.2 Define Country type in src/types/country.ts
5.5.3 Implement fetchAllCountries using fetch()
5.5.4 Implement fetchCountryByCode
5.5.5 Add error handling and retry logic
5.5.6 Test API calls with console.log

6.6.1 Install @tanstack/react-query: `npm install @tanstack/react-query`
6.6.2 Create providers/QueryProvider.tsx
6.6.3 Wrap app with QueryClientProvider in layout
6.6.4 Create hooks/useCountries.ts
6.6.5 Configure default staleTime: 3600000 (1 hour)

7.7.1 Install zustand: `npm install zustand`
7.7.2 Create src/stores/useCountryStore.ts
7.7.3 Create src/stores/useFilterStore.ts
7.7.4 Create src/stores/useSearchStore.ts
7.7.5 Add TypeScript interfaces for each store
7.7.6 Test stores with console.log
