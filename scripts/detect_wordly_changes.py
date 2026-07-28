import cv2
import numpy as np
import glob
import os

files = sorted(glob.glob('/home/jkang1643/projects/exbabel/scripts/wordly_fine/frame_*.jpg'))

prev_crop = None
changes = []

for f in files:
    # Frame index, time = (idx-1) * 0.1s
    idx = int(os.path.basename(f).split('_')[1].split('.')[0])
    t = (idx - 1) * 0.1
    
    img = cv2.imread(f)
    if img is None:
        continue
    
    # Crop the main transcript area (left side)
    h, w, _ = img.shape
    crop = img[int(h*0.15):int(h*0.95), 0:int(w*0.4)]
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    
    if prev_crop is not None:
        diff = cv2.absdiff(gray, prev_crop)
        score = np.sum(diff > 30)
        if score > 500:  # significant visual change
            changes.append((t, score, f))
            print(f'Change at t={t:5.1f}s | score={score:6d} | file={os.path.basename(f)}')
            
    prev_crop = gray

