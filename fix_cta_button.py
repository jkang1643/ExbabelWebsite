import os

cta_path = '/home/jkang1643/projects/exbabel/components/CTA.tsx'
with open(cta_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix primary button text
content = content.replace('bg-[#394dfe] hover:bg-[#394dfe]/90 text-base-ink', 'bg-[#394dfe] hover:bg-[#394dfe]/90 text-white')

with open(cta_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed button text color")