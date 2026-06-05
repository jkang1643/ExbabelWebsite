import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Guides - Exbabel",
  description: "Learn how to set up Exbabel for your church with our comprehensive step-by-step guides.",
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
