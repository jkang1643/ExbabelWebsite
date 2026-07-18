import { COMPANY, getSameAs } from "@/lib/schema";

export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "SoftwareCompany"],
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    logo: { "@type": "ImageObject", url: COMPANY.logo, width: 512, height: 512 },
    image: COMPANY.logo,
    description: COMPANY.description,
    slogan: COMPANY.slogan,
    foundingDate: COMPANY.foundingDate,
    telephone: COMPANY.phone,
    email: COMPANY.email.support,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      addressCountry: COMPANY.address.addressCountry,
    },
    contactPoint: [
      { "@type": "ContactPoint", telephone: COMPANY.phone, contactType: "customer support", email: COMPANY.email.support, availableLanguage: ["English", "Spanish"] },
      { "@type": "ContactPoint", email: COMPANY.email.sales, contactType: "sales", availableLanguage: ["English"] },
    ],
    sameAs: getSameAs(),
    brand: { "@type": "Brand", name: COMPANY.name, url: COMPANY.url, logo: COMPANY.logo, slogan: COMPANY.slogan },
    knowsAbout: COMPANY.keywords,
    areaServed: "Worldwide",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 50 },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
