# Tactical Intelligence Design System: Operational Manual

## 1. Overview & Creative North Star

**Creative North Star: "The Terminal Obscura"**

This design system moves away from the "friendly" web and into the realm of high-stakes, tactical geospatial intelligence. We are not building a dashboard; we are building a weaponized interface. The goal is to create a "Terminal Obscura" aesthetic—an environment where high-density data meets brutalist structural integrity.

To break the "template" look, we employ **intentional asymmetry**. Primary data streams should feel weighted to one side, balanced by "ghost" telemetry in the margins. Overlapping elements (such as floating HUD modules over map layers) create a sense of urgent depth. This is a system of precision, where every pixel serves a mission-critical purpose.

---

## 2. Colors & Atmospheric Depth

Our palette is rooted in the void, punctuated by high-frequency light.

### Tonal Hierarchy

- **Primary (`#b9ffe8` / `#00FFD1`):** Use for active tactical states, primary CTAs, and critical data nodes.
- **Surface Layering:**
  - `surface_container_lowest`: Background for the deepest map layers.
  - `surface_container_low`: Primary workspace background.
  - `surface_container_high`: Elevated tactical panels.
- **Functional Accents:**
  - **Success (`#2ff801`):** Verified targets, stable signals.
  - **Warning/Error (`#ff7073`):** Critical disparities, breach alerts.

### The "No-Line" Rule for Layout

To achieve a high-end editorial feel, **prohibit the use of 1px solid borders for layout sectioning.** Major layout divisions must be defined through background color shifts (e.g., a `surface_container_low` sidebar sitting against a `surface_dim` viewport). Use tonal transitions to guide the eye, keeping the interface feeling integrated rather than boxed-in.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. A floating HUD module should use a semi-transparent `surface_bright` with a `backdrop-blur` (12px–20px). This "Glassmorphism" effect allows underlying map data to bleed through, softening the brutalist edges and making the layout feel like a sophisticated projection.

### Signature Textures

Apply a subtle linear gradient to main action components, transitioning from `primary` to `primary_dim` at a 135-degree angle. This provides a "visual soul" and metallic luster that flat colors cannot replicate.

---

## 3. Typography: The Language of Precision

Typography is our primary tool for conveying tactical authority. We use a tri-font system to separate UI controls from raw data.

- **Headlines (Space Mono, 700, Uppercase):** Reserved for section headers and high-level alerts. Use generous letter spacing (0.1em) to enhance the "technical broadcast" feel.
- **Interface UI (Space Grotesk):** Our editorial backbone. Used for navigation, labels, and descriptions. Its modern, geometric curves provide a necessary contrast to the rigid grid.
- **Telemetry & Data (Fira Code, 400):** Used for coordinates, timestamps, and raw code strings. The monospaced nature ensures that columns of numbers align perfectly, facilitating rapid scanning.

---

## 4. Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Neon Bloom** rather than traditional drop shadows.

### The Layering Principle

Stack your surfaces to create a natural "lift." Place a `surface_container_highest` module inside a `surface_container_low` environment. The contrast alone provides the elevation.

### Ambient Shadows ("Neon Bloom")

When a tactical window must "float" over a map, do not use a black shadow. Use a **Neon Bloom**:

- **Color:** A 15% opacity tint of `primary` (`#00FFD1`).
- **Setting:** 0px 4px 24px blur. This mimics the light emission of a high-end CRT or holographic display.

### The "Ghost Border" Fallback

If a border is required for accessibility, it must be a **Ghost Border**. Use the `outline_variant` token at 20% opacity. Forbid 100% opaque, high-contrast borders unless they represent an "Active" or "Targeted" state.

---

## 5. Components

### Buttons

- **Primary:** Sharp 0px corners. Solid `primary` background. Inset shadow (0 2px 4px rgba(0,0,0,0.5)). Text in `on_primary`.
- **Tactical (Hover):** Transition to a 1px `primary` border with a `0 0 8px #00FFD1` outer glow.
- **Tertiary:** Text-only (`Space Mono`), with a subtle underline that expands on hover.

### Tactical Modules (Cards)

- **Rules:** No dividers. Separate content using `surface_container` shifts or vertical whitespace (e.g., 24px or 32px increments from the spacing scale).
- **Header:** Always include a "Coordinate Stamp" in the top-right corner using `label-sm` in Fira Code.

### Input Fields

- **Style:** Underline-only or subtle `surface_variant` fill.
- **Active State:** The bottom border flashes `secondary` (Neon Green) upon successful data entry.
- **Typography:** User input should always render in `Fira Code` to distinguish it from the system UI.

### Data Stream (Custom Component)

A vertical list of scrolling telemetry. Use `label-sm` and `surface_container_lowest`. Every 5th line should be highlighted in `primary_dim` to create a rhythmic, scanning effect.

---

## 6. Do’s and Don'ts

### Do

- **Embrace Asymmetry:** Align high-priority widgets to the left and allow decorative telemetry to float on the right.
- **Use Micro-Interactions:** Buttons should "flicker" slightly (0.05s opacity shift) on click to mimic hardware feedback.
- **Respect the Scanlines:** Apply a subtle, fixed-position CRT scanline overlay (0.03 opacity) across the entire viewport to unify the aesthetic.

### Don’t

- **Don't Round Corners:** 0px is the absolute rule. Any radius over 0px breaks the tactical immersion.
- **Don't Use Generic Shadows:** Never use a default #000000 shadow. It muddies the Void Black (`#090A0F`) background.
- **Don't Over-Color:** Stick to the `surface` palette for 90% of the UI. Save the Neon Cyan and Green for the "10% that matters."
