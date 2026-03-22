import { getDictionary, LOCALES, type Locale } from "../../lib/i18n";
import HomePage from "./HomePage";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);
  return <HomePage dict={dict} locale={locale} />;
}
