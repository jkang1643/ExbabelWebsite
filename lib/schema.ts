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
    question: "How does Exbabel work?",
    answer:
      "Exbabel uses advanced AI to translate speech in real-time. A speaker talks into a microphone or streams video, and Exbabel instantly transcribes, translates, and delivers the translated audio or captions to listeners in their chosen language. Listeners access translations via any web browser — no app required. Simply scan a QR code or visit a link.",
  },
  {
    question: "How many languages are supported?",
    answer:
      "Exbabel supports translation into 180+ languages and dialects, including English, Spanish, French, Chinese (Simplified & Traditional), Arabic, Hindi, Portuguese, Russian, Japanese, Korean, German, Italian, and many more. 90+ languages include premium AI voice output, and 250+ are available for captions and text translation.",
  },
  {
    question: "Does Exbabel use AI?",
    answer:
      "Yes, Exbabel uses advanced AI models to power our translation service. We have fine-tuned these models to accurately understand context, idioms, and cultural nuances, ensuring your message stays true to its original meaning even after translation.",
  },
  {
    question: "Can churches use Exbabel?",
    answer:
      "Absolutely. Exbabel was built specifically for churches and ministries. It includes an 8,000+ ministry-specific phrase bank, Bible verse recognition, a SafeStream profanity filter, and voice cloning for pastors. Churches use Exbabel to translate sermons, worship services, and livestreams into multiple languages simultaneously.",
  },
  {
    question: "Can conferences use Exbabel?",
    answer:
      "Yes. Exbabel supports enterprise-grade conference translation with real-time speech-to-speech translation, live captions, and multilingual streaming. It integrates with OBS Studio, vMix, Wirecast, and RTMP encoders, making it ideal for large conferences, UN events, and multilingual meetings.",
  },
  {
    question: "Can universities use Exbabel?",
    answer:
      "Yes. Universities can use Exbabel to translate lectures, seminars, and campus events in real-time. Students access translations on their own devices via a web browser. Exbabel supports 180+ languages, making it perfect for international student populations.",
  },
  {
    question: "Can the UN use Exbabel?",
    answer:
      "Yes. Exbabel is designed for enterprise-scale deployments including UN-level multilingual meetings. It supports simultaneous translation into dozens of languages with sub-second latency, enterprise-grade reliability, and automatic failover protection.",
  },
  {
    question: "What streaming platforms are supported?",
    answer:
      "Exbabel integrates with all major streaming workflows including OBS Studio, vMix, Wirecast, RTMP Encoders, hardware streaming appliances, and existing church streaming platforms. Setup takes minutes, not months.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Exbabel offers three plans: Starter at $39/month (6 hours live, 60 premium languages), Pro at $99/month (12 hours live, 90 premium languages, 50% faster), and Unlimited at $299/month (36 hours live, world-class voices, voice cloning). All plans include a usage rate of $10/hour per language. The Starter plan includes a 30-day free trial.",
  },
  {
    question: "How secure is Exbabel?",
    answer:
      "Exbabel uses enterprise-grade security including encrypted data transmission, secure authentication, and privacy-compliant data handling. Audio and translation data are processed in real-time and not stored permanently. Our platform is built for mission-critical live events where reliability and security are paramount.",
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
