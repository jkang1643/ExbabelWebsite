# PRODUCT FOCUS CAMERA MOTION

Purpose:
Create premium SaaS product-demo camera movements similar to modern
Apple-style and polished startup product films.

The "camera" should be treated as a virtual 2D camera moving across an
interface rather than simply scaling the entire screen from its center.

CORE MOTION PRINCIPLE

Every camera movement must have a semantic target.

Before creating a zoom, identify the exact UI element the viewer should
notice next:

- button
- input field
- notification
- card
- menu
- message
- cursor interaction
- piece of text
- product feature

The camera should move toward that target.

Never zoom arbitrarily.

TARGET-ANCHORED ZOOM

When focusing on a UI element:

1. Begin with enough of the interface visible to establish context.

2. Determine the target element's position within the composition.

3. Animate BOTH:
   - scale
   - x/y translation

4. Translate the interface as it scales so the target approaches the
   intended focal point of the frame.

Do NOT simply transform-scale from the center of the screen.

The selected element should feel as though the camera physically moved
toward it.

DEFAULT ZOOM SEQUENCE

ESTABLISH
Scale: 1.0
Duration: approximately 0.5–1.5 seconds

PUSH-IN
Scale from approximately:
1.0 → 1.8–2.5

Duration:
approximately 450–700ms

Animate x/y simultaneously to center or compositionally frame the target.

Preferred easing:
strong ease-out

Example:
cubic-bezier(0.22, 1, 0.36, 1)

The movement should accelerate quickly and then progressively decelerate
into a soft landing.

FOCUS HOLD
Hold the close framing for approximately:
500–1200ms

Allow the viewer enough time to understand the highlighted action.

PULL-BACK
Return toward:
scale 1.0–1.15

Duration:
approximately 250–500ms

The pull-back may be faster than the push-in.

Use ease-in-out or a slightly sharper cinematic easing curve.

The pull-back acts as visual punctuation before the next product step.

CAMERA TARGETING

Do not always center the target perfectly.

Prefer cinematic composition.

Possible focal positions:

center:
50% x / 50% y

right-side feature:
60–68% x / 50–60% y

left-side feature:
32–40% x / 50–60% y

lower interface controls:
50–65% x / 60–72% y

Maintain surrounding interface context when useful.

MOVEMENT CHARACTER

Camera motion should feel:

- intentional
- confident
- smooth
- slightly fast
- premium
- restrained

It should NOT feel:

- floaty
- continuously drifting
- like a Ken Burns slideshow
- springy
- excessively elastic
- handheld
- random

Do not constantly animate the camera.

Alternate between:

STATIC FRAME
→ CAMERA MOVE
→ STATIC HOLD
→ ACTION
→ CAMERA RESET
→ NEXT SHOT

This contrast makes the motion feel more important.

ZOOM DEPTH

Use different amounts of zoom based on importance.

Context:
1.0–1.15x

Medium feature focus:
1.3–1.7x

Strong product focus:
1.8–2.3x

Extreme detail:
2.3–2.7x

Avoid exceeding approximately 2.7x unless intentionally transitioning
through an interface element.

FOCUS TRANSITIONS

Camera transitions may combine:

scale
+
translation
+
UI animation

Example:

Full checkout panel visible.

Camera pushes toward Allow button.

Scale:
1.0 → 2.3

Translation shifts interface up and left so Allow remains near the
lower-right visual focal area.

Hold.

Button interaction occurs.

Camera rapidly pulls back:
2.3 → 1.0

Reveal full interface.

Transition to next scene.

MOTION BLUR

When appropriate, apply subtle directional motion blur during only the
fastest portion of major camera movements.

Blur should disappear as the camera settles.

Never leave UI text blurred at the destination.

UI CRISPNESS

Interfaces should remain extremely sharp at camera rest positions.

Prefer vector, HTML, SVG, or high-resolution source assets so that
camera zooms do not expose low-resolution rasterization.

CONTINUITY

Whenever possible, preserve spatial continuity.

If the viewer starts with a full interface and then sees a detail,
physically travel toward that detail instead of cutting to an unrelated
enlarged screenshot.

Use hard cuts primarily when transitioning into a genuinely different
screen or conceptual scene.

KEY RULE

The purpose of the camera is to direct attention.

Camera motion must answer:

"What does the viewer need to look at right now?"

If there is no clear answer, keep the camera still.