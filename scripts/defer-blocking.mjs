/**
 * Post-build script: defer scripts, preload fonts, fix CSS async load.
 *
 * 1. Adds `defer` to bare <script> tags.
 * 2. Preloads font files to break CSS→font critical chain.
 * 3. Adds onload handler to media="print" CSS links so they apply after load.
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

/** Add onload="this.media='all'" to <link media="print"> so CSS applies after download */
function fixAsyncCSS(html) {
  return html.replace(
    /<link\s+rel="stylesheet"\s+href="\/css\/[^"]+"\s+media="print"/gi,
    (match) => match.replace('media="print"', 'media="print" onload="this.media=\'all\'"'),
  );
}

async function main() {
  let htmlFiles = 0;
  let fontCount = 0;

  for await (const file of walkHtmlFiles(OUT_DIR)) {
    let html = await readFile(file, "utf-8");

    // 1. Defer scripts
    html = html.replace(
      /<script\s+src=["'][^"']+["'][^>]*>/gi,
      (match) => {
        if (match.includes("defer") || match.includes("async")) return match;
        if (match.includes('type="module"') || match.includes("type='module'")) return match;
        return match.replace(/>$/, " defer>");
      },
    );

    // 2. Async CSS: add onload to media="print" links
    html = fixAsyncCSS(html);

    // 3. Preload fonts
    const fontUrls = extractFontUrls(html);
    html = insertFontPreloads(html, fontUrls);

    await writeFile(file, html);
    htmlFiles++;
    fontCount += fontUrls.length;
  }

  console.log(`✅ ${htmlFiles} HTML files processed`);
  console.log(`✅ ${fontCount} font files preloaded`);
  console.log(`✅ CSS async-load onload handlers added`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
