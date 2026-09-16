import os
path = '/home/jkang1643/projects/exbabel/components/ChurchTranslationIntro.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = '"use client";\n' + c

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print("Added use client to ChurchTranslationIntro.tsx")