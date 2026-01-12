# Exbabel Design Style Guide
**Version:** 1.2.0 (January 2026)  
**Philosophy:** Calm clarity under cognitive load. Premium, consistent, and mathematically sound.

---

## 🎨 Color System (DaisyUI Context)
Our theme is configured to automatically apply correct colors when using semantic class names.

### 📝 Text Colors
| Role | Class | OKLCH Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `text-primary` | `oklch(0.608 0.370 264.7)` | Brand accents, CTAs, eyebrows |
| **Body (Default)** | `text-base-content` | `oklch(0.474 0.050 238.1)` | Standard descriptions, paragraphs |
| **Editorial Body** | `text-body` | Custom (Slate-600) | Long-form reading content |
| **Muted** | `text-base-content/70` | - | Secondary info, less prominent text |

### 🖼️ Background Layers
| Layer | Class | OKLCH Value | Usage |
| :--- | :--- | :--- | :--- |
| **Base 100** | `bg-base-100` | `100% 0 0` | Pure white, default background |
| **Base 200** | `bg-base-200` | `97% 0 0` | Light gray, alternate sections |
| **Base 300** | `bg-base-300` | `92% 0 0` | Medium gray, subtle depth |

---

## 🖋️ Typography System
Strictly use the following utility classes to maintain vertical rhythm and fluid responsiveness.

| Class | Desktop/Clamp Size | Weight | Line-Height |
| :--- | :--- | :--- | :--- |
| `.text-h1` | `40px` → `56px` | 800 | 1.1 |
| `.text-h2` | `32px` → `40px` | 700 | 1.2 |
| `.text-h3` | `24px` | 600 | 1.3 |
| `.text-body` | `16px` → `18px` | 400 | 1.6 |
| `.text-eyebrow`| `13px` | 700 | 1.0 (Uppercase) |

### 🔍 Global Refinement
*   **Rendering:** `text-rendering: optimizeLegibility` is applied to `body`.
*   **Selection:** Brand-blue highlight (`rgba(59, 91, 219, 0.15)`) with primary text color.
*   **Emphasis:** Use `.text-eyebrow` (All-caps, `tracking-wide`) to anchor sections.

---

## 📏 Spacing & Rhythm (8pt Grid)
We eradicate "magic numbers" (10px, 15px) in favor of an 8-point scale.

| Token | Value | Tailwind Class |
| :--- | :--- | :--- |
| Space XS | 8px | `p-2`, `m-2`, `gap-2` |
| Space SM | 16px | `p-4`, `m-4`, `gap-4` |
| Space MD | 24px | `p-6`, `m-6`, `gap-6` |
| Space LG | 32px | `p-8`, `m-8`, `gap-8` |
| Space XL | 48px | `p-12`, `m-12`, `gap-12` |

### 🏗️ Layout Utilities
*   `.layout-spine`: Standardized container (`max-width: 1200px`) with center-aligned flex logic.
*   `.section-pad`: Consistent vertical padding for major sections (`py-24` to `py-32`).

---

## 🧱 Component Discipline

### 🔘 Buttons
*   **Shape:** `rounded-full` (Pill) for all interactive actions.
*   **Interaction:** ❌ No "Jump" (`-translate-y-1`). ✅ Use `scale-[1.02]` lift for premium feel.
*   **Variants:** `btn-primary` (vibrant blue), `btn-outline`, `btn-ghost`.

### 🃏 Cards
*   **Border:** ❌ No "cartoon" borders (`border-base-200`).
*   **Shadow:** ✅ "Vercel Shadow" (`0 0 0 1px rgba(0,0,0,0.08)`) with a `shadow-xl` hover lift.

---

## 🤝 Content Strategy & Trust
Exbabel communicates through "Verifiable Proof" rather than "Marketing Noise."

1.  **Honest Integrations:** Use "WORKS SEAMLESSLY WITH" instead of "Trusted by."
2.  **Metric Dignity:** Present stats (Impact) using the `text-h1` scale and a semantic eyebrow (e.g., `IMPACT AT SCALE`).
3.  **Section Anchoring:** Every major section must start with a `.text-eyebrow` label and a clear `.text-h2` heading.

---
*End of Style Guide. Follow these rules or the design drifts.*
