import { Manrope, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero logo to improve LCP */}
        <link rel="preload" href="/logo.jpg" as="image" />
        {/* Inline critical CSS: CSS vars + reset + above-fold layout — renders header/hero before full stylesheet loads */}
        <style dangerouslySetInnerHTML={{ __html:
          `:root{--bg:#0a1d2c;--bg2:#0e2638;--bg3:#0f2a40;--paper:#f0f4ff;--text:#f0f4ff;--muted:#94a3b8;--gold:#c9a84c;--teal:#4ad8d8;--cyan:#5eead4;--blue:#3b82f6;--blue2:#60a5fa;--line:rgba(120,180,210,.16);--dark:#14232c}*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:78px}body{margin:0;background:var(--bg);color:var(--text);font-family:'Manrope','Noto Sans SC',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}main{max-width:1440px;margin:0 auto}a{color:inherit;text-decoration:none}button{font:inherit}header{height:78px;padding:0 max(4vw,40px);display:flex;align-items:center;justify-content:space-between;position:fixed;inset:0 0 auto;z-index:50;background:rgba(10,29,44,.92);border-bottom:1px solid var(--line);backdrop-filter:blur(18px);max-width:1440px;margin:0 auto;right:0;left:0}.brand{height:48px;padding:3px 9px;background:#fff;display:flex;align-items:center;border-radius:6px}.brand img{width:116px;height:42px;object-fit:contain}nav{display:flex;gap:28px}nav a{font-size:13.5px;font-weight:700;color:#9ba9bc;transition:.2s;white-space:nowrap}nav a:hover{color:#fff}.header-actions{display:flex;align-items:center;gap:20px}.menu-button{display:none;border:0;background:none;padding:8px}.menu-button i{display:block;width:20px;height:1.5px;background:#fff;margin:5px}main{padding-top:78px}.section{padding:110px max(4vw,24px)}.section h2{font-size:clamp(34px,3.8vw,56px);line-height:1.12;letter-spacing:-.04em;font-weight:470;margin:0 0 18px}.overline{font-size:13px;letter-spacing:.2em;font-weight:800;color:var(--cyan);display:flex;align-items:center;gap:12px;margin:0 0 24px}.overline i{width:28px;height:1px;background:currentColor}.section-header{margin-bottom:56px}.about-hero,.solutions-hero,.compliance-hero,.dev-page-hero{min-height:520px;padding:170px max(4vw,40px) 60px;position:relative;overflow:hidden;text-align:center;max-width:1440px;margin:0 auto}.about-hero h1,.solutions-hero h1,.compliance-hero h1,.dev-page-hero h1{font-size:clamp(38px,3.6vw,60px);line-height:1.1;letter-spacing:-.04em;font-weight:460;margin:0;position:relative;z-index:2}.about-hero h1 em,.solutions-hero h1 em{font-style:normal;color:var(--blue2)}.compliance-hero h1 em{color:var(--gold)}.dev-page-hero h1 em{color:var(--cyan)}.about-hero .overline,.solutions-hero .overline,.compliance-hero .overline,.dev-page-hero .overline{justify-content:center;position:relative;z-index:2}.compliance-hero .overline{color:#c9a84c}.compliance-hero .overline i{background:#c9a84c}.about-desc,.compliance-hero-desc,.dev-page-desc,.solutions-desc{font-size:14.5px;line-height:1.9;color:#9fadc0;max-width:680px;margin:28px auto 0;position:relative;z-index:2}.solutions-desc{max-width:640px}.compliance-hero-desc{max-width:720px}.dev-page-desc{max-width:620px}.about-cards{padding:0 max(4vw,40px) 100px;max-width:1440px;margin:0 auto}.about-cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.about-card{padding:42px 32px 36px;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid var(--line);border-radius:12px;text-align:center}.about-card-icon{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border:1px solid rgba(94,234,212,.3);border-radius:50%;color:var(--cyan);font-size:22px;margin-bottom:20px}.about-card h2{font-size:10.5px;letter-spacing:.18em;color:var(--cyan);text-transform:uppercase;margin:0 0 14px;font-weight:700}.about-card b{display:block;font-size:18px;font-weight:650;color:#e0e8f0;margin-bottom:10px;line-height:1.35}.about-card p{font-size:13px;line-height:1.75;color:#8796aa;margin:0}.section-sub{font-size:14px;line-height:1.85;color:var(--muted);max-width:680px;margin:0}`,
        }} />
      </head>
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>
        {/* Google Tag Manager — loads after page is interactive, non-blocking */}
        <Script id="gtm-init" strategy="afterInteractive">
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
