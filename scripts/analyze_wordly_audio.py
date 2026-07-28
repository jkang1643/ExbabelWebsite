lines = open('/home/jkang1643/projects/exbabel/scripts/wordly_audio_levels.txt').readlines()
t = None
data = []
for line in lines:
    line = line.strip()
    if 'pts_time:' in line:
        t = float(line.split('pts_time:')[1])
    elif 'RMS_level=' in line and t is not None:
        level = float(line.split('=')[1])
        data.append((t, level))

# Print intervals where level > -45 dB (active speech/sound)
active = False
start_t = 0
for t, level in data:
    if level > -40 and not active:
        active = True
        start_t = t
    elif level <= -42 and active:
        active = False
        print(f'Audio activity: {start_t:6.3f}s to {t:6.3f}s (duration: {t-start_t:5.3f}s)')

