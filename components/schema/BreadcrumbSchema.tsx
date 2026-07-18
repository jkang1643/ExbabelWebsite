import { COMPANY } from "@/lib/schema";

interface BreadcrumbSchemaProps { items: { name: string; url: string }[]; }

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: COMPANY.url },
      ...items.map((item, index) => ({ "@type": "ListItem", position: index + 2, name: item.name, item: item.url })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
