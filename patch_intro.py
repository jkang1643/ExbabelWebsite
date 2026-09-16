import os

intro_content = """import React from 'react';
import { motion } from 'framer-motion';

export default function ChurchTranslationIntro() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="layout-spine max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: \"-100px\" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-ink mb-6" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            A Church Translation System Built for Live Services
          </h2>
          <p className="text-lg md:text-xl text-base-muted leading-relaxed">
            Traditional church translation systems often require interpreters, wireless receivers, transmitters, translation booths, or dedicated translation equipment. Exbabel delivers translated speech and captions through the devices attendees already carry, allowing churches to translate sermons and services without distributing specialized hardware.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
"""

with open('/home/jkang1643/projects/exbabel/components/ChurchTranslationIntro.tsx', 'w', encoding='utf-8') as f:
    f.write(intro_content)

# Patch app/page.tsx
path = '/home/jkang1643/projects/exbabel/app/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Add import
import_str = 'import GlassmorphicHero from "@/components/GlassmorphicHero";n'
new_import_str = import_str + 'const ChurchTranslationIntro = dynamic(() => import("@/components/ChurchTranslationIntro"), {\n  loading: () => <section className="py-16" aria-hidden />,\n});\n'
page_content = page_content.replace(import_str, new_import_str)

# Insert component
showcase_str = '<VideoShowcase />\n'
new_showcase_str = showcase_str + '        <ChurchTranslationIntro />\n'
page_content = page_content.replace(showcase_str, new_showcase_str)

with open(path, 'w', encoding='utf-8') as f:
    f.write(page_content)
print("Added ChurchTranslationIntro and patched page.tsx")