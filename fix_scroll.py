import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Remove filter: blur(...) from initial and whileInView props
    # Pattern: filter: "blur(XYZ)"
    content = re.sub(r'filter:\s*\"blur\([^)]+\)\"\s*,?\s*', '', content)
    content = re.sub(r',\s*filter:\s*\"blur\([^)]+\)\"', '', content)

    # 2. Add viewport={{ once: true, margin: "-50px" }} to whileInView if missing.
    # Look for whileInView={...} or whileInView="visible" 
    # If the file does NOT contain viewport={{, we can just replace whileInView=... with whileInView=... viewport={{ once: true, margin: "-50px" }}
    
    # Actually, we can use a regex to find whileInView={...} or whileInView="..." 
    # and append viewport={{ once: true, margin: "-50px" }} if it's not already there.
    # To avoid double viewport, we can just do a dumb replace, then fix duplicates.
    
    # Find all whileInView instances
    def replacer(match):
        text = match.group(0)
        return text + ' viewport={{ once: true, margin: "-50px" }}'

    # Regex: whileInView=\{[^}]+\} or whileInView="[^"]+"
    # But ONLY if the file doesn't already have viewport={{ once: true
    # Wait, some components have multiple whileInViews, some with viewport, some without.
    # Let's just add it, and then deduplicate.
    
    content = re.sub(r'(whileInView=\{[^}]+\})', replacer, content)
    content = re.sub(r'(whileInView="[^"]+")', replacer, content)

    # Clean up double viewports
    # If a line has viewport={{ once: true, margin: "-50px" }} viewport={{ once: true }}, remove the second one.
    content = re.sub(r'viewport=\{\{\s*once:\s*true[^}]*\}\}\s*viewport=\{\{\s*once:\s*true[^}]*\}\}', 'viewport={{ once: true, margin: "-50px" }}', content)
    
    # Also if it originally had viewport={{ once: true }} and we appended our new one
    content = re.sub(r'viewport=\{\{.*?\}\}\s*viewport=\{\{ once: true, margin: "-50px" \}\}', 'viewport={{ once: true, margin: "-50px" }}', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

files = glob.glob('/home/jkang1643/projects/exbabel/components/**/*.tsx', recursive=True)
files.append('/home/jkang1643/projects/exbabel/app/live/page.tsx')

for f in files:
    process_file(f)

print('Done!')
