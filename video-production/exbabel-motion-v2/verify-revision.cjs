const {chromium}=require('playwright-core');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('file://'+__dirname+'/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>!!window.motionTimeline);
 const plans=await p.evaluate(()=>window.motionPlan),copy=JSON.parse(fs.readFileSync(__dirname+'/copy-revisions.json'));
 const checks=[];
 for(const s of plans){
  const time=s.states[1].end-.03;
  await p.evaluate(t=>{motionTimeline.seek(t,false)},time);
  const state=await p.evaluate(id=>{
   const scene=document.getElementById(id),chars=[...scene.querySelectorAll('h1 .type-char')];
   const boxes=chars.filter(e=>e.textContent.trim()).map(e=>e.getBoundingClientRect());
   return {text:scene.querySelector('h1').textContent.replace(/\s+/g,' ').trim(),support:scene.querySelector('.support-plane')?.textContent.trim(),left:Math.min(...boxes.map(r=>r.left)),right:Math.max(...boxes.map(r=>r.right)),top:Math.min(...boxes.map(r=>r.top)),bottom:Math.max(...boxes.map(r=>r.bottom)),allRevealed:chars.every(e=>e.style.opacity==='1')};
  },s.id);
  const expected=copy[s.id]?.lines.join(' '),support=copy[s.id]?.support;
  checks.push({scene:s.id,time,...state,copyMatches:!expected||state.text===expected,supportMatches:!support||state.support===support,safe:state.left>=55&&state.right<=1865&&state.top>=55&&state.bottom<=1000&&state.allRevealed});
 }
 const report={ok:checks.every(c=>c.safe&&c.copyMatches&&c.supportMatches),checks};
 fs.writeFileSync(__dirname+'/copy-and-framing-audit.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report));await b.close();
})();
