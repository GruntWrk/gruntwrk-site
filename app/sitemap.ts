import type { MetadataRoute } from "next";

const SITE_URL = "https://www.gruntwrk.com";
const LOCALES = ["en", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((loc) => [loc, `${SITE_URL}/${loc}`])
      ),
    },
  }));
}
