/** Only the embedded Calendly frame can confirm a booking. Never log its payload. */
export function isCalendlyBookingMessage(
  event: Pick<MessageEvent, "origin" | "source" | "data">,
  frameWindow: Window | null | undefined,
): boolean {
  return Boolean(
    frameWindow &&
      event.origin === "https://calendly.com" &&
      event.source === frameWindow &&
      event.data?.event === "calendly.event_scheduled",
  );
}
