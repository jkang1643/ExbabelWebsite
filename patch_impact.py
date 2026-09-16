import os
p = '/home/jkang1643/projects/exbabel/app/impact/layout.tsx'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'title: "Global Impact",',
    'title: "Supported Translation Languages & AI Voices",'
)
c = c.replace(
    'description: "See how Exbabel is breaking language barriers across the globe with real-time AI translation supporting 180+ languages, 90+ AI voices, and 190+ countries.",',
    'description: "Explore the languages, dialects and AI voices supported by Exbabel for real-time speech translation, captions and multilingual live events.",'
)
with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

p2 = '/home/jkang1643/projects/exbabel/components/impact/ImpactHero.tsx'
with open(p2, 'r', encoding='utf-8') as f:
    c2 = f.read()

c2 = c2.replace('<h1 className="sr-only">Breaking Language Barriers Across the Globe</h1>', '')
c2 = c2.replace('</motion.h2>', '</motion.h1>')
c2 = c2.replace('<motion.h2', '<motion.h1')
c2 = c2.replace('Breaking Language Barriers{" "}\n                    <br className="hidden md:block" />\n                    Across the Globe', 'Languages and AI Voices Supported by Exbabel')

with open(p2, 'w', encoding='utf-8') as f:
    f.write(c2)
print("Patched impact")