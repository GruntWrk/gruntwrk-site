# German localization and city-page retirement

The site now publishes 19 real pages per language under /en, /pt and /de: 57 public URLs in total. German content includes the homepage, contact, audience, service and comparison pages, with localized titles/descriptions, canonical URLs, reciprocal language alternates, structured data and sitemap entries.

The Cities dropdown and city-specific page generators have been removed. Services remains. The 96 historical city and city-service URLs permanently redirect to the corresponding service or provider landing page; old city pages are absent from the sitemap. Future countries do not require duplicate city landing pages.

First-visit country defaults use Vercel's x-vercel-ip-country header: PT -> Portuguese; DE -> German; otherwise English. Explicit language URLs and the shared gw_locale cookie override geography. App links carry lang to retain the chosen language between products.

## Verification on 14 September 2026

- npm run build passed with static generation for all localized pages.
- npm run test:localization passed.
- node scripts/test-localization.cjs http://localhost:3101 crawled all 57 pages and 96 redirects, checking response status, HTML language, canonical URLs, alternate links, navigation and internal destinations.
- German home/service views checked in desktop and phone layouts; long button labels wrap within the viewport.

Use the same crawl command with https://www.gruntwrk.com to check a release after Vercel deployment. Add content through lib/seoPages.ts and locale dictionaries so route/alternate/sitemap coverage stays aligned.
