const rawTagIds = [
  process.env.NEXT_PUBLIC_GOOGLE_TAG_ID,
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
];

function splitIds(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const GOOGLE_TAG_IDS = Array.from(new Set(rawTagIds.flatMap(splitIds)));
export const PRIMARY_GOOGLE_TAG_ID = GOOGLE_TAG_IDS[0] ?? "";

export const GOOGLE_CTA_EVENTS = {
  customerRequest: "customer_request_click",
  providerSignup: "provider_signup_click",
} as const;

export type GoogleCtaEventName =
  (typeof GOOGLE_CTA_EVENTS)[keyof typeof GOOGLE_CTA_EVENTS];

export function getGoogleAdsSendTo(eventName: GoogleCtaEventName) {
  if (eventName === GOOGLE_CTA_EVENTS.customerRequest) {
    return process.env.NEXT_PUBLIC_GOOGLE_ADS_CUSTOMER_REQUEST_SEND_TO?.trim() ?? "";
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
