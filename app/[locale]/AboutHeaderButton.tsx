"use client";

import { useEffect, useState } from "react";
import ProviderInformation from "./ProviderInformation";
import { createPortal } from "react-dom";
import type { Locale } from "../../lib/i18n";

const COPY = {
  en: {
    label: "About",
    title: "About GruntWrk",
    close: "Close",
    description:
      "GruntWrk removes the grunt work of getting quotes for local services. Describe your job once, send it to up to five local service providers, and compare every quote in one place. Free for customers, with no markups on provider prices and no middleman.",
    legalTitle: "Legal",
    legalPrefix: "By using GruntWrk you agree to our",
    legalAnd: "and",
    legalSuffix: "disclosures.",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    trust: "Trust and Safety",
    contact: "Contact",
  },
  pt: {
    label: "Sobre",
    title: "Sobre GruntWrk",
    close: "Fechar",
    description:
      "O GruntWrk remove o trabalho repetitivo de obter orcamentos para servicos locais. Descreva o trabalho uma vez, envie-o a ate cinco prestadores locais e compare todos os orcamentos num so lugar. Gratuito para clientes, sem margens nos precos dos prestadores e sem intermediario.",
    legalTitle: "Legal",
    legalPrefix: "Ao usar o GruntWrk, concorda com os nossos",
    legalAnd: "e",
    legalSuffix: "divulgacoes.",
    terms: "Termos e Condicoes",
    privacy: "Politica de Privacidade",
    cookies: "Politica de Cookies",
    trust: "Confianca e Seguranca",
    contact: "Contacto",
  },
    de: {
    label: "\u00DCber uns",
    title: "\u00DCber GruntWrk",
    close: "Schlie\u00DFen",
    description: "GruntWrk erspart Ihnen die l\u00E4stige Arbeit, Angebote f\u00FCr lokale Dienstleistungen einzuholen. Beschreiben Sie Ihren Auftrag einmal, senden Sie ihn an bis zu f\u00FCnf lokale Dienstleister und vergleichen Sie jedes Angebot an einem Ort. Kostenlos f\u00FCr Kunden, ohne Aufschl\u00E4ge auf die Anbieterpreise und ohne Zwischenh\u00E4ndler.",
    legalTitle: "Rechtliches",
    legalPrefix: "Mit der Nutzung von GruntWrk akzeptieren Sie die folgenden Bedingungen und Hinweise:",
    legalAnd: "und",
    legalSuffix: ".",
    terms: "Allgemeine Gesch\u00E4ftsbedingungen",
    privacy: "Datenschutzerkl\u00E4rung",
    cookies: "Cookie-Richtlinie",
    trust: "Vertrauen und Sicherheit",
    contact: "Kontakt",
},
} as const;

const APP_BASE_URL = "https://app.gruntwrk.com";

export default function AboutHeaderButton({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const copy = COPY[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="appShellHeaderNavBtn appShellHeaderAboutBtn"
        aria-label={copy.label}
        title={copy.label}
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
        <span className="appShellHeaderNavLabel">{copy.label}</span>
      </button>

      {open && mounted
        ? createPortal(
            <div className="aboutModalOverlay" role="presentation" onClick={() => setOpen(false)}>
              <div className="aboutModal" role="dialog" aria-modal="true" aria-label={copy.title} onClick={(event) => event.stopPropagation()}>
                <div className="aboutModalHeader">
                  <h2>{copy.title}</h2>
                  <button className="aboutModalClose" type="button" onClick={() => setOpen(false)} aria-label={copy.close}>
                    {copy.close}
                  </button>
                </div>

                <div className="aboutModalSection">
                  <p>{copy.description}</p>
                </div>

                <div className="aboutModalSection">
                  <details className="providerAbout">
                    <summary>{locale === "de" ? "Für Dienstleister" : locale === "pt" ? "Para prestadores" : "For service providers"}</summary>
                    <ProviderInformation locale={locale} />
                  </details>
                  <h3>{copy.legalTitle}</h3>
                  <p>
                    {copy.legalPrefix} <a href={`${APP_BASE_URL}/terms?lang=${locale}`}>{copy.terms}</a>,{" "}
                    <a href={`${APP_BASE_URL}/privacy?lang=${locale}`}>{copy.privacy}</a>,{" "}
                    <a href={`${APP_BASE_URL}/cookies?lang=${locale}`}>{copy.cookies}</a>, {copy.legalAnd}{" "}
                    <a href={`${APP_BASE_URL}/trust?lang=${locale}`}>{copy.trust}</a> {copy.legalSuffix}
                  </p>
                </div>

                <div className="aboutModalSection">
                  <h3>{copy.contact}</h3>
                  <a className="aboutPill" href="mailto:service@gruntwrk.com">
                    <IconEmail />
                    service@gruntwrk.com
                  </a>
                </div>

              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

function IconEmail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5.2-8-5.2V6l8 5.2L20 6v2.2Z" />
    </svg>
  );
}
