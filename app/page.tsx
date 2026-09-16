import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";
import FAQSchema from "@/components/schema/FAQSchema";
import SoftwareApplicationSchema from "@/components/schema/SoftwareApplicationSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { HOME_FAQ_DATA, PRODUCTS } from "@/lib/schema";


import ChurchTranslationIntro from "@/components/ChurchTranslationIntro";
import HowItWorks from "@/components/HowItWorks";
import FeatureShowcase from "@/components/FeatureShowcase";
import InterfacePreview from "@/components/InterfacePreview";
import WhyChurchesChoose from "@/components/WhyChurchesChoose";
import VideoLibrarySection from "@/components/VideoLibrarySection";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ImpactStats from "@/components/ImpactStats";
import FAQ from "@/components/FAQ";
import AsSeenOn from "@/components/AsSeenOn";
import TechnicalRequirements from "@/components/TechnicalRequirements";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CookiesPopup from "@/components/CookiesPopup";


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
        <FeatureShowcase />
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
