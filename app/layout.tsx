import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

import Script from "next/script";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exbabel - AI Speech-to-Speech Translation Platform",
  description: "The complete real-time speech-to-speech translation platform for live video, audio, and synchronized captions.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="exbabel" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="dns-prefetch" href="//js-na2.hs-scripts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${sora.variable} font-sans`} suppressHydrationWarning>
        {children}
        {/* Start of HubSpot Embed Code — lazyOnload to avoid blocking interactivity */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="//js-na2.hs-scripts.com/245326184.js"
        />
        {/* End of HubSpot Embed Code */}
      </body>
    </html>
  );
}

