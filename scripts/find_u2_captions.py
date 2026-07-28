import glob
import os

files = sorted(glob.glob('/home/jkang1643/projects/exbabel/scripts/wordly_u2/u2_*.jpg'))

last_size = None

for f in files:
    idx = int(os.path.basename(f).split('_')[1].split('.')[0])
    t = 18.0 + (idx - 1) / 30.0
    size = os.path.getsize(f)
    if last_size is None or abs(size - last_size) > 500:
        print(f'Frame {idx:04d} | t = {t:6.3f}s | size = {size}')
        last_size = size

