"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { Locale } from "../lib/i18n";
import {
  GOOGLE_CTA_EVENTS,
  getGoogleAdsSendTo,
  type GoogleCtaEventName,
} from "../lib/googleTag";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const NAVIGATION_FALLBACK_MS = 250;
const ADS_CALLBACK_TIMEOUT_MS = 2000;

type TrackedCtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ctaLocation: string;
  href: string;
  locale: Locale;
  pageKind: string;
};

function inferEventName(href: string): GoogleCtaEventName | null {
  if (href.includes("/jobs/new")) return GOOGLE_CTA_EVENTS.customerRequest;
  if (href.includes("/login")) return GOOGLE_CTA_EVENTS.providerSignup;
  if (href.includes("/directory") || href.includes("/contacts")) return GOOGLE_CTA_EVENTS.directoryBrowse;
  return null;
}

function shouldDelayNavigation(
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
  params: Record<string, string>,
  onComplete?: () => void
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    onComplete?.();
    return;
  }

  const finish = (() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      onComplete?.();
    };
  })();

  window.gtag("event", eventName, params);

  const adsSendTo = getGoogleAdsSendTo(eventName);
  if (!adsSendTo) {
    if (onComplete) window.setTimeout(finish, NAVIGATION_FALLBACK_MS);
    return;
  }

  window.gtag("event", "conversion", {
    send_to: adsSendTo,
    ...params,
    event_callback: finish,
    event_timeout: ADS_CALLBACK_TIMEOUT_MS,
  });

  if (onComplete) window.setTimeout(finish, ADS_CALLBACK_TIMEOUT_MS);
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
  const eventName = inferEventName(href);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (!eventName) return;

    const params = {
      cta_location: ctaLocation,
      cta_type: eventName === GOOGLE_CTA_EVENTS.customerRequest
        ? "customer_request"
        : eventName === GOOGLE_CTA_EVENTS.directoryBrowse
          ? "directory_browse"
          : "provider_signup",
      destination_url: href,
      locale,
      page_kind: pageKind,
      page_path: window.location.pathname,
    };

    if (!shouldDelayNavigation(event, target)) {
      dispatchTrackedEvent(eventName, params);
      return;
    }

    event.preventDefault();
    dispatchTrackedEvent(eventName, params, () => {
      window.location.assign(href);
    });
  }

  return <a {...props} href={href} onClick={handleClick} target={target} />;
}
