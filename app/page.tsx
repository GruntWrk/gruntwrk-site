// app/page.tsx
"use client";

import { useState } from "react";
import AboutModal from "./AboutModal";

type Review = {
  stars: 4 | 5;
  text: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "star starFilled" : "star"}
    >
      <path d="M12 17.27l-5.18 3.05 1.4-5.92L3 9.24l6.06-.52L12 3l2.94 5.72 6.06.52-5.22 5.16 1.4 5.92L12 17.27z" />
    </svg>
  );
}

function Stars({ count }: { count: 4 | 5 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {stars.map((n) => (
        <StarIcon key={n} filled={n <= count} />
      ))}
    </div>
  );
}

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const appBase = "https://app.gruntwrk.com";
  const browseHref = `${appBase}/notice-board`;

  // Only 4–5 star, clearly positive comments from your Play Store screenshots.
  const reviews: Review[] = [
    {
      stars: 5,
      text: "Very effective platform for connecting clients and service providers. Finding and booking a job is simple and fast.",
    },
    {
      stars: 4,
      text: "The notice board feature is well organised and makes it easy to find available services in your area.",
    },
    {
      stars: 5,
      text: "I like how profiles show ratings, skills, and reviews. It helps users quickly evaluate providers.",
    },
  ];

  return (
    <main className="hero">
      <div className="heroBg" />
      <div className="heroOverlay" />

      <div className="container">
        <div className="topRight">
          <button className="iconBtn" type="button" onClick={() => setAboutOpen(true)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16" stroke="rgba(255,255,255,0.90)" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12h16" stroke="rgba(255,255,255,0.90)" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17h16" stroke="rgba(255,255,255,0.90)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="centerWrap">
          <section className="centerContent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="spinLogo" src="/brand/gruntwrk-g.svg" alt="GruntWrk" />

            <h1 className="brandName">GruntWrk</h1>

            <div className="strapline">Get work done. Find work fast.</div>

            <div className="ctaRow" style={{ flexDirection: "column", gap: 12, alignItems: "center" }}>
              <a className="btnPrimary" href={browseHref}>
                Browse services
              </a>

              {/* Reviews block */}
              <div className="reviewsPanel" role="region" aria-label="App reviews">
                <div className="reviewsHeader">
                  <div className="reviewsTitle">App reviews</div>
                  <div className="reviewsSubtitle">
                    <span className="ratingPill">4.8</span>
                    <span className="dotSep">•</span>
                    <span className="mutedLine">Early Access feedback</span>
                  </div>
                </div>

                <div className="reviewGrid">
                  {reviews.map((r, idx) => (
                    <div key={idx} className="reviewCard">
                      <div className="reviewTop reviewTopLeft">
                        <Stars count={r.stars} />
                      </div>
                      <div className="reviewText">{r.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}