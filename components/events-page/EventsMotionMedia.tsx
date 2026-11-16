'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import s from './EventsPage.module.css';

export default function EventsMotionMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(video, { amount: .25 });
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const manuallyPaused = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!visible || reduced || document.hidden || manuallyPaused.current) { element.pause(); return; }
    // Autoplay is best effort; native controls remain available if blocked.
    element.play().catch(() => setPlaying(false));
    const onVisibility = () => { if (document.hidden) element.pause(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { element.pause(); document.removeEventListener('visibilitychange', onVisibility); };
  }, [visible, reduced]);
  return <div className={s.mediaStory}>
    <motion.figure initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] }} className={s.mediaFilm}>
      <video ref={video} poster="/events-media/conference-audience.jpg" src="/events-media/event-moments.mp4" muted playsInline loop controls preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Animated photographic montage of conference speakers and attendees" />
      <figcaption><span>Every voice has a place</span><button type="button" onClick={() => { manuallyPaused.current = playing; if (playing) video.current?.pause(); else video.current?.play().catch(() => setPlaying(false)); }}>{playing ? 'Pause film' : 'Play film'}</button></figcaption>
    </motion.figure>
    <div className={s.mediaPhoto}><img src="/events-media/attendee-generated.webp" alt="Illustration of a conference attendee listening with wireless earbuds" width={1280} height={720} loading="lazy" /><div><span>On their own device</span><p>A personal listening experience, right in the room.</p><small>AI generated illustration</small></div></div>
  </div>;
}
