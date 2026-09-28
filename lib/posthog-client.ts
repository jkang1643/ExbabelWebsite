import posthog, { type CaptureResult } from "posthog-js";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

export function isPostHogConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST,
  );
}

function isDevelopmentBuild() {
  if (process.env.NODE_ENV !== "production") return true;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";
  }
  return false;
}

// Drop exception events raised by a local dev server so that build failures
// do not reach error tracking as high-severity issues. Production exceptions
// still flow.
export function dropDevelopmentExceptions(
  event: CaptureResult | null,
): CaptureResult | null {
  if (event?.event === "$exception" && isDevelopmentBuild()) {
    return null;
  }
  return event;
}

export function capturePostHogEvent(
  eventName: string,
  properties?: EventProperties,
) {
  if (isPostHogConfigured()) {
    posthog.capture(eventName, properties);
  }
}

export function capturePostHogException(error: unknown) {
  if (isPostHogConfigured()) {
    posthog.captureException(error);
  }
}
