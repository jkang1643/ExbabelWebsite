"use client";

import { useEffect, useRef } from "react";

interface CalendlyDemoSchedulerProps {
  prefillName?: string;
  prefillEmail?: string;
  onEventScheduled?: () => void;
}

export default function CalendlyDemoScheduler({
  prefillName,
  prefillEmail,
  onEventScheduled,
}: CalendlyDemoSchedulerProps) {
  const onEventScheduledRef = useRef(onEventScheduled);
  onEventScheduledRef.current = onEventScheduled;

  const baseCalendlyUrl = (
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/jkang1643/book-an-exbabel-demo"
  ).trim();

  // Build iframe src with prefill params
  // embed_domain is required by Calendly to validate the embedding site
  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: "exbabel.com",
    hide_gdpr_banner: "1",
  });
  if (prefillName?.trim()) params.set("name", prefillName.trim());
  if (prefillEmail?.trim()) params.set("email", prefillEmail.trim());

  const iframeSrc = `${baseCalendlyUrl}?${params.toString()}`;

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled") {
        setTimeout(() => {
          onEventScheduledRef.current?.();
        }, 150);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full h-full min-h-[650px] rounded-2xl overflow-hidden bg-white">
      <iframe
        src={iframeSrc}
        width="100%"
        height="650"
        frameBorder="0"
        title="Schedule a Demo"
        style={{ border: "none", borderRadius: "16px", display: "block" }}
      />
    </div>
  );
}

