import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";
import FAQSchema from "@/components/schema/FAQSchema";
import SoftwareApplicationSchema from "@/components/schema/SoftwareApplicationSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { HOME_FAQ_DATA, PRODUCTS } from "@/lib/schema";


import ChurchTranslationIntro from "@/components/ChurchTranslationIntro";
import HowItWorks from "@/components/HowItWorks";
import FeatureShowcase from "@/components/FeatureShowcase";
const InterfacePreview = dynamic(() => import("@/components/InterfacePreview"));
const WhyChurchesChoose = dynamic(() => import("@/components/WhyChurchesChoose"));
const VideoLibrarySection = dynamic(() => import("@/components/VideoLibrarySection"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const ImpactStats = dynamic(() => import("@/components/ImpactStats"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const AsSeenOn = dynamic(() => import("@/components/AsSeenOn"));
const TechnicalRequirements = dynamic(() => import("@/components/TechnicalRequirements"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"));


export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <FAQSchema faqs={HOME_FAQ_DATA} />
      <SoftwareApplicationSchema product={PRODUCTS.translate} />
      <SoftwareApplicationSchema product={PRODUCTS.events} />
      <BreadcrumbSchema items={[]} />

      <main className="min-h-screen bg-white">
        <Navbar />
        <GlassmorphicHero />

        <ChurchTranslationIntro />
        <HowItWorks />
        <div id="capabilities" className="scroll-mt-24">
          <FeatureShowcase />
        </div>
        <InterfacePreview />
        <WhyChurchesChoose />
        <VideoLibrarySection />
        <Testimonials />
        <Pricing />
        <ImpactStats />
        <FAQ />
        <AsSeenOn />
        <TechnicalRequirements />
        <CTA />
        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
