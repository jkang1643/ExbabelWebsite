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

  let baseCalendlyUrl = (
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/jkang1643/book-an-exbabel-demo"
  ).trim();

  // Sanitize: guard against stale 'new-meeting' links or invalid URLs
  if (baseCalendlyUrl.includes("new-meeting") || !baseCalendlyUrl.startsWith("https://calendly.com/")) {
    baseCalendlyUrl = "https://calendly.com/jkang1643/book-an-exbabel-demo";
  }

  // Build iframe src with prefill params
  // embed_domain allows Calendly to validate the embedding parent host
  const domain =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "exbabel.com";

  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: domain,
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
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[650px] min-h-[650px] rounded-2xl overflow-hidden bg-white">
        <iframe
          src={iframeSrc}
          width="100%"
          height="650"
          frameBorder="0"
          title="Schedule a Demo"
          style={{ border: "none", borderRadius: "16px", display: "block" }}
        />
      </div>
      <div className="mt-4 text-center">
        <a
          href={iframeSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          Having trouble viewing the calendar? Open in a new tab ↗
        </a>
      </div>
    </div>
  );
}