# Reference analysis — Muse screen recording

## Evidence and limits

Source: ScreenRecording_09-22-2026 14-32-39_1.mp4, supplied locally and through [Google Drive](https://drive.google.com/file/d/1YHN2Xj0jGOQY53er9UBdZR5uxrNVhZv9/view). Drive metadata returned the same filename and 50,652,839-byte size as the local source. A content hash comparison was not available; analysis uses the local source.

FFprobe: container 38.136259s; video 38.038333s; stereo AAC 44.1kHz begins at 0.097483s; HEVC video, 1676 frames. Stored dimensions 1290×2796, rotation metadata +90 degrees; displayed frame is 2796×1290. Do not treat stored portrait dimensions as the creative canvas. The actual picture is approximately 16:9 within the landscape recording. The analysis crop 2280×1290 at x258/y0 is approximate and slightly trims the picture edges. Final production uses a new 1920×1080 canvas, not an upscale of this recording. Average frame rate is about 44.05fps; this is a variable-rate screen capture, not evidence of the source animation's delivery rate.

Review method: whole recording sampled first at 1fps, then all of it at 2fps, plus 8fps temporal strips at 15–16.5, 20–21.5, 28–29.5 and 30–31.5 seconds. This is a temporal frame review, not a claim of uninterrupted real-time playback. Half-second shot boundaries below have roughly ±250ms uncertainty; the selected strips reduce local uncertainty to roughly ±125ms. Easing and renderer are visual estimates, not recovered project metadata.

Reference evidence is in ../reference-study/: contact-sheet.jpg, pass-1.jpg, pass-2.jpg, motion-15.jpg, motion-20.jpg, motion-28.jpg, motion-30.jpg, source-metadata.json, audio-measurements.txt and reference-audio.mp3.

The video starts with player controls, shows additional controls at about 36.3s, and switches to iPhone Control Center around 37.4s. Those are capture artifacts. The final product sequence continues when the recording stops; a real ending or CTA was not captured. Do not invent an original CTA, final logo lockup, or completion of the training-plan sequence.

The audio track was extracted and measured but not reliably auditioned or transcribed. Voice presence, actual music genre/BPM, speech WPM, beat synchronization and specific original SFX are **unverified**. Do not promote proposed audio design into a reference finding.

## VIDEO DNA

This is an airy, interface-led product film whose continuity comes from keeping the viewer oriented around one small, recurring agent symbol. A pale, almost white field allows individual words, rounded chat bubbles and useful interface details to dominate. The world feels tactile without requiring a dramatic 3D camera: soft gray contact shadows, occasional blue panels, rounded corners and a small dimensional character create most of the separation.

The opening moves from an isolated app mark to a field of small objects, then compresses that visual abundance into a short typographic promise. Centered, medium-to-heavy sans-serif words build in successive semantic units rather than appearing as a paragraph. Small object illustrations sit inside the sentence. The type sometimes reflows around these objects, making language itself part of the choreography. The background develops a restrained cool-blue wash toward the lower edge.

The middle trades slogans for a causal interface story. A user message appears, a response follows, an input surface accepts a request, and a simplified inbox supplies the material for a task. Instead of showing every browser control, the film pulls a relevant row out of a list and turns it into a larger reading surface. Context is allowed to fade or leave the frame. An agent badge remains available as an orientation cue while messages, shopping items and an approval panel change beneath it.

The most forceful scale change happens when the viewer needs to notice a decision. The approval area becomes oversized, with some surrounding interface intentionally cropped. After that concentrated action, the film clears the frame to a concise completion word and a check mark. The typography briefly tilts or settles before reaching its clean hold. A fixed sentence then cycles through different capabilities; this produces speed without rebuilding the entire composition each time.

Motion is mostly planar: vertical travel, scale reframing, opacity, line reveals and selected-card expansion. The sampled evidence does not justify a rule that interfaces must be tilted or that every shot needs lens blur, parallax or bounce. Eases appear decisively eased at entry and restrained at rest; exact curves remain estimates. Multiple content states occur inside a continuous white environment, so a conventional cut count would misrepresent the pacing.

There is no human presenter in the inspected recording. The small character badge is a product-state indicator, not a talking-head overlay. The transferable identity is therefore the sequence of focused ideas: phrase, interaction, evidence, decision, payoff. Audio is present in the file, but its creative characteristics remain unverified in this analysis.

## Macro timeline

| Recording time | Function | Visual behavior |
|---|---|---|
| 0–1.4s | Capture lead-in | Player controls cover the app mark; exclude |
| 1.4–3.25s | Visual hook | Mark → object constellation → receding field |
| 3.25–10.8s | Product positioning | Introducing → brand → personal-agent phrase → new-kind statement |
| 10.8–15.4s | Conversational setup | Character anchor, prompt bubble, response close-up |
| 15.4–18.3s | Task request | Circle becomes input pill; text populates; pill reframes |
| 18.3–21.8s | Evidence selection | Inbox stream; selected row lifts and becomes email detail |
| 21.8–26.3s | Agent work | Badge, explanation, list, and status changes |
| 26.3–30.25s | Decision | Order card; approval controls enlarged |
| 30.25–31.8s | Local payoff | Completion word and blue check |
| 31.8–35.5s | Capability montage | Same sentence skeleton, changing verbs/icons |
| 35.5–37.4s | Next example, incomplete | Training dashboard; player overlay returns |
| 37.4–38.136s | Capture tail | Control Center; exclude |

Genre: motion-led commercial / reconstructed product demonstration. Apparent audience: consumers evaluating a personal AI assistant. Emotional tone: capable, approachable, light and efficient. Production value: consistent high-finish typography and compositing; original software cannot be inferred. Intended distribution is likely landscape web/product marketing; the phone recording is not proof of the original platform.

The hook uses scale contrast and visual abundance. The local climax is the approval-detail push followed by completion. This is not necessarily the climax of the complete original film.

## Meaningful shot and state ledger

All positions below refer to the cropped creative picture, origin top-left. x/y describe center; w/h describe approximate extent. Typography, shadows and camera are shared as described after the table. H=Higgsfield, HF=deterministic HTML/SVG, LIVE=recorded source, COMP=compositing, EDIT=assembly. Method labels indicate suitable recreation, not proven original tools.

| ID | Start–end s | Dur. | State, composition and hierarchy | Motion / camera inference | Route |
|---|---:|---:|---|---|---|
| R01 | 1.40–1.90 | .50 | App mark x50 y50 w10 h18, empty pale field | Near-static mark; controls have cleared | HF |
| R02 | 1.90–2.50 | .60 | Objects enter field around central mark; objects w3–8 | Digital pull-out / arranged object spread | HF + optional pre-rendered icons |
| R03 | 2.50–3.25 | .75 | Dense icon field, center mark w3–5 | Field scales/reframes before type replacement | HF |
| R04 | 3.25–4.75 | 1.50 | Introduction and blue brand name x50 y50 w42 h28 | Lines assemble with opacity/vertical settle | HF |
| R05 | 4.75–5.50 | .75 | Brand word isolates at center | Remove surrounding line; semantic replacement | HF |
| R06 | 5.50–6.75 | 1.25 | Brand, character and linking word share one line | Reflow leaves character-sized gap | HF |
| R07 | 6.75–7.75 | 1.00 | Three-line product description x50 y52 w52 h44 | New lines populate; hold for comprehension | HF |
| R08 | 7.75–9.25 | 1.50 | Calendar/book-like props embedded in sentence | Props insert; words rearrange and depart | HF |
| R09 | 9.25–10.80 | 1.55 | Two-line positioning phrase centered | Phrase replacement with clean background continuity | HF |
| R10 | 10.80–13.40 | 2.60 | Character x50 y23; bubble x61 y55 w34 h12 | Badge rises; user bubble appears; typing dots below | HF |
| R11 | 13.40–15.40 | 2.00 | Chat fills most width, deliberately cropped edges | Digital push and horizontal reframe; response reveals | HF |
| R12 | 15.40–16.10 | .70 | Small circle x30 y55 becomes long input pill | Prior chat travels upward; circle/pill expansion | HF |
| R13 | 16.10–18.30 | 2.20 | White input pill x50 y51 w66–90 h13 | Typed text, then scale-out to complete request | HF |
| R14 | 18.30–20.30 | 2.00 | Inbox x50 y58 w65 h85; rows readable selectively | Vertical list flow; overall front-on surface | HF |
| R15 | 20.30–21.80 | 1.50 | Selected blue row becomes tall email card x50 y51 w28 h85 | Siblings/background fade; same selected surface expands | HF |
| R16 | 21.80–22.40 | .60 | Agent badge x50 y20 w13 h25 | Email leaves; shared subject returns | HF |
| R17 | 22.40–23.80 | 1.40 | Badge above a short explanatory gray bubble x37 y55 | Text assembles; minimal camera movement | HF |
| R18 | 23.80–24.70 | .90 | Status pill widens, second response appears | Badge/status replacement; stacked message flow | HF |
| R19 | 24.70–25.80 | 1.10 | Shopping grid enters below, w63 h60 | Vertical card rise; surrounding hierarchy fades | HF |
| R20 | 25.80–26.30 | .50 | List moves upward; status remains near upper center | Continuous vertical handoff | HF |
| R21 | 26.30–28.35 | 2.05 | Order approval card x50 y60 w55 h86 | Card rises; details progressively populate | HF |
| R22 | 28.35–30.25 | 1.90 | Approval buttons/total enlarged, w80+ | Digital push to lower detail then pull back | HF |
| R23 | 30.25–31.80 | 1.55 | Agent at y27; completion word/check at y60 | Prior card goes up; type settles; check draws | HF |
| R24 | 31.80–33.20 | 1.40 | Three-line capability sentence x50 y53 w48 h45 | First function appears between fixed lines | HF |
| R25 | 33.20–33.80 | .60 | Same sentence, calendar-related function | Middle row replacement only | HF |
| R26 | 33.80–34.70 | .90 | Same sentence, reply-related function | Middle row/icon replacement | HF |
| R27 | 34.70–35.50 | .80 | Same sentence, always-working function | Final middle-row substitution | HF |
| R28 | 35.50–36.30 | .80 | Agent left x25 y55; training dashboard right x72 y53 | Split composition enters for another task | HF |
| R29 | 36.30–37.40 | 1.10 | Same dashboard obscured by player controls | Capture interruption; do not copy overlay | HF + exclude capture overlay |

## Composition, camera, motion and type

Primary hierarchy: central phrase or active UI detail; secondary hierarchy: small agent/status badge; tertiary hierarchy: contextual rows, product thumbnails, faint panel boundaries. Most frames contain one dominant reading task. The illustration field is an intentional exception.

Reference canvas percentage estimates: display lettering about 8–12% picture height per line; UI detail type about 2–5%, sometimes enlarged by a digital push. Font is a clean neo-grotesque/geometric sans, regular UI and medium/bold headline. Family cannot be identified reliably from the compressed recording; do not label it a verified font. Display tracking appears tight to neutral; line height approximately 1.10–1.25. Labels sit in small white rounded plates. Most hero type is black, with blue reserved for emphasis/action. Intro phrases often contain 2–8 words; demonstration panels have more incidental text, but the edit signals which detail matters.

No apparent physical lens or camera is evidenced. Assigning 24/35/85mm to these UI frames would invent cinematography. Pushes are digital composition scaling. Predominantly front-on geometry; some icon assets look pre-rendered/3D, but the entire film does not need a 3D scene. There is no visible persistent cursor. Explicit state changes carry interactions.

Observed motions: position, scale, opacity, clipping/reveal, selected-card expansion, short text rotation/settle, ordered rows, status-pill width change and vertical flow. Estimated production ease family: outCubic/outExpo for entrances, inOutCubic for reframes, restrained overshoot only for the completion-type settle. A faithful adaptation should not apply an elastic spring everywhere. Motion blur cannot be established separately from compression or interpolation in this capture; keep it optional rather than a reference requirement.

Palette estimates, not calibrated samples: background #F8F9FC–#FFFFFF; text #111318; blue action #0865C7; pale blue #CBE6FA; neutral message gray #E8E9EB. Exbabel replacements come from its code: #394DFE, #0B1220, #D6F5FF, #EAD6FF and Sora. Lighting is a composited high-key field with a soft lower blue gradient, not a real set. Diffuse shadows suggest floating surfaces about one small elevation above the background. No reliable film grain, chromatic aberration, dramatic bloom, atmosphere, lens flares or deep glass treatment is observed.

UI is most plausibly reconstructed or separately animated, based on continuous card reshaping, deliberate removal of chrome and selective reflow. This is an inference, not proof of the original toolchain. Recreate it with HTML/SVG/HyperFrames. Generating text-heavy screens with a video model would work against the reference's strongest feature: legibility.

## Transition catalog and editing rhythm

1. Mark-to-constellation pull-out: roughly 600–900ms; same central anchor, expanding object field.
2. Semantic line replacement: roughly 250–500ms; masked y travel and fade, stable text alignment.
3. Bubble close-up: roughly 400–650ms; scale and lateral reframe, intentional edge crop.
4. Stream-to-input pill: roughly 500–700ms; old chat travels up, circular affordance expands horizontally.
5. Selected-row expansion: roughly 500–750ms; selected blue surface maintains identity while surrounding rows fade and body grows.
6. Vertical panel handoff: roughly 400–700ms; new content rises from below the work badge.
7. Decision detail push: roughly 350–550ms; camera centers action region, then resolves sharply.
8. Completion reset: roughly 450–700ms; large panel leaves upward, short centered statement and check settle.
9. Capability row cycling: roughly 250–400ms per replacement; fixed top/bottom sentence.

These are estimated transition ranges. Use the authored transition library in storyboard.json for reproducible Exbabel values; don't claim those exact values were measured from source animation curves.

Using R01–R28 as meaningful states (not hard cuts): 28 states in 34.9s; mean about 1.25s, median about 1.18s, shortest .50s, longest 2.60s. There are eight state boundaries between the usable opening and t=10s. The table contains semantic state changes and continuous UI transitions, so **physical hard-cut count is not established**. The fast capability section makes about 1–2 meaningful changes/sec; isolated letter changes would inflate that number. Audio/beat alignment is unknown. Visual causality is evident: request → evidence → action → permission → completion → broader promise.

## Audio evidence and proposed treatment

Measured using FFmpeg volumedetect: mean -18.1 dBFS and sample peak -3.0 dBFS. These are not integrated LUFS or true-peak measurements. A non-silent stereo soundtrack exists; no reliable listening claims are made.

For the Exbabel adaptation, propose warm conversational narration, restrained instrumental bed around 88–104 BPM, quiet tactile ticks at state changes and a short soft uplift at completion. Those are creative recommendations, not recovered reference audio. Let narration control edit timing; don't force the 145-WPM script onto a guessed reference beat grid.

## Exbabel carousel findings

Grounded in local source components/FeatureShowcase.tsx: desktop presentation has a text column and a 4:3 media stage, 24px corners, soft shadow and accent-color glow. Four entries use videos; the fifth, SecurityAnimation, is HTML/SVG with Framer Motion and interval-based counter updates. Mobile uses stacked feature cards. Source assets include LiveCaptionsGraphic.tsx, UnlimitedLanguagesGraphic.tsx and svg/HeroFlowSvg.tsx. Brand font Sora is configured in app/layout.tsx.

This is source inspection, not a claim that the deployed carousel was visually exercised. The live page's text was separately retrieved from https://www.exbabel.com/. Multiple language totals and timing claims differ across site sections. The supplied script intentionally avoids exact counts; preserve that. The security demo's percentages should not be carried into this story.

When reusing artwork, keep SVG geometry and brand tokens. Replace timers, Math.random, scroll triggers, and infinite CSS/Framer loops with finite, paused, explicitly registered anime.js timelines for render mode. Keep the live site's interaction controller outside the render composition.

## Creative fingerprint to preserve

1. One reading task dominates each frame.
2. Maintain a small brand/status anchor through complex sequences.
3. Let a sentence form over semantic units.
4. Reuse alignment while swapping key words.
5. Front-on UI is the default.
6. Scale the selected detail rather than every element.
7. Preserve the selected card's identity through expansion.
8. Clear irrelevant context when the task becomes specific.
9. Use vertical motion to imply the continuation of work.
10. Soft shadow and restrained blue provide most depth.
11. Hold useful information after movement resolves.
12. Reserve the largest push for an action worth noticing.
13. Follow concentrated UI with a short, clean payoff.
14. Animate real text deterministically.
15. Keep the ending understandable without sound.
16. Use character-like assets only when they belong to the new brand.
17. Keep transition speed distinct from narration duration.
18. Separate capture controls from authored content.

## Things not to copy

| Reference-specific element | Transferable principle |
|---|---|
| Muse name and blue handwritten app mark | Small persistent brand anchor; use official Exbabel artwork |
| Beige proprietary agent character | Friendly state indicator; use Exbabel mark/status chip |
| Exact introduction and capability copy | Short semantic phrases from the user's own script |
| School emails, people names, shopping data and amounts | Believable task evidence; create appropriate church-session examples |
| Distinct icon sculptures | Small illustrative objects that explain the current word |
| Purchase approval UI | One clear action state; use language selection/listening |
| Original music or sound recordings | Original/licensed cues with comparable restraint |
| Phone controls, status bar, Control Center | No transferable design principle; exclude recording artifacts |

