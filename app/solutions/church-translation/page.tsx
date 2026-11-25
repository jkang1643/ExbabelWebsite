import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import ChurchLanguageAccess from "@/components/church/ChurchLanguageAccess";
import ChurchDemoLink from "@/components/ChurchDemoLink";
import ChurchBookingCalendar from "@/components/ChurchBookingCalendar";
import FAQSchema from "@/components/schema/FAQSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import {
  HeroTranslationScene,
  ListenerPreview,
  ServiceWorkflow,
  AudioSetupGraphic,
} from "@/components/church/ChurchVisuals";
import { churchFAQs } from "./content";
import styles from "./page.module.css";

const title =
  "Church Translation System — AI Audio & Captions for Live Services | Exbabel";
const description =
  "Live AI church translation with unlimited simultaneous languages, 90+ spoken voice languages, and 180+ caption languages. No app required.";
const canonical = "https://www.exbabel.com/solutions/church-translation/";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    locale: "en_US",
    siteName: "Exbabel",
    images: [
      {
        url: "/photos/church/exbabel_worship_composite.png",
        width: 858,
        height: 644,
        alt: "Exbabel live translation for multilingual congregations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/photos/church/exbabel_worship_composite.png"],
  },
};
function Demo({ placement }: { placement: string }) {
  return <ChurchDemoLink placement={placement} className={styles.cta} />;
}

function ChurchHeroCollage() {
  return (
    <figure className={styles.heroCollage}>
      <div className={styles.heroCollageImage}>
        <Image
          className={styles.heroScenePhoto}
          src="/photos/church/church-hero-generated.png"
          alt="Illustrative church service with a pastor speaking and a congregation listening"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 55vw"
        />
        <div className={styles.heroSceneShade} aria-hidden="true" />
        <div className={styles.heroSceneTag}>
          <span className={styles.heroSceneDot} aria-hidden="true" />
          <strong>Exbabel</strong>
          <span>CHURCH TRANSLATION</span>
        </div>
        <div className={styles.heroPhoneFrame} role="img" aria-label="Existing Exbabel listener interface showing live Spanish sermon translation">
          <Image
            src="/photos/church/exbabel-mobile-sermon-interface.png"
            alt=""
            width={472}
            height={1024}
            aria-hidden="true"
          />
        </div>
      </div>
      <figcaption>
        Generated church scene with Exbabel’s existing listener view. Sample captions shown in the interface are illustrative.
      </figcaption>
    </figure>
  );
}

export default function ChurchTranslationPage() {
  return (
    <div className={styles.page}>
      <Link prefetch={false} className={styles.skip} href="#church-content">
        Skip to content
      </Link>
      <Navbar churchPage />
      <FAQSchema faqs={churchFAQs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.exbabel.com/" },
          { name: "Church translation", url: canonical },
        ]}
      />
      {/* Page-level SoftwareApplication schema for church use-case */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://www.exbabel.com/solutions/churches/#app",
            name: "Exbabel Church Translation",
            url: canonical,
            description:
              "Real-time AI church translation with unlimited simultaneous languages. Congregants join via QR code or link for translated audio and live captions.",
            applicationCategory: "ReligiousApplication",
            operatingSystem: "Web Browser (Chrome, Safari, Firefox, Edge)",
            audience: {
              "@type": "Audience",
              audienceType: "Churches, Pastors, AV Teams, Worship Volunteers",
            },
            offers: {
              "@type": "Offer",
              url: "https://www.exbabel.com/#pricing",
              priceCurrency: "USD",
              price: "39",
              description: "Starter plan with 6 live hours per month and unlimited simultaneous supported languages.",
            },
            publisher: {
              "@type": "Organization",
              name: "Exbabel",
              url: "https://www.exbabel.com",
            },
          }),
        }}
      />
      <main id="church-content" tabIndex={-1}>
        <section
          className={styles.hero + " " + styles.wrap}
          aria-labelledby="church-title"
        >
          <div className={styles.heroCopy}>
            <h1 id="church-title">
              AI church translation <span>for live services</span>
            </h1>
            <p className={styles.lead}>
              <strong className="text-[#234fdb]">Unlimited simultaneous languages.</strong>{" "}
              Translate one service into as many supported languages as your congregation needs. Attendees
              choose their own language for live audio or captions on their devices.
            </p>
            <div className={styles.heroLangBadges}>
              <div className={styles.heroLangBadge}>
                <span className={styles.heroLangIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4m-4 0h8" /></svg>
                </span>
                <span><strong>90+</strong> Spoken Voice Languages</span>
              </div>
              <div className={styles.heroLangBadge}>
                <span className={styles.heroLangIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10h6m-6 4h10" /></svg>
                </span>
                <span><strong>180+</strong> Live Caption Languages</span>
              </div>
            </div>
            <Demo placement="hero" />
            <p className={styles.heroDetail}>
              Join in a browser. Share a QR code or session code.
              <br />
              No app download required.
            </p>
          </div>
          <ChurchHeroCollage />
        </section>

        <section className={styles.productPath} aria-labelledby="church-path-title">
          <div className={styles.productPathInner + " " + styles.wrap}>
            <div className={styles.productPathCopy}>
              <h2 id="church-path-title">One sermon. More ways to follow.</h2>
              <p>
                A clear microphone feed reaches the host computer. Your team
                starts the session, and attendees open a link or scan a QR code
                to choose an available language on their own devices.
              </p>
              <p>
                This animated view connects the host, translation, and listener
                sides of that journey. It uses prepared sample words to show
                the experience; actual wording and timing vary by service.
              </p>
              <a href="#workflow-title" className={styles.productPathLink}>
                Explore the Sunday setup <span aria-hidden="true">→</span>
              </a>
            </div>
            <HeroTranslationScene />
          </div>
        </section>

        <section
          className={styles.introduction + " " + styles.wrap}
          aria-labelledby="intro-title"
        >
          <h2 id="intro-title">
            The same message.
            <br />
            <span>Another way to follow it.</span>
          </h2>
          <div>
            <p>
              When a service is spoken in one language, part of the congregation
              may be working hard to keep up. AI translation for churches gives
              people another way to follow the sermon, announcements, and spoken
              parts of the service.
            </p>
            <p>
              Exbabel takes a clear speech input from your church’s computer and
              makes translated audio and captions available to listeners. Your
              team runs the session; attendees choose from the languages you
              make available. It is language support to prepare and evaluate,
              with people still part of the process.
            </p>
          </div>
          <ul className={styles.benefitStrip}>
            <li>
              <div className={styles.benefitImg}>
                <Image
                  src="/photos/church/church-follow-sermon.jpg"
                  alt="Person following a church sermon on their smartphone with live translated captions"
                  width={480}
                  height={360}
                  sizes="(max-width: 700px) 100vw, 25vw"
                  loading="lazy"
                />
              </div>
              <strong>Follow the sermon</strong>
              <span>Choose a preferred language.</span>
            </li>
            <li>
              <div className={styles.benefitImg}>
                <Image
                  src="/photos/church/church-listen-or-read.jpg"
                  alt="Hands selecting a language on a phone for live church translation"
                  width={480}
                  height={360}
                  sizes="(max-width: 700px) 100vw, 25vw"
                  loading="lazy"
                />
              </div>
              <strong>Listen or read</strong>
              <span>Use the supported output that helps.</span>
            </li>
            <li>
              <div className={styles.benefitImg}>
                <Image
                  src="/photos/church/church-familiar-device.jpg"
                  alt="Congregation member using a tablet in a modern church service"
                  width={480}
                  height={360}
                  sizes="(max-width: 700px) 100vw, 25vw"
                  loading="lazy"
                />
              </div>
              <strong>Bring a familiar device</strong>
              <span>Join through a web browser.</span>
            </li>
            <li>
              <div className={styles.benefitImg}>
                <Image
                  src="/photos/church/church-sunday-routine.png"
                  alt="Church AV tech team volunteer in the sound booth managing live translation on a tablet"
                  width={480}
                  height={360}
                  sizes="(max-width: 700px) 100vw, 25vw"
                  loading="lazy"
                />
              </div>
              <strong>Build a Sunday routine</strong>
              <span>Give volunteers a repeatable process.</span>
            </li>
          </ul>
        </section>

        <section
          className={styles.previewSection + " " + styles.wrap}
          aria-labelledby="listener-title"
        >
          <div className={styles.sectionIntro}>
            <h2 id="listener-title">
              A place in the service.
              <br />A language that feels familiar.
            </h2>
            <div>
              <p>
                Attendees scan the shared QR code, open the access link, or
                enter the session code. They choose an available language, then
                press play for audio or follow written captions where supported.
              </p>
              <p>
                A phone, tablet, or computer with internet access is enough to
                join the browser experience. For listening in the room, bring
                headphones and check the volume before the service begins.
              </p>
            </div>
          </div>
          <ListenerPreview />
        </section>

        <section
          className={styles.softSection}
          aria-labelledby="workflow-title"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionIntro}>
              <h2 id="workflow-title">
                From the sound desk
                <br />
                to the person in the pew.
              </h2>
              <p>
                The host looks after the speech input and session. The welcome
                team helps people join. Each listener chooses how to follow
                along.
              </p>
            </div>
            <ServiceWorkflow />
            <div className={styles.sectionFoot}>
              <Link prefetch={false} href="/guides/broadcasting/">
                Read the broadcasting guide <span aria-hidden="true">↗</span>
              </Link>
              <Link prefetch={false} href="/guides/listener/">
                See the listener steps <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <ChurchLanguageAccess />
        <section className={styles.statement} aria-label="Congregation benefit">
          <div className={styles.statementInner}>
            <div className={styles.statementCopy}>
              <p>
                One service.
                <br />
                More people able
                <br />
                to follow.
              </p>
              <span>Make language support part of your welcome.</span>
            </div>
            <figure>
              <picture>
                <Image
                  src="/photos/church/church-worship-exbabel.png"
                  alt="Church member worshiping in service with live Spanish sermon translation on Exbabel app"
                  width={1024}
                  height={576}
                  sizes="(max-width: 700px) 100vw, 60vw"
                  loading="lazy"
                />
              </picture>
            </figure>
          </div>
        </section>

        {/* ── How Exbabel Solves Church Translation Challenges ── */}
        <section className={styles.challenges + " " + styles.wrap} aria-labelledby="challenges-title">
          <div className={styles.challengesIntro}>
            <h2 id="challenges-title">
              How Exbabel Solves Church Translation Challenges
            </h2>
            <p>
              Traditional church translation solutions were designed for international corporate summits, not local congregations. 
              Here is how Exbabel’s 100% AI-powered real-time platform eliminates the sound booth, hardware headaches, and volunteer interpreter burnout.
            </p>
          </div>
          <div className={styles.challengesGrid}>
            <article className={styles.challengeCard + " " + styles.challengeCardTraditional}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3>Traditional Interpretation</h3>
                <span className={styles.cardBadge}>Complex &amp; Fragile</span>
              </div>
              <p>
                A multi-step manual process that depends heavily on scarce human resources and expensive physical hardware:
              </p>
              <ul className={styles.challengeList}>
                <li>
                  <span className={styles.challengeIconBad} aria-hidden="true">✕</span>
                  <div>
                    <strong>Dual-Interpreter Sound Booths</strong>
                    Requires two fluent volunteers or paid interpreters alternating every 15–20 minutes to combat cognitive fatigue.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconBad} aria-hidden="true">✕</span>
                  <div>
                    <strong>FM Headsets &amp; Radio Transmitters</strong>
                    Bulky receivers to purchase, charge, sanitize, and distribute each Sunday that frequently get lost or run out of battery.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconBad} aria-hidden="true">✕</span>
                  <div>
                    <strong>Language &amp; Scaling Limits</strong>
                    Restricted to 1 or 2 languages at most. Adding another language requires a second booth and more interpreters.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconBad} aria-hidden="true">✕</span>
                  <div>
                    <strong>Volunteer Scheduling Headaches</strong>
                    When an interpreter gets sick or is out of town, multilingual members and visitors are left without translation.
                  </div>
                </li>
              </ul>
            </article>

            <article className={styles.challengeCard + " " + styles.challengeCardExbabel}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3>Exbabel AI Platform</h3>
                <span className={styles.cardBadge}>100% AI-Powered</span>
              </div>
              <p>
                Real-time speech-to-speech translation engineered specifically for houses of worship and live church services:
              </p>
              <ul className={styles.challengeList}>
                <li>
                  <span className={styles.challengeIconGood} aria-hidden="true">✓</span>
                  <div>
                    <strong>No Human Interpreters Needed</strong>
                    100% AI-powered translation always ready the moment your pastor speaks. Zero volunteer burnout or cancelled services.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconGood} aria-hidden="true">✓</span>
                  <div>
                    <strong>Zero Special Hardware or Apps</strong>
                    Members and visitors simply scan a QR code with their own phone camera to listen in their headphones or read along in any browser.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconGood} aria-hidden="true">✓</span>
                  <div>
                    <strong>90+ Voice &amp; 180+ Caption Languages Simultaneously</strong>
                    Broadcast spoken AI voice translations in 90+ languages and live real-time captions in 180+ languages—all simultaneously from one speech feed.
                  </div>
                </li>
                <li>
                  <span className={styles.challengeIconGood} aria-hidden="true">✓</span>
                  <div>
                    <strong>Ultra-Low Latency WebRTC Audio</strong>
                    Translated audio and synchronized captions stream with sub-second latency, keeping listeners locked in with the sermon cadence.
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* ── Church Translation Use Cases ── */}
        <section className={styles.useCases} aria-labelledby="usecases-title">
          <div className={styles.wrap}>
            <div className={styles.useCasesContainer}>
              <div className={styles.useCasesIntro}>
                <h2 id="usecases-title">Church Translation Use Cases</h2>
                <p>
                  From Sunday morning preaching to midweek discipleship and community outreach, Exbabel adapts to every worship format and ministry gathering across your calendar with 90+ voice languages and 180+ caption languages.
                </p>
                <ul className={styles.useCasesItems}>
                  <li className={styles.useCaseItem}>
                    <div className={styles.useCaseIconWrap} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 3l9 7H3l9-7z"/></svg>
                    </div>
                    <div className={styles.useCaseText}>
                      <strong>Weekly Sunday Services</strong>
                      <span>Real-time sermon audio and live captions so every visitor can follow the message in their heart language.</span>
                    </div>
                  </li>
                  <li className={styles.useCaseItem}>
                    <div className={styles.useCaseIconWrap} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className={styles.useCaseText}>
                      <strong>Community Events &amp; Outreach</strong>
                      <span>Welcome immigrant neighbors, bilingual festivals, and multicultural family days with zero language barriers.</span>
                    </div>
                  </li>
                  <li className={styles.useCaseItem}>
                    <div className={styles.useCaseIconWrap} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div className={styles.useCaseText}>
                      <strong>Bible Studies, Small Groups &amp; Retreats</strong>
                      <span>Interactive discussions and scripture readings where everyone can engage and share in their primary language.</span>
                    </div>
                  </li>
                  <li className={styles.useCaseItem}>
                    <div className={styles.useCaseIconWrap} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div className={styles.useCaseText}>
                      <strong>Volunteer Onboarding &amp; Staff Training</strong>
                      <span>Equip AV technicians, greeters, children’s ministry workers, and cross-cultural ministry leaders with instant clarity.</span>
                    </div>
                  </li>
                  <li className={styles.useCaseItem}>
                    <div className={styles.useCaseIconWrap} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                    </div>
                    <div className={styles.useCaseText}>
                      <strong>Livestreams, Video Subtitles &amp; Dubbing</strong>
                      <span>Broadcast real-time captions to online campuses and automatically generate multilingual transcripts for sermon archives.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.useCasesPhoneMockup}>
                <div className={styles.phoneShell}>
                  <div className={styles.phoneScreen}>
                    <Image
                      src="/photos/church/exbabel-mobile-sermon-interface.png"
                      alt="Exbabel mobile translation interface displaying real-time Spanish sermon translation of John 3:16"
                      width={472}
                      height={1024}
                      sizes="(max-width: 900px) 260px, 320px"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.setup + " " + styles.wrap}
          aria-labelledby="setup-title"
        >
          <div className={styles.sectionIntro}>
            <h2 id="setup-title">
              Your sound system.
              <br />A clear path to Exbabel.
            </h2>
            <div>
              <p>
                The church supplies a computer, internet connectivity, and a
                suitable speech source. A mixer feed may need an audio interface
                or another compatible computer input. The connection depends on
                your mixer, interface, and operating system.
              </p>
              <p>
                Route the speaker’s voice as clearly as possible. Room noise,
                music masking the voice, clipping, and overlapping speakers can
                all make speech harder to recognize and translate.
              </p>
            </div>
          </div>
          <AudioSetupGraphic />
          <div className={styles.setupDetails}>
            <div>
              <h3>At the host computer</h3>
              <p>
                Allow microphone access and select the connected device in
                Exbabel’s browser audio input selector. Check the level and
                listen for distortion. A cable connection alone does not confirm
                that the browser is receiving the intended source.
              </p>
              <Link prefetch={false} href="/blog/church-translation-system/">
                Explore church audio setup and equipment{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className={styles.rehearsal}>
              <h3>Make Sunday familiar before Sunday.</h3>
              <p>
                Run a rehearsal using the actual microphone, speaker, languages,
                and attendee devices. Have a fluent listener check both the
                audio and captions. Record your input settings and joining
                instructions so a volunteer can repeat the setup next week.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sermon} aria-labelledby="sermon-title">
          <div className={styles.wrap + " " + styles.sermonInner}>
            <div className={styles.sermonCopy}>
              <h2 id="sermon-title">
                Prepare for the words
                <br />
                that matter most.
              </h2>
              <p>
                Sermon translation software works with the speech it receives.
                Keep a volunteer near the host session to monitor the feed and
                help listeners who have trouble joining.
              </p>
              <p>
                Test names, accents, scripture references, and theological terms
                with a fluent reviewer. Read references clearly and make the
                intended Bible passage available separately. AI may translate a
                quotation differently from your congregation’s preferred
                published translation.
              </p>
              <Demo placement="sermon" />
            </div>
            <div className={styles.sermonVisual}>
              <div className={styles.sermonImageCard}>
                <Image
                  src="/photos/church/exbabel_worship_composite.png"
                  alt="Pastor delivering a sermon on a modern church stage with live translation"
                  width={858}
                  height={644}
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className={styles.sermonImage}
                  loading="lazy"
                />
                <div className={styles.sermonLiveBadge}>
                  <span className={styles.liveDot} />
                  <span>Live Sermon Translation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.comparison + " " + styles.wrap}
          aria-labelledby="interpreters-title"
        >
          <div className={styles.sectionIntro}>
            <h2 id="interpreters-title">
              Technology helps.
              <br />
              People still matter.
            </h2>
            <p>
              Choose language support around the moment, the congregation, and
              the consequences of a misunderstanding. AI, human interpretation,
              and a hybrid approach each have a place.
            </p>
          </div>
          <div className={styles.comparisonRows}>
            <article>
              <h3>AI translation</h3>
              <p>
                A practical option for routine spoken services when an
                interpreter is unavailable. Needs a clear input, connectivity,
                supported languages, and preparation.
              </p>
              <span>Plan for review and listener support.</span>
            </article>
            <article>
              <h3>Human interpretation</h3>
              <p>
                A skilled interpreter brings active judgment to cultural
                context, sensitive pastoral conversations, and moments where
                precise meaning matters.
              </p>
              <span>Plan around interpreter availability.</span>
            </article>
            <article>
              <h3>A hybrid approach</h3>
              <p>
                Use AI to offer broader access while fluent volunteers or
                interpreters help with rehearsal, difficult passages, and
                individual listener needs.
              </p>
              <span>Give each person a clear responsibility.</span>
            </article>
          </div>
          <Link
            prefetch={false}
            href="/blog/church-interpreter-vs-ai-translation/"
          >
            Compare church translation options{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <Pricing surface="church" />

        {/* Social proof — Single Testimonial */}
        <section className={styles.socialProofSingle + " " + styles.wrap} aria-labelledby="testimonial-title">
          <blockquote className={styles.testimonialQuote}>
            <p>
              “We were searching for a way to serve our community and expand access for those who speak other languages. We chose Exbabel because of their <strong>church-focused approach, excellent translation quality, and the affordability that makes live multicultural services possible.</strong>”
            </p>
            <footer>
              <div className={styles.testimonialLogoWrap}>
                <Image
                  src="/photos/church/the-international-church-logo.png"
                  alt="The International Church of Metro Detroit"
                  width={250}
                  height={118}
                  className={styles.testimonialLogo}
                />
              </div>
            </footer>
          </blockquote>
        </section>

        <section
          className={styles.faq + " " + styles.wrap}
          aria-labelledby="faq-title"
        >
          <div>
            <h2 id="faq-title">
              Questions before
              <br />
              your first service?
            </h2>
            <p>
              Practical answers for pastors,
              <br />
              AV teams, and volunteers.
            </p>
          </div>
          <div className={styles.faqList}>
            {churchFAQs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="demo-title">
          <div className={styles.wrap}>
            <div className={styles.finalIntro}>
              <div>
                <h2 id="demo-title">
                  Bring your languages.
                  <br />
                  <span>Let’s start there.</span>
                </h2>
                <p>
                  Book an Exbabel demo. Bring your questions about your church’s
                  audio setup, the languages people need, and the service you
                  want to support.
                </p>
                <Demo placement="final" />
              </div>
              <div className={styles.demoPreparation}>
                <h3>A useful place to begin</h3>
                <p>
                  Have your mixer or microphone details, expected service
                  length, and priority languages ready. Select an available time
                  below; Calendly provides the meeting details in your
                  confirmation.
                </p>
              </div>
            </div>
            <div id="book-demo" className={styles.booking}>
              <h3>Choose a time for your church demo</h3>
              <p>
                Select an available time on Exbabel&apos;s booking calendar.
              </p>
              <ChurchBookingCalendar />
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer + " " + styles.wrap}>
        <Link prefetch={false} href="/" className={styles.wordmark}>
          Exbabel
        </Link>
        <p>Live translation. Shared understanding.</p>
        <nav aria-label="Footer">
          <Link prefetch={false} href="/guides/">
            Setup guides
          </Link>
          <Link prefetch={false} href="/privacy/">
            Privacy
          </Link>
          <Link prefetch={false} href="/terms/">
            Terms
          </Link>
          <Link prefetch={false} href="mailto:support@exbabel.com">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
}
