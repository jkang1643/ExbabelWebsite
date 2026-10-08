"use client";

import { useEffect, useRef, useState } from "react";
import { capturePostHogEvent } from "@/lib/posthog-client";
import { isCalendlyBookingMessage } from "@/lib/calendly-booking-event";

const fallback = "https://calendly.com/jkang1643/book-an-exbabel-demo";

export default function ChurchBookingCalendar() {
  const frame = useRef<HTMLIFrameElement>(null);
  const recorded = useRef(false);
  const [completed, setCompleted] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const configured = (process.env.NEXT_PUBLIC_CALENDLY_URL || fallback).trim();
  const bookingUrl =
    configured.startsWith("https://calendly.com/") &&
    !configured.includes("new-meeting")
      ? configured
      : fallback;

  useEffect(() => {
    setEmbedUrl(
      `${bookingUrl}?embed_type=Inline&embed_domain=${window.location.hostname}&primary_color=394dfe`,
    );
    const onMessage = (event: MessageEvent) => {
      if (
        recorded.current ||
        !isCalendlyBookingMessage(event, frame.current?.contentWindow)
      )
        return;
      recorded.current = true;
      setCompleted(true);
      capturePostHogEvent("church_demo_scheduled", {
        page: "/solutions/churches/",
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [bookingUrl]);

  return (
    <div>
      {completed ? (
        <p role="status">
          Your booking was submitted. Check the confirmation from Calendly for
          the meeting details.
        </p>
      ) : embedUrl ? (
        <iframe
          ref={frame}
          title="Book an Exbabel church demo"
          src={embedUrl}
          width="100%"
          height="700"
          loading="lazy"
        />
      ) : (
        <p role="status">The booking calendar loads here. You can also use the direct link below.</p>
      )}
      <p className="church-calendar-fallback">
        If the calendar does not load,{" "}
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
          open the booking calendar in a new tab
        </a>
        .
      </p>
    </div>
  );
}
