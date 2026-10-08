# MASTER VIDEO PRODUCTION BLUEPRINT
## Exbabel — One congregation. Understood.

Status: preproduction storyboard and animated schematic. Supplied narration is preserved in script-verbatim.txt and storyboard.json. The 22-scene, 151-second schedule is estimated at 145 WPM plus breathing room. No final narration, cinematic footage or finished movie has been generated.

Open storyboard.html to review. Edit storyboard.json, then run python3 scripts/build.py. REFERENCE_ANALYSIS.md contains the evidence ledger; skill/SKILL.md contains the complete reusable workflow. Preview assets and anime.js are local; playback requires no network.

## 1. VIDEO DNA

The reference's identity is a clean field, a persistent small subject, and a chain of purposeful interface changes. It starts with an isolated brand mark, opens that mark into an object constellation, then returns to a short centered statement. The viewer's eye is never asked to discover the topic among many equally weighted elements. At each stage, a single word, message, card or action becomes the principal subject.

Typography is active but legible. Lines arrive in semantic groups, change around a stable alignment and occasionally accommodate a small object illustration. A phrase can become a conversation, a conversation can become an input, and an input can lead to a selected piece of evidence. Transitions are therefore part of the explanation. Most surfaces remain front-on, and much of the perceived dimensionality comes from rounded corners, diffuse shadows and pale blue contrast rather than lens effects or dramatic perspective.

The central product example is a progression of states. Context appears only long enough to explain why a selected detail matters. A relevant row becomes a larger reading card; irrelevant rows recede. A small agent badge anchors several work states while the underlying content moves upward. When a decision is needed, the camera digitally enlarges its controls. Completion then receives a visually simple payoff, followed by a short sequence that substitutes different capabilities into the same sentence structure.

Exbabel can preserve that system while changing both content and scale. A sentence about belonging becomes a phone action. The phone action resolves into a listening state. A close-up of translated captions becomes a wider view of one congregation. The interface is evidence for the human benefit, not the main character. The long supplied narration requires longer scene durations than the short reference, but transitions can remain quick and exact: enter, demonstrate, hold, hand off.

Use Exbabel's blue, dark ink and Sora typography from its source code. Keep all copy, controls, captions, logos and diagrams deterministic in HTML/SVG. Human footage is optional and limited to three narrative inserts under deterministic text. There is no human presenter in the reference; a talking-head overlay would change the composition system.

The recording ends during another example, so the Exbabel CTA and emotional conclusion are original adaptations. The reference audio has not been reliably auditioned; the proposed narration, music and interface sounds are a new audio direction. Full source-specific analysis, timestamps, uncertainty and exclusions are in REFERENCE_ANALYSIS.md.

## 2. STYLE SKILL

The complete portable skill is skill/SKILL.md: reference-motion-storyboard. It includes Mission, Visual Philosophy, Creative Principles, Composition System, Cinematography, Motion Language, Typography, UI Animation System, Presenter Treatment, Color System, Lighting System, Transition Library, Editing Rhythm, Sound Design, Higgsfield Rules, HyperFrames Rules, Compositing Rules, Avoid and Quality-Control Checklist.

Core rules: one reading task; front-on UI; stable anchor; selected-object continuity; semantic phrase changes; measured holds; deterministic text; restrained shadow depth; narration-driven timing; original brand assets. Numerical adaptation values are authored recommendations.

Routing: HF for all readable content; H only for three optional family/listener plates; COMP for those plates and graphics; EDIT for sound and final assembly. LIVE can replace H if the church supplies footage. No presenter recording is needed.


## 3. Timeline overview

| Section | Time | Function |
|---|---|---|
| Personal context | 00:00.000–00:25.500 | Narrative section |
| Scan, choose, listen | 00:25.500–00:36.500 | Narrative section |
| Service and belonging | 00:36.500–01:13.000 | Narrative section |
| Languages and online | 01:13.000–01:37.500 | Narrative section |
| Operational setup | 01:37.500–01:57.500 | Narrative section |
| Invitation and resolution | 01:57.500–02:31.000 | Narrative section |

325 whitespace-delimited words including personalization tokens; proposed 145 WPM plus scene breathing room = 151 seconds. Timing is not aligned to a recording yet. Milliseconds in JSON are exact authored estimates, not claimed speech timestamps.

## 4. Master storyboard

| Scene | Time | Duration | Voiceover (verbatim) | Visual and text | Camera / motion | Tool | Exit |
|---|---|---|---|---|---|---|---|
| S01 — Personal greeting | 00:00.000–00:09.000 | 9s | Hey [First Name], just wanted to show you how you can bring multilingual services to your congregation at [Church Name]. | **Every voice. One congregation.** — title; labels: Exbabel / [Church Name]. | 0s: brand appears at x50 y32; scale .9→1, opacity 0→1 (500ms); 0.55s: headline first phrase rises 30px under mask (500ms); 3.3s: second phrase replaces the greeting line (420ms); 6.8s: church name settles below; hold (400ms) | HF | T01 |
| S02 — A family arrives | 00:09.000–00:14.500 | 5.5s | Picture someone walking into your service this Sunday with their family. | **A place for every family.** — people; labels: Sunday morning / A family arrives. | 0s: family footage card rises 36px and resolves (480ms); 0.6s: family advances toward entrance; camera tracks 0.4m (3600ms); 4.25s: headline becomes fully readable; hold (350ms) | H + HF + COMP | T02 |
| S03 — The language barrier | 00:14.500–00:25.500 | 11s | They want to be there. They want to hear the sermon. But English isn't their first language, so they're only catching pieces of the message. | **The message should reach everyone.** — fragment; labels: Welcome to our service. / … only pieces of the message. | 0s: three short English phrase strips occupy x30/50/70 (450ms); 1.7s: middle and right strips fade to .25; left remains clear (420ms); 4.2s: camera crops toward remaining phrase; scale 1→1.2 (620ms); 6.9s: fragments gather into one centered message card (650ms); 8.2s: hold problem statement without more decorative motion (0ms) | HF | T03 |
| S04 — Scan | 00:25.500–00:31.000 | 5.5s | With Exbabel, they can pull out their phone, scan a QR code, | **Scan the service QR code.** — scan; labels: Service access / Scan to join. | 0s: blank access pill grows into a QR presentation card (600ms); 0.65s: phone outline enters from x+90 y+60 (520ms); 1.8s: scan bracket travels downward once over QR region (650ms); 3s: check resolves; hold the confirmed access state (300ms) | HF | T04 |
| S05 — Choose and listen | 00:31.000–00:34.000 | 3s | choose their language, and start listening. | **Choose your language. Listen.** — phone; labels: Español / Listen to this service. | 0s: phone stays in place; three language rows reveal at 70ms stagger (420ms); 0.65s: Español row rises 12px and gains blue border (320ms); 1.3s: Listen action compresses .98→1; state changes to connected (260ms); 1.8s: hold selected language and audio state (0ms) | HF | T05 |
| S06 — Simple payoff | 00:34.000–00:36.500 | 2.5s | That's pretty much it. | **That's it.** — title; labels: You're connected.. | 0s: status check draws, then short payoff rises 24px (450ms); 0.5s: hold clean completion (0ms) | HF | T01 |
| S07 — Pastor continues | 00:36.500–00:44.500 | 8s | Your pastor keeps preaching like normal. Exbabel listens to the service and translates it while they're speaking. | **Keep preaching.** — signal; labels: Service audio / Exbabel / Translated audio. | 0s: speaker, Exbabel and listener nodes enter left to right (600ms); 1.3s: input path draws left→center (800ms); 2.5s: output path draws center→right while input continues (900ms); 4.2s: deterministic wave cycle repeats finite times (2300ms); 6.8s: hold all connected nodes (0ms) | HF | T06 |
| S08 — Listen in your language | 00:44.500–00:51.500 | 7s | The person in the congregation hears the sermon through their headphones in their own language. | **Hear the message.** — listener; labels: Translated audio / Español. | 0s: listener footage resolves inside rounded card at x62 y55 (480ms); 0.7s: listener settles earbud, then follows sermon; no lip sync (4300ms); 5.2s: translated audio label gains emphasis, then holds (350ms) | H + HF + COMP | T02 |
| S09 — Read captions | 00:51.500–00:56.500 | 5s | They can also read translated captions right on their phone. | **Read along, too.** — captions; labels: Welcome to our service. / Bienvenidos a nuestro servicio.. | 0s: phone enters at scale .96, centered x65 y56 (450ms); 0.65s: first translated phrase reveals as one semantic chunk (500ms); 2.2s: second line appears; existing line translates upward 38px (450ms); 3.1s: hold complete caption for reading (0ms) | HF | T07 |
| S10 — One shared service | 00:56.500–01:05.000 | 8.5s | So if you have a Spanish-speaking family visiting [Church Name], you don't have to create another service for them. | **One service. Together.** — together; labels: [Church Name] / One congregation. | 0s: one church outline is drawn behind the family (550ms); 1.6s: family rows move into a shared seating group (650ms); 3.8s: headline changes from one service to together (420ms); 5.5s: hold whole congregation and church-name label (0ms) | HF | T01 |
| S11 — Belonging | 01:05.000–01:13.000 | 8s | They can sit with their family, worship with the same congregation, and actually understand what's being said. | **Together. And understood.** — people; labels: Same family / Same congregation. | 0s: reuse same family identities and wardrobe, seated together (480ms); 0.8s: 0.25m slow lateral move; family attends naturally (4900ms); 6.1s: hold headline and family in shared environment (0ms) | H + HF + COMP | T02 |
| S12 — More languages | 01:13.000–01:22.000 | 9s | And you're not limited to Spanish. You can make other languages available depending on the people you're trying to reach. | **Make room for more languages.** — languages; labels: Español / 한국어 / Português / Français. | 0s: Exbabel anchor enters center (450ms); 1.2s: Spanish card arrives upper left (420ms); 2.7s: Korean and Portuguese cards arrive, 90ms stagger (500ms); 4.8s: French card completes four-node field (450ms); 6.3s: hold all labels with no numeric coverage claim (0ms) | HF | T06 |
| S13 — Online handoff | 01:22.000–01:25.000 | 3s | The same thing works online. | **In the room. Online.** — title; labels: Online, too.. | 0s: In the room holds then slides upward 28px (380ms); 0.7s: Online phrase rises into same baseline (420ms); 1.5s: hold the online promise (0ms) | HF | T01 |
| S14 — Livestream input | 01:25.000–01:30.500 | 5.5s | If you're already livestreaming your services, Exbabel can translate the livestream too. | **Bring your livestream along.** — livestream; labels: Service livestream / Translated audio + captions. | 0s: browser surface rises y80→0, scale .96→1 (620ms); 0.9s: neutral sermon-video placeholder resolves in browser (350ms); 1.8s: translation layer docks under video (500ms); 3.3s: caption chunk becomes readable; hold (450ms) | HF | T06 |
| S15 — Remote listener | 01:30.500–01:37.500 | 7s | Someone watching from another city or another country can choose their language and follow along. | **Across cities. Across borders.** — remote; labels: Choose a language / Follow along. | 0s: two location cards enter at x32/68 y55 (550ms); 1.3s: left card shrinks to .82 while right language selector enlarges (620ms); 2.8s: language selection check resolves (300ms); 4.4s: both viewer cards return to equal weight; hold (500ms) | HF | T05 |
| S16 — Existing audio setup | 01:37.500–01:47.500 | 10s | We designed it to work with the audio setup churches already use, so your team doesn't have to completely rethink Sunday morning. | **Fits into Sunday morning.** — signal; labels: Church audio / Exbabel session / Congregation. | 0s: three large hardware-to-listener blocks enter (550ms); 1.8s: existing audio cable path draws (700ms); 3.8s: Exbabel session state changes to ready (320ms); 5.6s: connection line reaches listener phone (700ms); 7.6s: hold stable operational diagram; no unsupported connector promises (0ms) | HF | T06 |
| S17 — Connect, start, share | 01:47.500–01:53.500 | 6s | Connect your audio. Start the translation. Put the QR code on the screen. | **Connect. Start. Share.** — steps; labels: Connect audio / Start translation / Display QR code. | 0s: Connect audio step reveals (380ms); 1.8s: Start translation step reveals (380ms); 3.5s: Display QR code step reveals (380ms); 4.6s: hold three completed steps (0ms) | HF | T07 |
| S18 — The listener takes over | 01:53.500–01:57.500 | 4s | Your congregation handles the rest from their phones. | **Their phone. Their language.** — phones; labels: Scan / Choose / Listen. | 0s: one phone anchors center (420ms); 0.75s: two copies fan outward to x28/72, 90ms stagger (620ms); 2.1s: three action labels appear below (420ms); 2.8s: hold (0ms) | HF | T03 |
| S19 — Invitation | 01:57.500–02:05.500 | 8s | If this sounds useful for [Church Name], I'd love for you to actually try it during a service. | **Try it during a service.** — title; labels: [Church Name]. | 0s: church name appears as a small label (450ms); 1.3s: invitation headline resolves in two lines (550ms); 3.9s: quiet hold with only brand anchor (0ms) | HF | T01 |
| S20 — Trial CTA | 02:05.500–02:10.500 | 5s | You can start with a 30-day free trial at Exbabel.com. | **Start your 30-day free trial.** — cta; labels: Exbabel.com / 30-day free trial. | 0s: trial headline reveals (420ms); 0.8s: Exbabel.com button grows .96→1 (380ms); 1.5s: hold offer and URL; no moving text (0ms) | HF | T05 |
| S21 — Setup call | 02:10.500–02:20.500 | 10s | And if you'd rather have us walk through your setup with you first, you can schedule a quick call with our team. | **Let's walk through your setup.** — cta; labels: Schedule a quick call / Exbabel team. | 0s: call card replaces trial card on same anchor (420ms); 1.7s: three illustrative setup topics appear (500ms); 4.2s: call action remains still with URL (0ms) | HF | T01 |
| S22 — Emotional close | 02:20.500–02:31.000 | 10.5s | That way, the next person who walks into [Church Name] doesn't have to speak the same language as your pastor to understand the message. | **One congregation. Understood.** — close; labels: Exbabel / Exbabel.com. | 0s: family/church motif resolves behind headline (600ms); 2.5s: One congregation phrase appears (450ms); 4.8s: Understood replaces secondary line (450ms); 6.5s: logo and Exbabel.com settle; hold through final frame (400ms) | HF | HOLD |

## 5. Frame compositions

Percentages refer to 1920×1080. x/y are top-left in layer specs. These are planning diagrams, not product screenshots. Shared safe margin: 5%; preserve 8% lower zone when adding narration subtitles. Prototype layouts are schematic; production follows the boxes below.

### S01 — Personal greeting

```text
+--------------------------------------------------+
| BRAND x5 y6                      S01             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | TITLE          x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S02 — A family arrives

```text
+--------------------------------------------------+
| BRAND x5 y6                      S02             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | PEOPLE         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S03 — The language barrier

```text
+--------------------------------------------------+
| BRAND x5 y6                      S03             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | FRAGMENT       x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S04 — Scan

```text
+--------------------------------------------------+
| BRAND x5 y6                      S04             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | SCAN           x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S05 — Choose and listen

```text
+--------------------------------------------------+
| BRAND x5 y6                      S05             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | PHONE          x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S06 — Simple payoff

```text
+--------------------------------------------------+
| BRAND x5 y6                      S06             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | TITLE          x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S07 — Pastor continues

```text
+--------------------------------------------------+
| BRAND x5 y6                      S07             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | SIGNAL         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S08 — Listen in your language

```text
+--------------------------------------------------+
| BRAND x5 y6                      S08             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | LISTENER       x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S09 — Read captions

```text
+--------------------------------------------------+
| BRAND x5 y6                      S09             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | CAPTIONS       x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S10 — One shared service

```text
+--------------------------------------------------+
| BRAND x5 y6                      S10             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | TOGETHER       x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S11 — Belonging

```text
+--------------------------------------------------+
| BRAND x5 y6                      S11             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | PEOPLE         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S12 — More languages

```text
+--------------------------------------------------+
| BRAND x5 y6                      S12             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | LANGUAGES      x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S13 — Online handoff

```text
+--------------------------------------------------+
| BRAND x5 y6                      S13             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | TITLE          x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S14 — Livestream input

```text
+--------------------------------------------------+
| BRAND x5 y6                      S14             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | LIVESTREAM     x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S15 — Remote listener

```text
+--------------------------------------------------+
| BRAND x5 y6                      S15             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | REMOTE         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S16 — Existing audio setup

```text
+--------------------------------------------------+
| BRAND x5 y6                      S16             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | SIGNAL         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S17 — Connect, start, share

```text
+--------------------------------------------------+
| BRAND x5 y6                      S17             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | STEPS          x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S18 — The listener takes over

```text
+--------------------------------------------------+
| BRAND x5 y6                      S18             |
|        HEADLINE x7 y14 w86 h18                    |
|                                                  |
|     +--------------------------------------+     |
|     | PHONES         x13 y35 w74 h51      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S19 — Invitation

```text
+--------------------------------------------------+
| BRAND x5 y6                      S19             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | TITLE          x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S20 — Trial CTA

```text
+--------------------------------------------------+
| BRAND x5 y6                      S20             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | CTA            x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S21 — Setup call

```text
+--------------------------------------------------+
| BRAND x5 y6                      S21             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | CTA            x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

### S22 — Emotional close

```text
+--------------------------------------------------+
| BRAND x5 y6                      S22             |
|        HEADLINE x8 y18 w84 h22                    |
|                                                  |
|     +--------------------------------------+     |
|     | CLOSE          x10 y43 w80 h39      |     |
|     | primary subject / useful UI detail    |     |
|     +--------------------------------------+     |
|        DETAIL x12 y86 w76 h6                      |
+--------------------------------------------------+
```

## 6. Higgsfield shots

Three optional cinematic plates; an all-graphic alternative uses the family/listener SVG compositions. No generation has run. Use one reference family and wardrobe across these shots. Human plates are adaptations for this script, not observed reference content.
### HIGGSFIELD H-S02 — A family arrives

- **Subject:** A fictional family of two adults and a school-age child arriving together. Language is not inferred from appearance.
- **Environment:** Contemporary church entrance, glass doors, neutral architecture, subtle background arrivals.
- **Composition:** Family center x62%, y57%, occupying 42% width and 65% height. Leave upper-left 35% clear. Plate will be masked into a rounded rectangle.
- **Camera:** Eye level, about 1.5m high; three-quarter rear/side view.
- **Lens:** Approximate 35mm full-frame look.
- **Camera Movement:** Smooth 0.4m forward/lateral track over 4s.
- **Lighting:** Broad soft daylight from camera left; gentle interior fill; preserve white highlights.
- **Depth of Field:** Moderate f/4 look; family readable, entrance identifiable.
- **Motion:** Two or three unhurried steps toward the door; one adult holds it.
- **Performance:** Comfortable anticipation, relaxed interaction; no dialogue/lip sync.
- **Color Grade:** Natural skin, neutral whites, restrained blue in clothes; high-key.
- **Texture:** Realistic cloth and skin; no added grain/bloom.
- **Duration:** Generate 6s; use 5.5s, retaining 0.25s handles.
- **Start Frame:** Family just outside, space ahead of their movement.
- **End Frame:** Family crosses the threshold; maintain movement direction.
- **Negative Instructions:** No generated text/signage/logos, readable phone screens, subtitles, theatrical despair, warped hands, extra limbs, camera whip, lens change or montage.

### HIGGSFIELD H-S08 — Hearing the sermon

- **Subject:** One adult from H-S02, seated with the same family in the same wardrobe.
- **Environment:** Same church, softly visible congregation; no readable stage text.
- **Composition:** Adult x63%, y52%; medium close-up with shoulder/chest visible; left 38% clear for audio-state graphic.
- **Camera:** Seated eye level, side-front angle, about 1.2m high.
- **Lens:** Approximate 50mm full-frame look.
- **Camera Movement:** 0.15m slow push over 5s; angle stays fixed.
- **Lighting:** Soft window-like key left/front, fill two stops below key, gentle background separation.
- **Depth of Field:** f/2.8–4 look; eyes and earbud sharp, congregation softly recognizable.
- **Motion:** One small gesture settling an earbud, then attend to the sermon.
- **Performance:** Quiet attention and subtle relaxation; no dialogue or camera awareness.
- **Color Grade:** Match arrival plate, neutral whites and natural saturation.
- **Texture:** Realistic, no beauty-filter look.
- **Duration:** Generate 8s; trim to 7s with handles.
- **Start Frame:** Hand near earbud, phone below main crop with no readable display.
- **End Frame:** Hand lowered, eyes toward stage; at least 1s stable hold.
- **Negative Instructions:** No exaggerated crying, nodding loop, generated UI, lip sync, morphing face/earbud, abrupt head turn or rack focus.

### HIGGSFIELD H-S11 — Together and understood

- **Subject:** Same family from H-S02, now seated together among attendees.
- **Environment:** Same church, ordinary shared service rather than separate language groups.
- **Composition:** Medium-wide family group x55%, y57%, 58% width; upper 25% clear for headline.
- **Camera:** Seated eye level, three-quarter aisle view.
- **Lens:** Approximate 40mm full-frame look.
- **Camera Movement:** 0.25m lateral move left-to-right over 6s, no orbit.
- **Lighting:** Same motivated soft window light and balanced fill, no spotlight.
- **Depth of Field:** f/4 look; family sharp, background gently softer.
- **Motion:** Natural breathing/attention; one brief shared glance, then gaze toward stage.
- **Performance:** Belonging without staged celebration; no dialogue or singing close-up.
- **Color Grade:** Match S02/S08, cool-neutral whites, natural skin.
- **Texture:** Natural detail, no film damage.
- **Duration:** Generate 8–10s single shot; use 8s.
- **Start Frame:** Family already settled; repeat approved identities and clothes.
- **End Frame:** Stable shared attentive pose for at least 1s.
- **Negative Instructions:** No new family identities, segregated seating, subtitles/logos, invented projected text, dramatic camera, repeated hand motions, cutaways or montage.

These are prompts, not API payloads or generated assets. Choose an available model with appropriate duration and reference-frame support during production. Generate one shot per prompt, then add Exbabel text/UI in HyperFrames. The all-HF option replaces these plates with schematic family/listener motifs.


## 7. HyperFrames scene specifications

All 22 units contain deterministic type/graphics. H shots are plates under HF overlays. Canvas 1920×1080, 30fps. JSON milliseconds become HTML seconds. Render-time clock belongs to HyperFrames. Shared styling: white/cyan field, shadow 0 24px 64px rgba(11,18,32,.13), radius 32px; masks on inner wrappers; sharp text; perspective 0, rotation 0, blur 0. Review prototype shows entrance/hold/exit; beat-specific interactions remain final production work.

### HYPERFRAMES S01 — 9s

Text: **Every voice. One congregation.**. Supporting text: Exbabel; [Church Name]. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S01-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S01-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S01-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S01-hero — title | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S01-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 500ms: brand appears at x50 y32; scale .9→1, opacity 0→1; outCubic unless a hold.
- 0.550s for 500ms: headline first phrase rises 30px under mask; outCubic unless a hold.
- 3.300s for 420ms: second phrase replaces the greeting line; outCubic unless a hold.
- 6.800s for 400ms: church name settles below; hold; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 8.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-title. Nominal final-beat hold: 1.8s, less the exit window where applicable. Evidence link: Reference R04–R07: centered words assemble around one brand anchor.

### HYPERFRAMES S02 — 5.5s

Text: **A place for every family.**. Supporting text: Sunday morning; A family arrives. Camera: physical shot per Higgsfield prompt plus flat HF overlay. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S02-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S02-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S02-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S02-hero — people | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S02-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 480ms: family footage card rises 36px and resolves; outCubic unless a hold.
- 0.600s for 3600ms: family advances toward entrance; camera tracks 0.4m; outCubic unless a hold.
- 4.250s for 350ms: headline becomes fully readable; hold; outCubic unless a hold.

Exit: T02; begin in final 600ms, local 4.9s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-people, H-S02. Nominal final-beat hold: 1s, less the exit window where applicable. Evidence link: Human-context adaptation; the reference itself contains no live action.

### HYPERFRAMES S03 — 11s

Text: **The message should reach everyone.**. Supporting text: Welcome to our service.; … only pieces of the message. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S03-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S03-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S03-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S03-hero — fragment | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S03-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 450ms: three short English phrase strips occupy x30/50/70; outCubic unless a hold.
- 1.700s for 420ms: middle and right strips fade to .25; left remains clear; outCubic unless a hold.
- 4.200s for 620ms: camera crops toward remaining phrase; scale 1→1.2; outCubic unless a hold.
- 6.900s for 650ms: fragments gather into one centered message card; outCubic unless a hold.
- 8.200s for 0ms: hold problem statement without more decorative motion; outCubic unless a hold.

Exit: T03; begin in final 600ms, local 10.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-fragment. Nominal final-beat hold: 2.8s, less the exit window where applicable. Evidence link: R10–R11: enlarged speech bubbles; isolate one incomplete thought.

### HYPERFRAMES S04 — 5.5s

Text: **Scan the service QR code.**. Supporting text: Service access; Scan to join. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S04-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S04-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S04-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S04-hero — scan | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S04-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 600ms: blank access pill grows into a QR presentation card; outCubic unless a hold.
- 0.650s for 520ms: phone outline enters from x+90 y+60; outCubic unless a hold.
- 1.800s for 650ms: scan bracket travels downward once over QR region; outCubic unless a hold.
- 3.000s for 300ms: check resolves; hold the confirmed access state; outCubic unless a hold.

Exit: T04; begin in final 600ms, local 4.9s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-scan. Nominal final-beat hold: 2.2s, less the exit window where applicable. Evidence link: R12: small circular control grows into a purposeful UI surface.

### HYPERFRAMES S05 — 3s

Text: **Choose your language. Listen.**. Supporting text: Español; Listen to this service. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S05-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S05-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S05-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S05-hero — phone | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S05-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 420ms: phone stays in place; three language rows reveal at 70ms stagger; outCubic unless a hold.
- 0.650s for 320ms: Español row rises 12px and gains blue border; outCubic unless a hold.
- 1.300s for 260ms: Listen action compresses .98→1; state changes to connected; outCubic unless a hold.
- 1.800s for 0ms: hold selected language and audio state; outCubic unless a hold.

Exit: T05; begin in final 600ms, local 2.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-phone. Nominal final-beat hold: 1.2s, less the exit window where applicable. Evidence link: R15: selected row lifts from its list; R22: action-detail punch-in.

### HYPERFRAMES S06 — 2.5s

Text: **That's it.**. Supporting text: You're connected.. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S06-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S06-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S06-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S06-hero — title | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S06-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 450ms: status check draws, then short payoff rises 24px; outCubic unless a hold.
- 0.500s for 0ms: hold clean completion; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 1.9s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-title. Nominal final-beat hold: 2s, less the exit window where applicable. Evidence link: R23: clean completion state; brief visual breath.

### HYPERFRAMES S07 — 8s

Text: **Keep preaching.**. Supporting text: Service audio; Exbabel; Translated audio. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S07-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S07-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S07-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S07-hero — signal | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S07-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 600ms: speaker, Exbabel and listener nodes enter left to right; outCubic unless a hold.
- 1.300s for 800ms: input path draws left→center; outCubic unless a hold.
- 2.500s for 900ms: output path draws center→right while input continues; outCubic unless a hold.
- 4.200s for 2300ms: deterministic wave cycle repeats finite times; outCubic unless a hold.
- 6.800s for 0ms: hold all connected nodes; outCubic unless a hold.

Exit: T06; begin in final 600ms, local 7.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-signal. Nominal final-beat hold: 1.2s, less the exit window where applicable. Evidence link: R16–R18: persistent status chip explains work without a busy dashboard.

### HYPERFRAMES S08 — 7s

Text: **Hear the message.**. Supporting text: Translated audio; Español. Camera: physical shot per Higgsfield prompt plus flat HF overlay. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S08-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S08-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S08-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S08-hero — listener | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S08-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 480ms: listener footage resolves inside rounded card at x62 y55; outCubic unless a hold.
- 0.700s for 4300ms: listener settles earbud, then follows sermon; no lip sync; outCubic unless a hold.
- 5.200s for 350ms: translated audio label gains emphasis, then holds; outCubic unless a hold.

Exit: T02; begin in final 600ms, local 6.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-listener, H-S08. Nominal final-beat hold: 1.45s, less the exit window where applicable. Evidence link: Human-benefit insert; retain the same visual anchor and light field.

### HYPERFRAMES S09 — 5s

Text: **Read along, too.**. Supporting text: Welcome to our service.; Bienvenidos a nuestro servicio.. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S09-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S09-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S09-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S09-hero — captions | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S09-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 450ms: phone enters at scale .96, centered x65 y56; outCubic unless a hold.
- 0.650s for 500ms: first translated phrase reveals as one semantic chunk; outCubic unless a hold.
- 2.200s for 450ms: second line appears; existing line translates upward 38px; outCubic unless a hold.
- 3.100s for 0ms: hold complete caption for reading; outCubic unless a hold.

Exit: T07; begin in final 600ms, local 4.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-captions. Nominal final-beat hold: 1.9s, less the exit window where applicable. Evidence link: R10–R11: close-up text reveal inside bubbles with uninterrupted reading hold.

### HYPERFRAMES S10 — 8.5s

Text: **One service. Together.**. Supporting text: [Church Name]; One congregation. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S10-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S10-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S10-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S10-hero — together | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S10-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 550ms: one church outline is drawn behind the family; outCubic unless a hold.
- 1.600s for 650ms: family rows move into a shared seating group; outCubic unless a hold.
- 3.800s for 420ms: headline changes from one service to together; outCubic unless a hold.
- 5.500s for 0ms: hold whole congregation and church-name label; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 7.9s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-together. Nominal final-beat hold: 3s, less the exit window where applicable. Evidence link: R05–R08: type reflows while its semantic anchor remains.

### HYPERFRAMES S11 — 8s

Text: **Together. And understood.**. Supporting text: Same family; Same congregation. Camera: physical shot per Higgsfield prompt plus flat HF overlay. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S11-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S11-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S11-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S11-hero — people | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S11-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 480ms: reuse same family identities and wardrobe, seated together; outCubic unless a hold.
- 0.800s for 4900ms: 0.25m slow lateral move; family attends naturally; outCubic unless a hold.
- 6.100s for 0ms: hold headline and family in shared environment; outCubic unless a hold.

Exit: T02; begin in final 600ms, local 7.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-people, H-S11. Nominal final-beat hold: 1.9s, less the exit window where applicable. Evidence link: Return to the arrival family after the product proof.

### HYPERFRAMES S12 — 9s

Text: **Make room for more languages.**. Supporting text: Español; 한국어; Português; Français. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S12-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S12-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S12-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S12-hero — languages | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S12-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 450ms: Exbabel anchor enters center; outCubic unless a hold.
- 1.200s for 420ms: Spanish card arrives upper left; outCubic unless a hold.
- 2.700s for 500ms: Korean and Portuguese cards arrive, 90ms stagger; outCubic unless a hold.
- 4.800s for 450ms: French card completes four-node field; outCubic unless a hold.
- 6.300s for 0ms: hold all labels with no numeric coverage claim; outCubic unless a hold.

Exit: T06; begin in final 600ms, local 8.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-languages. Nominal final-beat hold: 2.7s, less the exit window where applicable. Evidence link: R02–R03: center anchor expands to a controlled constellation.

### HYPERFRAMES S13 — 3s

Text: **In the room. Online.**. Supporting text: Online, too.. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S13-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S13-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S13-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S13-hero — title | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S13-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 380ms: In the room holds then slides upward 28px; outCubic unless a hold.
- 0.700s for 420ms: Online phrase rises into same baseline; outCubic unless a hold.
- 1.500s for 0ms: hold the online promise; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 2.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-title. Nominal final-beat hold: 1.5s, less the exit window where applicable. Evidence link: R24–R27: fixed sentence with one changing phrase.

### HYPERFRAMES S14 — 5.5s

Text: **Bring your livestream along.**. Supporting text: Service livestream; Translated audio + captions. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S14-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S14-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S14-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S14-hero — livestream | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S14-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 620ms: browser surface rises y80→0, scale .96→1; outCubic unless a hold.
- 0.900s for 350ms: neutral sermon-video placeholder resolves in browser; outCubic unless a hold.
- 1.800s for 500ms: translation layer docks under video; outCubic unless a hold.
- 3.300s for 450ms: caption chunk becomes readable; hold; outCubic unless a hold.

Exit: T06; begin in final 600ms, local 4.9s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-livestream. Nominal final-beat hold: 1.75s, less the exit window where applicable. Evidence link: R14: simplified browser rises into frame, then context recedes.

### HYPERFRAMES S15 — 7s

Text: **Across cities. Across borders.**. Supporting text: Choose a language; Follow along. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S15-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S15-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S15-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S15-hero — remote | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S15-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 550ms: two location cards enter at x32/68 y55; outCubic unless a hold.
- 1.300s for 620ms: left card shrinks to .82 while right language selector enlarges; outCubic unless a hold.
- 2.800s for 300ms: language selection check resolves; outCubic unless a hold.
- 4.400s for 500ms: both viewer cards return to equal weight; hold; outCubic unless a hold.

Exit: T05; begin in final 600ms, local 6.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-remote. Nominal final-beat hold: 2.1s, less the exit window where applicable. Evidence link: R15: relevant card expands; background remains subordinate.

### HYPERFRAMES S16 — 10s

Text: **Fits into Sunday morning.**. Supporting text: Church audio; Exbabel session; Congregation. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S16-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S16-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S16-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S16-hero — signal | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S16-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 550ms: three large hardware-to-listener blocks enter; outCubic unless a hold.
- 1.800s for 700ms: existing audio cable path draws; outCubic unless a hold.
- 3.800s for 320ms: Exbabel session state changes to ready; outCubic unless a hold.
- 5.600s for 700ms: connection line reaches listener phone; outCubic unless a hold.
- 7.600s for 0ms: hold stable operational diagram; no unsupported connector promises; outCubic unless a hold.

Exit: T06; begin in final 600ms, local 9.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-signal. Nominal final-beat hold: 2.4s, less the exit window where applicable. Evidence link: R17–R20: show the causal process instead of every setting.

### HYPERFRAMES S17 — 6s

Text: **Connect. Start. Share.**. Supporting text: Connect audio; Start translation; Display QR code. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S17-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S17-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S17-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S17-hero — steps | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S17-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 380ms: Connect audio step reveals; outCubic unless a hold.
- 1.800s for 380ms: Start translation step reveals; outCubic unless a hold.
- 3.500s for 380ms: Display QR code step reveals; outCubic unless a hold.
- 4.600s for 0ms: hold three completed steps; outCubic unless a hold.

Exit: T07; begin in final 600ms, local 5.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-steps. Nominal final-beat hold: 1.4s, less the exit window where applicable. Evidence link: R24–R27: three phrase substitutions land on spoken verbs.

### HYPERFRAMES S18 — 4s

Text: **Their phone. Their language.**. Supporting text: Scan; Choose; Listen. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S18-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S18-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S18-headline — headline | 4 | [7, 14, 86, 18] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S18-hero — phones | 2 | [13, 35, 74, 51] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S18-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 420ms: one phone anchors center; outCubic unless a hold.
- 0.750s for 620ms: two copies fan outward to x28/72, 90ms stagger; outCubic unless a hold.
- 2.100s for 420ms: three action labels appear below; outCubic unless a hold.
- 2.800s for 0ms: hold; outCubic unless a hold.

Exit: T03; begin in final 600ms, local 3.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-phones. Nominal final-beat hold: 1.2s, less the exit window where applicable. Evidence link: R02: one object multiplies into a small organized field.

### HYPERFRAMES S19 — 8s

Text: **Try it during a service.**. Supporting text: [Church Name]. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S19-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S19-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S19-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S19-hero — title | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S19-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 450ms: church name appears as a small label; outCubic unless a hold.
- 1.300s for 550ms: invitation headline resolves in two lines; outCubic unless a hold.
- 3.900s for 0ms: quiet hold with only brand anchor; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 7.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-title. Nominal final-beat hold: 4.1s, less the exit window where applicable. Evidence link: R23 completion hold becomes an invitation; new CTA, not observed ending.

### HYPERFRAMES S20 — 5s

Text: **Start your 30-day free trial.**. Supporting text: Exbabel.com; 30-day free trial. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S20-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S20-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S20-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S20-hero — cta | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S20-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 420ms: trial headline reveals; outCubic unless a hold.
- 0.800s for 380ms: Exbabel.com button grows .96→1; outCubic unless a hold.
- 1.500s for 0ms: hold offer and URL; no moving text; outCubic unless a hold.

Exit: T05; begin in final 600ms, local 4.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-cta. Nominal final-beat hold: 3.5s, less the exit window where applicable. Evidence link: R22: focused action close-up, then settle for reading.

### HYPERFRAMES S21 — 10s

Text: **Let's walk through your setup.**. Supporting text: Schedule a quick call; Exbabel team. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S21-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S21-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S21-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S21-hero — cta | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S21-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 420ms: call card replaces trial card on same anchor; outCubic unless a hold.
- 1.700s for 500ms: three illustrative setup topics appear; outCubic unless a hold.
- 4.200s for 0ms: call action remains still with URL; outCubic unless a hold.

Exit: T01; begin in final 600ms, local 9.4s. Fit source/destination handles inside the existing interval.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-cta. Nominal final-beat hold: 5.8s, less the exit window where applicable. Evidence link: R15: selected action becomes a clear card, with no competing UI.

### HYPERFRAMES S22 — 10.5s

Text: **One congregation. Understood.**. Supporting text: Exbabel; Exbabel.com. Camera: digital composition reframe, no physical lens. Front-on by default. Optional drift scale 1→1.025 only when it preserves reading; omitted in the schematic preview.

| Layer | Z | Box x/y/w/h % | Initial x/y/scale/rotation/opacity/blur |
|---|---:|---|---|
| S22-bg — background | 0 | [0, 0, 100, 100] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S22-brand — brand anchor | 5 | [5, 6, 22, 5] | 0px / 0px / 1 / 0deg / 1 / 0px |
| S22-headline — headline | 4 | [8, 18, 84, 22] | 0px / 30px / 1 / 0deg / 0 / 0px |
| S22-hero — close | 2 | [10, 43, 80, 39] | 0px / 60px / 0.96 / 0deg / 0 / 0px |
| S22-detail — supporting labels | 4 | [12, 86, 76, 6] | 0px / 20px / 1 / 0deg / 0 / 0px |

Animation (scene-local time):
- 0.000s for 600ms: family/church motif resolves behind headline; outCubic unless a hold.
- 2.500s for 450ms: One congregation phrase appears; outCubic unless a hold.
- 4.800s for 450ms: Understood replaces secondary line; outCubic unless a hold.
- 6.500s for 400ms: logo and Exbabel.com settle; hold through final frame; outCubic unless a hold.

Exit: HOLD; no fade; hold logo/URL through 150.9667s.

Masks: canvas; rounded panels; line masks. Shadows: shared diffuse shadow. Blur/perspective: none. Assets: official-logo, Sora-font, ui-close. Nominal final-beat hold: 3.6s, less the exit window where applicable. Evidence link: Original resolution built from R23's clean payoff; reference recording has no captured final CTA.

## 8. Transition library

These are authored Exbabel parameters, not recovered source curves. No added motion blur by default. A transition is included in the edit, not appended after it.

| ID | Name | Duration | Source → destination | Ease | Mask / continuity |
|---|---|---:|---|---|---|
| T01 | Semantic type replacement | 360ms | {"y": [0, -30], "opacity": [1, 0]} → {"y": [30, 0], "opacity": [0, 1]} | outCubic | line overflow hidden; allow 120ms overlap |
| T02 | Soft card handoff | 480ms | {"scale": [1, 0.97], "opacity": [1, 0]} → {"y": [36, 0], "opacity": [0, 1]} | inOutCubic | rounded rectangle radius 32px; photographic crop object-fit cover |
| T03 | Vertical stream continuation | 520ms | {"y": [0, -180], "opacity": [1, 0]} → {"y": [100, 0], "opacity": [0, 1]} | inOutCubic | canvas; retain upward direction |
| T04 | Pill-to-panel expansion | 600ms | {"scale": [1, 0.95], "opacity": [1, 0]} → {"scaleX": [0.18, 1], "scaleY": [0.18, 1], "opacity": [0, 1]} | outExpo | animate blank outer surface; counter-scale content or reveal after 360ms |
| T05 | Selected-detail push | 460ms | {"scale": [1, 1.65], "x": [0, -160], "opacity": [1, 0]} → {"scale": [0.96, 1], "opacity": [0, 1]} | inOutCubic | destination anchored to selected detail; no text blur during hold |
| T06 | Shared-anchor reframe | 620ms | {"scale": [1, 0.92], "opacity": [1, 0]} → {"y": [64, 0], "scale": [0.96, 1], "opacity": [0, 1]} | outCubic | preserve brand/status anchor in production, new content beneath |
| T07 | Masked text / step reveal | 420ms | {"opacity": [1, 0]} → {"y": [24, 0], "opacity": [0, 1]} | outCubic | line clips; indexed word offsets 70ms, total reveal <=900ms |

T05: compute translation from selected detail bounds so its center lands at canvas center after scale. The JSON x=-160 example is a starting pose, not a universal value. T04: expand the blank outer surface and reveal inner text after 360ms to avoid stretching glyphs. T06: production reuses a persistent anchor DOM node; the schematic preview uses separate scene instances and does not claim to implement a shared-element morph.

## 9. Presenter compositing

No presenter appears in the inspected reference and none is required here. Narration remains voiceover. H-S02/S08/S11 are narrative plates, not talking-head overlays.

Mask plates into rounded rectangles below the headline; crop with object-fit cover; add diffuse outer shadow; composite deterministic labels above. Maintain family identities, clothes and church across shots. Don't generate readable screens/logos inside footage. End holds need usable still performance, not an arbitrary frozen gesture. Real church footage can substitute LIVE for H. An all-HF alternative uses the family/listener SVG layout and preserves the script.

## 10. Audio plan

Reference: stereo AAC exists, sample mean -18.1dBFS and sample peak -3.0dBFS; no reliable audition/transcription. Original voice, BPM, cue identities and synchronization remain unknown.

New narration: one warm, clear voice, conversational rather than announcer-like, approximately 140–150 WPM. Preserve exact script and personalize fields before recording. Pause after “That's pretty much it,” “The same thing works online,” and the three setup verbs. Record before locking animation.

Proposed music: original/licensed lyric-free restrained bed, roughly 88–104 BPM, soft plucked/synthetic tones and light pulse, no trailer rise. Start 18–24dB below VO, adjust by ear, duck another 3–6dB through dense narration. These are proposed settings, not findings from the source.

SFX: soft scan tick S04, selection tick S05, restrained caption tick S09, three setup ticks S17, subtle button cue S20. No whoosh on every sentence. Move transients away from consonants after recording.

Delivery: WAV 48kHz masters, AAC mux. A starting web target is -16 to -14 integrated LUFS with true peak <=-1dBTP, verified for destination; sample peak is not true peak. Test phone speakers and headphones. Generate VTT/SRT narration subtitles after VO alignment; product translation captions are a separate layer.

## 11. Asset list

| Category | Contents | Status/dependency |
|---|---|---|
| Recorded | VO_MASTER.wav; optional real church plates | Not recorded; precedes timing lock |
| Generated | H-S02 arrival, H-S08 listener, H-S11 shared service | Prompts supplied; not generated |
| Product screenshots | Language menu, joined session, listening, captions, livestream, admin session | Approved current captures needed; prototype uses illustrative UI |
| UI components | Scan, phone, captions, signal, languages, livestream, remote, steps, phones, CTA | Schematic HTML/SVG included |
| Icons | Wave, headphones, check, church, globe | Simple schematic SVG included |
| Logos | Official Exbabel mark | Copied from local favicon; verify final brand lockup |
| Fonts | Sora and Korean glyph support | Local files + licenses; verify multilingual fit |
| Graphics | Caption bubbles, status chips, family schematic | Included |
| Audio | Exact narration script and cue plan | Text/timings only |
| Music | Licensed instrumental full length + handles | To source after rough edit |
| Sound Effects | Scan/selection/check/step ticks | To source/create |
| Masks / Mattes | Rounded card, line reveal, scan region | Deterministic shapes; no person removal needed |
| Backgrounds | #FCFCFD and restrained cyan lower wash | Included |
| Device Mockups | Front-on phone and browser | Schematic, not exact product capture |
| Other | Session URL, real QR, names, CTA links, trial terms | Confirm before final publication |

Reuse candidates: components/svg/HeroFlowSvg.tsx; LiveCaptionsGraphic.tsx; UnlimitedLanguagesGraphic.tsx; FeatureShowcase.tsx. Reuse visual geometry, not uncontrolled timers or infinite loops. Existing application components are not changed.

## 12. Production order

1. Confirm personalization, offer and CTA destinations.
2. Record full narration, clean conservatively and mark sentence boundaries.
3. Replace estimated times in JSON with measured VO intervals.
4. Gather approved screens, brand assets and a real QR; build common phone/browser/status components once.
5. Assemble a complete all-HF rough cut with narration before generating optional plates.
6. Approve one family/wardrobe/location reference, then generate the three related H shots.
7. Build interactions in dependency order: scan → select → listen → captions; reuse for online variants.
8. Build the signal diagram once for S07/S16; reuse labels for S17. Language constellation can be built independently.
9. Build transitions after scene geometry is stable, placing handles within locked durations.
10. Replace schematic motion with all specified beat-level effects and inspect proof frames.
11. Composite plates and match them to the light UI field.
12. Add licensed music/SFX, then align narration subtitles.
13. Run HyperFrames checks and review a rendered draft.
14. Export full 16:9 film; then re-layout the proposed 30-second 4:3 carousel derivative. Do not cut script lines from the full master.
15. Review assembled outputs before publication; deployment is outside this resource task.

Dependencies: VO → timing lock → beat durations; approved screens → reusable UI → product scenes; family references → H plates → composites; scene geometry → transitions; picture lock → final mix/subtitles → render QC.


## 13. Final assembly timeline

VO master starts at 00:00.000; re-time to recorded sentence boundaries. Picture filenames below are planned outputs, not existing movies. Transitions are included within the assigned intervals. Delivery: 1920×1080, 30fps, SDR. Final frame index 4529, at 150.9667s.

| In–out | Planned picture | Plate / overlay | Proposed sound |
|---|---|---|---|
| 00:00.000–00:09.000 | HF_S01.mov | HTML/SVG layers | VO + quiet music bed |
| 00:09.000–00:14.500 | HF_S02.mov | H_S02.mov under HF text | VO + quiet music bed |
| 00:14.500–00:25.500 | HF_S03.mov | HTML/SVG layers | VO + quiet music bed |
| 00:25.500–00:31.000 | HF_S04.mov | HTML/SVG layers | 00:26.150: soft-interface-tick |
| 00:31.000–00:34.000 | HF_S05.mov | HTML/SVG layers | 00:31.650: soft-interface-tick |
| 00:34.000–00:36.500 | HF_S06.mov | HTML/SVG layers | VO + quiet music bed |
| 00:36.500–00:44.500 | HF_S07.mov | HTML/SVG layers | VO + quiet music bed |
| 00:44.500–00:51.500 | HF_S08.mov | H_S08.mov under HF text | VO + quiet music bed |
| 00:51.500–00:56.500 | HF_S09.mov | HTML/SVG layers | 00:52.150: soft-interface-tick |
| 00:56.500–01:05.000 | HF_S10.mov | HTML/SVG layers | VO + quiet music bed |
| 01:05.000–01:13.000 | HF_S11.mov | H_S11.mov under HF text | VO + quiet music bed |
| 01:13.000–01:22.000 | HF_S12.mov | HTML/SVG layers | VO + quiet music bed |
| 01:22.000–01:25.000 | HF_S13.mov | HTML/SVG layers | VO + quiet music bed |
| 01:25.000–01:30.500 | HF_S14.mov | HTML/SVG layers | VO + quiet music bed |
| 01:30.500–01:37.500 | HF_S15.mov | HTML/SVG layers | VO + quiet music bed |
| 01:37.500–01:47.500 | HF_S16.mov | HTML/SVG layers | VO + quiet music bed |
| 01:47.500–01:53.500 | HF_S17.mov | HTML/SVG layers | 01:48.150: soft-interface-tick |
| 01:53.500–01:57.500 | HF_S18.mov | HTML/SVG layers | VO + quiet music bed |
| 01:57.500–02:05.500 | HF_S19.mov | HTML/SVG layers | VO + quiet music bed |
| 02:05.500–02:10.500 | HF_S20.mov | HTML/SVG layers | 02:06.150: soft-interface-tick |
| 02:10.500–02:20.500 | HF_S21.mov | HTML/SVG layers | 02:11.150: soft-interface-tick |
| 02:20.500–02:31.000 | HF_S22.mov | HTML/SVG layers | VO + quiet music bed |

Music: 00:00.000–02:31.000; 1.2s fade-in, duck under narration, taper final 2s while image stays still. Move proposed SFX off key syllables after narration alignment. No original reference audio is reused.

## 14. Quality-control checklist

- [ ] Replace plate/QR/UI placeholders with approved assets.
- [ ] Record the entire supplied script; lock timings against recording.
- [ ] Confirm offer terms and CTA links before publication.
- [ ] Test long personalized names and multilingual glyphs.
- [ ] Verify real listener UI, language options and working QR.
- [ ] Implement all specified beats beyond schematic entrances.
- [ ] Run HyperFrames checks/keyframe diagnostics on the final composition.
- [ ] Inspect first frame, scene proof frames, transitions and final-minus-frame.
- [ ] Audition licensed final audio; measure LUFS and true peak.
- [ ] Review the 4:3 adaptation separately; supply static reduced-motion states.
- [ ] Exclude original branding, school/shopping UI, soundtrack and player controls.

Current checks are recorded in VALIDATION.md. The unchecked items above are final production work.
