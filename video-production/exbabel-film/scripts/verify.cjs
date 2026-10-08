const {chromium}=require('playwright-core');
const fs=require('fs');
const path=require('path');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const b=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1920,height:1080}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('file://'+root+'/index.html');await p.evaluate(()=>document.fonts.ready);
 const report=await p.evaluate(()=>{
  const data=JSON.parse(document.getElementById('production-data').textContent);
  const results=[];
  for(const m of window.cameraMoves){
    const t=m.startMs+m.durationMs+100;
    filmTimeline.seek(t);
    const camera=document.querySelector('#'+m.scene+' .camera');
    const transform=getComputedStyle(camera).transform;
    const matrix=new DOMMatrix(transform);
    const actual=[matrix.a*m.target[0]+matrix.e,matrix.d*m.target[1]+matrix.f];
    const diff=Math.hypot(actual[0]-m.focal[0],actual[1]-m.focal[1]);
    filmTimeline.seek(150500);filmTimeline.seek(t);
    const repeat=getComputedStyle(camera).transform;
    results.push({scene:m.scene,time:t/1000,targetErrorPx:diff,repeatable:repeat===transform,transform});
  }
  return {duration:data.durationMs,scenes:data.scenes.length,stockMedia:document.querySelectorAll('img,video').length,cameras:results};
 });
 report.errors=errors;
 report.ok=!errors.length&&report.stockMedia===0&&report.cameras.every(x=>x.targetErrorPx<.1&&x.repeatable);
 fs.writeFileSync(root+'/verification.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report));await b.close();if(!report.ok)process.exit(1);
})();
