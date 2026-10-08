import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

const MODEL='eleven_multilingual_v2';
const SETTINGS={stability:.48,similarity_boost:.78,style:0,use_speaker_boost:true};
export class VoiceUnavailable extends Error{}
export class VoiceReviewRequired extends Error{}
export function voiceCacheKey(voiceId:string,text:string):string {
  return createHash('sha256').update(JSON.stringify({voiceId,text,model:MODEL,settings:SETTINGS})).digest('hex');
}
export async function generatePersonalizedPhrase(args:{text:string;voiceId:string;cacheDir:string;force?:boolean}):Promise<{path:string;key:string}> {
  const key=voiceCacheKey(args.voiceId,args.text),path=join(args.cacheDir,`${key}.mp3`);
  await mkdir(args.cacheDir,{recursive:true});
  if(!args.force){try{await readFile(path);return {path,key}}catch{}}
  const apiKey=process.env.ELEVENLABS_API_KEY;
  if(!apiKey)throw new VoiceUnavailable('ELEVENLABS_API_KEY is not configured');
  const url=`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(args.voiceId)}?output_format=mp3_44100_128`;
  const response=await fetch(url,{method:'POST',headers:{'xi-api-key':apiKey,'content-type':'application/json'},body:JSON.stringify({text:args.text,model_id:MODEL,voice_settings:SETTINGS}),signal:AbortSignal.timeout(45000)});
  if(!response.ok)throw Error(`ElevenLabs TTS failed (${response.status})`);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.length<1000||bytes.length>10_000_000)throw Error('Unexpected ElevenLabs audio size');
  await writeFile(path,bytes,{mode:0o600});
  return {path,key};
}
function ffmpeg(args:string[],input?:Buffer):Promise<Buffer>{
  return new Promise((resolve,reject)=>{
    const p=spawn('ffmpeg',['-nostdin','-v','error',...args],{stdio:['pipe','pipe','pipe']});
    const chunks:Buffer[]=[],errors:Buffer[]=[];
    p.stdout.on('data',(x:Buffer)=>chunks.push(x));p.stderr.on('data',(x:Buffer)=>errors.push(x));
    p.on('error',reject);p.on('close',code=>code?reject(Error(Buffer.concat(errors).toString()||`ffmpeg ${code}`)):resolve(Buffer.concat(chunks)));
    p.stdin.end(input);
  });
}
function rms(b:Buffer,start:number,end:number):number{
  let sum=0,n=0;for(let i=start*2;i<Math.min(b.length,end*2);i+=2){const x=b.readInt16LE(i);sum+=x*x;n++}return Math.sqrt(sum/Math.max(1,n));
}
const RATE=48000,START=4700,END=6650,DURATION=123800;
export async function spliceNarration(args:{masterPath:string;segmentPath:string;outputPath:string}):Promise<{durationMs:number;segmentDurationMs:number;speed:number}> {
  const master=await ffmpeg(['-i',args.masterPath,'-f','s16le','-ac','1','-ar',String(RATE),'pipe:1']);
  let segment=await ffmpeg(['-i',args.segmentPath,'-f','s16le','-ac','1','-ar',String(RATE),'pipe:1']);
  const slotSamples=Math.round((END-START)*RATE/1000),measuredMs=segment.length/2/RATE*1000;
  let speed=1;
  if(segment.length/2>slotSamples){
    speed=(segment.length/2)/slotSamples;
    if(speed>1.10)throw new VoiceReviewRequired(`Spoken name needs ${measuredMs.toFixed(0)} ms; slot is ${END-START} ms`);
    segment=await ffmpeg(['-f','s16le','-ac','1','-ar',String(RATE),'-i','pipe:0','-af',`atempo=${speed.toFixed(5)}`,'-f','s16le','-ac','1','-ar',String(RATE),'pipe:1'],segment);
  }
  const output=Buffer.alloc(DURATION*RATE/1000*2);
  master.copy(output,0,0,Math.min(master.length,output.length));
  const startSample=START*RATE/1000,endSample=END*RATE/1000;
  output.fill(0,startSample*2,endSample*2);
  const level=rms(master,startSample,Math.min(startSample+RATE,endSample));
  const gain=Math.min(2.4,Math.max(.4,level/Math.max(1,rms(segment,0,segment.length/2))));
  const N=Math.min(slotSamples,segment.length/2),fade=Math.min(Math.round(RATE*.035),Math.floor(N/8));
  for(let i=0;i<N;i++){
    const edge=Math.min(1,i/fade,(N-1-i)/fade),v=Math.round(segment.readInt16LE(i*2)*gain*edge);
    output.writeInt16LE(Math.max(-32768,Math.min(32767,v)),(startSample+i)*2);
  }
  await mkdir(dirname(args.outputPath),{recursive:true});
  await ffmpeg(['-f','s16le','-ac','1','-ar',String(RATE),'-i','pipe:0','-c:a','pcm_s16le','-f','wav','-y',args.outputPath],output);
  return {durationMs:DURATION,segmentDurationMs:measuredMs,speed};
}
