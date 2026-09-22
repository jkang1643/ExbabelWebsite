import os

# 1. HowItWorksGraphic.tsx
file1 = '/home/jkang1643/projects/exbabel/components/HowItWorksGraphic.tsx'
with open(file1, 'r', encoding='utf-8') as f:
    c1 = f.read()
c1 = c1.replace('whileInView={{ pathLength: 1, .15 }}', 'whileInView={{ pathLength: 1 }}')
with open(file1, 'w', encoding='utf-8') as f:
    f.write(c1)

# 2. FeatureShowcase.tsx
file2 = '/home/jkang1643/projects/exbabel/components/FeatureShowcase.tsx'
with open(file2, 'r', encoding='utf-8') as f:
    c2 = f.read()
c2 = c2.replace(", .4 }} />", " }} />")
with open(file2, 'w', encoding='utf-8') as f:
    f.write(c2)

# 3. InterfacePreview.tsx
file3 = '/home/jkang1643/projects/exbabel/components/InterfacePreview.tsx'
with open(file3, 'r', encoding='utf-8') as f:
    c3 = f.read()
c3 = c3.replace('whileInView={{ .85, scale: 1 }}', 'whileInView={{ scale: 1 }}')
with open(file3, 'w', encoding='utf-8') as f:
    f.write(c3)

print("Fixed the 3 specific orphaned decimals.")
