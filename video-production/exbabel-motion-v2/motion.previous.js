'use strict';
// The sole clock. All motion and text state are functions of this paused timeline.
const production=JSON.parse(document.getElementById('production-data').textContent);
const scenes=production.scenes;
const tl=gsap.timeline({paused:true,defaults:{ease:'power2.inOut'}});
const typed=[];
const initialStates=new Map();
const scenePlans=[];
const $=(s)=>document.querySelector(s);
const all=(s)=>Array.from(document.querySelectorAll(s));
const sceneY=i=>i*1640;
// Explicit camera destinations are authored in the unchanged scene's local coordinates.
// Three discoveries per frame, followed by a continuous camera handoff to the next.
const views=[
 [[960,340,1.25],[960,425,1.12],[960,778,1.22]],
 [[1250,350,1.28],[1250,560,1.32],[420,410,1.28]],
 [[1300,325,1.5],[1300,505,1.52],[1300,690,1.34]],
 [[960,570,1.14],[960,542,2.12],[960,675,1.75]],
 [[1340,460,1.08],[1340,660,1.68],[1340,740,1.78]],
 [[960,335,1.4],[960,485,1.16],[960,510,1.24]],
 [[320,565,1.75],[960,565,1.50],[1600,565,1.72]],
 [[1350,510,1.15],[1350,770,1.82],[1350,680,2.02]],
 [[1335,495,2.1],[1335,560,2.35],[1335,615,2.05]],
 [[960,370,1.2],[680,775,1.5],[960,470,1.32]],
 [[960,350,1.26],[960,800,1.42],[960,480,1.35]],
 [[1080,330,1.85],[1460,440,1.85],[1110,600,1.85]],
 [[960,310,1.5],[960,440,1.28],[960,500,1.4]],
 [[960,580,1.2],[1115,820,2.0],[965,590,1.48]],
 [[1290,490,1.22],[1290,615,1.85],[1290,705,1.65]],
 [[320,565,1.7],[960,565,1.6],[1590,565,1.7]],
 [[735,820,1.95],[1100,820,1.95],[960,540,2.10]],
 [[660,585,1.65],[1000,530,1.8],[1390,585,1.8]],
 [[960,320,1.48],[960,445,1.30],[960,800,1.48]],
 [[350,420,1.2],[1200,425,1.14],[1200,600,1.4]],
 [[1310,360,1.4],[1310,570,1.45],[1260,750,1.5]],
 [[960,325,1.25],[960,480,1.12],[960,635,1.22]]
];
const descriptions=[
 ['The phrase Every voice','Words resolve individually; One congregation follows','Scan / Choose / Listen become the next action','The last pill yields the Exbabel signal'],
 ['The existing welcome stack','Welcome and Bienvenidos exchange priority','Camera reads downward through the language stack','The same welcome becomes the sermon message'],
 ['The existing sermon message bubble','The full sentence types, then loses words in the second bubble','Camera follows the incomplete message to the whole-message promise','The message tile leads to the service QR'],
 ['Host session QR component','Session code types; scan line traverses the supplied QR artwork','Camera approaches the QR and then the share control','The selected code persists into Join Session'],
 ['Join Session language field','Language menu expands; Spanish is selected; button depresses','Camera travels from session code to language to Join','The button action resolves into the existing checkmark'],
 ['Existing success checkmark','Check draws and the payoff phrase resolves word by word','Camera follows the phrase downward with a small push','The success signal becomes the translation source'],
 ['Church audio node','Source text arrives, then translation, then listener acknowledgement','Lateral camera follows cause to result across the existing nodes','The destination node hands off to the listener phone'],
 ['Existing listener phone','Audio control engages; active state and translated line arrive','Camera descends into the audio region then returns to captions','The SAME phone continues into caption detail'],
 ['Existing phone caption area','Spanish sentence types, then second sentence scrolls into the reading slot','Camera tracks the caption baseline as content rises','Caption content expands into the one-service benefit'],
 ['One service phrase','Same sermon / Same congregation / Their language enter on separate semantic beats','Camera moves from title into the pills and back to Together','Together continues into the following frame'],
 ['Together phrase','Same family / Same service / Whole message respond in sequence','Camera travels through the existing words rather than holding their layout','The whole-message element leads to the language choices'],
 ['Spanish language card','Selection passes Spanish → Portuguese → French → Korean','Camera follows the chosen language card; other cards recede','Selected language is carried toward online access'],
 ['In the room phrase','Online too is revealed through a vertical word mask','Camera follows the second line into a closer crop','Online leads into the broadcast control'],
 ['Existing host broadcast surface','Broadcast button presses; status changes to live; message arrives','Camera examines the action and pulls back only as the result appears','The live session code becomes the remote join code'],
 ['Existing remote Join Session','Language menu opens and Portuguese is selected; Join responds','Camera moves from the code into the chosen language and action','The connection state carries into the existing audio setup'],
 ['Church audio setup node','Source connects; Exbabel receives; listener destination responds','Camera travels laterally along the existing routing diagram','Connected source becomes the host configuration field'],
 ['Host configuration field','English selection → Start Broadcasting press → shared QR','Camera connects the three exact control coordinates','Shared QR hands off into the congregation phones'],
 ['The existing three-screen group','First phone gets a caption; join action occurs; second phone receives another language','Camera moves across the screen group, never showing all at equal importance','A listening phone leads to try-it-during-a-service'],
 ['Try it during a service phrase','Words resolve across the narration; the congregation pill becomes prominent','Camera changes crop from the verb to the service to the congregation','The service invitation carries into the trial offer'],
 ['Existing 30 numeral','Numeral grows while days resolves; free trial follows; URL enters later','Camera leaves the number and tracks to the trial action','The Exbabel URL carries into the setup-call option'],
 ['Existing Sunday setup card','Church audio, Translation session, Listener access check off in order','Camera reads down the checklist into the call action','Last check carries the understood payoff'],
 ['One congregation phrase','Understood resolves; Exbabel.com appears only after the payoff','Slow pull-back becomes a restrained final push','Final frame resolves with 0.5s deliberate rest']
];
function tween(sel,from,to,start,duration,ease='power2.inOut'){
 const targets=typeof sel==='string'?all(sel):(Array.isArray(sel)?sel:[sel]);
 if(!targets||targets.length===0)return;
 for(const el of targets){const first=initialStates.get(el)||{};for(const [key,value] of Object.entries(from))if(!(key in first))first[key]=value;initialStates.set(el,first);}
 tl.fromTo(targets,from,{...to,duration,ease,immediateRender:false},start);
}
function reveal(sel,start,duration=.6,dist=65){
 tween(sel,{y:dist,opacity:0},{y:0,opacity:1},start,duration,'power2.out');
}
function typeText(sel,text,start,duration){
 const el=typeof sel==='string'?$(sel):sel;if(!el)return;
 typed.push({el,text,start,duration});
 el.textContent='';
}
function press(el,start){
 if(!el)return;
 tween(el,{scale:1},{scale:.965},start,.16,'power1.inOut');
 tween(el,{scale:.965},{scale:1},start+.16,.28,'power2.out');
}
function textOf(sid,needle){return all('#'+sid+' svg text').find(el=>el.textContent.includes(needle));}
function uiState(el,states){if(el)typed.push({el,states});}
function wrapWords(sel,start,span){
 const el=$(sel);if(!el)return;
 // Keep all copy, including original line breaks. Mask individual semantic words.
 let ix=0;
 for(const child of [...el.childNodes]){
  if(child.nodeType===Node.TEXT_NODE){
   const frag=document.createDocumentFragment();
   child.textContent.split(/(\s+)/).forEach(w=>{
    if(!w.trim()){frag.appendChild(document.createTextNode(w));return;}
    const word=document.createElement('span');word.className='headline-word';word.textContent=w;
    frag.appendChild(word);ix++;
   });child.replaceWith(frag);
  }
 }
 const words=all(sel+' .headline-word');
 words.forEach((el,i)=>reveal([el],start+i*span/Math.max(words.length,1),.6,45));
}
// World positions are static layout, not independently animated scene entrances.
const locked=new Set(['S01','S02','S19']);
scenes.forEach((s,i)=>{if(locked.has(s.id))return;const el=$('#'+s.id);el.style.top=sceneY(i)+'px';el.dataset.startSeconds=s.startMs/1000;});

// A SINGLE continuous camera. No scene can reset it, and no runtime visibility
// controller can flash future scenes. The entire white world exists from t=0.
const cameraKeys=[];
scenes.forEach((s,i)=>{
 if(locked.has(s.id))return;
 const st=s.startMs/1000,d=s.durationMs/1000;
 const times=[0,.40,.84];
  views[i].forEach((v,k)=>cameraKeys.push({t:st+times[k]*d,cx:v[0],cy:sceneY(i)+v[1],scale:v[2],scene:s.id}));
 const v=views[i][2];
 cameraKeys.push({t:st+d-Math.min(.55,d*.12),cx:v[0],cy:sceneY(i)+v[1]+8,scale:v[2]*1.01,scene:s.id});
 const desc=descriptions[i];
 scenePlans.push({id:s.id,title:s.title,start:st,end:s.endMs/1000,focalObject:desc[0],
  rules:['viewport-change','multi-phase-camera','discrete-text-sequence','control-target-sync'],
  catalog:['shared-axis-y',...([3,4,14,16].includes(i)?['camera-scan-gate']:[])],
  depth:{background:.25,primary:1,foreground:1.2},
  states:[{phase:'A — ARRIVAL',start:st,end:st+d*.22,action:desc[0]},
   {phase:'B — DEVELOPMENT',start:st+d*.22,end:st+d*.5,action:desc[1]},
   {phase:'C — CAMERA DEVELOPMENT',start:st+d*.5,end:st+d*.78,action:desc[2]},
   {phase:'D — HANDOFF',start:st+d*.78,end:s.endMs/1000,action:desc[3]}],camera:views[i],handoff:desc[3]});
});
cameraKeys.push({t:123.3,cx:960,cy:sceneY(21)+565,scale:1.12,scene:'S22'});
cameraKeys.push({t:123.8,cx:960,cy:sceneY(21)+565,scale:1.12,scene:'S22'});
function cameraPose(k){return {x:960-k.cx*k.scale,y:540-k.cy*k.scale,scale:k.scale};}
tl.set('#world',cameraPose(cameraKeys[0]),0);
tl.set(['#world','.white-space'],{opacity:0},0);
tl.set(['#world','.white-space'],{opacity:1},10.988);
tl.set(['#world','.white-space'],{opacity:0},98.622);
tl.set(['#world','.white-space'],{opacity:1},104.2);
cameraKeys.forEach((b,i)=>{
 if(!i)return;const a=cameraKeys[i-1];
 tween('#world',cameraPose(a),cameraPose(b),a.t,b.t-a.t,a.scene===b.scene?'none':'power2.inOut');
 // The bridge represents the same Exbabel session as the camera changes context.
 // It travels between content, rather than living at a fixed presentation header.
 const offset=(k)=>({x:k.cx+(k.scene==='S22'?0:330),y:k.cy+(k.scene==='S22'?240:-205),scale:k.scene==='S22'?.65:.72});
 tween('#bridge',offset(a),offset(b),a.t,b.t-a.t,a.scene===b.scene?'none':'power2.inOut');
});

// Motion is distributed through every retained scene, driven by its narration window.
scenes.forEach((s,i)=>{
 if(locked.has(s.id))return;
 const id=s.id,q='#'+id,st=s.startMs/1000,d=s.durationMs/1000;
 const at=f=>st+d*f;
 const content=all(q+' h1');
 content.forEach((el,j)=>wrapWords(q+' h1',at(.04),Math.min(d*.42,2.4)));
 const beats=all(q+' .pill,'+q+' .welcome-word,'+q+' .language,'+q+' .row');
 beats.forEach((el,j)=>reveal([el],at(.12+.57*j/Math.max(beats.length-1,1)),Math.min(.7,d*.19),48));
 const accent=$(q+' h1 .accent');if(accent)reveal([accent],at(.32),Math.min(.8,d*.25),60);
 // Meaningful late-stage reframe: the primary surface remains in the world while
 // the camera moves to its next useful region, not a completed-layout hold.
 if([3,13,16].includes(i)){
  const code=textOf(id,'2UU6SV');typeText(code,'2UU6SV',at(.1),d*.27);
  const product=$(q+' .product');
  const sweep=document.createElement('div');sweep.className='scan-sweep';product.appendChild(sweep);
  sweep.style.left='360px';sweep.style.top='165px';
  tween([sweep],{y:0,scaleX:0},{y:145,scaleX:1},at(.24),d*.27,'none');
  tween([sweep],{scaleX:1},{scaleX:0},at(.52),.24);
  const broadcast=textOf(id,'Start Broadcasting');
  if(i!==3){press(broadcast,at(.42));uiState(broadcast,[{t:0,text:'Start Broadcasting'},{t:at(.49),text:'Broadcasting live'}]);}
  const status=textOf(id,'Connected');uiState(status,[{t:0,text:'Connected'},{t:at(.63),text:'Audio connected'}]);
 }
 if([4,14].includes(i)){
  const product=$(q+' .product');
  const menu=document.createElement('div');menu.className='ui-overlay';menu.style.cssText='left:58px;top:410px;width:398px;';
  menu.innerHTML='<div class="option">English</div><div class="option selected">Spanish (Latin America)</div><div class="option">Portuguese</div>';
  product.appendChild(menu);
  tween([menu],{y:35,scaleY:0,transformOrigin:'50% 0%'},{y:0,scaleY:1},at(.21),d*.2);
  tween([menu],{y:0,scaleY:1},{y:-15,scaleY:0},at(.57),d*.15);
  const selected=textOf(id,'Spanish (Latin America)');
  uiState(selected,[{t:0,text:'Choose your language'},{t:at(.57),text:i===4?'Spanish (Latin America)':'Portuguese'}]);
  const join=textOf(id,'Join Session');press(join,at(.75));
  uiState(join,[{t:0,text:'Join Session'},{t:at(.85),text:'Connected ✓'}]);
  const pointer=$(q+' .pointer');if(pointer)tween([pointer],{x:150,y:110,opacity:0},{x:0,y:0,opacity:1},at(.12),d*.3);
 }
 if(i===2){
  all(q+' .phrase').forEach((el,j)=>{
   const small=el.querySelector('small');if(small)small.remove();
   const copy=el.textContent.trim();typeText(el,copy,at(.04+j*.25),d*.21);
  });
  tween(q+' .f0',{x:0},{x:-95},at(.31),d*.35,'none');
  tween(q+' .f1',{x:0},{x:75},at(.5),d*.3,'none');
 }
 if([6,15].includes(i)){
  tween(q+' .path-line',{scaleX:0},{scaleX:1},at(.12),d*.66,'none');
  all(q+' .node').forEach((el,j)=>{
   reveal([el],at(j*.25),.55,30);
   tween([el],{scale:1},{scale:1.07},at(.18+j*.24),d*.2);
  });
 }
 if([7,8,17].includes(i)){
  all(q+' .caption-line').forEach((el,j)=>{
   const copy=el.textContent;typeText(el,copy,at(.08+(j%4)*.19),d*.20);
   if(i===8)tween([el],{y:0},{y:-30},at(.45),d*.45,'none');
  });
  const status=textOf(id,'Streaming Translated Audio');
  uiState(status,[{t:0,text:'Connecting audio'},{t:at(.25),text:'Streaming Translated Audio'}]);
  const lang=textOf(id,'Spanish');if(i===17)uiState(lang,[{t:0,text:'Spanish...'},{t:at(.6),text:'Portuguese'}]);
 }
 if(i===5){tween(q+' .checkmark',{scale:.78,rotation:-15},{scale:1,rotation:0},at(.08),d*.45);}
 if(i===11){
  all(q+' .language').forEach((el,j)=>{
   const t=at(.16+j*.19);
   tween([el],{scale:1},{scale:1.1},t,d*.12);
   tween([el],{scale:1.1},{scale:1},t+d*.12,d*.15);
  });
 }
 if(i===19){
  tween(q+' .trial-number',{scale:.8,y:80},{scale:1.12,y:-30},at(.02),d*.58,'none');
  reveal(q+' .trial-caption',at(.25),.7,35);
  reveal(q+' .cta-button',at(.59),.75,55);
 }
 if(i===20){
  all(q+' .row span').forEach((el,j)=>reveal([el],at(.21+j*.22),.45,24));
  press($(q+' .cta-button'),at(.85));
 }
 if(i===21){
  reveal(q+' .final-word',at(.31),1.05,90);
  reveal(q+' .url',at(.65),1,35);
 }
});
// Pure full-state text evaluation fixes one-frame stale captions under reverse seek.
// No callbacks toggle visibility or append/delete DOM while playing.
const textClock={t:0};
tl.fromTo(textClock,{t:0},{t:123.8,duration:123.8,ease:'none',onUpdate:()=>{
 const t=textClock.t;
 for(const item of typed){
  if(item.states){let value=item.states[0].text;for(const state of item.states)if(t>=state.t)value=state.text;item.el.textContent=value;}
  else item.el.textContent=item.text.slice(0,Math.max(0,Math.min(item.text.length,Math.floor((t-item.start)/item.duration*item.text.length))));
 }
}},0);
for(const [el,vars] of initialStates)gsap.set(el,vars);
gsap.set(['#world','.white-space'],{opacity:0});
tl.seek(0,false);
window.__timelines=window.__timelines||{};
window.__timelines['exbabel-motion-v2']=tl;
window.motionTimeline=tl;
window.motionPlan=scenePlans;
window.cameraKeys=cameraKeys;
