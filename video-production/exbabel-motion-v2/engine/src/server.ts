import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomBytes, randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DemoStore } from './store.js';
import { importCsv, normalizeRow } from './csv.js';
import { DemoRecordSchema, PublicContentSchema, publicConfig, type DemoRecord } from './schema.js';
import { generatePersonalizedPhrase, spliceNarration, VoiceReviewRequired, VoiceUnavailable } from './voice.js';
import { readSalesforceProspect, syncDemo, syncViewed } from './salesforce.js';
import { exportMp4 } from './export.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const dataRoot=resolve(process.env.DEMO_DATA_DIR||join(root,'engine/data'));
const store=new DemoStore(join(dataRoot,'demos.sqlite'));
const baseUrl=(process.env.DEMO_BASE_URL||'http://localhost:3020').replace(/\/$/,'');
const secret=process.env.ADMIN_SECRET||'';
const password=process.env.ADMIN_PASSWORD||'';
const sfWebhookToken=process.env.SALESFORCE_WEBHOOK_TOKEN||'';
const port=Number(process.env.PORT||3020);
const buckets=new Map<string,{count:number;until:number}>();
function limited(req:IncomingMessage,kind:string,limit:number){
  const key=`${kind}:${req.socket.remoteAddress||'unknown'}`,now=Date.now(),old=buckets.get(key);
  const next=!old||old.until<now?{count:1,until:now+60_000}:{count:old.count+1,until:old.until};
  buckets.set(key,next);if(buckets.size>20000)for(const [k,v] of buckets)if(v.until<now)buckets.delete(k);
  return next.count>limit;
}
const safeJson=(v:unknown)=>JSON.stringify(v).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function respond(res:ServerResponse,status:number,body:string|Buffer,type='text/plain; charset=utf-8'){
  res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});res.end(body);
}
function json(res:ServerResponse,status:number,value:unknown){respond(res,status,safeJson(value),'application/json; charset=utf-8')}
function readBody(req:IncomingMessage,max=2_000_000):Promise<string>{return new Promise((resolve,reject)=>{
  let s='',size=0;req.on('data',(b:Buffer)=>{size+=b.length;if(size>max){reject(Error('Request too large'));req.destroy()}else s+=b.toString('utf8')});req.on('end',()=>resolve(s));req.on('error',reject);
})}
function cookieSignature(payload:string){return createHmac('sha256',secret).update(payload).digest('base64url')}
function authorized(req:IncomingMessage){
  if(!secret||!password)return false;
  const raw=req.headers.cookie?.match(/(?:^|;\s*)exbabel_admin=([^;]+)/)?.[1];if(!raw)return false;
  const [payload,sig]=raw.split('.');if(!payload||!sig)return false;
  const a=Buffer.from(sig),b=Buffer.from(cookieSignature(payload));if(a.length!==b.length||!timingSafeEqual(a,b))return false;
  const expiry=Number(Buffer.from(payload,'base64url').toString());return Number.isFinite(expiry)&&expiry>Date.now();
}
function sameOrigin(req:IncomingMessage){const origin=req.headers.origin;return !origin||origin===baseUrl}
function identity(r:{prospect:{churchName:string;email?:string;firstName?:string;city?:string;state?:string;phone?:string};salesforceId?:string}){
  const p=r.prospect;
  return r.salesforceId?`sf:${r.salesforceId}`:`prospect:${[p.churchName,p.email,p.firstName,p.city,p.state,p.phone].map(x=>(x||'').toLowerCase()).join('|')}`;
}
async function createFromSalesforce(salesforceId:string){
  const lead=await readSalesforceProspect(salesforceId);
  const item=normalizeRow({church_name:String(lead.Company||((lead.Account as Record<string,unknown>|undefined)?.Name)||''),first_name:String(lead.FirstName||''),city:String(lead.City||lead.MailingCity||''),state:String(lead.State||lead.MailingState||''),phone:String(lead.Phone||''),website:String(lead.Website||''),email:String(lead.Email||''),salesforce_id:salesforceId});
  const key=identity(item),existing=store.getByIdentity(key);
  if(existing)return {url:`${baseUrl}/d/${existing.publicToken}`,status:existing.status,existing:true};
  const r=DemoRecordSchema.parse({id:randomUUID(),publicToken:randomBytes(9).toString('base64url'),salesforceId:item.salesforceId,prospect:item.prospect,status:'pending'});
  store.put(r,key);store.event(r,'demo_created');enqueue(r);
  return {url:`${baseUrl}/d/${r.publicToken}`,status:r.status,existing:false};
}
const queue:{record:DemoRecord;force:boolean}[]=[];let workers=0;
function enqueue(record:DemoRecord,force=false){queue.push({record,force});void drain()}
async function drain(){
  while(workers<2&&queue.length){
    const {record,force}=queue.shift()!;workers++;
    void generate(record,force).finally(()=>{workers--;void drain()});
  }
}
async function generate(record:DemoRecord,force=false){
  try{
    record.status='generating';record.error=undefined;store.update(record);
    const voiceId=process.env.ELEVENLABS_VOICE_ID;
    if(!voiceId)throw new VoiceUnavailable('ELEVENLABS_VOICE_ID is not configured');
    // The original narration says "... congregation at your church." in this fixed slot.
    const phrase=`at ${record.pronunciation?.churchName||record.prospect.churchName}`;
    const audio=await generatePersonalizedPhrase({text:phrase,voiceId,cacheDir:join(dataRoot,'voice-cache'),force});
    const path=join(dataRoot,'audio',`${record.id}.wav`);
    await spliceNarration({masterPath:join(root,'assets/narration.wav'),segmentPath:audio.path,outputPath:path});
    record.voiceCacheKey=audio.key;record.audioPath=path;record.status='ready';store.update(record);
    if(record.salesforceId)try{await syncDemo(record,baseUrl)}catch(e){record.error=`Salesforce sync: ${e instanceof Error?e.message:'failed'}`;store.update(record)}
  }catch(e){record.status=e instanceof VoiceReviewRequired?'voice_review_required':e instanceof VoiceUnavailable?'voice_unavailable':'failed';record.error=e instanceof Error?e.message:'Generation failed';store.update(record)}
}
function playerHtml(record:DemoRecord){
  const p=publicConfig(record,baseUrl),title=escapeHtml(p.content.introChurchName),url=escapeHtml(p.cta.url),label=escapeHtml(p.cta.label);
  const pageTitle=record.prospect.firstName?`${escapeHtml(record.prospect.firstName)}, see Exbabel at ${title}`:`See Exbabel at ${title}`;
  const location=p.content.locationText?`<p>${escapeHtml(p.content.locationText)}</p>`:'';
  const pending=record.status!=='ready'?`<div class="notice">Personalized narration is ${escapeHtml(record.status.replaceAll('_',' '))}. The demo is available with the original narration while audio is prepared.</div>`:'';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · Exbabel demo</title><style>
    *{box-sizing:border-box}body{margin:0;background:#f5f7fc;color:#141c2c;font:16px system-ui,sans-serif}.shell{max-width:1320px;margin:auto;padding:clamp(16px,3vw,40px)}header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}header b{font-size:22px;letter-spacing:-.04em}.brand{color:#394dfe}.player-wrap{aspect-ratio:16/9;background:#fff;box-shadow:0 18px 70px #1722441c;border-radius:16px;overflow:hidden}.player-wrap hyperframes-player{display:block;width:100%;height:100%}.below{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:24px}.below h1{font-size:clamp(22px,3vw,36px);margin:0}.cta{background:#394dfe;color:#fff;padding:14px 22px;border-radius:10px;text-decoration:none;font-weight:650}.notice{background:#fff4d9;padding:12px 16px;border-radius:8px;margin-bottom:18px}
  </style><script src="/assets/hyperframes-player.global.js" defer></script></head><body><main class="shell"><header><b><span class="brand">Exbabel</span> / Personalized demo</b></header>${pending}<div class="player-wrap"><hyperframes-player id="film" src="/d/${record.publicToken}/composition" controls width="1920" height="1080"></hyperframes-player></div><div class="below"><div><h1>${pageTitle}</h1>${location}</div><a class="cta" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></div></main><script>
  const id=${safeJson(record.publicToken)},player=document.getElementById('film'),sent=new Set();
  function event(name){if(sent.has(name))return;sent.add(name);navigator.sendBeacon('/api/d/'+id+'/events',new Blob([JSON.stringify({event:name})],{type:'application/json'}))}
  const milestones=[[.25,'demo_25_percent'],[.5,'demo_50_percent'],[.75,'demo_75_percent']];
  setInterval(()=>{const t=Number(player.currentTime||0),d=Number(player.duration||123.8);if(t>.3)event('demo_started');for(const [fraction,name] of milestones)if(t>=d*fraction)event(name);if(t>=d-.25)event('demo_completed')},500);
  document.querySelector('.cta').addEventListener('click',()=>event('cta_clicked'));
  </script></body></html>`;
}
function adminHtml(){return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Exbabel demos</title><style>body{font:15px system-ui;margin:32px auto;max-width:1100px;color:#182033}input,button{font:inherit;padding:9px}button{cursor:pointer}table{border-collapse:collapse;width:100%;margin-top:22px}td,th{padding:9px;border-bottom:1px solid #ddd;text-align:left}a{color:#394dfe}</style><h1>Personalized demos</h1><div id="auth"><input id="password" type="password" placeholder="Admin password"><button onclick="login()">Sign in</button></div><main id="main" hidden><p><input type="file" id="csv" accept=".csv,text/csv"><button onclick="upload()">Import CSV</button> <a href="/admin/api/export.csv">Download results CSV</a></p><pre id="result"></pre><table><thead><tr><th>Church</th><th>Prospect</th><th>Voice</th><th>Salesforce</th><th>Demo</th><th>Views</th><th>Actions</th></tr></thead><tbody id="rows"></tbody></table></main><script>
async function login(){const r=await fetch('/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:document.getElementById('password').value})});if(r.ok)load();else alert('Sign in failed')}
async function load(){const r=await fetch('/admin/api/demos');if(!r.ok)return;document.getElementById('main').hidden=false;document.getElementById('auth').hidden=true;const list=await r.json();const tbody=document.getElementById('rows');tbody.replaceChildren();for(const x of list){let tr=document.createElement('tr');for(const value of [x.church,x.firstName||'',x.status,x.salesforceStatus,x.url,x.views]){let td=document.createElement('td');if(String(value).startsWith('http')){let a=document.createElement('a');a.href=value;a.target='_blank';a.textContent='Open demo';td.append(a)}else td.textContent=String(value);tr.append(td)}let td=document.createElement('td');for(const [label,action] of [['Copy URL','copy'],['Regenerate voice','regenerate-voice'],['Sync Salesforce','sync-salesforce'],[x.status==='disabled'?'Enable':'Disable','toggle']]){let b=document.createElement('button');b.textContent=label;b.onclick=async()=>{if(action==='copy')navigator.clipboard.writeText(x.url);else{await fetch('/admin/api/demos/'+x.token+'/'+action,{method:'POST'});load()}};td.append(b)}tr.append(td);tbody.append(tr)}}
async function upload(){const f=document.getElementById('csv').files[0];if(!f)return;let r=await fetch('/admin/api/import',{method:'POST',headers:{'content-type':'text/csv'},body:await f.text()});document.getElementById('result').textContent=JSON.stringify(await r.json(),null,2);load()}
load();</script>`}
const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.wav':'audio/wav','.json':'application/json'};
async function file(res:ServerResponse,path:string){try{const data=await readFile(path);respond(res,200,data,mime[extname(path)]||'application/octet-stream')}catch{respond(res,404,'Not found')}}
async function route(req:IncomingMessage,res:ServerResponse){
  const u=new URL(req.url||'/',baseUrl),path=decodeURIComponent(u.pathname),method=req.method||'GET';
  if(path==='/health'){json(res,200,{ok:true});return}
  if(path==='/assets/hyperframes-player.global.js'){await file(res,join(root,'node_modules/hyperframes/dist/hyperframes-player.global.js'));return}
  if(path==='/admin/demos'&&method==='GET'){respond(res,200,adminHtml(),'text/html; charset=utf-8');return}
  if(path==='/admin/login'&&method==='POST'){
    if(limited(req,'login',10)){respond(res,429,'Too many attempts');return}
    if(!sameOrigin(req)||!secret||!password){respond(res,403,'Forbidden');return}
    const data=JSON.parse(await readBody(req,500));const a=Buffer.from(String(data.password||'')),b=Buffer.from(password);
    if(a.length!==b.length||!timingSafeEqual(a,b)){respond(res,401,'Unauthorized');return}
    const payload=Buffer.from(String(Date.now()+12*60*60*1000)).toString('base64url');
    res.setHeader('Set-Cookie',`exbabel_admin=${payload}.${cookieSignature(payload)}; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=43200${baseUrl.startsWith('https:')?'; Secure':''}`);json(res,200,{ok:true});return;
  }
  if(path==='/api/salesforce/create'&&method==='POST'){
    const supplied=req.headers.authorization?.replace(/^Bearer\s+/i,'')||'';
    const a=Buffer.from(supplied),b=Buffer.from(sfWebhookToken);
    if(!sfWebhookToken||a.length!==b.length||!timingSafeEqual(a,b)){respond(res,403,'Forbidden');return}
    if(limited(req,'salesforce-create',120)){respond(res,429,'Too many requests');return}
    const {salesforceId}=JSON.parse(await readBody(req,500));
    json(res,202,await createFromSalesforce(String(salesforceId)));return;
  }
  if(path.startsWith('/admin/api/')){
    if(!authorized(req)||!sameOrigin(req)){respond(res,403,'Forbidden');return}
    if(path==='/admin/api/demos'&&method==='GET'){
      json(res,200,store.list().map(({record:r,stats})=>({token:r.publicToken,church:r.prospect.churchName,firstName:r.prospect.firstName,status:r.status,salesforceStatus:!r.salesforceId?'not linked':r.error?.startsWith('Salesforce sync:')?'error':r.status==='ready'?'synced':'pending',url:`${baseUrl}/d/${r.publicToken}`,views:stats.viewCount,error:r.error})));return;
    }
    if(path==='/admin/api/import'&&method==='POST'){
      if(limited(req,'import',10)){respond(res,429,'Too many imports');return}
      const result=importCsv(await readBody(req));const rows=[];
      for(const item of result.valid){
        const key=identity(item),old=store.getByIdentity(key);
        if(old){rows.push({churchName:old.prospect.churchName,url:`${baseUrl}/d/${old.publicToken}`,status:old.status,existing:true});continue}
        const r=DemoRecordSchema.parse({id:randomUUID(),publicToken:randomBytes(9).toString('base64url'),salesforceId:item.salesforceId,prospect:item.prospect,pronunciation:item.pronunciation?{churchName:item.pronunciation}:undefined,cta:item.ctaUrl?{label:'See Exbabel in Your Church',url:item.ctaUrl}:undefined,status:'pending'});
        store.put(r,key);store.event(r,'demo_created');enqueue(r);rows.push({churchName:r.prospect.churchName,url:`${baseUrl}/d/${r.publicToken}`,status:r.status});
      }
      json(res,200,{rows,errors:result.errors});return;
    }
    if(path==='/admin/api/salesforce/create'&&method==='POST'){
      const {salesforceId}=JSON.parse(await readBody(req,500));
      json(res,202,await createFromSalesforce(String(salesforceId)));return;
    }
    if(path==='/admin/api/export.csv'&&method==='GET'){
      const quote=(v:unknown)=>`"${String(v??'').replaceAll('"','""')}"`;
      const csv=['church_name,email,salesforce_id,demo_url,status',...store.list(5000).map(({record:r})=>[r.prospect.churchName,r.prospect.email,r.salesforceId,`${baseUrl}/d/${r.publicToken}`,r.status].map(quote).join(','))].join('\n');
      respond(res,200,csv,'text/csv; charset=utf-8');return;
    }
    const action=path.match(/^\/admin\/api\/demos\/([A-Za-z0-9_-]{10,32})\/(regenerate-voice|sync-salesforce|toggle|export-mp4)$/);
    if(action&&method==='POST'){
      const r=store.get(action[1]);if(!r){respond(res,404,'Not found');return}
      if(action[2]==='regenerate-voice'){enqueue(r,true)}
      if(action[2]==='toggle'){r.status=r.status==='disabled'?(r.audioPath?'ready':'pending'):'disabled';store.update(r)}
      if(action[2]==='sync-salesforce')await syncDemo(r,baseUrl);
      if(action[2]==='export-mp4'){
        const dir=join(dataRoot,'exports');await mkdir(dir,{recursive:true});
        const path=join(dir,`${r.publicToken}.mp4`);
        await exportMp4(r,root,path,baseUrl);
        json(res,200,{path});return;
      }
      json(res,200,{status:r.status});return;
    }
    const config=path.match(/^\/admin\/api\/demos\/([A-Za-z0-9_-]{10,32})\/config$/);
    if(config&&method==='POST'){
      const r=store.get(config[1]);if(!r){respond(res,404,'Not found');return}
      const change=JSON.parse(await readBody(req,20_000)) as Record<string,unknown>;
      if(change.contentOverrides)r.contentOverrides=PublicContentSchema.partial().parse(change.contentOverrides);
      if(change.pronunciation)r.pronunciation=DemoRecordSchema.shape.pronunciation.unwrap().parse(change.pronunciation);
      if(change.cta)r.cta=DemoRecordSchema.shape.cta.unwrap().parse(change.cta);
      store.update(r);json(res,200,{config:publicConfig(r,baseUrl),voiceRegenerationNeeded:!!change.pronunciation});return;
    }
    respond(res,404,'Not found');return;
  }
  const m=path.match(/^\/d\/([A-Za-z0-9_-]{10,32})(?:\/(.*))?$/);
  if(m){
    const r=store.get(m[1]);if(!r||r.status==='disabled'){respond(res,404,'Demo unavailable');return}
    const sub=m[2]||'';
    if(!sub&&method==='GET'){store.event(r,'demo_opened');if(r.salesforceId)void syncViewed(r).catch(()=>{});respond(res,200,playerHtml(r),'text/html; charset=utf-8');return}
    if(sub==='composition'&&method==='GET'){
      const config=publicConfig(r,baseUrl),source=await readFile(join(root,'index.html'),'utf8');
      const html=source.replace('<head>',`<head><script>window.__EXBABEL_PUBLIC_CONFIG__=${safeJson(config)};</script>`)
        .replace('src="assets/narration.wav"',`src="/d/${r.publicToken}/audio"`);
      respond(res,200,html,'text/html; charset=utf-8');return;
    }
    if(sub==='audio'&&method==='GET'){await file(res,r.audioPath&&r.status==='ready'?r.audioPath:join(root,'assets/narration.wav'));return}
    if(sub==='config'&&method==='GET'){json(res,200,publicConfig(r,baseUrl));return}
    if((sub.startsWith('assets/')||sub.startsWith('compositions/'))&&method==='GET'){
      const target=resolve(root,sub);if(!target.startsWith(root+sep)){respond(res,403,'Forbidden');return}await file(res,target);return;
    }
    respond(res,404,'Not found');return;
  }
  const e=path.match(/^\/api\/d\/([A-Za-z0-9_-]{10,32})\/events$/);
  if(e&&method==='POST'){
    if(limited(req,`events:${e[1]}`,240)){respond(res,429,'Too many events');return}
    const r=store.get(e[1]);if(!r||r.status==='disabled'){respond(res,404,'Not found');return}
    const body=JSON.parse(await readBody(req,400));const allowed=['demo_started','demo_25_percent','demo_50_percent','demo_75_percent','demo_completed','cta_clicked'];
    if(!allowed.includes(body.event)){respond(res,400,'Invalid event');return}store.event(r,body.event);json(res,200,{ok:true});return;
  }
  respond(res,404,'Not found');
}
createServer((req,res)=>{void route(req,res).catch(e=>{console.error(e);if(!res.headersSent)json(res,500,{error:e instanceof Error?e.message:'Internal error'})})}).listen(port,()=>{
  console.log(`Exbabel demos listening on ${port}`);
  if(process.env.ELEVENLABS_API_KEY&&process.env.ELEVENLABS_VOICE_ID)
    for(const {record} of store.list(5000))if(['pending','generating','voice_unavailable'].includes(record.status))enqueue(record);
});
