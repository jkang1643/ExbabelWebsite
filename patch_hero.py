import os

path = '/home/jkang1643/projects/exbabel/components/GlassmorphicHero.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_h1_h2 = '''<h1 className=" sr-only\>Every
