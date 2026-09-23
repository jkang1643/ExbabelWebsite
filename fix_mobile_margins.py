import glob
import re

files = glob.glob('/home/jkang1643/projects/exbabel/components/**/*.tsx', recursive=True)
files.append('/home/jkang1643/projects/exbabel/app/live/page.tsx')
files.append('/home/jkang1643/projects/exbabel/app/page.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # We want to replace margin: "-50px" with the dynamic string
    # E.g. viewport={{ once: true, margin: "-50px" }} -> viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "-50px" }}
    
    # Regex to find margin: "..." or margin: '-50px'
    def replacer(match):
        val = match.group(1)
        # Avoid double replacing
        if 'typeof window' in val:
            return match.group(0)
        return f"margin: typeof window !== 'undefined' && window.innerWidth < 768 ? \"300px\" : \"{val}\""

    content = re.sub(r'margin:\s*\"([^\"]+)\"', replacer, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated margins in {filepath}')
