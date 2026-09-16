import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Discord (and similar) follow one redirect, then stop. `/` 307 → `/en` drops OG tags. */
const LINK_CRAWLERS =
  /Discordbot|Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Slackbot|Slack-ImgProxy|WhatsApp|TelegramBot|Iframely|Embedly|Pinterest/i;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  if (pathname === "/" && LINK_CRAWLERS.test(ua)) {
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
