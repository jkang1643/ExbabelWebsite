
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

