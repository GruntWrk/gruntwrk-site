// app/InstallPrompt.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  // iOS Safari
  // @ts-ignore
  const iosStandalone = typeof navigator !== "undefined" && (navigator as any).standalone === true;
  // Modern browsers
  const displayModeStandalone =
    typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches;

  return iosStandalone || displayModeStandalone;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iPhone = /iPhone/i.test(ua);
  const iPad = /iPad/i.test(ua);
  const iPod = /iPod/i.test(ua);
  const iPadOS =
    /Macintosh/i.test(ua) &&
    typeof (navigator as any).maxTouchPoints === "number" &&
    (navigator as any).maxTouchPoints > 1;
  return iPhone || iPad || iPod || iPadOS;
}

function isSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isChrome = /CriOS|Chrome/i.test(ua);
  const isFirefox = /FxiOS|Firefox/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !isChrome && !isFirefox;
  return isSafari;
}

export default function InstallPromptButton({
  className,
  onHintChange,
}: {
  className?: string;
  onHintChange?: (hint: string | null) => void;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [temporaryLabel, setTemporaryLabel] = useState<string | null>(null);

  const ios = useMemo(() => isIOS(), []);
  const safari = useMemo(() => isSafari(), []);
  const canShowIOSHelp = ios && safari;

  useEffect(() => {
    setInstalled(isStandalone());

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    function onAppInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
      setShowIOSHelp(false);
      setTemporaryLabel(null);
      onHintChange?.(null);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt as any);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt as any);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [onHintChange]);

  useEffect(() => {
    if (installed) onHintChange?.(null);
  }, [installed, onHintChange]);

  if (installed) return null;

  async function onClick() {
    if (deferredPrompt) {
      // UX nudge: tell them exactly what to do next
      const hint = "In the pop-up, tap Install.";
      onHintChange?.(hint);
      setTemporaryLabel("Tap Install in the pop-up");

      // Clear hint after a few seconds
      window.setTimeout(() => {
        setTemporaryLabel(null);
        onHintChange?.(null);
      }, 4500);

      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice.catch(() => null);
        if (choice && choice.outcome === "accepted") {
          onHintChange?.(null);
        }
      } catch {
        // ignore
      }
      return;
    }

    if (canShowIOSHelp) {
      setShowIOSHelp((v) => !v);
      return;
    }

    window.location.href = "https://app.gruntwrk.com";
  }

  const label = temporaryLabel
    ? temporaryLabel
    : deferredPrompt
    ? "Install now"
    : canShowIOSHelp
    ? "Install app"
    : "Open app";

  return (
    <div style={{ width: "100%" }}>
      <button className={className || "btnPrimary"} type="button" onClick={onClick}>
        {label}
      </button>

      {showIOSHelp ? (
        <div
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.18)",
            textAlign: "left",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Install on iPhone</div>
          <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.45 }}>
            Tap <b>Share</b> (the square with the arrow), then tap <b>Add to Home Screen</b>.
          </div>
        </div>
      ) : null}
    </div>
  );
}
