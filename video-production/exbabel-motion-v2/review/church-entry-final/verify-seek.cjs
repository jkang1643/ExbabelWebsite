const {chromium}=require('playwright-core');
const fs=require('fs'),crypto=require('crypto');
(async()=>{
const browser=await chromium.launch({executablePath:'/home/jkang1643/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',headless:true,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
console.log('browser launched');
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const html=fs.readFileSync('compositions/s02a-church-entry.html','utf8');
const body=html.replace(/^<template[^>]*>/,'').replace(/<\/template>\s*$/,'');
await page.setContent('<html><head><style>body{margin:0}</style></head><body></body></html>');
await page.addScriptTag({path:'assets/gsap.min.js'});
await page.evaluate(content=>{document.body.innerHTML=content;for(const s of document.body.querySelectorAll('script')){const fresh=document.createElement('script');fresh.textContent=s.textContent;s.replaceWith(fresh);}},body);
console.log('scene initialized');
const samples=[];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const t of [0,.6,1.25,2.2,3.25,4.3,4.743]){
 await page.evaluate(t=>{window.__timelines.S02A.seek(t,false);},t);
 const a=await page.evaluate(()=>document.getElementById('s02a-root').outerHTML);
 await page.evaluate(()=>{window.__timelines.S02A.seek(4.744,false);window.__timelines.S02A.seek(0,false)});
 await page.evaluate(t=>{window.__timelines.S02A.seek(t,false);},t);
 const b=await page.evaluate(()=>document.getElementById('s02a-root').outerHTML);
 samples.push({t,domIdentical:a===b});
}
const zSamples=await page.evaluate(()=>[.4,.8,1.3,1.8,2.3,3.2,4.1,4.5].map(t=>{__timelines.S02A.seek(t,false);return {time:t,z:Number(gsap.getProperty('#s02a-camera','z'))};}));
const report={ok:!errors.length&&samples.every(s=>s.domIdentical),errors,samples,zSamples};
fs.writeFileSync('review/church-entry-final/seek-check.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
await browser.close();if(!report.ok)process.exitCode=1;
})();