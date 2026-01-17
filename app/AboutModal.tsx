// app/AboutModal.tsx
"use client";

export default function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  // TODO: Paste the exact About content from your app’s AboutModal here.
  const ABOUT_TEXT = `
              As algorithms automate more and more white-collar, office-based work, something important is happening
              beneath the surface. Work that cannot be outsourced to a machine becomes more scarce. Scarcity creates
              value. Over the next decades, we believe the fastest-growing cohort of wealth will come from people who
              can do real, physical work.
            </p>

            <p className="sub" style={{ margin: 0, lineHeight: 1.7 }}>
              GruntWrk is a global platform that enables physical work. A neutral place where people post any work that
              needs to be done, and others choose to do it. Just visibility. Just real work. We didnâ€™t choose the name
              GruntWrk to make it sound better. We chose it because we believe grunt work is where the future of value
              is being created.
            </p>

            <div className="hr" />

            <div style={{ fontWeight: 800 }}>Socials</div>

            <div className="stack" style={{ gap: 10 }}>
              <a
                className="pill"
                href="https://www.instagram.com/gruntwrk_official"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content" }}
              >
                <IconInstagram />
                Instagram
              </a>

              <a
                className="pill"
                href="https://www.linkedin.com/company/gruntwrk"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content" }}
              >
                <IconLinkedIn />
                LinkedIn
              </a>

              <a
                className="pill"
                href="https://x.com/gruntwrk_x"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content" }}
              >
                <IconX />
                X (Twitter)
              </a>

              <a
                className="pill"
                href="https://www.tiktok.com/@gruntwrk_official"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content" }}
              >
                <IconTikTok />
                TikTok
              </a>
            </div>

  `.trim();

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="About GruntWrk">
      <div className="modalCard">
        <div className="modalHeader">
          <h2 className="modalTitle">About GruntWrk</h2>
          <button className="modalClose" type="button" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="modalBody">
          {ABOUT_TEXT.split("\n\n").map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
