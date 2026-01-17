// app/page.tsx
"use client";

import { useState } from "react";
import AboutModal from "./AboutModal";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const appBase = "https://app.gruntwrk.com";
  const signInRegisterHref = `${appBase}/login?intent=signin&next=/notice-board`;

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

            <div className="ctaRow">
              <a className="btnPrimary" href={signInRegisterHref}>
                Sign-in / Register
              </a>
            </div>
          </section>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}
