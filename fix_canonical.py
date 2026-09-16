import os

layout_path = '/home/jkang1643/projects/exbabel/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_content = layout_content.replace('  alternates: { canonical: "/" },\n', '')

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_content)

page_path = '/home/jkang1643/projects/exbabel/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

if 'export const metadata' not in page_content:
    new_metadata = '''
export const metadata = {
  alternates: { canonical: "/" },
};
'''
    page_content = page_content.replace('export default function Home() {', new_metadata + '\nexport default function Home() {')
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(page_content)

print("Fixed layout canonicals")