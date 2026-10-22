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

const post = getPostBySlug("church-translation-apps")!;

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
  { id: "does-a-church-translation-app-need-to-be-an-app", label: "Does a Church Translation App Need to Be an App?" },
  { id: "key-takeaways", label: "Key Takeaways" },
  { id: "what-people-mean-by-a-church-translation-app", label: "What People Mean by a Church Translation App" },
  { id: "how-visitors-actually-join", label: "How Visitors Actually Join (Step-by-Step Flow)" },
  { id: "compare-app-browser-and-receiver-workflows", label: "Compare App, Browser, and Receiver Workflows" },
  { id: "audio-captions-and-translation-accuracy", label: "Audio, Captions, and Translation Accuracy" },
  { id: "sunday-reliability-and-network-design", label: "Sunday Reliability and Network Design" },
  { id: "accessibility-and-device-inclusivity", label: "Accessibility and Device Inclusivity" },
  { id: "choosing-software-for-your-congregation", label: "Choosing Software for Your Congregation" },
  { id: "frequently-asked-questions", label: "Frequently Asked Questions" },
  { id: "source-log-and-references", label: "Source Log and Documented References" },
];

/* ─── FAQs ────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    question: "Does a Church Translation App Require Installation?",
    answer:
      "Not always. Browser-based platforms such as Exbabel, Wordly, and Hope Translator allow attendees to scan a QR code and listen immediately in their smartphone browser without installing software or creating an account. In contrast, native listener apps (such as LiveVoice) require app store downloads. Hardware receiver systems avoid personal smartphones altogether.",
  },
  {
    question: "Can Congregants Use Bluetooth Headphones?",
    answer:
      "Many modern smartphones can stream translation audio to paired Bluetooth earbuds or AirPods. However, audio pairing latency, sanctuary RF interference, and varying battery levels can introduce friction. AV teams should advise congregants to pair before service and maintain a basket of wired earbuds as an immediate zero-friction backup.",
  },
  {
    question: "Can Translation Work on Church Wi-Fi or Cellular?",
    answer:
      "Phone-based systems require an internet connection. Glossa notes cellular data works reliably for listeners without Wi-Fi, while Hope Translator recommends Wi-Fi for smoother processing. Because dense sanctuary walls can degrade cellular reception while full congregations strain Wi-Fi, AV teams should test both from the back pew during a live service.",
  },
  {
    question: "What if Attendees Do Not Own a Smartphone?",
    answer:
      "Churches should maintain a hybrid accessibility setup. Keep dedicated radio receivers, loaner tablets, or translation headphones ready for guests without smartphones, elderly congregants, or visitors uncomfortable using personal devices. Assign a welcome greeter to hand them out with pre-sanitized earpieces.",
  },
  {
    question: "Can Captions Be Displayed Without Translated Audio?",
    answer:
      "Yes. Hope Translator describes outputting live captions to a sanctuary screen through OBS or ProPresenter, and Exbabel allows synchronized captions and audio to run together or independently on attendee phones. This provides immediate visual access in reverberant sanctuaries or for hard-of-hearing members.",
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
      className="my-12 rounded-2xl bg-gradient-to-br from-primary/5 via-blue-50/60 to-purple-50/40 border border-primary/10 p-8 md:p-10 text-center not-prose"
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

/* ─── Page Component ──────────────────────────────────────────────────────── */

export default function ChurchTranslationAppsArticle() {
  const readingTime = Math.ceil(post.wordCount / 200);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Blog", url: "https://exbabel.com/blog" },
          {
            name: "Church Translation Apps",
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
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                Usability &amp; Workflow Guide
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Church Translation Apps vs Browser Links and Headsets
            </h1>

            <p className="text-xl text-slate-500 font-medium mb-6">
              A practical guide to how visitors join, what to test on real phones, and why an &ldquo;app&rdquo; might not need to be an app at all.
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
              <span className="text-xs text-slate-400">Sources accessed October 18, 2026</span>
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
                A visitor scans your QR code, picks a language and hears nothing. Think about it. WebKit&rsquo;s own documentation says Safari on iPhone needs a tap before media with sound plays. Small details like that decide Sunday. So what does a church translation app really need to do? And does it have to be an app at all?
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
                  href="/live"
                  className="inline-block px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all text-sm"
                >
                  See Live Demo
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
                    <source srcSet="/photos/blog/church-translation-apps/visual-01-no-download-at-the-door.webp" type="image/webp" />
                    <img
                      src="/photos/blog/church-translation-apps/visual-01-no-download-at-the-door.png"
                      alt="Graphic illustrating how a QR-linked browser session removes the app-install barrier for church visitors at the door"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 1: No download at the door. Browser-based links eliminate app store friction and account setups for Sunday visitors.
                </figcaption>
              </figure>

              {/* Section 1 */}
              <h2 id="does-a-church-translation-app-need-to-be-an-app">
                Does a Church Translation App Need to Be an App?
              </h2>
              <p>
                Not always. Churches reach listeners in three ways: an installed phone app, a web page opened by QR code or a receiver with no phone at all. Each has trade-offs. Apps take time to install. Browsers can stumble on audio permissions, especially on iPhone. Receivers need batteries and someone to hand them out. Mixing methods is common. Here are the key points before the walkthrough.
              </p>

              {/* Section 2 */}
              <h2 id="key-takeaways">Key Takeaways</h2>
              <div className="my-6 p-6 bg-sky-50/60 rounded-2xl border border-sky-100 not-prose">
                <ul className="space-y-3 text-slate-800 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>&ldquo;App&rdquo; should mean something installed.</strong> A page opened by QR code is a browser link.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>First-time visitors make three moves:</strong> find the code, pick a language and approve audio.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Test on a real iPhone and a real Android phone</strong> before Sunday service.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Keep receivers or wired earbuds ready</strong> for guests without smartphones.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold text-lg leading-none mt-0.5">&bull;</span>
                    <span><strong>Use the checklists below</strong> to run the same checks on your own phones.</span>
                  </li>
                </ul>
              </div>
              <p>
                Let&rsquo;s define the three paths first, because the word &ldquo;app&rdquo; causes most of the confusion in church technology discussions.
              </p>

              {/* Section 3 */}
              <h2 id="what-people-mean-by-a-church-translation-app">
                What People Mean by a Church Translation App
              </h2>
              <p>
                Sellers use the word app for almost everything. That muddies the buying decision. Here are the three paths, defined by what a visitor actually has to do on a Sunday morning.
              </p>

              <h3 id="installed-phone-app">Installed Phone App</h3>
              <p>
                An installed app comes from an app store and lives on the phone. LiveVoice&rsquo;s churches page describes a listener app with iOS, Android and Huawei store links. Installing takes time and storage. Some guests won&rsquo;t do it on a Sunday morning. It&rsquo;s the heaviest ask of a stranger. The upside is a familiar icon they can reopen next week. Check what each app really does when the screen locks.
              </p>

              <h3 id="web-app-opened-through-qr-code">Web App Opened Through QR Code</h3>
              <p>
                Here the visitor scans a code and a page opens in the phone&rsquo;s browser. Nothing installed. The <Link href="/blog/church-translation-system">Exbabel church translation system guide</Link>, Wordly&rsquo;s help pages, and Hope Translator&rsquo;s site describe this route, with language choice after the scan. The page is still software, though. It depends on the browser. Fewer steps means fewer places to stall. Calling it an app muddies the comparison. Call it a browser link instead.
              </p>

              <h3 id="receiver-system-with-no-attendee-phone">Receiver System with No Attendee Phone</h3>
              <p>
                Radio receivers hand each listener a small device and an earpiece. ChurchLeaders notes one system can carry up to six languages, with an interpreter and channel for each. Receivers work without the internet. Glossa&rsquo;s guide lists batteries, charging and lost units as the chores. Guests without smartphones may rely on them. Some churches keep a few beside a phone-based option. Check frequency rules for your area before buying.
              </p>

              {/* Figure 2 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/church-translation-apps/visual-03-the-4-tap-welcome-journey.webp" type="image/webp" />
                    <img
                      src="/photos/blog/church-translation-apps/visual-03-the-4-tap-welcome-journey.png"
                      alt="Four-step diagram showing a church attendee scanning a QR code, choosing a language, tapping to allow audio, and listening"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 2: The 4-tap welcome journey from sanctuary entrance to active live translation.
                </figcaption>
              </figure>

              {/* Section 4 */}
              <h2 id="how-visitors-actually-join">How Visitors Actually Join</h2>
              <p>
                Follow a first-time visitor from the lobby to the first translated word. The steps below draw on vendor documentation. Confirm each one on your own devices.
              </p>

              <h3 id="find-the-qr-code-or-invitation">Find the QR Code or Invitation</h3>
              <p>
                Visitors can&rsquo;t join what they can&rsquo;t find. Put the code on a slide, in the bulletin and on a sign near the door. Wordly&rsquo;s help page offers a scalable image for screens and a printable PDF with illustrated instructions. Add a short line in plain words: scan this, pick your language. A greeter who points at the sign beats a dozen emails. Repeat the instruction aloud once at the start.
              </p>

              <h3 id="select-language-and-approve-audio">Select Language and Approve Audio</h3>
              <p>
                After scanning, the visitor lands on a page and picks a language. Wordly&rsquo;s help describes choosing a language and clicking Attend. Then the phone may ask to allow audio. On iPhone, WebKit documents that media with sound needs a user gesture before it plays. So the first tap matters. Tell visitors to press play or start when they see it. Visitors shouldn&rsquo;t ever have to guess.
              </p>

              <h3 id="put-on-earbuds-and-test-volume">Put on Earbuds and Test Volume</h3>
              <p>
                Visitors need earbuds or headphones. Otherwise the sound spills into the pew. Bring a few spare wired pairs. Wired pairs never need charging. Ask the visitor to set the phone volume while the pastor is speaking. Remind them to check silent mode too. Exbabel&rsquo;s guide says translation headphones may still help people without smartphones. A greeter can run a ten-second sound check at the door.
              </p>

              {/* Table 1: Visitor Join Journey */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 1: The Visitor Join Journey &mdash; Where Stalls Happen and How to Fix Them
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Screen / Step</th>
                      <th className="py-3 px-4">What the Visitor Sees</th>
                      <th className="py-3 px-4">Where They Can Stall</th>
                      <th className="py-3 px-4">Fix to Test</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">1. Lobby Sign</td>
                      <td className="py-3 px-4">QR code and one-line instruction</td>
                      <td className="py-3 px-4 text-rose-600 font-medium">Can&rsquo;t find or scan the code</td>
                      <td className="py-3 px-4">Larger sign near the door; greeter points</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">2. Language Page</td>
                      <td className="py-3 px-4">List of available languages</td>
                      <td className="py-3 px-4 text-rose-600 font-medium">Doesn&rsquo;t see their language</td>
                      <td className="py-3 px-4">Check the live menu before service</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">3. Audio Start</td>
                      <td className="py-3 px-4">Play or start button</td>
                      <td className="py-3 px-4 text-rose-600 font-medium">Never taps; hears nothing</td>
                      <td className="py-3 px-4">Say &ldquo;tap play&rdquo; on the sign</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">4. Listening</td>
                      <td className="py-3 px-4">Translated audio or captions</td>
                      <td className="py-3 px-4 text-rose-600 font-medium">Volume low; silent mode on</td>
                      <td className="py-3 px-4">Sound check with a greeter</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Callout Card */}
              <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 not-prose">
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                  Want to try the QR flow yourself? Invite your AV team to test Exbabel&rsquo;s QR join and language switching with your own devices through the <Link href="/solutions/church-translation" className="text-primary font-bold hover:underline">church translation solution</Link>. It still needs a working network, so test your Wi-Fi and cellular coverage too.
                </p>
                <Link
                  href="/solutions/church-translation"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Explore the church translation setup</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Figure 3 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/church-translation-apps/visual-02-three-ways-to-join.webp" type="image/webp" />
                    <img
                      src="/photos/blog/church-translation-apps/visual-02-three-ways-to-join.png"
                      alt="Comparison graphic showing three church translation access models: installed app download, browser link QR scan, and dedicated radio receivers"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 3: Three ways to join. Comparing installed apps, browser links, and hardware receivers for church translation access.
                </figcaption>
              </figure>

              {/* Section 5 */}
              <h2 id="compare-app-browser-and-receiver-workflows">
                Compare App, Browser and Receiver Workflows
              </h2>
              <p>
                Each path trades convenience for control. Use the notes below to compare them on setup effort, device support and privacy. Test claims on your own phones since versions change.
              </p>

              <h3 id="install-time-and-permissions">Install Time and Permissions</h3>
              <p>
                Apps ask for store access, storage and sometimes notifications. Browser links ask for far less, though audio may need a tap. Receivers need no permissions but do need handing out and collecting. Exbabel&rsquo;s guide says listeners need no app or account. Install time varies by network and device. Fewer permissions mean fewer refusals. Time a first-timer yourself and write the number down.
              </p>

              <h3 id="browser-compatibility-and-battery-data-use">Browser Compatibility and Battery/Data Use</h3>
              <p>
                Browsers differ. WebKit documents the iPhone tap rule. Other browsers have their own habits. No source we read promises that every phone works. Streaming audio uses data and battery. Offer church Wi-Fi and say cellular works too, as Glossa notes. Ask owners of older phones to try the link before the service. Treat &ldquo;works on every phone&rdquo; as a warning sign.
              </p>

              <h3 id="device-privacy-and-shared-device-cases">Device Privacy and Shared-Device Cases</h3>
              <p>
                Some people don&rsquo;t want to install anything or share an email address. A browser page with no account asks for less. Others share one phone or tablet among a family. Receivers avoid personal devices entirely. Read each vendor&rsquo;s privacy terms, because they vary. Tell guests what&rsquo;s recorded. Transcripts exist on several tools. Ask about retention. Some guests are wary of any QR code. That&rsquo;s fair. Explain it simply.
              </p>

              {/* Table 2: Workflow Comparison */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 2: Workflow Comparison &mdash; Installed App vs. Browser Link vs. Radio Receivers
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Delivery Path</th>
                      <th className="py-3 px-4">App Install</th>
                      <th className="py-3 px-4">Network Needed?</th>
                      <th className="py-3 px-4">Best Fit</th>
                      <th className="py-3 px-4">Watch Out For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Installed App</td>
                      <td className="py-3 px-4">Yes, from a store</td>
                      <td className="py-3 px-4">Yes (Wi-Fi or cellular)</td>
                      <td className="py-3 px-4">Regular attenders who want an icon</td>
                      <td className="py-3 px-4 text-slate-600">Store steps; storage; guests who refuse</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Browser Link (QR)</td>
                      <td className="py-3 px-4 text-emerald-700 font-medium">No (per Exbabel, Wordly, Hope Translator)</td>
                      <td className="py-3 px-4">Yes (Wi-Fi or cellular)</td>
                      <td className="py-3 px-4">Visitors and mixed devices</td>
                      <td className="py-3 px-4 text-slate-600">Audio tap on iPhone; browser differences</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Radio Receivers</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4 text-emerald-700 font-medium">No (RF radio)</td>
                      <td className="py-3 px-4">Guests without phones</td>
                      <td className="py-3 px-4 text-slate-600">Batteries, charging, lost units</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Hybrid Setup</td>
                      <td className="py-3 px-4">Mixed</td>
                      <td className="py-3 px-4">Mixed</td>
                      <td className="py-3 px-4">Most congregations</td>
                      <td className="py-3 px-4 text-slate-600">Extra volunteer training</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 6 */}
              <h2 id="audio-captions-and-translation-accuracy">
                Audio, Captions and Translation Accuracy
              </h2>
              <p>
                Translated voice and translated text aren&rsquo;t the same output. They can follow different language lists and different timing. Check the live service menu before you promise anything to a visitor.
              </p>

              <h3 id="spoken-voice-vs-translated-text">Spoken Voice vs Translated Text</h3>
              <p>
                Voice suits people who want to look up and listen. Text suits readers and noisy pews. Hope Translator says listeners can read or hear an AI voice. Exbabel says listeners hear AI audio and follow synchronized captions. Offer both when you can. Voice quality varies by language. So listen to each one yourself before you announce it. Neither output wins in every room. Both deserve a test.
              </p>

              <h3 id="caption-readability">Caption Readability</h3>
              <p>
                Captions fail when the font is small or the speaker talks fast. Hope Translator mentions adjustable fonts and sizes. Test captions from the back row on a real phone. Check contrast in a dim sanctuary. If captions go on a main screen, give them space and keep Scripture slides clear. Ask a few older members to read a sample and tell you honestly what they see.
              </p>

              <h3 id="language-and-dialect-availability">Language and Dialect Availability</h3>
              <p>
                Language lists change. Voice and text lists can differ. A directory listing for Hope Translator says a few languages are text only. Exbabel&rsquo;s pages disagree on language counts. So we cite none. Ask the vendor to show the menu on a phone, live. Then test each language with a native speaker from your own congregation. Dialects matter too. Ask which variety of Spanish or Arabic the tool speaks.
              </p>

              {/* Figure 4 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/church-translation-apps/visual-04-silent-phone-trace-the-cause.webp" type="image/webp" />
                    <img
                      src="/photos/blog/church-translation-apps/visual-04-silent-phone-trace-the-cause.png"
                      alt="Flowchart showing troubleshooting steps for mobile browser audio playback: link opened, language chosen, audio unlocked, volume checked, and listening"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 4: Silent phone troubleshooting flow. Trace audio unlock and permissions before diagnosing hardware or network faults.
                </figcaption>
              </figure>

              {/* Section 7 */}
              <h2 id="sunday-reliability-and-network-design">
                Sunday Reliability and Network Design
              </h2>
              <p>
                Most Sunday failures are network or permission problems, not translation problems. Plan for both, rehearse them and keep a written fallback. Here are the areas to cover.
              </p>

              <h3 id="wi-fi-and-cellular-trade-offs">Wi-Fi and Cellular Trade-Offs</h3>
              <p>
                Church Wi-Fi can crowd, drop or block guest traffic. Cellular data works without the church network, though coverage varies inside thick walls. Glossa notes listeners without Wi-Fi can use cellular data. Hope Translator recommends a strong connection and Wi-Fi for better processing. Put both options on the sign. Test from the back pew while the room is full. A full room strains a network more than an empty one.
              </p>

              <h3 id="audio-unlock-and-browser-permissions">Audio Unlock and Browser Permissions</h3>
              <p>
                On iPhone, WebKit documents that media with sound needs a user gesture. A visitor who never taps may see captions move but hear nothing. Build a clear start button into the instructions. Android browsers have their own settings. Test current OS and browser versions on real phones and write the versions down. Don&rsquo;t promise background audio with the screen locked until you&rsquo;ve actually tested it.
              </p>

              <h3 id="recovery-after-a-dropped-connection">Recovery After a Dropped Connection</h3>
              <p>
                Connections drop. Exbabel&rsquo;s guide mentions failover and buffering but gives no numbers. After a drop, the visitor may need to tap again or reload the page. Test it. Switch Wi-Fi off, wait and switch it on to see what happens. Write the steps on a help card. Teach greeters a simple routine: reload, tap play and check volume. Rehearse it once with volunteers. Time the recovery.
              </p>

              {/* Table 3: Cross-Platform Field Checklist (QA Matrix) */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 3: Sunday Cross-Platform Field Checklist (QA Matrix)
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Verification Check</th>
                      <th className="py-3 px-4">iPhone (iOS Safari)</th>
                      <th className="py-3 px-4">Android (Chrome / Samsung)</th>
                      <th className="py-3 px-4">Evaluation Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Scan QR with default camera</td>
                      <td className="py-3 px-4">Opens link banner directly</td>
                      <td className="py-3 px-4">Opens browser directly</td>
                      <td className="py-3 px-4">Zero download required</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Page loads on church Wi-Fi</td>
                      <td className="py-3 px-4">Verify captive portal doesn&rsquo;t block stream</td>
                      <td className="py-3 px-4">Verify captive portal doesn&rsquo;t block stream</td>
                      <td className="py-3 px-4">Guest Wi-Fi network routing</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Page loads on cellular (LTE/5G)</td>
                      <td className="py-3 px-4">Test in back pew</td>
                      <td className="py-3 px-4">Test in back pew</td>
                      <td className="py-3 px-4">Thick sanctuary wall penetration</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Language menu matches service</td>
                      <td className="py-3 px-4">Live menu inspection</td>
                      <td className="py-3 px-4">Live menu inspection</td>
                      <td className="py-3 px-4">Check before service</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Audio starts after one tap</td>
                      <td className="py-3 px-4 text-amber-700 font-medium">WebKit user gesture required</td>
                      <td className="py-3 px-4">Chrome audio policy tap</td>
                      <td className="py-3 px-4">Signage must say &ldquo;Tap Play&rdquo;</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Captions readable at arm&rsquo;s length</td>
                      <td className="py-3 px-4">Check text scaling</td>
                      <td className="py-3 px-4">Check text scaling</td>
                      <td className="py-3 px-4">Sanctuary ambient contrast</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Bluetooth earbuds pair and play</td>
                      <td className="py-3 px-4">AirPods latency check</td>
                      <td className="py-3 px-4">Bluetooth latency check</td>
                      <td className="py-3 px-4">Keep wired earbuds backup</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Audio resumes after Wi-Fi off and on</td>
                      <td className="py-3 px-4">Re-buffering behavior</td>
                      <td className="py-3 px-4">Re-buffering behavior</td>
                      <td className="py-3 px-4">Time to stream recovery</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Screen lock: does audio continue?</td>
                      <td className="py-3 px-4">Check background audio playback</td>
                      <td className="py-3 px-4">Check background audio playback</td>
                      <td className="py-3 px-4">OS power-saving restrictions</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mid-Article Inline CTA */}
              <ArticleCTA
                headline="Test Browser-Based Church Translation on Your Own Phones"
                description="See how fast your congregation can connect. Exbabel streams live translated speech and synchronized captions through a simple QR code—no app store downloads or attendee accounts required."
                primaryText="Start a Free Trial"
                primaryHref="https://app.exbabel.com/translate/checkout?plan=starter"
                secondaryText="See Live Demonstration"
                secondaryHref="/live"
              />

              {/* Figure 5 */}
              <figure className="my-10 not-prose">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <picture>
                    <source srcSet="/photos/blog/church-translation-apps/visual-05-design-for-the-guest-without-a-phone.webp" type="image/webp" />
                    <img
                      src="/photos/blog/church-translation-apps/visual-05-design-for-the-guest-without-a-phone.png"
                      alt="Checklist graphic outlining accessibility practices for church attendees without smartphones, including loaner receivers and large-font captions"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption className="text-center text-xs text-slate-500 mt-2.5">
                  Figure 5: Designing for the guest without a phone. Accessibility combines hardware fallbacks, readable captions, and volunteer readiness.
                </figcaption>
              </figure>

              {/* Section 8 */}
              <h2 id="accessibility-and-device-inclusivity">
                Accessibility and Device Inclusivity
              </h2>
              <p>
                Language access isn&rsquo;t the only access question. Some guests lack phones. Some need captions rather than audio. Use these notes as a starting point, not a legal opinion.
              </p>

              <h3 id="attendees-without-smartphones">Attendees Without Smartphones</h3>
              <p>
                Keep receivers, loaner tablets or wired earbuds for guests without phones. Exbabel&rsquo;s guide says translation headphones may still help them. Glossa suggests some churches keep FM headsets for seniors beside a phone option. Assign a greeter to hand them out and collect them. Don&rsquo;t assume every guest owns a phone or wants to use one. Keep a sign-out sheet if you lend tablets. Mention it in the bulletin too.
              </p>

              <h3 id="deaf-and-hard-of-hearing-needs">Deaf and Hard-of-Hearing Needs</h3>
              <p>
                Translated captions help. They aren&rsquo;t the same as qualified sign-language interpreting or real-time captioning by a trained person. The Department of Justice&rsquo;s ADA.gov guidance on effective communication lists captioning, qualified interpreters and assistive listening systems as auxiliary aids. It also says the right aid depends on the person and context. Ask the individual what works. No app settles legal obligations by itself. Plan this before Sunday.
              </p>

              <h3 id="large-font-captions-and-help-desk-training">Large-Font Captions and Help Desk Training</h3>
              <p>
                Offer large-font captions on phones and on a screen. Train help-desk volunteers to answer two questions fast: how do I join and why can&rsquo;t I hear. Give them a printed card. Practice with a volunteer who has never used the tool. Training takes minutes. It prevents Sunday panic. It also makes guests feel welcome rather than processed. Print the card in large type, too. Laminate it.
              </p>

              {/* Welcome Desk Card */}
              <div className="my-8 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 not-prose">
                <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase block mb-2">
                  LAMINATED VOLUNTEER GUIDE
                </span>
                <h4 className="text-xl font-bold text-white mb-4">
                  Welcome-Desk Help Card: &ldquo;I Can&rsquo;t Hear the Translation&rdquo;
                </h4>
                <ol className="space-y-2.5 text-slate-300 text-sm sm:text-base list-decimal list-inside">
                  <li>Check your phone volume and ensure silent mode / ringer switch is set appropriately.</li>
                  <li>Tap the <strong>play or start</strong> button on the browser page (iOS requires a user gesture).</li>
                  <li>Reload the page or scan the QR code again.</li>
                  <li>Try your earbuds in another pair or ask the welcome desk for a loaner.</li>
                  <li>Still stuck? Ask a volunteer for a radio receiver or a seat near a screen with live captions.</li>
                </ol>
              </div>

              {/* Section 9 */}
              <h2 id="choosing-software-for-your-congregation">
                Choosing Software for Your Congregation
              </h2>
              <p>
                Pick a path by testing, not by reading brochures. A short, honest trial tells you more than a feature list. Here is how to run one.
              </p>

              <h3 id="trial-with-first-time-attendees">Trial with First-Time Attendees</h3>
              <p>
                Run the trial with people who have never seen the tool. With their consent, watch them join without coaching. Note where they pause. Don&rsquo;t help until they ask. Note the time each step takes. Resist the urge to explain. Use the ten-minute test below. Ask each vendor how to try its product before you commit. Run the trial on the same phones your congregation actually uses.
              </p>

              <h3 id="volunteer-onboarding-and-device-help">Volunteer Onboarding and Device Help</h3>
              <p>
                Pick two volunteers per service: one at the door and one at the sound desk. Give them the help card and a test phone. Let them practice the dropped-connection routine. Write down who handles complaints during the sermon. Our <Link href="/guides/broadcasting">church broadcasting guide</Link> covers the audio side, and our <Link href="/guides/mixer-setup">interactive mixer setup guide</Link> walks through sound console connections. Refresh the training whenever the software updates. Choose people who stay calm under pressure. Give them permission to use the fallback.
              </p>

              <h3 id="decide-app-browser-receivers-or-hybrid">Decide: App, Browser, Receivers or Hybrid</h3>
              <p>
                Pick by guest reality, not by feature lists. If most visitors carry phones and your network holds, a browser link is lighter. If your regulars like a familiar icon, an app may suit them. If many guests lack phones, keep receivers. Hybrid is common. Our <Link href="/blog/church-translation-system">church translation system guide</Link> compares hardware and software architectures, and our <Link href="/blog/best-real-time-translation-apps">real-time translation apps comparison</Link> covers broader event scenarios. Also see our <Link href="/blog/church-interpreter-vs-ai-translation">church interpreter vs AI translation guide</Link> for evaluating human versus machine interpretation. Revisit the choice every year as your congregation changes. Mixing is fine.
              </p>

              {/* Table 4: Ten-Minute Usability Test */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 4: The Ten-Minute Usability Test Protocol
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Minute</th>
                      <th className="py-3 px-4">Test Step</th>
                      <th className="py-3 px-4">Observer Evaluation Goal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">0 to 1</td>
                      <td className="py-3 px-4">Hand a first-time guest a phone and the sign</td>
                      <td className="py-3 px-4">Do they find the code unaided?</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">1 to 3</td>
                      <td className="py-3 px-4">They scan and choose a language</td>
                      <td className="py-3 px-4">Where do they pause?</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">3 to 5</td>
                      <td className="py-3 px-4">They start audio and set volume</td>
                      <td className="py-3 px-4">Do they tap play? Do they hear it?</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">5 to 7</td>
                      <td className="py-3 px-4">Switch language mid-session</td>
                      <td className="py-3 px-4">Is it obvious how?</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">7 to 9</td>
                      <td className="py-3 px-4">Turn Wi-Fi off and on</td>
                      <td className="py-3 px-4">Does audio come back?</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">9 to 10</td>
                      <td className="py-3 px-4">Ask what confused them</td>
                      <td className="py-3 px-4">Write down their words verbatim</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Table 5: Sunday Usability Scorecard */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 5: Sunday Usability Scorecard (Score 1 to 5)
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Scorecard Evaluation Item</th>
                      <th className="py-3 px-4">Target Score</th>
                      <th className="py-3 px-4">Operational Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Joined without help</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Assesses lobby signage and QR scan onboarding</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Time to first translated word</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Elapsed time from lobby door to first audio stream</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Audio worked on first tap</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Evaluates mobile browser user gesture handling</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Captions readable</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Assesses font scaling and contrast under sanctuary lighting</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Recovered after dropped connection</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Evaluates automatic reconnection without restarting browser</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Volunteer could fix a problem in two minutes</td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">[ ] / 5</td>
                      <td className="py-3 px-4 text-slate-600">Assesses volunteer card training and resolution speed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 10 */}
              <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>
              <div className="space-y-6 my-8 not-prose">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section 11 */}
              <h2 id="source-log-and-references">
                Source Log and Documented References
              </h2>
              <p>
                The observations and platform specifications in this comparison draw on public technical documentation, trade articles, and vendor specifications accessed on October 18, 2026.
              </p>

              {/* Table 6: Source Log */}
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-xs not-prose">
                <table className="w-full text-sm text-left border-collapse">
                  <caption className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 text-left">
                    Table 6: Documented Sources and Technical References
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Source Organization</th>
                      <th className="py-3 px-4">Referenced Technical Detail</th>
                      <th className="py-3 px-4">Claim Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://webkit.org/blog/6784/new-video-policies-for-ios/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          WebKit Video Policies for iOS
                        </a>
                      </td>
                      <td className="py-3 px-4">Media with sound requires user gesture on iOS Safari</td>
                      <td className="py-3 px-4 text-slate-500">Platform documentation</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://help.wordly.ai/downloading-qr-codes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Wordly Help: Downloading QR Codes
                        </a>
                      </td>
                      <td className="py-3 px-4">QR leads to sign-in page; scan, choose language, click Attend</td>
                      <td className="py-3 px-4 text-slate-500">Vendor documentation</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://www.hopetranslator.com/resources/live-sermon-translation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Hope Translator: Live Sermon Translation
                        </a>
                      </td>
                      <td className="py-3 px-4">QR broadcast mode, read or AI voice, adjustable fonts, OBS/ProPresenter</td>
                      <td className="py-3 px-4 text-slate-500">Vendor claim</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://faith.tools/app/hope-translator-live-sermon-translation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          faith.tools Directory
                        </a>
                      </td>
                      <td className="py-3 px-4">No download for listeners; some languages text-only</td>
                      <td className="py-3 px-4 text-slate-500">Third-party directory</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://livevoice.io/en/churches" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          LiveVoice Churches
                        </a>
                      </td>
                      <td className="py-3 px-4">Listener app with iOS, Android and Huawei store links</td>
                      <td className="py-3 px-4 text-slate-500">Vendor claim</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://churchleaders.com/ministry-tech-leaders/404837-how-to-select-the-best-church-translation-system.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          ChurchLeaders Ministry Tech
                        </a>
                      </td>
                      <td className="py-3 px-4">Up to six languages per receiver system</td>
                      <td className="py-3 px-4 text-slate-500">Trade publication</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://glossa.live/blog/translation-equipment-churches-guide" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Glossa Equipment Guide
                        </a>
                      </td>
                      <td className="py-3 px-4">Battery and charging chores, FM headsets for seniors, cellular data option</td>
                      <td className="py-3 px-4 text-slate-500">Vendor claim</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          ADA.gov Effective Communication
                        </a>
                      </td>
                      <td className="py-3 px-4">Auxiliary aids (captioning, qualified interpreters, assistive listening)</td>
                      <td className="py-3 px-4 text-slate-500">Government guidance (context)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <Link href="/blog/church-translation-system" className="text-primary hover:underline">
                          Exbabel Church Translation System
                        </Link>
                      </td>
                      <td className="py-3 px-4">QR/link, zero app download, headphones for guests without smartphones</td>
                      <td className="py-3 px-4 text-slate-500">Exbabel documentation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Author Disclosure */}
              <div className="my-10 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 leading-relaxed not-prose">
                <p className="font-semibold text-slate-700 mb-1">Author Disclosure &amp; Editorial Standards</p>
                <p>
                  This guide is published by Exbabel, which develops browser-based live church translation systems. Our goal is to provide honest, evidence-backed comparisons so ministry teams make informed decisions. We deliberately avoid unverified claims, arbitrary latency statistics, or promises of universal phone compatibility. All testing should be confirmed on your church&rsquo;s specific devices and sound systems.
                </p>
              </div>

            </div>
          </div>
        </article>

        {/* ── Related Articles Section ───────────────────────────── */}
        {related.length > 0 && (
          <section
            className="border-t border-slate-100 py-16 bg-slate-50/50"
            aria-label="Related articles"
          >
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">
                Related Articles &amp; Field Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((relPost) => (
                  <article
                    key={relPost.slug}
                    className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                  >
                    <Link
                      href={`/blog/${relPost.slug}`}
                      className="block aspect-video overflow-hidden bg-slate-100 relative group"
                    >
                      <img
                        src={relPost.featuredImage}
                        alt={relPost.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {relPost.category}
                        </span>
                        <span className="text-xs text-slate-400">{relPost.readTime}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 flex-1">
                        <Link
                          href={`/blog/${relPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relPost.title}
                        </Link>
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                        {relPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="text-xs font-bold text-primary hover:underline mt-auto inline-flex items-center gap-1"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
