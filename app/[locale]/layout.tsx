import { getDictionary, LOCALES, SITE_URL, type Locale } from "../../lib/i18n";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (LOCALES.includes(params.locale as Locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);

  const alternateLanguages: Record<string, string> = {};
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}`;
  }

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "GruntWrk",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (LOCALES.includes(params.locale as Locale) ? params.locale : "en") as Locale;

  return (
    <html lang={locale} data-theme="light">
      <head>
        <meta name="application-name" content="GruntWrk" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GruntWrk" />
        <meta name="theme-color" content="#f3efe8" />
        <meta name="msapplication-TileColor" content="#0B0F14" />
        <meta name="msapplication-square150x150logo" content="/icons/mstile-150.png" />
        <meta name="msapplication-square310x310logo" content="/icons/mstile-310.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GruntWrk",
              url: `${SITE_URL}/${locale}`,
              inLanguage: locale,
            }),
          }}
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
