import Link from "next/link";
import Navbar from "@/components/Navbar";
import FAQSchema from "@/components/schema/FAQSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import type { Solution } from "./content";
import styles from "./SolutionPage.module.css";

function Signal({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className={styles.signal + (quiet ? " " + styles.signalQuiet : "")} aria-hidden="true">
      {[14, 24, 35, 19, 43, 28, 52, 31, 21, 46, 34, 18, 38, 24, 14].map((height, index) => (
        <i key={index} style={{ height }} />
      ))}
    </div>
  );
}

function Scene({ solution }: { solution: Solution }) {
  return (
    <figure className={styles.sceneFigure}>
      <div className={styles.scene} data-kind={solution.kind}>
        <svg className={styles.contextGraphic} viewBox="0 0 640 430" fill="none" aria-hidden="true">
          {solution.kind === "events" ? (
            <>
              <path d="M366 54c96 0 174 77 174 173M366 85c79 0 143 63 143 142M366 116c62 0 112 49 112 111" />
              <path d="M364 378h196M385 358h154M412 338h102" />
              <circle cx="366" cy="225" r="8" />
            </>
          ) : (
            <>
              <path d="M367 108h135v116H367zM386 128h98M386 149h69M386 170h87" />
              <path d="M367 290h135M384 307h101M400 324h69" />
              <circle cx="418" cy="269" r="11" /><circle cx="451" cy="269" r="11" />
            </>
          )}
        </svg>
        <div className={styles.sceneTop}>
          <span>One source. Many ways to follow.</span>
          <span>Illustrative example</span>
        </div>
        <div className={styles.sceneCanvas}>
          <div className={styles.sourcePanel}>
            <div className={styles.panelTop}><strong>Exbabel</strong><span>HOST</span></div>
            <div className={styles.sourceInner}>
              <span className={styles.microLabel}>Speech input</span>
              <strong>{solution.source}</strong>
              <Signal />
              <p>&ldquo;{solution.example}&rdquo;</p>
            </div>
          </div>
          <div className={styles.sceneBridge} aria-hidden="true">
            <span />
            <div className={styles.translateMark}>
              <svg viewBox="0 0 40 30" fill="none" aria-hidden="true"><path d="M5 12v6m7-13v20m8-25v30m8-23v16m7-12v8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
            </div>
            <span />
          </div>
          <div className={styles.listenerPanel}>
            <div className={styles.panelTop}><strong>Exbabel</strong><span>LISTENER</span></div>
            <div className={styles.listenerInner}>
              <span className={styles.microLabel}>Selected language</span>
              <strong>{solution.language}</strong>
              <p>{solution.translated}</p>
              <div className={styles.audioRow}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 9v6h3l4 4V5L7 9H4Zm11-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></svg><span>Translated audio</span><Signal quiet /></div>
            </div>
          </div>
        </div>
        <div className={styles.sceneBottom}>
          <span className={styles.dot} />
          <span>Live speech in</span>
          <span className={styles.arrow}>→</span>
          <span>Audio + captions out</span>
        </div>
      </div>
      <figcaption>Illustrative interface and prepared sample text, not live product output or a measured latency claim.</figcaption>
    </figure>
  );
}

function ContextVisual({ kind }: { kind: Solution["kind"] }) {
  if (kind === "events") {
    return (
      <figure className={styles.contextFigure + " " + styles.eventVisual}>
        <svg viewBox="0 0 680 360" role="img" aria-labelledby="event-graphic-title">
          <title id="event-graphic-title">Event stage connected to a multilingual audience</title>
          <rect x="28" y="22" width="624" height="316" rx="20" fill="#17275c" />
          <path d="M110 39v160M570 39v160" stroke="#5d70d3" strokeWidth="2" />
          <path d="M148 63h384v134H148z" fill="#294082" />
          <path d="M169 85h342v89H169z" fill="#3f55ac" />
          <circle cx="340" cy="112" r="16" fill="#e9efff" />
          <path d="M311 162c5-26 17-38 29-38s24 12 29 38" fill="#e9efff" />
          <path d="M340 157v33m-20 0h40" stroke="#a4b5ff" strokeWidth="5" strokeLinecap="round" />
          <path d="M297 107c-18 8-18 27 0 35m86-35c18 8 18 27 0 35" fill="none" stroke="#a7b9ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M125 241c110-33 320-33 430 0M95 274c124-45 366-45 490 0M72 310c145-57 391-57 536 0" fill="none" stroke="#6e83df" strokeWidth="13" strokeLinecap="round" strokeDasharray="24 16" />
          <rect x="507" y="150" width="75" height="120" rx="11" fill="#fff" />
          <rect x="518" y="169" width="53" height="5" rx="2" fill="#4058bd" />
          <rect x="518" y="184" width="45" height="5" rx="2" fill="#8a9bf1" />
          <rect x="518" y="199" width="50" height="5" rx="2" fill="#8a9bf1" />
          <path d="M530 229h28" stroke="#4058bd" strokeWidth="4" strokeLinecap="round" />
          <circle cx="545" cy="257" r="3" fill="#aab8ec" />
          <path d="M369 179c49 24 86 36 130 36" fill="none" stroke="#a9bbff" strokeWidth="3" strokeDasharray="7 8" />
        </svg>
        <figcaption>Illustration: a stage feed reaches guests on their own devices.</figcaption>
      </figure>
    );
  }
  return (
    <figure className={styles.contextFigure + " " + styles.businessVisual}>
      <svg viewBox="0 0 680 360" role="img" aria-labelledby="business-graphic-title">
        <title id="business-graphic-title">Business meeting with live language channels and shared notes</title>
        <rect x="28" y="22" width="624" height="316" rx="20" fill="#eaf4f3" />
        <rect x="76" y="55" width="364" height="248" rx="15" fill="#fff" />
        <rect x="76" y="55" width="364" height="34" rx="15" fill="#264d6a" />
        <circle cx="99" cy="72" r="4" fill="#a5d3d0" /><circle cx="113" cy="72" r="4" fill="#a5d3d0" />
        <rect x="103" y="110" width="139" height="119" rx="10" fill="#d6eae8" />
        <circle cx="172" cy="149" r="22" fill="#5faaa5" />
        <path d="M131 214c6-28 20-42 41-42s35 14 41 42" fill="#5faaa5" />
        <rect x="259" y="111" width="151" height="35" rx="8" fill="#eff5ff" />
        <path d="M275 128h17m8 0h22m8 0h16m8 0h23m8 0h9" stroke="#394dfe" strokeWidth="5" strokeLinecap="round" />
        <rect x="259" y="160" width="151" height="13" rx="6" fill="#dce4f7" />
        <rect x="259" y="183" width="124" height="13" rx="6" fill="#dce4f7" />
        <rect x="103" y="250" width="307" height="25" rx="7" fill="#f3f6fb" />
        <path d="M115 262h120m12 0h70" stroke="#7591ab" strokeWidth="5" strokeLinecap="round" />
        <path d="M441 143h48m-48 68h48" stroke="#5faaa5" strokeWidth="3" strokeDasharray="6 7" />
        <rect x="486" y="99" width="135" height="90" rx="13" fill="#394dfe" />
        <rect x="486" y="204" width="135" height="90" rx="13" fill="#2f8e88" />
        <path d="M502 125h43m-43 14h101m-101 14h87" stroke="#dfe6ff" strokeWidth="6" strokeLinecap="round" />
        <path d="M502 230h43m-43 14h101m-101 14h87" stroke="#d5f1ed" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <figcaption>Illustration: a meeting feed becomes audio and captions for colleagues in different languages.</figcaption>
    </figure>
  );
}

const heroVisuals = {
  events: {
    src: "/solutions/photos/event-hero-generated.png",
    alt: "Illustrative conference scene with a speaker at a lectern and an audience"
  },
  business: {
    src: "/solutions/photos/business-hero-generated.png",
    alt: "Illustrative office scene with two colleagues looking at a phone"
  }
};

function HeroPhoto({ solution }: { solution: Solution }) {
  const visual = heroVisuals[solution.kind];
  const event = solution.kind === "events";
  return (
    <figure className={styles.heroPhotoFigure}>
      <div className={styles.heroPhotoComposition} data-kind={solution.kind}>
        <img className={styles.heroPhoto} src={visual.src} alt={visual.alt} width="1586" height="1024" fetchPriority="high" />
        <div className={styles.heroPhotoShade} aria-hidden="true" />
        <div className={styles.heroPhotoTag}><span className={styles.liveDot} /><strong>Exbabel</strong><span>{event ? "LIVE EVENT TRANSLATION" : "BUSINESS TRANSLATION"}</span></div>
        <div className={styles.heroPhone} role="img" aria-label={event ? "Exbabel listener preview showing Spanish live captions and translated audio" : "Exbabel listener preview showing French live captions and translated audio"}>
          <div className={styles.phoneScreen}>
            <img src="/photos/church/exbabel-mobile-sermon-interface.png" alt="" aria-hidden="true" width="472" height="1024" />
            {!event && <span className={styles.phoneSelectorOverlay}>French (FR) ▾</span>}
            <div className={styles.phoneCaptionOverlay} aria-hidden="true">
              <span>Live translation</span>
              <p>{event ? "La próxima sesión comenzará en breve." : "Nous passerons en revue les prochaines étapes ensemble."}</p>
              <strong>{solution.translated}</strong>
            </div>
          </div>
        </div>
      </div>
      <figcaption>Generated scene with Exbabel’s existing listener mockup. Sample captions are prepared text, not live product output.</figcaption>
    </figure>
  );
}

export default function SolutionPage({ solution }: { solution: Solution }) {
  const canonical = `https://www.exbabel.com${solution.path}`;
  const sibling = solution.kind === "events"
    ? { href: "/solutions/business/", label: "Business meetings" }
    : { href: "/solutions/events/", label: "Events and conferences" };
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#solution-content">Skip to content</a>
      <Navbar />
      <FAQSchema faqs={solution.faqs} />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://www.exbabel.com/" }, { name: solution.kind === "events" ? "Event translation" : "Business translation", url: canonical }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${canonical}#software`,
        name: solution.kind === "events" ? "Exbabel Live Event Translation" : "Exbabel Live Business Translation",
        url: canonical,
        description: solution.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web browser",
        audience: { "@type": "Audience", audienceType: solution.kind === "events" ? "Event planners, producers, and attendees" : "Businesses, meeting hosts, and employees" },
        publisher: { "@type": "Organization", name: "Exbabel", url: "https://www.exbabel.com/" }
      }) }} />
      <main id="solution-content">
        <section className={styles.hero + " " + styles.wrap} aria-labelledby="solution-title">
          <div className={styles.heroCopy}>
            <h1 id="solution-title">{solution.h1} <span>{solution.h1Accent}</span></h1>
            <p className={styles.lead}>{solution.lead}</p>
            <div className={styles.languageStrip}>
              <span><strong>90+</strong> spoken voice languages</span>
              <span><strong>180+</strong> live caption languages</span>
            </div>
            <Link className={styles.cta} href="/demo/">Book a demo <span aria-hidden="true">↗</span></Link>
            <p className={styles.heroNote}>{solution.heroNote}</p>
          </div>
          <HeroPhoto solution={solution} />
        </section>

        <section className={styles.productPath} aria-labelledby="product-path-title">
          <div className={styles.wrap + " " + styles.productPathInner}>
            <div className={styles.productPathCopy}>
              <span className={styles.productPathKicker}>THE EXBABEL EXPERIENCE</span>
              <h2 id="product-path-title">{solution.kind === "events" ? "A clear path from the stage to each guest." : "A shared meeting, with a language choice for each person."}</h2>
              <p>{solution.kind === "events" ? "The production team sends one clean stage feed into a hosted session. Guests open the event link, choose an available language, and follow translated audio or captions on their own devices." : "A meeting host brings clear speech into a session. Colleagues open a link or code in their browsers, choose an available language, and follow the same conversation through audio or captions."}</p>
              <p>{solution.kind === "events" ? "The illustration shows the host and listener sides together so planners can see how the setup and attendee experience connect." : "The illustration shows how a single spoken update becomes a listener experience while the team stays in one meeting."}</p>
              <a href="#workflow-title" className={styles.productPathLink}>See the setup steps <span aria-hidden="true">→</span></a>
            </div>
            <Scene solution={solution} />
          </div>
        </section>

        <section className={styles.intro + " " + styles.wrap} aria-labelledby="intro-title">
          <h2 id="intro-title">{solution.intro.title}<br /><span>{solution.intro.accent}</span></h2>
          <div className={styles.introText}>{solution.intro.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <ul className={styles.benefits}>{solution.benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <div className={styles.benefitPhoto}><img src={benefit.photo} alt={benefit.alt} width="640" height="440" loading="lazy" decoding="async" /></div>
              <span className={styles.benefitIndex}>{String(index + 1).padStart(2, "0")}</span><strong>{benefit.title}</strong><span>{benefit.text}</span>
            </li>
          ))}</ul>
        </section>

        <section className={styles.workflow} aria-labelledby="workflow-title">
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}><h2 id="workflow-title">{solution.workflow.title}</h2><p>{solution.workflow.lead}</p></div>
            {solution.kind === "events" && <div className={styles.eventPath} role="img" aria-label="Speech travels from stage microphone through the hosted translation session to guests' own devices">
              <div className={styles.pathNode}><span className={styles.pathIcon} aria-hidden="true">◉</span><strong>Stage audio</strong><small>Mic or clean mixer feed</small></div>
              <span className={styles.pathConnector} aria-hidden="true"><i /></span>
              <div className={styles.pathNode}><span className={styles.pathIcon} aria-hidden="true">≋</span><strong>Exbabel session</strong><small>Selected languages</small></div>
              <span className={styles.pathConnector} aria-hidden="true"><i /></span>
              <div className={styles.pathNode}><span className={styles.pathIcon} aria-hidden="true">▣</span><strong>Guest device</strong><small>Audio or live captions</small></div>
            </div>}
            <ol className={styles.steps}>{solution.workflow.steps.map((step, index) => (
              <li key={step.title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
            ))}</ol>
          </div>
        </section>

        <section className={styles.contextSection + " " + styles.wrap} aria-labelledby="context-title">
          <div>
            <h2 id="context-title">{solution.kind === "events" ? "The room stays together." : "The meeting stays shared."}</h2>
            <p>{solution.kind === "events" ? "Speakers stay on stage while guests choose how to follow the live feed." : "One spoken update can reach colleagues through the language channel that helps them follow."}</p>
          </div>
          <ContextVisual kind={solution.kind} />
        </section>

        <section className={styles.formats + " " + styles.wrap} aria-labelledby="formats-title">
          <div><h2 id="formats-title">{solution.formats.title}</h2><p>{solution.formats.lead}</p></div>
          <div className={styles.formatGraphic} aria-label="Diagram: one speech feed reaches translated audio and captions">
            <div className={styles.formatSource}><span>LIVE SPEECH</span><Signal /></div>
            <div className={styles.formatJoin} aria-hidden="true" />
            <div className={styles.formatOutputs}>
              <div><span className={styles.outputSymbol} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 14v-3a8 8 0 0 1 16 0v3M3 13h4v8H5a2 2 0 0 1-2-2v-6Zm14 0h4v6a2 2 0 0 1-2 2h-2v-8Z" /></svg></span><strong>Translated audio</strong><span>Listen on your device</span></div>
              <div><span className={styles.outputSymbol} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M7 9h10M7 13h10M7 17h6" /></svg></span><strong>Live captions</strong><span>Read as speech unfolds</span></div>
            </div>
          </div>
        </section>

        <section className={styles.statement}><div className={styles.wrap}><span className={styles.quoteMark} aria-hidden="true">&ldquo;</span><blockquote>{solution.quote}</blockquote><p>An Exbabel point of view</p></div></section>

        <section className={styles.uses + " " + styles.wrap} aria-labelledby="uses-title">
          <div className={styles.sectionHeading}><h2 id="uses-title">{solution.uses.title}</h2><p>{solution.uses.lead}</p></div>
          <div className={styles.useGrid}>{solution.uses.items.map((item, index) => (
            <article key={item.title} className={styles.useItem}>
              <div className={styles.useIllustration} data-index={index} aria-hidden="true"><span /><i /><b /></div>
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}</div>
        </section>

        <section className={styles.scenarios + " " + styles.wrap} aria-labelledby="scenarios-title">
          <div className={styles.scenarioIntro}>
            <span className={styles.scenarioKicker}>ILLUSTRATIVE PLANNING SCENARIOS</span>
            <h2 id="scenarios-title">{solution.kind === "events" ? "Picture the room. Plan the language path." : "Picture the meeting. Plan for understanding."}</h2>
            <p>{solution.kind === "events" ? "These examples show how a producer could build translation into an agenda. They are illustrative scenarios, not customer case studies or measured results." : "These examples show how a team could use language access at work. They are illustrative scenarios, not customer case studies or measured results."}</p>
          </div>
          <div className={styles.scenarioStack}>{solution.scenarios.map((scenario, index) => (
            <article className={styles.scenarioCard} key={scenario.title} data-index={index}>
              <div className={styles.scenarioCardLead}><span>{scenario.eyebrow}</span><h3>{scenario.title}</h3><b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b></div>
              <div className={styles.scenarioCardBody}><p><strong>The situation</strong>{scenario.situation}</p><p><strong>The plan</strong>{scenario.approach}</p><p className={styles.scenarioOutcome}><strong>What becomes possible</strong>{scenario.outcome}</p></div>
            </article>
          ))}</div>
        </section>

        <section className={styles.caution + " " + styles.wrap} aria-labelledby="caution-title">
          <div><h2 id="caution-title">{solution.caution.title}</h2><Link href="/guides/broadcasting/">Read the setup guide <span aria-hidden="true">→</span></Link></div>
          <div>{solution.caution.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section className={styles.faq + " " + styles.wrap} aria-labelledby="faq-title">
          <div><h2 id="faq-title">Questions before<br />your first session?</h2><p>{solution.faqLead}</p></div>
          <div className={styles.faqList}>{solution.faqs.map((faq) => (
            <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>
          ))}</div>
        </section>

        <section className={styles.finalCta} id="book-demo" aria-labelledby="demo-title">
          <div className={styles.wrap}>
            <div><h2 id="demo-title">{solution.close.title}<br /><span>{solution.close.accent}</span></h2><p>{solution.close.text}</p><Link className={styles.cta} href="/demo/">Book an Exbabel demo <span aria-hidden="true">↗</span></Link></div>
            <aside><h3>A useful place to begin</h3><p>{solution.close.prep}</p><Link href={sibling.href}>Explore {sibling.label.toLowerCase()} <span aria-hidden="true">→</span></Link></aside>
          </div>
        </section>
      </main>
      <footer className={styles.footer + " " + styles.wrap}>
        <Link href="/" className={styles.wordmark}>Exbabel</Link>
        <p>Live translation. Shared understanding.</p>
        <nav aria-label="Footer"><Link href="/guides/">Setup guides</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link><a href="mailto:support@exbabel.com">Support</a></nav>
      </footer>
      <details className={styles.photoCredits + " " + styles.wrap}><summary>Photography credits</summary><ul>{solution.benefits.map((benefit) => <li key={benefit.photo}><a href={benefit.source} target="_blank" rel="noreferrer">{benefit.credit}</a> · <a href={benefit.license === "CC BY-SA 4.0" ? "https://creativecommons.org/licenses/by-sa/4.0/" : benefit.license === "CC BY-SA 2.0" ? "https://creativecommons.org/licenses/by-sa/2.0/" : benefit.license === "CC BY 2.0" ? "https://creativecommons.org/licenses/by/2.0/" : "https://creativecommons.org/publicdomain/zero/1.0/"} target="_blank" rel="noreferrer">{benefit.license}</a></li>)}</ul><p>Stock photographs illustrate event and work settings; they do not depict Exbabel customers.</p></details>
    </div>
  );
}
