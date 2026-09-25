# Exbabel full revision

The finished composition is `index.html`. The final export is `renders/exbabel-full-revision-final.mp4`; the earlier `exbabel-full-revision.mp4` is an intermediate review export.

Open the editable timeline at http://localhost:3019/#project/exbabel-motion-v2 and press Play.

```bash
cd /home/jkang1643/projects/exbabel/video-production/exbabel-motion-v2
npx hyperframes preview --background --port 3019 --no-open
```

## Editing and rebuilding

- `copy-revisions.json` contains the approved marketing copy.
- `motion.js` controls the single paused GSAP timeline and measured cursor-follow camera.
- `motion.css` scopes the rebuilt presentation to the editable scenes.
- `production.json` preserves all original scene timings and narration, with updated marketing-copy metadata.
- `REVISION.md` and `motion-plan.json` document the time-coded scene states and object handoffs.
- S01 (including the existing S02 narrative beat) and S19 are protected from both motion and copy edits.

```bash
python3 build.py
node audit.cjs
node verify-revision.cjs
npx hyperframes check
npx hyperframes render --quality delivery --fps 30 --workers 2 --output renders/exbabel-full-revision-final.mp4
```

`build.py` applies the approved copy by default. `--motion-only` is only for reproducing the earlier motion-only review pass. The builder checks the protected source hashes before copying S01/S19, and refuses to replace an unexpectedly changed protected source.

Existing ElevenLabs narration is reused unchanged. No stock footage, generated live-action footage, or new music was added. Final duration: 123.8 seconds, 1920×1080, 30 fps.

Quality evidence: `motion-audit.json`, `copy-and-framing-audit.json`, `boundary-audit.json`, `check-final.json`, `check-handoffs.json`, and the frame sheets under `review/`.
