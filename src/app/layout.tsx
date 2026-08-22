import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flawless Paris — Scent, remembered",
  description: "Flawless Paris marka deneyimi prototipi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html suppressHydrationWarning><body>{children}</body></html>;
}
