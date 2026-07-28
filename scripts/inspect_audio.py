import wave
import struct
import math

wf = wave.open('/home/jkang1643/projects/exbabel/scripts/wordly_audio.wav', 'rb')
sr = wf.getframerate()
n_channels = wf.getnchannels()
n_frames = wf.getnframes()
raw = wf.readframes(n_frames)
wf.close()

n_samples = n_frames * n_channels
fmt = f'{n_samples}h'
samples = struct.unpack(fmt, raw)

# Convert to mono by averaging channels if stereo
if n_channels == 2:
    mono = [(samples[i] + samples[i+1]) // 2 for i in range(0, len(samples), 2)]
else:
    mono = samples

chunk_ms = 20
chunk_samples = int(sr * (chunk_ms / 1000.0))

energy_list = []
for i in range(0, len(mono), chunk_samples):
    chunk = mono[i:i+chunk_samples]
    if not chunk:
        continue
    rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
    t = (i / sr)
    energy_list.append((t, rms))

print(f'Total audio duration: {len(mono)/sr:.3f}s')
print('Significant audio segments (RMS > 500):')

in_segment = False
seg_start = 0
max_rms = 0

for t, rms in energy_list:
    if rms > 500 and not in_segment:
        in_segment = True
        seg_start = t
        max_rms = rms
    elif rms <= 500 and in_segment:
        in_segment = False
        print(f'  {seg_start:6.3f}s -> {t:6.3f}s (duration: {t-seg_start:5.3f}s) | peak RMS: {max_rms:6.0f}')
        max_rms = 0
    elif in_segment:
        if rms > max_rms:
            max_rms = rms

if in_segment:
    print(f'  {seg_start:6.3f}s -> {len(mono)/sr:6.3f}s | peak RMS: {max_rms:6.0f}')
