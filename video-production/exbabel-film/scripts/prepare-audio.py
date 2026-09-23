"""Recreate the delivery voice WAV from the preserved ElevenLabs first take."""
import subprocess,json
from pathlib import Path
P=Path(__file__).resolve().parents[1]
duration=json.loads((P/'narration-timing.json').read_text())['durationMs']/1000
subprocess.run(['ffmpeg','-y','-v','error','-i',str(P/'assets/voice-takes/1.mp3'),
    '-af','atempo=0.9,loudnorm=I=-16:TP=-1.5:LRA=9,adelay=300:all=1,apad',
    '-t',str(duration),'-ar','48000',str(P/'assets/narration.wav')],check=True)
