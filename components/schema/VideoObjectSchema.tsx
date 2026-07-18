import { getPublisher } from "@/lib/schema";

interface VideoObjectSchemaProps {
  name: string; description: string; thumbnailUrl: string; uploadDate: string;
  contentUrl?: string; embedUrl?: string; duration?: string;
}

export default function VideoObjectSchema({ name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl, duration }: VideoObjectSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "VideoObject", name, description,
    thumbnailUrl, uploadDate,
    ...(contentUrl && { contentUrl }), ...(embedUrl && { embedUrl }),
    ...(duration && { duration }), publisher: getPublisher(),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
