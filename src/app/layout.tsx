import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { HashScrollOnRoute } from "@/components/layout/HashScrollOnRoute";
import { SiteCredit } from "@/components/layout/SiteCredit";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Khushboo Dodani — Product Manager",
    template: "%s — Khushboo Dodani",
  },
  description:
    "Product manager focused on growth, AI, and platform — shaping products that change behavior through UX, data, and intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans text-[15px] leading-relaxed tracking-[-0.01em]`}
      >
        <div className="relative flex min-h-dvh flex-col">
          <HashScrollOnRoute />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-glow-radial bg-no-repeat"
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-glow-corner bg-no-repeat"
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-glow-sage bg-no-repeat"
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-mesh-light opacity-[0.35]"
            aria-hidden
          />
          <SiteHeader />
          <main className="relative z-10 flex-1 min-h-0 isolate">{children}</main>
          <SiteCredit />
        </div>
      </body>
    </html>
  );
}
