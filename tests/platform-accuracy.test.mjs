import fs from 'node:fs';
import assert from 'node:assert/strict';

for (const file of ['platform.html', 'platform/index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes('platform-interior.jpg'), `${file}: inaccurate cockpit must stay removed`);
  assert.ok(!html.includes('2.5+ Hours'), `${file}: obsolete mission duration`);
  assert.match(html, /1 hour or less/);
  assert.match(html, /Tandem seating places the pilot and instructor\s+one behind the other/);
  assert.match(html, /MISSION DURATION/);
  const gallery = html.match(/<ul class="plat-gallery">([\s\S]*?)<\/ul>/)[1];
  assert.equal([...gallery.matchAll(/<li>/g)].length, 3);
}
console.log('PASS: both Platform routes remove the inaccurate cockpit and show tandem seating and client-specified typical mission duration.');
