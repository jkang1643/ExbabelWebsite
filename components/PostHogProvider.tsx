"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { isPostHogConfigured } from "@/lib/posthog-client";

export default function PostHogProvider() {
  useEffect(() => {
    if (!isPostHogConfigured() || posthog.__loaded) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
      capture_pageview: true,
    });
  }, []);

  return null;
}
