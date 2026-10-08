const {chromium}=require('playwright-core');const fs=require('fs');
(async()=>{const out=__dirname+'/review/boundaries';fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:.5});
await p.goto('file://'+__dirname+'/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>!!window.motionTimeline);
const plans=await p.evaluate(()=>window.motionPlan),samples=[];
for(const plan of plans){if(!plan.handoff)continue;
 for(const dt of [-.46,-.42,-.38,-.2,-.033,0,.033,.18,.42,.72]){
 const t=plan.end+dt,file=plan.id+'-'+String(dt).replace('.','_')+'.png';
 await p.evaluate(t=>{motionTimeline.seek(t,false)},t);await p.screenshot({path:out+'/'+file});samples.push({from:plan.id,to:plan.handoff.to,time:t,file});
 }}
fs.writeFileSync(out+'/samples.json',JSON.stringify(samples,null,2));await b.close();console.log('Boundary samples:',samples.length);
})();
