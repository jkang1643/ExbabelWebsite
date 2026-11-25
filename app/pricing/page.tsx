import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import ChurchLanguageAccess from "@/components/church/ChurchLanguageAccess";
import styles from "@/app/solutions/church-translation/page.module.css";

export const metadata: Metadata = {
  title: "Church Translation Pricing | Exbabel",
  description: "Unlimited simultaneous languages on every Exbabel church plan. Compare Starter, Pro, and Unlimited by included hours, features, and language coverage.",
  alternates: { canonical: "https://www.exbabel.com/pricing/" },
};

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.pricingPageMain}>
        <Pricing surface="pricing" />
        <ChurchLanguageAccess />
        <section className={`${styles.wrap} ${styles.pricingExplore}`} aria-labelledby="pricing-explore-title">
          <h2 id="pricing-explore-title">Compare church translation options</h2>
          <p>Compare Exbabel’s unlimited simultaneous languages with other translation platforms. Explore church use cases and compare AI with human interpretation.</p>
          <div className={styles.pricingExploreLinks}>
            <Link href="/solutions/church-translation/">Explore church use cases</Link>
            <Link href="/blog/church-interpreter-vs-ai-translation/">Compare AI and human interpretation</Link>
            <Link href="/compare/">Compare translation platforms</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
