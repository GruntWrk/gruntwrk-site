const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function load(relative) {
  const file = path.join(root, relative), record = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(source, { exports: record.exports, module: record, Date, URL, URLSearchParams, console, require(name) {
    if (!name.startsWith('.')) return require(name);
    let target = path.resolve(path.dirname(file), name);
    if (target.endsWith('.json')) return JSON.parse(fs.readFileSync(target, 'utf8'));
    if (!path.extname(target)) target += '.ts';
    return load(path.relative(root, target));
  } }, { filename: file });
  return record.exports;
}
async function main() {
  const i18n = load('lib/i18n.ts'), seo = load('lib/seoPages.ts');
  const pages = seo.getSeoPages();
  assert.equal(pages.length, 51);
  for (const locale of ['en', 'pt', 'de']) {
    assert.equal(pages.filter(page => page.locale === locale).length, 17);
    assert.deepEqual(Object.keys(seo.getSeoNavItems(locale, '/' + locale)), ['services']);
  }
  const byPath = new Map(pages.map(p => [p.path, p]));
  for (const page of pages) {
    assert.ok(page.title && page.description && page.heroTitle && page.sections.length);
    for (const locale of ['en', 'pt', 'de']) {
      const other = byPath.get(new URL(page.alternates[locale]).pathname);
      assert.ok(other, page.path + ' alternate ' + locale);
      assert.equal(other.id, page.id); assert.equal(other.locale, locale);
      assert.equal(other.alternates[page.locale], 'https://www.gruntwrk.com' + page.path);
    }
    const nav = seo.getSeoNavItems(page.locale, page.path);
    for (const item of nav.services) assert.ok(byPath.has(item.href), item.href);
    assert.ok(!page.kind.includes('city'));
  }
  const sitemap = load('app/sitemap.ts').default();
  assert.equal(sitemap.length, 57); assert.equal(new Set(sitemap.map(x => x.url)).size, 57);
  for (const item of sitemap) for (const locale of ['en', 'pt', 'de']) assert.ok(item.alternates.languages[locale]);
  function keys(x) { return Object.keys(x).sort(); }
  function compare(a, b, label = '') { assert.deepEqual(keys(a), keys(b), label); for (const key of keys(a)) if (a[key] && typeof a[key] === 'object') compare(a[key], b[key], label + '.' + key); }
  compare(i18n.getDictionary('en'), i18n.getDictionary('de'));
  const { middleware } = load('middleware.ts'), { NextRequest } = require('next/server');
  for (const [country, locale] of [['DE', 'de'], ['PT', 'pt'], ['FR', 'en'], ['AT', 'en'], ['GB', 'en']]) {
    const response = middleware(new NextRequest('https://www.gruntwrk.com/?ref=fixture', { headers: { 'x-vercel-ip-country': country, 'accept-language': 'pt-PT' } }));
    assert.equal(new URL(response.headers.get('location')).pathname.replace(/\/$/, ''), '/' + locale);
    assert.equal(new URL(response.headers.get('location')).searchParams.get('ref'), 'fixture');
  }
  const saved = middleware(new NextRequest('https://www.gruntwrk.com/', { headers: { 'x-vercel-ip-country': 'DE', cookie: 'gw_locale=pt' } }));
  assert.equal(new URL(saved.headers.get('location')).pathname.replace(/\/$/, ''), '/pt');
  const explicit = middleware(new NextRequest('https://www.gruntwrk.com/de/dienstleistungen', { headers: { cookie: 'gw_locale=pt' } }));
  assert.equal(explicit.headers.get('location'), null); assert.match(explicit.headers.get('set-cookie'), /gw_locale=de/);
  const redirects = await require('../next.config.js').redirects();
  assert.equal(redirects.length, 96);
  for (const redirect of redirects) { assert.equal(redirect.permanent, true); assert.ok(byPath.has(redirect.destination), redirect.destination); assert.ok(!byPath.has(redirect.source)); }
  console.log('PASS 51 SEO pages, 57 sitemap URLs, reciprocal EN/PT/DE alternates, country defaults, saved choices and 96 legacy redirects');
  // Optional integration crawl of a built local server or the production site.
  const base = process.argv[2];
  if (base) {
    const bodies = new Map();
    for (const item of sitemap) {
      const pathname = new URL(item.url).pathname, locale = pathname.split('/')[1];
      const response = await fetch(new URL(pathname, base)); const html = await response.text();
      assert.equal(response.status, 200, pathname); assert.match(html, new RegExp('<html[^>]+lang="' + locale + '"'), pathname);
      assert.ok(html.includes('rel="canonical" href="' + item.url + '"'), pathname + ' canonical');
      for (const other of ['en', 'pt', 'de']) assert.ok(html.includes('hrefLang="' + other + '"'), pathname + ' ' + other);
      assert.doesNotMatch(html, /<summary[^>]*>\s*(Cities|Cidades|Städte)\b/, pathname);
      assert.ok(html.includes('lang=' + locale), pathname + ' localized app link');
      bodies.set(pathname, html);
    }
    for (const [pathname, html] of bodies) {
      for (const match of html.matchAll(/href="(\/(?:en|pt|de)(?:\/[^"?#]*)?)(?:[?#][^"]*)?"/g)) assert.ok(bodies.has(match[1]), pathname + ' broken link ' + match[1]);
    }
    for (const redirect of redirects) {
      const response = await fetch(new URL(redirect.source + '?ref=fixture', base), { redirect: 'manual' });
      assert.ok([301, 308].includes(response.status), redirect.source);
      assert.equal(new URL(response.headers.get('location'), base).pathname, redirect.destination);
    }
    console.log('PASS rendered pages, canonical links, language alternates, internal links and all legacy redirects at ' + base);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
