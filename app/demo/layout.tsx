import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a live demo of Exbabel's real-time AI translation platform. See how churches, conferences, and enterprises use Exbabel to break language barriers.",
  alternates: { canonical: "/demo" },
  openGraph: { title: "Book a Demo | Exbabel", description: "Schedule a live demo of Exbabel's real-time AI translation platform for churches, conferences, and enterprises.", url: "https://exbabel.com/demo" },
  twitter: { card: "summary", title: "Book a Demo | Exbabel", description: "Schedule a live demo of Exbabel's real-time AI translation platform." },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
