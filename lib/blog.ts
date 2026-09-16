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
    relatedPosts: ["on-demand-interpretation-services"],
    isFeatured: true,
    isTopArticle: true,
    cta: {
      primary: {
        text: "Start a Free Trial",
        href: "https://app.exbabel.com/live/checkout",
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
    featuredImage: "/photos/blog/on-demand-interpretation-services-hero.jpg",
    featuredImageAlt:
      "Conference audience using AI-powered on-demand interpretation on smartphones and wireless earbuds",
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
    relatedPosts: ["church-translation-system"],
    isTopArticle: true,
    isEditorsPick: true,
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
