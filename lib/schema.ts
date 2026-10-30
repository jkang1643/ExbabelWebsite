/**
 * AEO (Answer Engine Optimization) — Central Schema Constants & Helpers
 *
 * Single source of truth for all structured data across the site.
 * Update company info, social links, and product data here.
 */

// ─── Company Constants ──────────────────────────────────────────────────────────

export const COMPANY = {
  name: "Exbabel",
  legalName: "Exbabel Co.",
  url: "https://exbabel.com",
  appUrl: "https://app.exbabel.com",
  logo: "https://exbabel.com/photos/exbabel_live_translation_concept_1780070697205.webp",
  description:
    "Exbabel is the complete real-time speech-to-speech AI translation platform for churches, conferences, enterprises, and live events. Translate live video, audio, and captions into 180+ languages with sub-second latency.",
  slogan: "Speak once. Be heard everywhere.",
  foundingDate: "2025",
  industry: "Artificial Intelligence / Language Technology",
  phone: "+12816824828",
  phoneDisplay: "(281) 682-4828",
  address: {
    streetAddress: "",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "",
    addressCountry: "US",
  },
  email: {
    support: "support@exbabel.com",
    sales: "support@exbabel.com",
  },
  social: {
    twitter: "https://twitter.com/exbabel",
    linkedin: "https://linkedin.com/company/exbabel",
    github: "https://github.com/exbabel",
    youtube: "https://youtube.com/@exbabel",
    discord: "https://discord.gg/exbabel",
  },
  keywords: [
    "real-time translation",
    "AI translation",
    "speech-to-speech translation",
    "live translation",
    "church translation",
    "conference translation",
    "multilingual events",
    "AI captions",
    "live captions",
    "sermon translation",
    "enterprise translation",
  ],
} as const;

// ─── Product Definitions ────────────────────────────────────────────────────────

export const PRODUCTS = {
  translate: {
    name: "Exbabel Translate",
    url: "https://exbabel.com",
    description:
      "AI-powered church translation platform with live captions, sermon translation, and multilingual worship support for 180+ languages.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
    softwareVersion: "1.0.0",
    features: [
      "Real-time speech-to-text translation",
      "180+ languages and dialects",
      "90+ premium AI voices",
      "Sub-second latency",
      "Live captions and subtitles",
      "AI-powered sermon translation",
      "Ministry-specific 8000+ phrase bank",
      "SafeStream profanity filter",
      "Voice cloning",
      "Bible verse recognition",
      "No app installation required",
      "QR code audience access",
    ],
    screenshot: "https://exbabel.com/photos/exbabel-product-video-picture.webp",
    offers: [
      {
        name: "Starter",
        price: 39,
        priceCurrency: "USD",
        billingPeriod: "month",
        description: "6 hours live + 10 hours solo, 60 premium languages, 200+ caption languages",
        url: "https://app.exbabel.com/translate/checkout?plan=starter",
      },
      {
        name: "Pro",
        price: 99,
        priceCurrency: "USD",
        billingPeriod: "month",
        description: "12 hours live + 20 hours solo, 90 premium languages, 250+ caption languages, 50% faster",
        url: "https://app.exbabel.com/translate/checkout?plan=pro",
      },
      {
        name: "Unlimited",
        price: 299,
        priceCurrency: "USD",
        billingPeriod: "month",
        description: "36 hours live + unlimited solo, 75 world-class ElevenLabs voices, voice cloning, custom branding",
        url: "https://app.exbabel.com/translate/checkout?plan=unlimited",
      },
    ],
  },
  live: {
    name: "Exbabel Live",
    url: "https://exbabel.com/live",
    description:
      "Real-time live video translation platform with AI voiceovers, synchronized captions, and multilingual streaming for churches, conferences, and enterprise events.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
    softwareVersion: "1.0.0",
    features: [
      "Live video translation overlay",
      "Real-time AI voiceover in 60+ languages",
      "Synchronized live captions",
      "OBS Studio integration",
      "vMix and Wirecast compatible",
      "RTMP encoder support",
      "Unlimited viewers per session",
      "Zero hardware required",
      "Setup in under 5 minutes",
      "Automatic failover and stream recovery",
      "Enterprise-grade reliability",
      "Network resilience and intelligent buffering",
    ],
    screenshot: "https://exbabel.com/photos/exbabel-product-video-picture.webp",
    offers: [
      {
        name: "Exbabel Live",
        price: 99,
        priceCurrency: "USD",
        billingPeriod: "month",
        description: "Live video translation with AI voiceovers, captions, and unlimited viewers. $10/hour per language usage rate.",
        url: "https://app.exbabel.com/live/checkout",
      },
    ],
  },
  events: {
    name: "Exbabel Events",
    url: "https://exbabel.com",
    description:
      "Enterprise-grade multilingual conference and event translation platform for the UN, universities, government organizations, NGOs, and large-scale conferences.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser (Chrome, Firefox, Safari, Edge)",
    softwareVersion: "1.0.0",
    features: [
      "Conference-grade translation",
      "Enterprise event support",
      "UN-level multilingual meetings",
      "University lecture translation",
      "Government and NGO support",
      "Large-scale conference streaming",
      "Custom branding",
      "Dedicated enterprise support",
      "White-glove onboarding",
      "Custom integrations",
    ],
    screenshot: "https://exbabel.com/photos/exbabel-product-video-picture.webp",
    offers: [
      {
        name: "Enterprise",
        price: 0,
        priceCurrency: "USD",
        billingPeriod: "month",
        description: "Custom pricing for enterprise, UN, and large conference deployments. Contact sales.",
        url: "https://app.exbabel.com/contact?type=enterprise",
      },
    ],
  },
} as const;

// ─── FAQ Data (shared between FAQ component and FAQSchema) ──────────────────────

export const HOME_FAQ_DATA: { question: string; answer: string }[] = [
  {
    question: "How does an AI church translation system work during live services?",
    answer:
      "Exbabel captures audio directly from your church soundboard or microphone, processes speech through an incremental streaming AI pipeline, and broadcasts synchronized voiceovers and captions to congregants' smartphones in ~2 seconds. Attendees simply scan a QR code on the church bulletin or display to listen in their native language using their personal earbuds—with zero app downloads or account logins required.",
  },
  {
    question: "How do church members and event attendees listen to live translation on their phones?",
    answer:
      "Attendees listen instantly by scanning a QR code or visiting a short web link on any iOS or Android smartphone browser. They select their language from 180+ options and hear high-definition, translated speech in real time using their standard headphones or Bluetooth earbuds. No app installation, app store login, or hardware receiver is needed.",
  },
  {
    question: "How does Exbabel compare to Wordly for church and live event translation?",
    answer:
      "In independent laboratory benchmarks (EXB-LAB-2026-001), Exbabel delivered live translated speech up to 10.2× faster than Wordly during continuous speech. While Wordly buffers incoming audio until the speaker pauses (causing delays of 7 to 20+ seconds during continuous preaching), Exbabel streams translated audio incrementally in ~2.0 seconds regardless of speech duration. Exbabel also provides transparent monthly pricing rather than restrictive per-hour credit packages.",
  },
  {
    question: "How much does church translation equipment cost compared to Exbabel?",
    answer:
      "Traditional multi-channel FM or infrared church translation equipment costs between $5,000 and $15,000 upfront for transmitters, headsets, and maintenance, plus ongoing battery and sanitation costs. Exbabel replaces all dedicated hardware with a software-based system starting at $39/month with a 30-day free trial. Congregants use their existing smartphones as receivers, eliminating equipment purchases entirely.",
  },
  {
    question: "What is the audio and caption latency of Exbabel during live preaching?",
    answer:
      "Exbabel delivers translated captions (Time to First Caption) in approximately 1.01 seconds and synthesized live speech (Time to First Speech) in approximately 2.02 seconds from speaker speech onset. Under IEEE 829 performance testing, Exbabel's streaming architecture maintains a constant ~2-second latency even during extended continuous speaking without pausing.",
  },
  {
    question: "What soundboards, video switchers, and streaming platforms does Exbabel integrate with?",
    answer:
      "Exbabel integrates seamlessly with any standard church soundboard (Behringer X32, Allen & Heath, Yamaha, PreSonus) via standard USB or line-in audio, and supports all major live broadcasting tools including OBS Studio, vMix, Wirecast, Blackmagic ATEM, and RTMP hardware encoders. It works concurrently with YouTube Live, Facebook Live, and Church Online Platform.",
  },
  {
    question: "How does Exbabel ensure theological and biblical accuracy in sermon translations?",
    answer:
      "Exbabel incorporates a specialized dictionary of over 8,000 ministry-specific terms, theological concepts, denominational vocabulary, and automated Bible verse detection. It also features SafeStream profanity filtering and optional voice cloning so the translated audio retains the original pastor's vocal warmth and cadence.",
  },
  {
    question: "How many languages and live AI voiceovers are supported?",
    answer:
      "Exbabel supports real-time translation into 180+ global languages and regional dialects, including Spanish, Portuguese, French, Mandarin Chinese, Cantonese, Korean, Vietnamese, Arabic, Hindi, Tagalog, Ukrainian, and Haitian Creole. More than 90 languages feature ultra-realistic natural AI speech voices, and 250+ languages are available for live on-screen captions.",
  },
  {
    question: "Can Exbabel be used for conferences, business meetings, and universities?",
    answer:
      "Yes. Beyond houses of worship, Exbabel is deployed for international conferences, corporate webinars, university lectures, and UN-level multilateral meetings. It scales to thousands of concurrent listeners per room with enterprise-grade encryption, zero hardware bottlenecks, and custom glossary management.",
  },
  {
    question: "How much does Exbabel cost, and is there a free trial?",
    answer:
      "Exbabel offers three transparent plans: Starter at $39/month (6 live hours, 60 premium languages, 30-day free trial), Pro at $99/month (12 live hours, 90 premium languages, 50% faster streaming), and Unlimited at $299/month (36 live hours, ElevenLabs neural voice cloning). All plans include unlimited attendees per session and an affordable usage rate of $10/hour per language.",
  },
  {
    question: "Do attendees need to download an app or create an account to listen?",
    answer:
      "No. Attendees never need to download an app from the App Store or Google Play, and never need to register an account or provide an email. The listener interface runs entirely inside modern mobile web browsers (Safari, Chrome, Firefox, Edge) via instant QR code access.",
  },
];

// ─── Helper: Shared publisher object ────────────────────────────────────────────

export function getPublisher() {
  return {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: {
      "@type": "ImageObject",
      url: COMPANY.logo,
    },
  };
}

// ─── Helper: sameAs array ───────────────────────────────────────────────────────

export function getSameAs(): string[] {
  return Object.values(COMPANY.social);
}
