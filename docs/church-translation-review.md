# Church translation landing page review

## Scope

Primary commercial page: `/solutions/churches/`.
Preferred canonical: `https://www.exbabel.com/solutions/churches/`.
No deployment or publishing performed. Existing unrelated video work was left untouched.

## Implementation

- `app/solutions/churches/page.tsx`: statically rendered buyer journey, single H1, unique metadata, Open Graph/Twitter metadata, existing breadcrumb and FAQ schema utilities, ten native disclosure FAQs, contextual product guides and comparison links.
- `app/solutions/churches/content.ts`: FAQ copy shared by the visible page and FAQ JSON-LD.
- `app/solutions/churches/page.module.css`: page-scoped Sora typography, existing brand palette, responsive workflow illustration, contrast and focus treatment, reduced-motion handling. No reveal dependency or new animation library. The illustration is HTML/CSS, with its transcript clearly labeled as an example; it is not a screenshot or live output.
- `components/ChurchDemoLink.tsx`: consistent demo CTA and placement tracking, linking to the booking section on the same page.
- `components/ChurchBookingCalendar.tsx` and `lib/calendly-booking-event.ts`: inline verified Calendly calendar, direct-calendar fallback link, and guarded booking-completion tracking. The existing `/demo/` page and its components were restored and are unchanged by this work.
- `components/Navbar.tsx`: reuse of the shared navigation with a church-page variant; corrected church destination, same primary CTA on desktop/mobile, omitted inactive choices and competing trial action on this page, expanded state and Escape focus handling.
- `components/ChurchTranslationIntro.tsx` and the two existing church articles: contextual inbound links. Article content and canonicals remain distinct.
- `app/sitemap.ts`: preferred church URL added once.
- `cloudfront-function.js`: route-specific permanent normalization for slashless, index.html, and non-www requests. Query parameters are retained. Other routes retain their previous behavior.
- `scripts/test-church-translation.ts`: meaningful regression checks for booking-message authenticity, route normalization, and exported SEO integration.
- `scripts/preview-church.py`: local export preview, including a `?nojs=1` mode that blocks all page scripts through CSP.

## Strategy and references

Audience: pastors and administrators evaluating language access, production leaders evaluating the signal path, and volunteers evaluating repeatability. Conversion: a completed demo booking, not a click or lead-form submission.

The page uses an explanatory product hero followed by benefits, three steps, output choices, setup, sermon preparation, human/AI options, pricing considerations, limitations, FAQs, and a final demo invitation. The standalone benefit statement provides a visual pause without hiding content behind animation.

Inspo recommend/search tools were used, then desktop and available mobile captures were inspected for:

- [Amie](https://amie.so): direct headline-to-product hierarchy and restrained interface presentation. Exbabel uses one primary action rather than the reference's two hero actions.
- [HeyClicky About](https://www.heyclicky.com/about): narrative section rhythm and explanatory text alongside product views; mobile stacks preserve reading order.
- [Craft](https://craft.do): approachable product presentation and generous whitespace. No Craft assets, fonts, landscape, branding, or copy were reused.

Applied the [requested landing-page design skill](https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md) and reviewed the [SEO landing reference](https://github.com/aleksandr-alhoff/seo-landing). The user's framework, brand, claim-truthfulness, accessibility, and no-routine-approval requirements take precedence over conflicting standalone-output or approval instructions.

Installed Impeccable `audit`, `adapt`, and `polish` playbooks informed technical review and fixes; its repository-local `detect --json app/solutions/churches/page.tsx` returned `[]`. Design critique was manual, not the separate dual-agent `critique` workflow. The initial context launcher did not provide usable context, so existing source, `STYLE_GUIDE.md`, tokens, and product guides were read directly. No invented product context file was introduced.

## Product evidence and withheld claims

Checked on October 8, 2026:

| Subject | Evidence | Treatment |
| --- | --- | --- |
| Host input, broadcasting, QR and languages | `lib/guides.ts`, broadcasting transcript; `components/TechnicalRequirements.tsx` | Practical sequence, compatible interface caveat, rehearsal recommendation |
| Listener code, language, play action | `lib/guides.ts`, listener transcript | Explicit host versus attendee responsibilities |
| Browser access, audio, captions, headphones | `components/HowItWorksAudience.tsx`, existing church articles, public product site | Conservative browser-based description; no universal device compatibility claim |
| Audio versus caption coverage | `components/InterfacePreview.tsx`, `components/Pricing.tsx` | Separate coverage explained; no exact count or exhaustive matrix |
| Booking | Existing Calendly URL in the site configuration; live [calendar](https://calendly.com/jkang1643/book-an-exbabel-demo) displayed “Book an Exbabel Demo,” 30 minutes, and available dates | Calendar embedded on the church page with a direct fallback link; `/demo/` untouched; no real booking submitted |
| Prices and billing limits | Marketing plan definitions exist but authoritative live billing configuration is absent from this repository | No exact price, usage allowance, overage rate, trial promise, or claimed discount repeated; link to `/#pricing` |
| Customer proof | Testimonials and logos exist, but an attribution/permission record was not located | No customer proof or customer logos added |
| Translation accuracy | No basis for flawless names, Bible quotations, accents, or theology | Explicit review/rehearsal guidance and limitations |
| Reliability and latency | No verified universal delay, recovery, or offline guarantee | Variable delay, internet dependency, backup planning; no promised automatic recovery |

No invented statistics, reviews, ratings, offers, certification, guaranteed rankings, or music/singing claims. Historical GSC observations are not displayed on the page. No approved current product screenshot was identified among the inspected marketing illustrations/HTML mockups, so the new diagram is explicitly illustrative.

## Verification

- Production build: `SENTRY_AUTH_TOKEN= npm run build`. Static export includes the new route; no publishing command was run.
- TypeScript: `npx tsc --noEmit`.
- Full lint: `npm run lint`; passes with existing image/alt-text and hook warnings in unrelated components. Focused lint of new and changed behavior components is clean.
- Regression checks: `npx tsx scripts/test-church-translation.ts`.
- Whitespace: `git diff --check -- app components lib cloudfront-function.js`.
- HTTP: static preview preferred route 200; slashless route 301 to trailing slash.
- Export: single H1; unique title/description/social metadata; explicit index/follow; self-canonical; sitemap entry; parseable FAQ and breadcrumb JSON-LD; ten questions; inbound article/homepage links. FAQ markup is not a claim of Google rich-result eligibility.
- Browser: desktop, tablet, and mobile inspections at 1280, 768, 375, and 320px found no document or main-content horizontal overflow. Narrow-header and desktop-hero refinements applied. A church CTA reached `#book-demo`; the embedded Calendly frame exposed the verified "Book an Exbabel Demo" event, its 30-minute duration, and the date picker. No appointment was created. With scripts blocked, the main content, native FAQs, and direct Calendly fallback remained available; a FAQ opened without JavaScript. The browser capture tool displayed the cross-origin frame as blank in screenshots, so visual inspection of the calendar relied on its accessible frame content.
- Assets: no new downloaded imagery, video, fonts, or dependency. Existing 1200 × 630 social image reused; visible product diagram uses HTML/CSS and no external image requests.

Build warnings inherited from the site include Sentry's static-export tunnel incompatibility and its deprecated config import. The production build reports approximately 348 kB first-load JavaScript for this route (297 kB shared). The landing content is static, but the existing shared navigation, analytics, and monitoring remain a performance cost. No Lighthouse score, field Core Web Vitals result, WCAG certification, or guaranteed search outcome is claimed.

## Local review

Run inside WSL Ubuntu from `/home/jkang1643/projects/exbabel`:

```bash
SENTRY_AUTH_TOKEN= npm run build
python3 scripts/preview-church.py
```

Open `http://localhost:3100/solutions/churches/`.
For the script-blocked preview, use `http://localhost:3100/solutions/churches/?nojs=1`.
Stop the preview with Ctrl+C. Alternatively use `npm run dev -- --port 3100` for editing (do not build and run the dev server against the same `.next` directory concurrently).

## Booking measurement

| Event | Meaning | Church properties |
| --- | --- | --- |
| `church_demo_cta_clicked` | Click only | `page`, `placement` (`navigation`, `hero`, `sermon`, `final`), `destination` |
| `church_demo_scheduled` | Calendly `calendly.event_scheduled` callback from the embedded church-page calendar | `page` only; separate from clicks |

The callback checks both Calendly origin and the actual iframe window, rejects date/time-selection events, and guards duplicate messages. Calendly invitee/event payloads are not copied into analytics. New tracking follows the existing PostHog configuration. Ad blocking, consent/configuration, navigation away, and the calendar's new-tab fallback can prevent completion observation; do not count a missing callback as a failed booking. Use the analytics platform's acquisition attribution where available.

No fake completion was sent to production and no calendar appointment was created. Unit verification covers message acceptance, not a real customer booking.

## Release and postlaunch checklist

- Publish only after separate authorization. Deploy the static export **and** apply/publish the reviewed CloudFront viewer-request function through the existing hosting process; the static file upload alone does not install the normalization change.
- Verify on the live hostname: preferred URL 200; slashless/index.html/non-www variants permanently redirect once to the preferred URL, with query parameters preserved; no robots block or noindex; canonical and sitemap agree.
- Inspect the preferred URL in GSC and submit the updated sitemap. Confirm the page is indexed under the preferred canonical.
- Validate structured data on the deployed page; distinguish valid markup from rich-result eligibility.
- Verify click events by placement and the confirmed-booking callback in the analytics project's supported test/debug workflow. Mark `church_demo_scheduled` as the booking conversion if appropriate; never substitute CTA clicks.
- Monitor this page's GSC impressions, clicks, CTR, and average position. Track query-to-URL mapping for the supplied church translation cluster, checking that commercial queries land here while equipment and human/AI comparison queries can still land on the distinct guides.
- Measure completed organic demo bookings where acquisition attribution is available. Report attribution gaps explicitly, including new-tab calendar completion.
- Compare complete 28-day windows after launch, rather than incomplete periods. The supplied September 8–October 5, 2026 sample is small (6–12 impressions per query); avoid strong conclusions from early percentage changes.
- Review real-device performance and field Core Web Vitals when sufficient data exists. Separate shared-site JavaScript costs from page-specific changes.
