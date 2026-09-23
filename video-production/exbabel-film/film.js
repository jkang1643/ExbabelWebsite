'use strict';
const edit=JSON.parse(document.getElementById('production-data').textContent);
// Keep the authored motion grammar while mapping each scene to its spoken beat.
const film={...edit,scenes:edit.scenes.map(s=>({...s,startMs:s.originalStartMs??s.startMs,endMs:s.originalEndMs??s.endMs,durationMs:s.originalDurationMs??s.durationMs}))};
const tl=anime.createTimeline({autoplay:false,defaults:{ease:'outCubic'}});
const moves=[];
function mapped(time){
  const i=film.scenes.findIndex(s=>time>=s.startMs&&time<s.endMs);
  if(i<0)return {time,ratio:1};
  const a=film.scenes[i],b=edit.scenes[i],ratio=b.durationMs/a.durationMs;
  return {time:b.startMs+(time-a.startMs)*ratio,ratio};
}
function add(target,props,time){
  if(typeof target==='string'&&!document.querySelector(target))return;
  const m=mapped(time),p={...props};
  if(p.duration)p.duration*=m.ratio;
  if(p.keyframes)p.keyframes=p.keyframes.map(k=>({...k,duration:k.duration*m.ratio}));
  tl.add(target,p,m.time);
}
// Camera transform order is translate(x,y) scale(s), origin 0,0.
// Authored SVG coordinates map to screen via focal = translation + scale * target.
function focus(sid,at,target,focal,scale,hold=1300,pull=true){
  const start=film.scenes.find(s=>s.id===sid).startMs;
  const x=focal[0]-scale*target[0],y=focal[1]-scale*target[1];
  moves.push({scene:sid,startMs:start+at,durationMs:620,target,focal,scale,x,y,holdMs:hold,pull});
}
for(const s of film.scenes){
  const q='#'+s.id,st=s.startMs,en=s.endMs;
  const title=document.querySelector(q+' h1');
  if(title)add(q+' h1',{y:[35,0],opacity:[0,1],duration:650,ease:'outQuint'},st+80);
  add(q+' .copy p',{y:[18,0],opacity:[0,1],duration:500},st+430);
  add(q+' .center-copy p',{y:[18,0],opacity:[0,1],duration:500},st+600);
  add(q+' .photo',{x:[70,0],opacity:[0,1],duration:750,ease:'outQuart'},st+220);
  add(q+' .dashboard-stage',{y:[65,0],opacity:[0,1],duration:650},st+150);
  const products=[...document.querySelectorAll(q+' .product')];
  products.forEach((el,i)=>add(el,{y:[55+i*10,0],opacity:[0,1],duration:600,ease:'outQuart'},st+150+i*90));
  const beats=[...document.querySelectorAll(q+' .beat')];
  beats.forEach((el,i)=>add(el,{y:[28,0],opacity:[0,1],duration:450},st+700+i*Math.min(750,(s.durationMs-1600)/Math.max(1,beats.length))));
  add(q+' .focus-tag',{opacity:[0,1],y:[12,0],duration:400},st+600);
  add(q+' .call-card',{x:[70,0],opacity:[0,1],duration:650},st+150);
  if(s.id!=='S22'){
    const direction=['S03','S12','S18'].includes(s.id)?-75:-18;
    add(q+' .visual',{y:[0,direction],opacity:[1,0],duration:260,ease:'inCubic'},en-260);
  }
  [...document.querySelectorAll(q+' .audio-wave i')].forEach((el,i)=>{
    for(let at=st+900;at<en-800;at+=1100){
      add(el,{scaleY:[1,.25+(i%4)*.12],duration:450,ease:'inOutSine'},at+i*12);
      add(el,{scaleY:[.25+(i%4)*.12,1],duration:450,ease:'inOutSine'},at+450+i*12);
    }
  });
}
// The first title resolves in two semantic beats rather than a single fade.
add('#S01 .accent',{opacity:[0,1],duration:500},1700);
['f0','f1','f2'].forEach((c,i)=>add('#S03 .'+c,{x:[55,0],opacity:[0,1],duration:550},14800+i*2100));
add('#S03 .f0',{opacity:[1,.25],duration:500},18600);
add('#S03 .f1',{opacity:[1,.35],duration:500},20700);
// Host screen QR: viewBox 720x460 shown at 880px, in a 1760x645 viewport.
for(const c of film.cameraCues)focus(c.scene,c.atMs,c.target,c.focal,c.scale,c.holdMs,c.pullBack);
add('#S04 svg.notranslate > text:nth-of-type(2)',{opacity:[1,0],duration:180},26600);
add('#S04 svg.notranslate > text:nth-of-type(2)',{opacity:[0,1],duration:180},29100);
// Join panel language field. The camera moves toward the lower field while copy stays anchored.
add('#S05 .pointer',{x:[110,0],y:[90,0],opacity:[0,1],duration:550},31800);
add('#S05 .ring',{scale:[.15,1.25],opacity:[.85,0],duration:500},32500);
document.querySelectorAll('#S09 .caption-line').forEach((el,i)=>add(el,{opacity:[0,1],duration:220},52400+i*650));
// Three intentional focus states within the same host interface.
// One keyframe chain per camera prevents future pull-back tweens from
// overwriting an earlier focus pose when a render worker seeks backwards.
for(const sid of [...new Set(moves.map(m=>m.scene))]){
  const scene=film.scenes.find(s=>s.id===sid);
  const keyframes=[];let at=scene.startMs;let pose={x:0,y:0,scale:1};
  for(const m of moves.filter(m=>m.scene===sid)){
    if(m.startMs>at)keyframes.push({...pose,duration:m.startMs-at,ease:'linear'});
    pose={x:m.x,y:m.y,scale:m.scale};
    keyframes.push({...pose,duration:620,ease:'outQuint'});
    keyframes.push({...pose,duration:m.holdMs,ease:'linear'});
    at=m.startMs+620+m.holdMs;
    if(m.pull){pose={x:0,y:0,scale:1};keyframes.push({...pose,duration:380,ease:'inOutCubic'});at+=380;}
  }
  if(at<scene.endMs)keyframes.push({...pose,duration:scene.endMs-at,ease:'linear'});
  add('#'+sid+' .camera',{keyframes},scene.startMs);
}
add('#S22 .final-word',{y:[35,0],opacity:[0,1],duration:650,ease:'outQuint'},144700);
add('#S22 .url',{opacity:[0,1],duration:500},147300);
tl.add('.progress',{scaleX:[0,1],duration:film.durationMs,ease:'linear'},0);
window.__timelines=window.__timelines||{};
window.__hfAnime=window.__hfAnime||[];
window.__hfAnime.push(tl);
window.filmTimeline=tl;
window.cameraMoves=moves.map(m=>({...m,startMs:mapped(m.startMs).time,durationMs:m.durationMs*mapped(m.startMs).ratio,holdMs:m.holdMs*mapped(m.startMs).ratio}));
