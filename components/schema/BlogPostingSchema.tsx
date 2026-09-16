import { COMPANY, getPublisher } from "@/lib/schema";

interface BlogPostingSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  wordCount?: number;
}

export default function BlogPostingSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
  author = "Exbabel",
  wordCount,
}: BlogPostingSchemaProps) {
  const readingTimeMinutes = wordCount ? Math.ceil(wordCount / 200) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    image:
      image ||
      "https://exbabel.com/photos/exbabel_live_translation_concept_1780070697205.webp",
    author: {
      "@type": "Organization",
      name: author,
      url: COMPANY.url,
    },
    publisher: getPublisher(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(readingTimeMinutes && { timeRequired: `PT${readingTimeMinutes}M` }),
    ...(wordCount && { wordCount }),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
