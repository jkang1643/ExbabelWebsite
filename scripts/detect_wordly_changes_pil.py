from PIL import Image, ImageChops
import glob
import os

files = sorted(glob.glob('/home/jkang1643/projects/exbabel/scripts/wordly_fine/frame_*.jpg'))

prev_crop = None

for f in files:
    idx = int(os.path.basename(f).split('_')[1].split('.')[0])
    t = (idx - 1) * 0.1
    
    img = Image.open(f).convert('L')
    w, h = img.size
    crop = img.crop((0, int(h*0.15), int(w*0.4), int(h*0.95)))
    
    if prev_crop is not None:
        diff = ImageChops.difference(crop, prev_crop)
        # Count non-zero pixels in difference
        hist = diff.histogram()
        # Sum pixels with value > 30
        changed_pixels = sum(hist[30:])
        if changed_pixels > 500:
            print(f'Change at t={t:5.1f}s | changed={changed_pixels:6d} | frame_{idx:04d}')
            
    prev_crop = crop

