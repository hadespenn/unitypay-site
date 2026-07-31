/**
 * Post-build script: defer scripts, preload fonts, make CSS non-blocking.
 *
 * 1. Converts blocking <link rel="stylesheet"> to media="print" + onload pattern.
 * 2. Inlines minimal critical-path CSS (above-the-fold styles).
 * 3. Preloads font files to break CSS→font critical chain.
 * 4. Adds `defer` to bare <script> tags.
 *
 * Run: node scripts/defer-blocking.mjs
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const OUT_DIR = "out";

async function* walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

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

/**
 * Minimal critical CSS for above-the-fold content.
 * This prevents FOUC while the full CSS loads asynchronously.
 */
const CRITICAL_CSS = `<style>*,::before,::after{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:78px}body{margin:0;background:#0a1d2c;color:#f0f4ff;font-family:system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}main{max-width:1440px;margin:0 auto}a{color:inherit;text-decoration:none}header{height:78px;padding:0 max(4vw,40px);display:flex;align-items:center;justify-content:space-between;position:fixed;inset:0 0 auto;z-index:50;background:rgba(10,29,44,.92);border-bottom:1px solid rgba(120,180,210,.16);backdrop-filter:blur(18px);max-width:1440px;margin:0 auto;right:0;left:0}.brand{height:48px;padding:3px 9px;background:#fff;display:flex;align-items:center;border-radius:6px}.brand img{width:116px;height:42px;object-fit:contain}nav{display:flex;gap:28px}nav a{font-size:13.5px;font-weight:700;color:#b0bed0;transition:.2s;white-space:nowrap}nav a:hover{color:#fff}.header-actions{display:flex;align-items:center;gap:20px}.lang-trigger{display:flex;align-items:center;gap:7px;border:1px solid rgba(120,180,210,.16);background:rgba(120,180,220,.06);color:#cdd6e2;font-size:12.5px;cursor:pointer;padding:6px 11px;border-radius:7px}.header-contact{border-left:1px solid rgba(120,180,210,.16);padding-left:20px;font-size:13.5px;font-weight:800;white-space:nowrap}.hero-section{min-height:820px;padding:170px max(4vw,40px) 0;position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 520px;grid-template-rows:1fr auto;gap:0 40px;align-items:start;max-width:1440px;margin:0 auto;width:100%}.hero-copy{position:relative;z-index:2;max-width:680px;padding-top:10px}.hero-copy h1{font-size:clamp(48px,4vw,72px);line-height:1.06;letter-spacing:-.05em;font-weight:460;margin:0}.hero-desc{font-size:14.5px;line-height:1.9;color:#b4c4d4;max-width:720px;margin:30px 0 36px}.hero-actions{display:flex;align-items:center;gap:20px}.button{min-height:51px;padding:0 22px;display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;font-size:14px;font-weight:800;border-radius:8px;transition:all .25s;cursor:pointer}.button.primary{background:#2563eb;color:#fff;border-color:#2563eb}.button.outline{border-color:rgba(120,180,220,.25);color:#cdd6e2;background:transparent}.skip-link{position:absolute;left:16px;top:-100px;z-index:100;padding:10px 18px;background:#5eead4;color:#0a1d2c;font-size:14px;font-weight:700;border-radius:6px}.skip-link:focus{top:16px}@media(max-width:760px){header{height:68px;padding:0 18px}header .brand{height:40px}header .brand img{width:90px;height:34px}header>nav{display:none}.hero-section{grid-template-columns:1fr;padding:120px 18px 0;min-height:auto;text-align:center}.hero-copy h1{font-size:28px}.hero-actions{flex-direction:column;align-items:center;gap:14px}}</style>\n`;

/**
 * Convert all blocking <link rel="stylesheet"> (without media attr) to
 * media="print" + onload pattern, and inject critical CSS first.
 */
function makeCSSNonBlocking(html) {
  // Insert critical CSS right before the first <link rel="stylesheet">
  html = html.replace(
    /(<link\s+rel="stylesheet"[^>]*>)/,
    `${CRITICAL_CSS}$1`,
  );

  // Convert blocking stylesheets (no media attr) to async media="print" pattern
  return html.replace(
    /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/gi,
    (match, href) => {
      // Skip if already has media attr (was already converted)
      if (match.includes("media=")) return match;
      // Skip noscript fallback
      if (match.includes("noscript")) return match;
      return `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" />\n<noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    },
  );
}

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
        if (match.includes('type="module"') || match.includes("type='module"')) return match;
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
  console.log(`✅ CSS made non-blocking with critical CSS inline`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
