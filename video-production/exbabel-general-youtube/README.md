# General-purpose Exbabel video (one-off)

This is an isolated copy of the HyperFrames film for a general YouTube-style export. The personalized composition in `../exbabel-motion-v2` remains the source for prospect demos and was not edited.

- `compositions/s01-general.html` replaces the opening 10.988-second visual with a general greeting, service-to-language graphic, and family-to-phone handoff.
- `assets/opening.mp3` is the general opening narration generated with the film's Roger ElevenLabs voice.
- `build-general-audio.py` places that opening at 0.300s and preserves the original narration from 6.244s onward.
- `renders/exbabel-general-youtube.mp4` is the 1920 × 1080, 30 fps, 123.8-second one-off export.

The `node_modules` symlink reuses the original project's installed dependencies. It does not share composition files or narration assets.

Preview: `npx hyperframes preview --background --port 3027 --no-open`
Render again: `npx hyperframes render --quality delivery --fps 30 --workers 2 --output renders/exbabel-general-youtube.mp4`
