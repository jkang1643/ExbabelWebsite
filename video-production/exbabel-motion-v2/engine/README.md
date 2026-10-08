# Exbabel personalized HyperFrames demos

This service plays the existing `../index.html` HyperFrames composition. It injects validated public content before the canonical timeline starts and swaps only the narration source. Scenes, timing, easing, camera moves, product graphics, and transitions remain in the original source. There is no MP4 overlay or per-church source file.

## Run locally

Use Node 22+, FFmpeg, and the existing HyperFrames project dependencies. In WSL Ubuntu:

```bash
cd /home/jkang1643/projects/exbabel/video-production/exbabel-motion-v2/engine
cp .env.example .env
# Fill in values and load them into the process environment.
set -a; . ./.env; set +a
npm install
npm test
npm start
```

Open `http://localhost:3020/admin/demos` and sign in. For a short list, paste one church name per line and click **Create demo links**. For prospect details or hundreds of records, import `sample-churches.csv`. Both paths validate names, store the resulting prospect JSON, and return random, non-sequential `/d/<token>` URLs. You do **not** need to prepare JSON manually. Re-importing the same church name reuses its original link even if the first record came from a detailed CSV; Salesforce ID remains stored as metadata. The admin library shows one row per church, supports name search, and has an embedded **Preview** button plus copy/open actions and view counts. The player page works without ElevenLabs credentials for visual review and clearly labels the original narration fallback; **a personalized spoken name requires the designated voice ID and API key**. Configure those variables, then use “Regenerate voice.” The generated phrase is “at [Church Name]” because the master says “... congregation at your church” in the reserved 4.700–6.650-second slot. Names that exceed the slot by more than 10% move to `voice_review_required` rather than drifting the remaining 117 seconds of animation.

Use `DEMO_DATA_DIR` on durable storage; the SQLite database and generated audio live there. Run behind HTTPS and an authenticated reverse proxy as appropriate. Set `DEMO_BASE_URL` to the actual public origin. The static marketing site is untouched; `demo.exbabel.com` should reverse-proxy to this service. `ADMIN_SECRET` and `ADMIN_PASSWORD` must be different, long random values. Public configuration omits email, phone, size, and Salesforce ID. Disabled links return 404.
The service binds to `127.0.0.1` by default; set `HOST=0.0.0.0` only when your deployment network requires it and the host is protected by a proxy/firewall.

## Content and endpoints

`POST /admin/api/import` accepts CSV body with columns `church_name,first_name,city,state,location,size,phone,website,email,salesforce_id,pronunciation_church_name`. It validates each row and reports errors. The admin page also exports `church_name,email,salesforce_id,demo_url,status` from `/admin/api/export.csv`.
`POST /admin/api/import-names` accepts newline-separated names as plain text and uses the same normalization and idempotent storage path.

The canonical content layer is `src/schema.ts`. **V1 passes only the church name into the visual composition.** The S01 subcomposition occupies the S01/S02 opening interval (0–10.988 seconds); it derives both “Hey [Church Name],” and the name reveal from that one value. All later scene copy and the CTA remain fixed. CSV fields other than church name are stored for prospect administration and future personalization, not rendered in the video. Long names use S01's original animation with responsive sizing; the timeline is not retimed. `GET /d/:token/config` currently returns only:

```json
{"churchName":"Living Hope Church"}
```

If a spoken name needs a pronunciation override, authorized `POST /admin/api/demos/:token/pronunciation` accepts `{"churchName":"phonetic pronunciation"}`; then call `/regenerate-voice`. Other admin actions are `/toggle`, `/sync-salesforce`, and `/export-mp4`. Export creates a temporary copy of the same HyperFrames composition with this prospect's JSON and WAV and calls the installed HyperFrames renderer. It is opt-in and may take several minutes. Exported files are placed in `DEMO_DATA_DIR/exports`; there is no default bulk MP4 render.

`POST /admin/api/salesforce/create` with `{"salesforceId":"<15-or-18-character Lead or Contact ID>"}` fetches a Salesforce record, creates or reuses its demo, and queues personalized audio. For campaign automation, configure a Salesforce Flow to call `POST /api/salesforce/create` with the same JSON body and `Authorization: Bearer <SALESFORCE_WEBHOOK_TOKEN>` from a protected Named Credential. Never put that token or the admin password in an email template. The matching Lead/Contact receives `Personalized_Demo_URL__c` and `Personalized_Demo_Status__c` when ready. Public opens update `Personalized_Demo_Viewed__c` and `Personalized_Demo_Last_Viewed__c`. Configure these four custom fields on both Lead and Contact and grant read/write access to the OAuth integration user. The email template should merge `Personalized_Demo_URL__c`. The integration uses Salesforce client-credentials OAuth with an External Client App and a least-privilege integration user. Keep those credentials server-side.

## Audio and limits

ElevenLabs generates only the fixed phrase; SHA-256 caching includes the voice ID, text, model, and voice settings. FFmpeg decodes it to mono 48 kHz PCM, applies modest level matching and 35 ms edge fades, and inserts it into the original WAV without altering other samples. If the clip is slightly long, only that segment receives up to 10% tempo adjustment. Longer clips require pronunciation/timing review. Voice cache and rendered final WAV are stored outside the browser directory. The user's custom ElevenLabs voice ID is required; this service does not choose a voice automatically.

The `/d/:token` player uses the installed `<hyperframes-player>` web component. Its native controls handle play, pause, replay, and seek. Public analytics record opened, started, 25/50/75%, completed, and CTA clicked. A modest per-IP event limit prevents obvious abuse. The service requires HTTPS for production and should be monitored and backed up; SQLite is suitable for one service instance, but multi-instance deployment should move `DemoStore` behind a shared database before horizontal scaling.

## Verification

```bash
npm run typecheck
npm test
cd ..
python3 build.py
npx hyperframes check
```

The tests check two CSV prospects, public PII separation, invalid URLs, and fixed audio sample alignment. The player was also checked in Chromium by seeking the same canonical timeline with a personalized S01 name. Production validation still needs real ElevenLabs credentials and Salesforce OAuth/field configuration.
