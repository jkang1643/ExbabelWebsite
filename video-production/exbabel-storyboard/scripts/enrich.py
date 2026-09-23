from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'storyboard.json'
d=json.loads(p.read_text())
d['title']='Exbabel — One congregation. Understood.'
for s in d['scenes']:
 s['reference']=s['reference'].replace('?', '–')
fix={
'S03':{'labels':['Welcome to our service.','… only pieces of the message']},
'S05':{'labels':['Español','Listen to this service']},
'S06':{'headline':"That's it.",'labels':["You're connected."]},
'S08':{'labels':['Translated audio','Español']},
'S12':{'labels':['Español','한국어','Português','Français']},
'S21':{'headline':"Let's walk through your setup."},
'S22':{'reference':"Original resolution built from R23's clean payoff; reference recording has no captured final CTA."}}
for s in d['scenes']:s.update(fix.get(s['id'],{}))
d['evidence']={'referenceVideo':'../reference-study/source-metadata.json','referenceReview':'REFERENCE_ANALYSIS.md','referenceDurationSeconds':38.136259,'sourceVideoDurationSeconds':38.038333,'referenceHasCapturedEnding':False,'audioListeningStatus':'not-auditioned; metadata and level measurements only'}
d['tokens'].update({'displayPx':104,'headingPx':76,'bodyPx':36,'labelPx':24,'radiusPx':32,'shadow':'0 24px 64px rgba(11,18,32,.13)','safeMarginPx':96,'fontFile':'assets/Sora.ttf','fontLicense':'assets/Sora-OFL.txt'})
d['implementation']={'animeVersion':'4.5.0','registry':'window.__hfAnime','timelineUnits':'milliseconds','hyperframesTimingUnits':'seconds','autoplay':False,'clockOwner':'HyperFrames when rendered; external player when reviewed','uiStatus':'illustrative reconstructed UI; replace with verified product states before final production','previewStatus':'animated schematic storyboard, not the final film'}
d['variants']={'carousel':{'durationMs':30000,'aspect':'4:3','width':1440,'height':1080,'voiceover':False,'edits':[{'sceneId':'S04','durationMs':5000},{'sceneId':'S05','durationMs':5000},{'sceneId':'S07','durationMs':5000},{'sceneId':'S09','durationMs':5000},{'sceneId':'S12','durationMs':5000},{'sceneId':'S22','durationMs':5000}],'adaptation':'Re-layout at 4:3, retain label sizes; do not crop the 16:9 master. Each panel gets a static reduced-motion state. This is a proposed derivative, not a replacement for the supplied script.'}}
d['transitions']=[
 {'id':'T01','name':'Semantic type replacement','durationMs':360,'out':{'y':[0,-30],'opacity':[1,0]},'in':{'y':[30,0],'opacity':[0,1]},'ease':'outCubic','mask':'line overflow hidden; allow 120ms overlap','reference':'R04–R08, R24–R27'},
 {'id':'T02','name':'Soft card handoff','durationMs':480,'out':{'scale':[1,.97],'opacity':[1,0]},'in':{'y':[36,0],'opacity':[0,1]},'ease':'inOutCubic','mask':'rounded rectangle radius 32px; photographic crop object-fit cover','reference':'Proposed for human-footage inserts; uses reference depth treatment'},
 {'id':'T03','name':'Vertical stream continuation','durationMs':520,'out':{'y':[0,-180],'opacity':[1,0]},'in':{'y':[100,0],'opacity':[0,1]},'ease':'inOutCubic','mask':'canvas; retain upward direction','reference':'R11–R12 and R18–R21'},
 {'id':'T04','name':'Pill-to-panel expansion','durationMs':600,'out':{'scale':[1,.95],'opacity':[1,0]},'in':{'scaleX':[.18,1],'scaleY':[.18,1],'opacity':[0,1]},'ease':'outExpo','mask':'animate blank outer surface; counter-scale content or reveal after 360ms','reference':'R12; transfer mechanism, not exact UI'},
 {'id':'T05','name':'Selected-detail push','durationMs':460,'out':{'scale':[1,1.65],'x':[0,-160],'opacity':[1,0]},'in':{'scale':[.96,1],'opacity':[0,1]},'ease':'inOutCubic','mask':'destination anchored to selected detail; no text blur during hold','reference':'R22; geometry is an authored Exbabel value'},
 {'id':'T06','name':'Shared-anchor reframe','durationMs':620,'out':{'scale':[1,.92],'opacity':[1,0]},'in':{'y':[64,0],'scale':[.96,1],'opacity':[0,1]},'ease':'outCubic','mask':'preserve brand/status anchor in production, new content beneath','reference':'R15–R21'},
 {'id':'T07','name':'Masked text / step reveal','durationMs':420,'out':{'opacity':[1,0]},'in':{'y':[24,0],'opacity':[0,1]},'ease':'outCubic','mask':'line clips; indexed word offsets 70ms, total reveal <=900ms','reference':'R10–R11, R24–R27'}
]
motions={
'S01':[(0,'brand appears at x50 y32; scale .9→1, opacity 0→1',500),(550,'headline first phrase rises 30px under mask',500),(3300,'second phrase replaces the greeting line',420),(6800,'church name settles below; hold',400)],
'S02':[(0,'family footage card rises 36px and resolves',480),(600,'family advances toward entrance; camera tracks 0.4m',3600),(4250,'headline becomes fully readable; hold',350)],
'S03':[(0,'three short English phrase strips occupy x30/50/70',450),(1700,'middle and right strips fade to .25; left remains clear',420),(4200,'camera crops toward remaining phrase; scale 1→1.2',620),(6900,'fragments gather into one centered message card',650),(8200,'hold problem statement without more decorative motion',0)],
'S04':[(0,'blank access pill grows into a QR presentation card',600),(650,'phone outline enters from x+90 y+60',520),(1800,'scan bracket travels downward once over QR region',650),(3000,'check resolves; hold the confirmed access state',300)],
'S05':[(0,'phone stays in place; three language rows reveal at 70ms stagger',420),(650,'Español row rises 12px and gains blue border',320),(1300,'Listen action compresses .98→1; state changes to connected',260),(1800,'hold selected language and audio state',0)],
'S06':[(0,'status check draws, then short payoff rises 24px',450),(500,'hold clean completion',0)],
'S07':[(0,'speaker, Exbabel and listener nodes enter left to right',600),(1300,'input path draws left→center',800),(2500,'output path draws center→right while input continues',900),(4200,'deterministic wave cycle repeats finite times',2300),(6800,'hold all connected nodes',0)],
'S08':[(0,'listener footage resolves inside rounded card at x62 y55',480),(700,'listener settles earbud, then follows sermon; no lip sync',4300),(5200,'translated audio label gains emphasis, then holds',350)],
'S09':[(0,'phone enters at scale .96, centered x65 y56',450),(650,'first translated phrase reveals as one semantic chunk',500),(2200,'second line appears; existing line translates upward 38px',450),(3100,'hold complete caption for reading',0)],
'S10':[(0,'one church outline is drawn behind the family',550),(1600,'family rows move into a shared seating group',650),(3800,'headline changes from one service to together',420),(5500,'hold whole congregation and church-name label',0)],
'S11':[(0,'reuse same family identities and wardrobe, seated together',480),(800,'0.25m slow lateral move; family attends naturally',4900),(6100,'hold headline and family in shared environment',0)],
'S12':[(0,'Exbabel anchor enters center',450),(1200,'Spanish card arrives upper left',420),(2700,'Korean and Portuguese cards arrive, 90ms stagger',500),(4800,'French card completes four-node field',450),(6300,'hold all labels with no numeric coverage claim',0)],
'S13':[(0,'In the room holds then slides upward 28px',380),(700,'Online phrase rises into same baseline',420),(1500,'hold the online promise',0)],
'S14':[(0,'browser surface rises y80→0, scale .96→1',620),(900,'neutral sermon-video placeholder resolves in browser',350),(1800,'translation layer docks under video',500),(3300,'caption chunk becomes readable; hold',450)],
'S15':[(0,'two location cards enter at x32/68 y55',550),(1300,'left card shrinks to .82 while right language selector enlarges',620),(2800,'language selection check resolves',300),(4400,'both viewer cards return to equal weight; hold',500)],
'S16':[(0,'three large hardware-to-listener blocks enter',550),(1800,'existing audio cable path draws',700),(3800,'Exbabel session state changes to ready',320),(5600,'connection line reaches listener phone',700),(7600,'hold stable operational diagram; no unsupported connector promises',0)],
'S17':[(0,'Connect audio step reveals',380),(1800,'Start translation step reveals',380),(3500,'Display QR code step reveals',380),(4600,'hold three completed steps',0)],
'S18':[(0,'one phone anchors center',420),(750,'two copies fan outward to x28/72, 90ms stagger',620),(2100,'three action labels appear below',420),(2800,'hold',0)],
'S19':[(0,'church name appears as a small label',450),(1300,'invitation headline resolves in two lines',550),(3900,'quiet hold with only brand anchor',0)],
'S20':[(0,'trial headline reveals',420),(800,'Exbabel.com button grows .96→1',380),(1500,'hold offer and URL; no moving text',0)],
'S21':[(0,'call card replaces trial card on same anchor',420),(1700,'three illustrative setup topics appear',500),(4200,'call action remains still with URL',0)],
'S22':[(0,'family/church motif resolves behind headline',600),(2500,'One congregation phrase appears',450),(4800,'Understood replaces secondary line',450),(6500,'logo and Exbabel.com settle; hold through final frame',400)]
}
for s in d['scenes']:
 s['camera']={'type':'digital composition reframe, no physical lens' if s['tool']=='HF' else 'physical shot per Higgsfield prompt plus flat HF overlay','defaultScale':[1,1.025],'perspectivePx':0,'rotationDegrees':0,'note':'Reference UI is predominantly front-on; do not add default 3D tilt.'}
 s['layers']=[
 {'id':s['id']+'-bg','role':'background','boxPct':[0,0,100,100],'z':0,'initial':{'x':0,'y':0,'scale':1,'rotation':0,'opacity':1,'blur':0}},
 {'id':s['id']+'-brand','role':'brand anchor','boxPct':[5,6,22,5],'z':5,'initial':{'x':0,'y':0,'scale':1,'rotation':0,'opacity':1,'blur':0}},
 {'id':s['id']+'-headline','role':'headline','boxPct':[8,18,84,22] if s['layout'] in ['title','close','cta'] else [7,14,86,18],'z':4,'initial':{'x':0,'y':30,'scale':1,'rotation':0,'opacity':0,'blur':0}},
 {'id':s['id']+'-hero','role':s['layout'],'boxPct':[10,43,80,39] if s['layout'] in ['title','close','cta'] else [13,35,74,51],'z':2,'initial':{'x':0,'y':60,'scale':.96,'rotation':0,'opacity':0,'blur':0}},
 {'id':s['id']+'-detail','role':'supporting labels','boxPct':[12,86,76,6],'z':4,'initial':{'x':0,'y':20,'scale':1,'rotation':0,'opacity':0,'blur':0}}
 ]
 s['beats']=[{'atMs':a,'action':a2,'durationMs':dur,'ease':'outCubic'} for a,a2,dur in motions[s['id']]]
 s['exit']={'transitionId':s['transition'],'startsAtLocalMs':s['durationMs']-600 if s['transition']!='HOLD' else None,'productionRule':'Transitions are included within scene duration, not added after it. Place outgoing/incoming handles inside this window for production. Preview uses schematic end fade.'}
 s['readHoldMs']=max(1000,s['durationMs']-s['beats'][-1]['atMs']-s['beats'][-1]['durationMs'])
 s['assets']=['official-logo','Sora-font','ui-'+s['layout']]+(['H-'+s['id']] if s['tool']!='HF' else [])
 s['captionText']=s['voiceover']
 s['audioCues']=[{'atMs':min(650,s['durationMs']-1000),'type':'soft-interface-tick','status':'proposed; omit under a key consonant'}] if s['layout'] in ['phone','scan','captions','steps','cta'] else []
 s['productionNotes']='Illustrative UI and ungenerated footage are represented by schematic drawings in the review page. Use storyboard beats for full production; the preview demonstrates entrances and holds, not every planned effect.'
d['claimNotes']=['30-day trial is supplied script copy, not independently verified offer terms. Keep verbatim in draft; confirm terms before publication.','Do not import inconsistent website language counts, latency numbers, or security metrics into this narrative.','Spanish sample caption is editorial example, not a benchmark or captured live translation.','Replace placeholder QR with a real approved session URL and verify scanning before publication.']
p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
(ROOT/'script-verbatim.txt').write_text('\n\n'.join(s['voiceover'] for s in d['scenes'])+'\n',encoding='utf8')
print('Enriched',len(d['scenes']),'scenes;',d['durationMs']/1000,'seconds')

