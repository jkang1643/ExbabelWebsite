# Validation and production limits

Verified 2026-09-22 in WSL Ubuntu.

## Passed

- JSON Schema validation using Python jsonschema.
- Supplied narration coverage: 325 whitespace-delimited words, 22 scenes, contiguous 0–151000ms timeline.
- Every beat is inside its assigned scene; every scene has layer boxes and asset references.
- Spanish, Portuguese, French and Korean labels preserved as Unicode.
- Browser proof frames for all 22 scenes and 22 reverse-seek pose comparisons.
- Browser has no JavaScript errors or missing required resources.
- Review page works at 1440px desktop and 390px mobile width without page overflow.
- Static reduced-motion review and final frame hold checked.
- HyperFrames 0.8.62 native anime.js adapter produces inspected snapshots at 1.5s, 32.5s, 74.5s and 150.966s.
- Final HyperFrames check: no errors; runtime, layout, motion and contrast audits pass.
- Motion audit sampled 300 states; explicit scene proof samples cover all 22 scenes.
- Contrast audit checked 33 text samples over its selected frames; zero contrast findings.
- Skill Creator's quick_validate.py reports “Skill is valid!”

## Non-blocking HyperFrames warnings

The schematic composition intentionally keeps 22 scenes in one generated file. HyperFrames reports 24 static warnings: 22 recommendations to use sub-compositions, one dense-track recommendation, and one repeated-logo-image discovery warning. There is no video/audio in the schematic; repeated logos are static image nodes in mutually exclusive scene clips. For final production, split coherent scene groups into sub-compositions and use a persistent brand anchor.

The published 0.8.62 checker expects the legacy window.__timelines initializer even with the native anime.js adapter. The composition initializes that empty registry for compatibility and registers its sole animation timeline only in window.__hfAnime. It does not drive the same animation with two clocks.

## Not claimed as completed

- Uninterrupted real-time viewing/listening or exact recovered source keyframes.
- Original reference narration transcript, BPM, SFX identification or beat synchronization.
- Generated family/listener footage.
- Final product-accurate screenshots and working QR.
- Recorded narration, licensed soundtrack, sound mix or narration subtitle alignment.
- Full implementation of all production motion beats and shared-element transitions.
- Final MP4 or deployed Exbabel carousel.
- Visual interaction audit of the deployed website carousel; local source and live page text were inspected.

Read REFERENCE_ANALYSIS.md for source uncertainty and MASTER_VIDEO_PRODUCTION_BLUEPRINT.md for the remaining final-production checklist.

