# Exbabel Live Translation UI - Design System & Style Guide

## Overview
This style guide documents the exact visual design system, component patterns, and styling used in the Exbabel live translation interface. Use this as a reference to replicate the UI 1:1 in your actual application frontend.

---

## 🎨 Design Tokens

### Colors

#### Primary Colors (Blue/Indigo)
```css
--color-primary: #3B5BDB (primary button, badges, borders)
--color-secondary: #6366F1 (gradients, accents)
```

#### Success Colors (Green - for Spanish/Translation)
```css
--color-success: #10B981 (ES badges, checkmarks)
--color-info: #3B82F6 (accents)
```

#### Neutral Colors
```css
--color-neutral: #1F2937 (text)
--color-neutral-70: rgba(31, 41, 55, 0.7) (secondary text)
--color-neutral-40: rgba(31, 41, 55, 0.4) (placeholders, partials)
```

#### Background Colors
```css
--bg-hero-light: #F8FAFC (hero background)
--bg-white-70: rgba(255, 255, 255, 0.7) (glass cards)
--bg-white-60: rgba(255, 255, 255, 0.6) (input areas)
--bg-white-40: rgba(255, 255, 255, 0.4) (empty states)
```

### Glassmorphic Effects

#### Main Glass Card
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(165, 180, 252, 0.3);
box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15), 
            0 2px 8px rgba(99, 102, 241, 0.1);
border-radius: 28px;
padding: 1.5rem 2rem; /* p-6 md:p-8 */
```

#### Input/Transcription Areas
```css
background: linear-gradient(to bottom right, 
            rgba(255, 255, 255, 0.6), 
            rgba(255, 255, 255, 0.4));
backdrop-filter: blur(8px);
border: 1px solid rgba(99, 102, 241, 0.15);
border-radius: 16px;
padding: 0.75rem; /* p-3 */
height: 3.5rem; /* fixed 2-line height */
```

### Spacing System

```css
--spacing-xs: 0.5rem  /* 8px - gap-2 */
--spacing-sm: 0.75rem /* 12px - gap-3, mb-3 */
--spacing-md: 1rem    /* 16px - gap-4, mb-4 */
--spacing-lg: 1.5rem  /* 24px - mb-6 */
```

### Border Radius

```css
--radius-sm: 12px    /* rounded-[12px] - history cards */
--radius-md: 16px    /* rounded-[16px] - input areas */
--radius-lg: 20px    /* rounded-[20px] - buttons */
--radius-xl: 28px    /* rounded-[28px] - main card */
--radius-full: 9999px /* rounded-full - badges, icons */
```

### Typography

#### Font Family
```css
font-family: 'var(--font-sora), sans-serif';
```

#### Text Sizes
```css
--text-xs: 0.6875rem     /* 11px - status text */
--text-2xs: 0.625rem     /* 10px - badge icons */
--text-sm: 0.875rem      /* 14px - main content */
--text-base: 1rem        /* 16px - headers */
--text-lg: 1.125rem      /* 18px - titles */
```

#### Font Weights
```css
--font-medium: 500      /* labels */
--font-semibold: 600    /* badges, labels */
--font-bold: 700        /* headings */
--font-black: 900       /* stats */
```

---

## 📐 Component Structure

### Layout Grid (1/3 - 2/3 Split)
```jsx
<div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center">
  {/* Left: Hero Content (1/3) */}
  <div className="space-y-6">
    {/* Headline, description, CTAs */}
  </div>

  {/* Right: Live Demo (2/3) */}
  <div className="relative w-full">
    {/* Glass card with animation */}
  </div>
</div>
```

### Main Glass Card Structure
```jsx
<div className="relative rounded-[28px] p-6 md:p-8" style={{
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(165,180,252,0.3)',
  boxShadow: '0 8px 32px rgba(59,130,246,0.15), 0 2px 8px rgba(99,102,241,0.1)',
}}>
  {/* Header: Badge + Status Indicator */}
  <div className="flex justify-between items-center mb-3">
    {/* LIVE TRANSLATION Badge */}
    {/* Audio/Status Bars */}
  </div>

  {/* Status Row: Icon + Text */}
  <div className="flex items-center gap-2 mb-3">
    {/* Microphone Icon */}
    {/* Status Text */}
  </div>

  {/* Source Language Input (EN) */}
  <div className="mb-3">
    {/* Label with EN icon */}
    {/* Text display box - 3.5rem height */}
  </div>

  {/* Target Language Output (ES) */}
  <div className="mb-3">
    {/* Label with ES icon */}
    {/* Text display box - 3.5rem height */}
  </div>

  {/* Translation History */}
  <div>
    {/* Label with ES icon */}
    {/* Scrollable history - 8rem height */}
  </div>
</div>
```

---

## 🏗️ Reusable Component Patterns

### 1. Language Badge/Label
```jsx
<label className="block text-neutral/70 text-xs font-semibold mb-1.5 flex items-center gap-2">
  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 
                  flex items-center justify-center text-[10px] text-primary">
    EN
  </div>
  Live Transcription
</label>
```

**Variants:**
- **EN (Primary):** `from-primary/20 to-secondary/20`, `text-primary`
- **ES (Success):** `from-success/30 to-info/30`, `text-success`

### 2. Input/Display Box (Fixed 2-Line Height)
```jsx
<div 
  className="rounded-[16px] p-3 bg-gradient-to-br from-white/[0.6] to-white/[0.4] 
             border border-primary/15 h-[3.5rem] flex items-center overflow-hidden"
  style={{ backdropFilter: 'blur(8px)' }}
>
  <p className="text-neutral text-sm leading-tight line-clamp-2">
    Welcome to our service. Today we celebrate unity across all cultures.
  </p>
</div>
```

**Key Features:**
- Fixed height: `h-[3.5rem]` (ensures exactly 2 lines)
- Line clamping: `line-clamp-2` prevents text overflow
- Leading: `leading-tight` for compact line spacing
- Overflow: `overflow-hidden` prevents text breaking layout
- Flex + items-center: Vertically centers text

**Border Variants:**
- **English (Primary):** `border-primary/15`
- **Spanish (Success):** `border-success/15`

### 3. History Card (Compact with Scroll)
```jsx
<div className="space-y-2 h-[8rem] overflow-y-auto">
  <div
    className="rounded-[12px] p-2.5 bg-gradient-to-br from-white/[0.6] to-white/[0.4] 
               border border-success/20"
    style={{ backdropFilter: 'blur(8px)' }}
  >
    {/* Header: Badge + Checkmark */}
    <div className="flex items-start gap-1.5 mb-1">
      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 
                       text-primary font-semibold">
        EN → ES
      </span>
      <span className="text-success text-xs">✓</span>
    </div>
    
    {/* Source text (faded) */}
    <p className="text-neutral/70 text-xs mb-1 leading-tight line-clamp-1">
      When we walk through the fire, God is still faithful.
    </p>
    
    {/* Translation (emphasized) */}
    <p className="text-neutral text-xs font-medium leading-tight line-clamp-1">
      Cuando caminamos por el fuego, Dios sigue siendo fiel.
    </p>
  </div>
</div>
```

**Key Features:**
- Container: `h-[8rem] overflow-y-auto` for scrollable list
- Spacing: `space-y-2` between cards
- Card padding: `p-2.5` for compact design
- Text hierarchy: Source text at 70% opacity, translation full opacity
- Single line truncation: `line-clamp-1` on both texts

### 4. Status Icons

#### Microphone Icon
```jsx
<div className="relative w-10 h-10 rounded-full bg-gradient-to-br 
                from-primary/20 to-secondary/20 flex items-center justify-center">
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" 
       stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" 
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
</div>
```

**Specifications:**
- Size: `w-10 h-10` (40x40px circle)
- Icon size: `w-5 h-5` (20x20px)
- Background: Gradient from `primary/20` to `secondary/20`
- Icon color: `text-primary`
- Centered: `flex items-center justify-center`

#### Audio/Status Bars
```jsx
<div className="flex gap-1">
  <div className="w-1 h-6 bg-primary/60 rounded-full"></div>
  <div className="w-1 h-6 bg-primary/60 rounded-full"></div>
  <div className="w-1 h-6 bg-primary/60 rounded-full"></div>
</div>
```

**Specifications:**
- Each bar: `w-1` (4px wide) by `h-6` (24px tall)
- Color: `bg-primary/60` (60% opacity primary)
- Shape: `rounded-full` (pill-shaped)
- Spacing: `gap-1` (4px between bars)

### 5. Status Badge
```jsx
<div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 
                backdrop-blur-sm border border-primary/20">
  <span className="flex items-center gap-1.5">
    <span className="w-2 h-2 bg-primary rounded-full"></span>
    <span className="text-primary font-bold text-xs">LIVE TRANSLATION</span>
  </span>
</div>
```

**Specifications:**
- Padding: `px-3 py-1.5` for compact pill shape
- Background: Gradient `from-primary/10 to-secondary/10`
- Border: `border-primary/20` (subtle outline)
- Dot indicator: `w-2 h-2` circle
- Text: `text-xs` (12px), `font-bold`

---

## 🎯 UI Implementation Guide

### Key Tailwind Classes Used

#### Spacing & Layout
```
mb-3, mb-4       → Margins between sections
gap-2, gap-3     → Flex gaps
p-2.5, p-3       → Padding in cards
space-y-2        → Vertical spacing in lists
```

#### Sizing
```
w-5 h-5          → Small icons (badges)
w-10 h-10        → Medium icons (microphone)
h-[3.5rem]       → Fixed 2-line input height
h-[8rem]         → Fixed history scroll height
```

#### Text
```
text-xs          → Small text (0.75rem)
text-sm          → Body text (0.875rem)
text-[10px]      → Extra small (badges)
text-[11px]      → Status text
leading-tight    → Tight line height
line-clamp-1     → Single line truncate
line-clamp-2     → Two line truncate
```

#### Colors & Opacity
```
text-neutral/70  → 70% opacity text
bg-primary/10    → 10% opacity background
border-primary/15 → 15% opacity border
```

#### Special Effects
```
backdrop-blur    → Glassmorphism
rounded-[16px]   → Custom border radius
overflow-y-auto  → Scrollable container
overflow-hidden  → Hide overflow
```

---

## 🔧 Styling Best Practices

### 1. Glassmorphism Consistency
Always pair these three properties for proper glass effect:

```css
background: rgba(255,255,255,0.7);      /* Semi-transparent white */
backdrop-filter: blur(16px);             /* Blur background content */
border: 1px solid rgba(165,180,252,0.3); /* Subtle border */
```

**Blur Levels:**
- Main card: `blur(16px)`
- Input boxes: `blur(8px)`
- Badges: `blur(4px)` or `backdrop-blur-sm`

### 2. Fixed Height Strategy
Use fixed heights with line clamping to prevent layout shifts:

```jsx
// Container
className="h-[3.5rem] flex items-center overflow-hidden"

// Text content
className="leading-tight line-clamp-2"
```

**Height Reference:**
- 2-line boxes: `h-[3.5rem]` (56px)
- History container: `h-[8rem]` (128px)
- Icons: `w-10 h-10` (40px)
- Small icons: `w-5 h-5` (20px)

### 3. Opacity Hierarchy
Create visual hierarchy using opacity levels:

```css
100% - Primary content (text-neutral)
70%  - Secondary content (text-neutral/70)
40%  - Tertiary/placeholder (text-neutral/40)
20%  - Backgrounds (bg-primary/20)
15%  - Borders (border-primary/15)
10%  - Subtle fills (bg-primary/10)
```

### 4. Text Truncation
Prevent text overflow with `line-clamp`:

```jsx
// Single line
className="line-clamp-1 leading-tight"

// Two lines
className="line-clamp-2 leading-tight"

// Always pair with:
className="overflow-hidden"
```

### 5. Scrollable Containers
For lists/history with fixed height:

```jsx
<div className="h-[8rem] overflow-y-auto space-y-2">
  {/* Items */}
</div>
```

**Scroll Tips:**
- Add `space-y-2` for spacing between items
- Use `overflow-y-auto` (not `scroll`) to hide scrollbar when not needed
- Fixed height prevents content jumping

### 6. Gradient Backgrounds
Use gradients for depth and visual interest:

```jsx
// Diagonal gradient (common for cards)
className="bg-gradient-to-br from-white/[0.6] to-white/[0.4]"

// Horizontal gradient (common for badges)
className="bg-gradient-to-r from-primary/10 to-secondary/10"
```

---

## 📱 Responsive Considerations

### Mobile Optimizations
```jsx
// Padding
p-6 md:p-8      // Reduce padding on mobile

// Grid
grid lg:grid-cols-[1fr_2fr]  // Stack on mobile, split on desktop

// Text
text-sm md:text-base  // Smaller text on mobile
```

### Touch Targets
Ensure minimum 44x44px touch targets for mobile:
```jsx
className="w-10 h-10"  // Minimum touch size
```

---

## 🎨 Color Palette Reference

### Primary Gradient
```jsx
className="bg-gradient-to-r from-primary/10 to-secondary/10"
```

### Success Gradient
```jsx
className="bg-gradient-to-br from-success/30 to-info/30"
```

### Glass White Gradient
```jsx
className="bg-gradient-to-br from-white/[0.6] to-white/[0.4]"
```

---

## 📦 Required Tools & Configuration

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "tailwindcss": "^3.x",
    "daisyui": "^4.x"
  }
}
```

### Tailwind Configuration
Add these custom colors to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B5BDB',    // Blue
        secondary: '#6366F1',  // Indigo
        success: '#10B981',    // Green
        info: '#3B82F6',       // Light blue
        neutral: '#1F2937',    // Dark gray
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'sans-serif'],
      },
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'), // For line-clamp-1, line-clamp-2
  ],
}
```

### CSS Global Styles
Add webkit prefixes for better browser support:

```css
/* Support for older browsers */
@supports (backdrop-filter: blur(16px)) or (-webkit-backdrop-filter: blur(16px)) {
  .glassmorphic {
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
  }
}
```

---

## 💡 Design Principles

### 1. **Consistent Spacing Rhythm**
Everything follows a predictable spacing scale:
- Tight: `gap-1` (4px), `mb-1` (4px)
- Normal: `gap-2` (8px), `mb-2` (8px)
- Comfortable: `gap-3` (12px), `mb-3` (12px)

### 2. **Visual Hierarchy Through Opacity**
- 100%: Most important (active text)
- 70%: Secondary importance (source text)
- 40%: Tertiary/hints (placeholders)
- 20-10%: Backgrounds and subtle elements

### 3. **Fixed Dimensions Prevent Layout Shift**
All interactive areas use fixed heights:
- Prevents content jumping
- Ensures predictable layout
- Better UX during dynamic content updates

### 4. **Glassmorphism Creates Depth**
Layered glass effects with:
- Semi-transparent backgrounds
- Backdrop blur
- Subtle borders
- Soft shadows

### 5. **Color Coding by Function**
- **Primary (Blue)**: Source language, main actions
- **Success (Green)**: Target language, completed states
- **Neutral (Gray)**: Text content
- Consistent use creates intuitive UI

---

## 🎓 Quick Reference

### Critical Measurements
```
Main Card Padding:     p-6 md:p-8
Border Radius:         rounded-[28px] (card), rounded-[16px] (inputs)
Input Box Height:      h-[3.5rem] (exactly 2 lines)
History Height:        h-[8rem] (scrollable)
Icon Sizes:            w-10 h-10 (main), w-5 h-5 (small)
Spacing Between:       mb-3 (standard vertical spacing)
```

### Essential Tailwind Patterns
```css
/* Glass effect */
bg-gradient-to-br from-white/[0.6] to-white/[0.4]
backdrop-filter: blur(8px)
border border-primary/15

/* Text truncation */
leading-tight line-clamp-2 overflow-hidden

/* Scrollable container */
h-[8rem] overflow-y-auto space-y-2

/* Visual hierarchy */
text-neutral (100%)
text-neutral/70 (70%)
text-neutral/40 (40%)
```

### Color Applications
```
Primary (#3B5BDB):
  - EN badges: bg-primary/20, text-primary
  - Borders: border-primary/15
  - Active states: bg-primary

Success (#10B981):
  - ES badges: bg-success/30, text-success
  - Checkmarks: text-success
  - Borders: border-success/20
```

---

## 📋 UI Component Checklist

When building your translation interface, ensure each component has:

**✓ Main Container**
- [ ] Glassmorphic background with `rgba(255,255,255,0.7)`
- [ ] Backdrop blur of `16px`
- [ ] Border with subtle color
- [ ] Soft shadow for depth
- [ ] Padding: `p-6 md:p-8`

**✓ Input/Display Areas**
- [ ] Fixed height: `h-[3.5rem]`
- [ ] Line clamping: `line-clamp-2`
- [ ] Glassmorphic background with `blur(8px)`
- [ ] Proper text sizing: `text-sm`

**✓ Language Labels**
- [ ] Icon badge with gradient background
- [ ] Size: `w-5 h-5`
- [ ] Text: `text-xs font-semibold`
- [ ] Color-coded: Primary for EN, Success for ES

**✓ History Container**
- [ ] Fixed height: `h-[8rem]`
- [ ] Scrollable: `overflow-y-auto`
- [ ] Spaced cards: `space-y-2`
- [ ] Single-line text: `line-clamp-1`

**✓ Status Indicators**
- [ ] Badge with dot indicator
- [ ] Audio bars (3 bars, `w-1 h-6`)
- [ ] Microphone icon (`w-10 h-10`)
- [ ] Status text (`text-[11px]`)

---

## 🎯 Final Notes

This design system emphasizes:
- **Clarity**: Clear visual hierarchy through opacity
- **Consistency**: Repeated patterns throughout
- **Polish**: Glassmorphism and gradients for premium feel
- **Stability**: Fixed heights prevent layout shift
- **Scalability**: Component patterns work at any size

All measurements, colors, and patterns are production-tested and ready to implement in your actual Exbabel application frontend.

---

**Design System Version:** 1.0  
**Last Updated:** Based on live translation hero animation  
**Purpose:** UI replication for Exbabel translation interface

