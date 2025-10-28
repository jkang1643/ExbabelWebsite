# Exbabel DaisyUI Theme Style Guide

## Color System Overview

Our DaisyUI theme is configured to automatically apply the correct colors when you use semantic class names. **You should no longer need to manually apply `text-neutral` everywhere** - the theme handles it automatically.

---

## Semantic Color Usage

### 📝 **Text Colors**

#### Body Text (Default)
```jsx
// ✅ CORRECT - DaisyUI applies base-content automatically
<p>Your text here</p>
<p className="text-base-content">Explicitly using base-content</p>

// ❌ AVOID - No need to manually specify
<p className="text-neutral">Manual color specification</p>
```

**Color:** `oklch(0.474 0.050 238.1)` - Blue-gray body text

#### Secondary Text / Muted Text
```jsx
<p className="text-base-content/70">Slightly muted text</p>
<p className="text-base-content/50">Very muted text</p>
```

---

### 🎨 **Brand Colors**

#### Primary (Main Brand Blue)
**Use for:** Buttons, CTAs, primary actions, main headings
```jsx
<button className="btn btn-primary">Primary Button</button>
<h1 className="text-primary">Main Heading</h1>
```
**Color:** `oklch(0.608 0.370 264.7)` - Vibrant blue

#### Secondary (Light Blue)
**Use for:** Secondary buttons, less prominent actions
```jsx
<button className="btn btn-secondary">Secondary Button</button>
<div className="bg-secondary">Secondary background</div>
```
**Color:** `oklch(0.740 0.077 244.7)` - Lighter blue

#### Accent (Neutral Blue-Gray)
**Use for:** Borders, subtle highlights, tertiary elements
```jsx
<div className="border-accent">Bordered element</div>
<span className="text-accent">Accent text</span>
```
**Color:** `#5a5d80` - Neutral blue-gray

---

### 🎯 **Semantic Colors**

#### Info (Blue)
**Use for:** Informational messages, help text
```jsx
<div className="alert alert-info">Information message</div>
<span className="text-info">Info text</span>
```
**Color:** `oklch(74% 0.16 232.661)`

#### Success (Green)
**Use for:** Success messages, confirmations
```jsx
<div className="alert alert-success">Success message</div>
<span className="text-success">Success text</span>
```
**Color:** `oklch(76% 0.177 163.223)`

#### Warning (Yellow)
**Use for:** Warning messages, caution
```jsx
<div className="alert alert-warning">Warning message</div>
<span className="text-warning">Warning text</span>
```
**Color:** `oklch(82% 0.189 84.429)`

#### Error (Red)
**Use for:** Error messages, critical alerts
```jsx
<div className="alert alert-error">Error message</div>
<span className="text-error">Error text</span>
```
**Color:** `oklch(70% 0.191 22.216)`

---

### 🖼️ **Background Colors**

#### Base Backgrounds
```jsx
// White background (default)
<div className="bg-base-100">Content</div>

// Light gray background
<div className="bg-base-200">Content</div>

// Medium gray background
<div className="bg-base-300">Content</div>
```

**Colors:**
- `base-100`: `oklch(100% 0 0)` - Pure white
- `base-200`: `oklch(97% 0 0)` - Light gray
- `base-300`: `oklch(92% 0 0)` - Medium gray

#### Custom Background Colors
```jsx
// Light lavender-blue (hero gradient only)
<div className="bg-hero-light">Hero content</div>
```

**Colors:**
- `hero-light`: `oklch(0.801 0.056 280.3)` (#b6bae2) - Light lavender-blue for hero sections only

---

## Common Patterns

### Cards
```jsx
// ✅ CORRECT - Text color applied automatically
<div className="card bg-base-100">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card description text</p>
  </div>
</div>
```

### Buttons
```jsx
// Primary action
<button className="btn btn-primary">Get Started</button>

// Secondary action
<button className="btn btn-secondary">Learn More</button>

// Outline/Ghost
<button className="btn btn-outline btn-primary">Outline Button</button>
<button className="btn btn-ghost">Ghost Button</button>
```

### Hero Sections with Gradients
```jsx
// Light hero background (white to lavender-blue)
<section className="relative min-h-screen bg-gradient-to-br from-white via-hero-light to-hero-light">
  <div className="container mx-auto px-4 py-20">
    <h1 className="text-5xl font-bold">Hero Content</h1>
    <p>Description text</p>
  </div>
</section>
```

### Headings with Gradients
```jsx
// Info gradient (blue)
<h2 className="text-4xl font-bold">
  <span className="bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
    Gradient Heading
  </span>
</h2>

// Success gradient (green)
<h2 className="text-4xl font-bold">
  <span className="bg-gradient-to-r from-success via-success to-info bg-clip-text text-transparent">
    Green Gradient
  </span>
</h2>

// Warning gradient (yellow/orange)
<h2 className="text-4xl font-bold">
  <span className="bg-gradient-to-r from-warning via-warning to-success bg-clip-text text-transparent">
    Yellow Gradient
  </span>
</h2>
```

---

## Migration Guide

If you're updating existing components, replace manual color classes:

### Before (Manual)
```jsx
<p className="text-neutral">Body text</p>
<h3 className="text-neutral">Heading</h3>
<span className="text-neutral/70">Muted text</span>
```

### After (Automatic)
```jsx
<p>Body text</p>  // DaisyUI applies base-content automatically
<h3 className="text-base-content">Heading</h3>
<span className="text-base-content/70">Muted text</span>
```

---

## Complete Color Reference

| Usage | Class | Color Value | When to Use |
|-------|-------|-------------|-------------|
| **Body Text** | `text-base-content` | `oklch(0.474 0.050 238.1)` | Default text, paragraphs, descriptions |
| **White Background** | `bg-base-100` | `oklch(100% 0 0)` | Pure white, default backgrounds |
| **Light Gray** | `bg-base-200` | `oklch(97% 0 0)` | Light gray backgrounds |
| **Medium Gray** | `bg-base-300` | `oklch(92% 0 0)` | Subtle backgrounds, sections |
| **Hero Light** | `bg-hero-light` | `oklch(0.801 0.056 280.3)` (#b6bae2) | Light lavender-blue, hero gradients only |
| **Primary** | `text-primary` or `bg-primary` | `oklch(0.608 0.370 264.7)` | Main CTAs, buttons, primary headings |
| **Secondary** | `text-secondary` or `bg-secondary` | `oklch(0.740 0.077 244.7)` | Secondary buttons, less prominent actions |
| **Accent** | `text-accent` or `bg-accent` | `#5a5d80` | Borders, subtle highlights, icons |
| **Neutral** | `bg-neutral` | `#5a5d80` | Neutral backgrounds, containers |
| **Info** | `text-info` or `bg-info` | `oklch(74% 0.16 232.661)` | Information, help, gradient accents |
| **Success** | `text-success` or `bg-success` | `oklch(76% 0.177 163.223)` | Success states, confirmations, green accents |
| **Warning** | `text-warning` or `bg-warning` | `oklch(82% 0.189 84.429)` | Warnings, cautions, yellow accents |
| **Error** | `text-error` or `bg-error` | `oklch(70% 0.191 22.216)` | Errors, critical alerts, red accents |

---

## Best Practices

### ✅ DO
- Let DaisyUI apply text colors automatically when possible
- Use semantic color names (`text-primary`, `text-success`, etc.)
- Use opacity modifiers for muted text (`text-base-content/70`)
- Use consistent patterns across components

### ❌ DON'T
- Manually specify `text-neutral` everywhere (use `text-base-content` or let it default)
- Mix custom hex colors with DaisyUI theme colors
- Use non-semantic color names for semantic purposes
- Override theme colors with inline styles unless absolutely necessary

---

## Typography

All text uses the **Sora** font family, which is already configured globally:

```jsx
// No need to specify fontFamily - it's applied globally
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base">Body text</p>
```

**Font Weights:**
- Regular: `font-normal`
- Medium: `font-medium`
- Semibold: `font-semibold`
- Bold: `font-bold`
- Extrabold: `font-extrabold`
- Black: `font-black`

---

## Examples

### Complete Component Example
```jsx
export default function ExampleCard() {
  return (
    <div className="card bg-base-100 shadow-xl border border-accent/20">
      <div className="card-body">
        {/* Title - uses base-content automatically */}
        <h2 className="card-title text-2xl">Card Title</h2>
        
        {/* Description - uses base-content automatically */}
        <p>
          This is a description that uses the default text color.
          No need to specify text-neutral anymore!
        </p>
        
        {/* Muted text */}
        <p className="text-base-content/70 text-sm">
          Additional muted information
        </p>
        
        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-primary">
            Learn More
          </button>
          <button className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Questions?

If you're unsure which color to use:
1. **Body text?** → Let DaisyUI handle it automatically or use `text-base-content`
2. **Primary action?** → Use `btn-primary` or `text-primary`
3. **Muted/secondary text?** → Use `text-base-content/70`
4. **Borders/subtle accents?** → Use `border-accent` or `text-accent`
5. **Semantic meaning (success, error, etc.)?** → Use `text-success`, `text-error`, etc.

**The theme is now configured correctly - let DaisyUI do the work for you!** 🎨

