"use client";
import { TrackedCtaLink } from "../TrackedCtaLink";
import { getDictionary, type Locale } from "../../lib/i18n";
import { siteLabels } from "../../lib/siteLabels";
const PROVIDER_HREF = "https://app.gruntwrk.com/login?next=%2Fprovider%2Fprofile";
function ArrowIcon() {
  return (
    <svg className="btnIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="perkIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function BlurredCompetitors({ names, locale }: { names: string[]; locale: Locale }) {
  return (
    <div className="hp-fee-market-list" aria-label={siteLabels(locale).competitors}>
      {names.map((name) => (
        <span key={name} className="hp-fee-market-badge hp-fee-market-badge-blur">
          {name}
        </span>
      ))}
    </div>
  );
}

export default function ProviderInformation({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const feeRows = dict.fees.rows;
  return <div className="providerInformation">
          <section className="hp-provider">
            <div className="hp-provider-inner">
              <div className="hp-provider-left">
                <div className="hp-provider-eyebrow">{dict.provider.badge}</div>
                <h2 className="hp-provider-title">{dict.provider.title}</h2>
                <p className="hp-provider-desc">{dict.provider.desc}</p>
                <ul className="hp-provider-perks">
                  {dict.provider.perks.map((perk) => (
                    <li key={perk}><CheckIcon /> {perk}</li>
                  ))}
                </ul>
                <TrackedCtaLink
                  className="hp-btn-primary"
                  href={PROVIDER_HREF}
                  ctaLocation="home_provider_section"
                  locale={locale}
                  pageKind="home"
                >
                  {dict.provider.cta}
                  <ArrowIcon />
                </TrackedCtaLink>
              </div>
            </div>
          </section>

          <section className="hp-fees" aria-labelledby="hp-fees-title">
            <div className="hp-fees-head">
              <div className="hp-fees-kicker">{dict.fees.kicker}</div>
              <h2 id="hp-fees-title" className="hp-h2">{dict.fees.heading}</h2>
              <p className="hp-subtitle hp-fees-subtitle">{dict.fees.subtitle}</p>
            </div>

            <div className="hp-fee-table-wrap">
              <table className="hp-fee-table">
                <thead>
                  <tr>
                    {dict.fees.tableHeaders.map((header) => (
                      <th key={header} scope="col">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.fee}>
                      <td>
                        <span className="hp-fee-label">{row.fee}</span>
                      </td>
                      <td>
                        <BlurredCompetitors locale={locale} names={row.competitors} />
                        <p className="hp-fee-market-copy">{row.marketSummary}</p>
                      </td>
                      <td>
                        <span className={`hp-fee-grunt ${row.gruntwrk.startsWith("10%") ? "is-fee" : "is-free"}`}>
                          {row.gruntwrk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hp-fee-cards">
              {feeRows.map((row) => (
                <article key={`m-${row.fee}`} className="hp-fee-card">
                  <div className="hp-fee-card-head">
                    <span className="hp-fee-label">{row.fee}</span>
                    <span className={`hp-fee-grunt ${row.gruntwrk.startsWith("10%") ? "is-fee" : "is-free"}`}>
                      {row.gruntwrk}
                    </span>
                  </div>
                  <p className="hp-fee-market-copy">{row.marketSummary}</p>
                </article>
              ))}
            </div>

            <p className="hp-fee-note">{dict.fees.note}</p>
          </section>

  </div>;
}
