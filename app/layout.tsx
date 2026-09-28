import type { Metadata, Viewport } from "next";
import MobileScrollProvider from "@/components/MobileScrollProvider";
import PostHogProvider from "@/components/PostHogProvider";
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
  metadataBase: new URL("https://www.exbabel.com"),
  title: {
    default: "Church Translation System & Live AI Translation | Exbabel",
    template: "%s | Exbabel",
  },
  description:
    "Real-time church translation for sermons, services and livestreams. Deliver AI-translated speech and live captions to listeners in multiple languages on any device.",
  keywords: [
    "real-time translation", "AI translation", "speech-to-speech translation",
    "live translation", "church translation", "conference translation",
    "multilingual events", "AI captions", "live captions", "sermon translation",
    "enterprise translation", "Exbabel",
  ],
  authors: [{ name: "Exbabel Co.", url: "https://www.exbabel.com" }],
  creator: "Exbabel Co.",
  publisher: "Exbabel Co.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default" },
  openGraph: {
    type: "website", locale: "en_US", url: "https://www.exbabel.com", siteName: "Exbabel",
    title: "Church Translation System & Live AI Translation | Exbabel",
    description: "Real-time church translation for sermons, services and livestreams. Deliver AI-translated speech and live captions to listeners in multiple languages on any device.",
    images: [{ url: "/exbabel-og-preview.png", width: 1200, height: 630, alt: "Exbabel - Real-time AI Translation Platform" }],
  },
  twitter: {
    card: "summary_large_image", site: "@exbabel", creator: "@exbabel",
    title: "Church Translation System & Live AI Translation | Exbabel",
    description: "The complete real-time speech-to-speech AI translation platform for churches, conferences, and live events. 180+ languages.",
    images: ["/exbabel-og-preview.png"],
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R9MC0WBGBM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R9MC0WBGBM');
          `}
        </Script>
        {/* Preconnect to critical third-party origins */}
        <link rel="dns-prefetch" href="//js-na2.hs-scripts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${sora.variable} font-sans`} suppressHydrationWarning>
        <MobileScrollProvider />
        <PostHogProvider />
        {/* Global JSON-LD schemas */}
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        <Script id="hs-script-loader" strategy="lazyOnload" src="//js-na2.hs-scripts.com/245326184.js" />
      </body>
    </html>
  );
}
