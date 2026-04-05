import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, LOCALES, SITE_URL, type Locale } from "../../../lib/i18n";
import {
  getSeoAlternateLanguages,
  getSeoPage,
  getSeoPageStaticParams,
  getSeoNavItems,
  type SeoNavItem,
  type ResolvedSeoPage,
} from "../../../lib/seoPages";
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "../../../lib/schema";
import { TrackedCtaLink } from "../../TrackedCtaLink";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { SeoRevealProvider } from "./SeoReveal";

function resolveLocale(input: string) {
  return (LOCALES.includes(input as Locale) ? input : "en") as Locale;
}

export function generateStaticParams() {
  return getSeoPageStaticParams();
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string[] };
}): Metadata {
  const locale = resolveLocale(params.locale);
  const page = getSeoPage(locale, params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${SITE_URL}${page.path}`,
      languages: getSeoAlternateLanguages(page),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: "GruntWrk",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Inline SVG helpers                                                */
/* ------------------------------------------------------------------ */

function ChevronDown() {
  return (
    <svg className="seoSubNavChevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="perkIcon">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`star ${filled ? "starFilled" : ""}`} viewBox="0 0 16 16">
      <path d="M8 1.3l1.8 3.7 4 .6-2.9 2.8.7 4L8 10.6l-3.6 1.8.7-4L2.2 5.6l4-.6L8 1.3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-navigation                                                    */
/* ------------------------------------------------------------------ */

function SeoSubNav({
  locale,
  page,
  cities,
  services,
}: {
  locale: Locale;
  page: ResolvedSeoPage;
  cities: SeoNavItem[];
  services: SeoNavItem[];
}) {
  const isCityActive = cities.some((c) => c.active);
  const isServiceActive = services.some((s) => s.active);
  const citiesLabel = locale === "pt" ? "Cidades" : "Cities";
  const servicesLabel = locale === "pt" ? "Servicos" : "Services";

  return (
    <nav className="seoSubNav" aria-label="SEO navigation">
      <div className="seoSubNavInner">
        <div className="seoSubNavLinks">
          <details className="seoSubNavGroup">
            <summary className={`seoSubNavTrigger ${isCityActive ? "active" : ""}`}>
              {citiesLabel}
              <ChevronDown />
            </summary>
            <div className="seoSubNavDropdown">
              {cities.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`seoSubNavDropdownLink ${item.active ? "active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
          <details className="seoSubNavGroup">
            <summary className={`seoSubNavTrigger ${isServiceActive ? "active" : ""}`}>
              {servicesLabel}
              <ChevronDown />
            </summary>
            <div className="seoSubNavDropdown">
              {services.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`seoSubNavDropdownLink ${item.active ? "active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
        <div className="langToggle">
          {LOCALES.map((loc, index) => (
            <span key={loc}>
              {index > 0 && <span className="langSep">{"\u00A0|\u00A0"}</span>}
              {loc === locale ? (
                <span className="langActive">{loc.toUpperCase()}</span>
              ) : (
                <a
                  href={page.alternates[loc as Locale].replace(SITE_URL, "")}
                  className="langLink"
                >
                  {loc.toUpperCase()}
                </a>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section renderers                                                 */
/* ------------------------------------------------------------------ */

function StatsStrip({ stats }: { stats: NonNullable<ResolvedSeoPage["stats"]> }) {
  return (
    <div className="hp-stats-strip" data-reveal>
      {stats.map((stat) => (
        <div key={stat.label} className="hp-stat">
          <span className="hp-stat-value">{stat.value}</span>
          <span className="hp-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function BenefitCards({
  cards,
  locale,
}: {
  cards: NonNullable<ResolvedSeoPage["benefitCards"]>;
  locale: Locale;
}) {
  const heading = locale === "pt" ? "Porque as pessoas mudam para o GruntWrk" : "Why people switch to GruntWrk";
  return (
    <section className="hp-cb" data-reveal>
      <h2 className="seoCardsTitle">{heading}</h2>
      <div className="hp-cb-list">
        {cards.map((card) => (
          <div key={card.title} className="hp-cb-row">
            <h3 className="hp-cb-title">{card.title}</h3>
            <p className="hp-cb-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({
  steps,
  locale,
}: {
  steps: NonNullable<ResolvedSeoPage["howSteps"]>;
  locale: Locale;
}) {
  const heading = locale === "pt" ? "Como funciona" : "How it works";
  return (
    <section className="hp-how" data-reveal>
      <h2 className="seoCardsTitle">{heading}</h2>
      <div className="hp-how-grid">
        {steps.map((step) => (
          <div key={step.num} className="hp-how-card">
            <span className="hp-how-num">{step.num}</span>
            <div className="hp-how-copy">
              <h3 className="hp-how-title">{step.title}</h3>
              <p className="hp-how-body">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderCtaSection({
  cta,
  locale,
  pageKind,
}: {
  cta: NonNullable<ResolvedSeoPage["providerCta"]>;
  locale: Locale;
  pageKind: ResolvedSeoPage["kind"];
}) {
  return (
    <section className="hp-provider" data-reveal>
      <div className="hp-provider-inner">
        <div className="hp-provider-left">
          <span className="hp-provider-badge">{cta.badge}</span>
          <h2 className="hp-provider-title">{cta.title}</h2>
          <p className="hp-provider-desc">{cta.desc}</p>
          <ul className="hp-provider-perks">
            {cta.perks.map((perk) => (
              <li key={perk}>
                <CheckIcon />
                {perk}
              </li>
            ))}
          </ul>
          {cta.cta ? (
            <div>
              <TrackedCtaLink
                href={cta.cta.href}
                className="hp-btn-primary"
                ctaLocation="seo_provider_section"
                locale={locale}
                pageKind={pageKind}
              >
                {cta.cta.label}
              </TrackedCtaLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({
  reviews,
  locale,
}: {
  reviews: NonNullable<ResolvedSeoPage["reviews"]>;
  locale: Locale;
}) {
  const heading = locale === "pt" ? "O que dizem os utilizadores" : "What users say";
  return (
    <section data-reveal>
      <h2 className="seoCardsTitle" style={{ marginBottom: 18 }}>
        {heading}
      </h2>
      <div className="seoReviewsGrid">
        {reviews.map((review) => (
          <div key={review.name} className="reviewCardNew seoReviewCard">
            <div className="reviewCardHeader">
              <div className="reviewAvatar">{review.name.charAt(0)}</div>
              <div className="reviewCardMeta">
                <span className="reviewName">{review.name}</span>
              </div>
              <span className="reviewRole">{review.role}</span>
            </div>
            <div className="stars" style={{ marginTop: 10 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < review.stars} />
              ))}
            </div>
            <p className="reviewTextNew">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function SeoPage({
  params,
}: {
  params: { locale: string; slug: string[] };
}) {
  const locale = resolveLocale(params.locale);
  const page = getSeoPage(locale, params.slug);

  if (!page) notFound();

  const dict = getDictionary(locale);
  const breadcrumbSchema = buildBreadcrumbSchema(page.breadcrumbs);
  const serviceSchema = buildServiceSchema(page);
  const faqSchema = page.faqs?.length ? buildFaqSchema(page.faqs) : null;
  const nav = getSeoNavItems(locale, page.path);

  const isCityPage = page.kind === "city";

  return (
    <div className="siteFrame seoPageFrame">
      <SiteHeader dict={dict} locale={locale} />
      <SeoRevealProvider />
      <SeoSubNav locale={locale} page={page} cities={nav.cities} services={nav.services} />

      <main className="seoPageMain">
        {/* Hero */}
        <section className="seoHero">
          <div className="sectionInner">
            <nav className="seoBreadcrumbs" aria-label="Breadcrumb">
              {page.breadcrumbs.map((item, index) => (
                <span key={item.href} className="seoBreadcrumbItem">
                  {index > 0 && <span className="seoBreadcrumbSep">/</span>}
                  {index === page.breadcrumbs.length - 1 ? (
                    <span>{item.label}</span>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </span>
              ))}
            </nav>

            <div className="seoHeroPanel" data-reveal>
              <div className="seoEyebrow">{page.eyebrow}</div>
              <h1 className="seoHeroTitle">{page.heroTitle}</h1>
              <p className="seoHeroDescription">{page.heroDescription}</p>

              <div className="seoHeroActions">
                <TrackedCtaLink
                  href={page.primaryCta.href}
                  className="hp-btn-secondary"
                  ctaLocation="seo_hero_primary"
                  locale={locale}
                  pageKind={page.kind}
                >
                  {page.primaryCta.label}
                </TrackedCtaLink>
                {page.secondaryCta ? (
                  <TrackedCtaLink
                    href={page.secondaryCta.href}
                    className="hp-btn-primary"
                    ctaLocation="seo_hero_secondary"
                    locale={locale}
                    pageKind={page.kind}
                  >
                    {page.secondaryCta.label}
                  </TrackedCtaLink>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        {page.stats?.length ? (
          <section className="seoSection">
            <div className="sectionInner">
              <StatsStrip stats={page.stats} />
            </div>
          </section>
        ) : null}

        {/* City page: benefit cards + how-it-works */}
        {isCityPage && page.benefitCards?.length ? (
          <section className="seoSection">
            <div className="sectionInner">
              <BenefitCards cards={page.benefitCards} locale={locale} />
            </div>
          </section>
        ) : null}

        {isCityPage && page.howSteps?.length ? (
          <section className="seoSection">
            <div className="sectionInner">
              <HowItWorks steps={page.howSteps} locale={locale} />
            </div>
          </section>
        ) : null}

        {/* Non-city pages: traditional sections */}
        {!isCityPage && page.sections.length > 0 ? (
          <section className="seoSections">
            <div className="sectionInner seoSectionGrid">
              {page.sections.map((section) => (
                <article key={section.title} className="seoCard" data-reveal>
                  <h2 className="seoCardTitle">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="seoCardCopy">
                      {paragraph}
                    </p>
                  ))}
                  {section.items?.length ? (
                    <ul className="seoBulletList">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Explore services / cards */}
        {page.cards?.length ? (
          <section className="seoCardsSection" data-reveal>
            <div className="sectionInner">
              <div className="seoCardsHeader">
                <h2 className="seoCardsTitle">{page.cardsTitle}</h2>
              </div>
              <div className="seoCardsGrid">
                {page.cards.map((card) => (
                  <a key={card.href} href={card.href} className="seoLinkCard">
                    <h3 className="seoLinkCardTitle">{card.title}</h3>
                    <p className="seoLinkCardCopy">{card.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Provider CTA */}
        {page.providerCta ? (
          <section className="seoSection">
            <div className="sectionInner">
              <ProviderCtaSection cta={page.providerCta} locale={locale} pageKind={page.kind} />
            </div>
          </section>
        ) : null}

        {/* Reviews */}
        {page.reviews?.length ? (
          <section className="seoSection">
            <div className="sectionInner">
              <ReviewsSection reviews={page.reviews} locale={locale} />
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {page.faqs?.length ? (
          <section className="seoFaqSection" data-reveal>
            <div className="sectionInner">
              <h2 className="seoCardsTitle">{page.faqTitle}</h2>
              <div className="seoFaqList">
                {page.faqs.map((faq) => (
                  <article key={faq.question} className="seoFaqItem">
                    <h3 className="seoFaqQuestion">{faq.question}</h3>
                    <p className="seoFaqAnswer">{faq.answer}</p>
                  </article>
                ))}
              </div>
              {page.note ? <p className="seoPageNote">{page.note}</p> : null}
            </div>
          </section>
        ) : page.note ? (
          <section className="seoFaqSection">
            <div className="sectionInner">
              <p className="seoPageNote">{page.note}</p>
            </div>
          </section>
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {serviceSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          />
        ) : null}
        {faqSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        ) : null}
      </main>

      <SiteFooter dict={dict} />
    </div>
  );
}
