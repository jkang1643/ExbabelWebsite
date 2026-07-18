import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import WebsiteSchema from "@/components/schema/WebsiteSchema";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://exbabel.com"),
  title: {
    default: "Exbabel - AI Speech-to-Speech Translation Platform",
    template: "%s | Exbabel",
  },
  description:
    "The complete real-time speech-to-speech AI translation platform for churches, conferences, and live events. Translate live video, audio, and captions into 180+ languages.",
  keywords: [
    "real-time translation", "AI translation", "speech-to-speech translation",
    "live translation", "church translation", "conference translation",
    "multilingual events", "AI captions", "live captions", "sermon translation",
    "enterprise translation", "Exbabel",
  ],
  authors: [{ name: "Exbabel Co.", url: "https://exbabel.com" }],
  creator: "Exbabel Co.",
  publisher: "Exbabel Co.",
  appleWebApp: { capable: true, statusBarStyle: "default" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_US", url: "https://exbabel.com", siteName: "Exbabel",
    title: "Exbabel - AI Speech-to-Speech Translation Platform",
    description: "The complete real-time speech-to-speech AI translation platform for churches, conferences, and live events. Translate live video, audio, and captions into 180+ languages.",
    images: [{ url: "/photos/exbabel_live_translation_concept_1780070697205.webp", width: 1200, height: 630, alt: "Exbabel - Real-time AI Translation Platform" }],
  },
  twitter: {
    card: "summary_large_image", site: "@exbabel", creator: "@exbabel",
    title: "Exbabel - AI Speech-to-Speech Translation Platform",
    description: "The complete real-time speech-to-speech AI translation platform for churches, conferences, and live events. 180+ languages.",
    images: ["/photos/exbabel_live_translation_concept_1780070697205.webp"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="exbabel" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//js-na2.hs-scripts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${sora.variable} font-sans`} suppressHydrationWarning>
        {/* Global JSON-LD schemas */}
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        <Script id="hs-script-loader" strategy="lazyOnload" src="//js-na2.hs-scripts.com/245326184.js" />
      </body>
    </html>
  );
}
