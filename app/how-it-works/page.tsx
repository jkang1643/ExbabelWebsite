import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LaserFocusedHowItWorks from "@/components/LaserFocusedHowItWorks";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

export const metadata: Metadata = {
  title: "How It Works | Exbabel - AI Speech Translation in 5 Simple Steps",
  description:
    "Learn how Exbabel translates live events in 5 simple steps. Connect your audio, AI translates in real time, attendees scan a QR code to listen in 180+ languages.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://exbabel.com" },
          { name: "How It Works", url: "https://exbabel.com/how-it-works" },
        ]}
      />

      <main className="min-h-screen bg-white pt-20">
        <Navbar />

        {/* Laser-Focused 5-Step How It Works Walkthrough */}
        <LaserFocusedHowItWorks />

        {/* FAQs placed right after main walkthrough */}
        <FAQ />

        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
