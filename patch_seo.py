import os

def update_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Update app/layout.tsx
update_file('/home/jkang1643/projects/exbabel/app/layout.tsx', [
    ('metadataBase: new URL("https://exbabel.com")', 'metadataBase: new URL("https://www.exbabel.com")'),
    ('default: "Exbabel - AI Speech-to-Speech Translation Platform"', 'default: "Church Translation System & Live AI Translation | Exbabel"'),
    ('"The complete real-time speech-to-speech AI translation platform for churches, conferences, and live events. Translate live video, audio, and captions into 180+ languages."', '"Real-time church translation for sermons, services and livestreams. Deliver AI-translated speech and live captions to listeners in multiple languages on any device."'),
    ('url: "https://exbabel.com"', 'url: "https://www.exbabel.com"'),
    ('title: "Exbabel - AI Speech-to-Speech Translation Platform"', 'title: "Church Translation System & Live AI Translation | Exbabel"'),
])

print("Patched layout.tsx")