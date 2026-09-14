"use client";

import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";
import type { Locale } from "../lib/i18n";
import { appDestination } from "../lib/appDestination";
import {
  GOOGLE_CTA_EVENTS,
  getLegacyGoogleCtaEventName,
  getLegacyGoogleCtaParams,
  getGoogleAdsSendTo,
  type GoogleCtaEventName,
} from "../lib/googleTag";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const OPENING_LABELS: Record<Locale, string> = {
  en: "Opening the app…",
  pt: "A abrir a aplicação…",
  de: "Die App wird geöffnet…",
};

type TrackedCtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ctaLocation: string;
  href: string;
  locale: Locale;
  pageKind: string;
};

function inferEventName(href: string): GoogleCtaEventName | null {
  if (href.includes("/jobs/new")) return GOOGLE_CTA_EVENTS.customerRequest;
  if (href.includes("/login")) return GOOGLE_CTA_EVENTS.providerSignup;
  if (href.includes("/directory")) return GOOGLE_CTA_EVENTS.providerSearch;
  return null;
}

function isSameTabNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  target?: string
) {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  return !target || target === "_self";
}

function dispatchTrackedEvent(
  eventName: GoogleCtaEventName,
  params: Record<string, string>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);

  const legacyEventName = getLegacyGoogleCtaEventName(eventName);
  const legacyParams = getLegacyGoogleCtaParams(eventName, params);
  if (legacyEventName && legacyParams) {
    window.gtag("event", legacyEventName, legacyParams);
  }

  const adsSendTo = getGoogleAdsSendTo(eventName);
  if (!adsSendTo) return;

  window.gtag("event", "conversion", {
    send_to: adsSendTo,
    ...params,
  });
}

export function TrackedCtaLink({
  ctaLocation,
  href,
  locale,
  onClick,
  pageKind,
  target,
  ...props
}: TrackedCtaLinkProps) {
  const [opening, setOpening] = useState(false);
  const [serviceCookie, setServiceCookie] = useState("");
  useEffect(() => { setServiceCookie(document.cookie); }, []);
  useEffect(() => {
    if (!opening) return;
    const reset = () => setOpening(false);
    // Restore the link after Back (including bfcache) or a cancelled navigation.
    window.addEventListener("pageshow", reset);
    const timer = window.setTimeout(reset, 10000);
    return () => {
      window.removeEventListener("pageshow", reset);
      window.clearTimeout(timer);
    };
  }, [opening]);
  // Preserve the selected language for ordinary, modified and keyboard clicks.
  href = appDestination(href, locale, serviceCookie);
  const eventName = inferEventName(href);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !eventName) return;
    if (isSameTabNavigation(event, target) && props.download == null) setOpening(true);

    const params = {
      cta_location: ctaLocation,
      cta_type: eventName === GOOGLE_CTA_EVENTS.customerRequest
        ? "customer_request"
        : eventName === GOOGLE_CTA_EVENTS.providerSearch
          ? "provider_search"
          : "provider_signup",
      destination_url: href,
      locale,
      page_kind: pageKind,
      page_path: window.location.pathname,
    };

    try {
      // Tracking must never hold up the browser's normal link navigation.
      dispatchTrackedEvent(eventName, params);
    } catch {
      // A blocked or failed analytics script must not break the link.
    }
  }

  return (
    <>
      <a {...props} href={href} onClick={handleClick} target={target} aria-busy={opening || undefined} />
      {opening && (
        <div className="app-opening-status" role="status" aria-live="polite">
          <span className="app-opening-spinner" aria-hidden="true" />
          {OPENING_LABELS[locale]}
        </div>
      )}
    </>
  );
}
