import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const racing = readFileSync(new URL('../racing.html', import.meta.url), 'utf8');
assert.equal((home.match(/class="home-story"/g) || []).length, 3);
assert.ok(home.indexOf('id="latest-coverage"') < home.indexOf('class="race-section mission-section"'));
assert.ok(!home.includes('Two operational L-29 jets'));
for (const match of home.matchAll(/href="\/racing\/#([^" ]+)"/g)) {
  assert.ok(racing.includes(`id="${match[1]}"`), `Working racing anchor: ${match[1]}`);
}
for (const match of home.matchAll(/src="(assets\/[^"?]+)(?:\?[^\"]*)?"/g)) {
  assert.ok(existsSync(new URL('../' + match[1], import.meta.url)), `Existing asset: ${match[1]}`);
}
assert.equal((racing.match(/class="btn btn-outline race-film-download"/g) || []).length, 5);
console.log('PASS: three real coverage stories, valid destinations/assets, five video downloads');
