# Exbabel Design System & Visual Rhythm Specification
**Status:** Living Document / Structural Specification  
**Role:** Internal Engineering & Design Governance  
**Context:** Production-grade framework for Exbabel (Real-time AI Translation/Transcription)

---

## 1. Design Philosophy & Product Principles
### 1.1 Core Design Values
*   **Cognitive Preservation:** The system must protect the user’s mental bandwidth. In a live event, the focus should be on the message, not the interface.
*   **Invisible Utility:** UI exists only to serve the transcription and audio flow. It should "recede" into the background when active.
*   **Quiet Authority:** Tone is premium and precise, avoiding the "hype" of typical AI SaaS in favor of the stability required for worship environments.

### 1.2 Target User Mental States
*   **The Listener:** Cognitively loaded, likely looking at a screen while processing live audio. Requires high legibility and zero distractions.
*   **The Pastor/Speaker:** Emotionally present. UI must not introduce anxiety via complex controls.
*   **The Operator:** Mission-critical focus. Needs immediate feedback on system health without visual clutter.

### 1.3 Systemic Differentiation
Generic SaaS kits optimize for "conversion." This system optimizes for **"retention of meaning."** Every pixel must justify its existence against the risk of distracting a worshiper or attendee.

---

## 2. Visual Rhythm System
### 2.1 Vertical Rhythm Strategy
*   **The Base Unit:** A single integer-based unit governs all spacing.
*   **Incremental Scale:** All gaps, margins, and paddings must be multiples of the base unit to ensure mathematical harmony.
*   **The "Quiet" Rule:** Use larger spacing multiples than standard SaaS to create "breathing room," reducing the feeling of density.

### 2.2 Section Spacing Logic
*   **Macro-Spacing:** Governing the distance between major content blocks. 
*   **Micro-Spacing:** Governing the distance between elements within a component.
*   **Rhythm Rules:**
    *   ❌ **Don’t** use "half-units" or odd-numbered pixel deviations.
    *   ✅ **Do** use consistent multiples for section headers vs. body content.

---

## 3. Layout & Grid Framework
### 3.1 Content Rails
*   **Standard Rail:** The primary max-width for most content to prevent horizontal eye fatigue.
*   **Narrow Rail:** Optimized for reading-heavy text blocks (transcription logs, documentation).
*   **Utility Rail:** Reserved for edge-to-edge dashboard or presentation views.

### 3.2 Responsive Tiers
*   Layouts must adapt based on the device’s "Role" (e.g., a phone is a translation receiver; a desktop is an administrative hub).

### 3.3 Alignment Framework
*   **Centered:** Reserved for high-impact, low-word-count sections (Hero, Final CTA).
*   **Left-Aligned:** The default for all informative or interactive content to ensure a predictable reading start-point.

---

## 4. Typography System (Conceptual)
### 4.1 Typographic Hierarchy
*   A clear distinction between "Reading Type" (body) and "Display Type" (headings).
*   **The Eyebrow Rule:** Use small, high-contrast labels to anchor sections before the primary heading.

### 4.2 Semantic Usage
*   **Headings:** Used to define the information architecture.
*   **Body:** Optimized for long-form reading comfort.
*   **UI/Meta:** Small-scale text for status indicators and navigation.

### 4.3 Reading Constraints
*   **Max Line Length:** Strictly enforced character-per-line maximums to ensure the eye doesn't "get lost" returning to the next line.
*   **Line-Height:** generous leading for body text to assist users with visual impairments or low-light environments.

---

## 5. Color System (Roles & Strategy)
### 5.1 Intent-Based Coloring
Colors are assigned by **Function**, not by aesthetic preference.
*   **Action Role:** Reserved for primary interactions and critical focus.
*   **Surface Role:** Defines depth and layering (Background, Elevated, Muted).
*   **Content Role:** Defines text hierarchy (Primary, Secondary, Disabled).

### 5.2 Functional Communication
*   **State Colors:** Specific roles for Success, Warning, and Error. These must be used sparingly to maintain their urgency.
*   **The "Neutral" Anchor:** A robust palette of grays and off-whites to ground the interface and allow the "Action" color to stand out.

---

## 6. Component Architecture
### 6.1 Atomic Strategy
Components are built from **Primitives** (spacing, color tokens) → **Atoms** (buttons, inputs) → **Molecules** (cards, forms) → **Organisms** (navbar, hero).

### 6.2 Variant Management
*   No one-off components. Every component variant must be documented as a system-standard (e.g., "Primary Button," "Ghost Button").
*   **Props over Style:** Variations are handled through semantic properties, never through ad-hoc class overrides.

---

## 7. Core UI Components
### 7.1 Action Elements (Buttons & Links)
*   **Purpose:** Directing user flow.
*   **States:** Default, Hover, Active, Loading, Disabled, Focus-Visible.
*   **Accessibility:** Precise hit-area minimums for mobile users.

### 7.2 Container Elements (Cards)
*   **Purpose:** Grouping related information.
*   **Expectation:** Unified radius and border/shadow logic.
*   **Rule:** Titles must strictly follow the typographic hierarchy.

### 7.3 Navigation (Header & Footer)
*   **Header:** Persistent access to core tools and session state.
*   **Footer:** Passive discovery of secondary resources (legal, support).

### 7.4 Content Blocks (Display Blocks)
*   Custom layouts for specific data types like "Language Switchers" or "Live Transcript Feeds."

---

## 8. Motion & Interaction Principles
### 8.1 The "Whisper" Philosophy
Motion should feel like a physical transition, not a digital effect.
*   **Duration:** Fast enough to feel responsive, slow enough to be perceived.
*   **Easing:** Subtle, non-linear curves that mimic natural acceleration.

### 8.2 Prohibited Motion
*   ❌ No "shaking" or "bouncing" unless indicating a critical error.
*   ❌ No full-page entrance animations that delay user interaction.
*   ❌ No motion that triggers vestibular sensitivity (e.g., massive parallax).

---

## 9. Content & Messaging System
### 9.1 Headline Rules
*   Every heading must be a clear value proposition or a functional descriptor.
*   **No Fluff:** Avoid hyperbolic marketing language ("Revolutionary," "Magical"). Replace with functional clarity ("Real-time," "Accurate").

### 9.2 Section Purpose Mapping
Every URL path must have a "Final CTA" to ensure there are no dead-ends in the user journey.

---

## 10. Accessibility & Inclusive Design
### 10.1 Visual Standards
*   **Contrast Thresholds:** All text-to-background combinations must meet strict readability standards.
*   **Non-Color Meaning:** Never use color as the *only* way to communicate a state (e.g., add an icon to an error message).

### 10.2 Navigation Standards
*   **Keyboard First:** The entire system must be navigable via Tab/Enter.
*   **Focus Ring:** A high-visibility focus indicator is mandatory and non-negotiable.

---

## 11. Trust, Credibility & Proof System
### 11.1 Ethical Proof
*   **Quality over Quantity:** Use verified testimonials and integration partners over "vanity metrics."
*   **Placement:** Trust signals must appear near "Moments of Friction" (e.g., near the pricing table or signup form).

### 11.2 Consistency as Trust
The primary trust builder is **Internal Consistency**. If the UI is predictable, it feels reliable. If the UI is "glitchy" or inconsistent, the user will doubt the AI's accuracy.

---

## 12. Governance & Evolution
### 12.1 The "Two-Use" Rule
A new component or pattern cannot be added to the system until it is needed in at least **two** distinct contexts.

### 12.2 Auditing & Anti-Patterns
*   **The Drift Audit:** Periodic reviews to ensure developers aren't introducing "magic numbers" or one-off colors.
*   **Documentation:** Every change to the system must be reflected in the design system docs before it is merged into the production codebase.

---
**End of Specification**
