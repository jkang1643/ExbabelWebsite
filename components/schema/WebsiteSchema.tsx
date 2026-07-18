import { COMPANY } from "@/lib/schema";

export default function WebsiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY.url}/#website`,
    name: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
    publisher: { "@id": `${COMPANY.url}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${COMPANY.url}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
