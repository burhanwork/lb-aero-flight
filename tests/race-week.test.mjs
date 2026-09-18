import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../racing.html',import.meta.url),'utf8');
const section=html.split('id="race-week-films"')[1].split('</section>')[0];
assert.equal((section.match(/<video /g)||[]).length,2);
assert.ok(html.indexOf('id="race-week-films"')<html.indexOf('id="latest-from-roswell"'));
for(const video of section.matchAll(/<video[\s\S]*?<\/video>/g)) {
  for(const attr of ['controls','playsinline','preload="none"','aria-describedby=']) assert.ok(video[0].includes(attr));
  assert.ok(!video[0].includes('autoplay'));
  assert.ok(video[0].includes('/releases/download/team-zia-race-week-2026/'));
}
assert.ok(!/drive\.google|separate player|\d+:\d+/.test(section));
const videos=[0,1].map(()=>({paused:false,controls:true,handlers:{},pause(){this.paused=true;},addEventListener(event,fn){this.handlers[event]=fn;}}));
const frames=videos.map(video=>({querySelector:s=>s==='video'?video:{hidden:true,addEventListener(){}},parentElement:{querySelector:()=>({hidden:true})}}));
vm.runInNewContext(readFileSync(new URL('../js/race-experience.js',import.meta.url),'utf8'),{document:{querySelectorAll:s=>s==='.zia-video-frame'?frames:videos},window:{matchMedia:()=>({matches:true})}});
videos[0].handlers.play();
assert.equal(videos[1].paused,true,'Starting one film pauses the other');
assert.equal(videos[0].paused,false);
console.log('PASS: two approved original films, preserved gallery, safe loading and exclusive playback');
