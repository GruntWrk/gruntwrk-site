import { getDictionary, LOCALES, SITE_URL, type Locale } from "../../lib/i18n";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import { buildOrganizationSchema, buildWebsiteSchema, buildAggregateRatingSchema } from "../../lib/schema";
import {
  buildGoogleTagBootstrapSnippet,
  PRIMARY_GOOGLE_TAG_ID,
} from "../../lib/googleTag";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2355438711607015";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});

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
  alternateLanguages["x-default"] = SITE_URL;

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
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
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
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
  const schema = [buildWebsiteSchema(locale), buildOrganizationSchema(locale), buildAggregateRatingSchema()];
  const googleTagBootstrap = buildGoogleTagBootstrapSnippet();

  return (
    <html lang={locale} data-theme="light" className={outfit.variable}>
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
        {PRIMARY_GOOGLE_TAG_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GOOGLE_TAG_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: googleTagBootstrap,
              }}
            />
          </>
        ) : null}
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
