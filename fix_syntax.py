import os

path = '/home/jkang1643/projects/exbabel/components/GlassmorphicHero.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

bad_string = '''            <p
              className="text-2xl md:text-3xl font-bold text-primary/80 leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3 mb-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span className="text-base-ink/80">Every voice.</span>
              <span className="text-primary inline-grid text-left">
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>Every voice.</span>
              <span className="text-primary inline-grid text-left">'''

good_string = '''            <p
              className="text-2xl md:text-3xl font-bold text-primary/80 leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3 mb-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span className="text-base-ink/80">Every voice.</span>
              <span className="text-primary inline-grid text-left">'''

content = content.replace(bad_string, good_string)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed GlassmorphicHero.tsx syntax error")