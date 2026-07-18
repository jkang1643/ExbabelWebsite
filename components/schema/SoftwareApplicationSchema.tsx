import { COMPANY, getPublisher } from "@/lib/schema";

interface SoftwareApplicationSchemaProps {
  product: {
    name: string; url: string; description: string; applicationCategory: string;
    operatingSystem: string; softwareVersion: string; features: readonly string[];
    screenshot: string; offers: readonly { name: string; price: number; priceCurrency: string; billingPeriod: string; description: string; url: string; }[];
  };
}

export default function SoftwareApplicationSchema({ product }: SoftwareApplicationSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    name: product.name, url: product.url, description: product.description,
    applicationCategory: product.applicationCategory, operatingSystem: product.operatingSystem,
    softwareVersion: product.softwareVersion, featureList: product.features.join(", "),
    screenshot: product.screenshot, publisher: getPublisher(),
    brand: { "@type": "Brand", name: COMPANY.name },
    offers: product.offers.map((o) => ({
      "@type": "Offer", name: o.name, ...(o.price > 0 && { price: o.price.toString() }),
      priceCurrency: o.priceCurrency, description: o.description, url: o.url,
      availability: "https://schema.org/InStock",
    })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "47", bestRating: "5", worstRating: "1" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
