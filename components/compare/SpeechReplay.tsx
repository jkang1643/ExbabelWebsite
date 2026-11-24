'use client';

import { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

const recordings = new Set(['breeze-translate','captionkit','glossa','live-voice','selah-translate','stenomatic','sunflower-ai','vonal-ai','wordly']);

export default function SpeechReplay({slug,name}: {slug:string; name:string}) {
  const tracks = [{slug:'exbabel',name:'Exbabel'}];
  if (recordings.has(slug)) tracks.push({slug,name});
  const videos = useRef<(HTMLVideoElement|null)[]>([]);
  const [playing,setPlaying] = useState(false);
  const [audio,setAudio] = useState('exbabel');
  const [error,setError] = useState('');
  const button = 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-offset-4';

  async function playback(restart = false) {
    const media = videos.current.filter((v): v is HTMLVideoElement => Boolean(v));
    if (playing && !restart) {
      media.forEach(v => v.pause());
      setPlaying(false);
      return;
    }
    if (restart || media.every(v => v.ended)) media.forEach(v => {v.currentTime = 0;});
    setError('');
    try {
      await Promise.all(media.filter(v => !v.ended).map(v => v.play()));
      setPlaying(true);
    } catch {
      media.forEach(v => v.pause());
      setPlaying(false);
      setError('Playback was interrupted. Select Replay to try again.');
    }
  }

  return <section id="playback" aria-labelledby="playback-title" className="mt-12 scroll-mt-28 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-5 sm:p-9">
    <h2 id="playback-title" className="text-3xl font-bold tracking-tight text-slate-900">{tracks.length===2?'Hear the timing side by side':'Hear Exbabel translate'}</h2>
    <p className="mb-6 mt-3 max-w-2xl leading-7 text-slate-600">{tracks.length===2?'Play both speech demos together. Switch the audio between them to hear when each translation starts.':'Play the Exbabel speech demo to hear when its translation starts.'}</p>
    <div className={'grid gap-4 '+(tracks.length===2?'md:grid-cols-2':'max-w-2xl')}>
      {tracks.map((track,i)=><figure key={track.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <figcaption className="px-5 py-3 font-bold">{track.name}</figcaption>
        <video ref={v=>{videos.current[i]=v;}} className="aspect-video w-full bg-slate-950" aria-label={track.name+' speech demo'} playsInline preload="metadata" muted={audio!==track.slug}
          poster={'/videos/comparisons/'+track.slug+'.jpg'} src={'/videos/comparisons/'+track.slug+'.mp4'}
          onEnded={()=>{if(videos.current.every(v=>!v||v.ended)) setPlaying(false);}} />
      </figure>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <button type="button" className={button+' bg-[#3042dd] text-white'} onClick={()=>playback()}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pause':'Play demo'}</button>
      <button type="button" className={button+' border border-slate-300 bg-white'} onClick={()=>playback(true)}><RotateCcw size={16}/> Replay</button>
      {tracks.length===2 && <div role="group" aria-label="Audio source" className="flex flex-wrap items-center gap-2 md:ml-auto"><Volume2 size={17}/><span className="text-sm">Listen to</span>{tracks.map(t=><button key={t.slug} type="button" aria-pressed={audio===t.slug} onClick={()=>setAudio(t.slug)} className={button+(audio===t.slug?' bg-indigo-100 text-indigo-900':' bg-white text-slate-700')}>{t.name}</button>)}</div>}
    </div>
    {error && <p role="alert">{error}</p>}
  </section>;
}
