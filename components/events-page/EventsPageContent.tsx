'use client';

import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { motion, useReducedMotion } from 'motion/react';
import Navbar from '@/components/Navbar';
import EventsInteractiveScene from './EventsInteractiveScene';
import EventsMotionMedia from './EventsMotionMedia';
import s from './EventsPage.module.css';

const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
const faqs = [
  ['Do attendees need to download an app?', 'No. Attendees open the room link or scan its QR code in their phone browser, then choose an available language. For translated audio, ask attendees to bring headphones. Access requirements depend on your event settings.'],
  ['What do we need at the venue?', 'A host computer, a clear microphone or soundboard feed, and a reliable internet connection. A soundboard may need a compatible USB audio interface. Test the complete audio path at the venue before your event.'],
  ['Can we organize multiple rooms and sessions?', 'Yes. Organize events, rooms, and sessions, with a separate listening experience for each room. Discuss your expected number of concurrent rooms when planning your event.'],
  ['Can we guide names and specialist terminology?', 'Yes. Prepare system instructions in the room’s Host Mode settings before broadcasting. Add terminology preferences, pronunciation guidance, tone, and speaker context. These guide the AI; exact wording is not guaranteed. Changes apply to a new broadcast.'],
  ['Do attendees need internet access?', 'Yes. Both the host and attendees need a reliable connection. Check venue Wi-Fi coverage and capacity, and test with the devices and languages you expect to use.'],
  ['How accurate is the translation?', 'Exbabel uses AI translation, which can make mistakes. Clear audio, supported languages, and suitable terminology guidance help. Rehearse with representative content and arrange appropriate human support for situations where exact interpretation is essential.'],
  ['Can our AV team operate a room?', 'Yes. Room operator links give designated crew a way to open Host Mode for their assigned room. Your organizing team can manage the event separately from the people running the audio.'],
  ['What will we cover in a demo?', 'Bring your event dates, audience languages, room layout, and audio setup. We can walk through the host and attendee experiences and discuss the setup and pricing for your event.'],
];
const benefits = [
  ['01 / Join', 'Open the room link', 'Share a room link or display its QR code. Attendees open the listening experience in their browser.'],
  ['02 / Choose', 'Choose a language', 'Each attendee selects an available language without changing what everyone else hears.'],
  ['03 / Follow', 'Listen and follow captions', 'Translated speech and live captions help guests follow the talk as it happens. Headphones keep listening personal.'],
];
const steps = [
  ['Build your event', 'Organize rooms and sessions. Choose your languages and prepare instructions for names, specialist terms, and speaker context.'],
  ['Connect and rehearse', 'Open Host Mode and select your microphone or soundboard input. Test the audio and translation with a listener before guests arrive.'],
  ['Share the room and go live', 'Display the QR code or send the listening link. Start broadcasting when the speaker is ready.'],
];
const features = [
  ['Give every room its place', 'Organize your main stage, workshops, and breakout sessions within the event.'],
  ['Give your crew a clear role', 'Share room operator links with the people running audio, while your team manages event details.'],
  ['Prepare the words that matter', 'Add terminology and speaker guidance before the broadcast. Rehearse to hear how the AI handles your content.'],
];

function Tagline() {
  return <p className={s.tagline}><strong>One speaker</strong><strong>A conversation in many languages</strong></p>;
}
function DemoLink() { return <Link href="/demo/" className={`${s.cta} ${s['button-md']}`}>Book an Events demo <span aria-hidden="true">↗</span></Link>; }

export default function EventsPageContent() {
  const reduced = useReducedMotion();
  return <div className={`${s.page} ${manrope.className}`}>
    <a className={s.skip} href="#events-content">Skip to content</a><Navbar />
    <main id="events-content">
      <div className={s.heroStage}><section className={`${s.hero} ${s.wrap}`} aria-labelledby="events-title">
        <motion.div className={s.heroCopy} initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: reduced ? 0 : .8, ease: [.22, 1, .36, 1] }}>
          <p className={s.eyebrow}>Exbabel Events / Live translation</p>
          <h1 id="events-title" className={s['heading-1']}>One stage.<br /><motion.span initial={false} animate={{ color: '#a9b6ff' }}>Their language.</motion.span></h1>
          <p className={`${s.lead} ${s['title-2']}`}>Bring your audience into the conversation with live AI translation. Attendees listen and follow captions in their chosen language, right on their phones.</p>
          <DemoLink /><p className={s['caption-2']}>Plan your languages, rooms, and audio setup with us.</p>
          <div className={s.proof}><span>Live audio + captions</span><span>No attendee app download</span></div>
        </motion.div><EventsInteractiveScene />
      </section><div className={s.heroLanguageRail} aria-hidden="true"><span>One shared conversation</span><span>English</span><span>Español</span><span>Français</span><span>Português</span><span>Deutsch</span></div></div>
      <div className={`${s.contexts} ${s.wrap}`} aria-label="Event types"><span>Built for the moments that bring us together</span><p>Conferences <b>·</b> Church gatherings <b>·</b> Workshops <b>·</b> Global teams</p></div>
      <section className={`${s.benefits} ${s.wrap}`} aria-labelledby="experience-title">
        <div className={s.sectionHead}><p className={s.eyebrow}>For everyone in the room</p><h2 id="experience-title" className={s['heading-2']}>From the stage<br />to their headphones</h2><p>Give guests a simple way to connect with what is being said, using the device they already carry.</p></div>
        <div className={s.benefitGrid}>{benefits.map(([label, title, text]) => <article key={label}><span className={s.stepNumber}>{label}</span><h3 className={s['heading-5']}>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className={s.photoSection} aria-label="A shared event experience"><div className={s.wrap}><Tagline /><EventsMotionMedia /></div></section>
      <section id="how-it-works" className={`${s.workflow} ${s.wrap}`} aria-labelledby="workflow-title">
        <div className={s.sectionHead}><p className={s.eyebrow}>From planning to live</p><h2 id="workflow-title" className={s['heading-2']}>Prepare your room<br />before they arrive</h2><p>Set up the event, check your audio, and welcome your audience.</p></div>
        <ol className={s.steps}>{steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3 className={s['heading-5']}>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>
      <section className={s.operations} aria-labelledby="operations-title"><div className={`${s.wrap} ${s.operationsGrid}`}>
        <div><p className={s.eyebrow}>For the team behind the event</p><h2 id="operations-title" className={s['heading-2']}>Every room and session<br />in one workspace</h2><p>Keep the event organized while your crew focuses on the room.</p><div className={s.featureList}>{features.map(([title, text]) => <article key={title}><h3 className={s['title-1']}>{title}</h3><p>{text}</p></article>)}</div></div>
        <aside className={s.schedule} aria-label="Illustrative event planning example"><div className={s.scheduleHeader}><span className={s.eyebrow}>Your event workspace</span><span className={s.sampleBadge}>Example</span></div><h3 className={s['heading-4']}>A day of shared ideas</h3><p className={s['caption-2']}>Rooms and sessions, brought together.</p>{[['09:00', 'Opening keynote', 'Main stage', 'English · Español · Français'], ['10:30', 'A closer conversation', 'Workshop room', 'English · 한국어'], ['14:00', 'Ideas into action', 'Breakout room', 'English · Português']].map(([time, title, room, langs]) => <div className={s.session} key={time}><span className={s['caption-2']}>{time}</span><div><span className={s.roomLabel}>{room}</span><h4 className={s['title-3']}>{title}</h4><p className={s['caption-2']}>{langs}</p></div></div>)}<div className={s.scheduleFoot}>Your program. A listening experience for each room.</div></aside>
      </div></section>
      <section className={`${s.faq} ${s.wrap}`} aria-labelledby="faq-title"><div><p className={s.eyebrow}>Before the doors open</p><h2 id="faq-title" className={s['heading-2']}>Planning your event?</h2><p>Practical answers for your team.</p></div><div>{faqs.map(([question, answer]) => <details key={question}><summary className={s['title-3']}>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className={s.finalCta} aria-labelledby="cta-title"><div className={s.wrap}><p className={s.eyebrow}>Start with your event</p><h2 id="cta-title" className={s['heading-1']}>Let’s plan your<br />next multilingual event</h2><p>Bring your languages, your venue, and your questions.<br />Let’s walk through the experience together.</p><DemoLink /></div></section>
    </main>
    <footer className={`${s.footer} ${s.wrap}`}><div><Link href="/" className={s['heading-5']}>Exbabel<span className={s.footerProduct}> Events</span></Link><p className={s['caption-2']}>Live translation. Shared understanding.</p></div><nav aria-label="Footer"><Link href="/events/" aria-current="page">Events</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link><a href="mailto:support@exbabel.com">Contact</a></nav></footer>
  </div>;
}
