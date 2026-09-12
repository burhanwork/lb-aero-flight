import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root = process.cwd();
const names = fs.readdirSync(root).filter(n => n.endsWith('.html'));
for (const name of names) {
  const route = name === 'index.html' ? '/' : `/${name.slice(0,-5)}/`;
  const file = name === 'index.html' ? name : `${name.slice(0,-5)}/index.html`;
  const html = fs.readFileSync(path.join(root,file),'utf8').replace(/<!--[\s\S]*?-->/g, '');
  assert.ok(html.includes(`rel="canonical" href="https://lbaeroflight.com${route}"`), file);
  assert.ok(!/href="[^"#?]*\.html(?:[#?"])/.test(html), `No HTML navigation: ${file}`);
  for (const [,value] of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(value)) continue;
    const target = value.split(/[?#]/)[0];
    let local = path.join(root, target.startsWith('/') ? target : path.join(path.dirname(file),target));
    if (target.endsWith('/')) local = path.join(local,'index.html');
    assert.ok(fs.existsSync(local), `${file}: ${value}`);
  }
  let redirected;
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/main.js'),'utf8'), {
    window: { location: { pathname: `/${name}`, search:'?source=test', hash:'#press-conference', replace: value => redirected=value } }
  });
  assert.equal(redirected, `${route}?source=test#press-conference`);
}
console.log(`PASS: ${names.length} clean routes, canonical links, resource paths, legacy redirects and retained query/hash.`);
