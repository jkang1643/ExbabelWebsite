# Exbabel HTML motion film

This is the production HTML/SVG composition, built in HyperFrames with anime.js 4.5.0. It contains no photographs, stock video, or generated video clips. The supplied four HTML interfaces are imported as local inline SVG, with export defects repaired in derived copies only.

## Open and render

Preview: http://localhost:3018/#project/exbabel-film

From this folder in WSL Ubuntu:

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm run preview
npm run render
```

HyperFrames 0.8.65 is pinned for this production project; the earlier storyboard package is preserved.

## Files

- `index.html`: self-contained composition markup, inlined CSS, data and animation code; local fonts and anime bundle are in assets.
- `production.json`: emitted scene data and explicit camera cues.
- `camera-cues.json`: editable target coordinates, focal coordinates, focus scale, holds and resets.
- `film.js`: seekable anime.js motion, targeted cameras and scene choreography.
- `film.css`: composition design, product framing and typography.
- `scripts/build.py`: imports original SVG resources and regenerates the composition, JSON and captions.
- `captions.srt`: 44 caption phrases aligned to recognized narration word timestamps.
- `narration-timing.json`: actual scene windows, word timing and alignment differences.
- `verification.json`: camera geometry and backward-seek verification.
- `check.json`: HyperFrames runtime, layout, contrast and motion checks.
- `snapshots/`: frame proofs. The earlier snapshot review is a visual-design checkpoint, not a final render receipt.
- `renders/exbabel-full.mp4`: final narrated delivery (123.8 seconds, 1920x1080, 30fps).
- `renders/exbabel-visual-master.mp4`: earlier silent storyboard-timing proof (151 seconds).

Edit scene copy/timing in the original storyboard JSON or extend the production builder, then rebuild. Camera cues are production-specific and override the earlier storyboard's proposed camera treatment. The build copies no photographic media. Keep edits in this film folder; source HTML assets remain untouched.

## Audio status

Generated through the connected ElevenLabs MCP using Roger (CwhRBWXzGAHq8TQ4Fs17), eleven_multilingual_v2. Four takes are preserved in assets/voice-takes; take 1 is used. Flow: https://elevenlabs.io/app/flows/QyX8BeXmZrC2HhaihAyv . The narration is paced at 90% of generated speed with pitch preserved, normalized toward -16 LUFS with a -1.5dB true-peak ceiling, and starts at 0.3 seconds. No music bed was added.

The reusable version substitutes “Hey there” and “your church” for unfilled placeholders. The original personalized script remains separately preserved. Local Whisper word recognition aligns the supplied copy without replacing its spelling. Alignment differences are tokenization/homophone differences, recorded in narration-timing.json. Timings are machine-aligned estimates, not human-certified transcription. The editable HTML mounts the same narration.wav used in the export.

## Visual production decisions

S02 and S11 are kinetic typography, replacing the preproduction plan's optional human footage. Every other scene uses deterministic product SVG or HTML graphics. S04/S05/S08/S09/S14/S15/S17 use semantic camera targets. Authored pushes last 620ms with outQuint easing and pull-backs 380ms with inOutCubic easing, scaled per scene to match narration. No continuous camera drift. All camera states are one keyframe chain per camera to preserve reverse-seek determinism.

Product session code and QR artwork are the illustrative content supplied with the HTML assets, not an active service link. The 30-day trial wording comes from the supplied script. Spanish captions are illustrative product content, not a translation benchmark.
