# Exbabel Design Specification
**Version:** 2.0.0 (January 2026)
**Objective:** Define the single source of truth for Exbabel's "Aurora" design language—a premium, trustworthy, and interaction-driven system built for live connection.

---

## 1. Core Philosophy: Layers & Light ("Aurora")
The Aurora Design System moves beyond flat UI. It is built on the philosophy of **layers, depth, and light**.

> **Base Background → Ambient Aurora → Interaction Aurora → Accent Aurora**

*   **No Dead White:** White is never just "flat color". It is a canvas that reacts to light.
*   **Light as Feedback:** Interaction is communicated through the emergence of light (gradients/glows), not just color changes.
*   **Calm Shell, Energetic Core:** Components often appear calm/neutral at rest but reveal their "brand energy" (Aurora gradients) upon interaction.

---

## 2. Technology Stack & Library
*   **Framework:** Tailwind CSS (Primary styling engine).
*   **Component Library:** **Daisy UI** (Headless/Utility-first configuration).
    *   *Configuration:* `themes: false` (We use our own CSS variables).
    *   *Usage:* We leverage Daisy UI's semantic class names (e.g., `.btn`, `.card`) but override strict visuals with our Aurora design tokens.
*   **Icons:** Heroicons (Outline & Solid).

---

## 3. Color System
We use the **OKLCH** color space for perceptual uniformity.

### 3.1 Base Palette
| Role | Token Name | Value (Hex/Ref) | Usage |
| :--- | :--- | :--- | :--- |
| **Surface** | `base-white` | `#FFFFFF` | Cards, main content areas. |
| **Paper** | `base-paper` | `#F8F9FA` | Page backgrounds (never pure white). |
| **Ink** | `base-ink` | `#0B1220` | Primary text, Primary Button Backgrounds. |
| **Muted** | `base-muted` | `#667085` | Secondary text. |

### 3.2 Aurora Gradient System (The "Brand Energy")
These colors create the "Aurora" effect. They are rarely used as solid blocks, but rather as gradients, blurs, and glows.

| Token | Color Name | Hex Ref | Role |
| :--- | :--- | :--- | :--- |
| `aurora-pink` | **Rose/Pink** | `#FFD6E5` | Active states, warm highlights, "heartbeat". |
| `aurora-purple` | **Lavender** | `#EAD6FF` | Primary ambient light, structural depth. |
| `aurora-mint` | **Cyan/Mint** | `#D6F5FF` | Cool focus, clarity, tech precision. |
| `aurora-yellow` | **Sunlight** | `#FFF7D1` | Subtle warmth, tertiary accents. |

### 3.3 Functional Colors
*   **Primary Brand Action/Link:** `oklch(0.608 0.370 264.7)` (Vibrant Blue).
*   **Logo/Brand Gradient:** The Exbabel brand is defined by the interplay of **Ink (`#0B1220`)** and the **Aurora Gradient (Pink → Mint)**.

---

## 4. Typography
**Font Family:** `Sora` (Headings) + `Inter` (Body).
**Rationale:** Sora provides a unique, friendly, yet technical character for headings, fitting the "Human + AI" narrative. Inter ensures perfect legibility for UI text.

### 4.1 Type Scale
| Role | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `clamp(2.5rem, 5vw, 3.5rem)` | 800 (ExtraBold) | 1.1 | Hero Section Headings |
| **H2** | `clamp(2rem, 4vw, 2.5rem)` | 700 (Bold) | 1.2 | Section Titles |
| **H3** | `24px` | 600 (SemiBold) | 1.3 | Card Titles, Feature Heads |
| **Body** | `16-18px` | 400 (Regular) | 1.6 | Main reading text |
| **Eyebrow** | `13px` | 700 (Bold) | 1.0 | Small tags appearing above H1/H2 |

---

## 5. Spacing & Layout Rules
Strict adherence to an **8pt Grid System**. All spacing tokens must be multiples of 8.

### 5.1 Spacing Tokens
*   `xs` (8px): Icon gaps, tight labels.
*   `sm` (16px): Inline spacing.
*   `md` (24px): Card padding, standard gaps.
*   `lg` (32px): Component separation.
*   `xl` (48px): Section breaks.
*   `3xl` (96px/`py-24`): Major section padding.

### 5.2 Layout Containers
*   **Max Width:** `1120px` (Standard), `1280px` (Wide/Hero).
*   **Padding:** Default section vertical padding is `py-24` (`96px`).

---

## 6. Component Specifications

### 6.1 Buttons (The "Aurora Button")
The primary interface element.
*   **Shape:** `rounded-full` (Pill).
*   **Dimensions:** Height `48px` (h-12). Padded `px-8`.
*   **Primary Variant:**
    *   *Rest State:* Solid **Ink** (`#0B1220`) background. White text.
    *   *Hover State:* Reveals the **Aurora Gradient** (Pink → Mint) via a pseudo-element glow behind the button text. The Ink background acts as a shell that lets light "bleed" or "shine through".
    *   *Shadow:* `shadow-aurora-card` (colored diffused light).
*   **Secondary Variant:**
    *   White background, **Aurora Border** (Subtle Purple/Mint), Ink text.
    *   Hover: Border color shifts, subtle background tint.

### 6.2 Cards ("Lifted by Light")
*   **Background:** White (`#FFFFFF`).
*   **Border:** `1px solid rgba(234, 214, 255, 0.28)` (Subtle Purple).
*   **Radius:** `18px` to `24px` (`rounded-[24px]`).
*   **Shadow:** Colored, diffused shadow (Not black).
    *   `0 12px 45px rgba(234, 214, 255, 0.22)`
*   **Interaction:** On hover, the card lifts (`-translate-y-[2px]`) and the aurora shadow intensifies. A gradient blob may subtly appear inside.

### 6.3 Navbar
*   **Style:** Glassmorphism ("Apple Liquid Glass").
*   **Effect:** `backdrop-blur-md` + high saturation (`saturate-150`).
*   **Border:** Bottom border `1px solid rgba(0,0,0,0.05)`.

---

## 7. The Aurora Effect (Technical Spec)
How to technically implement the brand's unique light effects.

### 7.1 The "Ambient Glow" Background
Every page sits on top of this fixed CSS background to prevent a "dead" white screen.
```css
background-image: 
  radial-gradient(circle at 20% 10%, var(--color-aurora-pink-muted), transparent 55%),
  radial-gradient(circle at 75% 35%, var(--color-aurora-purple-muted), transparent 60%),
  radial-gradient(circle at 60% 85%, var(--color-aurora-mint-muted), transparent 60%);
/* Plus a 2-4% noise texture overlay */
```

### 7.2 Blur Scales
We use heavy blurring to diffuse color into light.
*   **Hero Blur:** `320px` (For large background blobs).
*   **Card Blur:** `40px` (For internal card gradients).
*   **Element Blur:** `16px-24px` (For small UI glowing elements).

---

## 8. Future Design & Governance
*   **Governance:** New components must be "Aurora Aligned" (use depth/light, not flat colors).
*   **Expansion:** Future dashboards should retain the "Paper" background and "Card" metaphors but may reduce padding (`md` -> `sm`) for information density.
*   **Dark Mode:** Future consideration. The "Aurora" colors (Pink/Purple/Mint) must be adjusted to have higher lightness/luminosity against dark backgrounds (Ink/Black).
