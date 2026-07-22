import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";
import FAQSchema from "@/components/schema/FAQSchema";
import SoftwareApplicationSchema from "@/components/schema/SoftwareApplicationSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { HOME_FAQ_DATA, PRODUCTS } from "@/lib/schema";


const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), { loading: () => <section className="py-12 md:py-32" aria-hidden /> });
const FeatureShowcase = dynamic(() => import("@/components/FeatureShowcase"), { loading: () => <section className="py-24 md:py-32" aria-hidden /> });
const InterfacePreview = dynamic(() => import("@/components/InterfacePreview"), { loading: () => <section className="min-h-[850px]" aria-hidden /> });
const WhyChurchesChoose = dynamic(() => import("@/components/WhyChurchesChoose"), { loading: () => <section className="py-24 md:py-32" aria-hidden /> });
const VideoLibrarySection = dynamic(() => import("@/components/VideoLibrarySection"), { loading: () => <section className="py-24" aria-hidden /> });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { loading: () => <section className="py-24 md:py-32" aria-hidden /> });
const Pricing = dynamic(() => import("@/components/Pricing"), { loading: () => <section className="py-20" aria-hidden /> });
const ImpactStats = dynamic(() => import("@/components/ImpactStats"), { loading: () => <section className="py-32 md:py-40" aria-hidden /> });
const FAQ = dynamic(() => import("@/components/FAQ"), { loading: () => <section className="py-24 md:py-32" aria-hidden /> });
const AsSeenOn = dynamic(() => import("@/components/AsSeenOn"), { loading: () => <section className="py-16" aria-hidden /> });
const TechnicalRequirements = dynamic(() => import("@/components/TechnicalRequirements"), { loading: () => <section className="py-24" aria-hidden /> });
const CTA = dynamic(() => import("@/components/CTA"), { loading: () => <section className="py-24 md:py-32" aria-hidden /> });
const Footer = dynamic(() => import("@/components/Footer"), { loading: () => <footer className="py-12" aria-hidden /> });
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), { loading: () => null });

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
        <VideoShowcase />
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
