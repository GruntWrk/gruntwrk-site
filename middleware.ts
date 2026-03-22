import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "pt"];
const DEFAULT_LOCALE = "en";

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (/\bpt\b/i.test(acceptLanguage)) return "pt";
  return DEFAULT_LOCALE;
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

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocaleFromHeaders(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
