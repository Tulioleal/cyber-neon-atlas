## Phase 2: Core UI

### Overview

Build base layout components and navigation. This phase implements the cyberpunk-themed UI framework including sidebar, header, footer, and reusable UI components.

### Features

1. Global Layout Components
2. Scanline Overlay Effect
3. Navigation System
4. Base UI Components

### Tasks

**2.1 Create Global Layout (Sidebar, Header, Footer)**

- Create src/components/layout/Sidebar.tsx
- Create src/components/layout/Header.tsx
- Create src/components/layout/Footer.tsx
- Create src/components/layout/MainLayout.tsx
- Implement responsive layout structure

**2.2 Implement Scanline Overlay Effect**

- Create src/components/effects/ScanlineOverlay.tsx
- Implement CSS animation for scanlines
- Add configurable opacity and speed
- Ensure overlay doesn't block interactions

**2.3 Build Collapsible Sidebar Component**

- Add collapsed state to Sidebar
- Implement smooth collapse animation
- Add toggle button with icon
- Store collapsed state in localStorage

**2.4 Create Navigation Components**

- Create src/components/navigation/NavItem.tsx
- Create src/components/navigation/NavMenu.tsx
- Implement active state highlighting
- Add keyboard navigation support

**2.5 Add Typography Styles**

- Create typography SCSS utilities
- Implement heading styles (H1-H6)
- Create paragraph and span utilities
- Add responsive font scaling

**2.6 Build Button and Input Components**

- Create src/components/ui/Button.tsx
- Create src/components/ui/Input.tsx
- Create src/components/ui/TextField.tsx
- Implement cyberpunk styling variants
- Add loading and disabled states

### Detailed Plan

1. 2.1.1 Create src/components/layout/ directory
2. 2.1.2 Implement Sidebar with navigation links and logo
3. 2.1.3 Implement Header with search bar placeholder and user actions
4. 2.1.4 Implement Footer with copyright and links
5. 2.1.5 Create MainLayout that wraps all three components
6. 2.1.6 Add responsive breakpoints for mobile/tablet

7. 2.2.1 Create scanline CSS in src/styles/_scanlines.scss
2.2.2 Add keyframe animation for moving lines
2.2.3 Create ScanlineOverlay component with CSS class
2.2.4 Add props for customization (speed, opacity, color)
2.2.5 Use pointer-events: none to allow click-through

8. 3.1 Create sidebar store or use useState for collapsed state
3.2 Add transition CSS for width/transform animation
3.3 Create toggle button with hamburger/close icon
3.4 Use localStorage to persist collapsed state
3.5 Add collapsed icon-only mode for sidebar

9. 4.1 Create NavItem component with icon and label
4.2 Create NavMenu for grouped navigation
4.3 Add active state with visual indicator
4.4 Implement usePathname for route detection
4.5 Add focus-visible styles for keyboard users

10. 5.1 Add typography utilities in _typography.scss
5.2 Create .heading-1 through .heading-6 classes
5.3 Add .text-body, .text-small, .text-caption classes
5.4 Implement fluid typography with clamp()
5.5 Export typography mixins for components

11. 6.1 Create Button component with variants (primary, secondary, ghost)
6.2 Add loading spinner state with disabled interaction
6.3 Create Input component with label and error states
6.4 Create TextField for multiline input
6.5 Implement focus rings in cyberpunk style
6.6 Add CSS modules for component isolation
