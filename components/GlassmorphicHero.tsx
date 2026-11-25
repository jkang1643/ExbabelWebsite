"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import styles from "./GlassmorphicHero.module.css";
import ExbabelTranslateSVG from "./svg/ExbabelTranslateSVG";
import ExbabelLiveSVG from "./svg/ExbabelLiveSVG";
import ExbabelEventsSVG from "./svg/ExbabelEventsSVG";

const scenes: readonly {
  title: string; graphic: ReactNode; tone: "blue" | "violet" | "green";
}[] = [
  {
    title: "Exbabel Translate", tone: "blue", graphic: <ExbabelTranslateSVG />,
  },
  {
    title: "Exbabel Live", tone: "violet", graphic: <ExbabelLiveSVG />,
  },
  {
    title: "Exbabel Events", tone: "green", graphic: <ExbabelEventsSVG />,
  },
];
const churches = ["Houston Apostolic Church", "Lighthouse Pentecostal Church", "Lighthouse Church", "1st Baptist Church of Houston"] as const;

function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={back ? styles.backArrow : undefined}>
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function GlassmorphicHero() {
  const [active, setActive] = useState(0);
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

  const select = (index: number) => {
    setActive((index + scenes.length) % scenes.length);
    setPaused(true);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={`${styles.title} homepage-section-title`}>
          <span className={styles.titleLead}>AI Church Translation System</span>{" "}
          <span className={styles.titleSupport}>for <span className={styles.titleAccent}>Live Sermons and Services</span></span>
        </h1>
        <p className={styles.description}>
          Translate sermons into multiple languages with live AI audio and captions. Your congregation listens on their phones—no special receivers or app downloads required.
        </p>
        <div className={styles.actions}>
          <Link href="/demo" className={styles.primary}>Book a Consultation <Arrow /></Link>
          <Link href="https://app.exbabel.com/translate/checkout?plan=starter" className={styles.secondary}>Start Free 30-Day Trial <Arrow /></Link>
        </div>
        <div className={styles.trust}>
          <p>Trusted by top churches</p>
          <ul className={styles.churches} role="list">
            {churches.map(church => <li key={church}>{church}</li>)}
          </ul>
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
            return <div key={item.title} className={styles.slide} data-position={position} data-tone={item.tone} role="group" aria-roledescription="slide"
              aria-label={`${index + 1} of ${scenes.length}: ${item.title}`} aria-hidden={index !== active}>
              <div className={styles.artwork}>{item.graphic}</div>
            </div>;
          })}
        </div>
        <div className={styles.controls}>
          <button className={styles.arrowButton} type="button" onClick={() => select(active - 1)} aria-label="Previous scene"><Arrow back /></button>
          <div className={styles.sceneButtons} aria-label="Choose a scene">
            {scenes.map((item, index) =>
              <button key={item.title} type="button" aria-pressed={index === active} onClick={() => select(index)} className={index === active ? styles.selectedScene : undefined}>
                {item.title}
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
        <span className={styles.srOnly} aria-live={playing ? "off" : "polite"} aria-atomic="true">{scene.title}, scene {active + 1} of {scenes.length}</span>
      </div>
    </section>
  );
}
