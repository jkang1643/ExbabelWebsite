"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import styles from "./GlassmorphicHero.module.css";
import ExbabelTranslateSVG from "./svg/ExbabelTranslateSVG";
import ExbabelLiveSVG from "./svg/ExbabelLiveSVG";
import ExbabelEventsSVG from "./svg/ExbabelEventsSVG";

const scenes: readonly {
  title: string; graphic: ReactNode; alt: string; color: string; accent: string;
  language: string; translation: string; source: string;
}[] = [
  {
    title: "Exbabel Translate", graphic: <ExbabelTranslateSVG />,
    alt: "Exbabel Translate host dashboard with session sharing and broadcasting controls.",
    color: "#ace5fa", accent: "#254bd9", language: "Español",
    translation: "Cada voz importa.", source: "Every voice matters.",
  },
  {
    title: "Exbabel Live", graphic: <ExbabelLiveSVG />,
    alt: "Exbabel Live streaming interface with real-time subtitles and speaker video.",
    color: "#d5c4fa", accent: "#6740c8", language: "Français",
    translation: "Bienvenue à tous.", source: "Everyone is welcome.",
  },
  {
    title: "Exbabel Events", graphic: <ExbabelEventsSVG />,
    alt: "Exbabel Events dashboard with event management and translation tools.",
    color: "#bdebd5", accent: "#087650", language: "Español",
    translation: "Cada voz importa.", source: "Every voice matters.",
  },
];
const taglineWords = ["One service.", "Every language.", "Understood.", "Connected."] as const;
const churches = ["Houston Apostolic Church", "Lighthouse Pentecostal Church", "Lighthouse Church", "1st Baptist Church of Houston"] as const;

function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={back ? styles.backArrow : undefined}>
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function Waveform() {
  return <div className={styles.waveform} aria-hidden="true">
    {[12, 20, 13, 30, 43, 24, 37, 50, 31, 18, 38, 55, 34, 24, 43, 28, 15, 31, 45, 22, 13, 20, 10].map((height, i) =>
      <i key={i} style={{ height, animationDelay: `${i * -0.09}s` }} />
    )}
  </div>;
}

export default function GlassmorphicHero() {
  const [active, setActive] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const scene = scenes[active];
  const playing = reduceMotion === false && !paused && !hovered && !focused && visible && inView;

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % scenes.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, active]);

  useEffect(() => {
    if (reduceMotion !== false || !visible) return;
    const timer = window.setInterval(() => setTaglineIndex(current => (current + 1) % taglineWords.length), 3000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, visible]);

  const select = (index: number) => {
    setActive((index + scenes.length) % scenes.length);
    setPaused(true);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title" style={{ "--scene-color": scene.color, "--scene-accent": scene.accent } as CSSProperties}>
      <div className={styles.ambient} aria-hidden="true">
        {scenes.map((item, index) => <div key={item.title} className={styles.colorWash} style={{ background: item.color, opacity: index === active ? 1 : 0 }} />)}
      </div>
      <div className={styles.copy}>
        <p className={styles.tagline}>
          <span>Every voice.</span>{" "}
          <span className={styles.rotatingWords} aria-hidden="true">
            {taglineWords.map(word => <span key={word} className={styles.wordSizer}>{word}</span>)}
            <AnimatePresence initial={false} mode="wait">
              <motion.span key={reduceMotion ? "static" : taglineIndex} className={styles.rotatingWord}
                initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}>
                {taglineWords[reduceMotion ? 0 : taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className={styles.srOnly}>One service.</span>
        </p>
        <h1 id="hero-title" className={styles.title}>
          <span>Real-Time AI Translation</span>{" "}<span>for Churches and Live Events</span>
        </h1>
        <p className={styles.description}>
          Exbabel is a real-time church translation system for sermons, worship services, livestreams, conferences, and live events. Translate speech into natural AI audio and live captions so every listener can follow in their language from any device.
        </p>
        <div className={styles.actions}>
          <Link href="/demo" className={styles.primary}>Schedule a Consultation <Arrow /></Link>
          <a href="#capabilities" className={styles.secondary}>Explore Capabilities <Arrow /></a>
        </div>
        <div className={styles.trust}>
          <p>Trusted by top churches</p>
          <div className={styles.churchViewport}>
            <div className={styles.churchTrack}>
              {[0, 1].map(copy => (
                <div key={copy} className={styles.churchGroup} aria-hidden={copy === 1 ? true : undefined}>
                  {churches.map(church => <span key={church}><i aria-hidden="true" />{church}</span>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={carouselRef} className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Exbabel in action"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
        }}>
        <div className={styles.stage}>
          {scenes.map((item, index) => {
            const offset = (index - active + scenes.length) % scenes.length;
            const position = offset === 0 ? "center" : offset === 1 ? "right" : "left";
            return <div key={item.title} className={styles.slide} data-position={position} role="group" aria-roledescription="slide"
              aria-label={`${index + 1} of ${scenes.length}: ${item.title}`} aria-hidden={index !== active}>
              <div className={styles.artwork}>{item.graphic}</div>
            </div>;
          })}
          <div className={styles.audioCard} aria-hidden="true">
            <div className={styles.cardEyebrow}><span className={styles.audioIcon}>♪</span> {scene.title}</div>
            <Waveform />
            <div className={styles.cardFooter}><span className={styles.liveDot} /> {scene.language} <span>Live</span></div>
          </div>
        </div>
        <div className={styles.controls}>
          <button className={styles.arrowButton} type="button" onClick={() => select(active - 1)} aria-label="Previous scene"><Arrow back /></button>
          <div className={styles.sceneButtons} aria-label="Choose a scene">
            {scenes.map((item, index) =>
              <button key={item.title} type="button" aria-pressed={index === active} onClick={() => select(index)} className={index === active ? styles.selectedScene : undefined}>
                <span className={styles.sceneDot} /><span>{item.title}</span>
              </button>
            )}
          </div>
          <button className={styles.arrowButton} type="button" onClick={() => select(active + 1)} aria-label="Next scene"><Arrow /></button>
          {!reduceMotion && <button className={styles.pauseButton} type="button" onClick={() => setPaused(current => !current)}
            aria-label={paused ? "Start automatic slideshow" : "Pause automatic slideshow"} aria-pressed={paused}>
            {paused ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor" /></svg>
              : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v12M13 4v12" stroke="currentColor" strokeWidth="2.5" /></svg>}
          </button>}
        </div>
        <p className={styles.illustrationNote}>Exbabel product interfaces</p>
        <span className={styles.srOnly} aria-live={playing ? "off" : "polite"} aria-atomic="true">{scene.title}, scene {active + 1} of {scenes.length}</span>
      </div>
    </section>
  );
}
