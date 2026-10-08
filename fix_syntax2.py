import glob
import re

files = glob.glob('/home/jkang1643/projects/exbabel/components/**/*.tsx', recursive=True)
files.append('/home/jkang1643/projects/exbabel/app/live/page.tsx')
files.append('/home/jkang1643/projects/exbabel/app/page.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Fix triple braces on whileInView
    # E.g. whileInView={{ opacity: 1, y: 0 }}} viewport={{ once: true }}
    # We replace any "}}} viewport=" with "}} viewport="
    content = re.sub(r'\}\}\}\s*viewport=', '}} viewport=', content)

    # Fix duplicate viewports across multiple lines
    # Usually it looks like:
    # whileInView={...} viewport={...}
    # transition={...}
    # viewport={...}
    
    # We can find the component boundaries, but a simpler way is to just look for
    # viewport={{ once: true, margin: "300px" }} ... followed by another viewport=
    # within 150 characters.
    
    # Let's find viewport=\{\{\s*once:\s*true,\s*margin:\s*"300px"\s*\}\}
    # and if there's another viewport= within a short distance, remove the second one.
    
    # Actually, the simplest way is to remove the specific viewport={...} that was ALREADY THERE on the next line.
    # The one I added was inline with whileInView.
    # The old one looks like: \n\s*viewport=\{\{\s*once:\s*true\s*\}\}
    # Let's just find lines that match: viewport={{ once: true }} (with optional margin) 
    # but wait, let's just use regex to remove the second viewport in the same tag.
    
    # A tag is from <motion.div to >
    # This is getting complex for regex. Let's just remove the first inline viewport we added if there's another one.
    # Our inline viewport looks exactly like: viewport={{ once: true, margin: "300px" }}
    
    # If the text has `viewport={{ once: true, margin: "300px" }}` and soon after has `viewport=`, remove the first one.
    # Or just remove the `viewport={{ once: true, margin: "300px" }}` from the line if `viewport=` exists on the next 3 lines.
    
    def replacer(match):
        text = match.group(0)
        # count occurrences of 'viewport='
        if text.count('viewport=') > 1:
            # remove the first one which is `viewport={{ once: true, margin: "300px" }}`
            text = text.replace(' viewport={{ once: true, margin: "300px" }}', '', 1)
            # also handle the -50px, 100px versions just in case
            text = text.replace(' viewport={{ once: true, margin: "-50px" }}', '', 1)
            text = text.replace(' viewport={{ once: true, margin: "100px" }}', '', 1)
            text = text.replace(' viewport={{ once: true }}', '', 1)
        return text

    # Find tags <motion.XXX ... >
    content = re.sub(r'<motion\.[a-zA-Z0-9]+[^>]+>', replacer, content)
    
    # Also fix some triple braces that might not have viewport immediately after
    content = content.replace('}}}', '}}')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed syntax in {filepath}')
