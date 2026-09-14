const steps = [
  ["Anfrage beschreiben", "Beschreiben Sie einmal, welche Dienstleistung Sie benötigen."],
  ["Angebote erhalten", "Wählen Sie bis zu fünf Dienstleister aus, die wir für Sie kontaktieren."],
  ["Dienstleister auswählen", "Vergleichen Sie Preise und Angebote an einem Ort."],
  ["Direkt bezahlen", "Bezahlen Sie den Dienstleister direkt für die vereinbarte Arbeit."],
  ["Auftrag abschließen", "Nach Abschluss zahlt der Dienstleister eine Gebühr von 10 % an GruntWrk."],
];

export default function GermanFeesExplainer() {
  return (
    <section lang="de" aria-label="So funktionieren die GruntWrk-Gebühren" style={{ padding: "clamp(20px, 4vw, 48px)", borderRadius: 16, background: "#f3efe8", color: "#17251e" }}>
      <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", margin: "0 0 12px" }}>Eine Anfrage. Mehrere Angebote. Klare Gebühren.</h2>
      <p style={{ margin: "0 0 24px", fontSize: 18 }}>Für Kunden kostenlos. Keine Kontaktgebühren, keine Abos.</p>
      <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16, padding: 0, margin: 0, listStyle: "none" }}>
        {steps.map(([title, body], i) => (
          <li key={title} style={{ background: "#fff", padding: 20, borderRadius: 12, lineHeight: 1.5 }}>
            <span aria-hidden="true" style={{ display: "inline-grid", placeItems: "center", width: 36, height: 36, borderRadius: "50%", background: "#22c55e", fontWeight: 700 }}>{i + 1}</span>
            <h3 style={{ fontSize: 18, margin: "12px 0 8px" }}>{title}</h3>
            <p style={{ margin: 0 }}>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
