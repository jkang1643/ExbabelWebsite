"""Derive word timestamps from the generated narration; retain source text for captions."""
import json
from pathlib import Path
from faster_whisper import WhisperModel
P=Path(__file__).resolve().parents[1]
model=WhisperModel('base.en',device='cpu',compute_type='int8',cpu_threads=4)
segments,info=model.transcribe(str(P/'assets/voice-takes/1.mp3'),word_timestamps=True,beam_size=5,
    initial_prompt='Exbabel. Live church translation. QR code. Exbabel.com.',vad_filter=False)
words=[]
for seg in segments:
    print(f'{seg.start:.2f}-{seg.end:.2f}: {seg.text}',flush=True)
    words.extend([dict(word=w.word.strip(),start=w.start,end=w.end,probability=w.probability) for w in seg.words])
(P/'narration-words.json').write_text(json.dumps(words,indent=2))
