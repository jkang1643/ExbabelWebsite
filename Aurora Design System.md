# Exbabel: Aurora Design System v1.0

The Aurora Design System is built on the philosophy of **layers and light**, rather than flat components. It prioritizes depth, soft transitions, and interaction-driven energy.

---

## 🌌 Core Philosophy: Layers vs. Components

> **Base Background → Ambient Aurora → Interaction Aurora → Accent Aurora**

White is never "flat." It is a quiet canvas that reacts to user interaction.

---

## 🎨 Color Foundations

### Base Palette
| Role | HEX | OKLCH (Preferred) |
| :--- | :--- | :--- |
| **White** (Surface) | `#FFFFFF` | `100% 0 0` |
| **Paper** (Background) | `#F8F9FA` | `98.5% 0.002 240` |
| **Ink** (Text/Primary) | `#0B1220` | `15% 0.04 260` |
| **Muted** (Sub-text) | `#667085` | `50% 0.02 250` |

### Aurora Tints (Light Bleed)
| Name | HEX | Usage |
| :--- | :--- | :--- |
| **Pink** | `#FFD6E5` | Active states, warm focus |
| **Purple** | `#EAD6FF` | Primary ambient light |
| **Mint** | `#D6F5FF` | Secondary ambient light, cool focus |
| **Yellow** | `#FFF7D1` | Sub-level accents |

---

## 🧱 Design Tokens

### 1. Opacity & Hierarchy
- **Ambient**: `0.10` (Background blobs)
- **Subtle**: `0.18` (Default borders)
- **Hover**: `0.28` (Active interaction)
- **Focus Ring**: `0.35` (Accessibility focus)

### 2. Blur Scale
- **XS**: `16px`
- **SM**: `24px`
- **MD**: `40px` (Standard card glow)
- **LG**: `80px`
- **XL**: `160px`
- **Hero**: `320px` (Localized section light)
- **Ambient**: `520px` (Global page light)

### 3. Shadows (Aurora Light Bleed)
Replaces neutral black shadows with colored diffused light.
- **Card**: `0 12px 45px rgba(234, 214, 255, 0.22)`, `0 30px 110px rgba(214, 245, 255, 0.18)`
- **Hover**: `0 14px 55px rgba(255, 214, 229, 0.26)`, `0 34px 130px rgba(214, 245, 255, 0.22)`

---

## 🌍 Global Layout Elements

### 1. Ambient Background Layer
The entire app sits on a fixed radial gradient layer to eliminate "dead white."
```css
background-image: 
  radial-gradient(circle at 20% 10%, rgba(255, 214, 229, 0.18), transparent 55%),
  radial-gradient(circle at 75% 35%, rgba(234, 214, 255, 0.18), transparent 60%),
  radial-gradient(circle at 60% 85%, rgba(214, 245, 255, 0.16), transparent 60%);
```

### 2. Invisible Noise Layer
A 2–4% opacity grain texture to prevent gradient banding and add physical depth.
- **Implementation**: `body::after` pseudo-element with fixed SVG noise.

---

## 📦 Component Recipes

### 1. Aurora Button (`AuroraButton.tsx`)
**Concept**: "Core + Calm Shell"
- **Static**: Solid Ink background or White.
- **Hover**: Revels "Core Energy" via a hidden base layer (`::before`) using a radial aurora gradient and `blur-md`.
- **Motion**: `duration-base` (`180ms`) with `aurora-out` easing.

### 2. Aurora Card (`AuroraCard.tsx`)
**Concept**: "Lifted by Light"
- **Border**: `rgba(234, 214, 255, 0.28)` (Subtle purple tint).
- **Radius**: `18px` (`radius-lg`) or `24px` (`radius-xl`).
- **Interaction**: Transforms `-2px` on Y-axis while expanding the light-bleed shadow.

---

## ✨ Interaction Guidelines

1. **Aurora Awakening**: Light should feel like it's "waking up" behind an element on hover.
2. **Blur > Saturation**: If a color feels like a "Neon Sign," it is too strong. Increase blur and decrease opacity.
3. **Continuous Flow**: Avoid hard section dividers. Use transparent backgrounds for sections and overlapping aurora blobs to bridge transitions.
