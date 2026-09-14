import type { MetadataRoute } from "next";
import { getSeoPages } from "../lib/seoPages";

const SITE_URL = "https://www.gruntwrk.com";
const LOCALES = ["en", "pt", "de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        [...LOCALES.map((loc) => [loc, `${SITE_URL}/${loc}`]), ["x-default", SITE_URL]]
      ),
    },
  }));

  const seoEntries = getSeoPages().map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:
      page.kind === "service" ? 0.88 : 0.72,
    alternates: {
      languages: {
        ...page.alternates,
        "x-default": page.alternates.en,
      },
    },
  }));

  const contactEntries = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/contact`,
    alternates: { languages: Object.fromEntries(LOCALES.map((loc) => [loc, `${SITE_URL}/${loc}/contact`])) },
  }));
  return [...homeEntries, ...seoEntries, ...contactEntries];
}
