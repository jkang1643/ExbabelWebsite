import type { DemoRecord } from './schema.js';

let cached:{token:string;expires:number}|undefined;
function settings(){
  const domain=process.env.SALESFORCE_MY_DOMAIN,client=process.env.SALESFORCE_CLIENT_ID,secret=process.env.SALESFORCE_CLIENT_SECRET;
  if(!domain||!client||!secret)throw Error('Salesforce OAuth environment is not configured');
  const origin=new URL(domain.startsWith('https://')?domain:`https://${domain}`);
  if(origin.protocol!=='https:'||!origin.hostname.endsWith('.my.salesforce.com'))throw Error('SALESFORCE_MY_DOMAIN must be a Salesforce My Domain');
  return {origin:origin.origin,client,secret};
}
async function token():Promise<string>{
  if(cached&&Date.now()<cached.expires)return cached.token;
  const {origin,client,secret}=settings();
  const body=new URLSearchParams({grant_type:'client_credentials',client_id:client,client_secret:secret});
  const r=await fetch(`${origin}/services/oauth2/token`,{method:'POST',body,signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw Error(`Salesforce OAuth failed (${r.status})`);
  const value=await r.json() as {access_token:string;expires_in?:number};
  cached={token:value.access_token,expires:Date.now()+Math.min(55*60,(value.expires_in||3600)-60)*1000};
  return cached.token;
}
async function patch(record:DemoRecord,fields:Record<string,unknown>):Promise<void>{
  if(!record.salesforceId)return;
  const {origin}=settings();
  const kind=record.salesforceId.startsWith('00Q')?'Lead':'Contact';
  const r=await fetch(`${origin}/services/data/v61.0/sobjects/${kind}/${record.salesforceId}`,{
    method:'PATCH',headers:{Authorization:`Bearer ${await token()}`,'Content-Type':'application/json'},
    body:JSON.stringify(fields),signal:AbortSignal.timeout(15000),
  });
  if(!r.ok)throw Error(`Salesforce ${kind} update failed (${r.status}): ${(await r.text()).slice(0,300)}`);
}
export async function syncDemo(record:DemoRecord,baseUrl:string):Promise<void>{
  await patch(record,{Personalized_Demo_URL__c:`${baseUrl}/d/${record.publicToken}`,Personalized_Demo_Status__c:record.status});
}
export async function syncViewed(record:DemoRecord):Promise<void>{
  await patch(record,{Personalized_Demo_Viewed__c:true,Personalized_Demo_Last_Viewed__c:new Date().toISOString()});
}
export async function readSalesforceProspect(id:string):Promise<Record<string,unknown>>{
  if(!/^(00Q|003)[A-Za-z0-9]{12}([A-Za-z0-9]{3})?$/.test(id))throw Error('Invalid Salesforce ID');
  const {origin}=settings(),kind=id.startsWith('00Q')?'Lead':'Contact';
  const fields=kind==='Lead'?'FirstName,Company,City,State,Phone,Website,Email':'FirstName,AccountId,MailingCity,MailingState,Phone,Email';
  const r=await fetch(`${origin}/services/data/v61.0/sobjects/${kind}/${id}?fields=${encodeURIComponent(fields)}`,
    {headers:{Authorization:`Bearer ${await token()}`},signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw Error(`Salesforce ${kind} read failed (${r.status})`);
  const data=await r.json() as Record<string,unknown>;
  if(kind==='Contact'&&typeof data.AccountId==='string'&&/^[A-Za-z0-9]{15}([A-Za-z0-9]{3})?$/.test(data.AccountId)){
    const account=await fetch(`${origin}/services/data/v61.0/sobjects/Account/${data.AccountId}?fields=Name,Website`,
      {headers:{Authorization:`Bearer ${await token()}`},signal:AbortSignal.timeout(15000)});
    if(account.ok){const a=await account.json() as {Name?:string;Website?:string};data.Company=a.Name;data.Website=a.Website}
  }
  return data;
}
