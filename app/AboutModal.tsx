// app/AboutModal.tsx
"use client";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
      <path d="M16.5 7.5h.01" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 10.5V18" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 7.2h0.01" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
      <path d="M10.5 18v-4.2c0-1.7 1-2.7 2.4-2.7c1.3 0 2.1.9 2.1 2.5V18" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 10.5V18" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 18L17 6" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 6l10 12" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 7c1.2 1.7 2.6 2.4 4 2.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 7v8.2c0 2.1-1.7 3.8-3.8 3.8S6.4 17.3 6.4 15.2c0-2.1 1.7-3.8 3.8-3.8c.6 0 1.2.1 1.7.4"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const aboutTitle = "About GruntWrk";
  const aboutSubtitle = "A global platform that enables physical work.";

  const p1 =
    "As algorithms automate more and more white-collar, office-based work, something important is happening beneath the surface. Work that cannot be outsourced to a machine becomes more scarce. Scarcity creates value. Over the next decades, we believe the fastest-growing cohort of wealth will come from people who can do real, physical work.";

  const p2 =
    "GruntWrk is a global platform that enables physical work. A neutral place where people post any work that needs to be done, and others choose to do it. Just visibility. Just real work. We didn’t choose the name GruntWrk to make it sound better. We chose it because we believe grunt work is where the future of value is being created.";

  // Replace these with your real URLs later
  const socials = [
    { label: "Instagram", href: "#", icon: <InstagramIcon /> },
    { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
    { label: "X (Twitter)", href: "#", icon: <XIcon /> },
    { label: "TikTok", href: "#", icon: <TikTokIcon /> },
  ];

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label={aboutTitle}>
      <div className="modalCard">
        <div className="modalTop">
          <div>
            <h2 className="modalH1">{aboutTitle}</h2>
            <div className="modalSub">{aboutSubtitle}</div>
          </div>

          <button className="modalClosePill" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="hr" />

        <div className="modalBody">
          <p>{p1}</p>
          <p>{p2}</p>
        </div>

        <div className="hr" />

        <div>
          <div className="socialsTitle">Socials</div>
          <div className="socialsGrid">
            {socials.map((s) => (
              <a key={s.label} className="socialBtn" href={s.href} target="_blank" rel="noreferrer">
                <span className="socialIcon">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
