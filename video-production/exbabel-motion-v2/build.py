"""Preserve all existing scene markup; replace its motion system and presentation chrome."""
import json,re,shutil,hashlib,sys,html as html_lib
from pathlib import Path
P=Path(__file__).resolve().parent
OLD=P.parent/'exbabel-film'
# User-locked scenes: neither motion nor copy may be rewritten by this builder.
# Refuse to silently replace either source if another editing session changes it.
LOCKED_HASHES={
    's01':'2accb7fe7ae7891c223e41abbccd5e89a9109d3a140bacd25cdae30e4f605665',
    's19':'64dec0626b58cfc8d4613d1982c52aa881d86b626b9ab645cf3eb2c3c035bd19',
}
for sid,expected in LOCKED_HASHES.items():
    actual=hashlib.sha256((OLD/'compositions'/f'{sid}.html').read_bytes()).hexdigest()
    assert actual==expected, f'{sid.upper()} is locked; source changed externally. Preserve it and review the baseline before rebuilding.'
data=json.loads((OLD/'production.json').read_text())
page=(OLD/'index.html').read_text()
sections=re.findall(r'<section\b.*?</section>',page,re.S)
assert len(sections)==19, 'Expected current source with locked S01/S02 and S19 subcompositions'
# One continuous world: no timed scene visibility controller competes with GSAP.
out=[]
copy_pass='--motion-only' not in sys.argv
revisions=json.loads((P/'copy-revisions.json').read_text()) if copy_pass else {}
assert not ({'S01','S02','S19'} & set(revisions)), 'Protected opening and S19 must never receive copy edits'
for scene in data['scenes']:
    if scene['id'] in revisions:
        revision=revisions[scene['id']]
        scene['headline']=' '.join(revision['lines'])
        scene['marketingCopy']=revision
(P/'production.json').write_text(json.dumps(data,indent=2,ensure_ascii=False))
for i,section in enumerate(sections):
    section=re.sub(r' class="scene clip"[^>]*>',f' class="scene" data-scene-index="{i}">',section,count=1)
    sid=re.search(r'\bid="(S\d+)"',section).group(1)
    if sid in revisions:
        revision=revisions[sid]
        lines=[]
        for j,line in enumerate(revision['lines']):
            line=html_lib.escape(line)
            if revision.get('accent')==j: line='<span class="accent">'+line+'</span>'
            elif revision.get('accentPhrase'): line=line.replace(html_lib.escape(revision['accentPhrase']),'<span class="accent">'+html_lib.escape(revision['accentPhrase'])+'</span>')
            lines.append(line)
        section=re.sub(r'(<h1\b[^>]*>).*?</h1>',lambda m:m[1]+'<br>'.join(lines)+'</h1>',section,count=1,flags=re.S)
        # Remove only old explanatory marketing paragraphs, preserving URL/button elements.
        section=re.sub(r'<p\b[^>]*>.*?</p>',lambda m:m[0] if re.search(r'class="(?:url|cta-button)"',m[0]) else '',section,flags=re.S)
        if revision.get('support'):
            section=section.replace('</h1>','</h1><p class="marketing-support">'+html_lib.escape(revision['support'])+'</p>',1)
        if revision.get('cta'):
            section=re.sub(r'(<span\b[^>]*class="cta-button"[^>]*>).*?</span>',lambda m:m[1]+revision['cta']+'</span>',section,count=1,flags=re.S)
        if sid=='S03':
            section=re.sub(r'(<div\b[^>]*class="phrase fragment f0"[^>]*>).*?</div>',lambda m:m[1]+'<small>THE SERMON</small>“Welcome to our service.”</div>',section,count=1,flags=re.S)
            section=re.sub(r'(<div\b[^>]*class="phrase fragment f2"[^>]*>).*?</div>',lambda m:m[1]+'But what if that’s only part of what they understand?</div>',section,count=1,flags=re.S)
    out.append(section)
css=re.search(r'<style>(.*?)</style>',page,re.S).group(1)+'\n'+(P/'motion.css').read_text()+'\n'+(P/'scene-graphics.css').read_text()
live=(P.parent.parent/'public/hero-assets/live-streaming-card.html').read_text()
live=re.search(r'<svg\b.*?</svg>',live,re.S).group(0)
live=re.sub(r'<style>.*?</style>','',live,flags=re.S)
live=re.sub(r'^<svg[^>]*>','<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">',live,count=1)
live=live.replace('\\n','').replace('videoGrad','livestream-videoGrad')
live=re.sub(r'<text x="250" y="(347|368)"',r'<text class="live-caption" text-anchor="middle" x="250" y="\1"',live)
live=live.replace('x="688" y="84"','x="696" y="84" text-anchor="end"').replace('cx="672" cy="80"','cx="632" cy="80"')
live=live.replace('</svg>','<rect class="live-language-highlight" x="289" y="406" width="182" height="30" rx="8" fill="none" stroke="#7282ff" stroke-width="2"/></svg>')
script='window.liveStreamSVG='+json.dumps(live)+';\n'+(P/'scene-graphics.js').read_text()+'\n'+(P/'motion.js').read_text()
shutil.copyfile(P/'node_modules/gsap/dist/gsap.min.js',P/'assets/gsap.min.js')
protected=''
for sid in ['S01','S19']:
    protected+=re.search(r'<div[^>]*id="'+sid+r'"[^>]*data-composition-src="[^"]+"[^>]*></div>',page).group(0)
    # Both subcompositions are canonical local sources; do not rewrite S19.
html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Exbabel — motion rebuild</title><style>'''+css+'''</style><script src="assets/gsap.min.js"></script></head><body><div id="film" data-composition-id="exbabel-motion-v2" data-width="1920" data-height="1080" data-duration="123.8"><div class="white-space"></div><div id="world" data-layout-allow-overflow="true">'''+''.join(out)+'''<div id="bridge" aria-label="Exbabel translation signal"><svg viewBox="0 0 100 100"><path d="M34 20h19L39 80H20zM62 20h19L67 80H48z" fill="white"/></svg></div></div><audio id="narration" src="assets/narration.wav" data-start="0" data-duration="123.8" data-track-index="10"></audio></div><script id="production-data" type="application/json">'''+json.dumps(data).replace('</',r'<\/')+'''</script><script>'''+script+'''</script></body></html>'''
html=html.replace('<div class="white-space"></div>','<div class="backdrop"></div><div class="white-space"></div>')
html=html.replace('<audio id="narration"',protected+'<audio id="narration"')
(P/'index.html').write_text(html)
print('Preserved 22 scenes; one continuous GSAP world; 123.8s')
if copy_pass:
    (P/'copy-pass-report.json').write_text(json.dumps({'revisedScenes':list(revisions),'protected':['S01','S02 (within S01)','S19'],'motionSha256':hashlib.sha256((P/'motion.js').read_bytes()).hexdigest(),'officialBrandLine':'Give your church one voice.'},indent=2))
