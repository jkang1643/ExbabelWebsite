"use client";

import { capturePostHogEvent } from "@/lib/posthog-client";

export default function ChurchDemoLink({
  placement,
  className,
}: {
  placement: string;
  className?: string;
}) {
  return (
    <a
      href="#book-demo"
      className={className}
      onClick={() =>
        capturePostHogEvent("church_demo_cta_clicked", {
          page: "/solutions/churches/",
          placement,
          destination: "/solutions/churches/#book-demo",
        })
      }
    >
      Book a church demo
    </a>
  );
}
