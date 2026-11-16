'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { useReducedMotion } from 'motion/react';
import { Stage } from './stageshow/kit/stage';
import { Window } from './stageshow/kit/window';
import { Phone } from './stageshow/kit/phone';
import { Stream } from './stageshow/kit/motion/Stream';
import { Badge } from './stageshow/kit/controls/Badge';
import type { Act } from './stageshow/kit/act';
import './events-stage.css';

const languages = [
  { code: 'es', label: 'Español', text: 'Las mejores ideas comienzan cuando todos formamos parte de la conversación.' },
  { code: 'fr', label: 'Français', text: 'Les meilleures idées naissent lorsque nous participons tous à la conversation.' },
  { code: 'pt', label: 'Português', text: 'As melhores ideias começam quando todos fazemos parte da conversa.' },
];
type Scene = { words: number; received: boolean };
const initial: Scene = { words: 0, received: false };
const poster: Scene = { words: 30, received: true };
async function script(a: Act<Scene>) {
  a.mark('speaker');
  await a.wait(700);
  a.put({ received: true });
  a.mark('listener');
  for (let words = 1; words <= 15; words++) { a.put({ words }); await a.wait(240); }
  a.mark('translated');
  await a.wait(2200);
}

// Composition adapted from Stageshow's device-pair gold. The dashboard becomes
// the event source, and its phone becomes the translation payoff.
export default function EventsInteractiveScene() {
  const [language, setLanguage] = useState(languages[0]);
  const [paused, setPaused] = useState(false);
  const [take, setTake] = useState(0);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || paused || !root.current) return;
    const animation = animate(root.current, { rotateY: [-8, 0], rotateX: [3, 0], duration: 1600, ease: 'outCubic' });
    return () => { animation.revert(); };
  }, [reduced, paused]);

  return <figure className="events-demo" aria-label="Illustration of translated captions arriving on an attendee’s phone">
    <div className="events-demo-perspective"><div ref={root}>
      <Stage<Scene> key={`${language.code}-${take}`} width={600} height={580} compact={{ below: 560, width: 358, height: 550 }} theme="dark" accent="#4c68ff" fidelity="realistic" initial={initial} poster={poster} script={paused ? undefined : script} play="once" className="events-translation-stage" tokens={{ '--ss-font': 'inherit', '--ss-canvas': '#181818', '--ss-surface': '#1f1f1f' }}>
        {(state) => <>
          <Window title="Main stage · Original audio" className="events-source-window">
            <img className="events-speaker" src="/events-media/conference-speaker.jpg" alt="Conference speaker holding a microphone" width={600} height={500} />
            <div className="events-source-caption"><Badge>English</Badge><div>The best ideas begin when we are all part of the conversation.</div></div>
          </Window>
          <Phone width={310} frame="pro" className="events-listener-phone">
            <div className="events-phone-app">
              <div className="events-phone-brand">Exbabel <span>Events</span></div>
              <div className="events-phone-room">Main stage</div>
              <div className="events-phone-language">{language.label}<span>⌄</span></div>
              <div className="events-phone-meta">Translated captions</div>
              <div className="events-phone-words" lang={language.code}><Stream text={language.text} count={state.words} /></div>
              <div className="events-phone-received" data-received={state.received}>Listening in {language.label}</div>
              <div className="events-phone-foot">Audio and captions, together</div>
            </div>
          </Phone>
        </>}
      </Stage>
    </div></div>
    <div className="events-demo-controls"><label htmlFor="preview-language">Preview language<select id="preview-language" value={language.code} onChange={e => setLanguage(languages.find(l => l.code === e.target.value) || languages[0])}>{languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}</select></label><button type="button" onClick={() => { if (paused) setTake(t => t + 1); setPaused(!paused); }}>{paused ? 'Play animation' : 'Stop animation'}</button><button type="button" onClick={() => { setPaused(false); setTake(t => t + 1); }}>Replay</button></div>
    <figcaption>Illustrated product walkthrough · Sample translation, not a live session</figcaption>
    <span className="events-sr-only" aria-live="polite" lang={language.code}>{language.text}</span>
  </figure>;
}
