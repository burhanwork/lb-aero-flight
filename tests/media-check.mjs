import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const racing = readFileSync(resolve(root, 'racing.html'), 'utf8');
const home = readFileSync(resolve(root, 'index.html'), 'utf8');
const experience = readFileSync(resolve(root, 'css/race-experience.css'), 'utf8');
const player = readFileSync(resolve(root, 'js/race-experience.js'), 'utf8');
assert.match(home, /team-zia-hero-compact-v3\.webp/, 'Homepage uses compact artwork');
assert.match(racing, /team-zia-hero-compact-v3\.webp/, 'Race page uses compact artwork');
assert.match(experience, /prefers-reduced-motion:\s*reduce/, 'Reduced-motion CSS exists');
assert.match(player, /motion\.matches/, 'Animation respects reduced motion');
assert.match(racing, /class="film-cover"[^>]*hidden/, 'Without JS, cover does not block native video');
assert.match(player, /video\.addEventListener\('ended', showCover\)/, 'Replay cover restores after playback');
assert.match(player, /video\.addEventListener\('error', fail\)/, 'Playback failures expose fallback');
const videoTag = racing.match(/<video\b[\s\S]*?<\/video>/)?.[0];
assert.ok(videoTag, 'Racing page has a native video player');
for (const attribute of ['controls', 'playsinline', 'preload="none"', 'aria-label=', 'aria-describedby=']) {
  assert.ok(videoTag.includes(attribute), `Video includes ${attribute}`);
}
assert.ok(!/\bautoplay\b/.test(videoTag), 'Video never autoplays');
assert.match(racing, /\.zia-video-frame video\s*\{[^}]*object-fit:\s*contain/, 'Video preserves full frame');
assert.match(racing, /@media \(max-width: 1024px\)/, 'Tablet hero uses stacked layout');
assert.match(home, /href="racing\.html#announcement">WATCH THE TEAM FILM/, 'Homepage points to the film');
assert.match(racing, /id="announcement"/, 'Film anchor exists');
assert.ok(!racing.includes('replacement promo and press conference will appear here'), 'Obsolete media placeholder removed');

for (const page of ['index.html', 'racing.html']) {
  const html = readFileSync(resolve(root, page), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  assert.match(html, /src="js\/race-experience\.js/, `${page}: player/motion enhancement loaded`);
  for (const match of html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (/^(https?:|mailto:|tel:|data:|\/)/.test(target)) continue;
    assert.ok(existsSync(resolve(root, target)), `${page}: local reference exists: ${target}`);
  }
}
const mediaSize = statSync(resolve(root, 'assets/video/team-zia-follow-us.mp4')).size;
assert.ok(mediaSize > 1_000_000 && mediaSize < 40_000_000, 'Website video has expected nonempty size');
assert.ok(existsSync(resolve(root, 'home-full.html')), 'Business homepage preserved');
console.log('PASS: native player, safe loading, full-frame fit, tablet breakpoint, homepage anchor, local references, media size and preserved homepage');
