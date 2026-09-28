import posthog from "posthog-js";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

export function isPostHogConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST,
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
