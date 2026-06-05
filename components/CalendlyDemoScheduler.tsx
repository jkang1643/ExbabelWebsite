"use client";

import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useState, useEffect } from "react";

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
  const [isMounted, setIsMounted] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-calendly-link/15min";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Event scheduled:", e.data.payload);
      if (onEventScheduled) {
        onEventScheduled();
      }
    },
  });

  if (!isMounted) return <div className="h-[600px] flex items-center justify-center text-gray-500">Loading scheduler...</div>;

  return (
    <div className="w-full h-full min-h-[600px] rounded-2xl overflow-hidden bg-white">
      <InlineWidget
        url={calendlyUrl}
        prefill={{
          name: prefillName,
          email: prefillEmail,
        }}
        styles={{
          height: '600px',
          width: '100%'
        }}
      />
    </div>
  );
}
