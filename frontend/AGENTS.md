# AGENTS.md - Frontend Development Guide

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project Overview

- **Framework**: Next.js 16.2.2 with App Router
- **React**: 19.2.4
- **Language**: TypeScript (strict mode enabled)
- **Styling**: SCSS Modules
- **State**: Zustand
- **Data Fetching**: TanStack React Query

## Commands

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Production build         |
| `npm run start`         | Start production server  |
| `npm run lint`          | Run ESLint               |
| `npm run lint -- --fix` | Auto-fix linting issues  |

**No test framework configured** - Tests should not be added without consulting the team.

## Code Style Guidelines

### Formatting (Prettier)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

### ESLint Configuration

Extends: `next/core-web-vitals`, `next/typescript`

Custom rules (warnings, not errors):

- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-explicit-any`: warn
- `react/no-unescaped-entities`: off

### TypeScript

- `strict: true` enabled in tsconfig.json
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX: react-jsx

## Naming Conventions

| Type                | Convention                  | Example                                |
| ------------------- | --------------------------- | -------------------------------------- |
| Components          | PascalCase                  | `CountryCard`, `SearchBar`             |
| Hooks               | camelCase with `use` prefix | `useCountries`, `useFilteredCountries` |
| Stores              | camelCase with `use` prefix | `useFilterStore`, `useCountryStore`    |
| Utils               | camelCase                   | `mapUtils`                             |
| Types/Interfaces    | PascalCase                  | `Country`, `FilterState`               |
| CSS Modules         | PascalCase + .module.scss   | `CountryCard.module.scss`              |
| Files (components)  | PascalCase.tsx              | `CountryCard.tsx`                      |
| Files (hooks/utils) | camelCase.ts                | `useCountries.ts`                      |

## Import Order

1. External libraries (React, Next.js, etc.)
2. Internal imports (components, hooks, utils)
3. Type imports

```typescript
import { useState } from 'react';
import Link from 'next/link';

import { CountryCard } from '@/components/country';
import { useCountries } from '@/hooks/useCountries';
import type { Country } from '@/types/country';
```

## Component Structure

```typescript
'use client';

import { useState } from 'react';
import styles from './ComponentName.module.scss';

interface ComponentNameProps {
  title: string;
  onSubmit?: () => void;
}

export function ComponentName({ title, onSubmit }: ComponentNameProps) {
  const [state, setState] = useState(false);

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}
```

## File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── country/[code]/    # Dynamic route
│   └── filters/           # Filter page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── country/          # Country-related components
│   ├── filters/          # Filter components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── services/              # API services
├── types/                 # TypeScript types
├── utils/                 # Utility functions
└── styles/               # Global styles
```

## Error Handling

- Use try/catch for async operations
- Let errors propagate to error boundaries
- Use Zod for runtime validation if needed
- Never expose sensitive data in error messages

## State Management

- **Zustand** for global client state
- **React Query** for server state (API calls)
- **useState** for local component state
- Avoid prop drilling; use context or stores

## Performance Guidelines

- Use `React.memo` for expensive components
- Use `useMemo`/`useCallback` for expensive computations
- Implement code splitting with dynamic imports
- Use `react-window` for long lists

## CSS Guidelines

- Use CSS Modules (`.module.scss`) exclusively
- Follow BEM-like naming: `.container`, `.container__title`
- Use SCSS variables from `@/styles/_variables.scss`
- Avoid inline styles
- Use mixins from `@/styles/_mixins.scss`

## Important Notes

1. **Next.js 16**: This is a beta/new version with breaking changes. Check `node_modules/next/dist/docs/` before using unfamiliar APIs.
2. **Server Components**: Default in App Router. Use `'use client'` directive only when needed (hooks, browser APIs, event handlers).
3. **SCSS**: Global styles in `src/styles/`, variables in `_variables.scss`.
4. **Leaflet/React-Leaflet**: These require client-side rendering - wrap in client components.
