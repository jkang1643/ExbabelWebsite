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
    "@id": "https://www.exbabel.com/lab-test/#dataset",
    "name": name,
    "description": description,
    "url": url,
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "measurementTechnique": "IEEE 829-2008 & ISO/IEC 25010 Frame-accurate 30 FPS visual demuxing and 21.3ms RMS acoustic energy windowing via FFmpeg astats",
    "creator": {
      "@type": "Organization",
      "@id": "https://www.exbabel.com/#organization",
      "name": creator.name,
      "url": creator.url,
      "logo": "https://www.exbabel.com/logo-light.svg"
    },
    "distribution": [
      {
        "@type": "DataDownload",
        "encodingFormat": "application/pdf",
        "contentUrl": "https://www.exbabel.com/docs/exbabel_vs_wordly_lab_report.pdf",
        "name": "EXB-LAB-2026-001 Executive Latency Benchmark Report (PDF)"
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "text/markdown",
        "contentUrl": "https://www.exbabel.com/docs/exbabel_vs_wordly_lab_report.md",
        "name": "EXB-LAB-2026-001 Markdown Source Report (MD)"
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "application/json",
        "contentUrl": "https://www.exbabel.com/docs/speed_test_results.json",
        "name": "Exbabel Trial Latency Dataset (JSON)"
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "application/json",
        "contentUrl": "https://www.exbabel.com/docs/wordly_speed_results.json",
        "name": "Wordly Trial Latency Dataset (JSON)"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
