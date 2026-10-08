const {chromium}=require('playwright-core');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
(async()=>{
 const root=__dirname;fs.mkdirSync(root+'/review',{recursive:true});
 const b=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:.5});
 p.setDefaultTimeout(15000);
 const errors=[];p.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message)});
 console.log('browser ready');
 await p.goto('file://'+root+'/index.html',{waitUntil:'domcontentloaded'});console.log('loaded');
 await p.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,5000))]));console.log('fonts ready',await p.evaluate(()=>({status:document.fonts.status,fonts:[...document.fonts].map(f=>[f.family,f.status])})));
 await p.waitForFunction(()=>!!window.motionTimeline);
 const plans=await p.evaluate(()=>window.motionPlan);
 fs.writeFileSync(root+'/motion-plan.json',JSON.stringify(plans,null,2));
 const checks=[];
 for(const s of plans){
  console.log('inspect',s.id);
  const files=[];
  for(const fraction of [0,.25,.5,.75,1]){
   const t=Math.min(123.799,s.start+(s.end-s.start)*fraction);
   await p.evaluate(t=>{motionTimeline.seek(t,false);},t);
   const file=`review/${s.id}-${Math.round(fraction*100)}.png`;
   await p.screenshot({path:root+'/'+file});files.push(file);
  }
  const t=s.start+(s.end-s.start)*.5;
  await p.evaluate(t=>{motionTimeline.seek(t,false);},t);const direct=await p.screenshot();
  const before=await p.evaluate(()=>[...document.querySelectorAll('#world *')].map(e=>[e.tagName,e.id,e.getAttribute('style'),e.children.length?null:e.textContent]));
  await p.evaluate(t=>{motionTimeline.seek(123.799,false);motionTimeline.seek(t,false)},t);const reverse=await p.screenshot();
  const equal=direct.equals(reverse);
  const afterState=await p.evaluate(()=>[...document.querySelectorAll('#world *')].map(e=>[e.tagName,e.id,e.getAttribute('style'),e.children.length?null:e.textContent]));
  const stateEqual=JSON.stringify(before)===JSON.stringify(afterState);
  fs.writeFileSync(root+'/review/'+s.id+'-direct.png',direct);fs.writeFileSync(root+'/review/'+s.id+'-reverse.png',reverse);
  if(!equal){fs.writeFileSync(root+'/review/'+s.id+'-direct.png',direct);fs.writeFileSync(root+'/review/'+s.id+'-reverse.png',reverse);const after=await p.evaluate(()=>[...document.querySelectorAll('#world *')].map(e=>[e.tagName,e.id,e.getAttribute('style'),e.children.length?null:e.textContent]));fs.writeFileSync(root+'/review/'+s.id+'-diff.json',JSON.stringify(before.map((v,i)=>JSON.stringify(v)===JSON.stringify(after[i])?null:{before:v,after:after[i]}).filter(Boolean),null,2));}
  checks.push({scene:s.id,files,reverseSeekPixelIdentical:equal,reverseSeekDOMIdentical:stateEqual});
 }
 const lockHashes={};
 for(const s of ['s01','s19']){
  const a=fs.readFileSync(root+'/compositions/'+s+'.html'),old=fs.readFileSync(path.join(root,'../exbabel-film/compositions/'+s+'.html'));
  const expected=s==='s19'?old.toString().replace(/x:\s*\(\)\s*=>\s*-container.offsetWidth\s*\+\s*300/,'x: () => 1720 - 960 - (container.offsetLeft + container.offsetWidth - 960) * 1.25'):old.toString();
  lockHashes[s]={unchanged:a.equals(old),authorizedCameraCorrectionOnly:s==='s19'&&a.toString()===expected,sha256:crypto.createHash('sha256').update(a).digest('hex')};
 }
 const report={errors,checks,lockHashes,ok:!errors.length&&checks.every(c=>c.reverseSeekDOMIdentical)&&Object.values(lockHashes).every(c=>c.unchanged||c.authorizedCameraCorrectionOnly)};
 fs.writeFileSync(root+'/motion-audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify({ok:report.ok,errors,checks:checks.map(c=>({scene:c.scene,seek:c.reverseSeekPixelIdentical})),lockHashes}));
 await b.close();
})();
