function splitIds(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractGoogleAdsTagIds(sendToValue?: string) {
  return splitIds(sendToValue)
    .map((item) => item.split("/")[0]?.trim() ?? "")
    .filter(Boolean);
}

const rawTagIds = [
  process.env.NEXT_PUBLIC_GOOGLE_TAG_ID,
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
];

const inferredAdsTagIds = [
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CUSTOMER_REQUEST_SEND_TO,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SIGNUP_SEND_TO,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SEARCH_SEND_TO,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTORY_BROWSE_SEND_TO,
].flatMap(extractGoogleAdsTagIds);

export const GOOGLE_TAG_IDS = Array.from(
  new Set([...rawTagIds.flatMap(splitIds), ...inferredAdsTagIds])
);
export const PRIMARY_GOOGLE_TAG_ID = GOOGLE_TAG_IDS[0] ?? "";

export const GOOGLE_CTA_EVENTS = {
  customerRequest: "customer_request_click",
  providerSignup: "provider_signup_click",
  providerSearch: "provider_search_click",
} as const;

const LEGACY_PROVIDER_SEARCH_EVENT = "directory_browse_click";
const LEGACY_PROVIDER_SEARCH_LOCATION_ALIASES: Record<string, string> = {
  home_bottom_search_providers: "home_bottom_browse_directory",
  site_bottom_search_providers: "site_bottom_browse_directory",
  home_header_search_providers: "home_header_browse_directory",
  site_header_search_providers: "site_header_browse_directory",
  home_provider_counter_search: "home_provider_counter_browse_directory",
  seo_hero_secondary: "seo_hero_browse_directory",
};

export type GoogleCtaEventName =
  (typeof GOOGLE_CTA_EVENTS)[keyof typeof GOOGLE_CTA_EVENTS];

export function getLegacyGoogleCtaEventName(eventName: GoogleCtaEventName) {
  return eventName === GOOGLE_CTA_EVENTS.providerSearch ? LEGACY_PROVIDER_SEARCH_EVENT : "";
}

export function getLegacyGoogleCtaParams(
  eventName: GoogleCtaEventName,
  params: Record<string, string>
) {
  if (eventName !== GOOGLE_CTA_EVENTS.providerSearch) return null;

  return {
    ...params,
    cta_type: "directory_browse",
    cta_location:
      LEGACY_PROVIDER_SEARCH_LOCATION_ALIASES[params.cta_location] ||
      params.cta_location,
  };
}

export function getGoogleAdsSendTo(eventName: GoogleCtaEventName) {
  if (eventName === GOOGLE_CTA_EVENTS.customerRequest) {
    return process.env.NEXT_PUBLIC_GOOGLE_ADS_CUSTOMER_REQUEST_SEND_TO?.trim() ?? "";
  }
  if (eventName === GOOGLE_CTA_EVENTS.providerSearch) {
    return (
      process.env.NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SEARCH_SEND_TO?.trim() ||
      process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTORY_BROWSE_SEND_TO?.trim() ||
      ""
    );
  }

  return process.env.NEXT_PUBLIC_GOOGLE_ADS_PROVIDER_SIGNUP_SEND_TO?.trim() ?? "";
}

export function buildGoogleTagBootstrapSnippet() {
  if (!GOOGLE_TAG_IDS.length) return "";

  return [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag = window.gtag || gtag;",
    "gtag('js', new Date());",
    ...GOOGLE_TAG_IDS.map((id) => `gtag('config', '${id}');`),
  ].join("\n");
}
