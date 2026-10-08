# Story graphics revision — 24 September 2026

Full length: 123.8 seconds, 1920 × 1080, 30 fps. All narration, scene boundaries and marketing copy retained. S01 is byte-identical. S19 changes only the requested camera endpoint, preserving its dynamic text width, timing and easing.

## Artwork and choreography

The editable artwork lives in `scene-graphics.js` and `scene-graphics.css`. The builder embeds it with the existing single paused master GSAP timeline. There are no independent animation clocks, stock footage, CSS animation loops or generated text images.

| Scene | Sequence within original time slot |
|---|---|
| S05, 24.756–27.700 | Headline → large language selector → Spanish selection and check → listening button press and live state. |
| S06, 27.700–29.800 | Ring draws, then check draws above centered statement; statement slowly enlarges and remains in place. |
| S07, 29.800–37.289 | Headline → sermon audio card → English sentence types → translation direction resolves → Spanish sentence types and live translation status. |
| S10, 46.656–53.066 | Headline → original vector family sharing a church pew → phone confirmation and Spanish live-language label. |
| S11, 53.066–59.833 | Headline → same family geometry → wider congregation appears around them under a restrained camera push. |
| S14, 69.544–75.500 | Headline → supplied livestream SVG → timed Spanish captions → language-control emphasis. Original looping CSS is removed. |
| S15, 75.500–81.822 | Headline → remote livestream viewer in Madrid → Spanish selected → translated captions arrive. |
| S16, 81.822–89.522 | Headline → Audio Input card → Computer & Browser card → User Devices card. One complete card at a time; rows reveal in order. |
| S17, 89.522–95.044 | Existing QR/share interface; unrelated blue block can no longer carry over. |
| S18, 95.044–98.622 | Headline → single phone held by a hand → language confirmation → thumb press → connected/listening status. |
| S19, 98.622–104.200 | Existing typing and camera track; final right edge lands at 1720px so “service.” resolves fully. |
| S20, 104.200–108.656 | Headline → unified calendar offer → count rises to 30 with progress ring → integrated CTA. Entire graphic ends at the scene boundary. |
| S21, 108.656–115.356 | Existing help/setup scene, with no trial-number carryover. |

Custom graphics take over the canvas after the headline reveal. The same stage pushes from scale 1 to 1.022, with the graphic adding a restrained 1 to 1.025 depth movement. Easing is cubic, without elastic or bounce behavior. Foreground content is crisp; shadows are soft and low-opacity. Blue marks selection, translation and CTA emphasis.

Only the identical S08 → S09 listener surface retains an extracted-object bridge. The former automatic bridge generator carried unrelated UI into later scenes; it is now explicitly restricted. Other scene boundaries release the outgoing object at their fixed edit point.

## Validation

- `motion-audit.json`: quarter-point captures for every editable scene, reverse-seek DOM state equivalence, no page errors, S01 protection and narrow S19 exception.
- `copy-and-framing-audit.json`: exact marketing copy and safe complete-headline frames.
- `review/assembled-graphics/`: HyperFrames runtime snapshots at the user's reported timestamps, including all three setup cards and S19's corrected endpoint.
- `graphics-check.json`: HyperFrames composition check.
- `graphics-export-verification.json`: final encoded video metadata and decode test.

Build: `python3 build.py`. Export: `npx hyperframes render --quality delivery --fps 30 --workers 2 --output renders/exbabel-story-graphics-final.mp4`.
