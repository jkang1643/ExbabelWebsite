import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Graphic - Exbabel",
  description: "Preview graphics for Exbabel.",
};

export default function PreviewGraphicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
