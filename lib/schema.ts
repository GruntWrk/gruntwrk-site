import { SITE_URL, type Locale } from "./i18n";
import type { SeoBreadcrumb, ResolvedSeoPage } from "./seoPages";

const ORGANIZATION_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;

export function buildOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "GruntWrk",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/gruntwrk-g.svg`,
    description:
      locale === "pt"
        ? "Marketplace de serviços locais para clientes e prestadores, com foco inicial em Portugal."
        : "Local services marketplace for customers and providers, with an initial focus on Portugal.",
    areaServed: ["Portugal", "Lisbon", "Porto"],
  };
}

export function buildWebsiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "GruntWrk",
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
  };
}

export function buildBreadcrumbSchema(items: SeoBreadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function buildServiceSchema(page: ResolvedSeoPage) {
  if (!page.serviceSchema) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.serviceSchema.name,
    description: page.serviceSchema.description,
    serviceType: page.serviceSchema.serviceType,
    areaServed: page.serviceSchema.areaServed,
    provider: { "@id": ORGANIZATION_ID },
    url: `${SITE_URL}${page.path}`,
  };
}

