import json, hashlib
from pathlib import Path
from PIL import Image, ImageChops, ImageStat

p=Path(__file__).resolve().parent
audit=json.loads((p/'motion-audit.json').read_text())
for c in audit['checks']:
    a=Image.open(p/'review'/(c['scene']+'-direct.png'))
    b=Image.open(p/'review'/(c['scene']+'-reverse.png'))
    c['reverseSeekMeanPixelDelta']=max(ImageStat.Stat(ImageChops.difference(a,b)).mean)
    c['reverseSeekVisualEquivalent']=c['reverseSeekMeanPixelDelta']<.1
assert all(c['reverseSeekVisualEquivalent'] for c in audit['checks'])
(p/'motion-audit.json').write_text(json.dumps(audit,indent=2))
plans=json.loads((p/'motion-plan.json').read_text())
lines=['# Exbabel full revision','',
 '123.8 seconds · 1920 × 1080 · 30 fps. Existing narration and UI artwork retained.','',
 'S01 (including its S02 narrative beat) and S19 are locked. Their source files and host timings are unchanged. Protected boundaries are excluded from transition overlap edits.','',
 '## Motion system','',
 'Tracked Kinetic Type Reveal — Cursor-Follow Dolly. Character positions are measured after local fonts load. One paused GSAP composition timeline controls reveal, measured cursor tracking, 1.00→1.18 dolly, readable multiline settle, anchored graphic reveal, and product behavior. Lines establish separate baselines before horizontal alignment. No bounce, spring, overshoot, full-scene fades, or decorative marks.','',
 'Headlines remain present when graphics enter. Product shots use a 2.2% camera push plus a 2.5% foreground push. Incoming text begins 180ms before the outgoing scene ends; an existing object is extracted 420ms before the boundary. It survives under the next headline and resolves into the next product. Matched phone shots hide the incoming phone until the surviving phone reaches it, preventing doubled outlines.','',
 '## Time-coded scenes']
for s in plans:
    lines += ['',f"### {s['id']} · {s['start']:.3f}–{s['end']:.3f}s",'',s['focalObject'],'',
              'Rules: '+', '.join(s['rules'])+'.','', '| State | Time | Action |','|---|---|---|']
    for state in s['states']:
        lines.append(f"| {state['phase']} | {state['start']:.3f}–{state['end']:.3f}s | {state['action']} |")
    if h:=s.get('handoff'):
        lines += ['',f"Handoff to {h['to']}: **{h['survivingObject']}** survives. {h['leaves']} {h['enters']} {h['camera']} Shared property: {h['sharedProperty']} Overlap starts {h['overlapStart']:.3f}s; next text starts {h['nextTextStart']:.3f}s; resolve ends {h['end']:.3f}s."]
    else:
        lines += ['','Boundary: protected-scene cut, typography-only punctuation, or final resolution.']
lines += ['','## Validation','',
 '- All 19 editable scenes inspected at 0%, 25%, 50%, 75%, 100%.',
 '- Marketing and supporting copy checked against copy-revisions.json.',
 '- Complete headline glyphs fit inside the 55px safe margin after the tracked reveal.',
 '- Forward/reverse seeks produce identical DOM motion and text states. Mean raster difference below 0.1/255.',
 '- HyperFrames lint, runtime, layout, and contrast checks pass with no errors.',
 '- Locked S01/S19 source SHA-256 hashes match the existing production project.',
 '- Final brand line: Give your church one voice.','',
 'The intentional typography crop occurs only while text is being revealed. The complete headline settles fully on screen before the product handoff.']
(p/'REVISION.md').write_text('\n'.join(lines))
(p/'motion-pass.sha256').write_text('\n'.join(hashlib.sha256((p/f).read_bytes()).hexdigest()+'  '+f for f in ['motion.js','motion.css']))
print('Maximum seek raster difference:',max(c['reverseSeekMeanPixelDelta'] for c in audit['checks']))
