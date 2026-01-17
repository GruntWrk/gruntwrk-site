export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/wallpaper.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)"
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "24px",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: 16 }}>
          Get work done. Find work fast.
        </h1>

        <p style={{ maxWidth: 560, fontSize: "1.2rem", opacity: 0.9 }}>
          Post jobs. Offer your skills. Connect with real people in your local community.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          <a
            href="https://app.gruntwrk.com/login"
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              background: "#4ade80",
              color: "#07110C",
              fontWeight: 900,
              textDecoration: "none"
            }}
          >
            Open the app
          </a>

          <a
            href="https://app.gruntwrk.com/register"
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.6)",
              color: "white",
              fontWeight: 900,
              textDecoration: "none"
            }}
          >
            Get started
          </a>
        </div>
      </div>
    </main>
  );
}
