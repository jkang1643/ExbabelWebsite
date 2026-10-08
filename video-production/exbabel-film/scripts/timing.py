"""Map the approved script to recognized word times without rewriting its copy."""
import json,re,difflib,math
from pathlib import Path
P=Path(__file__).resolve().parents[1]
scenes=json.loads((P.parent/'exbabel-storyboard/storyboard.json').read_text())['scenes']
recognized=json.loads((P/'narration-words.json').read_text())
rate=.9; lead=.3
def norm(s):return re.sub(r'[^a-z0-9]','',s.lower())
script=[]; ranges=[]
for s in scenes:
    words=s['voiceover'].replace('Hey [First Name]','Hey there').replace('[Church Name]','your church').split()
    ranges.append((len(script),len(script)+len(words)));script+=words
matcher=difflib.SequenceMatcher(None,[norm(x) for x in script],[norm(w['word']) for w in recognized],autojunk=False)
times=[None]*len(script);changes=[]
for op,a,b,c,d in matcher.get_opcodes():
    if op=='equal':
        for i,j in zip(range(a,b),range(c,d)):times[i]=[recognized[j]['start'],recognized[j]['end']]
    elif b>a:
        start=recognized[c]['start'] if c<len(recognized) else recognized[-1]['end']
        end=recognized[d-1]['end'] if d>c else start+.05
        for i in range(a,b):times[i]=[start+(end-start)*(i-a)/(b-a),start+(end-start)*(i-a+1)/(b-a)]
        changes.append({'script':' '.join(script[a:b]),'recognized':' '.join(x['word'] for x in recognized[c:d]),'start':start,'end':end})
words=[{'word':word,'startMs':round((t[0]/rate+lead)*1000),'endMs':round((t[1]/rate+lead)*1000)} for word,t in zip(script,times)]
starts=[0]
for a,b in ranges[1:]:
    starts.append(round((words[a-1]['endMs']+words[a]['startMs'])/2))
end=math.ceil((recognized[-1]['end']/rate+lead+1.5)*30)/30*1000
result={'durationMs':round(end),'audioRate':rate,'leadMs':300,'scenes':[],'alignmentDifferences':changes}
for i,(s,(a,b)) in enumerate(zip(scenes,ranges)):
    result['scenes'].append({'id':s['id'],'startMs':starts[i],'endMs':starts[i+1] if i+1<len(starts) else round(end),'words':words[a:b]})
(P/'narration-timing.json').write_text(json.dumps(result,indent=2))
print(json.dumps({'durationMs':result['durationMs'],'scenes':[{k:v for k,v in s.items() if k!='words'} for s in result['scenes']],'differences':changes},indent=2))
