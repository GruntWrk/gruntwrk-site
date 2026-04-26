"use client";

import { type CSSProperties, type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { TrackedCtaLink } from "../TrackedCtaLink";
import type { Dictionary, Locale } from "../../lib/i18n";
import { LOCALES, SITE_URL } from "../../lib/i18n";
import type { SeoNavItem } from "../../lib/seoPages";
import { SiteBottomNav } from "./SiteChrome";

const APP_BASE_URL = "https://app.gruntwrk.com";
const HOME_HREF = APP_BASE_URL;
const LOGIN_HREF = appHref("/login");
const REQUEST_SERVICE_HREF = appHref("/jobs/new");
const SEARCH_PROVIDERS_HREF = appHref("/directory?search=1");
const PROVIDER_HREF = loginHref("/provider/profile");
const MARQUEE_BG = `${APP_BASE_URL}/Marquee%20Background.png`;

const CATEGORY_IMAGES: Record<string, string> = {
  cleaning: `${APP_BASE_URL}/images/categories/cleaning.png`,
  "furniture-assembly": `${APP_BASE_URL}/images/categories/furniture-assembly.png`,
  "mounting-installation": `${APP_BASE_URL}/images/categories/mounting-installation.png`,
  "moving-lifting": `${APP_BASE_URL}/images/categories/moving-lifting.png`,
  "home-repairs": `${APP_BASE_URL}/images/categories/home-repairs.png`,
  outdoor: `${APP_BASE_URL}/images/categories/outdoor.png`,
  electrical: `${APP_BASE_URL}/images/categories/electrical.png`,
  plumbing: `${APP_BASE_URL}/images/categories/plumbing.png`,
  "painting-decor": `${APP_BASE_URL}/images/categories/painting-decor.png`,
  "removal-disposal": `${APP_BASE_URL}/images/categories/removal-disposal.png`,
};

const AUTO_ADVANCE_MS = 3000;
const STACK_PAUSE_MS = 4200;
const USER_IDLE_MS = 8000;

const LOCALES_TOGGLE: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

function loginHref(next: string) {
  return `${APP_BASE_URL}/login?next=${encodeURIComponent(next)}`;
}

function appHref(path: string) {
  return `${APP_BASE_URL}${path}`;
}

function appHrefWithLocale(path: string, locale: Locale) {
  const url = new URL(`${APP_BASE_URL}${path}`);
  url.searchParams.set("lang", locale);
  return url.toString();
}

function categoryHref(slug: string) {
  return appHref(`/jobs/new?category=${encodeURIComponent(slug)}`);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true">
      <path
        d="M 511 176 L 186 502 L 512 827 L 837 501 L 650 315 L 466 499 L 530 566 L 647 451 L 707 511 L 525 693 L 335 503 L 586 252 Z"
        fill="#22c55e"
        stroke="#22c55e"
        strokeWidth="40"
        strokeLinejoin="round"
        style={{ paintOrder: "stroke fill" }}
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="btnIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="perkIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function BenefitIcon({ id }: { id: string }) {
  if (id === "cheaper") {
    return (
      <svg className="hp-cb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  if (id === "trust") {
    return (
      <svg className="hp-cb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg className="hp-cb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
      <path d="M6 16h4" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={filled ? "star starFilled" : "star"}>
      <path d="M12 17.27l-5.18 3.05 1.4-5.92L3 9.24l6.06-.52L12 3l2.94 5.72 6.06.52-5.22 5.16 1.4 5.92L12 17.27z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= count} />
      ))}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg className="storeBadgeIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg className="storeBadgeIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.35.2.76.2 1.1.02l11.37-6.49-2.49-2.49-9.98 8.96zm-1.1-20.7C2.03 3.24 2 3.5 2 3.77v16.46c0 .27.03.53.08.77l10.03-9.03-9.03-8.91zM20.37 9.9l-2.35-1.34-2.79 2.51 2.79 2.51 2.37-1.35c.68-.38.68-1.35-.02-1.33zM4.28.22C3.94.04 3.53.04 3.18.24l9.95 8.97 2.49-2.49L4.28.22z" />
    </svg>
  );
}

function WorkbenchIcon({ id }: { id: string }) {
  if (id === "quotes") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6h16" />
        <path d="M4 12h10" />
        <path d="M4 18h7" />
        <path d="m17 15 2 2 3-4" />
      </svg>
    );
  }

  if (id === "book") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 11.5 10.5 14 16 8.5" />
        <path d="M5 4h14l1 4-2 12H6L4 8l1-4Z" />
      </svg>
    );
  }

  if (id === "message") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 18.5 3 21V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7Z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7h18v10H3z" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

function BlurredCompetitors({ names }: { names: string[] }) {
  return (
    <div className="hp-fee-market-list" aria-label="Example competitor marketplaces">
      {names.map((name) => (
        <span key={name} className="hp-fee-market-badge hp-fee-market-badge-blur">
          {name}
        </span>
      ))}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function HeroPreviewCard({ dict }: { dict: Dictionary }) {
  const preview = (dict as any).heroPreview as
    | {
        stage?: string;
        status?: string;
        jobTitle?: string;
        jobMeta?: string;
        badgeOne?: string;
        badgeTwo?: string;
      }
    | undefined;

  return (
    <div className="hp-hero-preview">
      <div className="hp-hero-preview-card">
        <div className="hp-preview-progress" aria-hidden="true">
          <span className="hp-preview-progress-bar is-done" />
          <span className="hp-preview-progress-bar is-done" />
          <span className="hp-preview-progress-bar is-live" />
        </div>
        <div className="hp-preview-header">
          <span className="hp-preview-stage">{preview?.stage ?? "Step 3 of 3"}</span>
          <span className="hp-preview-dot hp-preview-dot-green" />
          <span className="hp-preview-status">{preview?.status ?? "Quotes are arriving"}</span>
        </div>
        <div className="hp-preview-job">
          <span className="hp-preview-job-title">{preview?.jobTitle ?? "Kitchen deep clean"}</span>
          <span className="hp-preview-job-meta">{preview?.jobMeta ?? "5 companies selected"}</span>
        </div>
        <div className="hp-preview-quotes">
          <div className="hp-preview-quote hp-preview-quote-top">
            <div className="hp-preview-avatar">A</div>
            <div className="hp-preview-quote-info">
              <span className="hp-preview-name">Ana M.</span>
              <Stars count={5} />
            </div>
            <span className="hp-preview-price">EUR 45</span>
          </div>
          <div className="hp-preview-quote">
            <div className="hp-preview-avatar">R</div>
            <div className="hp-preview-quote-info">
              <span className="hp-preview-name">Rui S.</span>
              <Stars count={5} />
            </div>
            <span className="hp-preview-price">EUR 52</span>
          </div>
          <div className="hp-preview-quote">
            <div className="hp-preview-avatar">J</div>
            <div className="hp-preview-quote-info">
              <span className="hp-preview-name">James L.</span>
              <Stars count={4} />
            </div>
            <span className="hp-preview-price">EUR 48</span>
          </div>
        </div>
        <div className="hp-preview-footer">
          <span className="hp-preview-free">{preview?.badgeOne ?? "One request"}</span>
          <span className="hp-preview-free">{preview?.badgeTwo ?? "One Workbench"}</span>
        </div>
      </div>
    </div>
  );
}

const HERO_STEP_LABELS = ["Describe", "Review", "Compare"];

function HeroJourney({ dict }: { dict: Dictionary }) {
  return (
    <ol className="hp-hero-journey" aria-label={dict.howItWorks.heading}>
      {dict.howItWorks.steps.map((step, i) => (
        <li key={`hero-step-${step.num}`} className="hp-hero-journey-step">
          <span className="hp-hero-journey-num">{`0${step.num}`}</span>
          <span className="hp-hero-journey-title">{HERO_STEP_LABELS[i] ?? step.title}</span>
        </li>
      ))}
    </ol>
  );
}

// Allow local dev to point the counter at a localhost app. In production
// NEXT_PUBLIC_APP_BASE_URL is unset and we fall back to the hosted app.
const PROVIDER_COUNT_API_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_BASE_URL) ||
  APP_BASE_URL;
const PROVIDER_COUNT_ENDPOINT = `${PROVIDER_COUNT_API_BASE}/api/directory/count`;
const PROVIDER_COUNT_REFRESH_MS = 60_000;

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(value)));
}

// Shared fetch + auto-refresh for the provider-network counts. Both the
// ProviderCounter card and the StatsStrip Locations tile read from this
// single hook so they stay in sync and we only make one request per cycle.
function useProviderNetworkCounts() {
  const [state, setState] = useState<{
    providers: number | null;
    towns: number | null;
    hasError: boolean;
  }>({ providers: null, towns: null, hasError: false });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(PROVIDER_COUNT_ENDPOINT, {
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error(`status_${res.status}`);
        const data = (await res.json()) as { providers?: unknown; towns?: unknown };
        if (cancelled) return;
        setState({
          providers: typeof data.providers === "number" ? data.providers : 0,
          towns: typeof data.towns === "number" ? data.towns : 0,
          hasError: false,
        });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, hasError: true }));
      }
    };

    load();
    const interval = window.setInterval(load, PROVIDER_COUNT_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return state;
}

function StatsStrip({
  liveLocations,
  liveProviders,
}: {
  liveLocations: number | null;
  liveProviders: number | null;
}) {
  const animatedLocations = useCountUp(liveLocations ?? 0, 1200);
  const animatedProviders = useCountUp(liveProviders ?? 0);
  const isReady = liveLocations !== null && liveProviders !== null;

  return (
    <div className="hp-stats-strip" data-reveal>
      <div className="hp-stats-strip-inner">
        <div className="hp-stats-stat">
          <span className="hp-stats-value">
            {isReady ? formatCount(animatedLocations) : "\u2014"}
          </span>
          <span className="hp-stats-label">
            Locations
            {isReady && <span className="hp-stats-live-dot" aria-hidden="true" />}
          </span>
        </div>

        <div className="hp-stats-divider" aria-hidden="true" />

        <div className="hp-stats-stat">
          <span className="hp-stats-value">
            {isReady ? formatCount(animatedProviders) : "\u2014"}
          </span>
          <span className="hp-stats-label">
            Service providers
            {isReady && <span className="hp-stats-live-dot" aria-hidden="true" />}
          </span>
        </div>

        <div className="hp-stats-divider" aria-hidden="true" />

        <div className="hp-stats-stat">
          <span className="hp-stats-value">12</span>
          <span className="hp-stats-label">Categories</span>
        </div>
      </div>
    </div>
  );
}

// Eased count-up from the previously-displayed value to the latest fetched total.
// easeOutCubic keeps the motion fast up-front then settles — feels premium, not
// robotic. Respects prefers-reduced-motion by snapping straight to the target.
function useCountUp(target: number, durationMs = 1600) {
  const [displayed, setDisplayed] = useState(0);
  const previousRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayed(target);
      previousRef.current = target;
      return;
    }

    const start = previousRef.current;
    const delta = target - start;
    if (delta === 0) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = clamp(elapsed / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const next = start + delta * eased;
      setDisplayed(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        previousRef.current = target;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return displayed;
}

function ProviderCounter({
  dict,
  locale,
  providers,
  towns,
  hasError,
}: {
  dict: Dictionary;
  locale: Locale;
  providers: number | null;
  towns: number | null;
  hasError: boolean;
}) {
  const copy = (dict as any).providerCounter as
    | {
        eyebrow: string;
        heading: string;
        townsSuffix: string;
        cta: string;
      }
    | undefined;

  const animatedProviders = useCountUp(providers ?? 0);
  const animatedTowns = useCountUp(towns ?? 0, 1200);

  if (!copy) return null;

  const isReady = providers !== null && !hasError;
  const displayProviders = isReady ? formatCount(animatedProviders) : "—";
  const displayTowns = isReady ? formatCount(animatedTowns) : "—";

  return (
    <section className="hp-provider-counter" data-reveal aria-live="polite">
      <div className="hp-pc-card">
        <div className="hp-pc-inner">
          <div className="hp-pc-eyebrow">
            <span className="hp-pc-live-dot" aria-hidden="true" />
            <span className="hp-pc-eyebrow-text">{copy.eyebrow}</span>
          </div>

          <div className="hp-pc-number-row">
            <span
              className={`hp-pc-number${isReady ? "" : " hp-pc-number-loading"}`}
            >
              {displayProviders}
            </span>
            <span className="hp-pc-number-label">{copy.heading}</span>
          </div>

          <div className="hp-pc-footer">
            <div className="hp-pc-contactable">
              <strong className="hp-pc-contactable-number">
                {displayTowns}
              </strong>
              <span className="hp-pc-contactable-text">{copy.townsSuffix}</span>
            </div>
            <TrackedCtaLink
              href={SEARCH_PROVIDERS_HREF}
              className="hp-pc-cta"
              ctaLocation="home_provider_counter_search"
              locale={locale}
              pageKind="home"
            >
              {copy.cta}
              <ArrowIcon />
            </TrackedCtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ dict }: { dict: Dictionary }) {
  const firstReview = dict.reviews.items[0] as any;
  const lastReview = dict.reviews.items[dict.reviews.items.length - 1] as any;
  return (
    <div className="hp-trust-strip">
      <div className="hp-trust-rating">
        <span className="hp-trust-score">4.8</span>
        <Stars count={5} />
        <span className="hp-trust-label">{dict.reviews.ratingLabel}</span>
      </div>
      <div className="hp-trust-divider" />
      <div className="hp-trust-quotes">
        <div className="hp-trust-quote">
          <Stars count={firstReview.stars} />
          <span className="hp-trust-quote-text">{firstReview.text}</span>
        </div>
        <div className="hp-trust-quote">
          <Stars count={lastReview.stars} />
          <span className="hp-trust-quote-text">{lastReview.text}</span>
        </div>
      </div>
    </div>
  );
}

function LanguageToggle({ current }: { current: Locale }) {
  return (
    <div className="langToggle">
      {LOCALES_TOGGLE.map((loc, i) => (
        <span key={loc.code}>
          {i > 0 && <span className="langSep">{"\u00A0|\u00A0"}</span>}
          {loc.code === current ? (
            <span className="langActive">{loc.label}</span>
          ) : (
            <a href={`/${loc.code}`} className="langLink">
              {loc.label}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

function AppShellHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="appShellHeader">
      <div className="appShellHeaderInner">
        <a href={appHrefWithLocale("", locale)} className="appShellBrand" aria-label="Go to app homepage">
          <BrandMark className="navLogoIcon" />
          <div className="appShellBrandCopy">
            <span className="appShellBrandName">GruntWrk</span>
            <span className="appShellBrandSub">{dict.nav.brandSub}</span>
          </div>
        </a>

        <nav className="appShellHeaderNav" aria-label="Primary navigation">
          <TrackedCtaLink href={SEARCH_PROVIDERS_HREF} className="appShellHeaderNavBtn" aria-label={dict.nav.providers} ctaLocation="home_header_search_providers" locale={locale} pageKind="home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="appShellHeaderNavLabel">{dict.nav.providers}</span>
          </TrackedCtaLink>
          <TrackedCtaLink href={appHref("/jobs/new")} className="appShellHeaderNavBtn" aria-label={dict.nav.jobs} ctaLocation="home_header_request_service" locale={locale} pageKind="home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            <span className="appShellHeaderNavLabel">{dict.nav.jobs}</span>
          </TrackedCtaLink>
          <a href={appHrefWithLocale("/login", locale)} className="appShellHeaderBtn appShellHeaderBtnSecondary">
            {dict.nav.login}
          </a>
        </nav>
      </div>
    </header>
  );
}

function StoreBadges({ dict }: { dict: Dictionary }) {
  return (
    <div className="storeBadges">
      <div className="storeBadge storeBadgeDisabled">
        <AppleIcon />
        <div className="storeBadgeLabels">
          <span className="storeBadgeSmall">{dict.apps.comingSoon}</span>
          <span className="storeBadgeLarge">{dict.apps.appStore}</span>
        </div>
      </div>
      <div className="storeBadge storeBadgeDisabled">
        <GooglePlayIcon />
        <div className="storeBadgeLabels">
          <span className="storeBadgeSmall">{dict.apps.comingSoon}</span>
          <span className="storeBadgeLarge">{dict.apps.googlePlay}</span>
        </div>
      </div>
    </div>
  );
}

function HomeTrustMarquee({ dict, backgroundImage }: { dict: Dictionary; backgroundImage: string }) {
  const points = dict.workbench.points;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resumeTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const slideCount = points.length + 1;

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function goToSlide(index: number, behavior: ScrollBehavior) {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];
    if (!viewport || !slide) return;

    viewport.scrollTo({
      left: slide.offsetLeft,
      behavior,
    });
    setActiveIndex(index);
  }

  function pauseForUser() {
    setUserPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setUserPaused(false), USER_IDLE_MS);
  }

  useEffect(() => {
    if (userPaused) return undefined;

    const delay = activeIndex === slideCount - 1 ? STACK_PAUSE_MS : AUTO_ADVANCE_MS;
    const timer = window.setTimeout(() => {
      const nextIndex = activeIndex === slideCount - 1 ? 0 : activeIndex + 1;
      goToSlide(nextIndex, activeIndex === slideCount - 1 ? "auto" : "smooth");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeIndex, slideCount, userPaused]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const handleScroll = () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        const nextIndex = slideRefs.current.reduce((closestIndex, slide, index) => {
          if (!slide) return closestIndex;

          const currentDistance = Math.abs(viewport.scrollLeft - slide.offsetLeft);
          const closestSlide = slideRefs.current[closestIndex];
          const closestDistance = closestSlide ? Math.abs(viewport.scrollLeft - closestSlide.offsetLeft) : Number.POSITIVE_INFINITY;

          return currentDistance < closestDistance ? index : closestIndex;
        }, 0);

        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      });
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [slideCount]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    pauseForUser();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = clamp(activeIndex + direction, 0, slideCount - 1);
    goToSlide(nextIndex, "smooth");
  }

  return (
    <section
      className="hp-workbench-marquee"
      aria-labelledby="hp-workbench-marquee-title"
      style={
        {
          "--hp-marquee-bg": `linear-gradient(110deg, rgba(13, 22, 18, 0.84) 0%, rgba(13, 22, 18, 0.44) 42%, rgba(13, 22, 18, 0.62) 100%), url("${backgroundImage}")`,
        } as CSSProperties
      }
    >
      <div className="hp-workbench-marquee-frame">
        <div className="hp-workbench-copy">
          <h2 id="hp-workbench-marquee-title" className="hp-workbench-title">
            {dict.workbench.title}
          </h2>
        </div>

        <div className="hp-workbench-stage">
          <div
            ref={viewportRef}
            className="hp-workbench-viewport"
            aria-label={dict.workbench.carouselLabel}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={pauseForUser}
            onTouchStart={pauseForUser}
          >
            <div className="hp-workbench-track">
              {points.map((point, index) => (
                <div
                  key={point.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="hp-workbench-slide"
                >
                  <article className="hp-workbench-card">
                    <div className="hp-workbench-card-icon">
                      <WorkbenchIcon id={point.id} />
                    </div>
                    <div className="hp-workbench-card-copy">
                      <h3 className="hp-workbench-card-title">{point.title}</h3>
                      <p className="hp-workbench-card-desc">{point.desc}</p>
                    </div>
                  </article>
                </div>
              ))}

              <div
                ref={(node) => {
                  slideRefs.current[slideCount - 1] = node;
                }}
                className="hp-workbench-slide hp-workbench-slide-stack"
              >
                <div className="hp-workbench-stack" aria-label={dict.workbench.allLabel}>
                  {points.map((point) => (
                    <article key={`${point.id}-stack`} className="hp-workbench-stack-card">
                      <div className="hp-workbench-card-icon">
                        <WorkbenchIcon id={point.id} />
                      </div>
                      <div className="hp-workbench-card-copy">
                        <h3 className="hp-workbench-card-title">{point.title}</h3>
                        <p className="hp-workbench-card-desc">{point.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hp-workbench-controls">
            <div className="hp-workbench-dots" role="tablist" aria-label="Select carousel slide">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  className={`hp-workbench-dot ${index === activeIndex ? "is-active" : ""}`}
                  aria-label={index === slideCount - 1 ? dict.workbench.allLabel : `Show point ${index + 1}`}
                  aria-selected={index === activeIndex}
                  role="tab"
                  onClick={() => {
                    pauseForUser();
                    goToSlide(index, "smooth");
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gruntwrk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@gruntwrk_official",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 2c.5 3.2 2.6 5.3 6 5.6V11c-1.9 0-3.6-.6-5-1.6V16c0 4-3.1 6-6.3 6c-3.6 0-6.7-3-6.7-6.7c0-3.8 3.1-6.8 6.9-6.8c.4 0 .8 0 1.1.1v3.8c-.3-.1-.6-.2-1-.2c-1.9 0-3.5 1.5-3.5 3.4c0 1.9 1.5 3.5 3.5 3.5c2.1 0 3.3-1.4 3.3-3.8V2h2.7Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/grunt_wrk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.4a1.15 1.15 0 1 1 0 2.3a1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 0 0 12 8.8Z" />
      </svg>
    ),
  },
];

export default function HomePage({ dict, locale, nav }: { dict: Dictionary; locale: Locale; nav: { cities: SeoNavItem[]; services: SeoNavItem[] } }) {
  const categories = dict.categories;
  const reviews = dict.reviews.items;
  const feeRows = dict.fees.rows;

  const providerNetworkCounts = useProviderNetworkCounts();

  useReveal();

  const citiesLabel = locale === "pt" ? "Cidades" : "Cities";
  const servicesLabel = locale === "pt" ? "Servicos" : "Services";

  return (
    <div className="siteFrame">
      <AppShellHeader dict={dict} locale={locale} />

      <nav className="seoSubNav" aria-label="Site navigation">
        <div className="seoSubNavInner">
          <div className="seoSubNavLinks">
            <details className="seoSubNavGroup">
              <summary className="seoSubNavTrigger">
                {citiesLabel}
                <svg className="seoSubNavChevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4.5L6 7.5L9 4.5" /></svg>
              </summary>
              <div className="seoSubNavDropdown">
                {nav.cities.map((item) => (
                  <a key={item.href} href={item.href} className="seoSubNavDropdownLink">{item.label}</a>
                ))}
              </div>
            </details>
            <details className="seoSubNavGroup">
              <summary className="seoSubNavTrigger">
                {servicesLabel}
                <svg className="seoSubNavChevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4.5L6 7.5L9 4.5" /></svg>
              </summary>
              <div className="seoSubNavDropdown">
                {nav.services.map((item) => (
                  <a key={item.href} href={item.href} className="seoSubNavDropdownLink">{item.label}</a>
                ))}
              </div>
            </details>
          </div>
          <div className="langToggle">
            {LOCALES.map((loc, index) => (
              <span key={loc}>
                {index > 0 && <span className="langSep">{"\u00A0|\u00A0"}</span>}
                {loc === locale ? (
                  <span className="langActive">{loc.toUpperCase()}</span>
                ) : (
                  <a href={`/${loc}`} className="langLink">{loc.toUpperCase()}</a>
                )}
              </span>
            ))}
          </div>
        </div>
      </nav>

      <main className="sitePage">
        <div className="hp">
          <section className="hp-hero">
            <div className="hp-hero-shell">
              <div className="hp-hero-content">
                <h1 className="hp-hero-title">{dict.hero.title}</h1>
                <p className="sr-only">{dict.meta.seoHeading}</p>
                <HeroJourney dict={dict} />
                <div className="hp-hero-actions hp-hero-actions-row">
                  <TrackedCtaLink
                    href={appHref("/jobs/new")}
                    className="hp-hero-cta hp-hero-cta-green"
                    ctaLocation="home_hero_request_service"
                    locale={locale}
                    pageKind="home"
                  >
                    {dict.hero.ctaBrowseJobs}
                    <ArrowIcon />
                  </TrackedCtaLink>
                </div>
              </div>
            </div>
          </section>

          <StatsStrip
            liveLocations={providerNetworkCounts.towns}
            liveProviders={providerNetworkCounts.providers}
          />

          <section className="hp-customer" data-reveal>
            <div className="hp-customer-inner">
              <div className="hp-section-head">
                <h2 className="hp-h2">{dict.customer.heading}</h2>
                <p className="hp-subtitle">{dict.customer.subtitle}</p>
              </div>

              <div className="hp-cat-grid">
                {categories.map((cat, index) => (
                  <TrackedCtaLink
                    key={cat.slug}
                    href={categoryHref(cat.slug)}
                    className={`hp-cat-card ${index < 4 ? "hp-cat-featured" : ""}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    ctaLocation={`home_category_${cat.slug}`}
                    locale={locale}
                    pageKind="home"
                  >
                    <img
                      src={CATEGORY_IMAGES[cat.slug]}
                      alt={cat.alt || cat.title}
                      className="hp-cat-photo"
                      loading={index > 3 ? "lazy" : undefined}
                    />
                    <div className="hp-cat-overlay" />
                    <div className="hp-cat-label">
                      <span className="hp-cat-name">{cat.title}</span>
                      <span className="hp-cat-desc">{cat.desc}</span>
                    </div>
                    <div className="hp-cat-arrow">
                      <ArrowIcon />
                    </div>
                  </TrackedCtaLink>
                ))}
              </div>
            </div>
          </section>

          <section className="hp-how" data-reveal>
            <div className="hp-section-head">
              <h2 className="hp-h2">{dict.howItWorks.heading}</h2>
              <p className="hp-subtitle">{dict.howItWorks.subtitle}</p>
            </div>

            <div className="hp-how-grid">
              {dict.howItWorks.steps.map((step, index) => (
                <article key={step.num} className="hp-how-card" style={{ animationDelay: `${index * 80}ms` }}>
                  <div className="hp-how-num">{step.num}</div>
                  <div className="hp-how-copy">
                    <h3 className="hp-how-title">{step.title}</h3>
                    <p className="hp-how-body">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="hp-cb" data-reveal>
            <div className="hp-section-head">
              <h2 className="hp-h2">{dict.benefits.heading}</h2>
              <p className="hp-subtitle">{dict.benefits.subtitle}</p>
            </div>

            <div className="hp-cb-list">
              {dict.benefits.items.map((benefit) => (
                <article key={benefit.id} className="hp-cb-row">
                  <h3 className="hp-cb-title">{benefit.title}</h3>
                  <p className="hp-cb-desc">{benefit.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <ProviderCounter
            dict={dict}
            locale={locale}
            providers={providerNetworkCounts.providers}
            towns={providerNetworkCounts.towns}
            hasError={providerNetworkCounts.hasError}
          />

          <section className="hp-provider" data-reveal>
            <div className="hp-provider-inner">
              <div className="hp-provider-left">
                <div className="hp-provider-eyebrow">{dict.provider.badge}</div>
                <h2 className="hp-provider-title">{dict.provider.title}</h2>
                <p className="hp-provider-desc">{dict.provider.desc}</p>
                <ul className="hp-provider-perks">
                  {dict.provider.perks.map((perk) => (
                    <li key={perk}><CheckIcon /> {perk}</li>
                  ))}
                </ul>
                <TrackedCtaLink
                  className="hp-btn-primary"
                  href={PROVIDER_HREF}
                  ctaLocation="home_provider_section"
                  locale={locale}
                  pageKind="home"
                >
                  {dict.provider.cta}
                  <ArrowIcon />
                </TrackedCtaLink>
              </div>
            </div>
          </section>

          <section className="hp-fees" aria-labelledby="hp-fees-title" data-reveal>
            <div className="hp-fees-head">
              <div className="hp-fees-kicker">{dict.fees.kicker}</div>
              <h2 id="hp-fees-title" className="hp-h2">{dict.fees.heading}</h2>
              <p className="hp-subtitle hp-fees-subtitle">{dict.fees.subtitle}</p>
            </div>

            <div className="hp-fee-table-wrap">
              <table className="hp-fee-table">
                <thead>
                  <tr>
                    {dict.fees.tableHeaders.map((header) => (
                      <th key={header} scope="col">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.fee}>
                      <td>
                        <span className="hp-fee-label">{row.fee}</span>
                      </td>
                      <td>
                        <BlurredCompetitors names={row.competitors} />
                        <p className="hp-fee-market-copy">{row.marketSummary}</p>
                      </td>
                      <td>
                        <span className={`hp-fee-grunt ${row.gruntwrk.startsWith("10%") ? "is-fee" : "is-free"}`}>
                          {row.gruntwrk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hp-fee-cards">
              {feeRows.map((row) => (
                <article key={`m-${row.fee}`} className="hp-fee-card">
                  <div className="hp-fee-card-head">
                    <span className="hp-fee-label">{row.fee}</span>
                    <span className={`hp-fee-grunt ${row.gruntwrk.startsWith("10%") ? "is-fee" : "is-free"}`}>
                      {row.gruntwrk}
                    </span>
                  </div>
                  <p className="hp-fee-market-copy">{row.marketSummary}</p>
                </article>
              ))}
            </div>

            <p className="hp-fee-note">{dict.fees.note}</p>
          </section>

          <HomeTrustMarquee dict={dict} backgroundImage={MARQUEE_BG} />
        </div>

        <section className="reviewsSection">
          <div className="sectionInner">
            <div className="reviewsSectionHeader">
              <h2 className="sectionHeading">{dict.reviews.heading}</h2>
              <div className="reviewsSectionMeta">
                <span className="ratingPillLarge">4.8</span>
                <span className="reviewsSectionSub">{dict.reviews.ratingLabel}</span>
              </div>
            </div>
          </div>

          <div className="reviewsMarquee">
            <div className="reviewsTrack">
              {[...reviews, ...reviews].map((review, index) => {
                const r = review as any;
                return (
                  <div key={index} className="reviewCardNew">
                    <div className="reviewCardHeader">
                      {r.name && <div className="reviewAvatar">{r.name.charAt(0)}</div>}
                      <div className="reviewCardMeta">
                        {r.name && <span className="reviewName">{r.name}</span>}
                        <Stars count={review.stars} />
                      </div>
                      {r.role && <span className="reviewRole">{r.role}</span>}
                    </div>
                    <p className="reviewTextNew">{review.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <footer className="siteFooter">
        <div className="sectionInner">
          <div className="footerTop">
            <div className="footerBrand">
              <BrandMark className="navLogoIcon" />
              <span className="footerBrandName">GruntWrk</span>
            </div>

            <div className="footerStoreCol">
              <p className="footerStoreLabel">{dict.footer.storeLabel}</p>
              <StoreBadges dict={dict} />
            </div>
          </div>

          <div className="footerBottom">
            <div className="footerSocials">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footerSocialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="footerCopy">{dict.footer.copy}</p>
          </div>
        </div>
      </footer>

      <SiteBottomNav dict={dict} locale={locale} pageKind="home" />
    </div>
  );
}
