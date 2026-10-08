/* Render composition: no clock, events, media playback or network. */
'use strict';
const story = JSON.parse(document.getElementById('story-data').textContent);
const timeline = anime.createTimeline({autoplay: false});
for (const s of story.scenes) {
  timeline.add('#'+s.id+'-headline', {y:[30,0],opacity:[0,1],duration:520,ease:'outCubic'},s.startMs+80);
  timeline.add('#'+s.id+'-hero', {y:[60,0],scale:[.96,1],opacity:[0,1],duration:620,ease:'outCubic'},s.startMs+240);
  timeline.add('#'+s.id+'-detail', {y:[20,0],opacity:[0,1],duration:400,ease:'outCubic'},s.startMs+500);
  if (s.transition !== 'HOLD') {
    timeline.add('#'+s.id+'-visual',{opacity:[1,0],duration:220,ease:'inCubic'},s.endMs-220);
  }
}
// HyperFrames 0.8.62 static guard still expects the legacy registry to exist.
// Animation remains exclusively in the native anime.js adapter.
window.__timelines = window.__timelines || {};
window.__hfAnime=window.__hfAnime||[];
window.__hfAnime.push(timeline);
window.storyboardTimeline=timeline;
window.storyboardData=story;

