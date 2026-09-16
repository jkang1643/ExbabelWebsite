import glob
import re

# 1. Update app/page.tsx to use static imports
page_path = '/home/jkang1643/projects/exbabel/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Replace dynamic imports with static ones
dynamic_pattern = r'const\s+([A-Za-z0-9_]+)\s*=\s*dynamic\(\(\)\s*=>\s*import\("@/components/[^"]+"\),\s*\{\s*loading:\s*\(\)\s*=>.*?\s*\}\s*\);'
# Actually, it's easier to just do a manual replace of the dynamic block since they are all together
static_imports = """
import InterfacePreview from "@/components/InterfacePreview";
import WhyChurchesChoose from "@/components/WhyChurchesChoose";
import VideoLibrarySection from "@/components/VideoLibrarySection";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ImpactStats from "@/components/ImpactStats";
import FAQ from "@/components/FAQ";
import AsSeenOn from "@/components/AsSeenOn";
import TechnicalRequirements from "@/components/TechnicalRequirements";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CookiesPopup from "@/components/CookiesPopup";
"""

page_content = re.sub(r'const InterfacePreview = dynamic.*\}\);', static_imports.strip(), page_content, flags=re.DOTALL)
page_content = page_content.replace('import dynamic from "next/dynamic";\n', '')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)
print("Updated app/page.tsx to use static imports")

# 2. Update all viewport margins to 300px so they trigger earlier
files = glob.glob('/home/jkang1643/projects/exbabel/components/**/*.tsx', recursive=True)
files.append('/home/jkang1643/projects/exbabel/app/live/page.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Change -50px, -100px, -40px, -60px to 300px
    content = re.sub(r'margin:\s*"-[0-9]+px"', 'margin: "300px"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated margins across components")
