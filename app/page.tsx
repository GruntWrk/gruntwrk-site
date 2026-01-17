// app/page.tsx
export default function Home() {
  const appBase = "https://app.gruntwrk.com";
  const signInRegisterHref = `${appBase}/login?intent=signin&next=/notice-board`;

  return (
    <main className="hero">
      <div className="heroBg" />
      <div className="heroOverlay" />

      <div className="container">
        <div className="centerWrap">
          <section className="centerContent">
            {/* REAL LOGO (SVG preferred) */}
            {/* If you upload PNG instead, change src to "/brand/gruntwrk-g.png" */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="spinLogo" src="/brand/gruntwrk-g.svg" alt="GruntWrk" />

            <h1 className="h1">Get work done. Find work fast.</h1>
            <p className="sub">Post jobs. Offer your skills. Connect with people.</p>

            <div className="ctaRow">
              <a className="btnPrimary" href={signInRegisterHref}>
                Sign-in / Register
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
