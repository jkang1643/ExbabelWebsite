import { parse } from 'csv-parse/sync';
import { ProspectSchema, type Prospect } from './schema.js';

const text=(v:unknown)=>String(v??'').normalize('NFC').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim();
const cols=(r:Record<string,string>)=>Object.fromEntries(Object.entries(r).map(([k,v])=>[k.trim().toLowerCase().replace(/[\s-]+/g,'_'),text(v)]));
export function normalizePhone(raw:string):string|undefined {
  const x=text(raw).replace(/\D/g,'');
  if(!x)return undefined;
  const d=x.length===11&&x[0]==='1'?x.slice(1):x;
  if(d.length!==10)throw Error('phone must contain 10 US digits');
  return `${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6)}`;
}
export function normalizeWebsite(raw:string):string|undefined {
  const x=text(raw);if(!x)return undefined;
  const u=new URL(/^https?:\/\//i.test(x)?x:`https://${x}`);
  if(!['http:','https:'].includes(u.protocol)||!u.hostname.includes('.'))throw Error('invalid website URL');
  u.hash='';return u.toString();
}
export function normalizeRow(raw:Record<string,string>):{prospect:Prospect;salesforceId?:string;pronunciation?:string} {
  const r=cols(raw),loc=r.location||'';
  const match=loc.match(/^(.+?)[, ]+([A-Za-z]{2})$/);
  const sizeRaw=r.size||r.church_size||'';
  const size=sizeRaw?Number(sizeRaw.replace(/,/g,'')):undefined;
  const prospect=ProspectSchema.parse({
    churchName:r.church_name||r.church||r.name,
    firstName:r.first_name||r.firstname||undefined,
    city:r.city||match?.[1]||undefined,
    state:(()=>{const s=r.state||match?.[2]||'';return s.length===2?s.toUpperCase():s||undefined})(),
    size,
    phone:normalizePhone(r.phone),
    website:normalizeWebsite(r.website),
    email:r.email?.toLowerCase()||undefined,
  });
  const salesforceId=r.salesforce_id||r.salesforceid||undefined;
  if(salesforceId&&!/^(00Q|003)[A-Za-z0-9]{12}([A-Za-z0-9]{3})?$/.test(salesforceId))throw Error('invalid Salesforce Lead/Contact ID');
  return {prospect,salesforceId,pronunciation:r.pronunciation_church_name||undefined};
}
export function importCsv(csv:string):{valid:ReturnType<typeof normalizeRow>[];errors:{row:number;message:string}[]} {
  const rows=parse(csv,{columns:true,skip_empty_lines:true,bom:true,relax_quotes:false,max_record_size:10000}) as Record<string,string>[];
  if(rows.length>5000)throw Error('CSV exceeds 5,000 rows');
  const valid:ReturnType<typeof normalizeRow>[]=[],errors:{row:number;message:string}[]=[];
  rows.forEach((row,i)=>{try{valid.push(normalizeRow(row))}catch(e){errors.push({row:i+2,message:e instanceof Error?e.message:'Invalid row'})}});
  return {valid,errors};
}
export function importNames(input:string):{valid:ReturnType<typeof normalizeRow>[];errors:{row:number;message:string}[]} {
  const lines=input.replace(/\r\n?/g,'\n').split('\n');
  if(lines.length>5000)throw Error('Name list exceeds 5,000 lines');
  const valid:ReturnType<typeof normalizeRow>[]=[],errors:{row:number;message:string}[]=[];
  lines.forEach((line,i)=>{
    if(!line.trim())return;
    try{valid.push(normalizeRow({church_name:line}))}
    catch(e){errors.push({row:i+1,message:e instanceof Error?e.message:'Invalid church name'})}
  });
  return {valid,errors};
}
