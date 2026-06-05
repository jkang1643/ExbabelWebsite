import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Video Translation - Exbabel",
  description: "Transform your church livestream into a multilingual experience with real-time AI voice translation and live captions.",
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
