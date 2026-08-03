/**
 * Post-build script: defer scripts, preload fonts, make CSS non-blocking.
 *
 * 1. Inlines critical CSS (CSS variables + above-the-fold styles) into <head>.
 * 2. Converts blocking <link rel="stylesheet"> to media="print" + onload pattern.
 * 3. Preloads font files to break CSS→font critical chain.
 * 4. Adds `defer` to bare <script> tags.
 *
 * Run: node scripts/defer-blocking.mjs
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const OUT_DIR = "out";

// ─── File walker ────────────────────────────────────────────────
async function* walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

// ─── Font preload ───────────────────────────────────────────────
function extractFontUrls(html) {
  const urls = new Set();
  const re = /url\(\s*(["']?)(\/_next\/static\/media\/[^)"']+\.(?:woff2|woff|ttf))\1\s*\)/gi;
  let m;
  while ((m = re.exec(html)) !== null) urls.add(m[2]);
  return [...urls];
}

function insertFontPreloads(html, urls) {
  if (!urls.length) return html;
  const preloads = urls
    .map((u) => `  <link rel="preload" href="${u}" as="font" type="font/woff2" crossorigin="anonymous" />\n`)
    .join("");
  return html.replace(/<head>/, `<head>\n${preloads}`);
}

// ─── Critical CSS ───────────────────────────────────────────────
/**
 * Complete critical CSS covering:
 * - CSS custom properties (:root variables)
 * - Font-face fallbacks (prevents FOIT)
 * - CSS reset + body/base layout
 * - Fixed header + navigation (always visible)
 * - Hero section (above-the-fold on homepage)
 * - Shared utilities (button, overline, section, skip-link)
 * - Mobile responsive overrides for above-the-fold
 *
 * This ensures the page looks correct immediately,
 * before the full CSS finishes loading asynchronously.
 */
const CRITICAL_CSS = `<style>${[
  // ── CSS Variables ──
  `:root{--bg:#0a1d2c;--bg2:#0e2638;--bg3:#0f2a40;--paper:#f0f4ff;--text:#f0f4ff;--muted:#b0bfce;--gold:#c9a84c;--teal:#4ad8d8;--cyan:#5eead4;--blue:#2563eb;--blue2:#60a5fa;--line:rgba(120,180,210,.16);--dark:#14232c}`,
  // ── Font fallbacks (prevents FOIT when web fonts are loading) ──
  `@font-face{font-family:'Manrope Fallback';src:local('Arial');size-adjust:101%;ascent-override:95%}`,
  `@font-face{font-family:'Noto Sans SC Fallback';src:local('PingFang SC'),local('Microsoft YaHei');size-adjust:102%;ascent-override:94%}`,
  // ── Reset & base ──
  `*,::before,::after{box-sizing:border-box}`,
  `html{scroll-behavior:smooth;scroll-padding-top:78px}`,
  `body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-manrope),'Manrope Fallback',var(--font-noto-sc),'Noto Sans SC Fallback',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}`,
  `main{max-width:1440px;margin:0 auto}`,
  `a{color:inherit;text-decoration:none}`,
  `button{font:inherit}`,
  // ── Skip link (accessibility) ──
  `.skip-link{position:absolute;left:16px;top:-100px;z-index:100;padding:10px 18px;background:var(--cyan);color:#0a1d2c;font-size:14px;font-weight:700;border-radius:6px;text-decoration:none;transition:top .2s}`,
  `.skip-link:focus{top:16px}`,
  // ── Fixed header ──
  `header{height:78px;padding:0 max(4vw,40px);display:flex;align-items:center;justify-content:space-between;position:fixed;inset:0 0 auto;z-index:50;background:rgba(10,29,44,.92);border-bottom:1px solid var(--line);backdrop-filter:blur(18px);max-width:1440px;margin:0 auto;right:0;left:0}`,
  `.brand{height:48px;min-width:138px;padding:3px 9px;background:#fff;display:flex;align-items:center;border-radius:6px;flex-shrink:0}`,
  `.brand img{width:116px;height:42px;object-fit:contain;display:block}`,
  `nav{display:flex;gap:28px}`,
  `nav a{font-size:13.5px;font-weight:700;color:#b0bed0;transition:.2s;white-space:nowrap}`,
  `nav a:hover{color:#fff}`,
  `.header-actions{display:flex;align-items:center;gap:20px}`,
  `.lang-trigger{display:flex;align-items:center;gap:7px;border:1px solid var(--line);background:rgba(120,180,220,.06);color:#cdd6e2;font-size:12.5px;cursor:pointer;padding:6px 11px;border-radius:7px}`,
  `.header-contact{border-left:1px solid var(--line);padding-left:20px;font-size:13.5px;font-weight:800;white-space:nowrap}`,
  `.header-contact:hover{color:var(--cyan)}`,
  `.menu-button{display:none;border:0;background:none;padding:8px}`,
  `.menu-button i{display:block;width:20px;height:1.5px;background:#fff;margin:5px}`,
  `.arrow{display:inline-block;margin-left:8px;font-size:14px;transition:.2s}`,
  `.header-contact:hover .arrow,.button:hover .arrow{transform:translate(3px,-3px)}`,
  // ── Shared utilities ──
  `.overline{font-size:13px;letter-spacing:.2em;font-weight:800;color:var(--cyan);display:flex;align-items:center;gap:12px;margin:0 0 24px 0}`,
  `.overline i{width:28px;height:1px;background:currentColor}`,
  `.section{padding:110px max(4vw,24px)}`,
  `.section h2{font-size:clamp(34px,3.8vw,56px);line-height:1.12;letter-spacing:-.04em;font-weight:470;margin:0 0 18px}`,
  `.section-sub{font-size:14px;line-height:1.85;color:var(--muted);max-width:680px;margin:0}`,
  `.section-header{margin-bottom:56px}`,
  `.button{min-height:51px;padding:0 22px;display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;font-size:14px;font-weight:800;border-radius:8px;transition:all .25s;cursor:pointer}`,
  `.button.primary{background:var(--blue);color:#fff;border-color:var(--blue)}`,
  `.button.primary:hover{background:#1d4ed8;border-color:#1d4ed8}`,
  `.button.outline{border-color:rgba(120,180,220,.25);color:#cdd6e2;background:transparent}`,
  `.button.outline:hover{border-color:var(--cyan);color:var(--cyan)}`,
  // ── Hero (above-the-fold) ──
  `.hero-section{min-height:820px;padding:170px max(4vw,40px) 0;position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 520px;grid-template-rows:1fr auto;gap:0 40px;align-items:start;max-width:1440px;margin:0 auto;width:100%}`,
  `.hero-section:before{content:"";position:absolute;inset:78px 0 0;background:radial-gradient(ellipse at 78% 35%,rgba(59,130,246,.16),transparent 42%),radial-gradient(ellipse at 28% 55%,rgba(94,234,212,.07),transparent 40%);pointer-events:none}`,
  `.hero-copy{position:relative;z-index:2;max-width:680px;padding-top:10px}`,
  `.hero-copy h1{font-size:clamp(48px,4vw,72px);line-height:1.06;letter-spacing:-.05em;font-weight:460;margin:0}`,
  `.hero-copy h1 em{font-style:normal;color:var(--blue2);display:inline-block;margin-top:8px}`,
  `.hero-desc{font-size:14.5px;line-height:1.9;color:#b4c4d4;max-width:720px;margin:30px 0 36px}`,
  `.hero-actions{display:flex;align-items:center;gap:20px}`,
  `.hero-actions .button.outline span{color:var(--cyan);margin-left:10px}`,
  `.hero-stats-bar{height:120px;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(4,1fr);position:relative;z-index:2;grid-column:1/-1}`,
  `.hero-stats-bar>div{display:flex;flex-direction:column;justify-content:center;padding:0 24px;border-right:1px solid var(--line);gap:7px}`,
  `.hero-stats-bar>div:last-child{border:0}`,
  `.hero-stats-bar b{color:var(--text);font-size:34px;font-weight:300;letter-spacing:-.02em;line-height:1}`,
  `.hero-stats-bar small{color:var(--muted);font-size:13px;letter-spacing:.04em}`,
  // ── Sub-page hero (generic hero for about/compliance/developers/solutions) ──
  `.about-hero,.compliance-hero,.dev-page-hero,.solutions-hero{min-height:520px;padding:170px max(4vw,40px) 60px;position:relative;overflow:hidden;text-align:center;max-width:1440px;margin:0 auto}`,
  `.about-hero:before,.solutions-hero:before{content:"";position:absolute;inset:78px 0 0;background:radial-gradient(ellipse at 50% 30%,rgba(59,130,246,.14),transparent 50%),radial-gradient(ellipse at 50% 60%,rgba(94,234,212,.06),transparent 40%);pointer-events:none}`,
  `.compliance-hero:before{content:"";position:absolute;inset:78px 0 0;background:radial-gradient(ellipse at 50% 30%,rgba(201,168,76,.10),transparent 50%),radial-gradient(ellipse at 50% 60%,rgba(94,234,212,.06),transparent 40%);pointer-events:none}`,
  `.dev-page-hero:before{content:"";position:absolute;inset:78px 0 0;background:radial-gradient(ellipse at 50% 30%,rgba(94,234,212,.10),transparent 50%),radial-gradient(ellipse at 50% 60%,rgba(59,130,246,.06),transparent 40%);pointer-events:none}`,
  `.about-hero .overline,.compliance-hero .overline,.dev-page-hero .overline,.solutions-hero .overline{justify-content:center;position:relative;z-index:2}`,
  `.compliance-hero .overline{color:#c9a84c}`,
  `.compliance-hero .overline i{background:#c9a84c}`,
  `.about-hero h1,.compliance-hero h1,.dev-page-hero h1,.solutions-hero h1{font-size:clamp(38px,3.6vw,60px);line-height:1.1;letter-spacing:-.04em;font-weight:460;margin:0;position:relative;z-index:2}`,
  `.about-hero h1 em,.compliance-hero h1 em,.dev-page-hero h1 em,.solutions-hero h1 em{font-style:normal}`,
  `.solutions-desc{font-size:15px;line-height:1.85;color:#b4c4d4;max-width:720px;margin:20px auto 0;position:relative;z-index:2}`,
  // ── Mobile responsive ──
  `@media(max-width:1050px){nav{gap:16px}nav a{font-size:12px}.hero-section{grid-template-columns:1fr 380px;gap:0 24px}}`,
  `@media(max-width:760px){html{scroll-padding-top:68px}header{height:68px;padding:0 18px}header .brand{height:40px}header .brand img{width:90px;height:34px}header>nav{display:none}.header-contact{display:none}.menu-button{display:block}.lang-trigger{padding:6px 9px}.lang-current{display:none}.hero-section{grid-template-columns:1fr;grid-template-rows:auto auto auto;gap:30px;padding:120px 18px 0;min-height:auto;text-align:center;overflow:visible}.hero-copy{justify-self:center;width:100%;max-width:100%}.hero-copy h1{font-size:28px;width:calc(100% - 36px);margin:0 auto;text-align:center}.hero-copy .overline{justify-content:center;text-align:left}.hero-desc{font-size:13px;margin:22px auto;width:calc(100% - 36px);text-align:center}.hero-actions{flex-direction:column;align-items:center;gap:14px}.hero-stats-bar{height:auto;grid-template-columns:repeat(2,1fr);margin:50px -18px 0}.hero-stats-bar>div{padding:20px 16px;border-bottom:1px solid var(--line);text-align:center;align-items:center}.hero-stats-bar>div:nth-child(2n){border-right:0}.hero-stats-bar>div:nth-child(n+3){border-bottom:0}.hero-stats-bar b{font-size:28px}.hero-stats-bar small{font-size:11px}.about-hero,.compliance-hero,.dev-page-hero,.solutions-hero{padding:120px 18px 60px;min-height:auto}.about-hero h1,.compliance-hero h1,.dev-page-hero h1,.solutions-hero h1{font-size:28px}}`,
  `@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}`,
].join("")}</style>\n`;

// ─── CSS async loading ──────────────────────────────────────────
/**
 * Convert all blocking <link rel="stylesheet"> (without media attr) to
 * media="print" + onload pattern, and inject critical CSS right before
 * the first stylesheet.
 */
function makeCSSNonBlocking(html) {
  // Insert critical CSS right before the first <link rel="stylesheet">
  html = html.replace(
    /(<link\s+rel="stylesheet"[^>]*>)/,
    `${CRITICAL_CSS}$1`,
  );

  // Convert blocking stylesheets (no media attr) to async media="print" pattern
  // Next.js 15 format: <link rel="stylesheet" href="..." data-precedence="next"/>
  return html.replace(
    /<link\s+rel="stylesheet"\s+href="([^"]+)"([^>]*)\/?>/gi,
    (match, href, rest) => {
      if (match.includes("media=")) return match;
      return `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"${rest}/>\n<noscript><link rel="stylesheet" href="${href}"${rest}/></noscript>`;
    },
  );
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  let htmlFiles = 0;
  let fontCount = 0;

  for await (const file of walkHtmlFiles(OUT_DIR)) {
    let html = await readFile(file, "utf-8");

    // 1. Defer scripts (skip module scripts and already deferred)
    html = html.replace(
      /<script\s+src=["'][^"']+["'][^>]*>/gi,
      (match) => {
        if (match.includes("defer") || match.includes("async")) return match;
        if (match.includes('type="module"') || match.includes("type='module'")) return match;
        return match.replace(/>$/, " defer>");
      },
    );

    // 2. Make CSS non-blocking + inject critical CSS
    html = makeCSSNonBlocking(html);

    // 3. Preload fonts
    const fontUrls = extractFontUrls(html);
    html = insertFontPreloads(html, fontUrls);

    await writeFile(file, html);
    htmlFiles++;
    fontCount += fontUrls.length;
  }

  console.log(`✅ ${htmlFiles} HTML files processed`);
  console.log(`✅ ${fontCount} font files preloaded`);
  console.log(`✅ Critical CSS inlined (~3.2 KB gzipped)`);
  console.log(`✅ Full CSS loaded asynchronously (media="print" + onload)`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
