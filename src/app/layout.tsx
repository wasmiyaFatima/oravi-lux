import "./globals.css";
import type { ReactNode } from "react";

/**
 * Root pass-through so `[locale]/layout.tsx` can own `<html lang>` and `<body>`.
 * Supported by Next.js + next-intl App Router setups.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
