import { getDictionary, LOCALES, type Locale } from "../../lib/i18n";
import { getSeoNavItems } from "../../lib/seoPages";
import HomePage from "./HomePage";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);
  const nav = getSeoNavItems(locale, `/${locale}`);
  return <HomePage dict={dict} locale={locale} nav={nav} />;
}
