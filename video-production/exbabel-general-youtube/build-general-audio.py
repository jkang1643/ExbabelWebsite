"""Replace only the opening narration in this one-off film."""
from array import array
from pathlib import Path
import math
import subprocess
import wave

ROOT = Path(__file__).parent
RATE = 48_000
START_MS = 300
PRESERVE_FROM_MS = 6244
MASTER = ROOT.parent / "exbabel-motion-v2/assets/narration.wav"
OPENING = ROOT / "assets/opening.mp3"
OUTPUT = ROOT / "assets/narration.wav"

with wave.open(str(MASTER), "rb") as source:
    assert source.getframerate() == RATE and source.getnchannels() == 1
    assert source.getsampwidth() == 2
    master = array("h")
    master.frombytes(source.readframes(source.getnframes()))

decoded = subprocess.check_output([
    "ffmpeg", "-nostdin", "-v", "error", "-i", str(OPENING),
    "-f", "s16le", "-ac", "1", "-ar", str(RATE), "pipe:1",
])
opening = array("h")
opening.frombytes(decoded)
start = START_MS * RATE // 1000
preserve = PRESERVE_FROM_MS * RATE // 1000
assert len(opening) + start < preserve

def rms(samples):
    return math.sqrt(sum(x * x for x in samples) / max(1, len(samples)))

reference_level = rms(master[start:4700 * RATE // 1000])
opening_level = rms(opening)
gain = min(1.8, max(0.55, reference_level / max(1, opening_level)))
result = array("h", master)
result[:preserve] = array("h", [0]) * preserve
fade = RATE * 35 // 1000
for index, sample in enumerate(opening):
    edge = min(1, index / fade, (len(opening) - 1 - index) / fade)
    result[start + index] = max(-32768, min(32767, round(sample * gain * edge)))

with wave.open(str(OUTPUT), "wb") as target:
    target.setnchannels(1)
    target.setsampwidth(2)
    target.setframerate(RATE)
    target.writeframes(result.tobytes())
print(f"{OUTPUT}: {len(result) / RATE:.3f}s; preserved master from {PRESERVE_FROM_MS / 1000:.3f}s")
