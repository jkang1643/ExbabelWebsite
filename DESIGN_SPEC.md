# Exbabel Design Specification
**Version:** 1.0.0 (January 2026)  
**Objective:** Establish a calm, premium, and trustworthy visual language optimized for live worship and teaching environments.

---

## 1. Spacing & Rhythm Tokens
All spacing must strictly adhere to the 8-point grid. No "magic numbers" (e.g., 10px, 13px) are permitted.

### 1.1 Base Unit
*   **Base Unit:** 8px

### 1.2 Spacing Scale
| Token | Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| `--space-xs` | 8px | `p-2`, `m-2`, `gap-2` | Icon gaps, tight grouping, labels |
| `--space-sm` | 16px | `p-4`, `m-4`, `gap-4` | Inline spacing, component internal padding |
| `--space-md` | 24px | `p-6`, `m-6`, `gap-6` | Card internal padding, standard gaps |
| `--space-lg` | 32px | `p-8`, `m-8`, `gap-8` | Component to component spacing |
| `--space-xl` | 48px | `py-12` | Major section internals |
| `--space-2xl` | 72px | `py-[72px]` | Section separation |
| `--space-3xl` | 96px | `py-24` | Hero separation, heavy structural breaks |

### 1.3 Semantic Spacing Tokens
*   **Section Vertical Padding:** Default to `py-24` (`--space-3xl`).
*   **Content Gap:** Default to `gap-8` (`--space-lg`) for grid items.
*   **Text Head-to-Body:** Use `mb-4` (`--space-sm`) after H2/H3 headings.

### 1.4 Forbidden Spacing Patterns
*   ❌ No odd-numbered pixels (e.g., 15px, 21px).
*   ❌ No hard-coded `margin` or `padding` in pixels; use Tailwind spacing classes.
*   ❌ No inconsistent section heights; all main sections must use `py-24`.

---

## 2. Layout System
A rigid layout rail system ensures structural integrity and reduces horizontal eye strain.

### 2.1 Container Rails
*   **Standard Content:** `max-width: 1120px` (`max-w-6xl` approximate, or custom `max-w-[1120px]`).
*   **Narrow / Content-Heavy:** `max-width: 640px` (`max-w-2xl`).
*   **Wide / Demo:** `max-width: 1280px` (`max-w-7xl`).

### 2.2 Alignment Standards
*   **Headings:** Left-aligned by default. Centered alignment is reserved for Hero sections and short, impactful "Proof" sections.
*   **Cards:** Grid layout with `gap-8`. Always aligned to the top.

### 2.3 Section Specs
| Section Type | Max-Width | Alignment | Padding |
| :--- | :--- | :--- | :--- |
| **Hero** | 1120px | Centered | `pt-32 pb-24` |
| **Content** | 1120px | Left-aligned | `py-24` |
| **Testimonial** | 640px | Centered | `py-24` |
| **CTA** | 1120px | Centered | `py-24` |

---

## 3. Typography Specification
Focus on "Quiet Authority" and readability under cognitive load.

### 3.1 Font Stack
*   **Primary:** Sora (Sans-Serif)
*   **Fallback:** System Sans-Serif (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)

### 3.2 Type Scale (Fluid)
| Role | Size Value (`clamp`) | Weight | Line-Height |
| :--- | :--- | :--- | :--- |
| **H1** | `clamp(40px, 5vw, 56px)` | 700 (Bold) | 1.1 |
| **H2** | `clamp(32px, 4vw, 40px)` | 600 (Semibold) | 1.2 |
| **H3** | 24px | 600 (Semibold) | 1.3 |
| **Body** | 16px - 18px | 400 (Regular) | 1.6 |
| **Small** | 14px | 400 (Regular) | 1.5 |
| **Eyebrow** | 13px | 600 (Semibold) | 1.0 |

### 3.3 Rules of Emphasis
*   **Eyebrows:** Uppercase, `tracking-[0.08em]`, color: `text-primary`. Used to anchor sections.
*   **Max Line Length:** Body text must never exceed 640px (approx. 75 characters) to ensure readability.
*   **Optimized Rendering:** `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased` must be applied to the `body`.

---

## 4. Color System
Based on DaisyUI/OKLCH for vibrant but professional color reproduction.

### 4.1 Palette Roles
| Role | Color Value (OKLCH/Hex) | Usage |
| :--- | :--- | :--- |
| **Primary** | `oklch(0.608 0.370 264.7)` | CTAs, Primary Buttons, Primary Headings |
| **Secondary** | `oklch(0.740 0.077 244.7)` | Secondary buttons, subtle backgrounds |
| **Accent** | `#5a5d80` | Borders, secondary icons, subtle highlights |
| **Text-Primary** | `oklch(0.474 0.050 238.1)` | Main body text |
| **Text-Muted** | `text-base-content/70` | Secondary descriptions, footer links |
| **Background (1)** | `oklch(100% 0 0)` | Primary page background |
| **Background (2)** | `oklch(97% 0 0)` | Alternate section backgrounds |

### 4.2 Functional Colors
*   **Success:** `oklch(76% 0.177 163.223)`
*   **Warning:** `oklch(82% 0.189 84.429)`
*   **Error:** `oklch(70% 0.191 22.216)`

### 4.3 Color Rules
*   ❌ **No Primary for Body:** Never use the vibrant primary blue for long-form body text.
*   ✅ **Contrast:** All text on background must exceed WCAG AA (4.5:1).
*   ✅ **Layering:** Use `bg-base-200` to separate major content sections from the main `bg-base-100` flow.

---

## 5. Component Specifications

### 5.1 Buttons
*   **Radius:** `rounded-full` (Pill).
*   **Height:** Standardized to 48px (`h-12`).
*   **States:**
    *   **Default:** Solid color.
    *   **Hover:** `scale-[1.02]` + subtle shadow increase.
    *   **Focus:** 2px ring with 2px offset (`ring-primary ring-offset-2`).
*   **Variants:**
    *   **Primary:** `bg-primary text-white`.
    *   **Secondary:** `btn-secondary` or `btn-outline`.
    *   **Tertiary:** `btn-ghost`, underline on hover.

### 5.2 Cards
*   **Corner Radius:** 12px.
*   **Padding:** 24px (`p-6`).
*   **Styling:** "Vercel Shadow" approach: `shadow-[0_0_0_1px_rgba(0,0,0,0.08)]` instead of heavy borders.
*   **Elevation:** On hover, use `shadow-xl` to indicate interactivity.

### 5.3 Navbar
*   **Height:** 72px.
*   **Vibe:** Glassmorphism (`backdrop-blur-md bg-white/80`).
*   **Layout:** Logo Left, Navigation Center (optional), CTA Right.

### 5.4 Forms
*   **Inputs:** `h-12`, `rounded-lg`, border: `border-accent/20`.
*   **Focus:** `border-primary`, `ring-1`, `ring-primary`.
*   **Labels:** Small, Semibold, `mb-2`.

---

## 6. Motion & Interaction

### 6.1 Performance Rules
*   **Duration:** 150ms (micro) to 300ms (structural).
*   **Easing:** `cubic-bezier(0.2, 0, 0, 1)` (The "Quiet" curve).
*   **Hardware Acceleration:** Use `will-change-transform` for complex animations.

### 6.2 Prohibited Animations
*   ❌ No "Jump" effects (`-translate-y-2`). Use `scale` or subtle shadows instead.
*   ❌ No infinite loops (unless it's a critical "Live" indicator).
*   ❌ No staggered entry animations exceeding 1 second total.

---

## 7. Content & CTA Rules

### 7.1 Headlines
*   **Character Limit:** H1 should not exceed 50 characters. H2 should not exceed 80 characters.
*   **Clarity:** Use active voice. "Give your church a voice" vs "Churches are being given voices."

### 7.2 CTA Patterns
*   **Primary:** "Get Started" or "Watch Demo".
*   **Secondary:** "Learn More" or "View Pricing".
*   **Placement:** Every page must end with a "Final CTA" section to prevent dead-ends.

---

## 8. Accessibility Specification
Accessibility is a core feature, not a checklist item.

### 8.1 Visual
*   **Minimum Contrast:** 4.5:1 for body text; 3:1 for large text.
*   **Focus Ring:** Never remove `outline-none` without providing a custom `:focus` visible state.
*   **Motion:** Wrap all purely decorative animations in `(prefers-reduced-motion: no-preference)` queries.

### 8.2 Structure
*   **Heading Hierarchy:** Always use `<h1>` → `<h2>` → `<h3>` sequentially. Never skip levels for "styling" reasons.
*   **ARIA:** All buttons without text must have `aria-label`.

---

## 9. Design System Governance

### 9.1 Additions
*   A new component must be used in at least **two** different sections before being added to the system.
*   New components must be reviewed for 8pt grid compliance.

### 9.2 Anti-Patterns
*   "The Drift": Adding one-off colors or font sizes to fix a specific section.
*   "The Bloat": Over-animating a simple text section.
*   "The Ghost": Using gray text that falls below contrast thresholds.

---
*End of Specification. Strictly enforced by Exbabel Engineering.*
