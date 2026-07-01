---
name: Precision Ledger
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#ab0b1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#cf2c30'
  on-tertiary-container: '#ffecea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is anchored in a philosophy of **Functional Minimalism**. It is designed for users who require clarity and speed while managing complex financial data. The aesthetic is professional, modern, and high-utility, drawing inspiration from industry leaders like Stripe and Linear.

The goal is to evoke a sense of **calm control**. By prioritizing white space and removing unnecessary decorative elements, the UI reduces cognitive load. The emotional response should be one of confidence and reliability—the interface acts as a quiet, precise tool that recedes into the background, allowing the user's data to take center stage.

## Colors

The palette is intentionally restrained to maintain a professional atmosphere. 
- **Primary Blue** is used for critical actions, active states, and brand reinforcement.
- **Positive Green** and **Alert Red** are reserved strictly for semantic feedback—indicating financial gains or losses, and destructive actions.
- **Neutral Grays** create the structural hierarchy. Use `#F9FAFB` for large background areas to separate the canvas from the content cards. 
- **Borders** should be subtle (`#E5E7EB`), acting as functional dividers rather than heavy structural elements.

## Typography

This design system utilizes **Inter** for its exceptional legibility and neutral, systematic tone. 

- **Scale:** Large display sizes use tight letter spacing (`-0.02em`) to maintain a modern, "tight" editorial feel.
- **Data Display:** For financial tables and numerical values, consider using a tabular-nums font feature or a secondary monospaced font like JetBrains Mono to ensure digits align vertically for easier comparison.
- **Hierarchy:** Use `label-caps` for table headers and section overlines to create a clear distinction from interactive content.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1280px max-width container for desktop readability, while expanding to fill the screen on smaller devices.

- **Grid:** A 12-column grid is used for dashboard layouts. 
- **Rhythm:** An 8px linear scale (with 4px increments for tight components) governs all padding and margins. 
- **Whitespace:** Emphasize "Macro-whitespace" between major sections (48px+) to prevent the financial data from feeling cramped.
- **Responsibility:** On mobile, side-by-side card layouts reflow into a single column. Margins reduce from 24px (desktop) to 16px (mobile).

## Elevation & Depth

To maintain the minimalist aesthetic, this design system avoids heavy shadows. Depth is communicated through **Tonal Layering** and **Subtle Outlines**.

- **Level 0 (Background):** `#F9FAFB` – The base canvas.
- **Level 1 (Cards/Surface):** `#FFFFFF` – Primary content areas. Use a 1px solid border (`#E5E7EB`) instead of a shadow to define the boundary.
- **Level 2 (Dropdowns/Modals):** `#FFFFFF` with a very soft, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`. This provides a "lift" without appearing heavy.
- **Interactive States:** On hover, buttons and interactive cards should transition to a slightly darker border or a very subtle background tint rather than increasing shadow depth.

## Shapes

The shape language is **Soft and Precise**. 

- **Standard Elements:** Use a 4px (0.25rem) radius for most UI elements including input fields, small buttons, and tags. This maintains a sharp, professional look.
- **Cards & Large Components:** Use 8px (0.5rem) for main dashboard cards and modals to provide a modern, approachable feel.
- **Segmented Controls:** Inner active states should have a radius that is 2px smaller than the outer container to maintain visual harmony.

## Components

### Buttons
- **Primary:** High-contrast Blue background, White text. Large buttons should have 12px vertical padding.
- **Ghost:** No background, Blue or Gray text. Used for secondary actions to maintain hierarchy.

### Segmented Controls (Toggle)
- Use a light gray track (`#F3F4F6`) with a white "pill" that slides behind the active option (Personal/Business). The active text should be the Primary Blue.

### Input Fields
- Default state: 1px border (`#D1D5DB`), White background.
- Focus state: 1px Primary Blue border with a 3px soft blue outer glow (ring).
- Labels should be placed above the field in `body-sm` bold.

### Tables
- Modern, borderless rows. Use a 1px bottom border only.
- Header row uses `label-caps` typography with a subtle gray background or distinct bottom stroke.
- Hover state on rows: `#F9FAFB`.

### Charts
- **Bar/Pie:** Use a palette of Primary Blue, its 50% tint, and Positive Green. 
- **Details:** Remove all chart borders and grid lines where possible, keeping only the essential axes for a "Stripe-like" clean finish.