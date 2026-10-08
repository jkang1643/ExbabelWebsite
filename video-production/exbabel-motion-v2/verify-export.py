import subprocess,json
from pathlib import Path
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent
video=p/'renders/exbabel-full-revision-final.mp4'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(video)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['avg_frame_rate'])==(1920,1080,'30/1')
assert abs(float(probe['format']['duration'])-123.8)<.05
decode=subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],capture_output=True,text=True)
assert decode.returncode==0 and not decode.stderr,decode.stderr
out=p/'renders/verification';out.mkdir(exist_ok=True)
times=[5,16,20.166,26.6,36,45.2,65,93,101,108,113,121]
expr='+'.join('eq(n,%d)'%round(t*30) for t in times)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf',"select='"+expr+"',scale=640:360",'-fps_mode','vfr',str(out/'frame-%02d.jpg')],check=True)
sheet=Image.new('RGB',(1920,1600),'#eee');draw=ImageDraw.Draw(sheet)
for i,t in enumerate(times):
    frame=Image.open(out/('frame-%02d.jpg'%(i+1)))
    x=(i%3)*640;y=(i//3)*400
    sheet.paste(frame,(x,y+30));draw.text((x+12,y+8),str(t)+'s',fill='black')
sheet.save(out/'encoded-contact-sheet.jpg')
report={'ok':True,'duration':float(probe['format']['duration']),'width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'audioDuration':a.get('duration'),'decodedWithoutErrors':True,'bytes':video.stat().st_size,'video':str(video)}
(p/'export-verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
