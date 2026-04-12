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
        ? "Diretório local de prestadores de serviços. Consulte, compare e contacte diretamente em Portugal."
        : "Local service provider directory. Browse, compare, and contact providers directly in Portugal.",
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
    potentialAction: {
      "@type": "SearchAction",
      target: "https://app.gruntwrk.com/directory?q={search_term_string}&search=1",
      "query-input": "required name=search_term_string",
    },
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

export function buildFaqSchema(faqs: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildAggregateRatingSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GruntWrk",
    url: "https://www.gruntwrk.com",
    image: "https://www.gruntwrk.com/brand/gruntwrk-g.svg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "47",
      reviewCount: "47",
    },
    priceRange: "€0 - €500",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
    areaServed: [
      { "@type": "Country", name: "Portugal" },
    ],
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

