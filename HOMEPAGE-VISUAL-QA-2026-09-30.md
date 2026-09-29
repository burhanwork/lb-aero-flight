# Training homepage visual/product QA — September 30, 2026

Scope: homepage and its training/aircraft navigation. Target is Burhan's supplied Photo 1.jpg, with explicit hourly pricing and airport corrections. No unrelated page redesign, client communication or form submission.

## Findings and corrections

| Finding | User impact | Correction |
|---|---|---|
| Width-only sizing made desktop scenes taller than a short laptop window | User had to scroll within a single section | Height-aware artwork stage, container-relative headings, compact icons/spacing; full aircraft retained |
| Phone headline was detached from sunset artwork | Phone felt unlike approved desktop composition | Reference-based portrait artwork in responsive picture; real HTML headline overlays dark sky, aircraft remains fully visible |
| Briefing copy was 15px and columns wrapped excessively | Harder scanning and weak readability | 16px/1.5 body text; wider briefing grid |
| Team copy approached foreground aircraft | Text/image competed | Narrower copy column and minimum scene height, uncropped contained image |
| Bright sky behind headline | Variable headline contrast | Noninteractive dark text-area gradient fading above aircraft |
| Brand target was only 34px tall on phone | Undersized home link | Minimum 44px brand target |

## Reference fidelity

Black navigation, white/red condensed display type, Lucky 13 sunset scene, aircraft caption, price/training/location briefing, six outline icons, paired CTAs, pale two-jet experience section and veteran badge retained. $1,250 is **per hour + fuel**, not per flight. Training locations are **Double Eagle and Moriarty**. Santa Fe examiner copy from reference retained. Existing racing history and six film downloads are untouched.

Mobile preserves scene, headline overlay, colour, typography, section order and full aircraft rather than reproducing a tiny four-column desktop grid. Briefing and team copy stack where needed to keep 16px text and usable controls. Identical pixel geometry at phone width would make the supplied desktop layout unreadable; no such claim is made.

## Checks

- Responsive geometry at 320×568, 390×780, 768×1024, 1024×768, 1280×600, 1366×650, 1512×740 and 1920×1080; no horizontal overflow.
- Section-by-section visual review: hero/nav, price/details, topic grid, CTA pair, operational-experience image/copy, veteran badge and footer. Screenshot evidence under ../artifacts/training-home-2026-09-30/laptop-fit/.
- Mobile menu open/Escape; training CTA opens existing contextual contact form; aircraft CTA destination retained. No form submitted.
- Headline hierarchy, body sizing, image natural dimensions, caption placement, alignment, target sizes, focus and reduced-motion source contracts reviewed. Image sharpness judged at displayed size; no blurry upscaled source required replacing.
- Existing media/player/route suites plus viewport and mobile-art contracts run before publication. Runtime geometry checks supplement static tests; static assertions alone are not visual certification.

## New artwork provenance

Built-in image generation edited the existing desktop hero as reference: portrait 3:4, same silver/burgundy Lucky 13, complete aircraft in lower third, extra dark sunset sky for HTML text, no baked-in page UI. Original: /Users/burhan/.codex/generated_images/01a062fb-0234-7401-864c-5dab90a025d9/exec-b9818fcb-9ae4-4afa-a048-e9651acc3f43.png (1086×1448). Workspace export: assets/img/lucky-13-training-mobile.webp, 311334 bytes, original dimensions retained. Prompt requested recognizable L-29, number 13, pilot, complete wings/tail/gear, nose-left runway and reference lighting. It remains an illustration, not a real documentary photo.

## Limits and publication

Chrome responsive emulation, not physical-device Safari certification. Fresh Gmail check failed due unavailable connector link_id; no new-message conclusion inferred. No email or iMessage sent. Publication and live verification evidence recorded after deployment.
