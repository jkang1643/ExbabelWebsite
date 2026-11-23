'use client';
import {useEffect,useState} from 'react';
import cases from '@/data/research/cases.json';

export default function Browser(){
 const [query,setQuery]=useState(''),[direction,setDirection]=useState(''),[kind,setKind]=useState(''),[id,setId]=useState(cases[0].id);
 useEffect(()=>{function follow(){const hash=location.hash.slice(1);if(cases.some(c=>c.id===hash)){setId(hash);setDirection('');setKind('');setQuery('')}}follow();window.addEventListener('hashchange',follow);return ()=>window.removeEventListener('hashchange',follow)},[]);
 const filtered=cases.filter(c=>(!direction||direction===c.direction)&&(!kind||kind===c.kind)&&[c.title,c.id,c.search,c.direction].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 const item=filtered.find(c=>c.id===id)??filtered[0];
 function choose(id:string){setId(id);history.replaceState(null,'','#'+id)}
 return <><div className="casefilters"><label>Search examples<input type="search" placeholder="Phrase, topic or clip ID" value={query} onChange={e=>setQuery(e.target.value)}/></label>{([[direction,setDirection,'Language direction',Array.from(new Set(cases.map(c=>c.direction))).sort()],[kind,setKind,'Material',Array.from(new Set(cases.map(c=>c.kind))) ] as const).map(([value,set,label,options])=><label key={label}>{label}<select value={value} onChange={e=>set(e.target.value)}><option value="">All</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>)}</div><p aria-live="polite">{filtered.length} of {cases.length} examples</p>{item?<div className="casegrid"><nav aria-label="Matching examples">{filtered.map(c=><button key={c.id} aria-current={item.id===c.id?'true':undefined} onClick={()=>choose(c.id)}><small>{c.direction} · {c.id}</small>{c.title}</button>)}</nav><article className="evidence activecase" key={item.id}><small>{item.meta}</small><h2>{item.title}</h2><div className="caseaudio">{item.tracks.map(t=><label key={t.url}>{t.label}<audio controls preload="none" src={t.url}/></label>)}</div><div dangerouslySetInnerHTML={{__html:item.body}}/></article></div>:<p>Try another phrase or choose a different language direction.</p>}</>;
}
