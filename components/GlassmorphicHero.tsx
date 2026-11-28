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
const sectors = ["Church", "Business", "Event", "Education"] as const;
const settings = [
  ["Live Sermons and Services", "rise"],
  ["Business Meetings", "align"],
  ["Conferences", "fan"],
  ["Live Broadcasts", "wave"],
  ["Bible Studies", "page"],
  ["Zoom Meetings", "zoom"],
  ["Phone Calls", "ring"],
  ["Teaching Sessions", "write"],
  ["Live Broadcasts", "wave"],
  ["Phone Calls", "ring"],
  ["Business Meetings", "align"],
  ["Zoom Meetings", "zoom"],
] as const;

const displayLabels = Array.from(new Set(settings.map(([label]) => label)));

// Each miniature has a stationary silhouette and a separately articulated moving part.
const illustrations = {
  rise: ["M31 22h34l-5 7H36zM38 29h20l3 13H35zM30 43h36M52 22v-8q0-6 7-6", "M63 10q8 3 9 10m-9-5q4 2 4 5M26 11q-7 4-7 10"],
  align: ["M17 30h62l-6 6H23zM26 36v7m44-7v7", "M24 24v-3q0-6 7-6t7 6v3m19 0v-3q0-6 7-6t7 6v3M43 23h11l-2 6H41z"],
  fan: ["M18 10h60v24H18zM46 34v6m-12 3h28M30 16h34", "M16 44q0-8 8-8t8 8m8 0q0-8 8-8t8 8m8 0q0-8 8-8t8 8"],
  wave: ["M37 43l11-28 11 28m-18-9h14m-16 6 14-11M46 14a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M38 9q-7 6 0 12m20-12q7 6 0 12M31 4q-13 11 0 22M65 4q13 11 0 22"],
  ring: ["M31 39h34l-5-19H36zM41 28h14m-13 5h12", "M24 17q2-11 24-11t24 11l-8 3-5-7H37l-5 7z"],
  zoom: ["M19 8h58v28H19zM14 39h68l-5 4H19z", "M25 14h19v15H25zM51 14h19v15H51zM31 21q3-6 7 0m19 0q3-6 7 0"],
  write: ["M16 8h63v29H16zM35 37l-5 7m31-7 5 7M25 18h20m-20 7h14", "M45 28l18-17 4 4-18 17-6 2z"],
} as const;

type Reveal = keyof typeof illustrations | "page";

function SceneIllustration({ effect }: { effect: Reveal }) {
  return <svg className={styles.prop} viewBox="0 0 96 48" fill="none" stroke="currentColor"
    strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {effect === "page" ? <>
      <path fill="#48499e" d="M8 20q22-4 40 7 18-11 40-7v18q-21-3-40 6-19-9-40-6z" />
      {[false, true].map(right => <g key={String(right)} transform={right ? "translate(96 0) scale(-1 1)" : undefined}>
        <g className={styles.leaf}>
          <path fill="#fff7df" d="M48 39Q32 28 12 32V12q22-2 36 13z" />
          <path d="M19 19q12 0 21 6m-21 0q12 0 21 6" stroke="#ba9667" />
        </g>
      </g>)}
      <path stroke="#d69256" d="M52 35v9l4-3 3 1v-9" />
    </> : <>
      <path d={illustrations[effect][0]} fill="#eeedff" />
      <path className={styles.movingPart} d={illustrations[effect][1]} />
    </>}
  </svg>;
}

function AnimatedHeadline({ enabled, running }: { enabled: boolean; running: boolean }) {
  const target = useRef<HTMLSpanElement>(null);
  const resumeStep = useRef<(() => void) | null>(null);
  const shouldRun = useRef(running);
  const [cue, setCue] = useState(0);
  const [hasTurned, setHasTurned] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    shouldRun.current = running;
    if (running) {
      resumeStep.current?.();
      resumeStep.current = null;
    }
  }, [running]);

  useEffect(() => {
    const node = target.current;
    if (!enabled || !node) return;
    let disposed = false;
    let stopWriter: (() => void) | undefined;
    void import("typeit").then(({ default: Writer }) => {
      if (disposed) return;
      const writer = new Writer(node, {
        beforeStep: async () => {
          if (!disposed && !shouldRun.current) {
            await new Promise<void>(resolve => { resumeStep.current = resolve; });
          }
        },
        startDelay: 0, speed: 46, deleteSpeed: 25, lifeLike: false,
        cursor: false, html: false, loop: true, loopDelay: 0,
      });
      stopWriter = () => writer.destroy();
      settings.forEach(([label], i) => {
        writer.exec(() => { setCue(i); setSettled(false); if (i !== 0) setHasTurned(true); }).pause(540)
          .type(label).exec(() => setSettled(true)).pause(1450).delete().pause(100);
      });
      writer.go();
    });
    return () => {
      disposed = true;
      stopWriter?.();
      resumeStep.current?.();
      resumeStep.current = null;
      node.replaceChildren();
    };
  }, [enabled]);

  const sectorIndex = cue % sectors.length;
  const turning = enabled && hasTurned;
  const [label, effect] = settings[cue];
  return <span aria-hidden="true" className={styles.headlineGrid}>
    <span key={cue} className={styles.titleLead} data-turning={turning} data-paused={!running}>
      {sectors.map(name => <span key={name} className={styles.measure}>AI {name} Translation System</span>)}
      <span className={styles.drumWindow}>
        <span className={styles.drum}>
          {Array.from({ length: 8 }, (_, face) => {
            const start = turning ? sectorIndex + sectors.length - 1 : sectorIndex;
            const name = sectors[(start + face) % sectors.length];
            return <span key={face} className={styles.drumFace}
              style={{ transform: `rotateX(${-45 * face}deg) translateZ(var(--radius))` }}>
              <span>AI <strong>{name}</strong> Translation System</span>
            </span>;
          })}
        </span>
      </span>
    </span>
    <span className={styles.supportStage}>
      {displayLabels.map(name => <span key={name} className={styles.supportMeasure}>
        <span>for</span><span className={styles.cue} /><span>{name}</span>
      </span>)}
      <span className={styles.titleSupport} data-settled={settled || !enabled}>
        <span>for</span>
        {enabled && <span className={styles.cue}><SceneIllustration key={cue} effect={effect} /></span>}
        <span className={styles.typeArea}>
          <span className={styles.measure}>{label}</span>
          {enabled ? <span className={styles.typedPhrase} ref={target} /> : <span className={styles.typedPhrase}>{label}</span>}
        </span>
      </span>
    </span>
  </span>;
}

const churches = ["Houston Apostolic Church", "Lighthouse Pentecostal Church", "International Church of Metro Detroit", "Longhollow Church"] as const;

function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={back ? styles.backArrow : undefined}>
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function GlassmorphicHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualScene, setManualScene] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const scene = scenes[active];
  const playing = reduceMotion === false && !paused && !manualScene && !hovered && !focused && visible && inView;

  useEffect(() => {
    setMounted(true);
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
    setManualScene(true);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={`${styles.title} homepage-section-title`}>
          <span className={styles.srOnly}>AI Church Translation System for Live Sermons and Services</span>
          <AnimatedHeadline enabled={mounted && reduceMotion === false} running={visible && !paused} />
        </h1>
        <p className={styles.description}>
          Speak in your language. Your audience can listen to live translated audio or read captions on their phones, without an app or special receiver.
        </p>
        <div className={styles.actions}>
          <Link href="/demo" className={styles.primary}>Book a Consultation <Arrow /></Link>
          <Link href="https://app.exbabel.com/translate/checkout?plan=starter" className={styles.secondary}>Start Free 30-Day Trial <Arrow /></Link>
        </div>
        <div className={styles.trust}>
          <p>Trusted by top churches</p>
          <div className={styles.churchViewport}>
            <div className={styles.churchTrack} style={{ animationPlayState: paused ? "paused" : undefined }}>
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
          {mounted && !reduceMotion && <button className={styles.pauseButton} type="button" onClick={() => { setPaused(current => !current); setManualScene(false); }}
            aria-label={paused ? "Start hero animations" : "Pause hero animations"} aria-pressed={paused}>
            {paused ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor" /></svg>
              : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v12M13 4v12" stroke="currentColor" strokeWidth="2.5" /></svg>}
          </button>}
        </div>
        <span className={styles.srOnly} aria-live={playing ? "off" : "polite"} aria-atomic="true">{scene.title}, scene {active + 1} of {scenes.length}</span>
      </div>
    </section>
  );
}
