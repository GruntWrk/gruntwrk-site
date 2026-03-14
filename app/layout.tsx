import "./globals.css";

export const metadata = {
  title: "GruntWrk | Request local services, compare quotes, or book directly",
  description: "Request help from trusted local providers, compare quotes, chat in one place, and manage every step from request to payment with GruntWrk.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="application-name" content="GruntWrk" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GruntWrk" />
        <meta name="theme-color" content="#f3efe8" />
        <meta name="msapplication-TileColor" content="#0B0F14" />
        <meta name="msapplication-square150x150logo" content="/icons/mstile-150.png" />
        <meta name="msapplication-square310x310logo" content="/icons/mstile-310.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png" />
      </head>

      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
