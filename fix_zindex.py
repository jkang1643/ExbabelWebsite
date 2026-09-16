import os

path = '/home/jkang1643/projects/exbabel/components/HeroAuroraBackground.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Remove bg color and change -z-10 to z-0
c = c.replace('bg-[#FAFBFF]', '')
c = c.replace('-z-10', 'z-0')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Fixed z-index in HeroAuroraBackground.tsx")