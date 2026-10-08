"""Build the production film from the approved storyboard and local SVG assets."""
import json, re, shutil, html
from pathlib import Path

P = Path(__file__).resolve().parents[1]
REPO = P.parents[1]
SOURCE = P.parent / 'exbabel-storyboard'
story = json.loads((SOURCE / 'storyboard.json').read_text())
E = html.escape

def extract(name):
    raw = (REPO / 'public/hero-assets' / name).read_text()
    svg = raw[raw.index('<svg'):raw.rindex('</svg>')+6]
    svg = re.sub(r'\sstyle="[^"]*"', '', svg)
    svg = svg.replace('stopColor=', 'stop-color=')
    svg = re.sub(r'<style>.*?</style>', '', svg, flags=re.S)
    svg = re.sub(r'<g key=0>.*?</g>', '''<g class="live-captions">
      <text x="20" y="150" fill="#b8c4d9" font-size="10">Live Translation:</text>
      <text class="caption-line" x="20" y="180" fill="#5ce0b2" font-size="12" font-weight="600">Bienvenidos a</text>
      <text class="caption-line" x="20" y="203" fill="#5ce0b2" font-size="12" font-weight="600">nuestro servicio.</text>
      <text class="caption-line" x="20" y="244" fill="#e2e8f0" font-size="11">Nos alegra estar</text>
      <text class="caption-line" x="20" y="265" fill="#e2e8f0" font-size="11">juntos hoy.</text>
    </g>''', svg, flags=re.S)
    # Caption and action colours are corrected for readable final product frames.
    svg = svg.replace('fill="#9ca3af"', 'fill="#64748b"')
    if 'mobile' not in name:
        svg = svg.replace('fill="#10b981"', 'fill="#087f5b"')
        svg = svg.replace('fill="#ef4444"', 'fill="#c92a32"')
    return svg

svgs = {'host':extract('translate-host-dashboard.html'), 'full':extract('translate.html'),
        'join':extract('translate-join-session.html'), 'phone':extract('translate-mobile-listener.html')}
for key, value in svgs.items():
    (P/'assets'/f'{key}.svg').write_text(value)

def svg_instance(kind, sid):
    svg = svgs[kind]
    ids = re.findall(r'id="([^"]+)"',svg)
    for ident in ids:
        svg=svg.replace(f'id="{ident}"',f'id="{sid}-{ident}"').replace(f'url(#{ident})',f'url(#{sid}-{ident})')
    return svg

def product(kind,sid,x,y,w):
    ratio={'host':460/720,'full':460/720,'join':370/300,'phone':2}[kind]
    return f'<div class="product {kind}" id="{sid}-product" style="left:{x}px;top:{y}px;width:{w}px;height:{w*ratio}px">{svg_instance(kind,sid)}</div>'

def copy(title,sub='',cls='copy'):
    return f'<div class="{cls}"><h1>{title}</h1>'+(f'<p>{sub}</p>' if sub else '')+'</div>'

def pills(items,top):
    return f'<div class="pills" style="top:{top}px">'+''.join(f'<div class="pill beat">{t}</div>' for t in items)+'</div>'

def wave():
    return '<div class="audio-wave">'+''.join(f'<i style="height:{[30,54,83,110,65,95,45,75,112,60,40,85,108,56,31][i]}px"></i>' for i in range(15))+'</div>'

def camera(content,stage='stage'):
    return f'<div class="{stage}"><div class="camera">{content}</div></div>'

def dashboard(s,kind='full'):
    return camera(product(kind,s,440,24,880), 'dashboard-stage')

def pointer(x,y):
    return f'<div class="pointer" style="left:{x}px;top:{y}px"><svg viewBox="0 0 36 44"><path d="M3 2L30 23L18 25L13 39Z" fill="#0b1220" stroke="white" stroke-width="2.5"/></svg></div><div class="ring" style="left:{x-28}px;top:{y-28}px"></div>'

def network(s):
    return '<div class="path-line beat" style="left:470px;top:570px;width:970px"></div>'+''.join(
        f'<div class="node beat {cl}" style="left:{x}px;top:415px;width:{w}px;height:300px">{label}<small>{sub}</small></div>'
        for x,w,label,sub,cl in [(100,440,'Church audio','Your existing setup',''),(710,500,'Exbabel','Live translation','ex'),(1380,440,'Your congregation','Their own phones','')])

def contents(s):
    n=int(s[1:])
    if n==1:
        return copy('Every voice.<br><span class="accent">One congregation.</span>','Live translation for your church.','center-copy')+pills(['Scan','Choose a language','Listen'],750)
    if n==2:
        return copy('A place for<br><span class="accent">every family.</span>','Picture your service this Sunday.')+'<div class="welcome-stack"><div class="welcome-word beat">Welcome.</div><div class="welcome-word beat">Bienvenidos.</div><div class="welcome-word beat">Bienvenue.</div><div class="welcome-word beat">Bem-vindos.</div></div>'
    if n==3:
        return copy('Present in<br>the room.<br><span class="accent">Missing the<br>message.</span>')+''.join(f'<div class="phrase fragment f{i}" style="top:{260+i*170}px"><small>{label}</small>{t}</div>' for i,(label,t) in enumerate([('THE SERMON','Welcome to our service.'),('WHAT THEY CATCH','Welcome ... our ...'),('WHAT MATTERS','The whole message. Everyone.')]))
    if n==4:
        return '<h1 class="top-title">One scan. <span class="accent">A way in.</span></h1>'+dashboard(s,'host')+'<div class="focus-tag">Scan the service QR code</div>'
    if n==5:
        return copy('Your language.<br><span class="accent">Your connection.</span>')+camera(product('join',s,1080,0,520)+pointer(1340,502))
    if n==6:
        return '<div class="center-copy"><div class="checkmark">&#10003;</div><h1>That\'s <span class="accent">pretty much it.</span></h1></div>'
    if n==7:
        return '<h1 class="top-title">Keep preaching. <span class="accent">We\'re listening.</span></h1>'+network(s)+'<div class="wave-zone" style="left:715px;top:745px;width:490px">'+wave()+'</div>'
    if n==8:
        return copy('Hear the sermon.<br><span class="accent">In your language.</span>','Through their own headphones.')+camera(product('phone',s,1180,5,335))+'<div class="wave-zone">'+wave()+'</div>'
    if n==9:
        return copy('Read along,<br><span class="accent">too.</span>','Translated captions, right on their phone.')+camera(product('phone',s,1160,0,350))
    if n==10:
        return copy('One service.<br><span class="accent">Together.</span>','No separate service for a visiting family.','center-copy')+pills(['Same sermon','Same congregation','Their language'],740)
    if n==11:
        return copy('Together.<br><span class="accent">And understood.</span>','','center-copy')+pills(['Same family','Same service','The whole message'],770)
    if n==12:
        return copy('Make room for<br><span class="accent">more languages.</span>','Choose the languages your community needs.')+''.join(f'<div class="language beat {cl}" style="left:{x}px;top:{y}px">{label}<small>{sub}</small></div>' for x,y,label,sub,cl in [(955,270,'Espa&#241;ol','Spanish','primary'),(1360,370,'Portugu&#234;s','Portuguese',''),(960,520,'Fran&#231;ais','French',''),(1350,640,'한국어','Korean','')])
    if n==13:
        return copy('In the room.<br><span class="accent">Online, too.</span>','','center-copy')
    if n==14:
        return '<h1 class="top-title">Your livestream. <span class="accent">More languages.</span></h1>'+dashboard(s)+'<div class="focus-tag">Connect your livestream audio</div>'
    if n==15:
        return copy('Across cities.<br><span class="accent">Across borders.</span>','Choose a language. Follow along.')+camera(product('join',s,1060,25,460))+pills(['Live audio','Translated captions'],820)
    if n==16:
        return '<h1 class="top-title">Fits into <span class="accent">Sunday morning.</span></h1>'+network(s)+pills(['Connect the audio setup you already use'],815)
    if n==17:
        return '<h1 class="top-title"><span class="step-title">Connect. Start. Share.</span></h1>'+dashboard(s)+ '<div class="focus-tag">Audio &#8594; Translation &#8594; QR code</div>'
    if n==18:
        return '<h1 class="top-title">Their phone. <span class="accent">Their language.</span></h1>'+camera(product('phone',s+'-a',520,120,255)+product('join',s+'-b',830,145,340)+product('phone',s+'-c',1260,120,255))
    if n==19:
        return copy('Try it during<br><span class="accent">a service.</span>','Make your next Sunday more welcoming.','center-copy')+pills(['Your congregation','Your message'],760)
    if n==20:
        return '<div class="trial-number beat">30</div><div class="trial-caption beat">days to try Exbabel</div>'+copy('Start your<br><span class="accent">free trial.</span>','<span class="cta-button">Exbabel.com</span>','copy trial-copy')
    if n==21:
        return copy('Let\'s walk through<br><span class="accent">your setup.</span>','Schedule a quick call with our team.')+'<div class="call-card"><h2>Your Sunday setup</h2>'+''.join(f'<div class="row beat"><span>&#10003;</span>{t}</div>' for t in ['Church audio','Translation session','Listener access'])+'<div class="cta-button beat" style="margin-top:25px">Schedule a quick call</div></div><div class="footer-url">Exbabel.com</div>'
    return copy('One congregation.<br><span class="final-word">Understood.</span>','<span class="url">Exbabel.com</span>','center-copy')

scenes=[]
for original in story['scenes']:
    s=dict(original)
    s['visualImplementation']='HTML/SVG product motion and kinetic typography only; no stock media'
    scenes.append(s)

# Optional explicit personalization overrides, selected by the user.
settings=json.loads((P/'settings.json').read_text()) if (P/'settings.json').exists() else {}
for s in scenes:
    if settings.get('generic'):
        s['voiceover']=s['voiceover'].replace('Hey [First Name]', 'Hey there').replace('[Church Name]', 'your church')

timing=json.loads((P/'narration-timing.json').read_text()) if (P/'narration-timing.json').exists() else None
duration_ms=timing['durationMs'] if timing else 151000
if timing:
    for s,t in zip(scenes,timing['scenes']):
        for field in ['startMs','endMs','durationMs']:
            s['original'+field[0].upper()+field[1:]]=s[field]
        s.update(startMs=t['startMs'],endMs=t['endMs'],durationMs=t['endMs']-t['startMs'])
production={'width':1920,'height':1080,'fps':30,'durationMs':duration_ms,'scenes':scenes,
            'cameraCues':json.loads((P/'camera-cues.json').read_text()),
            'cameraGuide':'../exbabel-storyboard/templates/product-focus-camera.md',
            'sourceAssets':list(svgs),'voice':settings.get('voice','pending')}
(P/'production.json').write_text(json.dumps(production,ensure_ascii=False,indent=2))

sections=[]; subtitles=[];srt=[]; cap_i=0
def stamp(ms):
    return f'{int(ms//3600000):02}:{int(ms//60000)%60:02}:{int(ms//1000)%60:02},{int(ms%1000):03}'
for s in scenes:
    sid=s['id']; start=s['startMs']/1000; duration=s['durationMs']/1000
    sections.append(f'<section id="{sid}" class="scene clip" data-start="{start}" data-duration="{duration}" data-track-index="1"><div class="visual">{contents(sid)}</div></section>')
    words=s['voiceover'].split(); chunks=[]; chunk=[]
    for w in words:
        chunk.append(w)
        if len(chunk)>=9 or (len(chunk)>=5 and w.endswith(('.',',','?'))):
            chunks.append(' '.join(chunk)); chunk=[]
    if chunk:chunks.append(' '.join(chunk))
    # Avoid a one-word caption flashing briefly at the end of a sentence.
    if len(chunks)>1 and len(chunks[-1].split())<3:
        tail=chunks.pop()
        chunks[-1]+=' '+tail
    total=sum(len(c.split()) for c in chunks); offset=0;word_offset=0
    timed_words=next(t['words'] for t in timing['scenes'] if t['id']==sid) if timing else None
    for chunk in chunks:
        length=len(chunk.split())/total*(s['durationMs']-600); a=s['startMs']+200+offset; b=a+length
        if timed_words:
            group=timed_words[word_offset:word_offset+len(chunk.split())]
            a=group[0]['startMs'];b=group[-1]['endMs'];length=b-a
            word_offset+=len(chunk.split())
        cap_i+=1
        subtitles.append(f'<div id="cap-{cap_i}" class="caption clip" data-start="{a/1000:.4f}" data-duration="{length/1000:.4f}" data-track-index="5"><span>{E(chunk)}</span></div>')
        srt.append(f'{cap_i}\n{stamp(a)} --> {stamp(b)}\n{chunk}\n');offset+=length
(P/'captions.srt').write_text('\n'.join(srt))
audio=''
for filename,ident,volume,track in [('narration.wav','narration',1,10),('music.wav','music-bed',.22,11),('sfx.wav','sound-design',.55,12)]:
    if (P/'assets'/filename).exists():
        audio+=f'<audio id="{ident}" src="assets/{filename}" data-start="0" data-duration="{duration_ms/1000}" data-track-index="{track}" data-volume="{volume}"></audio>'
css=(P/'film.css').read_text()+'\n.trial-copy{left:850px;top:305px;width:900px}.trial-copy h1{font-size:100px}\n'
js=(P/'film.js').read_text()
page='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Exbabel - One congregation. Understood.</title><style>'+css+'</style><script src="assets/anime.umd.min.js"></script></head><body><div id="film" data-composition-id="exbabel-film" data-width="1920" data-height="1080" data-duration="151"><div class="backdrop"></div><div class="brand"><i></i><b>Exbabel</b></div><div class="edition">One congregation. Understood.</div><div class="divider"></div>'+''.join(sections)+''.join(subtitles)+'<div class="progress"></div>'+audio+'</div><script id="production-data" type="application/json">'+json.dumps(production,ensure_ascii=False).replace('</','<\/')+'</script><script>'+js+'</script></body></html>'
page=page.replace('data-duration="151"',f'data-duration="{duration_ms/1000}"')
(P/'index.html').write_text(page)
print(f'Built {len(scenes)} scenes, {cap_i} caption phrases, {duration_ms/1000}s')
