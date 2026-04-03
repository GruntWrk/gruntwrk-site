import type { Dictionary } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";
import { TrackedCtaLink } from "../TrackedCtaLink";

const APP_BASE_URL = "https://app.gruntwrk.com";
const LOGIN_HREF = `${APP_BASE_URL}/login`;

function buildProviderSignupHref() {
  const params = new URLSearchParams({
    intent: "register",
    section: "provider",
    country: "PT",
    next: "/provider/profile",
  });
  return `${APP_BASE_URL}/login?${params.toString()}`;
}

const PROVIDER_SIGNUP_HREF = buildProviderSignupHref();

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
];

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="appShellHeader">
      <div className="appShellHeaderInner">
        <a href={APP_BASE_URL} className="appShellBrand" aria-label="Go to app homepage">
          <BrandMark className="navLogoIcon" />
          <div className="appShellBrandCopy">
            <span className="appShellBrandName">GruntWrk</span>
            <span className="appShellBrandSub">{dict.nav.brandSub}</span>
          </div>
        </a>

        <nav className="appShellHeaderNav" aria-label="Primary navigation">
          <a href={`${APP_BASE_URL}/notice-board`} className="appShellHeaderNavBtn" aria-label={dict.nav.jobs}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
              <line x1="14" y1="4" x2="21" y2="4" /><line x1="14" y1="9" x2="21" y2="9" />
              <line x1="14" y1="15" x2="21" y2="15" /><line x1="14" y1="20" x2="21" y2="20" />
            </svg>
            <span className="appShellHeaderNavLabel">{dict.nav.jobs}</span>
          </a>
          <a href={`${APP_BASE_URL}/contacts`} className="appShellHeaderNavBtn" aria-label={dict.nav.providers}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="appShellHeaderNavLabel">{dict.nav.providers}</span>
          </a>
          <a href={LOGIN_HREF} className="appShellHeaderBtn appShellHeaderBtnSecondary">
            {dict.nav.login}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
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
  );
}
