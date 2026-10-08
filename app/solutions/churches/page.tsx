import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ChurchDemoLink from "@/components/ChurchDemoLink";
import ChurchBookingCalendar from "@/components/ChurchBookingCalendar";
import FAQSchema from "@/components/schema/FAQSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import {
  HeroTranslationScene,
  ListenerPreview,
  ServiceWorkflow,
  AudioSetupGraphic,
  Waveform,
  Headphones,
} from "@/components/church/ChurchVisuals";
import { churchFAQs } from "./content";
import styles from "./page.module.css";

const title = "AI Church Translation for Live Services | Exbabel";
const description =
  "Help your congregation follow live services with AI translated audio and captions. Explore Exbabel’s church translation setup and book a demo.";
const canonical = "https://www.exbabel.com/solutions/churches/";
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
        url: "/exbabel-og-preview.png",
        width: 1200,
        height: 630,
        alt: "Exbabel live translation for multilingual congregations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/exbabel-og-preview.png"],
  },
};
function Demo({ placement }: { placement: string }) {
  return <ChurchDemoLink placement={placement} className={styles.cta} />;
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
        items={[{ name: "Church translation", url: canonical }]}
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
              Help people follow your service in their language with translated
              audio and live captions on their own devices.
            </p>
            <Demo placement="hero" />
            <p className={styles.heroDetail}>
              Join in a browser. Share a QR code or session code.
              <br />
              No app download required.
            </p>
          </div>
          <HeroTranslationScene />
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
              <strong>Follow the sermon</strong>
              <span>Choose a preferred language.</span>
            </li>
            <li>
              <strong>Listen or read</strong>
              <span>Use the supported output that helps.</span>
            </li>
            <li>
              <strong>Bring a familiar device</strong>
              <span>Join through a web browser.</span>
            </li>
            <li>
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

        <section
          className={styles.outputSection + " " + styles.wrap}
          aria-labelledby="output-title"
        >
          <div className={styles.sectionIntro}>
            <h2 id="output-title">
              Hear the translation.
              <br />
              Keep the words in view.
            </h2>
            <p>
              Audio and captions serve different needs. Written language
              coverage is broader than voice coverage, so confirm your source
              language, target languages, and output modes before choosing a
              plan.
            </p>
          </div>
          <div className={styles.outputPair}>
            <article className={styles.audioArticle}>
              <div className={styles.audioGraphic} aria-hidden="true">
                <div className={styles.headphoneRing}>
                  <Headphones />
                </div>
                <Waveform />
                <span>Speech → Translated voice → Headphones</span>
              </div>
              <h3>Translated audio</h3>
              <p>
                Listen while looking toward the speaker. Attendees press play
                and use headphones so the translation does not compete with the
                room’s sound. Check voice availability, playback volume, and the
                experience of following with a delay during rehearsal.
              </p>
            </article>
            <article className={styles.captionsArticle}>
              <div className={styles.captionGraphic}>
                <span>Illustrative caption · Spanish</span>
                <p lang="es">
                  Bienvenidos.
                  <br />
                  Gracias.
                </p>
                <span>Example source: “Welcome. Thank you.”</span>
              </div>
              <h3>Written captions</h3>
              <p>
                Read the spoken message on a device screen, with or without
                listening to translated audio. Captions need a supported written
                language and a visible screen. A language in a caption list does
                not guarantee that a spoken voice is available for it.
              </p>
            </article>
          </div>
        </section>

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
              <source media="(max-width: 700px)" srcSet="/photos/blog/church-congregation-640.webp" type="image/webp" />
              <Image
                src="/photos/blog/church-congregation-1280.webp"
                alt="Congregation gathered in the pews during a church service"
                width={1920}
                height={1080}
                sizes="(max-width: 700px) 100vw, 60vw"
                loading="lazy"
              />
              </picture>
              <figcaption>
                Church service photograph shown for context; not a customer
                endorsement.
              </figcaption>
            </figure>
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
            <aside className={styles.sermonNotes}>
              <div className={styles.notesHeader}>
                <span>Before the service</span>
                <strong>Sermon rehearsal notes</strong>
              </div>
              <ul>
                <li>
                  <span>Names &amp; places</span>
                  <p>Check pronunciation and the translated wording.</p>
                </li>
                <li>
                  <span>Scripture references</span>
                  <p>
                    Keep the book, chapter, verse, and chosen text available.
                  </p>
                </li>
                <li>
                  <span>Meaning &amp; context</span>
                  <p>
                    Ask a fluent reviewer about sensitive or unfamiliar terms.
                  </p>
                </li>
              </ul>
              <p className={styles.note}>
                A rehearsal helps you judge suitability. It cannot guarantee
                every phrase will be correct.
              </p>
            </aside>
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

        <section
          className={styles.planningBand}
          aria-labelledby="pricing-title"
        >
          <div className={styles.wrap + " " + styles.planning}>
            <div>
              <h2 id="pricing-title">
                Plan for your service.
                <br />
                Then choose your plan.
              </h2>
              <p>
                Exbabel offers subscription plans with included usage and
                charges for additional usage. Start with your service schedule,
                required languages, and voice options; confirm current prices,
                included live hours, overage rates, and any trial terms before
                purchasing.
              </p>
              <Link prefetch={false} href="/#pricing">
                View Exbabel pricing <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <aside className={styles.limitations}>
              <h3>Leave room for the real world.</h3>
              <ul>
                <li>
                  <strong>Connectivity:</strong> hosts and attendees need
                  internet. If it drops, check the connection and active
                  session, then help listeners rejoin as needed.
                </li>
                <li>
                  <strong>Input and delay:</strong> noisy speech can affect
                  results. Translation delay varies; it is not simultaneous with
                  the original voice.
                </li>
                <li>
                  <strong>Language and meaning:</strong> output options differ,
                  and mistakes are possible. Do not assume singing or music will
                  translate reliably.
                </li>
              </ul>
              <p>
                Prepare a backup, such as an interpreter or translated notes. Do
                not depend on offline translation or automatic recovery.
              </p>
            </aside>
          </div>
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
