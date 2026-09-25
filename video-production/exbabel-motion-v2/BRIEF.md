---
workflow: general-video
flow: automation
---
# Motion rebuild — retain all 22 scenes

Preserve every existing scene, order, asset, narration script and 123.8s duration. First rebuild motion, then apply the supplied marketing-copy mapping. S01 (including its existing S02 narrative content) and S19 are excluded from both passes. White spatial environment, one focal object, purposeful camera development, causal UI behavior, persistent visual handoffs. No stock footage or replacement scenes. Existing ElevenLabs narration is reused unchanged.

The later tracked-typography instruction allows purposeful cropping while the cursor is being followed. The completed headline must resolve fully on screen, with its specified line breaks, before the graphic handoff. No bounce, spring, overshoot, or independent word movement during the typing reveal. Existing visual objects survive across scene boundaries. See REVISION.md and motion-plan.json for the implemented timings and handoffs; copy-revisions.json is the copy source of truth.

Remove persistent header/footer/divider/progress and burned-in subtitle pills. Keep subtitles as a separate SRT. Use one paused GSAP timeline, native HyperFrames seeking, and no independent animation clocks. Preserve previous production as exbabel-film.

Catalog consulted: shared-axis-y, camera-scan-gate, zoom-through-transition. Read their actual implementations. The zoom-through sample contains an explicit RGB strobe; DO NOT copy that strobe, RGB layer, flare, or blur. Adapt its mask/scale continuity only. The scan sample's bounce/pulse is replaced with a restrained sweep/lock. Rules: viewport-change, multi-phase-camera, anchored-layout-expand, discrete-text-sequence, control-target-sync, card-morph-anchor.

Gate: inspect 0/25/50/75/100% of every frame, plus forward/backward/direct seek equivalence and adjacent-frame flash checks. Do not render a layout that simply enters and holds. Full render remains authorized.
