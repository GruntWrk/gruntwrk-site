import type { Metadata } from "next";
import { getDictionary, LOCALES, SITE_URL, type Locale } from "../../../lib/i18n";
import { SiteBottomNav, SiteFooter, SiteHeader } from "../SiteChrome";

const SUPPORT_EMAIL = "service@gruntwrk.com";

const COPY = {
  en: {
    back: "Back to homepage",
    emailLabel: "Support email",
    title: "Contact GruntWrk",
  },
  pt: {
    back: "Voltar ao inicio",
    emailLabel: "Email de suporte",
    title: "Contactar a GruntWrk",
  },
} as const;

function resolveLocale(input: string) {
  return (LOCALES.includes(input as Locale) ? input : "en") as Locale;
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
    description: "Contact GruntWrk support by email.",
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/contact`,
        pt: `${SITE_URL}/pt/contact`,
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: copy.title,
      description: "Contact GruntWrk support by email.",
      url,
      siteName: "GruntWrk",
      locale: locale === "pt" ? "pt_PT" : "en_US",
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

      <main className="contactPage">
        <section className="contactPanel">
          <h1 className="contactTitle">{copy.title}</h1>

          <div className="contactEmailBox">
            <span>{copy.emailLabel}</span>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
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
