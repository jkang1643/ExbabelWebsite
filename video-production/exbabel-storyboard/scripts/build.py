from pathlib import Path
import json,html,shutil
ROOT=Path(__file__).resolve().parents[1]
d=json.loads((ROOT/'storyboard.json').read_text())
esc=html.escape
def stamp(ms):return f'{int(ms//60000):02d}:{(ms/1000)%60:06.3f}'
def glyph(kind):
 shapes={
 'people':'<circle cx="105" cy="75" r="30"/><circle cx="205" cy="75" r="30"/><circle cx="157" cy="125" r="22"/><path d="M65 180v-35q0-35 40-35t40 35m20 0q0-35 40-35t40 35v35M130 205v-40q27-30 54 0v40"/>',
 'listener':'<circle cx="160" cy="100" r="55"/><path d="M85 110V80a75 75 0 0 1 150 0v30M90 90v50m140-50v50M90 225v-15q70-65 140 0v15"/>',
 'church':'<path d="M65 230V105l95-65 95 65v125zM160 20v45m-20-25h40M130 230v-65h60v65"/>',
 'wave':'<path d="M40 115v35m35-65v95m35-125v155m35-190v225m35-175v125m35-90v55m35-35v15"/>',
 'check':'<circle cx="160" cy="130" r="90"/><path d="m115 130 30 30 68-72"/>',
 'globe':'<circle cx="160" cy="130" r="95"/><ellipse cx="160" cy="130" rx="45" ry="95"/><path d="M65 130h190M83 77h155M83 183h155"/>',
 'qr':'<path d="M60 90V35h55M205 35h55v55M60 180v55h55M205 235h55v-55"/><rect x="100" y="80" width="35" height="35"/><rect x="185" y="80" width="35" height="35"/><rect x="100" y="165" width="35" height="35"/><path d="M185 160h35v35h-20v-17M155 85v115"/>'}
 return '<svg viewBox="0 0 320 260" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">'+shapes.get(kind,shapes['check'])+'</svg>'
def badge(text,cl=''):return '<div class="badge '+cl+'">'+esc(text)+'</div>'
def hero(s):
 labels=s['labels'];typ=s['layout']
 if typ in ['title','close']:
  return '<div class="center-hero">'+glyph('check' if s['id']=='S06' else 'church')+'<div class="pills">'+''.join(badge(x) for x in labels)+'</div></div>'
 if typ in ['people','listener']:
  return '<div class="film-placeholder"><div class="film-art">'+glyph('listener' if typ=='listener' else 'people')+'</div><div class="film-label">Higgsfield plate · not generated</div><div class="pills">'+''.join(badge(x) for x in labels)+'</div></div>'
 if typ in ['scan','phone','captions']:
  content=('<div class="qr">'+glyph('qr')+'</div><p class="tiny">QR placeholder · non-scannable</p>') if typ=='scan' else '<div class="bubble">'+esc(labels[0])+'</div><div class="bubble blue">'+esc(labels[-1])+'</div>'
  return '<div class="phone"><div class="notch"></div><div class="phone-brand">Exbabel</div>'+content+'<div class="listen">'+('Scan to join' if typ=='scan' else 'Listening' if typ=='phone' else 'Live captions')+'</div></div><div class="phone-side">'+glyph('wave')+'</div>'
 if typ in ['signal','steps','phones']:
  icons=['wave','check','qr'] if typ=='steps' else ['wave','globe','listener']
  return '<div class="nodes">'+''.join('<div class="node">'+glyph(icons[i%3])+badge(x)+'</div>'+('<span class="connector">→</span>' if i<len(labels)-1 else '') for i,x in enumerate(labels))+'</div>'
 if typ=='languages':return '<div class="language-core">Exbabel</div><div class="language-grid">'+''.join(badge(x,'language') for x in labels)+'</div>'
 if typ=='fragment':return '<div class="chat"><div class="bubble blue">'+esc(labels[0])+'</div><div class="bubble muted">… the message …</div><div class="bubble">'+esc(labels[1])+'</div></div>'
 if typ in ['livestream','remote']:
  return '<div class="browser"><div class="browser-top"><i></i><i></i><i></i><span>Service livestream · illustrative UI</span></div><div class="browser-picture">'+glyph('globe' if typ=='remote' else 'church')+'</div><div class="browser-caption">'+esc(labels[-1])+'</div></div>'
 if typ=='cta':return '<div class="cta-card"><span class="small-label">'+esc(labels[-1])+'</span><div class="cta-button">'+esc(labels[0])+' <span>↗</span></div><p>Exbabel.com</p></div>'
 return '<div class="center-hero">'+glyph('people')+'<div class="pills">'+''.join(badge(x) for x in labels)+'</div></div>'
assets=ROOT/'assets';assets.mkdir(exist_ok=True)
shutil.copyfile(ROOT/'node_modules/animejs/dist/bundles/anime.umd.min.js',assets/'anime.umd.min.js')
for p in [ROOT/'node_modules/animejs/LICENSE.md',ROOT/'node_modules/animejs/LICENSE']:
 if p.exists():shutil.copyfile(p,assets/'anime-LICENSE.txt');break
sections=[]
for s in d['scenes']:
 sections.append(f'''<section id="{s['id']}" class="clip layout-{s['layout']}" data-start="{s['startMs']/1000}" data-duration="{s['durationMs']/1000}" data-track-index="0">
 <div id="{s['id']}-visual" class="scene-visual">
 <div id="{s['id']}-brand" class="brand"><img src="assets/exbabel-mark.svg" alt="">Exbabel</div>
 <div class="scene-number">{s['id']} / 22</div>
 <h1 id="{s['id']}-headline">{esc(s['headline'])}</h1>
 <div id="{s['id']}-hero" class="hero">{hero(s)}</div>
 <div id="{s['id']}-detail" class="scene-note">One congregation. Understood.</div>
 </div></section>''')
embedded=json.dumps(d,ensure_ascii=False).replace('</','<\\/')
comp=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1920,height=1080"><title>Exbabel composition — schematic</title>
<link rel="stylesheet" href="composition.css"><script src="assets/anime.umd.min.js"></script></head><body>
<div id="root" data-composition-id="exbabel-storyboard" data-width="1920" data-height="1080" data-duration="{d['durationMs']/1000}" data-fps="30"><div class="backdrop"></div>{''.join(sections)}</div>
<script id="story-data" type="application/json">{embedded}</script><script src="composition.js"></script></body></html>'''
render_html=comp.replace('<link rel="stylesheet" href="composition.css">','<style>'+(ROOT/'composition.css').read_text()+'</style>').replace('<script src="composition.js"></script>','<script>'+(ROOT/'composition.js').read_text()+'</script>')
(ROOT/'index.html').write_text(render_html,encoding='utf8')
(ROOT/'storyboard.html').write_text((ROOT/'templates/storyboard.html').read_text().replace('__STORY_JSON__',embedded),encoding='utf8')
out=[(ROOT/'templates/blueprint-intro.md').read_text(),'\n## 3. Timeline overview\n\n| Section | Time | Function |\n|---|---|---|\n']
for name,a,b in [('Personal context',0,25500),('Scan, choose, listen',25500,36500),('Service and belonging',36500,73000),('Languages and online',73000,97500),('Operational setup',97500,117500),('Invitation and resolution',117500,151000)]:
 out.append(f'| {name} | {stamp(a)}–{stamp(b)} | Narrative section |\n')
out.append('\n325 whitespace-delimited words including personalization tokens; proposed 145 WPM plus scene breathing room = 151 seconds. Timing is not aligned to a recording yet. Milliseconds in JSON are exact authored estimates, not claimed speech timestamps.\n\n## 4. Master storyboard\n\n| Scene | Time | Duration | Voiceover (verbatim) | Visual and text | Camera / motion | Tool | Exit |\n|---|---|---|---|---|---|---|---|\n')
for s in d['scenes']:
 out.append(f"| {s['id']} — {s['title']} | {stamp(s['startMs'])}–{stamp(s['endMs'])} | {s['durationMs']/1000:g}s | {s['voiceover']} | **{s['headline']}** — {s['layout']}; labels: {' / '.join(s['labels'])}. | "+'; '.join(f"{b['atMs']/1000:g}s: {b['action']} ({b['durationMs']}ms)" for b in s['beats'])+f" | {s['tool']} | {s['transition']} |\n")
out.append('\n## 5. Frame compositions\n\nPercentages refer to 1920×1080. x/y are top-left in layer specs. These are planning diagrams, not product screenshots. Shared safe margin: 5%; preserve 8% lower zone when adding narration subtitles. Prototype layouts are schematic; production follows the boxes below.\n')
fence=chr(96)*3
for s in d['scenes']:
 title=s['layout'] in ['title','close','cta']
 wire=['+--------------------------------------------------+','| BRAND x5 y6                      '+s['id']+'             |',
 '|        HEADLINE '+('x8 y18 w84 h22' if title else 'x7 y14 w86 h18')+'                    |',
 '|                                                  |',
 '|     +--------------------------------------+     |',
 '|     | '+s['layout'].upper().ljust(15)+('x10 y43 w80 h39' if title else 'x13 y35 w74 h51')+'      |     |',
 '|     | primary subject / useful UI detail    |     |',
 '|     +--------------------------------------+     |',
 '|        DETAIL x12 y86 w76 h6                      |',
 '+--------------------------------------------------+']
 out.append(f"\n### {s['id']} — {s['title']}\n\n"+fence+'text\n'+'\n'.join(wire)+'\n'+fence+'\n')
out.append('\n## 6. Higgsfield shots\n\nThree optional cinematic plates; an all-graphic alternative uses the family/listener SVG compositions. No generation has run. Use one reference family and wardrobe across these shots. Human plates are adaptations for this script, not observed reference content.\n'+(ROOT/'HIGGSFIELD_PROMPTS.md').read_text())
out.append('\n## 7. HyperFrames scene specifications\n\nAll 22 units contain deterministic type/graphics. H shots are plates under HF overlays. Canvas 1920×1080, 30fps. JSON milliseconds become HTML seconds. Render-time clock belongs to HyperFrames. Shared styling: white/cyan field, shadow 0 24px 64px rgba(11,18,32,.13), radius 32px; masks on inner wrappers; sharp text; perspective 0, rotation 0, blur 0. Review prototype shows entrance/hold/exit; beat-specific interactions remain final production work.\n')
for s in d['scenes']:
 out.append(f"\n### HYPERFRAMES {s['id']} — {s['durationMs']/1000:g}s\n\nText: **{s['headline']}**. Supporting text: {'; '.join(s['labels'])}. Camera: {s['camera']['type']}. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.\n\n| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |\n|---|---:|---|---|\n")
 for layer in s['layers']:
  st=layer['initial'];out.append(f"| {layer['id']} — {layer['role']} | {layer['z']} | {layer['boxPct']} | {st['x']}px / {st['y']}px / {st['scale']} / {st['rotation']}deg / {st['opacity']} / {st['blur']}px |\n")
 out.append('\nAnimation (scene-local time):\n')
 for b in s['beats']:out.append(f"- {b['atMs']/1000:.3f}s for {b['durationMs']}ms: {b['action']}; {b['ease']} unless a hold.\n")
 out.append(f"\nExit: {s['transition']}; "+(f"begin in final 600ms, local {s['exit']['startsAtLocalMs']/1000:g}s. Fit source/destination handles inside the existing interval." if s['transition']!='HOLD' else "no fade; hold logo/URL through 150.9667s.")+f"\n\nMasks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: {', '.join(s['assets'])}. Nominal final-beat hold: {s['readHoldMs']/1000:g}s, less the exit window where applicable. Evidence link: {s['reference']}\n")
out.append('\n## 8. Transition library\n\nThese are authored Exbabel parameters, not recovered source curves. No added motion blur by default. A transition is included in the edit, not appended after it.\n\n| ID | Name | Duration | Source → destination | Ease | Mask / continuity |\n|---|---|---:|---|---|---|\n')
for t in d['transitions']:out.append(f"| {t['id']} | {t['name']} | {t['durationMs']}ms | {json.dumps(t['out'])} → {json.dumps(t['in'])} | {t['ease']} | {t['mask']} |\n")
out.append('\nT05: compute translation from selected detail bounds so its center lands at canvas center after scale. The JSON x=-160 example is a starting pose, not a universal value. T04: expand the blank outer surface and reveal inner text after 360ms to avoid stretching glyphs. T06: production reuses a persistent anchor DOM node; the schematic preview uses separate scene instances and does not claim to implement a shared-element morph.\n')
out.append((ROOT/'templates/blueprint-tail.md').read_text())
out.append('\n## 13. Final assembly timeline\n\nVO master starts at 00:00.000; re-time to recorded sentence boundaries. Picture filenames below are planned outputs, not existing movies. Transitions are included within the assigned intervals. Delivery: 1920×1080, 30fps, SDR. Final frame index 4529, at 150.9667s.\n\n| In–out | Planned picture | Plate / overlay | Proposed sound |\n|---|---|---|---|\n')
for s in d['scenes']:
 cue='; '.join(f"{stamp(s['startMs']+x['atMs'])}: {x['type']}" for x in s['audioCues']) or 'VO + quiet music bed'
 out.append(f"| {stamp(s['startMs'])}–{stamp(s['endMs'])} | HF_{s['id']}.mov | "+(f"H_{s['id']}.mov under HF text" if s['tool']!='HF' else 'HTML/SVG layers')+f" | {cue} |\n")
out.append('\nMusic: 00:00.000–02:31.000; 1.2s fade-in, duck under narration, taper final 2s while image stays still. Move proposed SFX off key syllables after narration alignment. No original reference audio is reused.\n\n## 14. Quality-control checklist\n\n- [ ] Replace plate/QR/UI placeholders with approved assets.\n- [ ] Record the entire supplied script; lock timings against recording.\n- [ ] Confirm offer terms and CTA links before publication.\n- [ ] Test long personalized names and multilingual glyphs.\n- [ ] Verify real listener UI, language options and working QR.\n- [ ] Implement all specified beats beyond schematic entrances.\n- [ ] Run HyperFrames checks/keyframe diagnostics on the final composition.\n- [ ] Inspect first frame, scene proof frames, transitions and final-minus-frame.\n- [ ] Audition licensed final audio; measure LUFS and true peak.\n- [ ] Review the 4:3 adaptation separately; supply static reduced-motion states.\n- [ ] Exclude original branding, school/shopping UI, soundtrack and player controls.\n\nCurrent checks are recorded in VALIDATION.md. The unchecked items above are final production work.\n')
(ROOT/'MASTER_VIDEO_PRODUCTION_BLUEPRINT.md').write_text(''.join(out),encoding='utf8')
print('Built storyboard.html, index.html and master blueprint')

