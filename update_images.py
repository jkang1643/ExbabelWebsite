import os

filepath = '/home/jkang1643/projects/exbabel/components/HowItWorksGraphic.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('/images/step1-launch.png', '/images/step1-launch-new.jpg')
content = content.replace('/images/step2-configure.png', '/images/step2-configure-new.jpg')
content = content.replace('/images/step3-share.png', '/images/step3-share-new.jpg')
content = content.replace('/images/step4-listen.png', '/images/step4-listen-new.png')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated image paths in HowItWorksGraphic")