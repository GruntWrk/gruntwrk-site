import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "pt", "de"];
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "gw_locale";

function getLocaleFromHeaders(request: NextRequest): string {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && LOCALES.includes(saved)) return saved;
  const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
  if (country === "PT") return "pt";
  if (country === "DE") return "de";
  return DEFAULT_LOCALE;
}

function rememberLocale(request: NextRequest, response: NextResponse, locale: string) {
  const host = request.nextUrl.hostname.toLowerCase();
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/", sameSite: "lax", httpOnly: false, maxAge: 60 * 60 * 24 * 365,
    ...(host === "gruntwrk.com" || host.endsWith(".gruntwrk.com") ? { domain: ".gruntwrk.com" } : {}),
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return rememberLocale(request, NextResponse.next(), pathname.split("/")[1]);
  }

  const locale = getLocaleFromHeaders(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return rememberLocale(request, NextResponse.redirect(url), locale);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
