/* Story-specific vector artwork. No independent clocks; motion is registered on the master GSAP timeline. */
window.storyGraphics=(()=>{
 const blue='#394dfe',ink='#111827',pale='#edf0ff';
 const svg=body=>`<svg viewBox="0 0 1000 540" xmlns="http://www.w3.org/2000/svg" fill="none" style="width:100%;height:100%"><g font-family="Sora,sans-serif">${body}</g></svg>`;
 const icon=(name)=>({
  mic:'<rect x="17" y="5" width="14" height="25" rx="7"/><path d="M10 23v3a14 14 0 0028 0v-3M24 40v7M16 47h16"/>',
  browser:'<rect x="4" y="7" width="40" height="29" rx="4"/><path d="M4 15h40M18 37l-3 8h18l-3-8"/><circle cx="10" cy="11" r="1"/>',
  phone:'<rect x="12" y="3" width="24" height="44" rx="5"/><path d="M20 8h8"/><circle cx="24" cy="41" r="1"/>',
  headphones:'<path d="M7 28v-7a17 17 0 0134 0v7"/><rect x="5" y="24" width="9" height="18" rx="4"/><rect x="34" y="24" width="9" height="18" rx="4"/>',
  globe:'<circle cx="24" cy="24" r="20"/><ellipse cx="24" cy="24" rx="9" ry="20"/><path d="M5 24h38M9 12h30M9 36h30"/>',
  check:'<path d="M9 25l10 10L40 12"/>'
 }[name]);
 const iconHTML=(name)=>`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${icon(name)}</svg>`;
 const person=(x,y,size,shirt,hair,skin,child=false)=>`<g transform="translate(${x} ${y}) scale(${size})">
  <path d="M-38 143l-5 62h29l17-60M6 145l12 60h28l-8-67" fill="#253049"/>
  <path d="M-47 78Q-27 57 0 60Q30 58 49 80L54 148Q0 166-54 148Z" fill="${shirt}"/>
  <path d="M-43 83Q-63 117-59 144Q-55 155-45 148L-23 113M43 83Q59 109 59 136Q55 149 43 145L25 112" fill="${shirt}" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
  <rect x="-10" y="43" width="20" height="25" rx="7" fill="${skin}"/>
  <ellipse cy="17" rx="30" ry="35" fill="${hair}"/>
  <ellipse cy="25" rx="27" ry="33" fill="${skin}"/>
  <path d="M-29 20Q-29-19 4-18Q34-14 29 22Q15 10 7-2Q-5 17-29 20" fill="${hair}"/>
  <path d="M-11 41Q0 49 11 41" stroke="#936454" stroke-width="2" stroke-linecap="round"/>
  <circle cx="-10" cy="26" r="2" fill="#293144"/><circle cx="10" cy="26" r="2" fill="#293144"/>
  ${child?'':'<path d="M-49 134Q-25 126-17 140M46 137Q28 125 18 139" stroke="'+skin+'" stroke-width="14" stroke-linecap="round"/>'}
 </g>`;
 const familyCore=()=>`<g class="family-core">
  <ellipse cx="500" cy="482" rx="222" ry="16" fill="#dfe5f1" opacity=".65"/>
  <rect x="265" y="366" width="470" height="31" rx="12" fill="#adbcea"/><path d="M291 393v84M709 393v84" stroke="#a7b6dd" stroke-width="17"/>
  ${person(364,218,1.08,'#394dfe','#3c2b28','#dca986')}
  ${person(621,214,1.08,'#c2cbef','#312d35','#e9bd9f')}
  ${person(499,298,.75,'#f5bf72','#4c3730','#e8b795',true)}
  <rect x="312" y="336" width="57" height="88" rx="10" fill="#16233b" transform="rotate(-9 340 380)"/>
  <rect x="319" y="345" width="43" height="65" rx="5" fill="#f5f7ff" transform="rotate(-9 340 380)"/>
  <path d="M328 367l7 5 12-17" stroke="#394dfe" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M326 348Q320 325 335 315M615 236v-9a25 25 0 0150 0v15" stroke="#24385c" stroke-width="4" stroke-linecap="round"/>
  <rect x="609" y="234" width="10" height="21" rx="5" fill="#24385c"/><rect x="661" y="234" width="10" height="21" rx="5" fill="#24385c"/>
 </g>`;
 const family=(wide)=>svg(`
  <path d="M225 180V140Q500-38 775 140V180" stroke="#e7ebf5" stroke-width="7"/>
  <path d="M490 65v74M463 87h54" stroke="#d5ddf1" stroke-width="8" stroke-linecap="round"/>
  <g class="congregation-context" opacity="${wide?1:0}">
   <path d="M60 312h168M772 312h168M84 395h145M771 395h145" stroke="#d6def1" stroke-width="18" stroke-linecap="round"/>
   ${person(142,181,.72,'#d9dff0','#4b4140','#d0a17e')}${person(859,181,.72,'#c4cfee','#3c3131','#e6b897')}
   ${person(82,323,.65,'#bdcbee','#36364a','#c19072')}${person(920,323,.65,'#d2dbee','#5e4640','#ecc5a7')}
  </g>
  ${familyCore()}
  <g class="family-caption"><rect x="355" y="121" width="290" height="63" rx="20" fill="white" stroke="#d9e0ef"/><path d="M478 184l21 21 21-21" fill="white"/>
  <circle cx="385" cy="152" r="13" fill="#e7ecff"/><path d="M380 151l4 5 7-9" stroke="${blue}" stroke-width="2.5" stroke-linecap="round"/>
  <text x="411" y="159" font-size="23" fill="${ink}">${wide?'The same service':'Español · En vivo'}</text></g>`);
 const card=(inner,cls='')=>`<div class="story-card ${cls}">${inner}</div>`;
 const language=()=>card(`<div class="story-kicker">SUNDAY SERVICE <span class="live-dot"></span> LIVE</div><h2>Choose your language</h2><div class="language-option"><b>EN</b><span>English</span></div><div class="language-option selected-option"><b>ES</b><span>Español</span><i class="selection-check">✓</i></div><div class="language-option"><b>PT</b><span>Português</span></div><div class="listen-control"><span class="listen-label">Start listening</span>${iconHTML('headphones')}</div><div class="tap-ring language-tap"></div>`,'language-picker');
 const sermon=()=>card(`<div class="sermon-head"><span class="story-icon">${iconHTML('mic')}</span><div><div class="story-kicker">LIVE SERMON</div><h2>Your pastor is speaking</h2></div><span class="listening-status">Listening</span></div><div class="sermon-line source-line"><label>ENGLISH · SERVICE AUDIO</label><p class="source-sentence">Welcome to our service.</p></div><div class="translation-flow"><span></span><svg viewBox="0 0 60 40"><path d="M8 20h42M38 8l12 12-12 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></div><div class="sermon-line translated-line"><label>ESPAÑOL · LIVE TRANSLATION</label><p class="translated-sentence">Bienvenidos a nuestro servicio.</p></div>`,'sermon-card');
 const confirm=()=>svg(`<circle cx="500" cy="270" r="87" fill="#eef1ff"/><circle class="confirm-ring" cx="500" cy="270" r="74" stroke="${blue}" stroke-width="5" pathLength="1" stroke-dasharray="1"/><path class="confirm-check" d="M458 269l29 30 58-66" stroke="${blue}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"/>`);
 const remote=()=>card(`<div class="remote-bar"><div class="browser-dots"><i></i><i></i><i></i></div><span>Sunday service</span><b>LIVE</b></div><div class="remote-location">${iconHTML('globe')}<span>Watching from Madrid, Spain</span></div><div class="remote-program"><svg viewBox="0 0 310 260"><rect width="310" height="260" rx="20" fill="#eff2ff"/><path d="M155 24v60M132 44h46" stroke="#b9c7ee" stroke-width="5" stroke-linecap="round"/><circle cx="155" cy="104" r="28" fill="#e5b995"/><path d="M125 101q0-48 40-32q25 11 19 36q-27-6-39-23q-5 16-20 19" fill="#413237"/><path d="M106 147q47-35 99 0l12 85H91z" fill="#394dfe"/><rect x="111" y="200" width="90" height="52" rx="8" fill="#ccd6ee"/><path d="M144 204v-22q0-14 11-14" stroke="#263653" stroke-width="4" fill="none"/></svg></div><div class="remote-language"><label>LISTEN IN</label><div class="remote-option">English</div><div class="remote-option remote-selected">Español <span>✓</span></div><div class="remote-option">Português</div></div><div class="remote-caption">Bienvenidos a nuestro servicio.</div><div class="tap-ring remote-tap"></div>`,'remote-player');
 const setup=()=>`<div class="setup-shell">${[
  ['mic','Audio Input',['Connect from your sound system','Hardware audio interface, OR','Dante network audio, OR','Built-in microphone']],
  ['browser','Computer & Browser',['Any computer (Windows, Mac, Linux)','Chrome browser (recommended)','Stable internet connection (5+ Mbps)']],
  ['phone','User Devices',['iOS (iPhone, iPad)','Android phones & tablets','Laptops & computers','No special hardware needed']]
 ].map(([i,title,items],n)=>`<div class="setup-pane setup-${n}"><div class="setup-title"><span>${iconHTML(i)}</span><h2>${title}</h2></div><ul>${items.map(t=>`<li><b>✓</b>${t}</li>`).join('')}</ul></div>`).join('')}</div>`;
 const joining=()=>svg(`
 <ellipse cx="516" cy="519" rx="210" ry="15" fill="#e7ebf3"/>
 <path d="M666 540C646 484 635 451 645 412L659 280Q665 257 681 264Q697 270 692 295L690 327Q714 302 727 316Q738 331 721 350Q745 338 754 357Q761 371 743 390Q766 390 768 408Q770 427 746 451L721 494L731 540Z" fill="#edc2a4" stroke="#cf9e83" stroke-width="2"/>
 <g class="join-phone"><rect x="345" y="15" width="302" height="500" rx="43" fill="#182238"/><rect x="357" y="28" width="278" height="475" rx="32" fill="#fff"/><rect x="443" y="36" width="107" height="18" rx="9" fill="#182238"/>
 <text x="496" y="103" font-size="22" fill="${ink}" font-weight="700" text-anchor="middle">Exbabel</text><text x="496" y="139" font-size="16" fill="#67748b" text-anchor="middle">Join this service</text>
 <rect x="382" y="161" width="228" height="51" rx="11" fill="#f3f5fb"/><text x="496" y="194" font-size="23" letter-spacing="5" fill="#25344c" text-anchor="middle">2UU6SV</text>
 <text x="384" y="245" font-size="12" letter-spacing="1.5" fill="#67748b">YOUR LANGUAGE</text>
 <rect class="join-language-bg" x="382" y="259" width="228" height="61" rx="12" fill="#f4f6fd" stroke="#dde4f3"/><text x="402" y="296" font-size="22" fill="${ink}">Español</text><path class="join-tick" d="M571 289l8 8 14-18" stroke="${blue}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
 <g class="join-button"><rect x="382" y="348" width="228" height="59" rx="14" fill="${blue}"/><text class="join-button-label" x="496" y="385" font-size="19" fill="white" text-anchor="middle">Join service</text></g>
 <g class="join-audio-state"><circle cx="402" cy="447" r="5" fill="#159d78"/><text x="419" y="453" font-size="15" fill="#16745e">Listening in Español</text></g>
 </g><g class="joining-thumb"><path d="M697 454Q665 438 631 414L568 372Q550 359 540 373Q530 389 548 402L600 448Q621 482 661 491" fill="#efc5a8" stroke="#cf9e83" stroke-width="2" stroke-linecap="round"/><path d="M550 371q-5 12 7 17" stroke="#fff1e7" stroke-width="7" stroke-linecap="round"/></g>`);
 const trial=()=>svg(`<g class="trial-calendar"><rect x="195" y="25" width="610" height="490" rx="32" fill="white" stroke="#dce3f1" stroke-width="2"/><path d="M195 126h610" stroke="#e3e8f2" stroke-width="2"/><path d="M345 10v46M655 10v46" stroke="${blue}" stroke-width="12" stroke-linecap="round"/><text x="500" y="94" text-anchor="middle" font-size="25" fill="#536079">Your free trial</text><circle cx="500" cy="278" r="112" stroke="#edf0ff" stroke-width="5"/><circle class="trial-progress" cx="500" cy="278" r="112" stroke="${blue}" stroke-width="5" pathLength="1" stroke-dasharray="1" transform="rotate(-90 500 278)"/><text class="trial-counter" x="500" y="308" text-anchor="middle" font-size="115" font-weight="600" letter-spacing="-7" fill="${blue}">30</text><text x="500" y="352" text-anchor="middle" font-size="24" fill="#536079">days</text><g class="trial-action"><rect x="278" y="422" width="444" height="63" rx="16" fill="${blue}"/><text x="500" y="462" text-anchor="middle" font-size="24" font-weight="600" fill="white">Start at Exbabel.com</text></g></g>`);
 const factories={S05:language,S06:confirm,S07:sermon,S10:()=>family(false),S11:()=>family(true),S14:()=>`<div class="livestream-art">${window.liveStreamSVG}</div>`,S15:remote,S16:setup,S18:joining,S20:trial};
 function install(visual,id){
  if(!factories[id])return false;
  for(const child of [...visual.children])if(!child.matches('.copy,.center-copy,h1,.marketing-support'))child.remove();
  visual.querySelectorAll('.checkmark,.cta-button').forEach(e=>e.remove());
  const art=document.createElement('div');art.className='custom-art story-'+id;art.dataset.graphic=id;art.innerHTML=factories[id]();visual.appendChild(art);return true;
 }
 function animate(scene,s,motion,type,states,press,productAt,end,revealAt){
  const id=s.id,span=Math.max(.25,end-productAt-.22),at=f=>productAt+span*f,q=sel=>scene.querySelector(sel),qa=sel=>[...scene.querySelectorAll(sel)];
  if(id==='S05'){
   qa('.language-option').forEach((el,j)=>motion(el,{y:15,opacity:0},{y:0,opacity:1},revealAt+.12+j*.10,.25));
   motion(q('.selected-option'),{backgroundColor:'#fff',color:ink},{backgroundColor:'#eef0ff',color:blue},at(.15),.2);
   motion(q('.selection-check'),{opacity:0,scale:.7},{opacity:1,scale:1},at(.23),.2);
   motion(q('.language-tap'),{scale:.7,opacity:0},{scale:1,opacity:1},at(.08),.12);motion(q('.language-tap'),{scale:1,opacity:1},{scale:1.3,opacity:0},at(.25),.25);
   press(q('.listen-control'),at(.50));states(q('.listen-label'),[{t:0,text:'Start listening'},{t:at(.7),text:'Listening live'}]);
  }
  if(id==='S06'){
   motion(q('.confirm-ring'),{strokeDashoffset:1},{strokeDashoffset:0},s.startMs/1000+.08,.5);
   motion(q('.confirm-check'),{strokeDashoffset:1},{strokeDashoffset:0},s.startMs/1000+.36,.55);
  }
  if(id==='S07'){
   type(q('.source-sentence'),'Welcome to our service.',at(0),span*.35);
   motion(q('.translation-flow'),{scaleX:0,opacity:0},{scaleX:1,opacity:1},at(.25),span*.2);
   motion(q('.translated-line'),{y:18,opacity:0},{y:0,opacity:1},at(.38),.35);
   type(q('.translated-sentence'),'Bienvenidos a nuestro servicio.',at(.42),span*.45);
   states(q('.listening-status'),[{t:0,text:'Listening'},{t:at(.48),text:'Translating live'}]);
  }
  if(id==='S10'||id==='S11'){
   motion(q('.family-caption'),{y:20,opacity:0},{y:0,opacity:1},at(.25),.5);
   if(id==='S11')motion(q('.congregation-context'),{opacity:0,scale:.94},{opacity:1,scale:1},at(.18),span*.65);
   motion(q('.family-core'),{y:8},{y:0},productAt,span,'none');
  }
  if(id==='S14'){
   qa('.anim-head').forEach(el=>motion(el,{y:0},{y:-2},productAt,span,'none'));
   const lines=qa('.live-caption');lines.forEach((el,j)=>type(el,el.textContent,at(.1+j*.30),span*.3));
   motion(q('.live-language-highlight'),{opacity:0},{opacity:1},at(.50),.25);
  }
  if(id==='S15'){
   motion(q('.remote-location'),{x:-24,opacity:0},{x:0,opacity:1},revealAt+.1,.45);
   motion(q('.remote-selected'),{backgroundColor:'#fff',color:ink},{backgroundColor:'#eef0ff',color:blue},at(.22),.3);
   motion(q('.remote-selected span'),{opacity:0},{opacity:1},at(.4),.2);
   type(q('.remote-caption'),'Bienvenidos a nuestro servicio.',at(.42),span*.5);
   motion(q('.remote-tap'),{scale:.8,opacity:0},{scale:1,opacity:1},at(.15),.15);motion(q('.remote-tap'),{scale:1,opacity:1},{scale:1.3,opacity:0},at(.35),.25);
  }
  if(id==='S16'){
   qa('.setup-pane').forEach((el,j)=>{
    const st=productAt+j*span/3;
    motion(el,{opacity:0,y:0},{opacity:1,y:0},st,.001);
    [...el.querySelectorAll('li')].forEach((li,k)=>motion(li,{x:15,opacity:0},{x:0,opacity:1},st+.2+k*.12,.25));
    if(j<2)motion(el,{opacity:1},{opacity:0},st+span/3,.001);
   });
  }
  if(id==='S18'){
   motion(q('.joining-thumb'),{x:38,y:30},{x:0,y:0},at(.06),span*.32);
   motion(q('.join-language-bg'),{fill:'#f4f6fd'},{fill:'#e9edff'},at(.24),.2);
   motion(q('.join-tick'),{opacity:0},{opacity:1},at(.30),.2);
   press(q('.join-button'),at(.48));states(q('.join-button-label'),[{t:0,text:'Join service'},{t:at(.7),text:'Connected ✓'}]);
   motion(q('.join-audio-state'),{opacity:0,y:10},{opacity:1,y:0},at(.71),.25);
  }
  if(id==='S20'){
   states(q('.trial-counter'),Array.from({length:30},(_,i)=>({t:i?at(i/29*.55):0,text:String(i+1)})));
   motion(q('.trial-progress'),{strokeDashoffset:1},{strokeDashoffset:0},productAt,span*.6,'power2.out');
   motion(q('.trial-action'),{y:18,opacity:0},{y:0,opacity:1},at(.35),.35);press(q('.trial-action'),at(.74));
  }
 }
 return {install,animate,ids:Object.keys(factories)};
})();
