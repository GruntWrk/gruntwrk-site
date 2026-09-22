# Scandinavian design rollout, 22 September 2026

The approved homepage mockup is applied through `app/scandinavian.css`, imported by the root layout so every route receives the same typography, surfaces, button treatment and brand text. The logo mark is unchanged. Local font assets and the approved decorative hero image are in `public/design`.

The homepages use the approved two-line heading in English, Portuguese and German. Existing provider information and registration links are available under About. The app also exposes its existing About modal in the signed-out mobile header.

## Scope and preservation

- Route definitions, redirects, locale handling and destination builders are unchanged.
- Existing CTA tracking, form handlers, API routes, authentication, job lifecycle, payments, notifications and database policies are unchanged.
- Provider registration retains the original destination. The website fee comparison remains accessible in About.
- Mobile bottom navigation retains all destinations and active-state logic. Only its presentation changes.
- Dark mode, focus indicators, reduced-motion rules, status colours, maps and avatar shapes remain supported.

## Validation

- Both production builds pass, including TypeScript validation.
- The app's complete `npm run test:release` suite passes: release source, reminder stages, Stripe fees, private access/reviews, locations, localization and job entry.
- All 57 generated website pages across EN/PT/DE return HTTP 200. All 57 internal page destinations resolve to generated routes.
- All 96 existing literal website redirects retain their HTTP status and destination.
- 24 public app route/locale combinations return HTTP 200: home, login, new request, terms, privacy, cookies, trust and contact in each language.
- JSX destination comparison against the starting main branches preserves the existing href/action expressions, including the relocated provider links.
- Browser checks cover the homepage, German service page, provider disclosure, sign-in/signup tabs, and light/dark form colours, including narrow mobile widths.

## Release boundary

This is a source change prepared for review, not a production deployment. App build and public-page checks use a placeholder Supabase endpoint, without production credentials. Authenticated customer/provider workflows and native iOS/Android packaging have not been exercised end to end. Run those in the configured staging environment before release. Do not create live jobs or send customer emails as tests.

Use the repository's existing PR/Git release process. Preserve the app's release guards and current production ancestry. Rollback is a revert of the presentation changes; no database migration is involved.
