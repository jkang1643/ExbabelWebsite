import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import GlassmorphicHero from "@/components/GlassmorphicHero";

// Below-the-fold components: lazy-loaded to reduce initial JS bundle
// These will only download when they enter the viewport
const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {
  loading: () => <section className="py-12 md:py-32" aria-hidden />,
});
const FeatureShowcase = dynamic(() => import("@/components/FeatureShowcase"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const InterfacePreview = dynamic(() => import("@/components/InterfacePreview"), {
  loading: () => <section className="min-h-[850px]" aria-hidden />,
});
const WhyChurchesChoose = dynamic(() => import("@/components/WhyChurchesChoose"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const VideoLibrarySection = dynamic(() => import("@/components/VideoLibrarySection"), {
  loading: () => <section className="py-24" aria-hidden />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <section className="py-20" aria-hidden />,
});
const ImpactStats = dynamic(() => import("@/components/ImpactStats"), {
  loading: () => <section className="py-32 md:py-40" aria-hidden />,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const AsSeenOn = dynamic(() => import("@/components/AsSeenOn"), {
  loading: () => <section className="py-16" aria-hidden />,
});
const TechnicalRequirements = dynamic(() => import("@/components/TechnicalRequirements"), {
  loading: () => <section className="py-24" aria-hidden />,
});
const CTA = dynamic(() => import("@/components/CTA"), {
  loading: () => <section className="py-24 md:py-32" aria-hidden />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* 1. Hero page */}
      <GlassmorphicHero />
      {/* 2. Demo video */}
      {/* 3. Demo video */}
      <VideoShowcase />
      {/* 4. Features cards (scrollytelling) */}
      <FeatureShowcase />
      {/* 5. One message. Every language. */}
      <InterfacePreview />
      {/* 6. Why Churches Choose ExBabel */}
      <WhyChurchesChoose />
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
