import os
p = '/home/jkang1643/projects/exbabel/app/live/layout.tsx'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('title: "Live Video Translation"', 'title: "Live Video Translation & AI Voiceover"')
c = c.replace('description: "Transform your church livestream into a multilingual experience with real-time AI voice translation, live video overlays, and synchronized captions in 60+ languages."', 'description: "Translate church livestreams and live events in real time with AI voice translation, multilingual captions and synchronized video. Works with OBS, vMix, RTMP and more."')
c = c.replace('url: "https://exbabel.com/live"', 'url: "https://www.exbabel.com/live"')
with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

p2 = '/home/jkang1643/projects/exbabel/app/live/page.tsx'
with open(p2, 'r', encoding='utf-8') as f:
    c2 = f.read()
c2 = c2.replace('<h1 className="sr-only">Exbabel Live Video Translation</h1>', '<h1 className="sr-only">Live Video Translation for Churches & Events</h1>')
c2 = c2.replace('Speak Once. Reach Every Language.', 'Translate Church Livestreams in Real Time')
with open(p2, 'w', encoding='utf-8') as f:
    f.write(c2)
print('Patched live')