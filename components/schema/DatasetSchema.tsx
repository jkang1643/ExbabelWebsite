import React from 'react';
interface DatasetSchemaProps {
  name: string;
  description: string;
  url: string;
  creator: { name: string; url: string };
}
export default function DatasetSchema({ name, description, url, creator }: DatasetSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": name,
    "description": description,
    "url": url,
    "creator": {
      "@type": "Organization",
      "name": creator.name,
      "url": creator.url
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
