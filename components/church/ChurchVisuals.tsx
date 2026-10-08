"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { listenerSamples } from "./samples";
import s from "./ChurchVisuals.module.css";

export function Waveform({ small = false }: { small?: boolean }) {
  return (
    <div
      className={s.waveform + (small ? " " + s.smallWave : "")}
      aria-hidden="true"
    >
      {[
        18, 30, 22, 44, 34, 60, 42, 28, 52, 64, 40, 24, 46, 32, 54, 38, 20, 30,
      ].map((height, i) => (
        <i key={i} style={{ height, "--bar": i } as CSSProperties} />
      ))}
    </div>
  );
}

export function Headphones() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="12" width="4" height="9" rx="2" />
      <rect x="17" y="12" width="4" height="9" rx="2" />
    </svg>
  );
}

function useVisibleMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
    };
  }, []);
  return { ref, visible, reduced };
}

export function HeroTranslationScene() {
  const { ref, visible, reduced } = useVisibleMotion();
  const played = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (visible && !reduced && !played.current) {
      played.current = true;
      setPlaying(true);
    }
  }, [visible, reduced]);
  useEffect(() => {
    if (!playing) return;
    if (!visible || reduced) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setPlaying(false), 4200);
    return () => window.clearTimeout(timer);
  }, [playing, visible, reduced]);

  return (
    <figure className={s.heroFigure}>
      <div
        ref={ref}
        className={s.scene}
        data-playing={playing && visible && !reduced}
      >
        <div className={s.sceneHeading}>
          <span>One service. Multiple listener experiences.</span>
          <span className={s.exampleLabel}>Illustrative example</span>
        </div>
        <svg
          className={s.paths}
          viewBox="0 0 680 540"
          aria-hidden="true"
          fill="none"
        >
          <path d="M220 182 H250 Q284 182 284 216 V250 H325 M325 250 H366 Q386 250 386 227 V155 H421 M325 250 V404 Q325 428 349 428 H476" />
          <path
            className={s.signal}
            d="M220 182 H250 Q284 182 284 216 V250 H325 M325 250 H366 Q386 250 386 227 V155 H421 M325 250 V404 Q325 428 349 428 H476"
          />
        </svg>
        <div className={s.hostPanel}>
          <div className={s.panelBar}>
            <strong>Exbabel</strong>
            <span>Host</span>
          </div>
          <div className={s.hostContent}>
            <span className={s.uiLabel}>Speech input</span>
            <strong>Pastor’s microphone</strong>
            <Waveform />
            <p className={s.sourcePhrase}>“Welcome. Thank you.”</p>
            <span className={s.uiLabel}>Via your computer’s audio input</span>
          </div>
        </div>
        <div className={s.translationHub}>
          <svg viewBox="0 0 40 30" width="40" height="30" aria-hidden="true">
            <path
              d="M5 12v6m7-13v20m8-25v30m8-23v16m7-12v8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <strong>Exbabel</strong>
          <span>Translate</span>
        </div>
        {listenerSamples.slice(1).map((sample, i) => (
          <div
            key={sample.code}
            className={s.heroPhone + " " + (i ? s.secondPhone : s.firstPhone)}
          >
            <div className={s.phoneNotch} aria-hidden="true" />
            <div className={s.phoneTop}>
              <strong>Exbabel</strong>
              <span>Listener</span>
            </div>
            <span className={s.uiLabel}>Selected language</span>
            <strong className={s.phoneLanguage} lang={sample.code}>
              {sample.native}
            </strong>
            <div className={s.heroCaption} lang={sample.code}>
              <p>{sample.greeting}</p>
              <p>{sample.thanks}</p>
            </div>
            <div className={s.phoneAudio}>
              <Headphones />
              <span>Translated audio</span>
              <Waveform small />
            </div>
          </div>
        ))}
        <div className={s.sequenceControl}>
          {ready && !reduced && (
            <button type="button" onClick={() => setPlaying(!playing)}>
              <svg
                viewBox="0 0 20 20"
                width="16"
                height="16"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                {playing ? (
                  <path d="M7 5v10m6-10v10" />
                ) : (
                  <>
                    <path d="M4 8a6 6 0 1 1 0 5M4 3v5h5" />
                  </>
                )}
              </svg>
              {playing ? "Pause illustration" : "Replay illustration"}
            </button>
          )}
          <span>Illustrated sequence, not measured delay</span>
        </div>
      </div>
      <figcaption>
        One speech source reaches listeners in supported languages. Example
        captions are prepared text, not live product output.
      </figcaption>
    </figure>
  );
}

export function ListenerPreview() {
  const [selected, setSelected] = useState(1);
  const sample = listenerSamples[selected];
  return (
    <div className={s.listenerDemo}>
      <div className={s.previewTop}>
        <span>Illustrative listener preview</span>
        <span>Text example · no audio playback</span>
      </div>
      <div className={s.previewGrid}>
        <div className={s.previewSource}>
          <span className={s.uiLabel}>The speaker says</span>
          <p>
            “Welcome.
            <br />
            Thank you.”
          </p>
          <Waveform />
          <div
            className={s.languageButtons}
            role="group"
            aria-label="Preview caption language"
          >
            {listenerSamples.map((language, i) => (
              <button
                key={language.code}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {language.name}
              </button>
            ))}
          </div>
          <span className={s.selectionHint}>
            Choose a language to change the example.
          </span>
        </div>
        <div className={s.previewPhone}>
          <div className={s.phoneNotch} aria-hidden="true" />
          <div className={s.phoneTop}>
            <strong>Exbabel</strong>
            <span>Listener view</span>
          </div>
          <div className={s.previewLanguage}>
            <span>Caption language</span>
            <strong lang={sample.code}>{sample.native}</strong>
          </div>
          <div
            className={s.previewCaption}
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              key={sample.code}
              className={s.captionChange}
              lang={sample.code}
            >
              <p>{sample.greeting}</p>
              <p>{sample.thanks}</p>
            </div>
          </div>
          <div className={s.previewAudioNote}>
            <Headphones />
            <p>
              In a supported session, press play to hear translated speech
              through headphones.
            </p>
          </div>
        </div>
      </div>
      <p className={s.previewFoot}>
        Prepared greeting translations demonstrate the reading experience.
        Actual wording, voice availability, and delay vary by session. This
        preview does not generate or play audio.
      </p>
      <noscript>
        <p>
          Language switching needs JavaScript. Spanish: Bienvenidos. Gracias.
          French: Bienvenue. Merci.
        </p>
      </noscript>
    </div>
  );
}

export function Equipment({
  kind,
}: {
  kind: "mixer" | "interface" | "browser" | "phone";
}) {
  return (
    <svg
      className={s.equipment}
      viewBox="0 0 160 110"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "mixer" && (
        <>
          <rect
            x="18"
            y="15"
            width="124"
            height="80"
            rx="8"
            fill="var(--diagram-paper, #f4f6ff)"
          />
          {[40, 66, 94, 120].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="32" r="5" />
              <path d={"M" + x + " 48v34"} />
              <rect
                x={x - 5}
                y={55 + (i % 2) * 13}
                width="10"
                height="8"
                rx="2"
                fill="currentColor"
              />
            </g>
          ))}
        </>
      )}
      {kind === "interface" && (
        <>
          <rect
            x="15"
            y="33"
            width="130"
            height="52"
            rx="8"
            fill="var(--diagram-paper, #f4f6ff)"
          />
          <circle cx="43" cy="59" r="13" />
          <circle cx="43" cy="59" r="6" />
          <circle cx="108" cy="58" r="16" />
          <path d="M108 43v8M67 59h16M74 18v15M84 18v15" />
        </>
      )}
      {kind === "browser" && (
        <>
          <rect
            x="24"
            y="12"
            width="112"
            height="77"
            rx="5"
            fill="var(--diagram-paper, #f4f6ff)"
          />
          <path d="M24 31h112M34 21h1m7 0h1m7 0h1M12 97h136l-12-8H24z" />
          <path
            d="M48 60v9m12-20v30m12-36v39m12-30v24m12-35v43m12-24v11"
            strokeWidth="4"
          />
        </>
      )}
      {kind === "phone" && (
        <>
          <rect
            x="52"
            y="5"
            width="57"
            height="100"
            rx="10"
            fill="var(--diagram-paper, #f4f6ff)"
          />
          <path d="M69 13h22M65 44h31M65 53h24M65 62h28M75 96h12" />
          <path d="M31 51v-4a49 49 0 0 1 0-1c0-16 11-30 21-34M128 51v-4c0-16-9-27-19-34" />
          <rect x="25" y="49" width="9" height="22" rx="4" />
          <rect x="125" y="49" width="9" height="22" rx="4" />
        </>
      )}
    </svg>
  );
}

function WorkflowGraphic({ stage }: { stage: number }) {
  return (
    <div className={s.workflowGraphic}>
      {stage === 0 && (
        <>
          <div className={s.graphicPair}>
            <Equipment kind="mixer" />
            <span aria-hidden="true">→</span>
            <Equipment kind="interface" />
          </div>
          <div className={s.inputSelection}>
            <span>Browser audio input</span>
            <strong>
              Your connected interface <span aria-hidden="true">⌄</span>
            </strong>
          </div>
          <p>Give Exbabel a clear speech feed.</p>
        </>
      )}
      {stage === 1 && (
        <>
          <div className={s.sessionIllustration}>
            <div className={s.panelBar}>
              <strong>Exbabel</strong>
              <span>Host setup</span>
            </div>
            <span className={s.uiLabel}>Example language selection</span>
            <div className={s.selectedLanguages}>
              <span>English</span>
              <span>Spanish</span>
              <span>French</span>
            </div>
            <Waveform />
            <strong className={s.sessionAction}>Start broadcasting</strong>
          </div>
          <p>Select supported languages for this service.</p>
        </>
      )}
      {stage === 2 && (
        <>
          <div className={s.accessIllustration}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m19 30-3 3a9 9 0 0 1-13-13l8-8a9 9 0 0 1 13 0m5 6 3-3a9 9 0 0 1 13 13l-8 8a9 9 0 0 1-13 0M16 24h16" />
            </svg>
            <strong>Your session access</strong>
            <span>QR code · Access link · Session code</span>
            <div className={s.accessLine}>
              Share with your congregation <span aria-hidden="true">↗</span>
            </div>
          </div>
          <p>Put joining instructions where people can find them.</p>
        </>
      )}
      {stage === 3 && (
        <>
          <div className={s.joinedIllustration}>
            <Equipment kind="phone" />
            <div>
              <span className={s.uiLabel}>Example caption</span>
              <p lang="es">
                Bienvenidos.
                <br />
                Gracias.
              </p>
              <span className={s.listenLabel}>
                <Headphones />
                Listen or read
              </span>
            </div>
          </div>
          <p>Each person chooses an available language.</p>
        </>
      )}
    </div>
  );
}

const steps = [
  {
    title: "Connect the speech source",
    role: "Church team",
    text: "Route a microphone or mixer feed to the host computer through a compatible input. Select that device in the browser and check that speech is clear before anyone joins.",
  },
  {
    title: "Set up the session",
    role: "Host",
    text: "Open church broadcasting, select the supported languages for your service, and start broadcasting. Join from a second device to check the audio or captions your attendees will receive.",
  },
  {
    title: "Share attendee access",
    role: "Welcome team",
    text: "Share the session’s QR code, access link, or code. Add brief joining instructions at the entrance or on a slide, and have a volunteer available to help first-time listeners.",
  },
  {
    title: "Let listeners choose",
    role: "Attendee",
    text: "Open the session in a browser and select an available language. Press play for translated audio and use headphones, or read written captions where the session supports them.",
  },
];

export function ServiceWorkflow() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className={s.workflow}>
      <ol className={s.workflowSteps}>
        {steps.map((step, i) => (
          <li key={step.title} data-active={active === i}>
            <h3 className={ready ? s.mobileStepTitle : s.staticStepTitle}>
              <span className={s.stepNumber}>{i + 1}</span>
              {step.title}
            </h3>
            {ready && (
              <button
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                aria-controls="workflow-stage"
              >
                <span className={s.stepNumber}>{i + 1}</span>
                <span>{step.title}</span>
                <span className={s.stepArrow} aria-hidden="true">
                  ↗
                </span>
              </button>
            )}
            <p>
              <strong>{step.role}:</strong> {step.text}
            </p>
            <div className={s.mobileWorkflowGraphic}>
              <WorkflowGraphic stage={i} />
            </div>
          </li>
        ))}
      </ol>
      <div id="workflow-stage" className={s.workflowStage}>
        <div className={s.stageLabel}>
          <span>Illustrative example</span>
          <span>Step {active + 1} of 4</span>
        </div>
        <div key={active} className={s.stageChange}>
          <WorkflowGraphic stage={active} />
        </div>
        <p className={s.stageHint}>
          Select a step to explore the service workflow.
        </p>
      </div>
    </div>
  );
}

export function AudioSetupGraphic() {
  const devices = [
    {
      kind: "mixer" as const,
      title: "Church mixer",
      detail: "A clear speech feed",
    },
    {
      kind: "interface" as const,
      title: "Compatible input",
      detail: "Audio interface or USB input",
    },
    {
      kind: "browser" as const,
      title: "Host computer",
      detail: "Exbabel in your browser",
    },
    {
      kind: "phone" as const,
      title: "Attendee devices",
      detail: "Internet + headphones for audio",
    },
  ];
  return (
    <figure className={s.setupFigure}>
      <div className={s.setupCaption}>
        <strong>Follow the speech, from source to seat.</strong>
        <span>Illustrative setup</span>
      </div>
      <div className={s.setupRoute}>
        {devices.map((device, i) => (
          <div className={s.setupNode} key={device.kind}>
            <Equipment kind={device.kind} />
            <div>
              <strong>{device.title}</strong>
              <p>{device.detail}</p>
            </div>
            {i < 3 && (
              <span className={s.setupArrow} aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        The church supplies the audio connection and host computer. The browser
        must recognize the connected input; a mixer alone does not connect to
        Exbabel.
      </figcaption>
    </figure>
  );
}
