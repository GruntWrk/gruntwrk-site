"use client";

import { useEffect, useState } from "react";
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
    socials: "Socials",
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
    socials: "Redes sociais",
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
                  <h3>{copy.legalTitle}</h3>
                  <p>
                    {copy.legalPrefix} <a href={`${APP_BASE_URL}/terms`}>{copy.terms}</a>,{" "}
                    <a href={`${APP_BASE_URL}/privacy`}>{copy.privacy}</a>,{" "}
                    <a href={`${APP_BASE_URL}/cookies`}>{copy.cookies}</a>, {copy.legalAnd}{" "}
                    <a href={`${APP_BASE_URL}/trust`}>{copy.trust}</a> {copy.legalSuffix}
                  </p>
                </div>

                <div className="aboutModalSection">
                  <h3>{copy.contact}</h3>
                  <a className="aboutPill" href="mailto:service@gruntwrk.com">
                    <IconEmail />
                    service@gruntwrk.com
                  </a>
                </div>

                <div className="aboutModalSection">
                  <h3>{copy.socials}</h3>
                  <div className="aboutSocials">
                    <a className="aboutPill" href="https://www.linkedin.com/company/gruntwrk" target="_blank" rel="noreferrer">
                      <IconLinkedIn />
                      LinkedIn
                    </a>
                    <a className="aboutPill" href="https://www.tiktok.com/@gruntwrk_official" target="_blank" rel="noreferrer">
                      <IconTikTok />
                      TikTok
                    </a>
                    <a className="aboutPill" href="https://www.instagram.com/grunt_wrk" target="_blank" rel="noreferrer">
                      <IconInstagram />
                      Instagram
                    </a>
                  </div>
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

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4 3a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-1 6h2v12H3V9Zm6 0h2v2c.5-1.1 2-2.3 4.2-2.3c3 0 4.8 1.9 4.8 5.7V21h-2v-6.1c0-2.1-.7-3.4-2.7-3.4c-1.6 0-2.8 1.1-3.1 2.5c-.1.3-.1.8-.1 1.2V21H9V9Z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M16 2c.5 3.2 2.6 5.3 6 5.6V11c-1.9 0-3.6-.6-5-1.6V16c0 4-3.1 6-6.3 6c-3.6 0-6.7-3-6.7-6.7c0-3.8 3.1-6.8 6.9-6.8c.4 0 .8 0 1.1.1v3.8c-.3-.1-.6-.2-1-.2c-1.9 0-3.5 1.5-3.5 3.4c0 1.9 1.5 3.5 3.5 3.5c2.1 0 3.3-1.4 3.3-3.8V2h2.7Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.4a1.15 1.15 0 1 1 0 2.3a1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  );
}
