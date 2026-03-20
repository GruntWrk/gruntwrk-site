"use client";

import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from "react";

const APP_BASE_URL = "https://app.gruntwrk.com";
const HOME_HREF = APP_BASE_URL;
const LOGIN_HREF = appHref("/login");
const REQUEST_SERVICE_HREF = appHref("/jobs/new");
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

const HERO_CATEGORIES = [
  { slug: "cleaning", title: "Cleaning", desc: "Home & office deep cleans" },
  { slug: "furniture-assembly", title: "Assembly", desc: "Flat-pack & furniture" },
  { slug: "home-repairs", title: "Repairs", desc: "Fixes, carpentry & more" },
  { slug: "moving-lifting", title: "Moving", desc: "Packing, lifting & vans" },
  { slug: "electrical", title: "Electrical", desc: "Lights, switches & wiring" },
  { slug: "plumbing", title: "Plumbing", desc: "Taps, drains & toilets" },
  { slug: "painting-decor", title: "Painting", desc: "Interior & exterior" },
  { slug: "outdoor", title: "Outdoor", desc: "Garden & maintenance" },
  { slug: "mounting-installation", title: "Mounting", desc: "TVs, shelves & blinds" },
  { slug: "removal-disposal", title: "Removal", desc: "Junk & waste disposal" },
];

const HOW_STEPS = [
  {
    num: "1",
    title: "Describe what you need",
    body: "Post your request, location, and budget.",
  },
  {
    num: "2",
    title: "Choose who to hire",
    body: "Receive quotes from matched providers or book directly with someone you've used before.",
  },
  {
    num: "3",
    title: "Manage the job in one place",
    body: "Use your workbench to message, confirm the provider, follow payment, and rebook trusted providers with confidence.",
  },
];

const WORKBENCH_POINTS = [
  {
    id: "quotes",
    title: "Compare quotes clearly",
    desc: "See your options in one place and choose the provider that fits.",
  },
  {
    id: "book",
    title: "Book directly when ready",
    desc: "Already know who you want? Send a request straight to that provider.",
  },
  {
    id: "message",
    title: "Keep everything together",
    desc: "Messages, progress, payment, and reviews live inside the job workbench.",
  },
  {
    id: "pay",
    title: "Pay and rebook with confidence",
    desc: "Keep clear payment records and come back to trusted providers when you need them again.",
  },
] as const;

const FEE_COMPARISON_ROWS = [
  {
    fee: "Registration fee",
    marketSummary: "Some marketplaces charge a one-time provider onboarding fee before you can start taking work.",
    competitors: ["Taskrabbit"],
    gruntwrk: "Free",
  },
  {
    fee: "Lead or contact fee",
    marketSummary: "Pay to unlock customer details or spend money each time you want to pursue a job.",
    competitors: ["Fixando", "Zaask", "Bark"],
    gruntwrk: "Free",
  },
  {
    fee: "Credit packs",
    marketSummary: "Prepay for credits or contact packs before you can quote on requests.",
    competitors: ["Fixando", "Zaask", "Bark"],
    gruntwrk: "Free",
  },
  {
    fee: "Visibility boosts",
    marketSummary: "Pay extra to appear higher in search or unlock more exposure for your profile.",
    competitors: ["Fixando", "Checkatrade"],
    gruntwrk: "Free",
  },
  {
    fee: "Subscription or membership",
    marketSummary: "Monthly platform access or plan fees just to stay listed and compete for work.",
    competitors: ["Bark", "Checkatrade"],
    gruntwrk: "Free",
  },
  {
    fee: "Shortlist or acceptance fee",
    marketSummary: "Charged when a customer shortlists you or shows a stronger signal of intent.",
    competitors: ["MyBuilder"],
    gruntwrk: "Free",
  },
  {
    fee: "Payment-processing add-on fee",
    marketSummary: "Extra payment-related charges layered on top of other marketplace fees.",
    competitors: ["Fixando", "Taskrabbit", "Checkatrade"],
    gruntwrk: "Free",
  },
  {
    fee: "Payout reserve or holdback",
    marketSummary: "A portion of provider funds can be retained on-platform before payout is released.",
    competitors: ["Fixando"],
    gruntwrk: "Free",
  },
  {
    fee: "Booking or payment fee",
    marketSummary: "A single transaction fee when the booking and payment are completed through the platform.",
    competitors: ["Fixando", "Taskrabbit", "Checkatrade"],
    gruntwrk: "10% booking/payment fee",
  },
] as const;

const DIFFERENCE_MARKET_STEPS = [
  "Pay for leads",
  "Pay for visibility",
  "Pay for subscriptions",
  "Then still pay transaction fees",
] as const;

const DIFFERENCE_GRUNTWRK_POINTS = [
  "Not a lead-selling middleman",
  "A workbench platform",
  "Clients and providers deal directly with each other",
] as const;

const DIFFERENCE_PILLS = ["No lead fees", "Direct client-provider contact", "One shared workbench"] as const;

type WorkbenchPoint = (typeof WORKBENCH_POINTS)[number];
type Review = { stars: 4 | 5; text: string };

const REVIEWS: Review[] = [
  {
    stars: 5,
    text: "Very effective platform for connecting clients and service providers. Finding and booking a job is simple and fast.",
  },
  {
    stars: 4,
    text: "The notice board feature is well organised and makes it easy to find available services in your area.",
  },
  {
    stars: 5,
    text: "I like how profiles show ratings, skills, and reviews. It helps users quickly evaluate providers.",
  },
];

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
    label: "X",
    href: "https://x.com/gruntwrk_x",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@gruntwrk_official",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const AUTO_ADVANCE_MS = 3000;
const STACK_PAUSE_MS = 4200;
const USER_IDLE_MS = 8000;

function loginHref(next: string) {
  return `${APP_BASE_URL}/login?next=${encodeURIComponent(next)}`;
}

function appHref(path: string) {
  return `${APP_BASE_URL}${path}`;
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={filled ? "star starFilled" : "star"}>
      <path d="M12 17.27l-5.18 3.05 1.4-5.92L3 9.24l6.06-.52L12 3l2.94 5.72 6.06.52-5.22 5.16 1.4 5.92L12 17.27z" />
    </svg>
  );
}

function Stars({ count }: { count: 4 | 5 }) {
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

function StoreBadges() {
  return (
    <div className="storeBadges">
      <div className="storeBadge storeBadgeDisabled">
        <AppleIcon />
        <div className="storeBadgeLabels">
          <span className="storeBadgeSmall">Coming soon</span>
          <span className="storeBadgeLarge">App Store</span>
        </div>
      </div>
      <div className="storeBadge storeBadgeDisabled">
        <GooglePlayIcon />
        <div className="storeBadgeLabels">
          <span className="storeBadgeSmall">Coming soon</span>
          <span className="storeBadgeLarge">Google Play</span>
        </div>
      </div>
    </div>
  );
}

function WorkbenchIcon({ id }: { id: WorkbenchPoint["id"] }) {
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

function BlurredCompetitors({ names }: { names: readonly string[] }) {
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

function AppShellHeader() {
  return (
    <header className="appShellHeader">
      <div className="appShellHeaderInner">
        <a href={HOME_HREF} className="appShellBrand" aria-label="Go to app homepage">
          <BrandMark className="navLogoIcon" />
          <div className="appShellBrandCopy">
            <span className="appShellBrandName">GruntWrk</span>
            <span className="appShellBrandSub">Get work done. Find work fast.</span>
          </div>
        </a>

        <div className="appShellHeaderActions">
          <a href={PROVIDER_HREF} className="appShellHeaderBtn appShellHeaderBtnPrimary">
            Start offering services
          </a>
          <a href={LOGIN_HREF} className="appShellHeaderBtn appShellHeaderBtnSecondary">
            Login
          </a>
        </div>
      </div>
    </header>
  );
}

function HomeTrustMarquee(props: { backgroundImage: string }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resumeTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  const slideCount = WORKBENCH_POINTS.length + 1;

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
          "--hp-marquee-bg": `linear-gradient(110deg, rgba(13, 22, 18, 0.84) 0%, rgba(13, 22, 18, 0.44) 42%, rgba(13, 22, 18, 0.62) 100%), url("${props.backgroundImage}")`,
        } as CSSProperties
      }
    >
      <div className="hp-workbench-marquee-frame">
        <div className="hp-workbench-copy">
          <h2 id="hp-workbench-marquee-title" className="hp-workbench-title">
            Compare, book, message, pay, and rebook.
          </h2>
        </div>

        <div className="hp-workbench-stage">
          <div
            ref={viewportRef}
            className="hp-workbench-viewport"
            aria-label="Customer benefits carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={pauseForUser}
            onTouchStart={pauseForUser}
          >
            <div className="hp-workbench-track">
              {WORKBENCH_POINTS.map((point, index) => (
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
                <div className="hp-workbench-stack" aria-label="All benefits together">
                  {WORKBENCH_POINTS.map((point) => (
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
                  aria-label={index === slideCount - 1 ? "Show all points together" : `Show point ${index + 1}`}
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

export default function Home() {
  return (
    <div className="siteFrame">
      <AppShellHeader />

      <main className="sitePage">
        <div className="hp">
          <section className="hp-hero">
            <div className="hp-hero-shell">
              <div className="hp-hero-content">
                <h1 className="hp-hero-title">Find the right person for the job</h1>
                <p className="hp-hero-sub">
                  Post the job, compare providers, chat, agree the price, and pay.
                  Everything in one place.
                </p>
                <div className="hp-hero-actions">
                  <a href={REQUEST_SERVICE_HREF} className="hp-btn-primary">
                    Request a service
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-difference" aria-labelledby="hp-difference-title">
            <div className="hp-difference-shell">
              <div className="hp-difference-lead">
                <span className="hp-difference-kicker">Our difference</span>
                <h2 id="hp-difference-title" className="hp-difference-title">What makes GruntWrk different?</h2>
                <p className="hp-difference-intro">
                  GruntWrk removes the middleman, while giving you the tools to get the job done.
                </p>

                <div className="hp-difference-pills" aria-label="Key GruntWrk differences">
                  {DIFFERENCE_PILLS.map((pill) => (
                    <span key={pill} className="hp-difference-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hp-difference-grid">
                <article className="hp-difference-card hp-difference-card-market">
                  <div className="hp-difference-card-top">
                    <span className="hp-difference-card-eyebrow">Most others</span>
                    <h3 className="hp-difference-card-title">Charge at every step</h3>
                    <p className="hp-difference-card-copy">
                      Most others act like a middleman and charge at every step:
                    </p>
                  </div>

                  <ol className="hp-difference-steps">
                    {DIFFERENCE_MARKET_STEPS.map((step, index) => (
                      <li key={step} className="hp-difference-step">
                        <span className="hp-difference-step-num">{String(index + 1).padStart(2, "0")}</span>
                        <span className="hp-difference-step-copy">{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>

                <article className="hp-difference-card hp-difference-card-grunt">
                  <div className="hp-difference-card-top">
                    <span className="hp-difference-card-eyebrow hp-difference-card-eyebrow-strong">The GruntWrk difference</span>
                    <h3 className="hp-difference-card-title">Direct connection, shared workbench</h3>
                    <p className="hp-difference-card-copy">
                      You keep the direct relationship, while the platform keeps the job organised.
                    </p>
                  </div>

                  <ul className="hp-difference-list">
                    {DIFFERENCE_GRUNTWRK_POINTS.map((point) => (
                      <li key={point} className="hp-difference-list-item">
                        <span className="hp-difference-check" aria-hidden="true">
                          <CheckIcon />
                        </span>
                        <span className="hp-difference-list-copy">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="hp-difference-footer">
                    <span className="hp-difference-footer-label">The platform</span>
                    <p className="hp-difference-footer-copy">
                      Lets you search, message, pay, and keep records.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="hp-categories">
            <div className="hp-section-head">
              <h2 className="hp-h2">What do you need help with?</h2>
              <p className="hp-subtitle">Choose a service and start the fastest path to getting it done.</p>
            </div>

            <div className="hp-cat-grid">
              {HERO_CATEGORIES.map((cat, index) => (
                <a
                  key={cat.slug}
                  href={categoryHref(cat.slug)}
                  className={`hp-cat-card ${index < 4 ? "hp-cat-featured" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={CATEGORY_IMAGES[cat.slug]}
                    alt={cat.title}
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
                </a>
              ))}
            </div>
          </section>

          <HomeTrustMarquee backgroundImage={MARQUEE_BG} />

          <section className="hp-how">
            <div className="hp-section-head">
              <h2 className="hp-h2">How Gruntwrk works</h2>
              <p className="hp-subtitle">A simple flow from request to completion</p>
            </div>

            <div className="hp-how-grid">
              {HOW_STEPS.map((step, index) => (
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

          <section className="hp-provider">
            <div className="hp-provider-inner">
              <div className="hp-provider-left">
                <div className="hp-provider-badge">For providers</div>
                <h2 className="hp-provider-title">Run your service business without paying to chase leads</h2>
                <p className="hp-provider-desc">
                  Build a public profile, share your availability, receive direct requests,
                  compare quotes, message customers, take payment, and rebook repeat work
                  from one workbench. GruntWrk is built to help providers run the job from
                  first request to repeat booking without lead fees, contact packs, or
                  visibility boosts.
                </p>
                <ul className="hp-provider-perks">
                  <li><CheckIcon /> No pay-per-lead or contact unlock fees</li>
                  <li><CheckIcon /> No credit packs, subscriptions, or boost charges</li>
                  <li><CheckIcon /> Public profile, availability, and direct requests</li>
                  <li><CheckIcon /> Quotes, messaging, payment steps, and repeat bookings in one workbench</li>
                </ul>
                <a className="hp-btn-primary" href={PROVIDER_HREF}>
                  Start offering services
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </section>

          <section className="hp-fees" aria-labelledby="hp-fees-title">
            <div className="hp-fees-head">
              <div className="hp-fees-kicker">Cost difference</div>
              <h2 id="hp-fees-title" className="hp-h2">Most others charge at every step. GruntWrk does not.</h2>
              <p className="hp-subtitle hp-fees-subtitle">
                The GruntWrk workbench is the platform. Providers manage quotes, direct bookings, messaging,
                payment steps, and repeat jobs in one place. We do not charge pay-per-lead fees, contact packs,
                subscriptions, or visibility boosts. We only charge the booking/payment fee that keeps the
                platform running.
              </p>
            </div>

            <div className="hp-fees-pills" aria-label="Key fee differences">
              <span className="hp-fees-pill">No pay-per-lead</span>
              <span className="hp-fees-pill">No credit packs</span>
              <span className="hp-fees-pill">No subscriptions</span>
              <span className="hp-fees-pill">No visibility boosts</span>
              <span className="hp-fees-pill hp-fees-pill-strong">Only 10% booking/payment fee</span>
            </div>

            <div className="hp-fee-table-wrap">
              <table className="hp-fee-table">
                <thead>
                  <tr>
                    <th scope="col">Fee type</th>
                    <th scope="col">Typical marketplaces</th>
                    <th scope="col">GruntWrk</th>
                  </tr>
                </thead>
                <tbody>
                  {FEE_COMPARISON_ROWS.map((row) => (
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

            <p className="hp-fee-note">
              Based on public pricing and help-center pages reviewed on March 16, 2026. Fees vary by service and market.
            </p>
          </section>
        </div>

        <section className="screensSection">
          <div className="appsSectionHeader">
            <div className="appsSectionCopy">
              <span className="siteSectionKicker">Apps coming soon</span>
              <h2 className="sectionHeading appsHeading">The GruntWrk workbench is coming to iOS and Android.</h2>
              <p className="siteSectionSub appsSub">
                Browse providers, manage jobs, and keep payment and messages in one place from your phone.
              </p>
            </div>

            <div>
              <StoreBadges />
            </div>
          </div>
        </section>

        <section className="reviewsSection">
          <div className="sectionInner">
            <div className="reviewsSectionHeader">
              <h2 className="sectionHeading">Customer reviews.</h2>
              <div className="reviewsSectionMeta">
                <span className="ratingPillLarge">4.8</span>
                <span className="reviewsSectionSub">Early Access</span>
              </div>
            </div>

            <div className="reviewsGrid">
              {REVIEWS.map((review, index) => (
                <div key={index} className="reviewCardNew">
                  <Stars count={review.stars} />
                  <p className="reviewTextNew">{review.text}</p>
                </div>
              ))}
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
              <p className="footerStoreLabel">Available soon on iOS and Android</p>
              <StoreBadges />
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

            <p className="footerCopy">Built to make local service jobs clearer for both customers and providers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


