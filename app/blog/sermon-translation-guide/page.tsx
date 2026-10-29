import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import BlogSubNav from "@/components/blog/BlogSubNav";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import BlogPostingSchema from "@/components/schema/BlogPostingSchema";
import FAQSchema from "@/components/schema/FAQSchema";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import EditorialCollageThumbnail from "@/components/blog/EditorialCollageThumbnail";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

const post = getPostBySlug("sermon-translation-guide")!;

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
  { id: "how-do-you-translate-a-church-service-live", label: "How Do You Translate a Church Service Live?" },
  { id: "key-takeaways", label: "Key Takeaways" },
  { id: "three-ways-to-translate-a-live-sermon", label: "Three Ways to Translate a Live Sermon" },
  { id: "what-you-need-before-you-begin", label: "What You Need Before You Begin" },
  { id: "step-1-capture-a-clean-mic-feed", label: "Step 1: Capture a Clean Speech-Only Microphone Feed" },
  { id: "step-2-configure-live-translation-session", label: "Step 2: Configure the Live Translation Session" },
  { id: "step-3-get-worshippers-connected", label: "Step 3: Get Worshippers Connected" },
  { id: "step-4-rehearse-before-sunday", label: "Step 4: Rehearse Before Sunday (5-Minute Test)" },
  { id: "troubleshoot-common-failures", label: "Troubleshoot Common Failures" },
  { id: "ai-human-or-hybrid-what-changes", label: "AI, Human or Hybrid: What Changes" },
  { id: "make-next-sunday-your-test-run", label: "Make Next Sunday Your Test Run" },
  { id: "frequently-asked-questions", label: "Frequently Asked Questions" },
  { id: "source-log-and-references", label: "Source Log and Documented References" },
];

/* ─── FAQs ────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    question: "Can a Sermon Be Translated While the Pastor Is Still Speaking?",
    answer:
      "Yes. Human interpreters do this every Sunday, and neural AI systems can as well. Both operate simultaneously while the pastor speaks, introducing a brief processing delay. Neural models process speech in rolling sentence chunks. Production teams should measure the exact delay in their own sanctuary using a side-by-side recording test before advertising any latency figure.",
  },
  {
    question: "Do Visitors Need an App or Dedicated Receivers?",
    answer:
      "Not with a modern browser-based system. Attendees scan a printed QR code or open a web link in Safari or Chrome without installing native software or creating an account. Traditional radio receivers remain an offline alternative, and keeping loaner headphones on hand ensures full accessibility for guests without smartphones.",
  },
  {
    question: "What Equipment Does a Small Church Need?",
    answer:
      "A clean pastor microphone feed and a computer connected to stable internet are the minimum essentials. Attendees bring personal smartphones and earbuds. While a mixing console with an isolated speech-only auxiliary send makes audio capture cleaner, smaller ministries can start with a wireless microphone receiver plugged into a laptop USB audio interface.",
  },
  {
    question: "What Should We Test with Spanish, Vietnamese and Other Language Variants?",
    answer:
      "Begin by testing biblical references, theological terms, and ministry proper names. Hand the translated audio stream to a native speaker representing your congregation's regional demographic (for example, Mexican Spanish versus Iberian Spanish), and verify priority languages against your current software plan before announcing them from the pulpit.",
  },
  {
    question: "How Should a Church Recover if Captions Continue but Translated Audio Stops?",
    answer:
      "Check the listener's phone volume and verify they tapped the screen to satisfy browser media autoplay permissions. Next, reload the listener web page and reselect the language. If audio remains unresponsive, keep live captions running on the phone or sanctuary screen and direct worshippers needing audio assistance to a bilingual usher.",
  },
];

/* ─── Inline CTA Component ────────────────────────────────────────────────── */

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
      className="my-12 rounded-2xl bg-gradient-to-br from-primary/5 via-purple-50/60 to-sky-50/40 border border-primary/10 p-8 md:p-10 text-center not-prose"
      role="complementary"
      aria-label="Call to action"
    >
      <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
        {headline}
      </h3>
      <p className="text-slate-600 mb-6 max-w-xl mx-auto text-base">{description}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={primaryHref}
          className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-sm"
        >
          {primaryText}
        </a>
        {secondaryText && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-block px-8 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
          >
            {secondaryText}
          </Link>
        )}
      </div>
    </aside>
  );
}

/* ─── Main Page Component ─────────────────────────────────────────────────── */

export default function SermonTranslationGuideArticle() {
  const readingTime = Math.ceil(post.wordCount / 200);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Blog", url: "https://exbabel.com/blog" },
          {
            name: "Sermon Translation Guide",
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
      <FAQSchema faqs={FAQS} />

      <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
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
                    href={`/blog/category/${post.categorySlug}`}
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
              <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                Implementation &amp; AV Workflow
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Sermon Translation: How to Translate Church Services Live
            </h1>

            <p className="text-xl text-slate-500 font-medium mb-6">
              Learn how to translate sermons live using a church mixer, USB audio input, multilingual captions, and listener QR codes. Includes a Sunday testing checklist.
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
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-400">Sources accessed October 2026</span>
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
            {/* Intro Lead */}
            <div className="prose prose-slate prose-lg max-w-none mb-8 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">
              <p>
                It&apos;s 9:40 on a Sunday morning. A visitor asks your greeter where the translation headsets are. About 21.7% of people age five and older speak another language at home, according to Census Bureau figures for 2018 to 2022. Someone in your pews may be waiting right now. So how do you translate a sermon live without a closet full of expensive receivers?
              </p>

              {/* Top Quick Actions */}
              <div className="flex flex-wrap gap-3 my-8 not-prose">
                <a
                  href="https://app.exbabel.com/translate/checkout?plan=starter"
                  className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-full shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-sm"
                >
                  Start a Free Trial
                </a>
                <Link
                  href="/solutions/church-translation"
                  className="inline-block px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
                >
                  Church Translation Solution
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-block px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
                >
                  See How Exbabel Works
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
              <ol className="space-y-2 text-sm text-slate-600">
                {TOC.map((item, idx) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-xs font-mono text-slate-400 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Article Content */}
            <div className="prose prose-slate prose-lg max-w-none [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-700 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary">
              
              {/* Figure 1 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/sermon-translation-guide/visual-01-one-sermon-many-languages.webp" type="image/webp" />
                    <img
                      src="/photos/blog/sermon-translation-guide/visual-01-one-sermon-many-languages.png"
                      alt="One sermon many languages: a pastor speaks once while worshippers follow along in their own language on their smartphones"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 1: One sermon. Many languages. A pastor speaks once while listeners follow along in their own language on a personal device.
                </figcaption>
              </figure>

              {/* Section 1 */}
              <h2 id="how-do-you-translate-a-church-service-live">
                How Do You Translate a Church Service Live?
              </h2>
              <p>
                You send a clean copy of the pastor&apos;s voice into a translation tool, then let listeners pick a language on their own phones. Three routes work: a human interpreter with receivers, AI audio on phones, or synchronized captions. Most problems start earlier than the software: a muddy microphone, a mix full of drums, a weak connection, or a silent browser. This guide follows the signal step by step.
              </p>

              {/* Section 2: Key Takeaways */}
              <h2 id="key-takeaways">Key Takeaways</h2>
              <div className="my-6 p-6 bg-purple-50/60 rounded-2xl border border-purple-100 not-prose">
                <ul className="space-y-3 text-slate-800 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Start with a clean, speech-only copy of the pastor&apos;s microphone</strong>. Everything else in the translation chain depends on it.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Pick the route by your congregation&apos;s needs</strong>: human interpreter with receivers, real-time AI audio on smartphones, or visual captions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Treat the five-minute rehearsal test as the real purchase decision</strong>. Run it with actual sermon vocabulary before Sunday morning.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Keep a human fallback ready</strong> for unexpected network drops and emotionally sensitive pastoral moments.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Run tests on your own audio gear</strong>, because sanctuary acoustics and soundboards behave differently in every room.</span>
                  </li>
                </ul>
              </div>
              <p>
                Let&apos;s examine the three core delivery routes, because each changes the equipment you need and who operates it on Sunday morning.
              </p>

              {/* Section 3 */}
              <h2 id="three-ways-to-translate-a-live-sermon">
                Three Ways to Translate a Live Sermon
              </h2>
              <p>
                A sermon can cross a language barrier in three primary ways. Many growing multi-ethnic churches run two methods concurrently. Here is a comparison cheat sheet before examining each route:
              </p>

              {/* Table 1: Route Comparison */}
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 1: Three Primary Live Sermon Translation Delivery Routes
                  </caption>
                  <thead className="bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Delivery Route</th>
                      <th className="p-3 border-b border-slate-200">Works Best When</th>
                      <th className="p-3 border-b border-slate-200">What the Listener Needs</th>
                      <th className="p-3 border-b border-slate-200">Operational Trade-off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Human interpreter into receivers</td>
                      <td className="p-3">One primary second language and a dependable interpreter</td>
                      <td className="p-3">A borrowed physical receiver pack and headphones</td>
                      <td className="p-3 text-amber-700">Volunteer fatigue, battery management, lost headsets</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">AI-translated audio on attendee phones</td>
                      <td className="p-3">Multiple languages (2&ndash;10+) or rotating international visitors</td>
                      <td className="p-3">Personal smartphone, personal earbuds, and a QR scan</td>
                      <td className="p-3 text-sky-700">Requires stable sanctuary internet or cellular data</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Live translated captions</td>
                      <td className="p-3">Worshippers who prefer reading, reverberant rooms, or hard-of-hearing</td>
                      <td className="p-3">Personal smartphone or an overhead sanctuary side screen</td>
                      <td className="p-3">Visual distraction if typography or font size is poorly tuned</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Figure 2 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/sermon-translation-guide/visual-02-from-pulpit-to-pocket.webp" type="image/webp" />
                    <img
                      src="/photos/blog/sermon-translation-guide/visual-02-from-pulpit-to-pocket.png"
                      alt="Signal flow from pastor mic to mixer output through USB interface and AI translation to listener phone"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 2: From pulpit to pocket. The clean signal chain from pastor microphone through mixer and USB audio interface to AI translation and listener phones.
                </figcaption>
              </figure>

              <h3 id="human-interpreter-route">Human Interpreter into Receiver Channels</h3>
              <p>
                One bilingual volunteer speaks into a headset microphone from a booth or back corner. A transmitter broadcasts that voice across a radio frequency, and listeners tune in with battery-powered receiver packs. You get warm human delivery, pastoral nuance on theological terms, and zero dependence on the internet.
              </p>
              <p>
                The catch is weekly operational logistics: somebody must interpret every single Sunday, and somebody on the tech team must inventory packs, sanitize earpieces, and charge batteries. Our <Link href="/blog/church-interpreter-vs-ai-translation">church interpreter vs. AI translation comparison</Link> examines the volunteer burnout dynamics in detail.
              </p>

              <h3 id="ai-audio-route">AI Translated Audio on Attendee Phones</h3>
              <p>
                Here software performs speech recognition, translation, and neural voice synthesis. The pastor&apos;s audio feed enters a computer, and translated voice streams out in whatever language each congregant selects. Attendees scan a QR code, pop in personal earbuds, and listen in real time.
              </p>
              <p>
                As detailed on <Link href="/how-it-works">how Exbabel works</Link>, no dedicated receivers are handed out and no app store download or account setup is required. Production teams still own the audio engineering fundamentals: a clean microphone feed and a dependable internet uplink. Always verify voice options and supported languages on your plan before service.
              </p>

              <h3 id="captions-route">Captions for Those Who Prefer Reading</h3>
              <p>
                Many worshippers read a second language far faster than they can comprehend spoken vernacular, while others dislike wearing earbuds in worship. Real-time translated captions displayed on attendee phones or projected onto dedicated side screens solve both hurdles.
              </p>
              <p>
                Deaf and hard-of-hearing church members also benefit substantially from live visual text, though captions never substitute for a certified American Sign Language (ASL) interpreter. When projecting text, keep lines concise, choose high-contrast typography, and confirm legibility from the back pews. In Exbabel&apos;s system, text captions frequently support broader language variants than synthetic audio voices.
              </p>

              {/* Figure 3 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/sermon-translation-guide/visual-03-three-ways-to-follow-the-sermon.webp" type="image/webp" />
                    <img
                      src="/photos/blog/sermon-translation-guide/visual-03-three-ways-to-follow-the-sermon.png"
                      alt="Three ways to follow the sermon: human interpreter with receivers, translated audio on attendee phones, or captions"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 3: Three ways to follow the sermon: human interpreter with receivers, translated audio on attendee phones, or live captions.
                </figcaption>
              </figure>

              {/* Section 4 */}
              <h2 id="what-you-need-before-you-begin">
                What You Need Before You Begin
              </h2>
              <p>
                The essential gear list is far shorter than most church committees assume. Table 2 contrasts a lean church setup with a fully staffed production booth:
              </p>

              {/* Table 2: What You Need */}
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 2: Gear Checklist &mdash; Lean Setup vs. Staffed Sanctuary Production
                  </caption>
                  <thead className="bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Component</th>
                      <th className="p-3 border-b border-slate-200">Lean Setup</th>
                      <th className="p-3 border-b border-slate-200">Staffed Sanctuary Setup</th>
                      <th className="p-3 border-b border-slate-200">Requirement Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Speech Source</td>
                      <td className="p-3">One quality wireless microphone into USB interface</td>
                      <td className="p-3">Pre-fader auxiliary send or matrix feed from console</td>
                      <td className="p-3 font-semibold text-slate-900">Mandatory</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Host Computer</td>
                      <td className="p-3">Laptop running a modern browser (Chrome / Edge / Safari)</td>
                      <td className="p-3">Dedicated sound booth workstation with audio interface</td>
                      <td className="p-3 font-semibold text-slate-900">Mandatory</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Internet Connection</td>
                      <td className="p-3">Stable venue Wi-Fi or cellular backup</td>
                      <td className="p-3">Wired Cat6 Ethernet directly to host computer</td>
                      <td className="p-3 font-semibold text-slate-900">Mandatory</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Audio Capture Interface</td>
                      <td className="p-3">Direct USB mic receiver or 2-ch USB interface</td>
                      <td className="p-3">Console USB-B out, Dante network card, or Scarlett interface</td>
                      <td className="p-3 text-slate-600">Depends on mixer</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Attendee Access</td>
                      <td className="p-3">Printed QR code flyers in lobby and pews</td>
                      <td className="p-3">Sanctuary screen QR slide + pew cards + short web link</td>
                      <td className="p-3 font-semibold text-slate-900">Mandatory</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Accessibility Fallback</td>
                      <td className="p-3">5 pairs of inexpensive wired earbuds</td>
                      <td className="p-3">Earbud basket + small pool of loaner smartphones/tablets</td>
                      <td className="p-3 text-purple-700 font-medium">Recommended</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 5 */}
              <h2 id="step-1-capture-a-clean-mic-feed">
                Step 1: Capture a Clean Speech-Only Microphone Feed
              </h2>
              <p>
                Neural speech recognition engines listen with mathematical precision. If you feed the translation tool your main sanctuary house mix—containing worship drums, acoustic guitar, organ rumble, and congregational applause—the transcription model will hallucinate or drop phrases.
              </p>

              <h3 id="isolating-pastor-voice">Isolating the Pastor&apos;s Voice</h3>
              <p>
                Create a dedicated pre-fader auxiliary send, sub-group, or matrix output on your mixing console designated solely for translation. Assign only the pastor&apos;s wireless headworn or lapel microphone to this bus. Mute all music channels, choir microphones, and sanctuary ambient mics from this feed. Our comprehensive <Link href="/guides/mixer-setup">church mixer audio setup guide</Link> walks through configuring aux buses on Behringer, Allen &amp; Heath, Yamaha, and Soundcraft consoles.
              </p>

              <h3 id="gain-staging-and-clipping">Gain Staging and Headroom</h3>
              <p>
                Proper gain staging prevents distortion before digital encoding. Trade publication ProSoundWeb notes that keeping signal peaks 10 to 15 dB below digital clipping (0 dBFS) protects vocal intelligibility. Set audio levels during rehearsal when the preacher speaks at their loudest passionate volume, then tape down gain knobs so curious hands cannot adjust them before service.
              </p>

              {/* Section 6 */}
              <h2 id="step-2-configure-live-translation-session">
                Step 2: Configure the Live Translation Session
              </h2>
              <p>
                With clean audio routed from your mixer, launch your host session. Set up the stream 15 minutes before doors open:
              </p>

              <h3 id="host-input-and-source-language">Select Host Audio Input and Source Language</h3>
              <p>
                In the host browser interface, select your dedicated audio interface (such as &ldquo;Focusrite USB&rdquo; or &ldquo;X32 USB&rdquo;) rather than the laptop&apos;s built-in microphone. Verify the source language matches the language spoken from the pulpit (e.g., English). Have a volunteer speak into the pulpit mic and verify the green input level meter bounces cleanly.
              </p>

              <h3 id="choose-target-languages">Select Target Languages and Output Modes</h3>
              <p>
                Select the languages your community genuinely needs rather than turning on dozens of theoretical options. A concise list of 2 to 4 well-tested languages (such as Spanish, Korean, or Portuguese) makes pew navigation painless. Enable both synthesized audio and synchronized captions if your plan supports it.
              </p>

              <h3 id="verify-with-second-device">Verify Audio and Captions with a Second Device</h3>
              <p>
                Never rely solely on the host computer dashboard. Step out of the sound booth with a smartphone and earbuds, scan the attendee QR code, and listen as a worshipper. Confirm that audio streams crisply and that captions match the pastor&apos;s words. A second device reveals mobile network glitches that the hardwired booth computer will never display.
              </p>

              {/* Mid-Article CTA */}
              <ArticleCTA
                headline="Ready to Test Live Sermon Translation in Your Sanctuary?"
                description="Connect your soundboard in minutes. Stream sub-second translated audio and captions to congregation smartphones with zero equipment rentals."
                primaryText="Start a Free Trial"
                primaryHref="https://app.exbabel.com/translate/checkout?plan=starter"
                secondaryText="Explore Church Solutions"
                secondaryHref="/solutions/church-translation"
              />

              {/* Figure 4 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/sermon-translation-guide/visual-04-a-first-time-visitor-joins-in-four-moves.webp" type="image/webp" />
                    <img
                      src="/photos/blog/sermon-translation-guide/visual-04-a-first-time-visitor-joins-in-four-moves.png"
                      alt="Four simple steps for a church visitor to join: spot QR sign, open link, pick a language, tap play"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 4: A first-time visitor joins in four moves: spot QR sign, open link, pick a language, tap play.
                </figcaption>
              </figure>

              {/* Section 7 */}
              <h2 id="step-3-get-worshippers-connected">
                Step 3: Get Worshippers Connected
              </h2>
              <p>
                Even flawless translation fails if worshippers cannot locate the link. Joining must feel completely frictionless for a visitor holding a Bible in one hand and a coffee in the other.
              </p>

              <h3 id="qr-signage-and-bulletins">Sanctuary QR Signage and Pew Cards</h3>
              <p>
                Print high-contrast QR codes and place them prominently on pew backs, entry doors, and printed bulletins. Display an announcement slide with the QR code on sanctuary projection screens during pre-service walkthroughs. As detailed in our <Link href="/blog/church-translation-apps">church translation apps guide</Link>, provide a clean, short URL underneath the code for congregants whose camera lenses have trouble focusing.
              </p>

              <h3 id="earbud-use-and-browser-tap-to-play">Earbud Use and Mobile Browser Tap-to-Play</h3>
              <p>
                Modern mobile browsers—especially Apple WebKit on iOS Safari—enforce strict media autoplay policies requiring an explicit user tap before audio plays. Remind congregants during pastoral announcements to put in their earbuds, select their language, and tap the prominent &ldquo;Listen Live&rdquo; play button.
              </p>

              <h3 id="in-room-vs-remote-latency">In-Room vs. Remote Broadcast Expectations</h3>
              <p>
                In-person worshippers hear the acoustic sermon in real time, with translated audio arriving a brief beat later. Advise in-person listeners to keep one earbud in and one earbud out to stay connected with the sanctuary atmosphere. Online livestream viewers experience standard video broadcast buffering, so their audio and captions synchronize naturally with the visual feed.
              </p>

              {/* Section 8 */}
              <h2 id="step-4-rehearse-before-sunday">
                Step 4: Rehearse Before Sunday (5-Minute Test)
              </h2>
              <p>
                A quick five-minute rehearsal separates confident worship from Sunday morning panic. Run this standardized six-step protocol during your midweek tech check:
              </p>

              {/* Table 3: Rehearsal Protocol */}
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 3: Six-Step Five-Minute Quality &amp; Latency Rehearsal Test Log
                  </caption>
                  <thead className="bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Test Step</th>
                      <th className="p-3 border-b border-slate-200">Procedure</th>
                      <th className="p-3 border-b border-slate-200">Pass Criteria</th>
                      <th className="p-3 border-b border-slate-200">Failure Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">1. Mic Input</td>
                      <td className="p-3">Read a 2-minute passage through pulpit mic with Scripture references</td>
                      <td className="p-3 text-emerald-700 font-medium">Meter active, zero distortion, no music bleed</td>
                      <td className="p-3 text-red-600">Silence, 60Hz hum, or red clipping meters</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">2. Listener Join</td>
                      <td className="p-3">Scan QR code on test smartphone and select primary target language</td>
                      <td className="p-3 text-emerald-700 font-medium">Clear synthesized audio plays after single tap</td>
                      <td className="p-3 text-red-600">Infinite buffering wheel or blocked permissions</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">3. Captions</td>
                      <td className="p-3">Verify synchronized text stream on listener display</td>
                      <td className="p-3 text-emerald-700 font-medium">Correct target language, clean typography</td>
                      <td className="p-3 text-red-600">Untranslated source text or dropped phrases</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">4. Linguistic Check</td>
                      <td className="p-3">Bilingual reviewer evaluates biblical names and doctrine</td>
                      <td className="p-3 text-emerald-700 font-medium">Scriptural intent and proper nouns preserved</td>
                      <td className="p-3 text-red-600">Theological distortion or garbled names</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">5. Cellular Test</td>
                      <td className="p-3">Disable Wi-Fi on phone and test stream over LTE/5G cellular data</td>
                      <td className="p-3 text-emerald-700 font-medium">Playback remains uninterrupted</td>
                      <td className="p-3 text-red-600">Buffer stalls or connection timeouts</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">6. Delay Log</td>
                      <td className="p-3">Record live pulpit speech and listener earbud audio simultaneously</td>
                      <td className="p-3 text-emerald-700 font-medium">Measured delay logged on team sound sheet</td>
                      <td className="p-3 text-red-600">Unmeasured guesswork</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Figure 5 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/sermon-translation-guide/visual-05-rehearse-before-the-doors-open.webp" type="image/webp" />
                    <img
                      src="/photos/blog/sermon-translation-guide/visual-05-rehearse-before-the-doors-open.png"
                      alt="Rehearsal checklist before doors open: verify pastor mix, test names, check listener devices, and prepare fallback"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 5: Rehearse before the doors open: verify pastor mix, test names and scripture references, check two listener devices, and prepare fallback.
                </figcaption>
              </figure>

              {/* Section 9 */}
              <h2 id="troubleshoot-common-failures">
                Troubleshoot Common Failures
              </h2>
              <p>
                When audio anomalies occur mid-service, panic wastes valuable time. Use this diagnostic matrix taped directly beside the sound console:
              </p>

              {/* Table 4: Troubleshooting Matrix */}
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 4: Sunday Morning Audio &amp; Streaming Troubleshooting Matrix
                  </caption>
                  <thead className="bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Observed Symptom</th>
                      <th className="p-3 border-b border-slate-200">Root Cause</th>
                      <th className="p-3 border-b border-slate-200">Immediate Corrective Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Host shows no incoming audio</td>
                      <td className="p-3">Console aux send muted or wrong USB interface selected</td>
                      <td className="p-3">Unmute console aux master and confirm host audio input device selector</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Distorted or garbled translation</td>
                      <td className="p-3">Input gain staging too hot; signal clipping at interface</td>
                      <td className="p-3">Reduce console aux send output level by 6&ndash;10 dB</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Captions run but listener audio is silent</td>
                      <td className="p-3">Phone volume low or Safari autoplay permission awaiting user tap</td>
                      <td className="p-3">Instruct attendee to unmute device and tap the play icon</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Smartphone fails to load stream</td>
                      <td className="p-3">Sanctuary guest Wi-Fi blocking streaming ports</td>
                      <td className="p-3">Advise listener to switch off Wi-Fi and connect via cellular LTE/5G</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Translation lags significantly behind</td>
                      <td className="p-3">Host laptop running background tasks or weak Wi-Fi uplink</td>
                      <td className="p-3">Close unnecessary browser tabs and connect host computer via wired Ethernet</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Venue broadband fails completely</td>
                      <td className="p-3">ISP outage or router hardware crash</td>
                      <td className="p-3 text-purple-700 font-medium">Switch host to cellular hotspot; activate printed bilingual bulletin notes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 10 */}
              <h2 id="ai-human-or-hybrid-what-changes">
                AI, Human or Hybrid: What Changes
              </h2>
              <p>
                No single technological approach fits every church gathering. Funerals, solemn ordinances, and high-theology conferences call for human interpretation, whereas weekly sermons and community outreach thrive with AI scalability.
              </p>
              <p>
                When a service centers on sensitive pastoral counsel, grief, or sacramental vows, having an experienced bilingual human interpreter present preserves empathy that algorithms cannot replicate. Furthermore, as emphasized under Department of Justice guidelines (ADA.gov), AI translation tools do not replace qualified sign-language interpreters for Deaf worshippers.
              </p>
              <p>
                For regular Sunday preaching, AI translation dismantles barriers that historically excluded smaller language groups who could never justify a full-time volunteer team. Pairing AI software with a bilingual member who audits recordings afterwards provides continuous quality improvement while safeguarding pastoral accuracy.
              </p>

              {/* Section 11 */}
              <h2 id="make-next-sunday-your-test-run">
                Make Next Sunday Your Test Run
              </h2>
              <p>
                Start small. Route your pastor&apos;s microphone to a clean USB interface, open a test session, and listen on a smartphone in the back row. Running the five-minute checklist will teach your tech team more than months of brochure reading:
              </p>
              <ul className="space-y-2 my-4">
                <li>Evaluating dedicated hardware? Read our <Link href="/blog/church-translation-equipment">church translation equipment buyer&apos;s guide</Link>.</li>
                <li>Navigating volunteer vs. automation trade-offs? Consult our <Link href="/blog/church-interpreter-vs-ai-translation">church interpreter vs. AI breakdown</Link>.</li>
                <li>Examining QR joining frictionless workflows? Read our <Link href="/blog/church-translation-apps">church translation apps guide</Link>.</li>
              </ul>

              {/* Section 12: FAQs */}
              <h2 id="frequently-asked-questions">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 my-8 not-prose">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section 13: Source Log */}
              <h2 id="source-log-and-references">
                Source Log and Documented References
              </h2>
              <p>
                All external sources, trade references, and regulatory standards cited in this implementation guide are documented below:
              </p>

              {/* Table 5: Source Log */}
              <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 5: Documented Citations and Editorial Sources (Accessed October 2026)
                  </caption>
                  <thead className="bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200">Organization / Source</th>
                      <th className="p-3 border-b border-slate-200">Reference / Documentation</th>
                      <th className="p-3 border-b border-slate-200">Application in Article</th>
                      <th className="p-3 border-b border-slate-200">Citation Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">U.S. Census Bureau</td>
                      <td className="p-3 text-slate-500">Release CB23-208 (ACS 5-Year Estimates)</td>
                      <td className="p-3">21.7% non-English spoken at home demographic figure</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">Government Data</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">ProSoundWeb AV Media</td>
                      <td className="p-3 text-slate-500">Setting Sound System &amp; Console Gain Staging</td>
                      <td className="p-3">Audio gain structure, backing off 10&ndash;15 dB from clipping</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">Trade Publication</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Apple WebKit Team</td>
                      <td className="p-3 text-slate-500">New Video and Audio Autoplay Policies for iOS</td>
                      <td className="p-3">Explanation of why mobile Safari demands user gesture tap before audio</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">Platform Specs</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">ADA.gov Civil Rights Div.</td>
                      <td className="p-3 text-slate-500">Effective Communication Technical Guidance</td>
                      <td className="p-3">Legal distinction of qualified sign-language interpreters as auxiliary aids</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">Statutory Guidance</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">Exbabel Audio Engineering</td>
                      <td className="p-3 text-slate-500">Live Service Architecture &amp; Soundboard Guides</td>
                      <td className="p-3">USB interface setup, pre-fader speech routing, and attendee browser access</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-800">Product Documentation</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Author & Disclosure Note */}
              <div className="my-8 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-500 not-prose">
                <p>
                  <strong>Editorial Disclosure:</strong> Published by Exbabel. This article provides technical instructions and operational checklists for houses of worship. Acoustic behavior, mobile browser permissions, and sanctuary network architectures vary by facility. Always rehearse your signal chain with real church equipment before live broadcast.
                </p>
              </div>

            </div>
          </div>

          {/* ── Related Articles ──────────────────────────────────── */}
          {related.length > 0 && (
            <section className="max-w-4xl mx-auto px-6 mt-16 pt-12 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Related Church Translation Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group block p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
                  >
                    <span className="text-[10px] font-bold text-primary tracking-wide uppercase">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors mt-1 mb-2 line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Bottom Monumental CTA ─────────────────────────────── */}
          <section className="max-w-3xl mx-auto px-6 mt-16">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-3 block">
                  LIVE SERMON TRANSLATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                  Bring Real-Time Translation to Your Church Next Sunday
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  Connect your audio console, share a QR code in the pews, and empower every worshipper to follow the sermon in their native tongue with sub-second audio and live captions.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://app.exbabel.com/translate/checkout?plan=starter"
                    className="px-8 py-3.5 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 text-sm"
                  >
                    Start Free Trial
                  </a>
                  <Link
                    href="/solutions/church-translation"
                    className="px-8 py-3.5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all text-sm"
                  >
                    Explore Church Solution
                  </Link>
                </div>
              </div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </section>

        </article>

        {/* Global Footer & Cookie Consent */}
        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
