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
  title: "Exbabel - Bridging Communities. Building Futures.",
  description: "AI platform that bridges communities through real-time translation",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="exbabel" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${sora.variable} font-sans`} suppressHydrationWarning>
        {/* Solid white notch cover for mobile safe areas */}
        <div className="fixed top-0 left-0 right-0 bg-white z-[100] pointer-events-none" style={{ height: "env(safe-area-inset-top, 0px)" }} />
        {children}
        {/* Start of HubSpot Embed Code */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js-na2.hs-scripts.com/245326184.js"
        />
        {/* End of HubSpot Embed Code */}
      </body>
    </html>
  );
}

