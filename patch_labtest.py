import os

schema_comp = """import React from 'react';
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
"""
with open('/home/jkang1643/projects/exbabel/components/schema/DatasetSchema.tsx', 'w', encoding='utf-8') as f:
    f.write(schema_comp)

path = '/home/jkang1643/projects/exbabel/app/lab-test/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'title: "Latency Benchmark Report (EXB-LAB-2026-001) | Exbabel Research Lab",',
    'title: "Real-Time Translation Latency Benchmarks | Exbabel Lab",'
)
c = c.replace(
    'description: "Empirical objective audio-visual latency evaluation measuring end-to-end real-time speech translation performance. Conducted under IEEE 829 and ISO 25010 guidelines.",',
    'description: "See independent latency tests and benchmarks for Exbabel\'s real-time AI translation. Compare audio-visual latency performance across different languages.",\n  alternates: { canonical: "/lab-test" },'
)

imports = "import Navbar from \"@/components/Navbar\";\nimport Footer from \"@/components/Footer\";\nimport LabTestClient from \"./LabTestClient\";\nimport DatasetSchema from \"@/components/schema/DatasetSchema\";\nimport BreadcrumbSchema from \"@/components/schema/BreadcrumbSchema\";"
c = c.replace(
    'import Navbar from "@/components/Navbar";\nimport Footer from "@/components/Footer";\nimport LabTestClient from "./LabTestClient";',
    imports
)

c = c.replace('<LabTestClient />', '<Navbar />\n      <BreadcrumbSchema items={[{ name: "Lab Test", url: "https://www.exbabel.com/lab-test" }]} />\n      <DatasetSchema name="Exbabel Real-Time Translation Latency Benchmarks" description="Empirical latency benchmarks measuring real-time AI speech-to-speech translation latency across languages." url="https://www.exbabel.com/lab-test" creator={{ name: "Exbabel", url: "https://www.exbabel.com" }} />\n      <LabTestClient />')

c = c.replace('<Navbar />\n      <Navbar />', '<Navbar />')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print("Patched lab-test")