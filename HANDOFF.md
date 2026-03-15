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
- Single-page (or minimal-page) marketing site linking to the GruntWrk app
- Hero section, feature highlights, app store / PWA install prompt, reviews/ratings panel
- Goal: convert visitors → app installs or sign-ups

## 3. Technical Stack
- Frontend: Next.js 14 (App Router), React 18, TypeScript
- No Tailwind — custom CSS in `app/globals.css`
- No backend / Supabase — static/marketing content only
- Deployment: Vercel (assumed, same org as app repo)

## 4. Architecture Notes
- Structure: `app/page.tsx` (full multi-section page, all inline), `app/layout.tsx`, `app/globals.css`
- `AboutModal.tsx` and `InstallPrompt.tsx` are retired — no longer imported
- Static assets in `public/` (brand, icons, wallpaper, screenshots/)
- `public/screenshots/screen1-5.jpg` — app screenshots shown in phone frame section
- Scroll reveal via IntersectionObserver in `useEffect` — no external deps
- Keep architecture updates here only when fundamentals change

## 5. Environment and Operations
- No `.env` required (static marketing site)
- `npm run dev` — runs locally on port 3000
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
- 6c2fb8e How it works: replace icons with big bold numbered steps
- 71a3a6a CTA button: near-solid green bg (0.85), white text
- ae29b6d CTA button: increase opacity (0.15->0.30 normal, 0.25->0.40 hover)
- 1424a2c CTA button: shift tint to match logo green (#22c55e)
- 2e1d399 CTA button: match app style (pale mint bg, dark green text, rounded corners)
- b7658d2 Footer: match header logo size/style, fix copy, remove duplicate brand text
- 71b2456 Add app screenshots and remove copyright notice
- f359215 Redesign: full multi-section light-mode marketing site
- e72baa3 Mobile: fix reviews panel centering
- 4a91f3a Mobile: re-center hero and nudge content up; keep reviews centered

## 10. What Was Done in the Last Session
- Date: 2026-03-08
- Summary: Polish pass on site copy, footer, CTA button, and "How it works" section. Also fixed multiple unregistered-user visibility bugs in the app repo.

**Site repo (`gruntwrk-site`) — files changed:**
- `app/page.tsx` — Removed "· 3 reviews" from Early Access label. Fixed mission quote ("Grunt work" → "GruntWrk"). Footer: replaced `<img>` G logo with inline SVG matching nav (green `#22c55e`, stroke weight). Removed duplicate "GruntWrk" text from footer bottom. "How it works" section: replaced icon tiles with big bold numbered steps (1/2/3) in a flex-row layout.
- `app/globals.css` — Footer brand: matched nav size (24px, weight 900, letter-spacing -0.03em, gap 4px). CTA `.btnPrimary`: iterated from pale mint → brand-green tint → 85% opacity green with white text, 16px border-radius, no shadow. `.howCard` restructured to flex-row; `.howIcon` replaced with `.howNum` (64px / 900 weight / brand green); added `.howCardBody`.

**App repo (`gruntwrk-app`) — bugs fixed:**
- `components/Header.tsx` — Replaced `<img>` G logo with inline SVG (stroke/fill `#22c55e`); font-weight 700→900, letter-spacing -0.02em→-0.03em.
- `app/api/storage/job-image-signed/route.ts` — Removed auth gate so unauthenticated users can get signed image URLs.
- `app/notice-board/feed/route.ts` — Changed `baseJobsQuery` and `baseNoticesQuery` from `supabase` to `db` (admin client) so RLS doesn't block jobs for unauthenticated users.
- `app/auctions/[id]/data/route.ts` — Added second admin fallback for anonymous users when Supabase RLS silently returns null (no error, no data), fixing "Not found" on job detail pages for unregistered users.

**Key decisions:**
- CTA button final style: `rgba(34,197,94,0.85)` bg, white text, 16px radius — matches app's "Open" button aesthetic
- "How it works" numbered steps: `.howNum` 64px/900 brand green, `.howCardBody` stacked title+desc, card is flex-row with gap 20px
- Footer G uses same inline SVG path as nav — ensures consistent stroke-weight rendering on dark bg
- Supabase RLS silently returns null (not an error) when blocking anonymous reads — always add explicit admin fallback for anon users

## 11. Pending / Next Work
- [ ] Add real App Store and Play Store links when apps are published (replace disabled badges)
- [ ] Mobile responsiveness pass — hero brand/logo size on very small screens, phone frame scroll
- [ ] Consider adding a 4th review card once more early-access feedback arrives
- [ ] Delete `app/AboutModal.tsx` and `app/InstallPrompt.tsx` (retired, still on disk)
