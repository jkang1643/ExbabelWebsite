'use strict';
const production=JSON.parse(document.getElementById('production-data').textContent);
const locked=new Set(['S01','S02','S19']);
const $=s=>document.querySelector(s),all=s=>Array.from(document.querySelectorAll(s));
window.motionPlan=[];
document.fonts.ready.then(()=>{
 const tl=gsap.timeline({paused:true,defaults:{ease:'power2.inOut'}});
 const textStates=[],shots=[],seed=new Map();
 const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)},mix=(a,b,p)=>a+(b-a)*p;
 function motion(target,from,to,at,duration,ease='power2.inOut'){
  const els=(typeof target==='string'?all(target):Array.isArray(target)?target:[target]).filter(Boolean);
  for(const el of els){const base=seed.get(el)||{};for(const [k,v] of Object.entries(from))if(!(k in base))base[k]=v;seed.set(el,base);}
  if(els.length)tl.fromTo(els,from,{...to,duration,ease,immediateRender:false},at);
 }
 function type(el,text,at,duration){if(el){el.textContent=text;textStates.push({el,text,at,duration});}}
 function states(el,values){if(el)textStates.push({el,values});}
 function findText(scene,needle){return [...scene.querySelectorAll('svg text')].find(e=>e.textContent.includes(needle));}
 function press(el,at){if(!el)return;motion(el,{scale:1},{scale:.97},at,.12);motion(el,{scale:.97},{scale:1},at+.12,.2);}
 for(const s of production.scenes){
  if(locked.has(s.id))continue;
  const scene=$('#'+s.id),visual=scene.querySelector('.visual'),st=s.startMs/1000,d=s.durationMs/1000,end=s.endMs/1000;
  const typing=Math.min(2.35,d*.27),settle=Math.min(.48,d*.10),read=Math.min(.65,d*.08),travel=Math.min(.8,d*.17);
  const revealAt=st+typing+settle+read,productAt=revealAt+travel;
  const camera=document.createElement('div');camera.className='shot-camera';
  const plane=document.createElement('div');plane.className='type-plane';
  const graphic=document.createElement('div');graphic.className='graphic-stage';
  const fit=document.createElement('div');fit.className='graphic-fit';graphic.appendChild(fit);
  const heading=visual.querySelector('h1'),copyParent=heading.parentElement;
  let support=copyParent.querySelector('p');
  if(!support&&heading.classList.contains('top-title'))support=visual.querySelector('.marketing-support');
  if(support&&support.querySelector('.url,.cta-button'))support=null;
  if(support){support.className='support-plane';camera.appendChild(support);}
  // Original UI/QR/phone artwork survives as DOM; only its camera wrapper changes.
  for(const el of [...visual.querySelectorAll('.checkmark,.url')]){
   el.style.cssText+=el.classList.contains('checkmark')?';position:absolute;left:912px;top:430px;width:96px;height:96px;margin:0':';position:absolute;left:780px;top:430px;width:360px;margin:0';fit.appendChild(el);
  }
  const cta=copyParent.querySelector('.cta-button');if(cta){cta.style.cssText+=';position:absolute;left:1050px;top:610px';fit.appendChild(cta);}
  plane.appendChild(heading);
  for(const child of [...visual.children]){
   if(['copy','center-copy','wave-zone','focus-tag','footer-url','marketing-support'].some(c=>child.classList.contains(c)))continue;
   fit.appendChild(child);
  }
  camera.append(plane,graphic);visual.replaceWith(camera);
  const shapeNodes=[...fit.querySelectorAll('.phrase,.node,.path-line,.pills,.language,.call-card,.trial-number,.trial-caption,.checkmark,.url,.cta-button,.product')].filter(e=>!e.parentElement.closest('.product'));
  const bounds={left:Infinity,top:Infinity,right:-Infinity,bottom:-Infinity};
  for(const el of shapeNodes){const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;bounds.left=Math.min(bounds.left,r.left);bounds.top=Math.min(bounds.top,r.top);bounds.right=Math.max(bounds.right,r.right);bounds.bottom=Math.max(bounds.bottom,r.bottom);}
  const hasGraphic=Number.isFinite(bounds.left),w=bounds.right-bounds.left,h=bounds.bottom-bounds.top;
  if(hasGraphic){const scale=Math.min(1440/w,560/h,1.12);gsap.set(fit,{x:960-(bounds.left+bounds.right)*.5*scale,y:698-(bounds.top+bounds.bottom)*.5*scale,scale});}
  // Each character is stationary on one spatial plane; only the parent camera tracks.
  const lineParts=heading.innerHTML.split(/<br\b[^>]*>/i);
  heading.innerHTML=lineParts.map(part=>`<span class="type-line">${part}</span>`).join(' ');
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT),textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  const chars=[];
  for(const node of textNodes){const frag=document.createDocumentFragment();for(const c of node.textContent){const span=document.createElement('span');span.className='type-char';span.textContent=c;frag.appendChild(span);chars.push(span);}node.replaceWith(frag);}
  const raw=heading.textContent.trim(),first=Math.max(1,raw.indexOf(' ')),widths=[0];
  const origin=heading.getBoundingClientRect().left;
  chars.forEach(el=>widths.push(el.getBoundingClientRect().right-origin));
  const lines=[...heading.querySelectorAll('.type-line')].map(el=>({el,x:el.offsetLeft,w:el.getBoundingClientRect().width}));
  const fullWidth=heading.getBoundingClientRect().width,maxLineWidth=Math.max(...lines.map(l=>l.w)),fitScale=Math.min(.85,1480/maxLineWidth);
  shots.push({scene,camera,plane,heading,support,graphic,fit,st,end,d,typing,settle,read,travel,revealAt,productAt,chars,widths,first,fullWidth,maxLineWidth,lines,fitScale,hasGraphic});
  motion(camera,{scale:1,x:0,y:0},{scale:1.022,x:0,y:-3},productAt,Math.max(.1,end-productAt-.2),'none');
  if(hasGraphic){
   motion(graphic,{y:90,clipPath:'inset(100% 0% 0% 0%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)'},revealAt,travel,'power2.inOut');
   motion(graphic,{scale:1},{scale:1.025},productAt,Math.max(.1,end-productAt-.2),'none');
  }
  const span=Math.max(.2,end-productAt-.25),action=f=>productAt+span*f;
  if(['S04','S14','S17'].includes(s.id)){
   type(findText(scene,'2UU6SV'),'2UU6SV',revealAt+travel*.5,Math.min(.8,span*.3));
   const sweep=document.createElement('div');sweep.className='scan-sweep';scene.querySelector('.product').appendChild(sweep);
   motion(sweep,{y:0,scaleX:0},{y:0,scaleX:1},action(.04),.15);
   motion(sweep,{y:0},{y:150},action(.12),span*.48,'none');motion(sweep,{scaleX:1},{scaleX:0},action(.66),.18);
   const broadcast=findText(scene,'Start Broadcasting');press(broadcast,action(.4));
   if(s.id!=='S04')states(broadcast,[{t:0,text:'Start Broadcasting'},{t:action(.48),text:'Broadcasting live'}]);
   states(findText(scene,'Connected'),[{t:0,text:'Connected'},{t:action(.72),text:'Audio connected'}]);
  }
  if(['S05','S15'].includes(s.id)){
   const product=scene.querySelector('.product'),menu=document.createElement('div');menu.className='ui-overlay';menu.style.cssText='left:58px;top:385px;width:360px';
   menu.innerHTML='<div class="option">English</div><div class="option selected">Spanish (Latin America)</div><div class="option">Portuguese</div>';product.appendChild(menu);
   motion(menu,{clipPath:'inset(0% 0% 100% 0%)',y:-12},{clipPath:'inset(0% 0% 0% 0%)',y:0},action(0),span*.25);
   motion(menu,{clipPath:'inset(0% 0% 0% 0%)',y:0},{clipPath:'inset(0% 0% 100% 0%)',y:-12},action(.42),span*.16);
   states(findText(scene,'Spanish (Latin America)'),[{t:0,text:'Choose your language'},{t:action(.45),text:s.id==='S05'?'Spanish (Latin America)':'Portuguese'}]);
   const join=findText(scene,'Join Session');press(join,action(.68));states(join,[{t:0,text:'Join Session'},{t:action(.81),text:'Connected ✓'}]);
  }
  if(s.id==='S03'){
   [...scene.querySelectorAll('.phrase')].forEach((el,j)=>{
    const copy=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
    for(const n of [...el.childNodes])if(n.nodeType===3)n.remove();
    const content=document.createElement('span');content.className='message-content';el.appendChild(content);type(content,copy,action(j*.27),span*.25);
    motion(el,{y:20,opacity:0},{y:0,opacity:1},revealAt+travel*.5+j*.28,.4);
   });
  }
  if(['S07','S16'].includes(s.id)){
   motion(scene.querySelector('.path-line'),{scaleX:0},{scaleX:1},productAt,span*.7,'none');
   [...scene.querySelectorAll('.node')].forEach((el,j)=>motion(el,{y:22,opacity:0},{y:0,opacity:1},revealAt+travel*.5+j*span*.22,.4));
  }
  if(['S08','S09','S18'].includes(s.id)){
   [...scene.querySelectorAll('.caption-line')].forEach((el,j)=>type(el,el.textContent,action((j%4)*.22),span*.24));
   states(findText(scene,'Streaming Translated Audio'),[{t:0,text:'Connecting audio'},{t:action(.15),text:'Streaming Translated Audio'}]);
  }
  if(['S10','S11','S12','S18','S21'].includes(s.id)){
   const list=[...scene.querySelectorAll('.pill,.language,.row')];list.forEach((el,j)=>motion(el,{y:26,opacity:0},{y:0,opacity:1},revealAt+travel*.6+j*span*.7/Math.max(1,list.length),.45));
  }
  if(s.id==='S20'){
   motion(scene.querySelector('.trial-number'),{scale:.94},{scale:1},productAt,span*.8,'none');
   motion(scene.querySelector('.cta-button'),{y:22,opacity:0},{y:0,opacity:1},action(.45),.5);
  }
  window.motionPlan.push({id:s.id,start:st,end,focalObject:raw,rules:['viewport-change','anchored-layout-expand','control-target-sync','discrete-text-sequence'],
   states:[{phase:'A — cursor-follow typography',start:st,end:st+typing,action:'Type characters on a single plane; camera tracks measured cursor width and pushes 1.00 to 1.18.'},{phase:'B — complete readable statement',start:st+typing,end:revealAt,action:'Dolly back to the full statement inside a 1500px safe width; supporting copy appears.'},{phase:'C — anchored product reveal',start:revealAt,end:productAt,action:'The same headline moves upward once while the original graphic is unmasked below.'},{phase:'D — product development',start:productAt,end,action:'UI actions develop under a 2.2% push. The full headline stays on screen.'}],camera:{cursorTarget:1152,measuredWidth:true,typeScale:[1,1.18],productScale:[1,1.022]},protected:false});
 }
 // Extraction overlays preserve the outgoing object across the narration boundary.
 // They are clones of existing artwork, with identical geometry at takeover.
 const bridges=[];
 for(let i=0;i<shots.length-1;i++){
  const a=shots[i],b=shots[i+1];if(Math.abs(a.end-b.st)>.001)continue;
  const source=a.fit.querySelector('.product,.phrase,.node.ex,.language.primary,.pill,.checkmark,.trial-number,.call-card,.url');
  if(!source)continue;
  const start=a.end-.42,finish=b.productAt;
  const rawRect=source.getBoundingClientRect(),baseW=source.offsetWidth,baseH=source.offsetHeight;
  const progress=clamp((start-a.productAt)/Math.max(.1,a.end-a.productAt-.2));
  const sourceScale=(1+.022*progress)*(1+.025*progress);
  const rect={left:960+(rawRect.left-960)*sourceScale,top:702+(rawRect.top-702)*sourceScale-3*progress,width:rawRect.width*sourceScale,height:rawRect.height*sourceScale};
  if(!baseW||!baseH)continue;
  const holder=document.createElement('div');holder.className='continuity-object';holder.dataset.from=a.scene.id;holder.dataset.to=b.scene.id;
  holder.style.cssText=`position:absolute;left:0;top:0;width:${baseW}px;height:${baseH}px;transform-origin:0 0;z-index:8;opacity:0;pointer-events:none`;
  const clone=source.cloneNode(true);clone.removeAttribute('id');clone.style.cssText+=';left:0;top:0;position:absolute;width:100%;height:100%;transform:none';
  clone.querySelectorAll('[id]').forEach((e,j)=>e.id=`handoff-${i}-${j}`);
  holder.appendChild(clone);$('#world').appendChild(holder);
  const parked=Math.min(310/baseW,190/baseH),target=b.fit.querySelector('.product,.phrase,.node.ex,.language.primary,.pill,.checkmark,.trial-number,.call-card,.url');
  const dest=target?target.getBoundingClientRect():{left:810,top:650,width:300,height:150};
  const br={a,b,source,target,holder,clone,start,finish,baseW,baseH,rect,parked,dest,samePhone:source.classList.contains('phone')&&target?.classList.contains('phone'),sourceText:[...source.querySelectorAll('text,.message-content')],cloneText:[...clone.querySelectorAll('text,.message-content')]};
  bridges.push(br);a.outBridge=br;b.inBridge=br;
  const plan=window.motionPlan.find(p=>p.id===a.scene.id);
  plan.handoff={to:b.scene.id,survivingObject:source.className.baseVal||source.className,type:source.classList.contains('phone')?'hero-object-extraction':'shape-match / focal-point-replacement',overlapStart:start,nextTextStart:b.st-.18,end:finish,leaves:'Outgoing headline travels upward; surrounding interface clears under the extracted object.',enters:'Next tracked headline, then its product surface behind the surviving object.',camera:'One pull-back parks the extracted object below the tracked text; a push resolves it into the next product.',sharedProperty:'Same source artwork and screen position at takeover; retained rounded silhouette.'};
 }
 const clock={t:0};
 function renderState(){
  const t=clock.t,show=t>=10.988&&!(t>=98.622&&t<104.2);
  $('#world').style.opacity=show?'1':'0';$('.white-space').style.opacity=show?'1':'0';
  for(const s of shots){
   const active=t>=s.st-(s.inBridge?.18:0)&&t<s.end;s.scene.style.opacity=active?'1':'0';
   const p=clamp((t-s.st)/s.typing),count=mix(s.first,s.chars.length,p),index=Math.min(s.chars.length-1,Math.floor(count));
   const cursor=mix(s.widths[index],s.widths[Math.min(index+1,s.chars.length)],count-index);
   const dolly=mix(1,1.18,smooth(p)),anchor=mix(960+s.widths[s.first]/2,1152,smooth(p));
   const settle=smooth((t-s.st-s.typing)/s.settle),handoff=s.hasGraphic?smooth((t-s.revealAt)/s.travel):0;
   const sc=mix(dolly,s.fitScale,settle)*mix(1,.74,handoff);
   const centered=(1920-s.maxLineWidth*sc)/2;
   const exit=s.outBridge?smooth((t-s.outBridge.start)/.42):0;
   const totalHeight=129.6*s.lines.length;
   const readY=480-totalHeight*s.fitScale/2;
   const x=mix(anchor-cursor*dolly,centered,settle),y=mix(mix(422,readY,settle),80,handoff)-exit*330;
   s.plane.style.transform=`translate(${x}px,${y}px) scale(${sc})`;
   // Establish separate baselines before lines move horizontally into alignment.
   // This avoids letters crossing one another during the one-line → multiline settle.
   const lineDrop=clamp(settle*3),lineAlign=smooth((settle-1/3)/(2/3));
   s.lines.forEach((line,i)=>line.el.style.transform=`translate(${((s.maxLineWidth-line.w)/2-line.x)*lineAlign}px,${i*129.6*lineDrop}px)`);
   s.chars.forEach((el,i)=>el.style.opacity=i<count?'1':'0');
   s.graphic.style.opacity=s.outBridge&&t>=s.outBridge.start?'0':'1';
   if(s.inBridge?.samePhone)s.inBridge.target.style.opacity=t<s.inBridge.finish?'0':'1';
   if(s.support){s.support.style.opacity=String(settle);const readTop=readY+totalHeight*s.fitScale+24,finalTop=80+totalHeight*s.fitScale*.74+22;s.support.style.transform=`translateY(${mix(readTop,finalTop,handoff)-590-exit*330}px) scale(${mix(1,.92,handoff)})`;}
  }
  for(const item of textStates){let value='';if(item.values){value=item.values[0].text;for(const v of item.values)if(t>=v.t)value=v.text;}else value=item.text.slice(0,Math.floor(clamp((t-item.at)/item.duration)*item.text.length));item.el.textContent=value;}
  for(const b of bridges){
   const on=t>=b.start&&t<b.finish;b.holder.style.opacity=on?'1':'0';if(!on)continue;
   const pull=smooth((t-b.start)/.72),resolve=smooth((t-b.b.revealAt)/b.b.travel);
   const sourceScale=b.rect.width/b.baseW;
   const parkedX=960-b.baseW*b.parked/2,parkedY=823-b.baseH*b.parked/2;
   const matched=b.source.classList.contains('product')&&!!b.b.fit.querySelector('.product');
   const targetScale=matched?Math.min(b.dest.width/b.baseW,b.dest.height/b.baseH):b.parked*.12;
   const sx=mix(mix(sourceScale,b.parked,pull),targetScale,resolve);
   const tx=mix(mix(b.rect.left,parkedX,pull),matched?b.dest.left+(b.dest.width-b.baseW*targetScale)/2:960-b.baseW*targetScale/2,resolve);
   const ty=mix(mix(b.rect.top,parkedY,pull),matched?b.dest.top+(b.dest.height-b.baseH*targetScale)/2:823-b.baseH*targetScale/2,resolve);
   b.holder.style.transform=`translate(${tx}px,${ty}px) scale(${sx})`;
   // At resolve, the next real UI is uncovered beneath the persistent silhouette.
   b.holder.style.clipPath=b.samePhone?'inset(0%)':`inset(0% ${100*smooth((resolve-.72)/.28)}% 0% 0%)`;
   b.sourceText.forEach((el,i)=>{if(b.cloneText[i])b.cloneText[i].textContent=el.textContent;});
  }
 }
 tl.fromTo(clock,{t:0},{t:123.8,duration:123.8,ease:'none',onUpdate:renderState},0);
 for(const [el,vars] of seed)gsap.set(el,vars);
 renderState();tl.seek(0,false);
 window.__timelines=window.__timelines||{};window.__timelines['exbabel-motion-v2']=tl;window.motionTimeline=tl;
});
