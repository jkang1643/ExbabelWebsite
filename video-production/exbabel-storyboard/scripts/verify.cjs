const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('playwright-core');
const root=path.resolve(__dirname,'..');
const d=JSON.parse(fs.readFileSync(path.join(root,'storyboard.json'),'utf8'));
const script=fs.readFileSync(path.join(root,'script-verbatim.txt'),'utf8');
const norm=x=>x.trim().replace(/\s+/g,' ');
assert.equal(norm(d.scenes.map(s=>s.voiceover).join(' ')),norm(script),'Narration changed');
assert.equal(d.scenes[0].startMs,0);
assert.equal(d.scenes.at(-1).endMs,d.durationMs);
const ids=new Set();
for(let i=0;i<d.scenes.length;i++){
 const s=d.scenes[i];assert(!ids.has(s.id));ids.add(s.id);
 assert.equal(s.endMs-s.startMs,s.durationMs);
 if(i)assert.equal(d.scenes[i-1].endMs,s.startMs,'gap or overlap');
 for(const b of s.beats)assert(b.atMs>=0&&b.atMs+b.durationMs<=s.durationMs,'beat out of bounds');
 for(const l of s.layers){assert.equal(l.boxPct.length,4);assert(l.boxPct.every(Number.isFinite))}
}
assert(d.scenes.find(s=>s.id==='S12').labels.includes('한국어'),'Unicode corrupted');
assert.equal(d.variants.carousel.edits.reduce((n,e)=>n+e.durationMs,0),30000);
(async()=>{
const cache=path.join(require('os').homedir(),'.cache/ms-playwright');
const folder=fs.readdirSync(cache).find(n=>n.startsWith('chromium-'));
const exe=path.join(cache,folder,'chrome-linux64/chrome');
const browser=await chromium.launch({executablePath:exe,headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(r.status()+' '+r.url())});
await page.goto(process.env.STORYBOARD_URL||'http://127.0.0.1:8768/storyboard.html');
await page.waitForFunction(()=>!!document.getElementById('composition').contentWindow.storyboardTimeline);
await page.evaluate(async()=>{await document.fonts.ready;await document.getElementById('composition').contentDocument.fonts.ready});
const framesDir=path.join(root,'review-frames');fs.mkdirSync(framesDir,{recursive:true});
const samples=[];
for(const s of d.scenes){
 const t=s.startMs+Math.min(1800,s.durationMs/2);
 await page.evaluate(t=>window.storyboardSeek(t),t);
 const state=await page.evaluate(id=>{
 const doc=document.getElementById('composition').contentDocument;
 const visible=[...doc.querySelectorAll('.clip')].filter(el=>getComputedStyle(el).visibility==='visible').map(el=>el.id);
 const h=doc.getElementById(id+'-headline'),hero=doc.getElementById(id+'-hero');
 const rect=h.getBoundingClientRect(),hr=hero.getBoundingClientRect();
 return {visible,text:h.textContent,opacity:getComputedStyle(h).opacity,transform:getComputedStyle(hero).transform,rect:{x:rect.x,y:rect.y,w:rect.width,h:rect.height},hero:{x:hr.x,y:hr.y,w:hr.width,h:hr.height},fits:getComputedStyle(h).overflowY==='visible'||h.scrollHeight<=h.clientHeight+2};
 },s.id);
 assert.deepEqual(state.visible,[s.id]);
 assert.equal(state.text,s.headline);assert.equal(state.opacity,'1');assert(state.fits,s.id+' heading clipped');
 assert(state.rect.x>=0&&state.rect.y>=0&&state.rect.x+state.rect.w<=1921&&state.rect.y+state.rect.h<=1081);
 samples.push({id:s.id,timeMs:t,state});
 await page.locator('#stage').screenshot({path:path.join(framesDir,s.id+'.png')});
}
for(const sample of [...samples].reverse()){
 await page.evaluate(t=>window.storyboardSeek(t),sample.timeMs);
 const transform=await page.evaluate(id=>getComputedStyle(document.getElementById('composition').contentDocument.getElementById(id+'-hero')).transform,sample.id);
 assert.equal(transform,sample.state.transform,'Reverse seek differs at '+sample.id);
}
await page.evaluate(t=>window.storyboardSeek(t),d.durationMs-1000/d.canvas.fps);
assert.match(await page.locator('#title').textContent(),/S22/);
await page.locator('#stage').screenshot({path:path.join(framesDir,'final.png')});
await page.locator('#static').check();
await page.locator('#next').click();
assert.equal(await page.locator('#play').textContent(),'Play');
await page.setViewportSize({width:390,height:844});
await page.evaluate(()=>window.storyboardSeek(75000));
await page.screenshot({path:path.join(framesDir,'mobile-review.png'),fullPage:true});
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Mobile viewer overflow');
await page.setViewportSize({width:1440,height:1100});
await page.evaluate(()=>window.storyboardSeek(33500));
await page.screenshot({path:path.join(framesDir,'review-page.png'),fullPage:true});
assert.deepEqual(errors,[]);
fs.writeFileSync(path.join(root,'browser-validation.json'),JSON.stringify({ok:true,scenes:samples.length,reverseSeeks:samples.length,scriptWords:script.trim().split(/\s+/).length,durationMs:d.durationMs,errors,samples},null,2));
console.log('PASS: script coverage, 22 scene proof frames, 22 reverse seeks, Unicode, final hold, mobile viewport, browser errors.');
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

