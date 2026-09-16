import os

content = """import type { Metadata } from \"next\";
import Navbar from \"@/components/Navbar\";
import Footer from \"@/components/Footer\";
import FeatureShowcase from \"@/components/FeatureShowcase\";
import CTA from \"@/components/CTA\";
import BreadcrumbSchema from \"@/components/schema/BreadcrumbSchema\";

export const metadata: Metadata = {
  title: \"Real-Time AI Translation Features | Exbabel\",
  description:
    \"Explore Exbabel's real-time translation features including AI speech translation, multilingual captions, natural AI voices, browser-based listening and livestream translation.\",
};

export default function FeaturesPage() {
  return (
    <main className=\"min-h-screen bg-white\">
      <Navbar />
      <BreadcrumbSchema items={[{ name: 'Features', item: 'https://www.exbabel.com/features' }]} />
      <div className=\"pt-32 pb-16\">
        <div className=\"layout-spine max-w-4xl mx-auto text-center px-4\">
          <h1 className=\"text-4xl md:text-5xl font-bold text-base-ink mb-6\" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Live AI Translation Features for Audio, Video & Captions
          </h1>
          <p className=\"text-lg md:text-xl text-base-muted leading-relaxed\">
            Discover the powerful features that make Exbabel the premier choice for real-time speech-to-speech translation, live captions, and seamless multilingual event experiences.
          </p>
        </div>
      </div>
      <FeatureShowcase />
      <CTA />
      <Footer />
    </main>
  );
}
"""

os.makedirs('/home/jkang1643/projects/exbabel/app/features', exist_ok=True)
with open('/home/jkang1643/projects/exbabel/app/features/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Created app/features/page.tsx")