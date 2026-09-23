---
workflow: general-video
flow: automation
storyboard: no
---

# Exbabel full product film

Produce the existing 22-scene, 151-second storyboard as a 1920x1080, 30fps video using HyperFrames and anime.js. The user explicitly requested full video generation/rendering and supplied four product HTML resources plus templates/product-focus-camera.md. The original storyboard remains intact in ../exbabel-storyboard.

Use the full supplied narration. The generic master uses “Hey there” and “your church”; the original is preserved separately. ElevenLabs Roger narrates through the connected MCP. Retiming to actual narration is permitted, with all final scene intervals saved in production.json (123.8 seconds).

## Art direction

High-key pale blue canvas, Exbabel blue #394DFE, ink #0B1220, Sora typography. Real product SVGs remain vector. Alternate composition-scale typography, full dashboard, detailed product focus, and large listener UI. No constant camera drift. Each zoom has a named target, 450-700ms push, readable static hold, and 250-500ms reset where useful.

## Assets

User supplied public/hero-assets/translate.html, translate-host-dashboard.html, translate-join-session.html, translate-mobile-listener.html. Repair malformed exported styles and JSX fragments in derived assets only. The user clarified: entirely HTML/SVG motion like the reference, no stock video or photography. S02 and S11 use kinetic typography. Narration is generated directly through the connected ElevenLabs MCP.

## Delivery

Full MP4, editable JSON, local HTML composition, source/build scripts, captions, verification report. Keep application source and preproduction package untouched. Render is explicitly authorized by the user's request.
