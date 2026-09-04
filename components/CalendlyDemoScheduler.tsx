"use client";

import { useEffect, useRef } from "react";

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

  const baseCalendlyUrl = (
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/jkang1643/book-an-exbabel-demo"
  ).trim();

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

    // 3. MutationObserver to explicitly grant allow-scripts and allow-same-origin on Calendly iframe
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) {
            node.setAttribute(
              "sandbox",
              "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
            );
          }
        });
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: baseCalendlyUrl,
          parentElement: containerRef.current,
          prefill: Object.keys(prefillObj).length > 0 ? prefillObj : undefined,
        });

        // Apply sandbox attributes to any iframe created immediately
        const iframe = containerRef.current.querySelector("iframe");
        if (iframe) {
          iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals"
          );
        }
      }
    };

    // 4. Load Calendly JS Widget Script if not present
    const scriptId = "calendly-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else if (window.Calendly) {
      initWidget();
    }

    // 5. Listen for postMessage event from Calendly
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
      observer.disconnect();
      window.removeEventListener("message", handleMessage);
    };
  }, [baseCalendlyUrl, prefillName, prefillEmail, onEventScheduled]);

  return (
    <div className="w-full h-full min-h-[650px] rounded-2xl overflow-hidden bg-white relative">
      <div 
        ref={containerRef} 
        className="w-full h-[650px]"
        style={{ minWidth: "320px", height: "650px" }}
      />
    </div>
  );
}
