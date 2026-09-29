# L-29 training homepage — September 30, 2026

Task: TZ-12. Burhan explicitly supplied Scott's new training homepage reference and authorized implementation, requesting equivalent mobile/desktop experience, a better Lucky 13 image, Double Eagle and Moriarty in place of Albuquerque, and $1,250 per hour rather than per flight.

Reference: user attachment Photo 1.jpg, /tmp/codex-remote-attachments/01a062fb-0234-7401-864c-5dab90a025d9/E5F8301A-C84A-4008-A799-A3F462F422C6/1-Photo-1.jpg.

## Implementation

- Training-led homepage replaces the race-week homepage; all racing pages, authentic media, eighteen-photo gallery and six downloads remain unchanged and accessible via footer.
- Reference's black/red typography, sunset hero, aircraft caption, four-column training briefing, six outline-icon topics, two CTAs and light two-jet operational-experience section implemented as editable semantic HTML.
- Correct hourly rate and Double Eagle / Moriarty airport wording. Santa Fe examiner wording preserved from approved reference.
- Small-screen layout stacks copy and full-width uncropped aircraft, details and CTAs. Training topic grid remains two columns; navigation uses existing keyboard-dismissible drawer.
- Training CTA opens existing contact form with training-specific heading, subject and message hint. Default contact experience and existing recipient configuration unchanged. No form submission sent during QA.

## Artwork provenance

Built-in image generation used the supplied reference to produce illustrative (not documentary) silver/burgundy Lucky 13 aircraft visuals. Original PNGs retained:

- Hero: /Users/burhan/.codex/generated_images/01a062fb-0234-7401-864c-5dab90a025d9/exec-31e4c880-3e4b-4421-8d80-befdd71f3368.png, 1632×964.
- Formation: /Users/burhan/.codex/generated_images/01a062fb-0234-7401-864c-5dab90a025d9/exec-c5fad666-7979-4eb1-8c0b-8f0731e3f581.png, 1839×855.

Prompts: clean aircraft-only photographic-style illustration, no baked-in page text or buttons; Lucky 13 nose-left on runway beneath dark-left/golden-right sunset mountains with upper sky reserved for HTML copy; second image two silver/burgundy L-29s (13 foreground, 6 behind) over New Mexico mountains, pale left area reserved for HTML, visible pilots and complete aircraft. Optimized WebP exports retain original pixel dimensions in assets/img/lucky-13-training-hero.webp and lucky-13-team-flight.webp. Alt text identifies illustrations.

## Verification

- Visual Chrome QA at 1440 desktop, 845 reference/tablet, 768 tablet, 390 mobile and 320 narrow mobile.
- No horizontal overflow; images loaded; team copy fits its section. Mobile menu open/Escape dismissal verified.
- Training CTA navigation and contextual form verified without submitting. Footer retains team/race/contact links.
- Seven automated suites pass, including clean routes, existing racing media, original Carol film, downloads and player regression. Superseded race-first homepage assertions updated to training requirements; race-page assertions retained.
- Screenshots: ../artifacts/training-home-2026-09-30/desktop.jpg and mobile.jpg.
- Fresh Gmail refresh returned Scott's September 26 acknowledgement, no newer training requirements. Messages connector returned a permission-filtered result; this is NOT a successful empty/new-message check. Direct user-approved reference is implementation authority. No client message sent.

Deployment: e39b5aab7402b6baaf2ff2b43772636f310cd598 pushed to main. Pages run 36631781365 completed successfully. Production root URL, hourly price, airports, hero and lower image visually verified on desktop/mobile; no console errors. Public evidence: ../artifacts/training-home-2026-09-30/desktop-live.jpg and mobile-live.jpg. Canonical PROJECT-STATUS.md and linked Obsidian website/decisions notes reconciled. No client communication sent.
