"use client";

import { useEffect, useRef, useState } from "react";

interface CalendlyDemoSchedulerProps {
  prefillName?: string;
  prefillEmail?: string;
  onEventScheduled?: () => void;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: {
          name?: string;
          email?: string;
        };
      }) => void;
    };
  }
}

export default function CalendlyDemoScheduler({
  prefillName,
  prefillEmail,
  onEventScheduled,
}: CalendlyDemoSchedulerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const baseCalendlyUrl = (
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/jkang1643/book-an-exbabel-demo"
  ).trim();

  // Construct direct link with prefill parameters for new tab fallback
  const prefillParams = new URLSearchParams();
  if (prefillName && prefillName.trim()) prefillParams.set("name", prefillName.trim());
  if (prefillEmail && prefillEmail.trim()) prefillParams.set("email", prefillEmail.trim());
  const directLink = `${baseCalendlyUrl}${prefillParams.toString() ? `?${prefillParams.toString()}` : ""}`;

  useEffect(() => {
    // 1. Load Calendly CSS stylesheet
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // 2. Build prefill object safely
    const prefillObj: { name?: string; email?: string } = {};
    if (prefillName && prefillName.trim()) {
      prefillObj.name = prefillName.trim();
    }
    if (prefillEmail && prefillEmail.trim()) {
      prefillObj.email = prefillEmail.trim();
    }

    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: baseCalendlyUrl,
          parentElement: containerRef.current,
          prefill: Object.keys(prefillObj).length > 0 ? prefillObj : undefined,
        });
      } else {
        setUseIframeFallback(true);
      }
    };

    // 3. Load Calendly JS Widget Script if not present
    const scriptId = "calendly-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initWidget;
      script.onerror = () => {
        console.warn("Calendly widget.js blocked or failed to load, switching to iframe fallback.");
        setUseIframeFallback(true);
      };
      document.body.appendChild(script);
    } else if (window.Calendly) {
      initWidget();
    } else {
      // Fallback timer if script is stuck
      const timer = setTimeout(() => {
        if (!window.Calendly) {
          setUseIframeFallback(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    // 4. Listen for postMessage event from Calendly
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.event === "calendly.event_scheduled") {
        console.log("Calendly event scheduled:", e.data.payload);
        if (onEventScheduled) {
          setTimeout(() => {
            onEventScheduled();
          }, 150);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [baseCalendlyUrl, prefillName, prefillEmail, onEventScheduled]);

  return (
    <div className="w-full h-full min-h-[650px] rounded-2xl overflow-hidden bg-white relative flex flex-col items-center">
      {useIframeFallback ? (
        <iframe
          src={directLink}
          className="w-full h-[650px] border-0 rounded-2xl"
          title="Calendly Scheduling Page"
        />
      ) : (
        <div 
          ref={containerRef} 
          className="w-full h-[650px]"
          style={{ minWidth: "320px", height: "650px" }}
        />
      )}

      {/* Direct link fallback banner for users with strict adblockers */}
      <div className="mt-4 text-center pb-2">
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline bg-primary/5 px-4 py-2 rounded-lg transition-colors"
        >
          Having trouble loading the calendar? Book directly on Calendly ↗
        </a>
      </div>
    </div>
  );
}
