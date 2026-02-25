import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="exbabel">
      <body className={`${sora.variable} font-sans`}>
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

