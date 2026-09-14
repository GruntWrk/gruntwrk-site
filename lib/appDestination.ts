import type { Locale } from "./i18n";

/** Language and the customer's explicitly selected service country are independent. */
export function appDestination(href: string, locale: Locale, cookie = "") {
  try {
    const destination = new URL(href);
    if (destination.hostname !== "app.gruntwrk.com") return href;
    destination.searchParams.set("lang", locale);
    const country = cookie.split(";").map(part => part.trim()).find(part => part.startsWith("gw_service_country="))?.split("=")[1];
    if (/^[A-Z]{2}$/.test(country || "") && !destination.searchParams.has("countryCode")) destination.searchParams.set("countryCode", country!);
    return destination.toString();
  } catch { return href; }
}
