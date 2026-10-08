const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/index.html');
await p.waitForFunction(()=>!!window.motionTimeline);
for(const t of [33.7,34.2,35.5,36.7]){
 const value=await p.evaluate(t=>{
  motionTimeline.seek(t,false);
  return [...document.querySelectorAll('#S07 .source-sentence,#S07 .translated-sentence')].map(e=>({text:e.textContent,display:getComputedStyle(e).display,opacity:getComputedStyle(e).opacity,rect:e.getBoundingClientRect().toJSON()}));
 },t);
 console.log(t,value);
}
await b.close();
})();
