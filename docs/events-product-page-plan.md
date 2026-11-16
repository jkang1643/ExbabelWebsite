# Events product page

Audience: conference organizers, ministry event teams, and AV operators.
Primary action: book an Events demo through the existing /demo/ route.
Layout: classic hero and sections, because the attendee experience is understandable from a short product illustration.

## Page sequence

1. Hero: “Your event / In their language”. Explain live translated audio and captions on attendees’ phones. CTA: “Book an Events demo.” Ground the offer in browser access and audio plus captions rather than unsupported statistics.
2. Interactive caption sample, explicitly labeled as an illustration, with Spanish, French, and Korean examples.
3. Three attendee benefits: join through a room link, choose a language, listen and read.
4. Shared event moment: conference photograph and a static statement about one speaker reaching multiple languages. The unslop pass removes decorative word reveals so the statement remains fully legible in all browsers.
5. Three organizer steps: build the event, connect and rehearse, share and broadcast.
6. Organizer capabilities: rooms, operator links, and pre-broadcast terminology guidance; illustrative event schedule.
7. Eight FAQs: downloads, audio equipment, concurrent rooms, terminology, internet, accuracy, operators, and demo scope.
8. Repeat the same demo CTA, then legal and contact links.

## Content boundaries

No invented testimonials, customer logos, savings, prices, security certifications, capacity promises, or latency guarantees. A demo and venue rehearsal help customers assess suitability without a fabricated free trial offer. AI terminology instructions are guidance, not deterministic substitutions. Preserve existing shared navigation and booking behavior.

## Search and accessibility

Index the evergreen /events/ page. /products/events/ shares the page and uses /events/ as canonical. Metadata describes live event translation and captions. Remove the unsupported free-price structured offer and performance/security claims. Use semantic sections, native select and disclosure controls, visible focus, a skip link, explicit sample labeling, and reduced motion support.

## Scope

Marketing website only. No changes to event hosting, billing, translation routing, or account settings. Existing uncommitted work was backed up to /tmp/exbabel-events-before before revising these page files.

## Unslop audit and direction

Polish mode: preserve section order, brand blue, Manrope, and the product illustration.

- Product: live event translation for organizers and attendees.
- Character: welcoming, composed, practical.
- World: stages, room schedules, and conversations.
- Moments: speaker audio becoming translated captions; a room schedule.
- Signature: language choice alongside the translated message.

Audit: the hero was too tall, headings used gradient ink, labels were uppercase and widely tracked, small titles had tight tracking, heading punctuation was unnecessary, and several section titles could fit unrelated products. The offset listener card added visual complexity. The decorative reveal left some text muted in a fast WebKit scroll capture.

Nine passes:
1. Spacing: reduced hero top space, image height, and source caption padding.
2. Color: solid headline ink and a neutral card shadow; retained brand accent.
3. Icons: retained only functional directional/disclosure symbols; no decorative emoji.
4. Copy: concrete event, room, headphone, and session headings; removed trailing heading punctuation.
5. Type: sentence case labels, no tracking on small titles, less aggressive display tracking.
6. Layout: kept the split hero and section order; aligned the listener panel within the illustration.
7. Details: tabular schedule times, consistent controls, visible keyboard focus.
8. Visuals: retained existing event photography and interactive caption illustration. No generated image was needed for this polish pass.
9. Motion: removed hover lift and decorative word reveals; retained functional disclosure feedback and reduced motion support.

Method: Unslop by Damir Sokolovsky (@heydamir), https://heydamir.design/unslop, CC BY 4.0.

## Verification

- Production build passed, including TypeScript and static export of both Events routes. Build reports existing site warnings plus Next.js recommendations to use its Image component for the two static photographs.
- Chromium desktop 1440px, WebKit iPhone 390px, and Chromium 320px with reduced motion: no horizontal overflow; caption language selection and FAQ pointer/keyboard interaction passed.
- Primary mobile CTA bottom: 548px at 390px width, 576px at 320px width.
- Demo, privacy, and terms destinations returned HTTP 200. Product URL and canonical metadata passed.
- Final component checks isolated the shared HubSpot widget. With the widget enabled, its existing greeting can cover the mobile CTA and its cross-origin frame reports errors under the local HTTP WebKit origin. No changes were made to that shared integration.
- Local preview: http://localhost:18091/events/ . No commit, push, or production deployment performed.
