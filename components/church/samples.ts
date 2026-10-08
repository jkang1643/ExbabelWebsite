/**
 * Fixed editorial examples, not captured Exbabel output.
 * Greeting vocabulary checked against Cambridge English–Spanish / English–French
 * dictionaries. Language availability is corroborated by InterfacePreview.tsx;
 * these examples are not an exhaustive language or plan entitlement list.
 * https://dictionary.cambridge.org/dictionary/english-spanish/welcome
 * https://dictionary.cambridge.org/dictionary/english-french/welcome
 * https://dictionary.cambridge.org/dictionary/english-spanish/thank-you
 * https://dictionary.cambridge.org/dictionary/english-french/thank-you
 */
export const listenerSamples = [
  {
    code: "en",
    name: "English",
    native: "English",
    greeting: "Welcome.",
    thanks: "Thank you.",
  },
  {
    code: "es",
    name: "Spanish",
    native: "Español",
    greeting: "Bienvenidos.",
    thanks: "Gracias.",
  },
  {
    code: "fr",
    name: "French",
    native: "Français",
    greeting: "Bienvenue.",
    thanks: "Merci.",
  },
] as const;
