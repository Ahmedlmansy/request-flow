---
name: RequestFlow
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#006243'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d57'
  on-tertiary-container: '#bdffdc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

The design system establishes a high-precision, utilitarian aesthetic tailored for internal request management and operational workflow coordination. Its purpose is to reduce administrative friction and cognitive load for teams navigating high-volume request queues, approvals, and cross-departmental handoffs.

The interface prioritizes clarity, structural efficiency, and predictability:
- **Design Style:** Modern Corporate Minimalist with architectural inspiration from Linear and shadcn/ui. Surfaces rely on pure flat white containers over slate-tinted canvas backdrops with crisp 1px structural framing.
- **Visual Weight & Texture:** Ultra-clean and restrained. Elevation is kept subtle, relying on low-profile hairline borders and calibrated surface contrast rather than prominent drop shadows.
- **Tone & Demeanor:** Professional, trustworthy, rapid, and institutional without feeling bureaucratic. Visual hierarchy is established through crisp typographic scale and categorical status signaling rather than decorative flourishes.

## Colors

The palette uses a crisp, high-clarity color model engineered for light-mode operational visibility, scanability, and accessible contrast.

### Palette Architecture
- **Primary (`#2563EB` / Active: `#1D4ED8`):** Applied exclusively to actionable entry points, batch execution bars, confirmed state changes, and primary interactive elements.
- **Secondary (`#64748B` / Text: `#334155`):** Serves metadata, subheadings, supporting timestamps, and secondary button borders.
- **Canvas & Surface:**
  - App Canvas: `#F8FAFC` (Slate 50) provides a soft, glare-reducing foundation.
  - Card & Container Surface: `#FFFFFF` ensures contrast against the canvas.
  - Structural Hairlines: `#E2E8F0` (Slate 200) sets structural boundaries for data tables, card perimeters, and split panels.
  - Muted Insets & Active Rows: `#F1F5F9` (Slate 100).
- **Functional & Status Roles:**
  - **Completed / Approved:** `#059669` (Emerald 600) on `#DCFCE7` (Emerald 100) background with `#BBF7D0` border.
  - **In-Progress / Reviewing:** `#2563EB` (Blue 600) on `#DBEAFE` (Blue 100) background with `#BFDBFE` border.
  - **Pending / Action Required:** `#D97706` (Amber 600) on `#FEF3C7` (Amber 100) background with `#FDE68A` border.
  - **Rejected / Critical / Destructive:** `#DC2626` (Red 600) on `#FEE2E2` (Red 100) background with `#FECACA` border.

## Typography

The type system uses `Inter` across all text tiers to maximize screen legibility, metric consistency, and data parsing speed. Monospaced identifiers such as request tickets (`REQ-4091`) utilize `JetBrains Mono`.

- **Numeric Tabular Figures:** All numeric displays (counts, SLA timers, financial estimates, timestamps) must use tabular lining (`tnum` font-feature-settings) to preserve vertical alignment across data grids and key-value inspect panels.
- **Scale Hierarchy:** Dense operational dashboards limit large headlines to primary workspace transitions. The operational sweet spot resides between `11px` (micro status tags) and `14px` (table cell values, controls, and form prompts).
- **Weight Restraint:** Weights are strictly restricted to `400` (Regular) for body and values, `500` (Medium) for interactive triggers, labels, and table headers, and `600` (Semi-bold) for section markers and key status values. Avoid heavy weights that compromise clean alignment.

## Layout & Spacing

The system implements a flexible responsive grid governed by an 8-point layout rhythm (augmented with 4px intervals for dense UI inputs and chips).

- **Grid Architecture:** 
  - Desktop workspaces feature a persistent collapsable 240px utility sidebar, paired with a fluid multi-pane workspace or 12-column content container.
  - Tablet environments collapse side navigation to an icon-rail (64px) or drawer overlay, preserving table visibility.
  - Mobile viewports convert multi-column list/detail splits into stacked card flows with full-width drawers.
- **Density Philosophy:**
  - High-density data tables utilize 40px row heights with `0.5rem` vertical cell padding and `0.75rem` horizontal padding to maintain high information density without visual crowding.
  - Standard cards utilize `1.25rem` to `1.5rem` internal padding.
  - Interactive controls (inputs, button triggers, select dropdowns) strictly adhere to standard heights: Compact (`32px`), Default (`36px`), and Large (`40px`).

## Elevation & Depth

Visual hierarchy is maintained through crisp hairlines and micro-shadowing, eliminating heavy blur radii to project speed and precision.

- **Level 0 (Flat Canvas & Rows):** `#F8FAFC` base with no shadow. Table rows exist at Level 0 with a `1px solid #E2E8F0` divider between entries.
- **Level 1 (Card & Content Blocks):** `#FFFFFF` surface framed by `border: 1px solid #E2E8F0` and `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05)`.
- **Level 2 (Hovered Cards & Interactive Controls):** Used when moving over table rows, cards, or active drag-handles: `border-color: #CBD5E1` with `box-shadow: 0 2px 4px -1px rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Dropdown Menus, Popovers, & Flyouts):** Detached interactive layers use `#FFFFFF`, `border: 1px solid #E2E8F0`, and `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 4 (Modal Dialogs & Command Menus):** Centered floating dialogs sit over a backdrop overlay (`rgba(15, 23, 42, 0.4)` with 2px backdrop blur), bounded by `border: 1px solid #CBD5E1` and `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system employs a structured, small-radii shape language (`roundedness: 1`) to emphasize efficiency and structural order.

- **Buttons, Form Inputs, and Select Triggers:** Fixed at `6px` (`rounded-md`).
- **Cards, Panels, and Content Containers:** Standardized at `8px` (`rounded-lg`).
- **Badges, Inline Status Selectors, and User Avatars:** Configured as `9999px` (fully circular / pill-shaped) to clearly distinguish them from actionable structural cards and rectangular input boundaries.
- **Toast Notifications and Modals:** Fixed at `8px` (`rounded-lg`) to preserve clean alignment with card containers.

## Components

### Buttons
- **Primary:** Background `#2563EB`, text `#FFFFFF`, hover `#1D4ED8`, active `#1E40AF`. Subtle inner top highlight via `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`. Height `36px`, padding `0 14px`, font size `14px`, weight `500`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#334155`. Hover background `#F8FAFC`, border `#CBD5E1`, text `#0F172A`.
- **Destructive:** Background `#DC2626`, text `#FFFFFF`, hover `#B91C1C`.
- **Ghost:** Background transparent, text `#64748B`, hover background `#F1F5F9`, hover text `#0F172A`.

### Status Badges & Inline Select Pills
- **Status Badges:** Compact pill shape (`height: 22px`, `padding: 0 8px`, `font-size: 11px`, `font-weight: 600`).
  - *Completed:* Text `#059669`, background `#DCFCE7`, border `1px solid #BBF7D0`.
  - *Pending:* Text `#D97706`, background `#FEF3C7`, border `1px solid #FDE68A`.
  - *In Progress:* Text `#2563EB`, background `#DBEAFE`, border `1px solid #BFDBFE`.
  - *Cancelled:* Text `#DC2626`, background `#FEE2E2`, border `1px solid #FECACA`.
- **Interactive Inline Select Pills:** Combines the visual footprint of a status badge with an embedded chevron (`w-3 h-3`). On click, triggers a compact, floating Level 3 dropdown menu enabling immediate inline state transitions without opening full detail views.

### Input Fields & Controls
- Height `36px`, background `#FFFFFF`, border `1px solid #E2E8F0`, radius `6px`, text `#0F172A`, placeholder `#94A3B8`.
- Focus state: border `#2563EB`, outline ring `2px solid rgba(37, 99, 235, 0.2)`.
- Checkboxes: `16px x 16px`, radius `4px`, border `1px solid #CBD5E1`. Checked state: background `#2563EB` with white checkmark icon.

### Data Tables
- Frame: White card container, `1px solid #E2E8F0`, radius `8px`, overflow hidden.
- Header row: Background `#F8FAFC`, border bottom `1px solid #E2E8F0`, text `#64748B`, height `36px`, uppercase `11px`, weight `600`, tracking `0.05em`.
- Data rows: Background `#FFFFFF`, height `44px`, border bottom `1px solid #F1F5F9`. Hover background `#F8FAFC`. Selected background `#EFF6FF`.

### Optimistic Update Indicators
- When an inline status transition, priority switch, or assignment occurs, show an inline pulsed sync pip (`6px` circular indicator) beside the label with opacity transition (`0.6` to `1.0`), reverting to solid upon server acknowledgment.
- Failed actions show a red hairline perimeter pulse accompanied by an automatic value rollback and toast notification.

### Toasts & Dialogs (shadcn/ui Pattern)
- **Toast Notifications:** Fixed bottom-right (`bottom: 1.5rem`, `right: 1.5rem`), width `360px`, background `#FFFFFF`, border `1px solid #E2E8F0`, shadow Level 3, radius `8px`, padding `12px 16px`. Status indicator bar on the left edge (`3px` width) tinted to the event type.
- **Dialogs & Drawers:** Modal sheets have a fixed header with title (`headline-md`) and subtitle (`body-sm`), body content separated by subtle dividers (`#F1F5F9`), and a pinned action footer with right-aligned button clusters.