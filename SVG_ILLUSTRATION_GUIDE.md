# Exbabel SVG Illustration Style Guide
**Version:** 1.0.0 (July 2026)  
**Status:** Production Standard  
**Reference:** LiveVoice illustration system  

---

## Philosophy

Our illustrations explain product concepts instantly — like a whiteboard sketch from a smart friend. They are **not** polished 3D renders, glassmorphism composites, or AI-generated images. They are hand-drawn-style line art that feels human, clear, and trustworthy.

> Every illustration must answer the question: **"Could a non-technical person understand this in 3 seconds?"**

---

## Color Rules

Only two colors. Ever.

| Role | Value | Usage |
|:---|:---|:---|
| **Line Art** | `#0B1220` (Ink) | All strokes, outlines, faces, bodies, devices, text labels |
| **Accent** | `#394DFE` (Brand Blue) | Flow arrows, sound waves, speech bubble text, highlighted people, AI chip text, sparkles |

### Prohibited
- ❌ No gradients
- ❌ No glassmorphism or transparency effects
- ❌ No shadows or drop shadows
- ❌ No third colors (no pink, purple, mint, yellow in illustrations)
- ❌ No fills on shapes (strokes only, except small accent fills like headphone pads)

---

## Stroke Rules

| Element | Width | Cap | Join |
|:---|:---|:---|:---|
| Primary outlines (heads, bodies, devices) | `2.5` | `round` | `round` |
| Secondary outlines (speech bubbles, icons) | `2` | `round` | `round` |
| Detail strokes (screen content, pins) | `1.5` | `round` | — |
| Content placeholder bars | `3–5` height rects | — | — |

---

## People

### How to Draw a Person
```
Head:       <circle r="16–28" stroke="#0B1220" strokeWidth="2.5" />
Eyes:       Two small filled circles (r="1.2–2") placed at ~40% height
Mouth:      Curved path (smile), strokeLinecap="round"
Body:       Single vertical line from head bottom
Arms:       Two diagonal lines from ~40% down the body
Legs:       Two diagonal lines from body bottom (optional, context-dependent)
```

### Variants
- **Speaker:** Holding a microphone (circle + line)
- **Listener with headphones:** Arc path over head + two small filled rects at ears
- **Listener with phone:** Small rect in hand with placeholder content bars
- **Highlighted person:** Use `#394DFE` instead of `#0B1220` for ALL strokes

### Scale
- Hero illustrations: `r="24–28"` heads
- Audience rows: `r="14–18"` heads
- Small groups: `r="16–20"` heads

---

## Devices

### Laptop
```
Screen:     <rect rx="8" stroke="#0B1220" strokeWidth="2.5" />
Base:       Angled path below screen
Content:    Small rect bars inside as placeholder text (opacity 0.08–0.15)
Accent:     One rect with fill="#394DFE" for primary UI element
```

### Phone
```
Shell:      <rect rx="10–12" stroke="#0B1220" strokeWidth="2.5" />
Notch:      Small rect at top (opacity 0.12)
Content:    Stacked rect bars for UI lines
Home bar:   Small rect at bottom (opacity 0.12)
Accent:     One rect with fill="#394DFE" for selected language/action
```

### Screen/Projector
```
Frame:      <rect rx="4" stroke="#0B1220" strokeWidth="2.5" />
Content:    Placeholder bars at various opacities (0.08–0.15)
Stand:      Single vertical line below
```

---

## Speech Bubbles

```
Shape:      <ellipse> or rounded path, stroke only
Tail:       Triangular path pointing to speaker's head
Text:       fill="#394DFE", fontWeight="700", fontStyle="italic"
```

### Content Rules
- Use **actual translated words**, not abstract shapes
- Examples: `HELLO`, `HOLA`, `你好`, `안녕하세요`, `Bonjour`
- Font: `fontFamily="var(--font-sora), sans-serif"`

---

## Flow Arrows

```
Path:       Curved <path> (use cubic bezier C commands for natural flow)
Color:      stroke="#394DFE"
Width:      strokeWidth="2–2.5"
Cap:        strokeLinecap="round"
Arrowhead:  Two-line chevron path, strokeLinejoin="round"
```

### Arrow Pattern
```svg
<!-- Curved flow line -->
<path d="M100 200 C150 180, 200 170, 250 160" stroke="#394DFE" strokeWidth="2.5" fill="none" />
<!-- Arrowhead -->
<path d="M244 154 L253 161 L246 167" stroke="#394DFE" strokeWidth="2.5" fill="none" />
```

---

## Sound Waves

Vertical bars at varying heights, always in brand blue:

```svg
<g stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round">
  <path d="M280 185 L280 215" />
  <path d="M290 175 L290 225" />
  <path d="M300 180 L300 220" />
  <path d="M310 170 L310 230" />
  <path d="M320 185 L320 215" />
</g>
```

---

## AI Chip Icon

The standard representation for "AI processing":

```svg
<!-- Chip body -->
<rect x="370" y="168" width="60" height="55" rx="8" stroke="#0B1220" strokeWidth="2.5" />
<!-- Pins (top and bottom, 3 each) -->
<line x1="382" y1="168" x2="382" y2="160" stroke="#0B1220" strokeWidth="2" />
<line x1="400" y1="168" x2="400" y2="160" stroke="#0B1220" strokeWidth="2" />
<line x1="418" y1="168" x2="418" y2="160" stroke="#0B1220" strokeWidth="2" />
<!-- "AI" label -->
<text x="400" y="202" textAnchor="middle" fill="#394DFE" fontSize="16" fontWeight="800">AI</text>
<!-- Sparkles (diamond shapes in accent blue) -->
<path d="M365 155 L368 148 L371 155 L368 152 Z" fill="#394DFE" />
```

---

## Sparkles / Magic Indicator

Small diamond shapes in brand blue, placed near AI elements:

```svg
<path d="M215 35 L218 28 L221 35 L218 31 Z" fill="#394DFE" />
```

---

## Labels

```
Style:      fontWeight="700", fontStyle="italic"
Font:       fontFamily="var(--font-sora), sans-serif"
Color:      fill="#0B1220"
Size:       13–14px
Position:   Below the element, textAnchor="middle"
Examples:   "SPEAKER", "AUDIENCE", "AI ENGINE", "LISTEN", "SPEAK"
```

---

## Icon Grid (Feature Grids)

For feature overview sections (like "After the Event"):

```
Layout:     2×4 or 2×3 grid
Icon:       Simple stroke-only illustration (search magnifier, clock, bar chart, etc.)
Label:      Bold text below each icon, fontSize="12", fontWeight="700"
Accent:     Selective use of #394DFE fill at opacity 0.1–0.3 for emphasis
```

---

## QR Code (Abstract)

```
Frame:      Large rect with rx="8", stroke only
Content:    Three corner markers (small rects with stroke)
            + scattered filled squares for pattern
Center:     Small rect with brand text "EX" in #394DFE
```

---

## Composition Rules

1. **Center-weighted:** Main subject in center, supporting elements flanking
2. **Left-to-right flow:** Speaker → Process → Audience
3. **Top-to-bottom hierarchy:** Source at top, audience at bottom
4. **Generous viewBox:** Don't crowd elements. Use at least 600×300 viewBox minimum
5. **No backgrounds:** No rect fills, no colored backgrounds. Pure white (transparent)
6. **Accessibility:** Every SVG must have `role="img"` and descriptive `aria-label`

---

## Animation Rules

**None.**

- ❌ No Framer Motion entrance animations
- ❌ No scroll-triggered animations
- ❌ No CSS transitions on SVGs
- ❌ No hover state changes on illustrations
- ✅ Static illustrations only
- ✅ Page-level hover effects (buttons, cards) are fine — just not on illustrations

---

## File Structure

```
components/svg/
├── HeroFlowSvg.tsx          # Hero: Speaker → AI → Multilingual Listeners
├── ConnectInputsSvg.tsx      # Step 1: Laptop dashboard + devices
├── TranslationPipelineSvg.tsx # Step 2: Speaker → AI → Translated audience
├── QrJoinSvg.tsx             # Step 3: QR code + phone scanning
├── AudienceListenSvg.tsx     # Step 4: Audience with different languages
├── DashboardSvg.tsx          # Step 5: Feature icon grid (post-event)
├── SvgDefs.tsx               # (Legacy — not imported by current components)
└── WorkflowDiagramSvg.tsx    # (Legacy — not imported by current components)
```

Each file exports a single React component that accepts `{ className?: string }`.

---

## Checklist for New Illustrations

Before adding a new SVG illustration, verify:

- [ ] Uses only `#0B1220` (ink) and `#394DFE` (accent)
- [ ] No gradients, shadows, or transparency effects
- [ ] People have consistent proportions (head radius, stroke width)
- [ ] All strokes use `strokeLinecap="round"`
- [ ] Flow arrows use curved bezier paths with chevron arrowheads
- [ ] Speech bubbles contain actual translated text, not placeholders
- [ ] SVG has `role="img"` and `aria-label`
- [ ] No animations or motion of any kind
- [ ] Composition reads left-to-right or top-to-bottom
- [ ] Labels are italic, bold, positioned below elements

---

*End of SVG Illustration Style Guide. Follow these rules or the illustrations drift.*
