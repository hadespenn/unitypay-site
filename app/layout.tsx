import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";

/** 🔁 Replace with your Google Tag Manager ID from https://tagmanager.google.com */
const GTM_ID = "GTM-XXXXXXX";
const BASE_URL = "https://unity-pay.pages.dev";

/** Root metadata — metadataBase ensures canonical & hreflang resolve to absolute URLs */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: { icon: "/logo.webp" },
  openGraph: {
    siteName: "UnityPay",
    images: [{ url: "/logo.webp", width: 512, height: 512 }],
  },
  twitter: { card: "summary_large_image" },
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
  weight: ["400", "700"],
});

/**
 * Critical CSS only: CSS variables + reset + header + hero base layout.
 * Everything above-the-fold renders correctly while full CSS loads async.
 * The post-build script (defer-blocking.mjs) replaces the placeholder with
 * the actual globals.css hash filename.
 */
const criticalCSS = readFileSync(join(process.cwd(), "app", "globals.css"), "utf-8")
  .split("\n")
  .slice(0, 7) // first 7 lines: :root vars, reset, nav, shared
  .join("");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="BFFE539D08610AA8D4D7AC1F64591BFC" />
        {/* Preload hero logo to improve LCP */}
        <link rel="preload" href="/logo.jpg" as="image" fetchPriority="high" />
        {/* Preload full CSS — fetched early, applied after first paint */}
        <link rel="preload" href="/css/globals.css" as="style" />
        {/* Full CSS: media="print" avoids render-blocking, onload switches to "all" */}
        <link rel="stylesheet" href="/css/globals.css" media="print" />
        {/* Noscript fallback for users with JS disabled */}
        <noscript>
          <link rel="stylesheet" href="/css/globals.css" />
        </noscript>
        {/* Critical CSS: inlined — renders above-fold before full stylesheet loads */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>
        {/* Skip to main content — accessible keyboard navigation */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* Google Tag Manager — lazy-loaded, zero impact on initial render */}
        <Script id="gtm-init" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* GTM noscript fallback for users with JS disabled */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {children}
      </body>
    </html>
  );
}
