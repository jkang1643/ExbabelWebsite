import os

# We will use cp from the mounted windows drive
wsl_dest_dir = '/home/jkang1643/projects/exbabel/public/images'

import glob
files = glob.glob('/mnt/c/Users/boyge/.gemini/antigravity-ide/brain/ff6a471c-bf6e-42ba-8c0b-0f420eeecf62/*.jpg')

step1_file = next((f for f in files if 'step1_launch' in f), None)
step2_file = next((f for f in files if 'step2_configure' in f), None)
step3_file = next((f for f in files if 'step3_share' in f), None)
step4_file = next((f for f in files if 'step4_listen' in f), None)

if step1_file:
    os.system(f'cp "{step1_file}" "{wsl_dest_dir}/step1-launch.jpg"')

if step2_file:
    os.system(f'cp "{step2_file}" "{wsl_dest_dir}/step2-configure.jpg"')

if step3_file:
    os.system(f'cp "{step3_file}" "{wsl_dest_dir}/step3-share.jpg"')

if step4_file:
    os.system(f'cp "{step4_file}" "{wsl_dest_dir}/step4-listen.jpg"')

print("Images copied")

# Update HowItWorksGraphic.tsx to use .jpg
tsx_path = '/home/jkang1643/projects/exbabel/components/HowItWorksGraphic.tsx'
os.system(f'sed -i "s/.png/.jpg/g" {tsx_path}')

print("Updated component")