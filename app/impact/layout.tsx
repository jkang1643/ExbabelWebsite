import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Impact - Exbabel",
  description: "See how Exbabel is breaking language barriers across the globe with support for over 190 countries.",
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
