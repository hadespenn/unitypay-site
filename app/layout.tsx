import { readFileSync } from "fs";
import { join } from "path";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";

/** 🔁 Replace with your Google Tag Manager ID from https://tagmanager.google.com */
const GTM_ID = "GTM-XXXXXXX";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
});

/** Read the full stylesheet at build time so it can be inlined into every page's <head>. */
const fullCSS = readFileSync(join(process.cwd(), "app", "globals.css"), "utf-8");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero logo (WebP when available, JPG as immediate fallback) */}
        <link rel="preload" href="/logo.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/logo.jpg" as="image" fetchPriority="high" />
        {/* Full CSS inlined at build time — zero render-blocking external requests, zero FOUC */}
        <style dangerouslySetInnerHTML={{ __html: fullCSS }} />
      </head>
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>
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
