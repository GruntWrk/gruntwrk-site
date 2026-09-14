import type { Metadata } from "next";
import { getDictionary, LOCALES, SITE_URL, type Locale } from "../../../lib/i18n";
import { SiteBottomNav, SiteFooter, SiteHeader } from "../SiteChrome";

const DESCRIPTION = { en: "Contact GruntWrk support by email.", pt: "Contacte o apoio GruntWrk por email.", de: "Kontaktieren Sie den GruntWrk-Support per E-Mail." };

const SUPPORT_EMAIL = "service@gruntwrk.com";

const COPY = {
  en: {
    back: "Back to homepage",
    title: "Contact GruntWrk",
  },
  pt: {
    back: "Voltar ao inicio",
    title: "Contactar a GruntWrk",
  },
    de: {
    back: "Zur\u00FCck zur Startseite",
    title: "Kontakt zu GruntWrk",
},
} as const;

function resolveLocale(input: string) {
  return (LOCALES.includes(input as Locale) ? input : "en") as Locale;
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = resolveLocale(params.locale);
  const copy = COPY[locale];
  const url = `${SITE_URL}/${locale}/contact`;

  return {
    title: copy.title,
    description: DESCRIPTION[locale],
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/contact`,
        pt: `${SITE_URL}/pt/contact`,
        "x-default": `${SITE_URL}/en/contact`,
    de: `${SITE_URL}/de/contact`,
      },
    },
    openGraph: {
      title: copy.title,
      description: DESCRIPTION[locale],
      url,
      siteName: "GruntWrk",
      locale: locale === "de" ? "de_DE" : (locale === "pt" ? "pt_PT" : "en_US"),
      type: "website",
    },
  };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const dict = getDictionary(locale);
  const copy = COPY[locale];

  return (
    <div className="siteFrame">
      <SiteHeader dict={dict} locale={locale} />

      <nav className="seoSubNav" aria-label={locale === "de" ? "Sprache" : locale === "pt" ? "Idioma" : "Language"}>
        <div className="seoSubNavInner" style={{ justifyContent: "flex-end" }}><div className="langToggle">
          {LOCALES.map((loc, index) => <span key={loc}>
            {index > 0 && <span className="langSep">{" | "}</span>}
            <a href={`/${loc}/contact`} className={loc === locale ? "langActive" : "langLink"} aria-current={loc === locale ? "page" : undefined}>{loc.toUpperCase()}</a>
          </span>)}
        </div></div>
      </nav>
      <main className="contactPage">
        <section className="contactPanel">
          <h1 className="contactTitle">{copy.title}</h1>

          <div className="contactEmailBox">
            <a className="contactEmailLink" href={`mailto:${SUPPORT_EMAIL}`}>
              <MailIcon />
              {SUPPORT_EMAIL}
            </a>
          </div>

          <a className="contactBackLink" href={`/${locale}`}>
            {copy.back}
          </a>
        </section>
      </main>

      <SiteFooter dict={dict} locale={locale} />
      <SiteBottomNav dict={dict} locale={locale} pageKind="seo" />
    </div>
  );
}
