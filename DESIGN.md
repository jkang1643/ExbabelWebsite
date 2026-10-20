---
name: Exbabel solutions pages
description: Implemented visual system for the church, events, and business solution pages.
colors:
  brand-blue: "#394dfe"
  brand-blue-hover: "#2638d9"
  ink: "#101828"
  body-muted: "#475467"
  divider: "#dce1e8"
  white: "#fff"
  pale-blue: "#f1f4ff"
  soft-blue: "#f6f8ff"
  blue-gray: "#697894"
typography:
  display:
    fontFamily: "var(--font-sora), sans-serif"
    fontSize: "clamp(2.7rem, 4.2vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "var(--font-sora), sans-serif"
    fontSize: "clamp(2rem, 3.3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-.035em"
  body:
    fontFamily: "var(--font-sora), sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
rounded:
  action: "100px"
  illustration: "20px"
  panel: "16px"
  small: "9px"
spacing:
  inline-gutter: "48px"
  hero-top: "128px"
  section: "96px"
components:
  solution-primary-link:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "12px 24px"
    height: "52px"
  solution-primary-link-hover:
    backgroundColor: "{colors.brand-blue-hover}"
  language-badge:
    backgroundColor: "{colors.pale-blue}"
    rounded: "{rounded.small}"
    padding: "9px 13px"
---

# Design System: Exbabel solutions pages

## Overview

**Creative North Star: "Aurora"**

DESIGN_SPEC.md names the broader Exbabel visual language Aurora: layered surfaces, light, and a calm shell around energetic accents. These solution pages use a restrained expression of it: white and pale blue sections, dark text, vivid blue actions, rounded diagrams, and small areas of depth. The church translation page is the direct visual precedent for the events and business pages.

**Key Characteristics:**
- Wide two-column hero followed by clearly separated sections.
- Sora typography, blue headline emphasis, and muted body copy.
- Illustrative translation diagrams with source, bridge, and listener surfaces.
- Captions identify prepared examples as illustrative rather than live output.

## Colors

### Primary

- **Brand blue** marks hero text, actions, icons, labels, and focus outlines. **Hover blue** darkens the primary action.

### Neutral

- **Ink** carries headings; **body muted** carries paragraphs; **blue gray** carries captions and secondary heading text.
- **White** is the main page and panel surface. **Pale blue** and **soft blue** mark badges and alternate sections. **Divider** separates benefits, steps, and FAQ rows.

**The Accent Rule.** Use vivid blue for actions and meaningful emphasis, following the church page and its extensions.

## Typography

Sora is assigned to the church page and the shared events/business component. Both use semibold headings with tight tracking and balanced wrapping. Most long solution copy sits in columns around 51–65 characters wide.

- **Display:** The new solution hero uses the frontmatter display scale. The church hero uses 60px on wide desktop, then reduces it at narrower breakpoints.
- **Headline:** The new solution sections use the frontmatter headline scale; the church page uses 36px and 48px section headings by context.
- **Body:** Standard paragraphs use 16px type and a 1.75 line height. Hero leads use 18px and a 1.65 line height.
- **Microcopy:** Figure captions, example labels, and panel labels are smaller and quieter than body copy.

## Layout

Sections sit in a centered 1360px container with 48px side gutters on desktop. The church and new pages share a two-column hero proportion near 0.88fr to 1.2fr, with copy beside an illustrated scene. Benefits appear in four columns; workflow steps in three. The new pages collapse paired sections at 800px and reduce gutters to 22px at 560px. The church page has its own responsive breakpoints.

**The Section Rhythm Rule.** Keep generous vertical spacing, with soft background changes or fine rules to clarify transitions.

## Elevation & Depth

The pages use subtle depth in diagrams and cards. The new solution scene has a diffuse blue shadow; its host and listener panels have smaller shadows. The church page gives its illustrated interface and selected image cards depth. Global Aurora tokens in app/globals.css define additional colored ambient and card shadows for other site surfaces.

## Shapes

Primary actions are pills. Illustrated canvases use broadly rounded corners, with smaller rounded inner panels. Benefits and FAQ rows rely mostly on spacing and fine horizontal rules. The new icon tiles and language badges use small rounded rectangles.

## Components

### Primary action

The solution action is a blue pill at least 52px tall with white semibold text. It darkens and shifts upward 2px on hover; the new page removes its transition for reduced motion. Church uses the same blue, height, pill form, and hover color.

### Translation scene

Both hero scenes visualize speech reaching a translated listener view. They use Exbabel host/listener panels, waveform bars, the same translation glyph, blue connectors, and an explanatory caption. The new scene is static; the church scene has optional user-controlled animation.

### Navigation and FAQ

The pages render the shared Navbar component. FAQ entries use native disclosure elements with fine dividers, a plus indicator, and visible focus treatment. The new page also has a keyboard skip link and a blue focus outline.

## Do's and Don'ts

### Do:

- **Do** follow the church page's blue accent, Sora headings, wide gutters, and source-to-listener diagram language when extending solution pages.
- **Do** preserve the distinction between prepared illustrations and live product output in captions.
- **Do** use visible keyboard focus treatment and responsive stacking for dense sections.

### Don't:

- **Don't** treat the new pages' exact section composition as a sitewide template; the church page has its own content and layout variations.
- **Don't** present illustrative hero scenes as measured latency evidence.
