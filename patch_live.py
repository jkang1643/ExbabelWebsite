import os

path_layout = '/home/jkang1643/projects/exbabel/app/live/layout.tsx'
with open(path_layout, 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_content = layout_content.replace(
    'title: "Live Video Translation"',
    'title: "Live Video Translation & AI Voiceover"
)
layout_content = layout_content.replace(
    'description: "Transform your church livestream into a multilingual experience with real-time AI voice translation, live video overlays, and synchronized captions in 60+ languages."',
    'description: "Translate church livestreams and live events in real time with AI voice translation, multilingual captions and synchronized video. Works with OBS, vMix, RTMP and more."'
)
layout_content = layout_content.replace('url: "https://exbabel.com/live"', 'url: "https://www.exbabel.com/live"')
layout_content = layout_content.replace('url: "https://exbabel.com/live" }]', 'url: "https://www.exbabel.com/live" }]')

with open(path_layout, 'w', encoding='utf-8') as f:
    f.write(layout_content)

path_page = '/home/jkang1643/projects/exbabel/app/live/page.tsx'
with open(path_page, 'r', encoding='utf-8') as f:
    page_content = f.read()

# old:
# <h1 className="sr-only">Exbabel Live Video Translation</h1>
# new:
# <h1 className="sr-only">Live Video Translation for Churches & Events</h1>
page_content = page_content.replace(
    ('<h1 className="sr-only">Exbabel Live Video Translation</h1>'),
    ('<h1 className="sr-only">Live Video Translation for Churches & Events</h1>')
)
	# old:
# <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-slate-600 mt-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
#   Speak Once. Reach Every Language.
# </motion.h2>
# new:
# <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-slate-600 mt-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
#   Translate Church Livestreams in Real Time
# </motion.h2>
page_content = page_content.replace(
    ("Speak Once. Reach Every Language."),
    ("Translate Church Livestreams in Real Time")
)

with open(path_page, 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Patched live layout. and page.tsx")