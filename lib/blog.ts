/**
 * Blog Data Layer
 *
 * Central registry for all blog posts. Adding a new article is as simple as
 * appending an entry to the BLOG_POSTS array and creating the corresponding
 * page component under app/blog/[slug]/page.tsx.
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

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All" || category === "all") return getAllPosts();
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
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
