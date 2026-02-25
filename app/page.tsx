"use client";

import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";
import ImpactStats from "@/components/ImpactStats";
import TrustedPartners from "@/components/TrustedPartners";
import AsSeenOn from "@/components/AsSeenOn";
import FeatureShowcase from "@/components/FeatureShowcase";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import InterfacePreview from "@/components/InterfacePreview";
import VideoShowcase from "@/components/VideoShowcase";
import Pricing from "@/components/Pricing";
import VideoLibrarySection from "@/components/VideoLibrarySection";

import FAQ from "@/components/FAQ";
import TechnicalRequirements from "@/components/TechnicalRequirements";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* 1. Hero page */}
      <GlassmorphicHero />
      {/* 2. TRUSTED BY 500+ CHURCHES scrolling */}
      <TrustedPartners />
      {/* 3. Demo video */}
      <VideoShowcase />
      {/* 4. Features cards (scrollytelling) */}
      <FeatureShowcase />
      {/* 5. One message. Every language. */}
      <InterfacePreview />
      {/* 6. How it works */}
      <HowItWorks />
      <VideoLibrarySection />
      {/* 7. Hear from community */}
      <Testimonials />
      {/* 8. Break Language Barriers - Pricing */}
      <Pricing />
      {/* 9. IMPACT AT SCALE */}
      <ImpactStats />
      {/* 10. FAQ */}
      <FAQ />
      {/* 11. AS SEEN ON */}
      <AsSeenOn />
      <TechnicalRequirements />
      {/* Final conversion push */}
      <CTA />
      <Footer />
    </main>
  );
}

