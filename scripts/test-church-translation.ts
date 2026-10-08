import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import { isCalendlyBookingMessage } from "../lib/calendly-booking-event";
const frame = {} as Window;
const confirmed = {
  origin: "https://calendly.com",
  source: frame,
  data: { event: "calendly.event_scheduled" },
};
assert.equal(isCalendlyBookingMessage(confirmed, frame), true);
assert.equal(
  isCalendlyBookingMessage(
    { ...confirmed, origin: "https://untrusted.example" },
    frame,
  ),
  false,
);
assert.equal(
  isCalendlyBookingMessage({ ...confirmed, source: {} as Window }, frame),
  false,
);
assert.equal(
  isCalendlyBookingMessage(
    { ...confirmed, data: { event: "calendly.date_and_time_selected" } },
    frame,
  ),
  false,
);
assert.equal(isCalendlyBookingMessage(confirmed, null), false);

const context = vm.createContext({});
vm.runInContext(readFileSync("cloudfront-function.js", "utf8"), context);
const request = (uri: string, host = "www.exbabel.com", querystring = {}) =>
  context.handler({
    request: { uri, headers: { host: { value: host } }, querystring },
  });
for (const uri of ["/solutions/churches", "/solutions/churches/index.html"]) {
  const result = request(uri);
  assert.equal(result.statusCode, 301);
  assert.equal(
    result.headers.location.value,
    "https://www.exbabel.com/solutions/churches/",
  );
}
assert.equal(request("/solutions/churches/", "exbabel.com").statusCode, 301);
assert.equal(
  request("/solutions/churches/").uri,
  "/solutions/churches/index.html",
);
assert.equal(
  request("/blog/church-translation-system").uri,
  "/blog/church-translation-system/index.html",
);
assert.equal(request("/favicon.ico").uri, "/favicon.ico");
assert.equal(
  request("/solutions/churches", "www.exbabel.com", {
    utm_source: { value: "church%20newsletter" },
  }).headers.location.value,
  "https://www.exbabel.com/solutions/churches/?utm_source=church%20newsletter",
);

const htmlPath = "out/solutions/churches/index.html";
assert.ok(
  existsSync(htmlPath),
  "Build the static export before running this check",
);
const html = readFileSync(htmlPath, "utf8");
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.ok(
  html.includes(
    '<link rel="canonical" href="https://www.exbabel.com/solutions/churches/"',
  ),
);
assert.ok(
  html.includes("AI Church Translation for Live Services | Exbabel</title>"),
);
assert.ok(html.includes('name="robots" content="index, follow"'));
assert.ok(html.includes("What happens if the connection drops?"));
assert.ok(html.includes("Compatible input"));
assert.ok(html.includes("Illustrative listener preview"));
assert.ok(html.includes("Preview caption language"));
assert.ok(html.includes("not live product output"));
assert.ok(html.includes('href="#book-demo"'));
assert.ok(html.includes("open the booking calendar in a new tab"));
assert.ok(!html.includes('href="/demo/?source=church-translation'));
assert.ok(!html.includes('href="/solutions/churches"'));
const schemas = [
  ...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
].map((m) => JSON.parse(m[1]));
const faq = schemas.find((s) => s["@type"] === "FAQPage");
assert.equal(faq.mainEntity.length, 10);
assert.ok(!schemas.some((s) => s.aggregateRating || s.offers || s.review));
assert.ok(
  readFileSync("out/sitemap.xml", "utf8").includes(
    "https://www.exbabel.com/solutions/churches/",
  ),
);
for (const path of [
  "out/index.html",
  "out/blog/church-translation-system/index.html",
  "out/blog/church-interpreter-vs-ai-translation/index.html",
]) {
  assert.ok(
    readFileSync(path, "utf8").includes('href="/solutions/churches/"'),
    `${path} must link to the church page`,
  );
}
console.log(
  "PASS: booking message origin/source, route normalization, static content, inline booking, metadata, schemas, sitemap, and inbound links",
);
