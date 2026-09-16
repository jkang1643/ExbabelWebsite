import os

path = '/home/jkang1643/projects/exbabel/app/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

import_str = '''const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {
  loading: () => <section className="py-12 md:py-32" aria-hidden />,
});
const ChurchTranslationIntro = dynamic(() => import("@/components/ChurchTranslationIntro"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});'''

content = content.replace('const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {\n  loading: () => <section className="py-12 md:py-32" aria-hidden />,\n});', import_str)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added ChurchTranslationIntro import to app/page.tsx")