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
*   **Secondary:** Inter
*   **Fallback:** System Sans-Serif (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)

### 3.2 Type Scale (Fluid)
| Role | Class | Size Value (`clamp`) | Weight | Line-Height |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `.text-h1` | `clamp(2.5rem, 5vw, 3.5rem)` | 800 (Extra Bold) | 1.1 |
| **H2** | `.text-h2` | `clamp(2rem, 4vw, 2.5rem)` | 700 (Bold) | 1.2 |
| **H3** | `.text-h3` | 24px (1.5rem) | 600 (Semibold) | 1.3 |
| **Body** | `.text-body` | `clamp(1rem, 1.5vw, 1.125rem)` | 400 (Regular) | 1.6 |
| **Small** | `text-sm` | 14px | 400 (Regular) | 1.5 |
| **Eyebrow** | `.text-eyebrow`| 13px (0.8125rem) | 700 (Bold) | 1.0 |

### 3.3 Rules of Emphasis
*   **Eyebrows:** Uppercase, `tracking-[0.08em]`, color: `oklch(0.608 0.370 264.7)`. Used to anchor sections.
*   **Max Line Length:** Body text must never exceed 640px (approx. 75 characters) to ensure readability.
*   **Optimized Rendering:** `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased` must be applied to the `body`.
*   **Selection:** Customized collection color to match the brand (soft blue background, primary text).

---

## 4. Color System
The Aurora Design System prioritize depth and interaction-driven energy.

### 4.1 Base Palette
| Role | HEX | OKLCH (Preferred) | Usage |
| :--- | :--- | :--- | :--- |
| **White** (Surface) | `#FFFFFF` | `100% 0 0` | Primary surfaces, cards |
| **Paper** (Background)| `#F8F9FA` | `98.5% 0.002 240`| Page background |
| **Ink** (Text/Primary)| `#0B1220` | `15% 0.04 260` | Primary text |
| **Muted** (Sub-text) | `#667085` | `50% 0.02 250` | Secondary text, descriptions |

### 4.2 Aurora Tints (Light Bleed)
| Name | HEX | Usage |
| :--- | :--- | :--- |
| **Pink** | `#FFD6E5` | Active states, warm focus |
| **Purple** | `#EAD6FF` | Primary ambient light, primary border tint |
| **Mint** | `#D6F5FF` | Secondary ambient light, cool focus |
| **Yellow** | `#FFF7D1` | Sub-level accents |

### 4.3 Functional Colors
*   **Primary:** `oklch(0.608 0.370 264.7)` (Vibrant Blue - used for CTAs and critical actions)
*   **Success:** `oklch(76% 0.177 163.223)`
*   **Warning:** `oklch(82% 0.189 84.429)`
*   **Error:** `oklch(70% 0.191 22.216)`

### 4.4 Color Rules
*   ❌ **No Flat White:** Never use flat `#FFFFFF` for the main page background; use **Paper** (`#F8F9FA`).
*   ✅ **Contrast:** All text on background must exceed WCAG AA (4.5:1).
*   ✅ **Blur > Saturation:** If a color feels like a "Neon Sign," it is too strong. Increase blur and decrease opacity.

---

---

## 5. Aurora Design Tokens

### 5.1 Opacity & Hierarchy
*   **Ambient:** `0.10` (Background blobs)
*   **Subtle:** `0.18` (Default borders)
*   **Hover:** `0.28` (Active interaction)
*   **Focus Ring:** `0.35` (Accessibility focus)

### 5.2 Blur Scale
*   **XS:** `16px`
*   **SM:** `24px`
*   **MD:** `40px` (Standard card glow)
*   **LG:** `80px`
*   **XL:** `160px`
*   **Hero:** `320px` (Localized section light)
*   **Ambient:** `520px` (Global page light)

### 5.3 Shadows (Aurora Light Bleed)
Replaces neutral black shadows with colored diffused light.
*   **Card:** `0 12px 45px rgba(234, 214, 255, 0.22)`, `0 30px 110px rgba(214, 245, 255, 0.18)`
*   **Hover:** `0 14px 55px rgba(255, 214, 229, 0.26)`, `0 34px 130px rgba(214, 245, 255, 0.22)`

---

## 6. Global Layout Elements

### 6.1 Ambient Background Layer
The entire app sits on a fixed radial gradient layer to eliminate "dead white."
```css
background-image: 
  radial-gradient(circle at 20% 10%, rgba(255, 214, 229, 0.18), transparent 55%),
  radial-gradient(circle at 75% 35%, rgba(234, 214, 255, 0.18), transparent 60%),
  radial-gradient(circle at 60% 85%, rgba(214, 245, 255, 0.16), transparent 60%);
```

### 6.2 Invisible Noise Layer
A 2–4% opacity grain texture to prevent gradient banding and add physical depth.
*   **Implementation:** `body::after` pseudo-element with fixed SVG noise at 3% opacity.

---

## 7. Component Specifications

### 7.1 Buttons
**Concept:** "Core + Calm Shell"
*   **Radius:** `rounded-full` (Pill).
*   **Height:** Standardized to 48px (`h-12`).
*   **Static:** Solid Ink background or White.
*   **Hover:** Reveals "Core Energy" via a hidden base layer (`::before`) using a radial aurora gradient and `blur-md`. `scale-[1.02]` + subtle shadow increase.
*   **Motion:** `duration-base` (`180ms`) with `aurora-out` easing.
*   **Focus:** 2px ring with 2px offset (`ring-primary ring-offset-2`).
*   **Variants:**
    *   **Primary:** `bg-primary text-white`.
    *   **Secondary:** `btn-secondary` or `btn-outline`.
    *   **Tertiary:** `btn-ghost`, underline on hover.

### 7.2 Cards
**Concept:** "Lifted by Light"
*   **Corner Radius:** `18px` (`radius-lg`) or `24px` (`radius-xl`).
*   **Padding:** 24px (`p-6`).
*   **Border:** `rgba(234, 214, 255, 0.28)` (Subtle purple tint).
*   **Styling:** "Vercel Shadow" approach: `shadow-[0_0_0_1px_rgba(0,0,0,0.08)]` instead of heavy borders.
*   **Interaction:** Transforms `-2px` on Y-axis while expanding the light-bleed shadow (`shadow-aurora-hover`).

### 7.3 Navbar
*   **Height:** 72px.
*   **Vibe:** Glassmorphism with "Apple Liquid Glass" effect.
*   **Layout:** Logo Left, Navigation Center (optional), CTA Right.
*   **Implementation:** `-webkit-backdrop-filter: blur(24px) saturate(180%)`.

### 7.4 Forms
*   **Inputs:** `h-12`, `rounded-lg` (`radius-md`), border: `border-accent/20`.
*   **Focus:** `border-primary`, `ring-1`, `ring-primary`.
*   **Labels:** Small, Semibold, `mb-2`.

---

## 8. Motion & Interaction

### 8.1 Performance Rules
*   **Duration:** `120ms` (fast) to `180ms` (base).
*   **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (Standard) or `cubic-bezier(0.16, 1, 0.3, 1)` (Out/Quiet).
*   **Hardware Acceleration:** Use `will-change-transform` for complex animations.

### 8.2 Interaction Guidelines (Aurora Awakening)
1.  **Aurora Awakening:** Light should feel like it's "waking up" behind an element on hover.
2.  **Continuous Flow:** Avoid hard section dividers. Use transparent backgrounds for sections and overlapping aurora blobs to bridge transitions.
3.  **Prohibited:** ❌ No "Jump" effects (`-translate-y-2`). Use `scale` or subtle shadows instead.

---

## 9. Content & CTA Rules

### 9.1 Headlines
*   **Character Limit:** H1 should not exceed 50 characters. H2 should not exceed 80 characters.
*   **Clarity:** Use active voice. "Give your church a voice" vs "Churches are being given voices."

### 9.2 CTA Patterns
*   **Primary:** "Get Started" or "Watch Demo".
*   **Secondary:** "Learn More" or "View Pricing".
*   **Placement:** Every page must end with a "Final CTA" section to prevent dead-ends.

---

---

## 10. Accessibility Specification
Accessibility is a core feature, not a checklist item.

### 10.1 Visual
*   **Minimum Contrast:** 4.5:1 for body text; 3:1 for large text.
*   **Focus Ring:** Never remove `outline-none` without providing a custom `:focus` visible state.
*   **Motion:** Wrap all purely decorative animations in `(prefers-reduced-motion: no-preference)` queries.

### 10.2 Structure
*   **Heading Hierarchy:** Always use `<h1>` → `<h2>` → `<h3>` sequentially. Never skip levels for "styling" reasons.
*   **ARIA:** All buttons without text must have `aria-label`.

---

## 11. Design System Governance

### 11.1 Additions
*   A new component must be used in at least **two** different sections before being added to the system.
*   New components must be reviewed for 8pt grid compliance.
*   **Aurora Alignment:** New components must embody the "Layers and Light" philosophy.

### 11.2 Anti-Patterns
*   "The Drift": Adding one-off colors or font sizes to fix a specific section.
*   "The Bloat": Over-animating a simple text section.
*   "The Ghost": Using gray text that falls below contrast thresholds.

---
*End of Specification. Strictly enforced by Exbabel Engineering.*
