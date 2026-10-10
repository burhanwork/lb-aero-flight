# Aircraft accuracy correction — October 10, 2026

## Source and scope

Burhan supplied four screenshots of Scott's WhatsApp feedback and approved the implementation plan. Correct aircraft facts without redesigning accepted pages.

## Implemented locally

- Removed the incorrect side-by-side cockpit gallery image from both Platform routes. The original image file is retained for recoverability, but no longer rendered on those pages.
- Added explicit tandem seating: pilot and instructor one behind the other.
- Changed typical mission to **1 hour or less** and renamed the card **MISSION DURATION**. This is Scott's operational statement, not an independently measured maximum-endurance specification.
- Three-column desktop gallery; two-column tablet with a full-row final image; single-column phone. Other sections, pricing, airports and racing media remain unchanged.

## Verification

- `node scripts/build-clean-urls.mjs`: nine routes regenerated.
- `node --test tests/*.test.mjs`: ten files pass, zero failures.
- `node tests/media-check.mjs`: pass.
- `git diff --check`: pass.
- Read-only review of changed markup/CSS and reviewed image confirms the removed asset is the circled side-by-side cockpit.
- Visual browser tests **not performed**: in-app browser unavailable; available-browser inventory empty. Do not infer responsive correctness from static assertions alone.
- No publication or production verification performed.

## Held imagery requirements

No verified Lucky 13 exterior or two-aircraft formation reference was identified in the checked project assets or focused filename search of Downloads. Existing generated images are not identification evidence. Real Carol cockpit imagery exists, but it does not prove Lucky 13's exterior, paint or tank configuration.

Before replacements, obtain authentic reference images and establish Lucky 13 identity, paint/markings, wing-tank configuration and the second aircraft's distinguishing details. Do not fabricate fixes from the screenshots alone.

## Remaining release checks

Connect browser; inspect 1366×768, 1440×900, 768×1024, 390×844 and 320×568. Check complete images, readable text, balanced gallery, overflow, navigation and existing media controls. Publish only reviewed scoped changes through the existing GitHub Pages workflow, then verify both Platform URLs in production. No client communication without separate approval.
