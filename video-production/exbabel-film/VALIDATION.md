# Production verification

HyperFrames 0.8.65: overall check passed. Zero lint/runtime/layout/motion/contrast errors.

Warnings: 24 organization recommendations for the monolithic 22-scene composition; two contrast warnings during a language-card entrance fade; one media-fit warning where HyperFrames reports the decoded narration as 123.74s within a 123.80s slot. The shortened 60ms is in the padded silence after narration, not spoken content. At rest the language card uses white on Exbabel blue. Zero layout warnings in the final check.

Measured narration WAV: -16.73 LUFS integrated, -1.50dB true peak, 3.30 LU loudness range. Full speech ends around 122.3s, leaving a closing hold.

Camera targeting: all nine target poses land within 0.1px of their intended focal point and reproduce under reverse seeks. Zero image/video tags, no stock media.

The full narrated film is 123.8 seconds at 1920 x 1080 / 30fps. Narration is ElevenLabs Roger, multilingual_v2, take 1. All 22 scene windows and 44 caption phrases follow locally recognized word timestamps; the original copy is preserved apart from generic personalization. Short trailing caption fragments were merged into their preceding phrase. Recognition/tokenization differences are recorded in narration-timing.json. Timings are machine-aligned estimates.

The earlier 151-second silent file is retained as a visual proof, not the final delivery. The final export is renders/exbabel-full.mp4. The same local narration.wav is mounted in the editable HTML. Final encode verification is recorded separately in export-probe.json.

Final export verified: H.264 1920x1080 at 30fps plus stereo AAC 48kHz; both streams exactly 123.800s; 18,559,301 bytes. Full FFmpeg decode completed with no errors (export-decode.log). Nine frames extracted from the actual MP4 were visually reviewed in renders/final-review.jpg.

HyperFrames completed and validated its output, while also reporting a sub_timeline_readiness_timeout warning for timeline readiness. The anime.js animation rendered correctly in the inspected export frames; all nine focus poses separately passed deterministic seek verification. Final render took 8m36.5s using two software-GPU workers.
