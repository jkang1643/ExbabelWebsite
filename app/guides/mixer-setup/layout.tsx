import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mixer and Audio Interface Setup Guide",
  description: "Connect an analog or USB mixer to Exbabel with the right XLR cable, audio interface, channel routing, and input checks.",
  alternates: { canonical: "/guides/mixer-setup" },
};

export default function MixerSetupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
