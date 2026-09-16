import os
import re

tsx_path = '/home/jkang1643/projects/exbabel/components/HowItWorksGraphic.tsx'
with open(tsx_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('step1-launch-new.jpg', 'step1-launch.jpg')
content = content.replace('step2-configure-new.jpg', 'step2-configure.jpg')
content = content.replace('step3-share-new.jpg', 'step3-share.jpg')
content = content.replace('step4-listen-new.jpg', 'step4-listen.jpg')

# Also fix .png to .jpg just in case
content = content.replace('step1-launch.png', 'step1-launch.jpg')
content = content.replace('step2-configure.png', 'step2-configure.jpg')
content = content.replace('step3-share.png', 'step3-share.jpg')
content = content.replace('step4-listen.png', 'step4-listen.jpg')

with open(tsx_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated image paths")