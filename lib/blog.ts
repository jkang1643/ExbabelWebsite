/**
 * Blog Data Layer & Publication Architecture
 *
 * Central registry for Exbabel Insights editorial SaaS publication.
 * Supports categories, pillar hubs, top articles, and editor's picks.
 */

export type EditorialArchetype =
  | "editorial-ui-collage"
  | "split-product"
  | "typography-3d"
  | "brand-board"
  | "website-mockup";

export interface EditorialPillData {
  sourceLang?: string;
  sourceLangName?: string;
  targetLang?: string;
  targetLangName?: string;
  statusText?: string;
  metricText?: string;
  pipelineSteps?: string[];
  techCode?: string;
}

export interface EditorialColorTheme {
  bgGradient: string;
  accent: string;
  accentBg: string;
  tagColor: string;
}

export interface BlogCategoryInfo {
  slug: string;
  name: string;
  description: string;
  pillarTitle?: string;
  tagline?: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
  {
    slug: "church-translation",
    name: "Church Translation",
    description:
      "Resources and field guides for building an inclusive, multilingual church experience with real-time AI translation and captions.",
    pillarTitle: "Everything you need to know about AI translation for churches",
    tagline: "Multilingual Worship · Sermon Translation · Audio Streams · QR Phone Access",
  },
  {
    slug: "live-translation",
    name: "Live Translation",
    description:
      "Real-time speech-to-speech AI translation pipelines, low-latency streaming protocols, and live broadcast engineering.",
    pillarTitle: "The Future of Real-Time Speech-to-Speech Streaming",
    tagline: "Sub-Second Latency · WebRTC & RTMP · 180+ Languages · Zero Hardware",
  },
  {
    slug: "ai-translation",
    name: "AI Translation",
    description:
      "Deep dives into neural translation models, speech synthesis, domain-specific terminology, and audio fidelity.",
    pillarTitle: "Benchmarking Next-Gen Neural Translation vs. Human Interpreters",
    tagline: "Latency Benchmarks · Acoustic Models · Vocabulary Customization",
  },
  {
    slug: "church-technology",
    name: "Church Technology",
    description:
      "AV engineering, audio consoles, Dante network integration, and broadcast setups for modern worship ministries.",
    pillarTitle: "Modern Church AV: Audio Routing & Livestream Integration",
    tagline: "Dante Audio · OBS Studio · Behringer & Allen-Heath · Wireless Systems",
  },
  {
    slug: "guides",
    name: "Guides",
    description:
      "Step-by-step implementation walkthroughs, equipment checklists, and best practices for production teams.",
    pillarTitle: "Production Handbooks & AV Checklists",
    tagline: "Setup Guides · Volunteer Training · Troubleshooting · Audio Interfaces",
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    description:
      "Real-world accounts of churches, conferences, and global ministries scaling multilingual engagement with Exbabel.",
    pillarTitle: "Ministry Stories: Translating Across Borders and Languages",
    tagline: "Bilingual Congregations · Global Conferences · Worship Testimonials",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  datePublished: string;
  dateModified: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  featuredImageAlt: string;
  keywords: string[];
  canonicalUrl: string;
  wordCount: number;
  readTime: string;
  archetype: EditorialArchetype;
  colorTheme: EditorialColorTheme;
  editorialPill: EditorialPillData;
  relatedPosts: string[];
  isFeatured?: boolean;
  isTopArticle?: boolean;
  isEditorsPick?: boolean;
  cta?: {
    primary: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "church-translation-equipment",
    title: "Church Translation Equipment: Hardware vs AI Options",
    seoTitle: "Church Translation Equipment: Hardware vs AI Options",
    metaDescription:
      "Compare church translation headsets, receivers, transmitters, and AI-based systems. Learn real setup trade-offs, recurring costs, and buying criteria.",
    excerpt:
      "Sunday, 9:40. A visitor hovers by the welcome desk and asks, \"Anything in Spanish?\" Here is what church translation equipment actually does, how RF receivers compare to phone-based AI, and how to model true three-year ownership costs.",
    author: "Exbabel Editorial Team",
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    category: "Church Translation",
    categorySlug: "church-translation",
    featuredImage: "/photos/blog/church-translation-equipment-hero.png",
    featuredImageAlt:
      "Church translation equipment comparison showing radio frequency bodypack receivers in charging dock, studio monitoring headphones, USB audio interface, and smartphone streaming live translation",
    keywords: [
      "church translation equipment",
      "translation equipment for churches",
      "church interpretation equipment",
      "church translation receivers",
      "wireless interpreter headset",
      "church translation transmitter",
      "USB audio interface church",
      "church translation equipment cost",
      "church translation system",
      "church translation headsets",
    ],
    canonicalUrl: "/blog/church-translation-equipment",
    wordCount: 3100,
    readTime: "13 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#081528] via-[#0E2038] to-[#091424]",
      accent: "#38BDF8",
      accentBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tagColor: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    },
    editorialPill: {
      sourceLang: "EN",
      sourceLangName: "English",
      targetLang: "ES",
      targetLangName: "Español",
      statusText: "Hardware vs AI Options",
      metricText: "RF Receivers · Phone-Based AI",
    },
    relatedPosts: [
      "sermon-translation-guide",
      "church-translation-apps",
      "church-translation-system",
    ],
    isFeatured: true,
    isTopArticle: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "Church Translation Solution",
        href: "/solutions/church-translation",
      },
    },
  },

  {
    slug: "sermon-translation-guide",
    title: "Sermon Translation: How to Translate Church Services Live",
    seoTitle: "Sermon Translation: How to Translate Church Services Live",
    metaDescription:
      "Learn how to translate sermons live using a church mixer, USB audio input, multilingual captions, and listener QR codes. Includes a Sunday testing checklist.",
    excerpt:
      "It's 9:40 on a Sunday morning. A visitor asks where the translation headsets are. Here is how to route live sermon audio from the pulpit mic, configure real-time AI speech translation, and test the system before the doors open.",
    author: "Exbabel Editorial Team",
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    category: "Church Translation",
    categorySlug: "church-translation",
    featuredImage: "/photos/blog/sermon-translation-guide-hero.png",
    featuredImageAlt:
      "Church sermon translation guide showing a worshipper listening to live audio translation on a smartphone and wireless earbuds with floating audio waveform",
    keywords: [
      "sermon translation",
      "live sermon translation",
      "how to translate sermons",
      "translate church service live",
      "church audio translation",
      "sermon translation software",
      "Spanish sermon captions",
      "multilingual worship services",
      "church translation equipment",
      "church translation system",
    ],
    canonicalUrl: "/blog/sermon-translation-guide",
    wordCount: 3050,
    readTime: "12 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#1C1427] via-[#2D1B4E] to-[#160D24]",
      accent: "#C084FC",
      accentBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      tagColor: "bg-purple-500/15 text-purple-300 border-purple-400/30",
    },
    editorialPill: {
      sourceLang: "EN",
      sourceLangName: "English",
      targetLang: "ES",
      targetLangName: "Español",
      statusText: "Live Sermon Stream",
      metricText: "Pulpit Mic · QR Earbud Access",
    },
    relatedPosts: [
      "church-translation-equipment",
      "church-translation-apps",
      "church-translation-system",
    ],
    isFeatured: false,
    isTopArticle: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "Church Translation Solution",
        href: "/solutions/church-translation",
      },
    },
  },
  {
    slug: "best-real-time-translation-apps",
    title: "Best Real-Time Translation Apps for Live Events (2026)",
    seoTitle: "Best Real-Time Translation Apps for Live Events (2026)",
    metaDescription:
      "Compare real-time translation apps for meetings, churches and live events. See audio, captions, setup, listener access and limitations.",
    excerpt:
      "Your phone can interpret a dinner conversation. A keynote for hundreds is another job entirely. Here is an evidence-backed buyer's comparison of real-time translation apps for meetings, churches, and live events in 2026.",
    author: "Exbabel Editorial Team",
    datePublished: "2026-10-19",
    dateModified: "2026-10-19",
    category: "Live Translation",
    categorySlug: "live-translation",
    featuredImage: "/photos/blog/best-real-time-translation-apps-hero.png",
    featuredImageAlt:
      "Best Real-Time Translation Apps for Live Events (2026) editorial graphic showing event attendees listening to live speech translation on smartphones and earbuds",
    keywords: [
      "best real time translation app",
      "real time translation app",
      "simultaneous translation app",
      "live voice translator",
      "AI interpretation app",
      "conference translation app",
      "live event translation app",
      "multilingual captions app",
      "church translation app",
      "glossa ai",
      "captionkit ai",
    ],
    canonicalUrl: "/blog/best-real-time-translation-apps",
    wordCount: 3630,
    readTime: "15 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#0F172A] via-[#1E293B] to-[#0A0F1D]",
      accent: "#38BDF8",
      accentBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tagColor: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    },
    editorialPill: {
      sourceLang: "EN",
      sourceLangName: "English",
      targetLang: "ES",
      targetLangName: "Español",
      statusText: "Live Event Translation",
      metricText: "One-to-Many · Audio & Captions",
    },
    relatedPosts: [
      "church-translation-system",
      "on-demand-interpretation-services",
      "church-interpreter-vs-ai-translation",
    ],
    isTopArticle: true,
    isEditorsPick: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "See How Exbabel Works",
        href: "/how-it-works",
      },
    },
  },

  {
    slug: "church-translation-apps",
    title: "Church Translation Apps vs Browser Links and Headsets",
    seoTitle: "Church Translation Apps vs Browser Links & Headsets",
    metaDescription:
      "Compare church translation apps, QR-code browser systems, and listening headsets. Learn what visitors need to connect and what to test before Sunday.",
    excerpt:
      "A visitor scans your QR code, picks a language and hears nothing. WebKit says Safari needs a tap before audio plays. Here is what church translation apps really need to do—and why an app might not need to be an app at all.",
    author: "Exbabel Editorial Team",
    datePublished: "2026-10-22",
    dateModified: "2026-10-22",
    category: "Church Translation",
    categorySlug: "church-translation",
    featuredImage: "/photos/blog/church-translation-apps-hero.png",
    featuredImageAlt:
      "Church Translation Apps vs Browser Links and Headsets comparison showing smartphone app download, browser window, radio receiver device, and wireless earbud",
    keywords: [
      "church translation app",
      "church interpreter app",
      "sermon translation app",
      "QR code church translation",
      "browser-based church translation",
      "church translation on smartphones",
      "church translation without app download",
      "church live caption app",
      "church translation system",
      "church translation equipment",
    ],
    canonicalUrl: "/blog/church-translation-apps",
    wordCount: 2550,
    readTime: "11 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#0A182E] via-[#102A52] to-[#0B1A33]",
      accent: "#38BDF8",
      accentBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tagColor: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    },
    editorialPill: {
      sourceLang: "EN",
      sourceLangName: "English",
      targetLang: "ES",
      targetLangName: "Español",
      statusText: "QR Browser Link · Zero Download",
      metricText: "4-Tap Join · Audio & Captions",
    },
    relatedPosts: [
      "church-translation-system",
      "best-real-time-translation-apps",
      "church-interpreter-vs-ai-translation",
    ],
    isTopArticle: true,
    isEditorsPick: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "See Exbabel Live in Action",
        href: "/live",
      },
    },
  },

  {
    slug: "church-interpreter-vs-ai-translation",
    title: "Church Interpreter vs. AI Translation: What Churches Should Use for Live Services",
    seoTitle:
      "Church Interpreter vs. AI Translation: What Churches Should Use",
    metaDescription:
      "Compare human church interpreters vs. AI translation for live services. Discover differences in cost, accuracy, equipment, smartphone access, and hybrid setups.",
    excerpt:
      "Explore the differences between human church interpreters and real-time AI translation for live services, covering cost, equipment, accuracy, and when to use a hybrid approach.",
    author: "Exbabel Research",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    category: "Church Translation",
    categorySlug: "church-translation",
    featuredImage: "/photos/blog/church-interpreter-vs-ai-translation-hero.jpg",
    featuredImageAlt:
      "Church Interpreter vs. AI Translation editorial overview showing a female interpreter with headset and display screen reading One Church. Many Languages. Same Gospel.",
    keywords: [
      "church interpreter",
      "church interpreter vs ai translation",
      "AI translation for churches",
      "church translation system",
      "sermon translation",
      "church translation equipment",
      "live church translation",
      "simultaneous church interpretation",
      "church translation app",
      "Spanish church translation",
    ],
    canonicalUrl: "/blog/church-interpreter-vs-ai-translation",
    wordCount: 2400,
    readTime: "10 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#0A192F] via-[#102A4C] to-[#0A192F]",
      accent: "#38BDF8",
      accentBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tagColor: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    },
    editorialPill: {
      sourceLang: "EN",
      sourceLangName: "English",
      targetLang: "ES",
      targetLangName: "Español",
      statusText: "Hybrid Translation",
      metricText: "Human Nuance · AI Scale",
    },
    relatedPosts: ["best-real-time-translation-apps", "church-translation-system", "on-demand-interpretation-services"],
    isTopArticle: true,
    isEditorsPick: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "See Exbabel Live in Action",
        href: "/live",
      },
    },
  },
  {
    slug: "church-translation-system",
    title: "AI Church Translation System for Live Services",
    seoTitle:
      "Church Translation System — Live AI Voice Translation & Captions",
    metaDescription:
      "Give every worshipper access to live sermons in their language with Exbabel's AI church translation system. Stream translated audio and captions on any device.",
    excerpt:
      "Exbabel is a church translation system that turns live speech into translated audio and captions during the service. Attendees scan a QR code, choose a language, and follow the message on their own devices.",
    author: "Exbabel Editorial Team",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    category: "Church Translation",
    categorySlug: "church-translation",
    featuredImage: "/photos/blog/church-translation-hero.jpg",
    featuredImageAlt:
      "Editorial collage showing a church attendee using a smartphone language selection interface with floating translation UI and wireless earbuds on a deep blue background",
    keywords: [
      "church translation system",
      "church interpreter",
      "sermon translation",
      "church translation equipment",
      "translation headphones for church",
      "church livestream translation",
      "AI church translation",
      "multilingual church",
      "church translation app",
    ],
    canonicalUrl: "/blog/church-translation-system",
    wordCount: 3800,
    readTime: "14 min read",
    archetype: "editorial-ui-collage",
    colorTheme: {
      bgGradient: "from-[#071329] via-[#0F1E3D] to-[#0A162D]",
      accent: "#38BDF8",
      accentBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tagColor: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    },
    editorialPill: {
      sourceLang: "ES",
      sourceLangName: "Español",
      targetLang: "EN",
      targetLangName: "English",
      statusText: "Translation Live",
      metricText: "18 listeners · Español",
    },
    relatedPosts: ["best-real-time-translation-apps", "church-interpreter-vs-ai-translation", "on-demand-interpretation-services"],
    isTopArticle: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "See Exbabel Live in Action",
        href: "/live",
      },
    },
  },
  {
    slug: "on-demand-interpretation-services",
    title:
      "The Complete Guide to On-Demand Interpretation Services: How AI Is Replacing $200/hr Human Interpreters for Conferences, Churches, and Live Events",
    seoTitle:
      "On-Demand Interpretation Services: AI vs. $200/hr Human Interpreters",
    metaDescription:
      "Discover how AI-powered on-demand interpretation services are replacing costly human interpreters for conferences, churches, and live events. No hardware, 180+ languages, instant setup.",
    excerpt:
      "A new category of on-demand interpretation services, powered by AI, is rewriting the economics and logistics of live event translation. This guide explains exactly how that shift works.",
    author: "Exbabel Research",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    category: "AI Translation",
    categorySlug: "ai-translation",
    featuredImage: "/photos/blog/on-demand-interpretation-services-hero.png",
    featuredImageAlt:
      "AI is replacing $200/hr human interpreters: On-demand translation for conferences, churches, and live events showing interpreter in booth",
    keywords: [
      "on-demand interpretation services",
      "AI interpretation",
      "conference interpretation",
      "church translation",
      "simultaneous interpretation",
      "live event translation",
      "AI translation for events",
      "multilingual events",
    ],
    canonicalUrl: "/blog/on-demand-interpretation-services",
    wordCount: 4500,
    readTime: "16 min read",
    archetype: "split-product",
    colorTheme: {
      bgGradient: "from-[#110E24] via-[#1F173D] to-[#120B24]",
      accent: "#A78BFA",
      accentBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      tagColor: "bg-purple-500/15 text-purple-300 border-purple-400/30",
    },
    editorialPill: {
      statusText: "Speech-to-Speech Engine",
      metricText: "180+ Languages · 0.98s Latency",
      pipelineSteps: ["Audio", "STT", "Translate", "TTS"],
    },
    relatedPosts: ["best-real-time-translation-apps", "church-interpreter-vs-ai-translation", "church-translation-system"],
    isTopArticle: true,
    cta: {
      primary: {
        text: "Start Free Trial",
        href: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      secondary: {
        text: "Schedule a Consultation",
        href: "/demo",
      },
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  if (categorySlug === "All" || categorySlug === "all") return getAllPosts();
  return getAllPosts().filter(
    (post) =>
      post.categorySlug.toLowerCase() === categorySlug.toLowerCase() ||
      post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase()
  );
}

export function getFeaturedPost(): BlogPost {
  return (
    BLOG_POSTS.find((p) => p.isFeatured) ||
    BLOG_POSTS[0]
  );
}

export function getTopArticles(): BlogPost[] {
  const top = BLOG_POSTS.filter((p) => p.isTopArticle);
  if (top.length >= 2) return top;
  return getAllPosts();
}

export function getEditorsPicks(): BlogPost[] {
  const picks = BLOG_POSTS.filter((p) => p.isEditorsPick);
  if (picks.length > 0) return picks;
  return getAllPosts();
}

export function getAllCategories(): BlogCategoryInfo[] {
  return BLOG_CATEGORIES;
}

export function getCategoryBySlug(slug: string): BlogCategoryInfo | undefined {
  return BLOG_CATEGORIES.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase());
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  if (current.relatedPosts.length > 0) {
    return current.relatedPosts
      .map((slug) => getPostBySlug(slug))
      .filter((p): p is BlogPost => p !== undefined);
  }
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);
}
