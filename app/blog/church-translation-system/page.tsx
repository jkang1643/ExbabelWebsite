import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import BlogSubNav from "@/components/blog/BlogSubNav";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import BlogPostingSchema from "@/components/schema/BlogPostingSchema";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import EditorialCollageThumbnail from "@/components/blog/EditorialCollageThumbnail";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

const post = getPostBySlug("church-translation-system")!;

export const metadata: Metadata = {
  title: post.seoTitle,
  description: post.metaDescription,
  alternates: { canonical: post.canonicalUrl },
  openGraph: {
    title: post.seoTitle + " | Exbabel",
    description: post.metaDescription,
    url: `https://exbabel.com${post.canonicalUrl}`,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    authors: [post.author],
    images: [
      {
        url: `https://exbabel.com${post.featuredImage}`,
        width: 1200,
        height: 675,
        alt: post.featuredImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.seoTitle,
    description: post.metaDescription,
    images: [`https://exbabel.com${post.featuredImage}`],
  },
};

/* ─── Table of Contents ───────────────────────────────────────────────────── */

const TOC = [
  { id: "what-is-a-church-translation-system", label: "What Is a Church Translation System?" },
  { id: "why-churches-need-multilingual-translation", label: "Why Churches Need Multilingual Translation" },
  { id: "traditional-translation-equipment", label: "Traditional Translation Equipment for Churches" },
  { id: "how-exbabel-ai-church-translation-works", label: "How Exbabel AI Church Translation Works" },
  { id: "live-captions-and-sermon-translation", label: "Live Captions and Sermon Translation" },
  { id: "church-livestream-translation", label: "Church Livestream Translation" },
  { id: "connect-to-your-church-av-system", label: "Connect Exbabel to Your Church AV System" },
  { id: "phones-qr-codes-and-headphones", label: "Phones, QR Codes, and Translation Headphones" },
  { id: "human-vs-hardware-vs-ai", label: "Human Interpreter vs. Hardware vs. AI" },
  { id: "church-translation-costs", label: "Church Translation Costs" },
  { id: "security-and-reliability", label: "Enterprise-Grade Security and Reliability" },
  { id: "faqs", label: "FAQs about Church Translation" },
];

/* ─── Inline CTA ──────────────────────────────────────────────────────────── */

function ArticleCTA({
  headline,
  description,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: {
  headline: string;
  description: string;
  primaryText: string;
  primaryHref: string;
  secondaryText?: string;
  secondaryHref?: string;
}) {
  return (
    <aside
      className="my-12 rounded-2xl bg-gradient-to-br from-primary/5 via-blue-50/60 to-purple-50/40 border border-primary/10 p-8 md:p-10 text-center"
      role="complementary"
      aria-label="Call to action"
    >
      <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
        {headline}
      </h3>
      <p className="text-slate-600 mb-6 max-w-xl mx-auto">{description}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={primaryHref}
          className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
          {primaryText}
        </a>
        {secondaryText && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-block px-8 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all"
          >
            {secondaryText}
          </Link>
        )}
      </div>
    </aside>
  );
}

/* ─── Page Component ──────────────────────────────────────────────────────── */

export default function ChurchTranslationSystemArticle() {
  const readingTime = Math.ceil(post.wordCount / 200);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Blog", url: "https://exbabel.com/blog" },
          {
            name: "Church Translation System",
            url: `https://exbabel.com${post.canonicalUrl}`,
          },
        ]}
      />
      <BlogPostingSchema
        headline={post.title}
        description={post.metaDescription}
        url={`https://exbabel.com${post.canonicalUrl}`}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        image={`https://exbabel.com${post.featuredImage}`}
        author={post.author}
        wordCount={post.wordCount}
      />

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Secondary Publication Sub-Nav */}
        <div className="pt-16 sm:pt-20">
          <BlogSubNav />
        </div>

        <article className="pt-8 pb-20">
          {/* ── Back Navigation & Breadcrumb Bar ─────────────────── */}
          <div className="max-w-3xl mx-auto px-6 mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-xs group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              <span>Back to All Articles</span>
            </Link>

            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Insights
                  </Link>
                </li>
                <li aria-hidden="true">&rsaquo;</li>
                <li>
                  <Link
                    href={`/blog/category/${post.categorySlug || 'church-translation'}`}
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    {post.category}
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          {/* ── Header ────────────────────────────────────────────── */}
          <header className="max-w-3xl mx-auto px-6 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">{readingTime} min read</span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              AI Church Translation System for Live Services
            </h1>

            <p className="text-xl text-slate-500 font-medium mb-6">
              Every voice. Every language. One service.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 border-b border-slate-100 pb-6">
              <span className="font-semibold text-slate-700">By {post.author}</span>
              <time dateTime={post.datePublished}>
                Published{" "}
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {/* ── Hero Image ────────────────────────────────────────── */}
          <figure className="max-w-4xl mx-auto px-6 mb-12">
            <EditorialCollageThumbnail post={post} variant="hero" />
            <figcaption className="text-center text-xs text-slate-500 mt-3">
              {post.featuredImageAlt}
            </figcaption>
          </figure>

          {/* ── Article Body ──────────────────────────────────────── */}
          <div className="max-w-3xl mx-auto px-6">

            {/* Intro paragraph */}
            <div className="prose prose-slate prose-lg max-w-none mb-8 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">
              <p>
                Exbabel is a church translation system for pastors, administrators, AV
                teams, production managers, and multilingual ministry leaders. It turns
                live speech into translated audio and captions during the service.
              </p>
              <p>
                Attendees use their own tablets, phones, or laptops. They scan a QR code
                or open a web link, choose a language, and follow the message without
                downloading an app or using a dedicated receiver.
              </p>

              {/* Top CTAs */}
              <div className="flex flex-wrap gap-3 my-8 not-prose">
                <a
                  href="https://app.exbabel.com/live/checkout"
                  className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-sm"
                >
                  Start a Free Trial
                </a>
                <Link
                  href="/live"
                  className="inline-block px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
                >
                  See Exbabel Live in Action
                </Link>
                <Link
                  href="/demo"
                  className="inline-block px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>

            {/* Table of Contents */}
            <nav
              aria-label="Table of Contents"
              className="mb-12 p-6 bg-slate-50 rounded-xl border border-slate-100"
            >
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Table of Contents
              </h2>
              <ol className="space-y-2">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-slate-600 hover:text-primary transition-colors font-medium"
                    >
                      {i + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* ── Main content ────────────────────────────────────── */}
            <div className="prose prose-slate prose-lg max-w-none [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">

              {/* Section 1 */}
              <h2 id="what-is-a-church-translation-system">
                What Is a Church Translation System?
              </h2>
              <p>
                A church translation system delivers a speaker&rsquo;s message in another
                language. Traditional setups use a human church interpreter, transmitter,
                wireless receivers, and translation headphones for church attendees.
              </p>
              <p>
                Exbabel adds a real-time AI option. A pastor speaks into a microphone or
                livestream. Exbabel transcribes the speech, translates it, and delivers
                voice translation or live captions. Multiple languages can run at once,
                making sermon translation possible in the room, online, or both.
              </p>

              {/* Section 2 */}
              <h2 id="why-churches-need-multilingual-translation">
                Why Churches Need Multilingual Translation
              </h2>
              <p>
                Congregations may include immigrant families, international students,
                refugees, visitors, and children who understand different languages. When
                people miss a sermon, prayer, or announcement, they can feel separated
                from the church community.
              </p>
              <p>Church translation helps your church:</p>
              <ul className="list-disc list-outside pl-6">
                <li>Welcome multilingual visitors.</li>
                <li>Keep families worshipping together.</li>
                <li>Serve Spanish, Korean, Portuguese, Farsi, and other language groups.</li>
                <li>Support online viewers, ESL audiences, and people who are deaf or hard of hearing.</li>
                <li>Reach international viewers through livestreams.</li>
                <li>Reduce weekly interpreter scheduling.</li>
              </ul>

              {/* Editorial image 2 — product split */}
              <figure className="my-10">
                <img
                  src="/photos/blog/church-translation-product.jpg"
                  alt="Split editorial scene showing a diverse church congregation on the left and a translation dashboard interface with Spanish, Korean, and Portuguese channels on the right"
                  width={1200}
                  height={675}
                  className="w-full rounded-xl shadow-md"
                  loading="lazy"
                />
              </figure>

              {/* Section 3 */}
              <h2 id="traditional-translation-equipment">
                Traditional Translation Equipment for Churches
              </h2>
              <p>
                In a traditional system, the sound team sends the pastor&rsquo;s audio to a
                church interpreter. The interpreter delivers the translated speech through a
                separate microphone. A transmitter sends it to wireless receivers, and
                attendees listen with earbuds or translation headphones.
              </p>
              <p>
                This model offers human judgment and cultural context. It may also require
                interpreters, transmitters, church translation equipment, receivers,
                headphones, charging stations, frequency checks, and regular maintenance.
                Hardware supports in-room listeners but usually does not solve online
                translation.
              </p>

              {/* Section 4 */}
              <h2 id="how-exbabel-ai-church-translation-works">
                How Exbabel AI Church Translation Works
              </h2>
              <p>
                Exbabel uses{" "}
                <Link href="/how-it-works">real-time speech-to-speech translation</Link>:
              </p>
              <ol className="list-decimal list-outside pl-6 space-y-3 my-6">
                <li>
                  <strong>Capture:</strong> Connect a microphone, mixer feed, or
                  livestream.
                </li>
                <li>
                  <strong>Process:</strong> Exbabel transcribes and translates speech
                  continuously.
                </li>
                <li>
                  <strong>Deliver:</strong> Listeners receive translated audio, captions,
                  or both.
                </li>
                <li>
                  <strong>Share:</strong> Attendees scan a QR code or open a link.
                </li>
              </ol>
              <p>
                Exbabel reports translated speech in{" "}
                <Link href="/lab-test">approximately two seconds</Link> and live captions
                in approximately one second. Low latency matters because long delays make
                sermons, prayers, and announcements difficult to follow.
              </p>
              <p>
                The platform supports more than 200 languages and dialects overall. Voice
                availability varies by language and plan, while captions may cover more
                languages than AI voice output. Confirm your priority languages before
                launch.
              </p>

              {/* Editorial image 3 — typography/languages */}
              <figure className="my-10">
                <img
                  src="/photos/blog/church-translation-languages.jpg"
                  alt="Graphic typography composition with language codes EN, ES, KO, PT, AR alongside 3D microphone and translucent speech bubble elements on a deep midnight blue background"
                  width={1200}
                  height={675}
                  className="w-full rounded-xl shadow-md"
                  loading="lazy"
                />
              </figure>

              {/* Section 5 */}
              <h2 id="live-captions-and-sermon-translation">
                Live Captions and Sermon Translation
              </h2>
              <p>
                Live captions display a translated sermon as text on a phone, in a browser,
                or in a livestream player. They help people who prefer reading, viewers in
                noisy spaces, and people who are deaf or hard of hearing.
              </p>
              <p>
                AI voice translation lets attendees hear the sermon in their chosen language
                while watching the same service. It can also support announcements,
                conferences, youth events, and international ministry.
              </p>

              {/* Section 6 */}
              <h2 id="church-livestream-translation">
                Church Livestream Translation
              </h2>
              <p>
                Exbabel can add translation without rebuilding your livestream. The{" "}
                <Link href="/live">Live Video Translation</Link> workflow supports OBS
                Studio, vMix, Wirecast, RTMP encoders, hardware streaming appliances,
                YouTube Live, Facebook Live, HLS playback, and custom church apps.
              </p>
              <p>
                For professional productions, enter an Exbabel RTMP URL in your encoder or
                provide a supported stream URL. Exbabel processes the audio and creates
                translated voiceovers and captions. Embed the multilingual player on your
                website or route translated HLS feeds into an existing church app.
              </p>
            </div>

            {/* Mid-article CTA */}
            <ArticleCTA
              headline="Try Church Translation Free for 30 Days"
              description="Stream translated audio and captions to any device. No hardware, no app downloads, no interpreter scheduling."
              primaryText="Start a Free Trial"
              primaryHref="https://app.exbabel.com/live/checkout"
              secondaryText="See Exbabel Live in Action"
              secondaryHref="/live"
            />

            <div className="prose prose-slate prose-lg max-w-none [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">

              {/* Section 7 */}
              <h2 id="connect-to-your-church-av-system">
                Connect Exbabel to Your Church AV System
              </h2>
              <p>
                Exbabel works with many existing church AV workflows.
              </p>

              <h3>Mixer and USB Audio Interface Workflow</h3>
              <p>
                Send a clean feed from the church mixer to a computer. A USB audio interface
                can carry it into the browser or Exbabel session. Use the pastor&rsquo;s
                microphone, program mix, or a dedicated auxiliary output. A separate,
                balanced speech feed helps reduce music, feedback, and room noise.
              </p>

              <h3>Browser and Microphone Setup for Smaller Churches</h3>
              <p>
                A smaller church can start with a computer, a Chrome browser, a stable
                internet connection, and a microphone. The broadcaster workflow lets an
                operator select an audio input and languages, start broadcasting, download a
                listener QR code, and adjust latency.
              </p>
              <p>
                Because listeners use a browser, Exbabel can act as a church translation app
                alternative without requiring downloads.
              </p>

              <h3>RTMP Setup for Professional Productions</h3>
              <p>
                If your church uses OBS, vMix, Wirecast, or another RTMP encoder, connect
                that stream to{" "}
                <Link href="/live">Exbabel Live</Link>. Keep your cameras, overlays,
                switching, and livestream destination, and add translated audio and
                captions.
              </p>

              {/* Section 8 */}
              <h2 id="phones-qr-codes-and-headphones">
                Phones, QR Codes, and Translation Headphones
              </h2>
              <p>
                Display a QR code on a sanctuary screen, printed card, welcome desk sign, or
                livestream page. A listener chooses a language and listens through a phone or
                tablet with headphones.
              </p>
              <p>
                Smartphone access can reduce the need for specialized receivers, batteries,
                storage, and charging stations. Translation headphones for church services
                may still help people without smartphones, children, or venues that control
                listening equipment.
              </p>

              {/* Existing lifestyle photo from repo */}
              <figure className="my-10">
                <img
                  src="/photos/lifestyle_church_live_translation.png"
                  alt="Lifestyle photograph of a church congregation using live translation technology during a service"
                  width={1200}
                  height={675}
                  className="w-full rounded-xl shadow-md"
                  loading="lazy"
                />
              </figure>

              {/* Section 9 — Comparison Table */}
              <h2 id="human-vs-hardware-vs-ai">
                Human Interpreter vs. Hardware vs. AI
              </h2>
              <p>
                Choosing the best church translation system requires weighing cost,
                complexity, and scale.
              </p>

              <div className="overflow-x-auto -mx-6 px-6 my-10">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-bold text-slate-900 border-b-2 border-slate-200">
                        Feature
                      </th>
                      <th className="text-left p-4 font-bold text-slate-900 border-b-2 border-slate-200">
                        Human Interpreter
                      </th>
                      <th className="text-left p-4 font-bold text-slate-900 border-b-2 border-slate-200">
                        Traditional Equipment
                      </th>
                      <th className="text-left p-4 font-bold text-primary border-b-2 border-primary/30">
                        Exbabel AI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Setup", "Recruit and schedule people", "Install and manage hardware", "Start from a browser"],
                      ["Listening", "Receivers and headphones", "Receivers and headphones", "Phones, tablets, or laptops"],
                      ["Languages", "Available interpreters", "System channels", "200+ languages and dialects; voice availability varies"],
                      ["Accessibility", "Usually audio", "Usually audio", "Live audio plus captions"],
                      ["Online reach", "Extra coordination", "Often sanctuary-focused", "Livestream and RTMP workflows"],
                      ["Cost factors", "Staff time", "Hardware and maintenance", "Subscription, usage, audio, and internet costs"],
                    ].map(([feature, human, hardware, ai], i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                      >
                        <td className="p-4 font-semibold text-slate-800 border-b border-slate-100">
                          {feature}
                        </td>
                        <td className="p-4 text-slate-600 border-b border-slate-100">
                          {human}
                        </td>
                        <td className="p-4 text-slate-600 border-b border-slate-100">
                          {hardware}
                        </td>
                        <td className="p-4 text-slate-700 border-b border-slate-100 font-medium">
                          {ai}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 10 */}
              <h2 id="church-translation-costs">Church Translation Costs</h2>
              <p>
                Pricing depends on language count, service hours, audience size, latency, and
                whether you need in-room translation, livestream translation, or both.
              </p>
              <p>
                Traditional systems may include interpreter fees, receivers, transmitters,
                headphones, installation, and maintenance.{" "}
                <Link href="/live">Exbabel Live</Link> is listed at{" "}
                <a href="https://app.exbabel.com/live/checkout">
                  $29 per month
                </a>{" "}
                plus $10 per hour per language. Other plans include different live and solo
                hour allowances.
              </p>
              <p>
                Compare your current interpreter and hardware costs with the number of
                services and languages you support. Exbabel offers a transparent{" "}
                <Link href="/#pricing">pricing plan</Link> designed to scale with the needs
                of a ministry, from small church plants to international organizations.
              </p>
              <ul className="list-disc list-outside pl-6 space-y-3 my-6">
                <li>
                  <strong>Starter ($39/mo):</strong> Includes 6 hours of live translation,
                  supporting 200+ languages and 60 premium voices.
                </li>
                <li>
                  <strong>Pro ($99/mo):</strong> 12 hours of live translation with 50%
                  faster speeds and 90 premium voices.
                </li>
                <li>
                  <strong>Unlimited ($299/mo):</strong> 36 hours of live translation,
                  world-class lifelike voices (ElevenLabs), and custom branding.
                </li>
              </ul>

              {/* Existing workflow image from repo */}
              <figure className="my-10">
                <img
                  src="/photos/exbabel_workflow_before_during_after.png"
                  alt="Exbabel workflow diagram showing the before, during, and after stages of live event translation"
                  width={1200}
                  height={675}
                  className="w-full rounded-xl shadow-md"
                  loading="lazy"
                />
              </figure>

              {/* Section 11 — Security */}
              <h2 id="security-and-reliability">
                Enterprise-Grade Security and Reliability
              </h2>
              <p>
                When a church service only happens once, reliability and privacy are
                paramount. Exbabel is built for mission-critical live events and follows{" "}
                <Link href="/lab-test">ISO 25010 and IEEE 829 testing guidelines</Link>.
              </p>
              <ul className="list-disc list-outside pl-6 space-y-3 my-6">
                <li>
                  <strong>Privacy-First Processing:</strong> Audio streams are processed in
                  real time and are not stored permanently unless you explicitly enable
                  recording features. Exbabel implements encryption in transit and at rest.
                </li>
                <li>
                  <strong>Broadcast-Safe Playback:</strong> The streaming engine includes
                  automatic failover, stream recovery protection, intelligent buffering, and
                  network resilience to handle fluctuating internet speeds common in older
                  church buildings.
                </li>
              </ul>

              {/* Section 12 — FAQ (visible content, no FAQPage schema) */}
              <h2 id="faqs">FAQs about Church Translation System</h2>

              <h3>1. What is the best church translation system?</h3>
              <p>
                The best system depends on your service format, languages, budget, and
                audience. Exbabel is a strong option for churches seeking AI voice
                translation, captions, livestream support, and phone access without special
                receivers.
              </p>

              <h3>2. How do churches translate sermons?</h3>
              <p>
                Churches use a human church interpreter, traditional translation equipment,
                or an AI platform. With Exbabel, the pastor speaks into a microphone or
                stream, and the system produces translated audio and captions in real time.
              </p>

              <h3>3. What equipment is needed?</h3>
              <p>
                A small church needs a computer, Chrome browser, microphone, stable
                internet, and listener phones. Larger churches can connect a mixer, USB
                audio interface, Dante network audio, or RTMP encoder.
              </p>

              <h3>4. Can AI translate church services?</h3>
              <p>
                Yes. AI can translate sermons, announcements, and live speech into supported
                languages. Test names, theological terms, and language variants before a
                major service.
              </p>

              <h3>5. Can members listen on their phones?</h3>
              <p>
                Yes. Members join through a QR code or web link using a phone, tablet,
                laptop, or computer. No app download or dedicated receiver is required.
              </p>

              <h3>6. Do we need a human translator?</h3>
              <p>
                Not always. Exbabel can reduce the need for scheduled interpreters for many
                services. A human interpreter may still be best for sensitive pastoral
                conversations or situations requiring cultural judgment.
              </p>
            </div>

            {/* ── Make Every Service Understandable ────────────────── */}
            <div className="prose prose-slate prose-lg max-w-none mt-14 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
                Make Every Service Understandable
              </h2>
              <p>
                Exbabel translates live speech, sermons, captions, and livestreams through
                infrastructure you already use.
              </p>
              <p>
                <a href="https://app.exbabel.com/live/checkout">
                  Start a Free Trial
                </a>{" "}
                to test a service.{" "}
                <Link href="/live">See Exbabel Live in Action</Link> with your AV
                workflow. Or{" "}
                <Link href="/demo">schedule a consultation</Link> with our team about
                language coverage, latency, mixer connections, and multi-campus deployment.
              </p>
            </div>

            {/* Final CTA */}
            <ArticleCTA
              headline="See Exbabel in Action for Your Church"
              description="Stream translated audio and captions to phones, tablets, and laptops. No equipment rentals, no interpreter scheduling."
              primaryText="Start a Free Trial"
              primaryHref="https://app.exbabel.com/live/checkout"
              secondaryText="Talk to Our Team"
              secondaryHref="/demo"
            />

            {/* ── Related Resources ──────────────────────────────── */}
            <section className="mt-16 pt-12 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Related Resources
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "How Exbabel Works",
                    description:
                      "See the step-by-step setup process for real-time AI translation.",
                    href: "/how-it-works",
                  },
                  {
                    title: "Exbabel Live",
                    description:
                      "Real-time live video translation with AI voiceovers and synchronized captions.",
                    href: "/live",
                  },
                  {
                    title: "Latency Benchmark Report",
                    description:
                      "Independent performance evaluation conducted under IEEE 829 and ISO 25010 guidelines.",
                    href: "/lab-test",
                  },
                  {
                    title: "Schedule a Demo",
                    description:
                      "Talk to our team about your church translation needs.",
                    href: "/demo",
                  },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="group block p-5 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {resource.description}
                    </p>
                  </Link>
                ))}

                {/* Related blog posts */}
                {related.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group block p-5 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                      {relPost.title.length > 60
                        ? relPost.title.substring(0, 60) + "..."
                        : relPost.title}
                    </h3>
                    <p className="text-sm text-slate-500">{relPost.excerpt.substring(0, 100)}...</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
