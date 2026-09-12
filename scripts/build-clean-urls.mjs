// Root HTML files remain editable sources and backward-compatible entry points.
// Run after editing a page; commit the generated directory index files for Pages.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html'));
const clean = name => name === 'index.html' ? '/' : `/${name.slice(0, -5)}/`;
for (const name of pages) {
  const source = path.join(root, name);
  let html = fs.readFileSync(source, 'utf8');
  for (const page of pages) {
    html = html.replaceAll(`href="${page}`, `href="${clean(page)}`)
      .replaceAll(`https://lbaeroflight.com/${page}`, `https://lbaeroflight.com${clean(page)}`);
  }
  html = html.replaceAll('js/main.js?v=2', 'js/main.js?v=3');
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `  <link rel="canonical" href="https://lbaeroflight.com${clean(name)}" />\n</head>`);
  }
  fs.writeFileSync(source, html);
  if (name === 'index.html') continue;
  // Absolute local resource paths work from nested clean routes. Keep # anchors local.
  const generated = html.replace(/\b(href|src|poster|action)="(?![a-z][a-z\d+.-]*:|\/|#)([^"\s]+)"/gi, '$1="/$2"')
    .replace(/\bsrcset="([^"]+)"/gi, (_, value) => `srcset="${value.split(',').map(candidate => candidate.trim().replace(/^(?![a-z][a-z\d+.-]*:|\/)/i, '/')).join(', ')}"`)
    .replace(/url\((['"]?)(?![a-z][a-z\d+.-]*:|\/|#)([^)'"\s]+)\1\)/gi, 'url($1/$2$1)');
  const directory = path.join(root, name.slice(0, -5));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), generated);
}
console.log(`Generated ${pages.length - 1} clean routes; legacy HTML entry points preserved.`);
