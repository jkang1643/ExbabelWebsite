import posthog from "posthog-js";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

function isPostHogConfigured() {
  return (
    typeof window !== "undefined" &&
    Boolean(
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
        (posthog as { __loaded?: boolean }).__loaded
    )
  );
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