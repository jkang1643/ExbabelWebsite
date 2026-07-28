import glob
import os

# Inspect frames from u1_0038 (4.233s) to u1_0115 (6.800s)
files = sorted(glob.glob('/home/jkang1643/projects/exbabel/scripts/wordly_u1/u1_*.jpg'))

for f in files:
    idx = int(os.path.basename(f).split('_')[1].split('.')[0])
    t = 3.0 + (idx - 1) / 30.0
    if 35 <= idx <= 120:
        size = os.path.getsize(f)
        print(f'Frame {idx:04d} | t = {t:6.3f}s | size = {size}')

