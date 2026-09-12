// Regression: ISSUE-002 — pausing during play startup showed a false failure.
// Found by /qa on 2026-09-13.
// Report: .gstack/qa-reports/qa-report-conference-2026-09-13.md
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../js/race-experience.js', import.meta.url), 'utf8');
async function scenario(name, mediaError = null) {
  const handlers = {};
  const cover = { hidden: true, addEventListener: (event, fn) => { handlers[event] = fn; } };
  const status = { hidden: true, textContent: '' };
  const video = { paused: true, error: mediaError, controls: true, addEventListener() {}, play: async () => { throw Object.assign(new Error('test'), { name }); } };
  const frame = { querySelector: selector => selector === 'video' ? video : cover, parentElement: { querySelector: () => status } };
  vm.runInNewContext(code, { document: { querySelectorAll: () => [frame] }, window: { matchMedia: () => ({ matches: true }) } });
  await handlers.click();
  return { status, cover, video };
}
assert.equal((await scenario('AbortError')).status.hidden, true, 'User pause is not a playback error');
assert.equal((await scenario('NotSupportedError')).status.hidden, false, 'Unsupported media displays fallback');
assert.equal((await scenario('AbortError', { code: 3 })).status.hidden, false, 'Actual media errors still display fallback');
console.log('PASS: interrupted playback and genuine playback failure states');
