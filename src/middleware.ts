import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Google binds one favicon to the hostname homepage (`https://oravilux.com/`).
 * A 307 from `/` to `/en` can leave that homepage without a snippet or a fresh icon.
 */
const CRAWLERS =
  /Googlebot|Googlebot-Image|AdsBot-Google|bingbot|BingPreview|DuckDuckBot|YandexBot|Discordbot|Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Slackbot|WhatsApp|TelegramBot|Iframely|Embedly|Pinterest/i;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  if (pathname === "/" && CRAWLERS.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|en|fr)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
