import type { Metadata } from "next";
import SolutionPage from "../_components/SolutionPage";
import { solutions } from "../_components/content";

const solution = solutions.events;
const canonical = `https://www.exbabel.com${solution.path}`;

export const metadata: Metadata = {
  title: { absolute: solution.title },
  description: solution.description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: solution.title,
    description: solution.description,
    url: canonical,
    type: "website",
    locale: "en_US",
    siteName: "Exbabel",
    images: [{ url: "/solutions/events/og.png", width: 1200, height: 630, alt: "Exbabel live event translation" }]
  },
  twitter: { card: "summary_large_image", title: solution.title, description: solution.description, images: ["/solutions/events/og.png"] }
};

export default function EventsPage() {
  return <SolutionPage solution={solution} />;
}
