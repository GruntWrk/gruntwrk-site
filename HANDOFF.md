# HANDOFF - GruntWrk Site Project Context

This file is the canonical session hand-off document for this repository.
Use `/handoff` at the start of a session and `/handoff-save` at the end.

## 1. Project Identity
- Name: GruntWrk Site (Marketing / Landing Site)
- Product summary: Public-facing marketing website for GruntWrk — drives app installs and sign-ups.
- Main repo path: `c:/dev/gruntwrk-site`
- GitHub: https://github.com/GruntWrk/gruntwrk-site
- Related app repo: `c:/dev/gruntwrk-app` (the main Next.js marketplace app)

## 2. Product Scope and Core Flows
- Multi-page marketing site with homepage + 60 SEO pages (city, service, city-service, city-provider, audience, comparison; EN + PT)
- Hero section, feature highlights, app store / PWA install prompt, reviews/ratings panel
- SEO pages: city pages (Lisbon, Porto), service pages (6 categories), city-service combos
- Goal: convert visitors to app installs or sign-ups via organic search and Google Ads

## 3. Technical Stack
- Frontend: Next.js 14 (App Router), React 18, TypeScript
- No Tailwind — custom CSS in `app/globals.css`
- No backend / Supabase — static/marketing content only
- Deployment: Vercel (assumed, same org as app repo)

## 4. Architecture Notes
- Homepage: `app/[locale]/HomePage.tsx` (multi-section page with sub-nav)
- SEO pages: `app/[locale]/[...slug]/page.tsx` (dynamic catch-all for city/service routes)
- Shared chrome: `app/[locale]/SiteChrome.tsx` (header, sub-nav with dropdowns, footer)
- Scroll reveal: `app/[locale]/[...slug]/SeoReveal.tsx` (client component, IntersectionObserver)
- SEO data: `lib/seoPages.ts` (all city/service page data, copy, nav items, stats, benefits, FAQs)
- Schema: `lib/schema.ts` (JSON-LD builders for breadcrumbs, service, FAQ)
- Tracking: `lib/googleTag.ts` + `app/TrackedCtaLink.tsx` (GA4 gtag.js, CTA event tracking)
- i18n: `lib/dictionaries/en.json` and `lib/dictionaries/pt.json`
- Static assets in `public/` (brand, icons, wallpaper, screenshots/, videos/)
- `public/videos/gruntwrk-explained.mp4` -- NotebookLM explainer video (8MB, served via Vercel CDN)
- `public/googlea014e3ac31b89578.html` -- Search Console verification file
- `AboutModal.tsx` and `InstallPrompt.tsx` are retired -- no longer imported
- Keep architecture updates here only when fundamentals change

## 5. Environment and Operations
- `npm run dev` -- runs locally on port 3000
- Vercel env vars (production):
  - `NEXT_PUBLIC_GOOGLE_TAG_ID=G-X2LDTX132Q` (GA4 measurement ID)
  - `NEXT_PUBLIC_GOOGLE_ADS_CUSTOMER_REQUEST_SEND_TO` (optional, for direct Ads conversion)
  - `NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SIGNUP_SEND_TO` (optional, for direct Ads conversion)
- `.env.example` documents all env vars
- Do not commit node_modules or generated dumps

## 6. Coding Conventions
- TypeScript-first changes
- Prefer small, reviewable commits
- Match GruntWrk brand: cream/green/black palette, clean sans-serif, no heavy shadows
- Consistent with app repo style guide where relevant (8px card radius, 700 max font-weight, warm off-white bg `#f0eeea`)

## 7. Known Constraints and Risks
- Context can be lost between chats unless this file is kept current
- Keep this file concise but complete enough to restart work quickly
- Changes here should stay in sync with brand/visual identity in the app repo

## 8. Session-to-Session Working Rules
- Update Sections 9-11 every session via `/handoff-save`
- Leave Sections 1-8 unchanged unless fundamentals truly changed
- Track concrete next actions in Section 11

## 9. Recent Git History
- e4744d3 App: add GA4 tracking for full funnel visibility and sign_up conversion event
- 13ac562 Site: add provider landing pages and fix profile copy
- 5a41e8e Site: infer Google Ads tag destination from send_to
- c1b7892 Site: add Google tag CTA tracking
- 0ba0032 Site: add Search Console verification file
- c3c0c12 Site: add top padding between sub-nav and hero on homepage
- 8b9a6b9 Site: add city/service SEO pages with redesigned frontend
- a6831c1 Site: clean retired files and align fee docs
- f85c389 Site: add explainer video section, remove X and TikTok socials
- 8b51a22 Site: remove "customers pay less" perk and payment steps reference

## 10. What Was Done in the Last Session
- Date: 2026-04-02
- Summary: GA4 conversion tracking diagnosis and full-funnel fix. Discovered app had zero GA4 integration. Added GA4 to the app so actual sign-up conversions are tracked end-to-end.

**Conversion Tracking Diagnosis (GA4 Events report, last 28 days):**
- provider_signup_click: 9 events, 6 users (tracking confirmed working on site)
- customer_request_click: 5 events, 4 users (tracking confirmed working on site)
- Only 7 event types total -- no downstream sign_up or registration events
- Root cause: gruntwrk-app had zero GA4 integration; uses Supabase custom analytics only
- Impact: Google Ads was optimising for button clicks, not actual registrations

**GA4 Added to gruntwrk-app (commit e4744d3):**
- `lib/googleTag.ts` -- new: GA4 utility with fireGtagEvent() and cross-domain linker
- `app/layout.tsx` -- gtag.js script added to head, same G-X2LDTX132Q property as site
- `app/login/page.tsx` -- fires sign_up GA4 event when new user detected after OTP verify (profile incomplete = first-time registration)
- `NEXT_PUBLIC_GOOGLE_TAG_ID=G-X2LDTX132Q` env var set in Vercel (All Environments)

**Cross-Domain Tracking Configured in GA4:**
- GA4 Admin > Data streams > Configure tag settings > Configure your domains
- Rule added: Contains gruntwrk.com (covers both www.gruntwrk.com and app.gruntwrk.com)
- Google Ads click attribution (_gl parameter) now carries over from site to app

**Fixes also applied this session (from previous session carry-over):**
- provider_signup_click promoted from Secondary to Primary conversion action in Google Ads
- provider_signup_click (1) inactive duplicate removed from Google Ads

**Key decisions:**
- Use same GA4 property (G-X2LDTX132Q) for both site and app -- one dashboard for full funnel
- sign_up fires only on new users (profile incomplete check), not returning sign-ins
- Cross-domain linker configured both in gtag config and in GA4 Admin settings

## 11. Pending / Next Work

**GA4 / Conversion tracking (action when first sign_up fires):**
- [ ] Mark sign_up as a Key Event in GA4 (Admin > Events > star it when it appears in Recent Events)
- [ ] Import sign_up Key Event into Google Ads as a conversion action (replace provider_signup_click as primary once data accumulates)
- [ ] Switch provider campaign to Maximize Conversions once 15+ sign_up conversions recorded

**Google Ads (monitor and optimize):**
- [ ] Monitor provider campaign performance (clicks, CTR, search terms report weekly)
- [ ] Review search terms report for both campaigns -- add negatives as needed
- [ ] Consider campaign-specific conversion goal on provider campaign (Sign-up only)
- [ ] Consider expanding provider campaign to Porto once Lisbon validates demand
- [ ] Use the EUR 400 Google Ads promo credit (spend EUR 400 by 28 May 2026 for EUR 400 credit)
- [ ] Complete Google Ads advertiser identity verification before 2026-05-02 deadline

**LinkedIn jobs (paused -- blocked on email verification):**
- [ ] Get 6-digit code from service@gruntwrk.com to complete first LinkedIn job posting (draft jobId=4395347212, Cleaning Professional, EN, URL: https://www.gruntwrk.com/en/lisbon/work)
- [ ] Post remaining 5 EN jobs (Plumber, Electrician, Handyman, Painter, Moving & Removals) at https://www.gruntwrk.com/en/lisbon/work
- [ ] Post 6 PT jobs at https://www.gruntwrk.com/pt/lisboa/trabalho

**SEO / Marketing (monitor weekly):**
- [ ] Check Search Console Performance tab for impressions/clicks on PT pages
- [ ] Implement GDPR consent mode for EEA/Portugal (Google flagged it, not blocking yet)
- [ ] Do NOT add more SEO pages until Search Console shows which existing pages get traction

**Site improvements:**
- [ ] Add real App Store and Play Store links when apps are published (replace disabled badges)
- [ ] Mobile responsiveness pass on SEO pages (test sub-nav dropdowns on small screens)
- [ ] NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SIGNUP_SEND_TO in site Vercel is now redundant (direct Ads tag removed); consider removing to avoid confusion
