import subprocess,json,hashlib
from pathlib import Path
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent
video=p/'renders/exbabel-story-graphics-final.mp4'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(video)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['avg_frame_rate'])==(1920,1080,'30/1')
assert abs(float(probe['format']['duration'])-123.8)<.05
decode=subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],capture_output=True,text=True)
assert decode.returncode==0 and not decode.stderr,decode.stderr
out=p/'renders/graphics-verification';out.mkdir(exist_ok=True)
times=[26,28.7,36.8,51,58.5,74.8,81.2,84.8,86.4,88.9,97.9,103.7,108.4,108.7,110,121]
expr='+'.join('eq(n,%d)'%round(t*30) for t in times)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf',"select='"+expr+"',scale=640:360",'-fps_mode','vfr',str(out/'frame-%02d.jpg')],check=True)
sheet=Image.new('RGB',(2560,1600),'#eee');draw=ImageDraw.Draw(sheet)
for i,t in enumerate(times):
    frame=Image.open(out/('frame-%02d.jpg'%(i+1)))
    x=(i%4)*640;y=(i//4)*400
    sheet.paste(frame,(x,y+30));draw.text((x+12,y+8),str(t)+'s',fill='black')
sheet.save(out/'encoded-contact-sheet.jpg')
report={'ok':True,'duration':float(probe['format']['duration']),'width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'decodedWithoutErrors':True,'bytes':video.stat().st_size,'video':str(video),'sha256':hashlib.sha256(video.read_bytes()).hexdigest()}
(p/'graphics-export-verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
