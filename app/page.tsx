// app/page.tsx
"use client";

import { useEffect } from "react";

/* ─── Hero logo — inline so stroke can make the path bolder ─────────── */
function HeroLogo() {
  return (
    <svg
      className="heroSpinLogo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      aria-hidden="true"
    >
      <path
        d="M 511 176 L 186 502 L 512 827 L 837 501 L 650 315 L 466 499 L 530 566 L 647 451 L 707 511 L 525 693 L 335 503 L 586 252 Z"
        fill="#22c55e"
        stroke="#22c55e"
        strokeWidth="32"
        strokeLinejoin="round"
        style={{ paintOrder: "stroke fill" }}
      />
    </svg>
  );
}

/* ─── Types ─────────────────────────────────────────────────────────── */
type Review = { stars: 4 | 5; text: string };

/* ─── Constants ─────────────────────────────────────────────────────── */
const BROWSE_HREF = "https://app.gruntwrk.com/notice-board";

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

/* ─── Icon components ────────────────────────────────────────────────── */
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
      {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} filled={n <= count} />)}
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

function ProvideIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function FindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

/* ─── Shared store badge markup ──────────────────────────────────────── */
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

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  // Scroll-reveal: observe [data-reveal] elements
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? "0";
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── 1. Sticky nav ─────────────────────────────────────────────── */}
      <header className="stickyNav">
        <div className="navInner">
          <a href="/" className="navLogo" aria-label="GruntWrk home">
            <svg className="navLogoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true">
              <path
                d="M 511 176 L 186 502 L 512 827 L 837 501 L 650 315 L 466 499 L 530 566 L 647 451 L 707 511 L 525 693 L 335 503 L 586 252 Z"
                fill="#22c55e"
                stroke="#22c55e"
                strokeWidth="40"
                strokeLinejoin="round"
                style={{ paintOrder: "stroke fill" }}
              />
            </svg>
            <span className="navLogoText">GruntWrk</span>
          </a>
          <a href={BROWSE_HREF} className="btnPrimary btnSmall">
            Browse services
          </a>
        </div>
      </header>

      {/* ── 2. Hero ───────────────────────────────────────────────────── */}
      <section className="heroSection">
        <div className="heroBg" />
        <div className="heroOverlay" />
        <div className="heroContent">
          <div className="heroText">
            <div className="heroBrand">
              <HeroLogo />
              <h1 className="heroBrandName">GruntWrk</h1>
            </div>
            <p className="heroSub">
              A global platform that enables physical work. Post any work that
              needs doing, or find work near you.
            </p>
            <div className="heroCta">
              <a href={BROWSE_HREF} className="btnPrimary">
                Browse services
              </a>
              <StoreBadges />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How it works ───────────────────────────────────────────── */}
      <section className="howSection">
        <div className="sectionInner">
          <h2 className="sectionHeading" data-reveal>Simple by design.</h2>
          <div className="howGrid">
            {[
              {
                icon: <ProvideIcon />,
                title: "Provide a service",
                desc: "Got skills? Post your services and get found by people who need exactly what you offer.",
              },
              {
                icon: <RequestIcon />,
                title: "Request a service",
                desc: "Need something done? Post your job and let providers come to you.",
              },
              {
                icon: <FindIcon />,
                title: "Find providers",
                desc: "Browse trusted providers near you on the map or search by skill.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="howCard"
                data-reveal
                data-reveal-delay={String(i * 90)}
              >
                <div className="howIcon">{card.icon}</div>
                <h3 className="howTitle">{card.title}</h3>
                <p className="howDesc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. App screenshots ────────────────────────────────────────── */}
      <section className="screensSection">
        <div className="sectionInner">
          <h2 className="sectionHeading" data-reveal>
            Everything you need, in one place.
          </h2>
        </div>
        <div className="screensScroller">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="phoneFrame" data-reveal data-reveal-delay={String(n * 60)}>
              <div className="phoneNotch" />
              <div className="phoneScreen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/screenshots/screen${n}.jpg`}
                  alt={`GruntWrk app screen ${n}`}
                  className="phoneImg"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reviews ────────────────────────────────────────────────── */}
      <section className="reviewsSection">
        <div className="sectionInner">
          <div className="reviewsSectionHeader">
            <h2 className="sectionHeading" data-reveal>
              What people are saying.
            </h2>
            <div className="reviewsSectionMeta" data-reveal data-reveal-delay="80">
              <span className="ratingPillLarge">4.8</span>
              <span className="reviewsSectionSub">Early Access</span>
            </div>
          </div>
          <div className="reviewsGrid">
            {REVIEWS.map((r, idx) => (
              <div key={idx} className="reviewCardNew" data-reveal data-reveal-delay={String(idx * 80)}>
                <Stars count={r.stars} />
                <p className="reviewTextNew">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Mission ────────────────────────────────────────────────── */}
      <section className="missionSection">
        <div className="sectionInner">
          <div className="missionCard" data-reveal>
            <h2 className="missionHeading">
              We didn&apos;t choose the name to make it sound better.
            </h2>
            <div className="missionBody">
              <p>
                As algorithms automate more and more white-collar, office-based
                work, something important is happening beneath the surface. Work
                that cannot be outsourced to a machine becomes more scarce.
                Scarcity creates value. Over the next decades, we believe the
                fastest-growing cohort of wealth will come from people who can
                do real, physical work.
              </p>
              <p>
                GruntWrk is a global platform that enables physical work. A
                neutral place where people post any work that needs to be done,
                and others choose to do it. Just visibility. Just real work. We
                didn&apos;t choose the name GruntWrk to make it sound better. We
                chose it because we believe grunt work is where the future of
                value is being created.
              </p>
            </div>
            <div className="missionAccent">
              &ldquo;GruntWrk is where the future of value is being created.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Footer ─────────────────────────────────────────────────── */}
      <footer className="siteFooter">
        <div className="sectionInner">
          <div className="footerTop">
            <div className="footerBrand">
              <svg className="navLogoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true">
                <path
                  d="M 511 176 L 186 502 L 512 827 L 837 501 L 650 315 L 466 499 L 530 566 L 647 451 L 707 511 L 525 693 L 335 503 L 586 252 Z"
                  fill="#22c55e"
                  stroke="#22c55e"
                  strokeWidth="40"
                  strokeLinejoin="round"
                  style={{ paintOrder: "stroke fill" }}
                />
              </svg>
              <span className="footerBrandName">GruntWrk</span>
            </div>
            <div className="footerStoreCol">
              <p className="footerStoreLabel">Available soon on iOS and Android</p>
              <StoreBadges />
            </div>
          </div>
          <div className="footerBottom">
            <div className="footerSocials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footerSocialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}
