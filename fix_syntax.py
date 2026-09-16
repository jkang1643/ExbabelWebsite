import glob
import re

files = glob.glob('/home/jkang1643/projects/exbabel/components/**/*.tsx', recursive=True)
files.append('/home/jkang1643/projects/exbabel/app/live/page.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Fix the missing brace from the regex mistake
    content = content.replace('} viewport={{ once: true, margin: "-50px" }}}', '}} viewport={{ once: true, margin: "-50px" }}')
    content = content.replace('} viewport={{ once: true, margin: "-50px" }}', '}} viewport={{ once: true, margin: "-50px" }}')

    # Remove duplicated viewport on the same or next lines.
    content = re.sub(r'viewport=\{\{\s*once:\s*true,\s*margin:\s*"-50px"\s*\}\}\s*viewport=', 'viewport=', content)
    content = re.sub(r'viewport=\{\{\s*once:\s*true,\s*margin:\s*"-50px"\s*\}\}\s*\n\s*viewport=', '\n            viewport=', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed syntax in {filepath}')
