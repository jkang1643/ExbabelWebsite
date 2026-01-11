"use client";

import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";
import CapabilitySwitcher from "@/components/CapabilitySwitcher";
import ImpactStats from "@/components/ImpactStats";
import TrustedPartners from "@/components/TrustedPartners";
import HowItWorks from "@/components/HowItWorks";
import InterfacePreview from "@/components/InterfacePreview";
import Features from "@/components/Features";
import TechnicalRequirements from "@/components/TechnicalRequirements";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <GlassmorphicHero />
      <CapabilitySwitcher />
      <HowItWorks />
      <InterfacePreview />
      <Features />
      <TechnicalRequirements />
      <ImpactStats />
      <Pricing />
      <FAQ />
      <TrustedPartners />
      <CTA />
      <Footer />
    </main>
  );
}

