import { getDictionary } from "../../lib/i18n";

const TITLES = {
  en: "How GruntWrk fees work",
  pt: "Como funcionam as taxas da GruntWrk",
  de: "So funktionieren die GruntWrk-Gebühren",
};

export default function FeesInformation({ locale }: { locale: "en" | "pt" | "de" }) {
  return (
    <details className="providerAbout feesAbout">
      <summary>{TITLES[locale]}</summary>
      <img
        className="hp-how-image"
        src={`/images/how-fees-work-${locale}.webp`}
        width={locale === "de" ? 1672 : 1600}
        height={locale === "de" ? 941 : 900}
        alt={getDictionary(locale).howItWorks.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ display: "block", width: "100%", height: "auto", marginTop: 16 }}
      />
    </details>
  );
}
