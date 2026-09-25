# Exbabel personalized demo engine: source audit and plan

Baseline commit: `97264b5`. This is the source checkpoint before personalization.

## Current composition

- `build.py` produces `index.html` from the earlier `exbabel-film` scene markup, current `copy-revisions.json`, `motion.css`, `scene-graphics.css`, `scene-graphics.js`, and `motion.js`.
- The root HyperFrames composition is `exbabel-motion-v2`: 1920 × 1080, 30 fps, 123.8 seconds. Its one paused GSAP master timeline seeks 19 editable scene surfaces. `production.json` gives all 22 scene boundaries, with S01/S02 represented by one opening subcomposition.
- S01 (0–10.988 seconds) and S19 (98.622–104.2 seconds) are HyperFrames subcompositions with their own paused GSAP timelines. S01's typing text and final church-name mark are both hard-coded to First Pentecostal Church. Its camera endpoint measures text width dynamically; the rest of its choreography is reusable.
- `scene-graphics.js` builds the language selector, sermon translation, family, livestream, remote viewer, setup, phone join, and trial artwork. None of those elements needs prospect-level copy in V1.
- The canonical narration is `assets/narration.wav`, mono 48 kHz, 123.740 seconds. `narration-timing.json` records word timing. It starts “Hey there” and later says “at your church” at about 4.700–5.811 seconds. S02 narration begins near 6.678 seconds. No voice personalization slot exists yet.
- The existing source, timeline, camera curves, scenes, and product demonstrations can be served once for many prospects. The HyperFrames `hyperframes-player` web component was tested against the current `index.html`; it resolved S01 and S19, registered all three timelines, and detected the 123.8-second composition.

## Existing application boundary

The root Next.js app is a statically exported marketing site. It has no server API routes, Supabase client/schema, Salesforce integration, or demo persistence. An on-demand `/d/:token` route cannot be implemented there without changing the deployment model. A separate server for `demo.exbabel.com` keeps this new system isolated. The marketing site's existing static deployment can remain unchanged.

## V1 configurable fields

Visual: S01 typed greeting and resting church name; an optional small location label only if it fits the existing composition; existing static scene headlines and product UI stay fixed. CTA URL and label may vary at the web-page level without changing the animation. First name, city/state, size, phone, website, email, and Salesforce ID belong in validated prospect metadata, not automatically on every frame.

Audio: replace a fixed interval near 4.7–6.678 seconds with a generated church-name phrase such as “at First Pentecostal Church.” Preserve every sample outside that interval and leave the remaining HyperFrames scene timing intact. The interval is short, so names that cannot fit naturally must be marked `voice_review_required`; never stretch the whole narration. A pronunciation override affects only audio, not displayed spelling.

## Implementation order

1. Define Zod prospect/default/override schemas and safe public-config projection.
2. Refactor only S01's hard-coded display strings to read the validated browser config; keep its GSAP timings, ease, camera path and scene boundaries.
3. Add CSV normalization, row validation and random URL-token generation. Keep import idempotent by Salesforce ID or normalized email/church key.
4. Add a cached ElevenLabs segment service and FFmpeg splice with fixed sample count, loudness matching, silence handling and pronunciation overrides.
5. Serve one canonical HyperFrames source through a tokenized `hyperframes-player` page. Inject a public-only config into the composition response before the timeline initializes. Serve its matching personalized audio at the same token scope.
6. Add SQLite persistence for this isolated service, a small authenticated import/status page, and sparse engagement events.
7. Add Salesforce OAuth update methods behind explicit server configuration. Send only the URL and meaningful viewing state; provide deployment field and campaign setup instructions.
8. Optional MP4 export reads the same config and composition. It remains opt-in, cached and never becomes the webpage's visual source.

## Synchronization and verification gates

- Run default and two long-name S01 snapshots at 0/25/50/75/100%, comparing motion values and ensuring the name stays legible.
- Verify each audio output has exactly 123.8 seconds of samples at the target rate. Compare before/after source samples to the master outside the reserved region.
- Seek the same `hyperframes-player` experience backward and forward on desktop and mobile viewports; verify the MP4 path uses the same composition.
- Import sample rows, open both distinct URLs, check public responses omit Salesforce IDs and email, disable one URL, and verify its page stops loading.
