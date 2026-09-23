"""Export a readable assembly sheet for the final spoken edit."""
import json
from pathlib import Path
P=Path(__file__).resolve().parents[1]
d=json.loads((P/'production.json').read_text())
def tc(ms):
    return f'{ms//60000:02}:{ms//1000%60:02}.{ms%1000:03}'
lines=['# Final narrated assembly','',f"1920 × 1080, 30 fps; {d['durationMs']/1000:.1f} seconds. Entirely HTML/SVG. Narration: ElevenLabs Roger.",'',
       'The main HTML composition renders each visual scene on track 1. Caption clips use track 5. Narration occupies track 10 from 00:00.000 to the end, including a 300ms lead and a silent end hold. Scene exits use a short upward fade, mapped to actual spoken timing. The outgoing visual fades over the shared pale background; the incoming title resolves with outQuint easing. No generated or recorded visual footage is required.','',
       '| Scene | In | Out | Narration | Camera target |','|---|---|---|---|---|']
for s in d['scenes']:
    cues=[c['subject'] for c in d['cameraCues'] if c['scene']==s['id']]
    lines.append(f"| {s['id']} | {tc(s['startMs'])} | {tc(s['endMs'])} | {s['voiceover']} | {' → '.join(cues) or 'Static composition with element entrances'} |")
lines+=['','See production.json for editable scene data, camera-cues.json for source coordinates, narration-timing.json for word alignment, and film.js for deterministic animation. OriginalStartMs/originalEndMs/originalDurationMs preserve the authored motion timing; each scene maps that choreography to the final spoken window.']
(P/'FINAL-ASSEMBLY.md').write_text('\n'.join(lines)+'\n')
