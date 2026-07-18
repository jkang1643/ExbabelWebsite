import type { Metadata } from "next";
import SoftwareApplicationSchema from "@/components/schema/SoftwareApplicationSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import FAQSchema from "@/components/schema/FAQSchema";
import { PRODUCTS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Live Video Translation",
  description: "Transform your church livestream into a multilingual experience with real-time AI voice translation, live video overlays, and synchronized captions in 60+ languages.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Exbabel Live — Real-Time Video Translation",
    description: "Transform any livestream into a multilingual experience with AI voice translation, video overlays, and live captions. Works with OBS, vMix, Wirecast, and RTMP.",
    url: "https://exbabel.com/live",
    images: [{ url: "/photos/exbabel-product-video-picture.webp", width: 1200, height: 630, alt: "Exbabel Live Video Translation Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exbabel Live — Real-Time Video Translation",
    description: "Transform any livestream into a multilingual experience. AI voice translation, video overlays, and live captions in 60+ languages.",
    images: ["/photos/exbabel-product-video-picture.webp"],
  },
};

const LIVE_FAQS = [
  { question: "How does Exbabel Live work?", answer: "Exbabel Live integrates with your existing streaming setup (OBS Studio, vMix, Wirecast, or RTMP encoders). It captures the audio from your livestream, translates it in real-time using AI, and delivers translated audio voiceovers and synchronized captions to viewers in their chosen language." },
  { question: "How much does Exbabel Live cost?", answer: "Exbabel Live starts at $99/month with a $10/hour per language usage rate. You only pay for what you stream. A 30-day free trial is available. Annual billing saves you money." },
  { question: "What streaming platforms work with Exbabel Live?", answer: "Exbabel Live works with OBS Studio, vMix, Wirecast, RTMP Encoders, hardware streaming appliances, and existing church streaming platforms. Setup takes under 5 minutes." },
  { question: "How many viewers can watch a translated stream?", answer: "Exbabel Live supports unlimited viewers per session. There is no cap on the number of people who can access your translated stream simultaneously." },
];

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationSchema product={PRODUCTS.live} />
      <BreadcrumbSchema items={[{ name: "Exbabel Live", url: "https://exbabel.com/live" }]} />
      <FAQSchema faqs={LIVE_FAQS} />
      {children}
    </>
  );
}
