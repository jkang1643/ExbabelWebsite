import glob
import os
import hashlib

files = sorted(glob.glob('/home/jkang1643/projects/exbabel/scripts/wordly_u1/u1_*.jpg'))

last_hash = None

for f in files:
    idx = int(os.path.basename(f).split('_')[1].split('.')[0])
    t = 3.0 + (idx - 1) / 30.0
    
    # Read binary file header/content of cropped area or full image
    with open(f, 'rb') as fp:
        data = fp.read()
    
    # Simple hash of image file (since identical rendered frames are identical JPEGs or nearly identical)
    # Better: read raw bytes of specific region using simple python jpeg parse or file size
    size = len(data)
    
    # Print timestamps where file size changes significantly or at key frames
    if last_hash is None or abs(size - last_hash) > 500:
        print(f'Frame {idx:04d} | t = {t:6.3f}s | size = {size}')
        last_hash = size

