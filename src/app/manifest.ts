import type { MetadataRoute } from "next";
import {
  LOGO_HEIGHT,
  LOGO_PATH,
  LOGO_WIDTH,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "OraviLux",
    description:
      "Your trusted concierge and hospitality partner in Luxembourg. Bespoke concierge, corporate support and VIP hospitality.",
    start_url: "/en",
    scope: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#614028",
    lang: "en-LU",
    icons: [
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: LOGO_PATH,
        sizes: `${LOGO_WIDTH}x${LOGO_HEIGHT}`,
        type: "image/png",
      },
    ],
    id: SITE_URL,
  };
}
