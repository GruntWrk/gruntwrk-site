"use client";

import { usePathname } from "next/navigation";
import { TrackedCtaLink } from "../TrackedCtaLink";
import type { Dictionary, Locale } from "../../lib/i18n";

const APP_BASE_URL = "https://app.gruntwrk.com";
const SEARCH_PROVIDERS_HREF = `${APP_BASE_URL}/directory?search=1`;
const GREEN = "rgb(62, 207, 142)";

function HouseIcon({ size, strokeWidth, color }: { size: number; strokeWidth: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ClipboardListIcon({ size, strokeWidth, color }: { size: number; strokeWidth: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function SearchIcon({ size, strokeWidth, color }: { size: number; strokeWidth: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SiteBottomNav({
  dict,
  locale,
  pageKind = "seo",
}: {
  dict: Dictionary;
  locale: Locale;
  pageKind?: string;
}) {
  const pathname = usePathname() || "/";
  const homePath = `/${locale}`;
  const homeLabel = locale === "pt" ? "Inicio" : "Home";
  const homeActive = pathname === homePath || pathname === `${homePath}/`;

  return (
    <nav className="siteMobileNav" aria-label="Bottom navigation" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60 }}>
      <div className="siteMobileNavInner">
        <a
          href={homePath}
          aria-label={homeLabel}
          title={homeLabel}
          aria-current={homeActive ? "page" : undefined}
          style={{
            textDecoration: "none",
            background: "transparent",
            border: "none",
            padding: "8px 2px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            borderRadius: 0,
            color: homeActive ? GREEN : "var(--muted)",
            cursor: "pointer",
            position: "relative",
            transition: "color 200ms",
            minWidth: 0,
            width: "100%",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              flex: "0 0 auto",
            }}
          >
            <HouseIcon size={22} strokeWidth={homeActive ? 2.4 : 1.8} color={homeActive ? GREEN : "var(--muted)"} />
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: homeActive ? 700 : 500,
              lineHeight: 1,
              letterSpacing: "0.01em",
              color: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {homeLabel}
          </span>
          {homeActive && (
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 20,
                height: 2,
                borderRadius: 999,
                background: GREEN,
              }}
            />
          )}
        </a>

        <TrackedCtaLink
          href={`${APP_BASE_URL}/jobs/new`}
          aria-label={dict.nav.jobs}
          title={dict.nav.jobs}
          ctaLocation={pageKind === "home" ? "home_bottom_request_service" : "site_bottom_request_service"}
          locale={locale}
          pageKind={pageKind}
          style={{
            textDecoration: "none",
            background: "transparent",
            border: "none",
            padding: "0 2px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 4,
            color: "var(--muted)",
            cursor: "pointer",
            position: "relative",
            minWidth: 0,
            width: "100%",
          }}
        >
          <span
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(180deg, rgba(62,207,142,1) 0%, rgba(46,176,118,1) 100%)",
              boxShadow: "0 10px 22px rgba(62,207,142,0.30), 0 4px 10px rgba(0,0,0,0.20)",
              transform: "translateY(-14px)",
              border: "3px solid rgb(247, 247, 247)",
              transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
          >
            <ClipboardListIcon size={26} strokeWidth={2.4} color="rgb(7, 17, 12)" />
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "0.01em",
              color: "var(--muted)",
              whiteSpace: "nowrap",
              marginTop: -8,
            }}
          >
            {dict.nav.jobs}
          </span>
        </TrackedCtaLink>

        <TrackedCtaLink
          href={SEARCH_PROVIDERS_HREF}
          aria-label={dict.nav.providers}
          title={dict.nav.providers}
          ctaLocation={pageKind === "home" ? "home_bottom_search_providers" : "site_bottom_search_providers"}
          locale={locale}
          pageKind={pageKind}
          style={{
            textDecoration: "none",
            background: "transparent",
            border: "none",
            padding: "8px 2px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            borderRadius: 0,
            color: "var(--muted)",
            cursor: "pointer",
            position: "relative",
            transition: "color 200ms",
            minWidth: 0,
            width: "100%",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              flex: "0 0 auto",
            }}
          >
            <SearchIcon size={22} strokeWidth={1.8} color="var(--muted)" />
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "0.01em",
              color: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {dict.nav.providers}
          </span>
        </TrackedCtaLink>
      </div>
    </nav>
  );
}
