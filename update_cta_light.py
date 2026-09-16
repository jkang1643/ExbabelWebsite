import os
import re

cta_path = '/home/jkang1643/projects/exbabel/components/CTA.tsx'
with open(cta_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace DarkHeroAuroraBackground with NetworkAuroraBackground
content = content.replace('import DarkHeroAuroraBackground from "./DarkHeroAuroraBackground";', 'import NetworkAuroraBackground from "./NetworkAuroraBackground";')
content = content.replace('<DarkHeroAuroraBackground />', '<NetworkAuroraBackground />')

# Update section background
content = content.replace('bg-[#0B1220] text-white', 'bg-[#FAFBFF] text-base-ink')

# Update badges
content = content.replace('bg-white/10 text-[#D6F5FF] border border-white/20', 'bg-white text-slate-700 border border-slate-200 shadow-sm')
content = content.replace('bg-[#394dfe]/20 text-cyan-300 border border-[#394dfe]/40', 'bg-blue-50 text-[#394dfe] border border-[#394dfe]/30 shadow-sm')

# Update headlines
content = content.replace('text-white', 'text-base-ink')
content = content.replace('text-slate-300', 'text-slate-600')

# Update buttons
content = content.replace('bg-white/10 hover:bg-white/20 border border-white/20 text-white', 'bg-white hover:bg-slate-50 border border-slate-200 text-base-ink shadow-sm')

# Update verification checklist
content = content.replace('text-[#D6F5FF]', 'text-slate-700')

# Update Status Metrics Box
content = content.replace('bg-white/5 backdrop-blur-md border border-white/10', 'bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl')
content = content.replace('text-[#D6F5FF]', 'text-slate-800')
content = content.replace('text-slate-400', 'text-slate-500')

# Wait, the first metric was text-[#D6F5FF] which we just replaced. 
# Let's fix the first metric explicitly if it didn't get caught correctly.
content = content.replace('text-4xl md:text-5xl font-black text-slate-700 font-mono', 'text-4xl md:text-5xl font-black text-slate-800 font-mono')
content = content.replace('border-white/10', 'border-slate-200')

with open(cta_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CTA.tsx to light theme")