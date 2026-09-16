import os

path = '/home/jkang1643/projects/exbabel/app/demo/layout.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('title: "Book a Demo"', 'title: "Schedule an Exbabel Demo"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

path2 = '/home/jkang1643/projects/exbabel/components/BookADemo.tsx'
with open(path2, 'r', encoding='utf-8') as f:
    c2 = f.read()

c2 = c2.replace('<motion.h2 \n            className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#1d1c1d]"\n            initial={{ opacity: 0, y: 20 }}\n            whileInView={{ opacity: 1, y: 0 }}\n            viewport={{ once: true }}\n            style={{ fontFamily: \\'var(--font-sora), sans-serif\\' }}\n          >\n            See Exbabel in Action\n          </motion.h2>',
'<motion.h1 \n            className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#1d1c1d]"\n            initial={{ opacity: 0, y: 20 }}\n            whileInView={{ opacity: 1, y: 0 }}\n            viewport={{ once: true }}\n            style={{ fontFamily: \\'var(--font-sora), sans-serif\\' }}\n          >\n            Schedule an Exbabel Demo\n          </motion.h1>')

# Since formatting might be slightly off in replace, let's do a substring replace
c2 = c2.replace('See Exbabel in Action', 'Schedule an Exbabel Demo')
c2 = c2.replace('<motion.h2', '<motion.h1').replace('</motion.h2>', '</motion.h1>')

with open(path2, 'w', encoding='utf-8') as f:
    f.write(c2)

print("Patched demo")