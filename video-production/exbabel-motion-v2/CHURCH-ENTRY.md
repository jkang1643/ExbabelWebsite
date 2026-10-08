# Church entry insert
S02A replaces the resting church-name hold from 6.244–10.988 seconds, under “Picture someone walking into your service this Sunday with their family.”
Concept: an editorial miniature sanctuary becomes a cinematic continuous doorway-to-congregation flight.
Palette: existing Exbabel cobalt #394dfe, ink #16213b, cool white #f7f8fc. No new copy or fonts.
Rules: 3d-camera-flight + nudge-curve (continuous Hermite velocity adaptation).
0–0.5s: establish closed arch doors; 0.5–1.95s: hinged opening and accelerating approach; 1.95–3.3s: aisle flight and long braking tail; 3.3–4.58s: slow drift beside a blue family; final 0.16s: white handoff into S03.
Geometry uses actual CSS perspective, Z-separated pews and congregation, two hinged door surfaces, and one GSAP camera transform writer.
The S01 greeting/name animation, personalized church field, S03 start, and all narration samples remain unchanged.
Source: compositions/s02a-church-entry.html. build.py preserves its host placement on rebuild.
