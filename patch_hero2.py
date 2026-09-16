import os

path = '/home/jkang1643/projects/exbabel/components/GlassmorphicHero.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_h1_h2 = '''<h1 className="sr-only">Every voice. Every language. One service.</h1>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3"'''

new_h1_h2 = '''<p
              className="text-2xl md:text-3xl font-bold text-primary/80 leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3 mb-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span className="text-base-ink/80">Every voice.</span>
              <span className="text-primary inline-grid text-left">'''

content = content.replace(old_h1_h2, new_h1_h2)

old_h2_end = '''</span>
            </h2>'''

new_h2_end = '''</span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.15] tracking-tight text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Real-Time AI Translation for Churches and Live Events
            </h1>'''

content = content.replace(old_h2_end, new_h2_end)

old_p = '''The real-time AI translation platform trusted by churches and institutions worldwide to deliver live speech, captions, and audio — simultaneously, in over 200 languages.'''
new_p = '''Exbabel is a real-time church translation system for sermons, worship services, livestreams, conferences, and live events. Translate speech into natural AI audio and live captions so every listener can follow in their language from any device.'''

content = content.replace(old_p, new_p)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched GlassmorphicHero.tsx")