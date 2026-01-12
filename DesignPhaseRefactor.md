1. 📏 Spacing Debt Eradicated
Target: 
Navbar.tsx
 & 
CapabilitySwitcher.tsx
The Fix:
Removed "magic numbers" (10px/12px) that broke the grid.
Navbar: Enforced strict py-6 (24px) / py-4 (16px) vertical rhythm.
Type: Downgraded the "vanity" 15px font to a crisp text-sm (14px) for better density and rendering.
Gaps: Standardized gap-3 (12px) → gap-4 (16px) in the Capability Switcher components.
2. 🧱 Component "Object Permanence"
Target: Buttons & Cards
The Fix:
Unification: Aligned 
Navbar
 buttons to rounded-full to match the 
CTA
 primary buttons.
Interactions: Updated the 
CTA
 button to remove the cheap "Jump" effect (-translate-y-1). Replaced it with a premium scale-[1.02] lift.
Shadows: Replaced the "muddy" 50px blur glow with a tighter, more realistic shadow-xl + shadow-white/40 combo.
3. ✨ Lighting & Glint (The "Expensive" Look)
Target: 
CapabilitySwitcher.tsx
 (Preview Window & Cards)
The Fix:
Card Borders: REMOVED the cheap border-base-200. Replaced with a Vercel Shadow (0 0 0 1px rgba(0,0,0,0.08)), which simulates a border without the "cartoon outline."
The "Glint": Added a inset 0 1px 0 0 rgba(255,255,255,0.5) inner shadow to the Preview Window. This creates that subtle "glass edge" that catches the light, instantly adding depth.
Your foundation is now mathematically sound (8pt grid) and arguably 20% more expansive/premium in feel.

Ready for Phase 2 (Typography & Content Rhythms)?
## Phase 2: Typography & Content Rhythms
Target: globals.css, Hero.tsx, Features.tsx, HowItWorks.tsx

**The Fix:**
- **Systematized Type Scale:** Replaced ad-hoc sizes with .text-h1 (clamp 40-56px), .text-h2 (32-40px), .text-body (16-18px).
- **Trust Signals (Eyebrows):** Added uppercase eyebrows (REAL-TIME AI TRANSLATION, POWERFUL FEATURES) to anchor sections.
- **Developer Polish:** Added text-rendering: optimizeLegibility and custom ::selection colors.

## Phase 3: Content Structure & Trust Audit
Target: Features.tsx, ImpactStats.tsx, TrustedPartners.tsx

**The Fix:**
- **Removed Fake Proof:** Deleted redundant stats row in Features component.
- **Dignified Metrics:** Refactored ImpactStats to use semantic typography instead of arbitrary 80px sizing.
- **Honest Integrations:** Renamed "Trusted by teams" to "WORKS SEAMLESSLY WITH" and replaced generic logos with actual integration partners (Zoom, OBS, Teams).
- **Reduced Noise:** Focused on verifiable capabilities rather than inflated social proof.
