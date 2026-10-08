# JSON, anime.js and HyperFrames boundary

This integration was derived from the project's installed hyperframes-animation/adapters/animejs.md and hyperframes-core contracts. Check those against the target project's installed version before producing a final render.

JSON is authoring data. A build step emits static clip markup with all root and scene timing attributes in seconds. All IDs and DOM targets must exist before anime.js constructs the timeline. The composition contains no remote fetch and no playback scheduler.

```js
const tl = anime.createTimeline({autoplay: false});
for (const scene of storyboard.scenes) {
  tl.add('#' + scene.id + '-visual', {
    y: [60, 0], opacity: [0, 1],
    duration: 600, ease: 'outCubic'
  }, scene.startMs);
}
window.__hfAnime = window.__hfAnime || [];
window.__hfAnime.push(tl);
```

Do not also register each child animation if already controlled by the registered timeline. Avoid two clocks or double seeking. HyperFrames seeks registered instances in milliseconds. Keep an external storyboard player's .seek(ms, true) controls outside composition.html.

A render composition's root uses width/height 100%, with 1920 and 1080 declared in data-width and data-height. The host may size a plain-browser iframe to 1920×1080 and scale that iframe to its preview panel. That scaling belongs to the viewer, not to the render composition.

Finite active range: scene.startMs <= t < scene.endMs. Final proof: durationMs - 1000/fps. Exact-end screenshots may be intentionally blank in a renderer; never rely on exact-end visibility for your final deliverable.

For fully specified production, implement each storyboard beat, shared-object transition and asset treatment; a generic entrance/hold/exit animator is only a schematic review tool. Call that distinction out in the UI and final handoff.

Validation sequence:
1. Parse schema; verify scene coverage, beat bounds and asset IDs.
2. Build HTML, inspect JavaScript syntax and browser errors.
3. Seek first frame, every readable midpoint, each transition boundary, and final-minus-frame.
4. Reverse seek those same times; compare properties/pixels.
5. Run installed HyperFrames lint/check/keyframe tools on the final project.
6. Inspect representative rendered snapshots and a moving draft before labeling production complete.

Authoritative anime.js references:
- https://animejs.com/documentation/timeline/
- https://animejs.com/documentation/timeline/timeline-methods/seek/


## Verified compatibility note

HyperFrames 0.8.62 ships the native anime.js adapter, but its static guard still checks for the legacy registry initializer. Initialize window.__timelines = window.__timelines || {} alongside the native window.__hfAnime registration. Do not put the anime timeline in both registries or register a fake GSAP timeline. The supplied index.html passed the browser/runtime check and produced inspected snapshots using the native anime.js adapter.

This package uses index.html as its only root composition. The review player embeds it. Avoid a second root composition.html in the same directory: the checker flags duplicate entry points.
